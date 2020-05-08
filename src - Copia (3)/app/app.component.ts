import { NgModule, Component } from '@angular/core';
// import { HostListener } from '@angular/core';  // para rastrear o back button

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import 'firebase/storage';
import {Subject, Observable} from 'rxjs';
// import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';

// Autenticação com Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { environment } from '../environments/environment';

// Our own services
import { ConfigService } from './config/config.service';
import { DadosService } from './dados/dados.service';
import { UtilService } from './util/util.service';

import {OverlayPanelModule} from 'primeng/overlaypanel';

// import {ConfirmationService} from 'primeng/api';
// import {MessageService} from 'primeng/api';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public config : ConfigService,
    public dados : DadosService,
    public util : UtilService,
    // public app: FirebaseApp,
    // public messageService: MessageService,
    // public confirmationService: ConfirmationService

  ) {
      // Imagem do domínio nos rodapés
      this.config.footer_img = environment.footer_img;
      this.config.footer_img_alt = environment.footer_img_alt;

      // fromEvent(window, 'popstate')
      // .subscribe((e) => {
      //     console.log("-------------------------------");
      //     console.log(e, 'back button');
      // });
  }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log('!!!!!!!!!!! Back button pressed !!!!!!!!!!!!!');
  // }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // Subscribe authentication status
    // this.config.user = this.auth.user.displayName;
    this.dados.subscribe_auth();
  }
  logout() {
    this.auth.signOut();
  }

}
