import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { GERDICPROJCABService } from 'app/servicos/ger-dic-proj-cab.service';
import { GERDICPROGRAMAService } from 'app/servicos/ger-dic-programa.service';
import { GERDICFABRICAService } from 'app/servicos/ger-dic-fabrica.service';
import { GERDICVEICULOService } from 'app/servicos/ger-dic-veiculo.service';
import { GERDICOEMService } from 'app/servicos/ger-dic-oem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COANALISECLIENTESService } from 'app/servicos/co-analise-clientes.service';
import { COANALISECLIENTESACCOESService } from 'app/servicos/co-analise-clientes-accoes.service';
import { COANALISECLIENTESOBSERVACOESService } from 'app/servicos/co-analise-clientes-observacoes.service';
import { COANALISECLIENTESQUANTIDADEService } from 'app/servicos/co-analise-clientes-quantidade.service';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { CO_ANALISE_CLIENTES } from 'app/entidades/CO_ANALISE_CLIENTES';
import { CO_ANALISE_CLIENTES_QUANTIDADE } from 'app/entidades/CO_ANALISE_CLIENTES_QUANTIDADE';
import { CO_ANALISE_CLIENTES_ACCOES } from 'app/entidades/CO_ANALISE_CLIENTES_ACCOES';
import { CO_ANALISE_CLIENTES_OBSERVACOES } from 'app/entidades/CO_ANALISE_CLIENTES_OBSERVACOES';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-analise-clientes',
  templateUrl: './analise-clientes.component.html',
  styleUrls: ['./analise-clientes.component.css']
})
export class AnaliseClientesComponent implements OnInit {
  analises_clientes: any[] = [];
  loading = false;
  loading_clientes: boolean;
  referencia_principal_clientes: any;
  filteredreferencias_clientes: any[] = [];
  nome_cliente_clientes;
  codigo_cliente_clientes;
  semana_analise;
  programas_clientes;
  veiculos_clientes;
  oem_clientes;
  fabricas_clientes;
  fabricas = [];
  lista_clientes: any[];
  lista_fabricas = [];
  lista_programas = [];
  lista_veiculos = [];
  lista_oem = [];
  ano_analise: any;
  anos = [];
  semanas = [];
  artigos = [];
  campo_ref_clientes: any;
  linhas: any[];
  linha_clientes;
  user: any;
  id_REF: any;
  index: number;
  displayObs: boolean;
  novo: boolean;
  descricao_observacao: string;
  estado_acao: any;
  data_accao: any;
  quem_acao: any;
  descricao_acao: any;
  displayAcao: boolean;
  estados = [{ label: "Select Status", value: "" }, { label: "Ready", value: 'R' }, { label: "Pending", value: 'P' }];
  todos = false;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  accao: CO_ANALISE_CLIENTES_ACCOES;
  observacao: CO_ANALISE_CLIENTES_OBSERVACOES;

  constructor(private GERDICPROJCABService: GERDICPROJCABService, private COANALISECLIENTESService: COANALISECLIENTESService, private elementRef: ElementRef,
    private COANALISECLIENTESACCOESService: COANALISECLIENTESACCOESService, private COANALISECLIENTESOBSERVACOESService: COANALISECLIENTESOBSERVACOESService, private COANALISECLIENTESQUANTIDADEService: COANALISECLIENTESQUANTIDADEService,
    private GERDICPROGRAMAService: GERDICPROGRAMAService, private GERDICFABRICAService: GERDICFABRICAService, private ABDICLINHAService: ABDICLINHAService
    , private GERDICVEICULOService: GERDICVEICULOService, private GERDICOEMService: GERDICOEMService, private route: ActivatedRoute, private confirmationService: ConfirmationService,
    private router: Router, private location: Location, private renderer: Renderer) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

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


    data_semana.setDate(date.getDate());

