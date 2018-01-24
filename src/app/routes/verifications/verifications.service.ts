import { Injectable } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service'
import { UserService } from '../../core/user/user.service'
import { AngularFirestore} from 'angularfire2/firestore';
import { Verification } from '../../shared/models/verification'
import { Upload } from '../../shared/models/verification'
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";


@Injectable()
export class UploadService {
  currentUpload: Upload;
  uploads: Observable<any>
  basePath: string = '/uploads';
  constructor( 
    private settings:SettingsService, 
    private afs: AngularFirestore, 
    private fb: FirebaseApp,
    private userService: UserService
  ) { }
  
  pushUploadQue(uploadQue: any[], dbKey:string){
    let files = uploadQue
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      let storageRef = this.fb.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/` + this.settings.user.uid + '/' + `${this.currentUpload.file.name}/`).put(this.currentUpload.file);
      uploadTask.on('state_changed',
        (snapshot: any) =>  {
          // upload in progress
          this.currentUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error)
        },
        () => {
          // upload success
          console.log(uploadTask.snapshot)
          this.currentUpload.file.url = uploadTask.snapshot.downloadURL
          this.saveFileData(this.currentUpload.file, dbKey)
        }
      );
    });
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: File, dbKey:string ) {
    console.log('saving file: ' + upload )
    this.afs.collection('verifications/').doc(this.settings.user.uid).collection(dbKey).doc('files').set(upload);
  }
}

@Injectable()
export class EventService {
  constructor(
    private settings:SettingsService,
    private userService: UserService

  ){}

  public getEvent(ref:string, note: string, attachment:any[]) {
    var user = this.userService.user.displayName
    return{
        new:{
        "heading" : user + " submitted a new verification",
        "primary" : "The details have been sent to Know My Client with reference number " + ref ,
        "secondary" : "Note: " + note,
        "icon" : "icon-plus",
        "colour" : "bg-blue",
        "attachment" : attachment
      },
      pending:{
        "heading" : "Verification has been picked up and is being processed",
        "primary" : user + " from Know My Client has started an investigation",
        "secondary" : "More details will follow shortly",
        "icon" : "icon-refresh",
        "colour" : "warning"
      },
      verified:{
        "heading" : "Verification successful",
        "primary" : "The identitiy details submitted have been confirmed" ,
        "secondary" : "Note: " + note,
        "icon" : "icon-check",
        "colour" : "success",
      "attachment" : attachment
      },
      alerts:{
        "heading" : "Alert! This identity could not be verified",
        "primary" : "Do not complete transaction without further investigation",
        "secondary" : "Note: " + note ,
        "icon" : "icon-close",
        "colour" : "danger",
        "attachment" : attachment
      },
      note:{
        "heading" : user + " added the following note:",
        "primary" : "Note: " + note ,
        "secondary" : "Further updates will follow shortly",
        "icon" : "icon-info",
        "colour" : "active",
        "attachment" : attachment
      },
      report:{
        "heading" : user + " attached the following document",
        "primary" :  "",
        "secondary" : "Note: " + note,
        "icon" : "icon-info",
        "colour" : "active",
        "attachment" : attachment
      }
  }
}
}

@Injectable()
export class VerificationService {
    verificationList: any;
    constructor(
      private afs: AngularFirestore, 
      private settings: SettingsService,  
      private eventService: EventService,
      private userService: UserService
    ) {

      console.log('Verification Serveice ngOnInit fired')
        this.verificationList = this.afs.collection('verifications').valueChanges() ;
        this.verificationList.subscribe(response=>{console.log(response)})
    }
    public getVerifications(): Observable<{}>{
        return this.verificationList
    }
    public setVerifications(verification: Verification){
        verification.events = []
        verification.events.push(this.eventService.getEvent(verification.ref,verification.notes,[]).new)
        verification.created_date = new Date().getTime()
        verification.created_uid = this.userService.user.uid
        verification.created_name = this.userService.user.displayName
        verification.status = 'New'
        verification.files = []

        return new Promise ((resolve, reject)=>{
          this.afs.collection('users').doc(this.userService.user.uid).valueChanges().subscribe(
            (userDetail:any)=>{
              if(userDetail){
                console.log(userDetail.companyId)
                this.afs.collection('companies/' + userDetail.companyId + '/verifications').add(verification)
                .then(response=> {
                  console.log(response)
                  resolve(response)})
                .catch(err=>{
                  console.log(err)
                  reject(err)
                })
              }
            },
            err=>{
              console.log(err)
              reject(err)
            }
          )
        })
    }
}