import { NgModule, Component, OnInit } from '@angular/core';

// Services
import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

// ConfirmDialog xxxxx
import {ConfirmationService} from 'primeng/api';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    providers: [ConfirmationService]
})

// export class ListComponent implements OnInit, OnChanges {
export class ListComponent implements OnInit {

    constructor(
        public dados: DadosService,
        public util: UtilService,
        public config: ConfigService,
        private confirmationService: ConfirmationService
    ) { }

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

    public assunto_da_mensagem : string = '';
    public titulo_lista : string = '';
    public sub_titulo_lista : string = '';

    public mostrar_opcao_1 : boolean = false;
    public mostrar_opcao_2 : boolean = false;
    public menu_financeiro_opcao2_classe : string;
    public menu_financeiro_opcao1_classe : string;

    // public mostrar_cheque_pre_dados : boolean = false;
    // public mostrar_cheque_pre_recebidos : boolean = false;

    public mostrar_extrato_caixa : boolean = false;
    public mostrar_extrato_bancos : boolean = false;

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

    public receitas_deste_socio : any;
    public receitas_deste_socio_total : number = 0;
    public restante_deste_socio : number = 0;

    // paginator_status
    public paginator_status : boolean = true;
    public paginator_destaque_status : boolean = true;
    public paginator_status_planos : boolean = true;
    public paginator_status_centros_de_custos : boolean = true;
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

    public atendimento_hoje : boolean = false;
    public atendimento_inativo : boolean = false;
    public atendimento_aberto : boolean = false;
    public atendimento_em_curso : boolean = false;
    public atendimento_finalizado : boolean = false;

    // PrimeNG Calendar
    public pt : any;
    public dates: Date[];
    public rangeDates: Date[] = [];
    public invalidDates: Array<Date>;
    public onFocusVal : Date[] = [];

    public overlayDetail : any = {};

    public enviar_whatsapp : boolean = true;

    public confirmar_envio_mensagem : boolean = false;
    public confirmou_envio_mensagem : boolean = false;
    public nao_confirmou_envio_mensagem : boolean = false;

    // ngOnChanges() {
    //     console.log("ngOnChanges()")
    // }

    ngOnInit(): void {
        console.log("\n\n==========================");
        console.log("INIT listagens => " + this.dados.PARAMETRO);
        console.log("==========================\n\n");
        console.log(this.dados.usuario_logado);
        console.log("==========================\n");





        this.dados.HOJE = this.util.hoje();
        this.dados.HOJE_QUANDO = this.util.converte_data_para_milisegundos(this.dados.HOJE);

        this.pt = this.config.pt;

        this.dados.data_quitar = this.util.diminui_data(this.dados.HOJE);
        this.dados.data_depositar = this.util.diminui_data(this.dados.HOJE);

        // this.dados.usuario_logado = this.dados.meu_perfil();

        if (this.dados.cliente && this.dados.cliente.nome) {
            this.nome = this.dados.cliente.nome;
        }
        if (this.dados.socio && this.dados.socio.nome) {
            this.nome = this.dados.socio.nome;
        }
        else if (this.dados.registro && this.dados.registro.nome){
            this.nome = this.dados.registro.nome;
        }

        this.dados.mostrar_imagens_na_lista_estoque = false;
        this.dados.omitir_refresh = false;

        // AJUSTES EVENTUAIS EM CAMPOS: ADAPTAR O CODIGO ABAIXO
        // this.dados.ajustar_campos();

        this.dados.imprimir_etiquetas = false;

        if(this.dados.PARAMETRO=='EQUIPE'){
            console.log("ATUALIZAR GEO-LOCALIZACAO DA EQUIPE")
            for(let i in this.dados.selected_equipe){
                // console.log(i)
                for (let x in this.dados.selected_usuarios){
                    // console.log(x)
                    if(this.dados.selected_usuarios[x].email == this.dados.selected_equipe[i].email){
                        // console.log("Achou usuario da equipe")
                        this.dados.selected_equipe[i].latitude = this.dados.selected_usuarios[x].latitude ?  this.dados.selected_usuarios[x].latitude : '';
                        this.dados.selected_equipe[i].longitude = this.dados.selected_usuarios[x].longitude ? this.dados.selected_usuarios[x].longitude : '';
                        this.dados.selected_equipe[i].gps_accuracy = this.dados.selected_usuarios[x].gps_accuracy ? this.dados.selected_usuarios[x].gps_accuracy : '';
                        this.dados.selected_equipe[i].gps_timestamp = this.dados.selected_usuarios[x].gps_timestamp ? this.dados.selected_usuarios[x].gps_timestamp : '';
                        // salva
                        this.dados.salva_equipe_registro(this.dados.selected_equipe[i]);
                        break;
                    }
                }
            }
        }


        this.mostrar_tela();
    }

