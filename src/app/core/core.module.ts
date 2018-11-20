import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MenuService } from './menu/menu.service';
import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { UserService } from './user/user.service';
import {} from '@angular/common/'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        MenuService,
        ThemesService,
        UserService,
        {provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true}
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
