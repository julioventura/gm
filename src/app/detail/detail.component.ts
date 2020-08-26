import { Component, OnInit } from '@angular/core';

// FIRESTORE
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {Observable} from 'rxjs';

import { ConfigService } from '../config/config.service';
import { UtilService } from '../util/util.service';
import { DadosService } from '../dados/dados.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

    constructor(
        public config: ConfigService,
        public util: UtilService,
        public dados: DadosService,
        private afStorage: AngularFireStorage
    ) { }


	public PARAMETRO : string;
	public parametro : string;

 	public imagem_normal : boolean = true;
    public imagem_maior1 : boolean = false;
    public imagem_maior2 : boolean = false;

    public ativo : boolean = true;
    public label_nome : string = '';
    public label_obs : string = '';
    public label_criado_em : string = '';
    public label_criado_por_nome : string = '';
    public substituto_url_site : string = '';

    public mensagem : string = '';
    public mensagem_encoded : string = '';
    public compor_mensagem : boolean = false;
    public url : string = '';
    public url_web : string = '';
    public confirmar_que_enviou_mensagem : boolean = false;

    public button1 : string = '';
    public button2 : string = '';
    public button3 : string = '';
    public button4 : string = '';
    public button5 : string = '';
    public button6 : string = '';
    public button7 : string = '';
    public button8 : string = '';

    public popup_de_aviso : boolean = false;
    public aviso_titulo : string = "";
    public aviso_mensagem : string = "";


    // popup de alerta
    public popupConfirmar : boolean = false;
    public alerta_titulo : string = '';
    public alerta_linha1 : string = '';
    public alerta_linha2 : string = '';

    public orcamentos : any = {};
    public lancamentos_receita_do_orcamento : any = [];

    // public map : any;
    public mapa_url : string = '';

    public tipo_da_imagem1 : string = '';
    public tipo_da_imagem2 : string = '';

    public remetente : any  = {};


    // FIRESTORE
    downloadURLfirestore1: Observable<string>;
    downloadURLfirestore2: Observable<string>;
    filePath : string = '';


    ngOnInit(){
        console.log("\n\nINIT detail");
        console.log(this.dados.PARAMETRO);
        console.log("===========================");
        console.log("this.dados.voltar_pilha");
        console.log(this.dados.voltar_pilha);
        console.log("===========================");

        // ETIQUETA AVULSA
        this.dados.posicao_etiqueta = 1;
        this.posicao_etiqueta();
        this.dados.mostrar_destinatario = true;
        this.remetente = this.config.REMETENTE;

        // Download de imagens do Firestore
        this.download_imagem_do_firestore(1);
        this.download_imagem_do_firestore(2);


        if(!this.dados.selected || (this.dados.selected == {}) ){
            console.log("sem selected")
            this.config.DISPLAY.Home = true;
            this.config.DISPLAY.Registro = false;
            return;
        }
        if( !this.dados.PARAMETRO || (this.dados.PARAMETRO == undefined)){
            console.log("sem PARAMETRO")
            this.config.DISPLAY.Home = true;
            this.config.DISPLAY.Registro = false;
            return;
        }

        if( ['EQUIPE'].includes(this.dados.PARAMETRO) ){
            this.mapa_url = "https://www.google.com/maps/search/" + this.dados.selected.latitude + "," + this.dados.selected.longitude;
        }


        this.dados.HOJE = this.util.hoje();
        this.dados.HOJE_QUANDO = this.util.converte_data_para_milisegundos(this.dados.HOJE);

        this.dados.mostrar_estoque_clientes_flag = false;
        this.dados.mostrar_estoque_fornecedores_flag = false;
        this.dados.mostrar_estoque_compras_flag = false;
        this.dados.mostrar_estoque_vendas_flag = false;


        this.dados.registro = this.dados.selected;


        if(this.dados.selected.nome){
            console.log("nome = " + this.dados.selected.nome);
        }
        console.log("key = " + this.dados.selected.key);
        if(this.dados.selected.cliente_nome){
            console.log("Cliente = " + this.dados.selected.cliente_nome);
        }
        if(this.dados.selected.cliente_key){
            console.log("Cliente key = " + this.dados.selected.cliente_key);
        }
        console.log("this.dados.selected");
        console.log(this.dados.selected);

        this.dados.incluindo = false;
        console.log(this.config[this.dados.PARAMETRO]);

        if(this.config[this.dados.PARAMETRO]){
            if(this.config[this.dados.PARAMETRO].pode_editar){
                this.dados.pode_editar = true;
            }
            else {
                this.dados.pode_editar = false;
            }
        }
        else {
            return;
        }

        if (this.dados.selected.fixo){
            this.dados.pode_editar = false;
        }

        this.dados.mostrar_lista_de_orcamentos = true;

        // o registro em dados.selected pode ser visualizado em tempo real (assincrono de um observable object dados.registro
        // ===> usar "(dados.registro | async)?" no template html...
        // ou na forma de uma cópia instantânea (snapshot), não mutável em tempo real.
        // ===> usar a variavel "dados.selected" no template html...

        this.label_nome = this.config[this.dados.PARAMETRO].label_nome ? this.config[this.dados.PARAMETRO].label_nome : "Nome";
        this.label_obs = this.config[this.dados.PARAMETRO].label_obs ? this.config[this.dados.PARAMETRO].label_obs : "Obs";
        this.label_criado_em = this.config[this.dados.PARAMETRO].label_criado_em ? this.config[this.dados.PARAMETRO].label_criado_em : "Quando";
        this.label_criado_por_nome = this.config[this.dados.PARAMETRO].label_criado_por_nome ? this.config[this.dados.PARAMETRO].label_criado_por_nome : "Por quem";

        this.substituto_url_site = this.config[this.dados.PARAMETRO].substituto_url_site ? this.config[this.dados.PARAMETRO].substituto_url_site : 'CLIQUE PARA VER NA WEB';

        if(this.dados.PARAMETRO == 'PERFIL'){
            this.config.is_admin = this.dados.selected.is_admin;

            if(this.config.is_admin){
                console.log(" ");
                console.log("*************************");
                console.log("     ADMIN        ");
                console.log("*************************");
                console.log(" ");
            }
        }

        if(this.dados.PARAMETRO == 'ATENDIMENTOS'){
            console.log("Avaliar atendimentos com this.avalia_atendimentos()");
            console.log(this.dados.selected)
            this.avalia_atendimentos();
        }

        if(this.dados.PARAMETRO == 'FORNECEDORES'){
            this.dados.origem = 'FORNECEDORES';
            this.dados.fornecedor = this.dados.selected;
            this.dados.filterDatabase(this.dados.selected.key,'LANCAMENTOS_DESPESA');
        }

        if(this.dados.PARAMETRO == 'EQUIPE'){
            this.dados.origem = 'EQUIPE';
            this.dados.responsavel = this.dados.selected;
            this.dados.filterDatabase(this.dados.selected.key,'ATENDIMENTOS');
        }

        if(this.dados.PARAMETRO == 'CLIENTES'){
            this.dados.origem = 'CLIENTES';
            this.dados.cliente = this.dados.selected;

            this.dados.filterDatabase(this.dados.selected.key,'LANCAMENTOS_RECEITA');
            console.log("this.dados.filtered_lancamentos_receita")
            console.log(this.dados.filtered_lancamentos_receita)

            this.dados.filterDatabase(this.dados.selected.key,'ATENDIMENTOS');
            console.log("this.dados.filtered_atendimentos")
            console.log(this.dados.filtered_atendimentos)
        }

        if(this.dados.PARAMETRO == 'SOCIOS'){
            this.dados.origem = 'SOCIOS';
            this.dados.socio = this.dados.selected;

            this.dados.filterDatabase(this.dados.selected.key,'LANCAMENTOS_RECEITA');
            console.log("this.dados.filtered_lancamentos_receita")
            console.log(this.dados.filtered_lancamentos_receita)

            this.dados.filterDatabase(this.dados.selected.key,'ATENDIMENTOS');
            console.log("this.dados.filtered_atendimentos")
            console.log(this.dados.filtered_atendimentos)
        }


                // // =======================================================
                // //function that gets the location and returns it
                // var marcalocal = this.dados.selected.latitude + "," + this.dados.selected.longitude;
                // var bbox1 = (this.dados.selected.longitude + 0.1) + "," + (this.dados.selected.latitude + 0.1);
                // var bbox2 = (this.dados.selected.longitude - 0.1) + "," + (this.dados.selected.latitude  - 0.1);
                // function getLocation() {
                //   if(navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(showPosition);
                //   } else {
                //     console.log("Geo Location not supported by browser");
                //   }
                // }
                // //function that retrieves the position
                // function showPosition(position) {
                //   var location = {
                //     longitude: position.coords.longitude,
                //     latitude: position.coords.latitude
                //   }
                //   console.log(location)
                //
                //   var html = "<iframe frameborder='0' height='350' marginheight='0' ";
                //   html += "marginwidth='0' scrolling='no' width='425' ";
                //
                //   html += "src='//www.openstreetmap.org/export/embed.html?";
                //
                //   html += "bbox=";
                //   html += bbox1;
                //   // html += latlon;
                //   html += ",";
                //   html += bbox2;
                //   // html += latlon;
                //
                //   html += "&amp;marker=";
                //   // html += "marker=";
                //   // html += "-23.009133199999997,-43.3443513";
                //   html += marcalocal;
                //
                //   // html += latlon;
                //   html += "&amp;layer=mapnik'>";
                //   html += "</iframe>";
                // }
                //
                // //request for location
                // getLocation();
                // // =======================================================


        this.util.goTop();

        this.mostrar_tela();
    }


    public mostrar_tela() {

        if (this.dados.PARAMETRO == "LANCAMENTOS_RECEITA"
        || this.dados.PARAMETRO == "LANCAMENTOS_DESPESA"
        || this.dados.PARAMETRO == "ESTOQUE"
        || this.dados.PARAMETRO == "PRODUCAO_PROFISSIONAL"
        || this.dados.PARAMETRO == "REL_DEBITO"
        || this.dados.PARAMETRO == "REL_CREDITO"
        || this.dados.PARAMETRO == "REL_DINHEIRO"
        || this.dados.PARAMETRO == "REL_CHEQUES_PRE"
        || this.dados.PARAMETRO == "REL_CHEQUES_A_VISTA"
        || this.dados.PARAMETRO == "RESULTADOS"
        || this.dados.PARAMETRO == "DISPONIBILIDADE"
        || this.dados.PARAMETRO == "REL_RECEITAS_E_DESPESAS"){
            this.button1 = 'button_off';
            this.button2 = 'button_off';
            this.button3 = 'button_off';
            this.button4 = 'button_off';
            this.button5 = 'button_off';
            this.button6 = 'button_off';
            this.button7 = 'button_off';
            this.button8 = 'button_off';

            if(this.dados.selected.meio_de_pagamento == 'dinheiro'){ this.button1 = 'button_brown'; }
            if(this.dados.selected.meio_de_pagamento == 'cheque'){ this.button2 = 'button_brown'; }
            if(this.dados.selected.meio_de_pagamento == 'cheque_pre'){ this.button3 = 'button_brown'; }
            if(this.dados.selected.meio_de_pagamento == 'debito'){ this.button4 = 'button_brown'; }
            if(this.dados.selected.meio_de_pagamento == 'credito'){ this.button5 = 'button_brown'; }

            if(this.dados.selected.estorno) {
				// this.dados.pode_editar = false;
                // Popup de aviso
                this.aviso_titulo = "REGISTRO ESTORNADO";
                // this.aviso_mensagem = "Não é permitido editar registros estornados.";
                this.popup_de_aviso = true;
                return;
            }
        }


        if (this.dados.PARAMETRO == "REL_DINHEIRO"
        || this.dados.PARAMETRO == "REL_CHEQUES_PRE"
        || this.dados.PARAMETRO == "REL_CHEQUES_A_VISTA"){
            this.dados.set_titulo_barra();
        }
        else if(this.dados.PARAMETRO == 'RESULTADOS'){
            this.dados.set_titulo_pagina('LANÇAMENTO');
        }
        else if(this.dados.PARAMETRO == 'HISTORICO'){
            this.dados.set_titulo_barra(this.dados.selected.criado_em);
        }
        else if (this.dados.selected.nome){
            this.dados.set_titulo_barra(this.dados.selected.nome);
        }
        else if(this.dados.selected.cliente_nome){
            this.dados.set_titulo_barra(this.dados.selected.cliente_nome);
        }
        else if(this.dados.selected.socio_nome){
            this.dados.set_titulo_barra(this.dados.selected.socio_nome);
        }


        // MENSAGEM
        this.mensagem = "Olá " + this.dados.selected.nome + "\n\n\n\n\n";
        this.mensagem += this.dados.usuario_logado.nome;
        if (this.dados.usuario_logado.titulo_profissional){
            this.mensagem += " \n" + this.dados.usuario_logado.titulo_profissional;
        }
        this.mensagem += " \ne equipe";


        if (this.config[this.dados.PARAMETRO].checaratividade){
            if (this.dados.selected.ativo) {
                this.ativo = true;
            }
            else {
                this.ativo = false;
            }
        }
        else {
            this.ativo = true;
        }

        console.log("this.dados.selected");
        console.log(this.dados.selected);

        if(this.dados.selected.img_url){
            this.dados.selected.img_url = this.util.formata_url_com_protocolo(this.dados.selected.img_url);
        }
        if(this.dados.selected.img_url2){
            this.dados.selected.img_url2 = this.util.formata_url_com_protocolo(this.dados.selected.img_url2);
        }

        this.util.goTop();  // sobe a tela pro topo
    }

    public verRegistro(registro : any, parametro : string = '') : void {
        console.log("verRegistro(registro)");

        this.dados.selected_origem = this.dados.selected;
        this.dados.selected = registro;
        console.log("Novo this.dados.selected é igual ao registro em VerRegistro");
        console.log(this.dados.selected);

        this.dados.origem = this.dados.PARAMETRO;
        this.dados.voltar_para = this.dados.PARAMETRO;


        // Mostra o novo registro.

        if(parametro){
            this.dados.PARAMETRO = parametro;
            this.config.DISPLAY.Registro = true;
        }
        else {
            if(this.dados.PARAMETRO == 'CLIENTES'){
                this.dados.PARAMETRO = 'LANCAMENTOS_RECEITA';
                this.config.DISPLAY.Registro = true;
            }
            if(this.dados.PARAMETRO == 'SOCIOS'){
                this.dados.PARAMETRO = 'LANCAMENTOS_RECEITA';
                this.config.DISPLAY.Registro = true;
            }

            else if(this.dados.PARAMETRO == 'FORNECEDORES'){
                this.dados.PARAMETRO = 'LANCAMENTOS_DESPESA';
                this.config.DISPLAY.Registro = true;
            }

            else if(this.dados.PARAMETRO == 'ESTOQUE'){
                if(this.dados.mostrar_estoque_clientes_flag){
                    this.dados.PARAMETRO = 'CLIENTES';
                    this.config.DISPLAY.Registro = true;
                }
                else if(this.dados.mostrar_estoque_vendas_flag){
                    this.dados.PARAMETRO = 'LANCAMENTOS_RECEITA';
                    this.config.DISPLAY.Registro = true;
                }
                else if(this.dados.mostrar_estoque_fornecedores_flag){
                    this.dados.PARAMETRO = 'FORNECEDORES';
                    this.config.DISPLAY.Registro = true;
                }
                else if(this.dados.mostrar_estoque_compras_flag){
                    this.dados.PARAMETRO = 'LANCAMENTOS_DESPESA';
                    this.config.DISPLAY.Registro = true;
                }
            }

            else if(this.dados.PARAMETRO == 'EQUIPE'){
                this.dados.PARAMETRO = 'ATENDIMENTOS';
                this.dados.set_titulo_pagina("Atendimento");
                this.config.DISPLAY.Registro = true;
            }
        }


        this.mostrar_tela();
    }


        public etiqueta_avulsa(){
            console.log("etiqueta_avulsa()");

            this.dados.imprimir_etiquetas = ! this.dados.imprimir_etiquetas;

            // let mensagem = 'Imprimir etiqueta avulsa?';
            // let cabecalho = 'ETIQUETA';
            //
            // this.confirmationService.confirm({
            //     message: mensagem,
            //     header: cabecalho,
            //     acceptLabel: 'Sim',
            //     rejectLabel: 'Não',
            //     rejectVisible: true,
            //
            //     accept: () => {
            //         this.dados.imprimir_etiquetas = true;
            //         return true;
            //     },
            //     reject: () => {
            //         this.dados.imprimir_etiquetas = false;
            //         return true;
            //     }
            // });
        }

        public imprimir(){
            console.log("imprimir()");
            window.print();
        }

        public muda_posicao(sentido : string){
            if(sentido=='-'){
                this.dados.posicao_etiqueta--;
            }
            else if(sentido=='+'){
                this.dados.posicao_etiqueta++;
            }
            if(this.dados.posicao_etiqueta > 20){
                this.dados.posicao_etiqueta = 20;
            }
            if(this.dados.posicao_etiqueta <= 0){
                this.dados.posicao_etiqueta = 1;
            }
            this.posicao_etiqueta();
        }

        public posicao_etiqueta(){
            if(this.dados.posicao_etiqueta > 20){
                this.dados.posicao_etiqueta = 20;
            }
            if(this.dados.posicao_etiqueta <= 0){
                this.dados.posicao_etiqueta = 1;
            }

            let x = {
                nome : '',
                endereco : '',
                bairro : '',
                cidade : '',
                estado : '',
                cep : ''
            };

            for (let i=1; i<=20; i++){

                if (i == this.dados.posicao_etiqueta){
                    this.dados.vinte_etiquetas[i-1] = this.dados.selected;
                    this.dados.vinte_etiquetas_remetente[i-1] = this.remetente;
                }
                else {
                    this.dados.vinte_etiquetas[i-1] = x;
                    this.dados.vinte_etiquetas_remetente[i-1] = x;
                }
            }
        }

        public is_destinatario(status : boolean){
            this.dados.mostrar_destinatario = status;
            this.posicao_etiqueta();
        }


    //
    // public clientes_ficha() {
    //     this.dados.is_clientes_ficha = !this.dados.is_clientes_ficha;
    //
    //     if(this.dados.is_clientes_ficha){
    //         this.dados.is_clientes_ficha = true;
    //         this.dados.is_clientes_atendimentos = false;
    //         this.dados.is_clientes_receitas = false;
    //     }
	// 	this.dados.filtro = '';
    //     this.dados.filterDatabase(' ','CLIENTES');
    // }
    //
    // public clientes_atendimentos() {
    //     this.dados.is_clientes_atendimentos = !this.dados.is_clientes_atendimentos;
    //
    //     if(this.dados.is_clientes_atendimentos){
    //         this.dados.is_clientes_ficha = false;
    //         this.dados.is_clientes_atendimentos = true;
    //         this.dados.is_clientes_receitas = false;
    //     }
	// 	this.dados.filtro = '';
    //     this.dados.filterDatabase(' ','CLIENTES');
    // }
    //
    // public clientes_receitas() {
    //         this.dados.is_clientes_receitas = !this.dados.is_clientes_receitas;
    //
    //         if(this.dados.is_clientes_receitas){
    //             this.dados.is_clientes_ficha = false;
    //             this.dados.is_clientes_atendimentos = false;
    //             this.dados.is_clientes_receitas = true;
    //         }
    // 		this.dados.filtro = '';
    //         this.dados.filterDatabase(' ','CLIENTES');
    //     }
    //


    public avalia_atendimentos(){
        console.log("Avaliando atendimentos com this.avalia_atendimentos()");

        if(this.dados.PARAMETRO=='ATENDIMENTOS'){
            let status = 'inativo';
            console.log("status = " + status);


            if(this.dados.selected.data && this.dados.selected.data.length>0){
                status = 'aberto';

                if(this.dados.selected.data_inicio && this.dados.selected.data_inicio.length>0 && this.dados.selected.hora_inicio && this.dados.selected.hora_inicio.length == 5){
                    status = 'em_curso';

                    if(this.dados.selected.data_termino &&this.dados.selected.data_termino.length>0 && this.dados.selected.hora_termino && this.dados.selected.hora_termino.length == 5){
                        status = 'finalizado';
                    }
                }
            }

            this.dados.selected.atendimento_inativo = false;
            this.dados.selected.atendimento_aberto = false;
            this.dados.selected.atendimento_em_curso = false;
            this.dados.selected.atendimento_finalizado = false;

            console.log("status = (" + status + ")");

            if(status=='inativo'){
                this.dados.selected.atendimento_inativo = true;
            }
            else if(status=='aberto'){
                this.dados.selected.atendimento_aberto = true;
            }
            else if(status=='em_curso'){
                this.dados.selected.atendimento_em_curso = true;
            }
            else if(status=='finalizado'){
                this.dados.selected.atendimento_finalizado = true;
            }

            console.log(this.dados.selected)
        }
    }



    public atendimento(status){
        if(status=='inativo'){
            this.dados.atendimento_inativo = !this.dados.atendimento_inativo;
        }
        else if(status=='aberto'){
            this.dados.atendimento_aberto = !this.dados.atendimento_aberto;
        }
        else if(status=='em_curso'){
            this.dados.atendimento_em_curso = !this.dados.atendimento_em_curso;
        }
        else if(status=='finalizado'){
            this.dados.atendimento_finalizado = !this.dados.atendimento_finalizado;
        }
    }


    public mensagem_whatsapp(){
        console.log('mensagem_whatsapp')
        console.log('PARAMETRO = ' + this.dados.PARAMETRO)
        this.dados.whatsapp_destino = this.dados.PARAMETRO;
        console.log('whatsapp_destino = ' + this.dados.whatsapp_destino)


        this.dados.PopupWhatsappTitulo = 'Mensagem por Whatsapp';

        this.mensagem_encoded = this.util.url_encode(this.mensagem);

        this.url = "https://api.whatsapp.com/send?phone=" + this.util.formata_whatsapp_para_envio(this.dados.selected.whatsapp);
        this.url_web = "https://web.whatsapp.com/send?phone=" + this.util.formata_whatsapp_para_envio(this.dados.selected.whatsapp);

        this.url += "&text=" + this.mensagem_encoded;
        this.url_web  += "&text=" + this.mensagem_encoded;

        this.compor_mensagem = false;
        this.config.DISPLAY.PopupWhatsapp = true;
    }

    public Popup_de_confirmacao_de_envio_do_Whatsapp(){
        this.config.DISPLAY.PopupWhatsapp=false;
        this.confirmar_que_enviou_mensagem = true;
    }

    public ConfirmouWhatsapp(confirmado : boolean = false){
        this.confirmar_que_enviou_mensagem = false;
        if (confirmado){
            // registra no historico

            this.dados.historicos.database = this.dados.PARAMETRO;
            this.dados.historicos.titulo = "Mensagem";
            this.dados.historicos.mensagem = true;
            this.dados.historicos.whatsapp = this.dados.selected.whatsapp;
            this.dados.historicos.modificacoes = this.mensagem;

            console.log('whatsapp_destino = ' + this.dados.whatsapp_destino)

            if(this.dados.whatsapp_destino=='CLIENTES'){
                this.dados.historicos.destinatario_nome = this.dados.cliente && this.dados.cliente.nome ? this.dados.cliente.nome : '';
                this.dados.historicos.destinatario_key = this.dados.cliente && this.dados.cliente.key ? this.dados.cliente.key : '';
                this.dados.historicos.registro_nome = this.dados.cliente && this.dados.cliente.nome ? this.dados.cliente.nome : '';
                this.dados.historicos.registro_key = this.dados.cliente && this.dados.cliente.key ? this.dados.cliente.key : '';
            }
            if(this.dados.whatsapp_destino=='SOCIOS'){
                this.dados.historicos.destinatario_nome = this.dados.socio && this.dados.socio.nome ? this.dados.socio.nome : '';
                this.dados.historicos.destinatario_key = this.dados.socio && this.dados.socio.key ? this.dados.socio.key : '';
                this.dados.historicos.registro_nome = this.dados.socio && this.dados.socio.nome ? this.dados.socio.nome : '';
                this.dados.historicos.registro_key = this.dados.socio && this.dados.socio.key ? this.dados.socio.key : '';
            }
            else if(this.dados.whatsapp_destino=='EQUIPE'){
                this.dados.historicos.destinatario_nome = this.dados.responsavel && this.dados.responsavel.nome ? this.dados.responsavel.nome : '';
                this.dados.historicos.destinatario_key = this.dados.responsavel && this.dados.responsavel.key ? this.dados.responsavel.key : '';
                this.dados.historicos.registro_nome = this.dados.responsavel && this.dados.responsavel.nome ? this.dados.responsavel.nome : '';
                this.dados.historicos.registro_key = this.dados.responsavel && this.dados.responsavel.key ? this.dados.responsavel.key : '';
            }
            else if(this.dados.whatsapp_destino=='FORNECEDORES'){
                this.dados.historicos.destinatario_nome = this.dados.fornecedor && this.dados.fornecedor.nome ? this.dados.fornecedor.nome : '';
                this.dados.historicos.destinatario_key = this.dados.fornecedor && this.dados.fornecedor.key ? this.dados.fornecedor.key : '';
                this.dados.historicos.registro_nome = this.dados.fornecedor && this.dados.fornecedor.nome ? this.dados.fornecedor.nome : '';
                this.dados.historicos.registro_key = this.dados.fornecedor && this.dados.fornecedor.key ? this.dados.fornecedor.key : '';
            }

            this.dados.salvar_HISTORICO(this.dados.historicos);
        }
    }



    public producao_profissional(registro){
        // if(['DENTISTAS', 'MEDICOS', 'REL_DINHEIRO'].includes(this.dados.PARAMETRO)){
        //     this.config.DISPLAY.Registro = false;
        //     this.config.DISPLAY.Lista = true;
        //     this.dados.listar_producao = true;
        // }
    }

    public zoom_da_imagem(qual : number = 0){
        console.log("zoom_da_imagem(" + qual + ")")

        if(qual==1){
            if(this.imagem_maior1) {
                this.imagem_normal = true;
                this.imagem_maior1 = false;
                this.imagem_maior2 = false;
            }
            else {
                this.imagem_maior1 = true;
                this.imagem_normal = false;
                this.imagem_maior2 = false;
            }
        }
        else if(qual==2){
            if(this.imagem_maior2) {
                this.imagem_normal = true;
                this.imagem_maior1 = false;
                this.imagem_maior2 = false;
            }
            else {
                this.imagem_maior2 = true;
                this.imagem_maior1 = false;
                this.imagem_normal = false;
            }
        }
        else{
            this.imagem_maior2 = true;
            this.imagem_maior1 = false;
            this.imagem_normal = false;
        }
    }

    public go(destino : string = '') {
        this.dados.go(destino);
    }

    public voltar() {
        console.log("voltar()");

        if(this.dados.voltar_pilha && this.dados.voltar_pilha.length > 0) {

            console.log("this.dados.voltar_pilha");
            console.log(this.dados.voltar_pilha);

            let voltar = this.dados.voltar_pilha.pop();
            console.log("voltar = this.dados.voltar_pilha.pop();");
            console.log(voltar);
        }


        if(this.dados.esconder_lista == true){
            this.config.DISPLAY.Registro = false;
            this.dados.esconder_lista = false;
        }
        else {
            this.voltar2();
            // this.config.DISPLAY.Registro = false;
            // this.config.DISPLAY.Lista = true;
        }
    }


    public voltar2() {
        console.log("voltar2()");

        if(this.dados.voltar_para){

            console.log("this.dados.voltar_para " + this.dados.voltar_para)

            this.dados.PARAMETRO = this.dados.voltar_para;
            this.dados.selected = this.dados.selected_origem;

            this.dados.selected_origem = {};
            this.dados.voltar_para = '';
            this.dados.origem = '';
            if(this.dados.voltar_para_lista){
                this.config.DISPLAY.Registro = false;
                this.config.DISPLAY.Lista = true;
                this.dados.voltar_para_lista = false;
            }
            else {
                this.config.DISPLAY.Lista = false;
                this.config.DISPLAY.Registro = true;
            }
            return;
        }

        this.config.DISPLAY.DetailExcluirDialog = false;
        this.config.DISPLAY.Registro = false;

        if (this.dados.PARAMETRO == 'PAGAMENTOS'){
            this.dados.mostrar_lista_de_orcamentos = false;
        }

        if(['PERFIL','CONFIGURACAO'].includes(this.dados.PARAMETRO)){
            this.dados.go(this.config[this.dados.PARAMETRO].retorno);
        }
        else {
            this.config.DISPLAY.Lista = true;
            this.config.DISPLAY.Registro = false;
        }
    }


    public mostrar_estoque_fornecedores(){
        console.log("mostrar_estoque_fornecedores");
		this.parametro = "LANCAMENTOS_DESPESA";

        this.dados.mostrar_estoque_fornecedores_flag = !this.dados.mostrar_estoque_fornecedores_flag;
        this.dados.mostrar_estoque_compras_flag = false;
        this.dados.mostrar_estoque_clientes_flag = false;
        this.dados.mostrar_estoque_vendas_flag = false;
        this.dados.filterDatabase(this.dados.selected.key,this.parametro);
    }

    public mostrar_estoque_compras(){
        console.log("mostrar_estoque_compras");
		this.parametro = "LANCAMENTOS_DESPESA";

        this.dados.mostrar_estoque_compras_flag = !this.dados.mostrar_estoque_compras_flag;
        this.dados.mostrar_estoque_fornecedores_flag = false;
        this.dados.mostrar_estoque_clientes_flag = false;
        this.dados.mostrar_estoque_vendas_flag = false;
        this.dados.filterDatabase(this.dados.selected.key,this.parametro);
    }

    public mostrar_estoque_clientes(){
        console.log("mostrar_estoque_clientes");
		this.parametro = "LANCAMENTOS_RECEITA";

        this.dados.mostrar_estoque_clientes_flag = !this.dados.mostrar_estoque_clientes_flag;
        this.dados.mostrar_estoque_fornecedores_flag = false;
        this.dados.mostrar_estoque_compras_flag = false;
        this.dados.mostrar_estoque_vendas_flag = false;
        this.dados.filterDatabase(this.dados.selected.key,this.parametro);
    }

    public mostrar_estoque_vendas(){
        console.log("mostrar_estoque_vendas");
		this.parametro = "LANCAMENTOS_RECEITA";

        this.dados.mostrar_estoque_vendas_flag = !this.dados.mostrar_estoque_vendas_flag;
        this.dados.mostrar_estoque_fornecedores_flag = false;
        this.dados.mostrar_estoque_compras_flag = false;
        this.dados.mostrar_estoque_clientes_flag = false;
        this.dados.filterDatabase(this.dados.selected.key,this.parametro);
    }

    public mostrar_clientes_vendas(){
        console.log("mostrar_clientes_vendas");
		// this.parametro = "LANCAMENTOS_RECEITA";

        this.dados.mostrar_clientes_vendas_flag = !this.dados.mostrar_clientes_vendas_flag;
        this.dados.mostrar_clientes_atendimentos_flag = false;
        this.dados.filterDatabase(' ','LANCAMENTOS_RECEITA');
    }

    public mostrar_clientes_atendimentos(){
        console.log("mostrar_clientes_atendimentos");
		// this.parametro = "ATENDIMENTOS";

        this.dados.mostrar_clientes_atendimentos_flag = !this.dados.mostrar_clientes_atendimentos_flag;
        this.dados.mostrar_clientes_vendas_flag = false;
        this.dados.filterDatabase(' ','ATENDIMENTOS');
    }

    public editar() {
        if(!this.dados.selected.fixo){
            this.dados.selected_edit = this.util.deepClone(this.dados.selected);
            this.config.DISPLAY.Registro = false;

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
    }


    public sair_popup_aviso(){
        this.popup_de_aviso = false;
        if(this.dados.selected.estorno){
            console.log("====================");
            console.log("Registro estornado =");
            console.log(this.dados.selected);
            console.log("====================");
            // this.voltar();
        }
    }


    // public navigateTo(url:string) {
    // }
    //

    // public popup_alerta(alerta_titulo:string='', alerta_linha1:string='', alerta_linha2:string='') {
    //     console.log("popup_alerta");
    //
    //     this.alerta_titulo = this.alerta_titulo ? this.alerta_titulo : alerta_titulo ? alerta_titulo : "ATENÇÃO";
    //     this.alerta_linha1 = this.alerta_linha1 ? this.alerta_linha1 : alerta_linha1 ? alerta_linha1 : "Há campos não preenchidos.";
    //     this.alerta_linha2 = this.alerta_linha2 ? this.alerta_linha2 : alerta_linha2 ? alerta_linha2 : "";
    //     this.popupAlerta = true;
    // }
    //
    // public popup_alerta_fechar(){
    //     this.alerta_titulo = '';
    //     this.alerta_linha1 = '';
    //     this.alerta_linha2 = '';
    //     this.popupAlerta = false;
    // }

    // public tentou_editar(){
    //     if(!this.dados.voltar_para && this.config[this.dados.PARAMETRO].pode_editar && this.dados.pode_editar) {
    //         this.popup_pedir_confirmacao('EDITAR ?', 'EDITAR ESTE REGISTRO?');
    //     }
    // }

    // public popup_pedir_confirmacao(alerta_titulo:string='', alerta_linha1:string='', alerta_linha2:string='') {
    //     console.log("popup_pedir_confirmacao");
    //
    //     this.alerta_titulo = this.alerta_titulo ? this.alerta_titulo : alerta_titulo ? alerta_titulo : "ATENÇÃO";
    //     this.alerta_linha1 = this.alerta_linha1 ? this.alerta_linha1 : alerta_linha1 ? alerta_linha1 : "Há campos não preenchidos.";
    //     this.alerta_linha2 = this.alerta_linha2 ? this.alerta_linha2 : alerta_linha2 ? alerta_linha2 : "";
    //     this.popupConfirmar = true;
    // }

    // public popup_confirmar(confirmacao : boolean){
    //     console.log("popup_confirmar");
    //
    //     this.alerta_titulo = '';
    //     this.alerta_linha1 = '';
    //     this.alerta_linha2 = '';
    //     this.popupConfirmar = false;
    //
    //     if(confirmacao){
    //         if(this.dados.pode_editar) {
    //             this.editar();
    //         }
    //     }
    //     else {}
    // }


    public download_imagem_do_firestore(qual){
        if(qual==1){
            if(this.dados.selected.img_url && this.dados.selected.tipo_da_imagem1 == 'firestore'){
                this.filePath = this.dados.selected.img_url;
                this.tipo_da_imagem1 = this.dados.selected.tipo_da_imagem1;
                this.downloadURLfirestore1 = this.afStorage.ref(this.filePath).getDownloadURL();
            }
        }
        else if(qual==2){
            if(this.dados.selected.img_url2 && this.dados.selected.tipo_da_imagem2 == 'firestore'){
                this.filePath = this.dados.selected.img_url2;
                this.tipo_da_imagem2 = this.dados.selected.tipo_da_imagem2;
                this.downloadURLfirestore2 = this.afStorage.ref(this.filePath).getDownloadURL();
            }
        }
    }

}
