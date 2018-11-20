import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AssociatedReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

    user: any;
    userConfig: Observable<{}>;
    idToken: string;

    constructor(
        private afs: AngularFirestore,
        private auth: AngularFireAuth,
        private router: Router
    ) {
        this.user = this.getUser();
    }

    getLegal() {
        return this.afs.collection('config').doc('legal').valueChanges();
    }

    getUser() {
        return new Observable (($user) => {  this.auth.authState.subscribe(
                (userResponse: firebase.User) => {
                    console.log('authstate changed');
                    if (userResponse) {
                        console.log(userResponse.uid);
                        this.afs.collection('users').doc(userResponse.uid).update({lastLogin: new Date().getTime()})
                            .then(response => {console.log('login captured successfully: ' + response); })
                            .catch(err => {console.log('error capturing login: ' + err.message); });
                        this.afs.collection('users').doc(userResponse.uid).valueChanges().subscribe(
                            (userConf: any) => {
                                this.afs.collection('companies').doc(userConf.companyId).valueChanges().subscribe(
                                    (companyInfo: any) => {
                                        const newData = userConf;
                                        newData.companyName = companyInfo.text;
                                        newData.primary = companyInfo.primary;
                                        newData.primary = companyInfo.secondary;
                                        newData.logo = companyInfo.logo;
                                        this.auth.idToken.subscribe(
                                            idToken => {
                                                newData.idToken = idToken;
                                                this.user = userConf;
                                                $user.next (newData);
                                            }
                                        );
                                    });
                            },
                            err => {
                                console.log(err);
                                return(err);
                            }
                        );
                    } else {
                        if (this.router.url.indexOf('/login') > -1) {
                            this.router.navigate(['verifications']);
                        } else {
                            this.router.navigate(['login']);
                            console.log('no user');
                            return(null);
                        }
                    }
                },
                err => {
                    this.router.navigate(['login']);
                    console.log(err);
                    return(err);
                });
            });
    }
    logout() {
        this.auth.auth.signOut();
    }
}

