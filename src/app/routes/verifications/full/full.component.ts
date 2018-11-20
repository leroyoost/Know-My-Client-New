import { Component, OnInit } from '@angular/core';
import { VerificationService } from '../verifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../../core/user/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DetailsComponent } from './details.component';
import { AddComponent } from './add.component';
import { Verification } from '../../../shared/models/verification';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  verifications: Observable<{}>;
  DetailsModalRef: BsModalRef;
  AddModalRef: BsModalRef;
  loading = false;
  constructor(
    private verificationService: VerificationService,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  public addModal() {
    this.AddModalRef = this.modalService.show(AddComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
  }

  public detailsModal(verification: Verification) {
      if (this.userService.user.isAdmin && verification.status === 'new') {
        this.loading = true;
        console.log('updating to pending');
        this.verificationService.updateVerification([], verification, 'pending')
          .then(response => {
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }else {this.loading = false; }
      console.log('deatilsModal Launched');
      this.DetailsModalRef = this.modalService.show(DetailsComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
      this.DetailsModalRef.content.verification = verification;
      this.DetailsModalRef.content.isAdmin = this.userService.user.isAdmin;
  }

  ngOnInit(): void {
    console.log('FullComponent ngOnInit fired');
    this.verifications = this.verificationService.getVerifications('verifications');
  }

}
