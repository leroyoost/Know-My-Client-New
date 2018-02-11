import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AssociatedReference } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  user: firebase.User;
  userConfig: Observable<{}>;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {

    this.auth.auth.onAuthStateChanged(
      user => {
          if (user) {
              console.log(user);
              this.user = user;
              this.userConfig = this.afs.collection('users').doc(user.uid).valueChanges();
              console.log(this.router.url);
              if (this.router.url.indexOf('/login') > -1 ) {
                  console.log('yes');
                  this.router.navigate(['verifications']);
              }
          } else {
              this.router.navigate(['login']);
          }
      },
      err => {
          console.log(err);
          this.router.navigate(['login']);
      }
    );
  }

  public isAdmin() {
    return new Observable((observer => {
        this.auth.auth.onAuthStateChanged(user => {
            if (user) {
                this.afs.collection('users').doc(user.uid).valueChanges().subscribe((details: any) => {
                    console.log(details);
                    observer.next(details.isAdmin);
                },
            err => {
                console.log(err);
                observer.error(err);
            });
            }
        });
    })
    );
}
}
