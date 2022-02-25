import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PE_MOV_CAB } from 'app/entidades/PE_MOV_CAB';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { GERDEPARTAMENTOService } from 'app/servicos/ger-departamento.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { GTDICTIPOACAOService } from 'app/servicos/gt-dic-tipo-acao.service';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { PADICAMBITOSService } from 'app/servicos/pa-dic-ambitos.service';
import { PEMOVCABService } from 'app/servicos/pe-mov-cab.service';
import { PEMOVFICHEIROSService } from 'app/servicos/pe-mov-ficheiros.service';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { RCDICGRAUIMPORTANCIAService } from 'app/servicos/rc-dic-grau-importancia.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { UploadService } from 'app/servicos/upload.service';
import { ConfirmationService, DataTable, FileUpload } from 'primeng/primeng';
import { Location } from '@angular/common';
import * as FileSaver from 'file-saver';
import { webUrl } from 'assets/config/webUrl';
import { PE_MOV_FICHEIROS } from 'app/entidades/PE_MOV_FICHEIROS';
import { GT_LOGS } from 'app/entidades/GT_LOGS';
import { GT_MOV_TAREFAS } from 'app/entidades/GT_MOV_TAREFAS';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { PAMOVCABService } from 'app/servicos/pa-mov-cab.service';
import { PAMOVLINHAService } from 'app/servicos/pa-mov-linha.service';
import { PA_MOV_LINHA } from 'app/entidades/PA_MOV_LINHA';
import { PA_MOV_CAB } from 'app/entidades/PA_MOV_CAB';
import { PE_MOV_CAB_HISTORICO } from 'app/entidades/PE_MOV_CAB_HISTORICO';
import { PEMOVCABHISTORICOService } from 'app/servicos/pe-mov-cab-historico.service';
import { reject } from 'core-js/fn/promise';

@Component({
  selector: 'app-form-planos-estrategicos',
  templateUrl: './form-planos-estrategicos.component.html',
  styleUrls: ['./form-planos-estrategicos.component.css']
})
export class FormPlanosEstrategicosComponent implements OnInit {

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild("tabeladados") dataTableComponent: DataTable;
  user: any;
  yearTimeout: any;
  user_nome: any;
  adminuser: any;
  modoedicao: boolean;
  novo: boolean;
  linhas: any[];
  cor_linha: any;
  drop_accoes: any;
  drop_departamentos: any[];
  tabelaplanos = [];
  id_PLANO: number;

  id_LINHA;
  descricao: string;
  objetivo: string;
  responsavel;

  estado: string = 'E';

