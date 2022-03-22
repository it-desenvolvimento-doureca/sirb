import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FileUpload, ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'app/servicos/upload.service';
import { Location } from '@angular/common';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { RCDICGRAUIMPORTANCIAService } from 'app/servicos/rc-dic-grau-importancia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { RCMOVRECLAMACAOFORNECEDORService } from 'app/servicos/rc-mov-reclamacao-fornecedor.service';
import { RCMOVRECLAMACAOFICHEIROSFORNECEDORService } from 'app/servicos/rc-mov-reclamacao-ficheiros-fornecedor.service';
import { RC_MOV_RECLAMACAO_FORNECEDOR } from 'app/entidades/RC_MOV_RECLAMACAO_FORNECEDOR';
import { RC_MOV_RECLAMACAO_FICHEIROS_FORNECEDOR } from 'app/entidades/RC_MOV_RECLAMACAO_FICHEIROS_FORNECEDOR';
import { RCDICTIPOLOGIAService } from 'app/servicos/rc-dic-tipologia.service';
import { RCDICCLASSIFICACAOService } from 'app/servicos/rc-dic-classificacao.service';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { GERFORNECEDORService } from 'app/servicos/ger-fornecedor.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { GERGRUPOService } from 'app/servicos/ger-grupo.service';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { GT_LOGS } from 'app/entidades/GT_LOGS';
import { GT_MOV_TAREFAS } from 'app/entidades/GT_MOV_TAREFAS';
import { RC_MOV_RECLAMACAO_FORNECEDOR_PLANOS_ACCOES } from 'app/entidades/RC_MOV_RECLAMACAO_FORNECEDOR_PLANOS_ACCOES';
import { RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService } from 'app/servicos/rc-mov-reclamacao-fornecedor-planos-accoes.service';
@Component({
  selector: 'app-reclamacao-fornecedor',
  templateUrl: './reclamacao-fornecedor.component.html',
  styleUrls: ['./reclamacao-fornecedor.component.css']
})
export class ReclamacaoFornecedorComponent implements OnInit {
  types = [];
  drop_fornecedor = [];
  drop_referencia = [];
  //drop_moradas = [];
  filedescricao = [];
  fileselectinput = [];

  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteracancelar') alteracancelar: ElementRef;

  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputartigoexiste') inputartigoexiste: ElementRef;
  @ViewChild('alteraeditar2') alteraeditar2: ElementRef;

  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  reclamacoes: any[];
  disimprimir: boolean;
  modoedicao: boolean;
  numero_RECLAMACAO;
  titulo;
  data_CRIA;
  hora_CRIA;
  data_RECLAMACAO;
  hora_RECLAMACAO;
  utz_CRIA;
  numero_RECLAMACAO_FORNECEDOR
  fornecedor;
  //morada_FORNECEDOR;
  contato_FORNECEDOR;
  email_FORNECEDOR;
  telefone_FORNECEDOR;
  referencia;
  designacao_REF;
  lote;
  problema_REPETIDO;
  numero_RECLAMACAO_REPETIDA;
  descricao;
  displayvalidacao;
  display;
  texto_estado = "";
  drop_utilizadores2;
  errovalida;
  type;
  drop_numero_reclamacao = [];
  nomeficheiro;
  i: number;
  drop_grau_importancia: any[];

  reclamacao_dados: RC_MOV_RECLAMACAO_FORNECEDOR;
  estado: string = 'A';
  etsnum: any;
  referencia_temp: any;
  uploadedFiles: any[] = [];
  campo_x: number;
  classificacao: number;
  tipologia: number;
  grau_IMPORTANCIA: number;
  utz_RESPONSAVEL: number;
  id_FORNECEDOR: number;
  qtd: number;
  observacoes: string;
  accao_1: boolean;
  accao_2: boolean;
  accao_3: boolean;
  decisao_FORNECEDOR: string;
  decisao_FORNECEDOR_OUTRO: string;
  data_VERIFICACAO: Date;
  responsavel_QUALIDADE;
  data_RECEPCAO;
  decisao_DOURECA: string;
  drop_tipologias: any[];
  designacao_REF_TEXTO: string;
  drop_classificacao: any[];
  srcelement;
  apagarficheiros: any;
  displayLoading: boolean;
  filteredreferencias: any[];
  referencia_campo: any = null;
  disEditar: boolean;
  disApagar: boolean;
  disExportar: boolean;
  disCriar: boolean;
  btanterior: boolean;
  btseguinte: boolean;
  btcriar: boolean;
  btapagar: boolean;
  btvoltar: boolean;
  btfechar: boolean;
  bteditar: boolean;
  disFechar: boolean;
  btexportar: boolean;
  descricaoeng: string;
  id_selected: number;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  drop_accoes: any[];
  tabelaaccoesrealizar = [];
  acessoadicionarACCAO: any;
  tabelagrupos: any;
  drop_utilizadores: any;

