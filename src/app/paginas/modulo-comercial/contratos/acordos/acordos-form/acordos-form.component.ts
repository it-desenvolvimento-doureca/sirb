import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { COM_ACORDOS_ANEXOS } from 'app/entidades/COM_ACORDOS_ANEXOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { COMACORDOSACTIVIDADESService } from 'app/servicos/com-acordos-actividades.service';
import { COMACORDOSANEXOSService } from 'app/servicos/com-acordos-anexos.service';
import { UploadService } from 'app/servicos/upload.service';
import { webUrl } from 'assets/config/webUrl';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import * as FileSaver from 'file-saver';
import { COMACORDOSService } from 'app/servicos/com-acordos.service';
import { COMACORDOSLTAService } from 'app/servicos/com-acordos-lta.service';
import { COMACORDOSAMORTIZACOESService } from 'app/servicos/com-acordos-amortizacoes.service';
import { COMACORDOSPRECOSService } from 'app/servicos/com-acordos-precos.service';
import { COMACORDOSVOLUMESService } from 'app/servicos/com-acordos-volumes.service';
import { COM_ACORDOS } from 'app/entidades/COM_ACORDOS';
import { COM_ACORDOS_ACTIVIDADES } from 'app/entidades/COM_ACORDOS_ACTIVIDADES';
import { COM_ACORDOS_PRECOS } from 'app/entidades/COM_ACORDOS_PRECOS';
import { COM_ACORDOS_AMORTIZACOES } from 'app/entidades/COM_ACORDOS_AMORTIZACOES';
import { COM_ACORDOS_LTA } from 'app/entidades/COM_ACORDOS_LTA';
import { COMREFERENCIASService } from 'app/servicos/com-referencias.service';
import { COMACORDOSHISTORICOService } from 'app/servicos/com-acordos-historico.service';
import { COMCONTRATOSService } from 'app/servicos/com-contratos.service';
import { COM_ACORDOS_VOLUMES } from 'app/entidades/COM_ACORDOS_VOLUMES';
import { COM_ACORDOS_HISTORICO } from 'app/entidades/COM_ACORDOS_HISTORICO';
import { stringify } from 'querystring';

@Component({
  selector: 'app-acordos-form',
  templateUrl: './acordos-form.component.html',
  styleUrls: ['./acordos-form.component.css']
})
export class AcordosFormComponent implements OnInit {

  ativobt = '1';
  uploadedFiles = [];
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  apagarficheiros: any;
  modoedicao: boolean;
  srcelement: any;
  nomeficheiro: any;
  type: any;
  display: boolean;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('fileInputAnexos') fileInputAnexos: FileUpload;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('datas_invalidas') datas_invalidas: ElementRef;
  @ViewChild('sem_alteracoes') sem_alteracoes: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('existerefcontrato') existerefcontrato: ElementRef;
  campo_x: any;
  filedescricao = [];

  tabela_precos = [];
  tabela_amortizacoes = [];
  tabela_lta = [];

  tabela_historico = [];
  dados: any = [];
  dados_acordo: any;
  dialognovo: boolean;
  alerta_hora: string;
  alerta_data;
  nome_utilizador: any;
  selected_acoes: any = null;
  mensagemtabela_acoes: string;
  tabela_acoes: any[] = [];
  ID_ACORDO: number;
  VERSAO: number;
  drop_contratos = [];
  UTILIZADOR;
  DATA_CRIA;
  OBSERVACOES;
  ID_CONTRATO;
  ID_REFERENCIA;
  drop_referencias = [];
  SOP;
  EOP;
  PRECO_BASE;
  novo_atividade: boolean;
  index_actividade: any;
  HORA_CRIA: string;