    this.semana_analise = this.getWeek(data_semana);
    this.ano_analise = data_semana.getFullYear();


    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: null });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA /*value: { id: response[x].id_LINHA, cor: response[x].cor }*/ });
        }

        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    this.carregaprogramas();
    this.carregaveiculos();
    this.carregaoem();
    this.carregafabricas();
    this.carregaclientes();


    this.listar_refs();
    this.carrega_analises_previsoes_realizacoes();
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

  atualizar_clientes() {
    this.carrega_analises_previsoes_realizacoes();
  }

  //ANÁLISE DE CLIENTES NÍVEL 1
  carrega_analises_previsoes_realizacoes() {

    this.loading_clientes = true;
    this.analises_clientes = [];



    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var referencia_principal = null;
    var nome_cliente = null;
    var codigo_cliente = null;


    if (this.programas_clientes != null && this.programas_clientes.length > 0) { programas = this.programas_clientes.toString() }
    if (this.veiculos_clientes != null && this.veiculos_clientes.length > 0) { veiculos = this.veiculos_clientes.toString() }
    if (this.oem_clientes != null && this.oem_clientes.length > 0) { oem = this.oem_clientes.toString() }
    if (this.fabricas_clientes != null && this.fabricas.length > 0) { fabricas = this.fabricas_clientes.toString() }


    if (this.referencia_principal_clientes != "" && this.referencia_principal_clientes != null) { referencia_principal = this.referencia_principal_clientes }
    if (this.nome_cliente_clientes != "" && this.nome_cliente_clientes != null) { nome_cliente = this.nome_cliente_clientes }
    if (this.codigo_cliente_clientes != "" && this.codigo_cliente_clientes != null) { codigo_cliente = this.codigo_cliente_clientes }




    var year = this.ano_analise;
    var week = this.semana_analise;

    if (year == null) {
      year = (new Date()).getFullYear();
    }

    var todos = 0;
    if (this.todos) todos = 1;

    var data = [{
      SEMANA: week, ANO: year, COD_CLIENTE: codigo_cliente, TODOS: todos,
      NOME_CLIENTE: nome_cliente, PROREF: this.referencia_principal_clientes,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas, LINHA: (this.linha_clientes != null && this.linha_clientes != '') ? this.linha_clientes : null
    }];

    this.COANALISECLIENTESService.GET_ANALISE_CLIENTES_CLIENTES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        var row = 0;
        if (count > 0) {
          for (var x in response) {
            row++;
            this.analises_clientes.push({
              id: row,
              n_cliente: response[x][0],
              nome_cliente: response[x][3],
              cod_estabelecimento: response[x][1],
              atualiza: false, iconplus: true,
              atualizarefs: false, iconplusrefs: true,
              real: response[x][4],
              atraso: response[x][5],
              prev1: response[x][6],
              prev2: response[x][7],
              prev3: response[x][8],
              referencias: [],
            });

            /* if (!this.analises_clientes.find(item => item.n_cliente == response[x][0] && item.cod_estabelecimento == response[x][11])) {
               row++;
               this.analises_clientes.push({
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
               var analise = this.analises_clientes.find(item => item.n_cliente == response[x][0] && item.cod_estabelecimento == response[x][11]);
               if (response[x][6] == this.array_semanas[0].semana) { analise.real = response[x][9]; }
               if (response[x][6] == this.array_semanas[0].semana) { analise.atraso = response[x][10]; }
               if (response[x][6] == this.array_semanas[1].semana) { analise.prev_1 = response[x][8]; }
               if (response[x][6] == this.array_semanas[2].semana) { analise.prev_2 = response[x][8]; }
               if (response[x][6] == this.array_semanas[3].semana) { analise.prev_3 = response[x][8]; }
               if (response[x][6] == this.array_semanas[4].semana) { analise.prev_4 = response[x][8]; }
             }
 
 */
          }

          this.analises_clientes = this.analises_clientes.slice();

          //this.assignCopy()
        } else {

        }
        this.loading_clientes = false;

      }, error => {
        this.loading_clientes = false;
      });


  }



  getdadosclientes(id) {
    this.analises_clientes.find(item => item.id == id).iconplus = !this.analises_clientes.find(item => item.id == id).iconplus;
    var CLIENTE = this.analises_clientes.find(item => item.id == id).n_cliente;
    var COD_ESTABELECIMENTO = this.analises_clientes.find(item => item.id == id).cod_estabelecimento;

    var index = this.analises_clientes.findIndex(item => item.id == id);

    if (this.analises_clientes.find(item => item.id == id).referencias.length == 0 && !this.analises_clientes.find(item => item.id == id).atualizarefs) {
      this.carregaREFERENCIAS(index, id, CLIENTE, COD_ESTABELECIMENTO)
    }
  }



  carregaREFERENCIAS(index, id, CLIENTE, COD_ESTABELECIMENTO) {
    this.analises_clientes[index].iconplusreferencias = true;
    this.analises_clientes[index].atualizareferencias = true;

    var referencia_principal = null;
    var programas = null;
    var veiculos = null;
    var oem = null;
    var fabricas = null;
    var referencia_principal = null;


    if (this.programas_clientes != null && this.programas_clientes.length > 0) { programas = this.programas_clientes.toString() }
    if (this.veiculos_clientes != null && this.veiculos_clientes.length > 0) { veiculos = this.veiculos_clientes.toString() }
    if (this.oem_clientes != null && this.oem_clientes.length > 0) { oem = this.oem_clientes.toString() }
    if (this.fabricas_clientes != null && this.fabricas.length > 0) { fabricas = this.fabricas_clientes.toString() }

    if (this.referencia_principal_clientes != "" && this.referencia_principal_clientes != null) { referencia_principal = this.referencia_principal_clientes }


    var data = [{
      SEMANA: this.semana_analise, ANO: this.ano_analise,
      PROREF: referencia_principal, COD_CLIENTE: CLIENTE, ETSNUM: COD_ESTABELECIMENTO,
      PROGRAMAS: programas, VEICULOS: veiculos, OEM: oem, FABRICAS: fabricas, LINHA: (this.linha_clientes != null && this.linha_clientes != '') ? this.linha_clientes : null
    }];

    /*this.analises_clientes[index].referencias.push({
      id: 1,

      id_cliente: '010013',
      etsnum: 'E01',
      referencia: '34141741B',
      design: 'X62 DAB LOGO NISSAN (G)',
      fornecedor: 'fornecedor',
      stock: 0,
      atraso: 0,

      id_quant: null,
      data_cria_quant: null,
      utz_cria_quant: null,
      quant: 0,
      saldo: 0,

      enc: 3122.280000,
      enc1: 910.670000,
      enc2: 2471.810000,
      enc3: 3122.280000,

      linha: 1,
      data_stock: new Date(),
      id_stock: null,
      data_cria_stock: null,
      utz_cria_stock: null,
      stock_cliente: 0,

      atualiza: false, iconplus: true,
      atualizaoem: false, iconplusoem: true,
      atualizafab: false, iconplusfab: true,
      atualizaobservacoes: false, iconplusobservacoes: true,
      atualizaaccoes: false, iconplusaccoes: true,
      oem: [],
      fabricas: [],
      observacoes: [],
      accoes: [],
    }
    );

    setTimeout(() => {
      document.getElementById("collapsereferencia" + id).classList.remove("collapsed");
      document.getElementById("collapsereferencias" + id + "referencias").classList.add("in");
      document.getElementById("collapsereferencias" + id + "referencias").style.height = "auto";
      this.analises_clientes.find(item => item.id == id).iconplusreferencias = false;
    }, 50);

    this.analises_clientes[index].atualizareferencias = false;*/

    this.COANALISECLIENTESService.GET_ANALISE_CLIENTES_REFERENCIAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var row = 0;

          for (var x in response) {
            row++;
            this.analises_clientes[index].referencias.push({
              id: row,
              id_cliente: response[x][2],
              etsnum: response[x][4],
              referencia: response[x][0],
              design: response[x][1],
              fornecedor: response[x][3],
              stock: response[x][20],
              atraso: response[x][6],

              id_quant: response[x][16],
              data_cria_quant: (response[x][18] == null) ? null : new Date(response[x][18]),
              utz_cria_quant: response[x][19],
              quant: response[x][17],
              saldo: response[x][20] - response[x][6] - response[x][21],

              enc: response[x][21],
              enc1: response[x][7],
              enc2: response[x][8],
              enc3: response[x][9],

              linha: response[x][12],
              data_stock: (response[x][11] == null) ? null : new Date(response[x][11]),
              id_stock: response[x][10],
              data_cria_stock: new Date(response[x][14]),
              utz_cria_stock: response[x][15],
              stock_cliente: response[x][13],

              atualiza: false, iconplus: true,
              atualizaoem: false, iconplusoem: true,
              atualizafab: false, iconplusfab: true,
              atualizaobservacoes: false, iconplusobservacoes: true,
              atualizaaccoes: false, iconplusaccoes: true,
              oem: [],
              fabricas: [],
              observacoes: [],
              accoes: [],
            }
            );

          }

          setTimeout(() => {
            document.getElementById("collapsereferencia" + id).classList.remove("collapsed");
            document.getElementById("collapsereferencias" + id + "referencias").classList.add("in");
            document.getElementById("collapsereferencias" + id + "referencias").style.height = "auto";
            this.analises_clientes.find(item => item.id == id).iconplusenc = false;
            this.analises_clientes[index].atualizareferencias = false;
          }, 50);

        } else {
          this.analises_clientes[index].iconplusenc = true;
          this.analises_clientes[index].atualizareferencias = false;
        }
      }, error => {
        this.analises_clientes[index].atualizareferencias = false;
      });
  }


  getdadosreferencias(id_cli, id) {
    var index = this.analises_clientes.findIndex(item => item.id == id_cli);
    this.analises_clientes[index].referencias.find(item => item.id == id).iconplus = !this.analises_clientes[index].referencias.find(item => item.id == id).iconplus;
    var PROREF = this.analises_clientes[index].referencias.find(item => item.id == id).referencia;
    var COD_CLIENTE = this.analises_clientes[index].referencias.find(item => item.id == id).id_cliente;
    var ETSNUM = this.analises_clientes[index].referencias.find(item => item.id == id).etsnum;


    if (this.analises_clientes[index].referencias.find(item => item.id == id).oem.length == 0 && !this.analises_clientes[index].referencias.find(item => item.id == id).atualizaoem) {
      this.carregaOEM2(index, id, PROREF)
    }

    if (this.analises_clientes[index].referencias.find(item => item.id == id).fabricas.length == 0 && !this.analises_clientes[index].referencias.find(item => item.id == id).atualizafab) {
      this.carregaFABRICAS2(index, id, PROREF)
    }

    if (this.analises_clientes[index].referencias.find(item => item.id == id).observacoes.length == 0 && !this.analises_clientes[index].referencias.find(item => item.id == id).atualizaobservacoes) {
      this.carregaOBSERVACOES(index, id, PROREF, COD_CLIENTE, ETSNUM)
    }

    if (this.analises_clientes[index].referencias.find(item => item.id == id).accoes.length == 0 && !this.analises_clientes[index].referencias.find(item => item.id == id).atualizaaccoes) {
      this.carregaACCOES(index, id, PROREF, COD_CLIENTE, ETSNUM)
    }
  }

  carregaOBSERVACOES(index, id, PROREF, COD_CLIENTE, ETSNUM) {
    var index_ref = this.analises_clientes[index].referencias.findIndex(item => item.id == id);
    this.analises_clientes[index].referencias[index_ref].iconplusobservacoes = true;
    this.analises_clientes[index].referencias[index_ref].atualizaobservacoes = true;
    var data = [{ PROREF: PROREF, COD_CLIENTE: COD_CLIENTE, ETSNUM: ETSNUM }];
    this.analises_clientes[index].referencias[index_ref].observacoes = [];
    this.COANALISECLIENTESOBSERVACOESService.GET_ANALISE_CLIENTES_OBSERVACOES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_clientes[index].referencias[index_ref].observacoes.push({
              ID: response[x][0], CLICOD: response[x][1], ETSNUM: response[x][2], PROREF: response[x][3],
              DESCRICAO: response[x][4], UTZ_CRIA: response[x][5], DATA_CRIA: response[x][6], UTZ_MODIF: response[x][7], DATA_MODIF: response[x][8],
              UTILIZADOR: response[x][9],
              DATA_HORA: (response[x][6] != null) ? (this.formatDate(response[x][6]) + " " + new Date(response[x][6]).toLocaleTimeString()) : null,
            });
          }

          setTimeout(() => {
            document.getElementById("collapseobser" + this.analises_clientes[index].id + "_" + id + "observacoes1").classList.remove("collapsed");
            document.getElementById("collapseobservacoes" + this.analises_clientes[index].id + "_" + id + "observacoes1").classList.add("in");
            document.getElementById("collapseobservacoes" + this.analises_clientes[index].id + "_" + id + "observacoes1").style.height = "auto";
            this.analises_clientes[index].referencias[index_ref].iconplusobservacoes = false;
          }, 50);
        } else {
          this.analises_clientes[index].referencias[index_ref].iconplusobservacoes = true;
        }
        this.analises_clientes[index].referencias[index_ref].atualizaobservacoes = false;
      }, error => {
        this.analises_clientes[index].referencias[index_ref].atualizaobservacoes = false;
      });
  }

  carregaACCOES(index, id, PROREF, COD_CLIENTE, ETSNUM) {
    var index_ref = this.analises_clientes[index].referencias.findIndex(item => item.id == id);
    this.analises_clientes[index].referencias[index_ref].iconplusaccoes = true;
    this.analises_clientes[index].referencias[index_ref].atualizaaccoes = true;
    var data = [{ PROREF: PROREF, COD_CLIENTE: COD_CLIENTE, ETSNUM: ETSNUM }];
    this.analises_clientes[index].referencias[index_ref].accoes = [];
    this.COANALISECLIENTESACCOESService.GET_ANALISE_CLIENTES_ACCOES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_clientes[index].referencias[index_ref].accoes.push({
              ID: response[x][0], CLICOD: response[x][1],
              ETSNUM: response[x][2], PROREF: response[x][3], DESCRICAO: response[x][4], QUEM: response[x][5], DATA: this.formatDate(response[x][6]), ESTADO: response[x][7]
              , UTZ_CRIA: response[x][8], DATA_CRIA: response[x][9], UTZ_MODIF: response[x][10], DATA_MODIF: response[x][11]
              , ESTADO_TEXTO: this.getestadoaccao(response[x][7])
            });
          }

          setTimeout(() => {
            document.getElementById("collapseacc" + this.analises_clientes[index].id + "_" + id + "accoes1").classList.remove("collapsed");
            document.getElementById("collapseaccoes" + this.analises_clientes[index].id + "_" + id + "accoes1").classList.add("in");
            document.getElementById("collapseaccoes" + this.analises_clientes[index].id + "_" + id + "accoes1").style.height = "auto";
            this.analises_clientes[index].referencias[index_ref].iconplusaccoes = false;
          }, 50);
        } else {
          this.analises_clientes[index].referencias[index_ref].iconplusaccoes = true;
        }
        this.analises_clientes[index].referencias[index_ref].atualizaaccoes = false;
      }, error => {
        this.analises_clientes[index].referencias[index_ref].atualizaaccoes = false;
      });
  }

  getestadoaccao(valor) {
    var estado = '';
    if (valor == 'R') {
      estado = 'Ready';
    } else {
      estado = 'Pending';
    }

    return estado;
  }

  carregaOEM2(index, id, PROREF) {
    var index_ref = this.analises_clientes[index].referencias.findIndex(item => item.id == id);
    this.analises_clientes[index].referencias[index_ref].iconplusoem = true;
    this.analises_clientes[index].referencias[index_ref].atualizaoem = true;
    var data = [{ PROREF: PROREF }];

    this.GERDICPROJCABService.analiseencomendasOEM(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_clientes[index].referencias[index_ref].oem.push({ nome: response[x][0], veiculo: response[x][1], programa: response[x][2] });
          }

          setTimeout(() => {
            document.getElementById("collapseoem" + this.analises_clientes[index].id + "_" + id + "oems1").classList.remove("collapsed");
            document.getElementById("collapseoems" + this.analises_clientes[index].id + "_" + id + "oems1").classList.add("in");
            document.getElementById("collapseoems" + this.analises_clientes[index].id + "_" + id + "oems1").style.height = "auto";
            this.analises_clientes[index].referencias[index_ref].iconplusoem = false;
          }, 50);
        } else {
          this.analises_clientes[index].referencias[index_ref].iconplusoem = true;
        }
        this.analises_clientes[index].referencias[index_ref].atualizaoem = false;
      }, error => {
        this.analises_clientes[index].referencias[index_ref].atualizaoem = false;
      });
  }

  carregaFABRICAS2(index, id, PROREF) {
    var index_ref = this.analises_clientes[index].referencias.findIndex(item => item.id == id);
    this.analises_clientes[index].referencias[index_ref].iconplusfab = true;
    this.analises_clientes[index].referencias[index_ref].atualizafab = true;


    var fabricas = null;
    if (this.fabricas_clientes != null && this.fabricas_clientes.length > 0) { fabricas = this.fabricas_clientes.toString() }

    var data = [{ PROREF: PROREF, FABRICAS: fabricas }];
    this.GERDICPROJCABService.analiseencomendasFABRICAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.analises_clientes[index].referencias[index_ref].fabricas.push({ nome: response[x][0], percentagem: response[x][1], programa: response[x][2] });
          }


          setTimeout(() => {
            document.getElementById("collapsefab" + this.analises_clientes[index].id + "_" + id + "fabricas1").classList.remove("collapsed");
            document.getElementById("collapsefabricas" + this.analises_clientes[index].id + "_" + id + "fabricas1").classList.add("in");
            document.getElementById("collapsefabricas" + this.analises_clientes[index].id + "_" + id + "fabricas1").style.height = "auto";
            this.analises_clientes[index].referencias[index_ref].iconplusfab = false;
          }, 50);
        } else {
          this.analises_clientes[index].referencias[index_ref].iconplusfab = true;
        }
        this.analises_clientes[index].referencias[index_ref].atualizafab = false;
      }, error => {
        this.analises_clientes[index].referencias[index_ref].atualizafab = false;
      });
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


  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  limparfiltros3() {
    this.programas_clientes = null;
    this.veiculos_clientes = null;
    this.oem_clientes = null;
    this.fabricas_clientes = null;
    this.codigo_cliente_clientes = null;
    this.nome_cliente_clientes = null;
    this.referencia_principal_clientes = null;
    this.campo_ref_clientes = null;
  }

  /**** AUTO COMPLETE  */

  filterRef_clientes(event) {
    this.filteredreferencias_clientes = this.pesquisa(event.query);
  }


  pesquisa_clientes(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect_clientes(event) {
    this.referencia_principal_clientes = null;
  }

  filterSelect_clientes(event) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia_principal_clientes = event.value;
    } else {
      this.referencia_principal_clientes = null;
    };
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


  gravardados(id_cli, id) {
    var index = this.analises_clientes.findIndex(item => item.id == id_cli);
    this.analises_clientes[index].referencias.find(item => item.id == id).iconplus = !this.analises_clientes[index].referencias.find(item => item.id == id).iconplus;
    var PROREF = this.analises_clientes[index].referencias.find(item => item.id == id).referencia;
    var COD_CLIENTE = this.analises_clientes[index].referencias.find(item => item.id == id).id_cliente;
    var ETSNUM = this.analises_clientes[index].referencias.find(item => item.id == id).etsnum;

    var id1 = this.analises_clientes[index].referencias.find(item => item.id == id).id_quant;
    var id2 = this.analises_clientes[index].referencias.find(item => item.id == id).id_stock;
    var quantidade = this.analises_clientes[index].referencias.find(item => item.id == id).quant;
    var data_cria_quant = this.analises_clientes[index].referencias.find(item => item.id == id).data_cria_quant;
    var utz_cria_quant = this.analises_clientes[index].referencias.find(item => item.id == id).utz_cria_quant;
    var data_STOCK_CLIENTE = this.analises_clientes[index].referencias.find(item => item.id == id).data_stock;
    var stock_CLIENTE = this.analises_clientes[index].referencias.find(item => item.id == id).stock_cliente;
    var id_LINHA = this.analises_clientes[index].referencias.find(item => item.id == id).linha;
    var data_cria_stock = this.analises_clientes[index].referencias.find(item => item.id == id).data_cria_stock;
    var utz_cria_stock = this.analises_clientes[index].referencias.find(item => item.id == id).utz_cria_stock;

    this.insertstock(PROREF, COD_CLIENTE, ETSNUM, id2, data_STOCK_CLIENTE, stock_CLIENTE, id_LINHA, data_cria_stock, utz_cria_stock, index, id);
    this.insertqtd(PROREF, COD_CLIENTE, ETSNUM, id1, quantidade, data_cria_quant, utz_cria_quant, index, id);

  }


  insertstock(proref, clicod, etsnum, id, data_STOCK_CLIENTE, stock_CLIENTE, id_LINHA, data_cria, utz_cria, index, id_ref) {

    var stock = new CO_ANALISE_CLIENTES;

    stock.id = id;
    stock.data_CRIA = data_cria;
    stock.utz_CRIA = utz_cria;
    if (id == null) {
      stock.data_CRIA = new Date();
      stock.utz_CRIA = this.user;
    }
    stock.data_MODIF = new Date();
    stock.utz_MODIF = this.user;

    stock.clicod = clicod;
    stock.proref = proref;
    stock.etsnum = etsnum;
    stock.data_STOCK_CLIENTE = data_STOCK_CLIENTE;
    stock.stock_CLIENTE = stock_CLIENTE;
    stock.id_LINHA = id_LINHA;

    this.COANALISECLIENTESService.update(stock).subscribe(
      res => {
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).id_stock = res.id;
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).data_cria_stock = res.data_CRIA;
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).utz_cria_stock = res.utz_CRIA;
        this.simular(this.inputgravou);
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  insertqtd(proref, clicod, etsnum, id, quantidade, data_cria, utz_cria, index, id_ref) {
    var qtd = new CO_ANALISE_CLIENTES_QUANTIDADE;

    qtd.id = id;
    qtd.data_CRIA = data_cria;
    qtd.utz_CRIA = utz_cria;
    if (id == null) {
      qtd.data_CRIA = new Date();
      qtd.utz_CRIA = this.user;
    }
    qtd.data_MODIF = new Date();
    qtd.utz_MODIF = this.user;

    qtd.clicod = clicod;
    qtd.proref = proref;
    qtd.etsnum = etsnum;
    qtd.ano = this.ano_analise;
    qtd.quantidade = quantidade;

    this.COANALISECLIENTESQUANTIDADEService.update(qtd).subscribe(
      res => {
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).id_quant = res.id;
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).data_cria_quant = res.data_CRIA;
        this.analises_clientes[index].referencias.find(item => item.id == id_ref).utz_cria_quant = res.utz_CRIA;
        // this.simular(this.inputgravou);
      },
      error => { console.log(error); /*this.simular(this.inputerro);*/ });
  }

  addObservacoes(id_cli, id) {
    this.index = this.analises_clientes.findIndex(item => item.id == id_cli);
    this.id_REF = id;
    this.displayObs = true;
    this.novo = true;
    this.descricao_observacao = "";
  }

  addAccao(id_cli, id) {
    this.index = this.analises_clientes.findIndex(item => item.id == id_cli);
    this.id_REF = id;
    this.novo = true;
    this.estado_acao = null;
    this.data_accao = null;
    this.quem_acao = null;
    this.descricao_acao = null;
    this.displayAcao = true;
  }

  saveOBS() {
    var observacao = new CO_ANALISE_CLIENTES_OBSERVACOES;
    if (this.novo) {
      observacao.data_CRIA = new Date();
      observacao.utz_CRIA = this.user;
    } else {
      observacao = this.observacao;
    }

    var PROREF = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).referencia;
    var COD_CLIENTE = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).id_cliente;
    var ETSNUM = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).etsnum;

    observacao.data_MODIF = new Date();
    observacao.utz_MODIF = this.user;
    observacao.descricao = this.descricao_observacao;
    observacao.etsnum = ETSNUM;
    observacao.clicod = COD_CLIENTE;
    observacao.proref = PROREF;

    this.COANALISECLIENTESOBSERVACOESService.update(observacao).subscribe(
      res => {
        this.carregaOBSERVACOES(this.index, this.id_REF, PROREF, COD_CLIENTE, ETSNUM);
        this.displayObs = false;
        this.simular(this.inputgravou);
      },
      error => { console.log(error); this.simular(this.inputerro); });

  }
  saveACCAO() {
    var accao = new CO_ANALISE_CLIENTES_ACCOES;
    if (this.novo) {
      accao.data_CRIA = new Date();
      accao.utz_CRIA = this.user;
    } else {
      accao = this.accao;
    }

    var PROREF = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).referencia;
    var COD_CLIENTE = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).id_cliente;
    var ETSNUM = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).etsnum;

    accao.data_MODIF = new Date();
    accao.utz_MODIF = this.user;
    accao.descricao = this.descricao_acao;
    accao.data = this.data_accao;
    accao.quem = this.quem_acao;
    accao.estado = this.estado_acao;
    accao.etsnum = ETSNUM;
    accao.clicod = COD_CLIENTE;
    accao.proref = PROREF;

    this.COANALISECLIENTESACCOESService.update(accao).subscribe(
      res => {
        this.carregaACCOES(this.index, this.id_REF, PROREF, COD_CLIENTE, ETSNUM);
        this.displayAcao = false;
        this.simular(this.inputgravou);
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  editObservacoes(id_cli, id_ref, id) {
    this.index = this.analises_clientes.findIndex(item => item.id == id_cli);
    this.id_REF = id_ref;
    var index_ref = this.analises_clientes[this.index].referencias.findIndex(item => item.id == id_ref);
    var observacao = this.analises_clientes[this.index].referencias[index_ref].observacoes.find(item => item.ID == id);

    var observacao_data = new CO_ANALISE_CLIENTES_OBSERVACOES;
    observacao_data.id = observacao.ID;
    observacao_data.data_CRIA = observacao.DATA_CRIA;
    observacao_data.utz_CRIA = observacao.UTZ_CRIA;
    observacao_data.descricao = observacao.DESCRICAO;
    observacao_data.etsnum = observacao.ETSNUM;
    observacao_data.clicod = observacao.CLICOD;
    observacao_data.proref = observacao.PROREF;

    this.observacao = observacao_data;

    this.displayObs = true;
    this.novo = false;
    this.descricao_observacao = observacao.DESCRICAO;

  }

  editAccao(id_cli, id_ref, id) {
    this.index = this.analises_clientes.findIndex(item => item.id == id_cli);
    var index_ref = this.analises_clientes[this.index].referencias.findIndex(item => item.id == id_ref);
    var accao = this.analises_clientes[this.index].referencias[index_ref].accoes.find(item => item.ID == id);


    var accao_data = new CO_ANALISE_CLIENTES_ACCOES;
    accao_data.data_CRIA = accao.DATA_CRIA;
    accao_data.utz_CRIA = accao.UTZ_CRIA;
    accao_data.id = accao.ID;
    accao_data.descricao = accao.DESCRICAO;
    accao_data.data = accao.DATA;
    accao_data.quem = accao.QUEM;
    accao_data.estado = accao.ESTADO;
    accao_data.etsnum = accao.ETSNUM;
    accao_data.clicod = accao.CLICOD;
    accao_data.proref = accao.PROREF;

    this.accao = accao_data;

    this.id_REF = id_ref;
    this.novo = false;
    this.estado_acao = accao.ESTADO;
    this.data_accao = accao.DATA;
    this.quem_acao = accao.QUEM;
    this.descricao_acao = accao.DESCRICAO;
    this.displayAcao = true;

  }


  deleteACCAO() {
    this.displayAcao = false;
    setTimeout(() => {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete?',
        header: 'Delete',
        icon: 'fa fa-trash',
        key: 'conf001',
        accept: () => {

          var PROREF = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).referencia;
          var COD_CLIENTE = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).id_cliente;
          var ETSNUM = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).etsnum;

          this.COANALISECLIENTESACCOESService.delete(this.accao.id).then(result => {
            this.carregaACCOES(this.index, this.id_REF, PROREF, COD_CLIENTE, ETSNUM);
            this.displayAcao = false;
          }, error => { console.log(error); });
        }, reject: () => {
          this.displayAcao = true;
        }
      });
    }, 100);
  }

  deleteOBSERVACAO() {
    this.displayObs = false;
    setTimeout(() => {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete?',
        header: 'Delete',
        icon: 'fa fa-trash',
        key: 'conf001',
        accept: () => {

          var PROREF = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).referencia;
          var COD_CLIENTE = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).id_cliente;
          var ETSNUM = this.analises_clientes[this.index].referencias.find(item => item.id == this.id_REF).etsnum;

          this.COANALISECLIENTESOBSERVACOESService.delete(this.observacao.id).then(result => {
            this.carregaOBSERVACOES(this.index, this.id_REF, PROREF, COD_CLIENTE, ETSNUM);
            this.displayObs = false;
          }, error => { console.log(error); });
        }, reject: () => {
          this.displayObs = true;
        }
      });
    }, 100);
  }

}


