import { NgModule, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

    constructor(
        public dados: DadosService,
        public util: UtilService,
        public config: ConfigService,
    ) {
        // this.dados.remover_filtros();
    }

    public value : string = '';
    public rodape : string = '';
    public no_records : string = 'Nenhum registro';
    public cols : any = {};
    public config_headers: any = {};
    public data : string = '';
    public header : string = '';
    public pagina : number = 0;
    public paginas : number = 0;
    public database : string = '';
    public registro: any;
    public registros: any[];
    public selected: any;

    public loading: boolean;
    public quantas_paginas: number = 0;
    public PARAMETRO : string;
    public busca : string = '';

    public links_de_paginas : number = 5;
    public indicar_atividade : boolean = false;
    public indicar_atividade_todos : boolean = false;

    public editar : boolean = false;
    public editar_admin : boolean = false;

    public ver_detalhes : boolean = false;
    public detalhes_nome : string = "";

    private tempo_de_ausencia : string = '';

    public mensagem : string = '';
    public mensagem_encoded : string = '';
    public url : string = '';
    public url_web : string = '';

    public temp : any;
    public nome : string = '';

    public confirma_envio_mensagem : boolean = false;
    public assunto_da_mensagem : string = '';
    public titulo_lista : string = '';

    public mostrar_opcao_1 : boolean = false;
    public mostrar_opcao_2 : boolean = false;
    public menu_financeiro_opcao2_classe : string;
    public menu_financeiro_opcao1_classe : string;
    public mostrar_cheque_pre_dados : boolean = false;
    public mostrar_cheque_pre_recebidos : boolean = false;
    public mostrar_extrato_caixa : boolean = false;
    public mostrar_extrato_bancos : boolean = false;
    public mostrar_estornos : boolean = false;

    public confirmar_estorno_popup : boolean = false;
    public registro_para_estornar : any = {};

    public valor_total_receitas : number = 0;
    public valor_total_despesas : number = 0;

    public valor_total_receitas_dinheiro : number = 0;
    public valor_total_despesas_dinheiro : number = 0;
    public valor_total_receitas_cheque : number = 0;
    public valor_total_despesas_cheque : number = 0;
    public valor_total_receitas_cheque_pre : number = 0;
    public valor_total_despesas_cheque_pre : number = 0;
    public valor_total_receitas_debito : number = 0;
    public valor_total_despesas_debito : number = 0;
    public valor_total_receitas_credito : number = 0;
    public valor_total_despesas_credito : number = 0;


    public popup_de_aviso : boolean = false;
    public aviso_titulo : string = "";
    public aviso_mensagem : string = "";


    public lista_de_disponibilidade : any;
    public saldo_caixa_dinheiro : number = 0;
    public saldo_caixa_pre : number = 0;
    public saldo_caixa_cheque : number = 0;
    public bancos : any = {};
    public saldo_disponivel_hoje : number = 0;

    public itens : any = {};
    public receitas_deste_cliente : any;
    public receitas_deste_cliente_total : number = 0;
    public restante_deste_cliente : number = 0;

    // Escolha do centro de custos
    public filtro_centros_receita : boolean = false;
    public filtro_centros_despesa : boolean = false;

    // paginator_status
    public paginator_status : boolean = true;
    public paginator_destaque_status : boolean = true;
    public paginator_status_planos : boolean = true;
    public paginator_status_centros_de_custos : boolean = true;
    public paginator_status_receitas : boolean = true;
    public paginator_status_despesas : boolean = true;
    public paginator_status_rel_dinheiro : boolean = true;
    public paginator_status_rel_cheque_receitas : boolean = true;
    public paginator_status_rel_cheque_despesas : boolean = true;

    public paginator_status_rel_cheque_pre_receitas : boolean = true;
    public paginator_status_rel_cheque_pre_despesas : boolean = true;
    public paginator_status_centros_de_custos_receitas : boolean = true;
    public paginator_status_centros_de_custos_despesas : boolean = true;

    public paginator_rel_receitas : boolean = true;
    public paginator_rel_despesas : boolean = true;
    public filter_rel_receitas : boolean = false;
    public filter_rel_despesas : boolean = false;

    public paginator_status_profissionais : boolean = true;

    public paginator_CENTROS_DE_CUSTOS_LISTA_receita : boolean = true;
    public paginator_centros_despesa : boolean = true;
    public paginator_estorno_receitas : boolean = true;
    public paginator_estorno_despesas : boolean = true;

    // popup de alerta
    public popupAlerta : boolean = false;
    public alerta_titulo : string = '';
    public alerta_linha1 : string = '';
    public alerta_linha2 : string = '';

    public popupReceitaDespesa : boolean = false;

    public atendimento_hoje : boolean = false;
    public atendimento_inativo : boolean = false;
    public atendimento_aberto : boolean = false;
    public atendimento_em_curso : boolean = false;
    public atendimento_finalizado : boolean = false;

    ngOnInit(): void {
        console.log("\n\n\n");
        console.log("\n\nINIT listagens");
        console.log(this.dados.PARAMETRO);
        console.log(this.config[this.dados.PARAMETRO].selected);
        console.log(this.dados[this.config[this.dados.PARAMETRO].selected]);
        console.log("\n\n\n");

        console.log("==========================");
        console.log("this.usuario_logado");
        console.log("==========================");
        console.log(this.dados.usuario_logado);
        console.log(this.dados.auth_object.displayName);
        console.log(this.dados.auth_object.email);
        console.log(this.dados.auth_object.photoURL);
        console.log(this.dados.auth_object.uid);
        console.log(this.dados.auth_object.providerId);
        console.log("==========================");


        this.dados.HOJE = this.util.hoje();
        this.dados.HOJE_QUANDO = this.util.converte_data_para_milisegundos(this.dados.HOJE);


        this.dados.usuario_logado = this.dados.meu_perfil();

        if (this.dados.cliente && this.dados.cliente.nome) {
            this.nome = this.dados.cliente.nome;
        }
        else if (this.dados.registro && this.dados.registro.nome){
            this.nome = this.dados.registro.nome;
        }

        this.dados.mostrar_imagens_na_lista_estoque = false;

        this.mostrar_lista('1');

        // AJUSTES EVENTUAIS EM CAMPOS: ADAPTAR O CODIGO ABAIXO
        // this.dados.ajustar_campos();


        this.mostrar_tela();
    }

    public mostrar_tela() {
        console.log("\n\n\n");
        console.log("\n\n mostrar_tela");
        console.log("PARAMETRO = " + this.dados.PARAMETRO);

        this.dados.remover_filtros();


        if(this.dados.PARAMETRO){
            console.log("listagens / mostrar_tela");
            console.log(this.dados.PARAMETRO);

            console.log("\n\n\n");
            console.log("===========================");
            console.log("\n\nINIT listagens");
            console.log("===========================");
            console.log(this.dados.PARAMETRO);
            console.log(this.config[this.dados.PARAMETRO].selected);
            console.log(this.dados[this.config[this.dados.PARAMETRO].selected]);
            console.log("this.dados.usuario_logado");
            console.log(this.dados.usuario_logado);
            console.log(this.dados.usuario_logado.dataset);
            console.log("===========================");
            console.log("this.dados." + this.config[this.dados.PARAMETRO].selected);
            console.log(this.dados[this.config[this.dados.PARAMETRO].selected]);
            console.log("===========================");
            console.log("\n\n\n");

            if (['CLIENTES','EQUIPE','FORNECEDORES','ATENDIMENTOS','ESTOQUE',
                'HISTORICOS','RELATORIOS','BANCOS','CAIXA',
                'LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA'].includes(this.dados.PARAMETRO)){
                this.dados.filterDatabase(this.dados.filtro && this.dados.filtro.length>0 ? this.dados.filtro : ' ');

                console.log("this.dados.selected_clientes_ultimos_visualizados")
                console.log(this.dados.selected_clientes_ultimos_visualizados)
            }

            if (['FINANCEIRO'].includes(this.dados.PARAMETRO)){
                this.dados.filterBooleanFinanceiro('embreve',false);
            }
            if (['RELATORIOS'].includes(this.dados.PARAMETRO)){
                this.dados.filterBooleanRelatorios('embreve',false);
            }


            if(this.dados.origem){
                console.log("origem = " + this.dados.origem);
            }

            if(this.dados.cliente && this.dados.cliente.nome){
                console.log("dados.cliente :");
                console.log(this.dados.cliente);
            }

            this.dados.database = this.config[this.dados.PARAMETRO].database;
            this.dados.set_titulo_pagina(this.config[this.dados.PARAMETRO].titulo_lista ? this.config[this.dados.PARAMETRO].titulo_lista : '');
            this.titulo_lista = this.dados.titulo_pagina ? this.dados.titulo_pagina : this.dados.PARAMETRO && this.config[this.dados.PARAMETRO] && this.config[this.dados.PARAMETRO].titulo_lista ? this.config[this.dados.PARAMETRO].titulo_lista : '';


            if (this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA'){
                // Receitas
                if (this.dados.selected_receitas.length <= this.config.QUANTOS_POR_PAGINA.LANCAMENTOS_RECEITA){
                    this.paginator_status_receitas = false;
                    this.filtro_centros_receita = false;
                }
                else {
                    this.paginator_status_receitas = true;
                    this.filtro_centros_receita = true;
                }

                // Se veio da ficha de cliente
                if(this.dados.origem == 'CLIENTES' && this.dados.cliente){
                    this.dados.mostrar_centros_de_custos_receita = false;  // xxxxxxxxxxxxxxxxxxxxxxxxnome
                    this.dados.filterDatabase(' ','LANCAMENTOS_RECEITA');


                    this.dados.p_header = this.dados.cliente.nome;
                    this.dados.listar_coluna_centro_de_custos = true;
                    this.dados.listar_coluna_contraparte = false;

                    console.log("origem");
                    console.log(this.dados.origem);
                    console.log("dados.listar_coluna_centro_de_custos");
                    console.log(this.dados.listar_coluna_centro_de_custos);
                    console.log("dados.listar_coluna_contraparte");
                    console.log(this.dados.listar_coluna_contraparte);

                }

            }

            if (this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA'){
                // Despesas
                if (this.dados.selected_receitas.length <= this.config.QUANTOS_POR_PAGINA.LANCAMENTOS_DESPESA){
                    this.paginator_status_despesas = false;
                    this.filtro_centros_despesa = false;
                }
                else {
                    this.paginator_status_despesas = true;
                    this.filtro_centros_despesa = true;
                }

                // Se veio da ficha de fornecedor
                if(this.dados.origem == 'FORNECEDORES' && this.dados.fornecedor){
                    this.dados.mostrar_centros_de_custos_receita = false;  // xxxxxxxxxxxxxxxxxxxxxxxx
                    this.dados.mostrar_centros_de_custos_despesa = false;  // xxxxxxxxxxxxxxxxxxxxxxxx
                    this.dados.filterDatabase(' ','LANCAMENTOS_DESPESA');

                    this.dados.p_header = this.dados.fornecedor.nome;
                    this.dados.listar_coluna_centro_de_custos = true;
                    this.dados.listar_coluna_contraparte = false;

                    console.log("origem");
                    console.log(this.dados.origem);
                    console.log("fornecedor");
                    console.log(this.dados.fornecedor);

                    console.log("dados.listar_coluna_centro_de_custos");
                    console.log(this.dados.listar_coluna_centro_de_custos);
                    console.log("dados.listar_coluna_contraparte");
                    console.log(this.dados.listar_coluna_contraparte);
                }

                // Se veio da ficha de fornecedor
                if(this.dados.origem == 'FINANCEIRO'){
                    // this.dados.mostrar_centros_de_custos_receita = false;
                    // this.dados.mostrar_centros_de_custos_despesa = false;
                    // this.dados.filterContainsLancamentosDespesas();

                    // this.dados.p_header = this.dados.cliente.nome;
                    this.dados.listar_coluna_centro_de_custos = true;
                    this.dados.listar_coluna_contraparte = true;

                    console.log("origem = " + this.dados.origem);
                    // console.log("dados.listar_coluna_centro_de_custos");
                    // console.log(this.dados.listar_coluna_centro_de_custos);
                    // console.log("dados.listar_coluna_contraparte");
                    // console.log(this.dados.listar_coluna_contraparte);
                }

            }

            if(this.dados.PARAMETRO=="PAGAMENTOS"){
                // if(!this.dados.mostrar_lista_de_orcamentos){
                //     this.dados.mostrar_lista_de_orcamentos = true;
                //     this.dados.pode_incluir_lancamento = false;
                // }
                //
                // this.receitas_deste_cliente = [];
                // this.receitas_deste_cliente_total = 0;
                //
                // let registro;
                // let key = this.dados.cliente.key;
                // console.log("cliente.key = " + this.dados.cliente.key);
                //
                // // Monta a lista de RECEITAS vindas deste cliente
                // for(let i in this.dados.selected_lancamentos_receita){
                //     registro = this.dados.selected_lancamentos_receita[i];
                //     if(registro.contraparte_key == key && registro.plano_de_tratamento == this.dados.plano_de_tratamento.key ){
                //         this.receitas_deste_cliente.push(registro);
                //         this.receitas_deste_cliente_total = this.receitas_deste_cliente_total + this.util.converte_valores_formatados_para_numero(registro.valor);
                //     }
                // }
                // this.restante_deste_cliente = this.util.converte_valores_formatados_para_numero(this.dados.plano_de_tratamento.valor_do_tratamento) - this.receitas_deste_cliente_total;
                // // SORT
                // this.receitas_deste_cliente = this.receitas_deste_cliente.sort((a, b) => (a.data_quando > b.data_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }

            if(this.dados.PARAMETRO=='FINANCEIRO'){
                // if(this.dados.PARAMETRO == 'PAGAMENTOS' || this.dados.PARAMETRO=='FINANCEIRO'){
                this.dados.pode_incluir_lancamento = false;
                this.dados.centro_de_custos_escolhido = {};
                this.dados.mostrar_centros_de_custos_receita = true;
                this.dados.mostrar_centros_de_custos_despesa = true;

                //     this.dados.filterDatabase(' ','LANCAMENTOS_RECEITA');
                //     this.dados.filterDatabase(' ','LANCAMENTOS_DESPESA');
            }

            if(this.dados.PARAMETRO=='REL_CENTROS_DE_CUSTOS_TOTALIZADOS') {
                let centros_de_custos_usados_receita = {};
                let centros_de_custos_usados_despesa = {};
                let registro, key, valor1, valor2;
                this.dados.valor_total_receitas = 0;
                this.dados.valor_total_despesas = 0;

                this.dados.centros_de_custos_receitas = [];
                this.dados.centros_de_custos_despesas = [];

                // Le receitas e despesas e totaliza por centro de custos

                // RECEITAS
                for(let i in this.dados.selected_lancamentos_receita){
                    registro = this.dados.selected_lancamentos_receita[i];

                    // Monta o objeto "centros_de_custos_usados_receita"
                    if (!centros_de_custos_usados_receita[registro.centro_de_custos]){
                        centros_de_custos_usados_receita[registro.centro_de_custos] = {};
                        centros_de_custos_usados_receita[registro.centro_de_custos].centro_de_custos = registro.centro_de_custos;
                        centros_de_custos_usados_receita[registro.centro_de_custos].centro_de_custos_codigo = registro.centro_de_custos_codigo;
                        centros_de_custos_usados_receita[registro.centro_de_custos].valor = registro.valor;
                        this.dados.valor_total_receitas += this.util.converte_valores_formatados_para_numero(centros_de_custos_usados_receita[registro.centro_de_custos].valor);
                    }
                    else {
                        //soma o valor do novo registro ao centro de custo
                        valor1 = this.util.converte_valores_formatados_para_numero(centros_de_custos_usados_receita[registro.centro_de_custos].valor);
                        valor2 = this.util.converte_valores_formatados_para_numero(registro.valor);
                        centros_de_custos_usados_receita[registro.centro_de_custos].valor = this.util.formata_valor(valor1 + valor2);
                        this.dados.valor_total_receitas += valor2;
                    }
                }

                for (key of Object.keys(centros_de_custos_usados_receita)) {
                    if (key=='undefined'){} // ignorar
                    else if (Number(key)==0){} // ignorar
                    else {
                        this.dados.centros_de_custos_receitas.push(centros_de_custos_usados_receita[key]);
                    }
                }
                // SORT
                this.dados.centros_de_custos_receitas = this.dados.centros_de_custos_receitas.sort((a, b) => (a.centro_de_custos > b.centro_de_custos) ? 1 :- 1) //// sort a list of objects by a property, ascending

                // DESPESAS
                for(let i in this.dados.selected_lancamentos_despesa){
                    registro = this.dados.selected_lancamentos_despesa[i];

                    // Monta o objeto "centros_de_custos_usados_despesa"
                    if (!centros_de_custos_usados_despesa[registro.centro_de_custos]){
                        centros_de_custos_usados_despesa[registro.centro_de_custos] = {};
                        centros_de_custos_usados_despesa[registro.centro_de_custos].centro_de_custos = registro.centro_de_custos;
                        centros_de_custos_usados_despesa[registro.centro_de_custos].centro_de_custos_codigo = registro.centro_de_custos_codigo;
                        centros_de_custos_usados_despesa[registro.centro_de_custos].valor = registro.valor;
                        this.dados.valor_total_despesas += this.util.converte_valores_formatados_para_numero(centros_de_custos_usados_despesa[registro.centro_de_custos].valor);
                    }
                    else {
                        //soma o valor do novo registro ao centro de custo
                        valor1 = this.util.converte_valores_formatados_para_numero(centros_de_custos_usados_despesa[registro.centro_de_custos].valor);
                        valor2 = this.util.converte_valores_formatados_para_numero(registro.valor);
                        centros_de_custos_usados_despesa[registro.centro_de_custos].valor = this.util.formata_valor(valor1 + valor2);
                        this.dados.valor_total_despesas += valor2;
                    }
                }

                for (key of Object.keys(centros_de_custos_usados_despesa)) {
                    if (key=='undefined'){} // ignorar
                    else if (Number(key)==0){} // ignorar
                    else {
                        this.dados.centros_de_custos_despesas.push(centros_de_custos_usados_despesa[key]);
                    }
                }
                // SORT
                this.dados.centros_de_custos_despesas = this.dados.centros_de_custos_despesas.sort((a, b) => (a.centro_de_custos > b.centro_de_custos) ? 1 :- 1) //// sort a list of objects by a property, ascending
            }


            if(this.dados.PARAMETRO=='RESULTADOS') {
                console.log("==================");
                console.log("RESULTADOS");
                console.log("==================");

                let registro, key, valor, valor_acumulado, data_quando, valor_receita, valor_despesa;
                this.dados.valor_total_receitas = 0;
                this.dados.valor_total_despesas = 0;
                this.dados.saldo_lancamentos = 0;

                this.dados.lancamentos_por_dia = [];
                this.dados.lancamentos_por_dia_obj = {};

                // Le receitas e despesas e totaliza por centro de custos

                // RECEITAS
                console.log("==================");
                console.log("RECEITAS");
                console.log("this.dados.selected_lancamentos_receita");
                console.log(this.dados.selected_lancamentos_receita);
                console.log("==================");

                for(let i in this.dados.selected_lancamentos_receita){
                    registro = this.dados.selected_lancamentos_receita[i];

                    valor = this.util.converte_valores_formatados_para_numero(registro.valor);
                    if(valor>0){
                        console.log("Valor = " + valor);
                        // console.log(registro);
                        // Monta o objeto "lancamentos_por_dia_obj"
                        if (!this.dados.lancamentos_por_dia_obj[registro.data]){
                            this.dados.lancamentos_por_dia_obj[registro.data] = {};
                            data_quando = this.util.converte_data_para_milisegundos(registro.data);
                            this.dados.lancamentos_por_dia_obj[registro.data].data = registro.data;
                            this.dados.lancamentos_por_dia_obj[registro.data].data_quando = data_quando;

                            this.dados.lancamentos_por_dia_obj[registro.data].receita = valor;
                            this.dados.valor_total_receitas += valor;
                        }
                        else {
                            //soma o valor do novo registro ao centro de custo
                            valor_acumulado = this.dados.lancamentos_por_dia_obj[registro.data].receita ? this.dados.lancamentos_por_dia_obj[registro.data].receita : 0;
                            // console.log("valor_acumulado antes = " + valor_acumulado);
                            // console.log("valor = " + valor);
                            valor_acumulado = valor + valor_acumulado;
                            // console.log("valor_acumulado = " + valor_acumulado);

                            this.dados.lancamentos_por_dia_obj[registro.data].receita = valor_acumulado;
                            this.dados.valor_total_receitas += valor;
                        }
                    }
                }
                console.log("========");
                console.log("this.dados.valor_total_receitas");
                console.log(this.dados.valor_total_receitas);
                console.log("this.dados.lancamentos_por_dia_obj");
                console.log(this.dados.lancamentos_por_dia_obj);
                console.log("========");


                // DESPESAS
                console.log("==================");
                console.log("DESPESAS");
                console.log("==================");

                for(let i in this.dados.selected_lancamentos_despesa){
                    registro = this.dados.selected_lancamentos_despesa[i];

                    valor = this.util.converte_valores_formatados_para_numero(registro.valor);
                    if(valor>0){
                        // console.log("Valor = " + valor);
                        // console.log(registro);

                        // Monta o objeto "lancamentos_por_dia_obj"
                        if (!this.dados.lancamentos_por_dia_obj[registro.data]){
                            this.dados.lancamentos_por_dia_obj[registro.data] = {};
                            data_quando = this.util.converte_data_para_milisegundos(registro.data);
                            this.dados.lancamentos_por_dia_obj[registro.data].data = registro.data;
                            this.dados.lancamentos_por_dia_obj[registro.data].data_quando = data_quando;

                            this.dados.lancamentos_por_dia_obj[registro.data].despesa = valor;
                            this.dados.valor_total_despesas += valor;
                        }
                        else {
                            //soma o valor do novo registro ao centro de custo
                            valor_acumulado = this.dados.lancamentos_por_dia_obj[registro.data].despesa ? this.dados.lancamentos_por_dia_obj[registro.data].despesa : 0;
                            // console.log("valor_acumulado antes = " + valor_acumulado);
                            // console.log("valor = " + valor);
                            valor_acumulado = valor + valor_acumulado;
                            // console.log("valor_acumulado = " + valor_acumulado);

                            this.dados.lancamentos_por_dia_obj[registro.data].despesa = valor_acumulado;
                            this.dados.valor_total_despesas += valor;
                        }
                    }
                }
                console.log("========");
                console.log("this.dados.valor_total_despesas");
                console.log(this.dados.valor_total_despesas);
                console.log("this.dados.lancamentos_por_dia_obj");
                console.log(this.dados.lancamentos_por_dia_obj);
                console.log("========");

                for (key of Object.keys(this.dados.lancamentos_por_dia_obj)) {
                    if (key=='undefined'){} // ignorar
                    else if (Number(key)==0){} // ignorar
                    else {
                        // console.log(key);
                        // console.log(this.dados.lancamentos_por_dia_obj[key]);
                        valor_receita = this.dados.lancamentos_por_dia_obj[key].receita ? this.dados.lancamentos_por_dia_obj[key].receita : 0;
                        valor_despesa = this.dados.lancamentos_por_dia_obj[key].despesa ? this.dados.lancamentos_por_dia_obj[key].despesa : 0;
                        this.dados.lancamentos_por_dia_obj[key].saldo = valor_receita - valor_despesa;
                        this.dados.lancamentos_por_dia.push(this.dados.lancamentos_por_dia_obj[key]);
                    }
                }

                this.dados.saldo_lancamentos = this.dados.valor_total_receitas - this.dados.valor_total_despesas;

                // SORT
                this.dados.lancamentos_por_dia = this.dados.lancamentos_por_dia.sort((a, b) => (a.data_quando > b.data_quando) ? 1 : -1) //// sort a list of objects by a property, ascending
                this.dados.selected_resultados = this.dados.lancamentos_por_dia;
                this.dados.filtered_resultados = {};
                this.dados.total_de_resultados = this.dados.selected_resultados.length;

                console.log("\n\n==============================");
                console.log("PARAMETRO = " + this.dados.PARAMETRO)
                console.log("selected_resultados");
                console.log("==============================");
                console.log(this.dados.selected_resultados);
                console.log("==============================");


            }

            if(this.dados.PARAMETRO=='CAIXA'){
                this.dados.listar_rel_dinheiro = false;
                this.dados.listar_dinheiro_dia = false;
                this.dados.listar_rel_cheque = false;
                this.dados.listar_cheque_dia = false;
                this.dados.listar_rel_cheque_pre = false;
                this.dados.listar_cheque_pre_dia = false;
            }


            // if(this.dados.PARAMETRO=='RELATORIOS'){
            if(this.dados.calcular_financeiro || this.dados.PARAMETRO=='RELATORIOS'){
                console.log("calcular_financeiro == true => recalculando orcamentos e relatorios");

                let registro, key;
                let data;
                let data_quando;
                let profissional;
                let orcamento;
                let cliente;

                let data_do_lancamento = {};
                let producao_do_profissional = {};
                let valor = 0;
                let valor_total = 0;
                let valor_total_na_data : number = 0;
                let valor_total_na_data_receitas : number = 0;
                let valor_total_na_data_despesas : number = 0;

                this.dados.valor_total_receitas_dinheiro = 0;
                this.dados.valor_total_despesas_dinheiro = 0;
                this.dados.valor_total_receitas_cheque = 0;
                this.dados.valor_total_despesas_cheque = 0;
                this.dados.valor_total_receitas_cheque_pre = 0;
                this.dados.valor_total_despesas_cheque_pre = 0;

                this.dados.datas_com_lancamentos = [];
                this.dados.datas_com_lancamentos_dinheiro = [];
                this.dados.datas_com_lancamentos_cheque = [];
                this.dados.datas_com_lancamentos_cheque_pre = [];

                this.dados.datas_com_lancamentos_receitas_cheque = [];
                this.dados.datas_com_lancamentos_despesas_cheque = [];
                this.dados.datas_com_lancamentos_receitas_cheque_pre = [];
                this.dados.datas_com_lancamentos_despesas_cheque_pre = [];

                this.dados.lancamentos_dinheiro_receita = [];
                this.dados.lancamentos_dinheiro_despesa = [];
                this.dados.lancamentos_cheque_receita = [];
                this.dados.lancamentos_cheque_despesa = [];
                this.dados.lancamentos_cheque_pre_receita = [];
                this.dados.lancamentos_cheque_pre_despesa = [];
                this.dados.lancamentos_debito_receita = [];
                this.dados.lancamentos_debito_despesa = [];
                this.dados.lancamentos_credito_receita = [];
                this.dados.lancamentos_credito_despesa = [];




                // MONTAR PRODUCAO_PROFISSIONAL e SALDO DOS ORÇAMENTOS
                // TODO CUIDADO!!!!!!!!!!!!!!!!!!   (NESSE CASO DOS ORÇAMENTOS DEVE SER O PERIODO TODO DESDE A CRIAÇAO DO ORCAMENTO E NAO APENAS UM PERIODO SELECIONADO!!!!!)

                if (true) {

                    // RECEITAS PRODUCAO_PROFISSIONAL E SALDOS DOS ORCAMENTOS
                    console.log("\nContabilizando RECEITAS PRODUCAO_PROFISSIONAL");

                    producao_do_profissional = {};
                    this.dados.conjunto_de_orcamentos = {};

                    this.dados.valor_saldo_profissional = 0;
                    this.dados.valor_total_receitas_profissional = 0;
                    this.dados.lancamentos_profissional_receita = [];
                    this.dados.lancamentos_profissional_despesa = [];

                    for(let i in this.dados.selected_lancamentos_receita){
                        registro = this.dados.selected_lancamentos_receita[i];
                        // console.log("Registro em PRODUCAO_PROFISSIONAL");
                        // console.log(registro);

                        // Monta o objeto "producao_do_profissional"
                        // =========================================
                        profissional = registro.profissional_key;
                        // console.log("profissional key = " + profissional + " / nome = " + registro.profissional_nome);
                        valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                        this.dados.valor_total_receitas_profissional = this.dados.valor_total_receitas_profissional + valor;

                        if (!producao_do_profissional[profissional]){
                            producao_do_profissional[profissional] = {};
                            producao_do_profissional[profissional].nome = registro.profissional_nome;
                            producao_do_profissional[profissional].profissional_key = registro.profissional_key;
                            producao_do_profissional[profissional].valor_receitas = valor;
                        }
                        else {
                            producao_do_profissional[profissional].nome = registro.profissional_nome;
                            producao_do_profissional[profissional].profissional_key = registro.profissional_key;
                            producao_do_profissional[profissional].valor_receitas = producao_do_profissional[profissional].valor_receitas + valor;
                        }
                        this.dados.lancamentos_profissional_receita.push( registro );


                        // Monta o objeto "orcamento do cliente"
                        // ======================================
                        orcamento = registro.orcamento_key;
                        cliente = registro.contraparte_key;

                        // console.log("orcamento key = " + orcamento + " / nome = " + registro.orcamento_nome);
                        // console.log("cliente key = " + cliente + " / nome = " + registro.contraparte);

                        valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                        // this.dados.valor_total_receitas_orcamento = this.dados.valor_total_receitas_orcamento + valor;
                        // this.dados.valor_total_receitas_cliente = this.dados.valor_total_receitas_cliente + valor;

                        if (!this.dados.conjunto_de_orcamentos[orcamento]){
                            this.dados.conjunto_de_orcamentos[orcamento] = {};
                            this.dados.conjunto_de_orcamentos[orcamento].cliente_key = cliente;
                            this.dados.conjunto_de_orcamentos[orcamento].saldo = valor;
                        }
                        else {
                            this.dados.conjunto_de_orcamentos[orcamento].cliente_key = cliente;
                            this.dados.conjunto_de_orcamentos[orcamento].saldo = this.dados.conjunto_de_orcamentos[orcamento].saldo + valor;
                        }
                    }
                    // Sort por data
                    this.dados.lancamentos_profissional_receita =  this.dados.lancamentos_profissional_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

                    // console.log("\n****** REGISTROS *******");
                    // console.log("this.dados.lancamentos_profissional_receita");
                    // console.log(this.dados.lancamentos_profissional_receita);
                    //
                    // console.log("this.dados.conjunto_de_orcamentos : ");
                    // console.log(this.dados.conjunto_de_orcamentos);




                    // DESPESAS PRODUCAO_PROFISSIONAL
                    console.log("\nContabilizando DESPESAS PRODUCAO_PROFISSIONAL");

                    // producao_do_profissional = {};   // Não zera porque, em dinheiro, optou-se por registrar receitas e despesas no mesmo relatorio por dia
                    this.dados.valor_total_despesas_profissional = 0;

                    for(let i in this.dados.selected_lancamentos_despesa){
                        registro = this.dados.selected_lancamentos_despesa[i];
                        // console.log(registro);
                        if(registro.profissional_key) {
                            // Apenas os registros de despesas com profissionais que trabalham na clinica (e tem receitas tambem) tem esse campo

                            // Monta o objeto "producao_do_profissional"
                            profissional = registro.profissional_key;
                            console.log("profissional key = " + profissional + " / nome = " + registro.profissional_nome);
                            valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                            this.dados.valor_total_despesas_profissional = this.dados.valor_total_despesas_profissional + valor;

                            if (!producao_do_profissional[profissional]){
                                producao_do_profissional[profissional] = {};
                                producao_do_profissional[profissional].nome = registro.profissional_nome;
                                producao_do_profissional[profissional].profissional_key = registro.profissional_key;
                                producao_do_profissional[profissional].valor_despesas = valor;                            }
                                else {
                                    producao_do_profissional[profissional].nome = profissional;
                                    producao_do_profissional[profissional].profissional_key = registro.profissional_key;
                                    producao_do_profissional[profissional].valor_despesas = producao_do_profissional[profissional].valor_despesas + valor;
                                }
                                this.dados.lancamentos_profissional_despesa.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_profissional_despesa =  this.dados.lancamentos_profissional_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

                        console.log("****** REGISTROS *******");
                        console.log("this.dados.lancamentos_profissional_despesa");
                        console.log(this.dados.lancamentos_profissional_despesa);

                        this.dados.valor_saldo_profissional = this.dados.valor_total_receitas_profissional - this.dados.valor_total_despesas_profissional;


                        // Monta o relatorio
                        console.log("producao_do_profissional");
                        console.log(producao_do_profissional);

                        for (key of Object.keys(producao_do_profissional)) {
                            if (key=='undefined'){} // ignorar
                            else if (Number(key)==0){} // ignorar
                            else {
                                // completa os valores vazios de despesa ou despesa dos dias relacionados
                                if(!producao_do_profissional[key].valor_despesas){
                                    producao_do_profissional[key].valor_despesas = 0;
                                }
                                if(!producao_do_profissional[key].valor_receitas){
                                    producao_do_profissional[key].valor_receitas = 0;
                                }

                                this.dados.selected_producao_profissional.push(producao_do_profissional[key]);
                            }
                        }
                        // Sort por data
                        this.dados.selected_producao_profissional = this.dados.selected_producao_profissional.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
                        // console.log("this.dados.selected_producao_profissional");
                        // console.log(this.dados.selected_producao_profissional);

                        if(this.dados.selected_producao_profissional.length <= this.config.QUANTOS_POR_PAGINA.PRODUCAO_PROFISSIONAL){
                            this.dados.paginator_selected_producao_profissional = false;
                        }
                        else {
                            this.dados.paginator_selected_producao_profissional = true;
                        }

                        // desliga a flag
                        this.dados.calcular_financeiro = false;

                        // this.dados.atualizar_saldos_dos_orcamentos();
                    }



                    // if(this.dados.PARAMETRO=='REL_DINHEIRO') {
                    if (true) {

                        // RECEITAS EM DINHEIRO
                        console.log("\nContabilizando RECEITAS EM DINHEIRO");

                        data_do_lancamento = {};
                        valor_total_na_data_receitas = 0;
                        this.dados.valor_saldo_dinheiro = 0;
                        this.dados.valor_total_receitas_dinheiro = 0;
                        this.dados.lancamentos_dinheiro_receita = [];

                        this.dados.datas_com_lancamentos_dinheiro = [];

                        for(let i in this.dados.selected_lancamentos_receita){
                            registro = this.dados.selected_lancamentos_receita[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='dinheiro'){
                                // console.log(registro);
                                data = registro.data;
                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                // console.log("valor = " + valor);

                                this.dados.valor_total_receitas_dinheiro = this.dados.valor_total_receitas_dinheiro + valor;
                                // console.log("this.dados.valor_total_receitas_dinheiro = " + this.dados.valor_total_receitas_dinheiro);

                                if (!data_do_lancamento[data]){
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_receitas = 0;
                                    data_do_lancamento[data].valor_receitas = valor;
                                }
                                else {
                                    // console.log("ja existia data_do_lancamento de " + data)
                                    // console.log(data_do_lancamento[data]);
                                    // console.log("data_do_lancamento[data].valor_despesas = " + data_do_lancamento[data].valor_despesas);
                                    valor_total_na_data_receitas = data_do_lancamento[data].valor_receitas ? data_do_lancamento[data].valor_receitas : 0;
                                    data_do_lancamento[data].valor_receitas = valor_total_na_data_receitas + valor;
                                }
                                this.dados.lancamentos_dinheiro_receita.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_dinheiro_receita =  this.dados.lancamentos_dinheiro_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_dinheiro_receita);


                        // DESPESAS EM DINHEIRO
                        console.log("\nContabilizando DESPESAS EM DINHEIRO");

                        // data_do_lancamento = {};   // Não zera porque, em dinheiro, optou-se por registrar receitas e despesas no mesmo relatorio por dia
                        valor_total_na_data_despesas = 0;
                        this.dados.valor_saldo_dinheiro = 0;
                        this.dados.valor_total_despesas_dinheiro = 0;
                        this.dados.lancamentos_dinheiro_despesa = [];


                        for(let i in this.dados.selected_lancamentos_despesa){
                            // console.log("this.dados.selected_lancamentos_despesa[i]");
                            // console.log(registro);
                            registro = this.dados.selected_lancamentos_despesa[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='dinheiro'){
                                data = registro.data;
                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                // console.log("valor = " + valor);

                                this.dados.valor_total_despesas_dinheiro = this.dados.valor_total_despesas_dinheiro + valor;
                                // console.log("this.dados.valor_total_despesas_dinheiro = " + this.dados.valor_total_despesas_dinheiro);

                                if (!data_do_lancamento[data]){
                                    // console.log("criando data_do_lancamento de " + data)
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_despesas = valor;
                                }
                                else {
                                    // console.log("ja existia data_do_lancamento de " + data)
                                    // console.log(data_do_lancamento[data]);
                                    // console.log("data_do_lancamento[data].valor_despesas = " + data_do_lancamento[data].valor_despesas);
                                    valor_total_na_data_despesas = data_do_lancamento[data].valor_despesas ? data_do_lancamento[data].valor_despesas : 0;
                                    // console.log("valor_total_na_data_despesas = " + valor_total_na_data_despesas);
                                    data_do_lancamento[data].valor_despesas = valor_total_na_data_despesas + valor;
                                }
                                // console.log("data = " + data);
                                // console.log("valor = " + valor);
                                // console.log("data_do_lancamento");
                                // console.log(data_do_lancamento);
                                // console.log("data_do_lancamento["+data+"] = ");
                                // console.log(data_do_lancamento[data]);

                                this.dados.lancamentos_dinheiro_despesa.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_dinheiro_despesa =  this.dados.lancamentos_dinheiro_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_dinheiro_despesa);

                        this.dados.valor_saldo_dinheiro = this.dados.valor_total_receitas_dinheiro - this.dados.valor_total_despesas_dinheiro;

                        // console.log("\n\n==================\nthis.dados.valor_total_receitas_dinheiro = " + this.dados.valor_total_receitas_dinheiro);
                        // console.log("this.dados.valor_total_despesas_dinheiro = " + this.dados.valor_total_despesas_dinheiro);
                        // console.log("this.dados.valor_saldo_dinheiro = " + this.dados.valor_saldo_dinheiro + "\n=================\n\n");

                        // Monta o relatorio
                        for (key of Object.keys(data_do_lancamento)) {
                            if (key=='undefined'){} // ignorar
                            else if (Number(key)==0){} // ignorar
                            else {
                                // completa os valores vazios de despesa ou despesa dos dias relacionados
                                // console.log("data_do_lancamento[" + key + "]");
                                // console.log(data_do_lancamento[key]);

                                if(!data_do_lancamento[key].valor_despesas){
                                    data_do_lancamento[key].valor_despesas = 0;
                                }
                                if(!data_do_lancamento[key].valor_receitas){
                                    data_do_lancamento[key].valor_receitas = 0;
                                }

                                this.dados.datas_com_lancamentos_dinheiro.push(data_do_lancamento[key]);
                            }
                        }
                        // Sort por data
                        this.dados.datas_com_lancamentos_dinheiro = this.dados.datas_com_lancamentos_dinheiro.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
                    }


                    // if(this.dados.PARAMETRO=='REL_CHEQUES_PRE') {
                    if (true) {

                        // RECEITAS EM REL_CHEQUES_PRE
                        console.log("\nContabilizando RECEITAS EM CHEQUES PRE");

                        data_do_lancamento = {};
                        valor_total_na_data = 0;
                        this.dados.lancamentos_cheque_pre_receita = [];
                        this.dados.lancamentos_cheque_pre_despesa = [];
                        this.dados.valor_saldo_cheque_pre = 0;
                        this.dados.valor_total_receitas_cheque_pre = 0;

                        for(let i in this.dados.selected_lancamentos_receita){
                            registro = this.dados.selected_lancamentos_receita[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='cheque_pre'){
                                // console.log(registro);
                                data = registro.data_cheque_pre;
                                // console.log("Em " + registro.data + " recebeu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);
                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                this.dados.valor_total_receitas_cheque_pre = this.dados.valor_total_receitas_cheque_pre + valor;

                                if (!data_do_lancamento[data]){
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_receitas = 0;
                                    data_do_lancamento[data].valor_receitas = valor;
                                }
                                else {
                                    valor_total_na_data = data_do_lancamento[data].valor_receitas;
                                    data_do_lancamento[data].valor_receitas = valor_total_na_data + valor;
                                }
                                this.dados.lancamentos_cheque_pre_receita.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_cheque_pre_receita =  this.dados.lancamentos_cheque_pre_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_cheque_pre_receita);


                        // DESPESAS EM REL_CHEQUES_PRE
                        console.log("\nContabilizando DESPESAS EM CHEQUES PRE");

                        // data_do_lancamento = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia
                        valor_total_na_data = 0;
                        this.dados.valor_total_despesas_cheque_pre = 0;

                        for(let i in this.dados.selected_lancamentos_despesa){
                            registro = this.dados.selected_lancamentos_despesa[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='cheque_pre'){
                                // console.log(registro);
                                data = registro.data_cheque_pre;
                                // console.log("Em " + registro.data + " emitiu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);

                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                // console.log(data + ' : valor = ' + valor);
                                this.dados.valor_total_despesas_cheque_pre = this.dados.valor_total_despesas_cheque_pre + valor;
                                // console.log("valor_total_despesas_cheque_pre = " + this.dados.valor_total_despesas_cheque_pre);

                                if (!data_do_lancamento[data]){
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_despesas = valor;
                                }
                                else {
                                    valor_total_na_data = data_do_lancamento[data].valor_despesas ? data_do_lancamento[data].valor_despesas : 0;
                                    data_do_lancamento[data].valor_despesas = valor_total_na_data + valor;
                                }
                                this.dados.lancamentos_cheque_pre_despesa.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_cheque_pre_despesa =  this.dados.lancamentos_cheque_pre_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_cheque_pre_despesa);

                        this.dados.valor_saldo_cheque_pre = this.dados.valor_total_receitas_cheque_pre - this.dados.valor_total_despesas_cheque_pre;


                        // Monta o relatorio
                        for (key of Object.keys(data_do_lancamento)) {
                            if (key=='undefined'){} // ignorar
                            else if (Number(key)==0){} // ignorar
                            else {
                                // completa os valores vazios de despesa ou despesa dos dias relacionados
                                if(!data_do_lancamento[key].valor_despesas){
                                    data_do_lancamento[key].valor_despesas = 0;
                                }
                                if(!data_do_lancamento[key].valor_receitas){
                                    data_do_lancamento[key].valor_receitas = 0;
                                }

                                this.dados.datas_com_lancamentos_cheque_pre.push(data_do_lancamento[key]);
                            }
                        }
                        // Sort por data
                        this.dados.datas_com_lancamentos_cheque_pre = this.dados.datas_com_lancamentos_cheque_pre.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
                    }


                    // if(this.dados.PARAMETRO=='REL_CHEQUES_A_VISTA') {
                    if (true){

                        // RECEITAS COM CHEQUES A VISTA
                        console.log("\nContabilizando RECEITAS COM CHEQUES A VISTA");

                        data_do_lancamento = {};
                        valor_total_na_data = 0;
                        this.dados.valor_total_receitas_cheque = 0;
                        this.dados.lancamentos_cheque_receita = [];
                        this.dados.lancamentos_cheque_despesa = [];

                        for(let i in this.dados.selected_lancamentos_receita){
                            registro = this.dados.selected_lancamentos_receita[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='cheque'){
                                data = registro.data;
                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                this.dados.valor_total_receitas_cheque = this.dados.valor_total_receitas_cheque + valor;

                                if (!data_do_lancamento[data]){
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_receitas = 0;
                                    data_do_lancamento[data].valor_receitas = valor;
                                }
                                else {
                                    valor_total_na_data = data_do_lancamento[data].valor_receitas;
                                    data_do_lancamento[data].valor_receitas = valor_total_na_data + valor;
                                }
                                this.dados.lancamentos_cheque_receita.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_cheque_receita =  this.dados.lancamentos_cheque_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_cheque_receita);


                        // DESPESAS EM REL_CHEQUES_A_VISTA
                        console.log("\nContabilizando DESPESAS EM CHEQUES A VISTA");

                        // data_do_lancamento = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia
                        valor_total_na_data = 0;
                        this.dados.valor_total_despesas_cheque = 0;

                        for(let i in this.dados.selected_lancamentos_despesa){
                            registro = this.dados.selected_lancamentos_despesa[i];

                            // Monta o objeto "data_do_lancamento"
                            if(registro.meio_de_pagamento=='cheque'){
                                data = registro.data;
                                data_quando = this.util.converte_data_para_milisegundos(data);
                                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                                this.dados.valor_total_despesas_cheque = this.dados.valor_total_despesas_cheque + valor;

                                if (!data_do_lancamento[data]){
                                    data_do_lancamento[data] = {};
                                    data_do_lancamento[data].data = data;
                                    data_do_lancamento[data].data_quando = data_quando;
                                    data_do_lancamento[data].valor_despesas = valor;
                                }
                                else {
                                    valor_total_na_data = data_do_lancamento[data].valor_despesas ? data_do_lancamento[data].valor_despesas : 0;
                                    data_do_lancamento[data].valor_despesas = valor_total_na_data + valor;
                                }
                                this.dados.lancamentos_cheque_despesa.push( registro );
                            }
                        }
                        // Sort por data
                        this.dados.lancamentos_cheque_despesa =  this.dados.lancamentos_cheque_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


                        // console.log("****** REGISTROS *******");
                        // console.log(this.dados.lancamentos_cheque_despesa);

                        this.dados.valor_saldo_cheque = this.dados.valor_total_receitas_cheque - this.dados.valor_total_despesas_cheque;


                        // Monta o relatorio
                        for (key of Object.keys(data_do_lancamento)) {
                            if (key=='undefined'){} // ignorar
                            else if (Number(key)==0){} // ignorar
                            else {
                                // completa os valores vazios de despesa ou despesa dos dias relacionados
                                if(!data_do_lancamento[key].valor_despesas){
                                    data_do_lancamento[key].valor_despesas = 0;
                                }
                                if(!data_do_lancamento[key].valor_receitas){
                                    data_do_lancamento[key].valor_receitas = 0;
                                }

                                this.dados.datas_com_lancamentos_cheque.push(data_do_lancamento[key]);
                            }
                        }
                        // Sort por data
                        this.dados.datas_com_lancamentos_cheque = this.dados.datas_com_lancamentos_cheque.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
                    }




                }


            // MENU SELETOR DE PÁGINA (TAB)
            if( ['REL_RECEITAS_E_DESPESAS','REL_CENTROS_DE_CUSTOS','REL_CENTROS_DE_CUSTOS_TOTALIZADOS','REL_CHEQUES_PRE','REL_EXTRATO_DE_CONTAS','CENTROS_DE_CUSTOS_LISTA','ESTORNOS'].includes(this.dados.PARAMETRO) ){
                this.mostrar_opcao_1 = true;
                this.mostrar_opcao_2 = false;

                this.menu_financeiro_opcao1_classe = 'menu_financeiro';
                this.menu_financeiro_opcao2_classe = 'menu_financeiro_inativo';

                this.mostrar_estornos = false;
            }

            this.checa_se_pode_incluir();
            this.dados.desativar_listagens();
            this.dados.desativar_DISPLAYS();

            // Ativa as flags listar_clientes, listar_fornecedores, etc
            this.dados[this.config[this.dados.PARAMETRO].listar] = true;

            this.editar_admin = false;
            if (this.config[this.dados.PARAMETRO].tem_sublista) {
                // console.log("PARAMETRO = " + this.dados.PARAMETRO + " -> TEM SUBLISTA");
                if (this.config.is_admin && this.config[this.dados.PARAMETRO].pode_editar_admin) {
                    this.editar_admin = true;
                }
                this.indicar_atividade = false;
                this.indicar_atividade_todos = false;
            }
            else {
                // console.log("PARAMETRO = " + this.dados.PARAMETRO + " -> NÃO TEM SUBLISTA");
                if (this.config[this.dados.PARAMETRO].checaratividade) {
                    this.indicar_atividade = true;
                }
                else {
                    this.indicar_atividade = false;
                }
            }

            if (this.config[this.dados.PARAMETRO].pode_editar) {
                this.dados.pode_incluir = true;
            }
            else {
                if (this.dados.editar_receitas || this.dados.editar_despesas){
                    this.dados.pode_incluir = true;
                }
                this.dados.pode_incluir = false;
            }

            if(this.dados.PARAMETRO != 'LANCAMENTOS_RECEITA' && this.dados.PARAMETRO != 'LANCAMENTOS_DESPESA' && this.dados.PARAMETRO != 'REL_DINHEIRO' && this.dados.PARAMETRO != 'REL_CHEQUES_PRE' && this.dados.PARAMETRO != 'REL_CHEQUES_A_VISTA') {
                this.dados.remover_filtros();
            }

            // =========================================================
            // PAGINADOR
            // =========================================================
            this.set_paginador();

            // if(!calcular_financeiro)
            this.config.DISPLAY.Lista = true;

        }
        else {
            this.dados.go('CLIENTES');
        }
    }

    public filtrar_atendimentos(param : string){
        if(param == 'hoje'){
            this.atendimento_hoje = !this.atendimento_hoje;
            if(this.atendimento_hoje){
                this.dados.filterDatabase('hoje');
                this.atendimento_inativo = false;
                this.atendimento_aberto = false;
                this.atendimento_em_curso = false;
                this.atendimento_finalizado = false;
            }
            else {
                this.dados.filterDatabase('')
            }
        }
        else if(param == 'inativo'){
            this.atendimento_inativo = !this.atendimento_inativo;
            if(this.atendimento_inativo){
                this.dados.filterDatabase('inativo');
                this.atendimento_hoje = false;
                this.atendimento_aberto = false;
                this.atendimento_em_curso = false;
                this.atendimento_finalizado = false;
            }
            else {
                this.dados.filterDatabase('')
            }
        }
        else if(param == 'aberto'){
            this.atendimento_aberto = !this.atendimento_aberto;
            if(this.atendimento_aberto){
                this.dados.filterDatabase('aberto');
                this.atendimento_hoje = false;
                this.atendimento_inativo = false;
                this.atendimento_em_curso = false;
                this.atendimento_finalizado = false;
            }
            else {
                this.dados.filterDatabase('')
            }
        }
        else if(param == 'em_curso'){
            this.atendimento_em_curso = !this.atendimento_em_curso;
            if(this.atendimento_em_curso){
                this.dados.filterDatabase('em_curso');
                this.atendimento_hoje = false;
                this.atendimento_inativo = false;
                this.atendimento_aberto = false;
                this.atendimento_finalizado = false;
            }
            else {
                this.dados.filterDatabase('')
            }
        }
        else if(param == 'finalizado'){
            this.atendimento_finalizado = !this.atendimento_finalizado;
            if(this.atendimento_finalizado){
                this.dados.filterDatabase('finalizado');
                this.atendimento_hoje = false;
                this.atendimento_inativo = false;
                this.atendimento_aberto = false;
                this.atendimento_em_curso = false;
            }
            else {
                this.dados.filterDatabase('')
            }
        }
    }

    public seleciona_data(data){

        this.dados.data_selecionada = data;

        let registro, valor, valor_acumulado, data_quando, valor_receita, valor_despesa;

        this.dados.valor_total_receitas_do_dia = 0;
        this.dados.valor_total_despesas_do_dia = 0;
        this.dados.saldo_lancamentos_do_dia = 0;

        this.dados.lancamentos_do_dia = [];
        this.dados.lancamentos_do_dia_obj = {};

        let key = 0;

        // RECEITAS
        console.log("==================");
        console.log("RECEITAS");
        console.log("==================");

        for(let i in this.dados.selected_lancamentos_receita){
            registro = this.dados.selected_lancamentos_receita[i];

            valor = this.util.converte_valores_formatados_para_numero(registro.valor);
            if(valor>0 && registro.data == data){
                console.log("Valor = " + valor);
                console.log(registro);

                key = key + 1;

                // Monta o objeto "lancamentos_do_dia_obj"
                this.dados.lancamentos_do_dia_obj[key] = {};
                data_quando = this.util.converte_data_para_milisegundos(registro.data);
                this.dados.lancamentos_do_dia_obj[key].data = registro.data;
                this.dados.lancamentos_do_dia_obj[key].data_quando = data_quando;
                this.dados.lancamentos_do_dia_obj[key].contraparte = registro.contraparte;
                this.dados.lancamentos_do_dia_obj[key].produto = registro.nome;
                this.dados.lancamentos_do_dia_obj[key].receita = valor;
                this.dados.lancamentos_do_dia_obj[key].registro = registro;

                this.dados.valor_total_receitas_do_dia += valor;
            }
        }
        console.log("this.dados.valor_total_receitas_do_dia");
        console.log(this.dados.valor_total_receitas_do_dia);


        // DESPESAS
        console.log("==================");
        console.log("DESPESAS");
        console.log("==================");

        for(let i in this.dados.selected_lancamentos_despesa){
            registro = this.dados.selected_lancamentos_despesa[i];

            valor = this.util.converte_valores_formatados_para_numero(registro.valor);
            if(valor>0 && registro.data == data){
                console.log("Valor = " + valor);
                console.log(registro);

                key = key + 1;

                // Monta o objeto "lancamentos_do_dia_obj"
                this.dados.lancamentos_do_dia_obj[key] = {};
                data_quando = this.util.converte_data_para_milisegundos(registro.data);
                this.dados.lancamentos_do_dia_obj[key].data = registro.data;
                this.dados.lancamentos_do_dia_obj[key].data_quando = data_quando;
                this.dados.lancamentos_do_dia_obj[key].contraparte = registro.contraparte;
                this.dados.lancamentos_do_dia_obj[key].produto = registro.nome;
                this.dados.lancamentos_do_dia_obj[key].despesa = valor;
                this.dados.lancamentos_do_dia_obj[key].registro = registro;

                this.dados.valor_total_despesas_do_dia += valor;
            }
        }
        console.log("this.dados.valor_total_despesas_do_dia");
        console.log(this.dados.valor_total_despesas_do_dia);

        for (let key of Object.keys(this.dados.lancamentos_do_dia_obj)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                console.log(key);
                console.log(this.dados.lancamentos_do_dia_obj[key]);
                valor_receita = this.dados.lancamentos_do_dia_obj[key].receita ? this.dados.lancamentos_do_dia_obj[key].receita : 0;
                valor_despesa = this.dados.lancamentos_do_dia_obj[key].despesa ? this.dados.lancamentos_do_dia_obj[key].despesa : 0;
                this.dados.lancamentos_do_dia.push(this.dados.lancamentos_do_dia_obj[key]);
            }
        }

        this.dados.saldo_lancamentos_do_dia = this.dados.valor_total_receitas_do_dia - this.dados.valor_total_despesas_do_dia;

        // SORT
        // this.dados.lancamentos_do_dia = this.dados.lancamentos_do_dia.sort((a, b) => (a.data_quando > b.data_quando) ? 1 : -1) //// sort a list of objects by a property, ascending

        console.log("lancamentos_do_dia");
        console.log("==============================");
        console.log(this.dados.lancamentos_do_dia);

        this.dados.mostrar_lancamentos_do_dia = true;
    }

    public mostrar_imagens(){
        if(this.dados.mostrar_imagens_na_lista_estoque){
            this.dados.mostrar_imagens_na_lista_estoque = false;
        }
        else {
            this.dados.mostrar_imagens_na_lista_estoque = true;
        }
    }

    public estoque_total() {
        this.dados.is_estoque_total = !this.dados.is_estoque_total;

        if(this.dados.is_estoque_total){
            this.dados.is_estoque_normal = false;
            this.dados.is_estoque_baixo = false;
            this.dados.is_estoque_vazio = false;
            this.dados.is_estoque_negativo = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }

    public estoque_excedente() {
        this.dados.is_estoque_excedente = !this.dados.is_estoque_excedente;

        if(this.dados.is_estoque_excedente){
            this.dados.is_estoque_total = false;
            this.dados.is_estoque_normal = false;
            this.dados.is_estoque_baixo = false;
            this.dados.is_estoque_vazio = false;
            this.dados.is_estoque_negativo = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }

    public estoque_normal() {
        this.dados.is_estoque_normal = !this.dados.is_estoque_normal;

        if(this.dados.is_estoque_normal){
            this.dados.is_estoque_excedente = false;
            this.dados.is_estoque_total = false;
            this.dados.is_estoque_baixo = false;
            this.dados.is_estoque_vazio = false;
            this.dados.is_estoque_negativo = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }

    public estoque_baixo() {
        this.dados.is_estoque_baixo = !this.dados.is_estoque_baixo;

        if(this.dados.is_estoque_baixo){
            this.dados.is_estoque_excedente = false;
            this.dados.is_estoque_total = false;
            this.dados.is_estoque_normal = false;
            this.dados.is_estoque_vazio = false;
            this.dados.is_estoque_negativo = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }

    public estoque_vazio() {
        this.dados.is_estoque_vazio = !this.dados.is_estoque_vazio;

        if(this.dados.is_estoque_vazio){
            this.dados.is_estoque_excedente = false;
            this.dados.is_estoque_total = false;
            this.dados.is_estoque_normal = false;
            this.dados.is_estoque_baixo = false;
            this.dados.is_estoque_negativo = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }

    public estoque_negativo() {
        this.dados.is_estoque_negativo = !this.dados.is_estoque_negativo;

        if(this.dados.is_estoque_negativo){
            this.dados.is_estoque_excedente = false;
            this.dados.is_estoque_total = false;
            this.dados.is_estoque_normal = false;
            this.dados.is_estoque_baixo = false;
            this.dados.is_estoque_vazio = false;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','ESTOQUE');
    }


    private set_paginador(){
        // =========================================================
        // PAGINADOR
        // =========================================================
        // linhas por pagina da listagem (rows)
        // if(this.config.QUANTOS_POR_PAGINA[this.dados.PARAMETRO]){
        //     this.dados.rows = this.config.QUANTOS_POR_PAGINA[this.dados.PARAMETRO];
        // }
        // else {
        //     this.dados.rows = this.config.QUANTOS_POR_PAGINA_default;
        // }
        //
        // if (this.dados.PARAMETRO == 'PAGAMENTOS'){
        //     this.dados.rows_planos = 10;
        //
        //     this.paginator_status_planos = true;
        //     if(this.config['ORCAMENTOS'].filtered) {
        //         if(this.dados[this.config['ORCAMENTOS'].filtered].length <= this.dados.rows_planos) {
        //             this.paginator_status_planos = false;
        //         }
        //     }
        //     else if(this.dados[this.config['ORCAMENTOS'].selected] && this.dados[this.config['ORCAMENTOS'].selected].length <= this.dados.rows_planos){
        //         this.paginator_status_planos = false;
        //     }
        //     if(this.config.PAGINATOR_SEMPRE['ORCAMENTOS']) {
        //         this.paginator_status_planos = true;
        //     }
        //
        //     // Agora os Pagamentos
        //     this.paginator_status = true;
        //     if(this.config[this.dados.PARAMETRO].filtered) {
        //         if(this.dados[this.config[this.dados.PARAMETRO].filtered].length <= this.dados.rows) {
        //             this.paginator_status = false;
        //         }
        //     }
        //     else if(this.dados[this.config[this.dados.PARAMETRO].selected] && this.dados[this.config[this.dados.PARAMETRO].selected].length <= this.dados.rows){
        //         this.paginator_status = false;
        //     }
        //
        //     if(this.config.PAGINATOR_SEMPRE[this.dados.PARAMETRO]) {
        //         this.paginator_status = true;
        //     }
        // }
        //
        // else if (this.dados.listar_aniversarios){
        //     if (this.dados.filtered_aniversariantes.length > 10){
        //         this.paginator_status = true;
        //     }
        //     else {
        //         this.paginator_status = false;
        //     }
        // }
        //
        //
        // else if (this.dados.PARAMETRO == 'HISTORICOS'){
        //     if (this.dados.total_de_historicos <= this.dados.rows){
        //         this.paginator_status = false;
        //     }
        //     else {
        //         this.paginator_status = true;
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'REL_RECEITAS_E_DESPESAS'){
        //     // Receitas
        //     if (this.dados.selected_lancamentos_receita.length <= this.dados.rows){
        //         this.paginator_rel_receitas = false;
        //     }
        //     else {
        //         this.paginator_rel_receitas = true;
        //     }
        //     if (this.dados.selected_lancamentos_despesa.length > 2){
        //         this.filter_rel_receitas = true;
        //     }
        //     else {
        //         this.filter_rel_receitas = false;
        //     }
        //
        //     // Despesas
        //     if (this.dados.selected_lancamentos_despesa.length <= this.dados.rows){
        //         this.paginator_rel_despesas = false;
        //     }
        //     else {
        //         this.paginator_rel_despesas = true;
        //     }
        //     if (this.dados.selected_lancamentos_despesa.length > 2){
        //         this.filter_rel_despesas = true;
        //     }
        //     else {
        //         this.filter_rel_despesas = false;
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'REL_DINHEIRO'){
        //     if(this.dados.datas_com_lancamentos_dinheiro){
        //
        //         if (this.dados.datas_com_lancamentos_dinheiro.length <= this.config.QUANTOS_POR_PAGINA.REL_DINHEIRO){
        //             this.paginator_status_rel_dinheiro = false;
        //         }
        //         else {
        //             this.paginator_status_rel_dinheiro = true;
        //         }
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'REL_CHEQUES_PRE'){
        //     if (this.dados.datas_com_lancamentos_receitas_cheque_pre.length <= this.config.QUANTOS_POR_PAGINA.REL_CHEQUES_PRE){
        //         this.paginator_status_rel_cheque_pre_receitas = false;
        //     }
        //     else {
        //         this.paginator_status_rel_dinheiro = true;
        //     }
        //
        //     if (this.dados.datas_com_lancamentos_despesas_cheque_pre.length <= this.config.QUANTOS_POR_PAGINA.REL_CHEQUES_PRE){
        //         this.paginator_status_rel_cheque_pre_despesas = false;
        //     }
        //     else {
        //         this.paginator_status_rel_dinheiro = true;
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'REL_CHEQUES_A_VISTA'){
        //     if (this.dados.datas_com_lancamentos_receitas_cheque.length <= this.config.QUANTOS_POR_PAGINA.REL_CHEQUES_A_VISTA){
        //         this.paginator_status_rel_cheque_receitas = false;
        //     }
        //     else {
        //         this.paginator_status_rel_cheque_receitas = true;
        //     }
        //
        //     if (this.dados.datas_com_lancamentos_despesas_cheque.length <= this.config.QUANTOS_POR_PAGINA.REL_CHEQUES_A_VISTA){
        //         this.paginator_status_rel_cheque_despesas = false;
        //     }
        //     else {
        //         this.paginator_status_rel_cheque_despesas = true;
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'CENTROS_DE_CUSTOS') {
        //     if(this.dados.editar_receitas) {
        //
        //     }
        //     else if(this.dados.editar_despesas) {
        //
        //     }
        //     else {
        //
        //     }
        // }
        //
        // else if (this.dados.PARAMETRO == 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
        //     if (this.dados.centros_de_custos_receitas.length <= this.config.QUANTOS_POR_PAGINA.REL_CENTROS_DE_CUSTOS_TOTALIZADOS){
        //         this.paginator_status_centros_de_custos_receitas = false;
        //     }
        //     else {
        //         this.paginator_status_centros_de_custos_receitas = true;
        //     }
        //
        //     if (this.dados.centros_de_custos_despesas.length <= this.config.QUANTOS_POR_PAGINA.REL_CENTROS_DE_CUSTOS_TOTALIZADOS){
        //         this.paginator_status_centros_de_custos_despesas = false;
        //     }
        //     else {
        //         this.paginator_status_centros_de_custos_despesas = true;
        //     }
        // }
        //
        // else if(this.dados.PARAMETRO == 'CENTROS_DE_CUSTOS_LISTA'){
        //     // Receitas
        //     if (this.dados.selected_receitas.length <= this.config.QUANTOS_POR_PAGINA.RECEITAS){
        //         this.paginator_CENTROS_DE_CUSTOS_LISTA_receita = false;
        //     }
        //     else {
        //         this.paginator_CENTROS_DE_CUSTOS_LISTA_receita = true;
        //     }
        //
        //     // Despesas
        //     if (this.dados.selected_despesas.length <= this.config.QUANTOS_POR_PAGINA.DESPESAS){
        //         this.paginator_centros_despesa = false;
        //     }
        //     else {
        //         this.paginator_centros_despesa = true;
        //     }
        // }
        //
        // else if(this.dados.PARAMETRO == 'ESTOQUE'){
        //     this.dados.rows = this.config.QUANTOS_POR_PAGINA['ESTOQUE'] ? this.config.QUANTOS_POR_PAGINA['ESTOQUE'] : this.config.QUANTOS_POR_PAGINA_default;
        //     this.paginator_status = this.dados.filtered_estoque.length > this.dados.rows ? true : false;
        // }
        //
        // else if(this.dados.PARAMETRO == 'ESTORNOS') {
        //     if(this.dados.selected_lancamentos_receita.length <= this.config.QUANTOS_POR_PAGINA.ESTORNOS){
        //         this.paginator_estorno_receitas = false;
        //     }
        //     else {
        //         this.paginator_estorno_receitas = true;
        //     }
        //     if(this.dados.selected_lancamentos_despesa.length <= this.config.QUANTOS_POR_PAGINA.ESTORNOS){
        //         this.paginator_estorno_despesas = false;
        //     }
        //     else {
        //         this.paginator_estorno_despesas = true;
        //     }
        // }
        //
        // else if (this.config.QUANTOS_POR_PAGINA[this.dados.PARAMETRO]){
        //     this.paginator_status = false;
        //
        //     let x_selected = this.config[this.dados.PARAMETRO].selected;
        //
        //     if(this.config.PAGINATOR_SEMPRE[this.dados.PARAMETRO]) {
        //         this.paginator_status = true;
        //         // console.log("PAGINATOR_SEMPRE = " + this.config.PAGINATOR_SEMPRE[this.dados.PARAMETRO]);
        //         // console.log("paginator_status = " + this.paginator_status)
        //     }
        //     else if(this.config[this.dados.PARAMETRO].filtered) {
        //         if(this.dados[this.config[this.dados.PARAMETRO].filtered].length > this.dados.rows) {
        //             this.paginator_status = true;
        //         }
        //         // console.log("this.dados[this.config[this.dados.PARAMETRO].filtered].length = " + this.dados[this.config[this.dados.PARAMETRO].filtered].length);
        //         // console.log("paginator_status = " + this.paginator_status)
        //     }
        //     else if(this.dados[x_selected]){
        //         if(this.dados[x_selected].length > this.dados.rows){
        //             this.paginator_status = true;
        //         }
        //     }
        //     // console.log("this.dados[x_selected].length = " + this.dados[x_selected].length);
        //     // console.log("paginator_status = " + this.paginator_status)
        // }
        //
        // else if (this.config.OBSERVADO_EM_REGISTROS[this.dados.PARAMETRO]){
        //     console.log("this.config.OBSERVADO_EM_REGISTROS[this.dados.PARAMETRO]");
        //
        //     // se não é nenhum dos casos anteriores e não tem definido quantos por página,
        //     // então também não é um database observado de forma independente
        //     // e vai ser observado como registros$
        //
        //     this.dados.listar_outros = true;
        //     console.log("listar_outros");
        //
        //     this.dados.observar_registros();
        //     console.log("observar_registros");
        //
        //
        //     if(this.config.QUANTOS_POR_PAGINA[this.dados.PARAMETRO]){
        //         this.dados.rows = this.config.QUANTOS_POR_PAGINA[this.dados.PARAMETRO];
        //     }
        //
        //     if (this.dados.total_de_registros <= this.dados.rows){
        //         this.paginator_status = false;
        //     }
        //     else {
        //         this.paginator_status = true;
        //     }
        //     if(this.config.PAGINATOR_SEMPRE[this.dados.PARAMETRO]) {
        //         this.paginator_status = true;
        //     }
        //
        //     console.log("---------------------");
        //     console.log("listar_outros => observar_registros() => " + this.dados.PARAMETRO);
        //     console.log("this.paginator_status => " + this.paginator_status);
        //     console.log("---------------------");
        // }
    }

    public listar_producao(profissional : any){
        console.log("listar_producao(" + profissional.nome + ")");
        console.log("profissional");
        console.log(profissional);

        this.dados.profissional_nome = profissional.nome;
        this.dados.profissional_valor_receitas = profissional.valor_receitas;

        let registro;
        this.dados.producao_profissional = [];
        this.dados.profissional_listado = profissional.profissional_nome;

        for(let i in this.dados.selected_lancamentos_receita) {
            registro = this.dados.selected_lancamentos_receita[i];
            // console.log("registro = this.dados.selected_lancamentos_receita[i];");
            // console.log(registro);
            if(registro.profissional_key == profissional.profissional_key && !registro.estorno){
                this.dados.producao_profissional.push(registro);
            }
        }
        console.log("this.dados.producao_profissional");
        console.log(this.dados.producao_profissional);

        // omite a listagem total e exibe a listagem do profissional
        // this.dados.listar_rel_producao = false;

        if (this.dados.producao_profissional.length <= this.config.QUANTOS_POR_PAGINA.PRODUCAO_PROFISSIONAL){
            this.dados.paginator_producao_profissional = false;
        }
        else {
            this.dados.paginator_producao_profissional = true;
        }

        this.dados.listar_producao_profissional = true;
    }

    public listar_dinheiro(data : string, despesa_ou_receita : string = ''){
        console.log("listar_dinheiro(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_dinheiro_dia = [];
        this.dados.despesas_dinheiro_dia = [];
        this.dados.receitas_cheque_dia = [];
        this.dados.despesas_cheque_dia = [];
        this.dados.receitas_cheque_pre_dia = [];
        this.dados.despesas_cheque_pre_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_dinheiro_receita) {
                registro = this.dados.lancamentos_dinheiro_receita[i];
                if(registro.data == data && !registro.estorno){
                    // console.log(registro);
                    this.dados.receitas_dinheiro_dia.push(registro);
                }
            }
            // console.log(this.dados.receitas_dinheiro_dia);
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_dinheiro_despesa) {
                registro = this.dados.lancamentos_dinheiro_despesa[i];
                if(registro.data == data && !registro.estorno){
                    // console.log(registro);
                    this.dados.despesas_dinheiro_dia.push(registro);
                }
            }
            // console.log(this.dados.despesas_dinheiro_dia);
        }


        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_dinheiro = false;
        this.dados.listar_dinheiro_dia = true;
    }

    public listar_cheque(data : string, despesa_ou_receita : string = ''){
        console.log("listar_cheque(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_cheque_dia = [];
        this.dados.despesas_cheque_dia = [];
        this.dados.receitas_cheque_dia = [];
        this.dados.despesas_cheque_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_cheque_receita) {
                registro = this.dados.lancamentos_cheque_receita[i];
                if(registro.data == data && !registro.estorno){
                    console.log(registro);
                    this.dados.receitas_cheque_dia.push(registro);
                }
            }
            console.log(this.dados.receitas_cheque_dia);
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_cheque_despesa) {
                registro = this.dados.lancamentos_cheque_despesa[i];
                if(registro.data == data && !registro.estorno){
                    // console.log(registro);
                    this.dados.despesas_cheque_dia.push(registro);
                }
            }
            // console.log(this.dados.despesas_cheque_dia);
        }


        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_cheque = false;
        this.dados.listar_cheque_dia = true;
    }

    public listar_cheque_pre(data : string, despesa_ou_receita : string = ''){
        console.log("listar_cheque_pre(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_cheque_pre_dia = [];
        this.dados.despesas_cheque_pre_dia = [];
        this.dados.receitas_cheque_dia = [];
        this.dados.despesas_cheque_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_cheque_pre_receita) {
                registro = this.dados.lancamentos_cheque_pre_receita[i];
                if(registro.data_cheque_pre == data && !registro.estorno){
                    console.log(registro);
                    this.dados.receitas_cheque_pre_dia.push(registro);
                }
            }
            console.log(this.dados.receitas_cheque_pre_dia);
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_cheque_pre_despesa) {
                registro = this.dados.lancamentos_cheque_pre_despesa[i];
                if(registro.data_cheque_pre == data && !registro.estorno){
                    console.log(registro);
                    this.dados.despesas_cheque_pre_dia.push(registro);
                }
            }
            console.log(this.dados.despesas_cheque_pre_dia);
        }


        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_cheque_pre = false;
        this.dados.listar_cheque_pre_dia = true;
    }

    public confirma_estorno_deste_lancamento(temp : any){
        // console.log("confirma_estorno_deste_lancamento()");
        // console.log(temp);

        // ESTORNADO
        this.confirmar_estorno_popup = false;
        temp.is_receita = false;
        temp.is_despesa = false;

        // --------------------------------------------------------------------------------------------------------
        // Esta atribuição abaixo é apenas para corrigir os primeiros registros de teste.
        // Nos novos registros desde 31/01/2020 is_receita e is_despesa já são atribuídos na criação do registro,
        // ao criar o código automatico do centro de custo
        // --------------------------------------------------------------------------------------------------------
        if(temp.centro_de_custos_codigo.substr(0,1)=='R'){
            temp.is_receita = true;
            temp.is_despesa = false;
        }
        else if(temp.centro_de_custos_codigo.substr(0,1)=='D'){
            temp.is_despesa = true;
            temp.is_receita = false;
        }
        // --------------------------------------------------------------------------------------------------------

        // lancamento original com a observação de estornado
        temp.estorno = "ESTORNADO";
        temp.valor_estornado = temp.valor;
        temp.valor = '';

        if(temp.is_receita){
            // this.dados.lancamentos_receita$.update(temp.key, temp);

            // Se foi venda, dá baixa no estoque
            if (temp.centro_de_custos == 'Venda do Estoque' && temp.produto_id){
                for(let i in this.dados.selected_estoque){
                    if(this.dados.selected_estoque[i].key == temp.produto_id){
                        console.log("Achou produto no estoque para atualizar quantidade");
                        let quantidade_em_estoque = this.dados.selected_estoque[i].quantidade;
                        let nova_quantidade = Number(quantidade_em_estoque) + Number(temp.quantidade);
                        this.dados.selected_estoque[i].quantidade = nova_quantidade;
                        // this.dados.estoque$.update(temp.produto_id, this.dados.selected_estoque[i]);
                        console.log("this.dados.selected_estoque[i]");
                        console.log(this.dados.selected_estoque[i]);
                        break;
                    }
                }
            }
        }
        else if(temp.is_despesa){
            // this.dados.lancamentos_despesa$.update(temp.key, temp);
        }

        // registro adicional de estorno com o valor revertido (* -1)
        // temp.valor = this.util.formata_valor(this.util.converte_valores_formatados_para_numero(temp.valor) * -1);
        // temp.key = temp.key + '---estorno';
        // temp.estorno = "ESTORNO";

        // if(temp.is_receita){
        //     this.dados.lancamentos_receita$.update(temp.key, temp);
        // }
        // else if(temp.is_despesa){
        //     this.dados.lancamentos_despesa$.update(temp.key, temp);
        // }

        // Popup de aviso
        this.aviso_titulo = "ESTORNO";
        this.aviso_mensagem = "ESTORNO REALIZADO";
        this.popup_de_aviso = true;
    }

    public muda_ano_estoque (intervalo : number){
        // this.dados.ano_estoque = String(Number(this.dados.ano_estoque) + intervalo);
        // this.dados.removeFilter_estoque();
    }

    public checa_se_pode_incluir(){
        // console.log("\ncheca_se_pode_incluir");
        // console.log("antes = " + this.dados.pode_incluir);

        this.dados.pode_incluir = this.config[this.dados.PARAMETRO].pode_incluir;
        // console.log("config[" + this.dados.PARAMETRO + "].pode_incluir = " + this.dados.pode_incluir);

        if(this.dados.PARAMETRO=='PAGAMENTOS'){
            console.log("this.dados.plano_de_tratamento");
            console.log(this.dados.plano_de_tratamento);
            console.log("this.dados.mostrar_lista_de_orcamentos");
            console.log(this.dados.mostrar_lista_de_orcamentos);

            if (this.dados.plano_de_tratamento) {
                this.dados.pode_incluir = true;
            }
            else {
                this.dados.pode_incluir = false;
            }
        }

        if(this.dados.PARAMETRO=='LANCAMENTOS_RECEITA'){
            if (this.dados.centro_de_custos_escolhido) {
                this.dados.pode_incluir = true;
                this.dados.pode_incluir_lancamento = true;
            }
            else {
                this.dados.pode_incluir = false;
                this.dados.pode_incluir_lancamento = false;
            }
        }

        if(this.dados.PARAMETRO=='LANCAMENTOS_DESPESA'){
            if (this.dados.centro_de_custos_escolhido) {
                this.dados.pode_incluir = true;
                this.dados.pode_incluir_lancamento = true;
            }
            else {
                this.dados.pode_incluir = false;
                this.dados.pode_incluir_lancamento = false;
            }
        }

        if(this.config.is_admin && this.config[this.dados.PARAMETRO].pode_incluir_admin){
            this.dados.pode_incluir = true;
        }

        if(this.dados.PARAMETRO=='ANIVERSARIOS' || this.dados.PARAMETRO=='REVISOES' || this.dados.PARAMETRO=='PROMOCOES'){
            this.dados.pode_incluir = false;
        }
    }

    public popup_alerta(alerta_titulo:string='', alerta_linha1:string='', alerta_linha2:string='') {
        console.log("popup_alerta");

        this.alerta_titulo = this.alerta_titulo ? this.alerta_titulo : alerta_titulo ? alerta_titulo : "ATENÇÃO";
        this.alerta_linha1 = this.alerta_linha1 ? this.alerta_linha1 : alerta_linha1 ? alerta_linha1 : "Há campos não preenchidos.";
        this.alerta_linha2 = this.alerta_linha2 ? this.alerta_linha2 : alerta_linha2 ? alerta_linha2 : "";
        this.popupAlerta = true;
    }

    public popup_alerta_fechar(){
        this.alerta_titulo = '';
        this.alerta_linha1 = '';
        this.alerta_linha2 = '';
        this.popupAlerta = false;
    }

    public popup_receita_despesa(meio_de_pagamento : string, data : string) {
        console.log("popup_receita_despesa");

        this.dados.popup_receita_despesa_meio_de_pagamento = meio_de_pagamento;
        this.dados.popup_receita_despesa_data = data;
        this.popupReceitaDespesa = true;
    }

    public popup_receita_despesa_escolheu(opcao) {
        console.log("popup_receita_despesa_escolheu");

        if(this.dados.popup_receita_despesa_meio_de_pagamento == 'dinheiro'){
            if(opcao==1){
                this.listar_dinheiro(this.dados.popup_receita_despesa_data,'receita');
            }
            else if (opcao==2){
                this.listar_dinheiro(this.dados.popup_receita_despesa_data,'despesa');
            }
        }

        if(this.dados.popup_receita_despesa_meio_de_pagamento == 'cheque'){
            if(opcao==1){
                this.listar_cheque(this.dados.popup_receita_despesa_data,'receita');
            }
            else if (opcao==2){
                this.listar_cheque(this.dados.popup_receita_despesa_data,'despesa');
            }
        }

        if(this.dados.popup_receita_despesa_meio_de_pagamento == 'cheque_pre'){
            if(opcao==1){
                this.listar_cheque_pre(this.dados.popup_receita_despesa_data,'receita');
            }
            else if (opcao==2){
                this.listar_cheque_pre(this.dados.popup_receita_despesa_data,'despesa');
            }
        }

        this.dados.popup_receita_despesa_meio_de_pagamento  = '';
        this.dados.popup_receita_despesa_data = '';
        this.popupReceitaDespesa = false;
    }

    public paginateEvent(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        this.quantas_paginas = event.pageCount; // Total number of pages
        // console.log("quantas_paginas = "+this.quantas_paginas);
        this.mostrar_tela();
    }

    public set_ver_detalhes(nome : string) {
        if (nome == this.detalhes_nome) {
            this.ver_detalhes = !this.ver_detalhes;
        }
        else {
            this.detalhes_nome = nome;
            this.ver_detalhes = true;
        }
    }

    public ver_lancamento(registro){
        this.dados.selected_origem = this.dados.selected;
        this.dados.selected = registro;
        console.log("ver_lancamento => registro");
        console.log(registro);

        // this.dados.ver_lancamento = true;
        this.dados.voltar_para = 'RESULTADOS';
        this.dados.voltar_para_lista = true;
        this.dados.origem = 'RESULTADOS';

        this.config.DISPLAY.Lista = false;
        this.config.DISPLAY.Registro = true;
    }

    go(destino : string = '') {
        // Redirecionamento

        if(destino == 'MALADIRETA'){
            this.dados.maladireta_destino = this.dados.PARAMETRO
            console.log("this.dados.maladireta_destino = " + this.dados.maladireta_destino);
        }

        if(destino == 'PRODUCAO_PROFISSIONAL'){
            this.config.DISPLAY.Lista = true;
            this.dados.listar_producao_profissional = true;
            return;
        }

        if(destino=="RESULTADOS"){
            this.config.DISPLAY.Lista = true;
            this.dados.listar_resultados = true;
            return;
        }

        console.log("origem anterior = " + this.dados.origem);
        this.dados.origem = this.dados.PARAMETRO;

        console.log("nova origem = " + this.dados.origem);
        console.log("go " + destino);

        this.dados.desativar_listagens;
        this.dados.desativar_DISPLAYS();

        if(destino == 'CONFIG_FINANCEIRO'){
			this.dados.filterDatabase(' ',destino);
            this.dados.PARAMETRO = 'CONFIG_FINANCEIRO';
            this.config.DISPLAY.Registro = false;
            this.dados.listar_config_financeiro = true;
            this.mostrar_tela();
        }
        else {
            console.log("this.dados.go(destino)");
            this.dados.go(destino);
        }
    }

    public voltar(){
        console.log("voltar()");

        if(this.config[this.dados.PARAMETRO].retorno=='HOME' || !this.config[this.dados.PARAMETRO].retorno){
            this.dados.remover_filtros();
            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.Home = true;
            return;
        }

        this.dados.listar_producao = false;

        this.dados.editar_receitas = false;
        this.dados.editar_despesas = false;

        this.dados.profissional_nome = '';
        this.dados.profissional_valor_receitas = 0;


        if(this.dados.PARAMETRO=='RELATORIOS'){
            // libera a memporia
            this.dados.lancamentos_dinheiro_receita = [];
            this.dados.lancamentos_dinheiro_despesa = [];

            this.dados.lancamentos_cheque_receita = [];
            this.dados.lancamentos_cheque_despesa = [];

            this.dados.lancamentos_cheque_pre_receita = [];
            this.dados.lancamentos_cheque_pre_despesa = [];

            this.dados.lancamentos_debito_receita = [];
            this.dados.lancamentos_debito_despesa = [];

            this.dados.lancamentos_credito_receita = [];
            this.dados.lancamentos_credito_despesa = [];
        }

        if(this.dados.PARAMETRO=='LANCAMENTOS_RECEITA'){
            if(this.dados.origem == 'CLIENTES') {
                console.log("voltar() ----- this.dados.origem == CLIENTES")

                this.dados.remover_filtros();

                this.dados.PARAMETRO = 'CLIENTES';
                this.dados.selected = this.dados.cliente;

                // this.dados.origem = '';
                // this.dados.listar_lancamentos_receita = true;

                if (this.dados.total_de_lancamentos_receita > 0) {
                    this.dados.mostrar_centros_de_custos_receita = true;
                }

                this.dados.listar_lancamentos_receita = false;
                this.dados.centro_de_custos_escolhido = {};
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = true;
            }
            else {
                if(this.config.LANCAMENTOS_RECEITA.retorno) {
                    this.dados.PARAMETRO = this.config.LANCAMENTOS_RECEITA.retorno;
                    this.mostrar_tela();
                }
                else {
                    // HOME
                   this.config.DISPLAY.Lista = false;
                   this.config.DISPLAY.Home = true;
                }
            }
        }

        else if(this.dados.PARAMETRO=='LANCAMENTOS_DESPESA'){
            console.log("voltar() - LANCAMENTOS_DESPESA");

            if(this.dados.origem == 'FORNECEDORES') {
                console.log("voltar() ----- this.dados.origem == FORNECEDORES")

                this.dados.remover_filtros();

                this.dados.PARAMETRO = 'FORNECEDORES';
                this.dados.selected = this.dados.fornecedor;

                this.dados.listar_lancamentos_despesa = false;
                this.dados.centro_de_custos_escolhido = {};
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = true;

                this.dados.origem = '';
                this.dados.fornecedor = {};
            }
            else {
                if(this.config.LANCAMENTOS_DESPESA.retorno) {
                    this.dados.PARAMETRO = this.config.LANCAMENTOS_DESPESA.retorno;
                    this.mostrar_tela();
                }
                else {
                    // HOME
                   this.config.DISPLAY.Lista = false;
                   this.config.DISPLAY.Home = true;
                }
            }
        }

        else if(this.dados.listar_dinheiro_dia || this.dados.listar_cheque_dia  || this.dados.listar_cheque_pre_dia ){
            console.log("voltar(), mas mudando as listas");

            this.dados.listar_rel_dinheiro = this.dados.listar_dinheiro_dia ? true : this.dados.listar_rel_dinheiro;
            this.dados.listar_rel_cheque_pre = this.dados.listar_cheque_pre_dia ? true : this.dados.listar_rel_cheque_pre;
            this.dados.listar_rel_cheque = this.dados.listar_cheque_dia ? true : this.dados.listar_rel_cheque;

            this.dados.listar_dinheiro_dia = false;
            this.dados.listar_cheque_dia = false;
            this.dados.listar_cheque_pre_dia = false;

            this.config.DISPLAY.Registro = false;
            this.config.DISPLAY.Lista = true;
        }

        else if(this.dados.listar_producao_profissional){
            this.dados.listar_producao_profissional = false;
            return;
        }

        else {
            this.dados.remover_filtros();
            console.log("PARAMETRO = " + this.dados.PARAMETRO);

            if(this.dados.PARAMETRO=="PAGAMENTOS"){
                if(!this.dados.mostrar_lista_de_orcamentos){
                    this.dados.mostrar_lista_de_orcamentos = true;
                    this.dados.pode_incluir_lancamento = false;
                }
            }

            if(this.config[this.dados.PARAMETRO].retorno) {
                if (this.config[this.dados.PARAMETRO].retorno == 'CLIENTES'){

                    if(this.dados.PARAMETRO == "ANIVERSARIOS" || this.dados.PARAMETRO == "REVISOES" || this.dados.PARAMETRO == "PROMOCOES"){
                        this.dados.go('CLIENTES');
                    }
                    else {
                        this.dados.PARAMETRO = "CLIENTES";
                        this.verRegistro(this.dados.cliente);
                    }
                }
                else {
                    this.dados.PARAMETRO = this.config[this.dados.PARAMETRO].retorno;
                    this.mostrar_tela();
                }
            }

            else {
                // HOME
               this.config.DISPLAY.Lista = false;
               this.config.DISPLAY.Home = true;
            }
        }
    }

    public verRegistro(registro : any) : void {
        console.log("verRegistro(registro)");
        console.log(registro);

        if(registro.estorno) {
            return;
        }

        // if (this.dados.PARAMETRO=='CAIXA' && this.dados.listar_dinheiro_dia){
        //     // snapshot do registro clicado
        //     this.dados.selected = registro;
        //
        //     // Esconde a lista. Mostra o registro.
        //     this.config.DISPLAY.Lista = false;
        //     this.config.DISPLAY.Registro = true;
        //
        //     return;
        // }


        // if (this.dados.PARAMETRO == "ULTIMOS_CLIENTES_VISUALIZADOS") {
        //     this.dados.PARAMETRO = 'CLIENTES';
        // }
        //
        // if (this.dados.PARAMETRO == "ANIVERSARIOS") {
        //     this.dados.PARAMETRO = 'CLIENTES';
        // }
        //
        // this.dados.checa_se_vai_poder_editar_a_ficha();

        if (['CLIENTES','EQUIPE'].includes(this.dados.PARAMETRO)) {
            this.dados.registro = null;
            this.dados.selected = registro;

            if(this.dados.PARAMETRO=='CLIENTES'){
                this.dados.cliente = registro;
            }
            else if(this.dados.PARAMETRO=='EQUIPE'){
                this.dados.responsavel = registro;
            }

            // this.dados.observar_orcamentos();

            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.Registro = true;

            // Registra a visualização
            registro.visualizado_em = this.util.quando();
            registro.visualizado_em_quando = this.util.quando_em_milisegundos();
            // this.dados.clientes_ultimos_visualizados$.update(registro.key, registro);
        }

        // if (this.dados.PARAMETRO == "ESTOQUE") {
        //     // Não registra a visualização. Apenas inclusões
        //     // registro.visualizado_em = this.util.quando();
        //     // registro.visualizado_em_quando = this.util.quando_em_milisegundos();
        //     // this.dados.estoque_ultimos_incluidos$.update(registro.key, registro);
        // }

        // if (this.dados.PARAMETRO == "FORNECEDORES") {
        //     // Registra a visualização
        //     registro.visualizado_em = this.util.quando();
        //     registro.visualizado_em_quando = this.util.quando_em_milisegundos();
        // }



        if (this.config[this.dados.PARAMETRO].tem_sublista) {
            if(registro.sublista) {
                console.log("this.goSublista(registro.sublista)");
                this.goSublista(registro.sublista);
            }
        }
        else {
            if (this.config.OBSERVADO_EM_REGISTROS[this.dados.PARAMETRO]) {
                this.dados.registro = registro;
                console.log("regthis.config.OBSERVADO_EM_REGISTROS[this.dados.PARAMETRO]istro");
                console.log("registro");
                console.log(registro);
                this.dados.cliente = null;
            }

            // snapshot do registro clicado
            // console.log("this.dados.selected atual antes de atribuir em VerRegistro :");
            console.log(this.dados.selected);
            this.dados.selected = registro;

            // Esconde a lista. Mostra o registro.
            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.Registro = true;
        }
    }

    public incluir() {
        this.dados.selected_edit = {};
        this.dados.selected = {};

        this.dados.incluindo = true;
        this.dados.incluiu = false;

        if(this.dados.PARAMETRO == 'CENTROS_DE_CUSTOS'){
            if (this.mostrar_opcao_1){
                this.dados.retorno = 'CENTROS_DE_CUSTOS';
                this.dados.PARAMETRO = 'RECEITAS';
            }
            else if (this.mostrar_opcao_2){
                this.dados.retorno = 'CENTROS_DE_CUSTOS';
                this.dados.PARAMETRO = 'DESPESAS';
            }
        }

        // CODIGO (ID) AUTOMATICO PARA OS REGISTROS
        if(this.dados.PARAMETRO == 'CLIENTES' && this.dados.usuario_logado.id_para_clientes){
            this.dados.selected_edit.id = this.util.novo_id(this.dados[this.config[this.dados.PARAMETRO].selected]);
        }

        if (this.dados.PARAMETRO=='RECEITAS'){
            this.dados.selected_edit.id = this.util.novo_id(this.dados[this.config[this.dados.PARAMETRO].selected]);
            this.dados.selected_edit.id = "R-" + this.dados.selected_edit.id;
            this.dados.selected_edit.is_despesa = false;
            this.dados.selected_edit.is_receita = true;
        }

        if (this.dados.PARAMETRO=='DESPESAS'){
            this.dados.selected_edit.id = this.util.novo_id(this.dados[this.config[this.dados.PARAMETRO].selected]);
            this.dados.selected_edit.id = "D-" + this.dados.selected_edit.id;
            this.dados.selected_edit.is_despesa = true;
            this.dados.selected_edit.is_receita = false;
        }

        this.config.DISPLAY.Lista = false;
        this.config.DISPLAY.Editar = true;
    }

    public mostrar_lista(lista : string){
        if(lista=='1'){

            this.mostrar_opcao_1 = true;
            this.mostrar_opcao_2 = false;
            this.menu_financeiro_opcao1_classe = 'menu_financeiro';
            this.menu_financeiro_opcao2_classe = 'menu_financeiro_inativo';
            // if(this.dados.PARAMETRO=="CENTROS_DE_CUSTOS"){
			// 	   this.dados.filterDatabase(' ','LANCAMENTOS_RECEITA');
            //     this.dados.editar_receitas = true;
            //     this.dados.editar_despesas = false;
            // }
        }
        else if(lista=='2'){
            this.mostrar_opcao_1 = false;
            this.mostrar_opcao_2 = true;
            this.menu_financeiro_opcao1_classe = 'menu_financeiro_inativo';
            this.menu_financeiro_opcao2_classe = 'menu_financeiro';
            // if(this.dados.PARAMETRO=="CENTROS_DE_CUSTOS"){
			// 	   this.dados.filterDatabase(' ','LANCAMENTOS_DESPESA');
            //     this.dados.editar_receitas = false;
            //     this.dados.editar_despesas = true;
            // }
        }
        // this.mostrar_estornos = false;
    }

    public escolher_centro_de_custos(registro : any) : void {
        this.dados.centro_de_custos_escolhido = registro;
        this.dados.p_header = this.dados.centro_de_custos_escolhido.nome;

        this.dados.listar_coluna_centro_de_custos = false;
        this.dados.listar_coluna_contraparte = true;

        if(this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA'){
            this.dados.filterDatabase(this.dados.centro_de_custos_escolhido.id,'LANCAMENTOS_RECEITA');

            this.dados.mostrar_centros_de_custos_receita = false;
            this.dados.listar_lancamentos_receita = true;
            this.dados.pode_incluir_lancamento = true;
        }

        else if(this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA'){
            this.dados.filterDatabase(this.dados.centro_de_custos_escolhido.id,'LANCAMENTOS_DESPESA');

            this.dados.mostrar_centros_de_custos_despesa = false;
            this.dados.listar_lancamentos_despesa = true;
            this.dados.pode_incluir_lancamento = true;

            console.log("\n\nPARAMETRO = " + this.dados.PARAMETRO);
            // console.log("mostrar_centros_de_custos_despesa = " + this.dados.mostrar_centros_de_custos_despesa);
            // console.log("pode_incluir_lancamento = " + this.dados.pode_incluir_lancamento);
            // console.log("listar_lancamentos_despesa = " + this.dados.listar_lancamentos_receita);
            console.log("Filtro ativado: filterContainsLancamentosDespesas \n\n");
        }

    }

    public escolher_lancamento_para_estornar(registro : any) : void {
        // console.log("escolher_lancamento_para_estornar");
        // console.log(this.dados.PARAMETRO);
        // console.log("Lançamento a estornar = ");
        // console.log(registro);

        this.dados.centro_de_custos_escolhido = registro;
        this.registro_para_estornar = registro;

        if(registro.estorno){
            // já foi estornado ou é um estorno
            // Popup
            this.aviso_titulo = "ESTORNO JÁ EXISTE";
            if(registro.estorno == 'ESTORNO'){
                this.aviso_mensagem = "Este registro já é um estorno";
            }
            else {
                this.aviso_mensagem = "Este registro já foi estornado";
            }
            this.popup_de_aviso = true;
        }
        else {
            this.confirmar_estorno_popup = true;
        }
    }

    public set_mostrar_lista_de_orcamentos(mostrar : boolean = true) {
        if (mostrar && this.dados.total_de_orcamentos > 0) {
            this.dados.mostrar_lista_de_orcamentos = true;
        }
        else {
            this.dados.mostrar_lista_de_orcamentos = false;
        }
    }

    public popupRegistro(registro : any, assunto_da_mensagem : string = '') : void {
        this.dados.cliente = registro;
        this.dados.selected = registro;
        this.dados.destinatario = registro;
        this.assunto_da_mensagem = assunto_da_mensagem;
        this.tempo_de_ausencia = this.util.get_idade_meses_dias(this.dados.selected.ultima_consulta);

        console.log('mensagem_whatsapp')
        console.log('PARAMETRO = ' + this.dados.PARAMETRO)
        this.dados.whatsapp_destino = this.dados.PARAMETRO;
        console.log('whatsapp_destino = ' + this.dados.whatsapp_destino)

        // console.log("assunto_da_mensagem = " + this.assunto_da_mensagem);

        if(this.assunto_da_mensagem=="ANIVERSÁRIO"){
            this.mensagem = "Olá " + this.dados.selected.nome + " \n\nFELIZ ANIVERSÁRIO!!! \n";
            this.mensagem += "Aproveitamos esta ocasião para te desejar muitas felicidades e muitos anos de vida repletos de realizações!\n\n";
            this.mensagem += "E, claro, também muitos sorrisos!\nConte com a gente pra isso!\n\n";
            this.mensagem += this.dados.usuario_logado.nome;
            if (this.dados.usuario_logado.titulo_profissional){
                this.mensagem += " \n" + this.dados.usuario_logado.titulo_profissional;
            }
            this.mensagem += " \ne equipe";
        }
        else if (this.assunto_da_mensagem=="REVISÃO"){
            this.mensagem = "Olá " + this.dados.selected.nome + " \n\nJá está na hora da revisão de seu tratamento dental.\n\n";
            this.mensagem += "A revisão é fundamental para avaliarmos a integridade e eficiência dos tratamentos realizados.\n";
            this.mensagem += "Além disso, é a melhor oportunidade para prevenir e identificar eventuais novos problemas, ";
            this.mensagem += "antes que se tornem maiores ou até mesmo irreversíveis.\n\n";
            this.mensagem += "Entre em contato e agende uma consulta, ok?\n\n";
            this.mensagem +=  this.dados.usuario_logado.nome;
            if (this.dados.usuario_logado.titulo_profissional){
                this.mensagem += " \n" + this.dados.usuario_logado.titulo_profissional;
            }
            this.mensagem += " \ne equipe";
        }
        else if (this.assunto_da_mensagem=="COMUNICADO"){
            this.mensagem = "Olá " + this.dados.selected.nome + " \n\nAlgum tempo se passou desde sua última consulta, ";
            this.mensagem += "mas seu tratamento odontológico não está ainda terminado...\n";
            this.mensagem += "É muito importante concluirmos o tratamento para não prejudicar o resultado planejado.\n\n";
            this.mensagem += "Entre em contato e agende sua consulta, ok?\n\n";
            this.mensagem += this.dados.usuario_logado.nome;
            if (this.dados.usuario_logado.titulo_profissional){
                this.mensagem += " \n" + this.dados.usuario_logado.titulo_profissional;
            }
            this.mensagem += " \ne equipe";
        }
        else {
            this.mensagem = "Olá " + this.dados.selected.nome + "\n\n\n";
            this.mensagem += this.dados.usuario_logado.nome;
            if (this.dados.usuario_logado.titulo_profissional){
                this.mensagem += " \n" + this.dados.usuario_logado.titulo_profissional;
            }
            this.mensagem += " \ne equipe";
        }

        this.mensagem_encoded = this.util.url_encode(this.mensagem);

        this.url = "https://api.whatsapp.com/send?phone=" + this.util.formata_whatsapp_para_envio(this.dados.selected.whatsapp);
        this.url_web = "http://web.whatsapp.com/send?phone=" + this.util.formata_whatsapp_para_envio(this.dados.selected.whatsapp);

        this.url += "&text=" + this.mensagem_encoded;
        this.url_web  += "&text=" + this.mensagem_encoded;
        this.config.DISPLAY.PopupRegistro = true;
    }

    public editarRegistro(registro : any) : void {
        // se esse registro na verdade abre uma nova lista...
        if (this.config[this.dados.PARAMETRO].tem_sublista) {
            this.dados.editando_sublista = true;

            this.dados.selected = registro;
            // Esconde a lista. Mostra o registro.
            this.dados.PARAMETRO = registro.sublista;
            this.dados.PARAMETRO = this.dados.PARAMETRO;
            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.Registro = true;
        }
        else {
            this.dados.editando_sublista = false;
        }
    }

    public goSublista(sublista : string){
        console.log("origem anterior = " + this.dados.origem);

        this.dados.origem = this.dados.PARAMETRO;
        this.dados.PARAMETRO = sublista;

        console.log("nova origem = " + this.dados.origem);
        console.log("sublista = " + sublista);

        if(sublista == 'CAIXA'){
            this.dados.listar_caixa = true;
            this.dados.pode_incluir = false;
        }

        if(sublista == 'REL_RECEITAS_E_DESPESAS'){
            // this.dados.removeFilter_lancamentos_receitas();
            // this.dados.removeFilter_lancamentos_despesas();
        }

        this.config.DISPLAY.Lista = true;
        this.config.DISPLAY.Registro = false;

        this.mostrar_tela();
    }

    public alternar(registro : any) : void {
        this.dados.alternar(registro);
    }

    public voltar_do_modal_de_erro(){
        this.config.DISPLAY.ErroDialog=false;
        this.config.DISPLAY.CompartilharDialog=true;
    }

    public voltar_do_modal_de_compartilhamento(){
        this.config.DISPLAY.CompartilharDialog=false;
        this.config.DISPLAY.ErroDialog=false;
    }

    public PopupWhatsappOK(){
        this.config.DISPLAY.PopupRegistro=false;
        this.confirma_envio_mensagem = true;
    }

    public ConfirmaPopupWhatsappOK(confirmado : boolean = false){
        this.confirma_envio_mensagem = false;

        console.log("ConfirmaPopupWhatsappOK = " + confirmado );

        if (confirmado){
            // registra no historico
            console.log('maladireta_destino = ' + this.dados.maladireta_destino)

            this.dados.historicos.local = this.dados.PARAMETRO;
            this.dados.historicos.database = this.dados.maladireta_destino;
            this.dados.historicos.titulo = this.assunto_da_mensagem + ": Mensagem";
            this.dados.historicos.mensagem = true;
            this.dados.historicos.whatsapp = this.dados.selected.whatsapp;
            this.dados.historicos.modificacoes = this.mensagem;


            // Os dados do registro de destinatario estão em dados.destinatario_key
            this.dados.historicos.destinatario_nome = this.dados.destinatario && this.dados.destinatario.nome ? this.dados.destinatario.nome : '';
            this.dados.historicos.destinatario_key = this.dados.destinatario && this.dados.destinatario.key ? this.dados.destinatario.key : '';
            this.dados.historicos.registro_nome = this.dados.destinatario && this.dados.destinatario.nome ? this.dados.destinatario.nome : '';
            this.dados.historicos.registro_key = this.dados.destinatario && this.dados.destinatario.key ? this.dados.destinatario.key : '';

            this.dados.salvar_HISTORICOS(this.dados.historicos);
        }
    }















}
