import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { ConfirmationService } from "primeng/primeng";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { AB_MOV_MANUTENCAO } from "app/entidades/AB_MOV_MANUTENCAO";
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { AB_MOV_MANUTENCAO_LINHA } from "app/entidades/AB_MOV_MANUTENCAO_LINHA";
import { AB_MOV_MANUTENCAO_CAB } from "app/entidades/AB_MOV_MANUTENCAO_CAB";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { AD_MOV_REG_PARAM_OPERACAO } from "app/entidades/AD_MOV_REG_PARAM_OPERACAO";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { GERARMAZEMService } from 'app/servicos/ger-armazem.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { setTimeout } from 'core-js/library/web/timers';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { UploadService } from 'app/servicos/upload.service';
import { AB_MOV_MANUTENCAO_ETIQ } from '../../../entidades/AB_MOV_MANUTENCAO_ETIQ';
import { ABMOVMANUTENCAOETIQService } from '../../../servicos/ab-mov-manutencao-etiq.service';

@Component({
  selector: 'app-manutecao-reposicaoform',
  templateUrl: './manutecao-reposicaoform.component.html',
  styleUrls: ['./manutecao-reposicaoform.component.css']
})
export class ManutecaoReposicaoformComponent implements OnInit {

  mensagem_aviso2: string;
  tempgravar: boolean;
  username: any;
  tempecontrou: boolean;
  url = null;
  acessoplaneamento = true;
  cisternadisabled = false;
  tempcisterna: any;
  disimprimiretiquetas: boolean;
  disprevetiquetas: boolean;
  disaddetiquetas: boolean;
  fileURL;
  filename: string;
  dishistorico = true;
  textotabela: string = null;
  utilizadores: any[];
  hora_planeamento;
  admin: any;
  data_planeamendth: Date;
  datapl: any;
  acessoprep: boolean = false;
  acessoexec: boolean = false;
  executado: boolean;
  query = [];
  disimprimir: any = true;
  id: any;
  manutencao_dados: any;
  gravarlinhas: boolean;
  pos_sele: any;
  pesquisa_analise: any = [];
  intervalo_op: any[];
  num_manutencao: any;
  manutencao = [];
  i: any;
  data_actual: Date;
  id_turno: any;
  turno: any[];
  tipo_manu_id: any;
  tipo_manu: any;
  estado: string;
  responsavel: any;
  tipo_adicao: any[];
  pos: any = 0;
  banhos: any[];
  cor_linha: any;
  linha: any;
  linhas: any[];
  user: any;
  medidas: any[];
  novo: boolean;
  arrayForm = [];
  modoedicao = false;
  planeamento = true;
  data_planeamento;
  planeado = false;
  preparado = false;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;
  @ViewChild('waitingDialog') waitingDialog: ElementRef;
  @ViewChild('waitingDialogclose') waitingDialogclose: ElementRef;
  @ViewChild('inputgduplica') inputgduplica: ElementRef;
  @ViewChild('aviso_gravar') aviso_gravar: ElementRef;
  @ViewChild('aviso_concluir_planeamento') aviso_concluir_planeamento: ElementRef;
  @ViewChild('aviso_concluir_planeamento2') aviso_concluir_planeamento2: ElementRef;
  @ViewChild('aviso_concluir_planeamento3') aviso_concluir_planeamento3: ElementRef;
  @ViewChild('enviadoparaimpressora') enviadoparaimpressora: ElementRef;
  @ViewChild('erroimprimir') erroimprimir: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditartrue') alteraeditartrue: ElementRef;
  @ViewChild('imprime') imprime: ElementRef;

  tempQTD2: any;
  tempQTD: any[];
  tempeti: any[];
  cod_ref: string;
  adit_design: string;
  etiquetas = [];
  etiquetasaditivo = [];
  idtempetiquetas = 0;
  idtempetiquetasaditivo = 0;
  unidade1temp: any;
  valor1temp: any;
  idmovacab: any;
  posmovacab: any;
  mensagem_aviso = "";
  tempconsumiraditivo;
  factor_conversao: any;
  tempidlin: any;
  @ViewChild('dialogetiq') dialogetiq: ElementRef;
  @ViewChild('closedialogetiq') closedialogetiq: ElementRef;
  @ViewChild('dialogetiq2') dialogetiq2: ElementRef;
  @ViewChild('closedialogetiq2') closedialogetiq2: ElementRef;
  @ViewChild('dialogAviso') dialogAviso: ElementRef;
  @ViewChild('closedialoAviso') closedialoAviso: ElementRef;
  cod_ref_subs: any;
  adit_design_subst: any;



  constructor(private ABMOVMANUTENCAOETIQService: ABMOVMANUTENCAOETIQService, private UploadService: UploadService, private GERPOSTOSService: GERPOSTOSService, private sanitizer: DomSanitizer, private RelatoriosService: RelatoriosService, private GERUTILIZADORESService: GERUTILIZADORESService, private elementRef: ElementRef, private GERARMAZEMService: GERARMAZEMService, private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVANALISEService: ABMOVANALISEService, private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private ABDICTIPOADICAOService: ABDICTIPOADICAOService, private ABDICBANHOADITIVOService: ABDICBANHOADITIVOService, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService, private ABDICTURNOService: ABDICTURNOService, private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private confirmationService: ConfirmationService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private globalVar: AppGlobals, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private location: Location, private router: Router, private renderer: Renderer, private route: ActivatedRoute) { }

  ngOnInit() {
    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.url = params['redirect'];
      });


<<<<<<< HEAD
    if (document.getElementById("script1")) document.getElementById("script1").remove();
    var script1 = document.createElement("script");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/jqbtk.js");
    document.body.appendChild(script1);
