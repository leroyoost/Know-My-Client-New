import { Component, OnInit } from '@angular/core';
import { VerificationService } from '../verifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../../core/user/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AddComponent } from './add.component';
import { ExportComponent } from './export.component';
import { DetailsComponent } from './details.component';
import { Verification } from '../../../shared/models/verification';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-full',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {

  verifications: Observable<{}>;
  DetailsModalRef: BsModalRef;
  AddModalRef: BsModalRef;
  ExportModalRef: BsModalRef;
  loading = false;
  constructor(
    private verificationService: VerificationService,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  public addModal() {
    this.AddModalRef = this.modalService.show(AddComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
  }

  public exportModal() {
    this.verificationService.getVerifications('verifications_consumer').subscribe(res => {
      console.log(res)
      this.ExportModalRef = this.modalService.show(ExportComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
      this.ExportModalRef.content.verifications = res
    })
  }

  public detailsModal(verification: Verification) {
      console.log('deatilsModal Launched');
      this.DetailsModalRef = this.modalService.show(DetailsComponent, Object.assign({}, ModalConfig, {class: 'modal-lg'}));
      this.DetailsModalRef.content.verification = verification;
      this.DetailsModalRef.content.isAdmin = this.userService.user.isAdmin;
  }

  ngOnInit(): void {
    console.log('BankComponent ngOnInit fired');
    this.verifications = this.verificationService.getVerifications('verifications_consumer');
  }

}
