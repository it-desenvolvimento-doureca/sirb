import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { UploadService } from 'app/servicos/upload.service';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { Location } from '@angular/common';
import { webUrl } from 'assets/config/webUrl';
import * as FileSaver from 'file-saver';
import { MANMOVPEDIDOSService } from 'app/servicos/man-mov-pedidos.service';
import { MAN_MOV_PEDIDOS } from 'app/entidades/MAN_MOV_PEDIDOS';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { MANMOVPEDIDOSDOCUMENTOSService } from 'app/servicos/man-mov-pedidos-documentos.service';
import { MAN_MOV_PEDIDOS_DOCUMENTOS } from 'app/entidades/MAN_MOV_PEDIDOS_DOCUMENTOS';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { MANMOVMANUTENCAOCOMPONENTESService } from 'app/servicos/man-mov-manutencao-componentes.service';
import { MANDICEQUIPASService } from 'app/servicos/man-dic-equipas.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';

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
  btfechar: boolean;
  bteditar: boolean;
  disFechar: boolean;


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
  ficha_manutencao_dados: MAN_MOV_PEDIDOS;
  COMPONENTE: number;
  DESCRICAO_PEDIDO: string;
  ID_RESPONSAVEL: number;
  LOCALIZACAO;
  EQUIPAMENTO: number;
  drop_localizacoes = [];
  drop_componentes = [];
  drop_equipamentos = [];
  drop_utilizadores: any[];
  ID_PEDIDO: number;
  DATA_HORA_PEDIDO: any;


  constructor(private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService
    , private renderer: Renderer, private location: Location, private sanitizer: DomSanitizer,
    private MANMOVPEDIDOSService: MANMOVPEDIDOSService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService,
    private MANMOVPEDIDOSDOCUMENTOSService: MANMOVPEDIDOSDOCUMENTOSService,
    private MANMOVMANUTENCAOCOMPONENTESService: MANMOVMANUTENCAOCOMPONENTESService,
    private MANDICEQUIPASService: MANDICEQUIPASService,
    private MANDICPISOSService: MANDICPISOSService,
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

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar") || urlarray[1].match("view")) {
        this.novo = false;

        var id;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['id'] || 0;
          });

        this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582editar");
        this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582criar");
        this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11582apagar");
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
      this.ID_RESPONSAVEL = this.user;
      this.DATA_HORA_PEDIDO = this.data_CRIA;
    }

    this.carregaDados(false, null);
    if (!this.novo) {
      this.inicia(id);
    }
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
      error => { console.log(error); this.localizacoes(inicia, id); });
    this.localizacoes(inicia, id);
    this.equipamentos(inicia, id);
  }


  localizacoes(inicia, id) {
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

  equipamentos(inicia, id) {

    this.drop_equipamentos = [];
    this.drop_equipamentos.push({ label: 'Sel. Equipamento', value: "" });
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          this.drop_equipamentos.push({
            value: response[x].ID_MANUTENCAO,
            label: response[x].NOME
          });
        }

        this.drop_equipamentos = this.drop_equipamentos.slice();
      },
      error => console.log(error));
  }

  componentes(event, valor = null) {
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
  }


  inicia(id) {

    this.MANMOVPEDIDOSService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {

          for (var x in response) {
            this.data_CRIA = new Date(response[x].DATA_CRIA);
            this.hora_CRIA = new Date(response[x].DATA_CRIA).toLocaleTimeString().slice(0, 5);
            this.utz_CRIA = response[x].UTZ_CRIA;
            this.ficha_manutencao_dados = response[x];

            this.ID_PEDIDO = response[x].ID_PEDIDO;
            this.COMPONENTE = response[x].COMPONENTE;
            this.DESCRICAO_PEDIDO = response[x].DESCRICAO_PEDIDO;
            this.ID_RESPONSAVEL = response[x].ID_RESPONSAVEL;
            this.LOCALIZACAO = response[x].TIPO_LOCALIZACAO + response[x].LOCALIZACAO;
            this.EQUIPAMENTO = response[x].EQUIPAMENTO;
            this.DATA_HORA_PEDIDO = response[x].DATA_HORA_PEDIDO;

            this.estado = response[x].ESTADO;


          }
          this.componentes({ value: this.EQUIPAMENTO }, this.COMPONENTE);
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


  gravar(fechar = false) {

    var ficha_manutencao = new MAN_MOV_PEDIDOS;

    if (!this.novo) ficha_manutencao = this.ficha_manutencao_dados;

    if (this.novo) ficha_manutencao.DATA_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    if (this.novo) ficha_manutencao.UTZ_CRIA = this.utz_CRIA;




    ficha_manutencao.ATIVO = true;
    ficha_manutencao.COMPONENTE = this.COMPONENTE;
    ficha_manutencao.DESCRICAO_PEDIDO = this.DESCRICAO_PEDIDO;
    ficha_manutencao.ID_RESPONSAVEL = this.ID_RESPONSAVEL;
    ficha_manutencao.LOCALIZACAO = this.LOCALIZACAO.substring(1);
    ficha_manutencao.TIPO_LOCALIZACAO = this.LOCALIZACAO.charAt(0);
    ficha_manutencao.EQUIPAMENTO = this.EQUIPAMENTO;
    ficha_manutencao.DATA_HORA_PEDIDO = this.DATA_HORA_PEDIDO;

    ficha_manutencao.UTZ_ULT_MODIF = this.user;
    ficha_manutencao.DATA_ULT_MODIF = new Date();
    ficha_manutencao.ESTADO = this.estado;


    if (this.novo) {

      //console.log(ficha_manutencao)
      ficha_manutencao.ESTADO = "P";
      this.MANMOVPEDIDOSService.create(ficha_manutencao).subscribe(
        res => {
          this.gravarTabelaFicheiros(res.ID_PEDIDO);
        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      ficha_manutencao.ID_PEDIDO = id;
      //console.log(ficha_manutencao)
      this.MANMOVPEDIDOSService.update(ficha_manutencao).then(
        res => {
          this.gravarTabelaFicheiros(id);
          //this.gravarTabelaStocks(id);
        },
        error => { console.log(error); this.simular(this.inputerro); });

    }

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
              this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
            } else {
              this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
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
          this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id, redirect: back } });
        } else {
          this.router.navigate(['lista_pedidos/view'], { queryParams: { id: id } });
        }
        this.simular(this.inputgravou);
      }
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
        var ficha_manutencao = new MAN_MOV_PEDIDOS;

        ficha_manutencao = this.ficha_manutencao_dados;

        ficha_manutencao.UTZ_ULT_MODIF = this.user;
        ficha_manutencao.DATA_ULT_MODIF = new Date();
        ficha_manutencao.ATIVO = false;
        ficha_manutencao.ESTADO = "R";

        this.MANMOVPEDIDOSService.update(ficha_manutencao).then(
          res => {
            this.router.navigate(['lista_pedidos']);
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

  gravarTabelaFicheiros2(ficheiros: MAN_MOV_PEDIDOS_DOCUMENTOS, count, total, id) {

    this.MANMOVPEDIDOSDOCUMENTOSService.update(ficheiros).then(
      res => {
        if (count == total && this.novo) {

        } else if (!this.novo) {
          this.uploadedFiles.push({
            data: res,
            data_CRIA: ficheiros.DATA_CRIA, ficheiro: ficheiros.FICHEIRO_1 + ficheiros.FICHEIRO_2,
            utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.DATA_CRIA) + " " + new Date(ficheiros.DATA_CRIA).toLocaleTimeString(), id_FICHEIRO: null,
            id: res.id, name: ficheiros.NOME, datatype: ficheiros.DATATYPE, src: ficheiros.CAMINHO, type: ficheiros.TIPO, size: ficheiros.TAMANHO, descricao: ficheiros.DESCRICAO
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
    this.location.back();
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

}
