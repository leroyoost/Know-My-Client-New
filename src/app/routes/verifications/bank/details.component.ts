import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';
  @Component({
      selector: 'app-details-modal',
      templateUrl: './details.component.html',
      styleUrls: ['./bank.component.scss']
  })

  export class DetailsComponent {
    verification:  any = {};
    isAdmin = false;
    constructor(
      private bsModalRef: BsModalRef,
      private modalService: BsModalService,
      public user: UserService,
      public verificationService: VerificationService
    ) {
      console.log('DetailsModalComponent Lanuched');
      console.log(this.verification);
    }
    public generatePdf() {
    }
  }
