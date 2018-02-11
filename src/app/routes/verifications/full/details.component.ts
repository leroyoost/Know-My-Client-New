import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UpdateComponent } from './update.component';
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
    isAdmin: Observable<any>;

    constructor(
      public updateModalRef: BsModalRef,
      private modalService: BsModalService,
      public user: UserService,
      public verificationService: VerificationService
    ) {
      console.log('DetailsModalComponent Lanuched');
      console.log(this.verification);
      this.isAdmin = this.user.isAdmin();

      if (this.isAdmin && this.verification.status === 'new') {
        // this.verificationService.updateVerification(this.verification, 'pending')
      }

    }
    public savePdf() {
    }
    public updateModal(verification, string, mode) {
      this.updateModalRef = this.modalService.show(UpdateComponent, Object.assign({}, ModalConfig, {class: 'modal-md'}));
      this.updateModalRef.content.verification = verification;
      this.updateModalRef.content.string = string;
      this.updateModalRef.content.mode = mode;
    }
  }
