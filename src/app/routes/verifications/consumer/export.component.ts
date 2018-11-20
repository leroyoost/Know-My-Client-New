import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Papa } from 'ngx-papaparse';
//import { FileSaverService } from 'ngx-filesaver';

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
    private papa: Papa,
    //private _FileSaverService: FileSaverService
  ) {
    console.log('ExportConsumerComponent Lanuched');
  }

  public exportRecords(verifications){
    const fileName = `save.csv`;
    //const fileType = this._FileSaverService.genType(fileName);
    //const txtBlob = new Blob([this.papa.unparse(verifications)], { type: fileType });
    //this._FileSaverService.save(txtBlob, fileName);
  }

  ngOnInit() {
    this.user = this.userService.userConfig;
    this.lists = this.settings.configLists$;
  }
}
