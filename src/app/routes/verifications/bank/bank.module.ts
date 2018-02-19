import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { AddComponent } from './add.component';
import { DetailsComponent } from './details.component';
import { BankComponent } from './bank.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    BankComponent
  ],
  entryComponents: [
    AddComponent,
    DetailsComponent
  ]
})
export class BankModule { }
