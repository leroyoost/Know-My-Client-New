import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FileUploader } from 'ng2-file-upload';
import { VerificationService } from '../verifications.service';
import { Verification, Upload } from '../../../shared/models/verification';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Address } from 'angular-google-place';
declare var require: any;
const swal = require('sweetalert');

  @Component({
      selector: 'app-full-add-modal',
      templateUrl: './add.component.html',
      styleUrls: ['./full.component.scss'],
      providers: [VerificationService]
  })

  export class AddComponent implements OnInit {
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;
    verification: any = {
      address: {}
    };
    note: string;
    selectedFiles: FileList;
    uploadQue: File[] = [];
    fileName: string;
    user: Observable<{}>;
    lists: Observable<any>;
    submitDisabled: boolean;
    public options = {type : 'address', componentRestrictions: { country: 'ZA' }};
    loading = false;

    constructor(
      private verificationService: VerificationService,
      public bsModalRef: BsModalRef,
      private userService: UserService,
      private settings: SettingsService
    ) {
      this.submitDisabled = true;
        console.log('AddVerificationComponent Lanuched');
        this.verification.ref = verificationService.generaterRef();
      }

    getFormattedAddress(event: any) {
      this.verification.address = event;
      console.log(event);
  }
    detectFiles(event) {
      console.log(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        event.target.files[i].fileName = event.target.files[i].name;
        const file = event.target.files[i];
        this.uploadQue.push(file);
      }
    }

    fileChange(index, file) {
      this.uploadQue[index] = file;
      console.log(this.uploadQue);
    }

    removeFile(index) {
        _.pullAt(this.uploadQue, index);
        console.log(index);
    }

    public saveVerification() {
      this.loading = true;
      this.verificationService.createNewVerification(this.uploadQue, this.verification, 'full', this.note, )
      .then((response: any) => {
        console.log('firestore response received:');
        console.log(response);
        this.verification = {address: {}};
        this.note = null;
        this.uploadQue = [];
        this.verification.ref = this.verificationService.generaterRef();
        this.loading = false;
        swal('Success!', 'Verification Created', 'success');
      },
    err => {
      this.loading = false;
      console.log(err);
    });
    }
    ngOnInit() {
      this.user = this.userService.userConfig;
      this.lists = this.settings.configLists$;
    }
  }
