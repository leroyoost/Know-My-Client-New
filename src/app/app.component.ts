import { Component, HostBinding, OnInit } from '@angular/core';
declare var $: any;

import { SettingsService } from './core/settings/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return true; }
    @HostBinding('class.layout-fs') get useFullLayout() { return false; }

    constructor(public settings: SettingsService) { }

    ngOnInit() {
        $(document).on('click', '[href="#"]', e => e.preventDefault());
    }
}
