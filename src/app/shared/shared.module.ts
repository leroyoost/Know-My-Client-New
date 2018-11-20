import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MomentModule } from 'ngx-moment';
import { SelectModule } from 'ng2-select';
import { TreeModule } from 'ng2-tree';
import {AngularGooglePlaceModule} from 'angular-google-place';
import { LoadingModule } from 'ngx-loading';

// Services
import { ColorsService } from './colors/colors.service';

// Pipes
import { OrderByPipe } from './pipes/orderBy.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { TitleCasePipe } from './pipes/titleCase.pipe';
import { ArrayFilterPipe } from './pipes/filter.pipe';
import { CleanKeyPipe } from './pipes/cleanKey.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        MomentModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        SelectModule,
        TreeModule,
        AngularGooglePlaceModule,
        LoadingModule
    ],
    providers: [
        ColorsService,
        OrderByPipe,
        KeysPipe,
        TitleCasePipe,
        ArrayFilterPipe,
        CleanKeyPipe
    ],
    declarations: [
        OrderByPipe,
        KeysPipe,
        TitleCasePipe,
        ArrayFilterPipe,
        CleanKeyPipe

    ],
    exports: [
        MomentModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlertModule,
        ButtonsModule,
        BsDropdownModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        SelectModule,
        TreeModule,
        OrderByPipe,
        KeysPipe,
        TitleCasePipe,
        ArrayFilterPipe,
        CleanKeyPipe,
        AngularGooglePlaceModule,
        LoadingModule
       ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
