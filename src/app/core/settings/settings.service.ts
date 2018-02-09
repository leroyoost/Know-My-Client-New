import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AssociatedReference } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

declare var $: any;

@Injectable()
export class SettingsService {

    
    public user: firebase.User;
    public app: any;
    public layout: any;
    public configRef: AngularFirestoreCollection<any>;
    public userSettings: Observable<{}>;
    public existingList: {};
    public companies$: Observable<any>;
    public companiesRef: AngularFirestoreCollection<any>;
    public configLists$: Observable<any>

    constructor(
        public afs: AngularFirestore, 
        public afAuth: AngularFireAuth,
        public router: Router
    ){

        console.log('SettingsService constructor fired')
        // App Settings
        // ---------------------------------
        this.app = {
            name: 'Know My Client',
            description: 'Client Verifications Powered by Identity Guard',
            year: ((new Date()).getFullYear())
        };

        // App Config from FireStore
        //--------------------------------
        
        this.companiesRef = this.afs.collection('companies')
        this.companies$ = this.companiesRef.valueChanges()
        this.configRef = this.afs.collection('config')
        this.configLists$ = this.configRef.doc('lists').valueChanges()
        this.configRef.doc('lists').valueChanges().subscribe(response=>{
            this.existingList = response
          },err=>console.log(err))

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: true,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

    }

    getCurrentUser():Observable<firebase.User>{
        return this.afAuth.authState
    }

    configListAdd(list,value){
        this.existingList[list.toLocaleLowerCase()].push(value)
        this.configRef.doc('lists').set(this.existingList)
    }

    configListRemove(list,i){
        this.existingList[list.toLocaleLowerCase()].splice(i,1)
        this.configRef.doc('lists').set(this.existingList)
    }

    createUser(email, password, name:string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user=>{
            this.afAuth.auth.currentUser.updateProfile({
                displayName: name,
                photoURL: "none"
            })
        })
        .catch(function(error) {
            console.log(error.message)
          });
    }
    getUserSetting(email : string) {
        this.userSettings = this.afs.collection('users').doc(this.user.uid).valueChanges()
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(uid: string) {
        //console.log(uid)
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}
