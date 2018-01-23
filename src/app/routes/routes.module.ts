//Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

//Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { VerificationsComponent } from './verifications/verifications.component';
import { AddVerificationComponent} from './verifications/add/verification-add-modal.component';
import { DetailsVerificationComponent} from './verifications/details/verification-details-modal.component';
import { AddUserComponent } from './users/add/user-add-modal.component'
import { DetailsUserComponent } from './users/details/user-details-modal.component'
import { ConfigComponent } from './config/config.component';
import { AddCompanyComponent } from './config/companies/add/company-add-modal.component';
import { AddListsComponent } from './config/lists/lists-add-modal.component';

//Services
import { MenuService } from '../core/menu/menu.service';
import { VerificationService } from './verifications/verifications.service';
import { EventService } from './verifications/verifications.service';
import { UsersService } from './users/users.service';
import { ConfigService } from './config/config.service';

//Models
import { menu } from './menu';
import { routes } from './routes';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes)
    ],
    declarations:[
      LoginComponent,
      DashboardComponent,
      UsersComponent,
      VerificationsComponent,
      AddVerificationComponent,
      DetailsVerificationComponent,
      AddUserComponent,
      DetailsUserComponent,
      ConfigComponent,
      AddCompanyComponent,
      AddListsComponent
    ],
    entryComponents:[
        AddUserComponent,
        DetailsUserComponent,
        AddVerificationComponent,
        DetailsVerificationComponent,
        AddCompanyComponent,
        AddListsComponent
    ],
    providers: [
        UsersService,
        VerificationService,
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
        menuService.addMenu(menu);
    }
}
