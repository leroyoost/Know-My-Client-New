import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemesService } from '../../core/themes/themes.service';
import { UserService } from '../../core/user/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentTheme: any ;
    user: any;
    isNavSearchVisible: boolean;
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button

    constructor(
      public userService: UserService,
      public themes: ThemesService) {
        this.currentTheme = themes.getDefaultTheme();
        this.user = this.userService.getUser();
      }
      ngOnInit() {
    }
}
