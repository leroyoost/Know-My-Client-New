import { Component, OnInit } from '@angular/core';
import { VerificationService } from './verifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DetailsVerificationComponent } from './details/verification-details-modal.component'
import { AddVerificationComponent } from './add/verification-add-modal.component'
import { Verification } from "../../shared/models/verification"
import { Observable } from "rxjs"


@Component({
  selector: 'app-standard',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss'],
  providers: [VerificationService]
})
export class VerificationsComponent implements OnInit {

  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  }
  verifications: Observable<{}>
  DetailsModalRef: BsModalRef;
  AddModalRef: BsModalRef;
  constructor(
    private verificationService: VerificationService, 
    private modalService: BsModalService
  ) {}

  public addModal(){
    this.AddModalRef = this.modalService.show(AddVerificationComponent,Object.assign({}, this.config, {class: 'modal-lg'}));
  }

  public detailsModal(verification:Verification) {
      console.log('deatilsModal Launched')
      console.log(verification.$key)
      this.DetailsModalRef = this.modalService.show(DetailsVerificationComponent,Object.assign({}, this.config, {class: 'modal-lg'}));
      this.DetailsModalRef.content.verification = verification
  }
  getVerifications(){
    this.verifications = this.verificationService.getVerifications();
    console.log(this.verifications)
  }

  ngOnInit(): void {
    console.log('VerificationComponent ngOnInit fired')
    this.getVerifications()
  }

}
