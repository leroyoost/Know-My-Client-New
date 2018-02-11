import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UsersService } from '../users.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { User } from '../../../shared/models/user';
import { Observable } from 'rxjs/Observable';
import { configItems} from './models';

  @Component({
      selector: 'app-add-user-modal',
      templateUrl: './user-add-modal.component.html',
      styleUrls: ['../users.component.scss'],
      providers: [UsersService, SettingsService]
  })

  export class AddUserComponent implements OnInit {

    configItems: {};
    verificationTypes: string[];
    newUser: User = {};
    companies: Observable<any>;
    selectedCompany: {} = {};

    constructor(
      private usersService: UsersService,
      public bsModalRef: BsModalRef,
      public settings: SettingsService
    ) {
      this.configItems = configItems;
      this.companies = this.settings.companies$;
      this.newUser.access = {};
    }

    public updateAccess(list) {
      const that = this;
      this.newUser.access[list] = [];
      this.configItems[list].forEach(function(listItem) {
        if (listItem.active) {
          that.newUser.access[list].push(listItem);
        }
      });
      console.log(this.newUser);
    }
    public selectCompany(company) {
      this.newUser.companyId = company.id;
      this.newUser.companyName = company.text;

      console.log(this.newUser);
    }


    public saveUser() {
        // this.settingsService.createUser('leroyoost@gmail.com','Investec123','Leroy Oosthuyzen')
        this.usersService.createUser(this.newUser);
    }
    ngOnInit() {
  }
  }
