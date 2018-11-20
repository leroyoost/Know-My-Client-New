import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfigService } from '../config.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Company } from '../../../shared/models/company';
import { Observable } from 'rxjs';
import * as _ from 'underscore';


  @Component({
      selector: 'app-lists-add-modal',
      templateUrl: './lists-add-modal.component.html',
      styleUrls: ['../config.component.scss'],
      providers: [SettingsService , ConfigService]
  })

  export class AddListsComponent implements OnInit {

    lists: Observable<any>;
    newItem: {
      list?: string
      value?: string
    } = {};
    existingList: any;
    constructor(
      private service: ConfigService,
      public bsModalRef: BsModalRef,
      public settings: SettingsService
    ) { }

    addToList() {
      this.settings.configListAdd(this.newItem.list, this.newItem.value);
    }
    ngOnInit() {
      this.lists = this.settings.configRef.doc('lists').valueChanges();
    }
}
