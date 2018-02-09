import { Injectable } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service'
import { UserService } from '../../core/user/user.service'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage'
import { Verification } from '../../shared/models/verification'
import { Upload } from '../../shared/models/verification'
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for 
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import * as _ from "lodash";


@Injectable()
export class EventService {
  constructor(
    private settings: SettingsService,
    private userService: UserService
  ) { }

  public getEvent(ref: string, note: string, attachment: any[]) {
    var user = this.userService.user.displayName
    return {
      new: {
        "created": new Date().getTime(),
        "heading": user + " submitted a new verification",
        "primary": "The details have been sent to Know My Client with reference number " + ref,
        "secondary": "Note: " + note,
        "icon": "icon-plus",
        "colour": "bg-blue",
        "attachment": attachment
      },
      pending: {
        "created": new Date().getTime(),
        "heading": "Verification has been picked up and is being processed",
        "primary": user + " from Know My Client has started an investigation",
        "secondary": "More details will follow shortly",
        "icon": "icon-refresh",
        "colour": "warning"
      },
      verified: {
        "created": new Date().getTime(),
        "heading": "Verification successful",
        "primary": "The identitiy details submitted have been confirmed",
        "secondary": "Note: " + note,
        "icon": "icon-check",
        "colour": "success",
        "attachment": attachment
      },
      rejected: {
        "created": new Date().getTime(),
        "heading": "Alert! This identity could not be verified",
        "primary": "Do not complete transaction without further investigation",
        "secondary": "Note: " + note,
        "icon": "icon-close",
        "colour": "danger",
        "attachment": attachment
      },
      note: {
        "created": new Date().getTime(),
        "heading": user + " added the following note:",
        "primary": "Note: " + note,
        "secondary": "Further updates will follow shortly",
        "icon": "icon-info",
        "colour": "active",
        "attachment": attachment
      },
      report: {
        "created": new Date().getTime(),
        "heading": user + " attached the following document",
        "primary": "",
        "secondary": "Note: " + note,
        "icon": "icon-info",
        "colour": "active",
        "attachment": attachment
      }
    }
  }
}

@Injectable()
export class VerificationService {
  verificationList: Observable<any>
  userConfig: any;
  currentUpload: Upload;
  uploads: Observable<any>
  test: Observable<any>
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private settings: SettingsService,
    private eventService: EventService,
    private userService: UserService,
    private auth: AngularFireAuth
  ) {

  }

  public generaterRef() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public getVerifications(veriType): Observable<any> {
    return new Observable((observer) => {
      this.auth.auth.onAuthStateChanged(user => {
        if (user) {
          this.afs.collection('users').doc(user.uid).valueChanges().subscribe((response: any) => {
            var veriRef = this.afs.collection('verifications')
            this.afs.collection('verifications', ref => ref.where('type', '==', veriType)).valueChanges().subscribe(verifications => {
              console.log(verifications)
              observer.next(verifications)
            })
          }, err => {
            console.log(err)
            return err
          })
        }
      })
    })
  }

  uploadFiles(uploadQue,companyId,ref):Promise<any>{

    console.log('uploadFiles Fired')
    if (uploadQue.length > 0) {
      var promiseList = []
      var storageRef = this.afStorage.storage.ref('uploads')
      uploadQue.forEach(file => {
        promiseList.push(new Promise((res,rej)=>{
        console.log('uploading: ' + file.fileName)
        this.currentUpload = new Upload(file);
        var uploadRef = storageRef.child(companyId).child(ref).child(file.fileType + file.FileName + new Date())
        var uploadTask = uploadRef.put(this.currentUpload.file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot:any) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function(error){
          console.log(error)
          rej(error)
        },
        function(){
          console.log(uploadTask.snapshot.downloadURL)
          res({
            "fileUrl": uploadTask.snapshot.downloadURL,
            "created": new Date().getTime(),
            "fileName": file.fileName,
            "fileType": file.fileType
          })
        })
      }))
    })
      return Promise.all(promiseList)
    }
    else{
      return new Promise((resolve)=>resolve([]))
    }
  }

  createFileEvent(fileList,ref,status,note?){
    console.log('createFileEvent Fired')
    console.log(fileList)
    return (this.eventService.getEvent(ref, note, fileList)[status])
  }

  getCoId(uid){
    console.log('getCoId Fired')
    return new Promise((res,rej)=>{
      this.afs.collection('users').doc(uid).valueChanges().subscribe(
        (userData:any)=>{
          console.log(userData.companyId)
          res(userData.companyId)
        },
        err=>{
          console.log(err)
          rej(err)
        }
      )
    })
  }

  getUid():Promise<string>{
    console.log('getUid Fired')
    return new Promise((res,rej)=>{
      this.auth.auth.onAuthStateChanged(
        user => {
          if (user) {
            res(user.uid)
          }
          else{}
        },
        err => {
          rej(err)
          console.log(err)
        }
      )
    })
  }


  fileHandler(uploadQue,ref,status,note?){
    console.log('fileHandler Fired')
    return new Promise((resolve,reject)=>{
    this.getUid()
      .then(uid=>{
        return this.getCoId(uid)
          .then(coId=>{
            return this.uploadFiles(uploadQue,coId,ref)
              .then(fileList=>{
                console.log("fileupload returned")
                console.log(fileList)
                resolve(this.createFileEvent(fileList,ref,status,note))
              })
             .catch(err=>{reject(err)})
          })
          .catch(err=>{reject(err)})
      })
      .catch(err=>{reject(err)})
    })
  }


  public createNewVerification(uploadQue, verification: Verification, veriType, note?): PromiseLike<any> {
    verification.events = []
    verification.notes = []
    verification.created_date = new Date().getTime()
    verification.type = veriType
    if (note) { verification.notes.push({ "text": note, "created": verification.created_date }) }
    verification.created_uid = this.userService.user.uid
    verification.created_name = this.userService.user.displayName
    verification.status = 'new'

    return this.fileHandler(uploadQue,verification.ref,verification.status,note)
      .then(fileEvent=>{
        verification.events.push(fileEvent)
        return (this.afs.collection('verifications').add(verification))
      })
      .catch(err=>{
        return(err)
      })
  }

  // public updateVerification(uploadQue, verification:Verification, status, note?):Promise<any> {




  //   return new Promise((resolve,reject) =>{
  //       return(this.fileUpload(uploadQue,verification,note,status)
  //         .then((newVeri:Verification)=>{
  //           newVeri.status = status
  //           console.log(newVeri)
  //           this.afs.collection('verifications').doc(verification.id).update(newVeri)
  //             .then(updateResult=>{
  //               resolve(updateResult)
  //             })
  //             .catch(err=>{
  //               console.log(err)
  //               reject(err)
  //             });
  //         },
  //         err=>{
  //           reject(err);
  //         })
  //       )
  //   })
  // }
}





