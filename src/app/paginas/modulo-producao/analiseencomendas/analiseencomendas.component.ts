import { Component, OnInit, ElementRef } from '@angular/core';
import { GERDICPROJCABService } from 'app/servicos/ger-dic-proj-cab.service';
import { GERDICPROGRAMAService } from 'app/servicos/ger-dic-programa.service';
import { GERDICFABRICAService } from 'app/servicos/ger-dic-fabrica.service';
import { GERDICVEICULOService } from 'app/servicos/ger-dic-veiculo.service';
import { GERDICOEMService } from 'app/servicos/ger-dic-oem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-analiseencomendas',
  templateUrl: './analiseencomendas.component.html',
  styleUrls: ['./analiseencomendas.component.css']
})
export class AnaliseencomendasComponent implements OnInit {

  dados = [];
  ativobt = "1";
  filteredItems = [];
  dados_referencias = [];
  loading: boolean;
  data;
  lista_armazens = [];
  armazens = [];
  clientes = [];
  referencia_principal;
  nome_cliente;
  codigo_cliente;

  dados_tabela = []
  armazens_enc = [];
  clientes_enc = [];
  data_enc;
  referencia_principal_enc;
  nome_cliente_enc;
  codigo_cliente_enc;
  lista_clientes: any[];
  campo_ref: any;
  artigos: any[];
  campo_ref_enc: any[];
  campo_ref_encomendas: any[];
  filteredreferencias_enc: any[] = [];
  filteredreferencias: any[] = [];
  negativos: any;
  negativos_enc: any;
  lista_veiculos = [];
  veiculos = [];
  veiculos_enc = [];
  lista_programas = [];
  programas = [];
  programas_enc = [];
  lista_oem = [];
  oem = [];
  oem_enc = [];
  lista_fabricas = [];
  fabricas = [];
  fabricas_enc = [];
  referencia_principal_encomendas: any;
  filteredreferencias_encomendas: any[] = [];
  nome_cliente_encomendas;
  codigo_cliente_encomendas;
  semana_analise;
  programas_encomendas;
  veiculos_encomendas;
  oem_encomendas;
  fabricas_encomendas;
  analises_enc: any[] = [];
  loading_encomendas: boolean;
  dia_1: any;
  dia_2: any;
  dia_3: any;
  dia_4: any;
  dia_5: any;
  week: number;
  data_inicio_semana: string;
  data_fim_semana: any;
  array_semanas: any[];
  ano_analise: any;
  anos = [];
  semanas = [];
  data_inicio: Date;
  total_real: number;
  total_atraso: any;
  total_variacao: number;
  total_variacao_1: number;
  total_variacao_2: number;
  total_variacao_3: number;
  total_prev_1: number;
  total_prev_2: number;
  total_prev_3: number;
  total_prev_4: number;
  data_enc_inicio;
  calcula: boolean;
  calcula_1: boolean;
  calcula_2: boolean;
  calcula_3: boolean;
  calcula_4: boolean;

  constructor(private GERDICPROJCABService: GERDICPROJCABService, private elementRef: ElementRef,
    private GERDICPROGRAMAService: GERDICPROGRAMAService, private GERDICFABRICAService: GERDICFABRICAService
    , private GERDICVEICULOService: GERDICVEICULOService, private GERDICOEMService: GERDICOEMService, private route: ActivatedRoute,
    private router: Router, private location: Location
  ) { }

