import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(
        public config : ConfigService,
        public util: UtilService,
        public dados : DadosService
    ) {
        this.dados.subscribe_auth();
        this.dados.observar_usuarios();

        if(!this.dados.usuario_logado){
            this.dados.usuario_logado = {};
        }
        this.dados.usuario_logado.nome = this.dados.auth_object.displayName;
        this.dados.usuario_logado.email = this.dados.auth_object.email;
        this.dados.usuario_logado.img_url = this.dados.auth_object.photoURL;
        this.dados.usuario_logado.key = this.dados.auth_object.uid;
        this.dados.usuario_logado.providerId = this.dados.auth_object.providerId;

        this.dados.usuario_logado.dataset = this.dados.auth_object.uid;
        this.dados.usuario_logado.dataset_nome = this.dados.auth_object.displayName;
        this.dados.usuario_logado.dataset_email = this.dados.auth_object.email;
     }

    public MENU_HOME_EXTRA : boolean = false;
    public minDate : any;
    public maxDate : any;
    public rangeDates : any;

    public img_url : string = '';



    ngOnInit(): void {
        console.log("===========================");
        console.log("INIT HOME");
        console.log("this.dados.usuario_logado");
        console.log(this.dados.usuario_logado);
        console.log("===========================");

        // limpa as variaveis de retorno
        // console.log("limpa as variaveis de retorno");
        this.dados.voltar_pilha = [];
        this.dados.voltar_pilha.pop();
        this.dados.selected_origem = {};
        this.dados.voltar_para = '';
        this.dados.origem = '';

        this.dados.filtered_lancamentos_receita = this.dados.selected_lancamentos_receita;
        this.dados.filtered_lancamentos_despesa = this.dados.selected_lancamentos_despesa;


        if (this.dados.usuario_logado.email == 'julioventura@gmail.com' || this.dados.usuario_logado.email == 'juliocesarventuracardoso@gmail.com'){
            this.dados.usuario_logado.is_admin = true;
            this.config.is_admin = true;
        }

        if(this.dados.primeira_vez){
            // console.log("PRIMEIRA VEZ - SUBSCRIBE geolocation")
            this.dados.primeira_vez = false;
            // this.dados.get_geolocation();
            this.dados.show_position();
        }
        else {
            // console.log("NÂO primeira_vez")
            this.dados.show_position();
        }
    }


    go(destino : string = '') {
        console.log("go(" + destino + ")")
        console.log("dataset = " + this.dados.usuario_logado.dataset)

        this.dados.go(destino);
    }


    public alternar_menu_extra_admin(){
        console.log("alternar_menu_extra_admin");
        if ( this.config.is_admin ) {
            this.MENU_HOME_EXTRA = !this.MENU_HOME_EXTRA;
        }
    }
}
