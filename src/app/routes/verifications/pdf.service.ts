import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
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
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        console.log('constructor fired');
    }

    generatePdf(data, ref) {
        const pdfFooter = 150;
        this.user.getUser().subscribe((user: any) => {
            console.log(user);
            this.user.getLegal().subscribe((legal: any) => {
                // Define PDF Layout
                const dd: any = {
                    content: [
                        {
                            columns: [{
                                width: 100,
                                image: user.logo,
                            }]

                        },
                        '\n\n',
                        { text: 'ID Verification', style: 'header' },
                        { text: `Requested By : ${user.name} ${user.surname} | ${user.companyName}`, style: 'tableText' },
                        { text: 'Date Requested: ' + new Date().toDateString(), style: 'tableText' },
                        { text: 'Verification Reference : ' + ref, style: 'tableText' },
                        { text: 'Search Result:', style: 'subheader' }

                    ],
                    styles: {
                        header: {
                            fontSize: 16,
                            bold: 'true',
                            margin: [0, 0, 0, 10]
                        },
                        subheader: {
                            fontSize: 14,
                            bold: 'true',
                            margin: [0, 30, 0, 10]
                        },
                        divider: {
                            fontSize: 12,
                            margin: [0, 5, 0, 5],
                            bold: 'true'
                        },
                        tableExample: {
                            margin: [0, 5, 0, 15]
                        },
                        footer: {
                            margin: [0, pdfFooter, 0, 15],
                            fontSize: 9,
                            color: 'grey'
                        },
                        tableText: {
                            fontSize: 12,
                            margin: [0, 0, 0, 10],
                            color: 'grey'
                        }
                    }
                };

                _.sortBy(data.pdfTables.data, 'index');
                _.each(data.pdfTables.data, function (subtable) {
                    dd.content.push({ text: subtable.heading, style: 'divider' });
                    dd.content.push({
                        'style': 'tableText',
                        'table': { 'body': subtable.data },
                        'layout': 'noBorders'
                    });
                });

                dd.content.push({ text: legal.footer, alignment: 'center', style: 'footer' });
                const pdfBuffer = null;

                pdfMake.createPdf(dd).open();
            });
        });
    }
}
