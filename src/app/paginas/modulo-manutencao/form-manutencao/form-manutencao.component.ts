import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { MANDICEQUIPASService } from 'app/servicos/man-dic-equipas.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { UploadService } from 'app/servicos/upload.service';
import { Location } from '@angular/common';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { MANMOVMANUTENCAOCOMPONENTESService } from 'app/servicos/man-mov-manutencao-componentes.service';
import { MAN_MOV_MANUTENCAO_CAB } from 'app/entidades/MAN_MOV_MANUTENCAO_CAB';
import { MAN_MOV_PEDIDOS_DOCUMENTOS } from 'app/entidades/MAN_MOV_PEDIDOS_DOCUMENTOS';

import { MANMOVPEDIDOSDOCUMENTOSService } from 'app/servicos/man-mov-pedidos-documentos.service';
import { GERFORNECEDORService } from 'app/servicos/ger-fornecedor.service';
import { MANDICAMBITOSService } from 'app/servicos/man-dic-ambitos.service';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { MAN_MOV_MANUTENCAO_NOTAS } from 'app/entidades/MAN_MOV_MANUTENCAO_NOTAS';
import { MANMOVMANUTENCAONOTASService } from 'app/servicos/man-mov-manutencao-notas.service';
import { MANMOVMANUTENCAOOPERARIOSService } from 'app/servicos/man-mov-manutencao-operarios.service';
import { MANMOVMANUTENCAOACCOESService } from 'app/servicos/man-mov-manutencao-accoes.service';
import { MAN_MOV_MANUTENCAO_ACCOES } from 'app/entidades/MAN_MOV_MANUTENCAO_ACCOES';


@Component({
  selector: 'app-form-manutencao',
  templateUrl: './form-manutencao.component.html',
  styleUrls: ['./form-manutencao.component.css']
})
export class FormManutencaoComponent implements OnInit {

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


  REFERENTE_EQUIPAMENTO = 'N';
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;

  @Output()
  onDialogClose: EventEmitter<any> = new EventEmitter();

  srcelement;
  nomeficheiro: any;
  type: string;
  display: boolean;
  ficha_manutencao_dados: MAN_MOV_MANUTENCAO_CAB;
  COMPONENTE: number;
  ID_PEDIDO;
  DESCRICAO_PEDIDO: string = null;
  NOTAS_PLANEAMENTO: string = null;
  ID_RESPONSAVEL: number;
  LOCALIZACAO;
  EQUIPAMENTO: number;
  drop_localizacoes = [];
  drop_componentes = [];
  drop_equipamentos = [];
  drop_utilizadores: any[];
  @Input() ID_PEDIDO_INPUT: number;
  DATA_HORA_PEDIDO: any;
  TIPO_RESPONSAVEL: string;
  AMBITO_MANUTENCAO: number;
  STATUS_MAQUINA: string;
  UTILIZADOR;
  ID_EQUIPA;
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
  displayMotivoRejeicao: boolean;
  mototivoRejeicao: string;
  validacao2: boolean = false;
  validacao1: boolean = false;
  lista_manutencoes_pendentes: any[] = [];
  display_manutencoes_pendentes: boolean = false;
  estadoRejeitado: string;
  estado_texto: string;
  OBSERVACOES: string;
  operarios: any[];
  acoes: any[];

  mensagemtabela: string = 'Nenhum Registo foi encontrado...';
  cols = [];
  displayCriarmanutencao: boolean;
  constructor(private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService
    , private renderer: Renderer, private location: Location, private sanitizer: DomSanitizer,
    private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService,
    private MANMOVPEDIDOSDOCUMENTOSService: MANMOVPEDIDOSDOCUMENTOSService,
    private MANMOVMANUTENCAOCOMPONENTESService: MANMOVMANUTENCAOCOMPONENTESService,
    private MANDICEQUIPASService: MANDICEQUIPASService,
    private MANDICPISOSService: MANDICPISOSService,
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

    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];