// // takes file uplad que and instended operation (status) and completes file uplad then creates appropriate event and return completed verification
// public fileUpload(uploadQue, verification, note?, status?): PromiseLike<any> {
//   return new Promise((resolve, reject) => {
//     var promiseList = []
//     this.auth.auth.onAuthStateChanged(user => {
//       if (user) {
//         this.afs.collection('users').doc(user.uid).valueChanges().subscribe((response: any) => {
//           if (uploadQue.length > 0) {
//             uploadQue.forEach(file => {

//               console.log('uploading: ' + file.fileName)
//               this.currentUpload = new Upload(file);
//               var uploadRef = this.afStorage.ref('/uploads/' + response.companyId + '/' + verification.ref + '/' + file.fileName)
//               let uploadTask = uploadRef.put(this.currentUpload.file)
    
//               promiseList.push(new Promise((resolve, reject) => {
//                 uploadTask.downloadURL().subscribe(
//                   url => {
//                     if (url) {
//                       console.log('returned download url: ' + url)
//                       var fileResult = {
//                         "fileUrl": url,
//                         "created": new Date().getTime(),
//                         "fileName": file.fileName,
//                         "fileType": file.fileType
//                       }
//                       resolve(fileResult)
//                     }
//                     else {
//                       reject('no url returned')
//                       console.log('no url returned!!')
//                     }
//                   },
//                   err => {
//                     console.log(err)
//                     reject(err)
//                   })
//               }))
//             })
//             Promise.all(promiseList)
//               .then(fileResult => {
//                 console.log(fileResult)
//                 verification.events.push(this.eventService.getEvent(verification.ref, note, fileResult)[status])
//                 console.log('verification ready for upload')
//                 console.log(verification)
//                 resolve(verification)
//               })
//               .catch(err => {
//                 console.log(err)
//                 reject(err)
//               })
//           }
//           else {
//             verification.events.push(this.eventService.getEvent(verification.ref, note, [])[status])
//             console.log('verification ready for upload - no files')
//             console.log(verification)
//             resolve(verification)
//           }
//         }, err => {
//           console.log(err)
//           reject(err)
//         })
//       }
//     })
//   })
// }