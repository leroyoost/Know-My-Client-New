import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { Papa } from 'ngx-papaparse';
import { FileSaverService } from 'ngx-filesaver';

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
  verification: any = {}
  uploadQue: File[] = [];
  user: Observable<{}>;
  lists: Observable<any>;
  ref: string;
  loading = false;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private settings: SettingsService,
    private papa: Papa,
    private _FileSaverService: FileSaverService
  ) {
    console.log('ExportConsumerComponent Lanuched');
  }

  public exportRecords() {
    this.verifications.subscribe((data) => {
      var outputList = []
      data.forEach(function(verificaiton){
        var i = 1
        verificaiton.address.forEach(address => {
          const strAddress = _.without(_.flatten(_.values(address)), ["", [], " "]).join(", ")
          verificaiton['Address '+i] = strAddress
          i ++
        })
        var i = 1
        verificaiton.telephone.forEach(telephone => {
          const strPhone = _.without(_.flatten(_.values(telephone)), ["", [], " "]).join(", ")
          verificaiton['Telephone '+i] = strPhone
          i ++
        })
        verificaiton.updated_date = verificaiton.updated_date.seconds * 1000
        delete verificaiton.address
        delete verificaiton.telephone
        console.log(verificaiton)
      });
      const fileName = (this.verification.batch? this.verification.batch  : 'exportAll') + `.csv` 
      const fileType = this._FileSaverService.genType(fileName);
      const txtBlob = new Blob([this.papa.unparse(_.where(data,{"batch" : this.verification.batch}))], { type: fileType });
      this._FileSaverService.save(txtBlob, fileName);
    })
  }

  ngOnInit() {
    this.user = this.userService.userConfig;
    this.lists = this.settings.configLists$;
  }
}
