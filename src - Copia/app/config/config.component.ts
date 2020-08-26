import { Component, OnInit } from '@angular/core';

import 'firebase/database';

import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

import {ConfirmationService} from 'primeng/api';

import * as _ from 'lodash';


@Component({
    selector: 'app-config',
    templateUrl: '../config/config.component.html',
    providers: [ConfirmationService]
})

export class ConfigComponent implements OnInit {

    constructor(
        public config: ConfigService,
        public util: UtilService,
        public dados: DadosService,
        private confirmationService: ConfirmationService,
    ) { }


    public pode_fazer_upload : boolean = false;
    public label_nome : string = '';
    public label_obs : string = '';

    // popup de alerta
    public alerta_titulo : string = '';
    public alerta_mensagem : string = '';


    public popupSairSemSalvar : boolean = false;



    public lista_de_profissionais : any = [];
    public rows_profissionais : number = 5;
    public rows_responsavel : number = 5;


    public ultimo_cadastrado : string = '';

    public TEMP : any = {
        idade : ''
    }

    public img_link1 : string = '';
    public img_link2 : string = '';




    ngOnInit(): void {
        console.log("\n\nINIT edit");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);


        this.dados.salvou_registro = false;

        this.dados.mostrar_imagens_na_lista_estoque = false;



        if(this.dados.selected_edit.nome){
            console.log("nome = " + this.dados.selected_edit.nome);
        }

        if(this.dados.retorno){
            console.log("RETORNO + " + this.dados.retorno);
        }

        // Registro de procedimentos na ficha do cliente e historicos para o usuario
        this.dados.historicos = {};
        this.dados.historicos.titulo = '';

        this.TEMP.idade = this.util.get_idade_str(this.dados.selected_edit.nascimento);

        this.util.goTop();  // sobe a tela pro topo
    }





    public voltar(destino : string = '') {
        console.log("==================");
        console.log("voltar()");
        console.log("destino = " + destino);
        console.log("==================");


            this.config.DISPLAY.Config = false;
            this.config.DISPLAY.Registro = true;


    }

    public salvar(param : string = ''){
        console.log("salvar(" + param + ")\n");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);

        this.dados.salvou_registro = false;



        this.dados.salvar_registro(this.dados.PARAMETRO, this.dados.selected_edit);


        if (this.dados.parametro_de_salvar && this.dados.parametro_de_salvar == 'continuar_na_pagina') {
            // continua na pagina
        }
        else {
            console.log("voltar após salvar registro em edit.component");
            this.voltar();
        }
    }


    public popup_alerta(cabecalho:string='', mensagem:string='') {
        console.log("popup_alerta()")

        this.confirmationService.confirm({
            message: mensagem,
            header: cabecalho,
            acceptLabel: 'OK',
            rejectLabel: 'Não',
            rejectVisible: false,
            accept: () => {
                // this.msgs = [{severity:'info', summary:'Confirmado', detail:''}];
                console.log("popup_alerta() => accept")
                return true;
            },
            reject: () => {
                // this.msgs = [{severity:'info', summary:'Cancelado', detail:''}];
                console.log("popup_alerta() => reject")
                return false;
            }
        });
    }



}