  estado_texto: string;
  utilizador;
  data_CRIA;
  hora_CRIA: string;
  tabelaaccoes = [];
  plano_estrategico: PE_MOV_CAB;
  drop_utilizadores: any[];
  id_selected: number;
  displayAddAccao: boolean;
  /* estados = [{ value: "", label: "Sel. Estado" }, { value: "P", label: "Planeado" }, { value: "I", label: "Desenvolvido/Realizado" },
   { value: "C", label: "Controlado/Verificado" }, { label: "Aprovado/Fechado", value: "V" }, { value: "D", label: "Cancelado" },];*/
  estados = [{ label: "Sel. Estado", value: null }, { label: "Em Elaboração", value: "Em Elaboração" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvido/Realizado", value: "Desenvolvido/ Realizado" }, { label: "Controlado/Verificado", value: "Controlado/ Verificado" },
  { label: "Aprovado/Finalizado", value: "Aprovado/ Finalizado" }, { value: "Rejeitado", label: "Rejeitado" }, { value: "Cancelado", label: "Cancelado" }];

  departamento_ORIGEM: number;
  departamento: number;
  descricaopt: string;
  descricaoeng: string;
  descricaofr: string;
  data_agora: Date;
  caminho: string;

  ambitos = [];
  percentagem_conclusao = 0;
  ambito = null;
  disEditar: boolean;
  disCriar: boolean;
  disApagar: boolean;
  disImprimir: boolean;
  btcriar: boolean;
  btapagar: boolean;
  btimprimir: boolean;
  btvoltar: boolean;
  bteditar: boolean;
  btLancarPlano: boolean;
  btControlar: boolean;
  disAprovar: boolean;
  btAprovar: boolean;
  disValidar: boolean;
  btValidar: boolean;
  data_OBJETIVO;
  origem: any;
  //drop_prioridades: any[];
  linhasSelecionadas: any;
  mensagem_verifica: string;
  displayverificar: boolean;
  tipo: string;
  btCancelar: boolean;
  disCancelar: boolean;
  disControlar: boolean;
  disLancarPlano: boolean;
  filteredreferencias: any[];
  referencia_campo: any;
  filedescricao = [];
  campo_x: any;
  uploadedFiles: any[] = [];
  @ViewChild('fileInput') fileInput: FileUpload;
  srcelement: any;
  nomeficheiro: any;
  type: string;
  display: boolean;
  tipos_acao: any[];
  estado_justificacao: string;
  justificacao_ALTERACAO_ESTADO: string;
  displayJustificacao: boolean;
  index_linha: any;
  num_existe: boolean;
  class_numexiste: string;
  unidades = [{ label: "Selecionar Unidade", value: null }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }];
  unidade: any;
  //plano: PE_MOV_CAB;
  displayAddPlano: boolean;
  ambito_atual: any;
  anos = [];
  drop_utilizadores_planos: any[];
  ano;
  displayAddPlano_show: boolean;
  dados = [];
  lista_expand = [];
  displayAssociarPlano: boolean;
  lista_expand_planos = [];
  numero = 1.1;
  motivoAlteracao: any;
  displayMotivoAlteracao: boolean;
  displayApagar: boolean;
  constructor(private GTDICTIPOACAOService: GTDICTIPOACAOService,
    private UploadService: UploadService,
    private GTMOVTAREFASService: GTMOVTAREFASService,
    private RCDICGRAUIMPORTANCIAService: RCDICGRAUIMPORTANCIAService,
    private GERUTILIZADORESService: GERUTILIZADORESService,
    private PEMOVFICHEIROSService: PEMOVFICHEIROSService,
    private PAMOVLINHAService: PAMOVLINHAService,
    private PAMOVCABService: PAMOVCABService,
    private PEMOVCABService: PEMOVCABService,
    private GERDEPARTAMENTOService: GERDEPARTAMENTOService,
    private sanitizer: DomSanitizer,
    private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService,
    private ABDICLINHAService: ABDICLINHAService, private location: Location,
    private elementRef: ElementRef, private confirmationService: ConfirmationService
    , private RelatoriosService: RelatoriosService, private route: ActivatedRoute,
    private renderer: Renderer, private globalVar: AppGlobals, private router: Router,
    private PADICAMBITOSService: PADICAMBITOSService, private PEMOVCABHISTORICOService: PEMOVCABHISTORICOService
  ) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }


    this.ano = new Date().getFullYear();

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.btcriar = true;
    this.btapagar = true;
    this.btimprimir = false;
    this.btvoltar = true;
    this.bteditar = true;
    this.btLancarPlano = false;
    this.btControlar = false;
    this.btAprovar = false;
    this.btCancelar = false;
    this.btValidar = false;

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];
    var node = "node155";
    this.tipo = "T";

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
    if (urlarray[0] == 'planosestrategicosengenaria') {
      node = "node1611";
      this.tipo = "EP";
    } else if (urlarray[0] == 'planosestrategicosproducao') {
      node = "node1631";
      this.tipo = "P";
    } else if (urlarray[0] == 'planosestrategicoslogistica') {
      node = "node1641";
      this.tipo = "L";
    } else if (urlarray[0] == 'planosestrategicosmanutencao') {
      node = "node1651";
      this.tipo = "M";
    } else if (urlarray[0] == 'planosestrategicosinjecao') {
      node = "node1661";
      this.tipo = "I";
    } else if (urlarray[0] == 'planosestrategicosComercial') {
      node = "node1671";
      this.tipo = "C";
    } else if (urlarray[0] == 'planosestrategicosProjetos') {
      node = "node1681";
      this.tipo = "PR";
    } else if (urlarray[0] == 'planosestrategicosFinanceira') {
      node = "node1691";
      this.tipo = "F";
    } else if (urlarray[0] == 'planosestrategicosqualidade') {
      node = "node1621";
      this.tipo = "Q";
    }





    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        //this.btapagar = false;
        this.btapagar = true;
        //this.btimprimir = true;
        this.modoedicao = true;
        this.btControlar = true;
        this.btAprovar = true;
        this.btValidar = false;
        this.btCancelar = false;

      } else if (urlarray[1].match("novo")) {
        this.btapagar = false;
        this.btimprimir = false;
        this.btcriar = false;
        this.btLancarPlano = false;
        this.btControlar = false;
        this.btAprovar = false;
        this.btValidar = false;
        this.btCancelar = false;

        this.novo = true;
        this.bteditar = false;
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

        var data = new Date();
        this.data_agora = data;
        this.data_CRIA = this.formatDate(data);
        this.hora_CRIA = new Date(data).toLocaleTimeString().slice(0, 5);
        //this.utilizador = this.user_nome;
        this.estado_texto = this.getestado(this.estado);
        //this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.btLancarPlano = false;
        this.btControlar = false;
        this.btAprovar = false;
        this.btCancelar = false;
        this.btcriar = true;
        this.btapagar = true;
        this.btValidar = false;
        this.btCancelar = false;

      }
    }


    if (this.tipo == "T") {
      this.btapagar = false;
      this.btcriar = false;
      this.btLancarPlano = false;
      this.btControlar = false;
      this.btAprovar = false;
      this.bteditar = false;
      this.btCancelar = false;
      this.btValidar = false;
      this.btCancelar = false;

    }

    this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "editar");
    this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "criar");
    this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "apagar");
    this.disImprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "imprimir");

    this.disLancarPlano = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "lancarplano");
    this.disControlar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "controloar");
    this.disAprovar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "aprovar");
    this.disCancelar = false; //!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "cancelar");

    this.disValidar = false;

    this.carrega_PRIORIDADE();
    this.listar_ambitos();
    this.listar_tipos_accao();

    if (!this.novo) {
      this.preenchelinhas(true, id);
    } else {
      this.getdadosutlizador();
      this.preenchelinhas(false, id);
    }

  }

  //listar ambitos
  listar_ambitos() {
    this.ambitos = [];
    this.PADICAMBITOSService.getAll().subscribe(
      response => {
        this.ambitos.push({ value: "", label: "Sel. Âmbito" })
        for (var x in response) {
          this.ambitos.push({ value: response[x].id_AMBITO, label: response[x].descricao });
          if (response[x].descricao == 'Plano Estratégico') {
            this.ambito_atual = response[x].id_AMBITO;
          }
        }
        this.ambitos = this.ambitos.slice();
      },
      error => console.log(error));
  }

  //listar tipos accao
  listar_tipos_accao() {
    this.tipos_acao = [];
    this.GTDICTIPOACAOService.getAll().subscribe(
      response => {
        this.tipos_acao.push({ value: "", label: "Sel. Tipo de Ação" })
        for (var x in response) {
          this.tipos_acao.push({ value: response[x].id_TIPO_ACAO, label: response[x].descricao });
        }
        this.tipos_acao = this.tipos_acao.slice();
      },
      error => console.log(error));
  }


  getdadosutlizador() {

    this.GERUTILIZADORESService.getDadosUtilizador(this.user).subscribe(
      response => {

        for (var x in response) {
          this.responsavel = this.user_nome + '/' + ((response[x][0] == null) ? "--" : response[x][0]);
          this.departamento = response[x][1];
        }

      },
      error => { console.log(error); });
  }

  preenchelinhas(inicia, id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: null });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();

        this.carregadepartamentos(inicia, id);

      },
      error => { console.log(error); this.carregadepartamentos(inicia, id); });
  }

  carregadepartamentos(inicia, id) {
    this.drop_departamentos = [];
    this.GERDEPARTAMENTOService.getAll().subscribe(
      response => {
        this.drop_departamentos.push({ label: "", value: "" });

        for (var x in response) {
          this.drop_departamentos.push({ label: response[x].descricao, value: response[x].id });
        }

        this.drop_departamentos = this.drop_departamentos.slice();
        this.carregaaccoes(inicia, id);

      },
      error => { console.log(error); this.carregaaccoes(inicia, id); });
  }


  carregaaccoes(inicia, id, countinua = true) {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("PA").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();
        if (countinua) {
          this.carregaUtilizadores(inicia, id);
          this.carregaUtilizadores_planos();
        }

      },
      error => {
        console.log(error); if (countinua) {
          this.carregaUtilizadores(inicia, id);
          this.carregaUtilizadores_planos();
        }
      });
  }

  carregaUtilizadores(inicia, id) {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        //this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {

          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email });
        }
        this.drop_utilizadores.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        this.drop_utilizadores.unshift({ label: "Selecionar Utilizador", value: "" });
        this.drop_utilizadores = this.drop_utilizadores.slice();

        if (inicia) this.inicia(id, true);
      },
      error => { console.log(error); if (inicia) this.inicia(id, true); });
  }

  carregaUtilizadores_planos() {
    this.drop_utilizadores_planos = [];
    this.GERUTILIZADORESService.getDadosUtilizadorAll().subscribe(
      response => {
        this.drop_utilizadores_planos.unshift({ label: "Selecionar Utilizador", value: "" });
        for (var x in response) {

          this.drop_utilizadores_planos.push({ label: response[x][0] + '/' + ((response[x][1] == null) ? "--" : response[x][1]), value: response[x][3], departamento: response[x][2] });
        }

        this.drop_utilizadores_planos = this.drop_utilizadores_planos.slice();

      },
      error => { console.log(error); });
  }

  carrega_PRIORIDADE() {
    /* this.drop_prioridades = [];
     this.RCDICGRAUIMPORTANCIAService.getAll().subscribe(
       response => {
         this.drop_prioridades = [];
         this.drop_prioridades.push({ label: 'Sel. Prioridade', value: "" });
         for (var x in response) {
           this.drop_prioridades.push({ label: response[x].descricao, value: response[x].id });
         }
 
       }, error => { console.log(error); });*/
  }

  alteraDepartamento(event) {
    if (event.value != null) {
      var array = this.drop_utilizadores_planos.find(item => item.value == event.value);
      this.departamento_ORIGEM = array.departamento;
    } else {
      this.departamento_ORIGEM = null;
    }

  }
  inicia(id, atualizalinhas) {
    this.PEMOVCABService.getById(id).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {
            this.plano_estrategico = response[x][0];
            this.id_PLANO = response[x][0].id;



            this.estado = (response[x][0].estado);
            this.estado_texto = this.getestado(response[x][0].estado);
            this.responsavel = response[x][1] + '/' + ((response[x][2] == null) ? "--" : response[x][2]);
            this.data_CRIA = this.formatDate(response[x][0].data_CRIA);
            this.hora_CRIA = new Date(response[x][0].data_CRIA).toLocaleTimeString().slice(0, 5);


            this.departamento = response[x][0].departamento_ORIGEM;



            if (!this.adminuser && this.user != response[x][0].utz_CRIA) {
              this.btControlar = false;
              this.bteditar = false;
              this.btCancelar = false;
              this.btAprovar = false;
              this.btLancarPlano = false;
              this.btapagar = false;

            } else {
              if (response[x][0].estado == 'E' || response[x][0].estado == 'EL') {
                this.btValidar = true;
              }

              if (response[x][0].estado == 'EX') {
                this.btCancelar = true;
              }

              if (response[x][0].estado == 'A') {
                this.bteditar = false;
                this.btapagar = false;
              }
            }

            if (this.tipo == "T") {
              this.btCancelar = false;
              this.btValidar = false;
            }
          }

          //if (this.estado == 'A') this.globalVar.setdisApagar(true);
          if (atualizalinhas) this.carregarplanos('ID_PLANO_ESTRATEGICO', id);
          if (atualizalinhas) this.carregatabelaFiles(id);
        }
      }, error => { console.log(error); });
  }

  carregarplanos(tipo, id) {
    if (tipo == 'ID_PLANO_ESTRATEGICO') {
      this.tabelaplanos = [];
      this.lista_expand_planos = [];
      this.numero = 1.1;
    }

    this.PAMOVCABService.getPA_MOV_CABbyidPlanoEstrategico(tipo, id).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {
            var linha = this.tabelaplanos.find(item => item.id == response[x][0]);
            if (!linha && (parseInt(x) != 0 || tipo != 'ID_PLANO_ESTRATEGICO')) this.numero = this.numero + 0.1
            this.carregarlinhas(response, x, parseFloat(this.numero.toString()).toFixed(1));
          }
          this.tabelaplanos = this.tabelaplanos.slice();
          this.calcucarpercentagem_conclusao();
        }
      }, error => { console.log(error); });
  }

  carregarlinhas(response, x, numero) {

    var linha = this.tabelaplanos.find(item => item.id == response[x][0]);
    var cor = "";
    var corlinha = "";
    var cor_letra = "";
    var cor_letra_linha = "";
    var data = this.formatDate(new Date());

    if (response[x][2] != null) {
      if (new Date(response[x][2]).getTime() < new Date(data).getTime()) {
        cor = "red";
        cor_letra = "white";
      } else if (new Date(response[x][2]).getTime() == new Date(data).getTime()) {
        cor = "yellow";
      }
    }

    if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
      corlinha = "red";
      cor_letra_linha = "white";
    } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
      corlinha = "yellow";
    }

    if (response[x][13] != "E" && response[x][13] != "P" && response[x][13] != null) { corlinha = ""; cor_letra_linha = ""; }
    if (response[x][7] != "E" && response[x][7] != "P" && response[x][7] != null) { cor = ""; cor_letra = ""; }

    if (linha) {
      linha.filho.push({
        numero: numero + '.' + (linha.filho.length + 1),
        conclusao: response[x][21],
        corlinha: corlinha, cor_letra_linha: cor_letra_linha,
        data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
        , descricao: response[x][11]
        , investimentos: response[x][19], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13]),
        EFICACIA_CUMPRIMENTO_OBJETIVO: response[x][22], estadolinha: response[x][13]
      });
    } else {

      this.tabelaplanos.push({
        id_PLANO_ESTRATEGICO: response[x][18],
        numero: numero,
        conclusao: 0,
        id: response[x][0], cor: cor, cor_letra: cor_letra,
        data_registo: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
        data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
        /*linha: response[x][0].id_LINHA, designacao: response[x][0].design_REFERENCIA, referencia: response[x][0].referencia, departamento_origem: response[x][2],*/
        descricao: response[x][6],
        objetivo: response[x][20],
        ambito: response[x][15]/*this.getAmbito(response[x][3])*/, origem: response[x][4],
        estado: this.getestado(response[x][7]), //cor: response[x][1],
        utilizador: response[x][5],
        filho: [{
          conclusao: response[x][21],
          numero: numero + '.1',
          corlinha: corlinha, cor_letra_linha: cor_letra_linha,
          data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
          , descricao: response[x][11], investimentos: response[x][19], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
          , EFICACIA_CUMPRIMENTO_OBJETIVO: response[x][22], estadolinha: response[x][13]
        }]
      });

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

  alteracorlinha(event) {
    if (event.value != null && event.value.id != null) {
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
    if (valor == "E") {
      return "Em Elaboração"
    } if (valor == "EX") {
      return "Em Execução"
    } if (valor == "EL") {
      return "Em Alteração"
    } if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/ Realizado"
    } else if (valor == "C") {
      return "Controlado/ Verificado"
    } else if (valor == "V") {
      return "Aprovado/ Finalizado"
    } else if (valor == "R") {
      return "Rejeitado"
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


  gravar(estado = 'E', observacoes = null) {
    if (this.estado == 'EX') {
      this.motivoAlteracao = null;
      this.displayMotivoAlteracao = true;
    } else {
      this.gravar2(estado, observacoes);
    }
  }

  gravar2(estado = 'E', observacoes = null) {
    var plano = new PE_MOV_CAB;
    if (!this.novo) plano = this.plano_estrategico;



    plano.DATA_MODIF = new Date();
    plano.UTZ_MODIF = this.user;




    plano.DEPARTAMENTO = this.departamento;
    plano.ANO_PLANO = this.ano;
    plano.TIPO = this.tipo;
    plano.RESPONSAVEL = this.user;

    plano.ESTADO = (estado == 'EX') ? estado : this.estado;
    if (this.novo) {
      plano.ESTADO = "E";
      plano.DATA_CRIA = this.data_agora;
      plano.UTZ_CRIA = this.user;
      plano.ATIVO = true;
      this.PEMOVCABService.create(plano).subscribe(
        response => {
          this.gravarTabelaFicheiros(response.ID);
          this.gravartabela_historico(response.ID, "Criou Plano", observacoes);
          this.associarPlanos(response.ID);
        }, error => { console.log(error); });
    } else {
      this.PEMOVCABService.update(plano).then(
        response => {
          this.gravarTabelaFicheiros(plano.ID);
          if (estado == 'EX' && estado != this.estado) {
            this.gravartabela_historico(plano.ID, "Atualizou Estado para Em Execução", observacoes);
          } else {
            this.gravartabela_historico(plano.ID, "Atualizou Plano", observacoes);
          }

          this.associarPlanos(plano.ID);
        }, error => { console.log(error); });
    }

  }

  associarPlanos(id_plano) {
    for (var x in this.tabelaplanos) {
      if (this.tabelaplanos[x].id_PLANO_ESTRATEGICO == null) this.associarPlanos2(id_plano, this.tabelaplanos[x].id);
    }
  }

  associarPlanos2(id_plano, id) {
    this.PAMOVCABService.getPA_MOV_CABAssociarPlanoEstrategico(id_plano, id).subscribe(
      response => {

      }, error => { console.log(error); });
  }

  gravarPLANOACOES(estado = 'E', cria_tarefas = false) {
    estado = 'P';
    cria_tarefas = true;
    var plano = new PA_MOV_CAB;

    plano.id_LINHA = (this.id_LINHA == null) ? null : this.id_LINHA.id;


    plano.data_MODIF = new Date();
    plano.utz_MODIF = this.user;

    plano.descricao = this.descricao;

    plano.unidade = this.unidade;


    plano.departamento_ORIGEM = this.departamento_ORIGEM;

    plano.data_OBJETIVO = this.data_OBJETIVO;
    plano.ambito = this.ambito;
    plano.origem = this.origem;
    plano.objetivo = this.objetivo;
    plano.id_PLANO_ESTRATEGICO = this.id_PLANO;

    plano.estado = (estado == 'P') ? estado : this.estado;
    /* if (this.novo) {*/
    plano.estado = "E";
    plano.data_CRIA = this.data_agora;
    plano.utz_CRIA = this.utilizador;
    plano.ativo = true;
    this.PAMOVCABService.create(plano).subscribe(
      response => {
        this.gravalinhasPLANOACOES(response.id_PLANO_CAB, response.estado, cria_tarefas);
      }, error => { console.log(error); });
    /*} else {
      this.PAMOVCABService.update(plano).then(
        response => {
          this.gravalinhasPLANOACOES(plano.id_PLANO_CAB, plano.estado, cria_tarefas);
        }, error => { console.log(error); });
    }*/



  }


  gravalinhasPLANOACOES(id, estado, cria_tarefas) {
    for (var x in this.tabelaaccoes) {
      var accoes = new PA_MOV_LINHA;
      var atualizou_datas = false;
      if (this.tabelaaccoes[x].id_PLANO_LINHA != null) {
        accoes = this.tabelaaccoes[x].dados;
        /*if (this.formatDate(accoes.data_ACCAO) != this.formatDate(this.tabelaaccoes[x].data_ACCAO) || accoes.hora_ACCAO != ((this.tabelaaccoes[x].hora_ACCAO == null) ? null : (this.tabelaaccoes[x].hora_ACCAO + ":00").slice(0, 8))) {
          atualizou_datas = true;
        }*/
      }

      accoes.id_PLANO_CAB = id;


      var id_resp = this.tabelaaccoes[x].responsavel;
      /* var tipo = "";
       if (this.tabelaaccoes[x].responsavel.charAt(0) == 'u' || this.tabelaaccoes[x].responsavel.charAt(0) == 's') {
         tipo = this.tabelaaccoes[x].responsavel.charAt(0);
         id_resp = this.tabelaaccoes[x].responsavel.substr(1);
       }*/


      accoes.id_PLANO_LINHA = this.tabelaaccoes[x].id_PLANO_LINHA;
      accoes.departamento = this.tabelaaccoes[x].id_departamento;
      accoes.descricao = this.tabelaaccoes[x].observacao;
      accoes.data_ACCAO = this.tabelaaccoes[x].data_ACCAO;
      accoes.hora_ACCAO = (this.tabelaaccoes[x].hora_ACCAO == null) ? null : (this.tabelaaccoes[x].hora_ACCAO + ":00").slice(0, 8);
      accoes.id_ACCAO = this.tabelaaccoes[x].id_ACCAO;
      accoes.fastresponse = this.tabelaaccoes[x].fastresponse;
      accoes.prioridade = this.tabelaaccoes[x].prioridade;
      accoes.unidade = this.tabelaaccoes[x].unidade;
      accoes.tipo_ACAO = this.tabelaaccoes[x].tipo_ACAO;
      accoes.item = this.tabelaaccoes[x].item;
      accoes.referencia = this.tabelaaccoes[x].referencia;
      accoes.design_REFERENCIA = this.tabelaaccoes[x].design_REFERENCIA;
      accoes.estado = (estado == 'P') ? 'P' : this.tabelaaccoes[x].estado;
      accoes.causa = this.tabelaaccoes[x].causa;

      accoes.responsavel = id_resp;
      var novo = false;
      if (accoes.id_PLANO_LINHA == null) novo = true;
      var email_p = "";

      if (novo && estado != 'E') {
        accoes.estado = 'P';
      } else if (estado == 'P' && this.tabelaaccoes[x].estado != "V" && this.tabelaaccoes[x].estado != "C" && this.tabelaaccoes[x].estado != "D") {
        accoes.estado = 'P';
      } else {
        accoes.estado = this.tabelaaccoes[x].estado;
      }

      var utz = this.drop_utilizadores.find(item => item.value == id_resp);
      if (utz) email_p = utz.email;


      var referencia = ((this.tabelaaccoes[x].referencia == null) ? '' : this.tabelaaccoes[x].referencia) + ' - ' + ((this.tabelaaccoes[x].design_REFERENCIA == null) ? '' : this.tabelaaccoes[x].design_REFERENCIA);

      if (accoes.id_PLANO_CAB != null && accoes.responsavel != null /*&& accoes.departamento != null*/) {
        this.savelinhas(accoes, novo, this.tabelaaccoes[x].descricao, accoes.descricao, email_p, id, estado, cria_tarefas, parseInt(x) + 1, this.tabelaaccoes.length, atualizou_datas, referencia);
      } else {
        if (parseInt(x) + 1 == this.tabelaaccoes.length) {

          this.PAMOVLINHAService.getPA_MOV_LINHAAtualizaESTADOS(id).subscribe(
            response => {
              this.displayAddPlano = false;
              this.carregarplanos('ID_PLANO_CAB', id);
            }, error => { console.log(error); });
        }
      }
    }


    this.simular(this.inputnotifi);
    this.displayAddPlano = false;


  }


  gravarTabelaFicheiros(id) {
    if (this.novo && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new PE_MOV_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_PLANO_ESTRATEGICO = id;
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

      }
    } else {
      if (this.novo) {
        this.router.navigate(['/' + this.caminho + '/editar'], { queryParams: { id: id } });
        this.simular(this.inputnotifi);
      } else {
        var back;
        var sub2 = this.route
          .queryParams
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            back = params['redirect'] || 0;
          });
        this.inicia(this.id_PLANO, true)
        if (back != 0) {
          this.router.navigate(['/' + this.caminho + '/view'], { queryParams: { id: id, redirect: back } });
        } else {
          this.router.navigate(['/' + this.caminho + '/view'], { queryParams: { id: id } });
        }
        this.simular(this.inputgravou);
      }
    }

  }

  savelinhas(accoes, novo, nome_accao, descricao, email_p, id, estado, cria_tarefas, count, total, atualizou_datas, referencia) {
    this.PAMOVLINHAService.update(accoes).subscribe(
      response => {
        if (atualizou_datas) {
          this.enviarEventoaltera_data("Ao Alterar Data Objetivo Ação", email_p, id, accoes.data_ACCAO, accoes.hora_ACCAO, nome_accao, descricao);
          var tarefa = new GT_MOV_TAREFAS;
          tarefa.id_MODULO = 13;
          tarefa.sub_MODULO = "PA";
          tarefa.id_CAMPO = response.id_PLANO_LINHA;
          tarefa.utz_CRIA = this.user;
          tarefa.data_ULT_MODIF = new Date();
          tarefa.utz_ULT_MODIF = this.user;
          tarefa.data_FIM = new Date(this.formatDate(response.data_ACCAO) + ' ' + response.hora_ACCAO);
          this.atualizaTarefa(tarefa);
        }
        if (count == total) {
          this.PAMOVLINHAService.getPA_MOV_LINHAAtualizaESTADOS(id).subscribe(
            response => {
              this.displayAddPlano = false;
              this.carregarplanos('ID_PLANO_CAB', id);
            }, error => {
              console.log(error); this.displayAddPlano = false;
              this.carregarplanos('ID_PLANO_CAB', id);
            });

        }


        if ((novo && estado != 'E') || cria_tarefas) {
          var tarefa = new GT_MOV_TAREFAS;
          tarefa.id_MODULO = 13;
          tarefa.id_CAMPO = response.id_PLANO_LINHA;
          tarefa.data_FIM = new Date(this.formatDate(response.data_ACCAO) + ' ' + response.hora_ACCAO);
          tarefa.data_INICIO = new Date(this.formatDate(response.data_ACCAO) + ' ' + response.hora_ACCAO);
          tarefa.data_CRIA = new Date();
          tarefa.utz_CRIA = this.user;
          tarefa.data_ULT_MODIF = new Date();
          tarefa.utz_ULT_MODIF = this.user;
          tarefa.estado = 'P';
          tarefa.inativo = false;
          tarefa.utz_ID = accoes.responsavel;
          tarefa.utz_TIPO = 'u';
          tarefa.id_ACCAO = accoes.id_ACCAO;
          tarefa.sub_MODULO = "PA";
          tarefa.prioridade = accoes.prioridade;
          tarefa.observacoes = descricao;

          //this.criarTarefa(tarefa, nome_accao, descricao, email_p, id, this.referencia + ' - ' + this.design_REFERENCIA);
          //this.criarTarefa(tarefa, nome_accao, descricao, email_p, id, referencia);
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
        if (this.tabelaplanos.length > 0) {
          this.displayApagar = true;
        } else {
          this.anular();
        }

      }
    });
  }


  removerassociacao() {
    this.anular();
    for (var x in this.tabelaplanos) {
      this.PAMOVCABService.getPA_MOV_CABRemoverPlanoEstrategico(this.tabelaplanos[x].id).subscribe(
        res => {
        },
        error => { console.log(error); })
    }
  }


  anulardependecias() {
    this.anular();
    for (var x in this.tabelaplanos) {

      this.PAMOVCABService.getById(this.tabelaplanos[x].id).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            var plano = new PA_MOV_CAB;
            if (!this.novo) plano = response[0][0];;
            plano.ativo = false;
            plano.data_ANULA = new Date();
            plano.utz_ANULA = this.user;
            plano.estado = 'A';

            this.anulardependecias2(plano, plano.id_PLANO_CAB);

          }
        }, error => { console.log(error); });


    }
  }

  anulardependecias2(plano, id) {
    this.PAMOVCABService.update(plano).then(
      res => {
        this.estadosaccoes(id);
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  anular() {
    var plano = new PE_MOV_CAB;

    if (!this.novo) plano = this.plano_estrategico;
    plano.ATIVO = false;
    plano.DATA_ANULA = new Date();
    plano.UTZ_ANULA = this.user;
    plano.ESTADO = 'A';

    this.PEMOVCABService.update(plano).then(
      res => {
        //this.estadosaccoes(id);
        this.gravartabela_historico(this.id_PLANO, "Apagou Plano", null);
        this.simular(this.inputapagar)

        this.router.navigate([this.caminho]);
        this.displayApagar = false;
      },
      error => { console.log(error); this.simular(this.inputerro); this.displayApagar = false; });
  }

  estadosaccoes(id) {
    this.PAMOVCABService.updatePA_MOV_CAB_EVENTOS(id, this.user).subscribe(
      res => {

      },
      error => { console.log(error); this.simular(this.inputerro); });
  }


  adicionar_linha() {

    this.tabelaaccoes.push({
      id_TAREFA: null,
      id_PLANO_LINHA: null, id_ACCAO: null, responsavel: null, tipo_RESPONSAVEL: null, data_ACCAO: null, hora_ACCAO: "00:00:00", id_AMOSTRA: null, descricao: null
      , departamento: null, observacao: "", id_departamento: null, fastresponse: false, encaminhado: '', prioridade: 3, estado: '', tipo_ACAO: null, item: null, unidade: this.unidade
      , filteredreferencias: [], causa: null
    });
    this.tabelaaccoes = this.tabelaaccoes.slice();
  }


  apagar_linha(index) {
    var tab = this.tabelaaccoes[index];
    if (tab.id_PLANO_LINHA == null) {
      this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));
    } else {
      this.PAMOVLINHAService.delete(tab.id_PLANO_LINHA).then(
        res => {
          this.atualizaestadoTarefa(tab.id_PLANO_LINHA, 'A');
          this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  nomeACCAO(event) {
    var id = event.value;
    var data = this.drop_accoes.find(item => item.value == id);
    var nome = null;

    if (data && id != null) {
      nome = data.label;
    }
    return nome;
  }

  nomeDEPARTAMENTO(event) {
    var id = event.value;
    var data = this.drop_departamentos.find(item => item.value == id);
    var nome = "---";
    if (data) {
      nome = data.label;
    }
    return nome;
  }

  //devolve nome responsavel
  getResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores.find(item => item.value == id);

    var nome = null;
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  /* ADICIONAR ACÇÕES*/
  //abre popup para adicionar acções
  showDialogToAdd(index) {
    //this.novo = true;
    this.displayAddPlano = false;
    this.resetclass();
    this.id_selected = 0;
    this.descricaoeng = "";
    this.descricaopt = "";
    this.descricaofr = "";
    this.displayAddAccao = true;
    this.index_linha = index;
  }

  onHide() {
    if (this.displayAddPlano_show) {
      this.displayAddPlano = true;
    }
  }

  gravardados() {
    this.resetclass();
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "PA";
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    ACCOES_RECLAMACAO.utz_CRIA = this.user;
    ACCOES_RECLAMACAO.data_CRIA = new Date();
    this.RCDICACCOESRECLAMACAOService.verificaseExiste(ACCOES_RECLAMACAO).subscribe(res => {
      //console.log(res)
      var count = Object.keys(res).length;
      if (count > 0) {
        this.num_existe = true;
        this.class_numexiste = "num_existe";
      } else {
        this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
          this.carregaaccoes(0, false, false);
          this.tabelaaccoes[this.index_linha].id_ACCAO = response.id;
          this.tabelaaccoes[this.index_linha].descricao = response.descricao_PT;
          this.displayAddAccao = false;
          this.simular(this.inputgravou);
        },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  resetclass() {
    this.num_existe = false;
    this.class_numexiste = "";
  }

  criarTarefa(tarefa, nome_accao, descricao, email_p, id, referencia) {

    this.GTMOVTAREFASService.create(tarefa).subscribe(response => {

      var logs = new GT_LOGS;
      logs.id_TAREFA = response.id_TAREFA;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.descricao = "Adicionada nova Tarefa";
      this.criaLogs(logs);
      var email_para = email_p;
      this.enviarEvento(response.data_INICIO, response.id_TAREFA, "Ao Criar Tarefa", email_para, referencia, id
        , this.data_CRIA, nome_accao, descricao);

    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  atualizaTarefa(tarefa) {

    this.GTMOVTAREFASService.atualizaTAREFA(tarefa).subscribe(response => {


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

  enviarEvento(data_tarefa, numero_tarefa, MOMENTO, email_para, referencia, numero_plano, data_lancamento, accao, observacao) {


    var dados = "{link::" + webUrl.host + '/#/tarefas/view?id=' + numero_tarefa + "\n/numero_plano::"
      + numero_plano + "\n/data_lancamento::" + this.formatDate(data_lancamento) + "" + "\n/observacao::" + observacao
      + "\n/referencia::" + referencia + "" + "\n/numero_tarefa::" + numero_tarefa + "\n/accao::"
      + accao + "\n/data_tarefa::" + this.formatDate(data_tarefa) + " " + new Date(data_tarefa).toLocaleTimeString().slice(0, 5) + "}";


    var data = [{ MODULO: 13, MOMENTO: MOMENTO, PAGINA: "Planos de Ação", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }


  enviarEventoaltera_data(MOMENTO, email_para, numero_plano, data_objetivo, hora_objetivo, accao, observacao) {

    var dados = "{link::" + webUrl.host + "/#/" + this.caminho + "/view?id=" + numero_plano + "\n/numero_plano::"
      + numero_plano + "\n/data_objetivo::" + this.formatDate(data_objetivo) + "" + "\n/observacao::" + observacao
      + "\n/accao::"
      + accao + "\n/hora_objetivo::" + hora_objetivo.slice(0, 5) + ' ' + " }";


    var data = [{ MODULO: 13, MOMENTO: MOMENTO, PAGINA: "Planos de Ação", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

  atualizaestadoTarefa(id, estado) {

    this.GTMOVTAREFASService.getbyids(id, 13, "PA").subscribe(response => {

      var count = Object.keys(response).length;
      if (count > 0) {
        var tarefa = new GT_MOV_TAREFAS;
        tarefa = response[0]

        var data_logs = [];


        if (tarefa.estado != estado) {
          data_logs.push({ descricao: "Alterado Estado de " + this.geEstadoTarefa(tarefa.estado) + " para " + this.geEstadoTarefa(estado) })
        }

        tarefa.estado = estado;
        if (estado == "C") {
          tarefa.utz_CONCLUSAO = this.user;
          tarefa.data_CONCLUSAO = new Date();
        } else if (estado == "A") {
          tarefa.utz_ANULACAO = this.user;
          tarefa.data_ANULACAO = new Date();
        } else if (estado == "F") {
          tarefa.utz_VALIDA = this.user;
          tarefa.data_VALIDA = new Date();
        } else if (estado == "V") {
          tarefa.utz_CONTROLA = this.user;
          tarefa.data_CONTROLA = new Date();
        }
        if (this.displayJustificacao) tarefa.justificacao_ALTERACAO_ESTADO = this.justificacao_ALTERACAO_ESTADO;

        this.GTMOVTAREFASService.update(tarefa).then(response => {
          for (var x in data_logs) {
            var logs = new GT_LOGS;
            logs.id_TAREFA = id;
            logs.utz_CRIA = this.user;
            logs.data_CRIA = new Date();
            logs.descricao = data_logs[x].descricao;
            this.criaLogs(logs);
          }
          this.displayJustificacao = false;

        }, error => {
          console.log(error);

        });
      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
      this.displayJustificacao = false;
    });
  }


  geEstadoTarefa(estado) {
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
      this.router.navigate([this.caminho]);
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

  novoplano() {
    this.router.navigate([this.caminho + '/novo']);
  }

  controlar() {
    if (this.linhasSelecionadas != null && this.linhasSelecionadas.id_PLANO_LINHA != null) {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Alterar o estado da linha para Controlado/Verificado?',
        header: 'Confirmação',
        icon: 'fa fa-check',
        accept: () => {
          if (this.linhasSelecionadas.estado != 'P') {
            this.linhasSelecionadas.estado = 'C';
            this.linhasSelecionadas.estado_texto = this.getestado('C');
            this.atualizarlinhasPLANOSACAO(this.linhasSelecionadas, 'C');

          } else {
            this.estado_justificacao = 'C';
            this.justificacao_ALTERACAO_ESTADO = null;
            this.displayJustificacao = true;
          }
        }
      });

    } else if (this.linhasSelecionadas == null) {
      this.mensagem_verifica = "É necessário seleccionar uma linha!";
      this.displayverificar = true
    }
  }


  aprovar() {

    if (this.linhasSelecionadas != null && this.linhasSelecionadas.id_PLANO_LINHA != null) {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Alterar o estado da linha para Aprovado/Fechado?',
        header: 'Confirmação',
        icon: 'fa fa-check',
        accept: () => {
          if (this.linhasSelecionadas.estado != 'P') {
            this.linhasSelecionadas.estado = 'V';
            this.linhasSelecionadas.estado_texto = this.getestado('V');
            this.atualizarlinhasPLANOSACAO(this.linhasSelecionadas, 'V');

          } else {
            this.estado_justificacao = 'V';
            this.justificacao_ALTERACAO_ESTADO = null;
            this.displayJustificacao = true;
          }
        }
      });

    } else if (this.linhasSelecionadas == null) {
      this.mensagem_verifica = "É necessário seleccionar uma linha!";
      this.displayverificar = true
    }
  }

  validar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Validar?',
      header: 'Confirmação',
      icon: 'fa fa-check',
      accept: () => {
        /*this.motivoAlteracao = null;
        this.displayMotivoAlteracao = true;*/
        this.gravar('EX');
      }
    });

  }


  cancelarPlano() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Cancelar?',
      header: 'Confirmação',
      icon: 'fa fa-check',
      accept: () => {

        var plano = new PE_MOV_CAB;

        if (!this.novo) plano = this.plano_estrategico;

        plano.DATA_MODIF = new Date();
        plano.UTZ_MODIF = this.user;
        plano.ESTADO = 'EL';

        this.PEMOVCABService.update(plano).then(
          res => {
            //this.estadosaccoes(id);
            this.gravartabela_historico(this.id_PLANO, "Cancelou Plano e Atualizou Estado para Em Alteração", null);
            this.simular(this.inputgravou)
            this.inicia(plano.ID, false);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }

    });
  }

  atualizaestadoPLano() {
    this.displayMotivoAlteracao = false;
    this.gravar2(this.estado, this.motivoAlteracao);
  }

  cancelar() {
    if (this.linhasSelecionadas != null && this.linhasSelecionadas.id_PLANO_LINHA != null) {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Alterar o estado da linha para Cancelado?',
        header: 'Confirmação',
        icon: 'fa fa-check',
        accept: () => {
          if (this.linhasSelecionadas.estado != 'P') {
            this.linhasSelecionadas.estado = 'D';
            this.linhasSelecionadas.estado_texto = this.getestado('D');
            this.atualizarlinhasPLANOSACAO(this.linhasSelecionadas, 'D');
          } else {
            this.estado_justificacao = 'D';
            this.justificacao_ALTERACAO_ESTADO = null;
            this.displayJustificacao = true;
          }
        }
      });

    } else if (this.linhasSelecionadas == null) {
      this.mensagem_verifica = "É necessário seleccionar uma linha!";
      this.displayverificar = true
    }
  }


  lancarPlano() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Lançar o Plano?',
      header: 'Confirmação',
      icon: 'fa fa-check',
      accept: () => {
        this.gravarPLANOACOES('P', true);
      }
    });
  }

  atualizarlinhasPLANOSACAO(tabelaaccoes, estado) {

    var accoes = new PA_MOV_LINHA;
    accoes = tabelaaccoes.dados;
    var id_resp = tabelaaccoes.responsavel;
    accoes.id_PLANO_CAB = tabelaaccoes.id_PLANO_CAB;
    accoes.id_PLANO_LINHA = tabelaaccoes.id_PLANO_LINHA;
    accoes.departamento = tabelaaccoes.id_departamento;
    accoes.descricao = tabelaaccoes.observacao;
    accoes.data_ACCAO = tabelaaccoes.data_ACCAO;
    accoes.hora_ACCAO = (tabelaaccoes.hora_ACCAO == null) ? null : (tabelaaccoes.hora_ACCAO + ":00").slice(0, 8);;
    accoes.id_ACCAO = tabelaaccoes.id_ACCAO;
    accoes.fastresponse = tabelaaccoes.fastresponse;
    accoes.prioridade = tabelaaccoes.prioridade;
    accoes.tipo_ACAO = tabelaaccoes.tipo_ACAO;
    accoes.design_REFERENCIA = tabelaaccoes.design_REFERENCIA;
    accoes.referencia = tabelaaccoes.referencia;
    accoes.item = tabelaaccoes.item;
    accoes.estado = estado;
    accoes.causa = tabelaaccoes.causa;
    accoes.investimentos = tabelaaccoes.investimentos;
    accoes.responsavel = id_resp;


    if (estado == 'C') {
      accoes.data_CONTROLADO = new Date();
      accoes.utz_CONTROLADO = this.user;
    } else if (estado == 'V') {
      accoes.data_APROVADO = new Date();
      accoes.utz_APROVADO = this.user;
    } else if (estado == 'D') {
      accoes.data_CANCELADO = new Date();
      accoes.utz_CANCELADO = this.user;
    }

    if (estado == 'C') {
      this.btCancelar = true;
      this.btAprovar = true;
      this.btControlar = false;
    } else if (estado == 'D') {
      this.btAprovar = false;
      this.btControlar = false;
      this.btCancelar = false;
    } else if (estado == 'V') {
      this.btAprovar = false;
      this.btControlar = true;
      this.btCancelar = true;
    }

    this.PAMOVLINHAService.update(accoes).subscribe(
      response => {
        this.PAMOVLINHAService.getPA_MOV_LINHAAtualizaESTADOS(accoes.id_PLANO_CAB).subscribe(
          response => {

            this.inicia(tabelaaccoes.id_PLANO_CAB, true);
          }, error => { console.log(error); this.inicia(tabelaaccoes.id_PLANO_CAB, true); });
        if (estado == 'D') {
          this.atualizaestadoTarefa(response.id_PLANO_LINHA, 'A');
        } else if (estado == 'V') {
          this.atualizaestadoTarefa(response.id_PLANO_LINHA, 'F');
        } else if (estado == 'C') {
          this.atualizaestadoTarefa(response.id_PLANO_LINHA, 'V');
        }


      }, error => { console.log(error); });

  }

  onRowSelect(event) {
    if (!this.modoedicao || this.estado == "E") {
      this.linhasSelecionadas = null;
    } else {
      if (event.data.estado == 'C') {
        this.btCancelar = true;
        this.btAprovar = true;
        this.btControlar = false;
      } else if (event.data.estado == 'D') {
        this.btAprovar = false;
        this.btControlar = false;
        this.btCancelar = false;
      } else if (event.data.estado == 'V') {
        this.btAprovar = false;
        this.btControlar = true;
        this.btCancelar = true;
      } else {
        this.btAprovar = true;
        this.btControlar = true;
        this.btCancelar = true;
      }
    }
  }


  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.PEMOVFICHEIROSService.getbyidplano(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate(response[x][0].data_CRIA) + " " + new Date(response[x][0].data_CRIA).toLocaleTimeString();

            id2 = response[x][0].id;


            if (response[x][0].id_FICHEIRO != null) id2 = "f110" + response[x][0].id_FICHEIRO;
            this.uploadedFiles.push({
              data_CRIA: data_at, ficheiro: response[x][0].ficheiro_1 + response[x][0].ficheiro_2,
              data: response[x][0], utilizador: response[x][1].nome_UTILIZADOR,
              datacria: datacria, responsavel: response[x][2],
              id: id2, name: response[x][0].nome, id_FICHEIRO: response[x][0].id_FICHEIRO,
              src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype, size: response[x][0].tamanho, descricao: response[x][0].descricao
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

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

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      /*this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
        (res) => { });*/
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.PEMOVFICHEIROSService.delete(tab.id).then(
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
      var nome = this.formatDate2() + x;

      this.filetoBASE64(file, nome, event, type, x)



      //  this.fileupoad(file, nome, event, type, x, ficheiro);
      x++;
    }

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
      var ficheiros = new PE_MOV_FICHEIROS;
      ficheiros.data_CRIA = data;
      ficheiros.utz_CRIA = this.user;
      ficheiros.id_PLANO_ESTRATEGICO = this.id_PLANO;
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
        responsavel: null, utilizador: this.user_nome, datacria: this.formatDate(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
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
    this.PEMOVFICHEIROSService.update(ficheiros).subscribe(
      res => {
        if (count == total && this.novo) {
          this.router.navigate(['/' + this.caminho + '/editar'], { queryParams: { id: id } });
          this.simular(this.inputnotifi);
        } else if (!this.novo) {
          this.uploadedFiles.push({
            data: res,
            data_CRIA: ficheiros.data_CRIA, responsavel: null, ficheiro: ficheiros.ficheiro_1 + ficheiros.ficheiro_2,
            id_TAREFA: null, utilizador: this.user_nome, datacria: this.formatDate(ficheiros.data_CRIA) + " " + new Date(ficheiros.data_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.id, name: ficheiros.nome, datatype: ficheiros.datatype, src: ficheiros.caminho, type: ficheiros.tipo, size: ficheiros.tamanho, descricao: ficheiros.descricao
          });
          this.uploadedFiles = this.uploadedFiles.slice();
        }
      },
      error => { console.log(error); });
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


  IrPara(id) {
    this.router.navigateByUrl('tarefas/view?listar=true&id=' + id + "&redirect=" + this.caminho + "/viewkvk\id=" + this.id_PLANO);
  }

  imprimir(formato, filenametransfer) {

    var filename = new Date().toLocaleString().replace(/\D/g, '');
    //var filenametransfer = "planos_de_acao";

    var data;
    var dados = [];

    //console.log(JSON.stringify(dados))

    data = [{ dados: JSON.stringify(dados) }];

    this.RelatoriosService.downloadPDF(formato, filename, this.id_PLANO, filenametransfer, "planos_de_acao").subscribe(
      (res) => {
        FileSaver.saveAs(res, "PLANO DE AÇÕES - PDCA DOURECA");
        /*this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);*/
      }
    );
  }

  gravartabela_historico(id, alteracoes, observacoes) {

    var tabela = new PE_MOV_CAB_HISTORICO;
    tabela.ID_PLANO_ESTRATEGICO = id;
    tabela.DESCRICAO = alteracoes;
    tabela.OBSERVACOES = observacoes;
    tabela.DATA_CRIA = new Date();
    tabela.UTZ_CRIA = this.user;
    this.gravartabela_historico2(tabela);

  }

  gravartabela_historico2(tabela) {
    this.PEMOVCABHISTORICOService.update(tabela).subscribe(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  associar_plano() {
    this.carregarlista(this.tipo);
  }

  criar_plano() {
    this.tabelaaccoes = [];
    this.id_LINHA = null;
    this.unidade = null;
    this.descricao = null;

    this.estado = 'E';
    this.estado_texto = this.getestado('E');
    this.utilizador = null;
    this.data_CRIA = this.formatDate(new Date());
    this.hora_CRIA = new Date(new Date()).toLocaleTimeString().slice(0, 5);

    this.id_LINHA = null
    this.cor_linha = ""; ""
    this.departamento_ORIGEM = null;

    this.data_OBJETIVO = null;
    this.ambito = this.ambito_atual;
    this.origem = null;
    this.objetivo = null;
    this.displayAddPlano = true;
    this.displayAddPlano_show = true;
  }

  onHidePlano() {
    if (!this.displayAddPlano) {
      this.displayAddPlano_show = false;
    }
  }

  carregarlista(tipo) {
    this.dados = [];
    this.lista_expand = [];
    //acoes_em_ATRASO
    var filtros = [{ FASTRESPONSE: false, EM_ATRASO: false }];
    this.PAMOVCABService.getPA_MOV_CABbyTIPO(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            if (response[x][18] == null) this.adicionar_linhas(response, x);
          }

          this.dados = this.dados.slice();
          this.displayAssociarPlano = true;
        } else {
          this.displayAssociarPlano = true;
        }
      }, error => { console.log(error); this.displayAssociarPlano = true; });

  }

  adicionar_linhas(response, x) {
    var linha = this.dados.find(item => item.id == response[x][0]);
    var cor = "";
    var corlinha = "";
    var cor_letra = "";
    var cor_letra_linha = "";
    var data = this.formatDate(new Date());

    if (response[x][2] != null) {
      if (new Date(response[x][2]).getTime() < new Date(data).getTime()) {
        cor = "red";
        cor_letra = "white";
      } else if (new Date(response[x][2]).getTime() == new Date(data).getTime()) {
        cor = "yellow";
      }
    }

    if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
      corlinha = "red";
      cor_letra_linha = "white";
    } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
      corlinha = "yellow";
    }

    if (response[x][13] != "E" && response[x][13] != "P" && response[x][13] != null) { corlinha = ""; cor_letra_linha = ""; }
    if (response[x][7] != "E" && response[x][7] != "P" && response[x][7] != null) { cor = ""; cor_letra = ""; }

    if (linha) {
      linha.filho.push({
        corlinha: corlinha, cor_letra_linha: cor_letra_linha,
        data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
        , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
      });
    } else {
      this.dados.push({
        id: response[x][0], cor: cor, cor_letra: cor_letra,
        data_registo: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
        data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
        /*linha: response[x][0].id_LINHA, designacao: response[x][0].design_REFERENCIA, referencia: response[x][0].referencia, departamento_origem: response[x][2],*/
        descricao: response[x][6],
        ambito: response[x][15]/*this.getAmbito(response[x][3])*/, origem: response[x][4],
        estado: this.getestado(response[x][7]), //cor: response[x][1],
        utilizador: response[x][5],
        filho: [{
          corlinha: corlinha, cor_letra_linha: cor_letra_linha,
          data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
          , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
        }]
      });
    }
  }

  listartudo() {
    if (this.lista_expand.length == 0) {
      this.lista_expand = this.dados;
    } else {
      this.lista_expand = [];
    }

  }



  listartudo_planos() {
    if (this.lista_expand_planos.length == 0) {
      this.lista_expand_planos = this.dados;
    } else {
      this.lista_expand_planos = [];
    }

  }
  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      if (value == 0 && fil) {
        value = "";
      }
      if (value != null) {
        value = value.toString();
      }

      this.dataTableComponent.filter(value, coluna, filtro);


    }, 250);
  }

  selectLinha(event) {
    var id = event.data.id;
    this.carregarplanos('ID_PLANO_CAB', id);
    this.displayAssociarPlano = false;
  }

  associarplano(id) {
    this.carregarplanos('ID_PLANO_CAB', id);
    this.displayAssociarPlano = false;
  }


  removerplano(index, id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar esta linha?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.removeplano(index, id);
      }
    });
  }
  removeplano(index, id) {
    var tab = this.tabelaplanos[index];
    if (tab.id_PLANO_ESTRATEGICO == null) {
      this.tabelaplanos = this.tabelaplanos.slice(0, index).concat(this.tabelaplanos.slice(index + 1));
      this.atualizanumeracao();
      this.calcucarpercentagem_conclusao();
    } else {
      this.PAMOVCABService.getPA_MOV_CABRemoverPlanoEstrategico(id).subscribe(
        res => {
          this.tabelaplanos = this.tabelaplanos.slice(0, index).concat(this.tabelaplanos.slice(index + 1));
          this.atualizanumeracao();
          this.calcucarpercentagem_conclusao();
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  atualizanumeracao() {
    this.numero = 1.1;

    for (var x in this.tabelaplanos) {
      this.tabelaplanos[x].numero = parseFloat(this.numero.toString());
      for (var y in this.tabelaplanos[x].filho) {
        this.tabelaplanos[x].filho[y].numero = parseFloat(this.numero.toString()) + '.' + (parseInt(y) + 1);
      }
      this.numero = this.numero + 0.1
    }
  }

  calcucarpercentagem_conclusao() {
    this.percentagem_conclusao;
    var conclusao = 0;
    var total = 0;
    for (var x in this.tabelaplanos) {
      var conclusao2 = 0;
      var total2 = 0;
      for (var y in this.tabelaplanos[x].filho) {
        conclusao2 += this.tabelaplanos[x].filho[y].conclusao;
        total2++;
      }

      this.tabelaplanos[x].conclusao = (total2 == 0) ? 0 : conclusao2 / total2;
      conclusao += this.tabelaplanos[x].conclusao;
      total++;
    }

    this.percentagem_conclusao = (total == 0) ? 0 : conclusao / total;
  }
}
