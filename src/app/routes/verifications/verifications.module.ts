import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FullModule } from './full/full.module';
// import { BankModule } from './bank/bank.module';
// import { TraceModule } from './trace/trace.module';

import { FullComponent } from './full/full.component';
// import { BankComponent } from './bank/bank.component';
// import { TraceComponent } from './trace/trace.component';

import { VerificationService } from './verifications.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'full', component: FullComponent }
  // { path: 'bank', component: BankComponent },
  // { path: 'trace', component: TraceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FullModule,
    // BankModule,
    // TraceModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  providers: [
    VerificationService,
  ],
  exports: [
    RouterModule
  ]
})
export class VerificationsModule { }

