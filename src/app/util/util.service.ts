import { Injectable } from '@angular/core';
import * as clone from 'clone';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class UtilService {

    constructor(
    ) { }

    // This regex below is from https://github.com/plataformatec/devise,
    // a popular Rails authentication library
    public EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/;

    public ALFABETO : string = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';

    public  milisegundos_de_um_dia = 86400000;  // 86.400.000
    public  milisegundos_de_um_mes = 2592000000;  // 2.592.000.000

    public CADEADO_ABERTO = "/src/img/cadeado-aberto.png";
    public CADEADO_FECHADO = "/src/img/cadeado-fechado.png";

    public NOVO_CLIENTE = 'NOVO CLIENTE';
    public NOVO_ADVOGADO = 'NOVO ADVOGADO';
    public NOVA_MENSAGEM = 'NOVA MENSAGEM';
    public NOVO_EVENTO = 'NOVO EVENTO';

    public AGENDA = 'Agenda';
    public AGENDA_TITLE = 'Agenda';

    public CONFIRM_DELETE = 'EXCLUIR?';
    public INCLUIDO = 'INCLUIDO';
    public ENVIADA = 'ENVIADA';
    public SALVO = 'SALVO';
    public ERRO = 'ERRO';
    public EDITANDO = 'EDITANDO';
    public COMPLETAR = 'COMPLETAR';

    public GREY = 'grey';
    public BLUE = 'dodgerblue';
    public ORANGE = 'orange';
    public GREEN = 'green';
    public RED = 'red';

    public moment (any) : any {}



    public DIASDASEMANA =  [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
    ];

    public DIASDASEMANACURTOS =  [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
    ];

    public MESESDOANO =  [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    public MESESDOANOCURTOS =  [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
    ];

    public ARCADA1 = [
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18"
    ];

    public ARCADA2 = [
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
    ];

    public ARCADA3 = [
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38"
    ];

    public ARCADA4 = [
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48"
    ];

    public ARCADA5 = [
        "51",
        "52",
        "53",
        "54",
        "55"
    ];

    public ARCADA6 = [
        "61",
        "62",
        "63",
        "64",
        "65"
    ];

    public ARCADA7 = [
        "71",
        "72",
        "73",
        "74",
        "75"
    ];

    public ARCADA8 = [
        "81",
        "82",
        "83",
        "84",
        "85"
    ];

    public DENTES = [
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "51",
        "52",
        "53",
        "54",
        "55",
        "61",
        "62",
        "63",
        "64",
        "65",
        "71",
        "72",
        "73",
        "74",
        "75",
        "81",
        "82",
        "83",
        "84",
        "85"
    ];









    // ==============================================================
    // FUNCOES DE DATA
    // ==============================================================
    //
    // para o momento atual, criar o objeto Date => d = new Date();
    // ou por exemplo =>  d = new Date("July 21, 1983 01:15:00");
    // Exemplo: getDiaDoMes(d) equivale a d.getDate();

    getDiaDoMes(d) : number{
        // retorna o dia, de 1 a 31
        return d.getDate(d);
    }

    getDiaDaSemana(d) : number{
        // retorna o dia da semana, de 0 a 6
        return d.getDay();
    }

    getAno(d) : number{
        // retorna o ano_original
        if (!d){
            d = new Date();
        }
        return Number(d.getFullYear());
    }

    getHora(d) : number{
        // retorna hora, de 0 a 23
        return d.getHours();
    }

    getMilisegundos(d) : number{
        // retorna os milisegundos, de 0 a 999
        return d.getMiliseconds();
    }

    getMinutos(d) : number{
        // retorna os minutos, de 0 a 59
        return d.getMinutes();
    }

    getMes(d) : number{
        // retorna o mes, de 0 a 11, em numero
        // let mes = String(d.getMonth() + 1);
        return d.getMonth() + 1;
    }

    getSegundos(d) : number{
        // retorna os segundo, de 0 a 59
        return d.getSeconds();
    }

    getTime(d) : number{
        // Returns the number of milliseconds since midnight Jan 1 1970, and a specified date
        return d.getTime();
    }

    getAgoraEmMilisegundos() : number{
        return Date.now();
    }

    getTempoDecorridoEmMilisegundos(data : string) : number{
        // data deve ser no formato em inglês tipo:  March 21, 2012
        return Date.parse(data);
    }

    setDiaDoMes(dia_do_mes : number, dataObj) : number {
        // input: dia do mes (1 a 31).
        // Se for 0 é o ultimo dia do mês anterior. Se for -1, é um dia antes do ultimo dia do mes anterior
        // Se for 32 num mes de 31 dias, é o primeiro dia do mes seguinte
        // Se for 32 num mes de 30 dias é o segundo dia do mês seguinte
        // dataObj: Date object
        // retorna numero de milisegundos desde Jan 1, 1970

        if (!dataObj){
            dataObj = new Date();
        }

        return dataObj.setDate(dia_do_mes);
    }

    setData(ano, mes, dia, dataObj) : number {
        // exemplo
        // Set the date to six months ago:
        // var d = new Date();
        // d.setFullYear(d.getFullYear(), d.getMonth() - 6);

        // retorna numero de milisegundos desde Jan 1, 1970


        // Parameter	Description
        // year	Required. A value representing the year, negative values are allowed
        // month	Optional. An integer representing the month (0-11)
        // Expected values are 0-11, but other values are allowed:
        //
        // -1 will result in the last month of the previous year
        // 12 will result in the first month of the next year
        // 13 will result in the second month of the next year
        // day	Optional. An integer representing the day of month
        // Expected values are 1-31, but other values are allowed:
        //
        // 0 will result in the last day of the previous month
        // -1 will result in the day before the last day of the previous month
        // If the month has 31 days:
        //
        // 32 will result in the first day of the next month
        // If the month has 30 days:
        //
        // 32 will result in the second day of the next month

        if (!dataObj){
            dataObj = new Date();
        }

        if(!ano){
            ano = dataObj.getFullYear();
        }

        if(!mes){
            ano = dataObj.getMonth();
        }

        if(!dia){
            ano = dataObj.getDate();
        }


        return dataObj.setFullYear(ano, mes, dia);
    }


    public myDateObjFromObj(o : any) : any {
        let d = new Date(Number(o.ano), Number(o.mes)-1, Number(o.dia)+0, Number(o.hora)+0, Number(o.minutos)+0, 0, 0).getTime();
        return this.myDateObj(d);
    }

    public myDateObjFromMomentObj(m : any) : any {
        let str = m.format();
        return this.myDateObjFromMomentStr(str);
    }

    public myDateObjFromMomentStr(str : string) : any {
        // str deve ter o formato AAAA-MM-DDTHH:MM:SS
        let d : any;

        if( (str == undefined) || (str == '') ) {
            d = new Date().getTime();
        }
        else {
            if (str.length==10) {
                // só a data, sem hora. Completa para 0h
                str = str + 'T00:00:00';
            }
            let ano = Number(str.substr(0,4));
            let mes = Number(str.substr(5,2));
            let dia = Number(str.substr(8,2));
            let hora = Number(str.substr(11,2));
            let minutos = Number(str.substr(14,2));
            let segundos = Number(str.substr(17,2));
            d = new Date(ano, mes-1, dia, hora, minutos, segundos, 0).getTime();
        }
        return this.myDateObj(d);
    }

    public myMoment (param : number = 0) : string {
        let d = this.myDateObj(param);
        return d.momentformat;
    }

    public myDateObjFromDataHora(str : string) : any {
        // str deve ter o formato DD-MM-AAAA HH:MM ou
        // str deve ter o formato DD/MM/AAAA HH:MM ou
        // DD/MM/AAAA

        let d : any;

        if( (str == undefined) || (str == '') ) {
            d = new Date().getTime();
        }
        else {
            if (str.length==8) {
                str = this.formata_data(str);
            }
            if (str.length==10) {
                // só a data, sem hora. Completa para 0h
                str = str + ' 00:00';
            }
            let dia = Number(str.substr(0,2));
            let mes = Number(str.substr(3,2));
            let ano = Number(str.substr(6,4));
            let hora = Number(str.substr(11,2));
            let minutos = Number(str.substr(14,2));
            d = new Date(ano, mes-1, dia, hora, minutos, 0, 0).getTime();
        }
        return this.myDateObj(d);
    }


    public somar_dias_a_uma_data(data: string,  dias : number) : string {
        // data no formato dd/mm/aaaa

        let dia = Number(data.substr(0,2));
        let mes = Number(data.substr(3,2))-1;
        let ano = Number(data.substr(6,4));

        let x = new Date(ano, mes, dia + dias);
        let datafutura = this.myDateObj(x);

        return datafutura.data;
    }


    public somar_dias_a_um_objeto_data(data: any,  dias : number) : any {
        // data no formato dd/mm/aaaa
        console.log(data)

        data.setDate(data.getDate + dias);
        console.log("data somada a " + dias + " dias")
        console.log(data)

        let datafutura = this.myDateObj(data);
        console.log("data futura = " + datafutura.data)

        return datafutura.data;
    }



    public agora() : any {
        return this.myDateObj();

        // quando: 1585445209313
        // dia: "28"
        // mes: "03"
        // ano: "2020"
        // inicio_do_dia: 1585364400000
        // fim_do_dia: 1585450799999
        // hora: "22"
        // minutos: "26"
        // segundos: "49"
        // horario: "22:26"
        // horario_com_segundos: "22:26:49"
        // horarioStr: "22:26 h"
        // diadasemana: "Sábado"
        // mes_extenso: "Março"
        // data: "28/03/2020"
        // data_completa: "28 de Março de 2020"
        // data_completa_com_semana: "28 de Março de 2020 (Sábado)"
        // datahora: "28/03/2020 22:26"
        // datahora_com_segundos: "28/03/2020 22:26:49"
        // momentformat: "2020-03-28T22:26:49"

    }


    public inicio_do_dia(dataObj){
        if(!dataObj){
            dataObj = new Date();
        }

        dataObj.setHours(0);
        dataObj.setMinutes(0);
        dataObj.setSeconds(0);
        dataObj.setMilliseconds(0);

        return this.getTime(dataObj);
    }

    public fim_do_dia(dataObj){
        if(!dataObj){
            dataObj = new Date();
        }

        dataObj.setHours(23);
        dataObj.setMinutes(59);
        dataObj.setSeconds(59);
        dataObj.setMilliseconds(999);

        return this.getTime(dataObj);
    }


    public DateObj_to_data (data : any){
        // data é um DateObj

        if (!data) {
            data = new Date();
        }

        let dia =   this.formata_zeros_a_esquerda(data.getDate(),2);
        let mes = Number(data.getMonth()) + 1;
        let mes_formatado = this.formata_zeros_a_esquerda(mes,2);

        return  dia + '/' + mes_formatado + '/' +  data.getFullYear();
    }


    public data_hora_agora() : any {
        return this.quando_datahora();
    }

    public quando() : string {
        return this.quando_datahora();
    }

    public quando_data() : string {
        return this.myDateObj().data;
    }

    public quando_datahora() : string {
        return this.myDateObj().datahora;
    }

    public quando_com_segundos() : string {
        // TODO - O ideal é que a função myDateObj() seja private
        return this.myDateObj().datahora_com_segundos;
    }

    public converte_data_para_milisegundos (data : string) : number {

        // input = dd/mm/aaaa hh:mm:ss:mmm

        let ano = Number(data.substr(6,4));
        let mes = Number(data.substr(3,2));
        let dia = Number(data.substr(0,2));

        // let hora = 0;
        // let minutos = 0;
        // let segundos = 0;
        // let milisegundos = 1;
        // let d = new Date(ano, mes, dia, hora, minutos, segundos, milisegundos);

        let d = new Date(ano, mes-1, dia);
        let n = d.getTime()

        // console.log(data + " = " + n);

        return n;
    }

    public quando_em_milisegundos(data : string = '') {
        // input opcional: data no formato dd/mm/aaaa ou dd/mm/aaaa HH:MM:SS
        // Retorna o número de milisegundos desde 1 de Janeiro de 1970
        let d;

        if(!data){
            // return this.myDateObj().quando;
            d = new Date();
        }
        else {
            let ano = Number(data.substr(6,4));
            let mes = Number(data.substr(3,2))-1;
            let dia = Number(data.substr(0,2));
            let hora = Number(data.length >= 13 ? data.substr(11,2) : 0);
            let minuto = Number(data.length >= 16 ? data.substr(14,2) : 0);
            let segundo = Number(data.length >= 19 ? data.substr(17,2) : 0);

            d = new Date(ano,mes,dia,hora,minuto,segundo);
        }
        return d.getTime();
    }

    public formata_data_de_quando_em_milisegundos(quando) {
        // Input = Um valor inteiro representando o número de milisegundos desde 1 de Janeiro de 1970
        return this.myDateObj(quando).datahora_com_segundos.substr(0,10);
    }

    public formata_data_de_quando_em_milisegundos_com_minutos_e_segundos(quando) {
        // Input = Um valor inteiro representando o número de milisegundos desde 1 de Janeiro de 1970
        return this.myDateObj(quando).datahora_com_segundos.substr(0,16);
    }

    public getMesDeUmaData(data : string = '') : string {
        if(!data) {
            return '';
        }
        data = this.formata_data(data);
        return data.substr(3,2);
    }

    public is_aniversariante(data : string, mes: any = ''){
        if(mes) {
            mes = this.pad(mes);
        }
        else {
            mes = this.getMesDeUmaData(this.hoje());
        }

        if(mes == this.getMesDeUmaData(data)){
            return true;
        }
        else {
            return false;
        }
    }

    public formata_data(data : any, data_recente : string = '') : string {
        // formata para dd/mm/aaaa

        if(data == undefined) {
            return '';
        }

        data = String(data);

        if (data.length == 10) {
            // garante que os separadores sejam "/"  (Em geral, dd-mm-aaaa)
            data = data.substr(0,2)+"/"+data.substr(3,2)+"/"+data.substr(6,4);
        }
        else if (data.length == 16) {
            // Ex: 29/07/2019 14:38
            data = data.substr(0,10);
        }
        else if (data.length == 19) {
            // Ex: 29/07/2019 14:38:05
            data = data.substr(0,10);
        }
        else {
            // limpa tudo não numérico
            data = this.limpa_string_numerica(data);
            // data = data.replace(/\D/g, '');

            if (data.length == 6) {
                // formato ddmmaa

                let ano = Number(data.substr(4,2)) + 1900;
                let ano_atual = Number(this.myDateObj().ano);

                if (data_recente == 'recente'){
                    ano = Number(data.substr(4,2)) + 2000;
                    if (ano > ano_atual){
                        ano = ano - 100;
                    }
                }
                else if ( (ano_atual - ano) > 90 ){
                    // Se a idade dessa data formatada para somar a 1900 for maior que 90 anos, considerar como de 2000 para cá
                    ano = Number(data.substr(4,2)) + 2000;
                }

                data = data.substr(0,2) + "/" + data.substr(2,2) + "/" + ano;
            }

            if (data.length == 8) {
                // formato ddmmaaaa
                data = data.substr(0,2)+"/"+data.substr(2,2)+"/"+data.substr(4,4);
            }
            else if (data.length > 10) {
                // Em geral, quando inclui hora depois
                data = data.substr(0,2)+"/"+data.substr(3,2)+"/"+data.substr(6,4);
            }
        }
        return data;
    }


    public formata_data_por_extenso(data : string, data_recente : string = '') : string {
        // formata para dd de mes de ano
        // input como ddmmaaaa ou dd?mm?aaaa ou "dd?mm?aaaa?????..."
        // o parametro data_recente considera anos de 2 digitos como recentes se vier informado como 'recente'

        if(data == undefined) {
            return '';
        }
        else {
            if (data.length == 10) {
                // garante que os separadores sejam "/"  (Em geral, dd-mm-aaaa)
                data = data.substr(0,2)+"/"+data.substr(3,2)+"/"+data.substr(6,4);
            }
            else if (data.length == 16) {
                // Ex: 29/07/2019 14:38
                data = data.substr(0,10);
            }
            else if (data.length == 19) {
                // Ex: 29/07/2019 14:38:05
                data = data.substr(0,10);
            }
            else {
                // limpa tudo não numérico
                data = this.limpa_string_numerica(data);
                // data = data.replace(/\D/g, '');

                if (data.length == 6) {
                    // formato ddmmaa

                    let ano = Number(data.substr(4,2)) + 1900;
                    let ano_atual = Number(this.myDateObj().ano);

                    if (data_recente == 'recente'){
                        ano = Number(data.substr(4,2)) + 2000;
                        if (ano > ano_atual){
                            ano = ano - 100;
                        }
                    }
                    else if ( (ano_atual - ano) > 90 ){
                        // Se a idade dessa data formatada para somar a 1900 for maior que 90 anos, considerar como de 2000 para cá
                        ano = Number(data.substr(4,2)) + 2000;
                    }

                    data = data.substr(0,2) + "/" + data.substr(2,2) + "/" + ano;
                }

                if (data.length == 8) {
                    // formato ddmmaaaa
                    data = data.substr(0,2)+"/"+data.substr(2,2)+"/"+data.substr(4,4);
                }
                else if (data.length > 10) {
                    // Em geral, quando inclui hora depois
                    data = data.substr(0,2)+"/"+data.substr(3,2)+"/"+data.substr(6,4);
                }
            }
            let mes = Number(data.substr(3,2)) - 1; // indice
            let mes_extenso = this.MESESDOANO[mes];

            data = data.substr(0,2)+" de "+ mes_extenso + " de " +data.substr(6,4);
            return data;
        }
    }

    public formata_hora(hora : string = '') : string {
        // hora de input deve ter os 4 digitos principais no inicio (hhmmxxxx ou hh:mmxxxxx)
        // remove o que não for número
        if (!hora){
            hora = '';
        }
        else {
            hora = hora.replace(/\D/g, "");
            if(hora && hora.length >= 4){
                hora = hora.substr(0,2) + ":" + hora.substr(2,2);
            }
            else {
                hora = '';
            }
        }
        return hora;
    }

    public hora_agora() : string {
        // hora atual
        let d = new Date();
        let hh = this.pad( d.getHours(), 2 );
        let mm = this.pad( d.getMinutes(), 2 );
        let hora = hh + ":" + mm;

        return hora;
    }

    public formata_ano(ano_original : string) : string {
        // formata ano para aaaa
        // input como aa ou aaaa

        if(ano_original == undefined) {
            return ano_original;
        }

        // limpa tudo não numérico
        // ano_original = ano_original.replace(/\D/g, '');
        ano_original = this.limpa_string_numerica(ano_original);

        if (ano_original.length != 2 && ano_original.length != 4) {
            return ano_original;
        }

        let ano, ano_atual;

        if (ano_original.length == 2) {
            ano_atual = this.myDateObj().ano;
            ano_atual = Number( ano_atual.substr(2,2) );

            ano = Number(ano_original);
            console.log(ano_atual);
            console.log(ano);

            if ( ano > (ano_atual) ){
                ano = ano + 1900;
            }
            else {
                ano = ano + 2000;
            }
        }
        else if (ano_original.length == 4) {
            // mantem o ano com 4 digitos
            ano = Number(ano_original);
        }

        return String(ano);
    }


    public formata_alta(alta: string) : string {
        if (alta == undefined ) {
            return '';
        }
        if (alta.length == 6) {
            return alta.substr(0,2) + '/' + alta.substr(2,4);
        }
    }

    public formata_revisao (revisao : any) : string {

        if (revisao == undefined ) {
            return '';
        }
        let rev = Number(revisao);
        // this.dados.selected_edit = '19/12/2019';

        revisao = String(revisao);
        revisao = this.formata_zeros_a_esquerda(revisao, 2);

        return revisao;
    }


    public get_idade(data : any) : number {
        if( (data == undefined) || (data == '')  || (data == 0) ) {
            return 0;
        }
        else {
            data = this.formata_data(data);
            let nascimento = new Date(this.myDateObjFromDataHora(data).quando);
            let hoje = new Date();

            let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
            if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
            diferencaAnos--;

            return diferencaAnos;
        }
    }

    public get_idade_str(data : any) : string {

        let idade : number;
        let idadeStr : string;

        idade = this.get_idade(data);

        if( idade == 0 ) { idadeStr = ''; }
        else {
            if (idade>1) { idadeStr = idade + " anos"; }
            else if (idade==1) { idadeStr = " 1 ano"; }
            else { idadeStr = ''; }
        }

        return idadeStr;
    }

    public hoje(){
        // retorna dd/mm/aaaaa
        let hoje = new Date();

        let dia =   this.formata_zeros_a_esquerda(String(hoje.getDate()),2);
        let mes = Number(hoje.getMonth()) + 1;
        let mes_formatado = this.formata_zeros_a_esquerda(String(mes),2);
        let hoje_formatado =  dia + '/' + mes_formatado + '/' +  hoje.getFullYear();

        return hoje_formatado;
    }


    public get_idade_meses_dias(data : any) : string {
        if( (data == undefined) || (data == '')  || (data == 0) ) {
            return '';
        }
        else {
            data = this.formata_data(data); // dd/mm/aaaa
            let hoje = this.hoje(); // dd/mm/aaaa

            let data_quando = this.myDateObjFromDataHora(data).quando;
            let hoje_quando =    this.myDateObjFromDataHora(hoje).quando;

            let diferenca = hoje_quando - data_quando;

            diferenca = diferenca / (1000 * 60 * 60 * 24);  // em dias
            let meses = diferenca / 30;
            meses = Number(meses.toFixed(0));
            if (meses > (diferenca / 30)) {
                meses--;
            }

            let dias_complemento = diferenca - (meses*30);
            dias_complemento = Number(dias_complemento.toFixed(0));
            let retorno;
            if(meses>0){
                retorno =  meses + ' meses';
                if(dias_complemento>0){
                    retorno += ' e ' + dias_complemento;
                    if (dias_complemento==1) { retorno += ' dia';}
                    if (dias_complemento>1) { retorno += ' dias';}
                }
            }
            else if (dias_complemento>0){
                retorno = dias_complemento;
                if (dias_complemento==1) { retorno += ' dia';}
                if (dias_complemento>1) { retorno += ' dias';}
            }
            else {
                retorno = 'Nenhum dia';
            }

            return retorno;
        }
    }


    public getMesExtenso(mes: any) : string {
        if( (mes == undefined) || (mes == '')  || (mes == 0) ) {
            // mes não informado. Retorna mes atual.
            let d : any = this.myDateObj(0);
            return d.mes_extenso;
        }
        else {
            return this.MESESDOANO[Number(mes)-1];
        }
    }


    public pad(num : any, size : number = 2) : string {
        let pad_number = String(num);
        while (pad_number.length < size) pad_number = "0" + pad_number;
        return pad_number;
    }


    public myDateObj(quando : any = 0) : any {
        // o parametro quando é o numero de milissegundos desde 1970

        let d;
        let o : any = {};

        // quando: 1585445209313
        // dia: "28"
        // mes: "03"
        // ano: "2020"
        // inicio_do_dia: 1585364400000
        // fim_do_dia: 1585450799999
        // hora: "22"
        // minutos: "26"
        // segundos: "49"
        // horario: "22:26"
        // horario_com_segundos: "22:26:49"
        // horarioStr: "22:26 h"
        // diadasemana: "Sábado"
        // mes_extenso: "Março"
        // data: "28/03/2020"
        // data_completa: "28 de Março de 2020"
        // data_completa_com_semana: "28 de Março de 2020 (Sábado)"
        // datahora: "28/03/2020 22:26"
        // datahora_com_segundos: "28/03/2020 22:26:49"
        // momentformat: "2020-03-28T22:26:49"

        if (quando == 0) {
            d = new Date();
        }
        else {
            d = new Date(quando);
        }

        o.quando = d.getTime();

        o.dia = this.pad( d.getDate(), 2 );
        o.mes = this.pad( d.getMonth()+1, 2 );
        o.ano = String( d.getFullYear() );

        o.inicio_do_dia = new Date(o.ano, o.mes-1, o.dia, 0, 0, 0, 0).getTime();
        o.fim_do_dia = new Date(o.ano, o.mes-1, o.dia, 23, 59, 59, 999).getTime();

        o.hora = this.pad( d.getHours(), 2 );
        o.minutos = this.pad( d.getMinutes(), 2 );
        o.segundos = this.pad( d.getSeconds(), 2 );

        if(o.quando > o.inicio_do_dia) {
            o.horario = o.hora + ":" + o.minutos;
            o.horario_com_segundos = o.hora + ":" + o.minutos + ':' + o.segundos;
            o.horarioStr = o.horario + ' h';
        }
        else {
            o.horario = '';
            o.horario_com_segundos = '';
            o.horarioStr = '';
        }

        o.diadasemana = this.DIASDASEMANA[d.getDay()];
        o.mes_extenso = this.MESESDOANO[d.getMonth()];

        o.data = o.dia + '/' + o.mes + '/' + o.ano;
        o.data_completa = o.dia + ' de '+ o.mes_extenso + ' de ' + o.ano;
        o.data_completa_com_semana = o.dia + ' de '+ o.mes_extenso + ' de ' + o.ano + ' (' + o.diadasemana + ')';
        o.datahora = o.data + ' ' + o.horario;
        o.datahora_com_segundos = o.data + ' ' + o.horario_com_segundos;

        // momentformat = AAAA-MM-DDTHH:MM:SS
        o.momentformat = o.ano +'-'+ o.mes +'-'+ o.dia +'T'+ o.hora +':'+ o.minutos +':'+ o.segundos;

        return o;
    }



    public myDateObj_from_Date(d){
        // o parametro d deve ser um objeto Date()

        if (!d) {
            d = new Date();
        }
        let quando = d.getTime();
        return this.myDateObj(quando);
    }


    public diminui_data(data : string = '') : string {
        // Recebe dd/mm/aaaa e devolve dd/mm/aa
        data = this.formata_data(data);
        data = data.substr(0,6) + data.substr(8,2);
        return data;
    }

    // ==============================================================
    // FUNCOES DE DATA  FIM
    // ==============================================================




    public converter_key_para_texto(key : string) : string {
        // Troca underline por espaço. Ex: converter_ker => converter key
        key = key.replace(/_/g, ' ');
        key = this.capitalizar(key);
        return key;
    }

    public url_encode(str){
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }


    public formata_tel(telefone : string) : string {
        // Formata telefone para (dd) ddddddddd
        // input em qualquer formato (com ddd) reduzivel para 99999 com pelo menos 9 algarismos (2 para ddd e 7 para numero)

        if (telefone == undefined ) {
            return '';
        }

        // limpa qq caracter não numérico
        telefone = this.limpa_string_numerica(telefone);
        // telefone = telefone.replace(/\D/g, '');

        // formata separador para os 4 últimos algarismos
        if (telefone.length > 4) {
            let x = telefone.length - 4;
            telefone = telefone.substr(0,x) + '-' + telefone.substr(x);
        }

        if(telefone.substr(0,4)=="0800"){
            // formata telefones 0800
            telefone = telefone.substr(0,4) + '-' + telefone.substr(4);
        }
        else{

            // formata ddd
            if (telefone.length >= 10) {
                telefone = '(' + telefone.substr(0,2) + ') ' + telefone.substr(2);
            }
        }

        return telefone;
    }


    public formata_cpf(param : any = '') : string {
        // Valida e Formata cpf para ddd.ddd.ddd-dd

        let cpf = param.toString();

        if(!this.valida_cpf(cpf)) {
            return '';
        }
        else {
            // limpa qq caracter não numérico
            cpf = this.limpa_string_numerica(cpf);
            // cpf = cpf.replace(/\D/g, '');

            // formata separadores
            cpf = cpf.substr(0,3) + '.' + cpf.substr(3,3) + '.' + cpf.substr(6,3) + '-' + cpf.substr(9,2);

            return cpf;
        }
    }

    public valida_cpf(param : any) : boolean {
        // https://pt.stackoverflow.com/questions/51340/como-validar-cpf-no-lado-do-cliente-com-script
        // Adaptção de Guilherme Lautert para o script da resposta do @AlbertBitencourt.
        // Removendo a parte que considera 10 e 11 como 0, pois aparentemente essa validação não existe.
        // Este script, apesar de baseado originalmente no da receita, não valida as variações 1111111111, 22222222222, etc.

        let cpf = param.toString();
        let result = true;
        cpf = cpf.replace(/\D/g, '');
        if(cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        [9,10].forEach(function(j){
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r <2)?0:11-r;
            if(r != cpf.substring(j, j+1)) result = false;
        });
        return result;


        // ALGORITIMO ORIGINAL DO SITE DA RECEITA FEDERAL
        // https://www.devmedia.com.br/validar-cpf-com-javascript/23916
        // http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
        //
        // let strCPF = param.toString();
        // strCPF = strCPF.replace(/\D/g, '');
        // let Soma;
        // let Resto;
        // Soma = 0;
        //
        // if (strCPF == "00000000000")
    	// return false;
        // for (let i=1; i<=9; i++)
    	//    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        // Resto = (Soma * 10) % 11;
        // if ((Resto == 10) || (Resto == 11))
    	// Resto = 0;
        // if (Resto != parseInt(strCPF.substring(9, 10)) )
    	// return false;
    	// Soma = 0;
        // for (let i = 1; i <= 10; i++)
        //    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        // Resto = (Soma * 10) % 11;
        // if ((Resto == 10) || (Resto == 11))
    	// Resto = 0;
        // if (Resto != parseInt(strCPF.substring(10, 11) ) )
        //     return false;
        // return true;
    }


    public formata_cnpj(param : any = '') : string {
        // Formata CNPJ para xx.xxx.xxx/xxxx-xx
        // O CNPJ é composto de 14 caracteres sendo que os oito primeiros formam o número de inscrição(raiz- nº base),
        // os quatro números após a barra representam a quantidades de estabelecimentos inscritos(filiais),
        // e os dois últimos algarismos são os dígitos de verificação.

        let cnpj = param.toString();

        if(!this.valida_cnpj(cnpj)) {
            return '';
        }
        else {
            // limpa qq caracter não numérico
            cnpj = this.limpa_string_numerica(cnpj);

            // formata separadores
            cnpj = cnpj.substr(0,2) + '.' + cnpj.substr(2,3) + '.' + cnpj.substr(5,3) + '/'  + cnpj.substr(8,4) + '-' + cnpj.substr(12,2);

            return cnpj;
        }
    }

    public valida_cnpj(param : any) : boolean {
        // O CNPJ (Cadastro Nacional da Pessoa Jurídica) é composto de 14 números.
        // Os 8 primeiros identificam a empresa e
        // os 4 seguintes formam um sufixo que identifica um endereço de atividade da pessoa jurídica.
        // Os dois últimos números são dígitos verificadores, calculados de acordo com um algoritimo.
        // https://irias.com.br/blog/como-validar-cpf-cnpj-em-node-js/

        // Código
        // https://gist.github.com/alexbruno/6623b5afa847f891de9cb6f704d86d02

        let cnpj = param.replace(/[^\d]+/g, '')

        // Valida a quantidade de caracteres
        if (cnpj.length !== 14)
        return false

        // Elimina inválidos com todos os caracteres iguais
        if (/^(\d)\1+$/.test(cnpj))
        return false

        // Cáculo de validação
        let t = cnpj.length - 2,
        d = cnpj.substring(t),
        d1 = parseInt(d.charAt(0)),
        d2 = parseInt(d.charAt(1)),
        calc = x => {
            let n = cnpj.substring(0, x),
            y = x - 7,
            s = 0,
            r = 0

            for (let i = x; i >= 1; i--) {
                s += n.charAt(x - i) * y--;
                if (y < 2)
                y = 9
            }

            r = 11 - s % 11
            return r > 9 ? 0 : r
        }

        return calc(t) === d1 && calc(t + 1) === d2
    }

    public formata_inscricaoestadual (string) : string {
        return this.limpa_string_numerica(string);
    }

    public verificaEAN13(codigo : string) : string {
        codigo = codigo.trim();
        if(codigo.length == 13){
            return codigo;
        }
        else {
            return '';
        }
    }

    public formata_zeros_a_esquerda(numero : any, tamanho_final: number = 0) : string {
        let is_negativo = false;

        if (numero < 0) {
            is_negativo = true;
            numero = numero * -1;
        }
        numero = String(numero);

        let tamanho_original;
        tamanho_original = numero.length;

        if (tamanho_final > tamanho_original){
            numero = '000000000000000000000000000000000' + numero;
            numero = numero.substr(numero.length - tamanho_final);
        }

        if (is_negativo){
            numero = '- ' + numero;
        }

        return numero;
    }


    public apenas_numeros (string) : string {
        return this.limpa_string_numerica(string);
    }

    public limpa_string_numerica(param : any) : string {
        // limpa qq caracter não numérico
        // let str = String(param); opção da linha abaixo
        let str = param.toString();
        str = str.replace(/\D/g, '');
        return str;
    }

    public troca_virgulas_por_pontos(string) : string {
        return string.replace(/\,/g,'.');
    }

    public converte_valores_formatados_para_numero (valor : any) : number {
        valor = String(valor);
        let x = valor.replace(/\./g,'');
        x = x.replace(/\,/g,'.');
        return Number(x);
    }



    public formata_whatsapp_para_envio(telefone : string) : string {

        // Apenas para Brasil

        if (telefone == undefined ) {
            return '';
        }

        // limpa qq caracter não numérico
        telefone = this.limpa_string_numerica(telefone);

        // formata separador para os 4 últimos algarismos
        if (telefone.length > 4) {
            let x = telefone.length - 4;
            telefone = telefone.substr(0,x) + '-' + telefone.substr(x);
        }

        // formata ddd
        if (telefone.length >= 10) {
            telefone = '(' + telefone.substr(0,2) + ') ' + telefone.substr(2);
        }

        // Acrescenta código do brasil
        return '+55 ' + telefone;
    }

    public formata_email(email : string) : string {
        if (email == undefined ) {
            return '';
        }
        email = email.replace(/ /g, '');
        return email.toLowerCase();
    }

    public valor( input : any) : number {
        let y : number;

        if(typeof(input)=='number'){
            y = input;
        }
        else if(typeof(input)=='string'){
            input = input.replace(/[^\d\,]+/g,'');
            input = input.replace(/\,/g,'.');
            y = Number(input);
        }
        else {
            y = 0;
        }
        return y;
    }



    public transforma_valor_formatado_em_numero(str) : number {
        if (!str){
            return 0;
        }
        else {
            str = str.replace(/\./g, '');
            str = str.replace(/\,/g, '.');

            return Number(str);
        }
    }

    public formata_valor( x : any, decimais : number = 2) : string {
        // Formata valor para nnn.nnn,nn
        // coloca pontos de milhares

        let str : string;
        let y, negativo;
        let original = x;

        if(typeof(x)=='number'){
            str = x.toString();
        }
        else if(typeof(x)=='string'){
            x = x.replace(/\./g, '');
            x = x.replace(/\,/g, '.');
            str = x;
        }
        else {
            str = '0';
        }

        y = Number(str);

        if (y < 0) {
            negativo = true;
            y = y * -1;
        }
        else {
            negativo = false;
        }

        let numero = y.toFixed(decimais).split('.');

        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        let z = numero.join(',');

        str = numero.join(',');
        if (negativo){
            str = '-' + str;
        }

        return str;
    }


    public formata_numero(numero : number) : string {
        // Formata para nnn.nnn,nnnnnn
        // coloca pontos de milhares

        let result = numero.toLocaleString('de-DE', { maximumFractionDigits: 20 } );

        console.log("result = " + result);

        return result;
    }


    public formata_url(url : string) : string {
        if (url == undefined ) {
            return '';
        }
        url = url.trim();
        url = url.replace(/https?\:\/\//, "");
        url = url.replace(/\/$/, "");
        return url;
    }

    public formata_url_com_protocolo(url : string) : string {
        let is_https = false;
        let is_http = false;
        if (url == undefined ) { return ''; }

        if(url.substr(0,5)=='data:'){
            // é uma string base64 e não uma url
            return url;
        }

        let regex = /(http)/;
        let x = regex.exec(url);
        if (x) {
            is_http = true;
        }

        regex = /(https)/;
        x = regex.exec(url);
        if (x) {
            is_http = false;
            is_https = true;
         }

        url = this.formata_url(url);

        if (is_http){
            return 'http://' + url;
        }
        else if (is_https){
            return 'https://' + url;
        }
        else{
            if(url.length > 4){
                return 'https://' + url;
            }
            else{
                return ''
            }
        }
    }

    public formata_maiusculas(str : string) : string {
        if (str == undefined ) {
            return '';
        }
        let str2 = str.toUpperCase();
        return str2;
    }
    public formata_maiusculas_sem_acentos(str : string) : string {
        if (str == undefined ) {
            return '';
        }
        str = this.remover_acentos(str);
        return this.formata_maiusculas(str);
    }

    public formata_codigo(str : string) : string {
        str = this.formata_maiusculas(str);
        str = str.replace(/_|=/g, "-");
        str = str.replace(/ /g, "");
        str = str.replace(/O/gi, "0");
        return str;
    }


    public formata_numero_banco(str : string) : string {
        str = str.replace(/\-|_|=|\s/g, "");
        str = str.replace(/o/gi, "0");
        this.formata_zeros_a_esquerda(str,3);
        return str;
    }


    public formata_minusculas(str : string) : string {
        if (str == undefined ) {
            return '';
        }
        return str.toLowerCase();
    }
    public formata_minusculas_sem_acentos(str : string) : string {
        if (str == undefined ) {
            return '';
        }

        str = this.remover_acentos(str);
        return str.toLowerCase();
    }

    public remover_acentos(str : string) : string {
        str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
        str = str.replace(/[àáâãäå]/,"a");
        str = str.replace(/[ÈÉÊË]/,"E");
        str = str.replace(/[èéêë]/,"e");
        str = str.replace(/[ÌÍ]/,"I");
        str = str.replace(/[ìí]/,"i");
        str = str.replace(/[ÒÓÔÕÖ]/,"O");
        str = str.replace(/[òóôõö]/,"o");
        str = str.replace(/[ÚÜ]/,"U");
        str = str.replace(/[úü]/,"u");
        str = str.replace(/[Ç]/,"C");
        str = str.replace(/[ç]/,"c");

        // o resto
        return str.replace(/[^a-z0-9 ]/gi,'');
    }

    public capitalizar_acentuar_e_ajustar(str : string, marca : string = ""){

        if(marca) {
            marca = this.capitalizar(marca);
        }

        // ajustes nas abreviações de s/ e c/
        str = str.replace(/ S\/\s*/i," s/ ");
        str = str.replace(/ C\/\s*/i," c/ ");

        // capitalizar
        str = this.capitalizar(str);

        // retira espaços no inicio e fim
        str = str.trim();

        // retira hifens do final (caso tivesse uma marca que foi movida pelo mouse para o campo marca, por ex)
        str = str.replace(/\s*\-$/,"");

        // reajustes nas abreviações de S/ e C/ depos da capitalização
        str = str.replace(/ S\/ /," s/ ");
        str = str.replace(/ C\/ /," c/ ");
        str = str.replace(/(\W)sem /i,"$1s/ ");
        str = str.replace(/(\W)com /i,"$1c/ ");

        // substituições indicadas sobre unidades
        str = str.replace(/Unid\./,"unid ");
        str = str.replace(/Unid /,"unid ");
        // 5unid vira 5 un[id...]
        str = str.replace(/(\d)un/i,"$1 un");

        // acentuações comuns
        str = str.replace(/Hemostatic/,"Hemostátic");
        str = str.replace(/Temporari/,"Temporári");
        str = str.replace(/Descartave/,"Descartáve");
        str = str.replace(/Liquido/,"Líquido");
        str = str.replace(/Latex(\W)/,"Látex$1");
        str = str.replace(/Fluor(\W)/,"Flúor$1");
        str = str.replace(/Ionomero/,"Ionômero");
        str = str.replace(/Sintetico/,"Sintético");
        str = str.replace(/Carie/,"Cárie");
        str = str.replace(/Osse/,"Ósse");
        str = str.replace(/Solucao/,"Solução");
        str = str.replace(/Fluoridrico/,"Fluorídrico");
        str = str.replace(/Fosforico/,"Fosfórico");
        str = str.replace(/trilica/,"trílica");
        str = str.replace(/Acido(\W)/,"Ácido$1");

        str = str.replace(/Ii/,"II");
        str = str.replace(/Iii/,"III");
        str = str.replace(/Iv(\W)/,"IV$1");
        str = str.replace(/Ss(\.)/g,"SS$1");
        str = str.replace(/Ss(\,)/g,"SS$1");
        str = str.replace(/Ss(\-)/g,"SS$1");
        str = str.replace(/Ss(\W)/g,"SS$1");

        // acentua e ajusta maiúsculas
        str = str.replace(/P[óo](\W)/,"pó$1");

        // ex: 5 ml => 5ml (permitindo buscas tanto por "5 ml" (busca o 5 e o ml, o que acha) como por "5ml" (busca exatamente 5ml, juntos, e acha) )
        // ex: 5 % => 5% (permitindo buscas tanto por "5 %" (busca o 5 e o %, o que acha) como por "5%" (busca exatamente 5%, juntos, e acha) )
        str = str.replace(/(\d)\s+ml/i,"$1ml");
        str = str.replace(/(\d)\s+%/,"$1%");

        str = str.replace(/\stama?n?h?o?\.?\:?\s+/i," Tam. ");

        str = this.incluir_marca(str, marca);
        return str;
    }

    public formata_nome(nome : string) : string {
        return this.capitalizar(nome);
    }

    public formata_url2key(url : string) : string {
        // Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
        url = url.replace(/\./g,"*");
        url = url.replace(/\//g,"|");
        url = url.replace(/[\#\$\[\]]/g,"_");
        return url;
    }

    public trim(str: string) : string {
        return str.trim();
    }

    public formata_cidade(cidade : string) : string {
        // ltrim
        if (cidade == undefined ) {
            return '';
        }
        cidade = cidade.replace(/^\s+/,'');

        // Atalhos RJ SP BH POA RP SB SG
        cidade = cidade.toUpperCase();
        cidade = cidade.replace(/RJ/,'Rio de Janeiro');
        cidade = cidade.replace(/SP/,'São Paulo');
        cidade = cidade.replace(/BH/,'Belo Horizonte');
        cidade = cidade.replace(/POA/,'Porto Alegre');
        cidade = cidade.replace(/RP/,'Ribeirão Preto');
        cidade = cidade.replace(/SB/,'São Bernardo do Campo');
        cidade = cidade.replace(/SG/,'São Gonçalo');
        cidade = cidade.replace(/DC/,'Duque de Caxias');

        cidade = this.capitalizar(cidade);

        return cidade;
    }

    public open_url(parametro : string) {
        window.open(this.formata_url_com_protocolo(parametro), '_blank');
    }

    public formata_cep(cep : string) : string {
        // recebe o cep em qualquer formato e devolve ddddd-ddd

        if (cep == undefined ) { return ''; }
        let cep2 = cep.replace(/[\D]/g,'');
        if(cep2.length  == 8) {
            cep2 = cep2.substr(0,5) + '-' + cep2.substr(5,3);
            return cep2;
        }
        else {
            return cep;
        }
    }

    public formata_sexo(sexo:string='', formatado:boolean=false) {
        if (sexo == undefined ) {
            sexo = '';
        }
        sexo = sexo ? sexo.toUpperCase() : '';
        if (sexo != 'M' && sexo != 'F') {
            sexo='';
        }
        if (formatado && sexo != '') {
            sexo = (sexo=='M') ? 'Masculino' : 'Feminino';
        }
        return sexo;
    }


    // IMPLEMENTAÇÃO ECMA6 TYPESCRIPT 2.1+ DE async/await
    async aguardar_segundos(quantos : number = 3) {
        for (let x=quantos; x--; x>0) {
            await this.sleep(1000);
            // console.log(x+1);
        }
    }

    sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }

    public capitalizar(str : string = '') {

        // ltrim
        // str = str.replace(/^\s+/,'');
        // retira espaços no inicio e fim
        str = str.trim();

        str = str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g,
            function(letter) {
                return letter.toUpperCase();
            }
        );

        str = str.replace(/ De | Do | Da | Dos | Das | Por | Para | E | Com | Em | À /g,
            function myFunction(x){
                return x.toLowerCase();
            }
        );

        // Exceções que devem ser em maiúsculas
        str = str.replace(/3m|S\/a|Ufrj|Uerj|Uff|Ufsc|Ufmg|S\.a\.|Iptu|Ipva|Iss|Irpf|Cnpj|Cpf|Anônimo/g,
            function myFunction(x){
                return x.toUpperCase();
            }
        );


        return str;
    }



    public incluir_marca(str : string, marca : string = ""){

        str = str.trim();
        marca = this.capitalizar(marca).trim();

        if (marca) {
            let x = str.toUpperCase();
            let y = marca.toUpperCase();
            if (!x.includes(y)){
                str = str + " - " + marca;
            }
        }
        return str;
    }


    public complementa(param : any, singular : string = '', plural : string = '') {

        let num : number;
        let str : string;

        if (!singular) {
            singular = 'registro';
        }
        if (!plural) {
            plural = 'registros';
        }

        if (typeof(param)=='string') {
            num  = Number(param);
        }
        else if (typeof(param)=='number') {
            num = param;
        }
        else {
            num = 0;
        }

        if (num < 1) {
            str = '';
        }
        else {
            str = num.toString();

            if (num == 1) {
                str += ' ' + singular;
            }
            else {
                str += ' ' + plural;
            }
        }

        return str;
    }

    public isNumeric(n) {
        // Caso não esteja buscando por verificar se é um número, mas sim se se comporta como se fosse
        // A ideia é que "1" é, para todos os efeitos, um número. Afinal você pode escrever "1"+2
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    public isNumber(val){
        return typeof val === "number"
    }

    public isString(val){
        return typeof val === "string"
    }

    public isBoolean(val){
        return typeof val === "boolean"
    }

    public isObject(val){
        return typeof val === "object"
    }

    public isFunction(val){
        return typeof val === "function"
    }





    public is_tela_pequena() {
        // window.screen.availWidth outra opcao
        if(window.innerWidth <= 600) {
            return true;
        } else {
            return false;
        }
        // Mas sem JavaScript, seria puro CSS: use @import condicional com media queries!
        //
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@import
        // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries
        // A ideia é carregar um arquivo CSS específico, de acordo com o tamanho da tela. Você pode facilmente colocar uma imagem como background-image de um div ou outro elemento (não precisa especificar URL da imagem no img do HTML).
        //
        // Mais ou menos assim:
        //
        // @import url('grande.css') screen and (min-width: 1080px);
        // @import url('medio.css') screen and (min-width: 640px);
        // @import url('pequeno.css') screen and (min-width: 256px);
        // Aí nem precisa JavaScript - a imagem vai ser escolhida pelo CSS que será importado de acordo com o tamanho da tela.
    }

    deepClone<T>(value): T {
        return clone<T>(value);
    }

    public clone(object: any){
        return JSON.parse(JSON.stringify(object));
    }

    public oa(sexo : string = 'M'){
        return (sexo=='F') ? 'a' : 'o';
    }

    public goTop() {
        window.scrollTo(0, 0);
    }

    public novo_id(temp : any) : string {
        let x, y, id, novo_id;
        let maior_id = 0;

        // Achar o ID mais alto para sugerir a continuação ao incluir
        for (x in temp) {
            y = temp[x].id ? this.apenas_numeros(temp[x].id) : '0';
            id = Number(y);
            if (id > maior_id){
                maior_id = id;
            }
        }
        novo_id = maior_id + 1;

        return this.formata_zeros_a_esquerda(novo_id,3);
    }



    public dataURItoBlob(dataURI) {
          // convert base64 to raw binary data held in a string
          // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
          let byteString = atob(dataURI.split(',')[1]);

          // separate out the mime component
          let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

          // write the bytes of the string to an ArrayBuffer
          let ab = new ArrayBuffer(byteString.length);
          let ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], {type: mimeString});
    }

}
