import { Component, OnInit } from '@angular/core';

import 'firebase/database';

import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';


import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

import {ConfirmationService} from 'primeng/api';

import * as _ from 'lodash';


@Component({
    selector: 'app-edit_lancamentos',
    templateUrl: './edit-lancamentos.component.html',
    providers: [ConfirmationService]
})

export class EditLancamentosComponent implements OnInit {

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

    public meios_de_pagamento : any[];
    public selected_meio_de_pagamento: any;

    public button1 : string = '';
    public button2 : string = '';
    public button3 : string = '';
    public button4 : string = '';
    public button5 : string = '';
    public button6 : string = '';
    public button7 : string = '';
    public button8 : string = '';

    public listar_clientes : boolean = false;
    public listar_socios : boolean = false;
    public listar_fornecedores : boolean = false;
    public listar_equipe : boolean = false;

    public listar_orcamentos : boolean = false;
    public listar_profissionais : boolean = false;
    public listar_centros_de_custos : boolean = false;
    public listar_centros_de_custos_receita : boolean = false;
    public listar_centros_de_custos_despesa : boolean = false;
    public listar_bancos_1 : boolean = false;
    public listar_bancos_2 : boolean = false;
    public listar_bancos_3 : boolean = false;

    public lista_de_profissionais : any = [];
    public rows_profissionais : number = 5;
    public rows_responsavel : number = 5;

    public orcamentos : any;

    public paginator_status_profissionais : boolean = true;

    public pode_excluir : boolean = false;
    public pode_estornar : boolean = false;

    public listar_estoque : boolean = false;

    public imagem_normal : boolean = true;
    public imagem_maior1 : boolean = false;
    public imagem_maior2 : boolean = false;

    public vendaDiretaDialog : boolean = false;
    public confirmar_atendimento_sem_obs : boolean = false;

    public estornar_ou_excluir_dialog : boolean = false;
    public confirmar_estorno_dialog : boolean = false;
    public confirmar_exclusao_dialog : boolean = false;

    public ultimo_cadastrado : string = '';

    public TEMP : any = {
        idade : ''
    }

    ngOnInit(): void {
        console.log("\n\nINIT edit");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);
        console.log("===========================");
        console.log("this.dados.voltar_pilha");
        console.log(this.dados.voltar_pilha);
        console.log("===========================");


        this.dados.salvou_registro = false;

        this.imagem_normal = true;
        this.dados.mostrar_imagens_na_lista_estoque = false;

        // EXCLUIR REGISTRO (pode_excluir)
        this.pode_excluir = this.config[this.dados.PARAMETRO].pode_excluir ? this.config[this.dados.PARAMETRO].pode_excluir : false;

        // ESTORNAR (pode_estornar)
        this.pode_estornar = ['LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA'].includes(this.dados.PARAMETRO);


        if(this.dados.PARAMETRO == 'BANCOS'){
            this.dados.selected_edit.corrente = true;
        }

        if (this.dados.PARAMETRO == "LANCAMENTOS_RECEITA" || this.dados.PARAMETRO == "LANCAMENTOS_DESPESA" || this.dados.PARAMETRO == "REL_RECEITAS_E_DESPESAS"){

            this.dados.filtro_digitado = '';

            this.button1 = 'button_off';
            this.button2 = 'button_off';
            this.button3 = 'button_off';
            this.button4 = 'button_off';
            this.button5 = 'button_off';
            this.button6 = 'button_off';
            this.button7 = 'button_off';
            this.button8 = 'button_off';

            if(this.dados.selected_edit.meio_de_pagamento == 'dinheiro'){ this.button1 = 'button_brown'; }
            if(this.dados.selected_edit.meio_de_pagamento == 'cheque'){ this.button2 = 'button_brown'; }
            if(this.dados.selected_edit.meio_de_pagamento == 'cheque_pre'){ this.button3 = 'button_brown'; }
            if(this.dados.selected_edit.meio_de_pagamento == 'debito'){ this.button4 = 'button_brown'; }
            if(this.dados.selected_edit.meio_de_pagamento == 'credito'){ this.button5 = 'button_brown'; }
            if(this.dados.selected_edit.meio_de_pagamento == 'comissao_a_receber'){ this.button6 = 'button_brown'; }

            if(this.dados.selected_edit.centros_de_custos_codigo=='R-002'){
                this.dados.selected_edit.meio_de_pagamento = 'comissao_a_receber';
            }

            // Quantidade inicial
            this.dados.selected_edit.quantidade = 1;

            console.log("=============================");

            let centro_de_custos = this.dados.selected.centro_de_custos ? this.dados.selected.centro_de_custos : this.dados.centro_de_custos_escolhido.nome;
            // console.log("centro_de_custos = " + centro_de_custos);

            if (centro_de_custos == 'Consulta Odontológica') {
                this.dados.observar_registros('DENTISTAS');
            }
            else if(centro_de_custos == 'Consulta Médica') {
                this.dados.observar_registros('MEDICOS');
            }

        }

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
        this.pode_fazer_upload = this.config[this.dados.PARAMETRO].pode_fazer_upload;

