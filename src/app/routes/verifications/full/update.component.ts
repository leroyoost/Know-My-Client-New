import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service'
import { VerificationService } from '../verifications.service'
import { Observable } from 'rxjs'
import * as _ from "lodash";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./full.component.scss']
})
export class UpdateComponent implements OnInit {
  
  verification:  any = {};
  mode: string = ""
  uploadQue: File[] = [];
  lists: Observable<any>;
  note: string

  constructor(
    public bsModalRef: BsModalRef,
    public userService: UserService,
    public settingsService: SettingsService,
    public verificationService: VerificationService
  ) {

  }
  detectFiles(event) {
    console.log(event.target.files)
    for (var i = 0; i < event.target.files.length; i++) { 
      event.target.files[i].fileName = event.target.files[i].name
      var file = event.target.files[i]
      this.uploadQue.push(file)
    }
  }

  fileChange(index, file){
    this.uploadQue[index] = file
    console.log(this.uploadQue)
  }

  removeFile(index){
      _.pullAt(this.uploadQue, index)
      console.log(index)
  }
  submitUpdate(){
    //this.verificationService.updateVerification(this.uploadQue,this.verification,this.mode,this.note)
  }

    ngOnInit() {
      this.lists = this.settingsService.configLists$
    }
}
