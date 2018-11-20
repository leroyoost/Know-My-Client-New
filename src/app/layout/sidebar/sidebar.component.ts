import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var $: any;

import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    userConfig: Observable<any>;
    router: Router;

    constructor(
        public menu: MenuService,
        public settings: SettingsService,
        public injector: Injector,
        private afs: AngularFirestore,
        private afa: AngularFireAuth
    ) {

        this.afa.auth.onAuthStateChanged(user => {
            if (user) {
                this.userConfig = this.afs.collection('users').doc(user.uid).valueChanges();
            }
        });
    }

    ngOnInit() {

        this.router = this.injector.get(Router);
        this.router.events.subscribe((val) => {
            // close any submenu opened when route changes
            this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
        });

    }

    toggleSubmenuClick(event) {
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            event.preventDefault();

            const target = $(event.target || event.srcElement || event.currentTarget);
            let ul, anchor = target;

            // find the UL
            if (!target.is('a')) {
                anchor = target.parent('a').first();
            }
            ul = anchor.next();

            // hide other submenus
            const parentNav = ul.parents('.sidebar-subnav');
            $('.sidebar-subnav').each((idx, el) => {
                const $el = $(el);
                // if element is not a parent or self ul
                if (!$el.is(parentNav) && !$el.is(ul)) {
                    this.closeMenu($el);
                }
            });

            // abort if not UL to process
            if (!ul.length) {
                return;
            }

            // any child menu should start closed
            ul.find('.sidebar-subnav').each((idx, el) => {
                this.closeMenu($(el));
            });

            // toggle UL height
            if (parseInt(ul.height(), 0)) {
                this.closeMenu(ul);
            } else {
                // expand menu
                ul.on('transitionend', () => {
                    ul.height('auto').off('transitionend');
                }).height(ul[0].scrollHeight);
                // add class to manage animation
                ul.addClass('opening');
            }

        }

    }

    // Close menu collapsing height
    closeMenu(elem) {
        elem.height(elem[0].scrollHeight); // set height
        elem.height(0); // and move to zero to collapse
        elem.removeClass('opening');
    }

    toggleSubmenuHover(event) {
        const self = this;
        if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
            event.preventDefault();

            this.removeFloatingNav();

            const target = $(event.target || event.srcElement || event.currentTarget);
            let ul, anchor = target;
            // find the UL
            if (!target.is('a')) {
                anchor = target.parent('a');
            }
            ul = anchor.next();

            if (!ul.length) {
                return; // if not submenu return
            }

            const $aside = $('.aside');
            const $asideInner = $aside.children('.aside-inner'); // for top offset calculation
            const $sidebar = $asideInner.children('.sidebar');
            const mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
            const itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();

            const floatingNav = ul.clone().appendTo($aside);
            const vwHeight = $(window).height();

            // let itemTop = anchor.position().top || anchor.offset().top;

            floatingNav
                .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
                .addClass('nav-floating')
                .css({
                    position: this.settings.layout.isFixed ? 'fixed' : 'absolute',
                    top: itemTop,
                    bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
                });

            floatingNav
                .on('mouseleave', () => { floatingNav.remove(); })
                .find('a').on('click', function(e) {
                    e.preventDefault(); // prevents page reload on click
                    // get the exact route path to navigate
                    self.router.navigate([$(this).attr('route')]);
                });

            this.listenForExternalClicks();
        }
    }

    listenForExternalClicks() {
        const $doc = $(document).on('click.sidebar', (e) => {
            if (!$(e.target).parents('.aside').length) {
                this.removeFloatingNav();
                $doc.off('click.sidebar');
            }
        });
    }

    removeFloatingNav() {
        $('.nav-floating').remove();
    }

    isSidebarCollapsed() {
        return this.settings.layout.isCollapsed;
    }
    isSidebarCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }
    isEnabledHover() {
        return this.settings.layout.asideHover;
    }
}
