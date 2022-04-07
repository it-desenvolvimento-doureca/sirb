import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { UploadService } from 'app/servicos/upload.service';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';

import { Location } from '@angular/common';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { MAN_MOV_MANUTENCAO_EQUIPAMENTOS } from 'app/entidades/MAN_MOV_MANUTENCAO_EQUIPAMENTOS';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { MANMOVMANUTENCAODADOSCOMPRAService } from 'app/servicos/man-mov-manutencao-dados-compra.service';
import { MANMOVMANUTENCAODOCUMENTOSService } from 'app/servicos/man-mov-manutencao-documentos.service';
import { MAN_MOV_MANUTENCAO_DOCUMENTOS } from 'app/entidades/MAN_MOV_MANUTENCAO_DOCUMENTOS';
import { MAN_MOV_MANUTENCAO_COMPONENTES } from 'app/entidades/MAN_MOV_MANUTENCAO_COMPONENTES';
import { MAN_MOV_MANUTENCAO_PLANOS } from 'app/entidades/MAN_MOV_MANUTENCAO_PLANOS';
import { MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE } from 'app/entidades/MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE';
import { MAN_MOV_MANUTENCAO_DADOS_COMPRA } from 'app/entidades/MAN_MOV_MANUTENCAO_DADOS_COMPRA';
import { MANMOVMANUTENCAOCONTRATOSSUPORTEService } from 'app/servicos/man-mov-manutencao-contratos-suporte.service';
import { MANMOVMANUTENCAOPLANOSService } from 'app/servicos/man-mov-manutencao-planos.service';
import { MANMOVMANUTENCAOCOMPONENTESService } from 'app/servicos/man-mov-manutencao-componentes.service';
import { MANDICEQUIPASService } from 'app/servicos/man-dic-equipas.service';
import { MAN_MOV_MANUTENCAO_GRAUS_IMPORTANCIA } from 'app/entidades/MAN_MOV_MANUTENCAO_GRAUS_IMPORTANCIA';
import { MANMOVMANUTENCAOGRAUSIMPORTANCIAService } from 'app/servicos/man-mov-manutencao-graus-importancia.service';
import { MAN_MOV_MANUTENCAO_ANEXOS } from 'app/entidades/MAN_MOV_MANUTENCAO_ANEXOS';
import { MANMOVMANUTENCAOANEXOSService } from 'app/servicos/man-mov-manutencao-anexos.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { GERFORNECEDORService } from 'app/servicos/ger-fornecedor.service';
import { GERDEPARTAMENTOService } from 'app/servicos/ger-departamento.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { ABMOVMANUTENCAOCABService } from 'app/servicos/ab-mov-manutencao-cab.service';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';

@Component({
  selector: 'app-ficha-equipamento',
  templateUrl: './ficha-equipamento.component.html',
  styleUrls: ['./ficha-equipamento.component.css']
})
export class FichaEquipamentoComponent implements OnInit {

  ativobt = '1';
  ID_MANUTENCAO: number;
  NOME: string = null;
  DESCRICAO_MANUTENCAO = null;
  COD_EQUIPAMENTO_PRINCIPAL = null;
  LOCALIZACAO = null;
  GRAU_IMPORTANCIA: number = null;
  EQUIPA: number = null;
  GARANTIA: boolean = null;
  DATA_VALIDADE: Date = null;
  uploadedFiles = [];
  tabela_lista_componentes = []
  tabelaaccoes = [];
  tabelacontratossuporte = [];
  tabeladadoscompra = [];
  referencia_principal: any;
  artigos: any;
  filteredreferencias: any[];
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  acessoadicionarACCAO: any;
  apagarficheiros: any;
  modoedicao: boolean;
  data_CRIA: Date;
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
  @ViewChild('waitingDialog') waitingDialog: ElementRef;
  @ViewChild('waitingDialogclose') waitingDialogclose: ElementRef;
  id_selected: number;
  descricaoeng: string;
  descricaopt: string;
  displayAddAccao: boolean;
  index_linha: any;
  descricaofr: string;
  num_existe: boolean;
  class_numexiste: string;
  drop_accoes: any[];
  campo_x: any;
  filedescricao = [];
  filedescricaoAnexo = [];

  drop_periocidade = [{ value: '', label: 'Sel. Periocidade' }, { value: 1, label: 'Diário' }, { value: 2, label: 'Semanal' }, { value: 3, label: 'Mensal' }, { value: 4, label: 'Semestral' }, { value: 5, label: 'Timestral' }, { value: 6, label: 'Anual' }]
  equipamento_dados: MAN_MOV_MANUTENCAO_EQUIPAMENTOS;
  drop_equipas: any;
  drop_localizacoes: any[];
  tabelaGrauImportancia: any = [];
  drop_equipamentos: any[];
  uploadedFilesAnexos: any = [];
  displayFilesAnexo: boolean;
  linha_selected: any;
  tipo_selected: any;
  drop_fornecedor: any[];
  departs: any;
  count: any = 0;
  anexosshow: any;
  index_selected: any;
  campo_xAnexos: number;

  data_ULTIMA_REALIZADA: any;
  data_PROXIMA_REALIZADA: any;
  data_INICIO: any;
  hora_INICIO: any;
  tipo_FIM: any;
  ocorrencias: any;
  total_OCORRENCIAS: any;
  data_FINAL: any;
  tipo_REPETICAO: any;
  repetir: any;
  dias_SEMANA: any;

  displayperiocidade;
  index_selected_periocidade: any;
  tipo_equipa;
  TIPO_EQUIPA: string = 'E';
  UTILIZADOR: number;
  drop_utilizadores: any[];
  novo_nome: any;
  display_duplica: boolean;
  stocklocalizacoes: any[];
  mensagemtabela: string;
  displaylocalizacaostock: boolean;
  tabela_historico: any;

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
    private renderer: Renderer, private route: ActivatedRoute, private location: Location, private sanitizer: DomSanitizer,
    private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService,
    private MANMOVMANUTENCAODADOSCOMPRAService: MANMOVMANUTENCAODADOSCOMPRAService,
    private MANMOVMANUTENCAODOCUMENTOSService: MANMOVMANUTENCAODOCUMENTOSService,
    private MANMOVMANUTENCAOCONTRATOSSUPORTEService: MANMOVMANUTENCAOCONTRATOSSUPORTEService,
    private MANMOVMANUTENCAOPLANOSService: MANMOVMANUTENCAOPLANOSService,
    private MANMOVMANUTENCAOCOMPONENTESService: MANMOVMANUTENCAOCOMPONENTESService,
    private MANDICEQUIPASService: MANDICEQUIPASService, private GERFORNECEDORService: GERFORNECEDORService,
    private MANMOVMANUTENCAOANEXOSService: MANMOVMANUTENCAOANEXOSService, private MANDICPISOSService: MANDICPISOSService,
    private MANMOVMANUTENCAOGRAUSIMPORTANCIAService: MANMOVMANUTENCAOGRAUSIMPORTANCIAService,
    private GERDEPARTAMENTOService: GERDEPARTAMENTOService,
    private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService,
    private globalVar: AppGlobals, private router: Router, private UploadService: UploadService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");


    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591duplicar"));

    this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591adicionarACCAO");

