//Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VerificationsModule } from './verifications/verifications.module';

//Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

import { AddUserComponent } from './users/add/user-add-modal.component';
import { DetailsUserComponent } from './users/details/user-details-modal.component';
import { ConfigComponent } from './config/config.component';
import { AddCompanyComponent } from './config/companies/add/company-add-modal.component';
import { AddListsComponent } from './config/lists/lists-add-modal.component';

//Services
import { MenuService } from '../core/menu/menu.service';
import { EventService } from './verifications/verifications.service';
import { UsersService } from './users/users.service';
import { ConfigService } from './config/config.service';

//Models
import { routes } from './routes';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        VerificationsModule
    ],
    declarations: [
      LoginComponent,
      DashboardComponent,
      UsersComponent,
      AddUserComponent,
      DetailsUserComponent,
      ConfigComponent,
      AddCompanyComponent,
      AddListsComponent
    ],
    entryComponents: [
        AddUserComponent,
        DetailsUserComponent,
        AddCompanyComponent,
        AddListsComponent
    ],
    providers: [
        UsersService,
        EventService,
        ConfigService
    ],

    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(
        public menuService: MenuService,
        public user: UsersService
    ) {
        menuService.addMenu();
    }
}
