import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification';
import { VerificationService } from '../verifications.service';
import { PdfService } from '../pdf.service';
import { UserService } from '../../../core/user/user.service';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs';
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
  traceResponse: any;
  verifyResponse: any;
  loading = false;

  constructor(
    public requestModalRef: BsModalRef,
    private modalService: BsModalService,
    public user: UserService,
    public verificationService: VerificationService,
    private pdf: PdfService
  ) {
    console.log('RequestComponent Lanuched');
  }

  createPdf(data) {
    this.pdf.generatePdf(data, this.verification.ref);
  }

  idVerify(idNo) {
    this.loading = true;
    this.verificationService.apiCall('idVerify', { 'idNo': idNo })
      .then(response => {
        this.loading = false;
        console.log(response);
        this.verifyResponse = response;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  }
  idTrace(idNo) {
    this.loading = true;
    this.verificationService.apiCall('idTrace', { 'idNo': idNo })
      .then(response => {
        this.loading = false;
        console.log(response);
        this.traceResponse = response;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  }

}
