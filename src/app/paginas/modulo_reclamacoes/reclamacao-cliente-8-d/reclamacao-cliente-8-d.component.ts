import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { webUrl } from 'assets/config/webUrl';
import { FileUpload, ConfirmationService } from '../../../../../node_modules/primeng/primeng';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../../../servicos/upload.service';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RCMOVRECLAMACAOService } from '../../../servicos/rc-mov-reclamacao.service';
import { RC_MOV_RECLAMACAO } from '../../../entidades/RC_MOV_RECLAMACAO';
import { RCDICTIPODEFEITOService } from '../../../servicos/rc-dic-tipo-defeito.service';
import { RCDICTIPORECLAMACAOService } from '../../../servicos/rc-dic-tipo-reclamacao.service';
import { RCDICREJEICAOService } from '../../../servicos/rc-dic-rejeicao.service';
import { RCDICGRAUIMPORTANCIAService } from '../../../servicos/rc-dic-grau-importancia.service';
import { ABDICCOMPONENTEService } from '../../../servicos/ab-dic-componente.service';
import { RC_MOV_RECLAMACAO_FICHEIROS } from '../../../entidades/RC_MOV_RECLAMACAO_FICHEIROS';
import { RC_MOV_RECLAMACAO_EQUIPA } from '../../../entidades/RC_MOV_RECLAMACAO_EQUIPA';
import { RC_MOV_RECLAMACAO_ARTIGO_SIMILARES } from '../../../entidades/RC_MOV_RECLAMACAO_ARTIGO_SIMILARES';
import { RC_MOV_RECLAMACAO_PLANOS_ACCOES } from '../../../entidades/RC_MOV_RECLAMACAO_PLANOS_ACCOES';
import { RC_MOV_RECLAMACAO_ENVIOS_GARANTIDOS } from '../../../entidades/RC_MOV_RECLAMACAO_ENVIOS_GARANTIDOS';
import { RCDICTEMPORESPOSTAService } from '../../../servicos/rc-dic-tempo-resposta.service';
import { RCMOVRECLAMACAOFICHEIROSService } from '../../../servicos/rc-mov-reclamacao-ficheiros.service';
import { RCMOVRECLAMACAOEQUIPAService } from '../../../servicos/rc-mov-reclamacao-equipa.service';
import { RCMOVRECLAMACAOARTIGOSIMILARESService } from '../../../servicos/rc-mov-reclamacao-artigo-similares.service';
import { RCMOVRECLAMACAOPLANOACCOESCORRETIVASService } from '../../../servicos/rc-mov-reclamacao-plano-accoes-corretivas.service';
import { RCMOVRECLAMACAOENVIOSGARANTIDOSService } from '../../../servicos/rc-mov-reclamacao-envios-garantidos.service';
import { RCDICFICHEIROSANALISEService } from '../../../servicos/rc-dic-ficheiros-analise.service';
import { GERUTILIZADORESService } from '../../../servicos/ger-utilizadores.service';
import { GERGRUPOService } from '../../../servicos/ger-grupo.service';
import * as FileSaver from 'file-saver';
import { RCDICACCOESRECLAMACAOService } from '../../../servicos/rc-dic-accoes-reclamacao.service';
import { RCMOVRECLAMACAOSTOCKService } from '../../../servicos/rc-mov-reclamacao-stock.service';
import { RC_MOV_RECLAMACAO_STOCK } from '../../../entidades/RC_MOV_RECLAMACAO_STOCK';
import { GT_DIC_TAREFAS } from '../../../entidades/GT_DIC_TAREFAS';
import { GTMOVTAREFASService } from '../../../servicos/gt-mov-tarefas.service';
import { GT_MOV_TAREFAS } from '../../../entidades/GT_MOV_TAREFAS';
import { GT_LOGS } from '../../../entidades/GT_LOGS';
import { RCMOVRECLAMACAOENCOMENDASService } from 'app/servicos/rc-mov-reclamacao-encomendas.service';
import { RC_MOV_RECLAMACAO_ENCOMENDAS } from 'app/entidades/RC_MOV_RECLAMACAO_ENCOMENDAS';
import { RCMOVRECLAMACAOTIPONAODETECAOService } from 'app/servicos/rc-mov-reclamacao-tipo-nao-detecao.service';
import { RCMOVRECLAMACAOTIPOOCORRENCIAService } from 'app/servicos/rc-mov-reclamacao-tipo-ocorrencia.service';
import { RCMOVRECLAMACAOCLIENTESService } from 'app/servicos/rc-mov-reclamacao-clientes.service';
import { RC_MOV_RECLAMACAO_CLIENTES } from 'app/entidades/RC_MOV_RECLAMACAO_CLIENTES';


@Component({
  selector: 'app-reclamacao-cliente-8-d',
  templateUrl: './reclamacao-cliente-8-d.component.html',
  styleUrls: ['./reclamacao-cliente-8-d.component.css']
})
export class ReclamacaoCliente8DComponent implements OnInit {
  modoedicao = false;

  drop_rejeicao = [];
  drop_tipo_reclamacao = [];
  drop_grau_importancia = [];
  drop_cliente = [];
  drop_referencia = [];
  drop_tipo_defeito = [];
  drop_numero_reclamacao = [];
  drop_utilizadores = [];


  classstep = "step-documentos"
  tabelaEnvios = [];
  tabelapreventiva = [];
  tabelaaccoesimediatas = [];
  ficheirodeanalise = [];
  tabelaEquipa = [];
  tabelaArtigosSimilar = [];
  tabelaClientes = [];

  fileselect = [];
  temporesposta = [];
  uploadedFiles: any[] = [];
  filedescricao = [];
  fileselectinput = [];
  display: boolean = false;
  displayverificar = false;
  srcelement;
  type: string;
  numero_RECLAMACAO;
  titulo;
  numero_RECLAMACAO_CLIENTE;
  data_CRIA;
  data_RECLAMACAO;
  rejeicao;
  tipo_RECLAMACAO;
  utz_CRIA;
  utz_RESPONSAVEL;
  grau_IMPORTANCIA;
  descricao_PROBLEMA_IDIOMA_CLIENTE;
  cliente;
  morada_CLIENTE;
  contato_CLIENTE;
  email_CLIENTE;
  telefone_CLIENTE;
  referencia;
  designacao_REF;
  familia_REF;
  lote;
  tipo_DEFEITO;
  reclamacao_REVISTA = false;
  qtd_ENVIADA;
  qtd_RECUSADA;
  devolucao;
  check_SR;
  revista_MURO;
  impacto_SR;
  observacoes_RECLAMACAO;
  numero_ENVIOS_GARANTIDOS = 0;
  step1CONCLUIDO;
  step2CONCLUIDO;
  step3CONCLUIDO;
  step4CONCLUIDO;
  step5CONCLUIDO;
  step6CONCLUIDO;
  step7CONCLUIDO;
  step8CONCLUIDO;
  descricao_PROBLEMA;
  problema_REPETIDO;
  numero_RECLAMACAO_REPETIDA;
  reclamacao_REPETIDA_ACEITE;

  causas_PROBLEMA;
  causas_PROBLEMA_IDIOMA_CLIENTE;
  analise_CAUSAS_PROBLEMA;
  analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE;

  dias_ATRASO4;
  responsabilidade_ATRASO4;

  dias_ATRASO6;
  responsabilidade_ATRASO6;

  accoes_NECESSARIAS;
  accoes_NECESSARIAS_TEXTO;
  reclamacao_ENCERRADA;
  data_FECHO;


  custos_EXTERNA;
  custos_INTERNA;
  custos_DEVOLUCAO;
  custos_OUTROS;
  custos_TOTAL;
  custos_INTERNA_QTD_CLASSIF;
  custos_INTERNA_QTD_REJEITADA;
  custos_REJEICAO_INTERNA;
  custos_EXTERNA_QTD_CLASSIF;
  custos_EXTERNA_QTD_REJEITADA;
  custos_REJEICAO_EXTERNA;

  ref_IGUAIS: boolean;
  existem_OUTROS_CLIENTES: boolean;
  accoes_EVITAR: boolean;
  observacoes_RESULTADOS: string;
  user: any;
  novo: boolean;
  reclamacoes: any;
  i: any;

  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditar2') alteraeditar2: ElementRef;
  @ViewChild('alteracancelar') alteracancelar: ElementRef;
  @ViewChild('inputartigoexiste') inputartigoexiste: ElementRef;


  reclamacao_dados: RC_MOV_RECLAMACAO;
  hora_CRIA: string;
  hora_RECLAMACAO;
  tabelaaccoescorretivas: any[] = [];
  tabelaEficacia: any[] = [];
  responsabilidade_ATRASO4_DESCRICAO: string;
  responsabilidade_ATRASO6_DESCRICAO: string;

  disimprimir: boolean;
  drop_utilizadores2: any;
  step1CONCLUIDO_UTZ: any;
  step2CONCLUIDO_UTZ: any;
  step3CONCLUIDO_UTZ: any;
  step4CONCLUIDO_UTZ: any;
  step5CONCLUIDO_UTZ: any;
  step6CONCLUIDO_UTZ: any;
  step7CONCLUIDO_UTZ: any;
  step8CONCLUIDO_UTZ: any;

  acessoSTEP1 = false;
  acessoSTEP2 = false;
  acessoSTEP3 = false;
  acessoSTEP4 = false;
  acessoSTEP5 = false;
  acessoSTEP6 = false;
  acessoSTEP7 = false;
  acessoSTEP8 = false;
  acessoadicionarACCAO = false;
  temp_RECLAMACAO: RC_MOV_RECLAMACAO;
  step1CONCLUIDO_DATA: Date;
  step8CONCLUIDO_DATA: Date;
  step7CONCLUIDO_DATA: Date;
  step6CONCLUIDO_DATA: Date;
  step5CONCLUIDO_DATA: Date;
  step4CONCLUIDO_DATA: Date;
  step3CONCLUIDO_DATA: Date;
  step2CONCLUIDO_DATA: Date;
  drop_moradas: any[] = [];
  referencia_temp: string;
  etsnum: string;
  apagarficheiros: any;
  nomeficheiro: any;
  campo_x: any;
  selectedType = "lote";
  types: { label: string; value: string; icon: string; }[];
  types2: { label: string; value: string; icon: string; }[];
  displaystock: boolean;
  displayenvios: boolean;
  displayplaneado: boolean;
  displayencomendado: boolean;
  tabelaencomendado: any[] = [];
  tabelaplaneado: any[] = [];
  tabelastock: any[];
  displayLoading: boolean;
  drop_artigos: any[];
  drop_accoes: any[];
  validaloading: boolean;
  displayvalidacao: boolean;
  errovalida: string = ""; displayconsultaLotes: boolean;
  tabelaConsultaLotes: any[];
  selectedType2: string;
  descricaoeng: string;
  id_selected: number;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  displayArtigos: boolean;
  temp_INDEX: any;
  motraopcao: any;
  duplica: boolean = false;
  adminuser = false;
  reclamacao_COM_REVISAO: any;
  data_RECLAMACAO_REVISTA;
  hora_PRAZO_REVISAO;
  hora_RECLAMACAO_REVISTA;
  data_PRAZO_REVISAO;
  tabelagrupos = [];
  displaygrupos: boolean;
  tabelastock2: any[];
  user_nome: any;
  tabelaencomendado2: any;
  motraopcao2: any;
  tabelaEnviosGarantidos: any;
  envio_GARANTIDO_POR = "cliente";
  mensagem_verifica: string;
  dias_ATRASO5: number;
  responsabilidade_ATRASO5: string;
  responsabilidade_ATRASO5_DESCRICAO: string;
  dias_ATRASO1: number;
  responsabilidade_ATRASO1: string;
  responsabilidade_ATRASO1_DESCRICAO: string;
  dias_ATRASO2: number;
  responsabilidade_ATRASO2: string;
  responsabilidade_ATRASO2_DESCRICAO: string;
  dias_ATRASO3: number;
  responsabilidade_ATRASO3: string;
  responsabilidade_ATRASO3_DESCRICAO: string;
  dias_ATRASO7: number;
  responsabilidade_ATRASO7: string;
  responsabilidade_ATRASO7_DESCRICAO: string;
  dias_ATRASO8: number;
  responsabilidade_ATRASO8: string;
  responsabilidade_ATRASO8_DESCRICAO: string;
  tempo_ATRASO: number;
  temp_MOTIVO_ATRASO;
  temp_RESPONSABILIDADE_ATRASADO;
  displayResponsabilidade: boolean;
  temp_ETAPA: any;
  estado = "A";
  utz_FECHO: any;
  texto_estado = "";
  tabelaTipoOcorrencia: any;
  tabelaTipoNaoDetecao: any;
  data_FECHO_texto: string;
  obriga_revisao: any;
  tipo_NAO_DETECAO: number;
  tipo_OCORRENCIA: number;
  drop_linguas;
  numero_RECLAMACAO_RELATORIO: any;
  drop_cliente_tabela: any[];
  display_ref_cliente: boolean;
  filteredreferencia: any[];
  referencias = [];
  referencia_filter: any;
  campo_ref: any;

  drop_cliente_pesquisa: any[];
  cliente_pesquisa: any;


