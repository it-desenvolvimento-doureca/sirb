import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMACORDOSService } from 'app/servicos/com-acordos.service';

@Component({
  selector: 'app-analise-acordos',
  templateUrl: './analise-acordos.component.html',
  styleUrls: ['./analise-acordos.component.css']
})
export class AnaliseAcordosComponent implements OnInit {
  ativobt = '1'
  btvoltar = true;
  acordos = [];
  acordos_all = [];
  analise1_acordo = null
  analise2_acordo = null;
  analise1_cliente = null
  clientes = [];
  analise1: any[] = [];
  loading_analise1;
  analise2: any[] = [];
  analise3: any[] = [];
  loading_analise2;
  data_inicio_analise2;
  data_inicio_analise3;
  data_fim_analise2;
  data_fim_analise3;
  loading_analise3;
  analise3_cliente;
  constructor(private router: Router, private COMACORDOSService: COMACORDOSService) { }

  ngOnInit() {
    this.carrega_acordos(true);
    this.carrega_clientes()
  }

  carrega_acordos(todos, cliente = null) {
    this.acordos = [];
    if (todos) this.acordos_all.push({ label: 'Sel. Acordo', value: "" });
    this.acordos.push({ label: 'Sel. Acordo', value: "" });
    this.COMACORDOSService.COM_ACORDOS_ANALISE_ACORDOS([{ ID_CLIENTE: cliente }]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          this.acordos.push({
            value: { ID: response[x][0], REFERENCIAS_SILVER: response[x][3], CONTRATOS: response[x][2], DATA_INICIO: response[x][6], DATA_FIM: response[x][7] },
            label: response[x][2] + " (" + response[x][4] + " - " + response[x][5] + " / " + response[x][8] + " - " + response[x][9] + ")"
          });
          if (todos) this.acordos_all.push({
            value: { ID: response[x][0], REFERENCIAS_SILVER: response[x][3], CONTRATOS: response[x][2], DATA_INICIO: response[x][6], DATA_FIM: response[x][7] },
            label: response[x][2] + " (" + response[x][4] + " - " + response[x][5] + " / " + response[x][8] + " - " + response[x][9] + ")"
          });
        }
        this.acordos = this.acordos.slice();
        this.acordos_all = this.acordos_all.slice();
      },
      error => {
        console.log(error);
      });
  }


  carrega_clientes() {
    this.clientes = [];
    this.clientes.push({ label: 'Sel. Cliente', value: "" });
    this.COMACORDOSService.COM_ACORDOS_ANALISE_CLIENTES([{}]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          this.clientes.push({
            value: { ID: response[x][1], REFERENCIAS_SILVER: response[x][2], CONTRATOS: response[x][3], DATA_INICIO: response[x][4], DATA_FIM: response[x][5] },
            label: response[x][1] + ' - ' + response[x][0]
          });
        }
        this.clientes = this.clientes.slice();
      },
      error => {
        console.log(error);
      });
  }


  backClicked() {
    //this.location.back();
    this.router.navigate(['comercial_acordos']);
  }

  /*** ANALISE 1 */
  alteraCliente(event) {
    if (event.value != "") {
      this.analise1_acordo = null;
      this.carrega_acordos(false, event.value.ID);
    } else {
      this.carrega_acordos(false);
    }
  }

  alteraAcordo(event) {
    if (event.value != "") {
      this.analise1_cliente = null;
    } else {
    }
  }

  atualizar_analise1() {
    this.loading_analise1 = true;
    this.analise1 = [];
    var DATA_INICIO = null;
    var DATA_FIM = null;
    var CONTRATO = null;
    var ID_REFERENCIA = null;
    var ID_ACORDO = null;

    if (this.analise1_acordo == '' || this.analise1_acordo == null) {
      DATA_INICIO = this.analise1_cliente.DATA_INICIO;
      DATA_FIM = this.analise1_cliente.DATA_FIM;
      CONTRATO = this.analise1_cliente.CONTRATOS;
      ID_REFERENCIA = this.analise1_cliente.REFERENCIAS_SILVER;
      ID_ACORDO = null;
    } else {
      DATA_INICIO = this.analise1_acordo.DATA_INICIO;
      DATA_FIM = this.analise1_acordo.DATA_FIM;
      CONTRATO = this.analise1_acordo.CONTRATOS;
      ID_REFERENCIA = this.analise1_acordo.REFERENCIAS_SILVER;
      ID_ACORDO = this.analise1_acordo.ID;
    }


    this.COMACORDOSService.COM_ACORDOS_ANALISE_1([{ DATA_INICIO: DATA_INICIO, DATA_FIM: DATA_FIM, CONTRATO: CONTRATO, ID_REFERENCIA: ID_REFERENCIA, ID_ACORDO: ID_ACORDO }]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          var anos_array = response[x][14].split(",");
          var anos = [];
          for (var y in anos_array) {
            anos.push({ ano: anos_array[y], valor: null });
          }

          var analise1 = this.analise1.find(item => item.referencia == response[x][4] && item.acordo == response[x][1]);
          if (!analise1) {
            this.analise1.push({
              referencia_text: response[x][4] + ' ( Acordo:' + response[x][1] + ')',
              referencia: response[x][4],
              acordo: response[x][1],
              anos: anos_array,
              dados: this.carregatabela_analise1(anos)
            });
          }

          this.carregadados1(response, x)

        }
        this.loading_analise1 = false;
      },
      error => {
        this.loading_analise1 = false;
        console.log(error);
      });

  }

  carregadados1(res, y) {
    var analise1 = this.analise1.find(item => item.referencia == res[y][4] && item.acordo == res[y][1]);
    if (res[y][0] == 'VOLUME') {
      var arr_Encomendado = analise1.dados[0];
      var arr_Encomendado2 = arr_Encomendado.valores.find(item => item.ano == res[y][3]);
      if (arr_Encomendado2) arr_Encomendado2.valor = res[y][12];
    } if (res[y][0] == 'ENCOMENDAS') {

      var arr_Encomendado = analise1.dados[2];
      var arr_Encomendado2 = arr_Encomendado.valores.find(item => item.ano == res[y][3]);
      if (arr_Encomendado2) arr_Encomendado2.valor = res[y][11];



    } else if (res[y][0] == 'FATURACAO') {

      var arr_Enviado = analise1.dados[1];
      var arr_Enviado2 = arr_Enviado.valores.find(item => item.ano == res[y][3]);
      if (arr_Enviado2) arr_Enviado2.valor = res[y][7];

      var arr_Valor_de_Venda = analise1.dados[3];
      var arr_Valor_de_Venda2 = arr_Valor_de_Venda.valores.find(item => item.ano == res[y][3]);
      if (arr_Valor_de_Venda2) arr_Valor_de_Venda2.valor = this.formatMoney(res[y][8], 2, ",", ".", ' €');

      var arr_Amortiz_Realizada_p = analise1.dados[5];
      var arr_Amortiz_Realizada_p2 = arr_Amortiz_Realizada_p.valores.find(item => item.ano == res[y][3]);
      if (arr_Amortiz_Realizada_p2) arr_Amortiz_Realizada_p2.valor = res[y][9];

      var arr_Amortiz_Realizada_v = analise1.dados[6];
      var arr_Amortiz_Realizada_v2 = arr_Amortiz_Realizada_v.valores.find(item => item.ano == res[y][3]);
      if (arr_Amortiz_Realizada_v2) arr_Amortiz_Realizada_v2.valor = this.formatMoney(res[y][10], 2, ",", ".", ' €');

      var arr_Acumulado_LTA = analise1.dados[7];
      var arr_Acumulado_LTA2 = arr_Acumulado_LTA.valores.find(item => item.ano == res[y][3]);
      if (arr_Acumulado_LTA2) arr_Acumulado_LTA2.valor = this.formatMoney(res[y][13], 2, ",", ".", ' €');
    }
  }


  carregatabela_analise1(anos) {
    var tabela_analises = []
    tabela_analises.push({ desc: 'Volumes Acordados', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Enviado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Encomendado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor de Venda', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Def. (nº peças)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (nº Peças)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (valor)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor Acumulado LTA', valores: JSON.parse(JSON.stringify(anos)) });

    return tabela_analises;
  }

  limpar_analise1() {
    this.analise1_acordo = null;
    this.analise1_cliente = null;
    this.carrega_acordos(false);
  }

  /*** ANALISE 2 */
  atualizar_analise2() {
    this.analise2 = [];
    this.loading_analise2 = true;
    /*var anos = [];
    for (var x in anos_array) {
      anos.push({ ano: anos_array[x], valor: 10 + parseInt(x) });
    }

    this.analise2.push({
      referencia: "XCVRRR",
      anos: anos_array,
      dados: this.carregatabela_analise2(anos)
    });*/

    var DATA_INICIO = this.formatDate(this.data_inicio_analise2);
    var DATA_FIM = this.formatDate(this.data_fim_analise2);
    var CONTRATO = null;
    var ID_REFERENCIA = null;
    var ID_ACORDO = null;


    if (this.analise2_acordo == '' || this.analise2_acordo == null) {
    } else {
      CONTRATO = this.analise2_acordo.CONTRATOS;
      ID_REFERENCIA = this.analise2_acordo.REFERENCIAS_SILVER;
      ID_ACORDO = this.analise2_acordo.ID;
    }


    this.COMACORDOSService.COM_ACORDOS_ANALISE_1([{ DATA_INICIO: DATA_INICIO, DATA_FIM: DATA_FIM, CONTRATO: CONTRATO, ID_REFERENCIA: ID_REFERENCIA, ID_ACORDO: ID_ACORDO }]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          var anos_array = response[x][14].split(",");
          var anos = [];
          for (var y in anos_array) {
            anos.push({ ano: anos_array[y], valor: null });
          }

          var analise2 = this.analise2.find(item => item.referencia == response[x][4] && item.acordo == response[x][1]);
          if (!analise2) {
            this.analise2.push({
              referencia_text: response[x][4] + ' ( Acordo:' + response[x][1] + ')',
              referencia: response[x][4],
              acordo: response[x][1],
              anos: anos_array,
              dados: this.carregatabela_analise2(anos)
            });
          }

          this.carregadados2(response, x)

        }

        this.loading_analise2 = false;
      },
      error => {
        this.loading_analise2 = false;
        console.log(error);
      });

  }

  carregadados2(res, y) {
    var analise2 = this.analise2.find(item => item.referencia == res[y][4] && item.acordo == res[y][1]);
    if (res[y][0] == 'VOLUME') {
      /* var arr_Encomendado = analise2.dados[0];
       var arr_Encomendado2 = arr_Encomendado.valores.find(item => item.ano == res[y][3]);
       if (arr_Encomendado2) arr_Encomendado2.valor = res[y][12];*/
    } if (res[y][0] == 'ENCOMENDAS') {

      var arr_Encomendado = analise2.dados[1];
      var arr_Encomendado2 = arr_Encomendado.valores.find(item => item.ano == res[y][3]);
      if (arr_Encomendado2) arr_Encomendado2.valor = res[y][11];



    } else if (res[y][0] == 'FATURACAO') {

      var arr_Enviado = analise2.dados[0];
      var arr_Enviado2 = arr_Enviado.valores.find(item => item.ano == res[y][3]);
      if (arr_Enviado2) arr_Enviado2.valor = res[y][7];

      var arr_Valor_de_Venda = analise2.dados[2];
      var arr_Valor_de_Venda2 = arr_Valor_de_Venda.valores.find(item => item.ano == res[y][3]);
      if (arr_Valor_de_Venda2) arr_Valor_de_Venda2.valor = this.formatMoney(res[y][8], 2, ",", ".", ' €');

      var arr_Amortiz_Realizada_p = analise2.dados[3];
      var arr_Amortiz_Realizada_p2 = arr_Amortiz_Realizada_p.valores.find(item => item.ano == res[y][3]);
      if (arr_Amortiz_Realizada_p2) arr_Amortiz_Realizada_p2.valor = res[y][9];

      var arr_Amortiz_Realizada_v = analise2.dados[4];
      var arr_Amortiz_Realizada_v2 = arr_Amortiz_Realizada_v.valores.find(item => item.ano == res[y][3]);
      if (arr_Amortiz_Realizada_v2) arr_Amortiz_Realizada_v2.valor = this.formatMoney(res[y][10], 2, ",", ".", ' €');

      var arr_Acumulado_LTA = analise2.dados[5];
      var arr_Acumulado_LTA2 = arr_Acumulado_LTA.valores.find(item => item.ano == res[y][3]);
      if (arr_Acumulado_LTA2) arr_Acumulado_LTA2.valor = this.formatMoney(res[y][13], 2, ",", ".", ' €');
    }
  }

  carregatabela_analise2(anos) {
    var tabela_analises = []
    tabela_analises.push({ desc: 'Enviado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Encomendado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor de Venda', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (nº Peças)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (valor)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor Acumulado LTA', valores: JSON.parse(JSON.stringify(anos)) });

    return tabela_analises;
  }

  limpar_analise2() {
    this.data_inicio_analise2 = null;
    this.data_fim_analise2 = null;
    this.analise2_acordo = null;
  }

  /*** ANALISE 3 */
  atualizar_analise3() {
    this.analise3 = [];
    var tipos_array = ['Volumes Acordados',
      'Enviado', 'Encomendado',
      'Valor de Venda', 'Amortiz Def. (nº peças)',
      'Amortiz Realizada (nº Peças)',
      'Amortiz Realizada (valor)', 'Valor Acumulado LTA'];

    // var tabela_acordos = ["ZSDSD1 (poopoads/55665d65dadadas)", "DDASDSADASDS (poopoads/55665d65dadadas)", "11-DDAGG (poopoads/55665d65dadadas)"]
    var tabela_acordos = []
    this.analise3 = [];
    this.loading_analise3 = true;


    var DATA_INICIO = this.formatDate(this.data_inicio_analise3);
    var DATA_FIM = this.formatDate(this.data_fim_analise3);
    var CONTRATO = null;
    var ID_REFERENCIA = null;


    CONTRATO = this.analise3_cliente.CONTRATOS;
    ID_REFERENCIA = this.analise3_cliente.REFERENCIAS_SILVER;

    var dados = [];
    this.COMACORDOSService.COM_ACORDOS_ANALISE_3([{ DATA_INICIO: DATA_INICIO, DATA_FIM: DATA_FIM, CONTRATO: CONTRATO, ID_REFERENCIA: ID_REFERENCIA }]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {




          var valorVolumes_Acordados = response[x][8];
          var valorEnviado = response[x][3];
          var valorEncomendado = response[x][7];
          var valorValor_de_Venda = this.formatMoney(response[x][4], 2, ",", ".", ' €');
          var valorAmortiz_Def = null;
          var valorAmortiz_Realizada_pecas = response[x][5];
          var valorAmortiz_Realizada_valor = this.formatMoney(response[x][6], 2, ",", ".", ' €');
          var valorValor_Acumulado_LTA = this.formatMoney(response[x][9], 2, ",", ".", ' €');;


          dados.push({
            desc: 'Acordo ' + response[x][0] + ' (' + response[x][1] + ' / ' + response[x][2] + ')',
            valores: [valorVolumes_Acordados, valorEnviado, valorEncomendado, valorValor_de_Venda, valorAmortiz_Def,
              valorAmortiz_Realizada_pecas, valorAmortiz_Realizada_valor, valorValor_Acumulado_LTA]
          });

        }

        this.analise3.push({
          tipos: tipos_array,
          dados: dados
        });
        //this.carregadados2(response, x)

        this.loading_analise3 = false;
      },
      error => {
        this.loading_analise3 = false;
        console.log(error);
      });

  }

  carregatabela_analise3(tabela_acordos, tipos) {
    var dados = [];
    for (var y in tabela_acordos) {
      dados.push({ desc: tabela_acordos[y], valores: JSON.parse(JSON.stringify(tipos)) });
    }
    return dados;
  }

  limpar_analise3() {
    this.data_inicio_analise3 = null;
    this.data_fim_analise3 = null;
  }


  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",", symbol = '') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "") + symbol;
    } catch (e) {
      console.log(e)
    }
  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