    public mostrar_tela() {
        console.log("\n\n===========================");
        console.log("INIT listagens / mostrar_tela");
        console.log("===========================");
        console.log("PARAMETRO = " + this.dados.PARAMETRO);
        console.log("this.dados.usuario_logado");
        console.log(this.dados.usuario_logado);
        console.log(this.dados.usuario_logado.dataset);
        console.log("===========================");
        console.log("this.dados.voltar_pilha");
        console.log(this.dados.voltar_pilha);
        console.log("===========================\n\n");

        // CALENDARIO
        this.dados.refresh_calendar();
        this.rangeDates = this.config.rangeDates;


        // FLAGS
        this.enviar_whatsapp = true;
        this.confirmou_envio_mensagem = false;
        this.nao_confirmou_envio_mensagem = false;
        this.confirmar_envio_mensagem = false;


        if(this.dados.PARAMETRO){

            if (['FINANCEIRO'].includes(this.dados.PARAMETRO)){
            // if (['RELATORIOS','REL_DINHEIRO','REL_CHEQUES_PRE','REL_CHEQUES_A_VISTA'].includes(this.dados.PARAMETRO)){
                // Monta o filtered segundo o rangeDates ativo
                this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
                this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
            }

            if (['CLIENTES','SOCIOS','EQUIPE','FORNECEDORES','ATENDIMENTOS','ESTOQUE','HISTORICOS','RELATORIOS','BANCOS','CAIXA'].includes(this.dados.PARAMETRO)){

                this.dados[this.config[this.dados.PARAMETRO].filtered] = this.dados[this.config[this.dados.PARAMETRO].selected];

                this.dados.is_clientes_todos = true;
                this.dados.is_socios_todos = true;
                this.dados.is_equipe_todos = true;
                this.dados.is_fornecedores_todos = true;

                this.dados.is_clientes_aniversarios = false;
                this.dados.is_socios_aniversarios = false;
                this.dados.is_equipe_aniversarios = false;
                this.dados.is_fornecedores_aniversarios = false;

                this.dados.is_clientes_mensagens = false;
                this.dados.is_socios_mensagens = false;
                this.dados.is_equipe_mensagens = false;
                this.dados.is_fornecedores_mensagens = false;
            }

            if(this.dados.origem){
                console.log("origem = " + this.dados.origem);
            }


            if(this.dados.cliente && this.dados.cliente.nome){
                console.log("dados.cliente :");
                console.log(this.dados.cliente);
            }
            if(this.dados.socio && this.dados.socio.nome){
                console.log("dados.socio :");
                console.log(this.dados.socio);
            }

            // this.dados.database = this.config[this.dados.PARAMETRO].database;
            this.dados.set_titulo_pagina(this.config[this.dados.PARAMETRO].titulo_lista ? this.config[this.dados.PARAMETRO].titulo_lista : '');
            this.titulo_lista = this.dados.titulo_pagina ? this.dados.titulo_pagina : this.dados.PARAMETRO && this.config[this.dados.PARAMETRO] && this.config[this.dados.PARAMETRO].titulo_lista ? this.config[this.dados.PARAMETRO].titulo_lista : '';

            if (this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA'){

                // Se veio da ficha de cliente
                // if(this.dados.origem == 'CLIENTES' && this.dados.cliente){
                //     this.dados.mostrar_centros_de_custos_receita = false;  // xxxxxxxxxxxxxxxxxxxxxxxxnome
                //     this.dados.filterDatabase(' ','LANCAMENTOS_RECEITA');
                //
                //
                //     this.dados.p_header = this.dados.cliente.nome;
                //     this.dados.listar_coluna_centro_de_custos = true;
                //     this.dados.listar_coluna_contraparte = false;
                //
                //     console.log("origem");
                //     console.log(this.dados.origem);
                //     console.log("dados.listar_coluna_centro_de_custos");
                //     console.log(this.dados.listar_coluna_centro_de_custos);
                //     console.log("dados.listar_coluna_contraparte");
                //     console.log(this.dados.listar_coluna_contraparte);
                // }
            }

            if (this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA'){
                // Se veio da ficha de fornecedor
                if(this.dados.origem == 'FORNECEDORES' && this.dados.fornecedor){
                    this.dados.mostrar_centros_de_custos_receita = false;  // xxxxxxxxxxxxxxxxxxxxxxxx
                    this.dados.mostrar_centros_de_custos_despesa = false;  // xxxxxxxxxxxxxxxxxxxxxxxx
                    this.dados.filterDatabase(' ','LANCAMENTOS_DESPESA');

                    this.dados.p_header = this.dados.fornecedor.nome;
                    this.dados.listar_coluna_centro_de_custos = true;
                    this.dados.listar_coluna_contraparte = false;


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


            if(this.dados.PARAMETRO=='FINANCEIRO'){
                // if(this.dados.PARAMETRO == 'PAGAMENTOS' || this.dados.PARAMETRO=='FINANCEIRO'){
                this.dados.pode_incluir_lancamento = false;
                this.dados.centro_de_custos_escolhido = {};
                this.dados.mostrar_centros_de_custos_receita = true;
                this.dados.mostrar_centros_de_custos_despesa = true;
            }

            if(this.dados.PARAMETRO=='REL_CENTROS_DE_CUSTOS_TOTALIZADOS') {
                console.log('REL_CENTROS_DE_CUSTOS_TOTALIZADOS');
                this.calcula_rel_centros_de_custos_totalizados();
            }

            if(this.dados.PARAMETRO=='RESULTADOS') {
                console.log("RESULTADOS");
                this.calcula_resultados();
            }

            if(this.dados.PARAMETRO=='DISPONIBILIDADE') {
                console.log("DISPONIBILIDADE");
                this.calcula_disponibilidade_financeira();
            }

            if(this.dados.PARAMETRO=='MOVIMENTACAO') {
                console.log("MOVIMENTACAO");
                this.calcula_movimentacao();
            }


            if(this.dados.PARAMETRO=='CAIXA'){
                this.dados.listar_rel_dinheiro = false;
                this.dados.listar_dinheiro_dia = false;
                this.dados.listar_rel_cheque = false;
                this.dados.listar_cheque_dia = false;
                this.dados.listar_rel_cheque_pre = false;
                this.dados.listar_cheque_pre_dia = false;
                this.dados.listar_cheque_pre_dia_bom_para = false;
                this.dados.listar_rel_credito = false;
                this.dados.listar_credito_dia = false;
                this.dados.listar_rel_debito = false;
                this.dados.listar_debito_dia = false;
            }

            if(this.dados.PARAMETRO=='REL_DINHEIRO') {
                this.calcula_rel_dinheiro();
            }

            if(this.dados.PARAMETRO=='REL_CHEQUES_PRE') {
                this.calcula_rel_cheque_pre();
            }

            if(this.dados.PARAMETRO=='REL_CHEQUES_A_VISTA') {
                this.calcula_rel_cheque();
            }

            if(this.dados.PARAMETRO=='REL_DEBITO') {
                this.calcula_rel_debito();
            }

            if(this.dados.PARAMETRO=='REL_CREDITO') {
                this.calcula_rel_credito();
            }

            // MENU SELETOR DE PÁGINA (TAB)
            if( ['REL_RECEITAS_E_DESPESAS','REL_CENTROS_DE_CUSTOS','REL_CENTROS_DE_CUSTOS_TOTALIZADOS','REL_EXTRATO_DE_CONTAS','CENTROS_DE_CUSTOS_LISTA'].includes(this.dados.PARAMETRO) ){
                this.mostrar_opcao_1 = true;
                this.mostrar_opcao_2 = false;

                this.menu_financeiro_opcao1_classe = 'menu_financeiro float_none';
                this.menu_financeiro_opcao2_classe = 'menu_financeiro_inativo float_none';

                if(this.dados.mostrar_lista_opcao){
                    this.mostrar_lista(this.dados.mostrar_lista_opcao);
                    this.dados.mostrar_lista_opcao = '';
                }
                else {
                    this.mostrar_lista('1');
                }
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

            if(!['LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA','REL_DINHEIRO','REL_CHEQUES_PRE','REL_CHEQUES_A_VISTA','REL_DEBITO','REL_CREDITO'].includes(this.dados.PARAMETRO) ){
                this.dados.remover_filtros();
            }

            this.calcula_saldo_lancamentos_receita();
            this.calcula_saldo_lancamentos_despesa();


            if(this.dados.origem == 'RELATORIOS'){
                this.dados.omitir_refresh = true;
                this.dados.pode_incluir = false;
                this.dados.pode_incluir_lancamento = false;
            }

            this.config.DISPLAY.Lista = true;
        }
        else {
            this.dados.go('CLIENTES');
        }
    }



    public calcula_saldo_lancamentos_receita(){
        if(['LANCAMENTOS_RECEITA'].includes(this.dados.PARAMETRO) ){
            let registro;
            this.dados.saldo_lancamentos_receita = 0;
            for(let i in this.dados.filtered_lancamentos_receita){
                registro = this.dados.filtered_lancamentos_receita[i];
                this.dados.saldo_lancamentos_receita += this.util.converte_valores_formatados_para_numero(registro.valor);
            }
        }
    }

    public calcula_saldo_lancamentos_despesa(){
        if(['LANCAMENTOS_DESPESA'].includes(this.dados.PARAMETRO) ){
            let registro;
            this.dados.saldo_lancamentos_despesa = 0;
            for(let i in this.dados.filtered_lancamentos_despesa){
                registro = this.dados.filtered_lancamentos_despesa[i];
                this.dados.saldo_lancamentos_despesa += this.util.converte_valores_formatados_para_numero(registro.valor);                }
        }
    }


    public refresh_calendar() {
        this.dados.refresh_calendar();

        if(['REL_DINHEIRO'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_dinheiro();
        }
        if(['REL_CHEQUES_A_VISTA'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_cheque();
        }
        if(['MOVIMENTACAO'].includes(this.dados.PARAMETRO)){
            this.calcula_movimentacao();
        }
        if(['REL_CHEQUES_PRE'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_cheque_pre();
        }
        if(['REL_DEBITO'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_debito();
        }
        if(['REL_CREDITO'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_credito();
        }
        if(['RESULTADOS'].includes(this.dados.PARAMETRO)){
            this.calcula_resultados();
        }
        if(['DISPONIBILIDADE'].includes(this.dados.PARAMETRO)){
            this.calcula_disponibilidade_financeira();
        }
        if(['REL_CENTROS_DE_CUSTOS_TOTALIZADOS'].includes(this.dados.PARAMETRO)){
            this.calcula_rel_centros_de_custos_totalizados();
        }
        this.calcula_saldo_lancamentos_receita();
        this.calcula_saldo_lancamentos_despesa();
    }



    public calcula_rel_dinheiro() {
        console.log("calcula_rel_dinheiro()")

        let registro, key;
        let data, data_quando;
        let profissional, orcamento, cliente;

        let data_do_lancamento = {};
        let producao_do_profissional = {};
        let valor = 0;
        let valor_total = 0;
        let valor_total_na_data : number = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;


        // REL_DINHEIRO - RECEITAS EM DINHEIRO
        console.log("\nContabilizando RECEITAS EM DINHEIRO");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        data_do_lancamento = {};
        valor_total_na_data_receitas = 0;
        this.dados.valor_saldo_dinheiro = 0;
        this.dados.valor_total_receitas_dinheiro = 0;
        this.dados.lancamentos_dinheiro_receita = [];


        console.log("this.dados.filtered_lancamentos_receita");
        console.log(this.dados.filtered_lancamentos_receita);

        for(let i in this.dados.filtered_lancamentos_receita){
            // console.log(i);

            registro = this.dados.filtered_lancamentos_receita[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='dinheiro'){

                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);
                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);

                this.dados.valor_total_receitas_dinheiro = this.dados.valor_total_receitas_dinheiro + valor;

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


        // DESPESAS EM DINHEIRO
        console.log("\nContabilizando DESPESAS EM DINHEIRO");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")

        // data_do_lancamento = {};   // Não zera porque, em dinheiro, optou-se por registrar receitas e despesas no mesmo relatorio por dia
        valor_total_na_data_despesas = 0;
        this.dados.valor_saldo_dinheiro = 0;
        this.dados.valor_total_despesas_dinheiro = 0;
        this.dados.lancamentos_dinheiro_despesa = [];


        for(let i in this.dados.filtered_lancamentos_despesa){

            registro = this.dados.filtered_lancamentos_despesa[i];

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

        this.dados.valor_saldo_dinheiro = this.dados.valor_total_receitas_dinheiro - this.dados.valor_total_despesas_dinheiro;

        // Monta o relatorio
        this.dados.datas_com_lancamentos_dinheiro = [];

        for (key of Object.keys(data_do_lancamento)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
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

    public calcula_rel_cheque() {
        console.log("calcula_rel_cheque()")

        // REL_CHEQUES_A_VISTA - RECEITAS COM CHEQUES A VISTA
        console.log("\nContabilizando RECEITAS COM CHEQUES A VISTA");

        let registro, key;
        let data, data_quando;
        let profissional, orcamento, cliente;

        let data_do_lancamento = {};
        let producao_do_profissional = {};
        let valor = 0;
        let valor_total = 0;
        let valor_total_na_data : number = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        data_do_lancamento = {};
        valor_total_na_data = 0;
        this.dados.valor_total_receitas_cheque = 0;
        this.dados.lancamentos_cheque_receita = [];
        this.dados.lancamentos_cheque_despesa = [];

        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

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


        // DESPESAS EM REL_CHEQUES_A_VISTA
        console.log("\nContabilizando DESPESAS EM CHEQUES A VISTA");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")

        // data_do_lancamento = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia
        valor_total_na_data = 0;
        this.dados.valor_total_despesas_cheque = 0;

        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

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

        this.dados.valor_saldo_cheque = this.dados.valor_total_receitas_cheque - this.dados.valor_total_despesas_cheque;

        // Monta o relatorio
        this.dados.datas_com_lancamentos_cheque = [];

        for (key of Object.keys(data_do_lancamento)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
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

    public calcula_rel_cheque_pre() {
        console.log("calcula_rel_cheque_pre()")

        let registro, key;
        let data, data_quando, data_bom_para, data_quando_bom_para;
        let profissional, orcamento, cliente;

        let data_do_lancamento = {};
        let valor_total_na_data : number = 0;
        let data_do_lancamento_bom_para = {};
        let valor_total_na_data_bom_para : number = 0;

        let valor = 0;
        let valor_total = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;

        this.dados.lancamentos_cheque_pre_receita = [];
        this.dados.lancamentos_cheque_pre_receita_bom_para = [];

        this.dados.lancamentos_cheque_pre_despesa = [];
        this.dados.lancamentos_cheque_pre_despesa_bom_para = [];

        this.dados.valor_saldo_cheque_pre = 0;
        this.dados.valor_saldo_cheque_pre_bom_para = 0;

        // REL_CHEQUES_PRE - RECEITAS
        console.log("\nContabilizando RECEITAS EM CHEQUES PRE");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        data_do_lancamento = {};
        data_do_lancamento_bom_para = {};
        valor_total_na_data = 0;
        valor_total_na_data_bom_para = 0;

        this.dados.valor_total_receitas_cheque_pre = 0;
        this.dados.valor_total_receitas_cheque_pre_bom_para = 0;

        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque_pre'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " recebeu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_receitas_cheque_pre = this.dados.valor_total_receitas_cheque_pre + valor;

                if (!data_do_lancamento[data]){
                    data_do_lancamento[data] = {};
                    data_do_lancamento[data].data = data;
                    data_do_lancamento[data].data_quando = data_quando;
                    data_do_lancamento[data].valor_receitas = valor;
                }
                else {
                    valor_total_na_data = data_do_lancamento[data].valor_receitas;
                    data_do_lancamento[data].valor_receitas = valor_total_na_data + valor;
                }
                this.dados.lancamentos_cheque_pre_receita.push( registro );
            }
        }


        for(let i in this.dados.filtered_lancamentos_receita_bom_para){
            registro = this.dados.filtered_lancamentos_receita_bom_para[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque_pre'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

                console.log(registro);
                data = registro.data_cheque_pre;
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " recebeu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_receitas_cheque_pre_bom_para = this.dados.valor_total_receitas_cheque_pre_bom_para + valor;

                // Data para depósito pre-datado (data_cheque_pre)
                if (!data_do_lancamento_bom_para[data]){
                    data_do_lancamento_bom_para[data] = {};
                    data_do_lancamento_bom_para[data].data = data;
                    data_do_lancamento_bom_para[data].data_quando = data_quando;
                    data_do_lancamento_bom_para[data].valor_receitas = valor;
                }
                else {
                    valor_total_na_data_bom_para = data_do_lancamento_bom_para[data].valor_receitas ? data_do_lancamento_bom_para[data].valor_receitas : 0;
                    data_do_lancamento_bom_para[data].valor_receitas = valor_total_na_data_bom_para + valor;
                }
                this.dados.lancamentos_cheque_pre_receita_bom_para.push( registro );
            }
        }

        // Sort por data
        this.dados.lancamentos_cheque_pre_receita =  this.dados.lancamentos_cheque_pre_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.lancamentos_cheque_pre_receita_bom_para =  this.dados.lancamentos_cheque_pre_receita_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

        console.log("this.dados.lancamentos_cheque_pre_receita_bom_para = ")
        console.log(this.dados.lancamentos_cheque_pre_receita_bom_para)


        // REL_CHEQUES_PRE - DESPESAS
        console.log("\nContabilizando DESPESAS EM CHEQUES PRE");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');


        // data_do_lancamento = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia
        // data_do_lancamento_bom_para = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia

        valor_total_na_data = 0;
        valor_total_na_data_bom_para = 0;

        this.dados.valor_total_despesas_cheque_pre = 0;
        this.dados.valor_total_despesas_cheque_pre_bom_para = 0;

        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque_pre'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

                data = registro.data;
                console.log("Em " + registro.data + " emitiu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);

                data_quando = this.util.converte_data_para_milisegundos(data);
                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_despesas_cheque_pre = this.dados.valor_total_despesas_cheque_pre + valor;

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

        for(let i in this.dados.filtered_lancamentos_despesa_bom_para){
            registro = this.dados.filtered_lancamentos_despesa_bom_para[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='cheque_pre'){
                // Dispensa os cheques já depositados (e por extensão os quitados)
                if(registro.depositado || registro.quitado){
                    console.log("JA FOI DEPOSITADO: ");
                    console.log(registro);
                    if(registro.quitado){
                        console.log("JA FOI QUITADO");
                    }
                    continue;
                }

                data = registro.data_cheque_pre;  // data bom para...
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " emitiu cheque pre para " +registro.data_cheque_pre + " = "+ registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_despesas_cheque_pre_bom_para = this.dados.valor_total_despesas_cheque_pre_bom_para + valor;

                // Data para depósito pre-datado (data_cheque_pre)
                if (!data_do_lancamento_bom_para[data]){
                    data_do_lancamento_bom_para[data] = {};
                    data_do_lancamento_bom_para[data].data = data;
                    data_do_lancamento_bom_para[data].data_quando = data_quando;
                    data_do_lancamento_bom_para[data].valor_despesas = valor;
                }
                else {
                    valor_total_na_data_bom_para = data_do_lancamento_bom_para[data].valor_despesas ? data_do_lancamento_bom_para[data].valor_despesas : 0;
                    data_do_lancamento_bom_para[data].valor_despesas = valor_total_na_data_bom_para + valor;
                }
                this.dados.lancamentos_cheque_pre_despesa_bom_para.push( registro );
            }
        }



        // Sort por data
        this.dados.lancamentos_cheque_pre_despesa = this.dados.lancamentos_cheque_pre_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.lancamentos_cheque_pre_despesa_bom_para =  this.dados.lancamentos_cheque_pre_despesa_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

        console.log("this.dados.lancamentos_cheque_pre_despesa_bom_para = ")
        console.log(this.dados.lancamentos_cheque_pre_despesa_bom_para)

        this.dados.valor_saldo_cheque_pre = this.dados.valor_total_receitas_cheque_pre - this.dados.valor_total_despesas_cheque_pre;
        this.dados.valor_saldo_cheque_pre_bom_para = this.dados.valor_total_receitas_cheque_pre_bom_para - this.dados.valor_total_despesas_cheque_pre_bom_para;
        console.log("this.dados.valor_saldo_cheque_pre_bom_para = " + this.dados.valor_saldo_cheque_pre_bom_para)


        // Monta o relatorio
        this.dados.datas_com_lancamentos_cheque_pre = [];
        this.dados.datas_com_lancamentos_cheque_pre_bom_para = [];


        for (key of Object.keys(data_do_lancamento)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
                if(!data_do_lancamento[key].valor_despesas){
                    data_do_lancamento[key].valor_despesas = 0;
                }
                if(!data_do_lancamento[key].valor_receitas){
                    data_do_lancamento[key].valor_receitas = 0;
                }

                this.dados.datas_com_lancamentos_cheque_pre.push(data_do_lancamento[key]);
            }
        }


        for (key of Object.keys(data_do_lancamento_bom_para)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
                if(!data_do_lancamento_bom_para[key].valor_despesas){
                    data_do_lancamento_bom_para[key].valor_despesas = 0;
                }
                if(!data_do_lancamento_bom_para[key].valor_receitas){
                    data_do_lancamento_bom_para[key].valor_receitas = 0;
                }
                console.log(data_do_lancamento_bom_para[key]);
                this.dados.datas_com_lancamentos_cheque_pre_bom_para.push(data_do_lancamento_bom_para[key]);
            }
        }

        // Sort por data
        this.dados.datas_com_lancamentos_cheque_pre = this.dados.datas_com_lancamentos_cheque_pre.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.datas_com_lancamentos_cheque_pre_bom_para = this.dados.datas_com_lancamentos_cheque_pre_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
    }

    public calcula_rel_debito() {
        // REL_DEBITO - RECEITAS EM CARTÕES DE DÉBITO
        console.log("\nContabilizando RECEITAS EM CARTÕES DE DÉBITO");

        let registro, key;
        let data, data_quando;
        let profissional, orcamento, cliente;

        let data_do_lancamento = {};
        let producao_do_profissional = {};
        let valor = 0;
        let valor_total = 0;
        let valor_total_na_data : number = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        data_do_lancamento = {};
        valor_total_na_data_receitas = 0;
        this.dados.valor_saldo_debito = 0;
        this.dados.valor_total_receitas_debito = 0;
        this.dados.lancamentos_debito_receita = [];
        this.dados.datas_com_lancamentos_debito = [];

        console.log("this.dados.filtered_lancamentos_receita");
        console.log(this.dados.filtered_lancamentos_receita);


        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

            if(registro.meio_de_pagamento=='debito'){

                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);
                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);

                this.dados.valor_total_receitas_debito = this.dados.valor_total_receitas_debito + valor;

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
                this.dados.lancamentos_debito_receita.push( registro );
            }
        }
        // Sort por data
        this.dados.lancamentos_debito_receita =  this.dados.lancamentos_debito_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending


        // DESPESAS EM CARTÕES DE DÉBITO
        console.log("\nContabilizando CARTÕES DE DÉBITO");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")

        // data_do_lancamento = {};   // Não zera porque, em debito, optou-se por registrar receitas e despesas no mesmo relatorio por dia
        valor_total_na_data_despesas = 0;
        this.dados.valor_saldo_debito = 0;
        this.dados.valor_total_despesas_debito = 0;
        this.dados.lancamentos_debito_despesa = [];


        for(let i in this.dados.filtered_lancamentos_despesa){

            registro = this.dados.filtered_lancamentos_despesa[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='debito'){
                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);
                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                // console.log("valor = " + valor);

                this.dados.valor_total_despesas_debito = this.dados.valor_total_despesas_debito + valor;
                // console.log("this.dados.valor_total_despesas_debito = " + this.dados.valor_total_despesas_debito);

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
                this.dados.lancamentos_debito_despesa.push( registro );
            }
        }
        // Sort por data
        this.dados.lancamentos_debito_despesa =  this.dados.lancamentos_debito_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

        this.dados.valor_saldo_debito = this.dados.valor_total_receitas_debito - this.dados.valor_total_despesas_debito;

        // Monta o relatorio
        this.dados.datas_com_lancamentos_debito = [];

        for (key of Object.keys(data_do_lancamento)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                if(!data_do_lancamento[key].valor_despesas){
                    data_do_lancamento[key].valor_despesas = 0;
                }
                if(!data_do_lancamento[key].valor_receitas){
                    data_do_lancamento[key].valor_receitas = 0;
                }

                this.dados.datas_com_lancamentos_debito.push(data_do_lancamento[key]);
            }
        }
        // Sort por data
        this.dados.datas_com_lancamentos_debito = this.dados.datas_com_lancamentos_debito.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
    }

    public calcula_rel_credito() {
        console.log("calcula_rel_credito()")

        let registro, key;
        let data, data_quando;
        let profissional, orcamento, cliente;

        let data_do_lancamento = {};
        let valor_total_na_data : number = 0;
        let data_do_lancamento_bom_para = {};
        let valor_total_na_data_bom_para : number = 0;

        let valor = 0;
        let valor_total = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;

        this.dados.lancamentos_credito_despesa = [];
        this.dados.lancamentos_credito_despesa_bom_para = [];

        this.dados.lancamentos_credito_receita = [];
        this.dados.lancamentos_credito_receita_bom_para = [];

        this.dados.valor_saldo_credito = 0;
        this.dados.valor_saldo_credito_bom_para = 0;

        // REL_CREDITO - RECEITAS EM CARTÕES DE CREDITO
        console.log("\nContabilizando RECEITAS EM CARTOES DE CREDITO");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        data_do_lancamento = {};
        data_do_lancamento_bom_para = {};
        valor_total_na_data = 0;
        valor_total_na_data_bom_para = 0;

        this.dados.valor_total_receitas_credito = 0;
        this.dados.valor_total_receitas_credito_bom_para = 0;

        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='credito'){
                // Dispensa os cartões de crédito quitados
                if(registro.quitado){
                    console.log("JA FOI QUITADO");
                    console.log(registro);
                    continue;
                }

                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " recebeu cartão de crédito para " + registro.data_credito + " = "+ registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_receitas_credito = this.dados.valor_total_receitas_credito + valor;

                if (!data_do_lancamento[data]){
                    data_do_lancamento[data] = {};
                    data_do_lancamento[data].data = data;
                    data_do_lancamento[data].data_quando = data_quando;
                    data_do_lancamento[data].valor_receitas = valor;
                }
                else {
                    valor_total_na_data = data_do_lancamento[data].valor_receitas;
                    data_do_lancamento[data].valor_receitas = valor_total_na_data + valor;
                }
                this.dados.lancamentos_credito_receita.push( registro );
            }
        }


        for(let i in this.dados.filtered_lancamentos_receita_bom_para){
            registro = this.dados.filtered_lancamentos_receita_bom_para[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='credito'){
                // Dispensa os cartões de crédito quitados
                if(registro.quitado){
                    console.log("JA FOI QUITADO");
                    console.log(registro);
                    continue;
                }

                console.log(registro);
                data = registro.data_credito;
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " recebeu cheque pre para " +registro.data_credito + " = "+ registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_receitas_credito_bom_para = this.dados.valor_total_receitas_credito_bom_para + valor;

                // Data para crédito do cartão na conta (data_credito)
                if (!data_do_lancamento_bom_para[data]){
                    data_do_lancamento_bom_para[data] = {};
                    data_do_lancamento_bom_para[data].data = data;
                    data_do_lancamento_bom_para[data].data_quando = data_quando;
                    data_do_lancamento_bom_para[data].valor_receitas = valor;
                }
                else {
                    valor_total_na_data_bom_para = data_do_lancamento_bom_para[data].valor_receitas ? data_do_lancamento_bom_para[data].valor_receitas : 0;
                    data_do_lancamento_bom_para[data].valor_receitas = valor_total_na_data_bom_para + valor;
                }
                this.dados.lancamentos_credito_receita_bom_para.push( registro );
            }
        }

        // Sort por data
        this.dados.lancamentos_credito_receita =  this.dados.lancamentos_credito_receita.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.lancamentos_credito_receita_bom_para =  this.dados.lancamentos_credito_receita_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

        console.log("this.dados.lancamentos_credito_receita_bom_para");
        console.log(this.dados.lancamentos_credito_receita_bom_para);



        // DESPESAS EM CARTÕES DE CREDITO
        console.log("\nContabilizando DESPESAS EM CARTÕES DE CREDITO");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');

        // data_do_lancamento = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia
        // data_do_lancamento_bom_para = {};   // Não zera porque optou-se por registrar receitas e despesas no mesmo relatorio por dia

        valor_total_na_data = 0;
        valor_total_na_data_bom_para = 0;

        this.dados.valor_total_despesas_credito = 0;
        this.dados.valor_total_despesas_credito_bom_para = 0;

        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='credito'){
                // Dispensa os cartões de crédito quitados
                if(registro.quitado){
                    console.log("JA FOI QUITADO");
                    console.log(registro);
                    continue;
                }

                data = registro.data_credito;
                console.log("Em " + registro.data + " recebeu em cartão para crédito em " + registro.data_credito + " = "+ registro.valor);

                data_quando = this.util.converte_data_para_milisegundos(data);
                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_despesas_credito = this.dados.valor_total_despesas_credito + valor;

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
                this.dados.lancamentos_credito_despesa.push( registro );
            }
        }


        for(let i in this.dados.filtered_lancamentos_despesa_bom_para){
            registro = this.dados.filtered_lancamentos_despesa_bom_para[i];

            // Monta o objeto "data_do_lancamento"
            if(registro.meio_de_pagamento=='credito'){
                // Dispensa os cartões de crédito quitados
                if(registro.quitado){
                    console.log("JA FOI QUITADO");
                    console.log(registro);
                    continue;
                }

                // data = registro.data_credito;
                // TODO: Considera aqui o débito a vista do cartão do saldo do limite, mas mudar no futuro para a data de vencimento do cartão em "data_credito", após identificação do cartão que terá de ser cadastrado no sistema
                data = registro.data;
                data_quando = this.util.converte_data_para_milisegundos(data);

                console.log("Em " + registro.data + " pagou em cartão = " + registro.valor);

                valor =  this.util.converte_valores_formatados_para_numero(registro.valor);
                this.dados.valor_total_despesas_credito_bom_para = this.dados.valor_total_despesas_credito_bom_para + valor;

                // Data para debito do cartão
                if (!data_do_lancamento_bom_para[data]){
                    data_do_lancamento_bom_para[data] = {};
                    data_do_lancamento_bom_para[data].data = data;
                    data_do_lancamento_bom_para[data].data_quando = data_quando;
                    data_do_lancamento_bom_para[data].valor_despesas = valor;
                }
                else {
                    valor_total_na_data_bom_para = data_do_lancamento_bom_para[data].valor_despesas ? data_do_lancamento_bom_para[data].valor_despesas : 0;
                    data_do_lancamento_bom_para[data].valor_despesas = valor_total_na_data_bom_para + valor;
                }
                this.dados.lancamentos_credito_despesa_bom_para.push( registro );
            }
        }



        // Sort por data
        this.dados.lancamentos_credito_despesa =  this.dados.lancamentos_credito_despesa.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.lancamentos_credito_despesa_bom_para =  this.dados.lancamentos_credito_despesa_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending

        console.log("this.dados.lancamentos_credito_despesa_bom_para = ")
        console.log(this.dados.lancamentos_credito_despesa_bom_para)

        this.dados.valor_saldo_credito = this.dados.valor_total_receitas_credito - this.dados.valor_total_despesas_credito;
        this.dados.valor_saldo_credito_bom_para = this.dados.valor_total_receitas_credito_bom_para - this.dados.valor_total_despesas_credito_bom_para;
        console.log("this.dados.valor_saldo_credito_bom_para = " + this.dados.valor_saldo_credito_bom_para)


        // Monta o relatorio
        this.dados.datas_com_lancamentos_credito = [];
        this.dados.datas_com_lancamentos_credito_bom_para = [];


        for (key of Object.keys(data_do_lancamento)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
                if(!data_do_lancamento[key].valor_despesas){
                    data_do_lancamento[key].valor_despesas = 0;
                }
                if(!data_do_lancamento[key].valor_receitas){
                    data_do_lancamento[key].valor_receitas = 0;
                }

                this.dados.datas_com_lancamentos_credito.push(data_do_lancamento[key]);
            }
        }

        for (key of Object.keys(data_do_lancamento_bom_para)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
                if(!data_do_lancamento_bom_para[key].valor_despesas){
                    data_do_lancamento_bom_para[key].valor_despesas = 0;
                }
                if(!data_do_lancamento_bom_para[key].valor_receitas){
                    data_do_lancamento_bom_para[key].valor_receitas = 0;
                }
                console.log(data_do_lancamento_bom_para[key]);
                this.dados.datas_com_lancamentos_credito_bom_para.push(data_do_lancamento_bom_para[key]);
            }
        }

