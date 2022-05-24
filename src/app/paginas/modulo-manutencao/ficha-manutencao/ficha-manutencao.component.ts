import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { UploadService } from 'app/servicos/upload.service';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { Location } from '@angular/common';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { MANMOVPEDIDOSDOCUMENTOSService } from 'app/servicos/man-mov-pedidos-documentos.service';
import { MAN_MOV_PEDIDOS_DOCUMENTOS } from 'app/entidades/MAN_MOV_PEDIDOS_DOCUMENTOS';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { MANMOVMANUTENCAOCOMPONENTESService } from 'app/servicos/man-mov-manutencao-componentes.service';
import { MANDICEQUIPASService } from 'app/servicos/man-dic-equipas.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { MANMOVMAQUINASPARADASService } from 'app/servicos/man-mov-maquinas-paradas.service';
import { MAN_MOV_MAQUINAS_PARADAS } from 'app/entidades/MAN_MOV_MAQUINAS_PARADAS';
import { GERFORNECEDORService } from 'app/servicos/ger-fornecedor.service';
import { MANDICAMBITOSService } from 'app/servicos/man-dic-ambitos.service';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { MAN_MOV_MANUTENCAO_CAB } from 'app/entidades/MAN_MOV_MANUTENCAO_CAB';
import { MAN_MOV_MANUTENCAO_NOTAS } from 'app/entidades/MAN_MOV_MANUTENCAO_NOTAS';
import { MANMOVMANUTENCAONOTASService } from 'app/servicos/man-mov-manutencao-notas.service';
import { MANMOVMANUTENCAOOPERARIOSService } from 'app/servicos/man-mov-manutencao-operarios.service';
import { MAN_MOV_MANUTENCAO_ACCOES } from 'app/entidades/MAN_MOV_MANUTENCAO_ACCOES';
import { MANMOVMANUTENCAOACCOESService } from 'app/servicos/man-mov-manutencao-accoes.service';

@Component({
  selector: 'app-ficha-manutencao',
  templateUrl: './ficha-manutencao.component.html',
  styleUrls: ['./ficha-manutencao.component.css']
})
export class FichaManutencaoComponent implements OnInit {

  //drop_moradas = [];
  filedescricao = [];
  fileselectinput = [];


  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  modoedicao: boolean;


  data_CRIA;
  hora_CRIA;
  utz_CRIA;



  estado: string = 'P';

  uploadedFiles: any[] = [];
  campo_x: number;

  disEditar: boolean;
  disApagar: boolean;
  disCriar: boolean;
  btcriar: boolean;
  btapagar: boolean;
  btvoltar: boolean;
  btcancelar: boolean;
  btRejeitarPedido: boolean;
  bteditar: boolean;
  disFechar: boolean;
  disPlanear;
  btplanear;

  disSubmeter;
  btsubmeter;
  disCancelar;
  disValidar: boolean;
  disRejeitar: boolean;
  btValidar: boolean;
  btRejeitar: boolean;
  disRejeitarPedido;


  REFERENTE_EQUIPAMENTO = 'N';
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  srcelement;
  nomeficheiro: any;
  type: string;
  display: boolean;
  ficha_manutencao_dados: MAN_MOV_MANUTENCAO_CAB;
  COMPONENTE: number;
  DESCRICAO_PEDIDO: string = null;
  NOTAS_PLANEAMENTO: string = null;
  ID_RESPONSAVEL: number;
  LOCALIZACAO;
  EQUIPAMENTO: number;
  drop_localizacoes = [];
  drop_componentes = [];
  drop_equipamentos = [];
  drop_utilizadores: any[];
  ID_PEDIDO: number;
  DATA_HORA_PEDIDO: any;
  TIPO_RESPONSAVEL: string;
  AMBITO_MANUTENCAO: number;
  STATUS_MAQUINA: string;
  UTILIZADOR: number;
  ID_EQUIPA: number;
  drop_equipas: any[];
  displayverificar: boolean;
  mensagem_verifica: string;
  acesso_responsavel = false;
  fornecedores_silver: any[];
  drop_ambitos_manutencao: any[];
  COD_FORNECEDOR: string;
  NOME_FORNECEDOR: string;
  EMAIL_FORNECEDOR: string;
  submetergravar: boolean;

  notas: any[] = [];
  display_notas: boolean = false;
  nota: any = null;
  mototivoRejeicao: string;
  displayMotivoRejeicao: boolean;
  validacao2: boolean = false;
  validacao1: boolean = false;
  lista_manutencoes_pendentes: any[] = [];
  display_manutencoes_pendentes: boolean = false;
  estadoRejeitado: string;
  estado_texto: string;
  OBSERVACOES: string;
  operarios: any[];
  acoes: any[];
  btnotas = true;
  constructor(private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService
    , private renderer: Renderer, private location: Location, private sanitizer: DomSanitizer,
    private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService,
    private MANMOVPEDIDOSDOCUMENTOSService: MANMOVPEDIDOSDOCUMENTOSService,
    private MANMOVMANUTENCAOCOMPONENTESService: MANMOVMANUTENCAOCOMPONENTESService,
    private MANDICEQUIPASService: MANDICEQUIPASService,
    private MANDICPISOSService: MANDICPISOSService,
    private MANMOVMAQUINASPARADASService: MANMOVMAQUINASPARADASService,
    private GERFORNECEDORService: GERFORNECEDORService,
    private MANDICAMBITOSService: MANDICAMBITOSService,
    private MANMOVMANUTENCAONOTASService: MANMOVMANUTENCAONOTASService,
    private MANMOVMANUTENCAOOPERARIOSService: MANMOVMANUTENCAOOPERARIOSService,
    private MANMOVMANUTENCAOACCOESService: MANMOVMANUTENCAOACCOESService,
    private UploadService: UploadService) { }

