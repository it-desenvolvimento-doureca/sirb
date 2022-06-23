import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { Location } from '@angular/common';
import { GERSECCAOService } from 'app/servicos/ger-seccao.service';
import { QUADERROGACOESService } from 'app/servicos/qua-derrogacoes.service';
import { QUA_DERROGACOES } from 'app/entidades/QUA_DERROGACOES';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { UploadService } from 'app/servicos/upload.service';
import { QUA_DERROGACOES_FICHEIROS } from 'app/entidades/QUA_DERROGACOES_FICHEIROS';
import { QUADERROGACOESFICHEIROSService } from 'app/servicos/qua-derrogacoes-ficheiros.service';
import { QUADERROGACOESACOESService } from 'app/servicos/qua-derrogacoes-acoes.service';
import { GT_LOGS } from 'app/entidades/GT_LOGS';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { GT_MOV_TAREFAS } from 'app/entidades/GT_MOV_TAREFAS';
import { QUA_DERROGACOES_PLANOS_ACCOES } from 'app/entidades/QUA_DERROGACOES_PLANOS_ACCOES';
import { QUADERROGACOESPLANOSACCOESService } from 'app/servicos/qua-derrogacoes-planos-accoes.service';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { GERGRUPOService } from 'app/servicos/ger-grupo.service';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { QUADERROGACOESEQUIPAService } from 'app/servicos/qua-derrogacoes-equipa.service';
import { QUA_DERROGACOES_EQUIPA } from 'app/entidades/QUA_DERROGACOES_EQUIPA';

@Component({
  selector: 'app-derrogacoes-form',
  templateUrl: './derrogacoes-form.component.html',
  styleUrls: ['./derrogacoes-form.component.css']
})
export class DerrogacoesFormComponent implements OnInit {
  modoedicao = false;
  drop_cliente = [];
  drop_referencia = [];
  drop_utilizadores = [];
  display: boolean = false;
  displayverificar = false;
  data_CRIA;
  utz_CRIA;
  cliente;
  morada_CLIENTE;
  referencia;
  designacao_REF;
  familia_REF;
  user: any;
  novo: boolean;
  displayLoading = false;
  errovalida;
  mensagem_verifica;
  displayvalidacao;
  uploadedFiles: any[] = [];
  campo_x: any;

  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditar2') alteraeditar2: ElementRef;
  @ViewChild('alteracancelar') alteracancelar: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;

  hora_CRIA: string;