  constructor(private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService
    , private RCMOVRECLAMACAOFICHEIROSFORNECEDORService: RCMOVRECLAMACAOFICHEIROSFORNECEDORService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private RCDICGRAUIMPORTANCIAService: RCDICGRAUIMPORTANCIAService, private renderer: Renderer, private RCDICTIPOLOGIAService: RCDICTIPOLOGIAService,
    private RCDICCLASSIFICACAOService: RCDICCLASSIFICACAOService, private GERFORNECEDORService: GERFORNECEDORService,
    private RCMOVRECLAMACAOFORNECEDORService: RCMOVRECLAMACAOFORNECEDORService, private location: Location, private sanitizer: DomSanitizer,
    private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService,
    private GERGRUPOService: GERGRUPOService,
    private GTMOVTAREFASService: GTMOVTAREFASService,
    private RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService: RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService,
    private UploadService: UploadService, private RelatoriosService: RelatoriosService) { }

  ngOnInit() {
    this.types = [
      { label: 'Lote', value: 'lote', icon: 'fa-close' },
      { label: 'Etiqueta', value: 'etiqueta', icon: 'fa-close' },
      { label: 'Guia', value: 'guia', icon: 'fa-close' }
    ];

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.btanterior = true;
    this.btseguinte = true;
    this.btseguinte = true;
    this.btcriar = true;
    this.btapagar = true;
    this.btexportar = true;
    this.btvoltar = true;
    this.btfechar = true;
    this.bteditar = true;
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

    var step;
    var substep = this.route
      .queryParams
      .subscribe(params => {
        step = params['step'] || 0;
      });


    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });
      if (this.globalVar.getfiltros("reclamacaofornecedor_id") && this.globalVar.getfiltros("reclamacaofornecedor_id").length > 0) {
        this.reclamacoes = this.globalVar.getfiltros("reclamacaofornecedor_id");
        this.i = this.reclamacoes.indexOf(+id);
        this.carregaDados(true, this.reclamacoes[this.i]);

        this.RCMOVRECLAMACAOFORNECEDORService.getAll().subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              this.drop_numero_reclamacao.push({ label: "Selecionar Reclamação", value: null });
              for (var x in response) {
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_FORNECEDOR, value: response[x].id_RECLAMACAO });
              }
            }
          }, error => { console.log(error); });

      } else {
        //preenche array para navegar 
        this.RCMOVRECLAMACAOFORNECEDORService.getAll().subscribe(
          response => {
            this.reclamacoes = [];
            var count = Object.keys(response).length;
            if (count > 0) {
              this.drop_numero_reclamacao.push({ label: "Selecionar Reclamação", value: null });
              for (var x in response) {
                this.reclamacoes.push(response[x].id_RECLAMACAO);
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_FORNECEDOR, value: response[x].id_RECLAMACAO });
              }
            } else {
              this.reclamacoes.push(id);
            }
            if (this.reclamacoes.indexOf(+id) < 0) { this.reclamacoes.push(parseInt(id)); }
            this.i = this.reclamacoes.indexOf(+id);

            this.carregaDados(true, this.reclamacoes[this.i]);

          }, error => { console.log(error); });
      }

      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501apagar");
      this.disExportar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501exportar");
      this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501apagarficheiros");
      this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501fechar");

      this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node501imprimir");
      this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node526");
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.btseguinte = false;
        this.btanterior = false;
        this.btapagar = true;
        this.btexportar = true;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.btseguinte = false;
        this.btanterior = false;
        this.btapagar = false;
        this.btexportar = false;
        this.btcriar = true;
        this.btfechar = false;
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.bteditar = false;
        this.modoedicao = true;
        this.btfechar = false;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.getArtigos(false);
        //this.carregaDados(false, null);


        this.RCMOVRECLAMACAOFORNECEDORService.getAll().subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              this.drop_numero_reclamacao.push({ label: "Selecionar Reclamação", value: null });
              for (var x in response) {
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_FORNECEDOR, value: response[x].id_RECLAMACAO });
              }
            }
            this.carregaDados(false, null);
          }, error => { console.log(error); this.carregaDados(false, null); });

      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = true;
      } else if (urlarray[1].match("duplicar")) {

      }

    }
    this.carregaaccoes();
  }

  filterRef(event) {

    this.filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.drop_referencia) {
      let ref = this.drop_referencia[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.drop_referencia[x]);
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
    this.referencia = event.value.valor;
    this.designacao_REF = event.value.design;
  }

  fechar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Fechar?',
      header: 'Confirmação',
      icon: 'fa fa-close',
      accept: () => {

        if (this.data_VERIFICACAO == null || this.responsavel_QUALIDADE == null || this.responsavel_QUALIDADE == "") {
          this.errovalida = "É necessário preencher campos data e responsável da Verificação da Eficácia/Encerramento ";
          this.displayvalidacao = true;
        } else {
          this.gravar(true);
          /*var reclamacao = new RC_MOV_RECLAMACAO_FORNECEDOR;
          reclamacao = this.reclamacao_dados;

          reclamacao.utz_FECHA = this.user;
          reclamacao.data_FECHA = new Date();
          reclamacao.estado = "F";

          this.RCMOVRECLAMACAOFORNECEDORService.update(reclamacao).subscribe(
            res => {
              var id;
              var sub = this.route
                .queryParams
                .subscribe(params => { id = params['id'] || 0; });

              if (this.modoedicao) {
                this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: id } });
              } else {
                this.inicia(id);
              }

              this.simular(this.inputgravou);
            },
            error => { console.log(error); this.simular(this.inputerro); });*/
        }
      }

    });
  }

  carregaDados(inicia, id) {
    this.drop_utilizadores = [];
    this.drop_utilizadores2 = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores2.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR });
          this.drop_utilizadores2.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }
        this.drop_utilizadores.push({ label: "Utilizadores", itens: grupo });

        //this.drop_utilizadores = this.drop_utilizadores.slice();
        this.drop_utilizadores2 = this.drop_utilizadores2.slice();
        this.grauimportancia(inicia, id);
        this.carregaGrupos();
      },
      error => { console.log(error); this.grauimportancia(inicia, id); });

  }

  grauimportancia(inicia, id) {
    this.RCDICGRAUIMPORTANCIAService.getAll().subscribe(
      response => {
        this.drop_grau_importancia = [];
        this.drop_grau_importancia.push({ label: 'Sel. Grau Import.', value: "" });
        for (var x in response) {
          this.drop_grau_importancia.push({ label: response[x].descricao, value: response[x].id });
        }
        this.tipologias(inicia, id);
      }, error => { this.tipologias(inicia, id); console.log(error); });
  }

  tipologias(inicia, id) {
    this.RCDICTIPOLOGIAService.getAll().subscribe(
      response => {
        this.drop_tipologias = [];
        this.drop_tipologias.push({ label: 'Sel. Tipologia', value: "" });
        for (var x in response) {
          this.drop_tipologias.push({ label: response[x].descricao, value: response[x].id });
        }
        this.classificacoes(inicia, id);
      }, error => { this.classificacoes(inicia, id); console.log(error); });
  }


  classificacoes(inicia, id) {
    this.RCDICCLASSIFICACAOService.getAll().subscribe(
      response => {
        this.drop_classificacao = [];
        this.drop_classificacao.push({ label: 'Sel. Classificação', value: "" });
        for (var x in response) {
          this.drop_classificacao.push({ label: response[x].descricao, value: response[x].id });
        }
        this.fornecedores(inicia, id);
      }, error => { this.fornecedores(inicia, id); console.log(error); });
  }



  fornecedores(inicia, id) {

    this.GERFORNECEDORService.getAll_silver().subscribe(
      response => {
        this.drop_fornecedor = [];
        this.drop_fornecedor.push({ label: 'Sel. Fornecedor.', value: "" });
        for (var x in response) {
          this.drop_fornecedor.push({ label: response[x].FOUCOD + " - " + response[x].ADRNOM, value: { id: response[x].FOUCOD, nome: response[x].ADRNOM } });
        }
        this.drop_fornecedor = this.drop_fornecedor.slice();
        if (inicia) this.inicia(id);
      }, error => {
        if (inicia) this.inicia(id);
        console.log(error);
      });
  }


  inicia(id) {

    this.RCMOVRECLAMACAOFORNECEDORService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.reclamacao_dados = response[0];
          for (var x in response) {
            if (response[x].inativo == true) {
              this.simular(this.escondebt)
            } else {
              this.simular(this.alteraeditar2);
            }

            this.numero_RECLAMACAO = response[x].id_RECLAMACAO;
            this.titulo = response[x].titulo;

            this.numero_RECLAMACAO_FORNECEDOR = response[x].numero_RECLAMACAO_FORNECEDOR;
            this.classificacao = response[x].classificacao;
            this.tipologia = response[x].tipologia;
            this.grau_IMPORTANCIA = response[x].grau_IMPORTANCIA;
            this.utz_RESPONSAVEL = response[x].utz_RESPONSAVEL;
            this.id_FORNECEDOR = response[x].id_FORNECEDOR;
            this.etsnum = response[x].etsnum;
            //this.morada_FORNECEDOR = response[x].morada_FORNECEDOR;
            this.contato_FORNECEDOR = response[x].contato_FORNECEDOR;
            this.email_FORNECEDOR = response[x].email_FORNECEDOR;
            this.telefone_FORNECEDOR = response[x].telefone_FORNECEDOR;
            this.designacao_REF = response[x].designacao_REF;
            this.qtd = response[x].qtd;
            this.lote = response[x].lote;
            this.data_RECEPCAO = (response[x].data_RECEPCAO == null) ? null : new Date(response[x].data_RECEPCAO);
            this.decisao_DOURECA = response[x].decisao_DOURECA;
            this.descricao = response[x].descricao;
            this.problema_REPETIDO = response[x].problema_REPETIDO;
            this.numero_RECLAMACAO_REPETIDA = response[x].numero_RECLAMACAO_REPETIDA;
            this.fornecedor = (this.drop_fornecedor.find(item => item.value.id == response[x].id_FORNECEDOR)) ? this.drop_fornecedor.find(item => item.value.id == response[x].id_FORNECEDOR).value : null;

            this.observacoes = response[x].observacoes;
            this.accao_1 = response[x].accao_1;
            this.accao_2 = response[x].accao_2;
            this.accao_3 = response[x].accao_3;
            this.decisao_FORNECEDOR = response[x].decisao_FORNECEDOR;
            this.decisao_FORNECEDOR_OUTRO = response[x].decisao_FORNECEDOR_OUTRO;
            this.data_VERIFICACAO = (response[x].data_VERIFICACAO == null) ? null : new Date(response[x].data_VERIFICACAO);
            this.responsavel_QUALIDADE = response[x].responsavel_QUALIDADE;

            this.data_CRIA = new Date(response[x].data_CRIA);
            this.hora_CRIA = new Date(response[x].data_CRIA).toLocaleTimeString().slice(0, 5);
            this.utz_CRIA = response[x].utz_CRIA;
            this.data_RECLAMACAO = new Date(response[x].data_RECLAMACAO);
            this.hora_RECLAMACAO = new Date(response[x].data_RECLAMACAO).toLocaleTimeString().slice(0, 5);
            this.referencia_temp = response[x].referencia;
            this.lote = response[x].lote;

            this.estado = response[x].estado;
            this.texto_estado = this.getESTADO(this.estado);
            this.designacao_REF_TEXTO = response[x].referencia + ' - ' + response[x].designacao_REF;

            if (response[x].estado == 'F') {
              this.btfechar = false;
            }

          }

          //this.getMoradas(this.fornecedor.id, true);
          this.getArtigos(true);
          this.carregatabelaFiles(id);
          this.carregatabelasaccoes(id);
        }

      }, error => { console.log(error); });

  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.RCMOVRECLAMACAOFICHEIROSFORNECEDORService.getbyidreclamacao(id).subscribe(
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
              ordem: response[x][0].ordem,
              src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype, size: response[x][0].tamanho, descricao: response[x][0].descricao
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

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
      var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS_FORNECEDOR;
      ficheiros.data_CRIA = data;
      ficheiros.utz_CRIA = this.user;
      ficheiros.id_RECLAMACAO = this.numero_RECLAMACAO;
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
      ficheiros.ordem = this.getORDEM();
      this.gravarTabelaFicheiros2(ficheiros, 0, 0, 0);

    } else {
      this.uploadedFiles.push({
        data_CRIA: data, ficheiro: ficheiro,
        ordem: this.getORDEM(),
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

  getESTADO(estado) {
    if (estado == "A") {
      return "Aberta";
    } else if (estado == "F") {
      return "Fechada";
    } else if (estado == "C") {
      return "Cancelada";
    } else if (estado == "R") {
      return "Anulada";
    }
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  alteraReferencia(event) {
    this.designacao_REF = "";
    if (this.referencia != null && this.referencia != "") {
      this.designacao_REF = this.referencia.design;
    }
  }

  /*getMoradas(event, mor = false) {
    this.drop_moradas = [];
    this.drop_referencia = [];
    this.morada_FORNECEDOR = "";
    this.referencia = "";
    this.designacao_REF = "";
    //if (!mor) this.familia_REF = "";

    this.ABDICCOMPONENTEService.getMoradas(event).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_moradas.push({ label: 'Sel. Morada.', value: "" });
          for (var x in response) {
            this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
          }
          this.drop_moradas = this.drop_moradas.slice();
          if (mor) this.morada_FORNECEDOR = this.drop_moradas.find(item => item.value.id == this.etsnum).value;
        } else {
          this.drop_moradas.push({ label: 'Sem Moradas para o Fornecedor Seleccionado', value: 0 });
          this.morada_FORNECEDOR = 0;
        }
      }, error => {
        console.log(error);
      });
  }*/

  //ao alterar moradas atualiza artigos
  getArtigos(ref = false) {

    if (!ref) {
      this.designacao_REF = "";
      //this.familia_REF = "";
    }

    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.drop_referencia = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_referencia.push({ label: 'Sel. Ref. Comp.', value: "" });
          for (var x in response) {
            this.drop_referencia.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + ((response[x].PRODES2 == null) ? '' : response[x].PRODES2), value: { valor: response[x].PROREF, design: response[x].PRODES1 } });
          }
          this.drop_referencia = this.drop_referencia.slice();

          if (ref) {
            this.referencia_campo = this.drop_referencia.find(item => item.value.valor == this.referencia_temp);
            //this.referencia = this.drop_referencia.find(item => item.value.valor == this.referencia_temp).value;
            //this.designacao_REF = this.referencia.design;
            //if (this.referencia.FAMCOD != null && this.referencia.FAMCOD != "") this.familia_REF = this.referencia.FAMCOD;
          }
        } else {
          //this.drop_referencia.push({ label: 'Sem Artigos para a Morada Seleccionada', value: 0 });
          this.drop_referencia.push({ label: 'Sel. Ref. Comp.', value: "" })
          this.referencia = 0;
        }
      }, error => {
        console.log(error);
      });
  }

  gravar(fechar = false) {
    this.displayLoading = true;
    var reclamacao = new RC_MOV_RECLAMACAO_FORNECEDOR;

    if (!this.novo) reclamacao = this.reclamacao_dados;

    reclamacao.titulo = this.titulo;
    reclamacao.numero_RECLAMACAO_FORNECEDOR = this.numero_RECLAMACAO_FORNECEDOR;
    if (this.novo) reclamacao.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    if (this.novo) reclamacao.utz_CRIA = this.utz_CRIA;
    reclamacao.data_RECLAMACAO = new Date(this.data_RECLAMACAO.toDateString() + " " + this.hora_RECLAMACAO.slice(0, 5));
    reclamacao.classificacao = this.classificacao;
    reclamacao.tipologia = this.tipologia;

    reclamacao.grau_IMPORTANCIA = this.grau_IMPORTANCIA;
    reclamacao.utz_RESPONSAVEL = this.utz_RESPONSAVEL;

    reclamacao.id_FORNECEDOR = this.fornecedor.id;
    reclamacao.nome_FORNECEDOR = this.fornecedor.nome;
    //reclamacao.morada_FORNECEDOR = this.morada_FORNECEDOR.nome;
    //reclamacao.etsnum = this.morada_FORNECEDOR.id;
    reclamacao.contato_FORNECEDOR = this.contato_FORNECEDOR;
    reclamacao.email_FORNECEDOR = this.email_FORNECEDOR;
    reclamacao.telefone_FORNECEDOR = this.telefone_FORNECEDOR;
    if (this.novo) {
      //reclamacao.referencia = this.referencia.valor;
      reclamacao.referencia = this.referencia;
    }
    else {
      reclamacao.referencia = this.referencia_temp;
    }
    reclamacao.designacao_REF = this.designacao_REF;

    reclamacao.lote = this.lote;
    reclamacao.qtd = this.qtd;
    reclamacao.data_RECEPCAO = this.data_RECEPCAO;
    reclamacao.data_VERIFICACAO = this.data_VERIFICACAO;
    reclamacao.problema_REPETIDO = this.problema_REPETIDO;
    reclamacao.numero_RECLAMACAO_REPETIDA = this.numero_RECLAMACAO_REPETIDA;

    reclamacao.descricao = this.descricao;
    reclamacao.observacoes = this.observacoes;
    reclamacao.decisao_DOURECA = this.decisao_DOURECA;
    reclamacao.accao_1 = this.accao_1;
    reclamacao.accao_2 = this.accao_2;
    reclamacao.accao_3 = this.accao_3;
    reclamacao.decisao_FORNECEDOR = this.decisao_FORNECEDOR;
    reclamacao.decisao_FORNECEDOR_OUTRO = this.decisao_FORNECEDOR_OUTRO;
    reclamacao.responsavel_QUALIDADE = this.responsavel_QUALIDADE;


    reclamacao.inativo = false;
    reclamacao.utz_ULT_MODIF = this.user;
    reclamacao.data_ULT_MODIF = new Date();
    reclamacao.estado = this.estado;

    if (fechar) {
      reclamacao.utz_FECHA = this.user;
      reclamacao.data_FECHA = new Date();
      reclamacao.estado = "F";
    }

    if (this.novo) {

      //console.log(reclamacao)
      reclamacao.estado = "A";
      this.RCMOVRECLAMACAOFORNECEDORService.create(reclamacao).subscribe(
        res => {
          this.gravarTabelaAccoesRealizar(id);
          this.gravarTabelaFicheiros(res.id_RECLAMACAO);
        },
        error => { console.log(error); this.simular(this.inputerro); this.displayLoading = false; });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      reclamacao.id_RECLAMACAO = id;
      //console.log(reclamacao)
      this.RCMOVRECLAMACAOFORNECEDORService.update(reclamacao).subscribe(
        res => {
          this.gravarTabelaAccoesRealizar(id);
          this.gravarTabelaFicheiros(id);
          //this.gravarTabelaStocks(id);
          //fechar ações
        },
        error => { console.log(error); this.simular(this.inputerro); this.displayLoading = false; });

    }
  }


  gravarTabelaFicheiros(id) {
    if (this.novo && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS_FORNECEDOR;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_RECLAMACAO = id;
        if (!this.novo) ficheiros.id = this.uploadedFiles[x].id;
        ficheiros.caminho = this.uploadedFiles[x].src;
        ficheiros.nome = this.uploadedFiles[x].name;
        ficheiros.tipo = this.uploadedFiles[x].type;
        ficheiros.datatype = this.uploadedFiles[x].datatype;
        ficheiros.tamanho = this.uploadedFiles[x].size;
        ficheiros.descricao = this.uploadedFiles[x].descricao;
        ficheiros.ordem = this.uploadedFiles[x].ordem;
        ficheiros.ficheiro_1 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro, this.uploadedFiles[x].ficheiro.length / 2);
        ficheiros.ficheiro_2 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro.length / 2, this.uploadedFiles[x].ficheiro.length);

        ficheiros.data_ULT_MODIF = new Date();
        ficheiros.utz_ULT_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        } else {
          this.gravarTabelaFicheiros3(ficheiros, count, this.uploadedFiles.length, id);
        }

        if (count == this.uploadedFiles.length) {
          if (this.novo) {
            this.router.navigate(['reclamacoesfornecedores/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });

            if (back != 0) {
              this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: id, redirect: back } });
            } else {
              this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: id } });
            }
            this.simular(this.inputgravou);
          }
        }

      }
    } else {

      for (var x in this.uploadedFiles) {
        var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS_FORNECEDOR;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_RECLAMACAO = id;
        if (!this.novo) ficheiros.id = this.uploadedFiles[x].id;
        ficheiros.caminho = this.uploadedFiles[x].src;
        ficheiros.nome = this.uploadedFiles[x].name;
        ficheiros.tipo = this.uploadedFiles[x].type;
        ficheiros.datatype = this.uploadedFiles[x].datatype;
        ficheiros.tamanho = this.uploadedFiles[x].size;
        ficheiros.descricao = this.uploadedFiles[x].descricao;
        ficheiros.ordem = this.uploadedFiles[x].ordem;
        ficheiros.data_ULT_MODIF = new Date();
        ficheiros.utz_ULT_MODIF = this.user;
        if (this.uploadedFiles[x].id != null) this.gravarTabelaFicheiros3(ficheiros, count, this.uploadedFiles.length, id);
      }

      this.displayLoading = false;
      if (this.novo) {
        this.router.navigate(['reclamacoesfornecedores/editar'], { queryParams: { id: id } });
        this.simular(this.inputnotifi);
      } else {
        var back;
        var sub2 = this.route
          .queryParams
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            back = params['redirect'] || 0;
          });

        if (back != 0) {
          this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: id, redirect: back } });
        } else {
          this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: id } });
        }
        this.simular(this.inputgravou);
      }
    }

  }

  gravarTabelaAccoesRealizar(id) {
    if (this.tabelaaccoesrealizar && this.tabelaaccoesrealizar.length > 0) {

      var count = 0;
      for (var x in this.tabelaaccoesrealizar) {
        count++;
        if (this.tabelaaccoesrealizar[x].responsavel != null && this.tabelaaccoesrealizar[x].responsavel != "" && this.tabelaaccoesrealizar[x].descricao != null && this.tabelaaccoesrealizar[x].descricao != "") {
          var accoes = new RC_MOV_RECLAMACAO_FORNECEDOR_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaaccoesrealizar[x].id != null) {
            accoes = this.tabelaaccoesrealizar[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          accoes.id = this.tabelaaccoesrealizar[x].id;
          accoes.id_RECLAMACAO = id;
          accoes.ordem = this.tabelaaccoesrealizar[x].ordem;
          accoes.id_ACCAO = this.tabelaaccoesrealizar[x].id_ACCOES;
          accoes.tipo = "R";
          accoes.observacoes = this.tabelaaccoesrealizar[x].observacoes;
          accoes.estado = "P";
          accoes.obriga_EVIDENCIAS = this.tabelaaccoesrealizar[x].obriga_EVIDENCIAS;


          //var data = this.tabelaaccoesrealizar[x].data_REAL;
          //accoes.data_REAL = (data!=null && data != "" )? new Date(data) : null;
          accoes.data_PREVISTA = new Date(this.tabelaaccoesrealizar[x].data_PREVISTA);

          var id_resp = this.tabelaaccoesrealizar[x].responsavel;
          var tipo = "u";
          if (this.tabelaaccoesrealizar[x].responsavel.charAt(0) == 'u' || this.tabelaaccoesrealizar[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaaccoesrealizar[x].responsavel.charAt(0);
            id_resp = this.tabelaaccoesrealizar[x].responsavel.substr(1);
          }

          accoes.responsavel = id_resp;
          accoes.tipo_RESPONSAVEL = tipo;


          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaAccoesRealizar2(accoes, count, this.tabelaaccoesrealizar.length, id);
          }
          if (count == this.tabelaaccoesrealizar.length) {
            //seguinte
            this.criarTarefas(id, 5);
          }

        }
      }
    } else {
      //seguinte
      this.criarTarefas(id, 5);
    }
  }

  //atualiza ou cria tarefa
  criarTarefas(id, modulo) {
    var link = webUrl.host + '/#/tarefas/view?id=';
    this.GTMOVTAREFASService.getAtualizaTarefaReclamacaoFornecedor(id, modulo, link).subscribe(
      response => {

      }, error => { console.log(error); });
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.reclamacoes.length;
    if (this.reclamacoes.length > 0) {
      this.inicia(this.reclamacoes[this.i]);
      var back;
      var sub2 = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          back = params['redirect'] || 0;
        });

      if (back != 0) {
        this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: this.reclamacoes[this.i], redirect: back } });
      } else {
        this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: this.reclamacoes[this.i] } });
      }

    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.reclamacoes.length;
    }
    this.i = this.i - 1;
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });
    if (back != 0) {
      this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: this.reclamacoes[this.i], redirect: back } });
    } else {
      this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: this.reclamacoes[this.i] } });
    }

    if (this.reclamacoes.length > 0) {
      this.inicia(this.reclamacoes[this.i]);
    }
  }


  cancelar() {

  }

  apagar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var reclamacao = new RC_MOV_RECLAMACAO_FORNECEDOR;

        reclamacao = this.reclamacao_dados;

        reclamacao.utz_ANULACAO = this.user;
        reclamacao.data_ANULACAO = new Date();
        reclamacao.inativo = true;
        reclamacao.estado = "R";

        this.RCMOVRECLAMACAOFORNECEDORService.update(reclamacao).subscribe(
          res => {
            this.RCMOVRECLAMACAOFORNECEDORService.atualizaestadosaccoes(reclamacao.id_RECLAMACAO, 5).subscribe(
              res => { }, error => { console.log(error); });
            this.router.navigate(['reclamacoesfornecedores']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  imprimir(relatorio, id) {

  }

  validar() {

  }
  consulta() {

  }

  duplicar() {

  }


  btconcluir() {

  }
  backview() {
    this.location.back();
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

  btgravar() {
    this.simular(this.buttongravar);
  }

  gravarTabelaFicheiros2(ficheiros, count, total, id) {
    this.RCMOVRECLAMACAOFICHEIROSFORNECEDORService.update(ficheiros).subscribe(
      res => {
        if (count == total && this.novo) {
          this.router.navigate(['reclamacoesfornecedores/editar'], { queryParams: { id: id } });
          this.simular(this.inputnotifi);
        } else if (!this.novo) {
          this.uploadedFiles.push({
            data: res,
            ordem: this.getORDEM(),
            data_CRIA: ficheiros.data_CRIA, responsavel: null, ficheiro: ficheiros.ficheiro_1 + ficheiros.ficheiro_2,
            id_TAREFA: null, utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.data_CRIA) + " " + new Date(ficheiros.data_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.id, name: ficheiros.nome, datatype: ficheiros.datatype, src: ficheiros.caminho, type: ficheiros.tipo, size: ficheiros.tamanho, descricao: ficheiros.descricao
          });
          this.uploadedFiles = this.uploadedFiles.slice();
        }
      },
      error => { console.log(error); });
  }


  gravarTabelaFicheiros3(ficheiros, count, total, id) {
    this.RCMOVRECLAMACAOFICHEIROSFORNECEDORService.update_ordem(ficheiros).subscribe(
      res => {
      },
      error => { console.log(error); });
  }

  getORDEM() {
    var max = 0;
    for (var x in this.uploadedFiles) {
      if (this.uploadedFiles[x].ordem > max) { max = this.uploadedFiles[x].ordem }
    }

    return max + 1;
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

  //ao alterar Problema repetido
  atualizacombo() {
    if (!this.problema_REPETIDO) {
      this.numero_RECLAMACAO_REPETIDA = null;
    } else {
      this.numero_RECLAMACAO_REPETIDA = this.drop_numero_reclamacao[0].value;
    }
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
      this.RCMOVRECLAMACAOFICHEIROSFORNECEDORService.delete(tab.id).then(
        res => {
          //alterar ficheiro de pasta
          /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
             (res) => { });*/
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

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


    } else {
      this.location.back();
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
        this.router.navigate(['reclamacoesfornecedores/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['reclamacoesfornecedores/editar'], { queryParams: { id: page } });
      }

    }
  }

  novarecla() {
    this.router.navigate(['reclamacoesfornecedores/novo']);
  }

  exportar() {
    var filename = new Date().toLocaleString().replace(/\D/g, '');

    var filenametransfer = "Relatório de Incidência Fornecedor " + this.titulo.replace("/", "_") + "- " + this.designacao_REF;

    this.RelatoriosService.downloadPDF("pdf", filename, this.numero_RECLAMACAO, 'reclamacao_fornecedor').subscribe(
      (res) => {

        FileSaver.saveAs(res, filenametransfer);
      }
    );

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

  //gravar unidade de zona
  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "RF";
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    ACCOES_RECLAMACAO.utz_CRIA = this.user;
    ACCOES_RECLAMACAO.data_CRIA = new Date();
    this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
      this.carregaaccoes(false);
      this.displayAddAccao = false;
      this.simular(this.inputgravou);
    },
      error => { console.log(error); this.simular(this.inputerro); });

  }

  carregaaccoes(continua = true) {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("RF").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();
        /* if (continua) this.carregaGrupos();*/
      },
      error => { console.log(error); /*if (continua) this.carregaGrupos();*/ });
  }


  alterarEmail2(index, event, tabela) {
    if (event.target.value.toString().includes("u")) {
      var id = event.target.value.toString().replace("u", "");
      if (tabela == "tabelaaccoesrealizar") {
        this.tabelaaccoesrealizar[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      }
    } else {
      if (tabela == "tabelaaccoesrealizar") {
        this.tabelaaccoesrealizar[index].area = "";
      }
    }
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

  getResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores2.find(item => item.value == id);
    if (id != null && id.toString().includes("u")) {
      var utz2 = this.drop_utilizadores.find(item => item.label == "Utilizadores").itens;
      utz = utz2.find(item => item.value == id);
    } else if (id != null && id.toString().includes("g")) {
      var utz2 = this.drop_utilizadores.find(item => item.label == "Grupos").itens;
      utz = utz2.find(item => item.value == id);
    }
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  carregaGrupos() {

    this.GERGRUPOService.getAll().subscribe(
      response => {
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x].descricao, value: "g" + response[x].id });
          //this.tabelagrupos.push({ label: response[x].descricao, value: response[x].id })
        }
        this.drop_utilizadores.push({ label: "Grupos", itens: grupo });

        this.drop_utilizadores = this.drop_utilizadores.slice();
        // this.tabelagrupos = this.tabelagrupos.slice();

      },
      error => { console.log(error); });
  }

  IrPara(id, responsavel) {

    var id_r = null;
    if (responsavel.toString().charAt(0) == 'u') {
      id_r = responsavel.substr(1);
    }
    if (this.adminuser || this.user == this.utz_RESPONSAVEL || this.user == this.utz_CRIA || id_r == this.user) {
      this.router.navigateByUrl('tarefas/view?id=' + id + "&redirect=reclamacoesfornecedores/viewkvk\id=" + this.numero_RECLAMACAO);
    }
  }


  adicionar_linha(tabela) {
    if (tabela == "tabelaaccoesrealizar") {
      let sum = 0;
      if (this.tabelaaccoesrealizar.length > 0) sum = this.tabelaaccoesrealizar.reduce((max, b) => Math.max(max, b.ordem), this.tabelaaccoesrealizar[0].ordem);

      this.tabelaaccoesrealizar.push({ area: "", obriga_EVIDENCIAS: false, id: null, ordem: sum + 1, concluido_UTZ: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null, nome_estado: "Pendente", responsavel: null, data_REAL: "", data_PREVISTA: null });
      this.tabelaaccoesrealizar = this.tabelaaccoesrealizar.slice();
    }

  }

  apagar_linha(tabela, index) {

    if (tabela == "tabelaaccoesrealizar") {
      var tab = this.tabelaaccoesrealizar[index];
      if (tab.id == null) {
        this.tabelaaccoesrealizar = this.tabelaaccoesrealizar.slice(0, index).concat(this.tabelaaccoesrealizar.slice(index + 1));
        this.atualiza_ordem(tabela);
      } else {
        /*this.RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService.delete(tab.id).then(
          res => {
            this.tabelaaccoesrealizar = this.tabelaaccoesrealizar.slice(0, index).concat(this.tabelaaccoesrealizar.slice(index + 1));
            this.atualiza_ordem(tabela);
          },
          error => { console.log(error); this.simular(this.inputerro); });*/

        var accoes1 = new RC_MOV_RECLAMACAO_FORNECEDOR_PLANOS_ACCOES;
        accoes1 = this.tabelaaccoesrealizar[index].data;
        this.tabelaaccoesrealizar[index].estado = 'A';
        this.tabelaaccoesrealizar[index].nome_estado = this.geEstado('A');
        accoes1.estado = 'A';
        accoes1.data_ULT_MODIF = new Date();
        accoes1.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoesRealizar2(accoes1, 1, 2, 0, true, index, true);
      }
    }
  }

  gravarTabelaAccoesRealizar2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {
    this.RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          //this.criaTarefas(res.id, 5);
        }


        if (finaliza) this.tabelaaccoesrealizar[index].concluido_UTZ = this.user;
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


          this.GTMOVTAREFASService.update(tarefa).then(response => {
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

  atualiza_ordem(tabela) {
    var ordem = 1;
    for (var x in this[tabela]) {
      this[tabela][x].ordem = ordem;
      ordem++;
    }
  }



  finalizar_linha(tabela, index) {

    if (tabela == "tabelaaccoesrealizar") {
      var accoes = new RC_MOV_RECLAMACAO_FORNECEDOR_PLANOS_ACCOES;

      accoes = this.tabelaaccoesrealizar[index].data;

      if (this.tabelaaccoesrealizar[index].data_REAL == null || this.tabelaaccoesrealizar[index].data_REAL == "") {
        this.tabelaaccoesrealizar[index].data_REAL = new Date();
      }
      accoes.data_REAL = this.tabelaaccoesrealizar[index].data_REAL;
      accoes.concluido_DATA = new Date();
      accoes.concluido_UTZ = this.user;
      accoes.estado = 'C';

      this.tabelaaccoesrealizar[index].estado = 'C';
      this.tabelaaccoesrealizar[index].nome_estado = this.geEstado('C');

      this.gravarTabelaAccoesRealizar2(accoes, 1, 2, 0, true, index, true);

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


  /********************  TABELA ACOES **************************** */
  carregatabelasaccoes(id) {

    this.tabelaaccoesrealizar = [];

    this.RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService.getbyidreclamacao(id).subscribe(
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

            if (response[x].tipo == "R") {

              this.tabelaaccoesrealizar.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, data_REAL: data_real, responsavel: tipo + response[x].responsavel, id_ACCOES: response[x].id_ACCAO,
                data_PREVISTA: new Date(response[x].data_PREVISTA), ordem: response[x].ordem, descricao: accao, area: response[x].area
              });

            }

          }

          this.tabelaaccoesrealizar = this.tabelaaccoesrealizar.slice();
        }
        //this.carregatabelapreventivas(id);

      }, error => {
        //this.carregatabelapreventivas(id);

        console.log(error);
      });
  }
}
