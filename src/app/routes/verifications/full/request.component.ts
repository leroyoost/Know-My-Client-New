import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Verification } from '../../../shared/models/verification';
import { VerificationService } from '../verifications.service';
import { UserService } from '../../../core/user/user.service';
import { ModalConfig } from '../../../shared/models/modal';
import { Observable } from 'rxjs/Observable';
  @Component({
      selector: 'app-request-modal',
      templateUrl: './request.component.html',
      styleUrls: ['./full.component.scss']
  })

  export class RequestComponent {
    verification:  any = {};
    isAdmin = false;
    data: any = {};
    response: any;

    constructor(
      public requestModalRef: BsModalRef,
      private modalService: BsModalService,
      public user: UserService,
      public verificationService: VerificationService
    ) {
      console.log('RequestComponent Lanuched');
      this.response = {
        'jsonTable': {
            'first_name': 'LEROY',
            'surname': 'OOSTHUYZEN',
            'date_of_birth': 'Mon Sep 28 1987',
            'age': '30',
            'gender': 'Male',
            'citizenship': 'South African',
            'date_of_issue': 'Fri Jun 03 2011',
            'id_number': '8709285201081',
            'id_status': 'VALID',
            'death_status': 'ALIVE',
            'death_date': null,
            'death_place': null
        },
        'pdfTables': {
            'tableHeading': 'ID Number Verification',
            'data': [
                {
                    'index': 1,
                    'heading': 'Personal Information',
                    'data': [
                        [
                            'First Name',
                            'LEROY'
                        ],
                        [
                            'Surname',
                            'OOSTHUYZEN'
                        ],
                        [
                            'Date of Birth',
                            'Mon Sep 28 1987'
                        ],
                        [
                            'Age',
                            '30'
                        ],
                        [
                            'Gender',
                            'Male'
                        ],
                        [
                            'Citizenship',
                            'South African'
                        ],
                        [
                            'Date of Issue',
                            'Fri Jun 03 2011'
                        ],
                        [
                            'ID Number',
                            '8709285201081'
                        ],
                        [
                            'ID Status',
                            'VALID'
                        ],
                        [
                            'Death Status',
                            'ALIVE'
                        ],
                        [
                            '  ',
                            '  '
                        ],
                        [
                            '  ',
                            '  '
                        ]
                    ]
                }
            ]
        }
    };
    }
    public savePdf() {
    }

    idVerify(idNo) {
      this.verificationService.apiCall('idVerify', {'idNo' : idNo} )
        .then(response => {
          console.log(response);
          this.response = response;
        })
        .catch(err => {
          console.log(err);
        });
    }

  }
