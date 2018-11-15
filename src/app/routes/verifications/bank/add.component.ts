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
  selector: 'app-bank-add-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [VerificationService]
})

export class AddComponent implements OnInit {
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  verification: any = {};
  user: Observable<{}>;
  lists: Observable<any>;
  ref: string;
  public options = { type: 'address', componentRestrictions: { country: 'ZA' } };
  loading = false;

  constructor(
    private verificationService: VerificationService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private settings: SettingsService
  ) {
    console.log('AddBankComponent Lanuched');
    this.ref = verificationService.generaterRef();
    this.verification.ref = this.ref;
  }

  public saveVerification(type: string) {
    this.loading = true;
    this.verification.type = type;
    this.verificationService.createBankVerification(this.verification)
      .then((response: any) => {
        console.log('firestore response received:');
        console.log(response);
        this.verification = {};
        this.ref = this.verificationService.generaterRef();
        this.verification.ref = this.ref;
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
