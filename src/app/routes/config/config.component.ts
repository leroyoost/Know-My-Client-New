import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service'
import { SettingsService } from  '../../core/settings/settings.service';
import { AddCompanyComponent } from './companies/add/company-add-modal.component'
import { AddListsComponent } from './lists/lists-add-modal.component'

import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as firebase from 'firebase'
import * as _ from 'underscore'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  lists: Observable<any>
  companies: Observable<any>
  AddListsModalRef: BsModalRef;
  AddCompaniesModalRef: BsModalRef;
  existingList: any;
  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  }
  constructor(
    private service : ConfigService,
    private afs: AngularFirestore,
    private modalService: BsModalService,
    private settings: SettingsService
  ) { 
    
  }
  onChange(list){
    console.log(this.lists)

  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }

  addCompanyModal(){
    this.AddCompaniesModalRef = this.modalService.show(AddCompanyComponent,Object.assign({}, this.config, {class: 'modal-lg'}));
  }

  addListModal(){
    this.AddListsModalRef = this.modalService.show(AddListsComponent,Object.assign({}, this.config, {class: 'modal-lg'}));
  }

  removeItem(list,i){
    this.settings.configListRemove(list,i)
  }


  ngOnInit() {
    this.lists = this.settings.configRef.doc('lists').valueChanges()
    this.companies = this.afs.collection('companies').valueChanges()
    this.lists.subscribe(response=>{
      this.existingList = response
      console.log(this.existingList)
    },err=>console.log(err))
  }
}