=======
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/jqbtk.js";
    this.elementRef.nativeElement.appendChild(s);
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.admin = JSON.parse(localStorage.getItem('userapp'))["admin"];
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005duplicar"));

    this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005imprimir");
    this.disimprimiretiquetas = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005imprimiretiquetas");
    this.disprevetiquetas = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005prevetiquetas");
    this.disaddetiquetas = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005addetiquetas");
    this.dishistorico = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005historico");
    // this.pos=3;
    /* this.arrayForm = [{pos: 1, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] },
     {pos: 2, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] }];*/

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.username = JSON.parse(localStorage.getItem('userapp'))["nome"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao")) {
        this.acessoexec = true;
      }
      if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao")) {
        this.acessoprep = true;
      }

      //preenche array para navegar nas manutenções 
      if (this.globalVar.getfiltros("manutencaoreposicao_id") && this.globalVar.getfiltros("manutencaoreposicao_id").length > 0) {
        this.manutencao = this.globalVar.getfiltros("manutencaoreposicao_id");
        this.i = this.manutencao.indexOf(+id);
        this.preenchedados(true, this.manutencao[this.i]);
      }
      else {
        /* if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005planeamento")) {
           this.query.push("Em Planeamento");
           this.acessoplaneamento = false;
         }
         if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao") && !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao")) {
           this.query.push("Planeado", "Em Preparação", "Preparado", "Em Execução", "Executado");
         }*/
        var acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001planeamento");
        var acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001preparacao");
        var acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "acessoexec");

        if (!acessopla) {
          this.query.push("Em Planeamento");
          this.acessoplaneamento = false;
        }
        if (!acessoprep && !acessopla) {
          this.query.push("Em Planeamento");
          this.acessoplaneamento = false;
        }
        if (!acessoexec && !acessoprep && !acessopla) {
          this.query.push("Em Planeamento", "Planeado", "Em Preparação");
          this.acessoplaneamento = false;
        }



        //preenche array das manutenções por ordem do id.
        this.ABMOVMANUTENCAOService.getAllsrotid(this.query, "R").subscribe(
          response => {
            for (var x in response) {
              if (!this.acessoplaneamento) {
                var min = (response[x][11] != null) ? response[x][11] : 0;
                var min_max = (response[x][12] != null) ? response[x][12] : 0;
                if (response[x][9] != null) {
                  var data = new Date(response[x][9] + " " + response[x][10].slice(0, 5));
                  var dataatual = new Date();
                  var total = data.getTime() - dataatual.getTime();
                  var minutos = Math.round(total / 60000);
                  var total_max = dataatual.getTime() - data.getTime();
                  var minutos_max = Math.round(total_max / 60000);
                  if (minutos <= min && minutos_max <= min_max) {
                    this.manutencao.push(response[x][0]);
                  }
                }

              } else {
                this.manutencao.push(response[x][0]);
              }
            }
            this.i = this.manutencao.indexOf(+id);
            if (this.manutencao[this.i] == null) {

              //preenceh combobox
              this.preenchedados(true, id);
            } else this.preenchedados(true, this.manutencao[this.i]);
          }, error => { console.log(error); });
      }

    }
    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.globalVar.setduplicar(true);
        this.modoedicao = true;
        this.planeamento = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setduplicar(false);
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formArranque';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_actual = new Date();
        this.data_planeamento = this.formatDate(this.data_actual.toDateString());
        this.hora_planeamento = this.data_actual.toLocaleTimeString().slice(0, 5);
        this.responsavel = JSON.parse(localStorage.getItem('userapp'))["nome"];
        this.estado = "Em Preparação";
        this.planeamento = false;
        // this.novalinha();
        this.arrayForm = null;
        //preenceh combobox
        this.preenchedados();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
        this.modoedicao = false;
        this.globalVar.seteditar(true);
        this.planeamento = false;
      }
    }



  }

  inicia(id) {
    if (id != null) {
      this.planeado = false;
      this.preparado = false;
      this.planeamento = false;
      this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            for (var x in response) {
              this.manutencao_dados = response[x][0];
              this.num_manutencao = response[x][0].id_MANUTENCAO;
              this.tipo_manu_id = response[x][0].id_TIPO_MANUTENCAO;
              this.data_planeamento = this.formatDate(response[x][0].data_PLANEAMENTO);
              this.hora_planeamento = response[x][0].hora_PLANEAMENTO.slice(0, 5);
              this.data_planeamendth = new Date(new Date(response[x][0].data_PLANEAMENTO).toDateString() + " " + response[x][0].hora_PLANEAMENTO.slice(0, 5));
              this.datapl = response[x][0].data_PLANEAMENTO;
              this.responsavel = response[x][4].nome_UTILIZADOR;
              this.linha = this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
              this.id_turno = response[x][0].id_TURNO;
              this.estado = response[x][0].estado;
              this.cor_linha = response[x][1].cor;
              if (this.estado == "Planeado") {
                this.planeado = true;
                //this.globalVar.seteditar(false);
                this.simular(this.alteraeditar);
              } else if (this.estado == "Preparado") {
                this.preparado = true;
                // this.globalVar.seteditar(false);
                this.simular(this.alteraeditar);
              } else if (this.estado == "Em Planeamento") {
                this.planeamento = true;
                //this.globalVar.seteditar(true);
                this.simular(this.alteraeditartrue);
              } else if (this.estado == "Em Preparação") {
                this.planeado = true;
                this.globalVar.seteditar(true);
                this.simular(this.alteraeditartrue);
              } else if (this.estado == "Em Execução") {
                this.preparado = true;
                this.globalVar.seteditar(false);
                this.simular(this.alteraeditar);
              }
              else if (this.estado == "Executado") {
                this.preparado = true;
                this.globalVar.seteditar(false);
                this.simular(this.alteraeditar);
              }
              if (this.admin) {
                this.globalVar.seteditar(true);
                this.simular(this.alteraeditartrue);
              }
            }
            this.preenche_banhos(id);
          }
        },
        error => console.log(error));
    } else {
      var id2;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id2 = params['id'] || 0;
        });
      if (id2 != 0) this.inicia(id2);

    }
  }

  //carrega linhas
  carregarlinhas(id) {
    this.arrayForm = [];
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var data_prev = null;
            var hora_prev = null;
            var data_exec = null;
            var hora_exc = null;
            var id_adicao = null;
            var int_op = this.intervalo_op.find(item => item.value.id == response[x][0].id_TIPO_OPERACAO).value;
            var id_banho = null;
            if (this.banhos.find(item => item.value.id == response[x][0].id_BANHO)) {
              id_banho = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value;
            } else {
              this.banhos.push({ label: response[x][0].id_BANHO + " / Banho Removido ou Inativo", value: { id: response[x][0].id_BANHO } });
              id_banho = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value;
            }
            var nome_analise = "";
            this.executado = false;
            var preparado = false;
            var disable = false;
            var data_prep = null;
            if (response[x][0].data_PREVISTA != null) {
              data_prev = new Date(new Date(response[x][0].data_PREVISTA).toDateString() + ' ' + response[x][0].hora_PREVISTA.slice(0, 5));
              hora_prev = response[x][0].hora_PREVISTA.slice(0, 5);
            }

            if (response[x][0].id_TIPO_ADICAO != null) id_adicao = this.tipo_adicao.find(item => item.value.id == response[x][0].id_TIPO_ADICAO).value;
            if (response[x][0].id_ANALISE != "" && response[x][0].id_ANALISE != null) nome_analise = response[x][0].id_ANALISE + ' - ' + response[x][1];
            if (response[x][0].id_TIPO_ADICAO != null) if (id_adicao.id195 != "" && id_adicao.id195 != null) disable = true;
            if (response[x][0].data_EXECUCAO != null) {
              var hora = (response[x][0].hora_EXECUCAO != null) ? response[x][0].hora_EXECUCAO.slice(0, 5) : null;
              data_exec = this.formatDate(response[x][0].data_EXECUCAO) + ' ' + hora;
              hora_exc = response[x][0].hora_EXECUCAO.slice(0, 5);
              this.executado = true;
            }

            if (response[x][0].data_PREPARACAO != null) {
              preparado = true;
              data_prep = this.formatDate(response[x][0].data_PREPARACAO) + ' ' + response[x][0].hora_PREPARACAO.slice(0, 5);
            }

            this.pos++;

            var doseadores = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value.doseadores;
            this.arrayForm.push({
              doseador: response[x][0].doseador, doseadores: doseadores, executado: this.executado, preparado: preparado, obs_prep: response[x][0].obs_PREPARACAO,
              id_manu: response[x][0].id_MANUTENCAO, data: data_prev, cod_analise: response[x][0].id_ANALISE, nome_analise: nome_analise, disable_op: disable,
              pos: this.pos, id: response[x][0].id_MANUTENCAO_CAB, id_banho: id_banho, hora_pre: hora_prev, data_pre: data_prev, tipo_adicao: id_adicao,
              interva_ope: int_op, id_195: response[x][3], obs_pla: response[x][0].obs_PLANEAMENTO, obs_exec: response[x][0].obs_EXECUCAO, resp_exe_id: response[x][0].utz_EXECUCAO,
              resp_exe: response[x][4], hora_exc: hora_exc, data_exc: data_exec, resp_prep: response[x][5], data_prep: data_prep,
              id_tina: response[x][0].id_TINA, tina: response[x][6], capacidade: response[x][2], aditivos: [], data_valida: response[x][6]
            });
            this.carregaraditivoslinhas(response[x][0].id_MANUTENCAO_CAB, this.pos);
          }

        } else {
          if (this.modoedicao) this.novalinha();
        }
      },
      error => console.log(error));
  }

  carregaraditivoslinhas(id, pos) {
    this.textotabela = "A PESQUISAR...";
    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var pos2 = 0;
          for (var x in response) {
            var stock = null;
            var value = 0;
            var disabled = true;
            var valor1 = null;
            var valor2 = null;

            if (response[x][3] == true) disabled = false;
            if (response[x][0].stock != null) { stock = response[x][0].stock.toFixed(2); stock = stock.replace(".", ","); }

            if (response[x][0].valor_AGUA != null) value = response[x][0].valor_AGUA.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');

            if (response[x][0].valor1 != null) valor1 = response[x][0].valor1.replace(",", ".");
            if (response[x][0].valor2 != null) valor2 = response[x][0].valor2.replace(".", ",");
            var cor = "";
            var total = 0;

            if (response[x][4] != null) total = response[x][4];

            if (total != valor1 && response[x][4] != null) {
              cor = "red";
            } else if (response[x][5] > 0) {
              cor = "yellow";
            } else if (total == valor1 && response[x][4] != null) {
              cor = "green";
            } else if (valor1 == 0 || valor1 == null) {
              cor = "";
            } else if (response[x][4] == null) {
              cor = "red";
            }

            this.arrayForm.find(item => item.pos == pos).aditivos.push(
              {
                disabled: disabled, liecod: response[x][0].liecod,
                pos: pos2, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, cor: cor, factor_CONVERSAO: response[x][1].factor_CONVERSAO,
                id_LIN: response[x][0].id_MANUTENCAO_LIN, id: response[x][0].id_ADITIVO, nome: response[x][1].nome_COMPONENTE, valor1: valor1, valor2: response[x][0].valor2,
                unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: response[x][0].obs_PLANEAMENTO,
                stock: stock, cod_REF: response[x][0].cod_REF, nome_REF: response[x][1].nome_REF, unidstock: response[x][0].stkunit, valor_agua: value, factor: response[x][1].factor_MULTIPLICACAO_AGUA
              }
            );
            pos2++;
          }
          this.arrayForm.find(item => item.pos == pos).aditivos = this.arrayForm.find(item => item.pos == pos).aditivos.slice();
          this.textotabela = null;
        } else {
          this.textotabela = null;
        }
      },
      error => console.log(error));
  }

  //adicionar novo formulário
  novalinha() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    this.pos++;
    if (this.arrayForm.length < 1) {

      var data = this.formatDate(new Date().toDateString());
      var hora = new Date(new Date().getTime() + 600000).toLocaleTimeString().slice(0, 5);
      this.arrayForm.push({
        executado: false, preparado: false, obs_prep: null, doseador: null, doseadores: [],
        id_manu: id, data: new Date(), cod_analise: null, nome_analise: null, disable_op: false,
        pos: this.pos, id: null, id_banho: null, hora_pre: hora, data_pre: data, tipo_adicao: this.tipo_adicao[0].value, data_valida: null,
        interva_ope: this.intervalo_op[0].value, id_195: null, obs_pla: null, obs_exec: null, resp_exe: null, resp_exe_id: null, hora_exc: null, data_exc: null, resp_prep: null, data_prep: null, tina: null, id_tina: null, capacidade: null, aditivos: []
      });
    }
  }

  //preencher nome da tina/capacidade e tabela dos aditivos
  nome_tinas(event, pos) {
    this.arrayForm.find(item => item.pos == pos).tina = event.value.nome_tina;
    this.arrayForm.find(item => item.pos == pos).id_tina = event.value.id_tina;
    this.arrayForm.find(item => item.pos == pos).capacidade = event.value.capacidade;
    this.arrayForm.find(item => item.pos == pos).doseadores = event.value.doseadores;
    this.arrayForm.find(item => item.pos == pos).aditivos = [];
    this.arrayForm.find(item => item.pos == pos).doseador = null;
  }

  carregaaditivos(event, id, pos) {
    var array = [];
    this.arrayForm.find(item => item.pos == pos).aditivos = [];
    if (id.id != "" && id.id != null && event.value != "") {
      this.ABDICBANHOADITIVOService.getbyID_banho(id.id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir componente Componente
          if (count > 0) {
            this.textotabela = "A PESQUISAR...";
            var pos2 = 1;
            for (var x in response) {
              var disabled = true;
              if (response[x][0].manutencaoreposicao == true) disabled = false;
              if (response[x][1].cod_REF != null) {
                var valor1 = this.getValor(event.value, response, x);

                if (valor1 != 0 && valor1 != null) {
                  this.carregaaditivosstock(response, x, pos, pos2, count, array, disabled, event.value);
                } else {
                  if (pos2 == count) {
                    this.arrayForm.find(item => item.pos == pos).aditivos = array;
                    this.textotabela = null;
                  }
                }
              } else {
                var valor1 = this.getValor(event.value, response, x);

                if (valor1 != 0 && valor1 != null) {
<<<<<<< HEAD
                  array.push({ cor: "", liecod: null, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: valor1, valor2: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, factor_CONVERSAO: response[x][1].factor_CONVERSAO, valor_agua: null, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
=======
                  array.push({ liecod: null, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: valor1, valor2: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
                  this.ordernar(array);
                }
                if (pos2 == count) {
                  this.arrayForm.find(item => item.pos == pos).aditivos = array;
                  this.textotabela = null;
                }
              }
              pos2++;
            }
          }
        }, error => console.log(error));
    }
  }

  //devolve valor 1 dependente da dose
  getValor(dose, response, x) {
    if (dose != null && dose != "") {
      var valor = null;
      if (response[x][0]['valor_DOSE' + dose] != null) valor = response[x][0]['valor_DOSE' + dose].toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
      return valor;
    } else {
      return null;
    }
  }

  carregaaditivosstock(response, x, pos, pos2, total2, array, disabled, dose) {
    var query = [];
    var total = null;
    this.GERARMAZEMService.getAll().subscribe(
      res => {

        var count1 = Object.keys(res).length;
        if (count1 > 0) {
          for (var y in res) {
            query.push("'" + res[y].cod_ARMAZEM + "'");
          }
          var data = [{ proref: response[x][1].cod_REF, liecod: query.toString() }];
          this.GERARMAZEMService.getStock(data).subscribe(
            res1 => {
              var count = Object.keys(res1).length;
              var liecod = null;
              var unid = "";
              if (count > 0) {
                total = parseFloat(res1[0].STOQTE).toFixed(2);
                total = total.replace(".", ",");
                liecod = res1[0].LIECOD;
                unid = res1[0].UNIUTI;
              }
<<<<<<< HEAD
              array.push({ cor: "", liecod: liecod, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, factor_CONVERSAO: response[x][1].factor_CONVERSAO, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: unid, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
=======
              array.push({ liecod: liecod, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: unid, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
              this.ordernar(array);
              if (pos2 == total2) {
                this.arrayForm.find(item => item.pos == pos).aditivos = array;
                this.textotabela = null;
              }

            },
            error => {
<<<<<<< HEAD
              array.push({ cor: "", liecod: null, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, factor_CONVERSAO: response[x][1].factor_CONVERSAO, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
=======
              array.push({ liecod: null, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
              this.ordernar(array);
              if (pos2 == total2) {
                this.arrayForm.find(item => item.pos == pos).aditivos = array;
                this.textotabela = null;
              }
              console.log(error);
            });
        } else {
<<<<<<< HEAD
          array.find(item => item.pos == pos).aditivos.push({ cor: "", liecod: response[x][0].liecod, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, factor_CONVERSAO: response[x][1].factor_CONVERSAO, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
=======
          array.find(item => item.pos == pos).aditivos.push({ liecod: response[x][0].liecod, disabled: disabled, pos: pos2, id_LIN: null, cisterna: response[x][1].cisterna, nome_REF_SUBSTITUTA: response[x][1].nome_REF_SUBSTITUTA, cod_REF_SUBSTITUTA: response[x][1].cod_REF_SUBSTITUTA, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, nome_REF: response[x][1].nome_REF, cod_REF: response[x][1].cod_REF });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
          this.ordernar(array);
          if (pos2 == total2) {
            this.arrayForm.find(item => item.pos == pos).aditivos = array;
            this.textotabela = null;
          }
        }

      },
      error => console.log(error));
  }

  ordernar(array) {
    array.sort((n1, n2) => {
      if (n1.pos > n2.pos) {
        return 1;
      }

      if (n1.pos < n2.pos) {
        return -1;
      }

      return 0;
    });
  }

  //preenche combobox banhos
  preenche_banhos(id) {
    this.banhos = [];
    if (this.linha["id"] != "") {
      //preenche combobox banhos
      this.ABDICBANHOService.getAllLINHAbylinha_tipo(this.linha["id"], "R").subscribe(
        response => {
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            var doseadores = [{ label: "--", value: "" }]
            if (response[x][0].dose1 != null && response[x][0].dose1 != "") doseadores.push({ label: response[x][0].dose1, value: 1 + '' })
            if (response[x][0].dose2 != null && response[x][0].dose2 != "") doseadores.push({ label: response[x][0].dose2, value: 2 + '' })
            if (response[x][0].dose3 != null && response[x][0].dose3 != "") doseadores.push({ label: response[x][0].dose3, value: 3 + '' })
            if (response[x][0].dose4 != null && response[x][0].dose4 != "") doseadores.push({ label: response[x][0].dose4, value: 4 + '' })
            if (response[x][0].dose5 != null && response[x][0].dose5 != "") doseadores.push({ label: response[x][0].dose5, value: 5 + '' })

            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, id_tina: response[x][2].id_TINA, nome_tina: response[x][2].cod_TINA, capacidade: response[x][2].capacidade, doseadores: doseadores } });
          }
          this.banhos = this.banhos.slice();
          this.carregarlinhas(id);
        },
        error => console.log(error));
    }

  }

  //atulizar valor agua ao alterar Valor 1
  atualizarvaloragua(val, fator, pos_adi, pos_item) {

    var num = (val.replace(",", ".")) * fator;
    var num2 = num.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
    this.arrayForm.find(item => item.pos == pos_item).aditivos.find(item => item.pos == pos_adi).valor_agua = num2;
  }

  //apagar linha
  apagarlinha(pos, id) {
    this.confirmapagarlinha(pos, id);
  }

  //popup apagarlinha
  confirmapagarlinha(pos, id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (id != null && id != "") {
          this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
            response => {
              for (var x in response) {
                var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
                MOV_MANUTENCAO_CAB = response[x][0];
                MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
                MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
                MOV_MANUTENCAO_CAB.inativo = true;
                if (response[x][3] != null) {
                  this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                    resp => {
                      var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                      MOV_REG_PARAM_OPERACAO = resp[0][0];
                      MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                      MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                      MOV_REG_PARAM_OPERACAO.inativo = true;

                      this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                      }, error => {
                        console.log(error); this.simular(this.inputerro);
                      });
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                }
                this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                  this.ABMOVMANUTENCAOService.atualizarestados(MOV_MANUTENCAO_CAB.id_MANUTENCAO).subscribe(
                    response => { }, error => {
                      console.log(error);
                    });
                  this.ABMOVMANUTENCAOETIQService.ATUALIZAQUANTAOAPAGAR(MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB).subscribe(() => { }, error => {
                    console.log(error);
                  });
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
              var index1 = this.arrayForm.findIndex(item => item.pos === pos);
              this.arrayForm.splice(index1, 1);
              this.arrayForm = this.arrayForm.slice();
              this.simular(this.inputapagar);
              this.novalinha();
            },
            error => console.log(error));
        } else {
          var index = this.arrayForm.findIndex(item => item.pos === pos);
          this.arrayForm.splice(index, 1);
          this.arrayForm = this.arrayForm.slice();
          this.simular(this.inputapagar);
          this.novalinha();
        }

      }
    });
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  gravar() {

    if (!this.planeamento && this.novo) {
      var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
      MOV_MANUTENCAO.id_LINHA = this.linha["id"];
      MOV_MANUTENCAO.estado = this.estado;
      MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
      MOV_MANUTENCAO.inativo = false;
      MOV_MANUTENCAO.id_TURNO = this.id_turno;
      MOV_MANUTENCAO.data_PLANEAMENTO = this.data_planeamento;
      MOV_MANUTENCAO.id_TIPO_MANUTENCAO = this.tipo_manu_id;
      MOV_MANUTENCAO.data_CRIA = new Date();
      MOV_MANUTENCAO.utz_CRIA = this.user;
      MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
      MOV_MANUTENCAO.inativo = false;
      MOV_MANUTENCAO.classif = "R";
      this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
        res => {

          this.simular(this.inputnotifi);

          if (this.url != null) {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: res.id_MANUTENCAO, redirect: "listagem" } });
          } else {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: res.id_MANUTENCAO } });
          }
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });

    } else {
      var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
      MOV_MANUTENCAO = this.manutencao_dados;
      MOV_MANUTENCAO.data_ULT_MODIF = new Date();
      MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
      MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
      MOV_MANUTENCAO.data_PLANEAMENTO = this.data_planeamento;
      MOV_MANUTENCAO.estado = this.estado
      this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
<<<<<<< HEAD
        this.ABMOVMANUTENCAOService.atualizarestados(MOV_MANUTENCAO.id_MANUTENCAO).subscribe(
          response => { }, error => {
            console.log(error);
          });
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        this.simular(this.inputgravou);
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
    }
  }

  gravarlinha(pos) {
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.gravarlinhas = false;
    var data = new Date(new Date(this.arrayForm.find(item => item.pos == pos).data_pre).toDateString() + " " + this.arrayForm.find(item => item.pos == pos).hora_pre);
    this.data_planeamendth = new Date(new Date(this.data_planeamento).toDateString() + " " + this.hora_planeamento.slice(0, 5));
    if (data > this.data_planeamendth) {
      if (this.arrayForm.find(item => item.pos == pos).id != null) {
        //update
        this.ABMOVMANUTENCAOCABService.getbyID_cab(this.arrayForm.find(item => item.pos == pos).id).subscribe(
          response => {
            for (var x in response) {
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ULT_MODIF = new Date();
              MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
              MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
              MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
              MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
              MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
              MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
              MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
              MOV_MANUTENCAO_CAB.data_PREVISTA = this.arrayForm.find(item => item.pos == pos).data_pre;
              MOV_MANUTENCAO_CAB.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
              MOV_MANUTENCAO_CAB.doseador = this.arrayForm.find(item => item.pos == pos).doseador;
              MOV_MANUTENCAO_CAB.utz_ULT_MODIF = this.user;

              if (this.admin) {
                MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
                MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
                MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
                if (MOV_MANUTENCAO_CAB.hora_EXECUCAO != null) {
                  this.arrayForm.find(item => item.pos == pos).executado = true;
                } else {
                  this.arrayForm.find(item => item.pos == pos).executado = false;
                }
                var tamanho = this.arrayForm.length;
                var count = 0;
                for (var y in this.arrayForm) {
                  if (this.arrayForm[y].executado) count++;
                }
                //this.estado = "Em Execução";
                if (tamanho == count) {
                  this.estado = "Executado";
                }
                var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
                MOV_MANUTENCAO = this.manutencao_dados;
                MOV_MANUTENCAO.estado = this.estado;
                MOV_MANUTENCAO.data_ULT_MODIF = new Date();
                MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
                this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
                  this.ABMOVMANUTENCAOService.atualizarestados(MOV_MANUTENCAO.id_MANUTENCAO).subscribe(
                    response => { }, error => {
                      console.log(error);
                    });
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                this.gravarlinhasaditivos(response[x][0].id_MANUTENCAO_CAB, pos)
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
          },
          error => console.log(error));
      } else {
        this.gravarlinhas = true;
        //insere
        MOV_MANUTENCAO_CAB.data_CRIA = new Date();
        MOV_MANUTENCAO_CAB.data_PREVISTA = this.arrayForm.find(item => item.pos == pos).data_pre;
        MOV_MANUTENCAO_CAB.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
        MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
        MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
        MOV_MANUTENCAO_CAB.id_MANUTENCAO = this.arrayForm.find(item => item.pos == pos).id_manu;
        MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
        MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
        MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
        MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
        MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
        MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
        MOV_MANUTENCAO_CAB.doseador = this.arrayForm.find(item => item.pos == pos).doseador;
        MOV_MANUTENCAO_CAB.inativo = false;

        if (this.admin) {
          MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
          MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
          MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
        }
<<<<<<< HEAD

        //validar lista de aditivos
        this.ABDICBANHOADITIVOService.getbyID_banho(MOV_MANUTENCAO_CAB.id_BANHO).subscribe(
          response => {
            var count = Object.keys(response).length;
            //se existir  Componente
            if (count > 0) {
              var aditivos = this.arrayForm.find(item => item.pos == pos).aditivos;
              var valid = true;
              for (var x in response) {
                var valor1 = this.getValor(MOV_MANUTENCAO_CAB.doseador, response, x);
                if (valor1 != 0 && valor1 != null) {
                  if (aditivos.find(item => item.id == response[x][1].id_COMPONENTE && item.valor1 == valor1)) { } else {
                    valid = false;
                  }
                }

              }
              if (!valid) {
                this.confirmationService.confirm({
                  message: 'Foi detectado um valor incorreto nos aditivos. Deseja Continuar?',
                  header: 'Aviso',
                  icon: 'fa fa-exclamation-triangle',
                  accept: () => {
                    this.criar_cab(MOV_MANUTENCAO_CAB, pos);
                  }
                });
              } else {
                this.criar_cab(MOV_MANUTENCAO_CAB, pos);
              }
            } else {
              this.criar_cab(MOV_MANUTENCAO_CAB, pos);
            }
          }, error => { console.log(error); this.criar_cab(MOV_MANUTENCAO_CAB, pos); });


      }

=======
        this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
          res => {
            this.arrayForm.find(item => item.pos == pos).id = res.id_MANUTENCAO_CAB;
            this.gravarlinhasaditivos(res.id_MANUTENCAO_CAB, pos)
          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
      }
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    } else {
      this.simular(this.aviso_concluir_planeamento3);
    }
  }

<<<<<<< HEAD
  criar_cab(MOV_MANUTENCAO_CAB, pos) {

    this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
      res => {
        this.arrayForm.find(item => item.pos == pos).id = res.id_MANUTENCAO_CAB;
        this.gravarlinhasaditivos(res.id_MANUTENCAO_CAB, pos)
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }



=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  gravarlinhasaditivos(id, pos) {
    if (this.arrayForm.find(item => item.pos == pos).aditivos.length > 0) {
      for (var x in this.arrayForm.find(item => item.pos == pos).aditivos) {
        if (this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN == null) {
          var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
          MOV_MANUTENCAO_LINHA.id_ADITIVO = this.arrayForm.find(item => item.pos == pos).aditivos[x].id;
          MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id;
          MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
          MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
          MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
          MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;
          var value = 0;
          if (this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua != null) value = parseFloat(String(this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua).replace(",", "."));
          MOV_MANUTENCAO_LINHA.valor_AGUA = value;
          MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).aditivos[x].obs;
          MOV_MANUTENCAO_LINHA.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
          MOV_MANUTENCAO_LINHA.stock = (this.arrayForm.find(item => item.pos == pos).aditivos[x].stock) ? this.arrayForm.find(item => item.pos == pos).aditivos[x].stock.replace(",", ".") : null;
          MOV_MANUTENCAO_LINHA.cod_REF = this.arrayForm.find(item => item.pos == pos).aditivos[x].cod_REF;
          MOV_MANUTENCAO_LINHA.stkunit = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidstock;
          MOV_MANUTENCAO_LINHA.liecod = this.arrayForm.find(item => item.pos == pos).aditivos[x].liecod;
          MOV_MANUTENCAO_LINHA.nome_REF = this.arrayForm.find(item => item.pos == pos).aditivos[x].nome_REF;

          this.criar(MOV_MANUTENCAO_LINHA, pos, x);
        } else {
          this.atualizalinhasaditivos(this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN, pos, x)
        }

        var valor1 = 0;
        if (this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1 != null && this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1 != "") {
          valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
        }
        if (valor1 == 0) {
          this.arrayForm.find(item => item.pos == pos).aditivos[x].cor = "";
        } else {
<<<<<<< HEAD
          if (this.arrayForm.find(item => item.pos == pos).aditivos[x].cor == "") {
            this.arrayForm.find(item => item.pos == pos).aditivos[x].cor = "red";
          }
=======
          this.arrayForm.find(item => item.pos == pos).aditivos[x].cor = "red";
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        }
      }

    }
    if (this.gravarlinhas) {
      this.simular(this.inputnotifi);
    } else {
      this.simular(this.inputgravou);
    }

  }

  criar(MOV_MANUTENCAO_LINHA, pos, x) {
    this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
      res => {
        this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN = res.id_MANUTENCAO_LIN;
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  atualizalinhasaditivos(id, pos, x) {

    var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
    this.ABMOVMANUTENCAOLINHAService.getbyID_lin(id).subscribe(
      response => {
        for (var y in response) {
          this.atualizalinhasaditivos2(MOV_MANUTENCAO_LINHA, x, y, pos, response);
        }
      },
      error => console.log(error));
  }

  atualizalinhasaditivos2(MOV_MANUTENCAO_LINHA, x, y, pos, response) {
    MOV_MANUTENCAO_LINHA = response[y];
    MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
    MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
    MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
    MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;
    var value = 0;
    if (this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua != null) value = parseFloat(String(this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua).replace(",", "."));
    MOV_MANUTENCAO_LINHA.valor_AGUA = value;
    MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).aditivos[x].obs;
    MOV_MANUTENCAO_LINHA.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
    this.ABMOVMANUTENCAOLINHAService.update(MOV_MANUTENCAO_LINHA).then(() => {
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.manutencao.length;
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
      if (this.url != null) {
        this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i], redirect: "listagem" } });
      } else {
        this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i] } });
      }
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.manutencao.length;
    }
    this.i = this.i - 1;
    if (this.url != null) {
      this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i], redirect: "listagem" } });
    } else {
      this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i] } });
    }
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
    }
  }

  //ao alterar intervalo de operação
  alterarintervalo(event, pos, id) {
    if (id != null) {
      this.confirmationService.confirm({
        message: 'Ao alterar o Intervalo de Operação, o Registo de Operação será eliminado. Continuar?',
        header: 'Apagar Registo - ID: ' + id,
        icon: 'fa fa-trash',
        accept: () => {

          this.ADMOVREGPARAMOPERACAOService.getbyID(id).subscribe(
            response => {
              var count = Object.keys(response).length;
              if (count > 0) {
                var regpara = new AD_MOV_REG_PARAM_OPERACAO;
                regpara = response[0][0];
                regpara.inativo = true;
                this.ADMOVREGPARAMOPERACAOService.update(regpara).then(() => {
                  this.arrayForm.find(item => item.pos == pos).id_195 = null;
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
            }
          )

        }
      });
    }

  }

  //abre popup de análises
  showDialog(event, pos, id) {
    this.preencheanalises(id);
    this.pos_sele = pos;
    let elem = document.getElementById("pesquisa");
    let elm2 = document.getElementById("myModallinhas");
    let coords = elem.getBoundingClientRect();
    elm2.style.top = Math.abs(coords.bottom - event.screenY + 20) + 'px';
    elm2.style.bottom = 'none';
    this.simular(this.dialoglinhas);
  }

  //seleccionar analise da tabela e grava campos
  seleciona(event) {
    this.arrayForm.find(item => item.pos == this.pos_sele).cod_analise = event.data.id
    this.arrayForm.find(item => item.pos == this.pos_sele).nome_analise = event.data.id + ' - ' + event.data.nome;
    this.simular(this.closedialoglinha);
  }

  //ao selecionar tipode adição verifica se tem id195 se sim o int. oper. fica por defeito vermelho
  verifica_adicao(event, pos) {
    this.arrayForm.find(item => item.pos == pos).disable_op = false;
    this.arrayForm.find(item => item.pos == pos).interva_ope = null;
    if (event.value.id195 != "" && event.value.id195 != null) {
      this.arrayForm.find(item => item.pos == pos).interva_ope = this.intervalo_op.find(item => item.value.id195 == true).value;
      this.arrayForm.find(item => item.pos == pos).disable_op = true;
    }
  }

  preencher_id195(id, id195, pos, data_valida) {
    if (id == null) {
      this.simular(this.aviso_gravar);
    } else {
      var estado = "Registado";
      if (data_valida != null) {
        estado = "Validado";
      }
      if (id195 == null) {
        this.gravarlinha(pos);
        this.router.navigate(['registopara/novo'], { queryParams: { manu: id, estado: estado } });
      } else {
        this.router.navigate(['registopara/view'], { queryParams: { id: id195, estado: estado } });
      }

    }

  }

  concluir() {
    //Não deve permitir concluir uma Manutenção sem que exista pelo menos 1 ficha associada.
    if (this.arrayForm[0].id == null) {
      this.simular(this.aviso_concluir_planeamento2);
    } else {
      var encontrou = false;
      var encontrou_data = false;
      var banho;
      for (var x in this.arrayForm) {
        if (this.arrayForm[x].interva_ope != null) {
          if (this.arrayForm[x].interva_ope.id195 && this.arrayForm[x].id_195 == null) {
            encontrou = true;
          }
        }
        var data = new Date(new Date(this.arrayForm[x].data_pre).toDateString() + " " + this.arrayForm[x].hora_pre);
        var data2 = new Date();
        if (this.admin) { data2 = new Date(new Date(this.data_planeamento).toDateString() + " " + this.hora_planeamento.slice(0, 5)); }
        if (data < data2) {
          encontrou_data = true;
          banho = this.arrayForm[x].pos + " - Banho: " + this.banhos.find(item => item.value.id == this.arrayForm[x].id_banho.id).label;
        }
      }
      if (encontrou) {
        this.simular(this.aviso_concluir_planeamento);
      } else if (encontrou_data) {
        this.globalVar.setMensagem(banho);
        this.simular(this.aviso_concluir_planeamento3);
      } else {
        var hora_p = new Date().toLocaleTimeString().slice(0, 5);
        var data_p = new Date();
        if (this.admin) {
          data_p = new Date(this.data_planeamento);
          hora_p = this.hora_planeamento.slice(0, 5);
        }

        var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
        MOV_MANUTENCAO = this.manutencao_dados;
        MOV_MANUTENCAO.data_ULT_MODIF = new Date();
        MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
        MOV_MANUTENCAO.hora_PLANEAMENTO = hora_p;
        MOV_MANUTENCAO.data_PLANEAMENTO = data_p;
        MOV_MANUTENCAO.estado = "Planeado";
        this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
          this.router.navigate(['manutencaoreposicao']);
          this.simular(this.inputgravou);
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });
      }
    }

  }

  duplicar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {
        this.criarmanu(this.num_manutencao);
        this.simular(this.waitingDialog);
      }
    });
  }

  criarmanu(id) {
    this.data_actual = new Date();
    this.estado = "Em Planeamento";

    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO = response[x][0];
            MOV_MANUTENCAO.id_MANUTENCAO = null;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
            MOV_MANUTENCAO.inativo = false;
            MOV_MANUTENCAO.data_PLANEAMENTO = this.data_actual;
            MOV_MANUTENCAO.data_CRIA = new Date();
            MOV_MANUTENCAO.utz_CRIA = this.user;
            MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
            MOV_MANUTENCAO.impresso = false;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_MODIF = null;
            MOV_MANUTENCAO.utz_ULT_MODIF = null;
            MOV_MANUTENCAO.classif = "R";
            this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
              res => {
                this.criarmanu_cab(id, res.id_MANUTENCAO);
              }, error => {
                console.log(error);
              });

          }
        }
      },
      error => console.log(error));
  }

  criarmanu_cab(id, id_manu_nova) {
    this.id = id_manu_nova;
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO_CAB = response[x][0];
            var id = MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB = null;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO = id_manu_nova;
            MOV_MANUTENCAO_CAB.data_CRIA = new Date(new Date().getTime() + (1000 * parseInt(x)))
            MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
            MOV_MANUTENCAO_CAB.data_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.impresso = false;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.utz_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.data_PREVISTA = null;
            MOV_MANUTENCAO_CAB.hora_PREVISTA = null;
            // MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = null;
            // MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = null;
            // MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            //MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = null;
            // MOV_MANUTENCAO_CAB.obs_PREPARACAO = null;
            //MOV_MANUTENCAO_CAB.id_ANALISE = null;
            MOV_MANUTENCAO_CAB.utz_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.data_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.hora_PREPARACAO = null;
            this.criarmanucac(MOV_MANUTENCAO_CAB, id, count, x);

          }
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);

          if (this.url != null) {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id, redirect: "listagem" } });
          } else {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
          }

        } else {
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);
          if (this.url != null) {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id, redirect: "listagem" } });
          } else {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
          }
        }
      });
  }

  criarmanucac(MOV_MANUTENCAO_CAB, id, total, count) {
    this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
      res => {
        this.criarmanu_lin(id, res.id_MANUTENCAO_CAB, total, count);

      }, error => {
        console.log(error);
      });
  }

  criarmanu_lin(id, id_manu_cab_novo, total, count2) {

    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
            MOV_MANUTENCAO_LINHA = response[x][0];
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_LIN = null;
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id_manu_cab_novo;
            MOV_MANUTENCAO_LINHA.valor1 = null;
            MOV_MANUTENCAO_LINHA.valor2 = null;
            MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO;
            this.creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x);
          }
        } else {
          if (parseInt(total) - 1 == count2) {
            this.simular(this.inputgravou);
            if (this.url != null) {
              this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id, redirect: "listagem" } });
            } else {
              this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
            }
            this.simular(this.waitingDialogclose);
          }
        }
      },
      error => {
        console.log(error); this.simular(this.inputerro);
      });

  }


  creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x) {
    this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
      res => {
        if (parseInt(total) - 1 == count2 && (count - 1) == parseInt(x)) {
          this.simular(this.inputgravou);
          if (this.url != null) {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id, redirect: "listagem" } });
          } else {
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
          }
          this.simular(this.waitingDialogclose);
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
          response => {
            for (var x in response) {
              var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
              MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
              MOV_MANUTENCAO_CAB.inativo = true;

              if (response[x][3] != null) {
                this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                  resp => {
                    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                    MOV_REG_PARAM_OPERACAO = resp[0][0];
                    MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                    MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                    MOV_REG_PARAM_OPERACAO.inativo = true;

                    this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                  }, error => {
                    console.log(error); this.simular(this.inputerro);
                  });
              }
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {

              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.data_ANULACAO = new Date();
            MOV_MANUTENCAO.utz_ANULACAO = this.user;
            MOV_MANUTENCAO.inativo = true;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.router.navigate(['manutencaoreposicao']);
              this.simular(this.inputapagar);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          },
          error => console.log(error));

      }
    });
  }

  preparar_linha(pos, id, id_manu) {


    var aditivo2 = [];
    var encontrou2 = false;
    var encontrou3 = false;
    var aditivo = [];
    this.ABMOVMANUTENCAOLINHAService.getbyIDtotal(id).subscribe(
      resp => {
        var count = Object.keys(resp).length;
        if (count > 0) {
          for (var x in resp) {
            if (parseInt(resp[x][1]) == 0 && resp[x][0].cisterna) {
              encontrou2 = true;
              aditivo.push(resp[x][0].nome_COMPONENTE);
            }

            if (resp[x][3] > resp[x][4]) {
              encontrou3 = true;
              aditivo2.push(resp[x][0].nome_COMPONENTE);
            }
          }


          if (encontrou3) {
            this.mensagem_aviso = "O Valor a consumir para o(s) aditivo(s): " + aditivo2 + ", é superior ao valor planeado!!";
            this.mensagem_aviso2 = "Se realmente necessita consumir mais do que o planeado, então deverá fazer adicionalmente uma manutenção não planeada para registo da necessidade de consumo adicional."
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';

            this.simular(this.dialogAviso);

          } else if (encontrou2) {
            this.mensagem_aviso = "É necessário validar a etiqueta do(s) aditivo(s) " + aditivo + " do tipo cisterna!!";
            this.mensagem_aviso2 = "";
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';

            this.simular(this.dialogAviso);
          } else {
            this.preparar_linha1(pos, id, id_manu);
          }
        } else {
          this.preparar_linha1(pos, id, id_manu);
        }
      }, error => {
        this.preparar_linha1(pos, id, id_manu);
        console.log(error);
      });
  }


  preparar_linha1(pos, id, id_manu) {
    this.arrayForm.find(item => item.pos == pos).preparado = false;
    var encontrou = false;
    for (var x in this.arrayForm.find(item => item.pos == pos).aditivos) {
      var adi = this.arrayForm.find(item => item.pos == pos).aditivos[x];
      if (adi.cor == "red" || adi.cor == "yellow") {
        encontrou = true;
      }
    }
    var continuar = true;
    if (encontrou) {
      continuar = false;
      this.confirmationService.confirm({
        message: 'Existem Linhas que não estão Validadas, deseja Continuar?',
        header: 'Aviso',
        icon: 'fa fa-exclamation-triangle',
        accept: () => {
          this.preparar(pos, id, id_manu);
        }
      });
    } else {
      this.preparar(pos, id, id_manu);
    }

  }

  preparar(pos, id, id_manu) {

    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];
          MOV_MANUTENCAO_CAB.data_PREPARACAO = new Date();
          MOV_MANUTENCAO_CAB.utz_PREPARACAO = this.user;
          MOV_MANUTENCAO_CAB.hora_PREPARACAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_PREPARACAO = this.arrayForm.find(item => item.pos == pos).obs_prep;
          this.arrayForm.find(item => item.pos == pos).preparado = true;
          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].preparado) count++;
            }
            if (tamanho == count) {
              this.estado = "Preparado";
              this.preparado = false;
            } else {
              this.estado = "Em Preparação";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;

            var dados = "{numero_manutencao::" + id_manu + "\n/data_manutencao::" + this.data_planeamento + "\n/nome_banho::" + this.banhos.find(item => item.value.id == MOV_MANUTENCAO_CAB.id_BANHO).label
              + "\n/tina::" + this.arrayForm.find(item => item.pos == pos).tina + "\n/utilizador::" + this.username + "\n/linha::"
              + this.linhas.find(item => item.value.id === MOV_MANUTENCAO.id_LINHA).label
              + "\n/tina::" + this.banhos.find(item => item.value.id == MOV_MANUTENCAO_CAB.id_BANHO).value.nome_tina
              + "\n/tipo_manutencao::" + this.tipo_manu.find(item => item.value == MOV_MANUTENCAO.id_TIPO_MANUTENCAO).label + "\n/datahoraexecucao::" + ""
              + "\n/datahorapreparacao::" + this.formatDate(MOV_MANUTENCAO_CAB.data_PREPARACAO) + "  " + MOV_MANUTENCAO_CAB.hora_PREPARACAO + "\n/observacao_preparacao::" + MOV_MANUTENCAO_CAB.obs_PREPARACAO + "}";

            if (MOV_MANUTENCAO_CAB.obs_PREPARACAO != "" && MOV_MANUTENCAO_CAB.obs_PREPARACAO != null) this.evento(dados, "Ao Preparar");

            this.ABMOVMANUTENCAOLINHAService.apagar_linhas(MOV_MANUTENCAO.id_MANUTENCAO).then(() => {
              this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
                this.ABMOVMANUTENCAOService.atualizarestados(MOV_MANUTENCAO.id_MANUTENCAO).subscribe(
                  response => { }, error => {
                    console.log(error);
                  });
                this.criarficheiro(id);
                if (this.url != null) {
                  this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: id_manu, redirect: "listagem" } });
                } else {
                  this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: id_manu } });
                }
                //this.inicia(id_manu);
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });

            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  evento(dados, momento) {

    var data = [{ MODULO: 1, MOMENTO: momento, PAGINA: "Manutenções", ESTADO: true, DADOS: dados }];

    //envia email depois com ficheiro
    this.UploadService.verficaEventos(data).subscribe(result => {

    }, error => {
      console.log(error);
    });

  }
  confirmar_linha(pos, id, id_manu) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];

          /* MOV_MANUTENCAO_CAB.data_PREPARACAO = new Date();
           MOV_MANUTENCAO_CAB.utz_PREPARACAO = this.user;
           MOV_MANUTENCAO_CAB.hora_PREPARACAO = new Date().toLocaleTimeString().slice(0, 5);*/

          MOV_MANUTENCAO_CAB.data_EXECUCAO = new Date();
          MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.user;
          MOV_MANUTENCAO_CAB.hora_EXECUCAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
          this.arrayForm.find(item => item.pos == pos).executado = true
          if (this.admin && this.arrayForm.find(item => item.pos == pos).data_exc != null) {
            MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
            if (MOV_MANUTENCAO_CAB.hora_EXECUCAO != null) {
              this.arrayForm.find(item => item.pos == pos).executado = true;
            } else {
              this.arrayForm.find(item => item.pos == pos).executado = false;
            }
          }

          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].executado) count++;
            }
            if (tamanho == count) {
              this.estado = "Executado";
            } else {
              this.estado = "Em Execução";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;

            var dados = "{numero_manutencao::" + id_manu + "\n/data_manutencao::" + this.data_planeamento + "\n/nome_banho::" + this.banhos.find(item => item.value.id == MOV_MANUTENCAO_CAB.id_BANHO).label
              + "\n/tina::" + this.arrayForm.find(item => item.pos == pos).tina + "\n/utilizador::" + this.username + "\n/linha::"
              + this.linhas.find(item => item.value.id === MOV_MANUTENCAO.id_LINHA).label
              + "\n/tina::" + this.banhos.find(item => item.value.id == MOV_MANUTENCAO_CAB.id_BANHO).value.nome_tina
              + "\n/tipo_manutencao::" + this.tipo_manu.find(item => item.value == MOV_MANUTENCAO.id_TIPO_MANUTENCAO).label
              + "\n/datahorapreparacao::" + this.formatDate(MOV_MANUTENCAO_CAB.data_PREPARACAO) + "  " + MOV_MANUTENCAO_CAB.hora_PREPARACAO.slice(0, 5)
              + "\n/datahoraexecucao::" + this.formatDate(MOV_MANUTENCAO_CAB.data_EXECUCAO) + "  " + MOV_MANUTENCAO_CAB.hora_EXECUCAO
              + "\n/observacao_preparacao::" + MOV_MANUTENCAO_CAB.obs_PREPARACAO
              + "\n/observacao_execucao::" + MOV_MANUTENCAO_CAB.obs_EXECUCAO + "}";

            if (MOV_MANUTENCAO_CAB.obs_EXECUCAO != "" && MOV_MANUTENCAO_CAB.obs_EXECUCAO != null) this.evento(dados, "Ao Executar");
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.ABMOVMANUTENCAOService.atualizarestados(MOV_MANUTENCAO.id_MANUTENCAO).subscribe(
                response => { }, error => {
                  console.log(error);
                });
              //this.inicia(id_manu);
              this.gravarlinhasaditivos(response[x][0].id_MANUTENCAO_CAB, pos)
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });

          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  imprimir(relatorio, id) {
    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    MOV_MANUTENCAO = this.manutencao_dados;
    MOV_MANUTENCAO.data_ULT_IMPRES = new Date();
    MOV_MANUTENCAO.utz_ULT_IMPRES = this.user;
    if (relatorio == 'manutencao_etiquetas') {
      this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
    } else if (relatorio != "manutencao_individual") {
      this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
        this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
          response => {
            for (var x in response) {
              var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ULT_IMPRES = new Date();
              MOV_MANUTENCAO_CAB.utz_ULT_IMPRES = this.user;
              MOV_MANUTENCAO_CAB.impresso = true;
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
          },
          error => console.log(error));
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
    } else {
      this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
        response => {
          for (var x in response) {
            var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB = response[x][0];
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = new Date();
            MOV_MANUTENCAO_CAB.utz_ULT_IMPRES = this.user;
            MOV_MANUTENCAO_CAB.impresso = true;
            this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
              this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          }
        },
        error => console.log(error));
    }

  }


  imprimiretiquetas(relatorio, id) {
    this.filename = new Date().toLocaleString().replace(/\D/g, '');
    this.RelatoriosService.downloadPDF("pdf", this.filename, id, relatorio).subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        //this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);

        this.GERPOSTOSService.getByIp(this.getCookie("IP_CLIENT")).subscribe(
          (res) => {
            var count = Object.keys(res).length;
            if (count > 0 && res[0].impressora != "" && res[0].impressora != null) {
              this.UploadService.imprimir(this.filename, res[0].impressora).subscribe(
                response => {
                  //console.log(response)
                  //console.log(response._body)
                  this.simular(this.enviadoparaimpressora);
                }, error => {
                  //console.log(error.status);
                  this.simular(this.erroimprimir);
                  console.log(error._body);
                });

            } else {
              var iframe;
              if (!iframe) {
                iframe = document.createElement('iframe');
                document.body.appendChild(iframe);

                iframe.style.display = 'none';
                iframe.onload = function () {
                  setTimeout(function () {
                    iframe.focus();
                    iframe.contentWindow.print();
                  }, 1);
                };
              }
              iframe.src = this.fileURL;
            }
          }, error => console.log(error));
      }
    );
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  //preenche tabela das análises
  preencheanalises(idbanho) {
    this.pesquisa_analise = [];
    var d = new Date(this.datapl);
    d.setDate(d.getDate() - 5);
    this.ABMOVANALISEService.getAllmanu(idbanho, d).subscribe(
      response => {
        for (var x in response) {
          var cor = "";
          if (response[x][0].cor_LIMITES == "vermelho") {
            cor = "rgba(239, 19, 19, 0.58)";
          } else if (response[x][0].cor_LIMITES == "amarelo") {
            cor = "rgba(255, 255, 0, 0.62)";
          } else {
            cor = "none";
          }

          this.pesquisa_analise.push({ cor_banho: cor, id: response[x][0].id_ANALISE, linha: response[x][0].id_LINHA, data: this.formatDate(response[x][0].data_ANALISE), nome: response[x][2].nome_BANHO, tina: response[x][3].cod_TINA, cor: response[x][1].cor });
        }
        this.pesquisa_analise = this.pesquisa_analise.slice();
      },
      error => console.log(error));
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
  //apaga cod analise
  limpar(pos) {
    this.arrayForm.find(item => item.pos == pos).cod_analise = null;
    this.arrayForm.find(item => item.pos == pos).nome_analise = null;
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  preenchedados(val = false, id = null) {
    //preenche combobox unidades
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {

        this.medidas = [];
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
        this.preenchelinhas(val, id);
      },
      error => console.log(error));
  }

  preenchelinhas(val, id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        this.linhas = this.linhas.slice();
        this.preenchetipo_man(val, id);
      },
      error => console.log(error));
  }

  preenchetipo_man(val, id) {
    //preenche combobox Tipo Manutenção
    this.ABDICTIPOMANUTENCAOService.getAll(["R"]).subscribe(
      response => {
        this.tipo_manu = [];
        this.tipo_manu.push({ label: "Sel. Tipo Manutenção", value: "" });
        for (var x in response) {
          this.tipo_manu.push({ label: response[x].nome_TIPO_MANUTENCAO, value: response[x].id_TIPO_MANUTENCAO });
        }
        if (this.novo && this.tipo_manu.length == 2) {
          this.tipo_manu_id = this.tipo_manu[1].value;
        }
        this.tipo_manu = this.tipo_manu.slice();
        this.preencheTurno(val, id);
      },
      error => console.log(error));
  }


  preencheTurno(val, id) {
    //preenche combobox Turno
    this.ABDICTURNOService.getAll().subscribe(
      response => {
        this.turno = [];
        this.turno.push({ label: "Sel. Turno", value: "" });
        for (var x in response) {
          this.turno.push({ label: response[x].nome_TURNO, value: response[x].id_TURNO });
        }
        this.turno = this.turno.slice();
        this.preencheAdicao(val, id);
      },
      error => console.log(error));
  }
  preencheAdicao(val, id) {
    //preenche combobox Tipo Adição
    this.ABDICTIPOADICAOService.getAll(["R"]).subscribe(
      response => {
        this.tipo_adicao = [];
        //this.tipo_adicao.push({ label: "Sel. Tipo Adição", value: "" });
        for (var x in response) {
          this.tipo_adicao.push({ label: response[x].nome_TIPO_ADICAO, value: { id: response[x].id_TIPO_ADICAO, id195: response[x].id_TIPO_OPERACAO } });
        }
        this.tipo_adicao = this.tipo_adicao.slice();
        this.preencheIntervalo(val, id);
      },
      error => console.log(error));
  }
  preencheIntervalo(val, id) {
    //preenche combobox Intervalo Oper.
    this.ABDICTIPOOPERACAOService.getAll(["R"]).subscribe(
      response => {
        this.intervalo_op = [];
        // this.intervalo_op.push({ label: "Sel. Intervalo Oper.", value: "" });
        for (var x in response) {
          this.intervalo_op.push({ label: response[x].nome_TIPO_OPERACAO, value: { id: response[x].id_TIPO_OPERACAO, id195: response[x].id195 } });
        }
        this.intervalo_op = this.intervalo_op.slice();
        this.preenchettz(val, id);
      },
      error => console.log(error));
  }

  preenchettz(val, id) {
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.utilizadores = [];
        for (var x in response) {
          this.utilizadores.push({ label: response[x].id_UTILIZADOR + ' - ' + response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR });
        }
        this.utilizadores = this.utilizadores.slice();
        if (val) this.inicia(id)
      },
      error => console.log(error));
  }

  historico(id) {
    this.router.navigate(['manutencaoreposicao/historico'], { queryParams: { id: id, classif: 'R' } });
  }

  /**novo - ver cisterna */
  adicionarEtiquetas(pos, id, event) {
    this.verificacisterna(pos);
    this.idmovacab = id;
    this.posmovacab = pos;
    this.idtempetiquetas = 1;
    this.etiquetas = [];
    this.etiquetas.push({
      disabled: false,
      id: "id" + this.idtempetiquetas, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
      LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: null, ETQNUMENR: "", INDREF: ""
    });
    this.pos_sele = pos;

    let elm2 = document.getElementById("myModaletiquetascontent");
    let elem3 = document.getElementById("mainpagecontent");
    let h = elem3.getBoundingClientRect().height;

    document.getElementById("myModaletiquetas").style.height = Math.abs(h + 300) + 'px';
    let coords = document.getElementById("toptexttop").offsetTop;
    elm2.style.top = Math.abs(coords - 10) + 'px';

    elm2.style.bottom = 'none';

    this.simular(this.dialogetiq);
    setTimeout(() => {
      this.inputfocus("id" + this.idtempetiquetas);
    }, 300);
  }

  addlinhaetiq(id, etiqueta) {
    if (this.etiquetas[this.etiquetas.length - 1].numero != "") {
      this.idtempetiquetas++;
      this.etiquetas.push({
        disabled: false,
        id: "id" + this.idtempetiquetas, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
        LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: null, ETQNUMENR: "", INDREF: ""
      });
      setTimeout(() => {
        this.inputfocus("id" + this.idtempetiquetas);
      }, 30);
    }
    if (etiqueta != "") {
      this.adicionadados(id, etiqueta);
    }

  }

  adicionadados(id, campo) {
    var etiquetan = "0000000000" + campo;

    this.ABMOVMANUTENCAOLINHAService.getDadosEtiqueta(etiquetan.substring(etiquetan.length - 10)).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var etiqueta = this.etiquetas.find(item => item.id == id);
          etiqueta.numero = etiquetan.substring(etiquetan.length - 10);
          etiqueta.produto = response[0].PRODES1;
          var value = "0";
          if (response[0].ETQEMBQTE != null) value = parseFloat(response[0].ETQEMBQTE).toFixed(3);
          etiqueta.qtd = value.replace(".", ",");
          etiqueta.EMPCOD = response[0].EMPCOD;
          etiqueta.ETQORILOT1 = response[0].ETQORILOT1;
          etiqueta.LIECOD = response[0].LIECOD;
          etiqueta.LOTNUMENR = response[0].LOTNUMENR;
          etiqueta.PROREF = response[0].PROREF;
          etiqueta.PRODES = response[0].PRODES1;
          etiqueta.DATCRE = response[0].DATCRE;
          etiqueta.UNICOD = response[0].UNICOD;
          etiqueta.UNISTO = response[0].UNISTO;
          etiqueta.VA1REF = response[0].VA1REF;
          etiqueta.VA2REF = response[0].VA2REF;
          etiqueta.indnumenr = response[0].INDNUMENR;
          etiqueta.INDREF = response[0].INDREF;
          etiqueta.ETQNUMENR = response[0].ETQNUMENR;
          etiqueta.ETQORIQTE1 = response[0].ETQORIQTE1;
          etiqueta.disabled = true;
        }
      }, error => { console.log(error); });
  }

  inputfocus(id) {
    let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('#tabelaetiquetas>tbody>tr>td #' + id + '')[0];
    inputField && inputField.focus();
  }

  apagaretiqueta(id) {
    var index1 = this.etiquetas.findIndex(item => item.id === id);
    this.etiquetas.splice(index1, 1);
    if (this.etiquetas.length == 0) {
      this.idtempetiquetas++;
      this.etiquetas.push({
        disabled: false,
        id: "id" + this.idtempetiquetas, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
        LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: null, ETQNUMENR: "", INDREF: ""
      });
      setTimeout(() => {
        this.inputfocus("id" + this.idtempetiquetas);
      }, 30);
    }
  }

  guardaretiquetas() {
    this.tempeti = [];
    this.tempQTD = [];
    var enc = true;
    for (var x in this.etiquetas) {
      //VERIFICA SE ADITIVO JÁ TEM A ETIQUETA
      if (this.etiquetas[x].numero != "" && this.etiquetas[x].numero != null && this.etiquetas[x].qtd.replace(",", ".") > 0) {
        if (this.etiquetas[x].PROREF != null && this.etiquetas[x].PROREF != "") {
          enc = false;
          this.verificaetiqueta(this.idmovacab, this.etiquetas[x].PROREF, this.etiquetas[x].numero, x, new Date());

        }
      }
    }
    if (enc) {
      this.simular(this.closedialogetiq);
    }
  }

  verificaetiqueta(id_manu, ref, etique, x, data) {

    this.ABMOVMANUTENCAOETIQService.getbyRef(id_manu, ref).subscribe(response => {
      var count = Object.keys(response).length;
      var encontrou = false;
      var total = 0;

      if (count > 0) {
        for (var z in response) {
          if (response[z][0].etqnum == etique) {
            encontrou = true;
          }
          if (!this.tempQTD.find(item => item.ref == response[z][0].proref)) {
            total = response[z][1];
            this.tempQTD.push({ ref: response[z][0].proref, qtdetiq: 0, qtd_falta: response[z][1] });
          }
        }
      }

      //VERIFICA SE JÁ EXITE ETIQUETAS INSERIDAS IGUAIS
      if (this.tempeti.indexOf(this.etiquetas[x].numero) == -1 && !encontrou) {
        this.tempeti.push(this.etiquetas[x].numero);
        //VERIFICA SE EXISTE ADITIVOS PARA AS ETIQUETAS INSERIDAS 
        if (this.arrayForm.find(item => item.pos == this.posmovacab).aditivos.find(item => item.cod_REF == this.etiquetas[x].PROREF)) {
          //VERIFICA SE EXISTEM ETIQUETAS PARA O ADITIVO
          var adi = this.arrayForm.find(item => item.pos == this.posmovacab).aditivos.find(item => item.cod_REF == this.etiquetas[x].PROREF);
          var conver = adi.factor_CONVERSAO;
          if (!adi.cisterna) {
            if (adi.factor_CONVERSAO == null || adi.factor_CONVERSAO == 0) conver = 1;
            this.etiquetas[x].qtdconvers = parseFloat(this.etiquetas[x].qtd.replace(",", ".")) / conver;
            if (this.tempQTD.find(item => item.ref == this.etiquetas[x].PROREF)) {
              var elem = this.tempQTD.find(item => item.ref == this.etiquetas[x].PROREF);
              if (total != 0) {
                elem.qtd_falta = (adi.valor1.replace(",", ".") - total);
              } else if (elem.qtd_falta == 0) {
                elem.qtd_falta = adi.valor1.replace(",", ".");
              }


              if (elem.qtd_falta >= 0) {
                var valor = elem.qtd_falta;

                var valor1 = this.etiquetas[x].qtdconvers - valor;
                var valor2 = valor - this.etiquetas[x].qtdconvers;
                var consumir = this.etiquetas[x].qtdconvers - valor;
                consumir = Math.max(0, consumir);
                if (consumir == 0) {
                  consumir = this.etiquetas[x].qtdconvers;
                } else {
                  consumir = valor;
                }

                var qtd = Math.max(0, valor1);
                valor2 = Math.max(0, valor2);
                elem.qtdetiq = qtd;
                elem.qtd_falta = valor2;
                if (consumir == 0) { adi.cor = "yellow" } else if (valor2 > 0) { adi.cor = "red" } else { adi.cor = "green" }
                this.etiquetas[x].consumir = consumir;
                this.etiquetas[x].quant_FINAL = qtd * conver;
                this.etiquetas[x].quant_FINAL2 = qtd;
                this.etiquetas[x].id_lin = adi.id_LIN;

              }
            } else {
              var valor = adi.valor1;
              if (valor == null) valor = "0";
              if (total != 0) {
                valor = (total - adi.valor1.replace(",", "."))
              }
              if (valor.replace(",", ".") >= 0) {

                var valor1 = this.etiquetas[x].qtdconvers - valor.replace(",", ".");
                var valor2 = valor.replace(",", ".") - this.etiquetas[x].qtdconvers;
                var consumir = this.etiquetas[x].qtdconvers - valor.replace(",", ".");
                consumir = Math.max(0, consumir);
                if (consumir == 0) {
                  consumir = this.etiquetas[x].qtdconvers;
                } else {
                  consumir = valor.replace(",", ".");
                }
                var qtd = Math.max(0, valor1);
                valor2 = Math.max(0, valor2);
                this.tempQTD.push({ ref: this.etiquetas[x].PROREF, qtdetiq: qtd, qtd_falta: valor2 });
                if (consumir == 0) { adi.cor = "yellow" } else if (valor2 > 0) { adi.cor = "red" } else { adi.cor = "green" }
                this.etiquetas[x].consumir = consumir;
                this.etiquetas[x].quant_FINAL = qtd * conver;
                this.etiquetas[x].quant_FINAL2 = qtd;
                this.etiquetas[x].id_lin = adi.id_LIN;

              }
            }
          }
        }
      }


      if (this.etiquetas[x].id_lin != null) {
<<<<<<< HEAD
        this.inseriretiquetas(this.etiquetas[x], data, null);
=======
        this.inseriretiquetas(this.etiquetas[x], data);
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
      }

      this.simular(this.closedialogetiq);
      //console.log(tempQTD);
      //console.log(this.etiquetas);
    }, error => { console.log(error); });

  }

