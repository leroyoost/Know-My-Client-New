import { Injectable, Component} from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from "../../shared/models/user";
import { UserService } from '../../core/user/user.service'

@Injectable()
export class UsersService {
    user: Observable<firebase.User>;
    userList: Observable<User[]>

    constructor(
        public afs: AngularFirestore, 
        public afAuth: AngularFireAuth,
        public userService: UserService
    )
        {
        this.userList = afs.collection('users').valueChanges();
        this.user = afAuth.authState;
        console.log(this.user)
      }

    public getUsers(): Observable<User[]>{
        return this.userList
    }
    public createUser(user) {
            user.status = 'Created'
            user.created = {
                uid: this.userService.user.uid,
                name: this.userService.user.displayName,
                time: new Date()
            }
            this.afs.collection('users').add(user)
                .then(result=>console.log(result))
                .catch(err=>console.log(err))
    }

    public getCurrentUser(){
    
    }

}