import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { Papa } from 'ngx-papaparse';

declare var require: any;
const swal = require('sweetalert');


@Component({
  selector: 'app-consumer-add-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [VerificationService]
})

export class AddComponent implements OnInit {
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  verifications: any [];
  uploadQue: File[] = [];
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
    private settings: SettingsService,
    private papa: Papa
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

  public parse(files: FileList): void {
    console.log('parse fired')
    const file: File = files.item(0);
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
        const csv = reader.result;
        console.log(csv)
        this.papa.parse(csv,{
            complete: (result) => {
                this.verifications = result.data
                console.log(this.verifications)
            },
            header: true,
            
        });
      }
    }
  
  public uploadBatch(batch){
    this.loading = true;
    this.verificationService.createConsumerTraceBatch(batch)
    .then(response =>{
      this.loading = false;
      swal('Success!', 'Batch Uploaded Successfully', 'success');
    })
    .catch(err =>{
      this.loading = false;
      console.log(err)
      swal('Error!',err.message, 'error');
    })
  }
  ngOnInit() {
    this.user = this.userService.userConfig;
    this.lists = this.settings.configLists$;
  }
}
