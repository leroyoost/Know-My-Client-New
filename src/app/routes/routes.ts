import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ConfigComponent } from './config/config.component';

export const routes = [
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'verification', loadChildren: './verifications/verifications.module#VerificationsModule'},
            { path: 'users', component: UsersComponent },
            { path: 'config', component: ConfigComponent }
        ]
    },

    // Not lazy-loaded routes
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },

    // Not found
    { path: '**', redirectTo: 'app/verification/full' }

];