<<<<<<< HEAD
  inseriretiquetas(etiqueta, data, aditivo, carrega = false, falta = 1, valor1 = 0, factor_conversao = 0, event = null, count = 0, x = "0") {
=======
  inseriretiquetas(etiqueta, data, carrega = false, falta = 1, valor1 = 0, factor_conversao = 0, event = null, count = 0, x = "0") {
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    var ETI = new AB_MOV_MANUTENCAO_ETIQ;
    ETI.id_MANUTENCAO_LIN = etiqueta.id_lin;
    ETI.consumir = etiqueta.consumir;
    ETI.empcod = etiqueta.EMPCOD;
    ETI.etqnum = etiqueta.numero;
    ETI.etqnumenr = etiqueta.etqnumenr;
    ETI.etqorilot1 = etiqueta.ETQORILOT1;
    ETI.indref = etiqueta.INDREF;
    ETI.liecod = etiqueta.LIECOD;
    ETI.lotnumenr = etiqueta.LOTNUMENR;
    ETI.proref = etiqueta.PROREF;
    ETI.prodes = etiqueta.PRODES;
    ETI.datcre = etiqueta.DATCRE;
    ETI.quant_FINAL = etiqueta.quant_FINAL;
    ETI.quant = etiqueta.qtd.replace(",", ".");
    ETI.unicod = etiqueta.UNICOD;
    ETI.va1REF = etiqueta.VA1REF;
    ETI.va2REF = etiqueta.VA2REF;
    ETI.indnumenr = etiqueta.indnumenr;
    ETI.unisto = etiqueta.UNISTO;
    ETI.utz_CRIA = this.user;
    ETI.data_CRIA = data;
    ETI.etqnumenr = etiqueta.ETQNUMENR;
    ETI.etqoriqte1 = parseFloat(etiqueta.ETQORIQTE1);

<<<<<<< HEAD
    var adi = null;
    if (aditivo == null) {
      adi = this.arrayForm.find(item => item.pos == this.posmovacab).aditivos.find(item => item.cod_REF == etiqueta.PROREF);
    } else {
      adi = this.arrayForm.find(item => item.pos == this.posmovacab).aditivos.find(item => item.cod_REF == aditivo.cod_REF);
    }

    var unidade1temp = null;
    if (adi.unidade1 != null) unidade1temp = this.medidas.find(item => item.value == adi.unidade1).label;
    ETI.unidade_CONSUMO = unidade1temp;
    ETI.factor_CONVERSAO = adi.factor_CONVERSAO;

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    this.ABMOVMANUTENCAOETIQService.create(ETI).subscribe(
      res => {
        if (falta == 0 && carrega) {
          this.carregaetiquetas(etiqueta.id_lin, valor1, factor_conversao, event);
          this.cisternadisabled = false;
        } else {
          if (carrega && count == (parseInt(x) + 1)) {
            this.carregaetiquetas(etiqueta.id_lin, valor1, factor_conversao, event);
            this.cisternadisabled = false;
          }
        }
        var data = [{ etiqueta: ETI.etqnum, qtd: ETI.quant_FINAL }]
        this.ABMOVMANUTENCAOETIQService.ATUALIZAQUANT(data).subscribe(() => { }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  //verifica se existem aditivos cisterna
  verificacisterna(pos) {
    this.tempQTD2 = [];
    for (var x in this.arrayForm.find(item => item.pos == pos).aditivos) {
      if (this.arrayForm.find(item => item.pos == pos).aditivos[x].cisterna) {
        var id_manu = this.arrayForm.find(item => item.pos == pos).id;
        var ref = this.arrayForm.find(item => item.pos == pos).aditivos[x].cod_REF;
        var v1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1
        var valor1 = (v1 != null) ? v1.replace(",", ".") : 0;
        var etiq = [];
        var factor_conversao = this.arrayForm.find(item => item.pos == pos).aditivos[x].factor_CONVERSAO;
        var id_lin = this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN;
        var adi = this.arrayForm.find(item => item.pos == pos).aditivos[x];
        var prorefsubstituta = this.arrayForm.find(item => item.pos == pos).aditivos[x].cod_REF_SUBSTITUTA;
        if (factor_conversao == null || factor_conversao == 0) { factor_conversao = 1; }

        this.verificacisterna2(id_lin, ref, etiq, valor1, factor_conversao, id_lin, adi, prorefsubstituta);
      }
    }
  }

  verificacisterna2(id_manu, ref, etiq, valor1, factor_conversao, id_lin, adi, prorefsubstituta) {
    this.ABMOVMANUTENCAOETIQService.getbyRef2(id_manu).subscribe(response => {
      var count = Object.keys(response).length;
      var encontrou = false;
      var total = 0;
      if (count > 0) {
        for (var z in response) {
          /*if (response[z][0].etqnum == etique) {
            encontrou = true;
          }*/
          etiq.push(response[z][0].etqnum);
          if (!this.tempQTD2.find(item => item.ref == response[z][0].proref)) {
            total = response[z][1];
            this.tempQTD2.push({ ref: response[z][0].proref, qtdetiq: 0, qtd_falta: response[z][1] });
          }
        }
        if (true) {
          this.adicionaetiqueta(id_manu, ref, etiq, valor1, total, factor_conversao, id_lin, adi, true, prorefsubstituta);
        }
      } else {
        this.adicionaetiqueta(id_manu, ref, etiq, valor1, total, factor_conversao, id_lin, adi, true, prorefsubstituta);
      }
    }, error => {
      console.log(error);
    });
  }

  adicionaetiqueta(id_manu, ref, etiq, valor1, total, factor_conversao, id_lin, adi, cisterna, prorefsubstituta, carrega = false, event = null) {
    // console.log(ref);
    if (total < valor1) {
      this.ABMOVMANUTENCAOLINHAService.getDadosEtiquetabyREF(ref, cisterna, prorefsubstituta).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            var consumir;
            var value = "0";
            var quant_FINAL;
            var quant_FINAL2;
            var falta = valor1 - total;
            for (var x in response) {
              if (falta > 0) {
                if (etiq.indexOf(response[x].ETQNUM) == -1) {
                  etiq.push(response[x].ETQNUM);
                  //console.log(response[x]);
                  if (response[x].ETQEMBQTE != null) value = parseFloat(response[x].ETQEMBQTE).toFixed(3);
                  var qtd = parseFloat(value) / factor_conversao;
                  var numm = falta;
                  consumir = qtd - numm;
                  falta = numm - qtd;
                  consumir = Math.max(0, consumir);
                  falta = Math.max(0, falta);
                  if (consumir == 0) {
                    consumir = qtd;
                  } else {
                    consumir = numm;
                  }

                  var qtd_f = Math.max(0, qtd - numm);
                  quant_FINAL = (qtd_f * factor_conversao).toFixed(3);
                  quant_FINAL2 = (qtd_f * 1).toFixed(4);

                  /*console.log(qtd);
                  console.log(value);
                  console.log(quant_FINAL);
                  console.log(consumir.toFixed(3));
                  console.log(falta);*/
                  var etiqueta = [{
                    id_lin: id_lin,
                    consumir: consumir.toFixed(3),
                    EMPCOD: response[x].EMPCOD,
                    numero: response[x].ETQNUM,
                    etqnumenr: response[x].ETQNUMENR,
                    ETQORILOT1: response[x].ETQORILOT1,
                    INDREF: response[x].INDREF,
                    LIECOD: response[x].LIECOD,
                    LOTNUMENR: response[x].LOTNUMENR,
                    PROREF: response[x].PROREF,
                    PRODES: response[x].PRODES1,
                    DATCRE: response[x].DATCRE,
                    quant_FINAL: quant_FINAL,
                    quant_FINAL2: quant_FINAL2,
                    qtd: value.replace(".", ","),
                    UNICOD: response[x].UNICOD,
                    VA1REF: response[x].VA1REF,
                    VA2REF: response[x].VA2REF,
                    indnumenr: response[x].INDNUMENR,
                    UNISTO: response[x].UNISTO,
                    ETQNUMENR: response[x].ETQNUMENR,
                    ETQORIQTE1: response[x].ETQORIQTE1,
                  }];

<<<<<<< HEAD
                  this.inseriretiquetas(etiqueta[0], new Date(), adi, carrega, falta, valor1, factor_conversao, event, count, x);
=======
                  this.inseriretiquetas(etiqueta[0], new Date(), carrega, falta, valor1, factor_conversao, event, count, x);
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
                  if (adi.cor == "yellow") { } else if (falta > 0) { adi.cor = "red" } else if (falta == 0) { adi.cor = "green" }
                } else {
                  if (carrega && count == (parseInt(x) + 1)) {
                    this.cisternadisabled = false;
                    this.carregaetiquetas(id_lin, valor1, factor_conversao, event);
                  }
                }
              } else {
                //if(carrega && count == (parseInt(x)+1)) this.carregaetiquetas(id_lin, valor1, factor_conversao, event);
              }
            }

          } else {
            if (carrega) {
              this.carregaetiquetas(id_lin, valor1, factor_conversao, event);
              this.cisternadisabled = false;
            }
          }
        }, error => {
          console.log(error);
        })
    } else {
      if (carrega) {
        this.carregaetiquetas(id_lin, valor1, factor_conversao, event);
        this.cisternadisabled = false;
      }
    }
  }

  /********************ETIQUETAS INDIVIDUAL POR ADITIVO******************* */
  verEtiquetas(id, ref, nome, unidade, valor, factor_CONVERSAO, pos, event, cisterna, preparado, prorefsubstituta, nomesubstituta) {
    this.tempgravar = false;
    var factor_conversao = factor_CONVERSAO;
    this.tempcisterna = cisterna;
    if (factor_conversao == null || factor_conversao == 0) { factor_conversao = 1; }
    this.factor_conversao = factor_conversao;
    this.cod_ref = ref;

    this.cod_ref_subs = prorefsubstituta;
    this.adit_design_subst = nomesubstituta;

    this.adit_design = nome;
    this.valor1temp = (valor != null && valor != "") ? valor.replace(",", ".") : "";
    this.unidade1temp = "--";
    this.tempconsumiraditivo = (valor != null && valor != "") ? valor.replace(",", ".") : "0";
    this.posmovacab = pos;
    this.tempidlin = id;
    if (unidade != null) this.unidade1temp = this.medidas.find(item => item.value == unidade).label;
    this.etiquetasaditivo = [];

    if (cisterna && !preparado && !this.disaddetiquetas && !this.cisternadisabled) {
      this.tempQTD2 = [];
      var id_manu = this.arrayForm.find(item => item.pos == pos).id;
      var adi = this.arrayForm.find(item => item.pos == pos).aditivos.find(item => item.id_LIN == id);
      this.cisternadisabled = true;
      this.ABMOVMANUTENCAOETIQService.getbyRef2(id).subscribe(response => {
        var count = Object.keys(response).length;
        var encontrou = false;
        var total = 0;

        var etiq = [];
        if (count > 0) {
          for (var z in response) {
            etiq.push(response[z][0].etqnum);
            if (!this.tempQTD2.find(item => item.ref == response[z][0].proref)) {
              total = response[z][1];
              this.tempQTD2.push({ ref: response[z][0].proref, qtdetiq: 0, qtd_falta: response[z][1] });
            }
          }
          if (true) {
            this.adicionaetiqueta(id_manu, ref, etiq, this.valor1temp.replace(",", "."), total, factor_conversao, id, adi, true, prorefsubstituta, true, event);
          }
        } else {
          this.adicionaetiqueta(id_manu, ref, etiq, this.valor1temp.replace(",", "."), total, factor_conversao, id, adi, true, prorefsubstituta, true, event);
        }
      }, error => {
        console.log(error);
      });
    } else {
      //this.cisternadisabled = false;
      if (!this.cisternadisabled) { this.carregaetiquetas(id, valor, factor_CONVERSAO, event); }
    }

  }
  carregaetiquetas(id, valor, factor_CONVERSAO, event) {
    this.ABMOVMANUTENCAOETIQService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          if (valor == null) valor = "0";
          var numm = valor.replace(",", ".");

          for (var x in response) {
            var conver = factor_CONVERSAO;
            if (factor_CONVERSAO == null || factor_CONVERSAO == 0) conver = 1;


            numm = (numm - response[x].consumir).toFixed(3);

            var consumir = (response[x].consumir != null) ? response[x].consumir.toFixed(3).replace(".", ",") : "0,000";
            var quant_FINAL = (response[x].quant_FINAL != null) ? response[x].quant_FINAL.toFixed(3).replace(".", ",") : "0,000";
            var quant = (response[x].quant != null) ? response[x].quant.toFixed(3).replace(".", ",") : "0,000";

            var qtdconvers = parseFloat(quant.replace(",", ".")) / conver;
            //var qtd2 = (qtdconvers - parseFloat(consumir.replace(",", ".")));
            var qtd2 = (parseFloat(quant_FINAL.replace(",", ".")) / conver);
            var quant_FINAL2 = (Math.max(0, qtd2)).toFixed(4).replace(".", ",");

            this.etiquetasaditivo.push({
              id: response[x].id_MOV_MANU_ETIQUETA, numero: response[x].etqnum, produto: "", qtd: quant, consumir: consumir, quant_FINAL: quant_FINAL, quant_FINAL2: quant_FINAL2,
              EMPCOD: response[x].empcod, ETQORIQTE1: response[x].etqoriqte1, ETQORILOT1: response[x].etqorilot1, LIECOD: response[x].liecod, LOTNUMENR: response[x].lotnumenr, PROREF: response[x].proref, PRODES: response[x].prodes, DATCRE: response[x].datcre,
              UNICOD: response[x].unicod, UNISTO: response[x].unisto, VA1REF: response[x].va1REF, VA2REF: response[x].va2REF, indnumenr: response[x].indnumenr, id_lin: response[x].id_MANUTENCAO_LIN, ETQNUMENR: response[x].etqnumenr, INDREF: response[x].indref,
              qtdconvers: qtdconvers.toFixed(3).replace(".", ",")
            });
          }
          this.tempconsumiraditivo = numm.replace(".", ",")

        }

        this.etiquetasaditivo.push({
          id: "id" + this.idtempetiquetasaditivo, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
          LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: this.tempidlin, ETQNUMENR: "", INDREF: "", qtdconvers: ""
        });

        let elem3 = document.getElementById("mainpagecontent");
        let h = elem3.getBoundingClientRect().height;

        document.getElementById("myModaletiquetas2").style.height = Math.abs(h + 300) + 'px';

        let elm2 = document.getElementById("myModaletiquetascontent2");
        let coords = document.getElementById("toptexttop").offsetTop;
        elm2.style.top = Math.abs(coords - 10) + 'px';

        elm2.style.bottom = 'none';

        this.simular(this.dialogetiq2);
        setTimeout(() => {
          this.inputfocus2("id" + this.idtempetiquetasaditivo);
        }, 300);
      }, error => { console.log(error); });
  }

  addlinhaetiqiadiv(id, campo, ETQNUMENR) {
    if (campo != "" && (ETQNUMENR == "" || ETQNUMENR == null)) {
      if (!this.tempcisterna) {
        this.adicionadadosaditiovs(id, campo);
      } else {
        this.mensagem_aviso = "Não é possível adicionar Etiqueta ao um aditivo Cisterna!";
        this.mensagem_aviso2 = "";
        let elm2 = document.getElementById("dialogAvisoContent");
        let elem3 = document.getElementById("mainpagecontent");
        let h = elem3.getBoundingClientRect().height;

        document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
        let coords = document.getElementById("toptexttop").offsetTop;
        elm2.style.top = Math.abs(coords - 10) + 'px';

        elm2.style.bottom = 'none';

        this.simular(this.dialogAviso);
      }
    } else {
      if (this.etiquetasaditivo[this.etiquetasaditivo.length - 1].numero != "") {
        this.idtempetiquetasaditivo++;
        this.etiquetasaditivo.push({
          id: "id" + this.idtempetiquetasaditivo, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
          LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: this.tempidlin, ETQNUMENR: "", INDREF: "", qtdconvers: ""
        });
        setTimeout(() => {
          this.inputfocus2("id" + this.idtempetiquetasaditivo);
        }, 30);
      }
    }
  }

  inputfocus2(id) {
    let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('#tabelaetiquetas2>tbody>tr>td #' + id + '')[0];
    inputField && inputField.focus();
  }

  apagaretiquetaaditivo(id) {
    var index1 = this.etiquetasaditivo.findIndex(item => item.id === id);
    if (id.toString().substring(0, 2) != "id") {
      this.ABMOVMANUTENCAOETIQService.getbyid(id).subscribe(resdelete => {
        this.ABMOVMANUTENCAOETIQService.delete(id).then(() => {
          var qtd = Math.max(0, resdelete[0].quant - resdelete[0].quant_FINAL);
          var data = [{ etiqueta: resdelete[0].etqnum, qtd: qtd }]
          this.ABMOVMANUTENCAOETIQService.ATUALIZAQUANTAPAGAR(data).subscribe(() => { }, error => {
            console.log(error);
          });

          this.etiquetasaditivo.splice(index1, 1);
          this.calculaFalta();
          this.verificaetiquetaaditivo();
        },
          error => { console.log(error); /*this.simular(this.inputerro);*/ });
      },
        error => { console.log(error); /*this.simular(this.inputerro);*/ });
    } else {
      this.etiquetasaditivo.splice(index1, 1);
      this.calculaFalta();
      this.verificaetiquetaaditivo();
    }

    if (this.etiquetasaditivo.length == 0) {
      this.idtempetiquetasaditivo++;
      this.etiquetasaditivo.push({
        id: "id" + this.idtempetiquetasaditivo, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
        LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: this.tempidlin, ETQNUMENR: "", INDREF: "", qtdconvers: ""
      });
      setTimeout(() => {
        this.inputfocus2("id" + this.idtempetiquetasaditivo);
      }, 30);
    }
    this.calculaFalta();
  }

  adicionadadosaditiovs(id, campo) {
    var etiquetan = "0000000000" + campo;
    var count = 0;
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero == etiquetan.substring(etiquetan.length - 10) && this.etiquetasaditivo[y].ETQNUMENR != "") {
        count++;
      }
    }

    if (count < 1) {
      if (this.etiquetasaditivo[this.etiquetasaditivo.length - 1].numero != "") {
        this.idtempetiquetasaditivo++;
        this.etiquetasaditivo.push({
          id: "id" + this.idtempetiquetasaditivo, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
          LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: this.tempidlin, ETQNUMENR: "", INDREF: "", qtdconvers: ""
        });
        setTimeout(() => {
          this.inputfocus2("id" + this.idtempetiquetasaditivo);
        }, 30);
      }
      this.ABMOVMANUTENCAOLINHAService.getDadosEtiqueta(etiquetan.substring(etiquetan.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            if (this.cod_ref == response[0].PROREF && response[0].ETQEMBQTE > 0) {

              var etiqueta = this.etiquetasaditivo.find(item => item.id == id);
              etiqueta.numero = etiquetan.substring(etiquetan.length - 10);
              etiqueta.produto = response[0].PRODES1;
              var value = "0";
              if (response[0].ETQEMBQTE != null) value = parseFloat(response[0].ETQEMBQTE).toFixed(3);
              var qtd = parseFloat(value) / this.factor_conversao;
              etiqueta.qtdconvers = qtd.toFixed(3).replace(".", ",");
              etiqueta.qtd = value.replace(".", ",");
              etiqueta.EMPCOD = response[0].EMPCOD;
              etiqueta.ETQORILOT1 = response[0].ETQORILOT1;
              etiqueta.LIECOD = response[0].LIECOD;
              etiqueta.LOTNUMENR = response[0].LOTNUMENR;
              etiqueta.PROREF = response[0].PROREF;
              etiqueta.PRODES = response[0].PRODES1;
              etiqueta.DATCRE = response[0].DATCRE;
              etiqueta.UNICOD = response[0].UNICOD;
              etiqueta.UNISTO = response[0].UNISTO;
              etiqueta.VA1REF = response[0].VA1REF;
              etiqueta.VA2REF = response[0].VA2REF;
              etiqueta.indnumenr = response[0].INDNUMENR;
              etiqueta.INDREF = response[0].INDREF;
              etiqueta.ETQNUMENR = response[0].ETQNUMENR;
              etiqueta.ETQORIQTE1 = response[0].ETQORIQTE1;
              var numm = this.tempconsumiraditivo.replace(",", ".")

              var consumir = qtd - numm;
              var falta = numm - qtd;
              consumir = Math.max(0, consumir);
              falta = Math.max(0, falta);
              if (consumir == 0) {
                consumir = qtd;
              } else {
                consumir = numm;
              }
              var cons = consumir.toString();
              etiqueta.consumir = parseFloat(cons).toFixed(3).replace(".", ",");
              var qtd_f = Math.max(0, qtd - numm);
              etiqueta.quant_FINAL = (qtd_f * this.factor_conversao).toFixed(3).replace(".", ",");
              etiqueta.quant_FINAL2 = (qtd_f * 1).toFixed(4).replace(".", ",");
              //etiqueta.qtdconvers = 0;
              this.tempconsumiraditivo = falta.toFixed(3).replace(".", ",");
            } else {
              this.mensagem_aviso = "Etiqueta não pertence a este aditivo ou é negativa!";
              this.mensagem_aviso2 = "";
              let elm2 = document.getElementById("dialogAvisoContent");
              let elem3 = document.getElementById("mainpagecontent");
              let h = elem3.getBoundingClientRect().height;

              document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
              let coords = document.getElementById("toptexttop").offsetTop;
              elm2.style.top = Math.abs(coords - 10) + 'px';

              elm2.style.bottom = 'none';
              this.simular(this.dialogAviso);
            }

          } else {
            this.mensagem_aviso = "Etiqueta nº " + etiquetan.substring(etiquetan.length - 10) + " não existe!";
            this.mensagem_aviso2 = "";
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';
            this.simular(this.dialogAviso);
          }
        }, error => { console.log(error); });
    } else {
      this.mensagem_aviso = "Etiqueta já foi adicionada!";
      this.mensagem_aviso2 = "";
      let elm2 = document.getElementById("dialogAvisoContent");
      let elem3 = document.getElementById("mainpagecontent");
      let h = elem3.getBoundingClientRect().height;

      document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
      let coords = document.getElementById("toptexttop").offsetTop;
      elm2.style.top = Math.abs(coords - 10) + 'px';

      elm2.style.bottom = 'none';
      this.simular(this.dialogAviso);
    }
  }

  guardaretiquetasaditivos() {
    this.tempecontrou = false;
    var count = 0;
    var encontrou = false;
    if (!this.tempgravar) {
      this.tempgravar = true;
      for (var y in this.etiquetasaditivo) {
        //&& this.etiquetasaditivo[y].ETQNUMENR != ""
        if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "" && this.etiquetasaditivo[y].ETQNUMENR == "") {
          count++;
          encontrou = true;
          this.verificaetiquetaaogravar(this.etiquetasaditivo[y].id, this.etiquetasaditivo[y].numero, count);
        }
      }
      if (!encontrou) {
        this.gravaeti();
      }
    }

  }

  verificaetiquetaaogravar(id, campo, num) {
    var count = 0;
    var count2 = 0;
    var etiquetan = "0000000000" + campo;
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero == etiquetan.substring(etiquetan.length - 10) && this.etiquetasaditivo[y].ETQNUMENR != "") {
        count++;
      }
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "" && this.etiquetasaditivo[y].ETQNUMENR == "") {
        count2++;
      }
    }

    if (count < 1) {
      this.ABMOVMANUTENCAOLINHAService.getDadosEtiqueta(etiquetan.substring(etiquetan.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            if (this.cod_ref == response[0].PROREF && response[0].ETQEMBQTE > 0) {

              var etiqueta = this.etiquetasaditivo.find(item => item.id == id);
              etiqueta.numero = etiquetan.substring(etiquetan.length - 10);
              etiqueta.produto = response[0].PRODES1;
              var value = "0";
              if (response[0].ETQEMBQTE != null) value = parseFloat(response[0].ETQEMBQTE).toFixed(3);
              var qtd = parseFloat(value) / this.factor_conversao;
              etiqueta.qtdconvers = qtd.toFixed(3).replace(".", ",");
              etiqueta.qtd = value.replace(".", ",");
              etiqueta.EMPCOD = response[0].EMPCOD;
              etiqueta.ETQORILOT1 = response[0].ETQORILOT1;
              etiqueta.LIECOD = response[0].LIECOD;
              etiqueta.LOTNUMENR = response[0].LOTNUMENR;
              etiqueta.PROREF = response[0].PROREF;
              etiqueta.PRODES = response[0].PRODES1;
              etiqueta.DATCRE = response[0].DATCRE;
              etiqueta.UNICOD = response[0].UNICOD;
              etiqueta.UNISTO = response[0].UNISTO;
              etiqueta.VA1REF = response[0].VA1REF;
              etiqueta.VA2REF = response[0].VA2REF;
              etiqueta.indnumenr = response[0].INDNUMENR;
              etiqueta.INDREF = response[0].INDREF;
              etiqueta.ETQNUMENR = response[0].ETQNUMENR;
              etiqueta.ETQORIQTE1 = response[0].ETQORIQTE1;

              var numm = this.tempconsumiraditivo.replace(",", ".");
              var consumir;
              var falta;
              numm = Math.max(0, numm);
              if (etiqueta.consumir == null || etiqueta.consumir == "") {
                falta = numm - qtd;
                consumir = qtd - numm;
                consumir = Math.max(0, consumir);
                falta = Math.max(0, falta);
                if (consumir == 0) {
                  consumir = qtd;
                } else {
                  consumir = numm;
                }
              } else {
                consumir = etiqueta.consumir.replace(",", ".") * 1;
                falta = parseFloat(this.tempconsumiraditivo.replace(",", "."));
                numm = consumir;
              }
              var cons = consumir.toString();
              etiqueta.consumir = parseFloat(cons).toFixed(3).replace(".", ",");
              var qtd_f = Math.max(0, qtd - numm);
              etiqueta.quant_FINAL = (qtd_f * this.factor_conversao).toFixed(3).replace(".", ",");
              etiqueta.quant_FINAL2 = (qtd_f * 1).toFixed(4).replace(".", ",");
              //etiqueta.qtdconvers = 0;
              this.tempconsumiraditivo = falta.toFixed(3).replace(".", ",");
            } else {
              this.mensagem_aviso = "Etiqueta não pertence a este aditivo ou é negativa!";
              this.mensagem_aviso2 = "";
              let elm2 = document.getElementById("dialogAvisoContent");
              let elem3 = document.getElementById("mainpagecontent");
              let h = elem3.getBoundingClientRect().height;

              document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
              let coords = document.getElementById("toptexttop").offsetTop;
              elm2.style.top = Math.abs(coords - 10) + 'px';

              elm2.style.bottom = 'none';
              this.simular(this.dialogAviso);
              this.tempecontrou = true;
              this.tempgravar = false;
            }

          } else {
            this.mensagem_aviso = "Etiqueta nº " + etiquetan.substring(etiquetan.length - 10) + " não existe!";
            this.mensagem_aviso2 = "";
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';
            this.simular(this.dialogAviso);
            this.tempecontrou = true;
            this.tempgravar = false;
          }

          if (num == count2 && !this.tempecontrou) this.gravaeti();
        }, error => { console.log(error); });
    } else {
      this.mensagem_aviso = "Etiqueta nº " + etiquetan.substring(etiquetan.length - 10) + " já foi adicionada!";
      this.mensagem_aviso2 = "";
      let elm2 = document.getElementById("dialogAvisoContent");
      let elem3 = document.getElementById("mainpagecontent");
      let h = elem3.getBoundingClientRect().height;

      document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
      let coords = document.getElementById("toptexttop").offsetTop;
      elm2.style.top = Math.abs(coords - 10) + 'px';

      elm2.style.bottom = 'none';
      this.simular(this.dialogAviso);
      this.tempecontrou = true;
      this.tempgravar = false;
    }
  }


  gravaeti() {
    for (var y in this.etiquetasaditivo) {
      //&& this.etiquetasaditivo[y].ETQNUMENR != ""
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "") {
        this.etiquetasaditivo[y].quant_FINAL = this.etiquetasaditivo[y].quant_FINAL.replace(",", ".");
        this.etiquetasaditivo[y].consumir = this.etiquetasaditivo[y].consumir.replace(",", ".");
        //console.log(this.etiquetasaditivo[y])
        if (this.etiquetasaditivo[y].id.toString().substring(0, 2) == "id") {
<<<<<<< HEAD
          this.inseriretiquetas(this.etiquetasaditivo[y], new Date(), null);
=======
          this.inseriretiquetas(this.etiquetasaditivo[y], new Date());
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        } else {
          this.atualizaetiquetas(this.etiquetasaditivo[y]);
        }
      }
    }
    this.verificaetiquetaaditivo();
    this.simular(this.closedialogetiq2);
    setTimeout(function () {
      this.tempgravar = false;
    }, 500);
  }

  atualizaetiquetas(etiqueta) {

    this.ABMOVMANUTENCAOETIQService.getbyid(etiqueta.id).subscribe(
      response => {
        var ETI = new AB_MOV_MANUTENCAO_ETIQ;
        ETI = response[0];
        ETI.consumir = etiqueta.consumir;
        ETI.quant_FINAL = etiqueta.quant_FINAL;
        ETI.quant = etiqueta.qtd.replace(",", ".");

        this.ABMOVMANUTENCAOETIQService.update(ETI).then(() => {
          var data = [{ etiqueta: ETI.etqnum, qtd: ETI.quant_FINAL }]
          this.ABMOVMANUTENCAOETIQService.ATUALIZAQUANT(data).subscribe(() => { }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
  }
  verificaetiquetaaditivo() {
    var adi = this.arrayForm.find(item => item.pos == this.posmovacab).aditivos.find(item => item.cod_REF == this.cod_ref);
    var encontrou = false;
    var count = 0;
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "") {
        if (this.etiquetasaditivo[y].consumir.replace(",", ".") == 0) {
          encontrou = true;
        }
        count++;
      }
    }

    if (count > 0) {
      if (this.tempconsumiraditivo.replace(",", ".") > 0 || this.tempconsumiraditivo.replace(",", ".") < 0) {
        adi.cor = "red";
      } else if (encontrou) {
        adi.cor = "yellow";
      } else if (this.tempconsumiraditivo.replace(",", ".") == 0) {
        adi.cor = "green";
      } else {
        adi.cor = "red";
      }
    } else {
      adi.cor = "red";
    }
  }

  calculaFalta(atualiza = false, id = null) {
    var total = this.valor1temp * 1;
    var encontrou = false;
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "") {
        total = total - this.etiquetasaditivo[y].consumir.replace(",", ".");
        if (atualiza && this.etiquetasaditivo[y].id == id) {
          var to_final = (this.etiquetasaditivo[y].qtdconvers.replace(",", ".") - this.etiquetasaditivo[y].consumir.replace(",", ".")) * this.factor_conversao;
          var to_final2 = (this.etiquetasaditivo[y].qtdconvers.replace(",", ".") - this.etiquetasaditivo[y].consumir.replace(",", ".")) * this.factor_conversao;
          if (to_final < 0) to_final = 0;
          this.etiquetasaditivo[y].quant_FINAL = to_final.toFixed(3).replace(".", ",");
          if (((this.etiquetasaditivo[y].qtdconvers.replace(",", ".") - this.etiquetasaditivo[y].consumir.replace(",", "."))) > 0) {
            this.etiquetasaditivo[y].quant_FINAL2 = ((this.etiquetasaditivo[y].qtdconvers.replace(",", ".") - this.etiquetasaditivo[y].consumir.replace(",", "."))).toFixed(4).replace(".", ",");
          } else {
            this.etiquetasaditivo[y].quant_FINAL2 = "0,0000"
          }
        }
      }
    }

    if (total.toFixed(3) == "-0.000") total = 0;
    this.tempconsumiraditivo = total.toFixed(3).replace(".", ",");

  }


  criarficheiro(id) {
    var data = [{ id: id, ip_posto: this.getCookie("IP_CLIENT") }];
    this.ABMOVMANUTENCAOETIQService.criaficheiro(data).subscribe(
      response => {
      }, error => { console.log(error); });
  }

  atualizaQUANT(id) {
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "") {
        if (this.etiquetasaditivo[y].id == id) {

          var maximo = this.etiquetasaditivo[y].ETQORIQTE1;
          var qtdf = 0;
          var qtdf2 = (this.etiquetasaditivo[y].quant_FINAL2).replace(",", ".");
          var consumir = (this.etiquetasaditivo[y].consumir).replace(",", ".");

          if (this.etiquetasaditivo[y].ETQORIQTE1 >= ((qtdf2 * this.factor_conversao) + parseFloat(consumir))) {
            this.etiquetasaditivo[y].quant_FINAL = (qtdf2 * this.factor_conversao).toString();
          } else {
            this.mensagem_aviso = "O máximo de quantidade da etiqueta foi ultrapassado!";
            this.mensagem_aviso2 = "";
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';

            this.simular(this.dialogAviso);
            consumir = parseFloat(consumir) * this.factor_conversao;
            this.etiquetasaditivo[y].quant_FINAL = maximo - parseFloat(consumir);
            this.etiquetasaditivo[y].quant_FINAL2 = ((maximo - parseFloat(consumir)) / this.factor_conversao).toString();
          }

        }
        // console.log(this.etiquetasaditivo[y].quant_FINAL);
      }
    }

  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\.\+\,\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

<<<<<<< HEAD
  maxNumber(event) {

    var value = event.srcElement.value;
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    return value;
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
}
