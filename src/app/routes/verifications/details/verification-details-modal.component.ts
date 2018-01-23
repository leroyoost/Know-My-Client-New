import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification'
  @Component({
      selector: 'details-modal',
      templateUrl: './verification-details-modal.component.html',
      styleUrls: ['../verifications.component.scss']
  })

  export class DetailsVerificationComponent {
    verification:  any = {};
    constructor(public bsModalRef: BsModalRef) {
      console.log('DetailsModalComponent Lanuched')
      console.log(this.verification)
    }
    public savePdf(){
    }
  }