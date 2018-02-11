import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
         ) { }

  public logout() {
    this.auth.auth.signOut().then(
      response => {
        console.log(response);
        this.router.navigate(['login']);

      }
    );
  }

  ngOnInit() {
  }

}
