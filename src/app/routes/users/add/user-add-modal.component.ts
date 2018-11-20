import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UsersService } from '../users.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs';
import { SideMenu} from '../../../shared/models/sidemenu';
declare var require: any;
const swal = require('sweetalert');

  @Component({
      selector: 'app-add-user-modal',
      templateUrl: './user-add-modal.component.html',
      styleUrls: ['../users.component.scss'],
      providers: [UsersService, SettingsService]
  })

  export class AddUserComponent implements OnInit {

    verificationTypes: string[];
    user: User = {};
    companies: Observable<any>;
    selectedCompany: {} = {};
    loading = false;

    constructor(
      private usersService: UsersService,
      public bsModalRef: BsModalRef,
      public settings: SettingsService
    ) {
      this.companies = this.settings.companies$;
      this.user.sidemenu = SideMenu;
    }

    public selectCompany(company) {
      this.user.companyId = company.id;
      this.user.companyName = company.text;

      console.log(this.user);
    }

    public saveUser() {
      this.loading = true;
      this.usersService.createUser(this.user)
        .then(result => {
          this.loading = false;
          swal('Success!', 'User Created', 'success');
          this.bsModalRef.hide();
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          swal('Error!', err, 'error');
        });
    }
    ngOnInit() {
  }
  }
