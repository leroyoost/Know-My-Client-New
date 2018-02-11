import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfigService } from '../../config.service';
import { SettingsService } from '../../../../core/settings/settings.service';
import { Company } from '../../../../shared/models/company';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';


  @Component({
      selector: 'app-company-add-modal',
      templateUrl: './company-add-modal.component.html',
      styleUrls: ['../../config.component.scss'],
      providers: [ConfigService , SettingsService]
  })

  export class AddCompanyComponent implements OnInit {

    menuItemsList: any[];
    verificationTypesList: any[];
    verificationTypes: string[];
    company: Company = {};
    config: Observable<any>;
    uploadQue: File[] = [];
    fileName: string;

    constructor(
      private service: ConfigService,
      public bsModalRef: BsModalRef,
      public settings: SettingsService
    ) {

      this.config = this.settings.configRef.valueChanges();

    }
    detectFiles(event) {
      // event.target.files[0].fileName = event.target.files[0].name
      this.uploadQue.push(event.target.files[0]);
    }

    fileChange(index, file) {
      this.uploadQue[index] = file;
      console.log(this.uploadQue);
    }

    removeFile(index) {
        _.pullAt(this.uploadQue, index);
        console.log(index);
    }

    saveCompany() {
      console.log(this.company);
      this.settings.companiesRef.add(this.company);
    }
    ngOnInit() {
  }
  }
