import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService } from 'primeng/primeng';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { PRAMOSTRASCABService } from 'app/servicos/pr-amostras-cab.service';
import { PRAMOSTRASACCOESService } from 'app/servicos/pr-amostras-accoes.service';
import { PRDICTIPOLOGIAENSAIOService } from 'app/servicos/pr-dic-tipologia-ensaio.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { PR_AMOSTRAS_CAB } from 'app/entidades/PR_AMOSTRAS_CAB';
import { PR_AMOSTRAS_ACCOES } from 'app/entidades/PR_AMOSTRAS_ACCOES';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { GT_LOGS } from 'app/entidades/GT_LOGS';
import { GT_MOV_TAREFAS } from 'app/entidades/GT_MOV_TAREFAS';
import { webUrl } from 'assets/config/webUrl';
import { UploadService } from 'app/servicos/upload.service';

@Component({
  selector: 'app-amostrasform',
  templateUrl: './amostrasform.component.html',
  styleUrls: ['./amostrasform.component.css']
})
export class AmostrasformComponent implements OnInit {


  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;
  user: any;
  user_nome: any;
  adminuser: any;
  modoedicao: boolean;
  novo: boolean;
  linhas: any[];
  cor_linha: any;
  drop_accoes: any;
  drop_tipologia: any[];
  referencias = [];
  drop_artigos: any[];
  id_AMOSTRA: number;
  data_LANCAMENTO;
  id_LINHA;
  descricao: string;
  referencia: string;
  estado: string = 'P';
  quant_BARRAS: number;
  id_TIPOLOGIA_ENSAIO: number;
  indice: string;
  estado_texto: string;
  utilizador: string;
  data_CRIA;
  hora_CRIA: string;
  tabelaaccoes: any = [];
  data_FIM;
  amostra: PR_AMOSTRAS_CAB;
  drop_utilizadores: any[];
  drop_utilizadores2: any[];
  id_selected: number;
  descricaoeng: string;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  estados = [{ value: "", label: "Sel. Estado" }, { value: "P", label: "Planeado" }, { value: "I", label: "Desenvolvido/Realizado" },
  { value: "C", label: "Controlado/Verificado" }, { label: "Aprovado/Fechado", value: "Aprovado/Fechado" }, { value: "D", label: "Cancelado" },];
  ref_descricao: any;
  unidade: any;
  ofnum: any;
  unidades = [{ value: "", label: "Sel. Unidade" }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }];
  errovalida = "";
  validaloading: boolean;
  displayvalidacao: boolean;
  filteredreferencias: any[];
  referencia_campo: any;
  selected_row: any;
  justificacao_DATA_FIM: any;
  displayJustificacaoRESPONSAVEL: boolean;
  displayJustificacaoDATAFIM: boolean;
  justificacao_RESPONSAVEL: any;
  yearTimeout: any;

  constructor(private UploadService: UploadService, private GTMOVTAREFASService: GTMOVTAREFASService, private RHSECTORESService: RHSECTORESService, private GERUTILIZADORESService: GERUTILIZADORESService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private PRAMOSTRASACCOESService: PRAMOSTRASACCOESService, private PRAMOSTRASCABService: PRAMOSTRASCABService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService, private ABDICLINHAService: ABDICLINHAService, private location: Location, private elementRef: ElementRef, private confirmationService: ConfirmationService
    , private route: ActivatedRoute, private renderer: Renderer, private globalVar: AppGlobals, private router: Router, private PRDICTIPOLOGIAENSAIOService: PRDICTIPOLOGIAENSAIOService) { }

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
    this.globalVar.setdisCriarmanutencao(true);


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });

    if (urlarray[2] != null) {
      if (urlarray[2].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[2].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);

        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

        //this.carregaDados(false, null);

      } else if (urlarray[2].match("view")) {

        this.globalVar.setcriar(true);
      }
    }


    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93apagar"));


    if (!this.novo) {
      this.preenchelinhas(true, id);
      this.artigos();
    } else {
      this.artigos();
      this.preenchelinhas(false, id);
    }

  }

  preenchelinhas(inicia, id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();

        this.carregatipologia(inicia, id);

      },
      error => { console.log(error); this.carregatipologia(inicia, id); });
  }

  carregatipologia(inicia, id) {
    this.drop_tipologia = [];
    this.PRDICTIPOLOGIAENSAIOService.getAll().subscribe(
      response => {
        this.drop_tipologia.push({ label: "Selecionar Tipologia", value: null });

        for (var x in response) {
          this.drop_tipologia.push({ label: response[x].descricao, value: response[x].id_TIPOLOGIA_ENSAIO });
        }

        this.drop_tipologia = this.drop_tipologia.slice();
        this.carregaaccoes(inicia, id);

      },
      error => { console.log(error); this.carregaaccoes(inicia, id); });
  }

  artigos() {
    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.drop_artigos = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_artigos.push({ label: 'Sel. Referência', value: "" });
          for (var x in response) {
            this.drop_artigos.push({ value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1 });
          }

          this.drop_artigos = this.drop_artigos.slice();


        }

      }, error => { console.log(error); });

  }

  carregaaccoes(inicia, id, countinua = true) {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("A").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();
        if (countinua) this.carregaUtilizadores(inicia, id)

      },
      error => { console.log(error); if (countinua) this.carregaUtilizadores(inicia, id) });
  }

  carregaUtilizadores(inicia, id) {
    this.drop_utilizadores = [];
    this.drop_utilizadores2 = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores2.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR });
          this.drop_utilizadores2.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email });
        }
        grupo.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));

        this.drop_utilizadores.push({ label: "Utilizadores", itens: grupo });

        //this.drop_utilizadores = this.drop_utilizadores.slice();
        this.drop_utilizadores2 = this.drop_utilizadores2.slice();
        this.carregasectores();
        if (inicia) this.inicia(id);
      },
      error => { console.log(error); this.carregasectores(); if (inicia) this.inicia(id); });
  }

  carregasectores() {
    this.RHSECTORESService.getAll().subscribe(
      response => {
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x][0].des_SECTOR, value: "s" + response[x][0].cod_SECTOR });
        }
        grupo.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));

        this.drop_utilizadores.push({ label: "Sectores", itens: grupo });

        this.drop_utilizadores = this.drop_utilizadores.slice();
      },
      error => { console.log(error); });
  }

  inicia(id) {
    this.PRAMOSTRASCABService.getById(id).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {
            this.amostra = response[x][0];
            this.id_AMOSTRA = response[x][0].id_AMOSTRA;
            this.data_LANCAMENTO = (response[x][0].data_LANCAMENTO == null) ? "" : this.formatDate(response[x][0].data_LANCAMENTO);
            this.id_LINHA = response[x][0].id_LINHA;
            this.descricao = response[x][0].descricao;
            this.referencia = response[x][0].referencia;
            this.estado = (response[x][0].estado);
            this.quant_BARRAS = response[x][0].quant_BARRAS;
            this.id_TIPOLOGIA_ENSAIO = response[x][0].id_TIPOLOGIA_ENSAIO;
            this.indice = response[x][0].indice;
            this.estado_texto = this.getestado(response[x][0].estado);
            this.utilizador = response[x][1];
            this.data_CRIA = this.formatDate(response[x][0].data_CRIA);
            this.hora_CRIA = new Date(response[x][0].data_CRIA).toLocaleTimeString().slice(0, 5);
            this.data_FIM = (response[x][0].data_FIM == null) ? "" : this.formatDate(response[x][0].data_FIM);
            this.ref_descricao = response[x][0].referencia + " - " + response[x][0].descricao;
            this.id_LINHA = (response[x][0].id_LINHA == null) ? null : this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
            this.cor_linha = (response[x][0].id_LINHA == null) ? null : this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value.cor;


            this.unidade = response[x][0].unidade;
            this.ofnum = response[x][0].ofnum;
            //if (response[x][0].referencia != null) this.referencia_campo = this.drop_artigos.find(item => item.value == response[x][0].referencia);
            if (response[x][0].referencia != null) this.referencia_campo = { value: response[x][0].referencia, label: response[x][0].referencia + " - " + response[x][0].descricao, DESIGN: response[x][0].descricao };

          }

          //if (this.estado == 'A') this.globalVar.setdisApagar(true);
          this.carregarlinhas(id);
        }
      }, error => { console.log(error); });
  }


  verificaOFNUM() {
    this.validaloading = true;
    this.PRAMOSTRASCABService.verificaOFNUM(this.ofnum).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            var artigo = this.drop_artigos.find(item => item.value == response[x].PROREF);
            this.referencia = response[x].PROREF;
            this.descricao = (artigo) ? artigo.descricao : "";
            this.ref_descricao = this.referencia + " - " + this.descricao;
            this.data_LANCAMENTO = response[x].DATCRE;
            this.data_FIM = response[x].OFDATFP;
            this.quant_BARRAS = response[x].QUANTIDADE;
          }

          this.validaloading = false;
          this.errovalida = "";

        } else {
          this.validaloading = false;
          this.errovalida = "Número OF não foi encontrada ou já se encontra fechada!";
          this.displayvalidacao = true;
        }
      }, error => {
        this.validaloading = false;
        this.errovalida = "Número OF não foi encontrada ou já se encontra fechada!";
        this.displayvalidacao = true;
        console.log(error);
      });

  }

  carregarlinhas(id) {
    this.PRAMOSTRASACCOESService.getById2(id).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {

            var accao = null;
            if (this.drop_accoes.find(item => item.value == response[x][0].id_ACCAO)) {
              accao = this.drop_accoes.find(item => item.value == response[x][0].id_ACCAO).label
            }
            this.tabelaaccoes.push({
              data: response[x][0],
              justificacao_RESPONSAVEL: null, justificacao_DATA_FIM: null,
              id_AMOSTRA_ACCAO: response[x][0].id_AMOSTRA_ACCAO, id_ACCAO: response[x][0].id_ACCAO, responsavel: response[x][0].tipo_RESPONSAVEL + response[x][0].responsavel,
              tipo_RESPONSAVEL: response[x][0].tipo_RESPONSAVEL, data_ACCAO: (response[x][0].data_ACCAO == null) ? "" : this.formatDate(response[x][0].data_ACCAO)
              , hora_ACCAO: response[x][0].hora_ACCAO, id_AMOSTRA: response[x][0].id_AMOSTRA, descricao: accao,
              id_TAREFA: response[x][2], estado: response[x][1], estado_texto: this.geEstado(response[x][1])
            });

          }

          this.tabelaaccoes = this.tabelaaccoes.slice();
        }
      }, error => { console.log(error); });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    } else {
      this.cor_linha = "";
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

  getestado(valor) {
    if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/Realizado"
    } else if (valor == "V") {
      return "Aprovado/Fechado"
    } else if (valor == "C") {
      return "Controlado/Verificado"
    } else if (valor == "A") {
      return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    }
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


  gravar() {
    var amostra = new PR_AMOSTRAS_CAB;
    if (!this.novo) amostra = this.amostra;

    if (this.id_LINHA != null) amostra.id_LINHA = this.id_LINHA.id;

    amostra.unidade = this.unidade;
    amostra.ofnum = this.ofnum;



    amostra.data_FIM = this.data_FIM;
    amostra.data_LANCAMENTO = this.data_LANCAMENTO;
    amostra.data_MODIF = new Date();
    amostra.utz_MODIF = this.user;

    amostra.descricao = this.descricao;
    amostra.indice = this.indice;
    amostra.referencia = this.referencia;
    amostra.quant_BARRAS = this.quant_BARRAS;
    amostra.id_TIPOLOGIA_ENSAIO = this.id_TIPOLOGIA_ENSAIO;
    amostra.estado = this.estado;
    if (this.novo) {
      amostra.estado = "P";
      amostra.data_CRIA = new Date();
      amostra.utz_CRIA = this.user;
      amostra.ativo = true;
      this.PRAMOSTRASCABService.create(amostra).subscribe(
        response => {
          this.gravalinhas(response.id_AMOSTRA);
        }, error => { console.log(error); });
    } else {
      this.PRAMOSTRASCABService.update(amostra).then(
        response => {
          this.gravalinhas(amostra.id_AMOSTRA);
        }, error => { console.log(error); });
    }



  }


  gravalinhas(id) {
    for (var x in this.tabelaaccoes) {
      var accoes = new PR_AMOSTRAS_ACCOES;
      var accoesold = new PR_AMOSTRAS_ACCOES;
      var novo = false;

      if (this.tabelaaccoes[x].id_AMOSTRA_ACCAO != null) {
        accoes = this.tabelaaccoes[x].data;
        accoesold = JSON.parse(JSON.stringify(accoes));
      } else {
        novo = true;
      }

      accoes.id_AMOSTRA = id;


      var id_resp = this.tabelaaccoes[x].responsavel;
      var tipo = "";
      if (this.tabelaaccoes[x].responsavel != null && this.tabelaaccoes[x].responsavel.charAt(0) == 'u' || this.tabelaaccoes[x].responsavel.charAt(0) == 's') {
        tipo = this.tabelaaccoes[x].responsavel.charAt(0);
        id_resp = this.tabelaaccoes[x].responsavel.substr(1);
      }


      accoes.id_AMOSTRA_ACCAO = this.tabelaaccoes[x].id_AMOSTRA_ACCAO;
      accoes.data_ACCAO = this.tabelaaccoes[x].data_ACCAO;
      accoes.hora_ACCAO = (this.tabelaaccoes[x].hora_ACCAO == null) ? null : (this.tabelaaccoes[x].hora_ACCAO + ":00").slice(0, 8);;
      accoes.id_ACCAO = this.tabelaaccoes[x].id_ACCAO;
      accoes.tipo_RESPONSAVEL = tipo;
      accoes.responsavel = id_resp;
      var novo = false;
      if (accoes.id_AMOSTRA_ACCAO == null) novo = true;
      var email_p = "";

      if (tipo == "u") {
        var utz = this.drop_utilizadores2.find(item => item.value == id_resp);
        if (utz) email_p = utz.email;
      }




      var atualizou_datas = false;

      if (new Date(this.formatDate(accoesold.data_ACCAO) + ' ' + accoesold.hora_ACCAO).getTime() != new Date(this.formatDate(this.tabelaaccoes[x].data_ACCAO) + ' ' + this.tabelaaccoes[x].hora_ACCAO).getTime()) {
        atualizou_datas = true;
      }

      var id_resp_old = null;
      var atualizou_responsavel = false;

      id_resp_old = accoesold.responsavel;
      if (accoesold.tipo_RESPONSAVEL + accoesold.responsavel != this.tabelaaccoes[x].responsavel) {
        atualizou_responsavel = true;
      }

      /*console.log('atualizou_responsavel', atualizou_responsavel)
      console.log('ccoesold.tipo_RESPONSAVEL + accoesold.responsavel', accoesold.tipo_RESPONSAVEL + accoesold.responsavel)
      console.log('this.tabelaaccoesimediatas[x].responsavel', this.tabelaaccoesimediatas[x].responsavel)
      console.log('atualizou_datas', atualizou_datas)
      console.log('this.formatDate2(accoesold.data_PREVISTA)', this.formatDate2(accoesold.data_PREVISTA))
      console.log('this.formatDate2(this.tabelaaccoesimediatas[x].data_PREVISTA)', this.formatDate2(this.tabelaaccoesimediatas[x].data_PREVISTA))*/

      if (!novo) {
        this.alterardadosTarefa(atualizou_datas, atualizou_responsavel, accoesold.id_AMOSTRA_ACCAO, id_resp, accoesold.tipo_RESPONSAVEL + accoesold.responsavel,
          this.tabelaaccoes[x].descricao,
          this.tabelaaccoes[x].data_ACCAO, this.tabelaaccoes[x].hora_ACCAO, this.tabelaaccoes[x].justificacao_DATA_FIM,
          this.tabelaaccoes[x].justificacao_RESPONSAVEL);
      }
      if (accoes.id_AMOSTRA != null && accoes.responsavel != null) this.savelinhas(accoes, novo, this.tabelaaccoes[x].descricao, email_p, id);

    }

    if (this.novo) {
      this.simular(this.inputnotifi);
      this.router.navigate(['/producao/amostras/editar'], { queryParams: { id: id } });
    } else {
      this.simular(this.inputgravou);
      this.router.navigate(['/producao/amostras/view'], { queryParams: { id: id } });
    }

  }

  savelinhas(accoes, novo, nome_accao, email_p, id) {
    this.PRAMOSTRASACCOESService.update(accoes).subscribe(
      response => {
        if (novo) {
          var tarefa = new GT_MOV_TAREFAS;
          tarefa.id_MODULO = 10;
          tarefa.id_CAMPO = response.id_AMOSTRA_ACCAO;
          tarefa.data_FIM = new Date(this.formatDate(response.data_ACCAO) + ' ' + response.hora_ACCAO);
          tarefa.data_INICIO = new Date(this.formatDate(response.data_ACCAO) + ' ' + response.hora_ACCAO);
          tarefa.data_CRIA = new Date();
          tarefa.utz_CRIA = this.user;
          tarefa.data_ULT_MODIF = new Date();
          tarefa.utz_ULT_MODIF = this.user;
          tarefa.estado = 'P';
          tarefa.inativo = false;
          tarefa.utz_ID = accoes.responsavel;
          tarefa.utz_TIPO = accoes.tipo_RESPONSAVEL;
          tarefa.id_ACCAO = accoes.id_ACCAO;
          tarefa.sub_MODULO = "A";
          tarefa.prioridade = 3;
          tarefa.data_FIM_ANTIGA = tarefa.data_FIM;

          this.criarTarefa(tarefa, nome_accao, email_p, id);
        }
      }, error => { console.log(error); });
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        var amostra = new PR_AMOSTRAS_CAB;

        if (!this.novo) amostra = this.amostra;
        amostra.ativo = false;
        amostra.data_ANULA = new Date();
        amostra.utz_ANULA = this.user;
        amostra.estado = 'A';

        this.PRAMOSTRASCABService.update(amostra).then(
          res => {
            this.estadosaccoes(id);
            this.simular(this.inputapagar)

            this.router.navigate(['producao/amostras']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  estadosaccoes(id) {
    this.PRAMOSTRASCABService.updatePR_AMOSTRAS_CAB_EVENTOS(id, this.user).subscribe(
      res => {

      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  alteraRef(event) {
    this.descricao = (this.drop_artigos.find(item => item.value == event.value)) ? this.drop_artigos.find(item => item.value == event.value).descricao : "";
  }

  adicionar_linha() {
    this.tabelaaccoes.push({
      id_AMOSTRA_ACCAO: null, id_ACCAO: null, responsavel: null, tipo_RESPONSAVEL: null, data_ACCAO: null, hora_ACCAO: "00:00:00", id_AMOSTRA: null, descricao: ""
    });
    this.tabelaaccoes = this.tabelaaccoes.slice();
  }


  apagar_linha(index) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar a linha?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var tab = this.tabelaaccoes[index];
        if (tab.id_AMOSTRA_ACCAO == null) {
          this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));
        } else {
          this.PRAMOSTRASACCOESService.delete(tab.id_AMOSTRA_ACCAO).then(
            res => {
              //atualizaestadoTarefa(tab.id_AMOSTRA_ACCAO,'A');
              this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));

            },
            error => { console.log(error); this.simular(this.inputerro); });
        }
      }
    });

  }

  nomeACCAO(event) {
    var id = event.value;
    var data = this.drop_accoes.find(item => item.value == id);
    var nome = "---";

    if (data) {
      nome = data.label;
    }
    return nome;
  }

  //devolve nome responsavel
  getResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores2.find(item => item.value == id);
    if (id != null && id.toString().includes("u")) {
      var utz2 = this.drop_utilizadores.find(item => item.label == "Utilizadores").itens;
      utz = utz2.find(item => item.value == id);
    } else if (id != null && id.toString().includes("s")) {
      if (this.drop_utilizadores.find(item => item.label == "Sectores")) {
        var utz2 = this.drop_utilizadores.find(item => item.label == "Sectores").itens;
        utz = utz2.find(item => item.value == id);
      }
    }
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  /* ADICIONAR ACÇÕES*/
  //abre popup para adicionar acções
  showDialogToAdd() {
    //this.novo = true;
    this.id_selected = 0;
    this.descricaoeng = "";
    this.descricaopt = "";
    this.descricaofr = "";
    this.displayAddAccao = true;
  }


  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "A";
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    ACCOES_RECLAMACAO.utz_CRIA = this.user;
    ACCOES_RECLAMACAO.data_CRIA = new Date();
    this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
      this.carregaaccoes(0, false, false);
      this.displayAddAccao = false;
      this.simular(this.inputgravou);
    },
      error => { console.log(error); this.simular(this.inputerro); });

  }

  criarTarefa(tarefa, nome_accao, email_p, id) {

    this.GTMOVTAREFASService.create(tarefa).subscribe(response => {

      var logs = new GT_LOGS;
      logs.id_TAREFA = response.id_TAREFA;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.descricao = "Adicionada nova Tarefa";
      this.criaLogs(logs);
      var email_para = email_p;
      this.enviarEvento(response.data_INICIO, response.id_TAREFA, "Ao Criar Tarefa", email_para, this.referencia + ' - ' + this.descricao, id /*response.id_CAMPO*/
        , this.data_LANCAMENTO, nome_accao);

    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  criaLogs(log) {
    this.GTMOVTAREFASService.createLOGS(log).subscribe(response => {
    }, error => {
      console.log(error);

    });
  }

  enviarEvento(data_tarefa, numero_tarefa, MOMENTO, email_para, referencia, numero_amostra, data_lancamento, accao) {


    var dados = "{link::" + webUrl.host + '/#/tarefas/view?id=' + numero_tarefa + "\n/numero_amostra::"
      + numero_amostra + "\n/data_lancamento::" + this.formatDate(data_lancamento) + ""
      + "\n/referencia::" + referencia + "" + "\n/numero_tarefa::" + numero_tarefa + "\n/accao::"
      + accao + "\n/data_tarefa::" + this.formatDate(data_tarefa) + " " + new Date(data_tarefa).toLocaleTimeString().slice(0, 5) + "}";


    var data = [{ MODULO: 10, MOMENTO: MOMENTO, PAGINA: "Amostras", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }


  atualizaestadoTarefa(id, estado) {

    this.GTMOVTAREFASService.getbyids(id, 10, "A").subscribe(response => {

      var count = Object.keys(response).length;
      if (count > 0) {
        var tarefa = new GT_MOV_TAREFAS;
        tarefa = response[0]

        var data_logs = [];


        if (tarefa.estado != estado) {
          data_logs.push({ descricao: "Alterado Estado de " + this.geEstado(tarefa.utz_ENCAMINHADO) + " para " + this.geEstado(estado) })
        }

        tarefa.estado = estado;
        if (estado == "C") {
          tarefa.utz_CONCLUSAO = this.user;
          tarefa.data_CONCLUSAO = new Date();
        } else if (estado == "A") {
          tarefa.utz_ANULACAO = this.user;
          tarefa.data_ANULACAO = new Date();
        }


        this.GTMOVTAREFASService.update(tarefa).subscribe(response => {
          for (var x in data_logs) {
            var logs = new GT_LOGS;
            logs.id_TAREFA = id;
            logs.utz_CRIA = this.user;
            logs.data_CRIA = new Date();
            logs.descricao = data_logs[x].descricao;
            this.criaLogs(logs);
          }


        }, error => {
          console.log(error);

        });
      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  limpadados() {
    this.ref_descricao = "";
    this.referencia = null;
    this.id_LINHA = null;
    this.referencia_campo = null;
    this.ofnum = null;
  }

  geEstado(estado) {
    var estados = "";
    switch (estado) {
      case 'P':
        estados = "Pendente";
        break;
      case 'L':
        estados = "Lida";
        break;
      case 'E':
        estados = "Em Curso";
        break;
      case 'C':
        estados = "Desenvolvida/ Realizada";
        break;
      case 'A':
        estados = "Cancelada";
        break;
      case 'R':
        estados = "Rejeitada";
        break;
      case 'N':
        estados = "Não Respondida";
        break;
      case 'F':
        estados = "Aprovada";
        break;
      case 'V':
        estados = "Controlada/ Verificada";
        break;
      default:
        estados = "Pendente";
    }
    return estados;
  }

  filterRef(event) {

    this.filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.drop_artigos) {
      let ref = this.drop_artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.drop_artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    //this.numero_PESSOA = event.value;
    //this.nome_PESSOA = event.nome;
  }

  filterSelect(event) {
    //this.referencia_campo = event.label;
    this.referencia = event.value;
    this.descricao = event.descricao;
  }

  //devolve email responsavel
  getEmailResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores2.find(item => item.value == id);
    if (id != null && id.toString().includes("u")) {
      var utz2 = this.drop_utilizadores.find(item => item.label == "Utilizadores").itens;
      utz = utz2.find(item => item.value == id);
    } else if (id != null && id.toString().includes("g")) {
      var utz2 = this.drop_utilizadores.find(item => item.label == "Grupos").itens;
      utz = utz2.find(item => item.value == id);
    }
    var email = null;
    if (utz) {
      email = utz.email;
    }
    return email;
  }


  alterardadosTarefa(atualizou_datas, atualizou_responsavel, id, responsavel, responsavel_anterior, nome_accao, data_ACCAO, hora_ACCAO, justificacao_DATA_FIM, justificacao_RESPONSAVEL) {


    var email_p = this.getEmailResponsavel(responsavel);

    if (atualizou_datas) {

      var tarefa = new GT_MOV_TAREFAS;
      tarefa.id_MODULO = 10;
      tarefa.sub_MODULO = "A";
      tarefa.id_CAMPO = id;
      tarefa.data_ULT_MODIF = new Date();
      tarefa.utz_ULT_MODIF = this.user;
      tarefa.data_FIM = new Date(this.formatDate(data_ACCAO) + ' ' + hora_ACCAO);;
      tarefa.justificacao_DATA_FIM = justificacao_DATA_FIM;
      var logs = new GT_LOGS;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.descricao = "Alterou Prazo Conclusão";
      logs.justificacao = justificacao_DATA_FIM;
      var email_para = email_p;
      this.atualizaTarefa(tarefa, logs, true, email_para, nome_accao, data_ACCAO, "Ao Alterar Data Objetivo", id);
    }

    if (atualizou_responsavel) {
      var tarefa = new GT_MOV_TAREFAS;
      tarefa.id_MODULO = 10;
      tarefa.sub_MODULO = "A";
      tarefa.id_CAMPO = id;
      tarefa.utz_ID = responsavel;
      tarefa.data_ULT_MODIF = new Date();
      tarefa.utz_ULT_MODIF = this.user;
      tarefa.justificacao_RESPONSAVEL = justificacao_RESPONSAVEL;

      var logs = new GT_LOGS;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.justificacao = justificacao_RESPONSAVEL;
      var nome1 = this.getResponsavel(responsavel_anterior);
      var nome2 = this.getResponsavel(responsavel);
      var email_para = email_p;

      logs.descricao = "Alterado Responsável de " + nome1 + " para " + nome2;
      this.atualizaTarefa(tarefa, logs, true, email_para, nome_accao, data_ACCAO, "Ao Alterar Responsável", id);
    }
  }

  atualizaTarefa(tarefa, logs, enviarEvento, email_para, nome_accao, data_prevista, MOMENTO, id) {

    this.GTMOVTAREFASService.atualizaTAREFA(tarefa).subscribe(response => {
      logs.id_TAREFA = response[0][0];
      this.criaLogs(logs);
      if (enviarEvento) {
        //Ao Alterar Responsável
        //Ao Alterar Data Objetivo
        this.enviarEvento(response[0][1], response[0][0], MOMENTO, email_para, this.referencia + ' - ' + this.descricao, id /*response.id_CAMPO*/
          , this.data_LANCAMENTO, nome_accao);

      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  verificadatas(row) {
    console.log(row)
    if (row.estado != 'E') {
      if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
      }

      this.yearTimeout = setTimeout(() => {
        var accoes = new PR_AMOSTRAS_ACCOES;
        var atualizou_datas = false;
        this.selected_row = null;
        this.justificacao_DATA_FIM = null;
        if (row.id_AMOSTRA_ACCAO != null && row.id_TAREFA != null && row.justificacao_DATA_FIM == null) {
          accoes = row.data;

          if (new Date(this.formatDate(accoes.data_ACCAO) + ' ' + accoes.hora_ACCAO).getTime() != new Date(this.formatDate(row.data_ACCAO) + ' ' + row.hora_ACCAO).getTime()) {
            atualizou_datas = true;
          }
        }
        if (atualizou_datas) {
          this.selected_row = row;
          this.displayJustificacaoDATAFIM = true;
        }

        // console.log('atualizou_datas ', atualizou_datas)
      }, 1000);
    }
  }


  verificaResponsavel(row, event) {
    if (row.estado != 'E') {
      if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
      }

      this.yearTimeout = setTimeout(() => {
        var accoes = new PR_AMOSTRAS_ACCOES;
        var atualizou_responsavel = false;
        this.selected_row = null;
        this.justificacao_DATA_FIM = null;

        if (row.id_AMOSTRA_ACCAO != null && event.target.value != '' && event.target.value != null && row.justificacao_RESPONSAVEL == null) {
          accoes = row.data;
          if (accoes.responsavel != row.responsavel) {
            atualizou_responsavel = true;
          }
        }
        if (atualizou_responsavel) {
          this.selected_row = row;
          this.yearTimeout = setTimeout(() => {
            this.displayJustificacaoRESPONSAVEL = true;
          }, 100);

        }

        // console.log('atualizou_datas ', atualizou_datas)
      }, 1000);
    }

  }

  onHide() {
    if (this.justificacao_DATA_FIM == null && this.selected_row != null) {
      var accoes = new PR_AMOSTRAS_ACCOES;
      accoes = this.selected_row.data;
      this.selected_row.data_ACCAO = this.formatDate(accoes.data_ACCAO);
      this.selected_row.hora_ACCAO = accoes.hora_ACCAO;
    }
  }

  onHideJustificacaoRESPONSAVEL() {
    if (this.justificacao_RESPONSAVEL == null && this.selected_row != null) {
      var accoes = new PR_AMOSTRAS_ACCOES;
      accoes = this.selected_row.data;
      this.selected_row.responsavel = accoes.responsavel;
    }
  }

  atualizarlinhajustificacao_DATA_FIM() {
    this.selected_row.justificacao_DATA_FIM = this.justificacao_DATA_FIM;
    this.displayJustificacaoDATAFIM = false;
  }


  atualizarlinhajustificacao_RESPONSAVEL() {
    this.selected_row.justificacao_RESPONSAVEL = this.justificacao_RESPONSAVEL;
    this.displayJustificacaoRESPONSAVEL = false;
  }



  IrPara(id, responsavel) {

    var id_r = null;
    if (responsavel.toString().charAt(0) == 'u') {
      id_r = responsavel.substr(1);
    }
    if (this.adminuser || this.user == this.utilizador || id_r == this.user) {
      this.router.navigateByUrl('tarefas/view?id=' + id + "&redirect=producao/amostras/viewkvk\id=" + this.id_AMOSTRA);
    }
  }
}
