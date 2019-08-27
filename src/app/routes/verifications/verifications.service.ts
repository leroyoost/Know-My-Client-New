import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SettingsService } from '../../core/settings/settings.service';
import { UserService } from '../../core/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Verification } from '../../shared/models/verification';
import { Upload } from '../../shared/models/verification';
import * as firebase from 'firebase/app'; // for typings
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';


@Injectable()
export class EventService {
  constructor(
    private settings: SettingsService,
    private userService: UserService
  ) { }

  public getEvent(ref: string, note: string, attachment: any[], user) {
    return {
      new: {
        'created': new Date().getTime(),
        'heading': user + ' submitted a new verification',
        'primary': 'The details have been sent to Know My Client with reference number ' + ref,
        'secondary': note ? note : '',
        'icon': 'icon-plus',
        'colour': 'info',
        'attachment': attachment
      },
      pending: {
        'created': new Date().getTime(),
        'heading': 'Verification has been picked up and is being processed',
        'primary': user + ' from Know My Client has started an investigation',
        'icon': 'icon-refresh',
        'colour': 'warning'
      },
      verified: {
        'created': new Date().getTime(),
        'heading': 'Verification successful',
        'primary': 'The identitiy details submitted have been confirmed',
        'secondary': note ? note : '',
        'icon': 'icon-check',
        'colour': 'success',
        'attachment': attachment
      },
      rejected: {
        'created': new Date().getTime(),
        'heading': 'Alert! This identity could not be verified',
        'primary': 'Do not complete transaction without further investigation',
        'secondary': note,
        'icon': 'icon-close',
        'colour': 'danger',
        'attachment': attachment
      },
      note: {
        'created': new Date().getTime(),
        'heading': user + ' added the following note:',
        'primary': '',
        'secondary': note,
        'icon': 'icon-info',
        'colour': 'info',
        'attachment': attachment
      }
    };
  }
}

@Injectable()
export class VerificationService {
  verificationList: Observable<any>;
  userConfig: any;
  currentUpload: Upload;
  uploads: Observable<any>;
  test: Observable<any>;
  user: any;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private settings: SettingsService,
    private eventService: EventService,
    private userService: UserService,
    private auth: AngularFireAuth,
    public http: HttpClient
  ) {

  }

  public generaterRef() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public getVerifications(veriType): Observable<any> {
    console.log('getVerifications')
    return new Observable((observer) => {
      this.auth.auth.onAuthStateChanged(user => {
        if (user) {
          this.afs.collection('users').doc(user.uid).valueChanges().subscribe((response: any) => {
            this.afs.collection(veriType).valueChanges().subscribe(verifications => {
                observer.next(verifications);
            });
          }, err => {
            console.log(err);
            return err;
          });
        }
      });
    });
  }

  uploadFiles(uploadQue, companyId, ref): Promise<any> {
    console.log('uploadFiles Fired');
    if (uploadQue.length > 0) {
      const promiseList = [];
      const storageRef = this.afStorage.storage.ref('uploads');
      uploadQue.forEach(file => {
        promiseList.push(new Promise((res, rej) => {
        console.log('uploading: ' + file.fileName);
        this.currentUpload = new Upload(file);
        const uploadRef = storageRef.child(companyId).child(ref).child(file.fileType + file.FileName + new Date());
        const uploadTask = uploadRef.put(this.currentUpload.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot: any) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function(error) {
          console.log(error);
          rej(error);
        },
        function() {
          console.log(uploadTask.snapshot.downloadURL);
          res({
            'fileUrl': uploadTask.snapshot.downloadURL,
            'created': new Date().getTime(),
            'fileName': file.fileName,
            'fileType': file.fileType
          });
        });
      }));
    });
      return Promise.all(promiseList);
    } else {
      return new Promise((resolve) => resolve([]));
    }
  }

  createFileEvent(fileList, ref, status, note?) {
    console.log('createFileEvent Fired');
    console.log(fileList);
    return (this.eventService.getEvent(ref, note, fileList, this.user.displayName)[status]);
  }

  getCoId(uid) {
    console.log('getCoId Fired');
    return new Promise((res, rej) => {
      this.afs.collection('users').doc(uid).valueChanges().subscribe(
        (userData: any) => {
          console.log(userData.companyId);
          res(userData.companyId);
        },
        err => {
          console.log(err);
          rej(err);
        }
      );
    });
  }

  getUid(): Promise<string> {
    console.log('getUid Fired');
    return new Promise((res, rej) => {
      this.auth.auth.onAuthStateChanged(
        user => {
          if (user) {
            console.log(user.uid);
            this.user = user;
            res(user.uid);
          } else {}
        },
        err => {
          rej(err);
          console.log(err);
        }
      );
    });
  }

  // Uploads files and returns an event object with notes and attachments
  fileHandler(uploadQue, ref, status, note?) {
    console.log('fileHandler Fired');
    return new Promise((resolve, reject) => {
    this.getUid()
      .then(uid => {
        return this.getCoId(uid)
          .then(coId => {
            return this.uploadFiles(uploadQue, coId, ref)
              .then(fileList => {
                console.log('fileupload returned');
                console.log(fileList);
                resolve(this.createFileEvent(fileList, ref, status, note));
              })
             .catch(err => {reject(err); });
          })
          .catch(err => {reject(err); });
      })
      .catch(err => {reject(err); });
    });
  }

  public createNewVerification(uploadQue, verification: Verification, veriType, note?): PromiseLike<any> {
    verification.events = [];
    verification.notes = [];
    verification.created_date = new Date().getTime();
    verification.type = veriType;
    verification.status = 'new';

    return this.fileHandler(uploadQue, verification.ref, verification.status, note)
      .then(fileEvent => {
        verification.created_uid = this.user.uid;
        verification.created_name = this.user.displayName;
        verification.events.push(fileEvent);
        console.log(verification);
        return (this.afs.collection('verifications').add(verification));
      })
      .catch(err => {
        return(err);
      });
  }

  public updateVerification(uploadQue, verification: Verification, status, note?): Promise<any> {
    return new Promise((resolve, reject) => {
        return(this.fileHandler(uploadQue, verification.ref, status, note)
        .then(fileEvent => {
          verification.events.push(fileEvent);
          if (status !== 'note') {verification.status = status; }
          verification.updated_date = new Date().getTime();
          resolve (this.afs.collection('verifications').doc(verification.id).update(verification));
        })
        .catch(err => {
          reject(err);
        })
      );
    });
  }
  public createBankVerification (verification) {
    verification.status = 'new';
    verification.created_date = new Date().getTime();
    return this.afs.collection('verifications_bank').add(verification);
  }
  public createConsumerTraceBatch (batch) {
    var batchMap =[]
    const batchNo = this.generaterRef()
    batch.forEach(verification => {
      verification.batch = batchNo
      verification.ref = this.generaterRef()
      verification.status = 'new';
      verification.created_date = new Date().getTime();
      batchMap.push(this.afs.collection('verifications_consumer').add(verification));
    }) 
    return Promise.all(batchMap)
  }

  public apiCall (endpoint: string, data: {}) {
    const idToken = this.userService.user ? this.userService.user.idToken : null;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${idToken}`
      })
    };
    return this.http.post(environment.cloudFunctions + endpoint, data, httpOptions).toPromise();
  }
}
