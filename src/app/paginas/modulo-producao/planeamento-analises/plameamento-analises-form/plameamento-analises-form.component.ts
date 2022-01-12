import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { PRPLANEAMENTOPRODUCAOLINHASService } from 'app/servicos/pr-planeamento-producao-linhas.service';
import { PRPLANEAMENTOPRODUCAOANALISESService } from 'app/servicos/pr-planeamento-producao-analises.service';
import { PR_PLANEAMENTO_PRODUCAO_ANALISES } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_ANALISES';
import { PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService } from 'app/servicos/pr-planeamento-producao-analises-recursos-humanos.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-plameamento-analises-form',
  templateUrl: './plameamento-analises-form.component.html',
  styleUrls: ['./plameamento-analises-form.component.css']
})
export class PlameamentoAnalisesFormComponent implements OnInit {
  nome_utilizador: any;
  utilizador: any;
  modoedicao: boolean;
  data_CRIA: Date;
  btcriar: boolean;
  btAnular: boolean;
  btGravar: boolean;
  btCancelar: boolean;
  novo: boolean;
  displayLoading;
  disCancelar;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  bteditar: boolean;
  user: any;
  user_nome: any;
  adminuser: any;
  disEditar: boolean;
  disCriar: boolean;
  disAnular: boolean;
  disFechar: boolean;
  btvoltar: boolean;
  caminho: string;
  anos = [];
  semanas = [];
  cabecalho: any = [];
  barras_produzir: any;
  total_barras: any[];
  recursos_humanos: any[];
  total_recursos: any[];
  tipos_acabamento: any[];
  lista_racks: any[];
  lista_racks_montados = []
  ano: any;
  id_PLANO_LINHA_1;
  id_PLANO_LINHA_2;
  semana: any;
  planos2: any[];
  planos1: any[];
  id_PLANEAMENTO_PRODUCAO_ANALISES: number;
  analises: PR_PLANEAMENTO_PRODUCAO_ANALISES;
  n_SEMANAS: number;
  data_MRP: any;
  ativobt = '1';
  btatualizardados = true;
  filtro_RACK = true;
  filtro_RACK_MONTADOS = true;
  doc_blob: any;
  srcelement: any;
  loading: boolean;
  loading1: boolean;
  loading2: boolean;
  loading3: boolean;
  loading4: boolean;

  constructor(private renderer: Renderer, private sanitizer: DomSanitizer, private elementRef: ElementRef, private PRPLANEAMENTOPRODUCAOLINHASService: PRPLANEAMENTOPRODUCAOLINHASService,
    private location: Location, private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService,
    private PRPLANEAMENTOPRODUCAOANALISESService: PRPLANEAMENTOPRODUCAOANALISESService,
    private PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService: PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService) { }


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

