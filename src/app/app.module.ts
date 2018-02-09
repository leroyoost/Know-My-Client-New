import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';



import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule} from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'KnowMyClient'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpModule,
    BrowserModule,
    CoreModule,
    LayoutModule,
    SharedModule.forRoot(),
    RoutesModule    
  ],
  providers: [
    {provide: LocationStrategy, 
    useClass: HashLocationStrategy}
  ],

    bootstrap: [AppComponent]
})
export class AppModule { }
