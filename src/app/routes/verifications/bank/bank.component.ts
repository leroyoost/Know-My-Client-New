import { Component, OnInit } from '@angular/core';
import { VerificationService } from '../verifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../../core/user/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DetailsComponent } from './details.component';
import { AddComponent } from './add.component';
import { Verification } from '../../../shared/models/verification';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-full',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

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
      console.log('deatilsModal Launched');
      this.DetailsModalRef = this.modalService.show(DetailsComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
      this.DetailsModalRef.content.verification = verification;
      this.DetailsModalRef.content.isAdmin = this.userService.user.isAdmin;
  }

  ngOnInit(): void {
    console.log('BankComponent ngOnInit fired');
    this.verifications = this.verificationService.getVerifications('verifications_bank');
  }

}
