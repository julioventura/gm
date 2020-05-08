import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Firebase
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseApp } from '@angular/fire';
import 'firebase/database';

// Autenticação com Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class DadosService {

    constructor(
        public auth: AngularFireAuth,
        public config: ConfigService,
        public util: UtilService,
        public db: AngularFireDatabase
    ) { }

    public PRIMEIRO_ACESSO : boolean = true;
    public JA_MOSTROU_HISTORICO : boolean = false;

    public origem : string = '';
    public centros_de_custos_ok : boolean = false;

    public usuarios$: Observable<any[]>;
    public ref_usuarios: any;
    public registros$: Observable<any[]>;
    public ref_registros: any;

    public financeiro$: Observable<any[]>;
    public ref_financeiro: any;
    public movimentacao$: Observable<any[]>;
    public ref_movimentacao: any;
    public relatorios$: Observable<any[]>;
    public ref_relatorios: any;

    public centros_de_custos$: Observable<any[]>;
    public ref_centros_de_custos: any;
    public rel_centros_de_custos$: Observable<any[]>;
    public ref_rel_centros_de_custos: any;

    public rel_extrato_de_contas$: Observable<any[]>;
    public ref_rel_extrato_de_contas: any;
    public rel_cheque_pre$: Observable<any[]>;
    public ref_rel_cheque_pre: any;
    public rel_disponibilidade$: Observable<any[]>;
    public ref_rel_disponibilidade: any;

    public indicador$: Observable<any[]>;
    public ref_indicador: any;
    public empresas$: Observable<any[]>;
    public ref_empresas: any;
    public maladireta$: Observable<any[]>;
    public ref_maladireta: any;
    public fornecedores$: Observable<any[]>;
    public ref_fornecedores: any;

    public clientes_ultimos_visualizados$: Observable<any[]>;
    public ref_clientes_ultimos_visualizados: any;
    public clientes_ultimos_incluidos$: Observable<any[]>;
    public ref_clientes_ultimos_incluidos: any;
    public fornecedores_ultimos_incluidos$: Observable<any[]>;
	public ref_fornecedores_ultimos_incluidos: any;
    public estoque_ultimos_incluidos$: Observable<any[]>;
    public ref_estoque_ultimos_incluidos: any;

    public equipe$: Observable<any[]>;
    public ref_equipe: any;
    public impressos$: Observable<any[]>;
    public ref_impressos: any;
    public produtos$: Observable<any[]>;
    public ref_produtos: any;
    public lista_de_marcados$: Observable<any[]>; // lista de compras
    public ref_lista_de_marcados: any; // lista de compras

    public clientes$: Observable<any[]>;
    public ref_clientes: any;
    public atendimentos$: Observable<any[]>;
    public ref_atendimentos: any;

    public receitas$: Observable<any[]>;
    public ref_receitas: any;
    public receitas_admin$: Observable<any[]>;
    public ref_receitas_admin: any;
    public despesas$: Observable<any[]>;
    public ref_despesas: any;
    public despesas_admin$: Observable<any[]>;
    public ref_despesas_admin: any;
    public lancamentos_receita$: Observable<any[]>;
    public ref_lancamentos_receita: any;
    public lancamentos_despesa$: Observable<any[]>;
    public ref_lancamentos_despesa: any;
    public estornos$: Observable<any[]>;
    public ref_estornos: any;
    public transferencias$: Observable<any[]>;
    public ref_transferencias: any;
    public conciliacao$: Observable<any[]>;
    public ref_conciliacao: any;
    public rel_bancos$: Observable<any[]>;
    public ref_rel_bancos: any;
    public config_financeiro$: Observable<any[]>;
    public ref_config_financeiro: any;
    public bancos$: Observable<any[]>;
    public ref_bancos: any;
    public codigos_de_bancos$: Observable<any[]>;
    public ref_codigos_de_bancos: any;
    public caixa$: Observable<any[]>;
    public ref_caixa: any;
    public orcamentos$: Observable<any[]>;
    public ref_orcamentos: any;
    public todos_orcamentos$: Observable<any[]>;
    public ref_todos_orcamentos: any;

    public historicos$: Observable<any[]>;
    public ref_historicos: any;
    public pagamentos$: Observable<any[]>;
    public ref_pagamentos: any;
    public todos_pagamentos$: Observable<any[]>;
    public ref_todos_pagamentos: any;
    public estoque$: Observable<any[]>;
    public ref_estoque: any;

    public carregou_databases : boolean = false;

    public lista_de_profissionais : any = [];

    public conjunto_de_orcamentos : any = [];

    public registro_snapshot : any;
    public database : string;
    public selected_registros : any;
    public selected_fornecedores : any;
    public selected_empresas : any;
    public selected_maladireta : any;


    public selected_financeiro : any;
    public selected_centros_de_custos : any;
    public selected_movimentacao : any;
    public selected_relatorios : any;
    public selected_rel_centros_de_custos : any;
    public selected_rel_extrato_de_contas : any;
    public selected_rel_receitas_e_despesas : any;
    public selected_rel_cheque_pre : any;
    public selected_rel_disponibilidade : any;

    public selected_indicadores : any;
    public selected_atendimentos : any;
    public selected_receitas : any;
    public selected_despesas : any;
    public selected_receitas_admin : any;
    public selected_despesas_admin : any;

    public selected_lancamentos_receita : any;
    public selected_lancamentos_despesa : any;
    public selected_lancamentos_receita_sem_estorno_duplo : any;
    public selected_lancamentos_despesa_sem_estorno_duplo : any;
    public selected_estornos : any;
    public selected_transferencias : any;
    public selected_conciliacao : any;
    public selected_rel_bancos : any;
    public selected_config_financeiro : any;
    public selected_bancos : any;
    public selected_codigos_de_bancos : any;
    public selected_caixa : any;
    public selected_orcamentos : any;
    public selected_todos_orcamentos : any;

    public selected_despesas_filtrada : any;

    public selected_equipe : any;
    public selected_impressos : any;
    public selected_clientes_ultimos_visualizados: any;
    public selected_clientes_ultimos_incluidos : any;
    public selected_fornecedores_ultimos_incluidos : any;
    public selected_estoque_ultimos_incluidos : any;

    public selected_produtos : any;
    public selected_clientes : any;
    public selected_usuarios : any;
    public selected_pagamentos : any;
    public selected_todos_pagamentos : any;
    public selected_estoque : any;

    public selected_historicos : any;
    public selected_resultados : any;

    public selected_marcados : any = {};
    public selected : any = {};
    public selected_edit : any = {};

    public total_de_clientes : number = -1;
    public total_de_usuarios : number = -1;
    public total_de_estoque : number = -1;

    public total_de_equipe : number = -1;
    public total_impressos : number = -1;

    public total_de_indicadores : number = -1;
    public total_de_empresas : number = -1;
    public total_de_maladireta : number = -1;
    public total_de_fornecedores : number = -1;
    public total_de_financeiro : number = -1;
    public total_de_centros_de_custos : number = -1;
    public total_de_movimentacao : number = -1;
    public total_de_relatorios : number = -1;
    public total_de_rel_centros_de_custos : number = -1;
    public total_de_rel_extrato_de_contas : number = -1;
    public total_de_rel_receitas_e_despesas : number = -1;
    public total_de_rel_cheque_pre : number = -1;
    public total_de_rel_disponibilidade : number = -1;

    public total_de_atendimentos : number = -1;
    public total_de_receitas : number = -1;
    public total_de_despesas : number = -1;
    public total_de_lancamentos_receita : number = -1;
    public total_de_lancamentos_despesa : number = -1;
    public total_de_estornos : number = -1;
    public total_de_transferencias : number = -1;
    public total_de_conciliacao : number = -1;
    public total_de_rel_bancos : number = -1;
    public total_de_config_financeiro : number = -1;
    public total_de_bancos : number = -1;
    public total_de_codigos_de_bancos : number = -1;
    public total_de_caixa : number = -1;
    public total_de_orcamentos : number = -1;
    public total_de_todos_orcamentos : number = -1;

    public total_de_historicos : number = -1;
    public total_de_pagamentos : number = -1;
    public total_de_todos_pagamentos : number = -1;

    public total_de_produtos : number = -1;
    public total_de_registros : number = -1;

    public total_de_resultados : number = -1;

    public listar_indicador : boolean = false;
    public listar_fornecedores : boolean = false;
    public listar_empresas : boolean = false;
    public listar_maladireta : boolean = false;
    public listar_financeiro : boolean = false;
    public listar_centros_de_custos : boolean = false;
    public listar_movimentacao : boolean = false;

    public listar_relatorios : boolean = false;
    public listar_rel_centros_de_custos : boolean = false;
    public listar_rel_centros_de_custos_totalizados : boolean = false;
    public listar_rel_extrato_de_contas : boolean = false;
    public listar_rel_receitas_e_despesas : boolean = false;
    public listar_rel_cheque : boolean = false;
    public listar_rel_cheque_pre : boolean = false;
    public listar_rel_cheque_pre_dados : boolean = false;
    public listar_rel_cheque_pre_recebidos : boolean = false;
    public listar_rel_disponibilidade : boolean = false;
    public listar_rel_dinheiro : boolean = false;

    public listar_equipe : boolean = false;
    public listar_impressos : boolean = false;

    public listar_produtos_em_estoque : boolean = false;
    public listar_clientes : boolean = false;
    public listar_usuarios : boolean = false;
    public listar_aniversarios : boolean = false;
    public listar_revisoes : boolean = false;
    public listar_promocoes : boolean = false;
    public listar_estoque : boolean = false;

    public listar_atendimentos : boolean = false;
    public listar_receitas : boolean = false;
    public listar_despesas : boolean = false;
    public listar_centros_de_custos_lista : boolean = false;

    public listar_lancamentos_receita : boolean = false;
    public listar_lancamentos_despesa : boolean = false;
    public listar_estornos : boolean = false;
    public listar_transferencias : boolean = false;
    public listar_conciliacao : boolean = false;
    public listar_rel_bancos : boolean = false;
    public listar_config_financeiro : boolean = false;
    public listar_bancos : boolean = false;
    public listar_caixa : boolean = false;
    public listar_orcamentos : boolean = false;

    public listar_historicos : boolean = false;
    public listar_pagamentos : boolean = false;
    public listar_todos_pagamentos : boolean = false;

    public listar_outros : boolean = false;

    // mostra na tela de listagem o nome do ultimo registro incluído, para facilitar o cadastramento

    public cliente : any = {};
    public cliente_nome : string = '';
    public cliente_key : string = '';
    public cliente_cpf : string = '';

    public fornecedor : any = {};
    public responsavel : any = {};
    public destinatario : any = {};

    public registro : any = {};
    public produto_escolhido : any = {};

    public shared : any = {};
    public x : any;
    public x_list : any[] = [];
    public y: any;

    public uploadedFiles: any[] = [];

    public selected_pilha : any = [];
    public selected_origem : any = {};
    public voltar_para : string = '';
    public voltar_para_lista : boolean = false;

    public maladireta_destino : string = '';

    // =====================================================
    // Autenticação
    // =====================================================
    // public user: Observable<User>;
    public user: any;

    public auth_object : any = '';
    public usuario_logado : any = {};
    public usuarios : any = {};
    public usuario : string = '';
    // ===================================================


    public PARAMETRO : string;

    public observando_dados : boolean = false;
    public editando_sublista : boolean = false;
    public FLAG_pode_criar_nova__loja : boolean = false;

    public editando : boolean = false;

    // FILTROS

    public selected_equipe_filtrado : any;

    public filtered_lancamentos : any = {};
    public filtered_lancamentos_receita : any = {};
    public filtered_lancamentos_despesa : any = {};
    public filtered_receitas : any = {};
    public filtered_despesas : any = {};
    public filtered_produtos_em_estoque : any = {};
    public filtered_fornecedores : any = {};
    public filtered_atendimentos : any = {};

    public filtered_aniversariantes : any = {};
    public filtered_revisoes : any = {};
    public filtered_promocoes : any = {};
    public filtered_clientes : any = {};
    public filtered_centros_de_custos : any = {};
    public filtered_orcamentos : any = {};
    public filtered_bancos : any = {};
    public filtered_codigos_de_bancos : any = {};

    public filtered_usuarios : any = {};
    public filtered_estoque : any = {};
    public filtered_equipe : any = {};

    public filtered_relatorios : any = {};
    public filtered_financeiro : any = {};



    public filtered_registros : any = {};
    public filtered_registros_destaque : any = {};


    public filtered_responsavel : any = {};
    public filtered_resultados : any = {};


    public filtrar_por_id : boolean = false;


    /// unwrapped arrays from firebase
    public produtos : any;
    public produto_em_estoque : any;

    /// filter-able properties
    public filtro : string = "";
    public filtro_clientes : string = "";
    public filtro_digitado : string = "";
    public produto         : string;
    public marcado         : boolean;

    public filters_lancamentos : any = {};
    public filters_lancamentos_receita : any = {};
    public filters_lancamentos_despesa : any = {};
    public filters_despesa : any = {};
    public filters_receita : any = {};
    public filters_produtos_em_estoque : any = {};
    public filters_fornecedores : any = {};
    public filters_responsavel : any = {};
    public filters_atendimentos : any = {};

    public filters_clientes : any = {};
    public filters_centros_de_custos : any = {};
    public filters_bancos : any = {};
    public filters_orcamentos : any = {};
    public filters_usuarios : any = {};
    public filters_estoque : any = {};

    public filters_aniversariantes : any = {};
    public filters_revisoes : any = {};
    public filters_promocoes : any = {};

    public filters_registros : any = {};
    public filters_registros_destaque : any = {};

    public filter : boolean = false;

    public achou : boolean = false;

    public mes_lista_aniversario : string = '';

    // DIVERSOS
    public observando_registros : boolean;
    public nova_loja : any;
    public passagem : number = 0;
    public indice_lista_pedida : number;


    public salvou_registro : boolean = false;

    public incluindo : boolean = false;
    public incluiu : boolean = false;

    // Dialog box de erro
    public ErroDialog_subtitle : string = '';
    public ErroDialog_title : string = '';

    public estoque : any = {};

    public parametro_de_salvar : string = '';

    public mes_de_aniversario : string;
    public mes_de_revisao : string;
    public mes_de_promocao : string;
    public inicializando_aniversarios : boolean  = true;
    public inicializando_revisoes : boolean  = true;
    public inicializando_promocoes : boolean  = true;

    public retorno : string = '';
    public alta_anterior : string;

    public pode_incluir : boolean = false;
    public pode_incluir_lancamento : boolean = false;

    public popupRegistro_tipo : string;
    public PopupWhatsappTitulo : string = '';

    public mensagem : string = '';
    public url : string = '';
    public url_web : string = '';

    public historicos : any = {};
    public pode_editar : boolean = false;
    public titulo_barra : string = '';
    public titulo_pagina : string = '';

    public plano_de_tratamento : any = {};
    public saldo_dos_pagamentos : number = 0;
    public mostrar_lista_de_orcamentos : boolean = true;
    public mostrar_centros_de_custos_receita : boolean = true;
    public mostrar_centros_de_custos_despesa : boolean = true;

    // public mostrar_cheque_pre_dados : boolean = false;
    // public mostrar_cheque_pre_recebidos : boolean = false;

    public centro_de_custos_escolhido : any = {};



    public rows : number = 10;
    public rows_planos : number = 10;
    public rows_receita : number = 10;
    public rows_despesa : number = 10;

    public indice : number = -1;
    public ano_estoque : string = '';

    public total_estoque : number = 0;
    public total_estoque_str : string = '';

    public centros_de_custos_receitas : any;
    public centros_de_custos_despesas : any;

    public lancamentos_por_dia : any;
    public lancamentos_por_dia_obj : any;

    public lancamentos_do_dia : any;
    public lancamentos_do_dia_obj : any;

    public mostrar_lancamentos_do_dia : boolean = false;

    public saldo_lancamentos : number = 0;
    public saldo_lancamentos_do_dia : number = 0;
    public data_selecionada : string = '';

    public caixa_temp : any = {};
    public xtemp : any;
    public temp_comissao : any = {};

    public editar_receitas : boolean = false;
    public editar_despesas : boolean = false;


    public lancamentos_dinheiro_receita : any;
    public lancamentos_dinheiro_despesa : any;
    public lancamentos_cheque_receita : any;
    public lancamentos_cheque_despesa : any;
    public lancamentos_cheque_pre_receita : any;
    public lancamentos_cheque_pre_despesa : any;
    public lancamentos_debito_receita : any;
    public lancamentos_debito_despesa : any;
    public lancamentos_credito_receita : any;
    public lancamentos_credito_despesa : any;

    public listar_dinheiro_dia : boolean = false;
    public despesa_ou_receita : string = '';
    public receitas_dinheiro_dia : any = [];
    public despesas_dinheiro_dia : any = [];
    public receitas_cheque_dia : any = [];
    public despesas_cheque_dia : any = [];
    public receitas_cheque_pre_dia : any = [];
    public despesas_cheque_pre_dia : any = [];

    public datas_com_lancamentos : any;

    public datas_com_lancamentos_dinheiro : any = [];
    public datas_com_lancamentos_cheque : any = [];;
    public datas_com_lancamentos_cheque_pre : any = [];

    public datas_com_lancamentos_receitas : any;
    public datas_com_lancamentos_despesas : any;
    public datas_com_lancamentos_despesas_cheque_pre : any;
    public datas_com_lancamentos_receitas_cheque_pre : any;
    public datas_com_lancamentos_despesas_cheque : any;
    public datas_com_lancamentos_receitas_cheque : any;

    public listar_cheque : boolean = false;
    public listar_cheque_dia : boolean = false;
    public listar_cheque_pre_dia : boolean = false;
    public listar_data : string = '';

    public listar_producao : boolean = false;
    public listar_resultados : boolean = false;

    public valor_saldo : number = 0;
    public valor_saldo_dinheiro : number = 0;
    public valor_saldo_cheque : number = 0;
    public valor_saldo_cheque_pre : number = 0;
    public valor_saldo_debito : number = 0;
    public valor_saldo_credito : number = 0;

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

    public selected_producao_profissional : any = [];
    public valor_saldo_profissional : number = 0;
    public valor_total_receitas_profissional : number = 0;
    public valor_total_despesas_profissional : number = 0;
    public lancamentos_profissional_receita : any = [];
    public lancamentos_profissional_despesa : any = [];

    public valor_total_receitas : number = 0;
    public valor_total_despesas : number = 0;

    public valor_total_receitas_do_dia : number = 0;
    public valor_total_despesas_do_dia : number = 0;

    public receitas_producao_profissional : any = [];
    public profissional_listado : string = '';
    public lancamentos_producao : any = [];

    public listar_producao_profissional : boolean = false;
    public producao_profissional : any = [];
    public listar_rel_producao : boolean = false;

    public popup_receita_despesa_meio_de_pagamento : string = '';
    public popup_receita_despesa_data : string = '';
    public profissional_nome : string = '';
    public paginator_producao_profissional : boolean = false;
    public paginator_selected_producao_profissional : boolean = false;
    public profissional_valor_receitas : number = 0;

    public filtro_centro_de_custos : string = '';

    public calcular_financeiro : boolean = true;
    public p_header : string = '';

    public is_estoque_total : boolean = false;
    public is_estoque_excedente : boolean = false;
    public is_estoque_normal : boolean = false;
    public is_estoque_baixo : boolean = false;
    public is_estoque_vazio : boolean = false;
    public is_estoque_negativo : boolean = false;

    public mostrar_imagens_na_lista_estoque : boolean = false;
    public estoque_header : string = '';

    public listar_coluna_centro_de_custos : boolean = false;
    public listar_coluna_contraparte : boolean = false;

    public mostrar_estoque_fornecedores_flag : boolean = false;
    public mostrar_estoque_clientes_flag : boolean = false;
    public mostrar_estoque_compras_flag : boolean = false;
    public mostrar_estoque_vendas_flag : boolean = false;

    public mostrar_clientes_vendas_flag : boolean = false;
    public mostrar_clientes_atendimentos_flag : boolean = false;

    public atendimento_inativo : boolean = false;
    public atendimento_aberto : boolean = false;
    public atendimento_em_curso : boolean = false;
    public atendimento_finalizado : boolean = false;

    public lancamento_detalhado : any = {};

    public whatsapp_destino : string = '';

    public HOJE : string = '';
    public HOJE_QUANDO : number = 0;


    // FUNCOES

    public go(destino : string = '') {
        console.log("go(" + destino + ")");

        this.origem = this.PARAMETRO;
        this.PARAMETRO = destino;


        this.desativar_listagens();
        this.desativar_DISPLAYS();

        if(!destino || destino == 'HOME') {
            this.origem = '';
            this.cliente = null;
            this.fornecedor = null;
            this.PARAMETRO = "HOME";
            this.config.DISPLAY.Home = true;
        }
        else {
            if (destino == 'PAGAMENTOS'){
                this.origem = 'CLIENTES';
                this.cliente = this.selected;

                console.log("ORIGEM = " + this.origem);
                console.log("this.cliente");
                console.log(this.cliente);

                destino = 'LANCAMENTOS_RECEITA';
            }

            if (destino == 'DESPESAS_FORNECEDOR'){
                this.origem = 'FORNECEDORES';
                this.fornecedor = this.selected;

                console.log("ORIGEM = " + this.origem);
                console.log("this.fornecedor");
                console.log(this.fornecedor);

                destino = 'LANCAMENTOS_DESPESA';
            }

            else if(destino == 'ORCAMENTOS'){
                this.origem = 'CLIENTES';
                this.cliente = this.selected;

                console.log("ORIGEM = " + this.origem);
                console.log("this.cliente");
                console.log(this.cliente);
            }

            if (destino == 'REL_CENTROS_DE_CUSTOS'){
                console.log("selected_rel_centros_de_custos");
                console.log(this.selected_rel_centros_de_custos);

                this.listar_rel_centros_de_custos = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'REL_CENTROS_DE_CUSTOS_TOTALIZADOS'){
                this.listar_rel_centros_de_custos_totalizados = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'REL_DINHEIRO'){
                this.listar_rel_dinheiro = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'REL_CHEQUES_PRE'){
                this.listar_rel_cheque_pre = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'REL_CHEQUES_A_VISTA'){
                this.listar_rel_cheque = true;
                this.config.DISPLAY.Lista = true;
            }

            else if (destino == 'LANCAMENTOS_RECEITA'){
                this.listar_lancamentos_receita = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'REL_CHEQUES_A_VISTA'){
                this.listar_rel_cheque = true;
                this.config.DISPLAY.Lista = true;
            }
            else if(destino == 'CENTROS_DE_CUSTOS_LISTA'){
                this.listar_centros_de_custos_lista = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (this.PARAMETRO == 'ANIVERSARIOS'){
                // this.calcula_mes_de_aniversario();
                // this.pode_incluir = false;
                // this.listar_clientes = false;
                // this.listar_aniversarios = true;
                // this.listar_revisoes = false;
                // this.listar_promocoes = false;
                // this.config.DISPLAY.Lista = true;
            }
            else if (this.PARAMETRO == 'REVISOES'){
                // this.calcula_mes_de_revisao();
                // this.pode_incluir = false;
                // this.listar_clientes = false;
                // this.listar_revisoes = true;
                // this.listar_promocoes = false;
                // this.config.DISPLAY.Lista = true;
            }
            else if (this.PARAMETRO == 'PROMOCOES'){
                // this.calcula_disponibilidade_para_promocao();
                // this.pode_incluir = false;
                // this.listar_clientes = false;
                // this.listar_revisoes = false;
                // this.listar_promocoes = true;
                // this.config.DISPLAY.Lista = true;
            }
            else if (this.PARAMETRO == 'ESTOQUE'){
                this.listar_estoque = true;
                this.config.DISPLAY.Lista = true;
            }
            else if (destino == 'PERFIL') {
                // console.log("PERFIL");
                this.selected = this.meu_perfil();
                this.config.DISPLAY.Registro = true;
            }
            else if (destino == 'CONFIGURACAO') {
                console.log("CONFIGURACAO");
                this.selected = this.minha_configuracao();
                this.config.DISPLAY.Registro = true;
            }
            else if (destino == 'AGENDA') {
                this.config.DISPLAY.Agenda = true;
            }

            else {
                console.log("go() -> else");
                this.PARAMETRO = destino;
                console.log("PARAMETRO = " + this.PARAMETRO);

                this.config.DISPLAY.Edit = false;
                this.config.DISPLAY.Lista = true;
            }
        }
    }

    public desativar_DISPLAYS() {
        this.config.DISPLAY.Home = false;
        this.config.DISPLAY.Registro = false;
        this.config.DISPLAY.Editar = false;
        this.config.DISPLAY.Agenda = false;
        this.config.DISPLAY.Lista = false;
        this.config.DISPLAY.ExcluirDialog = false;
        this.config.DISPLAY.ErroDialog = false;
        this.config.DISPLAY.PopupRegistro = false;
        this.config.DISPLAY.PopupWhatsapp = false;
        this.config.DISPLAY.Revisoes = false;
        this.config.DISPLAY.Promocoes = false;
    }

    public desativar_listagens() {
        this.listar_clientes = false;
        this.listar_usuarios = false;
        this.listar_aniversarios = false;
        this.listar_revisoes = false;
        this.listar_promocoes = false;
        this.listar_fornecedores = false;
        this.listar_empresas = false;
        this.listar_maladireta = false;
        this.listar_financeiro = false;
        this.listar_centros_de_custos = false;
        this.listar_movimentacao = false;
        this.listar_relatorios = false;
        this.listar_rel_centros_de_custos = false;
        this.listar_rel_centros_de_custos_totalizados = false;
        this.listar_rel_extrato_de_contas = false;
        this.listar_rel_receitas_e_despesas = false;
        this.listar_rel_cheque_pre = false;
        this.listar_rel_cheque_pre_dados = false;
        this.listar_rel_cheque_pre_recebidos = false;
        this.listar_rel_cheque = false;
        this.listar_rel_dinheiro = false;
        this.listar_rel_disponibilidade = false;
        this.listar_equipe = false;
        this.listar_impressos = false;
        this.listar_estoque= false;

        this.listar_indicador = false;
        this.listar_atendimentos = false;
        this.listar_receitas = false;
        this.listar_despesas = false;
        this.listar_lancamentos_receita = false;
        this.listar_lancamentos_despesa = false;
        this.listar_centros_de_custos_lista = false;
        this.listar_estornos = false;
        this.listar_transferencias = false;
        this.listar_conciliacao = false;
        this.listar_rel_bancos = false;
        this.listar_config_financeiro = false;
        this.listar_bancos = false;
        this.listar_caixa = false;
        this.listar_orcamentos = false;
        this.listar_historicos = false;
        this.listar_pagamentos = false;
        this.listar_outros = false;
    }

    public set_titulo_barra(titulo : string = '') {
        // Barra de titulo
        if(titulo){
            this.titulo_barra = titulo;
        }
        else {
            if (this.PARAMETRO == 'CLIENTES' && this.config.DISPLAY.Registro) {
                // Vendo ficha de cliente
                this.titulo_barra = this.selected.nome;
            }
            else if (this.PARAMETRO == 'CLIENTES' && this.config.DISPLAY.Editar) {
                // Editando ficha de cliente
                this.titulo_barra = '';
            }
            else if (this.config[this.PARAMETRO].exames_planos_ou_historicos_do_cliente){
                if(this.cliente && this.cliente.nome){
                    this.titulo_barra = this.cliente.nome;
                }
                else if(this.registro && this.registro.nome){
                    this.titulo_barra = this.registro.nome;
                }
                else {
                    this.titulo_barra = '';
                }
            }
            else if (this.PARAMETRO == 'HISTORICOS'){
                this.titulo_barra = this.usuario_logado.nome;
            }
            else if (this.PARAMETRO == 'ESTOQUE'){
                this.titulo_barra = this.selected.cliente_nome ? this.selected.cliente_nome : ' ';
            }
            else if (this.PARAMETRO == 'PRODUCAO_PROFISSIONAL'){
                this.titulo_barra = this.selected.profissional_nome;
            }
            else if (this.PARAMETRO == 'LANCAMENTOS_RECEITA' || this.PARAMETRO == 'LANCAMENTOS_DESPESA' || this.PARAMETRO == 'REL_RECEITAS_E_DESPESAS'){

                if(this.selected.centro_de_custos){
                    console.log("centro_de_custos_escolhido = " + this.centro_de_custos_escolhido.nome);
                    // console.log("selected.centro_de_custos");
                    // console.log(this.selected.centro_de_custos);

                    if(!this.centro_de_custos_escolhido){
                        this.centro_de_custos_escolhido = {};
                        this.centro_de_custos_escolhido.nome = this.selected.centro_de_custos;
                        console.log("centro_de_custos_escolhido vindo de this.selected.centro_de_custos = " + this.centro_de_custos_escolhido.nome);
                    }

                    this.centro_de_custos_escolhido.nome = this.selected.centro_de_custos;
                    console.log("centro_de_custos_escolhido = " + this.centro_de_custos_escolhido.nome);

                    this.titulo_barra = this.centro_de_custos_escolhido.nome;
                }
                else if ( ["REL_DINHEIRO","REL_CHEQUES_PRE","REL_CHEQUES_A_VISTA"].includes(this.PARAMETRO) ){

                    if (this.selected.is_receita || this.selected.centro_de_custos_codigo.substr(0,1)=='R'){
                        if(this.titulo_barra){
                            if(!this.titulo_barra.includes('RECEITA')){
                                this.titulo_barra = 'RECEITA - ' + this.titulo_barra;
                            }
                        }
                        else{
                            this.titulo_barra = 'RECEITA';
                        }
                    }
                    else if (this.selected.is_despesa || this.selected.centro_de_custos_codigo.substr(0,1)=='D'){
                        if(this.titulo_barra){
                            if(!this.titulo_barra.includes('DESPESA')){
                                this.titulo_barra = 'DESPESA - ' + this.titulo_barra;
                            }
                        }
                        this.titulo_barra = 'DESPESA';
                    }
                }
                else {
                    this.titulo_barra = '';
                }
            }
        }
    }

    public set_titulo_pagina(titulo_pagina : string = '') {
        this.titulo_pagina = titulo_pagina;
    }

    public checa_se_vai_poder_editar_a_ficha() {
        //Habilitação do botão de edição
        if(!this.voltar_para){
            this.pode_editar = this.config[this.PARAMETRO].pode_editar;

            if (this.usuario_logado.dataset != this.usuario_logado.key) {
                this.pode_editar = false ;
            }
            if(this.selected.criado_por_key &&  this.selected.criado_por_key != this.usuario_logado.key ){
                this.pode_editar = false ;
            }

            if (!this.pode_editar && this.config.is_admin &&  this.config[this.PARAMETRO].pode_editar_admin) {
                this.pode_editar = true ;
            }
        }
    }

    public meu_perfil() {
        this.selected = {};

        for (let i in this.usuarios){
            // Busca o registro do usuario autenticado em USUARIOS
            if (this.usuarios[i].key == this.auth_object.uid) {
                this.usuario = this.usuarios[i];
                this.usuario_logado = this.usuarios[i];
                break;
            }
        }

        this.selected = this.util.deepClone(this.usuario);

        if (this.selected.is_admin || this.selected.email == 'julioventura@gmail.com'){
            this.selected.is_admin = true;
            this.config.is_admin = true;
        }
        return this.selected;
    }

    public remover_filtros(){
        // delete this.filter_records['nome'];
        // delete this.filter_records['id'];
        // delete this.filter_records['codigo'];
        // delete this.filter_records['contraparte_key'];
        // delete this.filter_records['centro_de_custos_codigo'];
        //
        // delete this.filter_records2['nome'];
        // delete this.filter_records2['id'];
        // delete this.filter_records2['codigo'];
        // delete this.filter_records2['contraparte_key'];
        // delete this.filter_records2['centro_de_custos_codigo'];

        this.filtro = "";

        this[this.config.FORNECEDORES.filtered] = {};
        this[this.config.CLIENTES.filtered] = {};
        this[this.config.EQUIPE.filtered] = {};
        this[this.config.ATENDIMENTOS.filtered] = {};
        this[this.config.ESTOQUE.filtered] = {};
        this[this.config.LANCAMENTOS_RECEITA.filtered] = {};
        this[this.config.LANCAMENTOS_DESPESA.filtered] = {};
    }


    // ==================
    // FILTRAR ESTOQUE
    // ==================

    private applyfilters_estoque() {
        this.x_list = [];
        let quantidade, minima, ideal, ideal_padrao;

        this.filtered_estoque = _.filter(this.selected_estoque, _.conforms(this.filters_estoque) );

        for(let i in this.filtered_estoque){
            quantidade = this.filtered_estoque[i].quantidade ? this.filtered_estoque[i].quantidade : 0;
            minima = this.filtered_estoque[i].quantidade_minima ? this.filtered_estoque[i].quantidade_minima : 0;
            ideal_padrao = minima *2;  // trocar por ideal_padrao para o estoque, em configurações... TODO
            ideal = this.filtered_estoque[i].quantidade_maxima ? this.filtered_estoque[i].quantidade_maxima : ideal_padrao;

            if(this.is_estoque_excedente){
                if(quantidade > ideal ) {
                    this.x_list.push(this.filtered_estoque[i]);
                }
                this.estoque_header = "Estoque excessivo, acima do máximo";
            }
            else if(this.is_estoque_normal){
                if(quantidade > minima && quantidade <= ideal) {
                    this.x_list.push(this.filtered_estoque[i]);
                }
                this.estoque_header = "Estoque acima do mínimo e até o máximo";
            }
            else if(this.is_estoque_baixo){
                if(quantidade > 0 && quantidade <= minima ) {
                    this.x_list.push(this.filtered_estoque[i]);
                }
                this.estoque_header = "Estoque menor ou igual ao mínimo";
            }
            else if(this.is_estoque_vazio){
                if(quantidade == 0 ) {
                    this.x_list.push(this.filtered_estoque[i]);
                    this.estoque_header = "Estoque zerado";
                }
            }
            else if(this.is_estoque_negativo){
                if(quantidade < 0 ) {
                    this.x_list.push(this.filtered_estoque[i]);
                    this.estoque_header = "Estoque negativo, com entrega pendente";
                }
            }
            else {
                this.x_list.push(this.filtered_estoque[i]);
                this.is_estoque_total = true;
                this.estoque_header = "Estoque";
            }
        }
        this.filtered_estoque = this.x_list;
        // console.log("this.filtered_estoque FILTRADO");
        // console.log(this.filtered_estoque);
    }


    // ====================
    // FILTRAR ANIVERSARIOS
    // ====================

    private filterAniversariantes(rule: string) {
        let property = 'nascimento';
        if (!rule) {
            this.removeFilter_aniversariantes();
        }
        else {
            // Filtra
            this.filters_aniversariantes[property] = val =>  val.substr(3,2) == rule;
        }
        this.applyfilters_aniversariantes();
    }

    public removeFilter_aniversariantes() {
        delete this.filters_aniversariantes['nascimento'];
        this.applyfilters_aniversariantes();
        this.filtro_digitado = "";
    }

    private applyfilters_aniversariantes() {
        this.x_list = [];
        let y;

        if(this.maladireta_destino == 'CLIENTES'){
            this.filtered_aniversariantes = _.filter(this.selected_clientes, _.conforms(this.filters_aniversariantes) );
        }
        else if(this.maladireta_destino == 'EQUIPE'){
            this.filtered_aniversariantes = _.filter(this.selected_equipe, _.conforms(this.filters_aniversariantes) );
        }

        for(let i in this.filtered_aniversariantes){
            y = this.filtered_aniversariantes[i].nascimento ? this.filtered_aniversariantes[i].nascimento : '';
            if(y && y.substr(3,2) == this.mes_lista_aniversario) {
                this.x_list.push(this.filtered_aniversariantes[i]);
            }
        }
        this.filtered_aniversariantes = this.x_list;
    }

    public calcula_mes_de_aniversario(indice : number = -1) {
        if(indice == -1){
            let agora = this.util.agora();
            let mes_atual = agora.mes;
            indice = Number(mes_atual) - 1;  // indices começam de zero
        }

        this.mes_de_aniversario = this.util.MESESDOANO[indice];

        for (let i in this.config.classe_escolher_mes_do_ano_value){
            this.config.classe_escolher_mes_do_ano_value[i] = "escolher_mes_do_ano_inativo";
        }

        this.config.classe_escolher_mes_do_ano_value[indice] = "escolher_mes_do_ano_ativo";

        let mes = indice + 1;
        this.mes_lista_aniversario = this.util.formata_zeros_a_esquerda(mes,2);

        this.filterAniversariantes(this.mes_lista_aniversario);
    }


    // ======================
    // FILTRAR REVISÕES
    // ======================

    filterRevisoes(rule: string) {
        let property = 'mes_de_revisao';
        if (!rule) {
            this.removeFilter_revisoes();
        }
        else {
            this.filters_revisoes[property] = val =>  val == rule;
        }
        this.applyfilters_revisoes();
    }

    private applyfilters_revisoes() {
        this.filtered_revisoes = _.filter(this.selected_clientes, _.conforms(this.filters_revisoes) );
    }

    removeFilter_revisoes() {
        delete this.filters_revisoes['mes_de_revisao'];
        this.applyfilters_revisoes();
        this.filtro_digitado = "";
    }


    // ======================
    // FILTRAR PROMOÇÕES
    // ======================

    filterReativacoes() {
        let property = 'alta';

        this.filters_promocoes[property] = val => !val;
        this.applyfilters_promocoes();
    }

    private applyfilters_promocoes() {
        this.filtered_promocoes = _.filter(this.selected_clientes, _.conforms(this.filters_promocoes) );
    }

    removeFilter_promocoes() {
        delete this.filters_promocoes['alta'];
        this.applyfilters_promocoes();
    }

    filterBooleanRelatorios(property: string, rule : boolean) {
        if(rule==true) {
            this.filters_registros[property] = val => val;
        }
        else {
            this.filters_registros[property] = val => !val;
        }
        this.filtered_relatorios = _.filter(this.selected_relatorios, _.conforms(this.filters_registros) );
    }


    filterBooleanFinanceiro(property: string, rule : boolean) {
        if(rule==true) {
            this.filters_registros[property] = val => val;
        }
        else {
            this.filters_registros[property] = val => !val;
        }
        this.filtered_financeiro = _.filter(this.selected_financeiro, _.conforms(this.filters_registros) );
    }

        public filterDatabase(rule, parametro : string = '') {
            if(!parametro){
                parametro = this.PARAMETRO;
            }

            console.log("filterDatabase");
            console.log("PARAMETRO = " + this.PARAMETRO);
            console.log("parametro = " + parametro);
            console.log("rule = (" + rule + ")");

            let property = '';
            let filter_records : any = {};


            if(rule){
                if(parametro=='ATENDIMENTOS' && ['inativo','aberto','em_curso','finalizado'].includes(rule)){
                    property = 'atendimento';
                }
                else if(parametro=='ATENDIMENTOS' && rule=='hoje'){
                    rule = this.HOJE;
                    property = 'data';
                }
                else if(parametro != this.PARAMETRO){
                    // Listagens informativas dentro de fichas de detalhes de outro database
                    // console.log("parametro " + parametro + " != PARAMETRO " + this.PARAMETRO)

                    if (this.PARAMETRO=='FORNECEDORES' && parametro=='LANCAMENTOS_DESPESA'){
                        property = 'contraparte_key';
                    }
                    else if (this.PARAMETRO=='EQUIPE' && parametro=='ATENDIMENTOS'){
                        property = 'responsavel_key';
                    }
                    else if (this.PARAMETRO=='CLIENTES' && parametro=='ATENDIMENTOS'){
                        property = 'cliente_key';
                    }
                    else if (this.PARAMETRO=='CLIENTES' && parametro=='LANCAMENTOS_RECEITA'){
                        property = 'contraparte_key';
                    }
    				else if (this.PARAMETRO=='ESTOQUE' && parametro=='LANCAMENTOS_DESPESA'){
    					property = 'produto_id';
    				}
    				else if (this.PARAMETRO=='ESTOQUE' && parametro=='LANCAMENTOS_RECEITA'){
    					property = 'produto_id';
    				}
                    else if ( (this.PARAMETRO=='LANCAMENTOS_RECEITA' || this.PARAMETRO=='LANCAMENTOS_DESPESA') && parametro=='CODIGOS_DE_BANCOS'){

                        if( this.util.isNumeric(rule) ) {
                            // BUSCA NUMERICA
                            property= 'codigo';
                            rule = rule.toString();
                        }
                        else {
                            // BUSCA ALFABETICA
                            property = 'nome';
                        }
                    }
                    else {
                        // BUSCA ALFABETICA
                        property = 'nome';
                    }
                }

                else {

                    if( this.util.isNumeric(rule) && (parametro=='BANCOS' || parametro=='CODIGOS_DE_BANCOS' || parametro=='CLIENTES') ){
                        // BUSCA NUMERICA
                        if(parametro=='BANCOS' || parametro=='CODIGOS_DE_BANCOS'){
                            property= 'codigo';
                        }
                        else {
                            property = 'id';
                        }
                        rule = rule.toString();
                    }
                    else {
                        // BUSCA ALFABETICA
                        property= 'nome';
                        if(['ORCAMENTOS','ATENDIMENTOS','LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA'].includes(parametro)){
                            property= 'data';
                        }
                    }
                }

    			// console.log("vai pra testa_se_contem ");
                filter_records[property] = val => this.testa_se_contem(val, rule, property, parametro);

    			// console.log("voltou de testa_se_contem ");
                this.applyfilters(parametro, filter_records);
            }
            else if(this.PARAMETRO=='ESTOQUE'){
                this.applyfilters('ESTOQUE');
            }
            else {
                this.removeFilter(parametro);
            }
        }

        private applyfilters(parametro, filter_records : any = null) {
            console.log("applyfilters = (" + parametro + ")");
            console.log("filter_records = ");
            console.log(filter_records);

    		this[this.config[parametro].filtered] = _.filter(this[this.config[parametro].selected], _.conforms(filter_records) );
    		console.log([this.config[parametro].filtered])
    		console.log(this[this.config[parametro].filtered])

            if(parametro=='ESTOQUE'){
                // console.log("Filtrando ESTOQUE")
                let x_list = [];
                let quantidade, minima, ideal, ideal_padrao;

                for(let i in this.filtered_estoque){
                    // console.log(i)
                    quantidade = this.filtered_estoque[i].quantidade ? this.filtered_estoque[i].quantidade : 0;
                    minima = this.filtered_estoque[i].quantidade_minima ? this.filtered_estoque[i].quantidade_minima : 0;
                    ideal_padrao = minima *2;  // trocar por ideal_padrao para o estoque, em configurações... TODO
                    ideal = this.filtered_estoque[i].quantidade_maxima ? this.filtered_estoque[i].quantidade_maxima : ideal_padrao;

                    if(this.is_estoque_excedente){
                        // console.log("is_estoque_excedente")

                        if(quantidade > ideal ) {
                            x_list.push(this.filtered_estoque[i]);
                        }
                        this.estoque_header = "Estoque excessivo, acima do máximo";
                    }
                    else if(this.is_estoque_normal){
                        // console.log("is_estoque_normal")

                        if(quantidade > minima && quantidade <= ideal) {
                            x_list.push(this.filtered_estoque[i]);
                        }
                        this.estoque_header = "Estoque acima do mínimo e até o máximo";
                    }
                    else if(this.is_estoque_baixo){
                        // console.log("is_estoque_baixo")

                        if(quantidade > 0 && quantidade <= minima ) {
                            x_list.push(this.filtered_estoque[i]);
                        }
                        this.estoque_header = "Estoque menor ou igual ao mínimo";
                    }
                    else if(this.is_estoque_vazio){
                        // console.log("is_estoque_vazio")

                        if(quantidade == 0 ) {
                            x_list.push(this.filtered_estoque[i]);
                            this.estoque_header = "Estoque zerado";
                        }
                    }
                    else if(this.is_estoque_negativo){
                        // console.log("is_estoque_negativo")

                        if(quantidade < 0 ) {
                            x_list.push(this.filtered_estoque[i]);
                            this.estoque_header = "Estoque negativo, com entrega pendente";
                        }
                    }
                    else {
                        // console.log("is_estoque_total")

                        x_list.push(this.filtered_estoque[i]);
                        this.is_estoque_total = true;
                        this.estoque_header = "Estoque total";
                    }
                    console.log("x_list => " + x_list.length)
                }
                this.filtered_estoque = x_list;
                console.log("this.filtered_estoque");
                console.log(this.filtered_estoque);
            }

    		if(parametro=='LANCAMENTOS_DESPESA' && this.PARAMETRO=='ESTOQUE' && this.mostrar_estoque_fornecedores_flag){
    			console.log("identifica os FORNECEDORES dos LANCAMENTOS_DESPESA feitos em ESTOQUE");

    			let xtemp = [];
    	        let fornecedores = {};

    			for(let i in this.filtered_lancamentos_despesa){
    				// if(this.filtered_lancamentos_despesa[i].produto_id == this.selected.key){
    				console.log("filtered_lancamentos_despesa");
    				console.log(this.filtered_lancamentos_despesa);
    				if(!fornecedores[this.filtered_lancamentos_despesa[i]?.contraparte_key]){
    					for(let x in this.selected_fornecedores){
    						if(this.selected_fornecedores[x].key == this.filtered_lancamentos_despesa[i].contraparte_key){
    							xtemp.push(this.selected_fornecedores[x]);
    							fornecedores[this.filtered_lancamentos_despesa[i].contraparte_key] = true;
    						}
    					}
    				}
    				// }
    			}
    			this.filtered_fornecedores = xtemp;
    		}

    		if(parametro=='LANCAMENTOS_RECEITA' && this.PARAMETRO=='ESTOQUE' && this.mostrar_estoque_clientes_flag){
    			console.log("identifica os CLIENTES dos LANCAMENTOS_RECEITA feitos em ESTOQUE");

    			let xtemp = [];
    	        let clientes = {};

    			for(let i in this.filtered_lancamentos_receita){
    				// if(this.filtered_lancamentos_receita[i].produto_id == this.selected.key){
    				console.log("filtered_lancamentos_receita");
    				console.log(this.filtered_lancamentos_receita);
    				if(!clientes[this.filtered_lancamentos_receita[i]?.contraparte_key]){
    					for(let x in this.selected_clientes){
    						if(this.selected_clientes[x].key == this.filtered_lancamentos_receita[i].contraparte_key){
    							xtemp.push(this.selected_clientes[x]);
    							clientes[this.filtered_lancamentos_receita[i].contraparte_key] = true;
    						}
    					}
    				}
    				// }
    			}
    			this.filtered_clientes = xtemp;
    		}
        }

        private removeFilter(parametro : string = '') {
            if(!parametro) {
                parametro = this.PARAMETRO;
            }
            console.log("removeFilter(parametro) = (" + parametro + ")");

            this.filtro = '';
            this[this.config[parametro].filtered] = this[this.config[parametro].selected];
        }

        private testa_se_contem(val : string, rule : string, property : string, parametro : string) : boolean {
            let indice, palavra;
            let achou = false;
            let rules = [];

            if(property == 'id' || property == 'codigo' || property == 'data'){
                if(rule != ''){
                    rules = rule.split(" ");
                }
            }
            else if(property == 'contraparte_key'){
                rules[0] = rule;

            }
            else if(property == 'cliente_key'){
                rules[0] = rule;
            }
            else if(property == 'responsavel_key'){
                rules[0] = rule;
            }
            else {
                val = val ?  this.util.remover_acentos(val).toLowerCase() : val;
                rule = rule ? this.util.remover_acentos(rule).toLowerCase() : rule;
                if(rule != ''){
                    rules = rule.split(" ");
                }
            }

            if(rules == []) {
                this.removeFilter(parametro);
            }
            else {
                for (indice in rules){
                    // é preciso ter/achar todas as palavras de rule
                    palavra = rules[indice];
                    achou = val.includes(palavra);
                    if(!achou){
                        break;
                    }
                }
            }
    		// console.log("achou = " + achou);
            return achou;
        }


    private applyfilters_lancamentos_receita() {
        // console.log("applyfilters_lancamentos_receita");

        this.filtered_lancamentos_receita = _.filter(this.selected_lancamentos_receita, _.conforms(this.filters_lancamentos_receita) );

        console.log("PARAMETRO = " + this.PARAMETRO);
        console.log("FILTRANDO LANCAMENTOS_RECEITA");
        this.xtemp = [];
        let clientes = {};

        for(let i in this.filtered_lancamentos_receita){

            if(this.PARAMETRO == "CLIENTES"){
                // if(this.PARAMETRO == "CLIENTES" && this.mostrar_clientes_vendas_flag){
                if(this.filtered_lancamentos_receita[i].contraparte_key == this.selected.key){
                    // Filtra os estornos
                    if(this.filtered_lancamentos_receita[i].estorno != 'ESTORNO'){
                        this.xtemp.push(this.filtered_lancamentos_receita[i]);
                    }
                }
            }

            else if(this.PARAMETRO == "ESTOQUE" && this.mostrar_estoque_clientes_flag){
                if(this.filtered_lancamentos_receita[i].produto_id == this.selected.key){
                    if(!clientes[this.filtered_lancamentos_receita[i].contraparte_key]){
                        for(let x in this.selected_clientes){
                            if(this.selected_clientes[x].key == this.filtered_lancamentos_receita[i].contraparte_key){
                                this.xtemp.push(this.selected_clientes[x]);
                                clientes[this.filtered_lancamentos_receita[i].contraparte_key] = true;
                            }
                        }
                    }
                }
            }

            else if(this.PARAMETRO == "ESTOQUE" && this.mostrar_estoque_vendas_flag){
                if(this.filtered_lancamentos_receita[i].produto_id == this.selected.key){
					// Filtra os estornos
					if(this.filtered_lancamentos_receita[i].estorno != 'ESTORNO'){
						this.xtemp.push(this.filtered_lancamentos_receita[i]);
					}
                }
            }


            else if(this.PARAMETRO == "RESULTADOS" && this.mostrar_lancamentos_do_dia){
                if(this.filtered_lancamentos_receita[i].data == this.data_selecionada){
					// Filtra os estornos
					if(this.filtered_lancamentos_receita[i].estorno != 'ESTORNO'){
						this.xtemp.push(this.filtered_lancamentos_receita[i]);
					}
                }
            }


            else {
                // Filtra só os estornos
                if(this.filtered_lancamentos_receita[i].estorno != 'ESTORNO'){
                    this.xtemp.push(this.filtered_lancamentos_receita[i]);
                }
                else {
                }
            }
        }

        this.filtered_lancamentos_receita = this.xtemp;
    }

    private applyfilters_lancamentos_despesa() {
        // console.log("applyfilters_lancamentos_despesa");

        this.filtered_lancamentos_despesa = _.filter(this.selected_lancamentos_despesa, _.conforms(this.filters_lancamentos_despesa) );

        console.log("PARAMETRO = " + this.PARAMETRO);
        console.log("FILTRANDO LANCAMENTOS_DESPESA");

        this.xtemp = [];
        let fornecedores = {};

        for(let i in this.filtered_lancamentos_despesa){
            if(this.cliente && this.origem == 'CLIENTES'){
                // Filtra registros do cliente
                console.log("FILTRANDO DESPESAS COM O CLIENTE");

                if(this.filtered_lancamentos_despesa[i].contraparte_key == this.cliente.key){
                    // Filtra os estornos
                    if(this.filtered_lancamentos_despesa[i].estorno != 'ESTORNO'){
                        this.xtemp.push(this.filtered_lancamentos_despesa[i]);
                    }
                }
            }

            if(this.fornecedor && this.origem == 'FORNECEDORES'){
                // Filtra registros do fornecedor
                console.log("FILTRANDO DESPESAS COM O FORNECEDOR");

                if(this.filtered_lancamentos_despesa[i].contraparte_key == this.fornecedor.key){
                    // Filtra os estornos
                    if(this.filtered_lancamentos_despesa[i].estorno != 'ESTORNO'){
                        this.xtemp.push(this.filtered_lancamentos_despesa[i]);
                    }
                }
            }

            else if(this.PARAMETRO == "ESTOQUE" && this.mostrar_estoque_fornecedores_flag){
                if(this.filtered_lancamentos_despesa[i].produto_id == this.selected.key){
                    if(!fornecedores[this.filtered_lancamentos_despesa[i].contraparte_key]){
                        for(let x in this.selected_fornecedores){
                            if(this.selected_fornecedores[x].key == this.filtered_lancamentos_despesa[i].contraparte_key){
                                this.xtemp.push(this.selected_fornecedores[x]);
                                fornecedores[this.filtered_lancamentos_despesa[i].contraparte_key] = true;
                            }
                        }
                    }
                }
            }
            else if(this.PARAMETRO == "ESTOQUE" && this.mostrar_estoque_compras_flag){
                if(this.filtered_lancamentos_despesa[i].produto_id == this.selected.key){
                    this.xtemp.push(this.filtered_lancamentos_despesa[i]);
                }
            }

            else if(this.PARAMETRO == "RESULTADOS" && this.mostrar_lancamentos_do_dia){
                if(this.filtered_lancamentos_despesa[i].data == this.data_selecionada){
					// Filtra os estornos
					if(this.filtered_lancamentos_despesa[i].estorno != 'ESTORNO'){
						this.xtemp.push(this.filtered_lancamentos_despesa[i]);
					}
                }
            }

            else {
                // Filtra só os estornos
                if(this.filtered_lancamentos_despesa[i].estorno != 'ESTORNO'){
                    this.xtemp.push(this.filtered_lancamentos_despesa[i]);
                }
            }
        }
        this.filtered_lancamentos_despesa = this.xtemp;
    }


    private applyfilters_atendimentos() {
        // console.log("applyfilters_atendimentos");

        // this.filtered_atendimentos = _.filter(this.selected_atendimentos, _.conforms(this.filters_atendimentos) );

        console.log("FILTRANDO ATENDIMENTOS");
        this.xtemp = [];
        let clientes = {};

		for(let i in this.selected_atendimentos){
			// usar filtered_atendimentos se for filtrado previamente, mas aqui pode ser diretamente o selected_atendimentos

			if(this.PARAMETRO == "CLIENTES"){
				// if(this.PARAMETRO == "CLIENTES" && this.mostrar_clientes_vendas_flag){
					if(this.selected_atendimentos[i].cliente_key == this.selected.key){
						this.xtemp.push(this.selected_atendimentos[i]);
					}
				}

			else if(this.PARAMETRO == "EQUIPE"){
				// if(this.PARAMETRO == "CLIENTES" && this.mostrar_clientes_vendas_flag){
				if(this.selected_atendimentos[i].responsavel_key == this.selected.key){
					this.xtemp.push(this.selected_atendimentos[i]);
				}
			}

			else {
				// sem filtro
				this.xtemp.push(this.selected_atendimentos[i]);
			}
		}

		this.filtered_atendimentos = this.xtemp;
	}










    // ===================
    // FIM DE FILTROS
    // ===================
    //






    // ===================
    // OBSERVAR listas
    // ===================

    public observar_usuarios(){
        // console.log("dados.observar_usuarios()");

        this.selected_usuarios = {};
        this.total_de_usuarios = -1;
        this.filtered_usuarios = {};

        this.ref_usuarios = 'USUARIOS';
        this.usuarios$ = this.db.list(this.ref_usuarios).valueChanges();

        this.usuarios$.subscribe(
            val => {
                this.total_de_usuarios = val.length;
                this.selected_usuarios = val;
                this.usuarios = val;
                console.log("Total de usuários = " + this.total_de_usuarios);
            }
        );
    }

    public observar_clientes(salvar_apenas : boolean = false) {
        console.log("dados.observar_clientes()");

        this.ref_clientes = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.CLIENTES.database;
        this.clientes$ = this.db.list(this.ref_clientes).valueChanges();

        this.clientes$.subscribe(
            val => {
                this.total_de_clientes = val.length;
                this.selected_clientes = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending

                // =============================================================
                // SORTING OBJECTS
                // Objectlist = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
                // Objectlist = val.sort((a, b) => (a.nome > b.nome) ? -1 : 1) //// sort a list of objects by a property, DESCENDING
                // =============================================================
                // the callback function could calculate other properties too, to handle the case where the property is the same,
                // and order by a secondary property as well:
                // list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
                // =============================================================
                // SORTING LISTS
                // list = val.sort(function(a, b){return b-a}); // função de sort descendente para arrays simples
                // =============================================================
            }
        );
    }

    public observar_equipe(salvar_apenas : boolean = false) {
        // console.log("dados.observar_equipe()");
        this.ref_equipe = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.EQUIPE.database;
        this.equipe$ = this.db.list(this.ref_equipe).valueChanges();

        this.equipe$.subscribe(
            val => {
                this.total_de_equipe = val.length;
                this.selected_equipe = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_fornecedores(){
        // console.log("dados.observar_fornecedores()");

        this.ref_fornecedores = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.FORNECEDORES.database;
        this.fornecedores$ = this.db.list(this.ref_fornecedores).valueChanges();

        this.fornecedores$.subscribe(
            val => {
                this.total_de_fornecedores = val.length;
                this.selected_fornecedores = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_atendimentos(){
        // console.log("dados.observar_atendimentos()");

        this.ref_atendimentos = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.ATENDIMENTOS.database;
        this.atendimentos$ = this.db.list(this.ref_atendimentos).valueChanges();

        this.atendimentos$.subscribe(
            val => {
                this.total_de_atendimentos = val.length;
                this.selected_atendimentos = val.sort((a, b) => (a.data_hora_quando > b.data_hora_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }


    public observar_estoque() {
        // console.log("dados.observar_estoque()");

        this.ref_estoque = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.ESTOQUE.database;
        this.estoque$ = this.db.list(this.ref_estoque).valueChanges();

        this.estoque$.subscribe(
            val => {
                this.total_de_estoque = val.length;
                this.selected_estoque = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_financeiro(){
        // console.log("dados.observar_financeiro()");

        this.ref_financeiro = "ADMIN/" + this.config.FINANCEIRO.database;
        this.financeiro$ = this.db.list(this.ref_financeiro).valueChanges();

        this.financeiro$.subscribe(
            val => {
                this.total_de_financeiro = val.length;
                this.selected_financeiro = val.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_historicos(){
        // console.log("dados.observar_historicos()");

        this.ref_historicos = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config.HISTORICOS.database;
        this.historicos$ = this.db.list(this.ref_historicos).valueChanges();

        this.historicos$.subscribe(
            val => {
                this.total_de_historicos = val.length;
                this.selected_historicos = val.sort((a, b) => (a.criado_quando > b.criado_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_relatorios(){
        // console.log("dados.observar_relatorios()");

        this.ref_relatorios = "ADMIN/" + this.config.RELATORIOS.database;
        this.relatorios$ = this.db.list(this.ref_relatorios).valueChanges();

        this.relatorios$.subscribe(
            val => {
                this.total_de_relatorios = val.length;
                this.selected_relatorios = val.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_bancos(){
        // console.log("dados.observar_bancos()");

        this.ref_bancos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.BANCOS.database;
        this.bancos$ = this.db.list(this.ref_bancos).valueChanges();

        this.bancos$.subscribe(
            val => {
                this.total_de_bancos = val.length;
                this.selected_bancos = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }


    public observar_caixa(){
        // console.log("dados.observar_caixa()");

        this.ref_caixa = "ADMIN/" + this.config.CAIXA.database;
        this.caixa$ = this.db.list(this.ref_caixa).valueChanges();

        this.caixa$.subscribe(
            val => {
                this.total_de_caixa = val.length;
                this.selected_caixa = val.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_lancamentos_receita(){
        // console.log("dados.observar_lancamentos_receita()");

        this.ref_lancamentos_receita = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.LANCAMENTOS_RECEITA.database;
        this.lancamentos_receita$ = this.db.list(this.ref_lancamentos_receita).valueChanges();

        this.lancamentos_receita$.subscribe(
            val => {
                this.total_de_lancamentos_receita = val.length;
                this.selected_lancamentos_receita = val.sort((a, b) => (a.data_quando > b.data_quando) ? -1 : (a.data_quando === b.data_quando) ? ((a.criado_quando > b.criado_quando) ? -1 : 1) : 1 );
            }
        );
    }

    public observar_lancamentos_despesa(){
        // console.log("dados.observar_lancamentos_despesa()");

        this.ref_lancamentos_despesa = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.LANCAMENTOS_DESPESA.database;
        this.lancamentos_despesa$ = this.db.list(this.ref_lancamentos_despesa).valueChanges();

        this.lancamentos_despesa$.subscribe(
            val => {
                this.total_de_lancamentos_despesa = val.length;
                this.selected_lancamentos_despesa = val.sort((a, b) => (a.data_quando > b.data_quando) ? -1 : (a.data_quando === b.data_quando) ? ((a.criado_quando > b.criado_quando) ? -1 : 1) : 1 );
            }
        );
    }

    public observar_receitas(){
        // console.log("dados.observar_receitas()");

        this.ref_receitas = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.RECEITAS.database;
        this.receitas$ = this.db.list(this.ref_receitas).valueChanges();

        this.receitas$.subscribe(
            val => {
                this.total_de_receitas = val.length;
                this.selected_receitas = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_despesas(){
        // console.log("dados.observar_despesas()");

        this.ref_despesas = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.DESPESAS.database;
        this.despesas$ = this.db.list(this.ref_despesas).valueChanges();

        this.despesas$.subscribe(
            val => {
                this.total_de_despesas = val.length;
                this.selected_despesas = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_estornos(){
        console.log("dados.observar_estornos()");

        this.ref_estornos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ESTORNOS.database;
        this.estornos$ = this.db.list(this.ref_estornos).valueChanges();

        this.estornos$.subscribe(
            val => {
                this.total_de_estornos = val.length;
                this.selected_estornos = val.sort((a, b) => (a.criado_quando > b.criado_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_transferencias(){
        console.log("dados.observar_transferencias()");

        this.ref_transferencias = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.TRANSFERENCIAS.database;
        this.transferencias$ = this.db.list(this.ref_transferencias).valueChanges();

        this.transferencias$.subscribe(
            val => {
                this.total_de_transferencias = val.length;
                this.selected_transferencias = val.sort((a, b) => (a.criado_quando > b.criado_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_conciliacao(){
        console.log("dados.observar_conciliacao()");

        this.ref_conciliacao = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.CONCILIACAO.database;
        this.conciliacao$ = this.db.list(this.ref_conciliacao).valueChanges();

        this.conciliacao$.subscribe(
            val => {
                this.total_de_conciliacao = val.length;
                this.selected_conciliacao = val;
            }
        );
    }

    public observar_config_financeiro(){
        // console.log("dados.observar_config_financeiro()");

		this.total_de_config_financeiro = -1;
        this.ref_config_financeiro = "ADMIN/" +  this.config.CONFIG_FINANCEIRO.database;
        this.config_financeiro$ = this.db.list(this.ref_config_financeiro).valueChanges();

        this.config_financeiro$.subscribe(
            val => {
                this.total_de_config_financeiro = val.length;
				this.selected_config_financeiro = val.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }


    public observar_codigos_de_bancos(){
        console.log("dados.observar_codigos_de_bancos()");

        this.ref_codigos_de_bancos = "ADMIN/" + this.config.CODIGOS_DE_BANCOS.database;
        this.codigos_de_bancos$ = this.db.list(this.ref_codigos_de_bancos).valueChanges();

        this.codigos_de_bancos$.subscribe(
            val => {
                this.total_de_codigos_de_bancos = val.length;
                this.selected_codigos_de_bancos = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }


    public observar_todos_orcamentos(){
        console.log("dados.observar_todos_orcamentos()");

        this.ref_todos_orcamentos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ORCAMENTOS.database;
        this.todos_orcamentos$ = this.db.list(this.ref_todos_orcamentos).valueChanges();

        this.todos_orcamentos$.subscribe(
            val => {
                this.total_de_todos_orcamentos = val.length;
                this.selected_todos_orcamentos = val;
            }
        );
    }

    // public observar_orcamentos(){
    //     console.log("dados.observar_orcamentos()");
	//
    //     this.ref_orcamentos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ORCAMENTOS.database + "/" + this.cliente.key;
    //     this.orcamentos$ = this.db.list(this.ref_orcamentos).valueChanges();
	//
    //     this.orcamentos$.subscribe(
    //         val => {
    //             this.total_de_orcamentos = val.length;
    //             this.selected_orcamentos = val.sort((a, b) => (a.data > b.data) ? -1 : 1) //// sort a list of objects by a property, descending
    //         }
    //     );
    // }

    // public observar_pagamentos(){
    //     console.log("dados.observar_pagamentos()");
	//
    //     this.ref_pagamentos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.PAGAMENTOS.database + "/" + this.cliente.key + "/" + this.plano_de_tratamento.key;
    //     this.pagamentos$ = this.db.list(this.ref_pagamentos).valueChanges();
	//
    //     this.pagamentos$.subscribe(
    //         val => {
    //             this.total_de_pagamentos = val.length;
    //             this.selected_pagamentos = val.sort((a, b) => (a.pagamento > b.pagamento) ? -1 : (a.pagamento === b.pagamento) ? ((a.criado_quando > b.criado_quando) ? -1 : 1) : 1 )
    //         }
    //     );
    // }

    public observar_todos_pagamentos(){
        console.log("dados.observar_todos_pagamentos()");

        this.ref_todos_pagamentos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.PAGAMENTOS.database;
        this.todos_pagamentos$ = this.db.list(this.ref_todos_pagamentos).valueChanges();

        this.todos_pagamentos$.subscribe(
            val => {
                this.total_de_todos_pagamentos = val.length;
                this.selected_todos_pagamentos = val.sort((a, b) => (a.pagamento > b.pagamento) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

	public observar_centros_de_custos(){
        console.log("dados.observar_centros_de_custos()");

        this.ref_centros_de_custos = "ADMIN/" + this.config.CENTROS_DE_CUSTOS.database;
        this.centros_de_custos$ = this.db.list(this.ref_centros_de_custos).valueChanges();

        this.centros_de_custos$.subscribe(
            val => {
                this.total_de_centros_de_custos = val.length;
                this.selected_centros_de_custos = val.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1) //// sort a list of objects by a property, ascending
            }
        );
    }

    public observar_clientes_ultimos_visualizados(){
        // console.log("dados.observar_clientes_ultimos_visualizados)");

        this.ref_clientes_ultimos_visualizados = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ULTIMOS_CLIENTES_VISUALIZADOS.database;
        this.clientes_ultimos_visualizados$ = this.db.list(this.ref_clientes_ultimos_visualizados).valueChanges();

        this.clientes_ultimos_visualizados$.subscribe(
            val => {
                this.selected_clientes_ultimos_visualizados = val.sort((a, b) => (a.visualizado_em_quando > b.visualizado_em_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_clientes_ultimos_incluidos(){
        // console.log("observar_clientes_ultimos_incluidos()");

        this.ref_clientes_ultimos_incluidos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ULTIMOS_CLIENTES_INCLUIDOS.database;
        this.clientes_ultimos_incluidos$ = this.db.list(this.ref_clientes_ultimos_incluidos).valueChanges();

        this.clientes_ultimos_incluidos$.subscribe(
            val => {

                this.selected_clientes_ultimos_incluidos = val.sort((a, b) => (a.criado_quando > b.criado_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_fornecedores_ultimos_incluidos(){
        // console.log("dados.observar_fornecedores_ultimos_incluidos()");

		this.ref_fornecedores_ultimos_incluidos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ULTIMOS_FORNECEDORES_INCLUIDOS.database;
		this.fornecedores_ultimos_incluidos$ = this.db.list(this.ref_fornecedores_ultimos_incluidos).valueChanges();

        this.fornecedores_ultimos_incluidos$.subscribe(
            val => {
				this.selected_fornecedores_ultimos_incluidos = val.sort((a, b) => (a.visualizado_em_quando > b.visualizado_em_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }

    public observar_estoque_ultimos_incluidos(){
        // console.log("dados.observar_estoque_ultimos_incluidos()");

		this.ref_estoque_ultimos_incluidos = "LISTAS/" +  this.usuario_logado.dataset + "/" + this.config.ULTIMOS_ESTOQUE_INCLUIDOS.database;
		this.estoque_ultimos_incluidos$ = this.db.list(this.ref_estoque_ultimos_incluidos).valueChanges();

        this.estoque_ultimos_incluidos$.subscribe(
            val => {
				this.selected_estoque_ultimos_incluidos = val.sort((a, b) => (a.visualizado_em_quando > b.visualizado_em_quando) ? -1 : 1) //// sort a list of objects by a property, descending
            }
        );
    }



    public observar_registros(parametro : string = ''){
        console.log("dados.observar_registros(" + parametro + ")");

        let PARAMETRO = '';

        if(!parametro) {
            parametro = (this.PARAMETRO && this.PARAMETRO != 'HOME') ? this.PARAMETRO : '';
        }

        if (parametro){
            console.log("parametro = " + parametro);

            if (this.config[parametro].database_raiz) {
                this.ref_registros = this.config[parametro].database_raiz + "/" + this.config[parametro].database;
            }
            else {
                this.ref_registros = "LISTAS/" + this.usuario_logado.dataset + "/" + this.config[parametro].database;
            }
            this.registros$ = this.db.list(this.ref_registros).valueChanges();

            this.registros$.subscribe(
                val => {
                    this.total_de_registros = val.length;
                    this.selected_registros = val.sort((a, b) => (a.nome > b.nome) ? 1 : -1) //// sort a list of objects by a property, ascending
                }
            );
        }
    }




    // ===================
    // SALVAR
    // ===================

    public salvar_registro(parametro : string = '', temp : any = {}){
        let x, despesa_de_venda_direta;

        console.log("dados.salvar_registro");
        console.log("temp :");
        console.log(temp);

        if (parametro == '') {
            parametro = this.PARAMETRO;
        }
        if (temp == {}) {
            temp = this.util.deepClone(this.selected_edit);
        }
        if ( (!temp.nome) && ['CLIENTES','FORNECEDORES','EQUIPE','FABRICANTES'].includes(parametro) ) {
			console.log("SEM NOME preenchido automaticamente")
            temp.nome = 'SEM NOME';
        }
        if(temp.undefined) {
			// CORRIGIR CAMPO UNDEFIMED
            temp.undefined = null;
            console.log("Corrigiu campo que estava como 'undefined'");
        }
		if (temp.data){
			// Grantir que data_quando reflita a data em campos data
			temp.data_quando = this.util.converte_data_para_milisegundos(temp.data);
		}
		if(temp.alta && temp.revisao){
			// CAMPOS ADICIONAIS
			x = Number(temp.alta.substr(3,2)) + Number(temp.revisao);
			if (x > 12) {
				x = x - 12;
			}
			temp.mes_de_revisao = this.util.formata_zeros_a_esquerda(x, 2);
			// TODO  se a revisao estiver atrasada, colocar o mes atual sempre que calcular as revisoes
		}


		this.salvou_registro = true; // Considera que vai salvar o registro. Muda mais abaixo se não salvar.


        if (parametro == 'PERFIL') {
            // PERFIL

            this.selected = this.meu_perfil();

            // Registra no historico os campos que mudaram
            let modificacoes = '';
            modificacoes = this.modificacoes_no_registro();

            // salva o registro
            this.db.list(this.ref_usuarios).update(temp.key, temp);
            this.selected = this.util.deepClone(temp);

            this.historicos.database = parametro;
            this.historicos.titulo = "Editou PERFIL";
            this.historicos.modificacoes = modificacoes;

            this.historicos.registro_nome = temp.nome ? temp.nome : '';
            this.historicos.registro_key = temp.key;
        }

        else if (parametro == 'CONFIGURACAO') {
            // CONFIGURACAO

            this.selected = this.minha_configuracao();

            // Registra no historico os campos que mudaram
            let modificacoes = '';
            modificacoes = this.modificacoes_no_registro();

            // salva o registro
            console.log("Atualizando USUARIO " + temp.key + " - " + temp.nome);
            console.log(temp);
            this.db.list(this.ref_usuarios).update(temp.key, temp);

            this.usuario_logado = this.meu_perfil();

            this.selected = this.util.deepClone(temp);

            this.historicos.database = parametro;
            this.historicos.titulo = "Editou";
            this.historicos.modificacoes = modificacoes;
            this.historicos.registro_nome = temp.nome ? temp.nome : '';
            this.historicos.registro_key = temp.key;
        }

        else if (parametro == 'ATENDIMENTOS'){
            console.log("Salvando registro de ATENDIMENTO. Montando histórico");

            let incluiu_registro = false;

            // Registra no historico os campos que mudaram
            let modificacoes = '';
            modificacoes = this.modificacoes_no_registro();

            if(!temp.key) {
                // temp é o registro selecionado
                // se não existe em temp a chave (key), então não salvou ainda o objeto.
                // - cria no database uma chave para identificar esse objeto
                temp.key = this.db.list(this.ref_atendimentos).push({}).key;

                // inclui no registro o momento da criação
                temp.criado_em = this.util.quando();
                temp.criado_quando = this.util.quando_em_milisegundos();
                temp.criado_por_nome = this.usuario_logado.nome;
                temp.criado_por_key = this.usuario_logado.key;

                this.historicos.database = parametro;
                this.historicos.titulo = "Incluiu";
                this.historicos.modificacoes = modificacoes;

                this.historicos.responsavel_nome = temp.responsavel_nome ? temp.responsavel_nome : '';
                this.historicos.responsavel_key = temp.responsavel_key ? temp.responsavel_key : '';
                this.historicos.cliente_nome = temp.cliente ? temp.cliente : '';
                this.historicos.cliente_key = temp.cliente_key ? temp.cliente_key : '';

                this.historicos.registro_nome = temp.cliente ? temp.cliente : '';
                this.historicos.registro_key = temp.cliente_key ? temp.cliente_key : '';
                this.historicos.registro_obs = temp.obs ? temp.obs : '';

                incluiu_registro = true;
            }
            else{
                // se temp já tem uma chave então o registro já foi criado e salvo antes
                // inclui no registro o momento da modificação
                temp.modificado_em = this.util.quando();
                temp.modificado_quando = this.util.quando_em_milisegundos();
                temp.modificado_por_nome =  this.usuario_logado.nome;
                temp.modificado_por_key =  this.usuario_logado.key;

                this.historicos.database = parametro;
                this.historicos.titulo = "Editou";
                this.historicos.modificacoes = modificacoes;

                this.historicos.responsavel_nome = temp.responsavel_nome ? temp.responsavel_nome : '';
                this.historicos.responsavel_key = temp.responsavel_key ? temp.responsavel_key : '';
                this.historicos.cliente_nome = temp.cliente ? temp.cliente : '';
                this.historicos.cliente_key = temp.cliente_key ? temp.cliente_key : '';

                this.historicos.registro_nome = temp.cliente ? temp.cliente : '';
                this.historicos.registro_key = temp.cliente_key ? temp.cliente_key : '';
                this.historicos.registro_obs = temp.obs ? temp.obs : '';
            }

            // Registra a visualização
            temp.visualizado_em = this.util.quando();
            temp.visualizado_em_quando = this.util.quando_em_milisegundos();

            // salva o registro e o registro da visualização
            this.db.list(this.ref_atendimentos).update(temp.key, temp);
            this.selected = this.util.deepClone(temp);
            console.log("salvou em atendimentos_list");
            console.log(this.selected)
        }


        else if (['CLIENTES','USUARIOS','EQUIPE','BANCOS','ESTOQUE','FORNECEDORES','FINANCEIRO','CENTROS_DE_CUSTOS','MOVIMENTACAO','RELATORIOS','PAGAMENTOS','REL_CENTROS_DE_CUSTOS','REL_EXTRATO_DE_CONTAS','REL_CHEQUES_PRE','REL_DISPONIBILIDADE'].includes(parametro) ){

            let modificacoes = '';
            modificacoes = this.modificacoes_no_registro();

			let incluiu_registro = false;

            if(!temp.key) {
                temp.key = this.db.list(this[this.config[parametro].ref]).push({}).key;
                temp.criado_em = this.util.quando();

				this.historicos.titulo = "Incluiu";
                this.historicos.database = parametro;
                this.historicos.modificacoes = modificacoes;

                this.registro = temp;
                this.historicos.registro_nome = this.registro.nome ? this.registro.nome : '';
                this.historicos.registro_key = this.registro.key;

				if(parametro=='CLIENTES'){
					this.cliente_key = temp.key;
					this.cliente_nome = temp.nome;
					this.cliente_cpf = temp.cpf ? temp.cpf : '';
				}
				if (parametro == 'PAGAMENTOS'){
					temp.cliente_key = this.cliente.key;
					temp.cliente_nome = this.cliente.nome ? this.cliente.nome : '';
					temp.cliente_cpf = this.cliente.cpf ? this.cliente.cpf : '';
				}
				incluiu_registro = true;
            }
            else{
                temp.modificado_em = this.util.quando();

				this.historicos.titulo = "Editou";
                this.historicos.database = parametro;
                this.historicos.modificacoes = modificacoes;

                this.registro = temp;
                this.historicos.registro_nome = this.registro.nome ? this.registro.nome : '';
                this.historicos.registro_key = this.registro.key;
            }

			// Registra a visualização
			temp.visualizado_em = this.util.quando();
			temp.visualizado_em_quando = this.util.quando_em_milisegundos();

            this.db.list(this[this.config[parametro].ref]).update(temp.key, temp)
			.then(_ => console.log('SALVOU em ' + parametro + ': ' + temp.nome));

            this.selected = this.util.deepClone(temp);

			if(parametro == 'USUARIOS' && this.selected.key == this.usuario_logado.key){
				this.usuario_logado = this.selected;
			}

			// Ultimos visualizados, em CLIENTES
			if(parametro=='CLIENTES'){
				this.db.list(this.ref_clientes_ultimos_visualizados).update(this.selected.key, this.selected);
			}

			// Ultimos incluidos
			if(incluiu_registro){
				if  (['CLIENTES','ESTOQUE','FORNECEDORES'].includes(parametro) ) {
					this.db.list(this[this.config[parametro].ultimos_incluidos]).update(this.selected.key, this.selected);
				}
			}

			// Salvando outros registros RELACIONADOS
			if (parametro == 'PAGAMENTOS'){
                let valor, valor_do_tratamento, restante;
                let saldo = 0;
                for (let i in this.selected_pagamentos) {
                    valor = this.util.transforma_valor_formatado_em_numero(this.selected_pagamentos[i].valor);
                    console.log("Valor pago = " + valor);
                    saldo += valor;
                }
                console.log("Saldo dos pagamentos = " + saldo);

                this.plano_de_tratamento.saldo = this.util.formata_valor(saldo);

                // saldo = this.util.transforma_valor_formatado_em_numero(this.plano_de_tratamento.saldo);
                valor_do_tratamento = this.util.transforma_valor_formatado_em_numero(this.plano_de_tratamento.valor_do_tratamento);
                console.log("valor_do_tratamento = " + valor_do_tratamento);

                restante = this.util.formata_valor(valor_do_tratamento - saldo);
                console.log(valor_do_tratamento);
                console.log(saldo);
                console.log(restante);
                this.plano_de_tratamento.restante = restante;

                this.db.list(this.ref_orcamentos).update(this.plano_de_tratamento.key, this.plano_de_tratamento);
                console.log(this.selected_pagamentos);
                console.log(this.selected_orcamentos);

                // this.db.list(this.ref_estoque).update(temp.key, temp);
                // this.selected = this.util.deepClone(temp);
            }
        }


        else if (parametro == 'LANCAMENTOS_RECEITA' || parametro == 'LANCAMENTOS_DESPESA') {
            console.log("salvar " + parametro);
            console.log(temp);

            let modificacoes;
            modificacoes = this.modificacoes_no_registro();

            // campos de key, registro de data e autor do acesso e historico
            if(!temp.key) {
                // Novo registro

                temp.key = this.db.list(this[this.config[parametro].ref]).push({}).key;
                temp.criado_em = this.util.quando();
                temp.criado_quando = this.util.quando_em_milisegundos();
                temp.criado_por_nome = this.usuario_logado.nome;
                temp.criado_por_key = this.usuario_logado.key;

                // Registra no historico
                this.historicos.database = parametro;
                this.historicos.titulo = "Incluiu";
                this.historicos.modificacoes = modificacoes;

                this.historicos.registro_nome = temp.contraparte ? temp.contraparte : temp.nome ? temp.nome : '';
                this.historicos.valor = temp.valor ? temp.valor : '';
                this.historicos.data_lancamento = temp.data ? temp.data : '';
                this.historicos.registro_key = temp.key;
                this.historicos.centro_de_custos = temp.centro_de_custos;
                this.historicos.centro_de_custos_codigo = temp.centro_de_custos_codigo;
            }
            else{
                // Editando
                temp.modificado_em = this.util.quando();
                temp.modificado_quando = this.util.quando_em_milisegundos();
                temp.modificado_por_nome =  this.usuario_logado.nome;
                temp.modificado_por_key =  this.usuario_logado.key;

                // Registra no historico os campos que mudaram
                this.historicos.database = parametro;
                this.historicos.titulo = "Editou";
                this.historicos.modificacoes = modificacoes;

                this.historicos.registro_nome = temp.nome ? temp.nome : '';
                this.historicos.registro_key = temp.key;
                this.historicos.centro_de_custos = temp.centro_de_custos;
                this.historicos.centro_de_custos_codigo = temp.centro_de_custos_codigo;
            }

            // salva
            this.db.list(this[this.config[parametro].ref]).update(temp.key, temp);
            this.selected = this.util.deepClone(temp);

            console.log("salvou " + parametro);

            // Refaz o filtro de lancamentos de receitas e despesas
            if(parametro == 'LANCAMENTOS_RECEITA'){

                // Se foi venda, dá baixa no estoque
                if (temp.centro_de_custos == 'Venda do Estoque' && temp.produto_id){
                    console.log("Salvando VENDA com produto de estoque");
                    console.log("Registro:")
                    console.log(temp)

                    for(let i in this.selected_estoque){
                        if(this.selected_estoque[i].key == temp.produto_id){
                            console.log("Achou produto no estoque para atualizar quantidade");
                            let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                            let nova_quantidade = Number(quantidade_em_estoque) - Number(temp.quantidade);
                            this.selected_estoque[i].quantidade = nova_quantidade;

                            // Registra a visualização
                            this.selected_estoque[i].visualizado_em = this.util.quando();
                            this.selected_estoque[i].visualizado_em_quando = this.util.quando_em_milisegundos();

                            this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);
                            break;
                        }
                    }
                }

                // Se foi VENDA DIRETA, que é SEM ESTOQUE, cria lançamento de despesa relacionada à venda direta, com pagamento à futuro
                if (temp.centro_de_custos == 'Venda Direta' && temp.produto_id){
                    console.log("Salvando VENDA DIRETA");
                    console.log("Registro:")
                    console.log(temp)

                    // Aproveita o registro da receita como base
                    despesa_de_venda_direta = temp;
                    // e adapta alguns campos, como o meio de pagamento, a futuro

                    // usa a mesma chave (key) do lançamento da receita, o que facilita a identificação da correlação
                    this.db.list(this[this.config.LANCAMENTOS_DESPESA.ref]).update(temp.key, despesa_de_venda_direta);
                }

                // console.log("recalcula saldo do orcamento");
                // this.atualizar_saldos_dos_orcamentos(temp.orcamento_key);

            }

            else if(parametro == 'LANCAMENTOS_DESPESA'){

                // Se foi compra de item para estoque , lança no estoque
                if (temp.centro_de_custos == 'Estoque' && temp.produto_id){
                    for(let i in this.selected_estoque){
                        if(this.selected_estoque[i].key == temp.produto_id){
                            console.log("Achou produto no estoque para atualizar quantidade");
                            let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                            let nova_quantidade = Number(quantidade_em_estoque) + Number(temp.quantidade);
                            this.selected_estoque[i].quantidade = nova_quantidade;

                            // Registra a visualização
                            this.selected_estoque[i].visualizado_em = this.util.quando();
                            this.selected_estoque[i].visualizado_em_quando = this.util.quando_em_milisegundos();

                            this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);

                            // ESTOQUE não registra as últimas visualizações simples e operações de compra ou venda, mas apenas as inclusões
                            // this.estoque_ultimos_incluidos$.update(temp.produto_id,  this.selected_estoque[i]);
                            console.log("this.selected_estoque[i]");
                            console.log(this.selected_estoque[i]);
                            break;
                        }
                    }
                }
                // console.log("recalcula saldo do orcamento");
                // this.atualizar_saldos_dos_orcamentos(temp.orcamento_key);
            }

            console.log("Refazendo filtro de lancamentos de despesas");
            this.filterDatabase(this.selected.centro_de_custos, parametro);
        }




        else if (parametro == 'IMPRESSOS'){
            // IMPRESSOS
            if(!temp.key) {
                temp.key = this.db.list(this.ref_impressos).push({}).key;
                temp.criado_em = this.util.quando();
            }
            else{
                temp.modificado_em = this.util.quando();
            }
            this.db.list(this.ref_impressos).update(temp.key, temp);
            this.selected = this.util.deepClone(temp);
        }

    //     else if (this.config.SALVAR_REGISTRO_AUTOMATICO[parametro]){
    //         console.log("==================================");
    //         console.log("SALVAR_REGISTRO_AUTOMATICO[" + parametro + "]");
    //         console.log(temp);
    //         console.log("==================================");
    //
    //         let modificacoes;
    //         modificacoes = this.modificacoes_no_registro();
    //
    //         if(!temp.key) {
    //             // Novo registro
    //
    //             // REVER !!!  // temp.key = this[this.config.FIREBASE_LIST_OBSERVABLE[parametro]].push({}).key;
    //             // equivale a, por exemplo: temp.key = this.db.list(this.ref_anamnese).push({}).key;
    //             temp.criado_em = this.util.quando();
    //             temp.criado_quando = this.util.quando_em_milisegundos();
    //             temp.criado_por_nome = this.usuario_logado.nome;
    //             temp.criado_por_key = this.usuario_logado.key;
    //
    //             // Registra no historico
    //             this.historicos.database = parametro;
    //             this.historicos.titulo = "Incluiu";
    //             this.historicos.modificacoes = modificacoes;
    //             this.historicos.registro_nome = temp.nome ? temp.nome : '';
    //             this.historicos.registro_key = temp.key;
    //         }
    //         else{
    //             temp.modificado_em = this.util.quando();
    //             temp.modificado_quando = this.util.quando_em_milisegundos();
    //             temp.modificado_por_nome =  this.usuario_logado.nome;
    //             temp.modificado_por_key =  this.usuario_logado.key;
    //
    //             // Registra no historico os campos que mudaram
    //             this.historicos.database = parametro;
    //             this.historicos.titulo = "Editou";
    //             this.historicos.modificacoes = modificacoes;

    //             this.historicos.registro_nome = temp.nome ? temp.nome : '';
    //             this.historicos.registro_key = temp.key;
    //         }
    //
    //         // corrigir campo undefined
    //         if(temp.undefined) {
    //             temp.undefined = null;
    //             console.log("Corrigiu campo que estava como 'undefined'");
    //         }
    //
    //         // salva
    //        // REVER com db.list //  this[this.config.FIREBASE_LIST_OBSERVABLE[parametro]].update(temp.key, temp); // equivale a, por exemplo: this.db.list(this.ref_anamnese).update(temp.key, temp);
    //         this.selected = this.util.deepClone(temp);
    //     }
    //
    //     else {
    //         console.log("==================================");
    //         console.log("SALVA ATRAVES DE registros$");
    //         console.log("parametro = " + parametro);
    //         console.log(temp);
    //         console.log("==================================");
    //
    //         this.observar_registros();
    //
    //         this.historicos.nome = temp.nome ? temp.nome : '';
    //         this.historicos.key = temp.nome ? temp.nome : '';
    //
    //         let modificacoes;
    //         modificacoes = this.modificacoes_no_registro();
    //
    //         if (temp.nome){
    //             if(!temp.key) {
    //                 temp.key = this.db.list(this.ref_registros).push({}).key;
    //
    //                 temp.criado_em = this.util.quando();
    //                 temp.criado_quando = this.util.quando_em_milisegundos();
    //                 temp.criado_por_nome = this.usuario_logado.nome;
    //                 temp.criado_por_key = this.usuario_logado.key;
    //
    //                 this.registro = temp;
    //
    //                 // Registra no historico
    //                 this.historicos.database = parametro;
    //                 this.historicos.titulo = "Incluiu";
    //                 this.historicos.modificacoes = modificacoes;
    //
    //                 this.historicos.registro_nome = temp.nome ? temp.nome : '';
    //                 this.historicos.registro_key = temp.key;
    //             }
    //             else{
    //                 temp.modificado_em = this.util.quando();
    //                 temp.modificado_quando = this.util.quando_em_milisegundos();
    //                 temp.modificado_por_nome =  this.usuario_logado.nome;
    //                 temp.modificado_por_key =  this.usuario_logado.key;
    //
    //                 this.registro = temp;
    //
    //                 // Registra no historico os campos que mudaram
    //                 this.historicos.database = parametro;
    //                 this.historicos.titulo = "Editou";
    //                 this.historicos.modificacoes = modificacoes;
    //
    //                 this.historicos.registro_nome = temp.nome;
    //                 this.historicos.registro_key = temp.key;
    //             }
    //             this.db.list(this.ref_registros).update(temp.key, temp);
    //             this.selected = this.util.deepClone(temp);
    //
    //             console.log("this.db.list(this.ref_registros).update(temp.key, temp);")
    //             console.log("parametro = " + parametro);
    //             console.log(temp);
    //         }
    //     }

        if (parametro == 'ORCAMENTOS') {
            console.log("parametro = " + parametro);
            console.log("salvou ORCAMENTO");
            console.log("recalcula saldo do orcamento");
            console.log("orcamento :");
            console.log(temp);
            console.log("this.atualizar_saldos_dos_orcamentos(" + temp.key + ");");
            this.atualizar_saldos_dos_orcamentos(temp.key);
        }

        // Salvar historicos não diretos, mas nesse caso paralelamente à edição nos registros de CLIENTES.
        // Nao salvar historicos de EXAMES DENTAIS aqui porque os salvamentos são a cada dente alterado,
        // por isso salva o historico do conjunto apenas, ao sair das edicoes de EXAME DENTAL
        if (this.historicos.titulo && this.config.SALVAR_HISTORICO[parametro]){
            this.salvar_HISTORICOS(this.historicos, parametro);
        }
    }


    public salvar_HISTORICOS(historicos : any = {}, PARAMETRO : string = ''){
        console.log("salvar_HISTORICOS");
        console.log("historicos");
        console.log(historicos);

        if (!PARAMETRO) {
            PARAMETRO = this.PARAMETRO;
            console.log("PARAMETRO = " + PARAMETRO);
        }

        if(historicos.titulo){
            historicos.key = this.db.list(this.ref_historicos).push({}).key;
            historicos.criado_em = this.util.quando();
            historicos.criado_quando = this.util.quando_em_milisegundos();
            historicos.criado_por_nome = this.usuario_logado.nome;
            historicos.criado_por_key = this.usuario_logado.key;

            console.log("VAI SALVAR HISTORICO");
            this.db.list(this.ref_historicos).update(historicos.key, historicos);
            console.log("SALVOU HISTORICO");
        }
        historicos = {};
        this.historicos = {};
    }


    // ====================

    public ajustar_campos(){
        // ==========================================================
        // VARREDURA DE AJUSTE DE CAMPOS NO DATABASE
        // CODIGO UTIL PARA USO EM SITUAÇÕES SEMELHANTES DE AJUSTES
        // ==========================================================

        console.log("=================================");
        console.log("AJUSTANDO CAMPOS");
        let registro, key, valor_unitario, atendimento;
        let mudou = false;

        for(let i in this.selected_atendimentos){
            registro = this.selected_atendimentos[i];
            key = registro.key;

            if (registro.atendimento_em_aberto){
                registro.atendimento = 'aberto'
                registro.atendimento_aberto = null;
                registro.atendimento_em_aberto = null;
                registro.atendimento_em_curso = null;
                registro.atendimento_finalizado = null;
                registro.atendimento_inativo = null;

            }
            else if (registro.atendimento_em_curso){
                 registro.atendimento = 'em_curso';
                 registro.atendimento_aberto = null;
                 registro.atendimento_em_aberto = null;
                 registro.atendimento_em_curso = null;
                 registro.atendimento_finalizado = null;
                 registro.atendimento_inativo = null;

             }

            else if (registro.atendimento_finalizado){
                registro.atendimento = 'finalizado'
                registro.atendimento_aberto = null;
                registro.atendimento_em_aberto = null;
                registro.atendimento_em_curso = null;
                registro.atendimento_finalizado = null;
                registro.atendimento_inativo = null;
            }
            else if (registro.atendimento_inativo){
                registro.atendimento = 'inativo'
                registro.atendimento_aberto = null;
                registro.atendimento_em_aberto = null;
                registro.atendimento_em_curso = null;
                registro.atendimento_finalizado = null;
                registro.atendimento_inativo = null;
        }

            if(key && registro.atendimento){
                this.db.list(this.ref_atendimentos).update(key, registro)
                .then(_ => console.log('ATUALIZOU selected_atendimentos => atendimento: ' + registro.atendimento));
            }
        }

        console.log(this.selected_atendimentos);
        console.log("AJUSTOU");
        // ==========================================================
    }




    public is_marcado(key : string) : boolean {
        // let indice : number = -1;
        //
        // indice = this.selected_marcados.findIndex(function(obj){ return obj.key == key; });
        // // -1 caso não exista. Se existe retorna 0, 1, 2, 3... que é o indice, começando de zero
        // if( indice == -1 ){ return false; } else { return true; }

        return true;
    }

    public alternar(registro : any) : void {
        // this.selected = registro;
        // this.selected.checked = !this.selected.checked;
        // this.db.list(this.ref_registros).update(this.selected.key, this.selected);
    }



    public salvar_usuario_logado(salvar_apenas : boolean = false, sem_retorno : boolean = false){
        if(salvar_apenas) {
            // salvar usuario_logado apenas
        }
        else {
            // carrega os dados do arquivo de usuarios para usuario_logado
            for (let i in this.usuarios) {
                if (this.usuarios[i].key == this.usuario_logado.key){
                    this.usuarios[i].dataset = this.usuario_logado.dataset;
                    this.usuarios[i].dataset_nome = this.usuario_logado.dataset_nome;
                    // Troca nome e imagem pelos editados pelo usuário (e salvos em dados.usuarios)
                    this.usuario_logado = this.usuarios[i];
                    // this.usuario_logado.nome = this.usuarios[i].nome;
                    this.usuario_logado.img_url = this.usuarios[i].img_url ? this.usuarios[i].img_url : this.auth_object.photoURL;

                    // this.usuario_logado.dataset = this.usuarios[i].dataset;
                    // this.usuario_logado.dataset_nome = this.usuarios[i].dataset_nome;

                    this.usuario_logado.is_admin = this.usuarios[i].is_admin ? this.usuarios[i].is_admin : false;
                    this.config.is_admin = this.usuario_logado.is_admin;

                    if(this.config.is_admin){
                        console.log(" ");
                        console.log("*************************");
                        console.log("     ADMIN        ");
                        console.log("*************************");
                        console.log(" ");
                    }

                    break;
                }
                if(!this.usuario_logado.dataset){
                    this.usuario_logado.dataset = this.usuario_logado.key;
                    this.usuario_logado.dataset_nome = this.usuario_logado.nome;
                    this.usuario_logado.dataset_email = this.usuario_logado.email;
                }
                if(!this.usuario_logado.dataset_nome){
                    this.usuario_logado.dataset_nome = "";
                    this.usuario_logado.dataset_email = "";
                }
            }


        }

        this.usuario_logado.ultima_atualizacao = this.util.quando_com_segundos();  // datahora_com_segundos = dia hora segundos
        // console.log('this.usuario_logado.ultima_atualizacao = this.util.quando_com_segundos(); ');

        // SALVA O USUARIO LOGADO
        this.db.list(this.ref_usuarios).update(this.usuario_logado.key, this.usuario_logado);

        if (!sem_retorno) {
            this.observar_clientes();
        }
    }



    excluir(){
		console.log("excluir()");

		// Só pode excluir se houver a chave do registro: selected_edit.key
		if(!this.selected_edit.key || this.selected_edit.key.length<1){
			console.log("EXCLUSÃO CANCELADA: Não tem a chave do registro para excluir");
			return;
		}

        let x = '';
        console.log("selected_edit = ");
        console.log(this.selected_edit);

        if(!this.selected_edit.key || this.selected_edit.key=='' || this.selected_edit.key.length < 2){
            console.log("Tentou excluir registro inexistente");
            return;
        }

        this.historicos.database = this.PARAMETRO;
        this.historicos.titulo = "Excluiu";

        if(this.cliente && this.cliente.nome){
            this.historicos.registro_nome = this.cliente.nome;
            this.historicos.registro_key = this.cliente.key ? this.cliente.key : '';
            this.historicos.cliente_nome = this.cliente.nome;
            this.historicos.cliente_key = this.cliente.key ? this.cliente.key : '';
        }
        else if(this.registro && this.registro.nome){
            this.historicos.registro_nome = this.registro.nome ? this.registro.nome : '';
            this.historicos.registro_key = this.registro.key ? this.registro.key : '';
        }
        else {
           this.historicos.registro_nome = this.selected_edit.nome ? this.selected_edit.nome : '';
           this.historicos.registro_key = this.selected_edit.key;
        }
        console.log(this.historicos.titulo);
        if (this.PARAMETRO=="CLIENTES"){
            this.db.list(this.ref_clientes).remove(this.selected_edit.key);
            this.db.list(this.ref_clientes_ultimos_visualizados).remove(this.selected_edit.key);
            this.db.list(this.ref_clientes_ultimos_incluidos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
            // TODO --- Deve remover também os registros de exames, pagamentos, etc desse cliente!!!!
        }
        else if (this.PARAMETRO=="FORNECEDORES"){
            this.db.list(this.ref_fornecedores).remove(this.selected_edit.key);
            this.db.list(this.ref_fornecedores_ultimos_incluidos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
		else if (this.PARAMETRO=="EQUIPE"){
            this.db.list(this.ref_equipe).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="ESTOQUE"){
            this.db.list(this.ref_estoque).remove(this.selected_edit.key);
            this.db.list(this.ref_estoque_ultimos_incluidos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="PAGAMENTOS"){
            this.db.list(this.ref_pagamentos).remove(this.selected_edit.key);
            // TODO estornar o estoque?
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="USUARIOS"){
            this.db.list(this.ref_usuarios).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="ORCAMENTOS"){
            this.db.list(this.ref_orcamentos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="ATENDIMENTOS"){
            this.historicos.responsavel_nome = this.selected_edit.responsavel_nome ? this.selected_edit.responsavel_nome : '';
            this.historicos.responsavel_key = this.selected_edit.responsavel_key ? this.selected_edit.responsavel_key : '';
            this.historicos.cliente_nome = this.selected_edit.cliente ? this.selected_edit.cliente : '';
            this.historicos.cliente_key = this.selected_edit.cliente_key ? this.selected_edit.cliente_key : '';

            this.historicos.registro_nome = this.selected_edit.cliente ? this.selected_edit.cliente : '';
            this.historicos.registro_key = this.selected_edit.cliente_key ? this.selected_edit.cliente_key : '';
            this.historicos.registro_obs = this.selected_edit.obs ? this.selected_edit.obs : '';

            this.db.list(this.ref_atendimentos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="RECEITAS"){
            this.db.list(this.ref_receitas).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="DESPESAS"){
            this.db.list(this.ref_despesas).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }




        else if (this.PARAMETRO=="LANCAMENTOS_RECEITA"){
            console.log("Excluindo receita: ");

            let temp = this.selected_edit;
            let centro_de_custos = temp.centro_de_custos_codigo;

            this.historicos.registro = this.selected_edit;
            this.historicos.valor = this.historicos.registro.valor;
            this.historicos.descricao = this.historicos.registro.nome ? this.historicos.registro.nome : '';
            this.historicos.registro_nome = this.historicos.registro.contraparte;
            this.historicos.contraparte_nome = this.historicos.registro.contraparte;
            this.historicos.contraparte_key = this.historicos.registro.contraparte_key ? this.historicos.registro.contraparte_key : '';

            this.db.list(this.ref_lancamentos_receita).remove(this.selected_edit.key);
            // O bloco abaixo é apenas para garantir que o registro suma da listagem em cache que neste caso mantinha o registro na lista imediata de retorno
            for(let i in this.selected_lancamentos_receita){
                if(this.selected_lancamentos_receita[i].key == this.selected_edit.key){
                    this.selected_lancamentos_receita.splice(i,1);
                    break;
                }
            }

            // Se foi venda do centro de custos "Venda do Estoque", REPÕE (SOMA) a quantidade estornada ao estoque
            if (temp.centro_de_custos == 'Venda do Estoque' && temp.produto_id){
                for(let i in this.selected_estoque){
                    if(this.selected_estoque[i].key == temp.produto_id){
                        console.log("Achou produto no estoque para REPOR (SOMAR) a quantidade");
                        let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                        let nova_quantidade = Number(quantidade_em_estoque) + Number(temp.quantidade);
                        this.selected_estoque[i].quantidade = nova_quantidade;
                        this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);
                        break;
                    }
                }
            }

            this.salvar_HISTORICOS(this.historicos);
        }

        else if (this.PARAMETRO=="LANCAMENTOS_DESPESA"){
            console.log("Excluindo despesa: ");

            let temp = this.selected_edit;
            let centro_de_custos = temp.centro_de_custos_codigo;

            this.historicos.registro = this.selected_edit;
            this.historicos.valor = this.historicos.registro.valor;
            this.historicos.descricao = this.historicos.registro.nome ? this.historicos.registro.nome : '';
            this.historicos.registro_nome = this.historicos.registro.contraparte;
            this.historicos.contraparte_nome = this.historicos.registro.contraparte;
            this.historicos.contraparte_key = this.historicos.registro.contraparte_key ? this.historicos.registro.contraparte_key : '';

            this.db.list(this.ref_lancamentos_despesa).remove(this.selected_edit.key);
            // O bloco abaixo é apenas para garantir que o registro suma da listagem em cache que neste caso mantinha o registro na lista imediata de retorno
            for (let i in this.selected_lancamentos_despesa){
                if(this.selected_lancamentos_despesa[i].key == this.selected_edit.key){
                    this.selected_lancamentos_despesa.splice(i,1);
                    break;
                }
            }

            // Se foi compra do centro de custos "Compras para Revenda", RETIRA (SUBTRAI) a quantidade estornada ao estoque
            if (temp.centro_de_custos == 'Compras para Revenda' && temp.produto_id){
                for (let i in this.selected_estoque){
                    if(this.selected_estoque[i].key == temp.produto_id){
                        console.log("Achou produto no estoque para RETIRAR (SUBTRAIR) a quantidade");
                        let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                        let nova_quantidade = Number(quantidade_em_estoque) - Number(temp.quantidade);
                        this.selected_estoque[i].quantidade = nova_quantidade;
                        this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);
                        break;
                    }
                }
            }

            this.salvar_HISTORICOS(this.historicos);
        }

        else if (this.PARAMETRO=="ESTORNOS"){
            this.db.list(this.ref_estornos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="TRANSFERENCIAS"){
            this.db.list(this.ref_transferencias).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="CONCILIACAO"){
            this.db.list(this.ref_conciliacao).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="REL_BANCOS"){
            this.db.list(this.ref_rel_bancos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="BANCOS"){
            this.db.list(this.ref_bancos).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }
        else if (this.PARAMETRO=="CAIXA"){
            this.db.list(this.ref_caixa).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
        }

        else if (this.PARAMETRO=="HISTORICOS"){
            this.db.list(this.ref_historicos).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="IMPRESSOS"){
            this.db.list(this.ref_impressos).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="EMPRESAS"){
            this.db.list(this.ref_empresas).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="FINANCEIRO"){
            this.db.list(this.ref_financeiro).remove(this.selected_edit.key);
        }
        else if (this.PARAMETRO=="CENTROS_DE_CUSTOS"){
            this.db.list(this.ref_centros_de_custos).remove(this.selected_edit.key);
        }
        else if (this.PARAMETRO=="MOVIMENTACAO"){
            this.db.list(this.ref_movimentacao).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="RELATORIOS"){
            this.db.list(this.ref_relatorios).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="REL_CENTROS_DE_CUSTOS"){
            this.db.list(this.ref_rel_centros_de_custos).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="REL_EXTRATO_DE_CONTAS"){
            this.db.list(this.ref_rel_extrato_de_contas).remove(this.selected_edit.key);
        }

        else if (this.PARAMETRO=="REL_CHEQUES_PRE"){
            this.db.list(this.ref_rel_cheque_pre).remove(this.selected_edit.key);
        }


        else if (this.PARAMETRO=="REL_DISPONIBILIDADE"){
            this.db.list(this.ref_rel_disponibilidade).remove(this.selected_edit.key);
        }

        else {
			console.log("Excluindo de ref_registros");
            this.historicos.modificacoes = "Excluiu o registro de " + this.registro.nome;
            this.historicos.nome = this.registro.nome;
            this.db.list(this.ref_registros).remove(this.selected_edit.key);
            this.salvar_HISTORICOS(this.historicos);
            this.registro = null;
        }

        this.remover_filtros();
        this.go(this.PARAMETRO);
    }




    public estornar(){
        console.log("estornar()");

        // let temp = this.util.deepClone(this.selected_edit);
        let temp = this.selected_edit;

        console.log("temp");
        console.log(temp);

        this.historicos.database = this.PARAMETRO;
        this.historicos.titulo = "Estornou";
        this.historicos.registro = this.selected_edit;
        this.historicos.valor = this.historicos.registro.valor;
        this.historicos.descricao = this.historicos.registro.nome ? this.historicos.registro.nome : '';
        this.historicos.registro_nome = this.historicos.registro.contraparte;
        this.historicos.contraparte_nome = this.historicos.registro.contraparte;
        this.historicos.contraparte_key = this.historicos.registro.contraparte_key ? this.historicos.registro.contraparte_key : '';

        temp.estorno = "ESTORNADO";
        temp.valor_estornado = temp.valor;
        temp.valor = '';

        if (this.PARAMETRO=="LANCAMENTOS_RECEITA"){
            this.db.list(this[this.config.LANCAMENTOS_RECEITA.ref]).update(temp.key, temp);

            for (let i in this.selected_lancamentos_receita) {
                if(this.selected_lancamentos_receita[i].key == temp.key){
                    this.selected_lancamentos_receita[i] = temp;
                }
            }
            for (let i in this.filtered_lancamentos_receita) {
                if(this.filtered_lancamentos_receita[i].key == temp.key){
                    this.filtered_lancamentos_receita[i] = temp;
                }
            }

            // Se foi venda do centro de custos "Venda do Estoque", REPÕE (SOMA) a quantidade estornada ao estoque
            if (temp.centro_de_custos == 'Venda do Estoque' && temp.produto_id){
                for(let i in this.selected_estoque){
                    if(this.selected_estoque[i].key == temp.produto_id){
                        console.log("Achou produto no estoque para REPOR (SOMAR) a quantidade");
                        let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                        let nova_quantidade = Number(quantidade_em_estoque) + Number(temp.quantidade);
                        this.selected_estoque[i].quantidade = nova_quantidade;
                        this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);
                        break;
                    }
                }
            }
        }

        else if (this.PARAMETRO=="LANCAMENTOS_DESPESA"){
            this.db.list(this[this.config.LANCAMENTOS_DESPESA.ref]).update(temp.key, temp);

            for (let i in this.selected_lancamentos_despesa) {
                if(this.selected_lancamentos_despesa[i].key == temp.key){
                    this.selected_lancamentos_despesa[i] = temp;
                }
            }
            for (let i in this.filtered_lancamentos_despesa) {
                if(this.filtered_lancamentos_despesa[i].key == temp.key){
                    this.filtered_lancamentos_despesa[i] = temp;
                }
            }

            // Se foi compra do centro de custos "Compras para Revenda", RETIRA (SUBTRAI) a quantidade estornada ao estoque
            if (temp.centro_de_custos == 'Compras para Revenda' && temp.produto_id){
                for(let i in this.selected_estoque){
                    if(this.selected_estoque[i].key == temp.produto_id){
                        console.log("Achou produto no estoque para RETIRAR (SUBTRAIR) a quantidade");
                        let quantidade_em_estoque = this.selected_estoque[i].quantidade;
                        let nova_quantidade = Number(quantidade_em_estoque) - Number(temp.quantidade);
                        this.selected_estoque[i].quantidade = nova_quantidade;
                        this.db.list(this[this.config.ESTOQUE.ref]).update(temp.produto_id, this.selected_estoque[i]);
                        break;
                    }
                }
            }
        }

        this.salvar_HISTORICOS(this.historicos);

        // Popup de aviso
        // this.aviso_titulo = "ESTORNO";
        // this.aviso_mensagem = "ESTORNO REALIZADO";
        // this.popup_de_aviso = true;
    }




    public minha_configuracao() {
        this.selected = {};

        for (let i in this.usuarios){

            if (this.usuarios[i].key == this.auth_object.uid) {
                this.usuario = this.usuarios[i];
                this.usuario_logado = this.usuarios[i];
                break;
            }
        }

        this.selected = this.util.deepClone(this.usuario);

        if (this.selected.is_admin || this.selected.email == 'julioventura@gmail.com'){
            this.selected.is_admin = true;
            this.config.is_admin = true;
        }
        return this.selected;
    }


    public modificacoes_no_registro() : string {
        console.log("modificacoes_no_registro");

        let key, i, antes, depois, incluindo;
        let modificacoes = '';

        // console.log(this.selected_edit);

        for (key of Object.keys(this.selected_edit)) {
            if (this.selected_edit[key] != this.selected[key]){
                if(!this.selected_edit.key){
                    // incluindo um registro novo
                    incluindo = true;
                    console.log("Incluiu " + key);
                }
                else {
                    // editando um registro pré-existente
                    incluindo = false;
                    console.log("Editou " + key);
                }

                if (key=='key'){} // ignorar
                else if (Number(key)==0){} // ignorar
                else if (key=='criado_em'){} // ignorar
                else if (key=='criado_quando'){} // ignorar
                else if (key=='data_quando'){} // ignorar
                else if (key=='data_hora_quando'){} // ignorar
                else if (key=='pagamento_quando'){} // ignorar

                else if (key=='criado_por_nome'){} // ignorar
                else if (key=='criado_por_key'){} // ignorar

                else if (key=='modificado_em'){} // ignorar
                else if (key=='modificado_quando'){} // ignorar
                else if (key=='modificado_por_key'){} // ignorar
                else if (key=='modificado_por_nome'){} // ignorar

                else if (key=='data_quando'){} // ignorar
                else if (key=='mes_de_revisao'){} // ignorar
                else if (key=='retornar'){} // ignorar

                else if (key=='associado_nome'){} // ignorar
                else if (key=='associado_key'){} // ignorar
                else if (key=='associado_cpf'){} // ignorar

                else if (key=='cliente_nome'){} // ignorar
                else if (key=='cliente_key'){} // ignorar
                else if (key=='cliente_cpf'){} // ignorar

                else if (key=='responsavel_key'){} // ignorar
                else if (key=='responsavel_key'){} // ignorar
                else if (key=='registro_key'){} // ignorar

                else if (key=='centro_de_custos'){} // ignorar
                else if (key=='centro_de_custos_codigo'){} // ignorar

                else if (key=='undefined'){} // ignorar
                else {
                    antes = this.selected[key];
                    depois = this.selected_edit[key];

                    if(antes === true){
                        antes='ATIVADO'
                    }
                    if(antes === false){
                        antes='DESATIVADO'
                    }
                    if(!antes || antes==undefined || antes==null || antes==''){
                        antes='(vazio)'
                    }

                    if(depois === true){
                        depois='ATIVADO'
                    }
                    if(depois === false){
                        depois='DESATIVADO'
                    }
                    if(!depois || depois==undefined || depois==null || depois==''){
                        depois='(vazio)'
                    }

                    if (antes!=depois){
                        if(antes=='(vazio)' && depois=='DESATIVADO'){
                            // é a mesma situação, só que antes provavelmente undefined e depois false, que virou DESATIVADO, então ignora
                        }
                        else {
                            if(incluindo){
                                // registro novo
                                modificacoes += this.util.capitalizar(key) + ": " +  depois + '\n';
                            }
                            else {
                                // edição de um registro pré-existente
                                modificacoes += this.util.capitalizar(key) + ": " +  antes + " => " + depois + '\n';
                            }
                        }
                    }
                }
            }
        }
        return modificacoes;
    }


    public atualizar_saldos_dos_orcamentos(orcamento_para_atualizar : string){
        console.log("\n\n\n\n\n******************************");
        console.log("ATUALIZANDO SALDO DOS ORCAMENTOS");
        console.log("orcamento_para_atualizar = " + orcamento_para_atualizar);

        let lancamento, valor;
        let orcamento, valor_do_tratamento, restante;
        let saldo = 0;
        this.conjunto_de_orcamentos = {};

        // Le os lancamentos para esse orcamento
        console.log("this.selected_lancamentos_receita");
        console.log(this.selected_lancamentos_receita);

        for(let i in this.selected_lancamentos_receita){
            lancamento = this.selected_lancamentos_receita[i];

            if (lancamento.orcamento_key == orcamento_para_atualizar) {
                console.log("Achou um lançamento do orçamento buscado: " + orcamento_para_atualizar);
                console.log(lancamento);
                valor =  this.util.converte_valores_formatados_para_numero(lancamento.valor);
                saldo = saldo + valor;
                console.log("valor = " + valor);
                console.log("saldo = " + saldo);
            }
        }

        // Le o orcamento e atualiza seu saldo com o dos lancamentos revisados acima
        for (let x in this.selected_orcamentos){
            console.log(x);
            console.log(this.selected_orcamentos[x]);

            if(this.selected_orcamentos[x].key == orcamento_para_atualizar){
                console.log("Achou o orçamento buscado: " + orcamento_para_atualizar);
                orcamento =  this.selected_orcamentos[x];
                console.log(orcamento);

                valor_do_tratamento =  this.util.converte_valores_formatados_para_numero(orcamento.valor_do_tratamento);

                orcamento.saldo = this.util.formata_valor(saldo);
                orcamento.restante = this.util.formata_valor(valor_do_tratamento - saldo);

                console.log("orcamento.restante = " + orcamento.restante);
                console.log("orcamento.key = " + orcamento.key);
                console.log("orcamento :" );
                console.log(orcamento);

                this.selected_orcamentos[x] = orcamento;
                if(this.PARAMETRO == 'ORCAMENTOS'){
                    this.db.list(this.ref_orcamentos).update(orcamento.key, orcamento);
                    this.selected = orcamento;
                }
                else {
                    this.db.list(this.ref_todos_orcamentos+'/'+orcamento.cliente_key).update(orcamento.key, orcamento);
                }
            }
        }
    }

    public home(){
        if(this.voltar_para){
            this.selected_origem = {};
            this.voltar_para = '';
            this.origem = '';
        }

        this.remover_filtros();
        this.config.DISPLAY.Lista = false;
        this.config.DISPLAY.Registro = false;
        this.config.DISPLAY.Home = true;
    }



    // ====================


    //  AUTHENTICATION

    public subscribe_auth() {
        this.auth.user.subscribe(
            val => {
                if(val) {
                    this.auth_object = val;
                    if(!this.usuario_logado){
                        this.usuario_logado = {};
                    }
                    this.usuario_logado.nome = this.auth_object.displayName;
                    this.usuario_logado.email = this.auth_object.email;
                    this.usuario_logado.img_url = this.auth_object.photoURL;
                    this.usuario_logado.key = this.auth_object.uid;
                    this.usuario_logado.providerId = this.auth_object.providerId;

                    this.usuario_logado.dataset = this.auth_object.uid;
                    this.usuario_logado.dataset_nome = this.auth_object.displayName;
                    this.usuario_logado.dataset_email = this.auth_object.email;

                    console.log("==========================");
                    console.log("this.usuario_logado");
                    console.log("==========================");
                    console.log(this.usuario_logado);
                    console.log(this.auth_object.displayName);
                    console.log(this.auth_object.email);
                    console.log(this.auth_object.photoURL);
                    console.log(this.auth_object.uid);
                    console.log(this.auth_object.providerId);
                    console.log("==========================");

                    this.observar_usuarios();



                    this.observar_clientes();
					this.observar_fornecedores();
                    this.observar_equipe();
                    this.observar_atendimentos();
                    this.observar_estoque();
                    this.observar_financeiro();
                    this.observar_historicos();
                    this.observar_relatorios();
                    this.observar_bancos();
                    this.observar_caixa();

                    this.observar_lancamentos_receita();
                    this.observar_lancamentos_despesa();
                    this.observar_receitas();
                    this.observar_despesas();

                    this.observar_clientes_ultimos_visualizados();
                    this.observar_clientes_ultimos_incluidos();
					this.observar_fornecedores_ultimos_incluidos();
					this.observar_estoque_ultimos_incluidos();

					this.observar_config_financeiro();
					this.observar_codigos_de_bancos();
					this.observar_centros_de_custos();


					// this.observar_todos_orcamentos();
					// this.observar_todos_pagamentos();

					// this.observar_estornos();
					// this.observar_transferencias();
					// this.observar_conciliacao();

					// this.observar_orcamentos();
					// this.observar_pagamentos();


                    this.go('HOME');
                }
                else {
                    // this.auth_object = null;
                }
            }
        );
    }


}
