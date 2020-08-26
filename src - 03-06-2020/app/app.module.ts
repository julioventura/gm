import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

import { Observable, Subject } from 'rxjs';

// AngularFire libs
import { AngularFireModule } from '@angular/fire';
// Firestore
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';

// Components
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { AtendimentosComponent } from './atendimentos/atendimentos.component';
import { EditPerfilComponent } from './perfil/edit_perfil.component';
import { EditEstoqueComponent } from './estoque/edit_estoque.component';
import { EditLancamentosComponent } from './edit/edit-lancamentos.component';

// PrimeNG
import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import {ConfirmationService} from 'primeng/api';

// For PrimeNG animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// https://github.com/basst314/ngx-webcam
import {WebcamModule} from 'ngx-webcam';



// Credentials from Firebase Web Config

// juliocesarventuracardoso
// apiKey: "AIzaSyAowocGZGk4n5AGCl2-STGMT1IbJA864-k",
// authDomain: "gmix-com.firebaseapp.com",
// databaseURL: "https://gmix-com.firebaseio.com",
// projectId: "gmix-com",
// storageBucket: "gmix-com.appspot.com",
// messagingSenderId: "1060049429274",
// appId: "1:1060049429274:web:3bd582348a924f2f5c82a3"


// juliocesarventuracardoso
const firebaseConfig = {
    apiKey: "AIzaSyAowocGZGk4n5AGCl2-STGMT1IbJA864-k",
    authDomain: "gmix-com.firebaseapp.com",
    databaseURL: "https://gmix-com.firebaseio.com",
    projectId: "gmix-com",
    storageBucket: "gmix-com.appspot.com",
    messagingSenderId: "1060049429274",
    appId: "1:1060049429274:web:3bd582348a924f2f5c82a3"
}


// julioventura
// const firebaseConfig = {
//     apiKey: "AIzaSyAwfYFSx_uGaErJd7Oqzp775Sh5ODGA2VI",
//     authDomain: "gestormix-com.firebaseapp.com",
//     databaseURL: "https://gestormix-com.firebaseio.com",
//     projectId: "gestormix-com",
//     storageBucket: "gestormix-com.appspot.com",
//     messagingSenderId: "1015127613041",
//     appId: "1:1015127613041:web:c3cd655665f9322ec445d0"
// }




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    HomeComponent,
    ConfigComponent,
    AtendimentosComponent,
    EditPerfilComponent,
    EditEstoqueComponent,
    EditLancamentosComponent
  ],

  imports: [
        BrowserModule, FormsModule, CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        // PrimeNG
        DataViewModule, TableModule, CheckboxModule,
        CalendarModule, ProgressSpinnerModule, OverlayPanelModule,
        InputTextModule, InputTextareaModule, InputSwitchModule,
        ConfirmDialogModule, ButtonModule,
        // Initialize Firebase
        AngularFireModule.initializeApp(firebaseConfig),
        // Firestore
        AngularFirestoreModule,
        AngularFireAuthModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        WebcamModule
    ],
    entryComponents: [
    ],
  providers: [
      // no need to place any providers due to the `providedIn` flag...
      // ConfigService,
      // DadosService,
      // UtilService,

      ConfirmationService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
