import { Component, OnInit } from '@angular/core';

import 'firebase/database';

import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

import {ConfirmationService} from 'primeng/api';

// import * as _ from 'lodash';


@Component({
    selector: 'app-edit_atendimentos',
    templateUrl: './atendimentos.component.html',
})

export class AtendimentosComponent implements OnInit {

    constructor(
        public config: ConfigService,
        public util: UtilService,
        public dados: DadosService,
        private confirmationService: ConfirmationService,
    ) { }


    public label_nome : string = '';
    public label_obs : string = '';

    // popup de alerta
    public alerta_titulo : string = '';
    public alerta_mensagem : string = '';


    public popupSairSemSalvar : boolean = false;

    public listar_clientes : boolean = false;
    public listar_socios : boolean = false;
    public listar_fornecedores : boolean = false;
    public listar_equipe : boolean = false;

    public pode_excluir : boolean = false;

    public listar_estoque : boolean = false;

    public confirmar_atendimento_sem_obs : boolean = false;

    public excluir_dialog : boolean = false;
    public confirmar_exclusao_dialog : boolean = false;

    public TEMP : any = {
        idade : ''
    }


    public arquivo_escolhido: string = '';
    filePath : string = '';

    ngOnInit(): void {
        console.log("\n\nINIT edit");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);
        console.log("===========================");
        console.log("this.dados.voltar_pilha");
        console.log(this.dados.voltar_pilha);
        console.log("===========================");



        this.dados.salvou_registro = false;

        this.dados.mostrar_imagens_na_lista_estoque = false;

        // EXCLUIR REGISTRO (pode_excluir)
        this.pode_excluir = this.config[this.dados.PARAMETRO].pode_excluir ? this.config[this.dados.PARAMETRO].pode_excluir : false;



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

        this.label_nome = this.config[this.dados.PARAMETRO].label_nome ? this.config[this.dados.PARAMETRO].label_nome : "Nome";
        this.label_obs = this.config[this.dados.PARAMETRO].label_obs ? this.config[this.dados.PARAMETRO].label_obs : "Obs";

        this.dados.incluiu = false;
        this.dados.alta_anterior = this.dados.selected_edit.alta;

        if(!this.dados.selected_edit.key) {
            // REGISTRO NOVO
            console.log("incluindo registro em PARAMETRO " + this.dados.PARAMETRO);

            // repete o ultimo conteudo incluido para facilitar inclusões sequenciais


            // cidade e estado iniciais
            if(this.config[this.dados.PARAMETRO].cidade && this.dados.usuario_logado.cidade_default){
                this.dados.selected_edit.cidade =  this.dados.usuario_logado.cidade_default;
            }
            if(this.config[this.dados.PARAMETRO].estado && this.dados.usuario_logado.estado_default){
                this.dados.selected_edit.estado =  this.dados.usuario_logado.estado_default;
            }
        }

        if(this.dados.PARAMETRO == 'ATENDIMENTOS'){
            this.avalia_atendimentos();
        }

        this.dados.selected_edit.img_url = this.util.formata_url_com_protocolo(this.dados.selected_edit.img_url);
        this.dados.selected_edit.img_url2 = this.util.formata_url_com_protocolo(this.dados.selected_edit.img_url2);

