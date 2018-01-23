import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Company } from '../../../../shared/models/company'
  @Component({
      selector: 'user-details-modal',
      templateUrl: './user-details-modal.component.html',
      styleUrls: ['../users.component.scss']
  })

  export class DetailsUserComponent {
    public verification:  any = {};

    constructor(public bsModalRef: BsModalRef) {
      console.log('DetailsModalComponent Lanuched')
      console.log(this.verification)
    }
  }