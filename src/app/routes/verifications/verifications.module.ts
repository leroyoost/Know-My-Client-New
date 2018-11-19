import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

// Modules
import { FullModule } from './full/full.module';
import { BankModule } from './bank/bank.module';
import { ConsumerModule } from './consumer/consumer.module';

// Components
import { FullComponent } from './full/full.component';
import { BankComponent } from './bank/bank.component';
import { ConsumerComponent } from './consumer/consumer.component';

// Services
import { VerificationService } from './verifications.service';
import { PdfService } from './pdf.service';
const routes: Routes = [
  { path: '', redirectTo: 'app/verification/full', pathMatch: 'full' },
  { path: 'full', component: FullComponent },
  { path: 'bank', component: BankComponent },
  { path: 'consumer', component: ConsumerComponent }

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FullModule,
    BankModule,
    ConsumerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  providers: [
    VerificationService,
    PdfService
  ],
  exports: [
    RouterModule
  ]
})
export class VerificationsModule { }