  user_nome: any;
  adminuser: any;
  drop_artigos: any[] = [];
  drop_moradas = [];
  etsnum: any;
  referencia_temp: any;
  btanterior: boolean;
  btseguinte: boolean;
  btcriar: boolean;
  btapagar: boolean;
  btexportar: boolean;
  btvoltar: boolean;
  btfechar: boolean;
  btpendente: boolean;
  btEmCurso: boolean;
  bteditar: boolean;
  disEditar: boolean;
  disApagar: boolean;
  disPendente: boolean;
  disEmCurso: boolean;
  disFechar: boolean;
  disCriar: boolean;
  texto_estado: string;
  unidades = [{ value: "", label: "Sel. Unidade" }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }];
  seccoes: any[];
  drop_interna_EXTERNA = [{ value: "", label: "Selecionar" }, { value: 'I', label: "Interna" }, { value: 'E', label: "Externa" }];
  derrogacao_dados: QUA_DERROGACOES;
  id_DERROGACAO: number;
  emissor;
  estado: string;
  id_CLIENTE: number;
  interna_EXTERNA: string;
  motivo: string;
  nome_CLIENTE: string;
  qtd: number;
  setor;
  unidade;
  causa: string;
  plano_ACOES = false;
  data_INICIO: Date;
  data_FIM: Date;
  data_FECHO: Date;
  data_FECHO_texto;
  utz_FECHO: number;
  srcelement;
  nomeficheiro: any;
  type: any;
  filedescricao: any[] = [];
  tabelaaccoes: any = [];
  drop_accoes: any = [];
  id_selected: number;
  descricaoeng: string;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  drop_utilizadores2: any;
  drop_utilizadores_acoes: any[] = [];
  acessoadicionarACCAO = false;
  tabelaEquipa: any;
  displaygrupos: boolean;
  tabelagrupos: any[];
  filteredreferencias: any[];
  referencia_campo: { value: any; label: string; DESIGN: any; };

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private renderer: Renderer,
    private route: ActivatedRoute, private location: Location, private GERSECCAOService: GERSECCAOService,
    private QUADERROGACOESService: QUADERROGACOESService,
    private QUADERROGACOESFICHEIROSService: QUADERROGACOESFICHEIROSService,
    private QUADERROGACOESACOESService: QUADERROGACOESACOESService,
    private GTMOVTAREFASService: GTMOVTAREFASService,
    private QUADERROGACOESEQUIPAService: QUADERROGACOESEQUIPAService,
    private QUADERROGACOESPLANOSACCOESService: QUADERROGACOESPLANOSACCOESService,
    private GERGRUPOService: GERGRUPOService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService,
    private sanitizer: DomSanitizer, private router: Router, private UploadService: UploadService) { }

  ngOnInit() {

    this.btanterior = true;
    this.btseguinte = true;
    this.btseguinte = true;
    this.btcriar = true;
    this.btapagar = true;
    this.btexportar = true;
    this.btvoltar = true;
    this.btfechar = false;
    this.btpendente = false;
    this.bteditar = true;

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

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



      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561anular");
      this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561fechar");
      this.disPendente = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561pendente");
      this.disEmCurso = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561emcurso");
      this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561dicionarACCAO");
      //this.globalVar.setdi(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561duplicar"));
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {

        this.btapagar = true;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {

        this.btapagar = false
        this.btcriar = true;
        this.btfechar = false;
        this.btpendente = false;
        this.btEmCurso = false;
        this.novo = true;
        this.bteditar = false;
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.texto_estado = this.getESTADO('P');
        this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.btcriar = true;
      }
    }

    if (!this.novo) { this.carregaDados(true, id); }

  }

  carregaDados(inicia, id) {
    //carregar seccoes
    this.seccoes = [];
    this.GERSECCAOService.getAll().subscribe(
      response => {
        this.seccoes.push({ label: "Selecionar Setor", value: "" })
        for (var x in response) {
          this.seccoes.push({ label: response[x].descricao, value: response[x].id })
        }
        this.carregaUtilizadores(inicia, id);
        this.carregaUtilizadores_acoes(inicia, id);
      },
      error => {
        console.log(error);
        this.carregaUtilizadores(inicia, id);
        this.carregaUtilizadores_acoes(inicia, id);
      });
  }

  carregaUtilizadores(inicia, id) {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: "" });
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }

        this.drop_utilizadores = this.drop_utilizadores.slice();
        this.artigos(inicia, id);
      },
      error => { console.log(error); this.artigos(inicia, id); });
  }

  artigos(inicia, id) {

    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.drop_artigos = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          //  this.drop_artigos.push({ label: 'Sel. Ref. Comp.', value: null });
          for (var x in response) {
            this.drop_artigos.push({ value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1, FAMCOD: response[x].FAMCOD });
          }
        }
        this.clientes(inicia, id);
      }, error => { this.clientes(inicia, id); console.log(error); });

  }

  clientes(inicia, id) {
    this.ABDICCOMPONENTEService.getClientes().subscribe(
      response => {
        this.drop_cliente = [];
        this.drop_cliente.push({ label: 'Sel. Cliente.', value: "" });


        for (var x in response) {
          this.drop_cliente.push({ label: response[x].ADRNOM, value: { id: response[x].CLICOD, nome: response[x].ADRNOM } });
        }
        this.drop_cliente = this.drop_cliente.slice();

        if (inicia) this.inicia(id);
      }, error => {
        if (inicia) this.inicia(id);
        console.log(error);
      });
  }

  inicia(id) {

    this.QUADERROGACOESService.getById(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.derrogacao_dados = response[0];
          for (var x in response) {

            this.id_DERROGACAO = response[x].id_DERROGACAO;
            this.designacao_REF = response[x].designacao_REF;
            this.emissor = response[x].emissor;
            this.estado = response[x].estado;
            this.etsnum = response[x].etsnum;
            this.referencia_temp = response[x].referencia;
            this.familia_REF = response[x].familia_REF;
            this.id_CLIENTE = response[x].id_CLIENTE;
            this.interna_EXTERNA = response[x].interna_EXTERNA;
            this.morada_CLIENTE = response[x].morada_CLIENTE;
            this.motivo = response[x].motivo;
            this.nome_CLIENTE = response[x].nome_CLIENTE;
            this.qtd = response[x].qtd;
            this.referencia = response[x].referencia;
            this.setor = response[x].setor;
            this.unidade = response[x].unidade;
            this.causa = response[x].causa;
            this.plano_ACOES = response[x].plano_ACOES;
            this.data_CRIA = new Date(response[x].data_CRIA);
            this.hora_CRIA = new Date(response[x].data_CRIA).toLocaleTimeString().slice(0, 5);
            this.data_INICIO = (response[x].data_INICIO == null) ? null : new Date(response[x].data_INICIO);
            this.data_FIM = (response[x].data_FIM == null) ? null : new Date(response[x].data_FIM);
            this.utz_CRIA = response[x].utz_CRIA;
            this.data_FECHO = response[x].data_FECHO;
            this.utz_FECHO = response[x].utz_FECHO;
            this.data_FECHO_texto = (response[x].data_FECHO == null) ? null : this.formatDate2(response[x].data_FECHO);

            if (response[x].referencia != null && response[x].id_CLIENTE == null) {
              this.referencia_campo = { value: response[x].referencia, label: response[x].referencia + " - " + response[x].designacao_REF, DESIGN: response[x].designacao_REF };
            }


            this.cliente = this.drop_cliente.find(item => item.value.id == response[x].id_CLIENTE).value;


            this.texto_estado = this.getESTADO(this.estado);

            if (this.estado == 'A') {
              this.btapagar = false;
              this.btfechar = false;
              this.btpendente = false;
              this.btEmCurso = false;
              this.bteditar = false;
            }

            if (this.estado == 'U') {
              this.btpendente = true;
              this.btEmCurso = false;
              this.btfechar = false;
            }
            if (this.estado == 'P') {
              this.btEmCurso = true;
              this.btpendente = false;
            }

            if (this.estado == 'E') {
              this.btfechar = true;
              this.btEmCurso = false;
              this.btpendente = false;
            }

            if (this.estado == 'P' || this.estado == 'E') {
              this.bteditar = true;
            } else {
              this.bteditar = false;
            }

          }

          this.getMoradas(this.cliente.id, true);
          this.getArtigos(this.etsnum, true);
          this.carregatabelaFiles(id);
          this.carregatabelasaccoes(id);
          this.carregatabelaEquipa(id);
        }

      }, error => { console.log(error); })

  }

  getResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores.find(item => item.value == id);
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  alteraReferencia(event) {
    this.designacao_REF = "";
    if (this.referencia != null && this.referencia != "") {
      this.designacao_REF = this.referencia.design;
      this.familia_REF = this.referencia.FAMCOD;
    }
  }

  //formatar a data para yyyymmddhhmmsss
  formatDate() {
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

  //formatar a data para yyyy-mm-dd
  formatDate2(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  gravar() {
    //this.displayLoading = true;
    var derrogacao = new QUA_DERROGACOES;

    if (!this.novo) derrogacao = this.derrogacao_dados;

    derrogacao.data_INICIO = this.data_INICIO;
    derrogacao.data_FIM = this.data_FIM;
    derrogacao.designacao_REF = this.designacao_REF;
    derrogacao.emissor = this.emissor;


    derrogacao.familia_REF = this.familia_REF;

    derrogacao.interna_EXTERNA = this.interna_EXTERNA;
    /*derrogacao.id_CLIENTE = this.id_CLIENTE;
    derrogacao.morada_CLIENTE = this.morada_CLIENTE;
    derrogacao.nome_CLIENTE = this.nome_CLIENTE;
    derrogacao.etsnum = this.etsnum;*/
    derrogacao.id_CLIENTE = this.cliente.id;
    derrogacao.nome_CLIENTE = this.cliente.nome;
    derrogacao.morada_CLIENTE = this.morada_CLIENTE.nome;
    derrogacao.etsnum = this.morada_CLIENTE.id;

    derrogacao.motivo = this.motivo;
    derrogacao.qtd = this.qtd;
    derrogacao.referencia = this.referencia.valor;
    derrogacao.setor = this.setor;
    derrogacao.unidade = this.unidade;
    derrogacao.causa = this.causa;
    derrogacao.plano_ACOES = this.plano_ACOES;

    derrogacao.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    derrogacao.utz_CRIA = this.utz_CRIA;
    derrogacao.utz_ULT_MODIF = this.user;
    derrogacao.data_ULT_MODIF = new Date();

    if (this.novo) {
      derrogacao.estado = "P";
      this.QUADERROGACOESService.create(derrogacao).subscribe(
        res => {
          this.gravarTabelaFicheiros(res.id_DERROGACAO);
          this.gravarTabelaEquipa(res.id_DERROGACAO);
          //this.router.navigate(['derrogacoes/editar'], { queryParams: { id: res.id_DERROGACAO } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      derrogacao.id_DERROGACAO = id;
      //console.log(reclamacao)
      this.QUADERROGACOESService.update(derrogacao).subscribe(
        res => {
          this.gravarTabelaAccoes(id);
          this.gravarTabelaEquipa(id);
          //this.router.navigate(['derrogacoes/view'], { queryParams: { id: id } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    }
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

  //popup apagar
  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende anular?',
      header: 'Anular Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_ANULACAO = this.user;
        derrogacao.data_ANULACAO = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "A";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {
            this.QUADERROGACOESService.atualizaestadosaccoes(derrogacao.id_DERROGACAO, 5).subscribe(
              res => { }, error => { console.log(error); });

            var email_para = [];
            for (var x in this.tabelaEquipa) {

              if (this.tabelaEquipa[x].responsavel != null && this.tabelaEquipa[x].responsavel != "") {

                if (/*this.tabelaEquipa[x].id == null && */this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
                  email_para.push(this.tabelaEquipa[x].email);
              }
            }
            this.enviarEventoResponsaveis(derrogacao.data_INICIO, derrogacao.data_FIM, derrogacao.id_DERROGACAO, derrogacao.nome_CLIENTE, derrogacao.referencia + " - " + derrogacao.designacao_REF,
              "Ao Alterar Estado Derrogação", email_para.toString(), derrogacao.motivo, derrogacao.causa, this.getESTADO(derrogacao.estado));



            this.router.navigate(['derrogacoes']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  //popup fechar
  fechar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende validar?',
      header: 'Validar Confirmação',
      icon: 'fa fa-close',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_FECHO = this.user;
        derrogacao.data_FECHO = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "V";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {

            var email_para = [];
            for (var x in this.tabelaEquipa) {

              if (this.tabelaEquipa[x].responsavel != null && this.tabelaEquipa[x].responsavel != "") {

                if (/*this.tabelaEquipa[x].id == null &&*/ this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
                  email_para.push(this.tabelaEquipa[x].email);
              }
            }
            this.enviarEventoResponsaveis(derrogacao.data_INICIO, derrogacao.data_FIM, derrogacao.id_DERROGACAO, derrogacao.nome_CLIENTE, derrogacao.referencia + " - " + derrogacao.designacao_REF,
              "Ao Alterar Estado Derrogação", email_para.toString(), derrogacao.motivo, derrogacao.causa, this.getESTADO(derrogacao.estado));


            this.router.navigate(['derrogacoes']);
            this.simular(this.inputgravou);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  //popup pendente
  pendente() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende passar o estado para Pendente?',
      header: 'Validar Confirmação',
      icon: 'fa fa-close',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_ULT_MODIF = this.user;
        derrogacao.data_ULT_MODIF = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "P";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {
            this.inicia(this.id_DERROGACAO);
            //this.router.navigate(['derrogacoes']);
            this.simular(this.inputgravou);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }



  //popup emcurso
  emCurso() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende passar o estado para Em Curso?',
      header: 'Validar Confirmação',
      icon: 'fa fa-close',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_ULT_MODIF = this.user;
        derrogacao.data_ULT_MODIF = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "E";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {

            var email_para = [];
            for (var x in this.tabelaEquipa) {

              if (this.tabelaEquipa[x].responsavel != null && this.tabelaEquipa[x].responsavel != "") {

                if (/*this.tabelaEquipa[x].id == null &&*/ this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
                  email_para.push(this.tabelaEquipa[x].email);
              }
            }
            this.enviarEventoResponsaveis(derrogacao.data_INICIO, derrogacao.data_FIM, derrogacao.id_DERROGACAO, derrogacao.nome_CLIENTE, derrogacao.referencia + " - " + derrogacao.designacao_REF,
              "Ao Alterar Estado Derrogação", email_para.toString(), derrogacao.motivo, derrogacao.causa, this.getESTADO(derrogacao.estado));

            this.inicia(this.id_DERROGACAO);
            //this.router.navigate(['derrogacoes']);
            this.simular(this.inputgravou);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  //ao alterar cliente atualiza morada
  getMoradas(event, mor = false) {
    if ((this.morada_CLIENTE == null || this.morada_CLIENTE == 0 || this.morada_CLIENTE == "") || !mor) {
      this.drop_moradas = [];
      this.drop_referencia = [];
      this.morada_CLIENTE = "";
      this.referencia = "";
      this.designacao_REF = "";
      if (!mor) this.familia_REF = "";

      this.ABDICCOMPONENTEService.getMoradas(event).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            this.drop_moradas.push({ label: 'Sel. Morada', value: "" });
            for (var x in response) {
              this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
            }
            this.drop_moradas = this.drop_moradas.slice();
            if (mor) this.morada_CLIENTE = this.drop_moradas.find(item => item.value.id == this.etsnum).value;
          } else {
            this.drop_moradas.push({ label: 'Sem Moradas para o Cliente Selecionado', value: 0 });
            this.morada_CLIENTE = 0;
          }
        }, error => {
          console.log(error);
        });
    }
  }

  //ao alterar moradas atualiza artigos
  getArtigos(event, ref = false) {
    if ((this.referencia == null || this.referencia == 0 || this.referencia == "") || !ref) {
      if (!ref) {
        this.designacao_REF = "";
        this.familia_REF = "";
      }

      this.ABDICCOMPONENTEService.getComponentesdoCliente(this.cliente.id, event).subscribe(
        response => {
          this.drop_referencia = [];
          var count = Object.keys(response).length;
          if (count > 0) {
            this.drop_referencia.push({ label: 'Sel. Ref. Comp.', value: "" });
            for (var x in response) {
              this.drop_referencia.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: { valor: response[x].PROREF, design: response[x].PRODES1, FAMCOD: response[x].FAMCOD } });
            }
            this.drop_referencia = this.drop_referencia.slice();

            if (ref) {
              this.referencia = this.drop_referencia.find(item => item.value.valor == this.referencia_temp).value;
              this.designacao_REF = this.referencia.design;
              if (this.referencia.FAMCOD != null && this.referencia.FAMCOD != "") this.familia_REF = this.referencia.FAMCOD;
            }
          } else {
            this.drop_referencia.push({ label: 'Sem Artigos para a Morada Selecionada', value: 0 });
            this.referencia = 0;
          }
        }, error => {
          console.log(error);
        });
    } else {

    }
  }

  btgravar() {

  }

  getESTADO(estado) {
    if (estado == "P") {
      return "Pendente";
    } else if (estado == "E") {
      return "Em Curso";
    } else if (estado == "V") {
      return "Validado";
    } else if (estado == "U") {
      return "Expirado";
    } else if (estado == "A") {
      return "Anulado";
    }
  }

  getcolor(estado) {
    if (estado == "P") {
      return "orange";
    } else if (estado == "E") {
      return "yellow";
    } else if (estado == "V") {
      return "green";
    } else if (estado == "U") {
      return "red";
    } else if (estado == "A") {
      return "black";
    }
  }

  novaderrogacao() {
    this.router.navigate(['derrogacoes/novo']);
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
      this.router.navigate(['derrogacoes']);
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

    if (this.bteditar) {
      if (back != 0) {
        this.router.navigate(['derrogacoes/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['derrogacoes/editar'], { queryParams: { id: page } });
      }

    }
  }
  bt() {
    throw new Error('Method not implemented.');
  }


  showDialog(type, srcelement, nomeficheiro, datatype, ficheiro) {
    this.srcelement = "";
    if (type == "pdf" || type == 'txt') {
      if (ficheiro == null) {

        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement);
      } else {
        /*var blob = new Blob([ficheiro], { type: datatype });
        var blobUrl = URL.createObjectURL(blob);*/
        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
      }
    }
    if (ficheiro == null) {
      this.srcelement = webUrl.link + srcelement;
    } else {
      this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
    }
    if (type == "excel" || type == "word") {
      this.download(nomeficheiro, srcelement, datatype, ficheiro)
    } else if (type == "msg") {
      this.downloadTXT(nomeficheiro, srcelement, ficheiro)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      this.display = true;
    }

  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(index);
  }

  download(nome, filename, datatype, ficheiro) {
    if (ficheiro == null) {
      this.UploadService.download("report", filename, datatype).subscribe(
        (res) => {
          /*var fileURL: any = URL.createObjectURL(res);
          fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          var myWindow = window.open(fileURL, "", "width=200,height=100");*/
          // myWindow.close();
          FileSaver.saveAs(res, nome);
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
  downloadTXT(nomeficheiro, filename, ficheiro) {
    if (ficheiro == null) {
      this.UploadService.downloadTXT(filename).subscribe(
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

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      /*this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
        (res) => { });*/
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.QUADERROGACOESFICHEIROSService.delete(tab.id).then(
        res => {
          //alterar ficheiro de pasta
          /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
             (res) => { });*/
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

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
      var nome = this.formatDate() + x;

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

    if (!this.novo) {
      var ficheiros = new QUA_DERROGACOES_FICHEIROS;
      ficheiros.data_CRIA = data;
      ficheiros.utz_CRIA = this.user;
      ficheiros.id_DERROGACAO = this.id_DERROGACAO;
      ficheiros.caminho = nome + '.' + tipo[1];
      ficheiros.nome = file.name;
      ficheiros.tipo = type;
      ficheiros.datatype = file.type;
      ficheiros.tamanho = file.size;
      ficheiros.descricao = this.filedescricao[x];
      ficheiros.ficheiro_1 = ficheiro.substr(ficheiro, ficheiro.length / 2);
      ficheiros.ficheiro_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
      ficheiros.data_ULT_MODIF = new Date();
      ficheiros.utz_ULT_MODIF = this.user;

      this.gravarTabelaFicheiros2(ficheiros, 0, 0, 0);

    } else {
      this.uploadedFiles.push({
        data_CRIA: data, ficheiro: ficheiro,
        id_TAREFA: null, responsavel: null, utilizador: this.user_nome, datacria: this.formatDate2(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
        id: null, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: this.filedescricao[x]
      });
    }

    this.uploadedFiles = this.uploadedFiles.slice();
    if (this.campo_x + 1 == event.files.length) {
      this.fileInput.files = [];
      this.filedescricao = [];
      this.fileInput.progress = 0;
    }
    this.campo_x++;

  }



  gravarTabelaFicheiros2(ficheiros, count, total, id) {
    this.QUADERROGACOESFICHEIROSService.update(ficheiros).subscribe(
      res => {

        this.uploadedFiles.push({
          data_CRIA: ficheiros.data_CRIA, ficheiro: ficheiros.ficheiro_1 + ficheiros.ficheiro_2,
          utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.data_CRIA) + " " + new Date(ficheiros.data_CRIA).toLocaleTimeString(),
          id: res.id, name: ficheiros.nome, datatype: ficheiros.datatype, src: ficheiros.caminho, type: ficheiros.tipo, size: ficheiros.tamanho, descricao: ficheiros.descricao
        });
        this.uploadedFiles = this.uploadedFiles.slice();

      },
      error => { console.log(error); });
  }

  gravarTabelaFicheiros(id) {
    if (this.novo && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new QUA_DERROGACOES_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_DERROGACAO = id;
        if (!this.novo) ficheiros.id = this.uploadedFiles[x].id;
        ficheiros.caminho = this.uploadedFiles[x].src;
        ficheiros.nome = this.uploadedFiles[x].name;
        ficheiros.tipo = this.uploadedFiles[x].type;
        ficheiros.datatype = this.uploadedFiles[x].datatype;
        ficheiros.tamanho = this.uploadedFiles[x].size;
        ficheiros.descricao = this.uploadedFiles[x].descricao;
        ficheiros.ficheiro_1 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro, this.uploadedFiles[x].ficheiro.length / 2);
        ficheiros.ficheiro_2 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro.length / 2, this.uploadedFiles[x].ficheiro.length);

        ficheiros.data_ULT_MODIF = new Date();
        ficheiros.utz_ULT_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        }

        if (count == this.uploadedFiles.length) {
          if (this.novo) {
            //this.router.navigate(['derrogacoes/editar'], { queryParams: { id: id } });
            this.gravarTabelaAccoes(id);
            //this.simular(this.inputnotifi);
          }
        }

      }
    }

  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.QUADERROGACOESFICHEIROSService.getbyidDERROGACAO(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate2(response[x][0].data_CRIA) + " " + new Date(response[x][0].data_CRIA).toLocaleTimeString();

            id2 = response[x][0].id;

            if (response[x][0].id_FICHEIRO != null) id2 = "f110" + response[x][0].id_FICHEIRO;
            this.uploadedFiles.push({
              data_CRIA: data_at, ficheiro: response[x][0].ficheiro_1 + response[x][0].ficheiro_2,
              data: response[x][0], id_TAREFA: response[x][0].id_TAREFA, utilizador: response[x][1].nome_UTILIZADOR,
              datacria: datacria, responsavel: response[x][2],
              id: id2, name: response[x][0].nome, id_FICHEIRO: response[x][0].id_FICHEIRO,
              src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype, size: response[x][0].tamanho, descricao: response[x][0].descricao
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

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


  /****ACCOES */

  adicionar_linha(tabela) {
    if (tabela == "tabelaaccoes") {

      this.tabelaaccoes.push({
        obriga_EVIDENCIAS: false,
        area: "", id: null, concluido_UTZ: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null,
        nome_estado: "Pendente", responsavel: null, data_REAL: "", data_PREVISTA: null
      });
      this.tabelaaccoes = this.tabelaaccoes.slice();
    }


  }

  apagar_linha(tabela, index) {

    if (tabela == "tabelaaccoes") {
      var tab = this.tabelaaccoes[index];
      if (tab.id == null) {
        this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));
        //this.atualiza_ordem(tabela);
      } else {

        var accoes1 = new QUA_DERROGACOES_PLANOS_ACCOES;
        accoes1 = this.tabelaaccoes[index].data;
        this.tabelaaccoes[index].estado = 'A';
        this.tabelaaccoes[index].nome_estado = this.geEstado('A');
        accoes1.estado = 'A';
        accoes1.data_ULT_MODIF = new Date();
        accoes1.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoes2(accoes1, 1, 2, 0, false, index, true);
      }
    }
  }



  finalizar_linha(tabela, index) {

    if (tabela == "tabelaaccoes") {
      var accoes = new QUA_DERROGACOES_PLANOS_ACCOES;

      accoes = this.tabelaaccoes[index].data;

      if (this.tabelaaccoes[index].data_REAL == null || this.tabelaaccoes[index].data_REAL == "") {
        this.tabelaaccoes[index].data_REAL = new Date();
      }
      accoes.data_REAL = this.tabelaaccoes[index].data_REAL;
      accoes.concluido_DATA = new Date();
      accoes.concluido_UTZ = this.user;
      accoes.estado = 'C';

      this.tabelaaccoes[index].estado = 'C';
      this.tabelaaccoes[index].nome_estado = this.geEstado('C');

      this.gravarTabelaAccoes2(accoes, 1, 2, 0, true, index, true);

    }
  }

  gravarTabelaAccoes2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {
    this.QUADERROGACOESPLANOSACCOESService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          this.criarTarefas(res.id, 5);
        }


        if (finaliza) this.tabelaaccoes[index].concluido_UTZ = this.user;
      },
      error => { console.log(error); });
  }

  atualizaestadoTarefa(id, estado) {
    if (id != null) {
      this.GTMOVTAREFASService.getbyid(id).subscribe(response => {

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
              this.atualizaSUBTAREFAS(id, estado, this.user);
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
  }

  atualizaSUBTAREFAS(id, estado, utilizador) {
    this.GTMOVTAREFASService.getAtualizaSubtarefas(id, estado, utilizador).subscribe(response => {
    }, error => {
      console.log(error);
    });
  }


  criaLogs(log) {
    this.GTMOVTAREFASService.createLOGS(log).subscribe(response => {
    }, error => {
      console.log(error);

    });
  }

  IrPara(id, responsavel) {

    var id_r = null;
    if (responsavel.toString().charAt(0) == 'u') {
      id_r = responsavel.substr(1);
    }

    var modo = 'view';
    if (this.modoedicao) modo = 'editar';
    //if (this.adminuser || this.user == this.utz_CRIA || id_r == this.user) {
    this.router.navigateByUrl('tarefas/view?id=' + id + "&redirect=derrogacoes/" + modo + "kvk\id=" + this.id_DERROGACAO);
    //}
  }

  //atualiza ou cria tarefa
  criarTarefas(id, modulo) {
    var link = webUrl.host + '/#/tarefas/view?id=';
    this.GTMOVTAREFASService.getAtualizaTarefaDerrogacoes(id, modulo, link).subscribe(
      response => {

      }, error => { console.log(error); });
  }

  gravarTabelaAccoes(id) {
    if (this.tabelaaccoes && this.tabelaaccoes.length > 0) {

      var count = 0;
      for (var x in this.tabelaaccoes) {
        count++;
        if (this.tabelaaccoes[x].responsavel != null && this.tabelaaccoes[x].responsavel != "" && this.tabelaaccoes[x].descricao != null && this.tabelaaccoes[x].descricao != "") {
          var accoes = new QUA_DERROGACOES_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaaccoes[x].id != null) {
            accoes = this.tabelaaccoes[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          accoes.id = this.tabelaaccoes[x].id;
          accoes.id_DERROGACAO = id;
          accoes.id_ACCAO = this.tabelaaccoes[x].id_ACCOES;
          accoes.tipo = "A";
          accoes.observacoes = this.tabelaaccoes[x].observacoes;
          accoes.estado = "P";
          accoes.obriga_EVIDENCIAS = this.tabelaaccoes[x].obriga_EVIDENCIAS;


          //var data = this.tabelaaccoesimediatas[x].data_REAL;
          //accoes.data_REAL = (data!=null && data != "" )? new Date(data) : null;
          accoes.data_PREVISTA = new Date(this.tabelaaccoes[x].data_PREVISTA);

          var id_resp = this.tabelaaccoes[x].responsavel;
          var tipo = "u";
          if (this.tabelaaccoes[x].responsavel.charAt(0) == 'u' || this.tabelaaccoes[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaaccoes[x].responsavel.charAt(0);
            id_resp = this.tabelaaccoes[x].responsavel.substr(1);
          }

          accoes.responsavel = id_resp;
          accoes.tipo_RESPONSAVEL = tipo;


          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaAccoes2(accoes, count, this.tabelaaccoes.length, id);
          }

        }
      }
    } else {

    }

    if (this.novo) {
      this.router.navigate(['derrogacoes/editar'], { queryParams: { id: id } });
      this.simular(this.inputnotifi);
    } else {
      this.router.navigate(['derrogacoes/view'], { queryParams: { id: id } });
      this.simular(this.inputnotifi);
    }
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

  carregatabelasaccoes(id) {

    this.tabelaaccoes = [];

    this.QUADERROGACOESPLANOSACCOESService.getbyidderrogacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var tipo = response[x].tipo_RESPONSAVEL;
            var data_real = null;

            var id2 = null;

            id2 = response[x].id;

            if (response[x].data_REAL != null) {
              data_real = new Date(response[x].data_REAL);
            }

            var estados = response[x].estado

            var accao = null;
            if (this.drop_accoes.find(item => item.value == response[x].id_ACCAO)) {
              accao = this.drop_accoes.find(item => item.value == response[x].id_ACCAO).label
            }
            if (response[x].tipo == "A") {
              this.tabelaaccoes.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, id_ACCOES: response[x].id_ACCAO, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, data_REAL: data_real, data_PREVISTA: ((response[x].data_PREVISTA == null) ? null : new Date(response[x].data_PREVISTA)),
                responsavel: tipo + response[x].responsavel, descricao: accao, area: response[x].area
              });

            }

          }

          this.tabelaaccoes = this.tabelaaccoes.slice();
        }

      }, error => {
        console.log(error);
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

  carregaaccoes(inicia, id, continua = true) {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("D").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();
        if (continua) this.carregaGrupos(inicia, id);
      },
      error => { console.log(error); if (continua) this.carregaGrupos(inicia, id); });
  }

  carregaGrupos(inicia, id) {
    this.GERGRUPOService.getAll().subscribe(
      response => {
        var grupo = [];
        this.tabelagrupos = [];
        for (var x in response) {
          grupo.push({ label: response[x].descricao, value: "g" + response[x].id });
          this.tabelagrupos.push({ label: response[x].descricao, value: response[x].id })
        }
        this.drop_utilizadores_acoes.push({ label: "Grupos", itens: grupo });

        this.drop_utilizadores_acoes = this.drop_utilizadores_acoes.slice();


      },
      error => { console.log(error); });
  }


  carregaUtilizadores_acoes(inicia, id) {
    this.drop_utilizadores_acoes = [];
    this.drop_utilizadores2 = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores2.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR });
          this.drop_utilizadores2.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }
        this.drop_utilizadores_acoes.push({ label: "Utilizadores", itens: grupo });

        this.drop_utilizadores_acoes = this.drop_utilizadores_acoes.slice();
        this.drop_utilizadores2 = this.drop_utilizadores2.slice();
        this.carregaaccoes(inicia, id);
      },
      error => { console.log(error); this.carregaaccoes(inicia, id); });
  }

  alterarEmail2(index, event, tabela) {
    if (event.target.value.toString().includes("u")) {
      var id = event.target.value.toString().replace("u", "");
      if (tabela == "tabelaaccoes") {
        this.tabelaaccoes[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      }
    } else {
      if (tabela == "tabelaaccoes") {
        this.tabelaaccoes[index].area = "";
      }
    }
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
  //gravar unidade de ACÇÕES
  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "D";
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

  //devolve node responsavel
  getResponsavelaccoes(id) {
    if (id != null) var utz = this.drop_utilizadores2.find(item => item.value == id);
    if (id != null && id.toString().includes("u")) {
      var utz2 = this.drop_utilizadores_acoes.find(item => item.label == "Utilizadores").itens;
      utz = utz2.find(item => item.value == id);
    } else if (id != null && id.toString().includes("g")) {
      var utz2 = this.drop_utilizadores_acoes.find(item => item.label == "Grupos").itens;
      utz = utz2.find(item => item.value == id);
    }
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  /******* */



  /* equipa */
  carregatabelaEquipa(id) {
    this.tabelaEquipa = [];

    this.QUADERROGACOESEQUIPAService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        var grupo = []
        if (count > 0) {
          for (var x in response) {
            var id2 = response[x].id;
            grupo.push({ label: this.getNomeUser(response[x].id_UTZ), value: "u" + response[x].id_UTZ });
            this.tabelaEquipa.push({
              data: response[x],
              id: id2, responsavel: response[x].id_UTZ,
              area: response[x].area, email: response[x].email, telefone: response[x].telefone
            });

          }
          this.drop_utilizadores.unshift({ label: "Utilizadores", itens: grupo });


          this.tabelaEquipa = this.tabelaEquipa.slice();
        }

      }, error => { console.log(error); });
  }

  adicionar_tabelaEquipa() {
    this.tabelaEquipa.push({ id: null, responsavel: null, area: "", email: "", telefone: "" });
    this.tabelaEquipa = this.tabelaEquipa.slice();
  }


  apagar_tabelaEquipa(index) {

    var tab = this.tabelaEquipa[index];
    if (tab.id == null) {
      this.tabelaEquipa = this.tabelaEquipa.slice(0, index).concat(this.tabelaEquipa.slice(index + 1));
    } else {
      this.QUADERROGACOESEQUIPAService.delete(tab.id).then(
        res => {
          this.tabelaEquipa = this.tabelaEquipa.slice(0, index).concat(this.tabelaEquipa.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }



  //adicionar utilizadores à tabela equipa
  escolhergrupo(car) {

    this.GERGRUPOService.getByidUsers(car.value).subscribe(
      response => {
        //console.log(response)

        for (var x in response) {
          if (!this.tabelaEquipa.find(item => item.responsavel == response[x][0])) {
            this.tabelaEquipa.push({
              data: response[x],
              id: null, responsavel: response[x][0],
              area: response[x][15], email: response[x][3], telefone: response[x][14]
            });

            var utz2 = this.drop_utilizadores.find(item => item.label == "Utilizadores");
            if (utz2) {

            } else {
              this.drop_utilizadores.unshift({ label: "Utilizadores", itens: [] })
            }
            var utz3 = this.drop_utilizadores.find(item => item.label == "Utilizadores");
            utz3.itens.push({
              label: response[x][2], value: response[x][0],
              email: response[x][3], area: response[x][15], telefone: response[x][14]
            });

          }
        }



        this.tabelaEquipa = this.tabelaEquipa.slice();
        this.displaygrupos = false;
      },
      error => {
        console.log(error);

      });
  }


  //Ao alterar combobos responsavel na equipa atualiza email
  alterarEmail(index, event) {
    this.tabelaEquipa[index].email = this.drop_utilizadores2.find(item => item.value == event.value).email;
    this.tabelaEquipa[index].telefone = this.drop_utilizadores2.find(item => item.value == event.value).telefone;
    this.tabelaEquipa[index].area = this.drop_utilizadores2.find(item => item.value == event.value).area;

    var grupo = [];
    grupo.push({ label: this.getNomeUser(event.value), value: "u" + event.value });
    var pp = this.drop_utilizadores.find(item => item.label == "Utilizadores");
    if (pp) {
      pp.itens = [];
      for (var x in this.tabelaEquipa) {
        pp.itens.push({ label: this.getNomeUser(this.tabelaEquipa[x].responsavel), value: "u" + this.tabelaEquipa[x].responsavel })
      }
    } else {
      this.drop_utilizadores.unshift({ label: "Utilizadores", itens: grupo });
    }
  }

  getNomeUser(id) {
    var utz = null

    if (id != null) utz = this.drop_utilizadores2.find(item => item.value == id);

    var nome = "";
    if (id != null && utz) {
      nome = utz.label;
    }
    return nome;
  }


  gravarTabelaEquipa(id) {
    if (this.tabelaEquipa && this.tabelaEquipa.length > 0) {

      var count = 0;
      var email_para = [];
      for (var x in this.tabelaEquipa) {

        var equipa = new QUA_DERROGACOES_EQUIPA;
        if (this.tabelaEquipa[x].id != null) {
          equipa = this.tabelaEquipa[x].data;
        } else {
          equipa.data_CRIA = new Date();
          equipa.utz_CRIA = this.user;
        }


        equipa.area = this.tabelaEquipa[x].area;
        equipa.id_UTZ = this.tabelaEquipa[x].responsavel;
        equipa.email = this.tabelaEquipa[x].email;
        equipa.telefone = this.tabelaEquipa[x].telefone;
        equipa.id_DERROGACAO = id;

        equipa.data_ULT_MODIF = new Date();
        equipa.utz_ULT_MODIF = this.user;

        count++;
        if (this.tabelaEquipa[x].responsavel != null && this.tabelaEquipa[x].responsavel != "") {
          this.gravarTabelaEquipa2(equipa, count, this.tabelaEquipa.length, id);
          if (this.tabelaEquipa[x].id == null && this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
            email_para.push(this.tabelaEquipa[x].email);
        } else if (count == this.tabelaEquipa.length) {

        }

      }

    } else {

    }
  }

  gravarTabelaEquipa2(equipa, count, total, id) {
    this.QUADERROGACOESEQUIPAService.update(equipa).then(
      res => {
        if (count == total) {

        }
      },
      error => { console.log(error); if (count == total) { } });
  }


  enviarEventoResponsaveis(data_INICIO, data_FIM, id_DERROGACAO, cliente, referencia, MOMENTO, email_para, motivo, causa, estado) {
    if (motivo == null) {
      motivo = "";
    }
    if (causa == null) {
      causa = "";
    }
    var dados = "{motivo::" + motivo + "\n/link::" + webUrl.host + '/#/reclamacoesclientes/view?id=' + id_DERROGACAO
      + "\n/numero_derrogacao::" + id_DERROGACAO + "\n/cliente::" + cliente
      + "\n/data_fim::" + new Date(data_FIM).toLocaleDateString() + "\n/referencia::" + referencia
      + "\n/estado::" + estado
      + "\n/data_inicio::" + new Date(data_INICIO).toLocaleDateString() + "\n/causa::" + causa + "}";


    var data = [{ MODULO: 5, MOMENTO: MOMENTO, PAGINA: "Derrogações", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }
  /****** */




  /**** AUTO COMPLETE  */

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
    this.designacao_REF = null;
  }

  filterSelect(event) {
    var tab = this.drop_artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia = event.value;
      this.designacao_REF = event.descricao;
      this.familia_REF = event.FAMCOD;
      this.getMoradasReferencia(event)
    } else {
      this.referencia = null;
      this.designacao_REF = null;
      this.familia_REF = null;
    };
  }

  //ao alterar referencia atualiza morada
  getMoradasReferencia(event) {
    this.drop_moradas = [];
    this.drop_cliente = [];
    this.morada_CLIENTE = "";
    this.cliente = null;

    this.ABDICCOMPONENTEService.getMoradasREFERENCIA(event.value).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_moradas.push({ label: 'Sel. Morada', value: "" });

          this.drop_cliente.push({ label: 'Sel. Cliente.', value: "" });

          for (var x in response) {
            if (response[x].TIPO == 'MORADA' && response[x].CLICOD != null) this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
            if (response[x].TIPO == 'CLIENTE' && response[x].CLICOD != null) this.drop_cliente.push({ label: response[x].ADRNOM, value: { id: response[x].CLICOD, nome: response[x].ADRNOM } });

          }
          this.drop_moradas = this.drop_moradas.slice();
          this.drop_cliente = this.drop_cliente.slice();
          if (this.drop_moradas.length == 2) {
            this.morada_CLIENTE = this.drop_moradas[1].value.id;
          }

          if (this.drop_cliente.length == 2) {
            this.cliente = this.drop_cliente[1].value.id;
          }

        } else {
          this.drop_moradas.push({ label: 'Interno', value: 0 });
          this.morada_CLIENTE = 0;

          this.drop_cliente.push({ label: 'Interno', value: 0 });
          this.cliente = 0;
        }
      }, error => {
        console.log(error);
      });
  }


}
