import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FileUploader } from 'ng2-file-upload';
import { VerificationService } from '../verifications.service';
import { Verification, Upload } from '../../../shared/models/verification'
import { UploadService } from '../verifications.service'
import { UserService } from '../../../core/user/user.service'
import { SettingsService } from '../../../core/settings/settings.service'
import { Observable } from 'rxjs'
import * as _ from "lodash";
import { Address } from 'angular-google-place';

  @Component({
      selector: 'add-modal',
      templateUrl: './verification-add-modal.component.html',
      styleUrls: ['../verifications.component.scss'],
      providers: [VerificationService, UploadService]
  })

  export class AddVerificationComponent implements OnInit {
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    verification : any = {
      address:{}
    }
    selectedFiles: FileList;
    uploadQue: File[] = []
    fileName: string;
    user: Observable<{}>;
    lists: Observable<[string]>;
    accounts: Observable<[string]>;
    public options = {type : 'address', componentRestrictions: { country: 'ZA' }};

    constructor(
      private verificationService: VerificationService, 
      public bsModalRef: BsModalRef, 
      private upSvc: UploadService,
      private userService: UserService,
      private settings: SettingsService
    ) {
        console.log('AddVerificationComponent Lanuched')
      }

    getFormattedAddress(event: any) {
      this.verification.address = event
      console.log(event);
  }   
    detectFiles(event) {
      event.target.files[0].fileName = event.target.files[0].name
      this.uploadQue.push(event.target.files[0]);
    }

    fileChange(index, file){
      this.uploadQue[index] = file
      console.log(this.uploadQue)
    }

    removeFile(index){
        _.pullAt(this.uploadQue, index)
        console.log(index)
    }

    public saveVerification(){
      this.verificationService.setVerifications(this.verification)
      .then((response:any) => {
        this.upSvc.pushUploadQue(this.uploadQue, response.id)
        this.verification = {}
        this.uploadQue = []
      })
      .catch(err=>{
        console.log(err)
      })
    }
    ngOnInit() {
      this.user = this.userService.userConfig
      this.lists = this.settings.bankList
      this.accounts= this.settings.accountList
    }
  }