import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
         ) { }

  ngOnInit() {
  }

}