        this.util.goTop();  // sobe a tela pro topo
    }



    public mostrar_clientes(){
        this.dados.filterDatabase(this.dados.selected_edit.cliente,'CLIENTES');
        this.listar_clientes = true;
    }


    public mostrar_socios(){
        this.dados.filterDatabase(this.dados.selected_edit.socio,'SOCIOS');
        this.listar_socios = true;
    }


    public escolherCliente(registro){
        console.log(registro);
        this.dados.selected_edit.cliente = registro.nome;
        this.dados.selected_edit.cliente_key = registro.key;

        // reproduz o registro do cliente identificando-o em dados.cliente e abre a observação de orçamentos desse cliente
        this.dados.cliente = registro;
        this.dados.registro = registro;

        this.listar_clientes = false;
    }


    public escolherSocio(registro){
        console.log(registro);
        this.dados.selected_edit.socio = registro.nome;
        this.dados.selected_edit.socio_key = registro.key;

        // reproduz o registro do socio identificando-o em dados.socio e abre a observação de orçamentos desse socio
        this.dados.socio = registro;
        this.dados.registro = registro;

        this.listar_socios = false;
    }


    public escolherRegistro(registro){
        this.dados.selected_edit.contraparte = registro.nome;
        this.dados.selected_edit.contraparte_cpf = registro.cpf ? registro.cpf : '';
        this.dados.selected_edit.contraparte_cnpj = registro.cnpj ? registro.cnpj : '';
        this.dados.selected_edit.contraparte_key = registro.key;
        this.listar_clientes = false;

        // reproduz o registro do cliente identificando-o em dados.cliente e abre a observação de orçamentos desse cliente
        this.dados.cliente = registro;
        console.log(registro);
        this.dados.registro = registro;
    }



    public voltar(destino : string = '') {
        console.log("==================");
        console.log("voltar()");
        console.log("destino = " + destino);
        console.log("==================");

        this.config.DISPLAY.ExcluirDialog = false;

        if(!this.dados.salvou_registro){
            // saindo da página sem salvar o registro
            this.popup_sair_sem_salvar();
        }

        if (this.dados.retorno) {
            this.dados.PARAMETRO = this.dados.retorno;
            this.dados.retorno = '';
            destino = 'lista';
        }

        if (this.dados.incluindo && !this.dados.incluiu) {
            this.dados.incluindo = false;
            destino = 'lista';
        }

        console.log("destino = " + destino);

        if(destino == 'lista'){
            this.dados[this.config[this.dados.PARAMETRO].filtered] = this.dados[this.config[this.dados.PARAMETRO].selected];

            this.config.DISPLAY.Lista = true;
            this.config.DISPLAY.Registro = false;
            this.config.DISPLAY.EditAtendimentos = false;
        }

        else {
            console.log("Destino vazio => volta para detail");

            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.EditAtendimentos = false;
            this.config.DISPLAY.Registro = true;

        }

    }


    public hoje(param : string = '', editou : string = ''){
        let hoje = this.dados.HOJE;

        if(param == 'data'){
            if(editou=='editou'){
                this.dados.selected_edit.data = this.util.formata_data(this.dados.selected_edit.data,'recente');
            }
            else {
                if(this.dados.selected_edit.data != hoje){
                    this.dados.selected_edit.data = hoje;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.data = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        else if(param == 'data_inicio'){
            if(editou=='editou'){
                this.dados.selected_edit.data_inicio = this.util.formata_data(this.dados.selected_edit.data_inicio);
            }
            else {
                if(this.dados.selected_edit.data_inicio != hoje){
                    this.dados.selected_edit.data_inicio = hoje;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.data_inicio = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        else if(param == 'data_termino'){
            if(editou=='editou'){
                this.dados.selected_edit.data_termino = this.util.formata_data(this.dados.selected_edit.data_termino);
            }
            else {
                if(this.dados.selected_edit.data_termino != hoje){
                    this.dados.selected_edit.data_termino = hoje;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.data_termino = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        return hoje;
    }



    public escolherResponsavel(registro){
        console.log(registro);
        this.dados.selected_edit.responsavel_key = registro.key;
        this.dados.selected_edit.responsavel_nome = registro.nome;
        this.listar_equipe = false;
        this.dados.responsavel = registro;
    }

    public mostrar_lista_de_equipe(){
        console.log(this.dados.selected_equipe);
        this.dados.filterDatabase(this.dados.selected_edit.responsavel_nome,'EQUIPE');
        this.listar_equipe = true;
    }



    public data_lancamento(param : string = '', editou : string = ''){
        console.log("data_lancamento()");

        let hoje = this.dados.HOJE;

        if(param == 'data'){
            if(editou=='editou'){
                this.dados.selected_edit.data = this.util.formata_data(this.dados.selected_edit.data,'recente');
            }
            else {
                if(this.dados.selected_edit.data != hoje){
                    this.dados.selected_edit.data = hoje;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.data = '';
                }
            }
        }

        if(this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA' && this.dados.selected_edit.meio_de_pagamento == 'credito'){
            // seta data de credito do pagamento em cartão de crédito
            this.dados.selected_edit.data_credito = this.util.somar_dias_a_uma_data(this.dados.selected_edit.data, this.config.dias_pra_credito_do_cartao);
            this.dados.selected_edit.aguardando = true;
            this.dados.selected_edit.aguardando_data = this.dados.selected_edit.data_credito;
        }

        if(this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA' && this.dados.selected_edit.meio_de_pagamento == 'credito'){
            // seta data de credito do pagamento em cartão de crédito
        }
    }

    public seta_data(is_hoje : boolean = false){
        console.log("seta_data()");

        if(is_hoje) {
            this.dados.selected_edit.data = this.dados.HOJE;
        }

        this.dados.selected_edit.data = this.util.formata_data(this.dados.selected_edit.data,'recente');

        if(this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA' && this.dados.selected_edit.meio_de_pagamento == 'credito'){
            // seta data de credito do pagamento em cartão de crédito
            this.dados.selected_edit.data_credito = this.util.somar_dias_a_uma_data(this.dados.selected_edit.data, this.config.dias_pra_credito_do_cartao);
            this.dados.selected_edit.aguardando = true;
        }
    }



    public agora(param : string = '', editou : string = ''){
        let hora = this.util.agora().horario;
        console.log(this.util.agora());

        if(param == 'hora'){
            if(editou=='editou'){
                this.dados.selected_edit.hora = this.util.formata_hora(this.dados.selected_edit.hora);
            }
            else {
                if(this.dados.selected_edit.hora != hora){
                    this.dados.selected_edit.hora = hora;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.hora = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        else if(param == 'hora_inicio'){
            if(editou=='editou'){
                this.dados.selected_edit.hora_inicio = this.util.formata_hora(this.dados.selected_edit.hora_inicio);
            }
            else {
                if(this.dados.selected_edit.hora_inicio != hora){
                    this.dados.selected_edit.hora_inicio = hora;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.hora_inicio = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        else if(param == 'hora_termino'){
            if(editou=='editou'){
                this.dados.selected_edit.hora_termino = this.util.formata_hora(this.dados.selected_edit.hora_termino);
            }
            else {
                if(this.dados.selected_edit.hora_termino != hora){
                    this.dados.selected_edit.hora_termino = hora;
                }
                else {
                    // alterna limpando o campo caso já fosse o mesmo valor
                    this.dados.selected_edit.hora_termino = '';
                }
            }
            if(this.dados.PARAMETRO=='ATENDIMENTOS'){
                this.avalia_atendimentos();
            }
        }
        return hora;
    }


    public avalia_atendimentos(){
        console.log("avalia_atendimentos()");

        if(this.dados.PARAMETRO == 'ATENDIMENTOS'){
            let status = 'inativo';

            if(this.dados.selected_edit.data && this.dados.selected_edit.data.length>0){
                status = 'aberto';

                if(this.dados.selected_edit.data_inicio && this.dados.selected_edit.data_inicio.length>0 && this.dados.selected_edit.hora_inicio && this.dados.selected_edit.hora_inicio.length == 5){
                    status = 'em_curso';

                    if(this.dados.selected_edit.data_termino &&this.dados.selected_edit.data_termino.length>0 && this.dados.selected_edit.hora_termino && this.dados.selected_edit.hora_termino.length == 5){
                        status = 'finalizado';
                    }
                }
            }

            this.dados.selected_edit.atendimento = '';

            if(status=='inativo'){
                this.dados.selected_edit.atendimento = 'inativo';
            }
            else if(status=='aberto'){
                this.dados.selected_edit.atendimento = 'aberto';
            }
            else if(status=='em_curso'){
                this.dados.selected_edit.atendimento = 'em_curso';
            }
            else if(status=='finalizado'){
                this.dados.selected_edit.atendimento = 'finalizado';
            }
        }
    }

    public salvar(param : string = ''){
        console.log("salvar(" + param + ")\n");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);

        // TODO --- É preciso checar e exigir antes de salvar que informe o CPF e PAGADOR para CLIENTES, incluindo menores de idade?

        this.dados.parametro_de_salvar = param ? param : '';
        this.dados.salvou_registro = false;

        if(this.dados.PARAMETRO == 'ATENDIMENTOS'){
            let data_hora, data_hora_quando;

            this.avalia_atendimentos();

            if(this.dados.selected_edit.data && this.dados.selected_edit.data.length>0 && this.dados.selected_edit.hora && this.dados.selected_edit.hora.length == 5){
                data_hora = this.dados.selected_edit.data + ' ' + this.dados.selected_edit.hora;
                data_hora_quando = this.util.quando_em_milisegundos(data_hora);
                console.log("data_hora_quando = " + data_hora_quando)
            }
            else if(this.dados.selected_edit.data && this.dados.selected_edit.data.length>0){
                data_hora = this.dados.selected_edit.data + ' ' + '00:00';
                data_hora_quando = this.util.quando_em_milisegundos(data_hora);
                console.log("data_hora_quando = " + data_hora_quando)
            }
            else {
                data_hora_quando = 0;
                console.log("data_hora_quando = " + data_hora_quando)
            }
            this.dados.selected_edit.data_hora_quando = data_hora_quando;
        }


        this.dados.salvar_registro(this.dados.PARAMETRO, this.dados.selected_edit);


        if (this.dados.salvou_registro) {
            console.log("salvou registro")
            // this.dados.selected = this.util.deepClone(this.dados.selected_edit);
        }

        if(this.dados.incluindo){
            this.dados.incluiu = true;
        }

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

    public popup_sair_sem_salvar() {
        this.popupSairSemSalvar = true;
    }

    public popup_sair_sem_salvar_fechar(sair : boolean = false){
        this.popupSairSemSalvar = false;
    }

    public popup_atendimento(){
        this.confirmar_atendimento_sem_obs = true;

    }

    public confirma_salvar_sem_obs(confirmacao){
        this.confirmar_atendimento_sem_obs = false;
        if(confirmacao){
            this.dados.salvar_registro(this.dados.PARAMETRO, this.dados.selected_edit);
            this.voltar();
        }
        else {
            return;
        }
    }

    public dialogExcluir() {
        this.excluir_dialog = true;
    }


    public confirmar_exclusao(){
        this.excluir_dialog = false;
        this.confirmar_exclusao_dialog = true;
    }


    public excluir() {
        this.confirmar_exclusao_dialog = false;
        this.dados.excluir();
        this.voltar('lista');
    }

}
