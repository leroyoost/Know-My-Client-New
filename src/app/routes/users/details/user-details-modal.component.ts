import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../../../shared/models/user';
import { UsersService } from '../users.service';
import { SideMenu } from '../../../shared/models/sidemenu';
declare var require: any;
const swal = require('sweetalert');
  @Component({
      selector: 'app-user-details-modal',
      templateUrl: './user-details-modal.component.html',
      styleUrls: ['../users.component.scss']
  })

  export class DetailsUserComponent {
    user:  any = {};
    menuOptions: any[] = SideMenu;
    loading = false;
    constructor(
      private usersService: UsersService,
      public bsModalRef: BsModalRef
    ) {
      console.log('DetailsModalComponent Lanuched');
    }

    updateUser() {
      this.loading = true;
      this.usersService.updateUser(this.user)
        .then(result => {
          this.loading = false;
          swal('Success!', 'User Updated', 'success');
          this.bsModalRef.hide();
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          swal('Error!', err, 'error');
        });
    }

  }
