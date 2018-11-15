import { Injectable, Component} from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../../shared/models/user';
import { UserService } from '../../core/user/user.service';

@Injectable()
export class UsersService {
    user: Observable<firebase.User>;
    userList: Observable<User[]>;
    loading = false;
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public userService: UserService
    ) {
        this.userList = afs.collection('users').valueChanges();
        this.user = afAuth.authState;
        console.log(this.user);
      }

    public getUsers(): Observable<User[]> {
        return this.userList;
    }

    public createUser(user) {
        user.status = 'Created';
        user.created = {
            uid: this.afAuth.auth.currentUser.uid,
            name: this.afAuth.auth.currentUser.displayName,
            time: new Date().getTime()
        };
        return (this.afs.collection('users').add(user));
    }

    public resetPassword(user) {
        return this.afAuth.auth.sendPasswordResetEmail(user.email);
    }
    public updateUser(user) {
        user.updated = {
            uid: this.afAuth.auth.currentUser.uid,
            name: this.afAuth.auth.currentUser.displayName,
            time: new Date().getTime()
        };
        return (this.afs.collection('users').doc(user.id).update(user));
    }

}