        this.label_nome = this.config[this.dados.PARAMETRO].label_nome ? this.config[this.dados.PARAMETRO].label_nome : "Nome";
        this.label_obs = this.config[this.dados.PARAMETRO].label_obs ? this.config[this.dados.PARAMETRO].label_obs : "Obs";

        this.dados.incluiu = false;
        this.dados.alta_anterior = this.dados.selected_edit.alta;

        if(!this.dados.selected_edit.key) {
            // REGISTRO NOVO
            console.log("incluindo registro em PARAMETRO " + this.dados.PARAMETRO);


            // cidade e estado iniciais
            if(this.config[this.dados.PARAMETRO].cidade && this.dados.usuario_logado.cidade_default){
                this.dados.selected_edit.cidade =  this.dados.usuario_logado.cidade_default;
            }
            if(this.config[this.dados.PARAMETRO].estado && this.dados.usuario_logado.estado_default){
                this.dados.selected_edit.estado =  this.dados.usuario_logado.estado_default;
            }
        }


        this.util.goTop();  // sobe a tela pro topo
    }


    public mostrar_imagens(){
        if(this.dados.mostrar_imagens_na_lista_estoque){
            this.dados.mostrar_imagens_na_lista_estoque = false;
        }
        else {
            this.dados.mostrar_imagens_na_lista_estoque = true;
        }
    }


    public mostrar_contrapartes(){
        if (this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA'){
            console.log("this.dados.selected_edit.contraparte");
            console.log(this.dados.selected_edit.contraparte);

            this.dados.filterDatabase(this.dados.selected_edit.contraparte,'CLIENTES');
            this.listar_clientes = true;
            console.log("listar_clientes");

            if(this.config.ATIVAR_SOCIOS){
                this.dados.filterDatabase(this.dados.selected_edit.contraparte,'SOCIOS');
                this.listar_socios = true;
                console.log("listar_socios");
            }

        }
        else if (this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA'){
            this.dados.filterDatabase(this.dados.selected_edit.contraparte,'FORNECEDORES');
            this.listar_fornecedores = true;
            console.log("listar_fornecedores");
        }
    }

    public definiu_produto(){
        if(this.dados.selected_edit.produto){
            if(this.dados.selected_edit.centro_de_custos_codigo=='R-001'){
                if(this.dados.filtered_estoque.length == 0){
                    // Não escolheu do estoque.
                    // Confirma se é uma Venda Direta
                    this.dados.selected_edit.produto = this.util.capitalizar(this.dados.selected_edit.produto);
                    this.vendaDiretaDialog = true;
                }
            }
            else {
                this.dados.selected_edit.produto = this.util.capitalizar(this.dados.selected_edit.produto);
            }
            this.dados.selected_edit.nome = this.dados.selected_edit.produto;
        }
    }


    public mostrar_produtos_estoque(){
        if(this.dados.selected_edit.centro_de_custos_codigo=='R-001'){
            this.dados.filterDatabase(this.dados.selected_edit.produto,'ESTOQUE')

            this.dados.selected_edit.produto_id = '';
            this.dados.selected_edit.produto_codigo = '';
            this.dados.selected_edit.nome = '';
            this.dados.selected_edit.img_url = '';
            this.dados.selected_edit.img_url2 = '';
            this.dados.selected_edit.comissionavel = false;
            this.dados.selected_edit.valor_unitario = '';
            this.dados.selected_edit.valor = '';

            this.listar_estoque = true;
        }
    }


    public escolherProdutoEmEstoque(registro){
        console.log("escolherProdutoEmEstoque : ");
        console.log(registro);

        this.dados.produto_escolhido = registro;

        this.dados.selected_edit.produto = registro.nome;
        this.dados.selected_edit.produto_id = registro.key;
        this.dados.selected_edit.produto_codigo = registro.codigo ? registro.codigo : '';
        this.dados.selected_edit.nome = registro.nome;
        
        this.dados.selected_edit.img_url = registro.img_url ? registro.img_url : '';
        this.dados.selected_edit.img_url2 = registro.img_url2 ? registro.img_url2 : '';
        this.dados.selected_edit.tipo_da_imagem1 = registro.tipo_da_imagem1 ? registro.tipo_da_imagem1 : '';
        this.dados.selected_edit.tipo_da_imagem2 = registro.tipo_da_imagem2 ? registro.tipo_da_imagem2 : '';
        this.dados.selected_edit.origem_da_imagem1 = registro.origem_da_imagem1 ? registro.origem_da_imagem1 : '';
        this.dados.selected_edit.origem_da_imagem2 = registro.origem_da_imagem2 ? registro.origem_da_imagem2 : '';

        this.dados.selected_edit.quantidade = 1;

        if(this.dados.PARAMETRO=='LANCAMENTOS_RECEITA'){
            this.dados.selected_edit.valor_unitario = registro.preco_venda;
            this.dados.selected_edit.valor = registro.preco_venda;
        }
        else if(this.dados.PARAMETRO=='LANCAMENTOS_DESPESA'){
            this.dados.selected_edit.valor_unitario = registro.preco_custo;
            this.dados.selected_edit.valor = registro.preco_custo;
        }

        this.dados.selected_edit.comissionavel = registro.comissionavel ? true : false;
        this.listar_estoque = false;

        console.log("this.dados.selected_edit após escolherProdutoEmEstoque");
        console.log(this.dados.selected_edit);
        console.log("this.imagem_normal = " + this.imagem_normal);

        this.ajusta_valor();
    }


    public confirma_venda_direta(confirmacao : boolean){
        this.vendaDiretaDialog = false;

        if (confirmacao) {
            this.dados.selected_edit.centro_de_custos = 'Venda Direta';
            this.dados.centro_de_custos_escolhido.nome = 'Venda Direta';
            this.dados.selected_edit.centro_de_custos_codigo = 'R-002';
            this.dados.centro_de_custos_escolhido.id = 'R-002';
        }
    }

    public ajusta_valor(){
        if(this.dados.selected_edit.desconto && this.dados.util.isString(this.dados.selected_edit.desconto)){
            this.dados.selected_edit.desconto = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.desconto);
        }
        if(this.dados.selected_edit.valor_unitario && this.dados.util.isString(this.dados.selected_edit.valor_unitario)){
            this.dados.selected_edit.valor_unitario = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor_unitario);
        }
        if(this.dados.selected_edit.valor && this.dados.util.isString(this.dados.selected_edit.valor)){
            this.dados.selected_edit.valor = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor);
        }
        if(this.dados.selected_edit.comissao && this.dados.util.isString(this.dados.selected_edit.comissao)){
            this.dados.selected_edit.comissao = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.comissao);
        }
        if(this.dados.selected_edit.valor_total && this.dados.util.isString(this.dados.selected_edit.valor_total)){
            this.dados.selected_edit.valor_total = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor_total);
        }

        if(['R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo)){
            // Venda Direta
            if(this.dados.selected_edit.valor_unitario && this.dados.selected_edit.quantidade && this.dados.selected_edit.quantidade > 0){
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_unitario * this.dados.selected_edit.quantidade;
            }
            else {
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_unitario;
                this.dados.selected_edit.quantidade = 1;
            }
            if(this.dados.selected_edit.desconto && this.dados.selected_edit.desconto > 0){
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_total - this.dados.selected_edit.desconto;
            }
        }
        if(!['R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo)){
            // Não é Venda Direta
            if(this.dados.selected_edit.valor_unitario && this.dados.selected_edit.quantidade && this.dados.selected_edit.quantidade > 0){
                this.dados.selected_edit.valor = this.dados.selected_edit.valor_unitario * this.dados.selected_edit.quantidade;
            }
            else {
                this.dados.selected_edit.valor = this.dados.selected_edit.valor_unitario;
                this.dados.selected_edit.quantidade = 1;
            }

            if(this.dados.selected_edit.desconto && this.dados.selected_edit.desconto > 0){
                this.dados.selected_edit.valor = this.dados.selected_edit.valor - this.dados.selected_edit.desconto;
            }
        }


        // Formata os valores para exibir na tela
        this.dados.selected_edit.desconto = this.util.formata_valor(this.dados.selected_edit.desconto);
        this.dados.selected_edit.valor_unitario = this.util.formata_valor(this.dados.selected_edit.valor_unitario);
        this.dados.selected_edit.valor = this.util.formata_valor(this.dados.selected_edit.valor);
        this.dados.selected_edit.valor_total = this.util.formata_valor(this.dados.selected_edit.valor_total);
        this.dados.selected_edit.comissao = this.util.formata_valor(this.dados.selected_edit.comissao);
    }



    public ajusta_valor_receita(){
        if(this.dados.selected_edit.desconto && this.dados.util.isString(this.dados.selected_edit.desconto)){
            this.dados.selected_edit.desconto = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.desconto);
        }
        if(this.dados.selected_edit.valor_unitario && this.dados.util.isString(this.dados.selected_edit.valor_unitario)){
            this.dados.selected_edit.valor_unitario = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor_unitario);
        }
        if(this.dados.selected_edit.valor && this.dados.util.isString(this.dados.selected_edit.valor)){
            this.dados.selected_edit.valor = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor);
        }
        if(this.dados.selected_edit.comissao && this.dados.util.isString(this.dados.selected_edit.comissao)){
            this.dados.selected_edit.comissao = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.comissao);
        }
        if(this.dados.selected_edit.valor_total && this.dados.util.isString(this.dados.selected_edit.valor_total)){
            this.dados.selected_edit.valor_total = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor_total);
        }

        if(['R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo)){
            // Venda Direta
            if(this.dados.selected_edit.valor_unitario && this.dados.selected_edit.quantidade && this.dados.selected_edit.quantidade > 0){
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_unitario * this.dados.selected_edit.quantidade;
            }
            else {
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_unitario;
                this.dados.selected_edit.quantidade = 1;
            }
            if(this.dados.selected_edit.desconto && this.dados.selected_edit.desconto > 0){
                this.dados.selected_edit.valor_total = this.dados.selected_edit.valor_total - this.dados.selected_edit.desconto;
            }
        }
        if(!['R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo)){
            // Não é Venda Direta
            if(this.dados.selected_edit.valor_unitario && this.dados.selected_edit.quantidade && this.dados.selected_edit.quantidade > 0){
                this.dados.selected_edit.valor = this.dados.selected_edit.valor_unitario * this.dados.selected_edit.quantidade;
            }
            else {
                this.dados.selected_edit.valor = this.dados.selected_edit.valor_unitario;
                this.dados.selected_edit.quantidade = 1;
            }
            if(this.dados.selected_edit.desconto && this.dados.selected_edit.desconto > 0){
                this.dados.selected_edit.valor = this.dados.selected_edit.valor - this.dados.selected_edit.desconto;
            }
        }


        // Formata os valores para exibir na tela
        this.dados.selected_edit.desconto = this.util.formata_valor(this.dados.selected_edit.desconto);
        this.dados.selected_edit.valor_unitario = this.util.formata_valor(this.dados.selected_edit.valor_unitario);
        this.dados.selected_edit.valor = this.util.formata_valor(this.dados.selected_edit.valor);
        this.dados.selected_edit.valor_total = this.util.formata_valor(this.dados.selected_edit.valor_total);
        this.dados.selected_edit.comissao = this.util.formata_valor(this.dados.selected_edit.comissao);
    }



    public ajusta_valor_despesa(){
        let valor_unitario, quantidade, desconto, valor;

        if(this.dados.selected_edit.valor_unitario && this.dados.util.isString(this.dados.selected_edit.valor_unitario)){
            valor_unitario = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.valor_unitario);
        }
        else {
            valor_unitario = 0;
        }

        if(this.dados.selected_edit.desconto && this.dados.util.isString(this.dados.selected_edit.desconto)){
            desconto = this.util.converte_valores_formatados_para_numero(this.dados.selected_edit.desconto);
        }
        else {
            desconto = 0;
        }

        quantidade = Number(this.dados.selected_edit.quantidade);
        valor = (valor_unitario * quantidade) - desconto;

        // Formata os valores para exibir na tela
        this.dados.selected_edit.valor_unitario = this.util.formata_valor(valor_unitario);
        this.dados.selected_edit.desconto = this.util.formata_valor(desconto);
        this.dados.selected_edit.valor = this.util.formata_valor(valor);
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


    public escolherFornecedor(registro){
        this.dados.selected_edit.contraparte = registro.nome;
        this.dados.selected_edit.contraparte_cpf = registro.cpf ? registro.cpf : '';
        this.dados.selected_edit.contraparte_cnpj = registro.cnpj ? registro.cnpj : '';
        this.dados.selected_edit.contraparte_key = registro.key;
        this.listar_fornecedores = false;

        // reproduz o registro do fornecedor identificando-o em dados.fornecedor
        this.dados.fornecedor = registro;
        console.log(registro);

        // Abre lista de orcamentos
        // this.mostrar_lista_de_orcamentos();
    }


    public mostrar_lista_de_bancos(tipo, campo, local_na_pagina){
        console.log("mostrar_lista_de_bancos(" + tipo + ")\n");

        // campo é o nome do campo em edit_selected

        if(tipo == 'meus'){
            // lista apenas os bancos do usuário
            this.dados.filterDatabase(this.dados.selected_edit[campo],'BANCOS');
            this[local_na_pagina] = true;
        }

        else if (tipo == 'todos'){
            // lista todos os bancos, com códigos
            this.dados.filterDatabase(this.dados.selected_edit[campo],'CODIGOS_DE_BANCOS');
            this[local_na_pagina] = true;
        }

    }

    public escolherBanco(registro, campo, local_na_pagina){
        console.log("escolherBanco(registro," + campo + ")\n");
        console.log(registro);
        this.dados.selected_edit[campo] = registro.nome;

        this.dados.selected_edit.agencia = registro.agencia;
        this.dados.selected_edit.conta = registro.conta;

        this[local_na_pagina] = false;
    }



    public mostrar_centros_de_custos(){
        if(this.dados.PARAMETRO=='LANCAMENTOS_RECEITA'){
            this.dados.filterDatabase(this.dados.selected_edit.centro_de_custos,'RECEITAS');
            this.listar_centros_de_custos_receita = true;
            this.listar_centros_de_custos_despesa = false;
        }
        if(this.dados.PARAMETRO=='LANCAMENTOS_DESPESA'){
            this.dados.filterDatabase(this.dados.selected_edit.centro_de_custos,'DESPESAS');
            this.listar_centros_de_custos_despesa = true;
            this.listar_centros_de_custos_receita = false;
        }
    }

    public escolherCentroDeCustos(registro){
        console.log("escolherCentroDeCustos :");
        console.log(registro);
        this.dados.selected_edit.centro_de_custos = registro.nome;
        this.dados.selected_edit.centro_de_custos_codigo = registro.id;
        this.dados.centro_de_custos_escolhido.nome = registro.nome;
        this.dados.centro_de_custos_escolhido.id = registro.id;
        this.dados.selected_edit.comissionavel = registro.comissionavel ? true : false;

        this.listar_centros_de_custos_receita = false;
        this.listar_centros_de_custos_despesa = false;

        // rearruma os valores devido às diferenças entre Venda Direta e Venda de Estoque
        if(['R-001','R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo)){
                this.ajusta_valor();
        }
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

            this.config.DISPLAY.Lista = true;
            this.config.DISPLAY.Registro = false;
            this.config.DISPLAY.EditLancamentos = false;
        }

        else {
            console.log("Destino vazio => volta para detail");

            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.EditLancamentos = false;
            this.config.DISPLAY.Registro = true;
        }

        console.log("==================");
        console.log("destino = " + destino);
        console.log("==================");
    }


    public opt(opcao){
        if ( ['dinheiro','debito','credito'].includes(this.dados.selected_edit.meio_de_pagamento) ){
            // Estava selecionado como pago em dinheiro, debito ou credito. Se muda, apaga o QUITADO.
            this.dados.selected_edit.quitado = false;
        }

        this.button1 = 'button_off';
        this.button2 = 'button_off';
        this.button3 = 'button_off';
        this.button4 = 'button_off';
        this.button5 = 'button_off';
        this.button6 = 'button_off';
        this.button7 = 'button_off';
        this.button8 = 'button_off';
        if(opcao=='1'){ this.button1 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'dinheiro'; }
        if(opcao=='2'){ this.button2 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'cheque'; }
        if(opcao=='3'){ this.button3 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'cheque_pre'; }
        if(opcao=='4'){ this.button4 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'debito'; }
        if(opcao=='5'){ this.button5 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'credito'; }
        if(opcao=='6'){ this.button6 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = 'comissao_a_receber'; }
        if(opcao=='7'){ this.button7 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = ''; }
        if(opcao=='8'){ this.button8 = 'button_brown'; this.dados.selected_edit.meio_de_pagamento = ''; }

        if ( this.dados.PARAMETRO=='LANCAMENTOS_RECEITA' && this.dados.selected_edit.meio_de_pagamento=='credito') {
            this.seta_data();  // vai configurar automaticamente a data de credito do cartão de credito
        }

        if ( ['dinheiro','debito'].includes(this.dados.selected_edit.meio_de_pagamento) ){
            // dinheiro, debito ou credito: já assinala como QUITADO também
            this.dados.selected_edit.quitado = true;
        }
        if ( this.dados.selected_edit.meio_de_pagamento != 'credito') {
            this.dados.selected_edit.data_credito = '';
            this.dados.selected_edit.aguardando = false;
        }

        // Limpa campo de data do cheque pré, pois se mudou a opção deixa de valer a data anterio
        this.dados.selected_edit.data_cheque_pre = '';

        this.ajusta_valor_despesa();
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
        }
        return hoje;
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
        }
        return hora;
    }




    public salvar(param : string = ''){
        console.log("salvar(" + param + ")\n");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);

        // TODO --- É preciso checar e exigir antes de salvar que informe o CPF e PAGADOR para CLIENTES, incluindo menores de idade?

        this.dados.parametro_de_salvar = param ? param : '';
        this.dados.salvou_registro = false;

        if(['ORCAMENTOS','PAGAMENTOS','LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA'].includes(this.dados.PARAMETRO)){
            // o   campo data e data_quando são a data real para o registro,
            // já que criado_em e criado_quando são referentes à criação do registro, mas não necessariamente o dia real do evento

            if(this.dados.selected_edit.atendimento){
                this.dados.selected_edit.atendimento_quando = this.util.quando_em_milisegundos(this.dados.selected_edit.atendimento);
            }

            if(!this.dados.selected_edit.pagamento && this.dados.selected_edit.atendimento){
                this.dados.selected_edit.pagamento = this.dados.selected_edit.atendimento;
            }

            if(this.dados.selected_edit.pagamento){
                this.dados.selected_edit.pagamento_quando = this.util.quando_em_milisegundos(this.dados.selected_edit.pagamento);
            }
            else if(this.dados.selected_edit.criado_em){
                this.dados.selected_edit.pagamento = this.dados.selected_edit.criado_em;
                this.dados.selected_edit.pagamento_quando = this.dados.selected_edit.criado_quando;
            }

            if(this.dados.selected_edit.data) {
                this.dados.selected_edit.data_quando = this.util.quando_em_milisegundos(this.dados.selected_edit.data);
            }
        }


        if (this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA' || this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA') {
            if(!this.dados.selected_edit.centro_de_custos){
                // incluindo
                this.dados.selected_edit.centro_de_custos = this.dados.centro_de_custos_escolhido.nome;
                this.dados.selected_edit.centro_de_custos_codigo = this.dados.centro_de_custos_escolhido.id;
            }
            if(this.dados.selected_edit.centro_de_custos_codigo=='R-002'){
                this.dados.selected_edit.meio_de_pagamento = 'comissao_a_receber';
            }
        }

        // TESTANDO CAMPOS
        if(this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA'){
            console.log("TESTANDO CAMPOS")
            console.log(this.dados.selected_edit);

            if(!this.dados.selected_edit.data){
                console.log("if(!this.dados.selected_edit.data){");

                this.popup_alerta('ATENÇÃO','Preencha a DATA');
                return;
            }
            if(['R-001','R-002'].includes(this.dados.selected_edit.centro_de_custos_codigo) && (!this.dados.selected_edit.produto && !this.dados.selected_edit.nome)){
                this.popup_alerta('ATENÇÃO','Indique o PRODUTO');
                return;
            }
            if(!this.dados.selected_edit.valor){
                this.popup_alerta('ATENÇÃO','Preencha o VALOR');
                return;
            }
            else if(!this.dados.selected_edit.meio_de_pagamento){
                this.popup_alerta('ATENÇÃO','Indique o MEIO DE PAGAMENTO');
                return;
            }
            else if(this.dados.selected_edit.meio_de_pagamento=='cheque_pre' && !this.dados.selected_edit.data_cheque_pre){
                this.popup_alerta('ATENÇÃO','Indique a DATA PARA DEPÓSITO do cheque pré-datado');
                return;
            }
            else if(!this.dados.selected_edit.contraparte){
                this.dados.selected_edit.contraparte_key = '';
                this.dados.selected_edit.contraparte_cpf = '';
                this.dados.selected_edit.contraparte_cnpj = '';

                this.popup_alerta('ATENÇÃO','Indique o PAGADOR');
                return;
            }
            else if(!this.dados.selected_edit.orcamento && (['Consulta Médica','Consulta Odontológica'].includes(this.dados.selected_edit.centro_de_custos)) ){
                this.dados.selected_edit.orcamento_key = '';

                this.popup_alerta('ATENÇÃO','Indique o ORÇAMENTO a que se refere');
                this.listar_orcamentos = true;
                return;
            }
            else if(!this.dados.selected_edit.profissional_nome && ( ['Consulta Médica','Consulta Odontológica'].includes(this.dados.selected_edit.centro_de_custos) ) ){
                this.dados.selected_edit.profissional_key = '';
                this.dados.selected_edit.profissional_cpf = '';
                this.dados.selected_edit.profissional_profisao = '';
                this.dados.selected_edit.profissional_categoria = '';

                this.popup_alerta('ATENÇÃO','Indique o PROFISSIONAL que atendeu');
                return;
            }
        }

        if(this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA'){
            if(!this.dados.selected_edit.data){
                this.popup_alerta('ATENÇÃO','Preencha a DATA');
                return;
            }
            else if(!this.dados.selected_edit.valor){
                this.popup_alerta('ATENÇÃO','Preencha o VALOR');
                return;
            }
            else if(!this.dados.selected_edit.meio_de_pagamento){
                this.popup_alerta('ATENÇÃO','Indique o MEIO DE PAGAMENTO');
                return;
            }
            else if(!this.dados.selected_edit.contraparte){
                this.dados.selected_edit.contraparte_key = '';
                this.dados.selected_edit.contraparte_cpf = '';

                this.popup_alerta('ATENÇÃO','Indique o RECEBEDOR');
                return;
            }
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
        this.estornar_ou_excluir_dialog = true;
    }

    public confirmar_estorno(){
        this.estornar_ou_excluir_dialog = false;
        this.confirmar_estorno_dialog = true;
    }

    public confirmar_exclusao(){
        this.estornar_ou_excluir_dialog = false;
        this.confirmar_exclusao_dialog = true;
    }

    public estornar() {
        this.confirmar_estorno_dialog = false;
        this.dados.estornar();
        this.voltar('lista');
    }

    public excluir() {
        this.confirmar_exclusao_dialog = false;
        this.dados.excluir();
        this.voltar('lista');
    }

    public mudou_nascimento(){
        this.dados.selected_edit.nascimento = this.util.formata_data(this.dados.selected_edit.nascimento);
        this.TEMP.idade = this.util.get_idade_str(this.dados.selected_edit.nascimento);
    }
    //
    // public download_imagem_do_firestore(qual){
    //     if(qual==1){
    //         if(this.dados.selected_edit.img_url && this.dados.selected_edit.tipo_da_imagem1 == 'firestore'){
    //             this.filePath = this.dados.selected_edit.img_url;
    //             this.tipo_da_imagem1 = this.dados.selected_edit.tipo_da_imagem1;
    //             this.downloadURLfirestore1 = this.afStorage.ref(this.filePath).getDownloadURL();
    //         }
    //     }
    //     else if(qual==2){
    //         if(this.dados.selected_edit.img_url2 && this.dados.selected_edit.tipo_da_imagem2 == 'firestore'){
    //             this.filePath = this.dados.selected_edit.img_url2;
    //             this.tipo_da_imagem2 = this.dados.selected_edit.tipo_da_imagem2;
    //             this.downloadURLfirestore2 = this.afStorage.ref(this.filePath).getDownloadURL();
    //         }
    //     }
    // }

}