  constructor(private RCMOVRECLAMACAOTIPOOCORRENCIAService: RCMOVRECLAMACAOTIPOOCORRENCIAService, private RCMOVRECLAMACAOTIPONAODETECAOService: RCMOVRECLAMACAOTIPONAODETECAOService, private RCMOVRECLAMACAOENCOMENDASService: RCMOVRECLAMACAOENCOMENDASService, private elementRef: ElementRef, private GTMOVTAREFASService: GTMOVTAREFASService, private confirmationService: ConfirmationService, private RCMOVRECLAMACAOSTOCKService: RCMOVRECLAMACAOSTOCKService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService, private GERGRUPOService: GERGRUPOService, private GERUTILIZADORESService: GERUTILIZADORESService, private RCDICFICHEIROSANALISEService: RCDICFICHEIROSANALISEService, private RCMOVRECLAMACAOENVIOSGARANTIDOSService: RCMOVRECLAMACAOENVIOSGARANTIDOSService, private RCMOVRECLAMACAOPLANOACCOESCORRETIVASService: RCMOVRECLAMACAOPLANOACCOESCORRETIVASService, private RCMOVRECLAMACAOARTIGOSIMILARESService: RCMOVRECLAMACAOARTIGOSIMILARESService, private RCMOVRECLAMACAOEQUIPAService: RCMOVRECLAMACAOEQUIPAService
    , private RCMOVRECLAMACAOFICHEIROSService: RCMOVRECLAMACAOFICHEIROSService, private RCDICTEMPORESPOSTAService: RCDICTEMPORESPOSTAService,
    private RCMOVRECLAMACAOCLIENTESService: RCMOVRECLAMACAOCLIENTESService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private RCDICTIPODEFEITOService: RCDICTIPODEFEITOService, private RCDICTIPORECLAMACAOService: RCDICTIPORECLAMACAOService, private RCDICREJEICAOService: RCDICREJEICAOService, private RCDICGRAUIMPORTANCIAService: RCDICGRAUIMPORTANCIAService, private renderer: Renderer, private RCMOVRECLAMACAOService: RCMOVRECLAMACAOService, private route: ActivatedRoute, private location: Location, private sanitizer: DomSanitizer, private UploadService: UploadService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {
    if (document.getElementById("script1")) document.getElementById("script1").remove();
    var script1 = document.createElement("script");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/jqbtk.js");
    document.body.appendChild(script1);

    this.types = [
      { label: 'Lote', value: 'lote', icon: 'fa-close' },
      { label: 'Etiqueta', value: 'etiqueta', icon: 'fa-close' },
      { label: 'Guia', value: 'guia', icon: 'fa-close' }
    ];

    this.types2 = [
      { label: 'Referência', value: 'referencia', icon: 'fa-close' },
      { label: 'Cliente', value: 'cliente', icon: 'fa-close' }
    ];

    this.drop_linguas = [{ value: null, label: "Selecionar idioma" },
    { value: "es", label: "Espanhol" },
    { value: "fr", label: "Francês" },
    { value: "en", label: "Inglês" },
    { value: "pt", label: "Português" }];

    this.selectedType2 = "referencia";

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    //this.globalVar.setduplicar(true);
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
    if (step != 0) { this.classstep = step; }

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      this.numero_RECLAMACAO_RELATORIO = id;
      if (this.globalVar.getfiltros("reclamacaocliente_id") && this.globalVar.getfiltros("reclamacaocliente_id").length > 0) {
        this.reclamacoes = this.globalVar.getfiltros("reclamacaocliente_id");
        this.i = this.reclamacoes.indexOf(+id);

        var id_r = this.reclamacoes[this.i];
        if (this.i < 0) { id_r = id }
        this.carregaDados(true, id_r);
        //preenche combo reclamações
        this.RCMOVRECLAMACAOService.getAll().subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              this.drop_numero_reclamacao.push({ label: "Selecionar Reclamação", value: null });
              for (var x in response) {
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_CLIENTE, value: response[x].id_RECLAMACAO });
              }
            }
          }, error => { console.log(error); });

      } else {
        //preenche array para navegar 
        this.RCMOVRECLAMACAOService.getAll().subscribe(
          response => {
            this.reclamacoes = [];
            var count = Object.keys(response).length;
            if (count > 0) {
              this.drop_numero_reclamacao.push({ label: "Selecionar Reclamação", value: null });
              for (var x in response) {
                this.reclamacoes.push(response[x].id_RECLAMACAO);
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_CLIENTE, value: response[x].id_RECLAMACAO });
              }
            } else {
              this.reclamacoes.push(id);
            }
            if (this.reclamacoes.indexOf(+id) < 0) { this.reclamacoes.push(parseInt(id)); }
            this.i = this.reclamacoes.indexOf(+id);

            this.carregaDados(true, this.reclamacoes[this.i]);
            //this.inicia(this.reclamacoes[this.i]);


          }, error => { console.log(error); });
      }

      this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500editar"));
      this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500criar"));
      this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500apagar"));
      this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500duplicar"));
      this.globalVar.setduplicar(JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500duplicar"));
      this.acessoSTEP1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step1");
      this.acessoSTEP2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step2");
      this.acessoSTEP3 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step3");
      this.acessoSTEP4 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step4");
      this.acessoSTEP5 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step5");
      this.acessoSTEP6 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step6");
      this.acessoSTEP7 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step7");
      this.acessoSTEP8 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step8");

      this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node526");

      this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500apagarficheiros");



      if (!this.acessoSTEP1) this.classstep = "";

      this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500imprimir");
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
      } else if (urlarray[1].match("duplicar")) {


        this.acessoSTEP1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step1");
        this.acessoSTEP2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step2");
        this.acessoSTEP3 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step3");
        this.acessoSTEP4 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step4");
        this.acessoSTEP5 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step5");
        this.acessoSTEP6 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step6");
        this.acessoSTEP7 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step7");
        this.acessoSTEP8 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500step8");
        this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node526");

        var id2;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id2 = params['id'] || 0;
          });
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.duplica = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        this.globalVar.setduplicar(false);
        //preenche drop reclamações
        this.RCMOVRECLAMACAOService.getAll().subscribe(
          response => {
            this.reclamacoes = [];
            for (var x in response) {
              if (response[x].id_RECLAMACAO != id2) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_CLIENTE, value: response[x].id_RECLAMACAO });
            }
            this.carregaDados(true, id2);
          }, error => { console.log(error); this.carregaDados(true, id2); });

      }
    }

  }


  carregaDados(inicia, id) {
    //preenche array para navegar 
    this.RCDICREJEICAOService.getAll().subscribe(
      response => {
        this.drop_rejeicao = [];
        this.drop_rejeicao.push({ label: 'Sel. Rejeição', value: "" });
        for (var x in response) {
          this.drop_rejeicao.push({ revisao_RECLAMACAO: response[x].revisao_RECLAMACAO, label: response[x].descricao, value: response[x].id });
        }
        this.carregaUtilizadores(inicia, id);
      }, error => {
        this.carregaUtilizadores(inicia, id);
        console.log(error);
      });


    // drop_cliente = [{ label: "Doureca", value: 1 }];

  }



  carregaUtilizadores(inicia, id) {
    this.drop_utilizadores = [];
    this.drop_utilizadores2 = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores2.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          //grupo.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR });
          this.drop_utilizadores2.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }
        //this.drop_utilizadores.push({ label: "Utilizadores", itens: grupo });

        this.drop_utilizadores = this.drop_utilizadores.slice();
        this.drop_utilizadores2 = this.drop_utilizadores2.slice();
        this.carregaaccoes(inicia, id);
      },
      error => { console.log(error); this.carregaaccoes(inicia, id); });
  }

  carregaaccoes(inicia, id, continua = true) {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("R").subscribe(
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
        for (var x in response) {
          grupo.push({ label: response[x].descricao, value: "g" + response[x].id });
          this.tabelagrupos.push({ label: response[x].descricao, value: response[x].id })
        }
        this.drop_utilizadores.push({ label: "Grupos", itens: grupo });

        this.drop_utilizadores = this.drop_utilizadores.slice();
        this.tabelagrupos = this.tabelagrupos.slice();
        this.tempoResposta(inicia, id);
      },
      error => { console.log(error); this.tempoResposta(inicia, id); });
  }

  tempoResposta(inicia, id) {
    this.RCDICTEMPORESPOSTAService.getAll().subscribe(
      response => {
        this.temporesposta = [];
        for (var x in response) {
          this.temporesposta['step1'] = response[x].tempo_RESPOSTA_STEP1;
          this.temporesposta['step2'] = response[x].tempo_RESPOSTA_STEP2;
          this.temporesposta['step3'] = response[x].tempo_RESPOSTA_STEP3;
          this.temporesposta['step4'] = response[x].tempo_RESPOSTA_STEP4;
          this.temporesposta['step5'] = response[x].tempo_RESPOSTA_STEP5;
          this.temporesposta['step6'] = response[x].tempo_RESPOSTA_STEP6;
          this.temporesposta['step7'] = response[x].tempo_RESPOSTA_STEP7;
          this.temporesposta['step8'] = response[x].tempo_RESPOSTA_STEP8;
          this.temporesposta['revisao'] = response[x].tempo_REVISAO;

        }
        this.tiporeclamacao(inicia, id);
      }, error => { this.tiporeclamacao(inicia, id); console.log(error); });
  }

  tiporeclamacao(inicia, id) {
    this.RCDICTIPORECLAMACAOService.getAll().subscribe(
      response => {
        this.drop_tipo_reclamacao = [];
        this.drop_tipo_reclamacao.push({ label: 'Sel. Tipo Recla.', value: "" });
        for (var x in response) {
          this.drop_tipo_reclamacao.push({ label: response[x].descricao, value: response[x].id });
        }
        this.grauimportancia(inicia, id);
      }, error => { this.grauimportancia(inicia, id); console.log(error); });
  }

  grauimportancia(inicia, id) {
    this.RCDICGRAUIMPORTANCIAService.getAll().subscribe(
      response => {
        this.drop_grau_importancia = [];
        this.drop_grau_importancia.push({ label: 'Sel. Grau Import.', value: "" });
        for (var x in response) {
          this.drop_grau_importancia.push({ label: response[x].descricao, value: response[x].id });
        }
        this.tipodefeito(inicia, id);
      }, error => { this.tipodefeito(inicia, id); console.log(error); });
  }

  tipodefeito(inicia, id) {
    this.RCDICTIPODEFEITOService.getAll().subscribe(
      response => {
        this.drop_tipo_defeito = [];
        this.drop_tipo_defeito.push({ label: 'Sel. Tipo Defeito', value: "" });
        for (var x in response) {
          this.drop_tipo_defeito.push({ label: response[x].descricao, value: response[x].id });
        }
        this.artigos(inicia, id);
      }, error => { this.artigos(inicia, id); console.log(error); });
  }

  artigos(inicia, id) {
    if (!this.novo || this.duplica) {
      this.ABDICCOMPONENTEService.getComponentesTodos().subscribe(
        response => {
          this.drop_artigos = [];
          var count = Object.keys(response).length;
          if (count > 0) {
            //  this.drop_artigos.push({ label: 'Sel. Ref. Comp.', value: null });
            for (var x in response) {
              this.drop_artigos.push({ valor: response[x].PROREF, design: response[x].PRODES1, FAMCOD: response[x].FAMCOD });
            }
          }
          this.clientes(inicia, id);
        }, error => { this.clientes(inicia, id); console.log(error); });
    } else {
      this.clientes(inicia, id);
    }
  }

  clientes(inicia, id) {
    this.ABDICCOMPONENTEService.getClientes().subscribe(
      response => {
        this.drop_cliente = [];
        this.drop_cliente.push({ label: 'Sel. Cliente.', value: "" });

        this.drop_cliente_tabela = [];
        this.drop_cliente_tabela.push({ label: 'Sel. Cliente.', value: "" });
        for (var x in response) {
          this.drop_cliente.push({ label: response[x].ADRNOM, value: { id: response[x].CLICOD, nome: response[x].ADRNOM } });
          this.drop_cliente_tabela.push({ label: response[x].CLICOD + ' - ' + response[x].ADRNOM, value: response[x].CLICOD, nome: response[x].ADRNOM });
        }
        this.drop_cliente = this.drop_cliente.slice();
        this.drop_cliente_tabela = this.drop_cliente_tabela.slice();

        if (inicia) this.inicia(id);
      }, error => {
        if (inicia) this.inicia(id);
        console.log(error);
      });
  }

  inicia(id) {

    this.RCMOVRECLAMACAOService.getbyID(id).subscribe(
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
            this.temp_RECLAMACAO = response[x];
            this.numero_RECLAMACAO = response[x].id_RECLAMACAO;
            this.titulo = response[x].titulo;
            this.selectedType = (response[x].tipo_CAMPO_LOTE != null && response[x].tipo_CAMPO_LOTE != "") ? response[x].tipo_CAMPO_LOTE : "lote";
            this.numero_RECLAMACAO_CLIENTE = response[x].numero_RECLAMACAO_CLIENTE;
            this.data_CRIA = new Date(response[x].data_CRIA);
            this.hora_CRIA = new Date(response[x].data_CRIA).toLocaleTimeString().slice(0, 5);
            this.data_RECLAMACAO = new Date(response[x].data_RECLAMACAO);
            this.hora_RECLAMACAO = new Date(response[x].data_RECLAMACAO).toLocaleTimeString().slice(0, 5);
            this.rejeicao = response[x].rejeicao;
            this.tipo_RECLAMACAO = response[x].id_TIPO_RECLAMACAO;
            this.utz_CRIA = response[x].utz_CRIA;
            this.utz_RESPONSAVEL = response[x].utz_RESPONSAVEL;
            this.grau_IMPORTANCIA = response[x].grau_IMPORTANCIA;
            this.descricao_PROBLEMA_IDIOMA_CLIENTE = response[x].descricao_PROBLEMA_IDIOMA_CLIENTE;
            this.cliente = this.drop_cliente.find(item => item.value.id == response[x].id_CLIENTE).value;

            if (!this.duplica) this.estado = response[x].estado;

            this.texto_estado = this.getESTADO(this.estado);

            if ((!this.duplica && (!this.adminuser && this.user != response[x].utz_RESPONSAVEL && this.user != response[x].utz_CRIA)) || this.estado == 'R' || this.estado == 'C') {
              this.modoedicao = false;
              this.simular(this.alteraeditar);
            }
            if (this.modoedicao && !this.novo) { this.simular(this.alteracancelar); }
            //this.morada_CLIENTE = response[x].morada_CLIENTE;

            this.contato_CLIENTE = response[x].contato_CLIENTE;
            this.email_CLIENTE = response[x].email_CLIENTE;
            this.telefone_CLIENTE = response[x].telefone_CLIENTE;
            this.referencia_temp = response[x].referencia;
            this.etsnum = response[x].etsnum;
            //this.referencia = this.drop_referencia.find(item => item.value.valor == response[x].referencia).value;
            this.designacao_REF = response[x].designacao_REF;
            this.familia_REF = response[x].familia_REF;
            this.lote = response[x].lote;
            this.tipo_DEFEITO = response[x].tipo_DEFEITO;
            this.tipo_NAO_DETECAO = response[x].tipo_NAO_DETECAO;
            this.tipo_OCORRENCIA = response[x].tipo_OCORRENCIA;
            this.reclamacao_REVISTA = (response[x].reclamacao_REVISTA == null) ? false : response[x].reclamacao_REVISTA;
            this.qtd_ENVIADA = response[x].qtd_ENVIADA;
            this.qtd_RECUSADA = response[x].qtd_RECUSADA;

            this.data_RECLAMACAO_REVISTA = (response[x].data_RECLAMACAO_REVISTA == null) ? null : new Date(response[x].data_RECLAMACAO_REVISTA);
            this.hora_RECLAMACAO_REVISTA = (response[x].data_RECLAMACAO_REVISTA == null) ? null : new Date(response[x].data_RECLAMACAO_REVISTA).toLocaleTimeString().slice(0, 5);

            this.data_PRAZO_REVISAO = (response[x].data_PRAZO_REVISAO == null) ? null : new Date(response[x].data_PRAZO_REVISAO);
            this.hora_PRAZO_REVISAO = (response[x].data_PRAZO_REVISAO == null) ? null : new Date(response[x].data_PRAZO_REVISAO).toLocaleTimeString().slice(0, 5);

            this.reclamacao_COM_REVISAO = response[x].reclamacao_COM_REVISAO;
            var valor = this.drop_rejeicao.find(item => item.value == this.rejeicao).revisao_RECLAMACAO;
            this.obriga_revisao = valor;
            this.devolucao = response[x].devolucao;
            this.check_SR = response[x].check_SR;
            this.revista_MURO = response[x].revista_MURO;
            this.impacto_SR = response[x].impacto_SR;
            this.observacoes_RECLAMACAO = response[x].observacoes_RECLAMACAO;
            this.numero_ENVIOS_GARANTIDOS = (response[x].numero_ENVIOS_GARANTIDOS == null) ? 0 : response[x].numero_ENVIOS_GARANTIDOS;
            this.envio_GARANTIDO_POR = (response[x].envio_GARANTIDO_POR == null) ? "cliente" : response[x].envio_GARANTIDO_POR;

            if (!this.duplica) this.step1CONCLUIDO = response[x].step1CONCLUIDO;
            if (!this.duplica) this.step2CONCLUIDO = response[x].step2CONCLUIDO;
            if (!this.duplica) this.step3CONCLUIDO = response[x].step3CONCLUIDO;
            if (!this.duplica) this.step4CONCLUIDO = response[x].step4CONCLUIDO;
            if (!this.duplica) this.step5CONCLUIDO = response[x].step5CONCLUIDO;
            if (!this.duplica) this.step6CONCLUIDO = response[x].step6CONCLUIDO;
            if (!this.duplica) this.step7CONCLUIDO = response[x].step7CONCLUIDO;
            if (!this.duplica) this.step8CONCLUIDO = response[x].step8CONCLUIDO;

            if (!this.duplica) this.step1CONCLUIDO_DATA = (response[x].step1CONCLUIDO_DATA != null) ? new Date(response[x].step1CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step2CONCLUIDO_DATA = (response[x].step2CONCLUIDO_DATA != null) ? new Date(response[x].step2CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step3CONCLUIDO_DATA = (response[x].step3CONCLUIDO_DATA != null) ? new Date(response[x].step3CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step4CONCLUIDO_DATA = (response[x].step4CONCLUIDO_DATA != null) ? new Date(response[x].step4CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step5CONCLUIDO_DATA = (response[x].step5CONCLUIDO_DATA != null) ? new Date(response[x].step5CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step6CONCLUIDO_DATA = (response[x].step6CONCLUIDO_DATA != null) ? new Date(response[x].step6CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step7CONCLUIDO_DATA = (response[x].step7CONCLUIDO_DATA != null) ? new Date(response[x].step7CONCLUIDO_DATA) : null;
            if (!this.duplica) this.step8CONCLUIDO_DATA = (response[x].step8CONCLUIDO_DATA != null) ? new Date(response[x].step8CONCLUIDO_DATA) : null;

            if (!this.duplica) this.step1CONCLUIDO_UTZ = response[x].step1CONCLUIDO_UTZ;
            if (!this.duplica) this.step2CONCLUIDO_UTZ = response[x].step2CONCLUIDO_UTZ;
            if (!this.duplica) this.step3CONCLUIDO_UTZ = response[x].step3CONCLUIDO_UTZ;
            if (!this.duplica) this.step4CONCLUIDO_UTZ = response[x].step4CONCLUIDO_UTZ;
            if (!this.duplica) this.step5CONCLUIDO_UTZ = response[x].step5CONCLUIDO_UTZ;
            if (!this.duplica) this.step6CONCLUIDO_UTZ = response[x].step6CONCLUIDO_UTZ;
            if (!this.duplica) this.step7CONCLUIDO_UTZ = response[x].step7CONCLUIDO_UTZ;
            if (!this.duplica) this.step8CONCLUIDO_UTZ = response[x].step8CONCLUIDO_UTZ;

            if (!this.duplica) this.estado = response[x].estado;

            this.texto_estado = this.getESTADO(this.estado);

            this.descricao_PROBLEMA = response[x].descricao_PROBLEMA;
            this.problema_REPETIDO = response[x].problema_REPETIDO;
            this.numero_RECLAMACAO_REPETIDA = response[x].numero_RECLAMACAO_REPETIDA;
            this.reclamacao_REPETIDA_ACEITE = response[x].reclamacao_REPETIDA_ACEITE;
            this.ref_IGUAIS = response[x].ref_IGUAIS;
            this.existem_OUTROS_CLIENTES = response[x].existem_OUTROS_CLIENTES;

            this.accoes_EVITAR = response[x].accoes_EVITAR;

            this.causas_PROBLEMA = response[x].causas_PROBLEMA;
            this.causas_PROBLEMA_IDIOMA_CLIENTE = response[x].causas_PROBLEMA_IDIOMA_CLIENTE;
            this.analise_CAUSAS_PROBLEMA = response[x].analise_CAUSAS_PROBLEMA;
            this.analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE = response[x].analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE;


            if (!this.duplica) this.dias_ATRASO1 = response[x].dias_ATRASO1;
            if (!this.duplica) this.responsabilidade_ATRASO1 = response[x].responsabilidade_ATRASO1;
            if (!this.duplica) this.responsabilidade_ATRASO1_DESCRICAO = response[x].responsabilidade_ATRASO1_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO2 = response[x].dias_ATRASO2;
            if (!this.duplica) this.responsabilidade_ATRASO2 = response[x].responsabilidade_ATRASO2;
            if (!this.duplica) this.responsabilidade_ATRASO2_DESCRICAO = response[x].responsabilidade_ATRASO2_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO3 = response[x].dias_ATRASO3;
            if (!this.duplica) this.responsabilidade_ATRASO3 = response[x].responsabilidade_ATRASO3;
            if (!this.duplica) this.responsabilidade_ATRASO3_DESCRICAO = response[x].responsabilidade_ATRASO3_DESCRICAO;


            if (!this.duplica) this.dias_ATRASO4 = response[x].dias_ATRASO4;
            if (!this.duplica) this.responsabilidade_ATRASO4 = response[x].responsabilidade_ATRASO4;
            if (!this.duplica) this.responsabilidade_ATRASO4_DESCRICAO = response[x].responsabilidade_ATRASO4_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO5 = response[x].dias_ATRASO5;
            if (!this.duplica) this.responsabilidade_ATRASO5 = response[x].responsabilidade_ATRASO5;
            if (!this.duplica) this.responsabilidade_ATRASO5_DESCRICAO = response[x].responsabilidade_ATRASO5_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO6 = response[x].dias_ATRASO6;
            if (!this.duplica) this.responsabilidade_ATRASO6 = response[x].responsabilidade_ATRASO6;
            if (!this.duplica) this.responsabilidade_ATRASO6_DESCRICAO = response[x].responsabilidade_ATRASO6_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO7 = response[x].dias_ATRASO7;
            if (!this.duplica) this.responsabilidade_ATRASO7 = response[x].responsabilidade_ATRASO7;
            if (!this.duplica) this.responsabilidade_ATRASO7_DESCRICAO = response[x].responsabilidade_ATRASO7_DESCRICAO;

            if (!this.duplica) this.dias_ATRASO8 = response[x].dias_ATRASO8;
            if (!this.duplica) this.responsabilidade_ATRASO8 = response[x].responsabilidade_ATRASO8;
            if (!this.duplica) this.responsabilidade_ATRASO8_DESCRICAO = response[x].responsabilidade_ATRASO8_DESCRICAO;

            this.accoes_NECESSARIAS = response[x].accoes_NECESSARIAS;
            this.accoes_NECESSARIAS_TEXTO = response[x].accoes_NECESSARIAS_TEXTO;
            this.reclamacao_ENCERRADA = response[x].reclamacao_ENCERRADA;
            if (!this.duplica) this.data_FECHO = (response[x].data_FECHO != null) ? new Date(response[x].data_FECHO) : null;
            if (!this.duplica) this.data_FECHO_texto = (response[x].data_FECHO != null) ? this.formatDate2(new Date(response[x].data_FECHO)) + " " + new Date(response[x].data_FECHO).toLocaleTimeString().slice(0, 5) : null;
            if (!this.duplica) this.utz_FECHO = response[x].utz_FECHO;
            this.observacoes_RESULTADOS = response[x].observacoes_RESULTADOS;


            if (!this.duplica) this.dias_ATRASO6 = response[x].dias_ATRASO6;
            if (!this.duplica) this.responsabilidade_ATRASO6 = response[x].responsabilidade_ATRASO6;
            if (!this.duplica) this.responsabilidade_ATRASO6_DESCRICAO = response[x].responsabilidade_ATRASO6_DESCRICAO;


            this.custos_DEVOLUCAO = response[x].custos_DEVOLUCAO;
            this.custos_EXTERNA = response[x].custos_EXTERNA;
            this.custos_EXTERNA_QTD_CLASSIF = response[x].custos_EXTERNA_QTD_CLASSIF;
            this.custos_EXTERNA_QTD_REJEITADA = response[x].custos_EXTERNA_QTD_REJEITADA;
            this.custos_INTERNA = response[x].custos_INTERNA;
            this.custos_INTERNA_QTD_CLASSIF = response[x].custos_INTERNA_QTD_CLASSIF;
            this.custos_INTERNA_QTD_REJEITADA = response[x].custos_INTERNA_QTD_REJEITADA;
            this.custos_OUTROS = response[x].custos_OUTROS;
            this.custos_REJEICAO_EXTERNA = response[x].custos_REJEICAO_EXTERNA;
            this.custos_REJEICAO_INTERNA = response[x].custos_REJEICAO_INTERNA;
            this.custos_TOTAL = response[x].custos_TOTAL;


            var data = new Date(new Date(this.data_RECLAMACAO).toDateString() + " " + this.hora_RECLAMACAO.slice(0, 5));

            this.temporesposta['step1_data'] = new Date(data);
            this.temporesposta['step2_data'] = new Date(data);
            this.temporesposta['step3_data'] = new Date(data);
            this.temporesposta['step4_data'] = new Date(data);
            this.temporesposta['step5_data'] = new Date(data);
            this.temporesposta['step6_data'] = new Date(data);
            this.temporesposta['step7_data'] = new Date(data);
            this.temporesposta['step8_data'] = new Date(data);
            this.data_PRAZO_REVISAO = new Date(data);

            if (this.step1CONCLUIDO && response[x].step1_DATA != null) { this.temporesposta['step1_data'] = new Date(response[x].step1_DATA); } else { this.temporesposta['step1_data'].setDate(data.getDate() + this.temporesposta['step1']); }
            if (this.step2CONCLUIDO && response[x].step2_DATA != null) { this.temporesposta['step2_data'] = new Date(response[x].step2_DATA); } else { this.temporesposta['step2_data'].setDate(data.getDate() + this.temporesposta['step2']); }
            if (this.step3CONCLUIDO && response[x].step3_DATA != null) { this.temporesposta['step3_data'] = new Date(response[x].step3_DATA); } else { this.temporesposta['step3_data'].setDate(data.getDate() + this.temporesposta['step3']); }
            if (this.step4CONCLUIDO && response[x].step4_DATA != null) { this.temporesposta['step4_data'] = new Date(response[x].step4_DATA); } else { this.temporesposta['step4_data'].setDate(data.getDate() + this.temporesposta['step4']); }
            if (this.step5CONCLUIDO && response[x].step5_DATA != null) { this.temporesposta['step5_data'] = new Date(response[x].step5_DATA); } else { this.temporesposta['step5_data'].setDate(data.getDate() + this.temporesposta['step5']); }
            if (this.step6CONCLUIDO && response[x].step6_DATA != null) { this.temporesposta['step6_data'] = new Date(response[x].step6_DATA); } else { this.temporesposta['step6_data'].setDate(data.getDate() + this.temporesposta['step6']); }
            if (this.step7CONCLUIDO && response[x].step7_DATA != null) { this.temporesposta['step7_data'] = new Date(response[x].step7_DATA); } else { this.temporesposta['step7_data'].setDate(data.getDate() + this.temporesposta['step7']); }
            if (this.step8CONCLUIDO && response[x].step8_DATA != null) { this.temporesposta['step8_data'] = new Date(response[x].step8_DATA); } else { this.temporesposta['step8_data'].setDate(data.getDate() + this.temporesposta['step8']); }

            if (this.reclamacao_REVISTA) { this.data_PRAZO_REVISAO = new Date(response[x].data_PRAZO_REVISAO); } else { this.data_PRAZO_REVISAO.setDate(data.getDate() + this.temporesposta['revisao']); }
            this.hora_PRAZO_REVISAO = this.data_PRAZO_REVISAO.toLocaleTimeString().slice(0, 5);
            if (this.duplica) {
              this.numero_RECLAMACAO = null;
              this.data_CRIA = new Date();
              this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
              this.utz_CRIA = this.user;
            }
          }

          this.getMoradas(this.cliente.id, true);
          this.getArtigos(this.etsnum, true);
          this.carregatabelaFiles(id);
          this.carregatabelaEquipa(id);
        }

      }, error => { console.log(error); });

  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];
    this.fileselect = [];
    this.fileselectinput = [];
    this.fileselect[99999] = true;
    this.RCMOVRECLAMACAOFICHEIROSService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate2(response[x][0].data_CRIA) + " " + new Date(response[x][0].data_CRIA).toLocaleTimeString();
            if (this.duplica) {
              datacria = this.formatDate2(data_at) + " " + data_at.toLocaleTimeString()
            }
            if (!this.duplica) id2 = response[x][0].id;

            /*if (response[x][0].id_FICHEIRO == null && response[x][0].id_TAREFA == null) {*/
            if ((this.duplica && response[x][0].id_TAREFA == null) || (!this.duplica)) {
              if (response[x][0].id_FICHEIRO != null) id2 = "f110" + response[x][0].id_FICHEIRO;
              this.uploadedFiles.push({
                data_CRIA: data_at, ficheiro: response[x][0].ficheiro,
                data: response[x][0], id_TAREFA: response[x][0].id_TAREFA, utilizador: response[x][1].nome_UTILIZADOR,
                datacria: datacria, responsavel: response[x][2],
                id: id2, name: response[x][0].nome, id_FICHEIRO: response[x][0].id_FICHEIRO,
                src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype, size: response[x][0].tamanho, descricao: response[x][0].descricao
              });
            } /*else*/

            if (response[x][0].id_TAREFA == null && response[x][0].id_FICHEIRO != null) {
              var id3 = null;
              if (!this.duplica) id3 = response[x][0].id
              this.fileselect[response[x][0].id_FICHEIRO] = true;
              this.fileselectinput[response[x][0].id_FICHEIRO] = [];
              this.fileselectinput[response[x][0].id_FICHEIRO].data = response[x][0];
              this.fileselectinput[response[x][0].id_FICHEIRO].id = id3;
              this.fileselectinput[response[x][0].id_FICHEIRO].src = response[x][0].caminho;
              this.fileselectinput[response[x][0].id_FICHEIRO].name = response[x][0].nome;
              this.fileselectinput[response[x][0].id_FICHEIRO].type = response[x][0].tipo;
              this.fileselectinput[response[x][0].id_FICHEIRO].size = response[x][0].tamanho;
              this.fileselectinput[response[x][0].id_FICHEIRO].datatype = response[x][0].datatype;
              this.fileselectinput[response[x][0].id_FICHEIRO].ficheiro = response[x][0].ficheiro;
              this.fileselectinput[response[x][0].id_FICHEIRO].data_CRIA = data_at;
              this.fileselect[response[x][0].id_FICHEIRO] = response[x][0].checked;
            }
          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }
        /*this.carregatabelaEquipa(id);*/
      }, error => { /*this.carregatabelaEquipa(id); */ console.log(error); });

  }

  carregatabelaEquipa(id) {
    this.tabelaEquipa = [];

    this.RCMOVRECLAMACAOEQUIPAService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        var grupo = []
        if (count > 0) {
          for (var x in response) {
            var id2 = null;
            grupo.push({ label: this.getNomeUser(response[x].id_UTZ), value: "u" + response[x].id_UTZ });
            if (!this.duplica) id2 = response[x].id;
            this.tabelaEquipa.push({
              data: response[x],
              id: id2, responsavel: response[x].id_UTZ,
              area: response[x].area, email: response[x].email, telefone: response[x].telefone
            });

          }
          this.drop_utilizadores.unshift({ label: "Utilizadores", itens: grupo });


          this.tabelaEquipa = this.tabelaEquipa.slice();
        }
        this.carregaArtigosSimilares(id);
      }, error => { this.carregaArtigosSimilares(id); console.log(error); });
  }

  /**************************************************** */
  carregaArtigosSimilares(id) {
    this.tabelaArtigosSimilar = [];

    this.RCMOVRECLAMACAOARTIGOSIMILARESService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            //var artigo = this.drop_artigos.find(item => item.value != null && item.value.valor == response[x].codref).value;
            var id2 = null;

            if (!this.duplica) id2 = response[x].id;
            this.tabelaArtigosSimilar.push({
              data: response[x],
              id: id2, qtd: response[x].quantidade,
              artigo: response[x].codref, designacao: response[x].designacao, of: response[x].ofnum, onde: response[x].onde
            });

          }
          this.tabelaArtigosSimilar = this.tabelaArtigosSimilar.slice();
        }
        // this.carregatabelaaccoesimediatas(id);
        this.carregatabelaClientes(id);
      }, error => {
        //this.carregatabelaaccoesimediatas(id); 
        this.carregatabelaClientes(id);

        console.log(error);
      });
  }

  carregatabelaClientes(id) {
    this.tabelaClientes = [];

    this.RCMOVRECLAMACAOCLIENTESService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            if (!this.duplica) id2 = response[x].id;
            this.tabelaClientes.push({
              data: response[x],
              id: id2, numero_cliente: response[x].numero_CLIENTE,
              nome_cliente: response[x].nome_CLIENTE
            });

          }
          this.tabelaClientes = this.tabelaClientes.slice();
        }

        this.carregaficheirodeanalise(id);
      }, error => {
        this.carregaficheirodeanalise(id);
        console.log(error);
      });
  }

  /************************************************** */
  /*carregatabelaaccoesimediatas(id) {
    this.tabelaaccoesimediatas = [];


    this.RCMOVRECLAMACAOPLANOACCOESIMEDIATASService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var tipo = response[x].tipo_RESPONSAVEL;
            var data_real = null;
            if (response[x].data_REAL != null) {
              data_real = new Date(response[x].data_REAL);
            }
            var accao = null;
            if (this.drop_cliente.find(item => item.value.id == response[x].descricao)) {
              accao = this.drop_cliente.find(item => item.value.id == response[x].descricao)
            }
            this.tabelaaccoesimediatas.push({
              data: response[x], concluido_UTZ: response[x].concluido_UTZ,
              id: response[x].id, data_REAL: data_real, responsavel: tipo + response[x].responsavel, id_ACCOES: accao,
              data_PREVISTA: new Date(response[x].data_PREVISTA), ordem: response[x].ordem, descricao: response[x].descricao
            });

          }
          this.tabelaaccoesimediatas = this.tabelaaccoesimediatas.slice();
        }
        this.carregaficheirodeanalise(id);
      }, error => { this.carregaficheirodeanalise(id); console.log(error); });
  }*/

  /************************************************** */
  carregaficheirodeanalise(id) {
    this.ficheirodeanalise = [];
    this.RCDICFICHEIROSANALISEService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var id2 = null;

            /*if (!this.duplica)*/
            id2 = response[x].id;
            this.ficheirodeanalise.push({
              data: response[x],
              id: id2, label: response[x].descricao
            });

          }
          this.ficheirodeanalise = this.ficheirodeanalise.slice();
        }
        this.carregatabelasaccoes(id);
      }, error => { this.carregatabelasaccoes(id); console.log(error); });
  }


  /********************  TABELA CORRETIVA E EFICACIA E EFICACIA E PREVENTIVAS **************************** */
  carregatabelasaccoes(id, continua = true) {

    this.tabelaaccoescorretivas = [];
    this.tabelaEficacia = [];
    this.tabelapreventiva = [];
    this.tabelaaccoesimediatas = [];

    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.getbyidreclamacao(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var tipo = response[x].tipo_RESPONSAVEL;
            var data_real = null;

            var id2 = null;

            if (!this.duplica) id2 = response[x].id;

            if (response[x].data_REAL != null && !this.duplica) {
              data_real = new Date(response[x].data_REAL);
            }

            var estados = response[x].estado
            if (this.duplica) estados = "P";
            var accao = null;
            if (this.drop_accoes.find(item => item.value == response[x].id_ACCAO)) {
              accao = this.drop_accoes.find(item => item.value == response[x].id_ACCAO).label
            }

            if (response[x].tipo == "C") {

              this.tabelaaccoescorretivas.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, data_REAL: data_real, responsavel: tipo + response[x].responsavel, id_ACCOES: response[x].id_ACCAO,
                data_PREVISTA: new Date(response[x].data_PREVISTA), descricao: accao, area: response[x].area
              });

            } else if (response[x].tipo == "E") {

              this.tabelaEficacia.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, data_REAL: data_real, responsavel: tipo + response[x].responsavel, id_ACCOES: response[x].id_ACCAO,
                data_PREVISTA: new Date(response[x].data_PREVISTA), descricao: accao, area: response[x].area
              });

            } else if (response[x].tipo == "I") {

              this.tabelaaccoesimediatas.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, data_REAL: data_real, responsavel: tipo + response[x].responsavel, id_ACCOES: response[x].id_ACCAO,
                data_PREVISTA: new Date(response[x].data_PREVISTA), ordem: response[x].ordem, descricao: accao, area: response[x].area
              });

            } else if (response[x].tipo == "P") {

              this.tabelapreventiva.push({
                obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                data: response[x], concluido_UTZ: response[x].concluido_UTZ, id_ACCOES: response[x].id_ACCAO, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                id: id2, ordem: response[x].ordem, data_REAL: data_real, data_PREVISTA: new Date(response[x].data_PREVISTA),
                responsavel: tipo + response[x].responsavel, descricao: accao, area: response[x].area
              });

            }

          }
          //this.ordernar_ordem(this.tabelaaccoesimediatas);
          //this.ordernar_ordem(this.tabelapreventiva);
          this.tabelaEficacia = this.tabelaEficacia.slice();
          this.tabelaaccoescorretivas = this.tabelaaccoescorretivas.slice();
          this.tabelaaccoesimediatas = this.tabelaaccoesimediatas.slice();
          this.tabelapreventiva = this.tabelapreventiva.slice();
        }
        //this.carregatabelapreventivas(id);
        if (continua) this.carregatabelaTipoOcorrencia(id);
      }, error => {
        //this.carregatabelapreventivas(id);
        if (continua) this.carregatabelaTipoOcorrencia(id);
        console.log(error);
      });
  }

  carregatabelaTipoOcorrencia(id) {
    this.tabelaTipoOcorrencia = [];
    this.RCMOVRECLAMACAOTIPOOCORRENCIAService.getAll().subscribe(
      response => {
        this.tabelaTipoOcorrencia = [];
        this.tabelaTipoOcorrencia.push({
          label: "Selecionar Tipo Ocorrência", value: null
        });
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.tabelaTipoOcorrencia.push({
              label: response[x].codigo + " -" + response[x].descricao, value: response[x].id
            });
          }

          this.tabelaTipoOcorrencia = this.tabelaTipoOcorrencia.slice();
        }
        this.carregatabelaTipoNaoDetecao(id);

      }, error => { console.log(error); this.carregatabelaTipoNaoDetecao(id); });
  }

  carregatabelaTipoNaoDetecao(id) {
    this.tabelaTipoNaoDetecao = [];
    this.RCMOVRECLAMACAOTIPONAODETECAOService.getAll().subscribe(
      response => {
        this.tabelaTipoNaoDetecao = [];
        this.tabelaTipoNaoDetecao.push({
          label: "Selecionar Tipo Não Deteção", value: null
        });
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.tabelaTipoNaoDetecao.push({
              label: response[x].codigo + " -" + response[x].descricao, value: response[x].id
            });
          }
          this.tabelaTipoNaoDetecao = this.tabelaTipoNaoDetecao.slice();
        }
        this.carregatabelasEnvios(id);

      }, error => { console.log(error); this.carregatabelasEnvios(id); });
  }

  /************************************************************ */
  /* carregatabelapreventivas(id) {
     this.tabelapreventiva = [];
 
     this.RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService.getbyidreclamacao(id).subscribe(
       response => {
         var count = Object.keys(response).length;
         if (count > 0) {
           for (var x in response) {
             var tipo = response[x].tipo_RESPONSAVEL;
             this.tabelapreventiva.push({
               data: response[x],
               id: response[x].id, ordem: 1,
               responsavel: tipo + response[x].responsavel, descricao: response[x].descricao
             });
 
           }
           this.tabelapreventiva = this.tabelapreventiva.slice();
         }
         this.carregatabelasEnvisos(id);
       }, error => { this.carregatsabelasEnvios(id); console.log(error); });
   }*/

  /************************************************************************ */
  carregatabelasEnvios(id) {
    this.tabelaEnviosGarantidos = [];
    this.RCMOVRECLAMACAOENVIOSGARANTIDOSService.getbyidreclamacao(id).subscribe(
      response => {
        this.tabelaEnviosGarantidos = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          let sum = 0;

          for (var x in response) {
            var id2 = null;
            if (this.tabelaEnviosGarantidos.length > 0) sum = this.tabelaEnviosGarantidos.reduce((max, b) => Math.max(max, b.envio), this.tabelaEnviosGarantidos[0].envio)
            if (!this.duplica) id2 = response[x].id;
            this.tabelaEnviosGarantidos.push({
              data: response[x], cliente: response[x].cliente, morada: response[x].morada, PROREF: (response[x].proref == null) ? this.referencia.valor : response[x].proref,
              data_entrega: this.formatDate2(new Date(response[x].data_ENTREGA)), data_envio: this.formatDate2(new Date(response[x].data_ENVIO)),
              id: id2, envio: response[x].envio, qtd: response[x].quantidade, guia: response[x].numero_GUIA
            });

          }
          //console.log("FIM");
          this.tabelaEnviosGarantidos = this.tabelaEnviosGarantidos.slice();
        }
        this.carregatabelasEnviosSilver();

      }, error => { console.log(error); this.carregatabelasEnviosSilver(); });
  }

  carregatabelasEnviosSilver() {


    var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

    var d = data_r;
    //d.setMonth(d.getMonth() - 3);

    var data_fim = new Date();
    if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
    var data = null;

    var REF = 0;
    if (this.selectedType2 == "referencia") {
      data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];
      REF = this.referencia.valor;
    } else if (this.selectedType2 == "cliente") {
      data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim), ETSNUM: this.etsnum, CLICODLIV: this.cliente.id }];
    }

    this.RCMOVRECLAMACAOService.getEnviosGarantidos(REF, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          let sum = 0;
          //console.log(response)
          for (var x in response) {
            if (this.tabelaEnviosGarantidos.length > 0) sum = this.tabelaEnviosGarantidos.reduce((max, b) => Math.max(max, b.envio), this.tabelaEnviosGarantidos[0].envio)
            if (!this.tabelaEnviosGarantidos.find(item => item.guia == response[x].BLNUM) || !this.tabelaEnviosGarantidos.find(item => item.PROREF == response[x].BLNUM)) {
              this.tabelaEnviosGarantidos.push({
                data: response[x], cliente: response[x].ADRNOM + ' ' + response[x].ADRLIB1, PROREF: response[x].PROREF
                , morada: response[x].ADRLIB2, data_entrega: response[x].LIVDATREC, data_envio: response[x].LIVDATDEP,
                id: null, envio: false, qtd: parseFloat(response[x].LIPQTL), guia: response[x].BLNUM
              });
            }
          }
          this.ordernar(this.tabelaEnviosGarantidos);
          this.tabelaEnviosGarantidos = this.tabelaEnviosGarantidos.slice();
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  ordernar_ordem(array) {
    array.sort((n1, n2) => {
      if (n1.ordem > n2.ordem) {
        return 1;
      }

      if (n1.pos < n2.pos) {
        return -1;
      }

      return 0;
    });
  }

  ordernar(array) {
    array.sort((n1, n2) => {
      if (n1.data_envio < n2.data_envio) {
        return 1;
      }

      if (n1.pos > n2.pos) {
        return -1;
      }

      return 0;
    });
  }

  alteraReferencia(event) {
    this.designacao_REF = "";
    if (this.referencia != null && this.referencia != "") {
      this.designacao_REF = this.referencia.design;
      this.familia_REF = this.referencia.FAMCOD;
    }
  }

  resetActive(event, step) {
    this.classstep = step;
  }

  adicionar_linha(tabela) {
    if (tabela == "tabelaEnviosGarantidos") {
      let sum = 0;
      if (this.tabelaEnviosGarantidos.length > 0) sum = this.tabelaEnviosGarantidos.reduce((max, b) => Math.max(max, b.envio), this.tabelaEnviosGarantidos[0].envio);
      this.tabelaEnviosGarantidos.push({ id: null, descricao: "", envio: false, qtd: null, guia: null, cliente: "", morada: "", data_entrega: null, data_envio: null });
      this.tabelaEnviosGarantidos = this.tabelaEnviosGarantidos.slice();
    } else if (tabela == "tabelaaccoesimediatas") {
      let sum = 0;
      if (this.tabelaaccoesimediatas.length > 0) sum = this.tabelaaccoesimediatas.reduce((max, b) => Math.max(max, b.ordem), this.tabelaaccoesimediatas[0].ordem);

      this.tabelaaccoesimediatas.push({ area: "", obriga_EVIDENCIAS: false, id: null, ordem: sum + 1, concluido_UTZ: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null, nome_estado: "Pendente", responsavel: null, data_REAL: "", data_PREVISTA: this.temporesposta['step3_data'] });
      this.tabelaaccoesimediatas = this.tabelaaccoesimediatas.slice();
    } else if (tabela == "tabelaEquipa") {
      this.tabelaEquipa.push({ id: null, responsavel: null, area: "", email: "", telefone: "" });
      this.tabelaEquipa = this.tabelaEquipa.slice();
    } else if (tabela == "tabelapreventiva") {
      let sum = 0;
      if (this.tabelapreventiva.length > 0) sum = this.tabelapreventiva.reduce((max, b) => Math.max(max, b.ordem), this.tabelapreventiva[0].ordem);

      this.tabelapreventiva.push({ area: "", obriga_EVIDENCIAS: false, id: null, concluido_UTZ: null, ordem: sum + 1, descricao: "", responsavel: null, id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null, nome_estado: "Pendente", data_REAL: "", data_PREVISTA: this.temporesposta['step7_data'] });
      this.tabelapreventiva = this.tabelapreventiva.slice();
    } else if (tabela == "tabelaArtigosSimilar") {
      this.tabelaArtigosSimilar.push({ id: null, artigo: "", of: "", qtd: 0, onde: "" });
      this.tabelaArtigosSimilar = this.tabelaArtigosSimilar.slice();
    } else if (tabela == "tabelaaccoescorretivas") {
      this.tabelaaccoescorretivas.push({ area: "", obriga_EVIDENCIAS: false, id: null, concluido_UTZ: null, responsavel: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null, nome_estado: "Pendente", data_REAL: "", data_PREVISTA: this.temporesposta['step4_data'] });
      this.tabelaaccoescorretivas = this.tabelaaccoescorretivas.slice();
    } else if (tabela == "tabelaEficacia") {
      this.tabelaEficacia.push({ area: "", obriga_EVIDENCIAS: false, id: null, responsavel: null, concluido_UTZ: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null, nome_estado: "Pendente", data_REAL: "", data_PREVISTA: this.temporesposta['step5_data'] });
      this.tabelaEficacia = this.tabelaEficacia.slice();
    } else if (tabela == "tabelaTipoNaoDetecao") {
      this.tabelaTipoNaoDetecao.push({ id: null, responsavel: null, codigo: null, descricao: null });
      this.tabelaTipoNaoDetecao = this.tabelaTipoNaoDetecao.slice();
    } else if (tabela == "tabelaTipoOcorrencia") {
      this.tabelaTipoOcorrencia.push({ id: null, responsavel: null, codigo: null, descricao: null });
      this.tabelaTipoOcorrencia = this.tabelaTipoOcorrencia.slice();
    } else if (tabela == "tabelaClientes") {
      this.tabelaClientes.push({ id: null, numero_cliente: null, nome_cliente: null });
      this.tabelaClientes = this.tabelaClientes.slice();
    }


  }

  apagar_linha(tabela, index) {

    if (tabela == "tabelaTipoOcorrencia") {
      var tab = this.tabelaTipoOcorrencia[index];
      if (tab.id == null) {
        this.tabelaTipoOcorrencia = this.tabelaTipoOcorrencia.slice(0, index).concat(this.tabelaTipoOcorrencia.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOTIPOOCORRENCIAService.delete(tab.id).then(
          res => {
            this.tabelaTipoOcorrencia = this.tabelaTipoOcorrencia.slice(0, index).concat(this.tabelaTipoOcorrencia.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaTipoNaoDetecao") {
      var tab = this.tabelaTipoNaoDetecao[index];
      if (tab.id == null) {
        this.tabelaTipoNaoDetecao = this.tabelaTipoNaoDetecao.slice(0, index).concat(this.tabelaTipoNaoDetecao.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOTIPONAODETECAOService.delete(tab.id).then(
          res => {
            this.tabelaTipoNaoDetecao = this.tabelaTipoNaoDetecao.slice(0, index).concat(this.tabelaTipoNaoDetecao.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaEnviosGarantidos") {
      var tab = this.tabelaEnviosGarantidos[index];
      if (tab.id == null) {
        this.tabelaEnviosGarantidos = this.tabelaEnviosGarantidos.slice(0, index).concat(this.tabelaEnviosGarantidos.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOENVIOSGARANTIDOSService.delete(tab.id).then(
          res => {
            this.tabelaEnviosGarantidos[index].envio = false;
            // this.tabelaEnviosGarantidos = this.tabelaEnviosGarantidos.slice(0, index).concat(this.tabelaEnviosGarantidos.slice(index + 1));
            //this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaaccoesimediatas") {
      var tab = this.tabelaaccoesimediatas[index];
      if (tab.id == null) {
        this.tabelaaccoesimediatas = this.tabelaaccoesimediatas.slice(0, index).concat(this.tabelaaccoesimediatas.slice(index + 1));
        this.atualiza_ordem(tabela);
      } else {
        /*this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.delete(tab.id).then(
          res => {
            this.tabelaaccoesimediatas = this.tabelaaccoesimediatas.slice(0, index).concat(this.tabelaaccoesimediatas.slice(index + 1));
            this.atualiza_ordem(tabela);
          },
          error => { console.log(error); this.simular(this.inputerro); });*/

        var accoes1 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
        accoes1 = this.tabelaaccoesimediatas[index].data;
        this.tabelaaccoesimediatas[index].estado = 'A';
        this.tabelaaccoesimediatas[index].nome_estado = this.geEstado('A');
        accoes1.estado = 'A';
        accoes1.data_ULT_MODIF = new Date();
        accoes1.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoesImediatas2(accoes1, 1, 2, 0, true, index, true);
      }
    } else if (tabela == "tabelaEquipa") {
      var tab = this.tabelaEquipa[index];
      if (tab.id == null) {
        this.tabelaEquipa = this.tabelaEquipa.slice(0, index).concat(this.tabelaEquipa.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOEQUIPAService.delete(tab.id).then(
          res => {
            this.tabelaEquipa = this.tabelaEquipa.slice(0, index).concat(this.tabelaEquipa.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelapreventiva") {
      var tab = this.tabelapreventiva[index];
      if (tab.id == null) {
        this.tabelapreventiva = this.tabelapreventiva.slice(0, index).concat(this.tabelapreventiva.slice(index + 1));
        this.atualiza_ordem(tabela);
      } else {
        /* this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.delete(tab.id).then(
           res => {
             this.tabelapreventiva = this.tabelapreventiva.slice(0, index).concat(this.tabelapreventiva.slice(index + 1));
             this.atualiza_ordem(tabela);
           },
           error => { console.log(error); this.simular(this.inputerro); });*/
        var accoes2 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
        accoes2 = this.tabelapreventiva[index].data;
        this.tabelapreventiva[index].estado = 'A';
        this.tabelapreventiva[index].nome_estado = this.geEstado('A');
        accoes2.estado = 'A';
        accoes2.data_ULT_MODIF = new Date();
        accoes2.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoesPreventivas2(accoes2, 1, 2, 0, true, index, true);
      }
    } else if (tabela == "tabelaArtigosSimilar") {
      var tab = this.tabelaArtigosSimilar[index];
      if (tab.id == null) {
        this.tabelaArtigosSimilar = this.tabelaArtigosSimilar.slice(0, index).concat(this.tabelaArtigosSimilar.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOARTIGOSIMILARESService.delete(tab.id).then(
          res => {
            this.RCMOVRECLAMACAOARTIGOSIMILARESService.deleteLinhas(tab.id, this.numero_RECLAMACAO).then(
              res => {
              },
              error => { console.log(error); this.simular(this.inputerro); });
            this.tabelaArtigosSimilar = this.tabelaArtigosSimilar.slice(0, index).concat(this.tabelaArtigosSimilar.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaClientes") {
      var tab = this.tabelaClientes[index];
      if (tab.id == null) {
        this.tabelaClientes = this.tabelaClientes.slice(0, index).concat(this.tabelaClientes.slice(index + 1));
      } else {
        this.RCMOVRECLAMACAOCLIENTESService.delete(tab.id).then(
          res => {
            this.tabelaClientes = this.tabelaClientes.slice(0, index).concat(this.tabelaClientes.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    }
    else if (tabela == "tabelaaccoescorretivas") {
      var tab = this.tabelaaccoescorretivas[index];
      if (tab.id == null) {
        this.tabelaaccoescorretivas = this.tabelaaccoescorretivas.slice(0, index).concat(this.tabelaaccoescorretivas.slice(index + 1));
      } else {
        /*this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.delete(tab.id).then(
          res => {
            this.tabelaaccoescorretivas = this.tabelaaccoescorretivas.slice(0, index).concat(this.tabelaaccoescorretivas.slice(index + 1));

          },
          error => { console.log(error); this.simular(this.inputerro); });*/

        var accoes4 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
        accoes4 = this.tabelaaccoescorretivas[index].data;
        this.tabelaaccoescorretivas[index].estado = 'A';
        this.tabelaaccoescorretivas[index].nome_estado = this.geEstado('A');

        accoes4.estado = 'A';
        accoes4.data_ULT_MODIF = new Date();
        accoes4.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoesCorretivas2(accoes4, 1, 2, 0, true, index, true);
      }
    } else if (tabela == "tabelaEficacia") {
      var tab = this.tabelaEficacia[index];
      if (tab.id == null) {
        this.tabelaEficacia = this.tabelaEficacia.slice(0, index).concat(this.tabelaEficacia.slice(index + 1));
      } else {
        /* this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.delete(tab.id).then(
           res => {
             this.tabelaEficacia = this.tabelaEficacia.slice(0, index).concat(this.tabelaEficacia.slice(index + 1));
           },
           error => { console.log(error); this.simular(this.inputerro); });*/
        var accoes3 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
        accoes3 = this.tabelaEficacia[index].data;
        this.tabelaEficacia[index].estado = 'A';
        this.tabelaEficacia[index].nome_estado = this.geEstado('A');

        accoes3.estado = 'A';
        accoes3.data_ULT_MODIF = new Date();
        accoes3.utz_ULT_MODIF = this.user;
        this.gravarTabelaEficacia2(accoes3, 1, 2, 0, true, index, true);

      }
    }
  }



  finalizar_linha(tabela, index) {

    if (tabela == "tabelaaccoesimediatas") {
      var accoes = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;

      accoes = this.tabelaaccoesimediatas[index].data;

      if (this.tabelaaccoesimediatas[index].data_REAL == null || this.tabelaaccoesimediatas[index].data_REAL == "") {
        this.tabelaaccoesimediatas[index].data_REAL = new Date();
      }
      accoes.data_REAL = this.tabelaaccoesimediatas[index].data_REAL;
      accoes.concluido_DATA = new Date();
      accoes.concluido_UTZ = this.user;
      accoes.estado = 'C';

      this.tabelaaccoesimediatas[index].estado = 'C';
      this.tabelaaccoesimediatas[index].nome_estado = this.geEstado('C');

      this.gravarTabelaAccoesImediatas2(accoes, 1, 2, 0, true, index, true);

    } else if (tabela == "tabelaaccoescorretivas") {

      var accoes1 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;

      accoes1 = this.tabelaaccoescorretivas[index].data;

      if (this.tabelaaccoescorretivas[index].data_REAL == null || this.tabelaaccoescorretivas[index].data_REAL == "") {
        this.tabelaaccoescorretivas[index].data_REAL = new Date();
      }
      accoes1.data_REAL = this.tabelaaccoescorretivas[index].data_REAL;
      accoes1.concluido_DATA = new Date();
      accoes1.concluido_UTZ = this.user;
      accoes1.estado = 'C';

      this.tabelaaccoescorretivas[index].estado = 'C';
      this.tabelaaccoescorretivas[index].nome_estado = this.geEstado('C');
      this.gravarTabelaAccoesCorretivas2(accoes1, 1, 2, 0, true, index, true);

    } else if (tabela == "tabelaEficacia") {
      var accoes2 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;

      accoes2 = this.tabelaEficacia[index].data;

      if (this.tabelaEficacia[index].data_REAL == null || this.tabelaEficacia[index].data_REAL == "") {
        this.tabelaEficacia[index].data_REAL = new Date();
      }
      accoes2.data_REAL = this.tabelaEficacia[index].data_REAL;
      accoes2.concluido_DATA = new Date();
      accoes2.concluido_UTZ = this.user;
      accoes2.estado = 'C';

      this.tabelaEficacia[index].estado = 'C';
      this.tabelaEficacia[index].nome_estado = this.geEstado('C');
      this.gravarTabelaEficacia2(accoes2, 1, 2, 0, true, index, true);

    } else if (tabela == "tabelapreventiva") {
      var accoes3 = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;

      accoes3 = this.tabelapreventiva[index].data;

      if (this.tabelapreventiva[index].data_REAL == null || this.tabelapreventiva[index].data_REAL == "") {
        this.tabelapreventiva[index].data_REAL = new Date();
      }
      accoes3.data_REAL = this.tabelapreventiva[index].data_REAL;
      accoes3.concluido_DATA = new Date();
      accoes3.concluido_UTZ = this.user;
      accoes3.estado = 'C';

      this.tabelapreventiva[index].estado = 'C';
      this.tabelapreventiva[index].nome_estado = this.geEstado('C');

      this.gravarTabelaAccoesPreventivas2(accoes3, 1, 2, 0, true, index, true);

    }
  }

  removerficheiroAnalise(id) {
    var tab = this.fileselectinput[id];
    if (tab.id == null) {
      /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
         (res) => { });*/
      var index = this.uploadedFiles.findIndex(item => item.id == "f110" + id)
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
      this.fileselectinput[id] = null;
    } else {
      this.RCMOVRECLAMACAOFICHEIROSService.delete(tab.id).then(
        res => {
          //alterar ficheiro de pasta
          //alterar ficheiro de pasta
          /*this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
            (res) => { });*/
          this.fileselectinput[id] = null;
          this.fileselect[id] = [];
          var index = this.uploadedFiles.findIndex(item => item.id == "f110" + id)
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      /*this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
        (res) => { });*/
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.RCMOVRECLAMACAOFICHEIROSService.delete(tab.id).then(
        res => {
          //alterar ficheiro de pasta
          /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
             (res) => { });*/
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }

  atualiza_ordem(tabela) {
    var ordem = 1;
    for (var x in this[tabela]) {
      this[tabela][x].ordem = ordem;
      ordem++;
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
    /*this.UploadService.fileChange(file, nome).subscribe(result => {*/
    var tipo = file.name.split(".");
    var data = new Date();

    if (!this.duplica) {
      var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS;
      ficheiros.data_CRIA = data;
      ficheiros.utz_CRIA = this.user;
      ficheiros.id_RECLAMACAO = this.numero_RECLAMACAO;
      ficheiros.caminho = nome + '.' + tipo[1];
      ficheiros.nome = file.name;
      ficheiros.tipo = type;
      ficheiros.datatype = file.type;
      ficheiros.tamanho = file.size;
      ficheiros.descricao = this.filedescricao[x];
      ficheiros.ficheiro = ficheiro;
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
    /*},
      error => {
        if (this.campo_x + 1 == event.files.length) {
          this.fileInput.files = [];
          this.filedescricao = [];
          this.fileInput.progress = 0;
        }
        this.campo_x++;
        console.log(error);
      });*/
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


  fileChange(event, id) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var data = new Date();

      let file: File = fileList[0];
      this.fileselectinput[id] = [];
      this.fileselectinput[id].name = file.name;
      this.fileselectinput[id].size = file.size;
      this.fileselectinput[id].datatype = file.type;
      this.fileselectinput[id].id = null;
      this.fileselectinput[id].data_CRIA = data;

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
      this.fileselectinput[id].type = type;

      var nome = this.formatDate();
      /* this.UploadService.fileChange(file, nome).subscribe(result => {*/


      this.fileselectinput[id].src = nome + '.' + tipo[1];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (event2: Event) => {
        // you can perform an action with readed data here
        this.fileselectinput[id].ficheiro = myReader.result;
        this.uploadedFiles.push({
          ficheiro: myReader.result,
          id_TAREFA: null, responsavel: null, utilizador: this.user_nome, datacria: this.formatDate2(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: id,
          id: "f110" + id, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: ""
        });
        this.uploadedFiles = this.uploadedFiles.slice();
      }

      myReader.readAsDataURL(file);

      /*}, error => {
        console.log(error);
      });*/


    }
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
        this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: this.reclamacoes[this.i], redirect: back } });
      } else {
        this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: this.reclamacoes[this.i] } });
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
      this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: this.reclamacoes[this.i], redirect: back } });
    } else {
      this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: this.reclamacoes[this.i] } });
    }

    if (this.reclamacoes.length > 0) {
      this.inicia(this.reclamacoes[this.i]);
    }
  }

  gravar() {
    this.displayLoading = true;
    var reclamacao = new RC_MOV_RECLAMACAO;

    if (!this.novo) reclamacao = this.reclamacao_dados;

    reclamacao.titulo = this.titulo;
    reclamacao.numero_RECLAMACAO_CLIENTE = this.numero_RECLAMACAO_CLIENTE;
    reclamacao.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    reclamacao.utz_CRIA = this.utz_CRIA;
    reclamacao.data_RECLAMACAO = new Date(this.data_RECLAMACAO.toDateString() + " " + this.hora_RECLAMACAO.slice(0, 5));
    reclamacao.rejeicao = this.rejeicao;
    reclamacao.id_TIPO_RECLAMACAO = this.tipo_RECLAMACAO;
    reclamacao.tipo_RECLAMACAO = "C";
    reclamacao.tipo_CAMPO_LOTE = this.selectedType;
    reclamacao.data_PRAZO_REVISAO = this.data_PRAZO_REVISAO;
    reclamacao.data_RECLAMACAO_REVISTA = this.data_RECLAMACAO_REVISTA;

    reclamacao.utz_RESPONSAVEL = this.utz_RESPONSAVEL;
    reclamacao.grau_IMPORTANCIA = this.grau_IMPORTANCIA;
    reclamacao.descricao_PROBLEMA_IDIOMA_CLIENTE = this.descricao_PROBLEMA_IDIOMA_CLIENTE;
    reclamacao.id_CLIENTE = this.cliente.id;
    reclamacao.nome_CLIENTE = this.cliente.nome;
    reclamacao.morada_CLIENTE = this.morada_CLIENTE.nome;
    reclamacao.etsnum = this.morada_CLIENTE.id;
    reclamacao.contato_CLIENTE = this.contato_CLIENTE;
    reclamacao.email_CLIENTE = this.email_CLIENTE;
    reclamacao.telefone_CLIENTE = this.telefone_CLIENTE;
    reclamacao.referencia = this.referencia.valor;
    reclamacao.designacao_REF = this.designacao_REF;
    reclamacao.familia_REF = this.familia_REF;
    reclamacao.lote = this.lote;
    reclamacao.tipo_DEFEITO = this.tipo_DEFEITO;
    reclamacao.tipo_NAO_DETECAO = this.tipo_NAO_DETECAO;
    reclamacao.tipo_OCORRENCIA = this.tipo_OCORRENCIA;
    reclamacao.reclamacao_REVISTA = this.reclamacao_REVISTA;
    reclamacao.reclamacao_COM_REVISAO = this.reclamacao_COM_REVISAO;
    reclamacao.qtd_ENVIADA = this.qtd_ENVIADA;
    reclamacao.qtd_RECUSADA = this.qtd_RECUSADA;
    reclamacao.devolucao = this.devolucao;
    reclamacao.check_SR = this.check_SR;
    reclamacao.revista_MURO = this.revista_MURO;
    reclamacao.impacto_SR = this.impacto_SR;
    reclamacao.observacoes_RECLAMACAO = this.observacoes_RECLAMACAO;
    reclamacao.numero_ENVIOS_GARANTIDOS = this.numero_ENVIOS_GARANTIDOS;
    reclamacao.envio_GARANTIDO_POR = this.envio_GARANTIDO_POR;
    reclamacao.step1CONCLUIDO = this.step1CONCLUIDO;
    reclamacao.step2CONCLUIDO = this.step2CONCLUIDO;
    reclamacao.step3CONCLUIDO = this.step3CONCLUIDO;
    reclamacao.step4CONCLUIDO = this.step4CONCLUIDO;
    reclamacao.step5CONCLUIDO = this.step5CONCLUIDO;
    reclamacao.step6CONCLUIDO = this.step6CONCLUIDO;
    reclamacao.step7CONCLUIDO = this.step7CONCLUIDO;
    reclamacao.step8CONCLUIDO = this.step8CONCLUIDO;
    reclamacao.descricao_PROBLEMA = this.descricao_PROBLEMA;
    reclamacao.problema_REPETIDO = this.problema_REPETIDO;
    reclamacao.numero_RECLAMACAO_REPETIDA = this.numero_RECLAMACAO_REPETIDA;
    reclamacao.reclamacao_REPETIDA_ACEITE = this.reclamacao_REPETIDA_ACEITE;
    reclamacao.ref_IGUAIS = this.ref_IGUAIS;
    reclamacao.existem_OUTROS_CLIENTES = this.existem_OUTROS_CLIENTES;

    reclamacao.accoes_EVITAR = this.accoes_EVITAR;


    reclamacao.accoes_NECESSARIAS = this.accoes_NECESSARIAS;
    reclamacao.accoes_NECESSARIAS_TEXTO = this.accoes_NECESSARIAS_TEXTO;
    reclamacao.reclamacao_ENCERRADA = this.reclamacao_ENCERRADA;
    reclamacao.data_FECHO = this.data_FECHO;
    reclamacao.utz_FECHO = this.utz_FECHO;
    reclamacao.observacoes_RESULTADOS = this.observacoes_RESULTADOS;

    reclamacao.custos_DEVOLUCAO = this.custos_DEVOLUCAO;
    reclamacao.custos_EXTERNA = this.custos_EXTERNA;
    reclamacao.custos_EXTERNA_QTD_CLASSIF = this.custos_EXTERNA_QTD_CLASSIF;
    reclamacao.custos_EXTERNA_QTD_REJEITADA = this.custos_EXTERNA_QTD_REJEITADA;
    reclamacao.custos_INTERNA = this.custos_INTERNA;
    reclamacao.custos_INTERNA_QTD_CLASSIF = this.custos_INTERNA_QTD_CLASSIF;
    reclamacao.custos_INTERNA_QTD_REJEITADA = this.custos_INTERNA_QTD_REJEITADA;
    reclamacao.custos_OUTROS = this.custos_OUTROS;
    reclamacao.custos_REJEICAO_EXTERNA = this.custos_REJEICAO_EXTERNA;
    reclamacao.custos_REJEICAO_INTERNA = this.custos_REJEICAO_INTERNA;
    reclamacao.custos_TOTAL = this.custos_TOTAL;

    reclamacao.inativo = false;
    reclamacao.utz_ULT_MODIF = this.user;
    reclamacao.data_ULT_MODIF = new Date();
    reclamacao.estado = this.estado;

    reclamacao.step1_DATA = this.temporesposta['step1_data'];
    reclamacao.step2_DATA = this.temporesposta['step2_data'];
    reclamacao.step3_DATA = this.temporesposta['step3_data'];
    reclamacao.step4_DATA = this.temporesposta['step4_data'];
    reclamacao.step5_DATA = this.temporesposta['step5_data'];
    reclamacao.step6_DATA = this.temporesposta['step6_data'];
    reclamacao.step7_DATA = this.temporesposta['step7_data'];
    reclamacao.step8_DATA = this.temporesposta['step8_data'];

    reclamacao.causas_PROBLEMA = this.causas_PROBLEMA;
    reclamacao.causas_PROBLEMA_IDIOMA_CLIENTE = this.causas_PROBLEMA_IDIOMA_CLIENTE;
    reclamacao.analise_CAUSAS_PROBLEMA = this.analise_CAUSAS_PROBLEMA;
    reclamacao.analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE = this.analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE;

    if (this.novo) {

      //console.log(reclamacao)
      reclamacao.estado = "A";
      this.RCMOVRECLAMACAOService.create(reclamacao).subscribe(
        res => {
          var email_para = [];
          email_para.push(this.drop_utilizadores2.find(item => item.value == this.utz_RESPONSAVEL).email);

          this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, res.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
            "Ao Criar Reclamação", email_para.toString(), null, null, null);
          this.gravarTabelaStocks(res.id_RECLAMACAO);
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
      this.RCMOVRECLAMACAOService.update(reclamacao).subscribe(
        res => {
          this.gravarTabelaFicheiros(id);
          //this.gravarTabelaStocks(id);
        },
        error => { console.log(error); this.simular(this.inputerro); this.displayLoading = false; });

    }
  }

  gravarTabelaStocks(id) {
    this.RCMOVRECLAMACAOService.getStock(this.referencia.valor).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          var countc = 0;
          for (var x in response) {
            countc++;
            var stock = new RC_MOV_RECLAMACAO_STOCK
            stock.data_CRIA = new Date();
            stock.utz_CRIA = this.user;
            stock.stoqte = response[x].STOQTE;
            stock.liecod = response[x].LIECOD;
            stock.id_RECLAMACAO = id;
            this.gravarTabelaStocks2(stock, countc, count, id);
          }
        } else {
          this.gravarTabelaEncomendas(id);
        }
      }, error => {
        this.gravarTabelaEncomendas(id);
        console.log(error);
      });

  }

  gravarTabelaEncomendas(id) {
    var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

    var d = data_r;
    d.setMonth(d.getDate() - 15);

    //var data_fim = new Date();
    var data_fim = data_r;
    data_fim.setMonth(data_fim.getDate() + 30);
    //if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
    var data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];

    this.RCMOVRECLAMACAOService.getEncomendasCliente(this.referencia.valor, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          var countc = 0;
          for (var x in response) {
            countc++;
            var encomenda = new RC_MOV_RECLAMACAO_ENCOMENDAS;
            encomenda.data_CRIA = new Date();
            encomenda.utz_CRIA = this.user;
            encomenda.cddchrono = response[x].CDDCHRONO;
            encomenda.adrnom = response[x].ADRNOM;
            encomenda.etsnum = response[x].ETSNUM;
            encomenda.adrlib1 = response[x].ADRLIB1;
            encomenda.adrlib2 = response[x].ADRLIB2;
            encomenda.clicod = response[x].CLICOD;
            encomenda.quantidade = response[x].QUANTIDADE;
            encomenda.cdddatbes = response[x].CDDDATBES;
            encomenda.id_RECLAMACAO = id;
            this.gravarTabelaEncomendas2(encomenda, countc, count, id);
          }
        } else {
          this.gravarTabelaFicheiros(id);
        }
      }, error => {
        this.gravarTabelaFicheiros(id);
        console.log(error);
      });

  }

  gravarTabelaEncomendas2(encomenda, count, total, id, continuar = true) {
    this.RCMOVRECLAMACAOENCOMENDASService.update(encomenda).then(
      res => {
        if (count == total && continuar) {
          this.gravarTabelaFicheiros(id);
        }
      },
      error => { console.log(error); if (count == total && continuar) { this.gravarTabelaFicheiros(id); } });
  }

  gravarTabelaStocks2(stock, count, total, id) {
    this.RCMOVRECLAMACAOSTOCKService.update(stock).then(
      res => {
        if (count == total) {
          this.gravarTabelaEncomendas(id);
        }
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaEncomendas(id); } });
  }

  gravarTabelaStockssimilares(stock, count, total, id, id_linha, ref) {
    this.RCMOVRECLAMACAOSTOCKService.update(stock).then(
      res => {
        if (count == total) {
          this.gravarTabelaEncomendasSimilar(id, id_linha, ref)
        }
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaEncomendasSimilar(id, id_linha, ref); } });
  }



  gravarTabelaFicheiros(id) {
    if (this.duplica && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_RECLAMACAO = id;
        if (!this.duplica) ficheiros.id = this.uploadedFiles[x].id;
        ficheiros.caminho = this.uploadedFiles[x].src;
        ficheiros.nome = this.uploadedFiles[x].name;
        ficheiros.tipo = this.uploadedFiles[x].type;
        ficheiros.datatype = this.uploadedFiles[x].datatype;
        ficheiros.tamanho = this.uploadedFiles[x].size;
        ficheiros.descricao = this.uploadedFiles[x].descricao;

        ficheiros.data_ULT_MODIF = new Date();
        ficheiros.utz_ULT_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        } else if (count == this.uploadedFiles.length) {
          this.gravarTabelaEquipa(id);
        }

      }
    } else {
      this.gravarTabelaEquipa(id);
    }

  }

  gravarTabelaFicheiros2(ficheiros, count, total, id) {
    this.RCMOVRECLAMACAOFICHEIROSService.update(ficheiros).subscribe(
      res => {
        if (count == total && this.duplica) {
          this.gravarTabelaEquipa(id);
        } else if (!this.duplica) {
          this.uploadedFiles.push({
            data_CRIA: ficheiros.data_CRIA, responsavel: null, ficheiro: ficheiros.ficheiro,
            id_TAREFA: null, utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.data_CRIA) + " " + new Date(ficheiros.data_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.id, name: ficheiros.nome, datatype: ficheiros.datatype, src: ficheiros.caminho, type: ficheiros.tipo, size: ficheiros.tamanho, descricao: ficheiros.descricao
          });
          this.uploadedFiles = this.uploadedFiles.slice();
        }
      },
      error => { console.log(error); if (count == total && this.duplica) { this.gravarTabelaEquipa(id); } });
  }

  gravarTabelaEquipa(id) {
    if (this.tabelaEquipa && this.tabelaEquipa.length > 0) {

      var count = 0;
      var email_para = [];
      for (var x in this.tabelaEquipa) {

        var equipa = new RC_MOV_RECLAMACAO_EQUIPA;
        if (this.tabelaEquipa[x].id != null) {
          equipa = this.tabelaEquipa[x].data;
        } else {
          equipa.data_CRIA = new Date();
          equipa.utz_CRIA = this.user;
        }

        if (!this.duplica) equipa.id = this.tabelaEquipa[x].id;
        equipa.area = this.tabelaEquipa[x].area;
        equipa.id_UTZ = this.tabelaEquipa[x].responsavel;
        equipa.email = this.tabelaEquipa[x].email;
        equipa.telefone = this.tabelaEquipa[x].telefone;
        equipa.id_RECLAMACAO = id;

        equipa.data_ULT_MODIF = new Date();
        equipa.utz_ULT_MODIF = this.user;

        count++;
        if (this.tabelaEquipa[x].responsavel != null && this.tabelaEquipa[x].responsavel != "") {
          this.gravarTabelaEquipa2(equipa, count, this.tabelaEquipa.length, id);
          if (this.tabelaEquipa[x].id == null && this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
            email_para.push(this.tabelaEquipa[x].email);
        } else if (count == this.tabelaEquipa.length) {
          this.gravarArtigosSimilares(id);
        }

      }
      if (email_para.length > 0) {
        var data = new Date(this.data_RECLAMACAO.toDateString() + " " + this.hora_RECLAMACAO.slice(0, 5));
        this.enviarEventoResponsaveis(data, this.observacoes_RECLAMACAO, this.numero_RECLAMACAO, this.cliente.nome, this.referencia.valor + " - " + this.designacao_REF,
          "Ao Adicionar Utilizador à Reclamação", email_para.toString(), null, null, null);
      }

    } else {
      this.gravarArtigosSimilares(id);
    }
  }

  gravarTabelaEquipa2(equipa, count, total, id) {
    this.RCMOVRECLAMACAOEQUIPAService.update(equipa).then(
      res => {
        if (count == total) {
          this.gravarArtigosSimilares(id);
        }
      },
      error => { console.log(error); if (count == total) { this.gravarArtigosSimilares(id); } });
  }

  gravarArtigosSimilares(id) {
    if (this.tabelaArtigosSimilar && this.tabelaArtigosSimilar.length > 0) {

      var count = 0;
      for (var x in this.tabelaArtigosSimilar) {
        var artigos = new RC_MOV_RECLAMACAO_ARTIGO_SIMILARES
        var novo = false;
        if (this.tabelaArtigosSimilar[x].id != null) {
          artigos = this.tabelaArtigosSimilar[x].data;
        } else {
          artigos.data_CRIA = new Date();
          artigos.utz_CRIA = this.user;
          novo = true;
        }

        if (!this.duplica) artigos.id = this.tabelaArtigosSimilar[x].id;
        artigos.codref = this.tabelaArtigosSimilar[x].artigo;
        artigos.designacao = this.tabelaArtigosSimilar[x].designacao;
        artigos.ofnum = this.tabelaArtigosSimilar[x].of;
        artigos.id_RECLAMACAO = id;
        artigos.quantidade = this.tabelaArtigosSimilar[x].qtd;
        artigos.onde = this.tabelaArtigosSimilar[x].onde;

        artigos.data_ULT_MODIF = new Date();
        artigos.utz_ULT_MODIF = this.user;

        count++;
        if (this.tabelaArtigosSimilar[x].artigo != null && this.tabelaArtigosSimilar[x].artigo != "") {
          this.gravarArtigosSimilares2(artigos, count, this.tabelaArtigosSimilar.length, id, novo);
        } else if (count == this.tabelaArtigosSimilar.length) {
          this.gravartabelaClientes(id);
        }


      }
    } else {
      this.gravartabelaClientes(id);
    }
  }

  gravarArtigosSimilares2(artigos, count, total, id, novo) {
    this.RCMOVRECLAMACAOARTIGOSIMILARESService.update(artigos).subscribe(
      res => {
        if (novo) this.gravarTabelaStockSimilar(id, res.id, res.codref);
        if (count == total) {
          this.gravartabelaClientes(id);
        }
      },
      error => { console.log(error); if (count == total) { this.gravartabelaClientes(id); } });
  }

  gravartabelaClientes(id) {

    if (this.tabelaClientes && this.tabelaClientes.length > 0) {

      var count = 0;
      for (var x in this.tabelaClientes) {
        var clientes = new RC_MOV_RECLAMACAO_CLIENTES
        var novo = false;
        if (this.tabelaClientes[x].id != null) {
          clientes = this.tabelaClientes[x].data;
        } else {
          clientes.data_CRIA = new Date();
          clientes.utz_CRIA = this.user;
          novo = true;
        }

        if (!this.duplica) clientes.id = this.tabelaClientes[x].id;
        clientes.nome_CLIENTE = this.tabelaClientes[x].nome_cliente;
        clientes.numero_CLIENTE = this.tabelaClientes[x].numero_cliente;
        clientes.id_RECLAMACAO = id;

        clientes.data_ULT_MODIF = new Date();
        clientes.utz_ULT_MODIF = this.user;

        count++;
        if (this.tabelaClientes[x].numero_cliente != null && this.tabelaClientes[x].numero_cliente != "") {
          this.gravartabelaClientes2(clientes, count, this.tabelaClientes.length, id, novo);
        } else if (count == this.tabelaClientes.length) {
          this.gravarTabelaAccoesImediatas(id);
        }

      }
    } else {
      this.gravarTabelaAccoesImediatas(id);
    }
  }




  gravartabelaClientes2(clientes, count, total, id, novo) {
    this.RCMOVRECLAMACAOCLIENTESService.update(clientes).subscribe(
      res => {
        if (count == total) {
          this.gravarTabelaAccoesImediatas(id);
        }
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaAccoesImediatas(id); } });
  }


  gravarTabelaStockSimilar(id, id_linha, ref) {
    this.RCMOVRECLAMACAOService.getStock(ref).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          var countc = 0;
          for (var x in response) {
            countc++;
            var stock = new RC_MOV_RECLAMACAO_STOCK
            stock.data_CRIA = new Date();
            stock.utz_CRIA = this.user;
            stock.stoqte = response[x].STOQTE;
            stock.liecod = response[x].LIECOD;
            stock.id_RECLAMACAO = id;
            stock.id_LINHA_ARTIGO_SIMILAR = id_linha;
            this.gravarTabelaStockssimilares(stock, countc, count, id, id_linha, ref);
          }
        } else {
          this.gravarTabelaEncomendasSimilar(id, id_linha, ref);
        }
      }, error => {
        this.gravarTabelaEncomendasSimilar(id, id_linha, ref);
        console.log(error);
      });

  }

  gravarTabelaEncomendasSimilar(id, id_linha, ref) {
    var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

    var d = data_r;
    d.setMonth(d.getDate() - 15);
    //var data_fim = new Date();
    //if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
    var data_fim = data_r;
    data_fim.setMonth(data_fim.getDate() + 30);
    var data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];

    this.RCMOVRECLAMACAOService.getEncomendasCliente(ref, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          var countc = 0;
          for (var x in response) {
            countc++;
            var encomenda = new RC_MOV_RECLAMACAO_ENCOMENDAS;
            encomenda.data_CRIA = new Date();
            encomenda.utz_CRIA = this.user;
            encomenda.cddchrono = response[x].CDDCHRONO;
            encomenda.adrnom = response[x].ADRNOM;
            encomenda.etsnum = response[x].ETSNUM;
            encomenda.adrlib1 = response[x].ADRLIB1;
            encomenda.adrlib2 = response[x].ADRLIB2;
            encomenda.clicod = response[x].CLICOD;
            encomenda.quantidade = response[x].QUANTIDADE;
            encomenda.cdddatbes = response[x].CDDDATBES;
            encomenda.id_RECLAMACAO = id;
            encomenda.id_LINHA_ARTIGO_SIMILAR = id_linha;
            this.gravarTabelaEncomendas2(encomenda, countc, count, id, false);
          }
        } else {
        }
      }, error => {
        console.log(error);
      });

  }

  gravarTabelaAccoesImediatas(id) {
    if (this.tabelaaccoesimediatas && this.tabelaaccoesimediatas.length > 0) {

      var count = 0;
      for (var x in this.tabelaaccoesimediatas) {
        count++;
        if (this.tabelaaccoesimediatas[x].responsavel != null && this.tabelaaccoesimediatas[x].responsavel != "" && this.tabelaaccoesimediatas[x].descricao != null && this.tabelaaccoesimediatas[x].descricao != "") {
          var accoes = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaaccoesimediatas[x].id != null) {
            accoes = this.tabelaaccoesimediatas[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          if (!this.duplica) accoes.id = this.tabelaaccoesimediatas[x].id;
          accoes.id_RECLAMACAO = id;
          accoes.ordem = this.tabelaaccoesimediatas[x].ordem;
          accoes.id_ACCAO = this.tabelaaccoesimediatas[x].id_ACCOES;
          accoes.tipo = "I";
          accoes.observacoes = this.tabelaaccoesimediatas[x].observacoes;
          accoes.estado = "P";
          accoes.obriga_EVIDENCIAS = this.tabelaaccoesimediatas[x].obriga_EVIDENCIAS;


          //var data = this.tabelaaccoesimediatas[x].data_REAL;
          //accoes.data_REAL = (data!=null && data != "" )? new Date(data) : null;
          accoes.data_PREVISTA = new Date(this.tabelaaccoesimediatas[x].data_PREVISTA);

          var id_resp = this.tabelaaccoesimediatas[x].responsavel;
          var tipo = "u";
          if (this.tabelaaccoesimediatas[x].responsavel.charAt(0) == 'u' || this.tabelaaccoesimediatas[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaaccoesimediatas[x].responsavel.charAt(0);
            id_resp = this.tabelaaccoesimediatas[x].responsavel.substr(1);
          }

          accoes.responsavel = id_resp;
          accoes.tipo_RESPONSAVEL = tipo;


          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaAccoesImediatas2(accoes, count, this.tabelaaccoesimediatas.length, id);
          } else if (count == this.tabelaaccoesimediatas.length) {
            this.gravarTabelaAccoesCorretivas(id);
          }

        }
      }
    } else {
      this.gravarTabelaAccoesCorretivas(id)
    }
  }

  gravarTabelaAccoesImediatas2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {
    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          //this.criaTarefas(res.id, 5);
        }

        if (count == total) {
          this.gravarTabelaAccoesCorretivas(id);
        }
        if (finaliza) this.tabelaaccoesimediatas[index].concluido_UTZ = this.user;
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaAccoesCorretivas(id); } });
  }

  gravarTabelaAccoesCorretivas(id) {
    if (this.tabelaaccoescorretivas && this.tabelaaccoescorretivas.length > 0) {

      var count = 0;
      for (var x in this.tabelaaccoescorretivas) {
        count++;
        if (this.tabelaaccoescorretivas[x].responsavel != null && this.tabelaaccoescorretivas[x].responsavel != "" && this.tabelaaccoescorretivas[x].descricao != null && this.tabelaaccoescorretivas[x].descricao != "") {
          var accoes = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaaccoescorretivas[x].id != null) {
            accoes = this.tabelaaccoescorretivas[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          accoes.id_RECLAMACAO = id;

          var id_resp = this.tabelaaccoescorretivas[x].responsavel;
          var tipo = "u";
          if (this.tabelaaccoescorretivas[x].responsavel.charAt(0) == 'u' || this.tabelaaccoescorretivas[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaaccoescorretivas[x].responsavel.charAt(0);
            id_resp = this.tabelaaccoescorretivas[x].responsavel.substr(1);
          }

          accoes.responsavel = id_resp;
          accoes.tipo_RESPONSAVEL = tipo;
          accoes.obriga_EVIDENCIAS = this.tabelaaccoescorretivas[x].obriga_EVIDENCIAS;

          if (!this.duplica) accoes.id = this.tabelaaccoescorretivas[x].id;
          accoes.id_ACCAO = this.tabelaaccoescorretivas[x].id_ACCOES;

          //var data = this.tabelaaccoescorretivas[x].data_REAL;
          //accoes.data_REAL = (data!=null && data != "" )? new Date(data) : null;

          accoes.data_PREVISTA = new Date(this.tabelaaccoescorretivas[x].data_PREVISTA);
          accoes.tipo = "C";

          accoes.observacoes = this.tabelaaccoescorretivas[x].observacoes;
          accoes.estado = "P";

          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;


          if (novo) {
            this.gravarTabelaAccoesCorretivas2(accoes, count, this.tabelaaccoescorretivas.length, id);
          } else if (count == this.tabelaaccoescorretivas.length) {
            this.gravarTabelaFicheirosAnalise(id);
          }


        } else if (count == this.tabelaaccoescorretivas.length) {
          this.gravarTabelaFicheirosAnalise(id);

        }
      }
    } else {
      this.gravarTabelaFicheirosAnalise(id);
    }
  }


  gravarTabelaAccoesCorretivas2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {

    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          //this.criaTarefas(res.id, 5);
        }

        if (count == total) {
          this.gravarTabelaFicheirosAnalise(id);
        }
        if (finaliza) this.tabelaaccoescorretivas[index].concluido_UTZ = this.user;

      },
      error => { console.log(error); if (count == total) { this.gravarTabelaFicheirosAnalise(id); } });
  }

  gravarTabelaFicheirosAnalise(id) {
    var total = 0;
    for (var x in this.fileselect) {
      if (this.fileselect[x]) { total++; }
    }

    if (this.fileselect && total > 0) {


      var count = 0;
      for (var x in this.fileselect) {
        var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS;

        count++;
        if (this.fileselect[x] && this.fileselectinput[x]) {
          if (this.fileselectinput[x].id != null) {
            ficheiros = this.fileselectinput[x].data;
          } else {
            ficheiros.data_CRIA = this.fileselectinput[x].data_CRIA;
            ficheiros.utz_CRIA = this.user;
          }

          ficheiros.caminho = this.fileselectinput[x].src;
          if (!this.duplica) ficheiros.id = this.fileselectinput[x].id;
          ficheiros.nome = this.fileselectinput[x].name;
          ficheiros.tipo = this.fileselectinput[x].type;
          ficheiros.tamanho = this.fileselectinput[x].size;
          ficheiros.datatype = this.fileselectinput[x].datatype;
          ficheiros.ficheiro = this.fileselectinput[x].ficheiro;
          ficheiros.checked = this.fileselect[x];
          ficheiros.id_FICHEIRO = parseInt(x);


          ficheiros.data_ULT_MODIF = new Date();
          ficheiros.utz_ULT_MODIF = this.user;
          ficheiros.id_RECLAMACAO = id;


          this.gravarTabelaFicheirosAnalise2(ficheiros, count, total, id);
        } else {

          if (count == total) {
            this.gravarTabelaEficacia(id);
          }
        }
      }
    } else {
      this.gravarTabelaEficacia(id);
    }
  }
  gravarTabelaFicheirosAnalise2(ficheiros, count, total, id) {
    this.RCMOVRECLAMACAOFICHEIROSService.update(ficheiros).subscribe(
      res => {
        //console.log("e")
        if (count == total) {
          //console.log("f")
          this.gravarTabelaEficacia(id);
        }
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaEficacia(id); } });

  }


  gravarTabelaEficacia(id) {
    if (this.tabelaEficacia.length && this.tabelaEficacia.length > 0) {

      var count = 0;
      for (var x in this.tabelaEficacia) {
        count++;
        if (this.tabelaEficacia[x].responsavel != null && this.tabelaEficacia[x].responsavel != "" && this.tabelaEficacia[x].descricao != null && this.tabelaEficacia[x].descricao != "") {
          var eficacia = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaEficacia[x].id != null) {
            eficacia = this.tabelaEficacia[x].data;
          } else {
            novo = true;
            eficacia.data_CRIA = new Date();
            eficacia.utz_CRIA = this.user;
          }

          eficacia.id_RECLAMACAO = id;
          eficacia.id_ACCAO = this.tabelaEficacia[x].id_ACCOES;
          var id_resp = this.tabelaEficacia[x].responsavel;
          var tipo = "u";
          if (this.tabelaEficacia[x].responsavel.charAt(0) == 'u' || this.tabelaEficacia[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaEficacia[x].responsavel.charAt(0);
            id_resp = this.tabelaEficacia[x].responsavel.substr(1);
          }

          eficacia.responsavel = id_resp;
          eficacia.tipo_RESPONSAVEL = tipo;

          eficacia.obriga_EVIDENCIAS = this.tabelaEficacia[x].obriga_EVIDENCIAS;
          if (!this.duplica) eficacia.id = this.tabelaEficacia[x].id;
          eficacia.id_ACCAO = this.tabelaEficacia[x].id_ACCOES;

          //var data = this.tabelaEficacia[x].data_REAL;
          // eficacia.data_REAL = (data!=null && data != "" )? new Date(data) : null;

          eficacia.data_PREVISTA = new Date(this.tabelaEficacia[x].data_PREVISTA);
          eficacia.tipo = "E";

          eficacia.observacoes = this.tabelaEficacia[x].observacoes;
          eficacia.estado = "P";

          eficacia.data_ULT_MODIF = new Date();
          eficacia.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaEficacia2(eficacia, count, this.tabelaEficacia.length, id);
          } else if (count == this.tabelaEficacia.length) {
            this.gravarTabelaAccoesPreventivas(id);
          }


        } else if (count == this.tabelaEficacia.length) {
          this.gravarTabelaAccoesPreventivas(id);
        }
      }
    } else {
      this.gravarTabelaAccoesPreventivas(id);
    }
  }

  gravarTabelaEficacia2(eficacia, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {
    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.update(eficacia).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          //this.criaTarefas(res.id, 5);
        }
        if (count == total) {
          this.gravarTabelaAccoesPreventivas(id);
        }
        if (finaliza) this.tabelaEficacia[index].concluido_UTZ = this.user;
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaAccoesPreventivas(id); } });
  }

  gravarTabelaAccoesPreventivas(id) {
    if (this.tabelapreventiva && this.tabelapreventiva.length > 0) {

      var count = 0;
      for (var x in this.tabelapreventiva) {
        count++;
        if (this.tabelapreventiva[x].responsavel != null && this.tabelapreventiva[x].responsavel != "" && this.tabelapreventiva[x].descricao != null && this.tabelapreventiva[x].descricao != "") {
          var accoes = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelapreventiva[x].id != null) {
            accoes = this.tabelapreventiva[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          accoes.id_RECLAMACAO = id;

          var id_resp = this.tabelapreventiva[x].responsavel;
          var tipo = "u";
          if (this.tabelapreventiva[x].responsavel.charAt(0) == 'u' || this.tabelapreventiva[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelapreventiva[x].responsavel.charAt(0);
            id_resp = this.tabelapreventiva[x].responsavel.substr(1);
          }

          accoes.tipo_RESPONSAVEL = tipo;
          accoes.responsavel = id_resp;
          accoes.id_ACCAO = this.tabelapreventiva[x].id_ACCOES;
          accoes.ordem = this.tabelapreventiva[x].ordem;
          if (!this.duplica) accoes.id = this.tabelapreventiva[x].id;
          accoes.data_PREVISTA = new Date(this.tabelapreventiva[x].data_PREVISTA);
          accoes.tipo = "P";

          accoes.observacoes = this.tabelapreventiva[x].observacoes;
          accoes.estado = "P";

          accoes.obriga_EVIDENCIAS = this.tabelapreventiva[x].obriga_EVIDENCIAS;
          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaAccoesPreventivas2(accoes, count, this.tabelapreventiva.length, id);
          } else if (count == this.tabelapreventiva.length) {
            this.gravarTabelaEnviosGarantidos(id);
          }

        } else if (count == this.tabelapreventiva.length) {
          this.gravarTabelaEnviosGarantidos(id);
        }
      }
    } else {
      this.gravarTabelaEnviosGarantidos(id);
    }
  }
  gravarTabelaAccoesPreventivas2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {

    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          //this.criaTarefas(res.id, 5);
        }

        if (count == total) {
          this.gravarTabelaEnviosGarantidos(id);
          if (finaliza) this.tabelaEficacia[index].concluido_UTZ = this.user;
        }
      },
      error => { console.log(error); if (count == total) { this.gravarTabelaEnviosGarantidos(id); } });
  }


  gravarTabelaEnviosGarantidos(id) {
    if (this.tabelaEnviosGarantidos && this.tabelaEnviosGarantidos.length > 0) {

      var count = 0;
      for (var x in this.tabelaEnviosGarantidos) {
        var envios = new RC_MOV_RECLAMACAO_ENVIOS_GARANTIDOS;
        if (this.tabelaEnviosGarantidos[x].id != null) {
          envios = this.tabelaEnviosGarantidos[x].data;
        } else {
          envios.data_CRIA = new Date();
          envios.utz_CRIA = this.user;
        }

        envios.id_RECLAMACAO = id;
        envios.numero_GUIA = this.tabelaEnviosGarantidos[x].guia;
        envios.envio = this.tabelaEnviosGarantidos[x].envio;
        envios.quantidade = this.tabelaEnviosGarantidos[x].qtd;
        envios.cliente = this.tabelaEnviosGarantidos[x].cliente;
        envios.morada = this.tabelaEnviosGarantidos[x].morada;
        envios.data_ENTREGA = this.tabelaEnviosGarantidos[x].data_entrega;
        envios.data_ENVIO = this.tabelaEnviosGarantidos[x].data_envio;
        envios.proref = this.tabelaEnviosGarantidos[x].PROREF;
        if (!this.duplica) envios.id = this.tabelaEnviosGarantidos[x].id;


        envios.data_ULT_MODIF = new Date();
        envios.utz_ULT_MODIF = this.user;

        count++;
        if (this.tabelaEnviosGarantidos[x].envio) {
          this.gravarTabelaEnviosGarantidos2(envios, count, this.tabelaEnviosGarantidos.length, id);
        } else if (count == this.tabelaEnviosGarantidos.length) {
          if (this.novo) {
            this.displayLoading = false;
            this.crisaTarefas(id, 5);
            this.router.navigate(['reclamacoesclientes/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            this.displayLoading = false;
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });

            if (back != 0) {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id, redirect: back } });
            } else {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id } });
            }
            this.simular(this.inputgravou);
          }

        }

      }
    } else {
      // console.log("FIM")
      this.displayLoading = false;
      if (this.novo) {
        this.crisaTarefas(id, 5);
        this.router.navigate(['reclamacoesclientes/editar'], { queryParams: { id: id } });
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
          this.crisaTarefas(id, 5);
          this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id, redirect: back } });
        } else {
          this.crisaTarefas(id, 5);
          this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id } });
        }
        this.simular(this.inputgravou);
      }
    }
  }

  gravarTabelaEnviosGarantidos2(envios, count, total, id) {
    this.RCMOVRECLAMACAOENVIOSGARANTIDOSService.update(envios).then(
      res => {

        if (count == total) {
          if (this.novo) {
            this.displayLoading = false;
            this.crisaTarefas(id, 5);
            this.router.navigate(['reclamacoesclientes/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            this.displayLoading = false;
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });

            if (back != 0) {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id, redirect: back } });
            } else {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id } });
            }
            this.simular(this.inputgravou);
          }

        }
      },
      error => {
        console.log(error);
        if (count == total) {
          if (this.novo) {
            this.displayLoading = false;
            this.crisaTarefas(id, 5);
            this.router.navigate(['reclamacoesclientes/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            this.displayLoading = false;
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });

            if (back != 0) {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id, redirect: back } });
            } else {
              this.crisaTarefas(id, 5);
              this.router.navigate(['reclamacoesclientes/view'], { queryParams: { id: id } });
            };
            this.simular(this.inputgravou);
          }
        }
      });
  }

  IrPara(id, responsavel) {

    var id_r = null;
    if (responsavel.toString().charAt(0) == 'u') {
      id_r = responsavel.substr(1);
    }
    if (this.adminuser || this.user == this.utz_RESPONSAVEL || this.user == this.utz_CRIA || id_r == this.user) {
      this.router.navigateByUrl('tarefas/view?id=' + id + "&redirect=reclamacoesclientes/viewkvk\id=" + this.numero_RECLAMACAO);
    }
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //ao alterar data reclamação atualiza datas
  atualizaDatas(event) {
    if (this.hora_RECLAMACAO == null || this.hora_RECLAMACAO == "") {
      this.hora_RECLAMACAO = "00:00";
    }
    if (this.data_RECLAMACAO == null || this.data_RECLAMACAO == "") {
      this.data_RECLAMACAO = new Date();
    }
    var data = new Date(new Date(this.data_RECLAMACAO).toDateString() + " " + this.hora_RECLAMACAO.slice(0, 5));

    this.temporesposta['step1_data'] = new Date(data);
    this.temporesposta['step2_data'] = new Date(data);
    this.temporesposta['step3_data'] = new Date(data);
    this.temporesposta['step4_data'] = new Date(data);
    this.temporesposta['step5_data'] = new Date(data);
    this.temporesposta['step6_data'] = new Date(data);
    this.temporesposta['step7_data'] = new Date(data);
    this.temporesposta['step8_data'] = new Date(data);

    this.temporesposta['step1_data'].setDate(data.getDate() + this.temporesposta['step1']);
    this.temporesposta['step2_data'].setDate(data.getDate() + this.temporesposta['step2']);
    this.temporesposta['step3_data'].setDate(data.getDate() + this.temporesposta['step3']);
    this.temporesposta['step4_data'].setDate(data.getDate() + this.temporesposta['step4']);
    this.temporesposta['step5_data'].setDate(data.getDate() + this.temporesposta['step5']);
    this.temporesposta['step6_data'].setDate(data.getDate() + this.temporesposta['step6']);
    this.temporesposta['step7_data'].setDate(data.getDate() + this.temporesposta['step7']);
    this.temporesposta['step8_data'].setDate(data.getDate() + this.temporesposta['step8']);

    this.data_PRAZO_REVISAO = new Date(data);

    this.data_PRAZO_REVISAO.setDate(data.getDate() + this.temporesposta['revisao']);
    this.hora_PRAZO_REVISAO = this.data_PRAZO_REVISAO.toLocaleTimeString().slice(0, 5);

    this.atualizadatatabelas(this.temporesposta['step3_data'], this.temporesposta['step4_data'], this.temporesposta['step5_data'], this.temporesposta['step7_data']);
  }

  atualizadatatabelas(data1, data2, data3, data4) {
    for (var x in this.tabelaaccoesimediatas) {
      this.tabelaaccoesimediatas[x].data_PREVISTA = data1;
    }

    for (var x in this.tabelaaccoescorretivas) {
      this.tabelaaccoescorretivas[x].data_PREVISTA = data2;
    }

    for (var x in this.tabelaEficacia) {
      this.tabelaEficacia[x].data_PREVISTA = data3;
    }

    for (var x in this.tabelapreventiva) {
      this.tabelapreventiva[x].data_PREVISTA = data4;
    }
  }

  //devolve node responsavel
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

  //devolve node Ficheiros de Análise 
  getficheirodeanalise(id) {
    var utz = this.ficheirodeanalise.find(item => item.id == id);
    var nome = "";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }
  //bt cancelar
  backview() {
    this.location.back();
  }
  //popup apagar
  apagar() {


    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var reclamacao = new RC_MOV_RECLAMACAO;

        reclamacao = this.reclamacao_dados;

        reclamacao.utz_ANULACAO = this.user;
        reclamacao.data_ANULACAO = new Date();
        reclamacao.inativo = true;
        reclamacao.estado = "R";

        this.RCMOVRECLAMACAOService.update(reclamacao).subscribe(
          res => {
            this.RCMOVRECLAMACAOService.atualizaestadosaccoes(reclamacao.id_RECLAMACAO, 5).subscribe(
              res => { }, error => { console.log(error); });
            this.router.navigate(['reclamacoesclientes']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }


  //popup cancelar
  cancelar() {


    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Cancelar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var reclamacao = new RC_MOV_RECLAMACAO;

        reclamacao = this.reclamacao_dados;

        reclamacao.utz_CANCELADA = this.user;
        reclamacao.data_CANCELADA = new Date();
        reclamacao.estado = "C";

        this.RCMOVRECLAMACAOService.update(reclamacao).subscribe(
          res => {
            this.RCMOVRECLAMACAOService.atualizaestadosaccoes(reclamacao.id_RECLAMACAO, 5).subscribe(
              res => { }, error => { console.log(error); });
            var email_para = [];
            email_para.push(this.drop_utilizadores2.find(item => item.value == this.utz_RESPONSAVEL).email);
            for (var x in this.tabelaEquipa) {
              if (this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
                email_para.push(this.tabelaEquipa[x].email);
            }
            this.RCMOVRECLAMACAOService.getEMAILS(reclamacao.id_RECLAMACAO).subscribe(
              resp => {
                var count = Object.keys(resp).length;
                if (count > 0) {
                  for (var x in resp) {
                    if ((email_para.indexOf(resp[x][0]) < 0))
                      email_para.push(resp[x][0]);
                  }
                  this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                    "Ao Cancelar Reclamação", email_para.toString(), null, ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), new Date(reclamacao.data_CANCELADA).toLocaleDateString());
                } else {
                  this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                    "Ao Cancelar Reclamação", email_para.toString(), null, ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), new Date(reclamacao.data_CANCELADA).toLocaleDateString());
                }
              },
              error => {
                console.log(error);
                this.simular(this.inputerro);
                this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                  "Ao Cancelar Reclamação", email_para.toString(), null, ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), new Date(reclamacao.data_CANCELADA).toLocaleDateString());
              });
            this.router.navigate(['reclamacoesclientes']);
            this.simular(this.inputgravou);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }



  duplicar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {
        this.router.navigate(['reclamacoesclientes/duplicar'], { queryParams: { id: this.reclamacao_dados.id_RECLAMACAO } });
      }
    });
  }

  imprimir(relatorio, id) {
    if (id != 0 && id != null)
      this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
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

  alteraArtigoSimilares(index, event) {
    this.tabelaArtigosSimilar[index].designacao = event.value.design;
  }

  //validar ao concluir
  concluirEtapa(etapa) {
    this.temp_RESPONSABILIDADE_ATRASADO = null;
    this.temp_MOTIVO_ATRASO = null;
    if (etapa == 1 && this.tabelaEquipa.length == 0) {

      this.mensagem_verifica = "É necessário conter pelo menos um Responsável.";
      this.displayverificar = true;

    } else if (etapa == 3 || etapa == 5 || etapa == 6 || etapa == 7) {
      var tipo = "";
      if (etapa == 3) { tipo = "I"; }
      else if (etapa == 5) { tipo = "C"; }
      else if (etapa == 6) { tipo = "E"; }
      else if (etapa == 7) { tipo = "P"; }

      this.RCMOVRECLAMACAOService.getRC_MOV_RECLAMACAOACCOESABERTAS(this.numero_RECLAMACAO, tipo).subscribe(
        res => {
          if (res[0][0] > 0) {
            this.confirmarconcluir(etapa, this.numero_RECLAMACAO, tipo);
          } else {
            this.continuarconcluitEtapa(etapa);
          }
        }, error => {
          console.log(error);
          this.continuarconcluitEtapa(etapa);
        });

    } else {
      this.continuarconcluitEtapa(etapa);
    }
  }

  //se existirem accoes por concluir
  confirmarconcluir(etapa, id, tipo) {

    this.confirmationService.confirm({
      message: 'Existem acções por concluir, deseja continuar? O Estado das acções será alterado.',
      header: 'Continuar',
      icon: 'fa fa-info',
      accept: () => {

        this.RCMOVRECLAMACAOService.atualizaestadosRC_MOV_RECLAMACAUPDATEESTADOS(id, 5, tipo).subscribe(
          res => {
            this.continuarconcluitEtapa(etapa);
            this.carregatabelasaccoes(id, false)
          }, error => {
            this.continuarconcluitEtapa(etapa);
            console.log(error);
          });
      }

    });

  }

  continuarconcluitEtapa(etapa) {
    var atraso = this.atualizaDatasresposta(etapa, this['step' + etapa + 'CONCLUIDO_DATA']);
    if (atraso > 0) {
      this.temp_RESPONSABILIDADE_ATRASADO = "Doureca";
      this.tempo_ATRASO = atraso;
      this.displayResponsabilidade = true;
      this.temp_ETAPA = etapa;
    } else {
      this.tempo_ATRASO = 0;
      this.concluirEtapaGravar(etapa);
    }
  }

  //verifica  se quer apagar
  concluirEtapaGravar(etapa, apagar = false) {
    if (apagar) {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende anular os dados?',
        header: 'Apagar Confirmação',
        icon: 'fa fa-trash',
        accept: () => {
          this.concluirEtapaGravarDados(etapa, apagar);
        }

      });
    } else {
      this.concluirEtapaGravarDados(etapa, apagar);
    }
  }

  //grava dados step
  concluirEtapaGravarDados(etapa, apagar = false) {

    var reclamacao = new RC_MOV_RECLAMACAO;
    reclamacao = this.temp_RECLAMACAO;

    var concluido = true;
    var utilizador = this.user;
    if (apagar) {
      concluido = false;
      utilizador = null;
      this['step' + etapa + 'CONCLUIDO_DATA'] = null;
      reclamacao['step' + etapa + 'CONCLUIDO_DATA'] = null;
      reclamacao['step' + etapa + 'CONCLUIDO_DATA_MOD'] = null
      reclamacao['step' + etapa + 'CONCLUIDO_UTZ'] = utilizador;
      reclamacao['step' + etapa + 'CONCLUIDO'] = concluido;

      reclamacao['responsabilidade_ATRASO' + etapa] = null
      reclamacao['responsabilidade_ATRASO' + etapa + '_DESCRICAO'] = null
      reclamacao['dias_ATRASO' + etapa] = null;
    } else {
      reclamacao['step' + etapa + 'CONCLUIDO_DATA'] = this['step' + etapa + 'CONCLUIDO_DATA'];
      reclamacao['step' + etapa + 'CONCLUIDO_DATA_MOD'] = new Date();
      reclamacao['step' + etapa + 'CONCLUIDO_UTZ'] = utilizador;
      reclamacao['step' + etapa + 'CONCLUIDO'] = concluido;

      reclamacao['responsabilidade_ATRASO' + etapa] = this.temp_RESPONSABILIDADE_ATRASADO;
      reclamacao['responsabilidade_ATRASO' + etapa + '_DESCRICAO'] = this.temp_MOTIVO_ATRASO;
      reclamacao['dias_ATRASO' + etapa] = this.tempo_ATRASO;
    }

    this.reclamacao_dados['responsabilidade_ATRASO' + etapa] = reclamacao['responsabilidade_ATRASO' + etapa];
    this.reclamacao_dados['responsabilidade_ATRASO' + etapa + '_DESCRICAO'] = reclamacao['responsabilidade_ATRASO' + etapa + '_DESCRICAO'];
    this.reclamacao_dados['dias_ATRASO' + etapa] = reclamacao['dias_ATRASO' + etapa];

    this.reclamacao_dados['step' + etapa + 'CONCLUIDO_DATA'] = reclamacao['step' + etapa + 'CONCLUIDO_DATA'];
    this.reclamacao_dados['step' + etapa + 'CONCLUIDO_DATA_MOD'] = reclamacao['step' + etapa + 'CONCLUIDO_DATA_MOD'];
    this.reclamacao_dados['step' + etapa + 'CONCLUIDO_UTZ'] = reclamacao['step' + etapa + 'CONCLUIDO_UTZ'];
    this.reclamacao_dados['step' + etapa + 'CONCLUIDO'] = concluido;

    this.RCMOVRECLAMACAOService.update(reclamacao).subscribe(
      res => {
        this['step' + etapa + 'CONCLUIDO'] = concluido;
        this['step' + etapa + 'CONCLUIDO_UTZ'] = utilizador;
        this['responsabilidade_ATRASO' + etapa] = reclamacao['responsabilidade_ATRASO' + etapa];
        this['responsabilidade_ATRASO' + etapa + '_DESCRICAO'] = reclamacao['responsabilidade_ATRASO' + etapa + '_DESCRICAO'];
        this['dias_ATRASO' + etapa] = reclamacao['dias_ATRASO' + etapa];
        this.displayResponsabilidade = false;
        if (etapa == 8 && !apagar) {
          var email_para = [];
          email_para.push(this.drop_utilizadores2.find(item => item.value == this.utz_RESPONSAVEL).email);
          for (var x in this.tabelaEquipa) {
            if (this.tabelaEquipa[x].email != "" && this.tabelaEquipa[x].email != null && (email_para.indexOf(this.tabelaEquipa[x].email) < 0))
              email_para.push(this.tabelaEquipa[x].email);
          }
          this.RCMOVRECLAMACAOService.getEMAILS(reclamacao.id_RECLAMACAO).subscribe(
            resp => {
              var count = Object.keys(resp).length;
              if (count > 0) {
                for (var x in resp) {
                  if ((email_para.indexOf(resp[x][0]) < 0))
                    email_para.push(resp[x][0]);
                }
                this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                  "Ao Concluir Step-8", email_para.toString(), new Date(reclamacao.step8CONCLUIDO_DATA).toLocaleDateString(), ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), null);
              } else {
                this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                  "Ao Concluir Step-8", email_para.toString(), new Date(reclamacao.step8CONCLUIDO_DATA).toLocaleDateString(), ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), null);
              }
            },
            error => {
              console.log(error);
              this.simular(this.inputerro);
              this.enviarEventoResponsaveis(reclamacao.data_RECLAMACAO, reclamacao.observacoes_RECLAMACAO, reclamacao.id_RECLAMACAO, reclamacao.nome_CLIENTE, reclamacao.referencia + " - " + reclamacao.designacao_REF,
                "Ao Concluir Step-8", email_para.toString(), new Date(reclamacao.step8CONCLUIDO_DATA).toLocaleDateString(), ((reclamacao.observacoes_RESULTADOS != null) ? reclamacao.observacoes_RESULTADOS : ""), null);
            });
        }

      },
      error => { console.log(error); this.simular(this.inputerro); this.displayResponsabilidade = false; });
  }


  atualizaDatasresposta(step, data) {
    var date1 = new Date(this.temporesposta['step' + step + '_data']);
    var date2 = new Date(data);
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (date1.getTime() - date2.getTime() > 0) diffDays = 0;
    return diffDays;
  }

  //ao alterar cliente atualiza morada
  getMoradas(event, mor = false) {
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
          this.drop_moradas.push({ label: 'Sel. Morada.', value: "" });
          for (var x in response) {
            this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
          }
          this.drop_moradas = this.drop_moradas.slice();
          if (mor) this.morada_CLIENTE = this.drop_moradas.find(item => item.value.id == this.etsnum).value;
        } else {
          this.drop_moradas.push({ label: 'Sem Moradas para o Cliente Seleccionado', value: 0 });
          this.morada_CLIENTE = 0;
        }
      }, error => {
        console.log(error);
      });
  }

  //ao alterar moradas atualiza artigos
  getArtigos(event, ref = false) {

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
          this.drop_referencia.push({ label: 'Sem Artigos para a Morada Seleccionada', value: 0 });
          this.referencia = 0;
        }
      }, error => {
        console.log(error);
      });
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

  btgravar() {
    var encontrou = false;
    for (var x in this.fileselect) {

      if (this.fileselect[x]) {
        if (this.fileselectinput[x] == undefined || this.fileselectinput[x] == null) encontrou = true;
      }
    }
    if (encontrou) {
      this.classstep = "step-14";
      setTimeout(() => {
        this.simular(this.buttongravar);
      }, 10);

    } else {
      if (this.problema_REPETIDO && (this.numero_RECLAMACAO_REPETIDA == null || this.drop_numero_reclamacao.length == 0)) {
        this.classstep = "step-2";
        setTimeout(() => {
          this.simular(this.buttongravar);
        }, 10);
      } else {
        this.simular(this.buttongravar);
      }

    }

  }


  // *******************************************************consultas
  atualizatabelastock() {
    /*
        this.displaystock = false;
        if (this.selectedType2 == "atual") {
          this.verconsultaStock(this.referencia, true);
        } else if (this.selectedType2 == "nadata") {
          this.verconsultaStock_nadata();
        }*/
  }
  verconsultaStock(referencia = null, mostraadata, id = null) {

    this.motraopcao = true;
    if (id == null && !mostraadata) this.motraopcao = mostraadata;
    if (!this.novo && ((id != null && !mostraadata) || (id == null && mostraadata))) {
      //referencia = this.referencia;
      if (id == null) {
        this.verconsultaStock_nadata();
      } else {
        this.verconsultaStock_nadata2(id, referencia);
      }

    } else {
      if (referencia == null) referencia = this.referencia.valor;

      this.tabelastock = [];
      this.displayLoading = true;
      this.RCMOVRECLAMACAOService.getStock(referencia).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            for (var x in response) {
              this.tabelastock.push({ STOQTE: parseFloat(response[x].STOQTE), LIECOD: response[x].LIECOD });
            }
            this.tabelastock = this.tabelastock.slice();
            this.displayLoading = false;
            this.displaystock = true;
          } else {
            this.displayLoading = false;
            this.displaystock = true;
          }
        }, error => {
          this.displayLoading = false;
          console.log(error);
        });

    }
  }

  verconsultaStock_nadata() {
    this.selectedType2 = "nadata";
    this.tabelastock2 = [];
    this.RCMOVRECLAMACAOSTOCKService.getbyidreclamacao(this.reclamacao_dados.id_RECLAMACAO).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelastock2.push({ STOQTE: response[x].stoqte, LIECOD: response[x].liecod, STOQTE2: null });
          }
          this.tabelastock2 = this.tabelastock2.slice();
          this.preenchestock();
        } else {
          /*this.displayLoading = false;
          this.displaystock = true;*/
          this.preenchestock();
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  verconsultaStock_nadata2(id_linha, referencia) {
    this.selectedType2 = "nadata";
    this.tabelastock2 = [];
    this.RCMOVRECLAMACAOSTOCKService.getbyidlinha(this.reclamacao_dados.id_RECLAMACAO, id_linha).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelastock2.push({ STOQTE: response[x].stoqte, LIECOD: response[x].liecod, STOQTE2: null });
          }
          this.tabelastock2 = this.tabelastock2.slice();
          this.preenchestock(referencia);
        } else {
          /*this.displayLoading = false;
          this.displaystock = true;*/
          this.preenchestock(referencia);
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  preenchestock(referencia = null) {

    if (referencia == null) referencia = this.referencia.valor;
    this.RCMOVRECLAMACAOService.getStock(referencia).subscribe(
      response2 => {
        var count = Object.keys(response2).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response2) {
            var linha = this.tabelastock2.find(item => item.LIECOD == response2[x].LIECOD);
            if (linha) {
              linha.STOQTE2 = parseFloat(response2[x].STOQTE);
            } else {
              this.tabelastock2.push({ STOQTE2: parseFloat(response2[x].STOQTE), STOQTE: null, LIECOD: response2[x].LIECOD });
            }

          }
          this.tabelastock2 = this.tabelastock2.slice();
          this.displayLoading = false;
          this.displaystock = true;
        } else {
          this.displayLoading = false;
          this.displaystock = true;
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  verconsultaEnvios(referencia = null) {

    if (referencia == null) {
      referencia = this.referencia.valor;
    }

    this.tabelaEnvios = [];
    this.displayLoading = true;

    var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

    var d = data_r;
    d.setMonth(d.getMonth() - 3);

    var data_fim = new Date();
    if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
    var data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];

    this.RCMOVRECLAMACAOService.getEnviado(referencia, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelaEnvios.push({
              ADRLIB1: response[x].ADRLIB1,
              ADRLIB2: response[x].ADRLIB2,
              ADRNOM: response[x].ADRNOM + ' ' + response[x].ADRLIB1,
              BLNUM: response[x].BLNUM,
              CLICOD: response[x].CLICOD,
              ETSNUM: response[x].ETSNUM,
              LIPQTL: parseFloat(response[x].LIPQTL),
              LIVDATDEP: response[x].LIVDATDEP,
              LIVDATREC: response[x].LIVDATREC,
              PROREF: response[x].PROREF
            });
          }
          this.tabelaEnvios = this.tabelaEnvios.slice();
          this.displayLoading = false;
          this.displayenvios = true;
        } else {
          this.displayLoading = false;
          this.displayenvios = true;
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });

  }

  verconsultaPlaneado(referencia = null) {

    if (referencia == null) {
      referencia = this.referencia.valor;
    }

    this.tabelaplaneado = [];
    this.displayLoading = true;
    this.RCMOVRECLAMACAOService.getPlaneado(referencia).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelaplaneado.push({ OFNUM: response[x].OFNUM, OFDATFP: response[x].OFDATFP, QUANTIDADE: parseFloat(response[x].QUANTIDADE), PROREF: response[x].PROREF });
          }
          this.tabelaplaneado = this.tabelaplaneado.slice();
          this.displayLoading = false;
          this.displayplaneado = true;
        } else {
          this.displayLoading = false;
          this.displayplaneado = true;
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });

  }

  verconsultaEncomendado(referencia = null, mostraadata, id = null) {
    this.motraopcao2 = true;
    if (id == null && !mostraadata) this.motraopcao2 = mostraadata;
    if (!this.novo && ((id != null && !mostraadata) || (id == null && mostraadata))) {
      if (referencia == null) {
        referencia = this.referencia.valor;
      }
      if (id == null) {
        this.verconsultaEncomendado_a_data(referencia);
      } else {
        this.verconsultaEncomendado_a_data2(referencia, id);
      }

    } else {
      if (referencia == null) {
        referencia = this.referencia.valor;
      }

      this.tabelaencomendado = [];
      this.displayLoading = true;

      var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

      var d = data_r;
      d.setMonth(d.getDate() - 15);

      //var data_fim = new Date();
      //if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
      var data_fim = data_r;
      data_fim.setMonth(data_fim.getDate() + 30);
      var data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];

      this.RCMOVRECLAMACAOService.getEncomendasCliente(referencia, data).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            for (var x in response) {
              this.tabelaencomendado.push({
                ADRLIB1: response[x].ADRLIB1,
                ADRLIB2: response[x].ADRLIB2,
                ADRNOM: response[x].ADRNOM + ' ' + response[x].ADRLIB1,
                CDDDATBES: response[x].CDDDATBES,
                CLICOD: response[x].CLICOD,
                ETSNUM: response[x].ETSNUM,
                PROREF: response[x].PROREF,
                QUANTIDADE: parseFloat(response[x].QUANTIDADE)
              });
            }
            this.tabelaencomendado = this.tabelaencomendado.slice();
            this.displayLoading = false;
            this.displayencomendado = true;
          } else {
            this.displayLoading = false;
            this.displayencomendado = true;
          }
        }, error => {
          this.displayLoading = false;
          console.log(error);
        });
    }
  }

  verconsultaEncomendado_a_data(referencia = null) {
    this.tabelaencomendado2 = [];
    this.RCMOVRECLAMACAOENCOMENDASService.getbyidreclamacao(this.reclamacao_dados.id_RECLAMACAO).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelaencomendado2.push({
              CDDCHRONO: response[x].cddchrono,
              ADRLIB1: response[x].adrlib1,
              ADRLIB2: response[x].adrlib2,
              ADRNOM: response[x].adrnom + ' ' + response[x].adrlib1,
              CDDDATBES: this.formatDate2(response[x].cdddatbes),
              CDDDATBES2: null,
              CLICOD: response[x].clicod,
              ETSNUM: response[x].etsnum,
              PROREF: this.referencia.value,
              QUANTIDADE: response[x].quantidade.toFixed(0),
              QUANTIDADE2: null
            });
          }
          this.tabelaencomendado2 = this.tabelaencomendado2.slice();
          this.verconsultaEncomendado2(referencia);
        } else {
          this.verconsultaEncomendado2(referencia);
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  verconsultaEncomendado_a_data2(referencia = null, id) {
    this.tabelaencomendado2 = [];
    this.RCMOVRECLAMACAOENCOMENDASService.getbyidlinha(this.reclamacao_dados.id_RECLAMACAO, id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            this.tabelaencomendado2.push({
              CDDCHRONO: response[x].cddchrono,
              ADRLIB1: response[x].adrlib1,
              ADRLIB2: response[x].adrlib2,
              ADRNOM: response[x].adrnom + ' ' + response[x].adrlib1,
              CDDDATBES: this.formatDate2(response[x].cdddatbes),
              CDDDATBES2: null,
              CLICOD: response[x].clicod,
              ETSNUM: response[x].etsnum,
              PROREF: this.referencia.value,
              QUANTIDADE: response[x].quantidade.toFixed(0),
              QUANTIDADE2: null
            });
          }
          this.tabelaencomendado2 = this.tabelaencomendado2.slice();
          this.verconsultaEncomendado2(referencia);
        } else {
          this.verconsultaEncomendado2(referencia);
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });
  }

  verconsultaEncomendado2(referencia = null) {
    this.tabelaencomendado = [];
    this.displayLoading = true;

    var data_r = (this.data_RECLAMACAO != null) ? new Date(this.data_RECLAMACAO) : new Date();

    var d = data_r;
    d.setMonth(d.getDate() - 15);

    // var data_fim = new Date();
    //if (this.step8CONCLUIDO_DATA != null) data_fim = new Date(this.step8CONCLUIDO_DATA);
    var data_fim = data_r;
    data_fim.setMonth(data_fim.getDate() + 30);
    var data = [{ DATA: this.formatDate2(d), DATA_FIM: this.formatDate2(data_fim) }];

    this.RCMOVRECLAMACAOService.getEncomendasCliente(referencia, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          //console.log(response)
          for (var x in response) {
            var linha = this.tabelaencomendado2.find(item => item.CDDCHRONO == response[x].CDDCHRONO);
            if (linha) {
              linha.CDDDATBES2 = response[x].CDDDATBES;
              linha.QUANTIDADE2 = parseFloat(response[x].QUANTIDADE);
            } else {
              this.tabelaencomendado2.push({
                CDDCHRONO: response[x].CDDCHRONO,
                ADRLIB1: response[x].ADRLIB1,
                ADRLIB2: response[x].ADRLIB2,
                ADRNOM: response[x].ADRNOM + ' ' + response[x].ADRLIB1,
                CDDDATBES: null,
                CDDDATBES2: response[x].CDDDATBES,
                CLICOD: response[x].CLICOD,
                ETSNUM: response[x].ETSNUM,
                PROREF: response[x].PROREF,
                QUANTIDADE: null,
                QUANTIDADE2: parseFloat(response[x].QUANTIDADE)
              });
            }
          }
          this.tabelaencomendado2 = this.tabelaencomendado2.slice();
          this.displayLoading = false;
          this.displayencomendado = true;
        } else {
          this.displayLoading = false;
          this.displayencomendado = true;
        }
      }, error => {
        this.displayLoading = false;
        console.log(error);
      });

  }

  /* VALIDAR LOTE/ GUI / ETIQUETA */

  consulta() {
    if (this.selectedType == "lote") {
      this.tabelaConsultaLotes = [];
      this.displayLoading = true;
      this.RCMOVRECLAMACAOService.getDadosporLote(this.lote).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            for (var x in response) {
              this.tabelaConsultaLotes.push({ PROREF: response[x].PROREF, PRODES1: response[x].PRODES1, LIECOD: response[x].LIECOD, ETQEMBQTE: response[x].ETQEMBQTE, ETQORILOT1: response[x].ETQORILOT1, ETQNUM: response[x].ETQNUM });
            }
            this.tabelaConsultaLotes = this.tabelaConsultaLotes.slice();
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          } else {
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          }
        }, error => {
          this.displayLoading = false;
          console.log(error);
        });

    } else if (this.selectedType == "etiqueta") {
      this.tabelaConsultaLotes = [];
      this.displayLoading = true;
      var etiqueta = "0000000000" + this.lote;
      this.RCMOVRECLAMACAOService.getDadosporEtiqueta(etiqueta.substring(etiqueta.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            for (var x in response) {
              this.tabelaConsultaLotes.push({ PROREF: response[x].PROREF, PRODES1: response[x].PRODES1, LIECOD: response[x].LIECOD, ETQEMBQTE: response[x].ETQEMBQTE, ETQORILOT1: response[x].ETQORILOT1, ETQNUM: response[x].ETQNUM });
            }
            this.tabelaConsultaLotes = this.tabelaConsultaLotes.slice();
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          } else {
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          }
        }, error => {
          this.displayLoading = false;
          console.log(error);
        });

    } else if (this.selectedType == "guia") {
      this.tabelaConsultaLotes = [];
      this.displayLoading = true;
      this.RCMOVRECLAMACAOService.getDadosporGuia(this.lote).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            for (var x in response) {
              this.tabelaConsultaLotes.push({ PROREF: response[x].PROREF, PRODES1: response[x].PRODES1, LIECOD: response[x].LIECOD, ETQEMBQTE: response[x].ETQEMBQTE, ETQORILOT1: response[x].ETQORILOT1, ETQNUM: response[x].ETQNUM });
            }
            this.tabelaConsultaLotes = this.tabelaConsultaLotes.slice();
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          } else {
            this.displayLoading = false;
            this.displayconsultaLotes = true;
          }
        }, error => {
          this.displayLoading = false;
          console.log(error);
        });

    }
  }

  validar() {
    this.validaloading = true;
    if (this.selectedType == "lote") {
      this.RCMOVRECLAMACAOService.validalote(this.lote).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            this.validaloading = false;
            this.errovalida = "";
          } else {
            this.validaloading = false;
            this.errovalida = "Número Lote não foi encontrado!";
            this.displayvalidacao = true;
          }
        }, error => {
          this.validaloading = false;
          this.errovalida = "Número Lote não foi encontrado!";
          this.displayvalidacao = true;
          console.log(error);
        });
    } else if (this.selectedType == "etiqueta") {
      var etiqueta = "0000000000" + this.lote;
      this.RCMOVRECLAMACAOService.validaEtiqueta(etiqueta.substring(etiqueta.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            this.errovalida = "";
            this.validaloading = false;
            this.errovalida = "";
          } else {
            this.errovalida = "Etiqueta não foi encontrada!";
            this.displayvalidacao = true;
            this.validaloading = false;
          }
        }, error => {
          this.errovalida = "Etiqueta não foi encontrada!";
          this.displayvalidacao = true;
          this.validaloading = false;
          console.log(error);
        });

    } else if (this.selectedType == "guia") {
      this.RCMOVRECLAMACAOService.validaGuia(this.lote).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            //console.log(response)
            this.errovalida = "";
            this.validaloading = false;
          } else {
            this.validaloading = false;
            this.errovalida = "Guia não foi encontrada!";
            this.displayvalidacao = true;

          }
        }, error => {
          this.errovalida = "Guia não foi encontrada!";
          this.displayvalidacao = true;
          this.validaloading = false;
          console.log(error);
        });

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

  //gravar unidade de zona
  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "R";
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

  showDialogArtigos(index) {
    this.displayArtigos = true;
    this.temp_INDEX = index;

  }

  escolherartigo(event) {
    var linha = this.tabelaArtigosSimilar.find(item => item.artigo == event.valor);
    var index = this.tabelaArtigosSimilar.findIndex(item => item.artigo == event.valor);
    if ((!linha || index == this.temp_INDEX) && event.valor != this.referencia.valor) {
      this.tabelaArtigosSimilar[this.temp_INDEX].artigo = event.valor;
      this.tabelaArtigosSimilar[this.temp_INDEX].designacao = event.design;
      this.displayArtigos = false;
    } else {
      this.simular(this.inputartigoexiste);
    }

  }

  settabelaCliente(value, index) {
    this.tabelaClientes[index].nome_cliente = (this.drop_cliente_tabela.find(item => item.value == value)) ? this.drop_cliente_tabela.find(item => item.value == value).nome : null;
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

  alterarEmail2(index, event, tabela) {
    if (event.target.value.toString().includes("u")) {
      var id = event.target.value.toString().replace("u", "");
      if (tabela == "tabelaaccoescorretivas") {
        this.tabelaaccoescorretivas[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      } else if (tabela == "tabelaaccoesimediatas") {
        this.tabelaaccoesimediatas[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      } else if (tabela == "tabelaEficacia") {
        this.tabelaEficacia[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      } else if (tabela == "tabelapreventiva") {
        this.tabelapreventiva[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      }
    } else {
      if (tabela == "tabelaaccoescorretivas") {
        this.tabelaaccoescorretivas[index].area = "";
      } else if (tabela == "tabelaaccoesimediatas") {
        this.tabelaaccoesimediatas[index].area = "";
      } else if (tabela == "tabelaEficacia") {
        this.tabelaEficacia[index].area = "";
      } else if (tabela == "tabelapreventiva") {
        this.tabelapreventiva[index].area = "";
      }
    }
  }

  enviarEventoResponsaveis(data_reclamacao, observacao, numero_reclamacao, cliente, referencia, MOMENTO, email_para, data_conclusao, observacao_conclusao, data_cancelamento) {
    if (observacao == null) {
      observacao = "";
    }
    var dados = "{observacao::" + observacao + "\n/link::" + webUrl.host + '/#/reclamacoesclientes/view?id=' + numero_reclamacao
      + "\n/numero_reclamacao::" + numero_reclamacao + "\n/cliente::" + cliente
      + "\n/data_reclamacao::" + new Date(data_reclamacao).toLocaleDateString() + "\n/referencia::" + referencia
      + "\n/data_cancelamento::" + data_cancelamento
      + "\n/data_conclusao::" + data_conclusao + "\n/observacao_conclusao::" + observacao_conclusao + "}";


    var data = [{ MODULO: 5, MOMENTO: MOMENTO, PAGINA: "Reclamações Clientes", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

  //atualiza ou cria tarefa
  crisaTarefas(id, modulo) {
    var link = webUrl.host + '/#/tarefas/view?id=';
    /*this.GTMOVTAREFASService.getAtulizaTarefasd(id, modulo, link).subscribe(
      response => {

      }, error => { console.log(error); });*/
    this.GTMOVTAREFASService.getAtualizaTarefaReclamacao(id, modulo, link).subscribe(
      response => {

      }, error => { console.log(error); });
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


  criaLogs(log) {
    this.GTMOVTAREFASService.createLOGS(log).subscribe(response => {
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

  enviosGarantidoscheck(event, index) {

    if (event) {

    } else {
      if (this.tabelaEnviosGarantidos[index].id != null) {
        this.apagar_linha("tabelaEnviosGarantidos", index)
      }

    }
  }

  atualizadataRevista(event) {

    if (event) {
      var data = new Date()
      this.data_RECLAMACAO_REVISTA = data;
      this.hora_RECLAMACAO_REVISTA = data.toLocaleTimeString().slice(0, 5);
    } else {
      this.data_RECLAMACAO_REVISTA = null;
      this.hora_RECLAMACAO_REVISTA = null;
    }
  }
  atualizadataRejeicao(event) {
    var valor = this.drop_rejeicao.find(item => item.value == event.value).revisao_RECLAMACAO;
    this.reclamacao_COM_REVISAO = valor;
    this.obriga_revisao = valor;
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

  //ao concluir
  btconcluir() {
    this.confirmationService.confirm({
      message: "Deseja Concluir a Reclamação?",
      header: 'Confirmação',
      icon: 'fa fa-info',
      accept: () => {
        this.verificar();
      }

    });
  }

  //verificar se os envios garantidos estão marcados, se cada etapa está fechada, se obriga a
  //revisão então verifica se a reclamação está revista e a data de revisão preenchida, se todas as tarefas/ações estão
  //concluídas, canceladas ou rejeitadas.
  verificar() {
    this.mensagem_verifica = "";
    var count = 0;
    for (var x in this.tabelaEnviosGarantidos) {
      if (this.tabelaEnviosGarantidos[x].envio) {
        if (this.envio_GARANTIDO_POR == "cliente") {
          if (this.tabelaEnviosGarantidos[x].cliente.trim() == this.cliente.nome.trim()) count++;
        } else if (this.envio_GARANTIDO_POR == "referencia") {
          if (this.tabelaEnviosGarantidos[x].PROREF.trim() == this.referencia.valor.trim()) count++;
        }
      }
    }

    if (this.numero_ENVIOS_GARANTIDOS > 0 && count != this.numero_ENVIOS_GARANTIDOS) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Verificar Envios Garantidos</li>"


    if (this.reclamacao_COM_REVISAO) {
      if (!this.reclamacao_REVISTA || this.data_RECLAMACAO_REVISTA == null) {
        this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Revisar a Reclamação</li>";
      }
    }

    if (!this.step1CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-1</li>";
    if (!this.step2CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-2</li>";
    if (!this.step3CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-3</li>";
    if (!this.step4CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-4</li>";
    if (!this.step5CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-5</li>";
    if (!this.step6CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-6</li>";
    if (!this.step7CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-7</li>";
    if (!this.step8CONCLUIDO) this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir Step-8</li>";

    this.RCMOVRECLAMACAOService.getbyIDTotalTarefas(this.numero_RECLAMACAO).subscribe(
      response => {
        if (parseInt(response[0]) > 0) { this.mensagem_verifica += "<li class='list-group-item list-group-item-danger'>Falta Concluir " + response[0] + " Tarefa(s)</li>"; }

        if (this.mensagem_verifica != "") {
          this.displayverificar = true;
        } else {
          this.data_FECHO = new Date();
          this.reclamacao_ENCERRADA = true;
          this.estado = "F";
          this.utz_FECHO = this.user;
          this.btgravar();
        }
      }, error => {
        console.log(error);
        if (this.mensagem_verifica != "") {
          this.displayverificar = true;
        } else {
          this.data_FECHO = new Date();
          this.reclamacao_ENCERRADA = true;
          this.estado = "F";
          this.utz_FECHO = this.user;
          this.btgravar();
        }
      });
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

  //ao alterar Problema repetido
  atualizacombo() {
    if (!this.problema_REPETIDO) {
      this.numero_RECLAMACAO_REPETIDA = null;
    } else {
      this.numero_RECLAMACAO_REPETIDA = this.drop_numero_reclamacao[0].value;
    }
  }


  traduzir(campofrom, campoto, valor) {
    if (valor != null) {
      var data = [{ texto: this[campofrom], langTo: valor }];
      this.RCMOVRECLAMACAOService.traduzir(data).subscribe(
        res => {
          this[campoto] = res._body;
        },
        error => { console.log(error); this.simular(this.inputerro2); this.displayLoading = false; });
    }
  }

  procurar_cliente() {
    if (this.referencias.length <= 0) {
      this.ABDICCOMPONENTEService.getReferencias().subscribe(
        response => {
          this.referencias = [];
          for (var x in response) {
            this.referencias.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1, value: response[x].PROREF });
          }
          this.referencias = this.referencias.slice();
        },
        error => {
          console.log(error);
        });
    }

    this.display_ref_cliente = true;
    this.referencia_filter = null;
    this.campo_ref = null;
    this.filteredreferencia = [];
    this.cliente_pesquisa = null;
  }

  filterRef(event) {
    this.filteredreferencia = this.pesquisa(event.query);
  }

  pesquisa(text) {
    var result = [];
    for (var x in this.referencias) {
      let ref = this.referencias[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.referencias[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    this.referencia_filter = null;
    this.drop_cliente_pesquisa = [];
    this.cliente_pesquisa = null;
  }

  filterSelect(event) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.referencia_filter = event.value;

      this.ABDICCOMPONENTEService.getMoradaClientePorReferencia(this.referencia_filter).subscribe(
        response => {
          this.drop_cliente_pesquisa = [];
          var count = Object.keys(response).length;
          if (count > 0) {
            this.drop_cliente_pesquisa.push({ label: 'Sel. Cliente/Morada', value: "" });
            for (var x in response) {
              this.drop_cliente_pesquisa.push({ label: response[x].NOME_CLIENTE + ' / ' + response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { FAMCOD: response[x].FAMCOD, ETSNUM: response[x].ETSNUM, id: response[x].CLICOD, nome: response[x].NOME_CLIENTE } });
            }
            //this.cliente_pesquisa = this.drop_cliente_pesquisa[0];
          } else {

          }
        }, error => {
          console.log(error);
        });
    } else {
      //this.referencia_func = null;
    };
  }

  alterar_cliente() {
    //console.log(this.referencia_filter)
    //cliente_pesquisa
    //morada_pesquisa
    //drop_morada_pesquisa
    //drop_cliente_pesquisa
    this.cliente = this.drop_cliente.find(item => item.value.id == this.cliente_pesquisa.id).value;
    this.referencia_temp = this.referencia_filter;
    this.familia_REF = this.cliente_pesquisa.FAMCOD;
    this.getMoradas(this.cliente_pesquisa.id, true);
    this.getArtigos(this.cliente_pesquisa.ETSNUM, true);
    this.display_ref_cliente = false;
  }

}
