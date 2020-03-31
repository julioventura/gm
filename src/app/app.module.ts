import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { Observable ,  Subject } from 'rxjs';

// AngularFire libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Components
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

// Services (for all components)
import { ConfigService } from './config/config.service';
import { DadosService } from './dados/dados.service';
import { UtilService } from './util/util.service';

// PrimeNG
// import {ConfirmationService} from 'primeng/api';
// import {MessageService} from 'primeng/api';

import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';

// import {MessagesModule} from 'primeng/messages';
// import {MessageModule} from 'primeng/message';
// import {DialogModule} from 'primeng/dialog';
// import {CalendarModule} from 'primeng/calendar';

// For PrimeNG animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Credentials from Firebase Web Config
const firebaseConfig = {
    apiKey: "AIzaSyAwfYFSx_uGaErJd7Oqzp775Sh5ODGA2VI",
    authDomain: "gestormix-com.firebaseapp.com",
    databaseURL: "https://gestormix-com.firebaseio.com",
    projectId: "gestormix-com",
    storageBucket: "gestormix-com.appspot.com",
    messagingSenderId: "1015127613041",
    appId: "1:1015127613041:web:c3cd655665f9322ec445d0"
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    HomeComponent
  ],

  imports: [
    BrowserModule, FormsModule, CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // PrimeNG
    DataViewModule, TableModule, CheckboxModule,
    // CalendarModule,
    InputTextModule, InputTextareaModule, InputSwitchModule,
    ConfirmDialogModule, ButtonModule,
    // MessagesModule, MessageModule,
    // DialogModule,
    // Initialize Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }
    // ServiceWorkerModule.register('ngsw-worker.js'),
    ],
  providers: [
      ConfigService,
      DadosService,
      UtilService,
      // ConfirmationService,
      // MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
