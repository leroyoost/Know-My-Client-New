import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user'
import { UsersService } from './users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DetailsUserComponent } from './details/user-details-modal.component'
import { AddUserComponent } from './add/user-add-modal.component'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  }
  users: Observable<User[]>
  DetailsModalRef: BsModalRef;
  AddModalRef: BsModalRef;

  constructor(
    private usersService: UsersService, 
    private modalService: BsModalService) {
      
    }

  public addUserModal(){
    this.AddModalRef = this.modalService.show(AddUserComponent,Object.assign({}, this.config, {class: 'modal-lg'}));
  }

  public userDetailsModal(user:User) {
      console.log('deatilsModal Launched')
      this.DetailsModalRef = this.modalService.show(DetailsUserComponent);
      this.DetailsModalRef.content.user = user
  }
  getUsers(){
    this.users = this.usersService.getUsers();
  }

  ngOnInit(): void {
    this.getUsers()
  }

}