  ngOnInit() {
    var ano;
    var semana;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        ano = params['ano'] || null;
        semana = params['semana'] || null;
      });


    for (var x = 2017; x <= new Date().getFullYear() + 10; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var x = 1; x <= 53; x++) {
      this.semanas.push({ value: x, label: x })
    }

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

    var date = new Date();
    var data_semana = new Date();

    var lastDay = new Date(date.getFullYear(),
      date.getMonth(), this.daysInMonth(date.getMonth() + 1,
        date.getFullYear()));

    this.data = this.formatDate(lastDay);
    this.data_inicio = this.firstDayInPreviousMonth(new Date());
    this.data_enc = this.formatDate(lastDay);
    this.data_enc_inicio = this.firstDayInPreviousMonth(new Date());

    data_semana.setDate(date.getDate() - 7);

    if (semana != null && ano != null) {
      this.semana_analise = semana;
      this.ano_analise = ano;
      document.getElementById("tab1").classList.remove("active");
      document.getElementById("tab2").classList.remove("active");
      document.getElementById("tab3").classList.add("active");
      this.ativobt = '3';
    } else {
      this.semana_analise = this.getWeek(data_semana);
      this.ano_analise = data_semana.getFullYear();
    }

    this.carregaarmazens();
    this.carregaprogramas();
    this.carregaveiculos();
    this.carregaoem();
    this.carregafabricas();
    this.carregaclientes();
    this.carregaref();
    this.carregatabela();
    this.listar_refs();
    this.carrega_analises_previsoes_realizacoes();


    /*this.dados_referencias.push({
      id: 1,
      cod_ref: "AA",
      design: "AAS MD",
      fase: "PROJETO",
      stock: 500,
      total_enc: 200,
      diferenca: 300,
      atualiza: false, iconplus: true,
      atualizaenc: false, iconplusenc: true,
      atualizacomp: false, iconpluscomp: true,
      atualizaoem: false, iconplusoem: true,
      atualizafab: false, iconplusfab: true,
      encomendas: [{ data: '2020-02-02', quantidade_encomenda: 100, cod_cliente: "001", estabelecimento: "adsda", nome_cliente: "AD ASD", disponibilidade: 300 }],
      componentes: [{ cod_ref: "BB", design: "AAS MD", stock: 120 }],
      oem: [{ nome: "BB", veiculo: "AAS MD", programa: 120 }],
      fabricas: [{ nome: "Fabrica A", percentagem: 25, programa: 120 }],

    });*/


  }

  firstDayInPreviousMonth(date) {
    var ano = date.getFullYear();
    var mes = date.getMonth();
    if (mes == 1) {
      mes = 13;
      ano = date.getFullYear() - 1;
    }
    return new Date(ano, mes - 1, 1);
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  carregatabela() {

    var armazens = null;
    var clientes = null;
    var referencia_principal = null;
    var nome_cliente = null;
    var codigo_cliente = null;
    var negativos = 0;
    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;


    if (this.programas_enc != null && this.programas_enc.length > 0) { programas = this.programas_enc.toString() }
    if (this.veiculos_enc != null && this.veiculos_enc.length > 0) { veiculos = this.veiculos_enc.toString() }
    if (this.oem_enc != null && this.oem_enc.length > 0) { oem = this.oem_enc.toString() }
    if (this.fabricas_enc != null && this.fabricas_enc.length > 0) { fabricas = this.fabricas_enc.toString() }


    if (this.armazens_enc != null && this.armazens_enc.length > 0) { armazens = this.armazens_enc.toString() }
    if (this.clientes_enc != null && this.clientes_enc.length > 0) { clientes = this.clientes_enc.toString() }
    if (this.referencia_principal_enc != "" && this.referencia_principal_enc != null) { referencia_principal = this.referencia_principal_enc }
    if (this.nome_cliente_enc != "" && this.nome_cliente_enc != null) { nome_cliente = this.nome_cliente_enc }
    if (this.codigo_cliente_enc != "" && this.codigo_cliente_enc != null) { codigo_cliente = this.codigo_cliente_enc }
    if (this.negativos_enc) { negativos = 1 }

    var data = [{
      DATA_INICIO: this.formatDate(this.data_enc_inicio),
      DATA: this.formatDate(this.data_enc), ARMAZENS: armazens, COD_CLIENTE: codigo_cliente,
      NOME_CLIENTE: nome_cliente, PROREF: referencia_principal, CLIENTES: clientes, NEGATIVOS: negativos,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas
    }];

    this.dados_tabela = [];
    this.GERDICPROJCABService.analisePORencomendas(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        var disponibilidade = 0;
        var stock = 0;
        if (count > 0) {
          for (var x in response) {

            if (!this.dados_tabela.find(item => item.referencia == response[x][1])) {
              stock = response[x][4]
              disponibilidade = (stock - response[x][3]);
            } else {
              var array = this.dados_tabela.filter(item => item.referencia == response[x][1]);
              disponibilidade = (array[array.length - 1].quantidade) * 1 - (response[x][3]) * 1;
            }

            this.dados_tabela.push({
              data: response[x][0],
              referencia: response[x][1],
              descricao: response[x][2],
              quantidade_encomenda: response[x][3],
              quantidade: disponibilidade,//response[x][3],
              //fabrica1: ((response[x][5] == null) ? '' : response[x][5]) + ' ' + ((response[x][6] == null) ? '' : response[x][6] + '%'),
              //fabrica2: ((response[x][7] == null) ? '' : response[x][7]) + ' ' + ((response[x][8] == null) ? '' : response[x][8] + '%'),
              //fabrica3: ((response[x][9] == null) ? '' : response[x][9]) + ' ' + ((response[x][10] == null) ? '' : response[x][10] + '%'),
              //fabrica4: ((response[x][11] == null) ? '' : response[x][11]) + ' ' + ((response[x][12] == null) ? '' : response[x][12] + '%'),
              fabricas: ((response[x][5] == null) ? '' : response[x][5]) + ' ' + ((response[x][6] == null) ? '' : response[x][6] + '%')
                + ((response[x][7] == null) ? '' : ' | ' + response[x][7]) + ' ' + ((response[x][8] == null) ? '' : response[x][8] + '%')
                + ((response[x][9] == null) ? '' : ' | ' + response[x][9]) + ' ' + ((response[x][10] == null) ? '' : response[x][10] + '%')
                + ((response[x][11] == null) ? '' : ' | ' + response[x][11]) + ' ' + ((response[x][12] == null) ? '' : response[x][12] + '%'),
              cliente: response[x][16] + ' - ' + response[x][17],
              oem: response[x][13],
              projeto: response[x][14],
            });
          }
          this.dados_tabela = this.dados_tabela.slice();
        }

      }, error => {
        console.log(error);
      });
  }

  carregaarmazens() {
    this.lista_armazens = [];
    this.GERDICPROJCABService.getArmazens().subscribe(
      response => {
        for (var x in response) {
          this.lista_armazens.push({ label: response[x][0] + ' - ' + response[x][1], value: response[x][0] });
        }

        this.lista_armazens = this.lista_armazens.slice();
      }, error => {
        console.log(error);
      });

  }

  carregaprogramas() {
    this.lista_programas = [];
    this.GERDICPROGRAMAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_programas.push({ label: response[x][1] + ' - ' + response[x][0].nome, value: response[x][0].id_PROGRAMA });
        }

        this.lista_programas = this.lista_programas.slice();
      }, error => {
        console.log(error);
      });

  }

  carregaveiculos() {
    this.lista_veiculos = [];
    this.GERDICVEICULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_veiculos.push({ label: response[x][1] + ' - ' + response[x][0].nome, value: response[x][0].id_VEICULO });
        }

        this.lista_veiculos = this.lista_veiculos.slice();
      }, error => {
        console.log(error);
      });

  }

  carregaoem() {
    this.lista_oem = [];
    this.GERDICOEMService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_oem.push({ label: response[x].nome, value: response[x].id_OEM });
        }

        this.lista_oem = this.lista_oem.slice();
      }, error => {
        console.log(error);
      });

  }

  carregafabricas() {
    this.lista_fabricas = [];
    this.GERDICFABRICAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_fabricas.push({ label: response[x].nome, value: response[x].id_FABRICA });
        }

        this.lista_fabricas = this.lista_fabricas.slice();
      }, error => {
        console.log(error);
      });

  }


  carregaclientes() {
    this.lista_clientes = [];
    this.GERDICPROJCABService.getClientes().subscribe(
      response => {
        for (var x in response) {
          this.lista_clientes.push({ label: response[x][0] + ' - ' + response[x][1], value: response[x][0] });
        }

        this.lista_clientes = this.lista_clientes.slice();
      }, error => {
        console.log(error);
      });

  }

  limparfiltros1() {
    this.programas = null;
    this.veiculos = null;
    this.oem = null;
    this.fabricas = null;
    this.armazens = null;
    this.clientes = null;
    this.referencia_principal = null;
    this.nome_cliente = null;
    this.codigo_cliente = null;
    this.negativos = false;
    this.campo_ref = null;
  }

  limparfiltros2() {
    this.programas_enc = null;
    this.veiculos_enc = null;
    this.oem_enc = null;
    this.fabricas_enc = null;
    this.armazens_enc = null;
    this.clientes_enc = null;
    this.referencia_principal_enc = null;
    this.nome_cliente_enc = null;
    this.codigo_cliente_enc = null;
    this.negativos_enc = false;
    this.campo_ref_enc = null;

  }

  limparfiltros3() {
    this.programas_encomendas = null;
    this.veiculos_encomendas = null;
    this.oem_encomendas = null;
    this.fabricas_encomendas = null;
    this.codigo_cliente_encomendas = null;
    this.nome_cliente_encomendas = null;
    this.referencia_principal_encomendas = null;
    this.campo_ref_encomendas = null;

  }

  carregaref() {
    this.loading = true;
    this.dados_referencias = [];
    this.dados = [];

    var armazens = null;
    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var clientes = null;
    var referencia_principal = null;
    var nome_cliente = null;
    var codigo_cliente = null;
    var negativos = 0;

    if (this.programas != null && this.programas.length > 0) { programas = this.programas.toString() }
    if (this.veiculos != null && this.veiculos.length > 0) { veiculos = this.veiculos.toString() }
    if (this.oem != null && this.oem.length > 0) { oem = this.oem.toString() }
    if (this.fabricas != null && this.fabricas.length > 0) { fabricas = this.fabricas.toString() }

    if (this.armazens != null && this.armazens.length > 0) { armazens = this.armazens.toString() }
    if (this.clientes != null && this.clientes.length > 0) { clientes = this.clientes.toString() }
    if (this.referencia_principal != "" && this.referencia_principal != null) { referencia_principal = this.referencia_principal }
    if (this.nome_cliente != "" && this.nome_cliente != null) { nome_cliente = this.nome_cliente }
    if (this.codigo_cliente != "" && this.codigo_cliente != null) { codigo_cliente = this.codigo_cliente }
    if (this.negativos) { negativos = 1 }

    var data = [{
      DATA_INICIO: this.formatDate(this.data_inicio),
      DATA: this.formatDate(this.data), ARMAZENS: armazens, COD_CLIENTE: codigo_cliente,
      NOME_CLIENTE: nome_cliente, PROREF: referencia_principal, CLIENTES: clientes, NEGATIVOS: negativos,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas
    }];

    this.GERDICPROJCABService.analiseencomendasREFERENCIAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        var row = 0;
        if (count > 0) {
          for (var x in response) {
            row++;
            this.dados_referencias.push({
              id: row,
              cod_ref: response[x][0],
              design: response[x][1],
              fase: response[x][2],
              stock: response[x][4],
              total_enc: response[x][3],
              pv: response[x][5],
              diferenca: (response[x][4] - response[x][3]),
              atualiza: false, iconplus: true,
              atualizaenc: false, iconplusenc: true,
              atualizacomp: false, iconpluscomp: true,
              atualizaoem: false, iconplusoem: true,
              atualizafab: false, iconplusfab: true,
              encomendas: [],
              componentes: [],
              oem: [],
              fabricas: [],

            });
          }
          this.assignCopy()
        }
        this.loading = false;

      }, error => {
        this.loading = false;
      });



  }

  getdadosreferencia(id) {
    this.dados_referencias.find(item => item.id == id).iconplus = !this.dados_referencias.find(item => item.id == id).iconplus;
    var PROREF = this.dados_referencias.find(item => item.id == id).cod_ref;
    /*var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim), LINHA: this.linha, PROREF: PROREF, FAM: null
    }];*/

    var index = this.dados_referencias.findIndex(item => item.id == id);

    if (this.dados_referencias.find(item => item.id == id).encomendas.length == 0 && !this.dados_referencias.find(item => item.id == id).atualizaenc) {
      this.carregaENCOMENDAS(index, id, PROREF)
    }

    if (this.dados_referencias.find(item => item.id == id).componentes.length == 0 && !this.dados_referencias.find(item => item.id == id).atualizacomp) {
      this.carregaCOMPONENTES(index, id, PROREF)
    }

    if (this.dados_referencias.find(item => item.id == id).oem.length == 0 && !this.dados_referencias.find(item => item.id == id).atualizaoem) {
      this.carregaOEM(index, id, PROREF)
    }

    if (this.dados_referencias.find(item => item.id == id).fabricas.length == 0 && !this.dados_referencias.find(item => item.id == id).atualizafab) {
      this.carregaFABRICAS(index, id, PROREF)
    }

    /* setTimeout(() => {
              document.getElementById("referencia" + id).classList.remove("collapsed");
              document.getElementById("collapseref" + id).classList.add("in");
              document.getElementById("collapseref" + id).style.height = "auto";
              this.dados_referencias.find(item => item.id == id).iconplus = false;
            }, 50);*/
  }

  carregaENCOMENDAS(index, id, PROREF) {
    this.dados_referencias[index].iconplusenc = true;
    this.dados_referencias[index].atualizaenc = true;

    var armazens = null;
    var referencia_principal = null;
    var nome_cliente = null;
    var codigo_cliente = null;


    if (this.armazens != null && this.armazens.length > 0) { armazens = this.armazens.toString() }
    if (this.referencia_principal != "" && this.referencia_principal != null) { referencia_principal = this.referencia_principal }
    if (this.nome_cliente != "" && this.nome_cliente != null) { nome_cliente = this.nome_cliente }
    if (this.codigo_cliente != "" && this.codigo_cliente != null) { codigo_cliente = this.codigo_cliente }

    var data = [{
      PROREF: PROREF, DATA_INICIO: this.formatDate(this.data_inicio), DATA: this.formatDate(this.data), ARMAZENS: armazens, COD_CLIENTE: codigo_cliente,
      NOME_CLIENTE: nome_cliente
    }];
    this.GERDICPROJCABService.analiseencomendasENCOMENDAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var stock = 0;
          var disponibilidade = 0;
          var saldo_total = 0;
          var semana = null;
          for (var x in response) {

            if (parseInt(x) == 0) {
              stock = response[x][8];
            }

            disponibilidade = (stock - response[x][7]);
            stock = (stock - response[x][7]);

            if (semana == response[x][9]) {

            } else {
              saldo_total = (response[x][11] == null) ? 0 : response[x][11];
            }
            saldo_total = saldo_total - response[x][7];
            semana = response[x][9];

            this.dados_referencias[index].encomendas.push(
              {
                data: this.formatDate(response[x][3]), quantidade_encomenda: response[x][7],
                cod_cliente: response[x][4], estabelecimento: response[x][5], nome_cliente: response[x][6]
                , disponibilidade: disponibilidade, semana: response[x][9], quant_min_encomenda: response[x][10]
                , quant_max_encomenda: response[x][11], quantidade_saldo: saldo_total
              }
            );
          }

          setTimeout(() => {
            document.getElementById("collapseenc" + id + "encomendas").classList.remove("collapsed");
            document.getElementById("collapseencomendas" + id + "encomendas").classList.add("in");
            document.getElementById("collapseencomendas" + id + "encomendas").style.height = "auto";
            this.dados_referencias.find(item => item.id == id).iconplusenc = false;
          }, 50);

        } else {
          this.dados_referencias[index].iconplusenc = true;
        }
        this.dados_referencias[index].atualizaenc = false;
      }, error => {
        this.dados_referencias[index].atualizaenc = false;
      });
  }


  carregaCOMPONENTES(index, id, PROREF) {
    this.dados_referencias[index].iconpluscomp = true;
    this.dados_referencias[index].atualizacomp = true;
    var data = [{ PROREF: PROREF }];
    this.GERDICPROJCABService.analiseencomendasCOMPONENTES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var filho1 = this.dados_referencias[index].componentes.find(item => item.cod_ref == response[x][3]);
            var filho2;
            var filho3;
            var filho4;
            var filho5;
            var filho6;
            var filho7;
            if (response[x][7] != null && filho1) { filho2 = filho1.filhos.find(item => item.cod_ref == response[x][7]); }
            if (response[x][11] != null && filho2) { filho3 = filho2.filhos.find(item => item.cod_ref == response[x][11]); }
            if (response[x][15] != null && filho3) { filho4 = filho3.filhos.find(item => item.cod_ref == response[x][15]); }
            if (response[x][19] != null && filho4) { filho5 = filho4.filhos.find(item => item.cod_ref == response[x][19]); }
            if (response[x][23] != null && filho5) { filho6 = filho5.filhos.find(item => item.cod_ref == response[x][23]); }
            if (response[x][27] != null && filho6) { filho7 = filho6.filhos.find(item => item.cod_ref == response[x][27]); }

            if (!filho1) {
              this.dados_referencias[index].componentes.push({ cod_ref: response[x][3], design: response[x][4], stock: response[x][6], filhos: this.getfilhos2(response, x) });
            }


            if (response[x][7] != null && filho1 && !filho2) {
              filho1.filhos.push({ cod_ref: response[x][7], design: response[x][8], stock: response[x][10], filhos: this.getfilhos3(response, x) });
            }
            if (response[x][11] != null && filho2 && !filho3) {
              filho2.filhos.push({ cod_ref: response[x][11], design: response[x][12], stock: response[x][14], filhos: this.getfilhos4(response, x) });
            }
            if (response[x][15] != null && filho3 && !filho4) {
              filho3.filhos.push({ cod_ref: response[x][15], design: response[x][16], stock: response[x][18], filhos: this.getfilhos5(response, x) });
            }
            if (response[x][19] != null && filho4 && !filho5) {
              filho4.filhos.push({ cod_ref: response[x][19], design: response[x][20], stock: response[x][22], filhos: this.getfilhos6(response, x) });
            }
            if (response[x][23] != null && filho5 && !filho6) {
              filho5.filhos.push({ cod_ref: response[x][23], design: response[x][24], stock: response[x][26], filhos: this.getfilhos7(response, x) });
            }
            if (response[x][27] != null && filho6 && !filho7) {
              filho6.filhos.push({ cod_ref: response[x][27], design: response[x][28], stock: response[x][30] });
            }


            // if (response[x][7] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●● " + response[x][7], design: response[x][8], stock: response[x][10] }); }
            //if (response[x][11] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●●● " + response[x][11], design: response[x][12], stock: response[x][14] }); }
            // if (response[x][15] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●●●● " + response[x][15], design: response[x][16], stock: response[x][18] }); }
            // if (response[x][19] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●●●●● " + response[x][19], design: response[x][20], stock: response[x][22] }); }
            // if (response[x][23] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●●●●●● " + response[x][23], design: response[x][24], stock: response[x][26] }); }
            //if (response[x][27] != null) { this.dados_referencias[index].componentes.push({ cod_ref: "●●●●●●● " + response[x][27], design: response[x][28], stock: response[x][30] }); }


          }


          setTimeout(() => {
            document.getElementById("collapsecomp" + id + "componentes").classList.remove("collapsed");
            document.getElementById("collapsecomponentes" + id + "componentes").classList.add("in");
            document.getElementById("collapsecomponentes" + id + "componentes").style.height = "auto";
            this.dados_referencias.find(item => item.id == id).iconpluscomp = false;
          }, 50);
        } else {
          this.dados_referencias[index].iconpluscomp = true;
        }
        this.dados_referencias[index].atualizacomp = false;
      }, error => {
        this.dados_referencias[index].atualizacomp = false;
      });
  }

  getfilhos2(response, x) {
    if (response[x][7] != null) {
      return [{ cod_ref: response[x][7], design: response[x][8], stock: response[x][10], filhos: this.getfilhos3(response, x) }]
    } else {
      return [];
    }
  }

  getfilhos3(response, x) {
    if (response[x][11] != null) {
      return [{ cod_ref: response[x][11], design: response[x][12], stock: response[x][14], filhos: this.getfilhos4(response, x) }]
    } else {
      return [];
    }
  }

  getfilhos4(response, x) {
    if (response[x][15] != null) {
      return [{ cod_ref: response[x][15], design: response[x][16], stock: response[x][18], filhos: this.getfilhos5(response, x) }]
    } else {
      return [];
    }
  }

  getfilhos5(response, x) {
    if (response[x][19] != null) {
      return [{ cod_ref: response[x][19], design: response[x][20], stock: response[x][22], filhos: this.getfilhos6(response, x) }]
    } else {
      return [];
    }
  }

  getfilhos6(response, x) {
    if (response[x][23] != null) {
      return [{ cod_ref: response[x][23], design: response[x][24], stock: response[x][26], filhos: this.getfilhos7(response, x) }]
    } else {
      return [];
    }
  }

  getfilhos7(response, x) {
    if (response[x][27] != null) {
      return [{ cod_ref: response[x][27], design: response[x][28], stock: response[x][30] }]
    } else {
      return [];
    }
  }

  carregaOEM(index, id, PROREF) {
    this.dados_referencias[index].iconplusoem = true;
    this.dados_referencias[index].atualizaoem = true;
    var data = [{ PROREF: PROREF }];
    this.GERDICPROJCABService.analiseencomendasOEM(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.dados_referencias[index].oem.push({ nome: response[x][0], veiculo: response[x][1], programa: response[x][2] });
          }

          setTimeout(() => {
            document.getElementById("collapseoem" + id + "oems").classList.remove("collapsed");
            document.getElementById("collapseoems" + id + "oems").classList.add("in");
            document.getElementById("collapseoems" + id + "oems").style.height = "auto";
            this.dados_referencias.find(item => item.id == id).iconplusoem = false;
          }, 50);
        } else {
          this.dados_referencias[index].iconplusoem = true;
        }
        this.dados_referencias[index].atualizaoem = false;
      }, error => {
        this.dados_referencias[index].atualizaoem = false;
      });
  }

  carregaFABRICAS(index, id, PROREF) {
    this.dados_referencias[index].iconplusfab = true;
    this.dados_referencias[index].atualizafab = true;


    var fabricas = null;
    if (this.fabricas != null && this.fabricas.length > 0) { fabricas = this.fabricas.toString() }

    var data = [{ PROREF: PROREF, FABRICAS: fabricas }];
    this.GERDICPROJCABService.analiseencomendasFABRICAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.dados_referencias[index].fabricas.push({ nome: response[x][0], percentagem: response[x][1], programa: response[x][2] });
          }


          setTimeout(() => {
            document.getElementById("collapsefab" + id + "fabricas").classList.remove("collapsed");
            document.getElementById("collapsefabricas" + id + "fabricas").classList.add("in");
            document.getElementById("collapsefabricas" + id + "fabricas").style.height = "auto";
            this.dados_referencias.find(item => item.id == id).iconplusfab = false;
          }, 50);
        } else {
          this.dados_referencias[index].iconplusfab = true;
        }
        this.dados_referencias[index].atualizafab = false;
      }, error => {
        this.dados_referencias[index].atualizafab = false;
      });
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.dados_referencias);
    this.dados = this.filteredItems;

  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();

    } else {

    }
    this.filteredItems = Object.assign([], this.dados_referencias).filter(
      item => item.cod_ref.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.dados = this.filteredItems;

    //console.log(this.filteredItems);
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

  atualizar_encomendas() {
    this.carrega_analises_previsoes_realizacoes();
  }

  atualizar() {
    this.carregaref();
  }

  atualizar_enc() {
    this.carregatabela();
  }


  /**** AUTO COMPLETE  */

  filterRef(event) {
    this.filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    this.referencia_principal = null;
  }

  filterSelect(event) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia_principal = event.value;
    } else {
      this.referencia_principal = null;
    };
  }


  /**** AUTO COMPLETE ENC  */

  filterRef_enc(event) {
    this.filteredreferencias_enc = this.pesquisa_enc(event.query);
  }


  pesquisa_enc(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect_enc(event) {
    this.referencia_principal_enc = null;
  }

  filterSelect_enc(event) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia_principal_enc = event.value;
    } else {
      this.referencia_principal_enc = null;
    };
  }

  /**** AUTO COMPLETE ANÁLISE DE PREVISÕES/REALIZAÇÕES  */

  filterRef_encomendas(event) {
    this.filteredreferencias_encomendas = this.pesquisa_enc(event.query);
  }


  pesquisa_encomendas(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect_encomendas(event) {
    this.referencia_principal_enc = null;
  }

  filterSelect_encomendas(event) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia_principal_encomendas = event.value;
    } else {
      this.referencia_principal_encomendas = null;
    };
  }

  listar_refs() {

    this.GERDICPROJCABService.getComponentes().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, desc_REF: response[x].PRODES1
          });
        }
        this.artigos = this.artigos.slice();

      },
      error => { console.log(error); });
  }

  //ANÁLISE DE PREVISÔES/REALIZAÇÕES NÍVEL 1
  carrega_analises_previsoes_realizacoes() {
    this.calcula = false;
    this.calcula_1 = false;
    this.calcula_2 = false;
    this.calcula_3 = false;
    this.calcula_4 = false;

    this.loading_encomendas = true;
    this.analises_enc = [];



    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var referencia_principal = null;
    var nome_cliente = null;
    var codigo_cliente = null;


    if (this.programas_encomendas != null && this.programas_encomendas.length > 0) { programas = this.programas_encomendas.toString() }
    if (this.veiculos_encomendas != null && this.veiculos_encomendas.length > 0) { veiculos = this.veiculos_encomendas.toString() }
    if (this.oem_encomendas != null && this.oem_encomendas.length > 0) { oem = this.oem_encomendas.toString() }
    if (this.fabricas_encomendas != null && this.fabricas.length > 0) { fabricas = this.fabricas_encomendas.toString() }


    if (this.referencia_principal_encomendas != "" && this.referencia_principal_encomendas != null) { referencia_principal = this.referencia_principal_encomendas }
    if (this.nome_cliente_encomendas != "" && this.nome_cliente_encomendas != null) { nome_cliente = this.nome_cliente_encomendas }
    if (this.codigo_cliente_encomendas != "" && this.codigo_cliente_encomendas != null) { codigo_cliente = this.codigo_cliente_encomendas }




    var year = this.ano_analise;
    var week = this.semana_analise;

    if (year == null) {
      year = (new Date()).getFullYear();
    }

    var date = this.firstWeekOfYear(year),
      weekTime = this.weeksToMilliseconds(week),
      targetTime = date.getTime() + weekTime;
    var data_semana = new Date(date.setTime(targetTime));

    this.data_inicio_semana = this.formatDate(data_semana);
    this.data_fim_semana = this.formatDate(this.getSundayOfCurrentWeek(data_semana));
    this.array_semanas = [];

    this.array_semanas.push({ semana: week, ano: year, data: this.formatDate(this.getSundayOfCurrentWeek(data_semana)) })
    for (var x = 0; x < 4; x++) {
      data_semana = this.lastweek(data_semana);
      this.array_semanas.push({ semana: this.getWeek(data_semana), ano: data_semana.getFullYear(), data: this.formatDate(this.getSundayOfCurrentWeek(data_semana)) })
    }
    this.week = week;
    this.dia_1 = this.array_semanas[0].data;
    this.dia_2 = this.array_semanas[1].data;
    this.dia_3 = this.array_semanas[2].data;
    this.dia_4 = this.array_semanas[3].data;
    this.dia_5 = this.array_semanas[4].data;

    var data = [{
      SEMANA: week, ANO: year, COD_CLIENTE: codigo_cliente,
      NOME_CLIENTE: nome_cliente, PROREF: this.referencia_principal_encomendas,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas
    }];

    this.GERDICPROJCABService.GET_ANALISE_ENCOMENDAS_CLIENTES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        var row = 0;
        if (count > 0) {
          for (var x in response) {
            if (!this.analises_enc.find(item => item.n_cliente == response[x][0] && item.cod_estabelecimento == response[x][11])) {
              row++;
              this.analises_enc.push({
                id: row,
                n_cliente: response[x][0],
                nome_cliente: response[x][1],
                cod_estabelecimento: response[x][11],
                real: (response[x][6] == this.array_semanas[0].semana) ? response[x][9] : 0,
                atraso: (response[x][6] == this.array_semanas[0].semana) ? response[x][10] : 0,
                variacao: 0,
                prev_1: (response[x][6] == this.array_semanas[1].semana) ? response[x][8] : 0,
                variacao_1: 0,
                prev_2: (response[x][6] == this.array_semanas[2].semana) ? response[x][8] : 0,
                variacao_2: 0,
                prev_3: (response[x][6] == this.array_semanas[3].semana) ? response[x][8] : 0,
                variacao_3: 0,
                prev_4: (response[x][6] == this.array_semanas[4].semana) ? response[x][8] : 0,
                variacao_4: 0,
                atualiza: false, iconplus: true,
                atualizaatrasos: false, iconplusatrasos: true,
                atualizarefs: false, iconplusrefs: true,
                atrasos: [],
                referencias: [],
              });
            } else {
              var analise = this.analises_enc.find(item => item.n_cliente == response[x][0] && item.cod_estabelecimento == response[x][11]);
              if (response[x][6] == this.array_semanas[0].semana) { analise.real = response[x][9]; }
              if (response[x][6] == this.array_semanas[0].semana) { analise.atraso = response[x][10]; }
              if (response[x][6] == this.array_semanas[1].semana) { analise.prev_1 = response[x][8]; }
              if (response[x][6] == this.array_semanas[2].semana) { analise.prev_2 = response[x][8]; }
              if (response[x][6] == this.array_semanas[3].semana) { analise.prev_3 = response[x][8]; }
              if (response[x][6] == this.array_semanas[4].semana) { analise.prev_4 = response[x][8]; }
            }

            //if (response[x][6] == this.array_semanas[0].semana) { this.calcula = true; }
            this.calcula = true;
            if (response[x][6] == this.array_semanas[1].semana) { this.calcula_1 = true; }
            if (response[x][6] == this.array_semanas[2].semana) { this.calcula_2 = true; }
            if (response[x][6] == this.array_semanas[3].semana) { this.calcula_3 = true; }
            if (response[x][6] == this.array_semanas[4].semana) { this.calcula_4 = true; }

          }

          this.analises_enc = this.analises_enc.slice();
          this.calcula_variacao();
          //this.assignCopy()
        } else {
          this.calcula_variacao();
        }
        this.loading_encomendas = false;

      }, error => {
        this.loading_encomendas = false;
      });


  }

  calcula_variacao() {

    var total_real = 0;
    var total_atraso = 0;
    var total_variacao = 0;
    var total_variacao_1 = 0;
    var total_variacao_2 = 0;
    var total_variacao_3 = 0;
    var total_prev_1 = 0;
    var total_prev_2 = 0;
    var total_prev_3 = 0;
    var total_prev_4 = 0;


    for (var x in this.analises_enc) {
      if (this.calcula_3) this.analises_enc[x].variacao_3 = (this.analises_enc[x].prev_3 - this.analises_enc[x].prev_4);
      if (this.calcula_2) this.analises_enc[x].variacao_2 = (this.analises_enc[x].prev_2 - this.analises_enc[x].prev_3);
      if (this.calcula_1) this.analises_enc[x].variacao_1 = (this.analises_enc[x].prev_1 - this.analises_enc[x].prev_2);
      if (this.calcula) this.analises_enc[x].variacao = (this.analises_enc[x].real + this.analises_enc[x].atraso - this.analises_enc[x].prev_1);


      total_real += this.analises_enc[x].real;
      total_atraso += this.analises_enc[x].atraso;
      total_variacao += this.analises_enc[x].variacao;
      total_variacao_1 += this.analises_enc[x].variacao_1;
      total_variacao_2 += this.analises_enc[x].variacao_2;
      total_variacao_3 += this.analises_enc[x].variacao_3;
      total_prev_1 += this.analises_enc[x].prev_1;
      total_prev_2 += this.analises_enc[x].prev_2;
      total_prev_3 += this.analises_enc[x].prev_3;
      total_prev_4 += this.analises_enc[x].prev_4;
    }




    this.total_real = total_real;
    this.total_atraso = total_atraso;
    this.total_variacao = total_variacao
    this.total_variacao_1 = total_variacao_1;
    this.total_variacao_2 = total_variacao_2;
    this.total_variacao_3 = total_variacao_3;
    this.total_prev_1 = total_prev_1;
    this.total_prev_2 = total_prev_2;
    this.total_prev_3 = total_prev_3;
    this.total_prev_4 = total_prev_4;
  }

  getdadosclientes(id) {
    this.analises_enc.find(item => item.id == id).iconplus = !this.analises_enc.find(item => item.id == id).iconplus;
    var CLIENTE = this.analises_enc.find(item => item.id == id).n_cliente;
    var COD_ESTABELECIMENTO = this.analises_enc.find(item => item.id == id).cod_estabelecimento;

    var index = this.analises_enc.findIndex(item => item.id == id);

    if (this.analises_enc.find(item => item.id == id).atrasos.length == 0 && !this.analises_enc.find(item => item.id == id).atualizaatrasos) {
      this.carregaATRASOS(index, id, CLIENTE, COD_ESTABELECIMENTO)
    }

    if (this.analises_enc.find(item => item.id == id).referencias.length == 0 && !this.analises_enc.find(item => item.id == id).atualizarefs) {
      this.carregaREFERENCIAS(index, id, CLIENTE, COD_ESTABELECIMENTO)
    }
    /* setTimeout(() => {
              document.getElementById("referencia" + id).classList.remove("collapsed");
              document.getElementById("collapseref" + id).classList.add("in");
              document.getElementById("collapseref" + id).style.height = "auto";
              this.dados_referencias.find(item => item.id == id).iconplus = false;
            }, 50);*/
  }

  carregaATRASOS(index, id, CLIENTE, COD_ESTABELECIMENTO) {
    this.analises_enc[index].iconplusenc = true;
    this.analises_enc[index].atualizaenc = true;


    var referencia_principal = null;
    var codigo_cliente = CLIENTE;


    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var referencia_principal = null;


    if (this.programas_encomendas != null && this.programas_encomendas.length > 0) { programas = this.programas_encomendas.toString() }
    if (this.veiculos_encomendas != null && this.veiculos_encomendas.length > 0) { veiculos = this.veiculos_encomendas.toString() }
    if (this.oem_encomendas != null && this.oem_encomendas.length > 0) { oem = this.oem_encomendas.toString() }
    if (this.fabricas_encomendas != null && this.fabricas.length > 0) { fabricas = this.fabricas_encomendas.toString() }
    if (this.referencia_principal_encomendas != "" && this.referencia_principal_encomendas != null) { referencia_principal = this.referencia_principal_encomendas }



    var data = [{
      SEMANA: this.week, ANO: new Date(this.dia_1).getFullYear(),
      PROREF: referencia_principal, COD_CLIENTE: codigo_cliente, COD_ESTABELECIMENTO: COD_ESTABELECIMENTO,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas
    }];
    this.GERDICPROJCABService.GET_ANALISE_ENCOMENDAS_ATRASOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {

          for (var x in response) {
            this.analises_enc[index].atrasos.push(
              {
                referencia: response[x][1], design: response[x][2],
                estado: response[x][3], quant: response[x][4], valor: response[x][5], stock: response[x][6]
              }
            );

          }


          setTimeout(() => {
            document.getElementById("collapseatraso" + id).classList.remove("collapsed");
            document.getElementById("collapseatrasos" + id + "atrasos").classList.add("in");
            document.getElementById("collapseatrasos" + id + "atrasos").style.height = "auto";
            this.analises_enc.find(item => item.id == id).iconplusenc = false;
          }, 50);

        } else {
          this.analises_enc[index].iconplusenc = true;
        }
        this.analises_enc[index].atualizaatrasos = false;
      }, error => {
        this.analises_enc[index].atualizaenc = false;
      });
  }


  carregaREFERENCIAS(index, id, CLIENTE, COD_ESTABELECIMENTO) {
    this.analises_enc[index].iconplusenc = true;
    this.analises_enc[index].atualizaenc = true;


    var referencia_principal = null;
    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var referencia_principal = null;


    if (this.programas_encomendas != null && this.programas_encomendas.length > 0) { programas = this.programas_encomendas.toString() }
    if (this.veiculos_encomendas != null && this.veiculos_encomendas.length > 0) { veiculos = this.veiculos_encomendas.toString() }
    if (this.oem_encomendas != null && this.oem_encomendas.length > 0) { oem = this.oem_encomendas.toString() }
    if (this.fabricas_encomendas != null && this.fabricas.length > 0) { fabricas = this.fabricas_encomendas.toString() }

    if (this.referencia_principal_encomendas != "" && this.referencia_principal_encomendas != null) { referencia_principal = this.referencia_principal_encomendas }


    var data = [{
      SEMANA: this.week, ANO: new Date(this.dia_1).getFullYear(),
      PROREF: referencia_principal, COD_CLIENTE: CLIENTE, COD_ESTABELECIMENTO: COD_ESTABELECIMENTO,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas

    }];
    this.GERDICPROJCABService.GET_ANALISE_ENCOMENDAS_REFERENCIAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var row = 0;
          for (var x in response) {

            if (!this.analises_enc[index].referencias.find(item => item.referencia == response[x][1] && item.linha == response[x][11])) {
              row++;
              this.push_referencias(index, row, response, x);
            } else {
              var ref = this.analises_enc[index].referencias.find(item => item.referencia == response[x][1] && item.linha == response[x][11]);
              if (response[x][9] == this.array_semanas[0].semana) ref.quant = response[x][4];
              if (response[x][9] == this.array_semanas[0].semana) ref.valor = response[x][6];
              if (response[x][9] == this.array_semanas[0].semana) ref.stock = response[x][5];

              if (response[x][9] == this.array_semanas[1].semana) ref.estado_1 = response[x][3];
              if (response[x][9] == this.array_semanas[2].semana) ref.estado_2 = response[x][3];
              if (response[x][9] == this.array_semanas[3].semana) ref.estado_3 = response[x][3];
              if (response[x][9] == this.array_semanas[4].semana) ref.estado_4 = response[x][3];

              if (response[x][9] == this.array_semanas[1].semana) ref.quant_1 = response[x][4];
              if (response[x][9] == this.array_semanas[2].semana) ref.quant_2 = response[x][4];
              if (response[x][9] == this.array_semanas[3].semana) ref.quant_3 = response[x][4];
              if (response[x][9] == this.array_semanas[4].semana) ref.quant_4 = response[x][4];

              if (response[x][9] == this.array_semanas[1].semana) ref.stock_1 = response[x][5];
              if (response[x][9] == this.array_semanas[2].semana) ref.stock_2 = response[x][5];
              if (response[x][9] == this.array_semanas[3].semana) ref.stock_3 = response[x][5];
              if (response[x][9] == this.array_semanas[4].semana) ref.stock_4 = response[x][5];

              if (response[x][9] == this.array_semanas[1].semana) ref.valor_1 = response[x][6];
              if (response[x][9] == this.array_semanas[2].semana) ref.valor_2 = response[x][6];
              if (response[x][9] == this.array_semanas[3].semana) ref.valor_3 = response[x][6];
              if (response[x][9] == this.array_semanas[4].semana) ref.valor_4 = response[x][6];
            }
          }

          setTimeout(() => {
            document.getElementById("collapsereferencia" + id).classList.remove("collapsed");
            document.getElementById("collapsereferencias" + id + "referencias").classList.add("in");
            document.getElementById("collapsereferencias" + id + "referencias").style.height = "auto";
            this.analises_enc.find(item => item.id == id).iconplusenc = false;
          }, 50);

        } else {
          this.analises_enc[index].iconplusenc = true;
        }
        this.analises_enc[index].atualizaatrasos = false;
      }, error => {
        this.analises_enc[index].atualizaenc = false;
      });
  }

  push_referencias(index, row, response, x) {
    this.analises_enc[index].referencias.push({
      id: row,
      linha: response[x][11],
      referencia: response[x][1], design: response[x][2],
      quant: (response[x][9] == this.array_semanas[0].semana) ? response[x][4] : 0,
      valor: (response[x][9] == this.array_semanas[0].semana) ? response[x][6] : 0,
      stock: (response[x][9] == this.array_semanas[0].semana) ? response[x][5] : 0,

      estado_1: (response[x][9] == this.array_semanas[1].semana) ? response[x][3] : '',
      estado_2: (response[x][9] == this.array_semanas[2].semana) ? response[x][3] : '',
      estado_3: (response[x][9] == this.array_semanas[3].semana) ? response[x][3] : '',
      estado_4: (response[x][9] == this.array_semanas[4].semana) ? response[x][3] : '',

      quant_1: (response[x][9] == this.array_semanas[1].semana) ? response[x][4] : 0,
      quant_2: (response[x][9] == this.array_semanas[2].semana) ? response[x][4] : 0,
      quant_3: (response[x][9] == this.array_semanas[3].semana) ? response[x][4] : 0,
      quant_4: (response[x][9] == this.array_semanas[4].semana) ? response[x][4] : 0,

      stock_1: (response[x][9] == this.array_semanas[1].semana) ? response[x][5] : 0,
      stock_2: (response[x][9] == this.array_semanas[2].semana) ? response[x][5] : 0,
      stock_3: (response[x][9] == this.array_semanas[3].semana) ? response[x][5] : 0,
      stock_4: (response[x][9] == this.array_semanas[4].semana) ? response[x][5] : 0,

      valor_1: (response[x][9] == this.array_semanas[1].semana) ? response[x][6] : 0,
      valor_2: (response[x][9] == this.array_semanas[2].semana) ? response[x][6] : 0,
      valor_3: (response[x][9] == this.array_semanas[3].semana) ? response[x][6] : 0,
      valor_4: (response[x][9] == this.array_semanas[4].semana) ? response[x][6] : 0,
      atualiza: false, iconplus: true,
      atualizaoem: false, iconplusoem: true,
      atualizafab: false, iconplusfab: true,
      oem: [],
      fabricas: [],
    }
    );
  }

  getdadosreferencias(id_cli, id) {
    var index = this.analises_enc.findIndex(item => item.id == id_cli);
    this.analises_enc[index].referencias.find(item => item.id == id).iconplus = !this.analises_enc[index].referencias.find(item => item.id == id).iconplus;
    var PROREF = this.analises_enc[index].referencias.find(item => item.id == id).referencia;


    if (this.analises_enc[index].referencias.find(item => item.id == id).oem.length == 0 && !this.analises_enc[index].referencias.find(item => item.id == id).atualizaoem) {
      this.carregaOEM2(index, id, PROREF)
    }

    if (this.analises_enc[index].referencias.find(item => item.id == id).fabricas.length == 0 && !this.analises_enc[index].referencias.find(item => item.id == id).atualizafab) {
      this.carregaFABRICAS2(index, id, PROREF)
    }
  }

  carregaOEM2(index, id, PROREF) {
    var index_ref = this.analises_enc[index].referencias.findIndex(item => item.id == id);
    this.analises_enc[index].referencias[index_ref].iconplusoem = true;
    this.analises_enc[index].referencias[index_ref].atualizaoem = true;
    var data = [{ PROREF: PROREF }];

    this.GERDICPROJCABService.analiseencomendasOEM(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_enc[index].referencias[index_ref].oem.push({ nome: response[x][0], veiculo: response[x][1], programa: response[x][2] });
          }

          setTimeout(() => {
            document.getElementById("collapseoem" + this.analises_enc[index].id + "_" + id + "oems1").classList.remove("collapsed");
            document.getElementById("collapseoems" + this.analises_enc[index].id + "_" + id + "oems1").classList.add("in");
            document.getElementById("collapseoems" + this.analises_enc[index].id + "_" + id + "oems1").style.height = "auto";
            this.analises_enc[index].referencias[index_ref].iconplusoem = false;
          }, 50);
        } else {
          this.analises_enc[index].referencias[index_ref].iconplusoem = true;
        }
        this.analises_enc[index].referencias[index_ref].atualizaoem = false;
      }, error => {
        this.analises_enc[index].referencias[index_ref].atualizaoem = false;
      });
  }

  carregaFABRICAS2(index, id, PROREF) {
    var index_ref = this.analises_enc[index].referencias.findIndex(item => item.id == id);
    this.analises_enc[index].referencias[index_ref].iconplusfab = true;
    this.analises_enc[index].referencias[index_ref].atualizafab = true;


    var fabricas = null;
    if (this.fabricas_encomendas != null && this.fabricas_encomendas.length > 0) { fabricas = this.fabricas_encomendas.toString() }

    var data = [{ PROREF: PROREF, FABRICAS: fabricas }];
    this.GERDICPROJCABService.analiseencomendasFABRICAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_enc[index].referencias[index_ref].fabricas.push({ nome: response[x][0], percentagem: response[x][1], programa: response[x][2] });
          }


          setTimeout(() => {
            document.getElementById("collapsefab" + this.analises_enc[index].id + "_" + id + "fabricas1").classList.remove("collapsed");
            document.getElementById("collapsefabricas" + this.analises_enc[index].id + "_" + id + "fabricas1").classList.add("in");
            document.getElementById("collapsefabricas" + this.analises_enc[index].id + "_" + id + "fabricas1").style.height = "auto";
            this.analises_enc[index].referencias[index_ref].iconplusfab = false;
          }, 50);
        } else {
          this.analises_enc[index].referencias[index_ref].iconplusfab = true;
        }
        this.analises_enc[index].referencias[index_ref].atualizafab = false;
      }, error => {
        this.analises_enc[index].referencias[index_ref].atualizafab = false;
      });
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  lastweek(data) {
    var today = new Date(data);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return nextweek;
  }

  firstWeekOfYear(year) {
    var date = new Date();
    date = this.firstDayOfYear(date, year);
    date = this.firstWeekday(date);
    return date;
  }

  firstDayOfYear(date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  firstWeekday(firstOfJanuaryDate) {
    // 0 correspond au dimanche et 6 correspond au samedi.
    var FIRST_DAY_OF_WEEK = 1; // Monday, according to iso8601
    var WEEK_LENGTH = 7; // 7 days per week
    var day = firstOfJanuaryDate.getDay();
    day = (day === 0) ? 7 : day; // make the days monday-sunday equals to 1-7 instead of 0-6
    var dayOffset = -day + FIRST_DAY_OF_WEEK; // dayOffset will correct the date in order to get a Monday
    if (WEEK_LENGTH - day + 1 < 4) {
      // the current week has not the minimum 4 days required by iso 8601 => add one week
      dayOffset += WEEK_LENGTH;
    }
    return new Date(firstOfJanuaryDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  }

  weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
  }

  getSundayOfCurrentWeek(d) {
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? 0 : 7) - day);
  }

  backClicked() {
    var back;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (back != 0 && back != 'back') {
      back = back.replace("kvk", "?");
      if (back.indexOf("?") > 0) {
        this.router.navigateByUrl(back);
      } else {
        this.router.navigate([back], { queryParams: { redirect: 1 } });
      }


    } else if (back == 'back') {
      this.location.back();
    }
    else {
      this.location.back();
    }
  }
}