  ngOnInit() {

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);

    this.btcriar = true;
    this.btapagar = true;
    this.btvoltar = true;
    this.btcancelar = true;
    this.btValidar = false;
    this.btRejeitar = false;
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

    var id = 0;

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar") || urlarray[1].match("view")) {
        this.novo = false;


        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['id'] || 0;
          });

        this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582editar");
        this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582criar");
        this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582apagar");
        //this.disPlanear
      }
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.btapagar = true;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.btapagar = false;
        this.btcriar = true;
        this.btcancelar = false;
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.btnotas = false;
        this.bteditar = false;
        this.btplanear = false;
        this.btsubmeter = false;
        this.modoedicao = true;
        this.btValidar = false;
        this.btRejeitar = false;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.ID_RESPONSAVEL = this.user;
        this.DATA_HORA_PEDIDO = this.data_CRIA;
        //this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = true;
      } else if (urlarray[1].match("duplicar")) {

      }

    } else {
      this.btapagar = false;
      this.btcriar = true;
      this.btcancelar = false;
      this.globalVar.setduplicar(false);
      this.novo = true;
      this.btnotas = false;
      this.bteditar = false;
      this.btplanear = false;
      this.btsubmeter = false;
      this.modoedicao = true;
      this.btValidar = false;
      this.btRejeitar = false;
      var dirtyFormID = 'formReclama';
      var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
      resetForm.reset();
      this.data_CRIA = new Date();
      this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
      this.utz_CRIA = this.user;
      this.ID_RESPONSAVEL = this.user;
      this.DATA_HORA_PEDIDO = this.data_CRIA;
    }
    this.getacessoresponsavel(id);

    /* if (!this.novo) {
       this.inicia(id);
     }*/
  }


  getacessoresponsavel(id) {
    this.GERUTILIZADORESService.getAcessoResponsavel(this.user, id).subscribe(
      response => {
        var acesso_responsavel = response;
        this.acesso_responsavel = acesso_responsavel || this.adminuser;
        this.carregaDados(false, id);
      },
      error => {
        this.carregaDados(false, id);
      });
  }

  carregaDados(inicia, id) {

    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }

        this.drop_utilizadores = this.drop_utilizadores.slice();

      },
      error => { console.log(error); });
    this.localizacoes(id);
    if (this.novo) this.equipamentos();

  }

  listar_ambitos_manutencao(id) {

    this.drop_ambitos_manutencao = [];
    this.drop_ambitos_manutencao.push({ label: 'Sel. Âmbito', value: "" });
    this.MANDICAMBITOSService.getAll2().subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {

          this.drop_ambitos_manutencao.push({
            value: response[x][0],
            label: response[x][1],
            email: response[x][2]
          });

        }

        this.drop_ambitos_manutencao = this.drop_ambitos_manutencao.slice();
        if (!this.novo) {
          this.inicia(id);
        }
      },
      error => {
        console.log(error);
        if (!this.novo) {
          this.inicia(id);
        }
      });
  }

  fornecedores(id) {
    this.fornecedores_silver = [];
    this.fornecedores_silver.push({ label: 'Seleccione Fornecedor', value: "" });
    this.GERFORNECEDORService.getAll_silver().subscribe(
      response => {
        for (var x in response) {
          this.fornecedores_silver.push({ label: response[x].FOUCOD + ' - ' + response[x].ADRNOM, email: response[x].ADRNUMINT, value: response[x].FOUCOD, nome: response[x].ADRNOM });
        }
        this.fornecedores_silver = this.fornecedores_silver.slice();

        this.listar_ambitos_manutencao(id);
      },
      error => {
        console.log(error);

        this.listar_ambitos_manutencao(id);
      });
  }

  localizacoes(id) {
    this.drop_localizacoes = [];
    this.drop_localizacoes.push({
      value: '', label: 'Selecionar Localização'
    })
    this.MANDICPISOSService.getALLLOCALLIZACOES().subscribe(
      response => {
        for (var x in response) {
          this.drop_localizacoes.push({
            value: response[x][2] + response[x][0], label: response[x][1], email: response[x][3]
          });
        }
        this.drop_localizacoes = this.drop_localizacoes.slice();
        this.listar_equipas(id);

      },
      error => { console.log(error); this.listar_equipas(id); });
  }

  equipamentos() {

    this.drop_equipamentos = [];
    this.drop_equipamentos.push({ label: 'Sel. Equipamento', value: "" });
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          this.drop_equipamentos.push({
            value: response[x].ID_MANUTENCAO,
            label: response[x].NOME,
            TIPO_EQUIPA: response[x].TIPO_EQUIPA,
            EQUIPA: response[x].EQUIPA,
            UTILIZADOR: response[x].UTILIZADOR,
            TIPO_LOCALIZACAO: response[x].TIPO_LOCALIZACAO,
            LOCALIZACAO: response[x].LOCALIZACAO,
            AMBITO_MANUTENCAO: response[x].AMBITO_MANUTENCAO,
          });
        }

        this.drop_equipamentos = this.drop_equipamentos.slice();
      },
      error => console.log(error));
  }

  getEquipamentos(event, valor = null) {
    this.EQUIPAMENTO = null;
    this.COMPONENTE = null;
    this.drop_equipamentos = [];
    this.drop_componentes = [];
    this.drop_equipamentos.push({ label: 'Sel. Equipamento', value: "" });
    if (event.value != null && event.value != "") {

      var LOCALIZACAO = event.value.substring(1);
      var TIPO_LOCALIZACAO = event.value.charAt(0);
      this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAllLocalizacao(TIPO_LOCALIZACAO, LOCALIZACAO).subscribe(
        response => {
          var count = Object.keys(response).length;
          for (var x in response) {
            this.drop_equipamentos.push({
              value: response[x].ID_MANUTENCAO,
              label: response[x].NOME,
              TIPO_EQUIPA: response[x].TIPO_EQUIPA,
              EQUIPA: response[x].EQUIPA,
              UTILIZADOR: response[x].UTILIZADOR,
              TIPO_LOCALIZACAO: response[x].TIPO_LOCALIZACAO,
              LOCALIZACAO: response[x].LOCALIZACAO,
              AMBITO_MANUTENCAO: response[x].AMBITO_MANUTENCAO,
            });
          }
          this.drop_equipamentos = this.drop_equipamentos.slice();
          if (valor != null) this.EQUIPAMENTO = valor;
        },
        error => console.log(error));
    } else {
      this.equipamentos();
    }

    if (valor == null && event.value != null && event.value != "") {
      this.validacao1 = false;
      this.validacao2 = false;
      this.validaManutencoesPendentes('L', event.value)
    } else {
      this.validacao2 = false;
    }
  }

  listar_equipas(id) {
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
        this.fornecedores(id);
      },
      error => { console.log(error); this.fornecedores(id); });
  }


  componentes(event, valor = null, inicia = false) {

    if (!inicia) {
      var equipamento = this.drop_equipamentos.find(item => item.value == event.value);

      if (equipamento && event.value != null && event.value != "") {
        this.TIPO_RESPONSAVEL = equipamento.TIPO_EQUIPA;
        this.ID_EQUIPA = equipamento.EQUIPA;
        this.UTILIZADOR = equipamento.UTILIZADOR;
        this.LOCALIZACAO = equipamento.TIPO_LOCALIZACAO + equipamento.LOCALIZACAO;
        this.AMBITO_MANUTENCAO = equipamento.AMBITO_MANUTENCAO;
      } else {
        this.TIPO_RESPONSAVEL = null;
        this.ID_EQUIPA = null;
        this.UTILIZADOR = null;
        this.LOCALIZACAO = null;
        this.AMBITO_MANUTENCAO = null;
      }
    }

    this.drop_componentes = [];
    this.COMPONENTE = null
    this.drop_componentes.push({ label: 'Sel. Componente', value: "" });
    if (event.value != null && event.value != "") {
      this.MANMOVMANUTENCAOCOMPONENTESService.getbyID(event.value).subscribe(
        response => {
          for (var x in response) {
            this.drop_componentes.push({
              value: response[x].ID, label: response[x].REFERENCIA + ' - ' + response[x].DESC_REFERENCIA
            });
          }
          this.drop_componentes = this.drop_componentes.slice();
          if (valor != null) this.COMPONENTE = valor;
        },
        error => console.log(error));
    }

    if (valor == null && event.value != null && event.value != "") {
      this.validacao1 = false;
      this.validacao2 = false;
      this.validaManutencoesPendentes('E', event.value)
    } else {
      this.validacao2 = false;
    }
  }

  validaManutencoesPendentes(tipo, id) {
    this.lista_manutencoes_pendentes = [];
    this.MANMOVMANUTENCAOCABService.getAllManutencoesPendentes(tipo, id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.validacao1 = false;
          this.validacao2 = false;
        } else {
          if (tipo == 'L') this.validacao1 = true;
          if (tipo == 'E') this.validacao2 = true;
        }
        for (var x in response) {
          this.lista_manutencoes_pendentes.push({
            ID_PEDIDO: response[x][0],
            DATA_HORA_PEDIDO: this.formatDate2(response[x][1]) + " " + new Date(response[x][1]).toLocaleTimeString().slice(0, 5),
            EQUIPAMENTO: response[x][3],
            COMPONENTE: (response[x][4] != null) ? response[x][4] + ' - ' + response[x][5] : null,
            ESTADO: this.getestado(response[x][6]),
            RESPONSAVEL: response[x][2],
            STATUS_MAQUINA: (response[x][10] == null) ? '' : ((response[x][10] == 'P') ? 'Parada' : 'Em Funcionamento'),
            LOCALIZACAO: response[x][7],
            UTILIZADOR: response[x][9],
            AMBITO: response[x][11]
          });
        }

        this.lista_manutencoes_pendentes = this.lista_manutencoes_pendentes.slice();

      },
      error => console.log(error));

  }

  getestadofunc(valor: any) {
    if (valor == 'E') {
      return 'Execução'
    } else if (valor == 'S') {
      return 'Pausa'
    } else if (valor == 'C') {
      return 'Concluído';
    } else if (valor == 'R') {
      return 'Suspenso';
    } else if (valor == 'D') {
      return 'Desistiu';
    }
  }

  getestado(valor) {
    if (valor == 'PE') {
      return 'Submetida';
    } if (valor == 'P') {
      return 'Planeada';
    } else if (valor == 'V') {
      return 'Validada';
    } else if (valor == 'A') {
      return 'Anulada';
    } else if (valor == 'E') {
      return 'Em Execução';
    } else if (valor == 'EM') {
      return 'Em Elaboração';
    } else if (valor == 'CA') {
      return 'Cancelada';
    } else if (valor == 'C') {
      return 'Concluída';
    } else if (valor == 'RJ') {
      return 'Rejeitada';
    } else if (valor == 'RP') {
      return 'Pedido Rejeitado';
    } else if (valor == 'RE') {
      return 'Reaberta';
    } else if (valor == 'R') {
      return 'Suspensa';
    }

    return 'Submetida';
  }

  inicia(id) {

    this.MANMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {

          for (var x in response) {
            this.data_CRIA = new Date(response[x].DATA_CRIA);
            this.hora_CRIA = new Date(response[x].DATA_CRIA).toLocaleTimeString().slice(0, 5);
            this.utz_CRIA = response[x].UTZ_CRIA;
            this.ficha_manutencao_dados = response[x];

            this.ID_PEDIDO = response[x].ID_MANUTENCAO_CAB;
            this.COMPONENTE = response[x].COMPONENTE;
            this.DESCRICAO_PEDIDO = response[x].DESCRICAO_PEDIDO;
            this.NOTAS_PLANEAMENTO = response[x].NOTAS_PLANEAMENTO;
            this.ID_RESPONSAVEL = response[x].RESPONSAVEL_PEDIDO;
            this.LOCALIZACAO = ((response[x].TIPO_LOCALIZACAO == null) ? 'E' : response[x].TIPO_LOCALIZACAO) + response[x].LOCALIZACAO;
            this.EQUIPAMENTO = response[x].EQUIPAMENTO;
            this.DATA_HORA_PEDIDO = response[x].DATA_HORA_PEDIDO;

            this.TIPO_RESPONSAVEL = response[x].TIPO_RESPONSAVEL;
            this.AMBITO_MANUTENCAO = response[x].AMBITO_MANUTENCAO;
            this.STATUS_MAQUINA = response[x].STATUS_MAQUINA;
            this.UTILIZADOR = (response[x].TIPO_RESPONSAVEL == 'U') ? response[x].UTILIZADOR : null;
            this.ID_EQUIPA = (response[x].TIPO_RESPONSAVEL == 'E') ? response[x].UTILIZADOR : null;
            this.COD_FORNECEDOR = response[x].COD_FORNECEDOR;
            this.NOME_FORNECEDOR = response[x].NOME_FORNECEDOR;
            this.EMAIL_FORNECEDOR = response[x].EMAIL_FORNECEDOR;
            this.OBSERVACOES = response[x].OBSERVACOES;

            if (this.EQUIPAMENTO != null) {
              this.REFERENTE_EQUIPAMENTO = 'S';
            } else {
              this.REFERENTE_EQUIPAMENTO = 'N';
            }

            this.estado = response[x].ESTADO;

            this.estado_texto = this.getESTADO(response[x].ESTADO);

            this.btRejeitarPedido = false;
            if (response[x].ESTADO == 'P') {
              if (this.acesso_responsavel) {
                this.bteditar = true;
                this.btRejeitarPedido = true;
                this.btcancelar = true;
              } else {
                this.bteditar = false;
                this.modoedicao = false;
                this.btcancelar = false;
              }
              this.btplanear = false;
              this.btsubmeter = false;
            } else if (response[x].ESTADO == 'EM') {
              this.btsubmeter = true;
              this.btplanear = false;
              this.btcancelar = true;
            } else if (response[x].ESTADO == 'CA') {
              this.bteditar = false;
              this.modoedicao = false;
              this.btplanear = false;
              this.btsubmeter = false;
              this.btcancelar = false;
            } else if (response[x].ESTADO == 'C') {
              this.btValidar = true;
              this.btRejeitar = true;
              this.bteditar = false;
              this.modoedicao = false;
              this.btplanear = false;
              this.btsubmeter = false;
              this.btcancelar = false;
            } else if (response[x].ESTADO == 'PE') {

              if (this.acesso_responsavel) this.btRejeitarPedido = true;
              this.btcancelar = false;
              if (this.acesso_responsavel) this.btplanear = true;
              this.bteditar = false;
              if (this.acesso_responsavel) this.bteditar = true;
              this.btsubmeter = false;
            } else {
              this.bteditar = false;
              this.btcancelar = false;
              this.btplanear = false;
              this.btsubmeter = false;
            }

          }
          this.componentes({ value: this.EQUIPAMENTO }, this.COMPONENTE, true);
          this.getEquipamentos({ value: this.LOCALIZACAO }, this.EQUIPAMENTO);
          this.carregatabelaFiles(id);
          this.getOperarios(id);
          this.getAcoes(id);
          this.vernotas(false);
        }

      }, error => { console.log(error); });

  }

  getOperarios(id: any) {
    this.operarios = [];
    this.MANMOVMANUTENCAOOPERARIOSService.getbyID(id)
      .subscribe((resp: any) => {

        var count = Object.keys(resp).length;
        if (count > 0) {

          for (var x in resp) {

            this.operarios.push({
              ID: resp[x][0],
              ID_OPERARIO: resp[x][2],
              DATA_INICIO: (resp[x][3] == null) ? '' : this.formatDateTime(resp[x][3]),
              DATA_FIM: (resp[x][4] == null) ? '' : this.formatDateTime(resp[x][4]),
              TEMP_EXEC: resp[x][5],
              TEMP_PAUSA: resp[x][6],
              TEMP_TOTAL: resp[x][7],
              ESTADO: resp[x][8],
              ESTADO_TEXTO: this.getestadofunc(resp[x][8]),
              NOME_UTILIZADOR: resp[x][13]
            })
          }
          this.operarios = this.operarios.slice();
        }
      }, error => {

      }
      );
  }

  getAcoes(id: any) {
    this.acoes = [];
    this.MANMOVMANUTENCAOACCOESService.getbyID(id)
      .subscribe((resp: any) => {

        var count = Object.keys(resp).length;
        if (count > 0) {
          for (var x in resp) {
            var dados = new MAN_MOV_MANUTENCAO_ACCOES;
            dados.ID_MANUTENCAO_ACOES = resp[x][0];
            dados.ID_MANUTENCAO_CAB = resp[x][1];
            dados.ID_ACAO = resp[x][2];
            dados.REALIZADA = resp[x][3];
            dados.UTZ_CRIA = resp[x][4];
            dados.DATA_CRIA = resp[x][5];
            dados.UTZ_ULT_MODIF = resp[x][6];
            dados.DATA_ULT_MODIF = resp[x][7];
            this.acoes.push({ dados: dados, name: resp[x][8], key: resp[x][0], REALIZADA: resp[x][3], tempo: (resp[x][9] == null) ? null : resp[x][9].slice(0, 5), savebt: false })
          }
          this.acoes = this.acoes.slice();
        }
      }, error => {

      }
      );
  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.MANMOVPEDIDOSDOCUMENTOSService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate2(response[x][0].DATA_CRIA) + " " + new Date(response[x][0].DATA_CRIA).toLocaleTimeString();

            id2 = response[x][0].ID;


            if (response[x][0].ID_FICHEIRO != null) id2 = "f110" + response[x][0].ID_FICHEIRO;
            this.uploadedFiles.push({
              data_CRIA: data_at, ficheiro: response[x][0].FICHEIRO_1 + response[x][0].FICHEIRO_2,
              data: response[x][0], utilizador: response[x][1].nome_UTILIZADOR,
              datacria: datacria,
              id: id2, name: response[x][0].NOME, id_FICHEIRO: response[x][0].ID_FICHEIRO,
              src: response[x][0].CAMINHO, type: response[x][0].TIPO, datatype: response[x][0].DATATYPE, size: response[x][0].TAMANHO, descricao: response[x][0].DESCRICAO
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
      var ficheiros = new MAN_MOV_PEDIDOS_DOCUMENTOS;
      ficheiros.DATA_CRIA = data;
      ficheiros.UTZ_CRIA = this.user;
      ficheiros.ID_PEDIDO = this.ID_PEDIDO;
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
      this.gravarTabelaFicheiros2(ficheiros, 0, 0, 0);

    } else {
      this.uploadedFiles.push({
        data_CRIA: data, ficheiro: ficheiro,
        responsavel: null, utilizador: this.user_nome, datacria: this.formatDate2(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
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

  getESTADO(valor) {
    if (valor == 'PE') {
      return 'Submetida';
    } if (valor == 'P') {
      return 'Planeada';
    } else if (valor == 'V') {
      return 'Validada';
    } else if (valor == 'A') {
      return 'Anulada';
    } else if (valor == 'E') {
      return 'Em Execução';
    } else if (valor == 'EM') {
      return 'Em Elaboração';
    } else if (valor == 'CA') {
      return 'Cancelada';
    } else if (valor == 'C') {
      return 'Concluída';
    } else if (valor == 'RJ') {
      return 'Rejeitada';
    } else if (valor == 'RP') {
      return 'Pedido Rejeitado';
    } else if (valor == 'RE') {
      return 'Reaberta';
    } else if (valor == 'R') {
      return 'Suspensa';
    }

    return 'Submetida';
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  planear() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Planear?',
      header: 'Validação Confirmação',
      icon: 'fa fa-check',
      accept: () => {
        if ((this.UTILIZADOR != null || this.ID_EQUIPA != null)) {
          this.gravar(true);
        } else {
          this.displayverificar = true;
          this.mensagem_verifica = "É necessário selecionar um Utilizador/Equipa.";
        }

      }

    });

  }

  submeter() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Submeter?',
      header: 'Validação Confirmação',
      icon: 'fa fa-check',
      accept: () => {

        this.gravar(false, true);

      }

    });

  }

  gravar(planear = false, submeter = false) {

    if (this.submetergravar) { submeter = this.submetergravar }
    var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

    if (!this.novo) ficha_manutencao = this.ficha_manutencao_dados;

    if (this.novo) ficha_manutencao.DATA_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    if (this.novo) ficha_manutencao.UTZ_CRIA = this.utz_CRIA;
    if (this.novo) ficha_manutencao.TIPO_MANUTENCAO = 'C';

    if (this.REFERENTE_EQUIPAMENTO = 'N') {
      this.EQUIPAMENTO == null
      this.COMPONENTE == null
    }


    ficha_manutencao.COMPONENTE = this.COMPONENTE;
    ficha_manutencao.DESCRICAO_PEDIDO = this.DESCRICAO_PEDIDO;
    ficha_manutencao.NOTAS_PLANEAMENTO = this.NOTAS_PLANEAMENTO;
    ficha_manutencao.RESPONSAVEL_PEDIDO = this.ID_RESPONSAVEL;
    ficha_manutencao.LOCALIZACAO = this.LOCALIZACAO.substring(1);
    ficha_manutencao.TIPO_LOCALIZACAO = this.LOCALIZACAO.charAt(0);
    ficha_manutencao.EQUIPAMENTO = this.EQUIPAMENTO;
    ficha_manutencao.DATA_HORA_PEDIDO = this.DATA_HORA_PEDIDO;
    ficha_manutencao.TIPO_RESPONSAVEL = this.TIPO_RESPONSAVEL;
    ficha_manutencao.AMBITO_MANUTENCAO = this.AMBITO_MANUTENCAO;
    ficha_manutencao.STATUS_MAQUINA = this.STATUS_MAQUINA;

    if (this.TIPO_RESPONSAVEL == 'U') {
      ficha_manutencao.UTILIZADOR = this.UTILIZADOR;
    } else if (this.TIPO_RESPONSAVEL == 'E') {
      ficha_manutencao.UTILIZADOR = this.ID_EQUIPA;
    }

    ficha_manutencao.COD_FORNECEDOR = this.COD_FORNECEDOR;
    ficha_manutencao.NOME_FORNECEDOR = this.NOME_FORNECEDOR;
    ficha_manutencao.EMAIL_FORNECEDOR = this.EMAIL_FORNECEDOR;

    ficha_manutencao.UTZ_ULT_MODIF = this.user;
    ficha_manutencao.DATA_ULT_MODIF = new Date();

    if (submeter && (this.UTILIZADOR != null || this.ID_EQUIPA != null) && this.TIPO_RESPONSAVEL != 'EX') {
      ficha_manutencao.ESTADO = "P";
    } else if (submeter == true) {
      ficha_manutencao.ESTADO = "PE";
    } else if (planear == true) {
      ficha_manutencao.ESTADO = "P";
    } else if ((this.UTILIZADOR == null && this.ID_EQUIPA == null) && this.novo) {
      ficha_manutencao.ESTADO = "EM";
      //ficha_manutencao.ESTADO = "P";
    } else if ((this.UTILIZADOR != null || this.ID_EQUIPA != null) && this.novo) {
      //ficha_manutencao.ESTADO = "V";
      ficha_manutencao.ESTADO = "EM";
    }

    var EQUIPAMENTO = "";
    var LOCALIZACAO = "";
    var EQUIPA_UTILIZADOR = "";
    var EMAIL_PARA = "";

    if (ficha_manutencao.ESTADO == "PE") EMAIL_PARA = this.drop_ambitos_manutencao.find(item => item.value != '' && item.value == this.AMBITO_MANUTENCAO).email;


    if (this.drop_equipamentos.find(item => item.value != '' && item.value == this.EQUIPAMENTO)) {
      EQUIPAMENTO = this.drop_equipamentos.find(item => item.value != '' && item.value == this.EQUIPAMENTO).label;
    }

    if (this.TIPO_RESPONSAVEL == 'U') {
      if (this.drop_utilizadores.find(item => item.value != '' && item.value == this.UTILIZADOR)) {
        EQUIPA_UTILIZADOR = this.drop_utilizadores.find(item => item.value != '' && item.value == this.UTILIZADOR).label;
        EMAIL_PARA = this.drop_utilizadores.find(item => item.value != '' && item.value == this.UTILIZADOR).email;

      }
    } else if (this.TIPO_RESPONSAVEL == 'E') {
      if (this.drop_equipas.find(item => item.value != '' && item.value == this.ID_EQUIPA)) {
        EQUIPA_UTILIZADOR = this.drop_equipas.find(item => item.value != '' && item.value == this.ID_EQUIPA).label;
      }

    } else if (this.TIPO_RESPONSAVEL == 'EX') {
      EQUIPA_UTILIZADOR = this.NOME_FORNECEDOR;
    }

    if (this.drop_localizacoes.find(item => item.value != '' && item.value == this.LOCALIZACAO)) {
      LOCALIZACAO = this.drop_localizacoes.find(item => item.value != '' && item.value == this.LOCALIZACAO).label;
      var email = this.drop_localizacoes.find(item => item.value != '' && item.value == this.LOCALIZACAO).email;
      if (email != null) EMAIL_PARA = (EMAIL_PARA == null || EMAIL_PARA == '') ? email : (EMAIL_PARA + ',' + email);
    }

    var TEXTO_STATUS_MAQUINA = "Em funcionamento";
    if (this.STATUS_MAQUINA == 'P') {
      TEXTO_STATUS_MAQUINA = "Parada";
    }

    if (this.novo) {

      //console.log(ficha_manutencao)

      this.MANMOVMANUTENCAOCABService.create(ficha_manutencao).subscribe(
        res => {
          if (ficha_manutencao.ESTADO == "P") this.cria_MANUTENCAO(res.ID_MANUTENCAO_CAB, res.EQUIPAMENTO);
          this.gravarTabelaFicheiros(res.ID_MANUTENCAO_CAB);

          this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Criou Novo Pedido Manutenção no estado ' + this.getestado(ficha_manutencao.ESTADO) + '.');

          if (submeter) this.sendemail(res.ID_MANUTENCAO_CAB, this.DESCRICAO_PEDIDO, this.formatDate2(this.DATA_HORA_PEDIDO) + " " + this.DATA_HORA_PEDIDO.toLocaleTimeString().slice(0, 5),
            EQUIPAMENTO, LOCALIZACAO, EQUIPA_UTILIZADOR, EMAIL_PARA, this.user_nome, TEXTO_STATUS_MAQUINA);
        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      ficha_manutencao.ID_MANUTENCAO_CAB = id;
      //console.log(ficha_manutencao)
      this.MANMOVMANUTENCAOCABService.update(ficha_manutencao).subscribe(
        res => {
          if (res.ESTADO == "P" && planear) this.cria_MANUTENCAO(res.ID_MANUTENCAO_CAB, res.EQUIPAMENTO);
          this.gravarTabelaFicheiros(id);

          if (submeter) this.sendemail(res.ID_MANUTENCAO_CAB, this.DESCRICAO_PEDIDO, this.formatDate2(this.DATA_HORA_PEDIDO) + " " + new Date(this.DATA_HORA_PEDIDO).toLocaleTimeString().slice(0, 5),
            EQUIPAMENTO, LOCALIZACAO, EQUIPA_UTILIZADOR, EMAIL_PARA, this.user_nome, TEXTO_STATUS_MAQUINA);
          //this.gravarTabelaStocks(id);

          if (res.ESTADO == "P" && planear) {
            this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Alterou Pedido Manutenção para o estado ' + this.getestado(ficha_manutencao.ESTADO) + '.');
          } else if (submeter) {
            this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Alterou Pedido Manutenção para o estado ' + this.getestado(ficha_manutencao.ESTADO) + '.');
          }

        },
        error => { console.log(error); this.simular(this.inputerro); });

    }

  }

  criarHISTORICO(id, MOTIVO) {
    this.MANMOVMANUTENCAOCABService.MAN_MOV_MANUTENCAO_CREATE_HISTORICO([{ ID_OPERARIO: this.user, ID_MANUTENCAO_CAB: id, MOTIVO: MOTIVO }]).subscribe(
      res => {
      },
      error => { console.log(error); });
  }


  criaSTATUS_MAQUINA(ID_PEDIDO, ID_EQUIPAMENTO) {
    var status = new MAN_MOV_MAQUINAS_PARADAS;
    status.DATA_INICIO = new Date();
    status.ESTADO = 'P';
    status.ID_PEDIDO = ID_PEDIDO;
    status.ID_EQUIPAMENTO = ID_EQUIPAMENTO;
    status.UTZ_ULT_MODIF = this.user;
    status.DATA_ULT_MODIF = new Date();

    status.UTZ_CRIA = this.user;
    status.DATA_CRIA = new Date();


    this.MANMOVMAQUINASPARADASService.create(status).subscribe(res => {

    },
      error => { console.log(error); });
  }

  cria_MANUTENCAO(id, id_equipamento) {
    /*this.MANMOVMANUTENCAOCABService.MAN_CRIAR_MANUTENCOES_CORRETIVAS([{ ID_PEDIDO: id, POSICAO: null }]).subscribe(
      res => {
        if (this.STATUS_MAQUINA == 'P') {
          this.criaSTATUS_MAQUINA(id, id_equipamento);
        }
        this.inicia(id);
      },
      error => { console.log(error); this.simular(this.inputerro); });*/
    if (this.STATUS_MAQUINA == 'P') {
      this.criaSTATUS_MAQUINA(id, id_equipamento);
    }
    //this.inicia(id);
  }



  gravarTabelaFicheiros(id) {
    if (this.novo && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new MAN_MOV_PEDIDOS_DOCUMENTOS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.DATA_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.UTZ_CRIA = this.user;
          novo = true;
        }
        ficheiros.ID_PEDIDO = id;
        if (!this.novo) ficheiros.ID = this.uploadedFiles[x].id;
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
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        }

        if (count == this.uploadedFiles.length) {
          if (this.novo) {
            //this.router.navigate(['lista_pedidos/editar'], { queryParams: { id: id } });
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });

            if (back != 0) {
              //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
              this.router.navigate(['lista_pedidos']);
            } else {
              //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
              this.router.navigate(['lista_pedidos']);
            }

            this.simular(this.inputnotifi);
          } else {
            var back;
            var sub2 = this.route
              .queryParams
              .subscribe(params => {
                // Defaults to 0 if no query param provided.
                back = params['redirect'] || 0;
              });
            if (!this.modoedicao) { this.inicia(id); }

            if (back != 0) {
              //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
              this.router.navigate(['lista_pedidos']);
            } else {
              //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
              this.router.navigate(['lista_pedidos']);
            }
            this.simular(this.inputgravou);
          }
        }

      }
    } else {

      for (var x in this.uploadedFiles) {
        var ficheiros = new MAN_MOV_PEDIDOS_DOCUMENTOS;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.DATA_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.UTZ_CRIA = this.user;
          novo = true;
        }
        ficheiros.ID_PEDIDO = id;
        if (!this.novo) ficheiros.ID = this.uploadedFiles[x].id;
        ficheiros.CAMINHO = this.uploadedFiles[x].src;
        ficheiros.NOME = this.uploadedFiles[x].name;
        ficheiros.TIPO = this.uploadedFiles[x].type;
        ficheiros.DATATYPE = this.uploadedFiles[x].datatype;
        ficheiros.TAMANHO = this.uploadedFiles[x].size;
        ficheiros.DESCRICAO = this.uploadedFiles[x].descricao;
        ficheiros.DATA_ULT_MODIF = new Date();
        ficheiros.UTZ_ULT_MODIF = this.user;

      }


      if (this.novo) {
        //this.router.navigate(['lista_pedidos/editar'], { queryParams: { id: id } });
        var back;
        var sub2 = this.route
          .queryParams
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            back = params['redirect'] || 0;
          });

        this.simular(this.inputnotifi);
        if (back != 0) {
          //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
          this.router.navigate(['lista_pedidos']);
        } else {
          //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
          this.router.navigate(['lista_pedidos']);
        }
      } else {
        var back;
        var sub2 = this.route
          .queryParams
          .subscribe(params => {
            // Defaults to 0 if no query param provided.
            back = params['redirect'] || 0;
          });

        if (!this.modoedicao) { this.inicia(id); }

        if (back != 0) {
          //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
          this.router.navigate(['lista_pedidos']);
        } else {
          //this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
          this.router.navigate(['lista_pedidos']);
        }
        this.simular(this.inputgravou);
      }
    }

  }


  cancelar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende cancelar?',
      header: 'Cancelar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

        ficha_manutencao = this.ficha_manutencao_dados;

        ficha_manutencao.UTZ_ULT_MODIF = this.user;
        ficha_manutencao.DATA_ULT_MODIF = new Date();
        ficha_manutencao.ESTADO = "CA";

        this.MANMOVMANUTENCAOCABService.update(ficha_manutencao).subscribe(
          res => {
            this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Cancelou Pedido Manutenção.');
            this.router.navigate(['lista_pedidos']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  Validar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende validar?',
      header: 'Validar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

        ficha_manutencao = this.ficha_manutencao_dados;

        ficha_manutencao.UTZ_ULT_MODIF = this.user;
        ficha_manutencao.DATA_ULT_MODIF = new Date();
        ficha_manutencao.ESTADO = "V";

        this.MANMOVMANUTENCAOCABService.update(ficha_manutencao).subscribe(
          res => {
            this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Validou Pedido Manutenção.');
            this.router.navigate(['lista_pedidos']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }


  Rejeitar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende rejeitar?',
      header: 'Rejeitar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.mototivoRejeicao = "";
        this.displayMotivoRejeicao = true;
        this.estadoRejeitado = 'RE';
      }

    });
  }

  RejeitarPedido() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende rejeitar o pedido?',
      header: 'Rejeitar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.mototivoRejeicao = "";
        this.displayMotivoRejeicao = true;
        this.estadoRejeitado = 'RP';
      }

    });
  }

  gravarRejeitar() {
    var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

    ficha_manutencao = this.ficha_manutencao_dados;

    ficha_manutencao.UTZ_ULT_MODIF = this.user;
    ficha_manutencao.DATA_ULT_MODIF = new Date();
    ficha_manutencao.ESTADO = this.estadoRejeitado;

    this.MANMOVMANUTENCAOCABService.update(ficha_manutencao).subscribe(
      res => {
        if (this.estadoRejeitado == 'RJ') {
          this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Rejeitou Manutenção Corretiva.');
        } else {
          this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Rejeitou Pedido de Manutenção.');
        }

        this.insertNOTAS('', this.mototivoRejeicao, null);
        this.router.navigate(['lista_pedidos']);
        this.simular(this.inputapagar);
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  apagar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

        ficha_manutencao = this.ficha_manutencao_dados;

        ficha_manutencao.UTZ_ULT_MODIF = this.user;
        ficha_manutencao.DATA_ULT_MODIF = new Date();
        ficha_manutencao.ESTADO = "A";

        this.MANMOVMANUTENCAOCABService.update(ficha_manutencao).subscribe(
          res => {
            this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Apagou Pedido Manutenção.');
            this.router.navigate(['lista_pedidos']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  imprimir(relatorio, id) {

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
    this.submetergravar = false;
    this.simular(this.buttongravar);
  }

  btgravar2() {
    this.submetergravar = true;
    this.simular(this.buttongravar);
  }

  gravarTabelaFicheiros2(ficheiros: MAN_MOV_PEDIDOS_DOCUMENTOS, count, total, id) {

    this.MANMOVPEDIDOSDOCUMENTOSService.update(ficheiros).then(
      res => {
        if (count == total && this.novo) {

        } else if (!this.novo) {
          this.uploadedFiles.push({
            data: res,
            data_CRIA: ficheiros.DATA_CRIA, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
            utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.ID, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
          });
          this.uploadedFiles = this.uploadedFiles.slice();
        }
      },
      error => { console.log(error); });

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
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.MANMOVPEDIDOSDOCUMENTOSService.delete(tab.id).then(
        res => {
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
        this.router.navigate(['lista_pedidos/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['lista_pedidos/editar'], { queryParams: { id: page } });
      }

    }
  }

  novaficha() {
    this.router.navigate(['lista_pedidos/novo']);
  }



  sendemail(N_PEDIDO, DESCRICAO_PEDIDO, DATA_HORA_PEDIDO, EQUIPAMENTO, LOCALIZACAO, EQUIPA_UTILIZADOR, EMAIL_PARA, RESPONSAVEL_PEDIDO, STATUS_MAQUINA) {


    var dados = "{N_PEDIDO::" + N_PEDIDO +
      "\n/link::" + webUrl.host + '/#/lista_pedidos/view?id=' + N_PEDIDO +
      "\n/DESCRICAO_PEDIDO::" + ((DESCRICAO_PEDIDO == null) ? '' : DESCRICAO_PEDIDO) +
      "\n/DATA_HORA_PEDIDO::" + DATA_HORA_PEDIDO +
      "\n/EQUIPAMENTO::" + EQUIPAMENTO +
      "\n/LOCALIZACAO::" + LOCALIZACAO +
      "\n/RESPONSAVEL_PEDIDO::" + RESPONSAVEL_PEDIDO +
      "\n/STATUS_MAQUINA::" + STATUS_MAQUINA +
      "\n/EQUIPA_UTILIZADOR::" + EQUIPA_UTILIZADOR + "}";

    var MOMENTO = "NOVO PEDIDO MANUTENÇÃO";


    var data = [{ MODULO: 14, MOMENTO: MOMENTO, PAGINA: "PEDIDO MANUTENÇÃO", FICHEIROS: null, ESTADO: true, DADOS: dados, EMAIL_PARA: EMAIL_PARA }];



    this.UploadService.verficaEventos(data).subscribe(result => {


    }, error => {
      console.log(error);

    });
  }

  fornecedor(event) {
    this.NOME_FORNECEDOR = null;
    this.EMAIL_FORNECEDOR = null;
    if (event.value != null && event.value != "") {
      this.NOME_FORNECEDOR = this.fornecedores_silver.find(item => item.value == event.value).nome;
      this.EMAIL_FORNECEDOR = this.fornecedores_silver.find(item => item.value == event.value).email;
    }
  }


  vernotas(show = true) {
    this.notas = [];
    this.MANMOVMANUTENCAONOTASService.getbyID(this.ID_PEDIDO).subscribe(
      res => {

        for (var x in res) {
          var letra = res[x][1].toString().slice(0, 1);
          this.notas.push({ id: res[x][0].UTZ_CRIA, utilizador: res[x][1], letra: letra, mensagem: res[x][0].DESCRICAO, data: this.formatDateTime(res[x][0].DATA_CRIA) });
        }
        this.notas = this.notas.slice();
        if (show) this.display_notas = true;
      },
      error => {
        console.log(error);
      });


  }

  adicionarnotas() {
    var letra = this.user_nome.slice(0, 1);
    var data = new Date();
    this.insertNOTAS(letra, this.nota, data);

  }

  insertNOTAS(letra, notatxt, data) {
    var nota = new MAN_MOV_MANUTENCAO_NOTAS;

    nota.DATA_CRIA = new Date();
    nota.DESCRICAO = notatxt;
    nota.ESTADO = this.estado;
    nota.ID_MANUTENCAO_CAB = this.ID_PEDIDO;
    nota.UTZ_CRIA = this.user;

    this.MANMOVMANUTENCAONOTASService.create(nota).subscribe(
      res => {
        this.notas.push({ id: this.user, utilizador: this.user_nome, letra: letra, mensagem: notatxt, data: this.formatDateTime(data) });
        this.nota = "";
        this.vernotas(false);
      },
      error => {
        console.log(error);
        this.simular(this.inputerro);
      });
  }

  formatDateTime(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + " " + new Date(date).toLocaleTimeString().slice(0, 8);
  }

  ver_manutencoes(tipo) {
    this.display_manutencoes_pendentes = true;
  }
}
