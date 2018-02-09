import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module'

import { AddComponent } from './add.component'
import { DetailsComponent } from './details.component'
import { FullComponent } from './full.component'
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    FullComponent,
    UpdateComponent
  ],
  entryComponents:[
    AddComponent,
    DetailsComponent,
    UpdateComponent
  ]
})
export class FullModule { }
