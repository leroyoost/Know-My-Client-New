import { Injectable, Component} from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
