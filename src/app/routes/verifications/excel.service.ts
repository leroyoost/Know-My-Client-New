import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { SettingsService } from '../../core/settings/settings.service';
import { UserService } from '../../core/user/user.service';
import * as _ from 'underscore';


@Injectable()
export class PdfService {
    footerText: string;
    constructor(
        private storage: AngularFireStorage,
        private firestore: AngularFirestore,
        private user: UserService,
        private settings: SettingsService
    ) {

    }
}
