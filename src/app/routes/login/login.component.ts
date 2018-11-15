import { Component, OnInit, Injector } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    email: string;
    password: string;
    public alerts: any = [];

    constructor(
        public settings: SettingsService,
        public fb: FormBuilder,
        public router: Router,
        public afAuth: AngularFireAuth,
        public injector: Injector
    ) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

    loginWithEmail() {
        if (this.valForm.valid) {
            this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                this.afAuth.auth
                .signInWithEmailAndPassword(this.email, this.password)
                .then(value => {
                    this.router.navigate(['app/verification/full']);
                })
                .catch(err => {
                    this.alerts.push({
                        type: 'warning',
                        msg: 'Login failed: ' +  err.message,
                        timeout: 5000
                    });
                });
            })
            .catch(err => {
                this.alerts.push({
                    type: 'warning',
                    msg: 'Login failed: ' +  err.message
                });
            });
        } else {
            console.log('form not valid');
        }
      }

    ngOnInit() {
        this.router = this.injector.get(Router);
    }

}
