import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UpdateComponent } from './update.component';
import { RequestComponent } from './request.component';
import { Verification } from '../../../shared/models/verification';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';
  @Component({
      selector: 'app-details-modal',
      templateUrl: './details.component.html',
      styleUrls: ['./full.component.scss']
  })

  export class DetailsComponent {
    verification:  any = {};
    isAdmin = false;
    constructor(
      public updateModalRef: BsModalRef,
      public requestModalRef: BsModalRef,
      private modalService: BsModalService,
      public user: UserService,
      public verificationService: VerificationService
    ) {
      console.log('DetailsModalComponent Lanuched');
      console.log(this.verification);
    }
    public savePdf() {
    }
    public requestModal(verification) {
       this.requestModalRef = this.modalService.show(RequestComponent, Object.assign({}, ModalConfig, {class: 'modal-md'}));
       this.requestModalRef.content.verification = verification;
    }
    public updateModal(verification, string, mode) {
      this.updateModalRef = this.modalService.show(UpdateComponent, Object.assign({}, ModalConfig, {class: 'modal-md'}));
      this.updateModalRef.content.verification = verification;
      this.updateModalRef.content.string = string;
      this.updateModalRef.content.mode = mode;
    }
  }