    this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11591apagarficheiros");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });


    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;
        this.globalVar.setduplicar(true);
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


      } else if (urlarray[1].match("view")) {
        //this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
      }
    }

    if (!this.novo) this.inicia(id);
    this.carregaDados(id);

    /* this.uploadedFiles.push({
       data_CRIA: '2020-05-05', ficheiro: '',
       id_TAREFA: null, responsavel: null, utilizador: 'Admin', datacria: '2020-05-05', id_FICHEIRO: null,
       id: null, name: 'file.name', datatype: 'file.type', src: '', type: 'type', size: ' file.size', descricao: 'this.filedescricao[x]'
     });
 
     this.tabela_lista_componentes.push({ id: null, PROREF: 'AFSS', DESIGN: 'asdsda', quantidade: 15 });
 
     this.tabelaaccoes.push({ id: null, descricao: 'assa', id_ACCOES: 11, periociodade: 1, ultima_REALIZADA: '2020-05-05', proxima_REALIZAR: '2020-05-05', equipa: 1 });
 
     this.tabelacontratossuporte.push({ id: null, fornecedor: 'asdsdasd', contrato_suporte: true, periociodade: 1, data_INICIO: '2020-06-06', data_FIM: '2020-06-06', anexo: '' });
 
     this.tabeladadoscompra.push({ id: null, fornecedor: 'asdsdasd', anexo: '' });*/
  }


  inicia(id) {
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getbyID(id).subscribe(
      response => {


        this.ID_MANUTENCAO = response[0].ID_MANUTENCAO;
        this.NOME = response[0].NOME;
        this.DESCRICAO_MANUTENCAO = response[0].DESCRICAO_MANUTENCAO
        this.LOCALIZACAO = response[0].TIPO_LOCALIZACAO + response[0].LOCALIZACAO;
        this.COD_EQUIPAMENTO_PRINCIPAL = response[0].COD_EQUIPAMENTO_PRINCIPAL;
        this.EQUIPA = response[0].EQUIPA;
        this.GARANTIA = response[0].GARANTIA;
        this.TIPO_EQUIPA = (response[0].TIPO_EQUIPA == null) ? 'E' : response[0].TIPO_EQUIPA;
        this.UTILIZADOR = response[0].UTILIZADOR;

        this.DATA_VALIDADE = (response[0].DATA_VALIDADE != null) ? new Date(response[0].DATA_VALIDADE) : null;
        this.equipamento_dados = response[0];

        if (response[0].ATIVO == false) {
          this.globalVar.setapagar(false);
          this.globalVar.seteditar(false);
          var s = document.getElementById("editarclickhidde");
          s.click();
        }
        this.carregatabelaFiles(id);
        this.carregaTabelaGrausImportancia(id);
        this.carregaTabelaListaComponentes(id);
        this.carregaTabelaPlanos(id);
        this.carregaTabelaContratosSuporte(id);
        this.carregaTabelaDadosCompra(id);
        this.carregaHistorico(id);

      },
      error => console.log(error));

  }

  carregaTabelaGrausImportancia(id) {
    this.MANMOVMANUTENCAOGRAUSIMPORTANCIAService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.tabelaGrauImportancia.push({ id: response[x].ID, departamento: response[x].ID_DEPARTAMENTO, nivel: response[x].NIVEL, dados: response[x] });
        }
        this.tabelaGrauImportancia = this.tabelaGrauImportancia.slice();
      },
      error => console.log(error));

  }
  carregaHistorico(id) {
    this.tabela_historico = [];

    this.MANMOVMANUTENCAOCABService.getHISTORICO(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.tabela_historico.push({
              tipo_manutencao: (response[x][0] == 'C') ? 'Corretiva' : 'Preventiva',
              estado: this.estadosManutencoes(response[x][1]),
              data_inicio: (response[x][2] == null) ? null : this.formatDate(response[x][2]) + " " + new Date(response[x][2]).toLocaleTimeString(),
              data_fim: (response[x][3] == null) ? null : this.formatDate(response[x][3]) + " " + new Date(response[x][3]).toLocaleTimeString(),
              data_pedido: (response[x][4] == null) ? null : this.formatDate(response[x][4]) + " " + new Date(response[x][4]).toLocaleTimeString(),
            });
          }
        } else {

        }
        this.tabela_historico = this.tabela_historico.slice();
      },
      error => console.log(error));

  }

  estadosManutencoes(valor: any) {
    if (valor == 'P') {
      return 'Pendente';
    } else if (valor == 'E') {
      return 'Em Execução';
    } else if (valor == 'C') {
      return 'Concluído';
    } else if (valor == 'S') {
      return 'Em Pausa';
    } else if (valor == 'R') {
      return 'Suspenso';
    }
    return '';
  }

  carregaTabelaListaComponentes(id) {
    this.tabela_lista_componentes = [];
    this.mensagemtabela = "A Carregar...";
    this.MANMOVMANUTENCAOCOMPONENTESService.getbyID2(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var dados: MAN_MOV_MANUTENCAO_COMPONENTES = new MAN_MOV_MANUTENCAO_COMPONENTES;

            dados.ID = response[x][0];
            dados.REFERENCIA = response[x][21];
            dados.DESC_REFERENCIA = response[x][3];
            dados.QUANTIDADE = response[x][4];
            dados.ANEXO = response[x][6];
            this.tabela_lista_componentes.push({
              id: response[x][0], PROREF: response[x][2],
              DESIGN: response[x][3], quantidade: response[x][4], dados: dados,
              anexo: (response[x][5] == null) ? 0 : response[x][5],
              anexos: [],
              STOCK_TOTAL: response[x][6]
            });
          }
        } else {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        this.tabela_lista_componentes = this.tabela_lista_componentes.slice();
      },
      error => console.log(error));

  }

  carregaTabelaPlanos(id) {
    this.MANMOVMANUTENCAOPLANOSService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          var descricao = this.nomeACCAO({ value: response[x].ID_ACAO });
          this.tabelaaccoes.push({
            id: response[x].ID, dados: response[x], descricao: descricao, id_ACCOES: response[x].ID_ACAO, periociodade: response[x].PERIOCIDADE,
            ultima_REALIZADA: (response[x].DATA_ULTIMA_REALIZADA != null) ? new Date(response[x].DATA_ULTIMA_REALIZADA) : null,
            proxima_REALIZAR: (response[x].DATA_PROXIMA_REALIZADA != null) ? new Date(response[x].DATA_PROXIMA_REALIZADA) : null,
            equipa: response[x].ID_EQUIPA,
            tempo_ESTIMADO: (response[x].TEMPO_ESTIMADO == null) ? null : (response[x].TEMPO_ESTIMADO).slice(0, 5),
            tipo_responsavel: (response[x].TIPO_RESPONSAVEL == null) ? 'E' : response[x].TIPO_RESPONSAVEL,
            utilizador: response[x].UTILIZADOR,
            tipo_FIM: response[x].TIPO_FIM,
            ocorrencias: response[x].OCORRENCIAS,
            total_OCORRENCIAS: response[x].TOTAL_OCORRENCIAS,
            data_FINAL: response[x].DATA_FINAL,
            tipo_REPETICAO: response[x].TIPO_REPETICAO,
            repetir: response[x].REPETIR,
            dias_SEMANA: response[x].DIAS_SEMANA,
            data_ULTIMA_REALIZADA: (response[x].DATA_ULTIMA_REALIZADA != null) ? this.formatDate(response[x].DATA_ULTIMA_REALIZADA) : null,
            data_PROXIMA_REALIZADA: (response[x].DATA_PROXIMA_REALIZADA != null) ? this.formatDate(response[x].DATA_PROXIMA_REALIZADA) : null,
            data_INICIO: (response[x].DATA_INICIO != null) ? new Date(response[x].DATA_INICIO) : null,
            /*hora_INICIO: response[x].hora_INICIO*/
          });
        }
        this.tabelaaccoes = this.tabelaaccoes.slice();
      },
      error => console.log(error));

  }

  carregaTabelaContratosSuporte(id) {
    this.MANMOVMANUTENCAOCONTRATOSSUPORTEService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.tabelacontratossuporte.push({
            dados: response[x], anexos: [],
            id: response[x].ID, fornecedor: response[x].FORNECEDOR, contrato_suporte: response[x].CONTRATO_SUPORTE,
            periociodade: response[x].PERIOCIDADE,
            data_INICIO: (response[x].DATA_INICIO != null) ? new Date(response[x].DATA_INICIO) : null,
            data_FIM: (response[x].DATA_FIM != null) ? new Date(response[x].DATA_FIM) : null,
            anexo: (response[x].ANEXO == null) ? 0 : response[x].ANEXO
          });
        }

        this.tabelacontratossuporte = this.tabelacontratossuporte.slice();
      },
      error => console.log(error));

  }

  carregaTabelaDadosCompra(id) {
    this.MANMOVMANUTENCAODADOSCOMPRAService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.tabeladadoscompra.push({ anexos: [], id: response[x].ID, n_documento: response[x].N_DOCUMENTO, fornecedor: response[x].FORNECEDOR, anexo: (response[x].ANEXO == null) ? 0 : response[x].ANEXO, dados: response[x] });
        }
        this.tabeladadoscompra = this.tabeladadoscompra.slice();
      },
      error => console.log(error));

  }

  carregaDados(id) {
    this.carregaaccoes();
    this.listar_refs();
    this.listar_equipas();
    this.listar_utilizadores();
    this.listar_localizacao();
    this.listar_equipamentos(id);
    this.carregarDepartamentos();
    this.fornecedores();
  }

  listar_equipas() {
    this.drop_equipas = [];
    this.drop_equipas.push({
      value: '', label: 'Selecionar Equipa'
    })
    this.MANDICEQUIPASService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.drop_equipas.push({
            value: response[x].ID, label: response[x].NOME_EQUIPA
          });
        }
        this.drop_equipas = this.drop_equipas.slice();

      },
      error => { console.log(error); });
  }

  listar_utilizadores() {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: null });
        var grupo = [];
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, email: response[x].email, value: response[x].id_UTILIZADOR });
        }

        this.drop_utilizadores = this.drop_utilizadores.slice();

      },
      error => { console.log(error); });
  }

  carregarDepartamentos() {
    this.departs = [];
    this.GERDEPARTAMENTOService.getAll2().subscribe(
      response => {
        this.departs.push({ value: "", label: "Selecionar Departamento" });
        for (var x in response) {

          this.departs.push({ value: response[x][0].id, label: response[x][0].descricao, nome: response[x][1].nome_UTILIZADOR });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }


  listar_localizacao() {
    this.drop_localizacoes = [];
    this.drop_localizacoes.push({
      value: '', label: 'Selecionar Localização'
    })
    this.MANDICPISOSService.getALLLOCALLIZACOES().subscribe(
      response => {
        for (var x in response) {
          this.drop_localizacoes.push({
            value: response[x][2] + response[x][0], label: response[x][1]
          });
        }
        this.drop_localizacoes = this.drop_localizacoes.slice();

      },
      error => { console.log(error); });
  }

  listar_equipamentos(id) {

    this.drop_equipamentos = [];
    this.drop_equipamentos.push({ label: 'Sel. Equipamento Principal', value: "" });
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          if (id != response[x].ID_MANUTENCAO) {
            this.drop_equipamentos.push({
              value: response[x].ID_MANUTENCAO,
              label: response[x].NOME
            });
          }
        }

        this.drop_equipamentos = this.drop_equipamentos.slice();
      },
      error => console.log(error));
  }

  fornecedores() {

    this.GERFORNECEDORService.getAll_silver().subscribe(
      response => {
        this.drop_fornecedor = [];
        this.drop_fornecedor.push({ label: 'Sel. Fornecedor.', value: "" });
        for (var x in response) {
          this.drop_fornecedor.push({ label: response[x].FOUCOD + " - " + response[x].ADRNOM, value: response[x].FOUCOD });
        }
        this.drop_fornecedor = this.drop_fornecedor.slice();

      }, error => {
        console.log(error);
      });

  }

  listar_refs() {

    this.ABDICCOMPONENTEService.getReferenciasMANU().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, DESIGN: response[x].PRODES1, STOCK_TOTAL: response[x].STOCK_TOTAL
          });
        }
        this.artigos = this.artigos.slice();

      },
      error => { console.log(error); });
  }


  filterRef(event, index) {

    this.tabela_lista_componentes[index].filteredreferencias = this.pesquisa(event.query);
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

  filteronUnselect(event, index) {
    this.tabela_lista_componentes[index].DESIGN = "";
    this.tabela_lista_componentes[index].PROREF = null;
    this.tabela_lista_componentes[index].STOCK_TOTAL = "";
  }

  filterSelect(event, index) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.tabela_lista_componentes[index].PROREF = event.value;
      this.tabela_lista_componentes[index].DESIGN = tab.DESIGN;
      this.tabela_lista_componentes[index].STOCK_TOTAL = tab.STOCK_TOTAL;
    } else {
      this.tabela_lista_componentes[index].DESIGN = "";
      this.tabela_lista_componentes[index].STOCK_TOTAL = "";
      this.tabela_lista_componentes[index].PROREF = null;
    }
    this.tabela_lista_componentes = this.tabela_lista_componentes.slice();
  }





  apagar_linha(index) {
    var tab = this.tabela_lista_componentes[index];
    if (tab.id == null) {
      this.tabela_lista_componentes = this.tabela_lista_componentes.slice(0, index).concat(this.tabela_lista_componentes.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAOCOMPONENTESService.delete(tab.id).then(
        res => {

          this.tabela_lista_componentes = this.tabela_lista_componentes.slice(0, index).concat(this.tabela_lista_componentes.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }


  adicionar_linha() {
    this.tabela_lista_componentes.push({ id: null, PROREF: null, DESIGN: null, quantidade: null, STOCK_TOTAL: null, anexos: [], anexo: 0 });
    this.tabela_lista_componentes = this.tabela_lista_componentes.slice();
  }

  apagar_linha_acoes(index) {
    var tab = this.tabelaaccoes[index];
    if (tab.id == null) {
      this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAOPLANOSService.delete(tab.id).then(
        res => {

          this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  adicionar_linha_acoes() {
    this.tabelaaccoes.push({
      id: null, descricao: null, id_ACCOES: null, periociodade: null, ultima_REALIZADA: null, proxima_REALIZAR: null, equipa: null, tipo_FIM: null,
      ocorrencias: null,
      total_OCORRENCIAS: null,
      data_FINAL: null,
      tipo_REPETICAO: null,
      repetir: null,
      dias_SEMANA: null,
      data_ULTIMA_REALIZADA: null,
      data_PROXIMA_REALIZADA: null,
      data_INICIO: null,
      hora_INICIO: null, tempo_ESTIMADO: null
    });
    this.tabelaaccoes = this.tabelaaccoes.slice();
  }


  apagar_linha_contratos_suporte(index) {
    var tab = this.tabelacontratossuporte[index];
    if (tab.id == null) {
      this.tabelacontratossuporte = this.tabelacontratossuporte.slice(0, index).concat(this.tabelacontratossuporte.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAOCONTRATOSSUPORTEService.delete(tab.id).then(
        res => {

          this.tabelacontratossuporte = this.tabelacontratossuporte.slice(0, index).concat(this.tabelacontratossuporte.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  adicionar_linha_contratos_suporte() {
    this.tabelacontratossuporte.push({ anexos: [], id: null, fornecedor: null, contrato_suporte: false, periociodade: null, data_INICIO: null, data_FIM: null, anexo: 0 });
    this.tabelacontratossuporte = this.tabelacontratossuporte.slice();
  }

  apagar_linha_tabeladadoscompra(index) {
    var tab = this.tabeladadoscompra[index];
    if (tab.id == null) {
      this.tabeladadoscompra = this.tabeladadoscompra.slice(0, index).concat(this.tabeladadoscompra.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAODADOSCOMPRAService.delete(tab.id).then(
        res => {

          this.tabeladadoscompra = this.tabeladadoscompra.slice(0, index).concat(this.tabeladadoscompra.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }


  apagar_linha_tabelaGrauImportancia(index) {
    var tab = this.tabelaGrauImportancia[index];
    if (tab.id == null) {
      this.tabelaGrauImportancia = this.tabelaGrauImportancia.slice(0, index).concat(this.tabelaGrauImportancia.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAOGRAUSIMPORTANCIAService.delete(tab.id).then(
        res => {

          this.tabelaGrauImportancia = this.tabelaGrauImportancia.slice(0, index).concat(this.tabelaGrauImportancia.slice(index + 1));

        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }


  adicionar_linha_tabeladadoscompra() {
    this.tabeladadoscompra.push({ anexos: [], id: null, fornecedor: null, anexo: 0, n_documento: null });
    this.tabeladadoscompra = this.tabeladadoscompra.slice();
  }


  adicionar_linha_tabelaGrauImportancia() {
    this.tabelaGrauImportancia.push({ id: null, departamento: null, nivel: null });
    this.tabelaGrauImportancia = this.tabelaGrauImportancia.slice();
  }


  getPeriocidade(id) {
    if (id != null) var dt = this.drop_periocidade.find(item => item.value == id);

    var nome = null;
    if (dt) {
      nome = dt.label;
    }
    return nome;
  }

  showDialog(type, srcelement, nomeficheiro, datatype, ficheiro, anexos, id) {
    if (ficheiro == null) {
      if (!anexos) {

        this.MANMOVMANUTENCAODOCUMENTOSService.getbyID(id).subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              for (var x in response) {

                var ficheirores = response[x].FICHEIRO_1 + response[x].FICHEIRO_2;
                this.showDialog_open(type, srcelement, nomeficheiro, datatype, ficheirores, anexos);
              }
            } else {
              this.simular(this.inputerroficheiro);
            }

          }, error => { console.log(error); this.simular(this.inputerroficheiro); });
      } else {

        this.MANMOVMANUTENCAOANEXOSService.getbyIDANEXO(id).subscribe(
          response => {
            var count = Object.keys(response).length;
            if (count > 0) {
              for (var x in response) {
                var ficheirores = response[x].FICHEIRO_1 + response[x].FICHEIRO_2;
                this.showDialog_open(type, srcelement, nomeficheiro, datatype, ficheirores, anexos);
              }
            } else {
              this.simular(this.inputerroficheiro);
            }

          }, error => { console.log(error); this.simular(this.inputerroficheiro); });
      }
    } else {
      this.showDialog_open(type, srcelement, nomeficheiro, datatype, ficheiro, anexos);
    }
  }

  showDialog_open(type, srcelement, nomeficheiro, datatype, ficheiro, anexos) {
    var anexos = anexos;
    this.anexosshow = anexos;
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
      this.downloadTXT(nomeficheiro, srcelement, ficheiro, anexos)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      if (anexos) this.displayFilesAnexo = false;

      setTimeout(() => {
        this.display = true;
      }, 100);
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



  downloadTXT(nomeficheiro, filename, ficheiro, anexos) {
    if (ficheiro == null) {
      this.UploadService.downloadTXT(filename).subscribe(
        (res) => {
          var fileURL = URL.createObjectURL(res);
          this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          this.nomeficheiro = nomeficheiro;
          this.type = 'txt';
          if (anexos) this.displayFilesAnexo = false;
          setTimeout(() => {
            this.display = true;
          }, 100);
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
          if (anexos) this.displayFilesAnexo = false;
          setTimeout(() => {
            this.display = true;
          }, 100);
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        });
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
      x++;
    }

  }

  onUploadAnexo(event) {
    //let files: FileList = event.files;
    this.fileInputAnexos.progress = 0;
    this.campo_xAnexos = 0;
    var x = 0;
    for (let file of event.files) {

      this.fileInputAnexos.progress = ((this.campo_xAnexos + 1) / event.files.length) * 100;
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

      this.filetoBASE64Anexos(file, nome, event, type, x)
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

  filetoBASE64Anexos(file, nome, event, type, x) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (event2: Event) => {
      // you can perform an action with readed data here
      this.fileupoadANEXOS(file, nome, event, type, x, myReader.result);
    }

    myReader.readAsDataURL(file);
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

  fileupoad(file, nome, event, type, x, ficheiro) {
    var tipo = file.name.split(".");
    var data = new Date();

    if (!this.novo) {
      var ficheiros = new MAN_MOV_MANUTENCAO_DOCUMENTOS;
      ficheiros.DATA_CRIA = data;
      ficheiros.UTZ_CRIA = this.user;
      ficheiros.ID_MANUTENCAO = this.ID_MANUTENCAO;
      ficheiros.CAMINHO = nome + '.' + tipo[1];
      ficheiros.NOME = file.name;
      ficheiros.TIPO = type;
      ficheiros.DATATYPE = file.type;
      ficheiros.TAMANHO = file.size;
      ficheiros.DESCRICAO = this.filedescricao[x];
      ficheiros.FICHEIRO_1 = ficheiro.substr(ficheiro, ficheiro.length / 2);
      ficheiros.FICHEIRO_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
      ficheiros.DATA_ULT_MODIF = new Date();
      ficheiros.UTZ_ULT_MODIF = this.user;

      this.uploadedFiles.push({
        data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
        utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
        id: null, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
      });

      this.gravarFicheiros2(ficheiros, 0, 0);

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


  fileupoadANEXOS(file, nome, event, type, x, ficheiro) {
    var tipo = file.name.split(".");
    var data = new Date();

    if (this.linha_selected.id != null) {
      var ficheiros = new MAN_MOV_MANUTENCAO_ANEXOS;
      ficheiros.DATA_CRIA = data;
      ficheiros.UTZ_CRIA = this.user;
      ficheiros.ID_MANUTENCAO = this.ID_MANUTENCAO;
      ficheiros.ID_LINHA_SEPARADOR = this.linha_selected.id;
      ficheiros.CAMINHO = nome + '.' + tipo[1];
      ficheiros.NOME = file.name;
      ficheiros.TIPO = type;
      ficheiros.DATATYPE = file.type;
      ficheiros.TAMANHO = file.size;
      ficheiros.SEPARADOR = this.tipo_selected;
      ficheiros.DESCRICAO = this.filedescricaoAnexo[x];
      ficheiros.FICHEIRO_1 = ficheiro.substr(ficheiro, ficheiro.length / 2);
      ficheiros.FICHEIRO_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
      ficheiros.DATA_ULT_MODIF = new Date();
      ficheiros.UTZ_ULT_MODIF = this.user;

      this.gravarFicheirosAnexos2(ficheiros);

      this.uploadedFilesAnexos.push({
        data: null,
        data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
        utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
        id: null, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
      });

      if (this.tipo_selected == 'contrato_suporte') {
        this.tabelacontratossuporte[this.index_selected].anexo = this.uploadedFilesAnexos.length;
      } else if (this.tipo_selected == 'dados_compra') {
        this.tabeladadoscompra[this.index_selected].anexo = this.uploadedFilesAnexos.length;
      } else if (this.tipo_selected == 'componentes') {
        this.tabela_lista_componentes[this.index_selected].anexo = this.uploadedFilesAnexos.length;
      }

    } else {
      this.count++;
      var ficheiro_linha = {
        id_temp: this.count,
        data_CRIA: data, ficheiro: ficheiro,
        responsavel: null, utilizador: this.user_nome, datacria: this.formatDate(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
        id: null, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: this.filedescricaoAnexo[x]
      };

      this.uploadedFilesAnexos.push(ficheiro_linha);


      if (this.tipo_selected == 'contrato_suporte') {
        this.tabelacontratossuporte[this.index_selected].anexos.push(ficheiro_linha);
        this.tabelacontratossuporte[this.index_selected].anexos = this.tabelacontratossuporte[this.index_selected].anexos.slice();
        this.tabelacontratossuporte[this.index_selected].anexo = this.tabelacontratossuporte[this.index_selected].anexos.length;
      } else if (this.tipo_selected == 'dados_compra') {
        this.tabeladadoscompra[this.index_selected].anexos.push(ficheiro_linha);
        this.tabeladadoscompra[this.index_selected].anexos = this.tabeladadoscompra[this.index_selected].anexos.slice();
        this.tabeladadoscompra[this.index_selected].anexo = this.tabeladadoscompra[this.index_selected].anexos.length;
      } else if (this.tipo_selected == 'componentes') {
        this.tabela_lista_componentes[this.index_selected].anexos.push(ficheiro_linha);
        this.tabela_lista_componentes[this.index_selected].anexos = this.tabela_lista_componentes[this.index_selected].anexos.slice();
        this.tabela_lista_componentes[this.index_selected].anexo = this.tabela_lista_componentes[this.index_selected].anexos.length;
      }

    }

    this.uploadedFilesAnexos = this.uploadedFilesAnexos.slice();
    if (this.campo_xAnexos + 1 == event.files.length) {
      this.fileInputAnexos.files = [];
      this.filedescricaoAnexo = [];
      this.fileInputAnexos.progress = 0;
    }
    this.campo_xAnexos++;
  }

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.MANMOVMANUTENCAODOCUMENTOSService.delete(tab.id).then(
        res => {
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }

  removerficheiroAnexo(index) {
    var tab = this.uploadedFilesAnexos[index];
    if (tab.id == null) {
      this.uploadedFilesAnexos = this.uploadedFilesAnexos.slice(0, index).concat(this.uploadedFilesAnexos.slice(index + 1));
      if (this.tipo_selected == 'contrato_suporte') {
        var index2 = this.tabelacontratossuporte[this.index_selected].anexos.find(item => item.id_temp == tab.id_temp).id_temp;
        this.tabelacontratossuporte[this.index_selected].anexos.slice(0, index2).concat(this.tabelacontratossuporte[this.index_selected].anexos.slice(index2 + 1));
        this.tabelacontratossuporte[this.index_selected].anexo = this.uploadedFilesAnexos.length;

      } else if (this.tipo_selected == 'dados_compra') {
        var index3 = this.tabeladadoscompra[this.index_selected].anexos.find(item => item.id_temp == tab.id_temp).id_temp;
        this.tabeladadoscompra[this.index_selected].anexos.slice(0, index3).concat(this.tabeladadoscompra[this.index_selected].anexos.slice(index3 + 1));
        this.tabeladadoscompra[this.index_selected].anexo = this.uploadedFilesAnexos.length;

      } else if (this.tipo_selected == 'componentes') {
        var index4 = this.tabela_lista_componentes[this.index_selected].anexos.find(item => item.id_temp == tab.id_temp).id_temp;
        this.tabela_lista_componentes[this.index_selected].anexos.slice(0, index4).concat(this.tabeladadoscompra[this.index_selected].anexos.slice(index4 + 1));
        this.tabela_lista_componentes[this.index_selected].anexo = this.uploadedFilesAnexos.length;
      }

    } else {
      this.MANMOVMANUTENCAOANEXOSService.delete(tab.id).then(
        res => {
          this.uploadedFilesAnexos = this.uploadedFilesAnexos.slice(0, index).concat(this.uploadedFilesAnexos.slice(index + 1));
          if (this.tipo_selected == 'contrato_suporte') {
            this.tabelacontratossuporte[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          } else if (this.tipo_selected == 'dados_compra') {
            this.tabeladadoscompra[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          } else if (this.tipo_selected == 'componentes') {
            this.tabela_lista_componentes[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          }
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  /* ADICIONAR ACÇÕES*/
  //abre popup para adicionar acções
  showDialogToAdd(index) {
    //this.novo = true;
    this.resetclass();
    this.id_selected = 0;
    this.descricaoeng = "";
    this.descricaopt = "";
    this.descricaofr = "";
    this.displayAddAccao = true;
    this.index_linha = index;
  }

  resetclass() {
    this.num_existe = false;
    this.class_numexiste = "";
  }

  gravardados() {
    this.resetclass();
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "M";
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
          this.carregaaccoes();
          this.tabelaaccoes[this.index_linha].id_ACCOES = response.id;
          this.tabelaaccoes[this.index_linha].descricao = response.descricao_PT;
          this.displayAddAccao = false;
          this.simular(this.inputgravou);
        },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  carregaaccoes() {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("M").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();

      },
      error => { console.log(error); });
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


  //bt cancelar
  backview() {
    this.confirmationService.confirm({
      message: 'Pretende sair sem Gravar?',
      header: 'Confirmação',
      icon: 'fa fa-exclamation-triangle',
      accept: () => {
        this.location.back();

      }

    });

  }

  apagar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var equipamento = new MAN_MOV_MANUTENCAO_EQUIPAMENTOS;

        equipamento = this.equipamento_dados;

        equipamento.UTZ_ULT_MODIF = this.user;
        equipamento.DATA_ULT_MODIF = new Date();
        equipamento.ATIVO = false;


        this.MANMOVMANUTENCAOEQUIPAMENTOSService.update(equipamento).then(
          res => {
            this.router.navigate(['equipamentos_manutencao']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  gravar() {
    var equipamento = new MAN_MOV_MANUTENCAO_EQUIPAMENTOS;

    if (!this.novo) equipamento = this.equipamento_dados;

    equipamento.COD_EQUIPAMENTO_PRINCIPAL = this.COD_EQUIPAMENTO_PRINCIPAL;
    equipamento.EQUIPA = this.EQUIPA;
    equipamento.TIPO_EQUIPA = this.TIPO_EQUIPA;
    equipamento.UTILIZADOR = this.UTILIZADOR;
    equipamento.GARANTIA = this.GARANTIA;
    equipamento.DATA_VALIDADE = this.DATA_VALIDADE;
    equipamento.LOCALIZACAO = this.LOCALIZACAO.substring(1);
    equipamento.TIPO_LOCALIZACAO = this.LOCALIZACAO.charAt(0);
    equipamento.NOME = this.NOME;
    equipamento.DESCRICAO_MANUTENCAO = this.DESCRICAO_MANUTENCAO;


    equipamento.UTZ_ULT_MODIF = this.user;
    equipamento.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      equipamento.DATA_CRIA = new Date();
      equipamento.UTZ_CRIA = this.user;

      equipamento.ATIVO = true;
      this.MANMOVMANUTENCAOEQUIPAMENTOSService.create(equipamento).subscribe(
        res => {
          this.gravarTabelaGrausImportancia(res.ID_MANUTENCAO);
          this.gravarFicheiros(res.ID_MANUTENCAO);
          this.gravarTabelaListaComponentes(res.ID_MANUTENCAO);
          this.gravarTabelaPlanos(res.ID_MANUTENCAO);
          this.gravarTabelaContratosSuporte(res.ID_MANUTENCAO);
          this.gravarTabelaDadosCompra(res.ID_MANUTENCAO);


        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      equipamento.ID_MANUTENCAO = id;
      //console.log(reclamacao)
      this.MANMOVMANUTENCAOEQUIPAMENTOSService.update(equipamento).then(
        res => {
          this.gravarTabelaGrausImportancia(id);
          this.gravarTabelaListaComponentes(id);
          this.gravarTabelaPlanos(id);
          this.gravarTabelaContratosSuporte(id);
          this.gravarTabelaDadosCompra(id);
          this.simular(this.inputgravou);
          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO, redirect: back } });
          } else {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO } });
          }
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    }
  }

  duplicar() {
    this.novo_nome = null;
    this.display_duplica = true;
  }

  duplica() {
    this.display_duplica = false;
    this.simular(this.waitingDialog);
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.DUPLICA_MAN_MOV_MANUTENCAO_EQUIPAMENTOS([{ ID_MANUTENCAO: this.ID_MANUTENCAO, NOME: this.novo_nome, UTZ_CRIA: this.user }]).subscribe(
      res => {
        console.log(res)
        var back;
        var sub2 = this.route
          .queryParams
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            back = params['redirect'] || 0;
          });

        if (back != 0) {
          this.router.navigate(['equipamentos_manutencao/editar'], { queryParams: { id: res[0][0], redirect: back } });
        } else {
          this.router.navigate(['equipamentos_manutencao/editar'], { queryParams: { id: res[0][0] } });
        }
        this.simular(this.waitingDialogclose);
      },
      error => { console.log(error); this.simular(this.waitingDialogclose); this.simular(this.inputerro); });
  }
  gravarTabelaGrausImportancia(id) {
    for (var x in this.tabelaGrauImportancia) {
      var tabela = new MAN_MOV_MANUTENCAO_GRAUS_IMPORTANCIA;
      var atualizou_datas = false;
      if (this.tabelaGrauImportancia[x].id != null) {
        tabela = this.tabelaGrauImportancia[x].dados;
      }

      tabela.ID_MANUTENCAO = id;

      tabela.ID_DEPARTAMENTO = this.tabelaGrauImportancia[x].departamento;
      tabela.NIVEL = this.tabelaGrauImportancia[x].nivel;
      this.gravarTabelaGrausImportancia2(tabela);

    }
  }


  gravarTabelaGrausImportancia2(tabela) {
    this.MANMOVMANUTENCAOGRAUSIMPORTANCIAService.update(tabela).then(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravarFicheiros(id) {
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {


      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new MAN_MOV_MANUTENCAO_DOCUMENTOS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.DATA_CRIA = new Date();
          ficheiros.UTZ_CRIA = this.user;
          novo = true;
        }
        ficheiros.ID_MANUTENCAO = id;

        ficheiros.ID = this.uploadedFiles[x].id;
        ficheiros.CAMINHO = this.uploadedFiles[x].src;
        ficheiros.NOME = this.uploadedFiles[x].name;
        ficheiros.TIPO = this.uploadedFiles[x].type;
        ficheiros.DATATYPE = this.uploadedFiles[x].datatype;
        ficheiros.TAMANHO = this.uploadedFiles[x].size;
        ficheiros.DESCRICAO = this.uploadedFiles[x].descricao;
        ficheiros.FICHEIRO_1 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro, this.uploadedFiles[x].ficheiro.length / 2);
        ficheiros.FICHEIRO_2 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro.length / 2, this.uploadedFiles[x].ficheiro.length);

        ficheiros.DATA_ULT_MODIF = new Date();
        ficheiros.UTZ_ULT_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarFicheiros2(ficheiros, count, this.uploadedFiles.length);
        } else if (count == this.uploadedFiles.length) {
          this.simular(this.inputgravou);
          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO, redirect: back } });
          } else {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO } });
          }

        }

      }
    } else {
      this.simular(this.inputgravou);

      var back;
      var sub2 = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          back = params['redirect'] || 0;
        });

      if (back != 0) {
        this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: id, redirect: back } });
      } else {
        this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: id } });
      }

    }

  }

  gravarFicheiros2(ficheiros: MAN_MOV_MANUTENCAO_DOCUMENTOS, count, total) {
    this.MANMOVMANUTENCAODOCUMENTOSService.update(ficheiros).subscribe(
      res => {
        if (count == total && this.novo) {
          this.simular(this.inputgravou);
          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO, redirect: back } });
          } else {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO } });
          }
        } else if (!this.novo) {
          var data = {
            data: res,
            data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
            utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.ID, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
          };
          var index = this.uploadedFiles.findIndex(item => item.src == ficheiros.CAMINHO);
          this.uploadedFiles[index] = data;
          /* this.uploadedFiles.push({
             data: res,
             data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
             utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
             id: res.ID, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
           });*/
          this.uploadedFiles = this.uploadedFiles.slice();
        }
      },
      error => {
        console.log(error);

        if (count == total && this.novo) {
          this.simular(this.inputgravou);

          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO, redirect: back } });
          } else {
            this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: this.ID_MANUTENCAO } });
          }

        }
      });
  }


  gravarFicheirosAnexos(id, id_linha, separador, anexos: any[]) {
    if (anexos && anexos.length > 0) {


      for (var x in anexos) {
        var ficheiros = new MAN_MOV_MANUTENCAO_ANEXOS;
        var novo = false;
        if (anexos[x].id != null) {
          ficheiros = anexos[x].data;
        } else {
          ficheiros.DATA_CRIA = new Date();
          ficheiros.UTZ_CRIA = this.user;
          novo = true;
        }
        ficheiros.ID_MANUTENCAO = id;
        ficheiros.ID_LINHA_SEPARADOR = id_linha;
        ficheiros.SEPARADOR = separador;

        ficheiros.ID = anexos[x].id;
        ficheiros.CAMINHO = anexos[x].src;
        ficheiros.NOME = anexos[x].name;
        ficheiros.TIPO = anexos[x].type;
        ficheiros.DATATYPE = anexos[x].datatype;
        ficheiros.TAMANHO = anexos[x].size;
        ficheiros.DESCRICAO = anexos[x].descricao;
        ficheiros.FICHEIRO_1 = anexos[x].ficheiro.substr(anexos[x].ficheiro, anexos[x].ficheiro.length / 2);
        ficheiros.FICHEIRO_2 = anexos[x].ficheiro.substr(anexos[x].ficheiro.length / 2, anexos[x].ficheiro.length);

        ficheiros.DATA_ULT_MODIF = new Date();
        ficheiros.UTZ_ULT_MODIF = this.user;
        this.gravarFicheirosAnexos2(ficheiros);
      }
    }

  }

  gravarFicheirosAnexos2(ficheiros: MAN_MOV_MANUTENCAO_ANEXOS) {
    this.MANMOVMANUTENCAOANEXOSService.update(ficheiros).subscribe(
      res => {

        var data = {
          data: res,
          data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
          utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
          id: res.ID, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
        };
        var index = this.uploadedFilesAnexos.findIndex(item => item.src == ficheiros.CAMINHO);
        this.uploadedFilesAnexos[index] = data;

        /* this.uploadedFilesAnexos.push({
           data: res,
           data_CRIA: ficheiros.DATA_CRIA, responsavel: null, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
           utilizador: this.user_nome, datacria: this.formatDate(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
           id: res.ID, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
         });*/

        this.uploadedFilesAnexos = this.uploadedFilesAnexos.slice();
      },
      error => {
        console.log(error);
      });
  }


  gravarTabelaListaComponentes(id) {
    for (var x in this.tabela_lista_componentes) {
      var tabela = new MAN_MOV_MANUTENCAO_COMPONENTES;
      if (this.tabela_lista_componentes[x].id != null) {
        tabela = this.tabela_lista_componentes[x].dados;
      }

      tabela.ID_MANUTENCAO = id;

      tabela.DESC_REFERENCIA = this.tabela_lista_componentes[x].DESIGN;
      tabela.REFERENCIA = this.tabela_lista_componentes[x].PROREF;
      tabela.QUANTIDADE = this.tabela_lista_componentes[x].quantidade;
      tabela.ANEXO = this.tabela_lista_componentes[x].anexo;
      if (this.tabela_lista_componentes[x].PROREF != null) this.gravarTabelaListaComponentes2(tabela, x);
    }
  }

  gravarTabelaListaComponentes2(tabela, x) {
    this.MANMOVMANUTENCAOCOMPONENTESService.update(tabela).subscribe(
      res => {
        this.gravarFicheirosAnexos(res.ID_MANUTENCAO, res.ID, 'componentes', this.tabela_lista_componentes[x].anexos);
      },
      error => {
        console.log(error);
      });
  }

  gravarTabelaPlanos(id) {
    for (var x in this.tabelaaccoes) {
      var tabela = new MAN_MOV_MANUTENCAO_PLANOS;
      if (this.tabelaaccoes[x].id != null) {
        tabela = this.tabelaaccoes[x].dados;
      }

      tabela.ID_MANUTENCAO = id;
      if (this.tabelaaccoes[x].id != null) {
        tabela.DATA_PROXIMA_REALIZADA = this.tabelaaccoes[x].proxima_REALIZAR;
      } else {
        tabela.DATA_PROXIMA_REALIZADA = this.tabelaaccoes[x].data_INICIO;
      }
      tabela.DATA_ULTIMA_REALIZADA = this.tabelaaccoes[x].ultima_REALIZADA;
      tabela.ID_ACAO = this.tabelaaccoes[x].id_ACCOES;
      tabela.TEMPO_ESTIMADO = (this.tabelaaccoes[x].tempo_ESTIMADO == null) ? null : (this.tabelaaccoes[x].tempo_ESTIMADO + ':00').slice(0, 7);
      tabela.ID_EQUIPA = this.tabelaaccoes[x].equipa;
      tabela.UTILIZADOR = this.tabelaaccoes[x].utilizador;
      tabela.TIPO_RESPONSAVEL = this.tabelaaccoes[x].tipo_responsavel;
      tabela.PERIOCIDADE = this.tabelaaccoes[x].periociodade;
      tabela.TIPO_FIM = this.tabelaaccoes[x].tipo_FIM;
      tabela.OCORRENCIAS = this.tabelaaccoes[x].ocorrencias;
      tabela.TOTAL_OCORRENCIAS = this.tabelaaccoes[x].total_OCORRENCIAS;
      tabela.DATA_FINAL = this.tabelaaccoes[x].data_FINAL;
      tabela.TIPO_REPETICAO = this.tabelaaccoes[x].tipo_REPETICAO;
      tabela.REPETIR = this.tabelaaccoes[x].repetir;
      tabela.DIAS_SEMANA = this.tabelaaccoes[x].dias_SEMANA;
      tabela.DATA_INICIO = this.tabelaaccoes[x].data_INICIO;
      /*tabela.hora_INICIO = this.hora_INICIO;*/

      this.gravarTabelaPlanos2(tabela);
    }
  }

  gravarTabelaPlanos2(tabela) {
    this.MANMOVMANUTENCAOPLANOSService.update(tabela).then(
      res => {
      },
      error => {
        console.log(error);
      });
  }

  gravarTabelaContratosSuporte(id) {
    for (var x in this.tabelacontratossuporte) {
      var tabela = new MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE;
      if (this.tabelacontratossuporte[x].id != null) {
        tabela = this.tabelacontratossuporte[x].dados;
      }

      tabela.ID_MANUTENCAO = id;

      tabela.CONTRATO_SUPORTE = this.tabelacontratossuporte[x].contrato_suporte;
      tabela.DATA_FIM = this.tabelacontratossuporte[x].data_FIM;
      tabela.DATA_INICIO = this.tabelacontratossuporte[x].data_INICIO;
      tabela.FORNECEDOR = this.tabelacontratossuporte[x].fornecedor;
      tabela.PERIOCIDADE = this.tabelacontratossuporte[x].periociodade;
      tabela.ANEXO = this.tabelacontratossuporte[x].anexo;
      this.gravarTabelaContratosSuporte2(tabela, x);
    }
  }

  gravarTabelaContratosSuporte2(tabela, x) {
    this.MANMOVMANUTENCAOCONTRATOSSUPORTEService.update(tabela).subscribe(
      res => {
        this.gravarFicheirosAnexos(res.ID_MANUTENCAO, res.ID, 'contrato_suporte', this.tabelacontratossuporte[x].anexos);
      },
      error => {
        console.log(error);
      });
  }

  gravarTabelaDadosCompra(id) {
    for (var x in this.tabeladadoscompra) {
      var tabela = new MAN_MOV_MANUTENCAO_DADOS_COMPRA;
      if (this.tabeladadoscompra[x].id != null) {
        tabela = this.tabeladadoscompra[x].dados;
      }

      tabela.ID_MANUTENCAO = id;

      tabela.FORNECEDOR = this.tabeladadoscompra[x].fornecedor;
      tabela.ANEXO = this.tabeladadoscompra[x].anexo;
      tabela.N_DOCUMENTO = this.tabeladadoscompra[x].n_documento;

      this.gravarTabelaDadosCompra2(tabela, x);
    }
  }

  gravarTabelaDadosCompra2(tabela, x) {
    this.MANMOVMANUTENCAODADOSCOMPRAService.update(tabela).subscribe(
      res => {
        this.gravarFicheirosAnexos(res.ID_MANUTENCAO, res.ID, 'dados_compra', this.tabeladadoscompra[x].anexos);
      },
      error => {
        console.log(error);
      });
  }


  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.MANMOVMANUTENCAODOCUMENTOSService.getbyidEquipamento2(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate(response[x][8]) + " " + new Date(response[x][8]).toLocaleTimeString();

            id2 = response[x][0];

            //if (response[x][0].ID_FICHEIRO != null) id2 = "f110" + response[x][0].ID;
            this.uploadedFiles.push({
              data_CRIA: data_at, ficheiro: null, /*response[x][0].FICHEIRO_1 + response[x][0].FICHEIRO_2,*/
              data: response[x][0], utilizador: response[x][13].nome_UTILIZADOR,
              datacria: datacria, /*responsavel: response[x][2],*/
              id: id2, name: response[x][2], id_FICHEIRO: response[x][0],
              src: response[x][3], type: response[x][5], datatype: response[x][11], size: response[x][1], descricao: response[x][4]
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    if (date == null) {
      return null;
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  abrirdialoganexo(linha, tipo, index) {
    //contrato_suporte
    //dados_compra
    this.linha_selected = linha;
    this.tipo_selected = tipo;
    this.index_selected = index;
    this.uploadedFilesAnexos = [];

    if (tipo == 'contrato_suporte') {
      this.uploadedFilesAnexos = this.getfilecontrato_suporte(index);
    } else if (tipo == 'dados_compra') {
      this.uploadedFilesAnexos = this.getfiledados_compra(index);
    } else if (tipo == 'componentes') {
      this.uploadedFilesAnexos = this.getfiledados_componentes(index);
    }

    if (linha.id != null) {
      this.carregatabelaFilesAnexos(linha.id, tipo);

    } else {
      this.displayFilesAnexo = true;
    }
  }

  getfilecontrato_suporte(index) {
    const anexos = JSON.stringify(this.tabelacontratossuporte[index].anexos);
    return JSON.parse(anexos);
  }

  getfiledados_compra(index) {
    const anexos = JSON.stringify(this.tabeladadoscompra[index].anexos);
    return JSON.parse(anexos);
  }

  getfiledados_componentes(index) {
    const anexos = JSON.stringify(this.tabela_lista_componentes[index].anexos);
    return JSON.parse(anexos);
  }

  carregatabelaFilesAnexos(id, separador) {

    this.uploadedFilesAnexos = [];
    this.MANMOVMANUTENCAOANEXOSService.getbyID2(id, separador).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate(response[x][8]) + " " + new Date(response[x][8]).toLocaleTimeString();

            id2 = response[x][0];

            // if (response[x][0].ID_FICHEIRO != null) id2 = "f110" + response[x][0].ID;
            /*this.uploadedFilesAnexos.push({
              data_CRIA: data_at, ficheiro: null, /*response[x][0].FICHEIRO_1 + response[x][0].FICHEIRO_2,*/
            /*     data: response[x][0], utilizador: response[x][1].nome_UTILIZADOR,
                 datacria: datacria, responsavel: response[x][2],
                 id: id2, name: response[x][0].NOME, id_FICHEIRO: response[x][0].id_FICHEIRO,
                 src: response[x][0].CAMINHO, type: response[x][0].TIPO, datatype: response[x][0].DATATYPE, size: response[x][0].TAMANHO, descricao: response[x][0].DESCRICAO
               });*/
            this.uploadedFilesAnexos.push({
              data_CRIA: data_at, ficheiro: null, /*response[x][0].FICHEIRO_1 + response[x][0].FICHEIRO_2,*/
              data: response[x][0], utilizador: response[x][12].nome_UTILIZADOR,
              datacria: datacria,
              id: id2, name: response[x][2], id_FICHEIRO: response[x][0],
              src: response[x][3], type: response[x][5], datatype: response[x][11], size: response[x][1], descricao: response[x][4]
            });

          }
          this.uploadedFilesAnexos = this.uploadedFilesAnexos.slice();

          if (separador == 'contrato_suporte') {
            this.tabelacontratossuporte[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          } else if (separador == 'dados_compra') {
            this.tabeladadoscompra[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          } else if (separador == 'componentes') {
            this.tabela_lista_componentes[this.index_selected].anexo = this.uploadedFilesAnexos.length;
          }
        }

        this.displayFilesAnexo = true;
      }, error => { console.log(error); this.displayFilesAnexo = true; });

  }

  abreAnexos() {
    if (this.anexosshow) {
      this.displayFilesAnexo = true;
    }
  }

  abrePeriocidade(dados, index) {
    this.tipo_FIM = (dados.tipo_FIM == null) ? 1 : dados.tipo_FIM;
    this.ocorrencias = dados.ocorrencias;
    this.total_OCORRENCIAS = dados.total_OCORRENCIAS;
    this.data_FINAL = dados.data_FINAL;
    this.tipo_REPETICAO = (dados.tipo_REPETICAO == null) ? 1 : dados.tipo_REPETICAO;
    this.repetir = dados.repetir;
    this.dias_SEMANA = dados.dias_SEMANA;
    this.data_ULTIMA_REALIZADA = dados.data_ULTIMA_REALIZADA;
    this.data_PROXIMA_REALIZADA = dados.data_PROXIMA_REALIZADA;
    this.data_INICIO = dados.data_INICIO;
    /*this.hora_INICIO = dados.hora_INICIO;*/
    this.index_selected_periocidade = index;
    this.displayperiocidade = true;

  }

  atualizarperiocidade() {
    var index = this.index_selected_periocidade;
    this.tabelaaccoes[index].tipo_FIM = this.tipo_FIM;
    this.tabelaaccoes[index].ocorrencias = this.ocorrencias;
    this.tabelaaccoes[index].total_OCORRENCIAS = this.total_OCORRENCIAS;
    this.tabelaaccoes[index].data_FINAL = this.data_FINAL;
    this.tabelaaccoes[index].tipo_REPETICAO = this.tipo_REPETICAO;
    this.tabelaaccoes[index].repetir = this.repetir;
    this.tabelaaccoes[index].dias_SEMANA = this.dias_SEMANA;
    this.tabelaaccoes[index].data_ULTIMA_REALIZADA = this.data_ULTIMA_REALIZADA;
    this.tabelaaccoes[index].data_PROXIMA_REALIZADA = this.data_PROXIMA_REALIZADA;
    this.tabelaaccoes[index].data_INICIO = this.data_INICIO;
    /*this.tabelaaccoes[index].hora_INICIO = dados.hora_INICIO;*/

    this.displayperiocidade = false;
  }

  verStock(proref) {
    if (proref != null) {
      this.ABDICCOMPONENTEService.getReferenciasSTOCK(proref).subscribe(
        response => {
          this.stocklocalizacoes = [];

          for (var x in response) {
            this.stocklocalizacoes.push({
              Referencia: response[x].Referencia, Armazem: response[x].Armazem + ' - ' + response[x].Localizacao, Localizacao: response[x].Localizacao, stock: response[x].stock
            });
          }
          this.stocklocalizacoes = this.stocklocalizacoes.slice();
          this.displaylocalizacaostock = true;

        },
        error => { console.log(error); });
    }
  }
}