  tabela_volumes: any = [];
  tabela_analises = [];
  dados_precos = "";
  dados_amortizacoes = "";
  dados_lta = "";
  dados_atividades = "";
  dados_volumes = "";
  dados_documentos = "";
  dados_old;
  disApagar: boolean;
  disCriar: boolean;
  disEditar: boolean;
  btapagar;
  bteditar;
  btvoltar;
  btfechar;
  disFechar;
  btcriar;
  drop_versoes: any[];
  versao_selected;
  edicao = false;
  NOME_UTZ_FECHO: any;
  NOME_UTZ_FECHO_AMORTIZACOES: any;
  NOME_UTZ_FECHO_LTA: any;
  DATA_FECHO;
  DATA_FECHO_AMORTIZACOES;
  DATA_FECHO_LTA;
  loading_analise: boolean = false;
  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService,
    private renderer: Renderer, private route: ActivatedRoute, private location: Location, private sanitizer: DomSanitizer,
    private COMACORDOSACTIVIDADESService: COMACORDOSACTIVIDADESService,
    private COMACORDOSANEXOSService: COMACORDOSANEXOSService,
    private COMACORDOSService: COMACORDOSService,
    private COMACORDOSLTAService: COMACORDOSLTAService,
    private COMACORDOSAMORTIZACOESService: COMACORDOSAMORTIZACOESService,
    private COMACORDOSPRECOSService: COMACORDOSPRECOSService,
    private COMACORDOSVOLUMESService: COMACORDOSVOLUMESService,
    private COMREFERENCIASService: COMREFERENCIASService,
    private COMCONTRATOSService: COMCONTRATOSService,
    private COMACORDOSHISTORICOService: COMACORDOSHISTORICOService,
    private globalVar: AppGlobals, private router: Router, private UploadService: UploadService) { }

  ngOnInit() {



    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);
    this.btapagar = true;
    this.bteditar = true;
    this.btvoltar = true;
    this.btfechar = true;


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");




    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var versao;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
          versao = params['versao'] || 0;
        });
      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852apagar");
      this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852fechar");



      this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852apagarficheiros");

    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;
        this.edicao = true;
        this.btapagar = false;
        this.btcriar = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.btapagar = false;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        this.edicao = true;
        this.bteditar = false;
        this.btfechar = false;
        this.btcriar = false;

        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();


      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
        this.btcriar = true;
      }
    }

    if (!this.novo) {
      this.carregaDados(id, versao, true);
    } else {
      this.carregaDados(id, versao, false);
    }

  }

  alteraVersao(event) {
    if (event.value != "" && event.value != this.VERSAO) {
      if (!this.edicao) {
        this.locatiosave('view', this.ID_ACORDO, event.value);
      } else {
        this.locatiosave('editar', this.ID_ACORDO, event.value);
      }
      this.inicia(this.ID_ACORDO, event.value);
    }
  }

  alteraAno(event) {
    if (event.value != "") {
      /* this.anos_EOP = [];
       this.anos_EOP.push({ label: '--', value: "" });
       for (var x = event.value; x <= 2060; x++) {
         this.anos_EOP.push({ value: x, label: x })
       }
       this.anos_EOP = this.anos_EOP.slice();*/
      if (event.value > this.EOP) this.EOP = null;
      this.atualizatabela_volumes();
    }

  }

  atualizatabela_volumes() {

    var dados = this.tabela_volumes.slice();

    if (this.SOP == "") this.SOP = null;
    if (this.EOP == "") this.EOP = null;
    var ano_SOP = (this.SOP == null) ? null : new Date(this.SOP + '-01').getFullYear();
    var ano_EOP = (this.EOP == null) ? null : new Date(this.EOP + '-01').getFullYear();

    if (ano_SOP <= ano_EOP) {
      this.tabela_volumes = [];
      for (var x = ano_SOP; x <= ano_EOP; x++) {
        var arr = dados.find(item => item.ano == x);
        var valor = null;
        if (arr) valor = arr.valor
        this.tabela_volumes.push({ ano: x, valor });
      }
      this.carregatabela_analises();
    }

  }

  carregaDados(id, versao, inicia) {
    this.carregar_contratos(id, versao, inicia);
  }
  carregar_contratos(id, versao, inicia) {
    this.drop_contratos = [];
    this.drop_contratos.push({ label: 'Sel. Contrato', value: "" });
    this.COMCONTRATOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {

          this.drop_contratos.push({
            value: response[x].ID,
            label: response[x].N_CONTRATO
          });

        }
        this.drop_contratos = this.drop_contratos.slice();
        this.carregar_versoes(id, versao, inicia);
      },
      error => {
        this.carregar_versoes(id, versao, inicia);
        console.log(error);
      });
  }

  carregar_referencias(id, versao, inicia) {
    this.drop_referencias = [];
    this.drop_referencias.push({ label: 'Sel. Referência', value: "" });
    this.COMREFERENCIASService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {

          this.drop_referencias.push({
            value: response[x].ID,
            label: response[x].COD_REFERENCIA + ' - ' + response[x].DESCRICAO
          });

        }
        this.drop_referencias = this.drop_referencias.slice();
        if (inicia) this.inicia(id, versao);
      },
      error => {
        if (inicia) this.inicia(id, versao);
        console.log(error);
      });

  }

  carregar_versoes(id, versao, inicia) {
    this.drop_versoes = [];
    if (inicia) {
      this.COMACORDOSService.getversoes(id, versao).subscribe(
        response => {
          var count = Object.keys(response).length;

          for (var x in response) {

            this.drop_versoes.push({
              value: response[x][1],
              label: response[x][1]
            });

          }
          this.drop_versoes = this.drop_versoes.slice();
          this.carregar_referencias(id, versao, inicia);
        },
        error => {
          this.carregar_referencias(id, versao, inicia);
          console.log(error);
        });
    } else {
      this.carregar_referencias(id, versao, inicia);
    }
  }

  inicia(id, versao) {
    this.COMACORDOSService.getbyid2(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) { }
        this.dados_acordo = response[0][0];
        this.ID_ACORDO = response[0][0].ID;
        this.VERSAO = response[0][0].VERSAO;
        this.UTILIZADOR = response[0][1];
        this.DATA_CRIA = this.formatDate(response[0][0].DATA_CRIA);
        this.HORA_CRIA = new Date(response[0][0].DATA_CRIA).toLocaleTimeString().slice(0, 5);
        this.OBSERVACOES = response[0][0].OBSERVACOES;
        this.ID_CONTRATO = response[0][0].ID_CONTRATO;
        this.ID_REFERENCIA = response[0][0].ID_REFERENCIA;
        this.SOP = (response[0][0].SOP == null) ? null : this.formatDateMES(response[0][0].SOP);
        this.EOP = (response[0][0].EOP == null) ? null : this.formatDateMES(response[0][0].EOP);
        this.PRECO_BASE = response[0][0].PRECO_BASE;
        this.versao_selected = response[0][0].VERSAO;
        this.dados_old = { OBSERVACOES: this.OBSERVACOES, ID_CONTRATO: this.ID_CONTRATO, ID_REFERENCIA: this.ID_REFERENCIA, SOP: this.SOP, EOP: this.EOP, PRECO_BASE: this.PRECO_BASE };

        this.NOME_UTZ_FECHO_LTA = response[0][3];
        this.NOME_UTZ_FECHO_AMORTIZACOES = response[0][4];
        this.NOME_UTZ_FECHO = response[0][5];

        this.DATA_FECHO = (response[0][0].DATA_FECHO == null) ? null : new Date(response[0][0].DATA_FECHO);
        this.DATA_FECHO_AMORTIZACOES = (response[0][0].DATA_FECHO_AMORTIZACOES == null) ? null : new Date(response[0][0].DATA_FECHO_AMORTIZACOES);
        this.DATA_FECHO_LTA = (response[0][0].DATA_FECHO_LTA == null) ? null : new Date(response[0][0].DATA_FECHO_LTA);

        var estado = response[0][0].ESTADO;
        if (response[0][0].VERSAO != response[0][2] || estado == 'A' || estado == 'F') {
          this.modoedicao = false;
          this.btapagar = false;
          this.bteditar = false;
          this.btfechar = false;
        } else {
          this.modoedicao = this.edicao;
          this.btapagar = true;
          this.bteditar = true;
          this.btfechar = true;
        }
        this.carregatabelaFiles(id, versao);
        this.carregatabela_precos(id, versao);
        this.carregatabela_amortizacoes(id, versao);
        this.carregatabela_lta(id, versao);
        this.carregatabela_actividades(id, versao);
        this.carregatabela_historico(id, versao);
        this.carregatabela_volumes(id, versao);
      });



  }

  carregatabela_volumes(id, versao) {
    this.tabela_volumes = [];
    this.COMACORDOSVOLUMESService.getbyid(id, versao).subscribe(
      response => {
        this.tabela_volumes = [];
        var count = Object.keys(response).length;
        if (count == 0) {

        }
        for (var x in response) {
          this.tabela_volumes.push({ ano: response[x].ANO, valor: response[x].VALOR });
        }

        this.tabela_volumes = this.tabela_volumes.slice()
        this.dados_volumes = JSON.stringify(this.tabela_volumes.slice());
        this.carregatabela_analises();
      });
  }

  carregatabela_analises() {
    this.tabela_analises = [];

    var anos = []
    for (var x in this.tabela_volumes) {
      anos.push({ ano: this.tabela_volumes[x].ano, valor: null });
    }
    this.tabela_analises = this.carregatabela_analises2(anos);


    for (var t in this.tabela_amortizacoes) {
      var ano = null;
      ano = (this.tabela_amortizacoes[t].DATA_INICIO == null) ? null : new Date(this.tabela_amortizacoes[t].DATA_INICIO).getFullYear();

      var amortizacoes_qtd = this.tabela_analises[3];
      var amortizacoes_qtd2 = amortizacoes_qtd.valores.find(item => item.ano == ano);
      if (amortizacoes_qtd2) {
        if (amortizacoes_qtd2.valor == null) amortizacoes_qtd2.valor = 0;
        amortizacoes_qtd2.valor += this.tabela_amortizacoes[t].QUANTIDADE;
      }

      /* var amortizacoes_valor = this.tabela_analises[5];
       var amortizacoes_valor2 = amortizacoes_valor.valores.find(item => item.ano == ano);
       if (amortizacoes_valor2) {
         if (amortizacoes_valor2.valor == null) amortizacoes_valor2.valor = 0;
         amortizacoes_valor2.valor += this.tabela_amortizacoes[t].VALOR;
       }*/
    }
    var contrato = this.drop_contratos.find(item => item.value == this.ID_CONTRATO);
    var dados = [{
      DATA_INICIO: (this.SOP == null) ? null : this.formatDate(new Date(this.SOP + '-01')),
      DATA_FIM: (this.EOP == null) ? null : this.formatDate(new Date(this.EOP + '-01')),
      CONTRATO: (contrato) ? contrato.label : null,
      ID_REFERENCIA: this.ID_REFERENCIA
    }];
    this.loading_analise = true;
    this.COMACORDOSService.COM_ACORDOS_ANALISE(dados).subscribe(
      (res) => {

        for (var y in res) {
          if (res[y][0] == 'ENCOMENDAS') {

            var arr_Encomendado = this.tabela_analises[1];
            var arr_Encomendado2 = arr_Encomendado.valores.find(item => item.ano == res[y][1]);
            if (arr_Encomendado2) arr_Encomendado2.valor = res[y][9];

          } else if (res[y][0] == 'FATURACAO') {

            var arr_Enviado = this.tabela_analises[0];
            var arr_Enviado2 = arr_Enviado.valores.find(item => item.ano == res[y][1]);
            if (arr_Enviado2) arr_Enviado2.valor = res[y][5];

            var arr_Valor_de_Venda = this.tabela_analises[2];
            var arr_Valor_de_Venda2 = arr_Valor_de_Venda.valores.find(item => item.ano == res[y][1]);
            if (arr_Valor_de_Venda2) arr_Valor_de_Venda2.valor = this.formatMoney(res[y][6], 2, ",", ".", ' €');

            var arr_Amortiz_Realizada_p = this.tabela_analises[4];
            var arr_Amortiz_Realizada_p2 = arr_Amortiz_Realizada_p.valores.find(item => item.ano == res[y][1]);
            if (arr_Amortiz_Realizada_p2) arr_Amortiz_Realizada_p2.valor = res[y][7];

            var arr_Amortiz_Realizada_v = this.tabela_analises[5];
            var arr_Amortiz_Realizada_v2 = arr_Amortiz_Realizada_v.valores.find(item => item.ano == res[y][1]);
            if (arr_Amortiz_Realizada_v2) arr_Amortiz_Realizada_v2.valor = this.formatMoney(res[y][8], 2, ",", ".", ' €');
          }
        }
        this.loading_analise = false;
      }, error => {
        this.loading_analise = false;
        console.log(error);
      }
    );




  }

  carregatabela_analises2(anos) {
    var tabela_analises = []
    tabela_analises.push({ desc: 'Enviado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Encomendado', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor de Venda', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Def. (nº peças)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (nº Peças)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Amortiz Realizada (valor)', valores: JSON.parse(JSON.stringify(anos)) });
    tabela_analises.push({ desc: 'Valor Acumulado LTA', valores: JSON.parse(JSON.stringify(anos)) });

    return tabela_analises;
  }

  carregatabela_precos(id, versao) {
    this.tabela_precos = [];

    this.COMACORDOSPRECOSService.getbyid(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {

        }
        for (var x in response) {
          this.tabela_precos.push({
            dados: response[x],
            ID: response[x].ID,
            DATA_INICIO: (response[x].DATA_INICIO == null) ? null : new Date(response[x].DATA_INICIO),
            DATA_FIM: (response[x].DATA_FIM == null) ? null : new Date(response[x].DATA_FIM),
            PRECO: response[x].PRECO,
            OBSERVACAO: response[x].OBSERVACAO
          });
        }

        this.tabela_precos = this.tabela_precos.slice();
        this.dados_precos = JSON.stringify(this.tabela_precos.slice());
      });
  }

  apagar_linha_tabelaPrecos(index) {
    var tab = this.tabela_precos[index];
    if (tab.ID == null) {
      this.tabela_precos = this.tabela_precos.slice(0, index).concat(this.tabela_precos.slice(index + 1));
    } else {
      this.COMACORDOSPRECOSService.delete(tab.ID).then(
        res => {

          this.tabela_precos = this.tabela_precos.slice(0, index).concat(this.tabela_precos.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  adicionar_linha_tabelaPrecos() {
    this.tabela_precos.push({ DATA_INICIO: null, DATA_FIM: null, PRECO: null, OBSERVACAO: null });
    this.tabela_precos = this.tabela_precos.slice();
  }

  carregatabela_amortizacoes(id, versao) {
    this.tabela_amortizacoes = [];
    this.COMACORDOSAMORTIZACOESService.getbyid(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {

        }
        for (var x in response) {
          this.tabela_amortizacoes.push({
            dados: response[x],
            ID: response[x].ID,
            DATA_INICIO: (response[x].DATA_INICIO == null) ? null : new Date(response[x].DATA_INICIO),
            QUANTIDADE: response[x].QUANTIDADE,
            VALOR: response[x].VALOR,
            DATA_FIM_ESTIMADA: (response[x].DATA_FIM_ESTIMADA == null) ? null : new Date(response[x].DATA_FIM_ESTIMADA),
            OBSERVACAO: response[x].OBSERVACAO
          });
        }

        this.tabela_amortizacoes = this.tabela_amortizacoes.slice();
        this.dados_amortizacoes = JSON.stringify(this.tabela_amortizacoes.slice());
      });
  }

  apagar_linha(index) {
    var tab = this.tabela_amortizacoes[index];
    if (tab.ID == null) {
      this.tabela_amortizacoes = this.tabela_amortizacoes.slice(0, index).concat(this.tabela_amortizacoes.slice(index + 1));
    } else {
      this.COMACORDOSAMORTIZACOESService.delete(tab.ID).then(
        res => {

          this.tabela_amortizacoes = this.tabela_amortizacoes.slice(0, index).concat(this.tabela_amortizacoes.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }
  adicionar_linha() {
    this.tabela_amortizacoes.push({ DATA_INICIO: null, QUANTIDADE: null, VALOR: null, DATA_FIM_ESTIMADA: null, OBSERVACAO: null, DATA_FECHO: null });
    this.tabela_amortizacoes = this.tabela_amortizacoes.slice();
  }

  carregatabela_lta(id, versao) {
    this.tabela_lta = [];

    this.COMACORDOSLTAService.getbyid(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {

        }
        for (var x in response) {
          this.tabela_lta.push({
            dados: response[x],
            ID: response[x].ID,
            DATA_INICIO: (response[x].DATA_INICIO == null) ? null : new Date(response[x].DATA_INICIO),
            VALOR: response[x].VALOR_LTA,
            OBSERVACAO: response[x].OBSERVACAO,
            DATA_FIM: (response[x].DATA_FIM == null) ? null : new Date(response[x].DATA_FIM),
          });
        }

        this.tabela_lta = this.tabela_lta.slice();
        this.dados_lta = JSON.stringify(this.tabela_lta.slice());
      });
  }

  apagar_linha_lta(index) {
    var tab = this.tabela_lta[index];
    if (tab.ID == null) {
      this.tabela_lta = this.tabela_lta.slice(0, index).concat(this.tabela_lta.slice(index + 1));
    } else {
      this.COMACORDOSLTAService.delete(tab.ID).then(
        res => {

          this.tabela_lta = this.tabela_lta.slice(0, index).concat(this.tabela_lta.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  adicionar_linha_lta() {
    this.tabela_lta.push({ DATA_INICIO: null, VALOR: null, DATA_FIM: null, OBSERVACAO: null, DATA_FECHO: null });
    this.tabela_lta = this.tabela_lta.slice();
  }



  carregatabela_historico(id, versao) {
    this.tabela_historico = [];
    this.tabela_historico.push({});
  }

  carregatabela_actividades(id, versao) {
    this.tabela_acoes = [];

    var count = 0;
    this.mensagemtabela_acoes = "A Carregar...";

    this.COMACORDOSACTIVIDADESService.getbyid(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela_acoes = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          var array = {
            ID: response[x][0],
            ID_ACORDO: response[x][1],
            VERSAO: versao,
            DATA_ATIVIDADE: response[x][2],
            UTILIZADOR: response[x][3],
            DESCRICAO: response[x][4],
            OBSERVACAO: response[x][5],
            PRECO: response[x][6],
            DATA_CRIA: response[x][7],
            UTZ_CRIA: response[x][8],
            DATA_ULT_MODIF: response[x][9],
            UTZ_ULT_MODIF: response[x][10],
            TAMANHO_FICHEIRO: response[x][11],
            NOME_FICHEIRO: response[x][12],
            DATATYPE_FICHEIRO: response[x][13],
            FICHEIRO: null,
            FICHEIRO_2: null,
            TYPE_FICHEIRO: response[x][14],
            GERAR_ALERTA: response[x][15],
            ALERTA_GERADO: response[x][16]
          };

          this.tabela_acoes.push({
            dados: array,
            id: response[x][0],
            data_acao: this.formatDate(response[x][2]),
            utilizador: response[x][17],
            descricao: response[x][5],
            descricao_pequena: (response[x][5] == null) ? '' : response[x][5].substring(0, 25),
            preco: response[x][6],
            alerta_data_hora: (response[x][15] == null) ? null : this.formatDate(response[x][15]) + ' ' + new Date(response[x][15]).toLocaleTimeString().slice(0, 5),
            gerar_ALERTA: response[x][15],
            nome_ficheiro: response[x][12],
            //ficheiro: response[x][0].ficheiro + response[x][0].ficheiro_2,
            ficheiro: null,
            datatype: response[x][13],
            type: response[x][14],
            size: response[x][11],
            modificado: false,
            apagarficheiros: (this.adminuser || this.user == response[x][8]) ? false : true
          });

        }
        this.tabela_acoes = this.tabela_acoes.slice();
        this.dados_atividades = JSON.stringify(this.tabela_acoes.slice());

      },
      error => console.log(error));
  }

  abrir(event, index) {
    //console.log(event)
    this.index_actividade = index;
    this.dados = event.dados;

    if (event.ficheiro == null && event.nome_ficheiro != null) {
      this.COMACORDOSACTIVIDADESService.getbyidFICHEIRO(event.id).subscribe(
        (res) => {
          if (res[0][0] != null) this.dados.FICHEIRO = res[0][0] + res[0][1];
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {
      this.dados.FICHEIRO = event.ficheiro;
    }
    this.novo_atividade = false;


    this.dados.DATA_CRIA = new Date(event.dados.DATA_CRIA);
    this.dados.DATA_ATIVIDADE = new Date(event.dados.DATA_CRIA);
    this.nome_utilizador = event.utilizador;
    this.alerta_data = (event.gerar_ALERTA == null) ? null : new Date(event.gerar_ALERTA);
    this.alerta_hora = (event.gerar_ALERTA == null) ? null : new Date(event.gerar_ALERTA).toLocaleTimeString().slice(0, 5);

    this.dialognovo = true;
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }



  //formatar a data para yyyy-mm
  formatDateMES(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month].join('-');
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

  //formatar a data para yyyymmddhhmmsss
  formatDate2() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      min = '' + d.getMinutes(),
      mill = '' + d.getMilliseconds(),
      hour = '' + d.getHours(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + month + day + hour + min + mill;
  }

  btgravar() {
    var encountrou = false;
    for (var x in this.tabela_volumes) {
      if (this.tabela_volumes[x].valor == null) {
        encountrou = true;
      }

    }

    if (this.ID_CONTRATO == null || this.ID_REFERENCIA == null || this.SOP == null || this.EOP == null || encountrou || this.PRECO_BASE == null) {
      this.ativobt = '1';
      setTimeout(() => {
        this.simular(this.buttongravar);
      }, 150);
    } else {
      this.simular(this.buttongravar);
    }

  }

  gravar() {




    var acordo = new COM_ACORDOS;

    if (!this.novo) acordo = this.dados_acordo;

    acordo.ID_CONTRATO = this.ID_CONTRATO;
    acordo.ID_REFERENCIA = this.ID_REFERENCIA;
    acordo.OBSERVACOES = this.OBSERVACOES;
    acordo.SOP = (this.SOP == null) ? null : new Date(this.SOP + '-01');
    acordo.EOP = (this.EOP == null) ? null : new Date(this.EOP + '-01');
    acordo.PRECO_BASE = this.PRECO_BASE;

    acordo.UTZ_ULT_MODIF = this.user;
    acordo.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      acordo.DATA_CRIA = new Date();
      acordo.UTZ_CRIA = this.user;
      acordo.VERSAO = 1;

      acordo.INATIVO = false;

      this.COMACORDOSService.valida_acordo(this.ID_REFERENCIA, this.ID_REFERENCIA).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 0) {
            this.cria_acordo(acordo);
          } else {
            if (response[0][0] > 0) {
              this.simular(this.existerefcontrato);
            } else {
              this.cria_acordo(acordo);
            }
          }
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });


    } else {
      var id;
      var versao;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
          //versao = params['versao'] || 0;
        });

      acordo.ID = id;
      //console.log(reclamacao)
      var alteracoes = this.ver_alteracoes();
      if (alteracoes.length > 0) {
        this.COMACORDOSService.update_NOVA_VERSAO(acordo).subscribe(
          res => {
            versao = res[0][1];
            acordo.VERSAO = versao;

            this.gravartabela_actividades(id, versao, true);
            this.gravartabela_precos(id, versao, true);
            this.gravartabela_amortizacoes(id, versao, true);
            this.gravartabela_lta(id, versao, true);
            this.gravartabela_volumes(id, versao);
            this.gravarFicheiros(id, versao, true);
            this.gravartabela_historico(alteracoes, versao);
            this.simular(this.inputgravou);
            this.locatiosave('view', this.ID_ACORDO, versao);

          },
          error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });
      } else {
        this.simular(this.sem_alteracoes);
      }
    }
  }

  cria_acordo(acordo) {
    this.COMACORDOSService.create(acordo).subscribe(
      res => {

        this.gravarFicheiros(res.ID, res.VERSAO, false);
        this.gravartabela_actividades(res.ID, res.VERSAO, false);
        this.gravartabela_precos(res.ID, res.VERSAO, false);
        this.gravartabela_amortizacoes(res.ID, res.VERSAO, false);
        this.gravartabela_lta(res.ID, res.VERSAO, false);
        this.gravartabela_volumes(res.ID, res.VERSAO);
        this.simular(this.inputnotifi);
        this.locatiosave('editar', res.ID, res.VERSAO);

      },
      error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });
  }

  ver_alteracoes() {

    let diff_precos = this.diff(this.dados_precos, this.tabela_precos);
    let diff_amortizacoes = this.diff(this.dados_amortizacoes, this.tabela_amortizacoes);
    let diff_lta = this.diff(this.dados_lta, this.tabela_lta);
    let diff_atividades = this.diff(this.dados_atividades, this.tabela_acoes);
    let diff_volumes = this.diff(this.dados_volumes, this.tabela_volumes);
    let diff_documentos = this.diff(this.dados_documentos, this.uploadedFiles);

    var modificacoes = [];

    if (diff_precos) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela Preços', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (diff_amortizacoes) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela Amortizações', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (diff_lta) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela LTA', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (diff_atividades) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela Atividades', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (diff_volumes) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela Volumes', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (diff_documentos) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou a tabela Documentos', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }

    if (this.dados_old.OBSERVACOES != this.OBSERVACOES) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo Observações', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });
    }
    if (this.dados_old.ID_CONTRATO != this.ID_CONTRATO) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo Contrato', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });

    }
    if (this.dados_old.ID_REFERENCIA != this.ID_REFERENCIA) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo Referência', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });

    }
    if (this.dados_old.SOP != this.SOP) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo SOP', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });

    }
    if (this.dados_old.EOP != this.EOP) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo EOP', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });

    }
    if (this.dados_old.PRECO_BASE != this.PRECO_BASE) {
      modificacoes.push({ DESCRICAO: 'O Utilizador ' + this.user_nome + ' alterou o campo Preço Base', ID_ACORDO: this.ID_ACORDO, VERSAO: this.VERSAO });

    }

    return modificacoes;
  }


  locatiosave(destino, id, versao) {
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (back != 0) {
      this.router.navigate(['comercial_acordos/' + destino], { queryParams: { id: id, versao: versao, redirect: back } });
    } else {
      this.router.navigate(['comercial_acordos/' + destino], { queryParams: { id: id, versao: versao } });
    }
  }

  gravarFicheiros(id, versao, nova_versao) {
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {


      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new COM_ACORDOS_ANEXOS;
        var novo = false;
        if (this.uploadedFiles[x].id_FICHEIRO != null) {
          //ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.DATA_CRIA = new Date();
          ficheiros.UTZ_CRIA = this.user;
          novo = true;
        }
        ficheiros.ID_ACORDO = id;
        ficheiros.VERSAO = versao;

        if (nova_versao) {
          ficheiros.ID = null;
          ficheiros.DATA_CRIA = new Date();
          ficheiros.UTZ_CRIA = this.user;
        }
        //ficheiros.ID = this.uploadedFiles[x].id;

        ficheiros.NOME_FICHEIRO = this.uploadedFiles[x].name;
        ficheiros.TYPE_FICHEIRO = this.uploadedFiles[x].type;
        ficheiros.DATATYPE_FICHEIRO = this.uploadedFiles[x].datatype;
        ficheiros.TAMANHO_FICHEIRO = this.uploadedFiles[x].size;
        ficheiros.DESCRICAO = this.uploadedFiles[x].descricao;
        if (novo) ficheiros.FICHEIRO = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro, this.uploadedFiles[x].ficheiro.length / 2);
        if (novo) ficheiros.FICHEIRO_2 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro.length / 2, this.uploadedFiles[x].ficheiro.length);

        ficheiros.DATA_CRIA = new Date();
        ficheiros.UTZ_CRIA = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        } else if (count == this.uploadedFiles.length) {

        }
      }
    } else {


    }

  }


  gravartabela_precos(id, versao, nova_versao) {
    for (var x in this.tabela_precos) {
      var tabela = new COM_ACORDOS_PRECOS;

      if (this.tabela_precos[x].ID != null) {
        tabela = this.tabela_precos[x].dados;
      } else {
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      if (nova_versao) {
        tabela.ID = null;
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      tabela.DATA_ULT_MODIF = new Date();
      tabela.UTZ_ULT_MODIF = this.user;
      tabela.ID_ACORDO = id;
      tabela.VERSAO = versao;

      tabela.DATA_FIM = this.tabela_precos[x].DATA_FIM;
      tabela.DATA_INICIO = this.tabela_precos[x].DATA_INICIO;
      tabela.OBSERVACAO = this.tabela_precos[x].OBSERVACAO;
      tabela.PRECO = this.tabela_precos[x].PRECO;

      this.gravartabela_precos2(tabela);

    }
  }

  gravartabela_precos2(tabela) {
    this.COMACORDOSPRECOSService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravartabela_amortizacoes(id, versao, nova_versao) {
    for (var x in this.tabela_amortizacoes) {
      var tabela = new COM_ACORDOS_AMORTIZACOES;

      if (this.tabela_amortizacoes[x].ID != null) {
        tabela = this.tabela_amortizacoes[x].dados;
      } else {
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      if (nova_versao) {
        tabela.ID = null;
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      tabela.DATA_ULT_MODIF = new Date();
      tabela.UTZ_ULT_MODIF = this.user;
      tabela.ID_ACORDO = id;
      tabela.VERSAO = versao;

      tabela.DATA_INICIO = this.tabela_amortizacoes[x].DATA_INICIO;
      tabela.DATA_FIM_ESTIMADA = this.tabela_amortizacoes[x].DATA_FIM_ESTIMADA;
      tabela.OBSERVACAO = this.tabela_amortizacoes[x].OBSERVACAO;
      tabela.QUANTIDADE = this.tabela_amortizacoes[x].QUANTIDADE;
      tabela.VALOR = this.tabela_amortizacoes[x].VALOR;

      this.gravartabela_amortizacoes2(tabela);

    }
  }
  gravartabela_amortizacoes2(tabela) {
    this.COMACORDOSAMORTIZACOESService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravartabela_lta(id, versao, nova_versao) {
    for (var x in this.tabela_lta) {
      var tabela = new COM_ACORDOS_LTA;

      if (this.tabela_lta[x].ID != null) {
        tabela = this.tabela_lta[x].dados;
      } else {
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      if (nova_versao) {
        tabela.ID = null;
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      tabela.DATA_ULT_MODIF = new Date();
      tabela.UTZ_ULT_MODIF = this.user;
      tabela.ID_ACORDO = id;
      tabela.VERSAO = versao;

      tabela.DATA_FIM = this.tabela_lta[x].DATA_FIM;
      tabela.DATA_INICIO = this.tabela_lta[x].DATA_INICIO;
      tabela.VALOR_LTA = this.tabela_lta[x].VALOR;
      tabela.OBSERVACAO = this.tabela_lta[x].OBSERVACAO;

      this.gravartabela_lta2(tabela);

    }
  }
  gravartabela_lta2(tabela) {
    this.COMACORDOSLTAService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravartabela_actividades(id, versao, nova_versao) {

    for (var x in this.tabela_acoes) {
      var tabela = new COM_ACORDOS_ACTIVIDADES;
      tabela = this.tabela_acoes[x].dados;
      if (this.tabela_acoes[x].ID != null) {
      } else {
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
        tabela.ALERTA_GERADO = false;
      }

      if (nova_versao) {
        tabela.ID = null;
        tabela.DATA_CRIA = new Date();
        tabela.UTZ_CRIA = this.user;
      }

      tabela.DATA_ULT_MODIF = new Date();
      tabela.UTZ_ULT_MODIF = this.user;
      tabela.ID_ACORDO = id;
      tabela.VERSAO = versao;

      tabela.UTILIZADOR = this.user;

      //if (this.tabela_acoes[x].modificado || this.novo) 

      this.gravartabela_actividades2(tabela, this.tabela_acoes[x].ID);

    }
  }

  gravartabela_actividades2(tabela: COM_ACORDOS_ACTIVIDADES, id) {
    if (tabela.FICHEIRO == null && id != null) {
      this.COMACORDOSACTIVIDADESService.getbyidFICHEIRO(id).subscribe(
        (res) => {
          tabela.FICHEIRO = res[0][0];
          tabela.FICHEIRO = res[0][1];
          this.gravartabela_actividades3(tabela);
        }, error => {
          this.gravartabela_actividades3(tabela);
          console.log(error);
        }
      );
      //this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement);
    } else {
      this.gravartabela_actividades3(tabela);
    }
  }

  gravartabela_actividades3(tabela) {
    this.COMACORDOSACTIVIDADESService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravartabela_volumes(id, versao) {
    this.COMACORDOSVOLUMESService.deleteTODOS(id, versao).then(
      res => {

        for (var x in this.tabela_volumes) {
          var tabela = new COM_ACORDOS_VOLUMES;
          tabela.ID_ACORDO = id;
          tabela.VERSAO = versao;

          tabela.ANO = this.tabela_volumes[x].ano;
          tabela.VALOR = this.tabela_volumes[x].valor;
          this.gravartabela_volumes2(tabela);

        }
      },
      error => {
        console.log(error);
      });
  }
  gravartabela_volumes2(tabela) {
    this.COMACORDOSVOLUMESService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }


  gravartabela_historico(alteracoes, versao) {

    for (var x in alteracoes) {
      var tabela = new COM_ACORDOS_HISTORICO;
      tabela.ID_ACORDO = alteracoes[x].ID_ACORDO;
      tabela.VERSAO = versao;//alteracoes[x].VERSAO;
      tabela.DESCRICAO = alteracoes[x].DESCRICAO;
      tabela.DATA_CRIA = new Date();
      tabela.UTZ_CRIA = this.user;
      this.gravartabela_historico2(tabela);

    }

  }

  gravartabela_historico2(tabela) {
    this.COMACORDOSHISTORICOService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }
  novaAtividade() {
    this.novo_atividade = true;
    this.dados = new COM_ACORDOS_ACTIVIDADES();
    this.dados.DATA_CRIA = new Date();
    this.dados.DATA_ATIVIDADE = new Date();
    this.dados.UTZ_CRIA = this.user;
    this.nome_utilizador = this.user_nome;
    this.alerta_data = null;
    this.alerta_hora = null;

    this.index_actividade = null;
    this.dialognovo = true;
  }

  gravardados() {
    var atividade = new COM_ACORDOS_ACTIVIDADES();
    atividade = this.dados;
    if (this.dados.FICHEIRO) {
      var ficheiro = this.dados.FICHEIRO;
      atividade.FICHEIRO = ficheiro.substr(0, ficheiro.length / 2);
      atividade.FICHEIRO_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
    }
    var data = null;
    var hora = null;
    if (this.alerta_hora == null || this.alerta_hora == "") {
      hora = "00:00";
    } else {
      hora = this.alerta_hora;
    }
    if (this.alerta_data == null || this.alerta_data == "") {

    } else {
      data = new Date(new Date(this.alerta_data).toDateString() + " " + hora.slice(0, 5));
    }

    atividade.GERAR_ALERTA = data;
    atividade.PRECO = this.dados.PRECO;

    if (this.novo_atividade) {

      this.tabela_acoes.push({
        dados: atividade,
        id: null,
        data_acao: this.formatDate(this.dados.DATA_ATIVIDADE),
        utilizador: this.user_nome,
        descricao: this.dados.OBSERVACAO,
        preco: this.dados.PRECO,
        alerta_data_hora: (data == null) ? null : this.formatDate(data) + ' ' + new Date(data).toLocaleTimeString().slice(0, 5),
        gerar_ALERTA: data,
        nome_ficheiro: this.dados.NOME_FICHEIRO,
        ficheiro: this.dados.FICHEIRO,
        datatype: this.dados.DATATYPE_FICHEIRO,
        type: this.dados.DATATYPE_FICHEIRO,
        size: this.dados.TAMANHO_FICHEIRO,
        apagarficheiros: true,
        modificado: true
      });
      this.tabela_acoes = this.tabela_acoes.slice();
      this.dialognovo = false;
    } else {
      // if (atividade.ID == null) {
      this.tabela_acoes[this.index_actividade].dados = atividade;
      this.tabela_acoes[this.index_actividade].descricao = this.dados.OBSERVACAO;
      this.tabela_acoes[this.index_actividade].preco = this.dados.PRECO;
      this.tabela_acoes[this.index_actividade].ficheiro = this.dados.FICHEIRO;
      this.tabela_acoes[this.index_actividade].datatype = this.dados.DATATYPE_FICHEIRO;
      this.tabela_acoes[this.index_actividade].type = this.dados.DATATYPE_FICHEIRO;
      this.tabela_acoes[this.index_actividade].size = this.dados.TAMANHO_FICHEIRO;
      this.tabela_acoes[this.index_actividade].nome_ficheiro = this.dados.NOME_FICHEIRO;
      this.tabela_acoes[this.index_actividade].gerar_ALERTA = data;
      this.tabela_acoes[this.index_actividade].modificado = true;
      this.tabela_acoes[this.index_actividade].alerta_data_hora = (data == null) ? null : this.formatDate(data) + ' ' + new Date(data).toLocaleTimeString().slice(0, 5);
      this.dialognovo = false;
      /* } else {
         this.COMACORDOSACTIVIDADESService.update(atividade).subscribe(
           res => {
             this.dialognovo = false;
             this.carregatabela_actividades(this.ID_ACORDO);
   
             //this.insereatividade("Atualizou Ação");
   
           },
           error => { console.log(error); });
       }*/
    }

  }

  carregatabelaFiles(id, versao) {
    this.uploadedFiles = [];

    this.COMACORDOSANEXOSService.getbyid(id, versao).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate(response[x][2]) + " " + new Date(response[x][2]).toLocaleTimeString();

            id2 = response[x][0];


            if (response[x][0] != null) id2 = "f110" + response[x][0];
            this.uploadedFiles.push({
              data_CRIA: data_at,
              ficheiro: null,
              //data: response[x][0],
              utilizador: response[x][9],
              datacria: datacria,
              id: id2, name: response[x][6],
              id_FICHEIRO: response[x][0],
              type: response[x][8],
              datatype: response[x][7],
              size: response[x][5],
              descricao: response[x][4]
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }
        this.dados_documentos = JSON.stringify(this.uploadedFiles.slice());

      }, error => { console.log(error); });

  }

  onUpload(event) {
    //let files: FileList = event.files;
    this.fileInput.progress = 0;
    this.campo_x = 0;
    var x = 0;
    for (let file of event.files) {

      this.fileInput.progress = ((this.campo_x + 1) / event.files.length) * 100;
      // const index = files.indexOf(files[x]);
      var type = "img";
      var str = file.type;
      var tipo = file.name.split(".");

      if (str.toLowerCase().indexOf("pdf") >= 0) {
        type = "pdf";
      } else if (str.toLowerCase().indexOf("audio") >= 0) {
        type = "audio";
      } else if (str.toLowerCase().indexOf("video") >= 0) {
        type = "video";
      } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
        type = "excel";
      } else if (str.toLowerCase().indexOf("word") >= 0) {
        type = "word";
      } else if (str.toLowerCase().indexOf("text") >= 0) {
        type = "txt";
      } else if (tipo[1] == "msg") {
        type = "msg";
      }
      var nome = this.formatDate2() + x;

      this.filetoBASE64(file, nome, event, type, x)



      //  this.fileupoad(file, nome, event, type, x, ficheiro);
      x++;
    }

  }
  filetoBASE64(file, nome, event, type, x) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (event2: Event) => {
      // you can perform an action with readed data here
      this.fileupoad(file, nome, event, type, x, myReader.result);
    }

    myReader.readAsDataURL(file);
  }

  fileupoad(file, nome, event, type, x, ficheiro) {

    var tipo = file.name.split(".");
    var data = new Date();

    /*if (!this.novo) {
      var ficheiros = new COM_ACORDOS_ANEXOS;
      ficheiros.DATA_CRIA = data;
      ficheiros.UTZ_CRIA = this.user;
      ficheiros.ID_ACORDO = this.ID_ACORDO;
      ficheiros.VERSAO = this.VERSAO;
      ficheiros.NOME_FICHEIRO = file.name;
      ficheiros.TYPE_FICHEIRO = type;
      ficheiros.DATATYPE_FICHEIRO = file.type;
      ficheiros.TAMANHO_FICHEIRO = file.size;
      ficheiros.DESCRICAO = this.filedescricao[x];
      ficheiros.FICHEIRO = ficheiro.substr(ficheiro, ficheiro.length / 2);
      ficheiros.FICHEIRO_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
      ficheiros.DATA_CRIA = new Date();
      ficheiros.UTZ_CRIA = this.user;
      this.gravarTabelaFicheiros2(ficheiros, 0, 0, 0);
   
    } else {*/
    this.uploadedFiles.push({
      data_CRIA: data, ficheiro: ficheiro,
      responsavel: null, utilizador: this.user_nome, datacria: this.formatDate(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
      id: null, name: file.name, datatype: file.type, type: type, size: file.size, descricao: this.filedescricao[x]
    });
    // }

    this.uploadedFiles = this.uploadedFiles.slice();
    if (this.campo_x + 1 == event.files.length) {
      this.fileInput.files = [];
      this.filedescricao = [];
      this.fileInput.progress = 0;
    }
    this.campo_x++;
  }

  showDialog(type, srcelement, nomeficheiro, datatype, ficheiro, id_ficheiro) {
    this.srcelement = "";
    if (type == "pdf" || type == 'txt') {
      if (ficheiro == null) {
        this.COMACORDOSANEXOSService.getbyidFICHEIRO(id_ficheiro).subscribe(
          (res) => {
            this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(res[0][0] + res[0][1]);
          }, error => {
            this.simular(this.inputerroficheiro);
            console.log(error);
          }
        );
        //this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement);
      } else {
        /*var blob = new Blob([ficheiro], { type: datatype });
        var blobUrl = URL.createObjectURL(blob);*/
        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
      }
    }
    /*if (ficheiro == null) {
      this.srcelement = webUrl.link + srcelement;
    } else {
      this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
    }*/
    if (type == "excel" || type == "word") {
      this.download(nomeficheiro, srcelement, datatype, ficheiro, id_ficheiro)
    } else if (type == "msg") {
      this.downloadTXT(nomeficheiro, srcelement, ficheiro, id_ficheiro)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      this.display = true;
    }
  }
  showDialog_atividade(type, srcelement, nomeficheiro, datatype, ficheiro, id_ficheiro) {
    this.srcelement = "";
    if (type == "pdf" || type == 'txt') {
      if (ficheiro == null) {
        this.COMACORDOSACTIVIDADESService.getbyidFICHEIRO(id_ficheiro).subscribe(
          (res) => {
            this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(res[0][0] + res[0][1]);
          }, error => {
            this.simular(this.inputerroficheiro);
            console.log(error);
          }
        );
        //this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement);
      } else {
        /*var blob = new Blob([ficheiro], { type: datatype });
        var blobUrl = URL.createObjectURL(blob);*/
        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
      }
    }
    /*if (ficheiro == null) {
      this.srcelement = webUrl.link + srcelement;
    } else {
      this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
    }*/
    if (type == "excel" || type == "word") {
      this.download(nomeficheiro, srcelement, datatype, ficheiro, id_ficheiro)
    } else if (type == "msg") {
      this.downloadTXT(nomeficheiro, srcelement, ficheiro, id_ficheiro)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      this.display = true;
    }
  }

  download(nome, filename, datatype, ficheiro, id_ficheiro) {
    if (ficheiro == null) {
      this.COMACORDOSANEXOSService.getbyidFICHEIRO(id_ficheiro).subscribe(
        (res) => {
          const downloadLink = document.createElement("a");

          downloadLink.href = res[0][0] + res[0][1];
          downloadLink.download = nome;
          downloadLink.click();
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {

      const downloadLink = document.createElement("a");

      downloadLink.href = ficheiro;
      downloadLink.download = nome;
      downloadLink.click();
    }
  }

  download_atividade(nome, filename, datatype, ficheiro, id_ficheiro) {
    if (ficheiro == null) {
      this.COMACORDOSACTIVIDADESService.getbyidFICHEIRO(id_ficheiro).subscribe(
        (res) => {
          const downloadLink = document.createElement("a");

          downloadLink.href = res[0][0] + res[0][1];
          downloadLink.download = nome;
          downloadLink.click();
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {

      const downloadLink = document.createElement("a");

      downloadLink.href = ficheiro;
      downloadLink.download = nome;
      downloadLink.click();
    }
  }

  downloadTXT(nomeficheiro, filename, ficheiro, id_ficheiro) {
    if (ficheiro == null) {
      this.COMACORDOSANEXOSService.getbyidFICHEIRO(id_ficheiro).subscribe(
        (res) => {
          this.UploadService.downloadFileMSGBASE64(filename, res[0][0] + res[0][1]).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
              this.nomeficheiro = nomeficheiro;
              this.type = 'txt';
              this.display = true;
            }, error => {
              this.simular(this.inputerroficheiro);
              console.log(error);
            });
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );

    } else {
      this.UploadService.downloadFileMSGBASE64(filename, ficheiro).subscribe(
        (res) => {
          var fileURL = URL.createObjectURL(res);
          this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          this.nomeficheiro = nomeficheiro;
          this.type = 'txt';
          this.display = true;
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        });
    }
  }


  gravarTabelaFicheiros2(ficheiros: COM_ACORDOS_ANEXOS, count, total, id) {

    this.COMACORDOSANEXOSService.update(ficheiros).subscribe(
      res => {
        /*if (count == total && this.novo) {
   
        } else if (!this.novo) {
          this.uploadedFiles.push({
            data: res,
            data_CRIA: ficheiros.DATA_CRIA, ficheiro: ficheiros.FICHEIRO + ficheiros.FICHEIRO_2,
            utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.ID, name: ficheiros.NOME_FICHEIRO, datatype: ficheiros.DATATYPE_FICHEIRO, type: ficheiros.TYPE_FICHEIRO, size: ficheiros.TAMANHO_FICHEIRO, descricao: ficheiros.DESCRICAO
          });
          this.uploadedFiles = this.uploadedFiles.slice();
        }*/
      },
      error => { console.log(error); });

  }

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.ID == null) {
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.COMACORDOSANEXOSService.delete(tab.ID).then(
        res => {
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }

  removerficheiro_actividade(index) {
    this.dados.NOME_FICHEIRO = null;
    this.dados.TAMANHO_FICHEIRO = null;
    this.dados.DATATYPE_FICHEIRO = null;
    this.dados.FICHEIRO = null;
    this.dados.FICHEIRO_2 = null;
    this.dados.TYPE_FICHEIRO = null;


    this.tabela_acoes[this.index_actividade].ficheiro = null;
    this.tabela_acoes[this.index_actividade].datatype = null;
    this.tabela_acoes[this.index_actividade].type = null;
    this.tabela_acoes[this.index_actividade].size = null;
    this.tabela_acoes[this.index_actividade].nome_ficheiro = null;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var data = new Date();

      let file: File = fileList[0];

      this.dados.NOME_FICHEIRO = file.name;
      this.dados.TAMANHO_FICHEIRO = file.size;
      this.dados.DATATYPE_FICHEIRO = file.type;



      var str = file.type;
      var type = "img";
      var tipo = file.name.split(".");

      if (str.toLowerCase().indexOf("pdf") >= 0) {
        type = "pdf";
      } else if (str.toLowerCase().indexOf("audio") >= 0) {
        type = "audio";
      } else if (str.toLowerCase().indexOf("video") >= 0) {
        type = "video";
      } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
        type = "excel";
      } else if (str.toLowerCase().indexOf("word") >= 0) {
        type = "word";
      } else if (str.toLowerCase().indexOf("text") >= 0) {
        type = "txt";
      } else if (tipo[1] == "msg") {
        type = "msg";
      }
      this.dados.TYPE_FICHEIRO = type;

      // var nome = this.formatDate();
      /* this.UploadService.fileChange(file, nome).subscribe(result => {*/


      //this.fileselectinput[id].src = nome + '.' + tipo[1];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (event2: Event) => {
        // you can perform an action with readed data here
        this.dados.FICHEIRO = myReader.result.toString();

      }

      myReader.readAsDataURL(file);

      /*}, error => {
        console.log(error);
      });*/


    }
  }


  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(index);
  }

  isImage(file: File) {
    return /^image\//.test(file.type);
  }

  fileImage(file: File) {
    var str = file.type;
    if (str.toLowerCase().indexOf("pdf") >= 0) {
      return "assets/img/file-pdf.png";
    } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
      return "assets/img/file-excel.png";
    } else if (str.toLowerCase().indexOf("word") >= 0) {
      return "assets/img/file-word.png";
    } else {
      return "assets/img/file.png";
    }
  }

  validadatas(index) {
    var startDate = new Date(this.tabela_precos[index].DATA_INICIO).getTime();
    var endDate = new Date(this.tabela_precos[index].DATA_FIM).getTime();

    for (var x in this.tabela_precos) {
      if (parseInt(x) != index) {
        var startDate2 = new Date(this.tabela_precos[x].DATA_INICIO).getTime();
        var endDate2 = new Date(this.tabela_precos[x].DATA_FIM).getTime();
        if (startDate2 <= startDate && endDate2 >= startDate) {
          this.simular(this.datas_invalidas);
          this.tabela_precos[index].DATA_INICIO = null;
          return;
        } else if (startDate2 <= endDate && endDate2 >= endDate) {
          this.simular(this.datas_invalidas);
          this.tabela_precos[index].DATA_FIM = null;
          return;
        } else if (startDate2 >= startDate && endDate2 <= endDate) {
          this.simular(this.datas_invalidas);
          this.tabela_precos[index].DATA_FIM = null;
          return;
        }
      }

    }
  }

  diff(a, b) {
    b = JSON.stringify(b);
    if (a !== b) {
      return true;
    }
    return false;
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

        var acordo = new COM_ACORDOS;

        if (!this.novo) acordo = this.dados_acordo;
        acordo.INATIVO = true;
        acordo.DATA_ANULACAO = new Date();
        acordo.UTZ_ANULACAO = this.user;
        acordo.DATA_ULT_MODIF = new Date();
        acordo.UTZ_ULT_MODIF = this.user;

        this.COMACORDOSService.updateESTADO(acordo, 'A', 'A').subscribe(
          res => {

            this.simular(this.inputapagar)

            this.router.navigate(['comercial_acordos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }


  fechar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm2(id);
    }

  }

  //popup fechar
  confirm2(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende fechar?',
      header: 'Fechar Confirmação',
      icon: 'fa fa-close',
      accept: () => {

        var acordo = new COM_ACORDOS;

        if (!this.novo) acordo = this.dados_acordo;

        acordo.DATA_ULT_MODIF = new Date();
        acordo.UTZ_ULT_MODIF = this.user;

        var tipo2 = 'F';
        if (acordo.DATA_FECHO_AMORTIZACOES == null && acordo.DATA_FECHO_LTA == null) {
          tipo2 = 'F_ALLT';
        } else if (acordo.DATA_FECHO_AMORTIZACOES == null) {
          tipo2 = 'F_ALL2';
        } else if (acordo.DATA_FECHO_LTA == null) {
          tipo2 = 'F_ALL1';
        }

        this.COMACORDOSService.updateESTADO(acordo, 'F', tipo2).subscribe(
          res => {

            this.simular(this.inputgravou)

            this.router.navigate(['comercial_acordos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  //popup fechar
  fechar_lta() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende LTA (Produtividade)?',
      header: 'Fechar Confirmação',
      icon: 'fa fa-close',
      accept: () => {

        var acordo = new COM_ACORDOS;

        if (!this.novo) acordo = this.dados_acordo;

        acordo.DATA_ULT_MODIF = new Date();
        acordo.UTZ_ULT_MODIF = this.user;

        this.COMACORDOSService.updateESTADO(acordo, 'F_LTA', 'F_LTA').subscribe(
          res => {
            this.simular(this.inputgravou)
            //this.router.navigate(['comercial_acordos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  //popup fechar
  fechar_amortizacoes() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende fechar Amortizações?',
      header: 'Fechar Confirmação',
      icon: 'fa fa-close',
      accept: () => {

        var acordo = new COM_ACORDOS;

        if (!this.novo) acordo = this.dados_acordo;

        acordo.DATA_ULT_MODIF = new Date();
        acordo.UTZ_ULT_MODIF = this.user;

        this.COMACORDOSService.updateESTADO(acordo, 'F_AMOR', 'F_AMOR').subscribe(
          res => {

            this.simular(this.inputgravou);
            //this.router.navigate(['comercial_acordos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  novoacordo() {
    this.router.navigate(['comercial_acordos/novo']);
  }

  backClicked() {
    //this.location.back();
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


    } else {
      this.router.navigate(['comercial_acordos']);
    }
    
  }


  edita() {
    var id;
    var versao;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        id = params['id'] || 0;
        versao = params['versao'] || 0;
      });
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (this.bteditar) {
      if (back != 0) {
        this.router.navigate(['comercial_acordos/editar'], { queryParams: { id: id, versao: versao, redirect: back } });
      } else {
        this.router.navigate(['comercial_acordos/editar'], { queryParams: { id: id, versao: versao } });
      }

    }
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
  };
}

