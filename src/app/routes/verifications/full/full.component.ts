import { Component, OnInit } from '@angular/core';
import { VerificationService } from '../verifications.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DetailsComponent } from './details.component'
import { AddComponent } from './add.component'
import { Verification } from "../../../shared/models/verification"
import { ModalConfig } from "../../../shared/models/modal"
import { Observable } from "rxjs"

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  verifications: Observable<{}>
  DetailsModalRef: BsModalRef;
  AddModalRef: BsModalRef;
  constructor(
    private verificationService: VerificationService, 
    private modalService: BsModalService
  ) {}

  public addModal(){
    this.AddModalRef = this.modalService.show(AddComponent,Object.assign({}, ModalConfig, {class: 'modal-lg'}));
  }

  public detailsModal(verification:Verification) {
      console.log('deatilsModal Launched')
      console.log(verification.$key)
      this.DetailsModalRef = this.modalService.show(DetailsComponent,Object.assign({}, ModalConfig, {class: 'modal-lg'}));
      this.DetailsModalRef.content.verification = verification
  }

  ngOnInit(): void {
    console.log('FullComponent ngOnInit fired')
    this.verifications = this.verificationService.getVerifications('full')
  }

}
