import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { DadosService } from '../dados/dados.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

    constructor(
        public config : ConfigService,
        public dados : DadosService
    ) {
        this.dados.subscribe_auth();
        this.dados.observar_usuarios();
        this.dados.usuario_logado.dataset = this.dados.auth_object.uid;
        this.dados.usuario_logado.dataset_nome = this.dados.auth_object.displayName;
        this.dados.usuario_logado.dataset_email = this.dados.auth_object.email;
     }

    public MENU_HOME_EXTRA : boolean = false;

    ngOnInit(): void {
			console.log("\n\n\n");
			console.log("\n\nINIT HOME \n\n");
    }

    go(destino : string = '') {
        console.log("go(this.dados.usuario_logado.dataset)")
        console.log(this.dados.usuario_logado.dataset)
        // this.dados.observar_clientes();
        this.dados.go(destino);
    }

    public alternar_menu_extra_admin(){
        console.log("alternar_menu_extra_admin");

        console.log("===");
        // console.log(this.config.user);
        console.log("===");

        console.log("usuario_logado");

        if (this.config.usuario_logado.email=='julioventura@gmail.com'
        || this.config.usuario_logado.email=='julio@dentistas.com.br'
        || this.config.is_admin )
        {
            this.MENU_HOME_EXTRA = !this.MENU_HOME_EXTRA;
        }
    }

}
