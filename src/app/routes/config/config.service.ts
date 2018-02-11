import { Injectable, Component} from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Company } from '../../shared/models/company';


@Injectable()
export class ConfigService {

  config: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.config = this.afs.collection('config').valueChanges();
  }

  createCo(company) {
    this.afs.collection('config').doc('companies').set(company);
  }
}