    this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991editar");
    this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991criar");
    this.disAnular = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991apagar");
    this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991fechar");

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
        //this.btFechar = true;

      } else if (urlarray[1].match("novo")) {
        this.modoedicao = true;
        this.data_CRIA = new Date();
        this.utilizador = this.user;
        this.nome_utilizador = this.user_nome;
        this.novo = true;
        this.bteditar = false;
        this.btCancelar = true;
      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = true;
        this.btAnular = true;
        //this.btFechar = true;
      }

    }

    for (var x = 2017; x <= new Date().getFullYear() + 10; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var x = 1; x <= 53; x++) {
      this.semanas.push({ value: x, label: x })
    }

    if (this.novo) {

      this.semana = this.getWeek(new Date());
      this.ano = new Date().getFullYear();
      this.carregar_planos(this.ano, this.semana);

    } else {
      this.inicia(id);
    }


  }

  inicia(id) {
    //var n_semanas = 8;
    //var id = 6;


    this.PRPLANEAMENTOPRODUCAOANALISESService.getById(id).subscribe(
      response => {

        this.analises = response[0][0];
        this.semana = response[0][0].semana;
        this.n_SEMANAS = response[0][0].n_SEMANAS;
        this.ano = response[0][0].ano;
        this.data_CRIA = new Date(response[0][0].data_CRIA);
        this.nome_utilizador = response[0][1];
        this.id_PLANEAMENTO_PRODUCAO_ANALISES = response[0][0].id_PLANEAMENTO_PRODUCAO_ANALISES;
        this.id_PLANO_LINHA_1 = response[0][0].id_PLANO_LINHA_1;
        this.id_PLANO_LINHA_2 = response[0][0].id_PLANO_LINHA_2;
        this.data_MRP = response[0][0].data_MRP;
        this.carregar_planos(this.ano, this.semana);

        var n_semanas = this.n_SEMANAS;
        if (n_semanas == null) n_semanas = 0;
        var dados = [{
          DATA: this.formatDate(this.data_MRP),
          NOVO: 1,
          NUMERO_SEMANAS: n_semanas,
          ID: null
        }];

        this.cabecalho = [];
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
              this.carregarbarras();
              this.carrega_recursos_humanos();
              this.carrega_tipo_acabamento();
              this.carrega_racks_lista();
              this.carrega_racks_montados_lista();
            } else {
              //this.loading = false;
            }

          },
          error => {
            //this.loading = false;
            console.log(error);
          });
      },
      error => console.log(error));


  }

  carregarbarras() {
    this.barras_produzir = [];


    var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2 }]
    this.PRPLANEAMENTOPRODUCAOANALISESService.GET_BARRAS_PRODUZIR(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            const valores = this.calcular_semanas_barras();
            var d_valores = valores.find(item => item.semana == response[x][3] /*&& item.ano == 2020*/);

            if (d_valores) {
              d_valores.barras_necessarias = response[x][4];
              d_valores.barras_media = response[x][5];
            }

            if (!this.barras_produzir.find(item => item.linha == response[x][1])) {
              this.barras_produzir.push({
                linha: response[x][1],
                valores: valores,
              });
            } else {
              var linha = this.barras_produzir.find(item => item.linha == response[x][1]);
              var d_valores_2 = linha.valores.find(item => item.semana == response[x][3]);
              if (d_valores_2) {
                d_valores_2.barras_necessarias = response[x][4];
                d_valores_2.barras_media = response[x][5];
              }
            }


          }

          this.total_barras = this.calcular_semanas_barras();
          this.cacular_totais();

        } else {
          //this.loading = false;
        }

      },
      error => {
        //this.loading = false;
        console.log(error);
      });


  }

  calcular_semanas_barras() {
    var semanas_dados = []
    for (var x in this.cabecalho) {
      semanas_dados.push({ id: null, semana: this.cabecalho[x].semana, ano: this.cabecalho[x].ano, barras_necessarias: 0, barras_media: 0 });
    }
    return semanas_dados;
  }

  cacular_totais() {
    for (var x in this.total_barras) {
      this.total_barras[x].barras_necessarias = 0
      this.total_barras[x].barras_media = 0
    }
    for (var y in this.barras_produzir) {
      for (var z in this.barras_produzir[y].valores) {
        this.total_barras.find(item => item.semana == this.barras_produzir[y].valores[z].semana).barras_necessarias += this.barras_produzir[y].valores[z].barras_necessarias;
        this.total_barras.find(item => item.semana == this.barras_produzir[y].valores[z].semana).barras_media += this.barras_produzir[y].valores[z].barras_media;
      }
    }

  }


  carrega_recursos_humanos() {
    this.recursos_humanos = [];
    // const valores = this.calcular_recursos_humanos();
    this.PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService.getById(this.id_PLANEAMENTO_PRODUCAO_ANALISES).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {



            if (!this.recursos_humanos.find(item => item.sector == response[x].nome)) {
              const valores3 = this.calcular_recursos_humanos();
              var d_valores3 = valores3.find(item => item.semana == response[x].semana /*&& item.ano == 2020*/);
              if (d_valores3 && response[x].linha == 1) {
                d_valores3.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
              }

              const valores4 = this.calcular_recursos_humanos();
              var d_valores4 = valores4.find(item => item.semana == response[x].semana /*&& item.ano == 2020*/);
              if (d_valores4 && response[x].linha == 2) {
                d_valores4.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
              }

              this.recursos_humanos.push({
                sector: response[x].nome,
                //valores: valores,
                sectores1: [],
                total_recursos1: valores3,//this.calcular_recursos_humanos(),
                sectores2: [],
                total_recursos2: valores4,//this.calcular_recursos_humanos(),
                total_sector: this.calcular_recursos_humanos(),
              });
            } else {
              var linha3 = this.recursos_humanos.find(item => item.sector == response[x].nome);
              var d_valores_3 = linha3.total_recursos1.find(item => item.semana == response[x].semana);
              var d_valores_4 = linha3.total_recursos2.find(item => item.semana == response[x].semana);

              if (d_valores_3 && response[x].linha == 1) {
                d_valores_3.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
              }
              if (d_valores_4 && response[x].linha == 2) {
                d_valores_4.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
              }

            }

            var tipo = this.recursos_humanos.find(item => item.sector == response[x].nome);



            if (tipo) {

              if (response[x].linha == 1) {
                if (!tipo.sectores1.find(item => item.nome == response[x].des_SECTOR)) {
                  const valores = this.calcular_recursos_humanos();
                  var d_valores = valores.find(item => item.semana == response[x].semana /*&& item.ano == 2020*/);
                  if (d_valores) {
                    d_valores.operarios_disponiveis = (response[x].operarios_DISPONIVEIS == null) ? 0 : response[x].operarios_DISPONIVEIS;
                    //d_valores.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
                  }

                  tipo.sectores1.push({
                    //linha: 1,
                    nome: response[x].des_SECTOR,
                    valores: valores
                  });
                } else {
                  var linha = tipo.sectores1.find(item => item.nome == response[x].des_SECTOR);
                  var d_valores_2 = linha.valores.find(item => item.semana == response[x].semana);
                  if (d_valores_2) {
                    d_valores_2.operarios_disponiveis = (response[x].operarios_DISPONIVEIS == null) ? 0 : response[x].operarios_DISPONIVEIS;
                    //d_valores_2.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
                  }
                }
              }


              if (response[x].linha == 2) {
                if (!tipo.sectores2.find(item => item.nome == response[x].des_SECTOR)) {
                  const valores2 = this.calcular_recursos_humanos();
                  var d_valores2 = valores2.find(item => item.semana == response[x].semana /*&& item.ano == 2020*/);
                  if (d_valores2) {
                    d_valores2.operarios_disponiveis = (response[x].operarios_DISPONIVEIS == null) ? 0 : response[x].operarios_DISPONIVEIS;
                    //d_valores2.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
                  }

                  tipo.sectores2.push({
                    //linha: 2,
                    nome: response[x].des_SECTOR,
                    valores: valores2
                  });
                } else {
                  var linha2 = tipo.sectores2.find(item => item.nome == response[x].des_SECTOR);
                  var d_valores_22 = linha2.valores.find(item => item.semana == response[x].semana);
                  if (d_valores_22) {
                    d_valores_22.operarios_disponiveis = (response[x].operarios_DISPONIVEIS == null) ? 0 : response[x].operarios_DISPONIVEIS;
                    // d_valores_22.operarios_necessarios = (response[x].operarios_NECESSARIOS == null) ? 0 : response[x].operarios_NECESSARIOS;
                  }
                }
              }
            }

          }

          this.total_recursos = this.calcular_recursos_humanos();
          this.cacular_totais_recursos();

        } else {
          //this.loading = false;
        }

      },
      error => {
        //this.loading = false;
        console.log(error);
      });
  }

  calcular_recursos_humanos() {
    var semanas_dados = []
    for (var x in this.cabecalho) {
      semanas_dados.push({ id: null, semana: this.cabecalho[x].semana, ano: this.cabecalho[x].ano, operarios_disponiveis: 0, operarios_necessarios: 0 });
    }
    return semanas_dados;
  }

  cacular_totais_recursos() {
    for (var x in this.total_recursos) {
      this.total_recursos[x].operarios_disponiveis = 0
      this.total_recursos[x].barras_media = 0
    }
    for (var yy in this.recursos_humanos) {
      for (var zzz in this.recursos_humanos[yy].total_recursos1) {
        this.recursos_humanos[yy].total_recursos1[zzz].operarios_disponiveis = 0
        //this.recursos_humanos[yy].total_recursos1[zzz].operarios_necessarios = 0
      }

      for (var zz in this.recursos_humanos[yy].total_recursos2) {
        this.recursos_humanos[yy].total_recursos2[zz].operarios_disponiveis = 0
        //this.recursos_humanos[yy].total_recursos2[zz].operarios_necessarios = 0
      }

      for (var h in this.recursos_humanos[yy].total_sector) {
        this.recursos_humanos[yy].total_sector[h].operarios_disponiveis = 0
        this.recursos_humanos[yy].total_sector[h].operarios_necessarios = 0
      }
    }


    for (var y in this.recursos_humanos) {
      //total sector 1
      for (var t in this.recursos_humanos[y].total_recursos1) {
        this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].total_recursos1[t].semana).operarios_necessarios += this.recursos_humanos[y].total_recursos1[t].operarios_necessarios;
        this.total_recursos.find(item => item.semana == this.recursos_humanos[y].total_recursos1[t].semana).operarios_necessarios += this.recursos_humanos[y].total_recursos1[t].operarios_necessarios;
      }
      for (var u in this.recursos_humanos[y].total_recursos2) {
        this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].total_recursos2[u].semana).operarios_necessarios += this.recursos_humanos[y].total_recursos2[u].operarios_necessarios;
        this.total_recursos.find(item => item.semana == this.recursos_humanos[y].total_recursos2[u].semana).operarios_necessarios += this.recursos_humanos[y].total_recursos2[u].operarios_necessarios;

      }

      for (var z in this.recursos_humanos[y].sectores1) {
        for (var t in this.recursos_humanos[y].sectores1[z].valores) {
          //totais linha
          this.recursos_humanos[y].total_recursos1.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_disponiveis += this.recursos_humanos[y].sectores1[z].valores[t].operarios_disponiveis;
          //this.recursos_humanos[y].total_recursos1.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_necessarios += this.recursos_humanos[y].sectores1[z].valores[t].operarios_necessarios;

          //total sector
          this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_disponiveis += this.recursos_humanos[y].sectores1[z].valores[t].operarios_disponiveis;
          //this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_necessarios += this.recursos_humanos[y].sectores1[z].valores[t].operarios_necessarios;

          //totais
          this.total_recursos.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_disponiveis += this.recursos_humanos[y].sectores1[z].valores[z].operarios_disponiveis;
          //this.total_recursos.find(item => item.semana == this.recursos_humanos[y].sectores1[z].valores[t].semana).operarios_necessarios += this.recursos_humanos[y].sectores1[z].valores[z].operarios_necessarios;
        }
      }

      for (var i in this.recursos_humanos[y].sectores2) {

        for (var p in this.recursos_humanos[y].sectores2[i].valores) {
          //totais linha
          this.recursos_humanos[y].total_recursos2.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_disponiveis += this.recursos_humanos[y].sectores2[i].valores[p].operarios_disponiveis;
          // this.recursos_humanos[y].total_recursos2.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_necessarios += this.recursos_humanos[y].sectores2[i].valores[p].operarios_necessarios;

          //total sector
          this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_disponiveis += this.recursos_humanos[y].sectores2[i].valores[p].operarios_disponiveis;
          //this.recursos_humanos[y].total_sector.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_necessarios += this.recursos_humanos[y].sectores2[i].valores[p].operarios_necessarios;

          //totais
          this.total_recursos.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_disponiveis += this.recursos_humanos[y].sectores2[i].valores[p].operarios_disponiveis;
          //this.total_recursos.find(item => item.semana == this.recursos_humanos[y].sectores2[i].valores[p].semana).operarios_necessarios += this.recursos_humanos[y].sectores2[i].valores[p].operarios_necessarios;
        }
      }

    }


  }

  carrega_tipo_acabamento() {
    this.tipos_acabamento = [];

    var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2 }]
    this.PRPLANEAMENTOPRODUCAOANALISESService.GET_TIPO_ACABAMENTO_ANALISE(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {



            if (!this.tipos_acabamento.find(item => item.linha == response[x][1])) {
              this.tipos_acabamento.push({
                linha: response[x][1],
                total_linha: this.calcular_semanas_tipo_acabamento(),
                acabamentos: []
              });

            }

            var tipo = this.tipos_acabamento.find(item => item.linha == response[x][1]);



            if (tipo) {

              const valores = this.calcular_semanas_tipo_acabamento();
              var d_valores = valores.find(item => item.semana == response[x][3] /*&& item.ano == 2020*/);
              if (d_valores) {
                d_valores.barras_necessarias = response[x][5];
                d_valores.barras_media = response[x][6];
              }

              if (!tipo.acabamentos.find(item => item.descricao == response[x][4])) {
                tipo.acabamentos.push({
                  descricao: response[x][4],
                  valores: valores,
                });
              } else {
                var linha = tipo.acabamentos.find(item => item.descricao == response[x][4]);
                var d_valores_2 = linha.valores.find(item => item.semana == response[x][3]);
                if (d_valores_2) {
                  d_valores_2.barras_necessarias = response[x][5];
                  d_valores_2.barras_media = response[x][6];
                }
              }

            }
          }

          this.cacular_totais_tipo_acabamento();

        } else {
          //this.loading = false;
        }

      },
      error => {
        //this.loading = false;
        console.log(error);
      });
  }


  gravar() {
    var analise = new PR_PLANEAMENTO_PRODUCAO_ANALISES;
    if (!this.novo) analise = this.analises;
    analise.semana = this.semana;

    analise.ano = this.ano;


    analise.utz_MODIF = this.user;
    analise.data_MODIF = new Date();

    if (this.novo) {
      var n1 = this.planos1.find(item => item.value == this.id_PLANO_LINHA_1).NUMERO_SEMANAS;
      var n2 = this.planos2.find(item => item.value == this.id_PLANO_LINHA_2).NUMERO_SEMANAS;

      var data1 = this.planos1.find(item => item.value == this.id_PLANO_LINHA_1).DATA;
      var data2 = this.planos2.find(item => item.value == this.id_PLANO_LINHA_2).DATA;

      analise.n_SEMANAS = Math.min(n1, n2);
      analise.utz_CRIA = this.user;
      analise.data_CRIA = this.data_CRIA;
      analise.ativo = true;
      analise.id_PLANO_LINHA_1 = this.id_PLANO_LINHA_1;
      analise.id_PLANO_LINHA_2 = this.id_PLANO_LINHA_2;
      analise.data_MRP = (new Date(data1) < new Date(data2)) ? data1 : data2;

      this.PRPLANEAMENTOPRODUCAOANALISESService.create(analise).subscribe(response => {
        this.atualizar_criar_recursos_humanos(this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, response.id_PLANEAMENTO_PRODUCAO_ANALISES
          , response.n_SEMANAS, response.data_MRP);
        this.simular(this.inputnotifi);
        this.router.navigate(['planeamento_analises/view'], { queryParams: { id: response.id_PLANEAMENTO_PRODUCAO_ANALISES } });
      },
        error => console.log(error));
    } else {
      analise.id_PLANEAMENTO_PRODUCAO_ANALISES = this.id_PLANEAMENTO_PRODUCAO_ANALISES;
      this.PRPLANEAMENTOPRODUCAOANALISESService.update(analise).then(() => {
        this.atualizar_criar_recursos_humanos(this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, this.id_PLANEAMENTO_PRODUCAO_ANALISES, analise.n_SEMANAS, analise.data_MRP, true);
        this.simular(this.inputgravou);
        //this.router.navigate(['planeamento_analises/view'], { queryParams: { id: this.id_PLANEAMENTO_PRODUCAO_ANALISES } });

      });

    }
  }

  atualizar_dados() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende atualizar os dados?',
      header: 'Confirmação',
      icon: 'fa fa-save',
      accept: () => {
        this.gravar();
      }
    });
  }

  atualizar_criar_recursos_humanos(IDS, ID_ANALISE, N_SEMANAS, DATA, inicia = false) {
    var dados = [{ IDS, ID_ANALISE, N_SEMANAS, DATA: this.formatDate(DATA) }];
    this.PRPLANEAMENTOPRODUCAOANALISESService.ATUALIZAR_RECURSOS_HUMANOS(dados).subscribe(response => {
      if (inicia) this.inicia(this.id_PLANEAMENTO_PRODUCAO_ANALISES);
    },
      error => console.log(error));
  }

  calcular_semanas_tipo_acabamento() {
    var semanas_dados = []
    for (var x in this.cabecalho) {
      semanas_dados.push({ id: null, semana: this.cabecalho[x].semana, ano: this.cabecalho[x].ano, barras_necessarias: 0, barras_media: 0 });
    }
    return semanas_dados;
  }

  cacular_totais_tipo_acabamento() {
    for (var x in this.tipos_acabamento) {
      for (var h in this.tipos_acabamento[x].total_linha) {
        this.tipos_acabamento[x].total_linha[h].barras_necessarias = 0
        this.tipos_acabamento[x].total_linha[h].barras_media = 0
      }
    }

    for (var y in this.tipos_acabamento) {
      for (var z in this.tipos_acabamento[y].acabamentos) {
        for (var t in this.tipos_acabamento[y].acabamentos[z].valores) {
          //totais linha
          this.tipos_acabamento[y].total_linha.find(item => item.semana == this.tipos_acabamento[y].acabamentos[z].valores[t].semana).barras_necessarias += this.tipos_acabamento[y].acabamentos[z].valores[t].barras_necessarias;
          this.tipos_acabamento[y].total_linha.find(item => item.semana == this.tipos_acabamento[y].acabamentos[z].valores[t].semana).barras_media += this.tipos_acabamento[y].acabamentos[z].valores[t].barras_media;

        }
      }
    }
  }

  carrega_racks_lista() {
    this.lista_racks = [];

    var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, FILTRO: this.filtro_RACK }]
    this.PRPLANEAMENTOPRODUCAOANALISESService.GET_RACKS_ANALISES(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var xcount = 0;
          for (var x in response) {



            if (!this.lista_racks.find(item => item.rack == response[x][2])) {

              const valores = this.calcular_semanas_barras();
              var d_valores = valores.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

              if (d_valores) {
                d_valores.barras_necessarias = response[x][4];
                d_valores.barras_media = response[x][5];
                d_valores.cor_fundo = response[x][6];
                d_valores.color = (response[x][6] == 'red') ? 'white' : '';
              }

              this.lista_racks.push({
                rack: response[x][2],
                n_barras: response[x][3],
                total_racks: valores,
                atualiza: false, iconplus: true, child: [],
                cor_rack: (this.isOdd(xcount)) ? '#FFE699' : '#BDD7EE',
                cor_linha: (this.isOdd(xcount)) ? '#FFF2CC' : '#DDEBF7'
              });

              xcount++;

            } else {
              var linha = this.lista_racks.find(item => item.rack == response[x][2]);
              var d_valores_2 = linha.total_racks.find(item => item.semana == response[x][1]);
              if (d_valores_2) {
                d_valores_2.barras_necessarias = response[x][4];
                d_valores_2.barras_media = response[x][5];
                d_valores_2.cor_fundo = response[x][6];
                d_valores_2.color = (response[x][6] == 'red') ? 'white' : '';
              }
            }
          }
        } else {
          //this.loading = false;
        }

      },
      error => {
        //this.loading = false;
        console.log(error);
      });


  }

  carrega_racks_montados_lista() {
    this.lista_racks_montados = [];

    var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, FILTRO: this.filtro_RACK_MONTADOS }]
    this.PRPLANEAMENTOPRODUCAOANALISESService.GET_RACKS_MONTADOS_ANALISES(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var xcount = 0;
          for (var x in response) {



            if (!this.lista_racks_montados.find(item => item.rack == response[x][2])) {

              const valores = this.calcular_semanas_barras();
              var d_valores = valores.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

              if (d_valores) {
                d_valores.barras_necessarias = response[x][4];
                d_valores.barras_media = response[x][5];
                d_valores.cor_fundo = response[x][6];
                d_valores.color = (response[x][6] == 'red') ? 'white' : '';
              }

              this.lista_racks_montados.push({
                rack: response[x][2],
                n_barras: response[x][3],
                total_racks: valores,
                atualiza: false, iconplus: true, child: [],
                cor_rack: (this.isOdd(xcount)) ? '#FFE699' : '#BDD7EE',
                cor_linha: (this.isOdd(xcount)) ? '#FFF2CC' : '#DDEBF7'
              });

              xcount++;

            } else {
              var linha = this.lista_racks_montados.find(item => item.rack == response[x][2]);
              var d_valores_2 = linha.total_racks.find(item => item.semana == response[x][1]);
              if (d_valores_2) {
                d_valores_2.barras_necessarias = response[x][4];
                d_valores_2.barras_media = response[x][5];
                d_valores_2.cor_fundo = response[x][6];
                d_valores_2.color = (response[x][6] == 'red') ? 'white' : '';
              }
            }
          }
        } else {
          //this.loading = false;
        }

      },
      error => {
        //this.loading = false;
        console.log(error);
      });


  }


  isOdd(num) { return num % 2; }

  carrega_racks_linhas(rack) {
    // this.cars1.find(item => item.id == id).iconplus = !this.cars1.find(item => item.id == id).iconplus;
    /*this.cars1.find(item => item.id == id).iconplus = true;*/

    if (this.lista_racks.find(item => item.rack == rack).child.length == 0 && !this.lista_racks.find(item => item.rack == rack).atualiza) {
      this.lista_racks.find(item => item.rack == rack).iconplus = true;
      this.lista_racks.find(item => item.rack == rack).atualiza = true;

      var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, RACK: rack }]
      this.PRPLANEAMENTOPRODUCAOANALISESService.GET_RACKS_REFERENCIAS_ANALISES(dados).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {

              var racklist = this.lista_racks.find(item => item.rack == rack);

              if (!racklist.child.find(item => item.id == response[x][3])) {

                const valores = this.calcular_semanas_barras();
                var d_valores = valores.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

                if (d_valores) {
                  d_valores.barras_necessarias = response[x][7];
                  d_valores.barras_media = response[x][8];
                }

                this.lista_racks.find(item => item.rack == rack).child.push({
                  id: response[x][3],
                  linha: response[x][4],
                  total_racks: valores,
                  atualiza: false, iconplus: true,
                  child: []
                });



              } else {
                var linha = racklist.child.find(item => item.id == response[x][3]);
                var d_valores_2 = linha.total_racks.find(item => item.semana == response[x][1]);
                if (d_valores_2) {
                  d_valores_2.barras_necessarias = response[x][7];
                  d_valores_2.barras_media = response[x][8];
                }
              }

              var rack_linha = racklist.child.find(item => item.id == response[x][3]);

              if (rack_linha) {
                if (!rack_linha.child.find(item => item.referencia == response[x][2])) {

                  const valores2 = this.calcular_semanas_barras();
                  var d_valores3 = valores2.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

                  if (d_valores3) {
                    d_valores3.barras_necessarias = response[x][5];
                    d_valores3.barras_media = response[x][6];
                  }


                  rack_linha.child.push({
                    //id: 1,
                    referencia: response[x][2],
                    desc_referencia: response[x][9],
                    valores: valores2,
                  });
                } else {
                  var linha2 = rack_linha.child.find(item => item.referencia == response[x][2]);
                  var d_valores_3 = linha2.valores.find(item => item.semana == response[x][1]);
                  if (d_valores_3) {
                    d_valores_3.barras_necessarias = response[x][5];
                    d_valores_3.barras_media = response[x][6];
                  }
                }
              }

            }
          } else {
            //this.loading = false;
          }


          this.lista_racks.find(item => item.rack == rack).atualiza = false;
          setTimeout(() => {
            document.getElementById("rack" + rack).classList.remove("collapsed");
            document.getElementById("collapserack" + rack).classList.remove("collapse");
            document.getElementById("collapserack" + rack).style.height = "auto";
            this.lista_racks.find(item => item.rack == rack).iconplus = false;
          }, 50);
        },
        error => {
          this.lista_racks.find(item => item.rack == rack).atualiza = false;
          console.log(error);
        });



      //this.lista_racks.find(item => item.rack == rack).iconplus = true;
    }


  }

  carrega_racks_montados_linhas(rack) {
    // this.cars1.find(item => item.id == id).iconplus = !this.cars1.find(item => item.id == id).iconplus;
    /*this.cars1.find(item => item.id == id).iconplus = true;*/

    if (this.lista_racks_montados.find(item => item.rack == rack).child.length == 0 && !this.lista_racks_montados.find(item => item.rack == rack).atualiza) {
      this.lista_racks_montados.find(item => item.rack == rack).iconplus = true;
      this.lista_racks_montados.find(item => item.rack == rack).atualiza = true;

      var dados = [{ IDS: this.id_PLANO_LINHA_1 + ',' + this.id_PLANO_LINHA_2, RACK: rack }]
      this.PRPLANEAMENTOPRODUCAOANALISESService.GET_RACKS_MONTADOS_REFERENCIAS_ANALISES(dados).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {

              var racklist = this.lista_racks_montados.find(item => item.rack == rack);

              if (!racklist.child.find(item => item.id == response[x][3])) {

                const valores = this.calcular_semanas_barras();
                var d_valores = valores.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

                if (d_valores) {
                  d_valores.barras_necessarias = response[x][7];
                  d_valores.barras_media = response[x][8];
                }

                this.lista_racks_montados.find(item => item.rack == rack).child.push({
                  id: response[x][3],
                  linha: response[x][4],
                  total_racks: valores,
                  atualiza: false, iconplus: true,
                  child: []
                });



              } else {
                var linha = racklist.child.find(item => item.id == response[x][3]);
                var d_valores_2 = linha.total_racks.find(item => item.semana == response[x][1]);
                if (d_valores_2) {
                  d_valores_2.barras_necessarias = response[x][7];
                  d_valores_2.barras_media = response[x][8];
                }
              }

              var rack_linha = racklist.child.find(item => item.id == response[x][3]);

              if (rack_linha) {
                if (!rack_linha.child.find(item => item.referencia == response[x][2])) {

                  const valores2 = this.calcular_semanas_barras();
                  var d_valores3 = valores2.find(item => item.semana == response[x][1] /*&& item.ano == 2020*/);

                  if (d_valores3) {
                    d_valores3.barras_necessarias = response[x][5];
                    d_valores3.barras_media = response[x][6];
                  }


                  rack_linha.child.push({
                    //id: 1,
                    referencia: response[x][2],
                    desc_referencia: response[x][9],
                    valores: valores2,
                  });
                } else {
                  var linha2 = rack_linha.child.find(item => item.referencia == response[x][2]);
                  var d_valores_3 = linha2.valores.find(item => item.semana == response[x][1]);
                  if (d_valores_3) {
                    d_valores_3.barras_necessarias = response[x][5];
                    d_valores_3.barras_media = response[x][6];
                  }
                }
              }

            }
          } else {
            //this.loading = false;
          }


          this.lista_racks_montados.find(item => item.rack == rack).atualiza = false;
          setTimeout(() => {
            document.getElementById("rack_montado" + rack).classList.remove("collapsed");
            document.getElementById("collapserack_montado" + rack).classList.remove("collapse");
            document.getElementById("collapserack_montado" + rack).style.height = "auto";
            this.lista_racks_montados.find(item => item.rack == rack).iconplus = false;
          }, 50);
        },
        error => {
          this.lista_racks_montados.find(item => item.rack == rack).atualiza = false;
          console.log(error);
        });



    }


  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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

  backClicked() {
    //this.location.back();
    this.router.navigate([this.caminho]);
  }
  carregar_planos(ano, semana) {
    this.planos1 = [];
    this.planos2 = [];
    var data = [{
      ANO: ano,
      SEMANA: semana
    }];

    this.PRPLANEAMENTOPRODUCAOANALISESService.GET_PLANOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        this.planos1.push({ value: '', label: 'Sel. Plano Linha 1' });
        this.planos2.push({ value: '', label: 'Sel. Plano Linha 2' });
        if (count > 0) {
          for (var x in response) {
            if (response[x][4] == 1) {
              this.planos1.push({
                value: response[x][0],
                NUMERO_SEMANAS: response[x][6],
                ESTADO: response[x][5],
                DATA: response[x][2],
                label: response[x][0] + ' | ' + response[x][1] + ' | ' + response[x][2] + ' | ' + response[x][3]
              });
            } else if (response[x][4] == 2) {
              this.planos2.push({
                value: response[x][0],
                NUMERO_SEMANAS: response[x][6],
                ESTADO: response[x][5],
                DATA: response[x][2],
                label: response[x][0] + ' | ' + response[x][1] + ' | ' + response[x][2] + ' | ' + response[x][3]
              });
            }
          }

          if (!this.novo) {
            var e1 = this.planos1.find(item => item.value == this.id_PLANO_LINHA_1).ESTADO;
            var e2 = this.planos2.find(item => item.value == this.id_PLANO_LINHA_2).ESTADO;
            if (e1 == 'F' && e2 == 'F') {
              this.btatualizardados = true;
            } else {
              this.btatualizardados = false;
            }
          }

          this.planos1 = this.planos1.slice();
          this.planos2 = this.planos2.slice();
        }

      }, error => {
        console.log(error);
      });
  }

  alteraSemana(event) {
    if (this.ano != null && event.value != null) {
      this.carregar_planos(this.ano, event.value);
    }
  }

  alteraAno(event) {
    if (this.semana != null && event.value != null) {
      this.carregar_planos(event.value, this.semana);
    }
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  async download(id, nome_ficheiro, loading) {

    this[loading] = true;
    this.srcelement = null;
    var doc = new jsPDF('l', 'pt', 'a4');

    //if (document.getElementById('tab1_1')) document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));
    //if (document.getElementById('tab2_1')) document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

    doc.setFontSize(10);
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da XpertGo", 425, 20, null, null, "center");

    doc.setFont('times')

    doc.text("Pág. 1/1", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    var img_logo = new Image()
    img_logo.src = 'assets/img/logo_empresa.png'
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17,'','FAST');

    /*var tab1 = document.getElementById('tab1');
    var printer_1 = document.getElementById('printer_1');
    var g = tab1.cloneNode(true);
    printer_1.appendChild(g);

    printer_1.children[0].setAttribute("id", "tab1_1");
    document.getElementById('tab1_1').style.position = "absolute";
    document.getElementById('tab1_1').classList.add("active")
    document.getElementById('tab1_1').classList.add("in")*/

    //tab1.style.position = "absolute";
    const options = {
      logging: false
    };


    await html2canvas(document.getElementById(id), options).then(function (canvas) {

      var img = canvas.toDataURL("image/png");
      const bufferX = 5;
      const bufferY = 40;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight,'','FAST');

      //document.getElementById(id).removeChild(document.getElementById('tab1_1'));

      doc.save(nome_ficheiro + '.pdf');
      //fails to add image to pdf
    });


    //this.display = true;
    /*var srcelement = doc.output('bloburl');
    this.doc_blob = doc.output('blob');
    this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(srcelement);*/
    this[loading] = false;


  }

  Anular() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Anular?',
      header: 'Anular Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.PRPLANEAMENTOPRODUCAOANALISESService.delete(this.id_PLANEAMENTO_PRODUCAO_ANALISES).then(() => {
          this.PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService.delete(this.id_PLANEAMENTO_PRODUCAO_ANALISES).then(() => {
            this.router.navigate([this.caminho]);
          },

            error => { console.log(error); this.router.navigate([this.caminho]); });
        },
          error => { console.log(error); this.simular(this.inputerro) });

      }
    });
  }
}
