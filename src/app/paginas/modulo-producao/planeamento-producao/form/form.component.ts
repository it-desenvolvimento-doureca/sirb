import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { PRDICSEMANASANALISEService } from 'app/servicos/pr-dic-semanas-analise.service';
import { PRPLANEAMENTOPRODUCAOCABService } from 'app/servicos/pr-planeamento-producao-cab.service';
import { PR_PLANEAMENTO_PRODUCAO_CAB } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_CAB';
import { PRPLANEAMENTOPRODUCAOLINHASService } from 'app/servicos/pr-planeamento-producao-linhas.service';
import { PR_PLANEAMENTO_PRODUCAO_LINHAS } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_LINHAS';
import { PRDICCAPACIDADEACABAMENTOService } from 'app/servicos/pr-dic-capacidade-acabamento.service';

import { zipProto } from 'rxjs/operator/zip';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  user: any;
  user_nome: any;
  adminuser: any;
  btcriar: boolean;
  bteditar: boolean;
  novo: boolean;
  disEditar: boolean;
  disCriar: boolean;
  disAnular: boolean;
  disFechar: boolean;
  modoedicao: boolean;
  loading: boolean;
  cabecalho: any[];
  linhas: any[] = [];
  numero_PLANO = null;
  data_CRIA = null;
  utilizador = null;
  nome_utilizador;
  estado = null;
  estado_texto = "";
  data_MRP: Date = null;
  n_mrp;
  n_mrps = [];
  id_LINHA;
  semanas_analise = [];
  semana_analise = null;
  linha = [];
  cor_linha = "white";
  caminho: string;
  btFechar;
  btAnular;
  disCancelar;
  btCancelar;
  disGravar;
  btGravar;
  media_barras = 0;
  displayLoading = false;
  linhas_temp: any;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  dados_plano: PR_PLANEAMENTO_PRODUCAO_CAB;
  btvoltar: any;
  campo_ref;
  filteredreferencias: any[] = [];
  referencia_principal: any = null;
  artigos = [];
  acabamentos: any[] = [];
  filtro_fase = null;
  filtro_rack = null;
  filtro_antecedencia = null;
  filtro_acabamento = [];
  campos_update: any[] = [];
  n_semanas: any = null;
  fases: any[];
  racks: any[];
  N_VOLTAS_DIA: number;
  filtro_barras_capacidade = false;
  class_active = null;
  constructor(private renderer: Renderer, private sanitizer: DomSanitizer, private ABDICLINHAService: ABDICLINHAService, private elementRef: ElementRef,
    private PRDICSEMANASANALISEService: PRDICSEMANASANALISEService, private PRPLANEAMENTOPRODUCAOCABService: PRPLANEAMENTOPRODUCAOCABService,
    private PRPLANEAMENTOPRODUCAOLINHASService: PRPLANEAMENTOPRODUCAOLINHASService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
    private PRDICCAPACIDADEACABAMENTOService: PRDICCAPACIDADEACABAMENTOService,
    private location: Location, private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.btcriar = true;;
    this.bteditar = true;
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99editar");
    this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99criar");
    this.disAnular = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99apagar");
    this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99fechar");

    this.btvoltar = true;
    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    this.caminho = urlarray[0];

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.btcriar = true;
        this.modoedicao = true;
        this.btGravar = true;
        this.btCancelar = true;
        this.btAnular = true;
        this.btFechar = true;

      } else if (urlarray[1].match("novo")) {
        this.modoedicao = true;
        this.data_CRIA = new Date();
        this.data_MRP = new Date();
        this.estado_texto = "Em Criação";
        this.utilizador = this.user;
        this.nome_utilizador = this.user_nome;
        this.novo = true;
        this.bteditar = false;
        this.btCancelar = true;
      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = true;
        this.btAnular = true;
        this.btFechar = true;
      }

    }

    if (this.novo) {
      this.preenchemrps(this.formatDate(this.data_MRP));
    } else {
      this.listar_refs();
      this.listar_fases();
      this.listar_racks();
      this.carrega_acabamentos();
    }
    this.preenchelsemanasAnalise(id);
  }

  carrega_acabamentos() {
    this.acabamentos = [];
    this.PRDICCAPACIDADEACABAMENTOService.GET_TIPO_ACABAMENTO().subscribe(
      response => {
        // this.acabamentos.push({ label: "Sel. Tipo Acabamento", value: null });
        for (var x in response) {
          this.acabamentos.push({
            value: response[x][0], label: response[x][0]
          });
        }
        this.acabamentos = this.acabamentos.slice();
      },
      error => console.log(error));
  }


  preenchelinhas(id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linha = [];
        this.linha.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linha.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        this.linha = this.linha.slice();
        if (!this.novo) this.inicia(id);
      },
      error => { console.log(error) });
  }

  alterarMRPS() {
    this.preenchemrps(this.formatDate(this.data_MRP));
  }

  preenchemrps(data) {
    //preenche combobox linhas
    var dados = [{ DATA: data }];
    this.n_mrps = [];
    this.n_mrps.push({ label: "A Carregar...", value: "" });
    this.PRPLANEAMENTOPRODUCAOCABService.GET_LISTA_MRPS(dados).subscribe(
      response => {
        this.n_mrps = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          this.n_mrps.push({ label: "Sel. Nº MRP", value: "" });
          for (var x in response) {
            this.n_mrps.push({
              label: '<' + response[x][1] + ' - ' + response[x][0] + '>' + ' - ' + response[x][3],
              value: { UserMRP: response[x][0], NumMRP: response[x][1], DataMRP: response[x][2], HoraMRP: response[x][3] }
            });
          }
        } else {
          this.n_mrps = [];
          this.n_mrps.push({ label: "Sem dados", value: "" });
        }
        this.n_mrps = this.n_mrps.slice();
      },
      error => {
        console.log(error);
        this.n_mrps = [];
        this.n_mrps.push({ label: "Sem dados", value: "" });
      });
  }

  preenchelsemanasAnalise(id) {
    //preenche combobox linhas
    this.PRDICSEMANASANALISEService.getAll().subscribe(
      response => {
        this.semanas_analise = [];
        this.semanas_analise.push({ label: "Sel. Número Semanas Análise", value: "" });
        for (var x in response) {
          this.semanas_analise.push({ label: response[x].n_SEMANAS, value: { id: response[x].id_SEMANAS_ANALISE, n_SEMANAS: response[x].n_SEMANAS } });
          if (response[x].por_DEFEITO && this.novo) this.semana_analise = { id: response[x].id_SEMANAS_ANALISE, n_SEMANAS: response[x].n_SEMANAS };
        }
        this.semanas_analise = this.semanas_analise.slice();
        this.preenchelinhas(id);
      },
      error => {
        this.preenchelinhas(id);
        console.log(error);
      });
  }

  getEstado(valor) {
    if (valor == "C") {
      return "Criado"
    } if (valor == "F") {
      return "Fechado"
    }
  }

  inicia(id) {
    this.n_mrps = [];
    this.PRPLANEAMENTOPRODUCAOCABService.getById(id).subscribe(
      response => {

        for (var x in response) {
          this.dados_plano = response[x][0];

          this.numero_PLANO = response[x][0].id_PLANEAMENTO_PRODUCAO_CAB;
          this.estado = response[x][0].estado;
          this.nome_utilizador = response[x][1];
          this.estado_texto = this.getEstado(response[x][0].estado);
          this.data_MRP = new Date(response[x][0].data_MRP);
          this.data_CRIA = new Date(response[x][0].data_CRIA);

          if (response[x][0].estado == 'F') {
            this.btFechar = false;
            this.btAnular = false;
          }

          this.n_mrps.push({
            label: '<' + response[x][0].n_MRP + ' - ' + response[x][0].user_MRP + '>' + ' - ' + response[x][0].hora_MRP,
            value: { UserMRP: response[x][0].user_MRP, NumMRP: response[x][0].n_MRP, HoraMRP: response[x][0].hora_MRP }
          });

          this.n_mrp = this.n_mrps[0].value;

          this.id_LINHA = this.linha.find(item => item.value != null && item.value.id === response[x][0].id_LINHA).value;
          this.cor_linha = this.linha.find(item => item.value != null && item.value.id === response[x][0].id_LINHA).value.cor;
          this.semana_analise = this.semanas_analise.find(item => item.value.id === response[x][0].id_SEMANAS_ANALISE).value;
          this.n_semanas = response[x][0].numero_SEMANAS;
        }

        this.getlinhas();

      },
      error => console.log(error));
  }


  getlinhas() {
    this.linhas = [];

    this.loading = true;
    this.cabecalho = [];
    /*/var year = this.data_MRP.getFullYear()//this.ano_analise;
    var week = this.getWeek(this.data_MRP);//this.semana_analise;

    if (year == null) {
      year = (new Date()).getFullYear();
    }

    var date = this.firstWeekOfYear(year),
      weekTime = this.weeksToMilliseconds(week),
      targetTime = date.getTime() + weekTime;
    var data_semana = new Date(date.setTime(targetTime));


    for (var x = 0; x < this.semana_analise.n_SEMANAS; x++) {
      data_semana = this.nextweek(data_semana);
      var semana = this.getWeek(data_semana);
      var ano = data_semana.getFullYear();
      this.cabecalho.push({ semana: semana, ano: ano, data: this.formatDate(this.getSundayOfCurrentWeek(data_semana)), dias: 0, total_quant: 0, total_barras: 0 });
    }*/
    var n_semanas = this.n_semanas;
    var id = this.numero_PLANO;
    if (n_semanas == null) n_semanas = 0;
    var dados = [{
      DATA: this.formatDate(this.data_MRP),
      NOVO: 0,
      NUMERO_SEMANAS: n_semanas,
      ID: id
    }];

    this.PRPLANEAMENTOPRODUCAOLINHASService.GET_SEMANAS_PLANEAMENTO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.cabecalho.push({
              semana: response[x][0], ano: response[x][1], data: response[x][2],
              dias: 0, total_quant: 0, total_barras: 0
            });
          }
          this.carregarlinha();
        } else {
          this.loading = false;
        }

      },
      error => {
        this.loading = false;
        console.log(error);
      });


  }


  carregarlinha() {
    var cod_ref = null;
    var acabamento = null;
    if (this.campo_ref != "" && this.campo_ref != null) cod_ref = this.referencia_principal;
    if (this.filtro_acabamento.length > 0) acabamento = this.filtro_acabamento.toString();
    var dados = [{
      ID_PLANEAMENTO_PRODUCAO_CAB: this.numero_PLANO, FASE: this.filtro_fase,
      COD_REF: cod_ref,
      ACABAMENTO: acabamento,
      RACK: this.filtro_rack,
      ANTECEDENCIA: this.filtro_antecedencia,
      BARRAS_CAPACIDADE: this.filtro_barras_capacidade
    }];

    this.PRPLANEAMENTOPRODUCAOLINHASService.getPR_PLANEAMENTO_PRODUCAO_LINHAS_FILTRO(dados).subscribe(
      response => {
        this.linhas = [];
        var count = Object.keys(response).length;
        if (count > 0) {



          for (var x in response) {

            this.N_VOLTAS_DIA = response[x][15];
            if (this.cabecalho.find(item => item.semana == response[x][8])) {
              this.cabecalho.find(item => item.semana == response[x][8]).dias = (response[x][13] == null) ? 0 : response[x][13]
            }

            if (!this.linhas.find(item => item.cod_ref == response[x][1])) {

              const mrp_plano = this.calcular_semanas();
              var d_mrp_plano = mrp_plano.find(item => item.semana == response[x][8] /*&& item.ano == 2020*/);


              if (d_mrp_plano) {
                d_mrp_plano.qtd_mrp = response[x][9];
                d_mrp_plano.n_barras_mrp = response[x][10];
                d_mrp_plano.qtd_plano = response[x][12] * response[x][3];
                d_mrp_plano.n_barras_plano = response[x][12];
                d_mrp_plano.id = response[x][14];
                d_mrp_plano.dias = response[x][13];
              }
              //semana response[x][4]
              this.linhas.push({
                fase: response[x][0],
                cod_ref: response[x][1],
                design_ref: response[x][2],
                qtd_pecas: response[x][3],
                rack: response[x][4],
                acabamento: response[x][5],
                n_barras: response[x][6],
                antecedencia: response[x][7],
                mrp_plano: mrp_plano,
                //plano: plano_semana,
                total_mrp: 0,
                total_plano: 0,
                total_barras: 0,
                total_barras_selecionadas: 0
              });

            } else {
              var linha = this.linhas.find(item => item.cod_ref == response[x][1]);
              var d_mrp_plano_2 = linha.mrp_plano.find(item => item.semana == response[x][8]);
              if (d_mrp_plano_2) {
                d_mrp_plano_2.qtd_mrp = response[x][9];
                d_mrp_plano_2.n_barras_mrp = response[x][10];
                d_mrp_plano_2.qtd_plano = response[x][12] * response[x][3];
                d_mrp_plano_2.n_barras_plano = response[x][12];
                d_mrp_plano_2.id = response[x][14];
                d_mrp_plano_2.dias = response[x][13];
              }
            }
          }
        }
        this.calculartotais();
        this.calculartotais_planeados();
        this.loading = false;

      },
      error => {
        this.loading = false;
        console.log(error);
      });
  }


  gravar() {
    if (this.novo) {
      this.displayLoading = true;
      this.carregar_linhas();
    } else {
      this.gravar_linhas();
    }
  }
  gravar_linhas() {
    if (this.campos_update.length > 0) {
      for (var x in this.campos_update) {
        var plan_linha = new PR_PLANEAMENTO_PRODUCAO_LINHAS;
        plan_linha.id_PLANEAMENTO_PRODUCAO_LINHA = this.campos_update[x].id;
        plan_linha.num_BARRAS_PLANO = this.campos_update[x].valor;
        plan_linha.data_MODIF = this.campos_update[x].data;
        plan_linha.utz_MODIF = this.campos_update[x].user;
        this.update_campos(plan_linha, this.campos_update.length, parseInt(x) + 1);
      }
    } else {
      this.simular(this.inputgravou);
      this.router.navigate([this.caminho + '/view'], { queryParams: { id: this.numero_PLANO } });
    }

  }

  update_campos(plan_linha, total, count) {
    this.PRPLANEAMENTOPRODUCAOLINHASService.update_campos(plan_linha).subscribe(response => {
      if (total == count) {
        this.simular(this.inputgravou);
        this.router.navigate([this.caminho + '/view'], { queryParams: { id: this.numero_PLANO } });
      }
    },
      error => {
        if (total == count) {
          this.simular(this.inputgravou);
          this.router.navigate([this.caminho + '/view'], { queryParams: { id: this.numero_PLANO } });
        }
        console.log(error);
      });
  }

  carregar_linhas() {
    this.loading = true;
    this.cabecalho = [];
    /* var year = this.data_MRP.getFullYear()//this.ano_analise;
     var week = this.getWeek(this.data_MRP);//this.semana_analise;
 
     if (year == null) {
       year = (new Date()).getFullYear();
     }
 
     var date = this.firstWeekOfYear(year),
       weekTime = this.weeksToMilliseconds(week),
       targetTime = date.getTime() + weekTime;
     var data_semana = new Date(date.setTime(targetTime));
     //var semanas_dados = [];
 
     for (var x = 0; x < this.semana_analise.n_SEMANAS; x++) {
       data_semana = this.nextweek(data_semana);
       var semana = this.getWeek(data_semana);
       var ano = data_semana.getFullYear();
       this.cabecalho.push({ semana: semana, ano: ano, data: this.formatDate(this.getSundayOfCurrentWeek(data_semana)), dias: 0, total_quant: 0, total_barras: 0 });
       //semanas_dados.push({ semana: semana, ano: ano, qtd_mrp: 0, n_barras_mrp: 0, qtd_plano: 0, n_barras_plano: 0 });
     }*/



    var dados = [{
      DATA: this.formatDate(this.data_MRP),
      NOVO: 1,
      NUMERO_SEMANAS: this.semana_analise.n_SEMANAS
    }];

    var semanas = [];
    this.PRPLANEAMENTOPRODUCAOLINHASService.GET_SEMANAS_PLANEAMENTO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            semanas.push(response[x][0]);
            this.cabecalho.push({
              semana: response[x][0], ano: response[x][1], data: response[x][2],
              dias: 0, total_quant: 0, total_barras: 0
            });
          }
          //this.carregarlinha_novo(semanas.toString());
          this.insert_cab(semanas.toString());
        } else {
          this.displayLoading = false;
          this.loading = false;
        }

      },
      error => {
        this.displayLoading = false;
        this.loading = false;
        //this.carregarlinha_novo(null);
        console.log(error);
      });




  }


  carregarlinha_novo(semanas) {
    var dados = [{ DATA: this.cabecalho[this.cabecalho.length - 1].data, LINHA: this.id_LINHA.id, N_MRP: this.n_mrp.NumMRP, PRIMEIRA_SEMANA: this.cabecalho[0].semana }];

    this.PRPLANEAMENTOPRODUCAOCABService.GET_LISTA_MRPS_PARA_PRODUCAO(dados).subscribe(
      response => {
        this.linhas_temp = [];
        var count = Object.keys(response).length;
        if (count > 0) {



          for (var x in response) {

            if (this.cabecalho.find(item => item.semana == response[x][4])) {
              this.cabecalho.find(item => item.semana == response[x][4]).dias = (response[x][12] == null) ? 0 : response[x][11]
            }

            if (!this.linhas_temp.find(item => item.cod_ref == response[x][2])) {

              const mrp_plano = this.calcular_semanas();
              var d_mrp_plano = mrp_plano.find(item => item.semana == response[x][4] /*&& item.ano == 2020*/);


              if (d_mrp_plano) {
                d_mrp_plano.qtd_mrp = response[x][10];
                d_mrp_plano.n_barras_mrp = response[x][11];
                d_mrp_plano.qtd_plano = response[x][11] * response[x][5];
                d_mrp_plano.n_barras_plano = response[x][11];
              }
              //semana response[x][4]
              this.linhas_temp.push({
                fase: response[x][0],
                cod_ref: response[x][2],
                design_ref: response[x][3],
                qtd_pecas: response[x][5],
                rack: response[x][6],
                acabamento: response[x][8],
                n_barras: response[x][7],
                antecedencia: response[x][9],
                mrp_plano: mrp_plano,
                //plano: plano_semana,
                total_mrp: 0,
                total_plano: 0,
                total_barras: 0,
                total_barras_selecionadas: 0
              });

            } else {
              var linha = this.linhas_temp.find(item => item.cod_ref == response[x][2]);
              var d_mrp_plano_2 = linha.mrp_plano.find(item => item.semana == response[x][4]);
              if (d_mrp_plano_2) {
                d_mrp_plano_2.qtd_mrp = response[x][10];
                d_mrp_plano_2.n_barras_mrp = response[x][11];
                d_mrp_plano_2.qtd_plano = response[x][11] * response[x][5];
                d_mrp_plano_2.n_barras_plano = response[x][11];
              }
            }
          }
        }
        /*this.calculartotais();
        this.calculartotais_planeados();
        this.loading = false;*/
        this.insert_cab(semanas);
      },
      error => {
        this.insert_cab(semanas);
        console.log(error);
      });
  }

  insert_cab(semanas) {
    var plan_cab = new PR_PLANEAMENTO_PRODUCAO_CAB;
    plan_cab.data_CRIA = new Date();
    plan_cab.data_MODIF = new Date();
    plan_cab.data_MRP = this.data_MRP;
    plan_cab.estado = 'C';
    plan_cab.hora_MRP = this.n_mrp.HoraMRP;
    plan_cab.id_LINHA = this.id_LINHA.id;
    plan_cab.id_SEMANAS_ANALISE = this.semana_analise.id;
    plan_cab.numero_SEMANAS = this.semana_analise.n_SEMANAS;
    plan_cab.semanas = semanas;
    plan_cab.n_MRP = this.n_mrp.NumMRP;
    plan_cab.user_MRP = this.n_mrp.UserMRP;
    plan_cab.utz_CRIA = this.user;
    plan_cab.utz_MODIF = this.user;
    plan_cab.ativo = true;

    this.PRPLANEAMENTOPRODUCAOCABService.create(plan_cab).subscribe(response => {
      this.insert_linhas(response.id_PLANEAMENTO_PRODUCAO_CAB);
    },
      error => {
        this.displayLoading = false;
        this.loading = false;
        console.log(error);
        this.simular(this.inputerro);
      });

  }

  insert_linhas(id) {
    var dados = [{ ID: id }];
    this.PRPLANEAMENTOPRODUCAOLINHASService.INSERT_PR_PLANEAMENTO_PRODUCAO_LINHAS(dados).subscribe(response => {
      this.displayLoading = false;
      this.loading = false;
      this.simular(this.inputnotifi);
      this.router.navigate([this.caminho + '/editar'], { queryParams: { id: id } });
    },
      error => {
        this.displayLoading = false;
        this.loading = false;
        this.simular(this.inputnotifi);
        this.router.navigate([this.caminho + '/editar'], { queryParams: { id: id } });
        console.log(error);
      });

    /*for (var x in this.linhas_temp) {
      for (var y in this.linhas_temp[x].mrp_plano) {
        var plan_linha = new PR_PLANEAMENTO_PRODUCAO_LINHAS;
        plan_linha.acabamento = this.linhas_temp[x].acabamento;

        plan_linha.antecedencia = this.linhas_temp[x].antecedencia;
        plan_linha.cod_REF = this.linhas_temp[x].cod_ref;
        plan_linha.design_REF = this.linhas_temp[x].design_ref;
        plan_linha.fase = this.linhas_temp[x].fase;
        plan_linha.id_PLANEAMENTO_PRODUCAO_CAB = id;
        plan_linha.rack = this.linhas_temp[x].rack;
        plan_linha.quant_PECAS_BARRA = this.linhas_temp[x].qtd_pecas;
        plan_linha.num_BARRAS = this.linhas_temp[x].n_barras;


        plan_linha.quant_MRP = this.linhas_temp[x].mrp_plano[y].qtd_mrp;
        plan_linha.quant_PLANO = this.linhas_temp[x].mrp_plano[y].qtd_plano;
        plan_linha.num_BARRAS_MRP = this.linhas_temp[x].mrp_plano[y].n_barras_mrp;
        plan_linha.num_BARRAS_PLANO = this.linhas_temp[x].mrp_plano[y].n_barras_plano;
        plan_linha.semana = this.linhas_temp[x].mrp_plano[y].semana;
        plan_linha.ano = this.linhas_temp[x].mrp_plano[y].ano;
        plan_linha.data_MODIF = new Date();
        plan_linha.utz_MODIF = this.user;
        this.create_linha(plan_linha, this.linhas_temp.length, parseInt(x) + 1, this.linhas_temp[x].mrp_plano.length, parseInt(y) + 1, id);
      }
    }*/
  }

  create_linha(plan_linha, total1, count1, total2, count2, id) {
    this.PRPLANEAMENTOPRODUCAOLINHASService.create(plan_linha).subscribe(response => {
      if (total1 == count1 && total2 == count2) {
        this.displayLoading = false;
        this.loading = false;
        this.simular(this.inputnotifi);
        this.router.navigate([this.caminho + '/editar'], { queryParams: { id: id } });
      }
    },
      error => {
        if (total1 == count1 && total2 == count2) {
          this.displayLoading = false;
          this.loading = false;
          this.simular(this.inputnotifi);
          this.router.navigate([this.caminho + '/editar'], { queryParams: { id: id } });
        }
        console.log(error);
      });

  }

  calculartotais_planeados() {
    for (var x in this.cabecalho) {
      this.cabecalho[x].total_quant = 0
      this.cabecalho[x].total_barras = 0
    }

    for (var y in this.linhas) {
      var total_barras_selecionadas = 0;
      var soma_dias = 0;
      var soma_barras = 0;
      for (var z in this.linhas[y].mrp_plano) {
        this.cabecalho.find(item => item.semana == this.linhas[y].mrp_plano[z].semana).total_quant += this.linhas[y].mrp_plano[z].qtd_plano;
        this.cabecalho.find(item => item.semana == this.linhas[y].mrp_plano[z].semana).total_barras += this.linhas[y].mrp_plano[z].n_barras_plano;

        if (parseInt(z) > 0) {
          this.linhas[y].mrp_plano[z].diff_qtd = this.linhas[y].mrp_plano[parseInt(z) - 1].diff_qtd + (this.linhas[y].mrp_plano[z].qtd_mrp - this.linhas[y].mrp_plano[z].qtd_plano);
          this.linhas[y].mrp_plano[z].diff_barras = this.linhas[y].mrp_plano[parseInt(z) - 1].diff_barras + (this.linhas[y].mrp_plano[z].n_barras_mrp - this.linhas[y].mrp_plano[z].n_barras_plano);
        } else {
          this.linhas[y].mrp_plano[z].diff_qtd = (this.linhas[y].mrp_plano[z].qtd_mrp - this.linhas[y].mrp_plano[z].qtd_plano);
          this.linhas[y].mrp_plano[z].diff_barras = (this.linhas[y].mrp_plano[z].n_barras_mrp - this.linhas[y].mrp_plano[z].n_barras_plano);
        }

        if (this.linhas[y].mrp_plano[z].qtd_sel) {
          soma_dias += this.linhas[y].mrp_plano[z].dias;
          soma_barras += this.linhas[y].mrp_plano[z].n_barras_plano;
        }
      }

      if (soma_dias > 0) total_barras_selecionadas = soma_barras / soma_dias;
      this.linhas[y].total_barras_selecionadas = total_barras_selecionadas;

    }

    var total = 0;
    var dias = 0;
    for (var xy in this.cabecalho) {
      total += this.cabecalho[xy].total_barras;
      dias += this.cabecalho[xy].dias;
    }

    this.media_barras = (dias == 0) ? 0 : total / dias;
  }

  calculartotais() {
    var dias = 0;
    for (var xy in this.cabecalho) {
      dias += this.cabecalho[xy].dias;
    }
    for (var x in this.linhas) {
      this.linhas[x].total_mrp = this.total_mrp(this.linhas[x].mrp_plano);
      this.linhas[x].total_plano = this.total_plano(this.linhas[x].mrp_plano);
      //this.linhas[x].total_barras = this.total_barras(this.linhas[x].mrp_plano) / this.linhas[x].mrp_plano.length;
      this.linhas[x].total_barras = (dias == 0) ? 0 : this.total_barras(this.linhas[x].mrp_plano) / dias;
    }
  }

  total_barras(linha) {
    var total = 0;
    for (var x in linha) {
      total += linha[x].n_barras_plano;
    }
    return total;
  }

  total_mrp(linha) {
    var total = 0;
    for (var x in linha) {
      total += linha[x].qtd_mrp;
    }
    return total;
  }

  total_plano(linha) {
    var total = 0;
    for (var x in linha) {
      total += linha[x].qtd_plano;
    }
    return total;
  }

  calcular_semanas() {
    var semanas_dados = []
    for (var x in this.cabecalho) {
      semanas_dados.push({ id: null, dias: this.cabecalho[x].dias, semana: this.cabecalho[x].semana, ano: this.cabecalho[x].ano, qtd_mrp: 0, n_barras_mrp: 0, qtd_sel: false, qtd_plano: 0, n_barras_plano: 0, diff_qtd: 0, diff_barras: 0 });
    }
    return semanas_dados;
  }


  atualizarcampo(id, n_barras_plano, index_linha, index_mrp_plano) {

    if (this.campos_update.find(x => x.id === id)) {
      this.campos_update.find(x => x.id === id).valor = n_barras_plano;
      this.campos_update.find(x => x.id === id).data = new Date();
    } else {
      this.campos_update.push({ id: id, valor: n_barras_plano, user: this.user, data: new Date() })
    }

    this.linhas[index_linha].mrp_plano[index_mrp_plano].qtd_plano = n_barras_plano * this.linhas[index_linha].qtd_pecas;
    this.linhas[index_linha].total_plano = this.total_plano(this.linhas[index_linha].mrp_plano);
    this.calculartotais_planeados();
  }

  selecttable(index_linha, index_mrp_plano) {
    /*this.campos_update.push({ id: id, valor: n_barras_plano, user: this.user, data: new Date() })
    this.linhas[index_linha].mrp_plano[index_mrp_plano].qtd_plano = n_barras_plano * this.linhas[index_linha].qtd_pecas;
    this.linhas[index_linha].total_plano = this.total_plano(this.linhas[index_linha].mrp_plano);
    this.calculartotais_planeados();*/
    var total_barras_selecionadas = 0;
    var soma_dias = 0;
    var soma_barras = 0;
    for (var x in this.linhas[index_linha].mrp_plano) {
      if (this.linhas[index_linha].mrp_plano[x].qtd_sel) {
        soma_dias += this.linhas[index_linha].mrp_plano[x].dias;
        soma_barras += this.linhas[index_linha].mrp_plano[x].n_barras_plano;
      }

    }
    if (soma_dias > 0) total_barras_selecionadas = soma_barras / soma_dias;
    this.linhas[index_linha].total_barras_selecionadas = total_barras_selecionadas;
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
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
    var FIRST_DAY_OF_WEEK = 1;
    var WEEK_LENGTH = 7;
    var day = firstOfJanuaryDate.getDay();
    day = (day === 0) ? 7 : day;
    var dayOffset = -day + FIRST_DAY_OF_WEEK;
    if (WEEK_LENGTH - day + 1 < 4) {
      dayOffset += WEEK_LENGTH;
    }
    return new Date(firstOfJanuaryDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  }


  weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
  }

  lastweek(data) {
    var today = new Date(data);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return nextweek;
  }

  nextweek(data) {
    var today = new Date(data);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

  getSundayOfCurrentWeek(d) {
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0 ? 0 : 7) - day);
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

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }




  edita() {
    var page;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        page = params['id'] || 0;
      });
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (this.globalVar.geteditar()) {
      if (back != 0) {
        this.router.navigate([this.caminho + '/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate([this.caminho + '/editar'], { queryParams: { id: page } });
      }

    }
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  criar_novo() {
    this.router.navigate([this.caminho + '/novo']);
  }

  Cancelar() {
    this.location.back();
  }

  Fechar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Fechar?',
      header: 'Confirmação',
      icon: 'fa fa-save',
      accept: () => {
        var depart = new PR_PLANEAMENTO_PRODUCAO_CAB;
        depart = this.dados_plano;
        depart.estado = 'F';
        depart.data_MODIF = new Date();
        depart.utz_MODIF = this.user;

        this.PRPLANEAMENTOPRODUCAOCABService.update(depart).subscribe(() => {
          this.router.navigate([this.caminho]);
        });

      }
    });
  }

  Anular() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Anular?',
      header: 'Anular Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var depart = new PR_PLANEAMENTO_PRODUCAO_CAB;
        depart = this.dados_plano;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.PRPLANEAMENTOPRODUCAOCABService.update(depart).subscribe(() => {
          this.router.navigate([this.caminho]);
        });

      }
    });
  }

  listar_fases() {

    this.PRPLANEAMENTOPRODUCAOCABService.GET_FASES([]).subscribe(
      response => {
        this.fases = [];
        this.fases.push({ value: null, label: 'Selecionar Fase' });

        for (var x in response) {
          this.fases.push({
            value: response[x][0], label: response[x][0]
          });
        }
        this.fases = this.fases.slice();

      },
      error => { console.log(error); });
  }

  listar_racks() {

    this.PRPLANEAMENTOPRODUCAOCABService.GET_RACKS([]).subscribe(
      response => {
        this.racks = [];
        this.racks.push({ value: null, label: 'Selecionar Rack' });

        for (var x in response) {
          this.racks.push({
            value: response[x][0], label: response[x][0]
          });
        }
        this.racks = this.racks.slice();

      },
      error => { console.log(error); });
  }

  listar_refs() {

    this.ABDICCOMPONENTEService.getComponentesProducao().subscribe(
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

  backClicked() {
    //this.location.back();
    this.router.navigate([this.caminho]);
  }

  limpar() {
    this.filtro_acabamento = [];
    this.filtro_antecedencia = null;
    this.filtro_fase = null;
    this.filtro_rack = null;
    this.campo_ref = null;
    this.referencia_principal = null;
  }

}