        // Sort por data
        this.dados.datas_com_lancamentos_credito = this.dados.datas_com_lancamentos_credito.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.datas_com_lancamentos_credito_bom_para = this.dados.datas_com_lancamentos_credito_bom_para.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
    }




    public calcula_movimentacao() {
        console.log("calcula_movimentacao()")

        let registro, key, indice;
        let data, data_quando;

        let data_do_lancamento = {};
        let valor = 0;
        let valor_total_na_data : number = 0;
        let valor_total_na_data_receitas : number = 0;
        let valor_total_na_data_despesas : number = 0;
        this.dados.valor_total_receitas = 0;
        this.dados.valor_total_despesas = 0;

        this.dados.valor_total_receitas_dinheiro = 0;
        this.dados.valor_total_receitas_cheque = 0;
        this.dados.valor_total_receitas_cheque_pre = 0;
        this.dados.valor_total_receitas_credito = 0;
        this.dados.valor_saldo = 0;

        let valor_total = 0;

        data_do_lancamento = {};
        this.dados.lancamentos_dinheiro_receita = [];
        this.dados.lancamentos_dinheiro_despesa = [];
        this.dados.lancamentos_cheque_receita = [];
        this.dados.lancamentos_cheque_despesa = [];
        this.dados.lancamentos_cheque_pre_receita = [];
        this.dados.lancamentos_cheque_pre_despesa = [];
        this.dados.lancamentos_credito_receita = [];
        this.dados.lancamentos_credito_despesa = [];
        this.dados.lancamentos_receita = [];
        this.dados.lancamentos_despesa = [];

        // RECEITAS
        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")

        // Cheque, dinheiro e cartão de débito
        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];
            if(registro.estorno) {
                // pula os estornos
                continue;
            }

            key = registro.key;
            valor =  this.util.converte_valores_formatados_para_numero(registro.valor);


            // Filtra o meio de pagamento
            switch(registro.meio_de_pagamento) {
                case 'credito':
                    continue;
                case 'cheque_pre':
                    continue;
                case 'cheque':
                    data = registro.data;
                    this.dados.valor_total_receitas_cheque = this.dados.valor_total_receitas_cheque + valor;
                    break;
                case 'dinheiro':
                    // data = registro.data;
                    // this.dados.valor_total_receitas_dinheiro = this.dados.valor_total_receitas_dinheiro + valor;
                    // break;
                    continue;
                case 'debito':
                    // data = registro.data;
                    // this.dados.valor_total_receitas_debito = this.dados.valor_total_receitas_debito + valor;
                    // break;
                    continue;
            }


            // Filtra em caixa, aguardando em banco e quitados
            if(this.dados.is_em_caixa){
                if(registro.quitado){
                    continue;
                }
                if(registro.depositado || registro.aguardando){
                    continue;
                }
                // console.log("EM CAIXA")
                // console.log(registro)
            }
            if(this.dados.is_aguardando){
                if(registro.quitado){
                    continue;
                }
                if(!registro.depositado && !registro.aguardando){
                    continue;
                }
                // console.log("AGUARDANDO")
                // console.log(registro)
            }
            if(this.dados.is_quitado){
                if(! registro.quitado){
                    continue;
                }
                // console.log("QUITADO")
                // console.log(registro)
            }


            this.dados.valor_total_receitas = this.dados.valor_total_receitas + valor;
            data_quando = this.util.converte_data_para_milisegundos(data);

            data_do_lancamento[key] = {};
            data_do_lancamento[key].data = data;
            data_do_lancamento[key].data_quando = data_quando;
            data_do_lancamento[key].valor_receita = valor;
            data_do_lancamento[key].meio_de_pagamento = registro.meio_de_pagamento;
            data_do_lancamento[key].centro_de_custos = registro.centro_de_custos;
            data_do_lancamento[key].contraparte = registro.contraparte;
            data_do_lancamento[key].key = registro.key;
            data_do_lancamento[key].tipo = 'receita';
            data_do_lancamento[key].registro = registro;
            data_do_lancamento[key].registro.tipo = 'receita';

            // this.dados.lancamentos_receita.push( registro );
        }

        // Cheque pre-datado e cartão de crédito
        for(let i in this.dados.filtered_lancamentos_receita_bom_para){
            registro = this.dados.filtered_lancamentos_receita_bom_para[i];
            if(registro.estorno) {
                // pula os estornos
                continue;
            }

            key = registro.key;
            valor =  this.util.converte_valores_formatados_para_numero(registro.valor);

            // Filtra o meio de pagamento
            switch(registro.meio_de_pagamento) {
                case 'credito':
                    data = registro.data_credito;
                    this.dados.valor_total_receitas_credito = this.dados.valor_total_receitas_credito + valor;
                    break;
                    // continue;
                case 'cheque_pre':
                    data = registro.data_cheque_pre;
                    this.dados.valor_total_receitas_cheque_pre = this.dados.valor_total_receitas_cheque_pre + valor;
                    break;
                case 'cheque':
                    continue;
                case 'dinheiro':
                    continue;
                case 'debito':
                    continue;
            }


            // Filtra em caixa, aguardando em banco e quitados
            if(this.dados.is_em_caixa){
                if(registro.quitado){
                    continue;
                }
                if(registro.depositado || registro.aguardando){
                    continue;
                }
                // console.log("EM CAIXA")
                // console.log(registro)
            }
            if(this.dados.is_aguardando){
                if(registro.quitado){
                    continue;
                }
                if(!registro.depositado && !registro.aguardando){
                    continue;
                }
                // console.log("AGUARDANDO")
                // console.log(registro)
            }
            if(this.dados.is_quitado){
                if(! registro.quitado){
                    continue;
                }
                // console.log("QUITADO")
                // console.log(registro)
            }


            this.dados.valor_total_receitas = this.dados.valor_total_receitas + valor;
            data_quando = this.util.converte_data_para_milisegundos(data);

            data_do_lancamento[key] = {};
            data_do_lancamento[key].data = data;
            data_do_lancamento[key].data_quando = data_quando;
            data_do_lancamento[key].valor_receita = valor;
            data_do_lancamento[key].meio_de_pagamento = registro.meio_de_pagamento;
            data_do_lancamento[key].centro_de_custos = registro.centro_de_custos;
            data_do_lancamento[key].contraparte = registro.contraparte;
            data_do_lancamento[key].key = registro.key;
            data_do_lancamento[key].tipo = 'receita';
            data_do_lancamento[key].registro = registro;
            data_do_lancamento[key].registro.tipo = 'receita';


            // this.dados.lancamentos_receita.push( registro );
        }



        // DESPESAS
        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")

        // Cheque, dinheiro e cartão de débito, e no caso de despesa, também cartão de crédito (mas depois vai passar a ser previsto para a data de pagamento do cartão)
        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

            if(registro.estorno) {
                // pula os estornos
                continue;
            }

            key = registro.key;
            valor =  this.util.converte_valores_formatados_para_numero(registro.valor);

            // Filtra o meio de pagamento
            switch(registro.meio_de_pagamento) {
                case 'credito':
                    // data = registro.data_credito;
                    // this.dados.valor_total_despesas_credito = this.dados.valor_total_despesas_credito + valor;
                    // break;
                    continue;
                case 'cheque_pre':
                    continue;
                case 'cheque':
                    data = registro.data;
                    this.dados.valor_total_despesas_cheque = this.dados.valor_total_despesas_cheque + valor;
                    break;
                case 'dinheiro':
                    // data = registro.data;
                    // this.dados.valor_total_despesas_dinheiro = this.dados.valor_total_despesas_dinheiro + valor;
                    // break;
                    continue;
                case 'debito':
                    // data = registro.data;
                    // this.dados.valor_total_despesas_debito = this.dados.valor_total_despesas_debito + valor;
                    // break;
                    continue;
            }


            // Filtra em caixa, aguardando em banco e quitados
            if(this.dados.is_em_caixa){
                if(registro.quitado){
                    continue;
                }
                if(registro.depositado || registro.aguardando){
                    continue;
                }
                console.log("EM CAIXA")
                console.log(registro)
            }
            if(this.dados.is_aguardando){
                if(registro.quitado){
                    continue;
                }
                if(!registro.depositado && !registro.aguardando){
                    continue;
                }
                console.log("AGUARDANDO")
                console.log(registro)
            }
            if(this.dados.is_quitado){
                if(! registro.quitado){
                    continue;
                }
                console.log("QUITADO")
                console.log(registro)
            }


            this.dados.valor_total_despesas = this.dados.valor_total_despesas + valor;
            data_quando = this.util.converte_data_para_milisegundos(data);

            data_do_lancamento[key] = {};
            data_do_lancamento[key].data = data;
            data_do_lancamento[key].data_quando = data_quando;
            data_do_lancamento[key].valor_despesa = valor;
            data_do_lancamento[key].meio_de_pagamento = registro.meio_de_pagamento;
            data_do_lancamento[key].centro_de_custos = registro.centro_de_custos;
            data_do_lancamento[key].contraparte = registro.contraparte;
            data_do_lancamento[key].key = registro.key;
            data_do_lancamento[key].tipo = 'despesa';
            data_do_lancamento[key].registro = registro;
            data_do_lancamento[key].registro.tipo = 'despesa';

            // this.dados.lancamentos_despesa.push( registro );
        }

        // Cheque pre-datado e futuramente incluir aqui cartão de crédito que hoje está como desconto direto (reserva) mas pode mudar pra data de pagamento do cartão
        for(let i in this.dados.filtered_lancamentos_despesa_bom_para){
            registro = this.dados.filtered_lancamentos_despesa_bom_para[i];

            if(registro.estorno) {
                // pula os estornos
                continue;
            }

            key = registro.key;
            valor =  this.util.converte_valores_formatados_para_numero(registro.valor);

            // Filtra o meio de pagamento
            switch(registro.meio_de_pagamento) {
                case 'credito':
                    continue;
                case 'cheque_pre':
                    data = registro.data_cheque_pre;
                    this.dados.valor_total_despesas_cheque_pre = this.dados.valor_total_despesas_cheque_pre + valor;
                    break;
                case 'cheque':
                    continue;
                case 'dinheiro':
                    continue;
                case 'debito':
                    continue;
            }


            // Filtra em caixa, aguardando em banco e quitados
            if(this.dados.is_em_caixa){
                if(registro.quitado){
                    continue;
                }
                if(registro.depositado || registro.aguardando){
                    continue;
                }
                console.log("EM CAIXA")
                console.log(registro)
            }
            if(this.dados.is_aguardando){
                if(registro.quitado){
                    continue;
                }
                if(!registro.depositado && !registro.aguardando){
                    continue;
                }
                console.log("AGUARDANDO")
                console.log(registro)
            }
            if(this.dados.is_quitado){
                if(! registro.quitado){
                    continue;
                }
                console.log("QUITADO")
                console.log(registro)
            }


            this.dados.valor_total_despesas = this.dados.valor_total_despesas + valor;
            data_quando = this.util.converte_data_para_milisegundos(data);

            data_do_lancamento[key] = {};
            data_do_lancamento[key].data = data;
            data_do_lancamento[key].data_quando = data_quando;
            data_do_lancamento[key].valor_despesa = valor;
            data_do_lancamento[key].meio_de_pagamento = registro.meio_de_pagamento;
            data_do_lancamento[key].centro_de_custos = registro.centro_de_custos;
            data_do_lancamento[key].contraparte = registro.contraparte;
            data_do_lancamento[key].key = registro.key;
            data_do_lancamento[key].tipo = 'despesa';
            data_do_lancamento[key].registro = registro;
            data_do_lancamento[key].registro.tipo = 'despesa';

            // this.dados.lancamentos_despesa.push( registro );
        }



        this.dados.valor_saldo = this.dados.valor_total_receitas - this.dados.valor_total_despesas;

        // Monta o relatorio
        this.dados.datas_com_lancamentos = [];

        for (indice of Object.keys(data_do_lancamento)) {
            if (indice=='undefined'){} // ignorar
            else if (Number(indice)==0){} // ignorar
            else {
                // completa os valores vazios de receita ou despesa dos dias relacionados
                if(!data_do_lancamento[indice].valor_despesa){
                    data_do_lancamento[indice].valor_despesa = 0;
                }
                if(!data_do_lancamento[indice].valor_receita){
                    data_do_lancamento[indice].valor_receita = 0;
                }

                this.dados.datas_com_lancamentos.push(data_do_lancamento[indice]);
            }
        }
        // Sort por data e meio de pagamento
        // this.dados.datas_com_lancamentos = this.dados.datas_com_lancamentos.sort((a, b) => (a.data_quando > b.data_quando) ? 1 :- 1) //// sort a list of objects by a property, ascending
        this.dados.datas_com_lancamentos = this.dados.datas_com_lancamentos.sort((a, b) => (a.data_quando < b.data_quando) ? 1 : (a.data_quando === b.data_quando) ? ((a.meio_de_pagamento > b.meio_de_pagamento) ? 1 : -1) : -1 )  // descending na data

        // Acentuando e capitalizando o meio de pagamento para o relatório
        for(let x in this.dados.datas_com_lancamentos){
            switch(this.dados.datas_com_lancamentos[x].meio_de_pagamento) {
                case 'credito':
                    this.dados.datas_com_lancamentos[x].meio_de_pagamento = 'Crédito';
                    break;
                case 'cheque_pre':
                    this.dados.datas_com_lancamentos[x].meio_de_pagamento = 'Cheque Pré';
                    break;
                case 'cheque':
                    this.dados.datas_com_lancamentos[x].meio_de_pagamento = 'Cheque';
                    break;
                case 'dinheiro':
                    this.dados.datas_com_lancamentos[x].meio_de_pagamento = 'Dinheiro';
                    break;
                case 'debito':
                    this.dados.datas_com_lancamentos[x].meio_de_pagamento = 'Débito';
                    break;
            }
        }
    }

    public calcula_resultados(){
        // RESULTADOS
        console.log("\nCalculando RESULTADOS");

        let registro, key, valor, valor_acumulado, data_quando, valor_receita, valor_despesa;
        this.dados.valor_total_receitas = 0;
        this.dados.valor_total_despesas = 0;
        this.dados.saldo_lancamentos = 0;

        this.dados.lancamentos_por_dia = [];
        this.dados.lancamentos_por_dia_obj = {};

        // Le receitas e despesas e totaliza por centro de custos

        // RECEITAS
        console.log("Calculando resultados de RECEITAS");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")


        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

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
        console.log("Calculando resultados de DESPESAS");


        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")


        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

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
        this.dados.filtered_resultados = this.dados.selected_resultados;
        this.dados.total_de_resultados = this.dados.selected_resultados.length;

        console.log("\n\n==============================");
        console.log("PARAMETRO = " + this.dados.PARAMETRO)
        console.log("selected_resultados");
        console.log("==============================");
        console.log(this.dados.selected_resultados);
        console.log("==============================");

    }

    public calcula_disponibilidade_financeira(){
        // DISPONIBILIDADE
        console.log("\nCalculando DISPONIBILIDADE");

        let registro, key, valor, valor_acumulado, data, data_quando, valor_receita, valor_despesa;
        this.dados.valor_total_receitas_futuras = 0;
        this.dados.valor_total_despesas_futuras = 0;
        this.dados.saldo_lancamentos = 0;

        this.dados.lancamentos_futuros_por_dia = [];
        this.dados.lancamentos_futuros_por_dia_obj = {};

        let para_disponibilidade_financeira = true;
        this.dados.inicializar_rangeDates(para_disponibilidade_financeira);

        // RECEITAS PREVISTAS
        console.log("Calculando RECEITAS PREVISTAS");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');

        // Lançamentos futuros
        for(let i in this.dados.filtered_lancamentos_receita_bom_para){
            registro = this.dados.filtered_lancamentos_receita_bom_para[i];

            valor = this.util.converte_valores_formatados_para_numero(registro.valor);
            if(registro.meio_de_pagamento == 'cheque_pre'){
                data = registro.data_cheque_pre;
            }
            else if(registro.meio_de_pagamento == 'credito'){
                data = registro.data_credito;
            }
            else {
                continue;
            }

            if(valor>0){
                // Monta o objeto "lancamentos_futuros_por_dia_obj"
                if (!this.dados.lancamentos_futuros_por_dia_obj[data]){
                    this.dados.lancamentos_futuros_por_dia_obj[data] = {};
                    data_quando = this.util.converte_data_para_milisegundos(data);
                    this.dados.lancamentos_futuros_por_dia_obj[data].data = data;
                    this.dados.lancamentos_futuros_por_dia_obj[data].data_quando = data_quando;

                    this.dados.lancamentos_futuros_por_dia_obj[data].receita = valor;
                    this.dados.valor_total_receitas_futuras += valor;
                }
                else {
                    //soma o valor do novo registro ao centro de custo
                    valor_acumulado = this.dados.lancamentos_futuros_por_dia_obj[data].receita ? this.dados.lancamentos_futuros_por_dia_obj[data].receita : 0;
                    // console.log("valor_acumulado antes = " + valor_acumulado);
                    // console.log("valor = " + valor);
                    valor_acumulado = valor + valor_acumulado;
                    // console.log("valor_acumulado = " + valor_acumulado);

                    this.dados.lancamentos_futuros_por_dia_obj[data].receita = valor_acumulado;
                    this.dados.valor_total_receitas_futuras += valor;
                }
            }
        }

        console.log("========");
        console.log("this.dados.valor_total_receitas_futuras");
        console.log(this.dados.valor_total_receitas_futuras);
        console.log("this.dados.lancamentos_futuros_por_dia_obj");
        console.log(this.dados.lancamentos_futuros_por_dia_obj);
        console.log("========");


        // DESPESAS PREVISTAS
        console.log("Calculando resultados de DESPESAS");
        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');

        // Lançamentos futuros
        for(let i in this.dados.filtered_lancamentos_despesa_bom_para){
            registro = this.dados.filtered_lancamentos_despesa_bom_para[i];

            valor = this.util.converte_valores_formatados_para_numero(registro.valor);
            if(registro.meio_de_pagamento == 'cheque_pre'){
                data = registro.data_cheque_pre;
            }
            else if(registro.meio_de_pagamento == 'credito'){
                data = registro.data_credito;
            }
            else {
                continue;
            }

            if(valor>0){
                // console.log("Valor = " + valor);
                // console.log(registro);

                // Monta o objeto "lancamentos_futuros_por_dia_obj"
                if (!this.dados.lancamentos_futuros_por_dia_obj[data]){
                    this.dados.lancamentos_futuros_por_dia_obj[data] = {};
                    data_quando = this.util.converte_data_para_milisegundos(data);
                    this.dados.lancamentos_futuros_por_dia_obj[data].data = data;
                    this.dados.lancamentos_futuros_por_dia_obj[data].data_quando = data_quando;

                    this.dados.lancamentos_futuros_por_dia_obj[data].despesa = valor;
                    this.dados.valor_total_despesas_futuras += valor;
                }
                else {
                    //soma o valor do novo registro ao centro de custo
                    valor_acumulado = this.dados.lancamentos_futuros_por_dia_obj[data].despesa ? this.dados.lancamentos_futuros_por_dia_obj[data].despesa : 0;
                    valor_acumulado = valor + valor_acumulado;

                    this.dados.lancamentos_futuros_por_dia_obj[data].despesa = valor_acumulado;
                    this.dados.valor_total_despesas_futuras += valor;
                }
            }
        }

        console.log("========");
        console.log("this.dados.valor_total_despesas_futuras");
        console.log(this.dados.valor_total_despesas_futuras);
        console.log("this.dados.lancamentos_futuros_por_dia_obj");
        console.log(this.dados.lancamentos_futuros_por_dia_obj);
        console.log("========");

        // Monta relatório de disponibilidade a partir do objeto com os lançamentos
        for (key of Object.keys(this.dados.lancamentos_futuros_por_dia_obj)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                valor_receita = this.dados.lancamentos_futuros_por_dia_obj[key].receita ? this.dados.lancamentos_futuros_por_dia_obj[key].receita : 0;
                valor_despesa = this.dados.lancamentos_futuros_por_dia_obj[key].despesa ? this.dados.lancamentos_futuros_por_dia_obj[key].despesa : 0;

                this.dados.lancamentos_futuros_por_dia_obj[key].saldo = valor_receita - valor_despesa;

                this.dados.lancamentos_futuros_por_dia.push(this.dados.lancamentos_futuros_por_dia_obj[key]);
            }
        }

        this.dados.saldo_lancamentos_futuros = this.dados.valor_total_receitas_futuras - this.dados.valor_total_despesas_futuras;

        // SORT
        this.dados.lancamentos_futuros_por_dia = this.dados.lancamentos_futuros_por_dia.sort((a, b) => (a.data_quando > b.data_quando) ? 1 : -1) //// sort a list of objects by a property, ascending

        this.dados.selected_disponibilidade = this.dados.lancamentos_futuros_por_dia;
        this.dados.filtered_disponibilidade = this.dados.selected_disponibilidade;
        this.dados.total_de_disponibilidade = this.dados.selected_disponibilidade.length;

        console.log("\n\n==============================");
        console.log("PARAMETRO = " + this.dados.PARAMETRO)
        console.log("selected_disponibilidade");
        console.log("==============================");
        console.log(this.dados.selected_disponibilidade);
        console.log("==============================");
    }

    public calcula_rel_centros_de_custos_totalizados(){
        // REL_CENTROS_DE_CUSTOS_TOTALIZADOS
        console.log("\nCalculando REL_CENTROS_DE_CUSTOS_TOTALIZADOS");

        let registro, key, valor1, valor2;

        let centros_de_custos_usados_receita = {};
        let centros_de_custos_usados_despesa = {};
        this.dados.valor_total_receitas = 0;
        this.dados.valor_total_despesas = 0;
        this.dados.valor_total_centros_de_custos = 0;
        this.dados.centros_de_custos_receitas = [];
        this.dados.centros_de_custos_despesas = [];

        // Le receitas e despesas, ignorando os estornos, e totaliza por centro de custos


        // RECEITAS
        console.log("Calculando totais de RECEITAS");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_RECEITA');")


        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

            if(!registro.estorno) {
                // Monta o objeto "centros_de_custos_usados_receita" para agrupar por centro de custos
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
        console.log("Calculando resultados de DESPESAS");

        // Filtro por data
        this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');
        console.log("this.dados.filtra_lancamentos_por_data('LANCAMENTOS_DESPESA');")


        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

            if(!registro.estorno) {
                // Monta o objeto "centros_de_custos_usados_despesa" para agrupar por centro de custos
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


    onFocus(evento){
        console.log("onFocus($event)")
        this.onFocusVal = this.config.rangeDates;
    }

    onClose(evento){
        console.log("onClose($event)")
        this.refresh_calendar();
    }





    public depositar(registro){
        console.log("depositar()");

        let mensagem = '';
        let cabecalho = '';
        let data = this.util.formata_data(this.dados.data_depositar);
        let tipo = registro.tipo;

        let meio = registro.registro.meio_de_pagamento;
        if (meio=='cheque_pre' || meio=='cheque'){
            meio='cheque';
        }

        if(tipo=='receita' && meio=='cheque'){
            mensagem = 'Confirma o depósito em ' + data + '?';
            cabecalho = 'Depósito';
        }
        else if(tipo=='despesa' && meio=='cheque'){
            mensagem = 'Confirma a entrega do cheque em ' + data + '?';
            cabecalho = 'Entrega de Cheque';
        }
        else if(tipo=='receita' && meio=='credito'){
            mensagem = 'Confirma a autorização do cartão em ' + data + '?';
            cabecalho = 'Autorização de Cartão';
        }
        else if(tipo=='despesa' && meio=='credito'){
            mensagem = 'Confirma o pagamento com cartão em ' + data + '?';
            cabecalho = 'Pagamento em cartão';
        }

        this.confirmationService.confirm({
            message: mensagem,
            header: cabecalho,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {

                this.dados.depositar(registro.registro, data);
                this.calcula_movimentacao();
            },
            reject: () => {
                return false;
            }
        });
    }

    public quitar(registro){
        console.log("quitar()");

        let mensagem = '';
        let cabecalho = '';
        let data = this.util.formata_data(this.dados.data_quitar);
        let tipo = registro.tipo;

        let meio = registro.registro.meio_de_pagamento;
        if (meio=='cheque_pre' || meio=='cheque'){
            meio='cheque';
        }

        if(tipo=='receita' && meio=='cheque'){
            mensagem = 'Confirma a quitação em ' + data + '?';
            cabecalho = 'Quitar';
        }
        else if(tipo=='despesa' && meio=='cheque'){
            mensagem = 'Confirma a quitação em ' + data + '?';
            cabecalho = 'Quitar';
        }
        else if(tipo=='receita' && meio=='credito'){
            mensagem = 'Confirma a quitação em ' + data + '?';
            cabecalho = 'Quitar';
        }
        else if(tipo=='despesa' && meio=='credito'){
            mensagem = 'Confirma a quitação em ' + data + '?';
            cabecalho = 'Quitar';
        }

        this.confirmationService.confirm({
            message: mensagem,
            header: cabecalho,
            // styleClass: "confirmComponent",
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            // icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.dados.quitar(registro.registro, data);
                this.calcula_movimentacao();
                // return true;
            },
            reject: () => {
                return false;
            }
        });
    }

    public hoje(){
        console.log("hoje()");
        return this.dados.HOJE;
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

        for(let i in this.dados.filtered_lancamentos_receita){
            registro = this.dados.filtered_lancamentos_receita[i];

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

        for(let i in this.dados.filtered_lancamentos_despesa){
            registro = this.dados.filtered_lancamentos_despesa[i];

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


    public seleciona_data_disponibilidade(data){

        this.dados.data_selecionada = data;

        let registro, valor, valor_acumulado, data_quando, valor_receita, valor_despesa;

        this.dados.valor_total_receitas_futuras_do_dia = 0;
        this.dados.valor_total_despesas_futuras_do_dia = 0;
        this.dados.saldo_lancamentos_futuros_do_dia = 0;

        this.dados.lancamentos_futuros_do_dia = [];
        this.dados.lancamentos_do_dia_obj = {};

        let key = 0;
        let data_disponibilidade;


        // RECEITAS
        console.log("==================");
        console.log("RECEITAS");
        console.log("==================");

        for(let i in this.dados.filtered_lancamentos_receita_bom_para){
            registro = this.dados.filtered_lancamentos_receita_bom_para[i];

            if(registro.meio_de_pagamento == 'cheque_pre'){
                data_disponibilidade = registro.data_cheque_pre;
            }
            else if(registro.meio_de_pagamento == 'credito'){
                data_disponibilidade = registro.data_credito;
            }
            else {
                continue;
            }
            valor = this.util.converte_valores_formatados_para_numero(registro.valor);

            if(valor>0 && data_disponibilidade == data){
                console.log("Valor = " + valor);
                console.log(registro);

                key = key + 1;

                // Monta o objeto "lancamentos_do_dia_obj"
                this.dados.lancamentos_do_dia_obj[key] = {};
                data_quando = this.util.converte_data_para_milisegundos(data_disponibilidade);
                this.dados.lancamentos_do_dia_obj[key].data = data_disponibilidade;
                this.dados.lancamentos_do_dia_obj[key].data_quando = data_quando;
                this.dados.lancamentos_do_dia_obj[key].contraparte = registro.contraparte;
                this.dados.lancamentos_do_dia_obj[key].produto = registro.nome;
                this.dados.lancamentos_do_dia_obj[key].receita = valor;
                this.dados.lancamentos_do_dia_obj[key].registro = registro;

                this.dados.valor_total_receitas_futuras_do_dia += valor;
            }
        }
        console.log("this.dados.valor_total_receitas_futuras_do_dia");
        console.log(this.dados.valor_total_receitas_futuras_do_dia);


        // DESPESAS
        console.log("==================");
        console.log("DESPESAS");
        console.log("==================");

        for(let i in this.dados.filtered_lancamentos_despesa_bom_para){
            registro = this.dados.filtered_lancamentos_despesa_bom_para[i];

            if(registro.meio_de_pagamento == 'cheque_pre'){
                data_disponibilidade = registro.data_cheque_pre;
            }
            else if(registro.meio_de_pagamento == 'credito'){
                data_disponibilidade = registro.data_credito;
            }
            else {
                continue;
            }
            valor = this.util.converte_valores_formatados_para_numero(registro.valor);
            if(valor>0 && data_disponibilidade == data){
                console.log("Valor = " + valor);
                console.log(registro);

                key = key + 1;

                // Monta o objeto "lancamentos_do_dia_obj"
                this.dados.lancamentos_do_dia_obj[key] = {};
                data_quando = this.util.converte_data_para_milisegundos(data_disponibilidade);
                this.dados.lancamentos_do_dia_obj[key].data = data_disponibilidade;
                this.dados.lancamentos_do_dia_obj[key].data_quando = data_quando;
                this.dados.lancamentos_do_dia_obj[key].contraparte = registro.contraparte;
                this.dados.lancamentos_do_dia_obj[key].produto = registro.nome;
                this.dados.lancamentos_do_dia_obj[key].despesa = valor;
                this.dados.lancamentos_do_dia_obj[key].registro = registro;

                this.dados.valor_total_despesas_futuras_do_dia += valor;
            }
        }
        console.log("this.dados.valor_total_despesas_futuras_do_dia");
        console.log(this.dados.valor_total_despesas_futuras_do_dia);

        for (let key of Object.keys(this.dados.lancamentos_do_dia_obj)) {
            if (key=='undefined'){} // ignorar
            else if (Number(key)==0){} // ignorar
            else {
                console.log(key);
                console.log(this.dados.lancamentos_do_dia_obj[key]);
                valor_receita = this.dados.lancamentos_do_dia_obj[key].receita ? this.dados.lancamentos_do_dia_obj[key].receita : 0;
                valor_despesa = this.dados.lancamentos_do_dia_obj[key].despesa ? this.dados.lancamentos_do_dia_obj[key].despesa : 0;
                this.dados.lancamentos_futuros_do_dia.push(this.dados.lancamentos_do_dia_obj[key]);
            }
        }

        this.dados.saldo_lancamentos_futuros_do_dia = this.dados.valor_total_receitas_futuras_do_dia - this.dados.valor_total_despesas_futuras_do_dia;

        // SORT
        this.dados.lancamentos_futuros_do_dia = this.dados.lancamentos_futuros_do_dia.sort((a, b) => (a.data_quando > b.data_quando) ? 1 : -1) //// sort a list of objects by a property, ascending

        console.log("lancamentos_futuros_do_dia");
        console.log("==============================");
        console.log(this.dados.lancamentos_futuros_do_dia);

        // this.dados.mostrar_lancamentos_do_dia = false;
        this.dados.mostrar_lancamentos_futuros_do_dia = true;
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




    public clientes_todos() {
        if(this.config.DISPLAY.PopupWhatsapp){
            console.log("if(this.config.DISPLAY.PopupWhatsapp){")
            this.voltar();
            return;
        }

        this.dados.is_clientes_todos = !this.dados.is_clientes_todos;
        this.dados.imprimir_especial = false;

        if(this.dados.is_clientes_todos){
            this.dados.is_clientes_todos = true;
            this.dados.is_clientes_aniversarios = false;
            this.dados.is_clientes_mensagens = false;
        }
        else {
            this.dados.is_clientes_todos = false;
            this.dados.is_clientes_aniversarios = true;
            this.dados.is_clientes_mensagens = false;
            this.dados.imprimir_especial = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','CLIENTES');
    }

    public clientes_aniversarios() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_clientes_aniversarios = !this.dados.is_clientes_aniversarios;
        this.dados.imprimir_especial = false;

        if(this.dados.is_clientes_aniversarios){
            this.dados.is_clientes_todos = false;
            this.dados.is_clientes_aniversarios = true;
            this.dados.is_clientes_mensagens = false;
            this.dados.imprimir_especial = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','CLIENTES');
    }

    public clientes_mensagens() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_clientes_mensagens = !this.dados.is_clientes_mensagens;
        this.dados.imprimir_especial = false;

        if(this.dados.is_clientes_mensagens){
            this.dados.is_clientes_todos = false;
            this.dados.is_clientes_aniversarios = false;
            this.dados.is_clientes_mensagens = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','CLIENTES');
    }


    public socios_todos() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_socios_todos = !this.dados.is_socios_todos;
        this.dados.imprimir_especial = false;

        if(this.dados.is_socios_todos){
            this.dados.is_socios_todos = true;
            this.dados.is_socios_aniversarios = false;
            this.dados.is_socios_mensagens = false;
        }
        else {
            this.dados.is_socios_todos = false;
            this.dados.is_socios_aniversarios = true;
            this.dados.is_socios_mensagens = false;
            this.dados.imprimir_especial = true;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','SOCIOS');
    }

    public socios_aniversarios() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_socios_aniversarios = !this.dados.is_socios_aniversarios;
        this.dados.imprimir_especial = false;

        if(this.dados.is_socios_aniversarios){
            this.dados.is_socios_todos = false;
            this.dados.is_socios_aniversarios = true;
            this.dados.is_socios_mensagens = false;
            this.dados.imprimir_especial = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','SOCIOS');
    }

    public socios_mensagens() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_socios_mensagens = !this.dados.is_socios_mensagens;
        this.dados.imprimir_especial = false;

        if(this.dados.is_socios_mensagens){
            this.dados.is_socios_todos = false;
            this.dados.is_socios_aniversarios = false;
            this.dados.is_socios_mensagens = true;
        }
		this.dados.filtro = '';
        this.dados.filterDatabase(' ','SOCIOS');
    }



    public equipe_todos() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_equipe_todos = !this.dados.is_equipe_todos;
        this.dados.imprimir_especial = false;

        if(this.dados.is_equipe_todos){
            this.dados.is_equipe_todos = true;
            this.dados.is_equipe_aniversarios = false;
            this.dados.is_equipe_mensagens = false;
        }
        else {
            this.dados.is_equipe_todos = false;
            this.dados.is_equipe_aniversarios = true;
            this.dados.is_equipe_mensagens = false;
            this.dados.imprimir_especial = true;
        }
        this.dados.filtro = '';
        this.dados.filterDatabase(' ','EQUIPE');
    }

    public equipe_aniversarios() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_equipe_aniversarios = !this.dados.is_equipe_aniversarios;
        this.dados.imprimir_especial = false;

        if(this.dados.is_equipe_aniversarios){
            this.dados.is_equipe_todos = false;
            this.dados.is_equipe_aniversarios = true;
            this.dados.is_equipe_mensagens = false;
            this.dados.imprimir_especial = true;
        }

        console.log(this.dados.imprimir_especial);

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','EQUIPE');
    }

    public equipe_mensagens() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_equipe_mensagens = !this.dados.is_equipe_mensagens;
        this.dados.imprimir_especial = false;

        if(this.dados.is_equipe_mensagens){
            this.dados.is_equipe_todos = false;
            this.dados.is_equipe_aniversarios = false;
            this.dados.is_equipe_mensagens = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','EQUIPE');
    }


    public fornecedores_todos() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_fornecedores_todos = !this.dados.is_fornecedores_todos;
        this.dados.imprimir_especial = false;

        if(this.dados.is_fornecedores_todos){
            this.dados.is_fornecedores_todos = true;
            this.dados.is_fornecedores_aniversarios = false;
            this.dados.is_fornecedores_mensagens = false;
        }
        else {
            this.dados.is_fornecedores_todos = false;
            this.dados.is_fornecedores_aniversarios = true;
            this.dados.is_fornecedores_mensagens = false;
            this.dados.imprimir_especial = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','FORNECEDORES');
    }

    public fornecedores_aniversarios() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
            return;
        }

        this.dados.is_fornecedores_aniversarios = !this.dados.is_fornecedores_aniversarios;
        this.dados.imprimir_especial = false;

        if(this.dados.is_fornecedores_aniversarios){
            this.dados.is_fornecedores_todos = false;
            this.dados.is_fornecedores_aniversarios = true;
            this.dados.is_fornecedores_mensagens = false;
            this.dados.imprimir_especial = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','FORNECEDORES');
    }

    public fornecedores_mensagens() {
        if(this.config.DISPLAY.PopupWhatsapp){
            this.voltar();
        }

        this.dados.is_fornecedores_mensagens = !this.dados.is_fornecedores_mensagens;
        this.dados.imprimir_especial = false;

        if(this.dados.is_fornecedores_mensagens){
            this.dados.is_fornecedores_todos = false;
            this.dados.is_fornecedores_aniversarios = false;
            this.dados.is_fornecedores_mensagens = true;
        }

		this.dados.filtro = '';
        this.dados.filterDatabase(' ','FORNECEDORES');
    }



    public em_caixa() {
        this.dados.is_em_caixa = !this.dados.is_em_caixa;

        if(this.dados.is_em_caixa){
            this.dados.is_em_caixa = true;
            this.dados.is_aguardando = false;
            this.dados.is_quitado = false;
        }
        this.calcula_movimentacao();
    }

    public aguardando_em_banco() {
        this.dados.is_aguardando = !this.dados.is_aguardando;

        if(this.dados.is_aguardando){
            this.dados.is_em_caixa = false;
            this.dados.is_aguardando = true;
            this.dados.is_quitado = false;
        }
        this.calcula_movimentacao();
    }

    public quitado() {
        this.dados.is_quitado = !this.dados.is_quitado;

        if(this.dados.is_quitado){
            this.dados.is_em_caixa = false;
            this.dados.is_aguardando = false;
            this.dados.is_quitado = true;
        }
        this.calcula_movimentacao();
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

        for(let i in this.dados.filtered_lancamentos_receita) {
            registro = this.dados.filtered_lancamentos_receita[i];
            // console.log("registro = this.dados.filtered_lancamentos_receita[i];");
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

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_DINHEIRO';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_DINHEIRO.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_DINHEIRO.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_dinheiro = false;
        this.dados.listar_dinheiro_dia = true;
    }

    public listar_lancamento(data : string, despesa_ou_receita : string = ''){
        console.log("listar_cheque (" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_lancamento_dia = [];
        this.dados.despesas_lancamento_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_receita) {
                registro = this.dados.lancamentos_receita[i];
                if(registro.data == data && !registro.estorno){
                    console.log(registro);
                    this.dados.receitas_lancamento_dia.push(registro);
                }
            }
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_despesa) {
                registro = this.dados.lancamentos_despesa[i];
                if(registro.data == data && !registro.estorno){
                    // console.log(registro);
                    this.dados.despesas_lancamento_dia.push(registro);
                }
            }
        }

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'MOVIMENTACAO';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.MOVIMENTACAO.titulo_lista;
        voltar.sub_titulo_pagina = this.config.MOVIMENTACAO.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        // this.dados.listar_movimentacao = false;
        this.dados.listar_movimentacao_dia = true;
    }

    public listar_cheque(data : string, despesa_ou_receita : string = ''){
        console.log("listar_cheque (" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
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
            // console.log(this.dados.receitas_cheque_dia);
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

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_CHEQUES_A_VISTA';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_CHEQUES_A_VISTA.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_CHEQUES_A_VISTA.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_cheque = false;
        this.dados.listar_cheque_dia = true;
    }


    public listar_cheque_pre(data : string){
        console.log("listar_cheque_pre(" + data + ")");

        let registro;
        this.dados.lancamentos_cheque_pre_dia = [];
        this.dados.saldo_despesa_cheque_pre = 0;
        this.dados.saldo_receita_cheque_pre = 0;
        this.dados.saldo_total_cheque_pre = 0;

        this.dados.listar_data = data;

        for(let i in this.dados.lancamentos_cheque_pre_receita) {
            registro = this.dados.lancamentos_cheque_pre_receita[i];
            registro.despesa_ou_receita = 'receita'
            if(registro.data == data && !registro.estorno){
                this.dados.lancamentos_cheque_pre_dia.push(registro);
                this.dados.saldo_receita_cheque_pre += this.util.converte_valores_formatados_para_numero(registro.valor);
            }
        }
        for(let i in this.dados.lancamentos_cheque_pre_despesa) {
            registro = this.dados.lancamentos_cheque_pre_despesa[i];
            registro.despesa_ou_receita = 'despesa'
            if(registro.data == data && !registro.estorno){
                this.dados.lancamentos_cheque_pre_dia.push(registro);
                this.dados.saldo_despesa_cheque_pre += this.util.converte_valores_formatados_para_numero(registro.valor);
            }
        }

        this.dados.saldo_total_cheque_pre = this.dados.saldo_receita_cheque_pre - this.dados.saldo_despesa_cheque_pre;

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_CHEQUES_PRE';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_CHEQUES_PRE.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_CHEQUES_PRE.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_cheque_pre = false;
        this.dados.listar_cheque_pre_dia = true;
    }


    public listar_cheque_pre_bom_para(data : string){
        console.log("listar_cheque_pre_bom_para (" + data + ")");

        let registro;
        this.dados.lancamentos_cheque_pre_dia_bom_para = [];
        this.dados.saldo_despesa_cheque_pre_bom_para = 0;
        this.dados.saldo_receita_cheque_pre_bom_para = 0;
        this.dados.saldo_total_cheque_pre_bom_para = 0;

        this.dados.listar_data = data;

        for(let i in this.dados.lancamentos_cheque_pre_receita_bom_para) {
            registro = this.dados.lancamentos_cheque_pre_receita_bom_para[i];
            registro.despesa_ou_receita = 'receita'
            if(registro.data_cheque_pre == data && !registro.estorno){
                this.dados.lancamentos_cheque_pre_dia_bom_para.push(registro);
                this.dados.saldo_receita_cheque_pre_bom_para += this.util.converte_valores_formatados_para_numero(registro.valor);
            }
        }
        for(let i in this.dados.lancamentos_cheque_pre_despesa_bom_para) {
            registro = this.dados.lancamentos_cheque_pre_despesa_bom_para[i];
            registro.despesa_ou_receita = 'despesa'
            if(registro.data_cheque_pre == data && !registro.estorno){
                this.dados.lancamentos_cheque_pre_dia_bom_para.push(registro);
                this.dados.saldo_despesa_cheque_pre_bom_para += this.util.converte_valores_formatados_para_numero(registro.valor);
            }
        }

        this.dados.saldo_total_cheque_pre_bom_para = this.dados.saldo_receita_cheque_pre_bom_para - this.dados.saldo_despesa_cheque_pre_bom_para;

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_CHEQUES_PRE';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_CHEQUES_PRE.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_CHEQUES_PRE.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_cheque_pre = false;
        this.dados.listar_cheque_pre_dia_bom_para = true;
    }


    public listar_debito(data : string, despesa_ou_receita : string = ''){
        console.log("listar_debito(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_debito_dia = [];
        this.dados.despesas_debito_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_debito_receita) {
                registro = this.dados.lancamentos_debito_receita[i];
                if(registro.data == data && !registro.estorno){
                    this.dados.receitas_debito_dia.push(registro);
                }
            }
            // console.log(this.dados.receitas_debito_dia);
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_debito_despesa) {
                registro = this.dados.lancamentos_debito_despesa[i];
                if(registro.data == data && !registro.estorno){
                    this.dados.despesas_debito_dia.push(registro);
                }
            }
        }

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_DEBITO';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_DEBITO.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_DEBITO.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_debito = false;
        this.dados.listar_debito_dia = true;
    }


    public listar_credito(data : string, despesa_ou_receita : string = ''){
        console.log("listar_credito(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_credito_dia = [];
        this.dados.despesas_credito_dia = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_credito_receita) {
                registro = this.dados.lancamentos_credito_receita[i];
                if(registro.data_credito == data && !registro.estorno){
                    console.log(registro);
                    this.dados.receitas_credito_dia.push(registro);
                }
            }
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_credito_despesa) {
                registro = this.dados.lancamentos_credito_despesa[i];
                if(registro.data_credito == data && !registro.estorno){
                    console.log("this.dados.lancamentos_credito_despesa[i]");
                    console.log(this.dados.lancamentos_credito_despesa[i]);
                    this.dados.despesas_credito_dia.push(registro);
                }
            }
        }

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_CREDITO';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_CREDITO.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_CREDITO.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_credito = false;
        this.dados.listar_credito_dia = true;
    }


    public listar_credito_bom_para(data : string, despesa_ou_receita : string = ''){
        console.log("listar_credito_bom_para(" + data + "," + despesa_ou_receita + ")");

        let registro;
        this.dados.despesa_ou_receita = despesa_ou_receita;
        this.dados.receitas_credito_dia_bom_para = [];
        this.dados.despesas_credito_dia_bom_para = [];

        this.dados.listar_data = data;

        if(this.dados.despesa_ou_receita == 'receita'){
            for(let i in this.dados.lancamentos_credito_receita_bom_para) {
                registro = this.dados.lancamentos_credito_receita_bom_para[i];
                if(registro.data_credito == data && !registro.estorno){
                    this.dados.receitas_credito_dia_bom_para.push(registro);
                }
            }
        }
        else if(this.dados.despesa_ou_receita == 'despesa'){
            for(let i in this.dados.lancamentos_credito_despesa_bom_para) {
                registro = this.dados.lancamentos_credito_despesa_bom_para[i];
                if(registro.data_credito == data && !registro.estorno){
                    this.dados.despesas_credito_dia_bom_para.push(registro);
                }
            }
        }

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = '';
        voltar.filterDatabase_parametro = '';
        voltar.filterDatabase_property = '';
        voltar.parametro = 'REL_CREDITO';
        voltar.filtered = false;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.config.REL_CREDITO.titulo_lista;
        voltar.sub_titulo_pagina = this.config.REL_CREDITO.titulo_unidade;

        this.dados.voltar_pilha.push(voltar);

        // omite a listagem total e exibe a listagem do dia
        this.dados.listar_rel_credito = false;
        this.dados.listar_credito_dia = true;
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

        if(this.dados.PARAMETRO=='PAGAMENTOS'){
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
        if(this.dados.origem == 'RELATORIOS'){
            this.dados.pode_incluir = false;
        }
    }

    public preview_imprimir(){
        console.log("preview_imprimir()");

        this.dados.imprimir_etiquetas = ! this.dados.imprimir_etiquetas;
    }

    public imprimir(){
        console.log("imprimir()");

        window.print();
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


    public paginateEvent(event) {
        console.log("paginateEvent(event)")

        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        this.quantas_paginas = event.pageCount; // Total number of pages
        console.log("quantas_paginas = "+this.quantas_paginas);
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

    public ver_lancamentos_do_centro_de_custos(registro){
        console.log("ver_lancamentos_do_centro_de_custos => registro");
        console.log(registro);

        this.dados.voltar_para = 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS';
        this.dados.voltar_para_lista = true;
        this.dados.origem = 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS';

        this.dados.omitir_refresh = true;
        this.dados.omitir_calendario = true;

        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = this.dados.filterDatabase_rule;
        voltar.filterDatabase_parametro = this.dados.filterDatabase_parametro;
        voltar.filterDatabase_property = this.dados.filterDatabase_property;
        voltar.parametro = this.dados.PARAMETRO;
        voltar.filtered = true;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.dados.titulo_pagina;
        voltar.sub_titulo_pagina = this.dados.sub_titulo_pagina;

        this.dados.voltar_pilha.push(voltar);

        console.log("this.dados.voltar_pilha");
        console.log(this.dados.voltar_pilha);

        if(registro.centro_de_custos_codigo.substr(0,1) == 'R'){
            // Receita
            this.dados.filterDatabase(registro.centro_de_custos_codigo,'LANCAMENTOS_RECEITA');
            this.dados.PARAMETRO='LANCAMENTOS_RECEITA';
            this.dados.titulo_pagina = this.config[this.dados.PARAMETRO].titulo_lista;
            this.dados.sub_titulo_pagina = registro.centro_de_custos;
        }
        else if(registro.centro_de_custos_codigo.substr(0,1) == 'D') {
            this.dados.filterDatabase(registro.centro_de_custos_codigo,'LANCAMENTOS_DESPESA');
            this.dados.PARAMETRO='LANCAMENTOS_DESPESA';
            this.dados.titulo_pagina = this.config[this.dados.PARAMETRO].titulo_lista;
            this.dados.sub_titulo_pagina = registro.centro_de_custos;
        }
        this.dados.listar_rel_centros_de_custos_totalizados = false;
    }


    public ver_lancamento(registro, parametro){
        this.dados.selected_origem = this.dados.selected;
        this.dados.selected = registro;
        console.log("ver_lancamento => registro, parametro");
        console.log("parametro = " + parametro);
        console.log(registro);

        // this.dados.ver_lancamento = true;
        this.dados.voltar_para = parametro;
        this.dados.voltar_para_lista = true;
        this.dados.origem = parametro;

        this.config.DISPLAY.Lista = false;
        this.config.DISPLAY.Registro = true;
    }

    go(destino : string = '') {
        // Redirecionamento


        // CRIAR PONTO DE RETORNO em dados.voltar_pilha
        let voltar : any = {};
        voltar.registro_selected = '';
        voltar.filterDatabase_rule = this.dados.filterDatabase_rule;
        voltar.filterDatabase_parametro = this.dados.filterDatabase_parametro;
        voltar.filterDatabase_property = this.dados.filterDatabase_property;
        voltar.parametro = this.dados.PARAMETRO;
        voltar.filtered = true;
        voltar.displayLista = 'true';
        voltar.displayRegistro = 'false';
        voltar.titulo_pagina = this.dados.titulo_pagina;
        voltar.sub_titulo_pagina = this.dados.sub_titulo_pagina;

        this.dados.voltar_pilha.push(voltar);



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

        if(destino=="DISPONIBILIDADE"){
            this.config.DISPLAY.Lista = true;
            this.dados.listar_disponibilidade = true;
            return;
        }


        if(destino=="MOVIMENTACAO"){
            this.config.DISPLAY.Lista = true;
            this.dados.listar_movimentacao = true;
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

    public voltar() {
        console.log("voltar()");

        if( ['REL_RECEITAS_E_DESPESAS','REL_CENTROS_DE_CUSTOS','REL_CENTROS_DE_CUSTOS_TOTALIZADOS','REL_EXTRATO_DE_CONTAS','CENTROS_DE_CUSTOS_LISTA'].includes(this.dados.PARAMETRO) ){
            this.mostrar_opcao_1 = true;
            this.mostrar_opcao_2 = false;
            this.mostrar_lista('1');
        }

        this.dados.registro_envio_whatsapp = {};

        if(this.config.DISPLAY.PopupWhatsapp){
            this.enviar_whatsapp = true;
            this.confirmou_envio_mensagem = false;
            this.nao_confirmou_envio_mensagem = false;
            this.confirmar_envio_mensagem = false;

            this.config.DISPLAY.PopupWhatsapp = false;
            this.dados.imprimir_etiquetas = false;
            return;
        }

        this.dados.imprimir_especial = false;

        this.dados.pode_incluir_lancamento = false;
        this.dados.pode_incluir = false;

        if(this.dados.mostrar_lancamentos_futuros_do_dia){
            this.dados.mostrar_lancamentos_futuros_do_dia = false;
            return;
        }
        if(this.dados.mostrar_lancamentos_do_dia){
            this.dados.mostrar_lancamentos_do_dia = false;
            return;
        }

        this.dados.listar_centros_de_custos_lista = false;
        this.dados.omitir_refresh = false;
        this.dados.omitir_calendario = false;

        this.dados.listar_rel_dinheiro = false;
        this.dados.listar_rel_cheque = false;
        this.dados.listar_rel_cheque_pre = false;
        this.dados.listar_rel_debito = false;
        this.dados.listar_rel_credito = false;

        this.dados.listar_movimentacao = false;

        if(this.dados.listar_dinheiro_dia || this.dados.listar_cheque_dia  || this.dados.listar_cheque_pre_dia || this.dados.listar_cheque_pre_dia_bom_para  || this.dados.listar_debito_dia  || this.dados.listar_credito_dia ){
            this.dados.listar_rel_dinheiro = this.dados.listar_dinheiro_dia ? true : false;
            this.dados.listar_rel_cheque = this.dados.listar_cheque_dia ? true : false;
            this.dados.listar_rel_cheque_pre = (this.dados.listar_cheque_pre_dia || this.dados.listar_cheque_pre_dia_bom_para) ? true : false;
            this.dados.listar_rel_debito = this.dados.listar_debito_dia ? true : false;
            this.dados.listar_rel_credito = (this.dados.listar_credito_dia || this.dados.listar_credito_dia_bom_para) ? true : false;

            this.dados.listar_dinheiro_dia = false;
            this.dados.listar_cheque_dia = false;
            this.dados.listar_cheque_pre_dia = false;
            this.dados.listar_cheque_pre_dia_bom_para = false;
            this.dados.listar_debito_dia = false;
            this.dados.listar_credito_dia = false;
            this.dados.listar_credito_dia_bom_para = false;

            this.dados.mostrar_lancamentos_do_dia = false;
        }


        if(this.dados.voltar_pilha && this.dados.voltar_pilha.length > 0) {

            // console.log("this.dados.voltar_pilha");
            // console.log(this.dados.voltar_pilha);

            let voltar = this.dados.voltar_pilha.pop();
            // console.log("voltar = this.dados.voltar_pilha.pop();");
            // console.log(voltar);

            if( voltar.parametro ) {
                this.dados.PARAMETRO = voltar.parametro;
                // if (['FINANCEIRO'].includes(this.dados.PARAMETRO)){
                //     this.dados.filterBooleanFinanceiro('embreve',false);
                // }
                // if (['RELATORIOS'].includes(this.dados.PARAMETRO)){
                //     this.dados.filterBooleanRelatorios('embreve',false);
                // }
            }

            if( voltar.filterDatabase_rule ) {
                this.dados.filterDatabase_rule = voltar.filterDatabase_rule;
            }
            if( voltar.filterDatabase_parametro ) {
                this.dados.filterDatabase_parametro = voltar.filterDatabase_parametro;
            }
            if( voltar.filterDatabase_property ) {
                this.dados.filterDatabase_property = voltar.filterDatabase_property;
            }

            if( voltar.filtered ) {
                this.dados.filterDatabase(this.dados.filterDatabase_rule,this.dados.filterDatabase_parametro,this.dados.filterDatabase_property);
            }

            if( voltar.titulo_pagina ) {
                this.dados.titulo_pagina = voltar.titulo_pagina;
                this.dados.sub_titulo_pagina = voltar.sub_titulo_pagina;
            }

            if(voltar.displayLista){
                this.config.DISPLAY.Lista = voltar.displayLista;
                this.config.DISPLAY.Registro = false;
            }
            else if (voltar.displayRegistro){
                this.config.DISPLAY.Registro = voltar.displayRegistro;
                this.config.DISPLAY.Lista = false;
            }
            else {
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = false;
                this.config.DISPLAY.Home = true;
            }
            return;
        }

        if(this.dados.voltar_para){
            this.dados.PARAMETRO = this.dados.voltar_para;
            this.dados.titulo_pagina = this.config[this.dados.PARAMETRO].titulo_lista;
            this.dados.voltar_para = '';
            this.dados.origem = '';

            if (this.dados.voltar_para_lista){
                this.dados.voltar_para_lista = false;
                this.config.DISPLAY.Registro = false;
                this.config.DISPLAY.Lista = true;
            }
            else if (this.dados.voltar_para_registro) {
                this.dados.voltar_para_registro = false;
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = true;
            }

            if(this.dados.PARAMETRO == 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
                this.dados.listar_rel_centros_de_custos_totalizados = true;
            }
        }

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
            else if(this.dados.origem == 'SOCIOS') {
                console.log("voltar() ----- this.dados.origem == SOCIOS")

                this.dados.remover_filtros();

                this.dados.PARAMETRO = 'SOCIOS';
                this.dados.selected = this.dados.socio;

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
                if (this.config[this.dados.PARAMETRO].retorno == 'SOCIOS'){

                    if(this.dados.PARAMETRO == "ANIVERSARIOS" || this.dados.PARAMETRO == "REVISOES" || this.dados.PARAMETRO == "PROMOCOES"){
                        this.dados.go('SOCIOS');
                    }
                    else {
                        this.dados.PARAMETRO = "SOCIOS";
                        this.verRegistro(this.dados.socio);
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


    public verRegistro(registro : any, lista : string = '') : void {
        console.log("PARAMETRO = " + this.dados.PARAMETRO);
        console.log("verRegistro(registro)");
        console.log(registro);

        if(registro.estorno) {
            // return;
        }

        // Vai esconder a lista e mostrar o registro então dispensa os dados de retorno
        if(this.dados.origem != 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
            // CRIAR PONTO DE RETORNO em dados.voltar_pilha
            let voltar : any = {};
            voltar.registro_selected = '';
            // voltar.filterDatabase_rule = this.dados.filterDatabase_rule;
            // voltar.filterDatabase_parametro = this.dados.filterDatabase_parametro;
            // voltar.filterDatabase_property = this.dados.filterDatabase_property;
            voltar.parametro = this.dados.PARAMETRO;
            voltar.filtered = true;
            voltar.displayLista = 'true';
            voltar.displayRegistro = 'false';
            voltar.titulo_pagina = this.dados.titulo_pagina;
            voltar.sub_titulo_pagina = this.dados.sub_titulo_pagina;

            this.dados.voltar_pilha.push(voltar);

            console.log("this.dados.voltar_pilha");
            console.log(this.dados.voltar_pilha);
        }

        if (this.dados.PARAMETRO=='CAIXA' && this.dados.listar_dinheiro_dia){
            console.log("this.dados.PARAMETRO=='CAIXA' && this.dados.listar_dinheiro_dia");

            // snapshot do registro clicado
            this.dados.selected = registro;

            // Esconde a lista. Mostra o registro.
            this.dados.esconder_lista = true;
            this.config.DISPLAY.Registro = true;
            return;
        }


        // if (this.dados.PARAMETRO == "ULTIMOS_CLIENTES_VISUALIZADOS") {
        //     this.dados.PARAMETRO = 'CLIENTES';
        // }
        //
        // if (this.dados.PARAMETRO == "ANIVERSARIOS") {
        //     this.dados.PARAMETRO = 'CLIENTES';
        // }
        //
        // this.dados.checa_se_vai_poder_editar_a_ficha();


        if (['CLIENTES','SOCIOS','EQUIPE'].includes(this.dados.PARAMETRO)) {
            this.dados.registro = null;
            this.dados.selected = registro;

            if(this.dados.PARAMETRO=='CLIENTES'){
                this.dados.cliente = registro;
            }
            else if(this.dados.PARAMETRO=='SOCIOS'){
                this.dados.socio = registro;
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
                console.log("this.config.OBSERVADO_EM_REGISTROS[this.dados.PARAMETRO]");
                console.log("registro");
                console.log(registro);
                this.dados.cliente = null;
                this.dados.socio = null;
            }

            // snapshot do registro clicado
            console.log(this.dados.selected);
            this.dados.selected = registro;

            // A listagem de receitas ou despesas de um centro de custos, originada de REL_CENTROS_DE_CUSTOS_TOTALIZADOS, só esconde a lista e mostra o registro
            if(this.dados.origem == 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
                this.dados.esconder_lista = true;
                this.config.DISPLAY.Registro = true;
            }
            else {
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = true;
            }
        }
    }


    public movimentacao_detalhe(event, registro, overlaypanel) : void {
        console.log("PARAMETRO = " + this.dados.PARAMETRO);
        console.log("movimentacao_detalhe(registro)");
        console.log("registro");
        console.log(registro);

        if(registro.estorno) {
            return;
        }

        this.overlayDetail = registro;
        console.log("overlayDetail");
        console.log(this.overlayDetail);

        overlaypanel.toggle(event);
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

        if(this.dados.PARAMETRO == 'SOCIOS' && this.dados.usuario_logado.id_para_socios){
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


        if (this.dados.PARAMETRO == 'ATENDIMENTOS') {
            this.config.DISPLAY.EditAtendimentos = true;
        }
        else if (this.dados.PARAMETRO == 'CONFIGURACAO') {
            this.config.DISPLAY.Config = true;
        }
        else if (this.dados.PARAMETRO == 'PERFIL') {
            this.config.DISPLAY.EditPerfil = true;
        }
        else if (this.dados.PARAMETRO == 'ESTOQUE') {
            this.config.DISPLAY.EditEstoque = true;
        }
        else if (this.dados.PARAMETRO == 'LANCAMENTOS_DESPESA') {
            this.config.DISPLAY.EditLancamentos = true;
        }
        else if (this.dados.PARAMETRO == 'LANCAMENTOS_RECEITA') {
            this.config.DISPLAY.EditLancamentos = true;
        }
        else if (this.dados.PARAMETRO == 'BANCOS') {
            this.config.DISPLAY.EditLancamentos = true;
        }
        else {
            this.config.DISPLAY.Editar = true;
        }
    }

    public mostrar_lista(opcao : string){
        console.log("mostrar_lista");

        this.dados.mostrar_lista_opcao = opcao;

        if(opcao=='1'){
            this.menu_financeiro_opcao1_classe = 'menu_financeiro float_none';
            this.menu_financeiro_opcao2_classe = 'menu_financeiro_inativo float_none';

            if(this.dados.PARAMETRO=='CENTROS_DE_CUSTOS_LISTA'){
                this.dados.database = 'selected_receitas';
                this.dados.database_caption = 'RECEITAS';
            }
            if(this.dados.PARAMETRO=='REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
                this.dados.database = "centros_de_custos_receitas";
                this.dados.valor_total_centros_de_custos = this.dados.valor_total_receitas;
                this.dados.database_caption = 'RECEITAS';
            }
        }
        else if(opcao=='2'){
            this.menu_financeiro_opcao1_classe = 'menu_financeiro_inativo float_none';
            this.menu_financeiro_opcao2_classe = 'menu_financeiro float_none';

            if(this.dados.PARAMETRO=='CENTROS_DE_CUSTOS_LISTA'){
                // this.dados.database = this.dados.filtered_despesas ? 'filtered_despesas' : 'selected_despesas';
                this.dados.database = 'selected_despesas';
                this.dados.database_caption = 'DESPESAS';
            }
            if(this.dados.PARAMETRO=='REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
                this.dados.database = "centros_de_custos_despesas";
                this.dados.valor_total_centros_de_custos = this.dados.valor_total_despesas;
                this.dados.database_caption = 'DESPESAS';
            }
        }
        console.log(this.dados.database_caption);
        console.log(this.dados[this.dados.database]);
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

    public PopupWhatsapp(registro : any, assunto_da_mensagem : string = '') : void {
        console.log("PopupWhatsapp()");

        this.dados.registro_envio_whatsapp = registro;

        let mensagem = '';
        let cabecalho = '';

        this.dados.cliente = registro;
        this.dados.selected = registro;
        this.dados.destinatario = registro;
        this.assunto_da_mensagem = assunto_da_mensagem;
        this.tempo_de_ausencia = this.util.get_idade_meses_dias(this.dados.selected.ultima_consulta);

        cabecalho = this.assunto_da_mensagem;
        mensagem = '';

        console.log('mensagem_whatsapp')
        console.log('PARAMETRO = ' + this.dados.PARAMETRO)
        this.dados.whatsapp_destino = this.dados.PARAMETRO;
        console.log('whatsapp_destino = ' + this.dados.whatsapp_destino)

        if(this.assunto_da_mensagem=="ANIVERSÁRIO"){
            this.mensagem = "Olá " + this.dados.selected.nome + "\n\n";
            this.mensagem = "FELIZ ANIVERSÁRIO!!!\n\n";
            this.mensagem += "Aproveitamos esta ocasião para te desejar muitas felicidades e muitos anos de vida repletos de realizações!\n\n";
            this.mensagem += "E, claro, também muitos sorrisos!\nConte com a gente pra isso!\n\n";
            this.mensagem += this.dados.usuario_logado.nome;
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
        this.url_web = "https://web.whatsapp.com/send?phone=" + this.util.formata_whatsapp_para_envio(this.dados.selected.whatsapp);

        this.url += "&text=" + this.mensagem_encoded;
        this.url_web  += "&text=" + this.mensagem_encoded;
        this.config.DISPLAY.PopupWhatsapp = true;
    }

    public enviar_msg_whatsapp(){
        console.log("enviar_msg_whatsapp");

        this.enviar_whatsapp = false;
        this.confirmar_envio_mensagem = true;
    }


    public confirmar_envio_msg(confirmado : boolean = false){
        console.log("confirmar_envio_msg = " + confirmado );

        this.confirmar_envio_mensagem = false;

        if (confirmado){
            this.dados.salva_envio_whatsapp(this.dados.PARAMETRO, this.dados.destinatario.key);

            // registra no historico
            console.log('maladireta_destino = ' + this.dados.maladireta_destino)

            this.dados.historicos.database = this.dados.PARAMETRO;
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

            this.confirmou_envio_mensagem = true;
        }
        else {
            this.nao_confirmou_envio_mensagem = true;
        }
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
        console.log("goSublista(" + sublista + ")");

        console.log("origem anterior = " + this.dados.origem);

        this.dados.origem = this.dados.PARAMETRO;
        this.dados.PARAMETRO = sublista;

        console.log("nova origem = " + this.dados.origem);
        console.log("sublista = " + sublista);

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












}
