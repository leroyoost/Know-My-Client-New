import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification';
import { VerificationService } from '../verifications.service';
import { PdfService } from '../pdf.service';
import { UserService } from '../../../core/user/user.service';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
@Component({
  selector: 'app-request-modal',
  templateUrl: './request.component.html',
  styleUrls: ['./full.component.scss']
})

export class RequestComponent {
  verification: any = {};
  isAdmin = false;
  data: any = {};
  response: any;

  constructor(
    public requestModalRef: BsModalRef,
    private modalService: BsModalService,
    public user: UserService,
    public verificationService: VerificationService,
    private pdf: PdfService
  ) {
    console.log('RequestComponent Lanuched');
  }

  createPdf() {
    this.pdf.generatePdf(this.response , this.verification.ref);
  }

  idVerify(idNo) {
    this.verificationService.apiCall('idVerify', { 'idNo': idNo })
      .then(response => {
        console.log(response);
        this.response = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
