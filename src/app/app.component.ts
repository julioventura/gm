import { NgModule, Component } from '@angular/core';
// import "@angular/compiler";

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';

// Autenticação com Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { environment } from '../environments/environment';

// Our own services
import { ConfigService } from './config/config.service';
import { DadosService } from './dados/dados.service';
import { UtilService } from './util/util.service';

// import {ConfirmationService} from 'primeng/api';
// import {MessageService} from 'primeng/api';


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
    public app: FirebaseApp,
    public config : ConfigService,
    public dados : DadosService,
    public util : UtilService,
    // public messageService: MessageService,
    // public confirmationService: ConfirmationService

  ) {
      // Imagem do domínio nos rodapés
      this.config.footer_img = environment.footer_img;
      this.config.footer_img_alt = environment.footer_img_alt;

  }

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
