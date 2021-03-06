import { Component, OnInit } from '@angular/core';

// FIRESTORE
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';

import 'firebase/database';
import 'firebase/storage';   // Firestore

import {Subject, Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';  // finalize pro Firestore
// import { finalize, map } from 'rxjs/operators';  // finalize pro Firestore

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

import { DadosService } from '../dados/dados.service';
import { UtilService } from '../util/util.service';
import { ConfigService } from '../config/config.service';

import {ConfirmationService} from 'primeng/api';

import * as _ from 'lodash';


@Component({
    selector: 'app-edit_estoque',
    templateUrl: './edit_estoque.component.html',
    providers: [ConfirmationService]
})

export class EditEstoqueComponent implements OnInit {

    constructor(
        public config: ConfigService,
        public util: UtilService,
        public dados: DadosService,
        private confirmationService: ConfirmationService,
        private afStorage: AngularFireStorage
    ) { }


    public pode_fazer_upload : boolean = false;
    public label_nome : string = '';
    public label_obs : string = '';

    // popup de alerta
    // public popupAlerta : boolean = false;
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

    public excluir_dialog : boolean = false;
    public confirmar_exclusao_dialog : boolean = false;

    public ultimo_cadastrado : string = '';

    public TEMP : any = {
        idade : ''
    }

    public img_link1 : string = '';
    public img_link2 : string = '';

    public mostrar_upload_firestore_progress : boolean = false;

    // CAMERA E FIRESTORE
    // ------------------
    // toggle webcam on/off
    public showWebcam : boolean = false;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];

    // latest snapshot
    public webcamImage: WebcamImage = null;

    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

    // firestore
    public mostrar_preview : boolean = false;
    public local_da_imagem : string = '';

    public tipo_da_imagem1 : string = '';
    public tipo_da_imagem2 : string = '';

    public link1_ativado : boolean = false;
    public camera1_ativada : boolean = false;
    public arquivo1_ativado : boolean = false;

    public link2_ativado : boolean = false;
    public camera2_ativada : boolean = false;
    public arquivo2_ativado : boolean = false;

    public imageError: string;

    // Firestore
    downloadURL: Observable<string>;
    downloadURLfirestore1: Observable<string>;
    downloadURLfirestore2: Observable<string>;
    uploadPercent: Observable<number>;
    task: any;
    public uploadSrc : any = '';

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

        this.dados.key_provisoria = '';

        // Download de imagens do Firestore
        this.download_imagem_do_firestore(1);
        this.download_imagem_do_firestore(2);

        WebcamUtil.getAvailableVideoInputs()
              .then((mediaDevices: MediaDeviceInfo[]) => {
                this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
              });

        this.dados.salvou_registro = false;

        this.imagem_normal = true;
        this.dados.mostrar_imagens_na_lista_estoque = false;

        // EXCLUIR REGISTRO (pode_excluir)
        this.pode_excluir = this.config[this.dados.PARAMETRO].pode_excluir ? this.config[this.dados.PARAMETRO].pode_excluir : false;

        // ESTORNAR (pode_estornar)
        this.pode_estornar = ['LANCAMENTOS_RECEITA','LANCAMENTOS_DESPESA'].includes(this.dados.PARAMETRO);



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

            // ULTIMO CADASTRADO
            this.ultimo_cadastrado = this.dados.selected_estoque_ultimos_incluidos?.length ? this.dados.selected_estoque_ultimos_incluidos[0].nome : '';
            console.log("Ultimo cadastrado estoque = " + this.ultimo_cadastrado);

            // cidade e estado iniciais
            if(this.config[this.dados.PARAMETRO].cidade && this.dados.usuario_logado.cidade_default){
                this.dados.selected_edit.cidade =  this.dados.usuario_logado.cidade_default;
            }
            if(this.config[this.dados.PARAMETRO].estado && this.dados.usuario_logado.estado_default){
                this.dados.selected_edit.estado =  this.dados.usuario_logado.estado_default;
            }

            // Gera a key que será usada (e que já será usada para imagens no Firestore)
            this.dados.key_provisoria = this.dados.gera_key(this.dados.PARAMETRO);
        }


        if(this.dados.selected_edit.img_url){
            this.dados.selected_edit.img_url = this.util.formata_url_com_protocolo(this.dados.selected_edit.img_url);
        }
        if(this.dados.selected_edit.img_url2){
            this.dados.selected_edit.img_url2 = this.util.formata_url_com_protocolo(this.dados.selected_edit.img_url2);
        }

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


    public mostrar_imagens(){
        if(this.dados.mostrar_imagens_na_lista_estoque){
            this.dados.mostrar_imagens_na_lista_estoque = false;
        }
        else {
            this.dados.mostrar_imagens_na_lista_estoque = true;
        }
    }


    public voltar(destino : string = '') {
        console.log("==================");
        console.log("voltar()");
        console.log("destino = " + destino);
        console.log("==================");

        this.config.DISPLAY.ExcluirDialog = false;
        this.dados.key_provisoria = '';

        // Firestore
        if(this.task){
            // Cancelando task de image upload to firestore
            console.log("Cancelando TASK")
            console.log(this.task)
            this.task.cancel();
        }

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
            this.config.DISPLAY.EditEstoque = false;
        }

        else {
            console.log("Destino vazio => volta para detail");

            this.config.DISPLAY.Lista = false;
            this.config.DISPLAY.EditEstoque = false;
            this.config.DISPLAY.Registro = true;
        }

        console.log("==================");
        console.log("destino = " + destino);
        console.log("==================");

    }


    public salvar(param : string = ''){
        console.log("salvar(" + param + ")\n");
        console.log(this.dados.PARAMETRO);
        console.log(this.dados.selected_edit);

        // TODO --- É preciso checar e exigir antes de salvar que informe o CPF e PAGADOR para CLIENTES, incluindo menores de idade?

        this.dados.parametro_de_salvar = param ? param : '';
        this.dados.salvou_registro = false;


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


    // CAPTURA E UPLOAD DE IMAGENS
    public ativar_arquivo(qual : number) : void {
        if(qual==1) {
            if(this.arquivo1_ativado){
                this.arquivo1_ativado = false;

                this.link1_ativado = false;
                this.camera1_ativada = false;

                this.showWebcam = false;

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
            else {
                this.arquivo1_ativado = true;
                this.link1_ativado = false;
                this.camera1_ativada = false;

                this.showWebcam = false;

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
        }
        else if(qual==2) {
            if(this.arquivo2_ativado){
                this.arquivo2_ativado = false;

                this.link2_ativado = false;
                this.camera2_ativada = false;

                this.showWebcam = false;

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
            else {
                this.arquivo2_ativado = true;
                this.link2_ativado = false;
                this.camera2_ativada = false;

                this.showWebcam = false;

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
        }
    }

    public ativar_link(qual : number) : void {
        if(qual==1){
            if(this.link1_ativado){
                this.link1_ativado = false;

                this.arquivo1_ativado = false;
                this.camera1_ativada = false;

                this.showWebcam = false;
                // document.getElementById("img_link").focus();

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
            else {
                this.link1_ativado = true;

                this.arquivo1_ativado = false;
                this.camera1_ativada = false;

                this.showWebcam = false;
                // document.getElementById("img_link").focus();

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
        }
        else if(qual==2){
            if(this.link2_ativado){
                this.link2_ativado = false;

                this.arquivo2_ativado = false;
                this.camera2_ativada = false;

                this.showWebcam = false;
                // document.getElementById("img_link").focus();

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
            else {
                this.link2_ativado = true;
                this.arquivo2_ativado = false;
                this.camera2_ativada = false;

                this.showWebcam = false;
                // document.getElementById("img_link").focus();

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
        }
    }

    public ativar_camera(qual : number) : void {
        if(qual==1){
            if(this.camera1_ativada){
                this.camera1_ativada = false;
                this.showWebcam = false;

                this.arquivo1_ativado = false;
                this.link1_ativado = false;

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
            else {
                this.camera1_ativada = true;
                this.arquivo1_ativado = false;
                this.link1_ativado = false;

                this.showWebcam = true;
                this.downloadURL = undefined;

                this.arquivo2_ativado = false;
                this.link2_ativado = false;
                this.camera2_ativada = false;
            }
        }
        else if(qual==2){
            if(this.camera2_ativada){
                this.camera2_ativada = false;
                this.showWebcam = false;

                this.arquivo2_ativado = false;
                this.link2_ativado = false;

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
            else {
                this.camera2_ativada = true;
                this.arquivo2_ativado = false;
                this.link2_ativado = false;

                this.showWebcam = true;
                this.downloadURL = undefined;

                this.arquivo1_ativado = false;
                this.link1_ativado = false;
                this.camera1_ativada = false;
            }
        }
    }



    // ========== FILE UPLOAD ==========================
    uploadFile_to_Firestore(event, qual : number = 1) {
        // RECOMENDADO
        // DESTINO DOS UPLOADS de imagens base64
        // firestore ou firebase
        // o firebase causa alto trafego porque o banco de dados é carregado totalmente a cada inicialização,
        // o que faz com que todas as imagens no banco de dados sejam carregadas, mesmo sem ser acessadas diretamente,
        // portanto, NAO USAR o método "firebase" a não ser que por um bom motivo e com os devidos cuidados

        console.log("uploadFile_to_Firestore(" + qual + ")");

        if(qual==1){
            this.dados.selected_edit.tipo_da_imagem1 = "";
            this.dados.selected_edit.origem_da_imagem1 = "";
        }
        else if(qual==2){
            this.dados.selected_edit.tipo_da_imagem2 = "";
            this.dados.selected_edit.origem_da_imagem2 = "";
        }

        this.mostrar_upload_firestore_progress = true;

        // UPLOAD TO FIRESTORE com endereço fixo do registro (key) para não acumular versões
        let key = this.dados.selected_edit.key ? this.dados.selected_edit.key : this.dados.key_provisoria;
        let id = 'img' + String(qual);
        // ou
        // id = Math.random().toString(36).substring(2);  // option of using a random id for id
        // ou
        // id = id + '_' + String( this.util.getAgoraEmMilisegundos() );
        this.filePath = 'user/' + this.dados.usuario_logado.key + "/" + this.dados.PARAMETRO + '/' + key + '/' + id;
        console.log("filePath = " + this.filePath)

        if(qual==1){
            this.dados.selected_edit.img_url = this.filePath;
        }
        else if(qual==2){
            this.dados.selected_edit.img_url2 = this.filePath;
        }

        const fileRef = this.afStorage.ref(this.filePath);
        const file = event.target.files[0];
        this.task = this.afStorage.upload(this.filePath, file);

        // observe upload progress
        this.uploadPercent = this.task.percentageChanges();

        // get notified when the download URL is available
        this.task.snapshotChanges().pipe(
            finalize(() => {
                this.downloadURL = fileRef.getDownloadURL();
                console.log("downloadURL = ");
                console.log( this.downloadURL );

                if(qual==1){
                    this.dados.selected_edit.tipo_da_imagem1 = "firestore";
                    this.dados.selected_edit.origem_da_imagem1 = "upload de arquivo";
                }
                else if(qual==2){
                    this.dados.selected_edit.tipo_da_imagem2 = "firestore";
                    this.dados.selected_edit.origem_da_imagem2 = "upload de arquivo";
                }

                this.mostrar_upload_firestore_progress = false;

                this.download_imagem_do_firestore(qual);

                this.desligar_botoes_de_upload();
            })
         )
        .subscribe();
        console.log("\n=================\ndownloadURL = ");
        console.log( this.downloadURL );
    }


    public saveFile_as_base64(fileInput: any, qual : number) {
        console.log("saveFile_as_base64(fileInput,qual)");

        // NÃO RECOMENDADO!!!!
        // DESTINO DOS UPLOADS de imagens base64
        // firestore ou firebase
        // o firebase causa alto trafego porque o banco de dados é carregado totalmente a cada inicialização,
        // o que faz com que todas as imagens no banco de dados sejam carregadas, mesmo sem ser acessadas diretamente,
        // portanto, NAO USAR o método "firebase" a não ser que por um bom motivo e com os devidos cuidados


        // UPLOAD TO BASE64 dentro do campo img_url do Firebase
        if(qual==1){
            this.dados.selected_edit.img_url = this.filePath;
        }
        else if(qual==2){
            this.dados.selected_edit.img_url2 = this.filePath;
        }

        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 12048000;
            const allowed_types = ['image/png', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            const max_height = 2048;
            const max_width = 2048;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                'Excedeu tamanho máximo de ' + max_size / 1000 + 'Mb';
                return false;
            }
            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'O formato deve ser JPG, PNG ou GIF)';
                return false;
            }

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];
                    console.log("Imagem: altura = " + img_height + " largura = " + img_width);

                    if (img_height > max_height && img_width > max_width) {
                        this.imageError = 'Tamanho excedeu os limites de h:' + max_height + ' x w:' + max_width + ' px';
                        return false;
                    } else {
                        if(qual==1){
                            this.dados.selected_edit.img_url = image.src;
                            this.dados.selected_edit.tipo_da_imagem1 = 'base64';
                            this.dados.selected_edit.origem_da_imagem1 = 'upload de arquivo';
                        }
                        else if(qual==2){
                            this.dados.selected_edit.img_url2 = image.src;
                            this.dados.selected_edit.tipo_da_imagem2 = 'base64';
                            this.dados.selected_edit.origem_da_imagem2 = 'upload de arquivo';
                        }
                    }
                    this.desligar_botoes_de_upload();
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
    // ========== FILE UPLOAD ==========================



    // ========= CAMERA UPLOAD =========================
    public uploadCamera_to_Firestore(webcamImage: WebcamImage, qual : number): void {
        // RECOMENDADO!!!
        // DESTINO DOS UPLOADS de imagens base64
        // firestore ou firebase
        // o firebase causa alto trafego porque o banco de dados é carregado totalmente a cada inicialização,
        // o que faz com que todas as imagens no banco de dados sejam carregadas, mesmo sem ser acessadas diretamente,
        // portanto, NAO USAR o método "firebase" a não ser que por um bom motivo e com os devidos cuidados

      console.log('uploadCamera_to_Firestore()');

      if(qual==1){
          this.dados.selected_edit.tipo_da_imagem1 = "";
          this.dados.selected_edit.origem_da_imagem1 = "";
      }
      else if(qual==2){
          this.dados.selected_edit.tipo_da_imagem2 = "";
          this.dados.selected_edit.origem_da_imagem2 = "";
      }


      let img_webcam = webcamImage.imageAsDataUrl
      let img_blob = this.util.dataURItoBlob(img_webcam);


      // UPLOAD TO FIRESTORE com endereço fixo do registro (key) para não acumular versões
      let key = this.dados.selected_edit.key ? this.dados.selected_edit.key : this.dados.key_provisoria;
      let id = 'img' + String(qual);
      // ou
      // id = Math.random().toString(36).substring(2);  // option of using a random id for id
      // ou
      // id = id + '_' + String( this.util.getAgoraEmMilisegundos() );
      this.filePath = 'user/' + this.dados.usuario_logado.key + "/" + this.dados.PARAMETRO + '/' + key + '/' + id;
      console.log("filePath = " + this.filePath)


      if (qual==1){
          this.dados.selected_edit.img_url = this.filePath; // opção em upload to Firestore
      }
      else if(qual==2){
          this.dados.selected_edit.img_url2 = this.filePath; // opção em upload to Firestore
      }

      const fileRef = this.afStorage.ref(this.filePath);
      this.task = this.afStorage.upload(this.filePath, img_blob);

      // observe upload progress
      this.uploadPercent = this.task.percentageChanges();

      this.task.snapshotChanges().pipe(
          finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              console.log("downloadURL = ");
              console.log( this.downloadURL );

              if (qual==1){
                  this.dados.selected_edit.tipo_da_imagem1 = "firestore";
                  this.dados.selected_edit.origem_da_imagem1 = "imagem de câmera";
              }
              else if(qual==2){
                  this.dados.selected_edit.tipo_da_imagem2 = "firestore";
                  this.dados.selected_edit.origem_da_imagem2 = "imagem de câmera";
              }

              // Atualiza imagem na paginas
              this.download_imagem_do_firestore(qual);

              this.desligar_botoes_de_upload();
          })
       )
      .subscribe()
    }


    public uploadCamera_to_Firebase(webcamImage: WebcamImage, qual : number): void {
        // NÃO RECOMENDADO!!!
        // DESTINO DOS UPLOADS de imagens base64
        // firestore ou firebase
        // o firebase causa alto trafego porque o banco de dados é carregado totalmente a cada inicialização,
        // o que faz com que todas as imagens no banco de dados sejam carregadas, mesmo sem ser acessadas diretamente,
        // portanto, NAO USAR o método "firebase" a não ser que por um bom motivo e com os devidos cuidados

      console.log("uploadCamera_to_Firebase()");

      if(qual==1){
          this.dados.selected_edit.img_url = webcamImage.imageAsDataUrl; // opção em data file base64
          this.dados.selected_edit.tipo_da_imagem1 = "base64";
          this.dados.selected_edit.origem_da_imagem1 = 'imagem de câmera';
      }
      else  if(qual==2){
          this.dados.selected_edit.img_url2 = webcamImage.imageAsDataUrl; // opção em data file base64
          this.dados.selected_edit.tipo_da_imagem2 = "base64";
          this.dados.selected_edit.origem_da_imagem2 = 'imagem de câmera';
      }

      // Atualiza imagem na paginas
      this.download_imagem_do_firestore(qual);

      this.desligar_botoes_de_upload();
    }
    
    // ========= CAMERA UPLOAD =========================


    // ================ IMG LINK =====================
    public saveFile_as_link(qual : number){

        // ATENCAO!!! NO CASO DO 'data:image BASE64
        // ESSE TIPO DE LINK NA VERDADE É UM ARQUIVO E SOBRECARREGA
        // A TRANSFERENCIA DE DADOS PORQUE É O ARQUIVO DA IMAGEM
        // E É CARREGADO TODOS) COM O BANCO DE DADOS NAS INICIALIZACOES
        // TODO - NAO ÈRMITIR ISSO E TRANSFORMAR EM UPLOAD PRO FIRESTORE!!!!!


        if(qual == 1){
            this.dados.selected_edit.img_url = this.img_link1;
            if(this.img_link1.substr(0,10)=='data:image'){
                // em vez de link a imagem era um arquio base64
                this.dados.selected_edit.tipo_da_imagem1 = 'base64';
                this.dados.selected_edit.origem_da_imagem1 = 'link da web';
            }
            else {
                // link normal
                this.dados.selected_edit.tipo_da_imagem1 = 'link';
                this.dados.selected_edit.origem_da_imagem1 = 'link da web';
            }
        }
        else if(qual == 2){
            this.dados.selected_edit.img_url2 = this.img_link2;
            if(this.img_link2.substr(0,10)=='data:image'){
                // em vez de link a imagem era um arquio base64
                this.dados.selected_edit.tipo_da_imagem2 = 'base64';
                this.dados.selected_edit.origem_da_imagem2 = 'link';
            }
            else {
                // link normal
                this.dados.selected_edit.tipo_da_imagem2 = 'link';
                this.dados.selected_edit.origem_da_imagem2 = 'link';
            }
        }

        this.desligar_botoes_de_upload();
    }
    // ================ IMG LINK =====================


    // ========= CAMERA ================================
    public triggerSnapshot(): void {
       this.trigger.next();
       this.camera1_ativada = false;
       this.camera2_ativada = false;
       this.showWebcam = false;
     }
     public handleInitError(error: WebcamInitError): void {
       this.errors.push(error);
     }
     public showNextWebcam(directionOrDeviceId: boolean|string): void {
       // true => move forward through devices
       // false => move backwards through devices
       // string => move to device with given deviceId
       this.nextWebcam.next(directionOrDeviceId);
     }
     public cameraWasSwitched(deviceId: string): void {
       console.log('active device: ' + deviceId);
       this.deviceId = deviceId;
     }
     public get triggerObservable(): Observable<void> {
       return this.trigger.asObservable();
     }
     public get nextWebcamObservable(): Observable<boolean|string> {
       return this.nextWebcam.asObservable();
     }
     // ========= CAMERA ================================


    public desligar_botoes_de_upload(){
        this.camera1_ativada = false;
        this.camera2_ativada = false;
        this.link1_ativado = false;
        this.link2_ativado = false;
        this.arquivo1_ativado = false;
        this.arquivo2_ativado = false;
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
                console.log("popup_alerta() => accept")
                return true;
            },
            reject: () => {
                console.log("popup_alerta() => reject")
                return false;
            }
        });
    }

    public popup_sair_sem_salvar() {
        this.popupSairSemSalvar = true;
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


    public download_imagem_do_firestore(qual){
        if(qual==1){
            if(this.dados.selected_edit.img_url && this.dados.selected_edit.tipo_da_imagem1 == 'firestore'){
                this.filePath = this.dados.selected_edit.img_url;
                this.tipo_da_imagem1 = this.dados.selected_edit.tipo_da_imagem1;
                this.downloadURLfirestore1 = this.afStorage.ref(this.filePath).getDownloadURL();
            }
        }
        else if(qual==2){
            if(this.dados.selected_edit.img_url2 && this.dados.selected_edit.tipo_da_imagem2 == 'firestore'){
                this.filePath = this.dados.selected_edit.img_url2;
                this.tipo_da_imagem2 = this.dados.selected_edit.tipo_da_imagem2;
                this.downloadURLfirestore2 = this.afStorage.ref(this.filePath).getDownloadURL();
            }
        }
    }

}
