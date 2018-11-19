import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Papa } from 'ngx-papaparse';

declare var require: any;
const swal = require('sweetalert');


@Component({
  selector: 'app-consumer-export-modal',
  templateUrl: './export.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [VerificationService]
})

export class ExportComponent implements OnInit {
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  verifications: any = [];
  uploadQue: File[] = [];
  verification: any = {};
  user: Observable<{}>;
  lists: Observable<any>;
  ref: string;
  loading = false;

  constructor(
    private verificationService: VerificationService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private settings: SettingsService,
    private papa: Papa
  ) {
    console.log('ExportConsumerComponent Lanuched');
  }

  public exportRecords(verifications){
      console.log('export fired')
      console.log(verifications)
      console.log(this.papa.unparse(verifications))
  }

  ngOnInit() {
    this.user = this.userService.userConfig;
    this.lists = this.settings.configLists$;
  }
}