    this.novo = true;
    this.modoedicao = true;

    this.data_CRIA = new Date();
    this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
    this.utz_CRIA = this.user;
    this.ID_RESPONSAVEL = this.user;
    this.DATA_HORA_PEDIDO = this.data_CRIA;

    this.getacessoresponsavel(this.ID_PEDIDO_INPUT);
    if (this.ID_PEDIDO_INPUT != null) this.inicia(this.ID_PEDIDO_INPUT);
    //this.carregaDados(false, id);

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
          this.drop_utilizadores.push({ label: ((response[x].cod_UTZ == null) ? '' : response[x].cod_UTZ) + ' - ' + response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
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
      error => {
        console.log(error);
        this.listar_equipas(id);
      });
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

  fornecedor(event) {
    this.NOME_FORNECEDOR = null;
    this.EMAIL_FORNECEDOR = null;
    if (event.value != null && event.value != "") {
      this.NOME_FORNECEDOR = this.fornecedores_silver.find(item => item.value == event.value).nome;
      this.EMAIL_FORNECEDOR = this.fornecedores_silver.find(item => item.value == event.value).email;
    }
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
      //this.validaManutencoesPendentes('L', event.value)
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
      error => { console.log(error); this.fornecedores(id) });
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
      //this.validaManutencoesPendentes('E', event.value)
    } else {
      this.validacao2 = false;
    }
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
            this.ID_PEDIDO = id;
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

          }
          this.componentes({ value: this.EQUIPAMENTO }, this.COMPONENTE, true);
          this.getEquipamentos({ value: this.LOCALIZACAO }, this.EQUIPAMENTO);
          this.carregatabelaFiles(id);

        }

      }, error => { console.log(error); });

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
      //ficheiros.ID_PEDIDO = this.ID_PEDIDO;
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



  gravar(planear = false, submeter = false) {

    if (this.submetergravar) { submeter = this.submetergravar }

    var ficha_manutencao = new MAN_MOV_MANUTENCAO_CAB;

    if (!this.novo) ficha_manutencao = this.ficha_manutencao_dados;

    if (this.novo) ficha_manutencao.DATA_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    if (this.novo) ficha_manutencao.UTZ_CRIA = this.utz_CRIA;
    if (this.novo) ficha_manutencao.TIPO_MANUTENCAO = 'MM';

    if (this.REFERENTE_EQUIPAMENTO = 'N') {
      this.EQUIPAMENTO == null
      this.COMPONENTE == null
    }


    //ficha_manutencao.ATIVO = true;
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
    ficha_manutencao.ID_ORIGEM = this.ID_PEDIDO_INPUT;

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


    ficha_manutencao.ESTADO = "PE";
    if ((this.UTILIZADOR == null && this.ID_EQUIPA == null && this.NOME_FORNECEDOR == null)) {
      ficha_manutencao.ESTADO = "PE";
    } else if ((this.UTILIZADOR != null || this.ID_EQUIPA != null || this.NOME_FORNECEDOR != null)) {
      ficha_manutencao.ESTADO = "P";
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


    this.MANMOVMANUTENCAOCABService.create(ficha_manutencao).subscribe(
      res => {
        if (ficha_manutencao.ESTADO == "P") this.cria_MANUTENCAO(res.ID_MANUTENCAO_CAB, res.EQUIPAMENTO);
        this.gravarTabelaFicheiros(res.ID_MANUTENCAO_CAB);

        this.criarHISTORICO(res.ID_MANUTENCAO_CAB, 'Criou Nova Manutenção de Melhoria no estado ' + this.getestado(ficha_manutencao.ESTADO) + '.');


      },
      error => { console.log(error); this.simular(this.inputerro); });


  }

  closeDialog() {
    this.onDialogClose.emit();
  }

  criarHISTORICO(id, MOTIVO) {
    this.MANMOVMANUTENCAOCABService.MAN_MOV_MANUTENCAO_CREATE_HISTORICO([{ ID_OPERARIO: this.user, ID_MANUTENCAO_CAB: id, MOTIVO: MOTIVO }]).subscribe(
      res => {
      },
      error => { console.log(error); });
  }

  /*criaSTATUS_MAQUINA(ID_PEDIDO, ID_EQUIPAMENTO) {
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
  }*/

  cria_MANUTENCAO(id, id_equipamento) {
    /*this.MANMOVMANUTENCAOCABService.MAN_CRIAR_MANUTENCOES_CORRETIVAS([{ ID_PEDIDO: id, POSICAO: null }]).subscribe(
      res => {
        if (this.STATUS_MAQUINA == 'P') {
          //this.criaSTATUS_MAQUINA(id, id_equipamento);
        }
        this.inicia(id);
      },
      error => { console.log(error); this.simular(this.inputerro); });*/
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
            //this.router.navigate(['lista_pedidos_melhoria/editar'], { queryParams: { id: id } });
            this.closeDialog();

            this.simular(this.inputnotifi);
          } else {
            this.closeDialog();
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
        this.closeDialog();
      } else {
        this.closeDialog();
        this.simular(this.inputgravou);
      }
    }

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
    if (((this.TIPO_RESPONSAVEL == 'U' && this.UTILIZADOR != null && this.UTILIZADOR != '')
      || (this.TIPO_RESPONSAVEL == 'E' && this.ID_EQUIPA != null && this.ID_EQUIPA != '')
      || (this.TIPO_RESPONSAVEL == 'EX' && this.NOME_FORNECEDOR != null && this.NOME_FORNECEDOR != ''))) {
      this.submetergravar = false;
      this.simular(this.buttongravar);
    } else {
      this.showMessage('error', 'Erro', 'É necessário selecionar um Utilizador/Equipa/Externo.');
    }
  }

  btgravar2() {
    this.submetergravar = true;
    this.simular(this.buttongravar);
  }


  gravarTabelaFicheiros2(ficheiros: MAN_MOV_PEDIDOS_DOCUMENTOS, count, total, id) {

    this.MANMOVPEDIDOSDOCUMENTOSService.update(ficheiros).subscribe(
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


  sendemail(N_PEDIDO, DESCRICAO_PEDIDO, DATA_HORA_PEDIDO, EQUIPAMENTO, LOCALIZACAO, EQUIPA_UTILIZADOR, EMAIL_PARA, RESPONSAVEL_PEDIDO) {


    var dados = "{N_PEDIDO::" + N_PEDIDO +
      "\n/link::" + webUrl.host + '/#/lista_pedidos_melhoria/view?id=' + N_PEDIDO +
      "\n/DESCRICAO_PEDIDO::" + ((DESCRICAO_PEDIDO == null) ? '' : DESCRICAO_PEDIDO) +
      "\n/DATA_HORA_PEDIDO::" + DATA_HORA_PEDIDO +
      "\n/EQUIPAMENTO::" + EQUIPAMENTO +
      "\n/LOCALIZACAO::" + LOCALIZACAO +
      "\n/RESPONSAVEL_PEDIDO::" + RESPONSAVEL_PEDIDO +
      "\n/EQUIPA_UTILIZADOR::" + EQUIPA_UTILIZADOR + "}";

    var MOMENTO = "NOVO PEDIDO MELHORIA";


    var data = [{ MODULO: 14, MOMENTO: MOMENTO, PAGINA: "PEDIDO MELHORIA", FICHEIROS: null, ESTADO: true, DADOS: dados, EMAIL_PARA: EMAIL_PARA }];



    this.UploadService.verficaEventos(data).subscribe(result => {


    }, error => {
      console.log(error);

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

  showMessage(severity, summary, detail) {
    var msgs = [];
    msgs.push({ severity: severity, summary: summary, detail: detail });
    this.UploadService.addMessage(msgs);
  }

}
