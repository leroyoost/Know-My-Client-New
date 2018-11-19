import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';
import { AddComponent } from './add.component';
import { ExportComponent } from './export.component';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../../../shared/shared.module';
import { PapaParseModule } from 'ngx-papaparse';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PapaParseModule,
    FileSaverModule
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    ConsumerComponent,
    ExportComponent
  ],
  entryComponents: [
    AddComponent,
    DetailsComponent,
    ExportComponent
  ]
})
export class ConsumerModule { }
