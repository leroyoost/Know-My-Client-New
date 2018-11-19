import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';
import { AddComponent } from './add.component';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../../../shared/shared.module';
import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PapaParseModule
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    ConsumerComponent
  ],
  entryComponents: [
    AddComponent,
    DetailsComponent
  ]
})
export class ConsumerModule { }
