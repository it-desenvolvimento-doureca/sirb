import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { FINANALISEDIVIDASService } from 'app/servicos/fin-analise-dividas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { webUrl } from 'assets/config/webUrl';
import { UploadService } from 'app/servicos/upload.service';
import * as FileSaver from 'file-saver';
import { FIN_REGISTO_ACOES } from 'app/entidades/FIN_REGISTO_ACOES';
import { FINREGISTOACOESService } from 'app/servicos/fin-registo-acoes.service';
import { FIN_DIC_CLIENTES } from 'app/entidades/FIN_DIC_CLIENTES';
import { FINDICCLIENTESService } from 'app/servicos/fin-dic-clientes.service';
import { EMAIL } from 'app/entidades/EMAIL';
import { GEREVENTOSCONFService } from 'app/servicos/ger-eventos-conf.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { FINDOCACORDOService } from 'app/servicos/fin-doc-acordo.service';
import { FIN_DOC_ACORDO } from 'app/entidades/FIN_DOC_ACORDO';
import { EmailService } from 'app/servicos/email.service';
import { FIN_DIVIDAS_ATIVIDADE } from 'app/entidades/FIN_DIVIDAS_ATIVIDADE';
import { FINDIVIDASATIVIDADEService } from 'app/servicos/fin-dividas-atividade.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  btcriar = true;
  bteditar = true;
  btAcordo = true;
  btEnviarAcao = true;
  btgerarAviso = true;
  btexportar = true;
  btanterior = true;
  btseguinte = true;
  btvoltar = true;
  btbloquear = true;

  disExportar;
  disgerarAviso;
  disEnviarAcao;
  disAcordo;
  disEditar;
  disCriar;
  i: any;
  clientes = [];
  ativobt = "1";
  ativolista = "1"
  kam;
  numero_cliente;
  nome;
  funcao_1;
  funcao_2;
  nome_1;
  nome_2;
  email_1;
  email_2;
  tlm_1;
  tlm_2;
  total_divida = 0;
  total_divida_vencida = 0;
  valor_acordo = 0;
  prazo_medio_pagamentos = 0;
  prazo_medio_atraso = 0;
  modoedicao: boolean;
  novo: boolean;
  user: any;
  user_nome: any;
  adminuser: any;
  selected_documentos = [];
  tabela_documentos: any[];
  mensagemtabela: string;
  selected_d = null;
  tabela_acoes: any[];
  mensagemtabela_acoes: string;
  selected_acoes: any = null;
  srcelement;
  nomeficheiro: any;
  type: any;
  display: boolean;

  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerroenvio') inputerroenvio: ElementRef;
  @ViewChild('inputenvio') inputenvio: ElementRef;

  dados: FIN_REGISTO_ACOES = new FIN_REGISTO_ACOES();
  nome_utilizador: any;
  alerta_data: any;
  alerta_hora: any;
  dialognovo: boolean;
  totaltabela_1 = 0;
  totaltabela_2 = 0;
  totaltabela_3 = 0;
  totaltabela_4 = 0;
  totaltabela_5 = 0;
  totaltabela_6 = 0;
  id_cliente: any;
  displayverificar: boolean;
  mensagem_verifica: string;
  display_envia_kam: boolean;
  bt_disable: boolean;
  email_DE: any;
  email_KAM: any;
  email_para: any;
  mensagem_email: any;
  email_assunto: any;
  display_envia_contacto: boolean;
  bt_disable2: boolean;
  email_para_1: any;
  email_para_2: any;
  selected_email: number;
  removerAcordo: boolean;
  disBloquear: boolean;
  bloqueado: any;
  mensagemtabela_historico: string;
  tabela_historico: any[];
  idioma: string = "PT";
  idiomas = [{ value: 'PT', label: 'Português' }, { value: 'ENG', label: 'Inglês' }, { value: 'FR', label: 'Francês' }];
  displaytipo_aviso: boolean;
  tipo_aviso = 0;
  tabela_linhas_documentos: any[];
  display_linhas_documentos: boolean;

  constructor(private GEREVENTOSCONFService: GEREVENTOSCONFService, private RelatoriosService: RelatoriosService, private FINDOCACORDOService: FINDOCACORDOService,
    private FINDICCLIENTESService: FINDICCLIENTESService, private FINREGISTOACOESService: FINREGISTOACOESService, private renderer: Renderer, private FINDIVIDASATIVIDADEService: FINDIVIDASATIVIDADEService,
    private UploadService: UploadService, private sanitizer: DomSanitizer, private FINANALISEDIVIDASService: FINANALISEDIVIDASService, private EmailService: EmailService,
    private location: Location, private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.btanterior = true;
    this.btseguinte = true;
    this.btseguinte = true;
    this.btcriar = true;;
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

      //preenche array para navegar 
      var data = [{ CLIENTE: null }];
      this.FINANALISEDIVIDASService.GET_DIVIDAS_CLIENTES(data).subscribe(
        response => {
          this.clientes = [];
          var count = Object.keys(response).length;
          if (count > 0) {
            for (var x in response) {
              this.clientes.push(response[x][0]);
            }
          } else {
            this.clientes.push(id);
          }
          if (this.clientes.indexOf(id) < 0) { this.clientes.push(id); }
          this.i = this.clientes.indexOf(id);
          //this.carregaDados(true, this.reclamacoes[this.i]);

        }, error => { console.log(error); });


      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603criar");
      this.disAcordo = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603acordo");
      this.disEnviarAcao = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603EnviarAcao");
      this.disExportar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603Exportar");
      this.disgerarAviso = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603GerarAviso");
      this.disBloquear = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1603Bloquear");
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.btseguinte = false;
        this.btanterior = false;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {


      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = true;
      } else if (urlarray[1].match("duplicar")) {

      }

    }

    this.inicia(id);
  }



  inicia(id, dados = true) {
    var data = [{ CLIENTE: id }];
    this.FINANALISEDIVIDASService.GET_DIVIDAS_CLIENTES(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.kam = response[0][0];
          this.numero_cliente = response[0][1];
          this.nome = response[0][2];
          this.bloqueado = response[0][18];
          this.funcao_1 = response[0][10];
          this.funcao_2 = response[0][14];
          this.nome_1 = response[0][11];
          this.nome_2 = response[0][15];
          this.email_1 = response[0][12];
          this.email_2 = response[0][16];
          this.tlm_1 = response[0][13];
          this.tlm_2 = response[0][17];
          this.id_cliente = response[0][9];
          this.total_divida = response[0][4];
          this.total_divida_vencida = response[0][3];
          this.valor_acordo = response[0][5];
          this.prazo_medio_pagamentos = response[0][6];
          this.prazo_medio_atraso = response[0][7];
          this.email_KAM = response[0][8];
          if (dados) {
            this.listar_documentos(id);
            this.listar_acoes(id);
          }
          this.lista_Historico(id);
        }
      }, error => { console.log(error); });
  }

  lista_Historico(id) {
    this.mensagemtabela_historico = "A Carregar...";
    this.FINDIVIDASATIVIDADEService.getbyid(id).subscribe(response => {
      this.tabela_historico = [];
      var count = Object.keys(response).length;
      if (count == 0) {
        this.mensagemtabela_historico = "Nenhum Registo foi encontrado...";
      }
      for (var x in response) {

        this.tabela_historico.push({
          id: response[x][0].id,
          data: this.formatDate(response[x][0].data_CRIA),
          utilizador: response[x][1],
          descricao: response[x][0].descricao,

        });

      }
      this.tabela_acoes = this.tabela_acoes.slice();
    },
      error => console.log(error));
  }

  listar_acoes(id) {
    this.tabela_acoes = [];

    var count = 0;
    this.mensagemtabela_acoes = "A Carregar...";

    this.FINREGISTOACOESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela_acoes = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          var array = {
            id_ACAO: response[x][0],
            id_CLIENTE: response[x][1],
            data_CRIA: response[x][2],
            utz_CRIA: response[x][3],
            contacto: response[x][4],
            gerar_ALERTA: response[x][5],
            alerta_GERADO: response[x][6],
            origem: response[x][7],
            descricao: response[x][8],
            tamanho_FICHEIRO: response[x][9],
            nome_FICHEIRO: response[x][10],
            datatype_FICHEIRO: response[x][11],
            type_FICHEIRO: response[x][12],
            ficheiro: null,
            ficheiro_2: null
          };

          this.tabela_acoes.push({
            dados: array,
            id: response[x][0],
            data_acao: this.formatDate(response[x][2]),
            utilizador: response[x][13],
            descricao: response[x][8],
            descricao_pequena: (response[x][8] == null) ? '' : response[x][8].substring(0, 25),
            contacto: response[x][4],
            origem: response[x][7],
            alerta_data_hora: (response[x][5] == null) ? null : this.formatDate(response[x][5]) + ' ' + new Date(response[x][5]).toLocaleTimeString().slice(0, 5),
            gerar_ALERTA: response[x][5],
            nome_ficheiro: response[x][10],
            //ficheiro: response[x][0].ficheiro + response[x][0].ficheiro_2,
            ficheiro: null,
            datatype: response[x][11],
            type: response[x][12],
            size: response[x][9],
            apagarficheiros: (this.adminuser || this.user == response[x][3]) ? false : true
          });

        }
        this.tabela_acoes = this.tabela_acoes.slice();

      },
      error => console.log(error));
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  listar_documentos(id) {
    this.tabela_documentos = [];

    var count = 0;
    this.mensagemtabela = "A Carregar...";
    var data = [{ CLIENTE: id }];
    this.FINANALISEDIVIDASService.GET_DIVIDAS_FICHA(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          if (parseInt(x) == 0) {
            this.totaltabela_1 = response[x][10];
            this.totaltabela_2 = response[x][11];
            this.totaltabela_3 = response[x][12];
            this.totaltabela_4 = response[x][13];
            this.totaltabela_5 = response[x][14];
            this.totaltabela_6 = response[x][15];
          }

          this.tabela_documentos.push({
            numero_documento: response[x][0],
            data_documento: response[x][1],
            data_vencimento: response[x][2],
            dias_mora: response[x][3],
            nao_vencido: response[x][4],
            menos_31_dias: response[x][5],
            entre_31_60: response[x][6],
            entre_62_90: response[x][7],
            maior_91_dias: response[x][8],
            acordo: response[x][9],
            documento: response[x][16],
            id_ACORDO: response[x][17],
            checked: false,
            ID_CAB_DOC: response[x][18],
          });

        }
        this.tabela_documentos = this.tabela_documentos.slice();

      },
      error => console.log(error));
  }

  selectt_d(valor) {

    if (valor == this.selected_d) {
      valor = null;
    }

    this.removerAcordo = false;
    this.selected_documentos = [];
    var encontrou = false;
    if (valor == null) {
      for (var x in this.tabela_documentos) {
        this.tabela_documentos[x].checked = false;
      }
      setTimeout(() => {
        this.selected_d = null;
      }, 50);
    } else {
      for (var x in this.tabela_documentos) {
        if (valor == "T") {
          this.selected_documentos.push(this.tabela_documentos[x]);
          this.tabela_documentos[x].checked = true;
          if (this.tabela_documentos[x].id_ACORDO != null) {
            encontrou = true;
          }
        } else {
          if (this.tabela_documentos[x].acordo == 0 && this.tabela_documentos[x].nao_vencido == 0) {
            this.selected_documentos.push(this.tabela_documentos[x]);
            this.tabela_documentos[x].checked = true;
          } else {
            this.tabela_documentos[x].checked = false;
          }
          if (this.tabela_documentos[x].id_ACORDO != null) {
            encontrou = true;
          }
        }
      }

      if (encontrou) {
        this.removerAcordo = true;
      } else {
        this.removerAcordo = false;
      }
    }
  }

  bloquear() {
    this.confirmationService.confirm({
      message: 'Bloquear Cliente?',
      header: 'Aviso',
      icon: 'fa fa-exclamation-triangle',
      accept: () => {
        this.alterar_estado_cliente(true, "Bloqueado");
      }
    });
  }

  desbloquear() {
    this.confirmationService.confirm({
      message: 'Desbloquear Cliente?',
      header: 'Aviso',
      icon: 'fa fa-exclamation-triangle',
      accept: () => {
        this.alterar_estado_cliente(false, "Desbloqueado");
      }
    });
  }

  alterar_estado_cliente(bloqueado, estado) {
    var contacto = new FIN_DIC_CLIENTES();
    contacto.id = this.id_cliente;
    contacto.id_CLIENTE = this.numero_cliente;
    contacto.funcao_1 = this.funcao_1;
    contacto.bloqueado = bloqueado;
    contacto.nome_1 = this.nome_1;
    contacto.email_1 = this.email_1;
    contacto.tlm_1 = this.tlm_1;
    contacto.funcao_2 = this.funcao_2;
    contacto.nome_2 = this.nome_2;
    contacto.email_2 = this.email_2;
    contacto.tlm_2 = this.tlm_2;
    contacto.data_MODIF = new Date();
    contacto.utz_MODIF = this.user;

    this.FINDICCLIENTESService.update(contacto).then(
      res => {
        this.simular(this.inputgravou);
        this.insereatividade("Alterou estado do Cliente para " + estado);
        this.inicia(this.numero_cliente, false);
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }


  gravardados_contactos() {
    var contacto = new FIN_DIC_CLIENTES();
    contacto.id = this.id_cliente;
    contacto.id_CLIENTE = this.numero_cliente;
    contacto.funcao_1 = this.funcao_1;
    contacto.bloqueado = false;
    contacto.nome_1 = this.nome_1;
    contacto.email_1 = this.email_1;
    contacto.tlm_1 = this.tlm_1;
    contacto.funcao_2 = this.funcao_2;
    contacto.nome_2 = this.nome_2;
    contacto.email_2 = this.email_2;
    contacto.tlm_2 = this.tlm_2;
    contacto.data_MODIF = new Date();
    contacto.utz_MODIF = this.user;

    this.FINDICCLIENTESService.update(contacto).then(
      res => {
        this.simular(this.inputgravou);
        this.insereatividade("Atualizou Dados Contactos");
        this.router.navigate(['analise_dividas/view'], { queryParams: { id: this.numero_cliente } });
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  novaAcao() {
    this.novo = true;
    this.dados = new FIN_REGISTO_ACOES();
    this.dados.data_CRIA = new Date();
    this.dados.id_CLIENTE = this.numero_cliente;
    this.dados.utz_CRIA = this.user;
    this.nome_utilizador = this.user_nome;
    this.alerta_data = null;
    this.alerta_hora = null;
    this.dados.origem = "";
    for (var x in this.selected_documentos) {
      if (parseInt(x) == 0) {
        this.dados.origem += this.selected_documentos[x].numero_documento;
      } else {
        this.dados.origem += ';' + this.selected_documentos[x].numero_documento;
      }
    }

    this.dialognovo = true;
  }


  abrir(event) {
    //console.log(event)
    this.dados = event.data.dados;

    if (event.data.ficheiro == null) {
      this.FINREGISTOACOESService.getbyidFICHEIRO(event.data.id).subscribe(
        (res) => {
          if (res[0][0] != null) this.dados.ficheiro = res[0][0] + res[0][1];
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {
      this.dados.ficheiro = event.data.ficheiro;
    }
    this.novo = false;


    this.dados.data_CRIA = new Date(event.data.dados.data_CRIA);
    this.nome_utilizador = event.data.utilizador;
    this.alerta_data = (event.data.gerar_ALERTA == null) ? null : new Date(event.data.gerar_ALERTA);
    this.alerta_hora = (event.data.gerar_ALERTA == null) ? null : new Date(event.data.gerar_ALERTA).toLocaleTimeString().slice(0, 5);

    this.dialognovo = true;
  }

  gravardados() {
    var acao = new FIN_REGISTO_ACOES();
    acao = this.dados;
    if (this.dados.ficheiro) {
      var ficheiro = this.dados.ficheiro;
      acao.ficheiro = ficheiro.substr(0, ficheiro.length / 2);
      acao.ficheiro_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
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

    acao.gerar_ALERTA = data;

    this.FINREGISTOACOESService.update(acao).then(
      res => {
        this.dialognovo = false;
        this.listar_acoes(this.numero_cliente);
        if (this.novo) {
          this.insereatividade("Criou Ação");
        } else {
          this.insereatividade("Atualizou Ação");
        }
      },
      error => { console.log(error); });
    //console.log(this.dados)
    //alerta_data
    //alerta_hora
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var data = new Date();

      let file: File = fileList[0];

      this.dados.nome_FICHEIRO = file.name;
      this.dados.tamanho_FICHEIRO = file.size;
      this.dados.datatype_FICHEIRO = file.type;



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
      this.dados.type_FICHEIRO = type;

      // var nome = this.formatDate();
      /* this.UploadService.fileChange(file, nome).subscribe(result => {*/


      //this.fileselectinput[id].src = nome + '.' + tipo[1];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (event2: Event) => {
        // you can perform an action with readed data here
        this.dados.ficheiro = myReader.result.toString();

      }

      myReader.readAsDataURL(file);

      /*}, error => {
        console.log(error);
      });*/


    }
  }

  removerficheirotabela(index) {
    this.tabela_acoes[index].nome_ficheiro = null;
    this.tabela_acoes[index].tamanho = null;
    this.tabela_acoes[index].datatype = null;
    this.tabela_acoes[index].ficheiro = null;
    this.tabela_acoes[index].type = null;
    this.tabela_acoes[index].dados.nome_FICHEIRO = null;
    this.tabela_acoes[index].dados.tamanho_FICHEIRO = null;
    this.tabela_acoes[index].dados.datatype_FICHEIRO = null;
    this.tabela_acoes[index].dados.ficheiro = null;
    this.tabela_acoes[index].dados.ficheiro_2 = null;
    this.tabela_acoes[index].dados.type_FICHEIRO = null;
    var acao = new FIN_REGISTO_ACOES();
    acao = this.tabela_acoes[index].dados;
    this.FINREGISTOACOESService.update(acao).then(
      res => {
        //this.insereatividade("Removeu Ficheiro");
      },
      error => { console.log(error); });
  }


  removerficheirotabela_dados() {
    var acao = new FIN_REGISTO_ACOES();
    acao = this.dados;
    acao.ficheiro = this.dados.ficheiro.substr(0, this.dados.ficheiro.length / 2);
    acao.ficheiro_2 = this.dados.ficheiro.substr(this.dados.ficheiro.length / 2, this.dados.ficheiro.length);
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

    acao.gerar_ALERTA = data;

    this.FINREGISTOACOESService.update(acao).then(
      res => {
        this.dialognovo = false;
        this.listar_acoes(this.numero_cliente);
        if (this.novo) {
          this.insereatividade("Criou Ação");
        } else {
          this.insereatividade("Atualizou Ação");
        }
      },
      error => { console.log(error); });
    //console.log(this.dados)
    //alerta_data
    //alerta_hora
  }

  removerficheiro() {
    this.dados.nome_FICHEIRO = null;
    this.dados.tamanho_FICHEIRO = null;
    this.dados.datatype_FICHEIRO = null;
    this.dados.ficheiro = null;
    this.dados.ficheiro_2 = null;
    this.dados.type_FICHEIRO = null;
  }

  Changeselected_documentos(event, data) {


    /* if (data.id_ACORDO != null && this.selected_documentos.length == 0) {
       this.removerAcordo = true;
     } else if (data.id_ACORDO != null && this.selected_documentos.length != 0) {
 
     }
 
     if (this.removerAcordo && data.id_ACORDO == null) {
 
     }*/
    var encontrou = false;
    for (var x in this.selected_documentos) {
      if (this.selected_documentos[x].id_ACORDO != null) {
        encontrou = true;
      }
    }

    if (encontrou) {
      this.removerAcordo = true;
    } else {
      this.removerAcordo = false;
    }
  }


  RemoverAcordo() {
    if (this.selected_documentos.length == 0) {
      this.displayverificar = true;
      this.mensagem_verifica = "É necessário selecionar documentos.";
    } else {
      this.confirmationService.confirm({
        message: 'Remover Acordo para Documentos Selecionados?',
        header: 'Aviso',
        icon: 'fa fa-exclamation-triangle',
        accept: () => {
          for (var x in this.selected_documentos) {
            if (this.selected_documentos[x].id_ACORDO != null) {
              this.removeACORDO(this.selected_documentos[x].id_ACORDO, this.selected_documentos.length, parseInt(x) + 1)
            } else {
              if (this.selected_documentos.length == parseInt(x) + 1) this.simular(this.inputgravou);
            }
          }
          this.insereatividade("Removeu Acordo(s)");
          this.listar_documentos(this.numero_cliente);
        }


      });
    }

  }

  removeACORDO(id, total, index) {
    this.FINDOCACORDOService.delete(id).then(
      res => {
        if (total == index) this.simular(this.inputgravou);
      },
      error => { console.log(error); });
  }

  Acordo() {
    if (this.selected_documentos.length == 0) {
      this.displayverificar = true;
      this.mensagem_verifica = "É necessário selecionar documentos.";
    } else {

      this.confirmationService.confirm({
        message: 'Gerar Acordo para Documentos Selecionados?',
        header: 'Aviso',
        icon: 'fa fa-exclamation-triangle',
        accept: () => {
          for (var x in this.selected_documentos) {
            if (this.selected_documentos[x].documento == null) {
              var doc_acordo = new FIN_DOC_ACORDO();
              doc_acordo.documento = this.selected_documentos[x].numero_documento;
              doc_acordo.id_CLIENTE = this.numero_cliente;
              doc_acordo.id = null;
              this.insertACORDO(doc_acordo, this.selected_documentos.length, parseInt(x) + 1)
            } else {
              if (this.selected_documentos.length == parseInt(x) + 1) this.simular(this.inputgravou);
            }
          }
          this.insereatividade("Gerou Acordo(s)");
          this.listar_documentos(this.numero_cliente);
        }

      });

    }

  }

  insertACORDO(doc_acordo, total, index) {
    this.FINDOCACORDOService.update(doc_acordo).then(
      res => {
        if (total == index) this.simular(this.inputgravou);
      },
      error => { console.log(error); });
  }

  EnviarAcao() {
    if (this.selected_documentos.length == 0 || this.selected_acoes == null) {
      this.displayverificar = true;
      if (this.selected_documentos.length == 0) {
        this.mensagem_verifica = "É necessário selecionar documentos.";
      } else {
        this.mensagem_verifica = "É necessário selecionar uma Ação.";
      }
    } else {
      this.GEREVENTOSCONFService.getbyID(32).subscribe(
        response => {

          var acao = this.selected_acoes;

          this.texto_mensagem(response[0][0].email_MENSAGEM, response[0][0].email_ASSUNTO, this.kam, this.numero_cliente, this.nome,
            acao.data_acao, acao.utilizador, acao.descricao, acao.contacto, acao.origem);
          this.bt_disable = false;
          this.email_para = this.email_KAM;
          this.email_DE = "tiago.pereira@xpertgo.pt";

          this.display_envia_kam = true;
        },
        error => { console.log(error); });
    }

  }

  texto_mensagem(email_mensagem, email_assunto1, KAM, NUMERO_CLIENTE, NOME_CLIENTE, DATA_ACAO, UTILIZADOR, DESCRICAO_ACAO, CONTACTO, ORIGEM) {
    var campos = [
      , { id: "KAM", valor: KAM },
      , { id: "N_CLIENTE", valor: NUMERO_CLIENTE },
      , { id: "NOME_CLIENTE", valor: NOME_CLIENTE },
      , { id: "DATA_ACAO", valor: DATA_ACAO },
      , { id: "UTILIZADOR", valor: UTILIZADOR },
      , { id: "DESCRICAO_ACAO", valor: DESCRICAO_ACAO },
      , { id: "CONTACTO", valor: CONTACTO },
      , { id: "ORIGEM", valor: ORIGEM }
    ];

    if ((email_assunto1 != "" && email_assunto1 != null) || (email_mensagem != "" && email_mensagem != null) && campos.length > 0) {
      var email_mens = email_mensagem;
      var email_assunto = email_assunto1;
      for (var x in campos) {
        email_mens = email_mens.split("{" + campos[x].id + "}").join(campos[x].valor);
        email_assunto = email_assunto.split("{" + campos[x].id + "}").join(campos[x].valor);
      }
      this.mensagem_email = email_mens;
      this.email_assunto = email_assunto;
    }
  }


  gerarAviso() {
    if (this.selected_documentos.length == 0) {
      this.displayverificar = true;
      this.mensagem_verifica = "É necessário selecionar documentos.";
    } else {
      this.idioma = "PT";
      this.tipo_aviso = 0;
      this.displaytipo_aviso = true;
    }

  }

  criarAviso() {
    this.displaytipo_aviso = false;
    var id_evento = 0
    if (this.tipo_aviso == 0) id_evento = 33;
    if (this.tipo_aviso == 1) id_evento = 35;
    if (this.tipo_aviso == 2) id_evento = 36;
    if (this.tipo_aviso == 3) id_evento = 37;
    this.GEREVENTOSCONFService.getbyID(id_evento).subscribe(
      response => {
        this.selected_email = 1;
        var email_mensagem = response[0][0].email_MENSAGEM;
        var email_assunto = response[0][0].email_ASSUNTO;

        if (this.idioma == 'ENG') {
          email_mensagem = response[0][0].email_MENSAGEM_ENG;
          email_assunto = response[0][0].email_ASSUNTO_ENG;
        } else if (this.idioma == 'FR') {
          email_mensagem = response[0][0].email_MENSAGEM_FR;
          email_assunto = response[0][0].email_ASSUNTO_FR;
        }

        this.texto_mensagem(email_mensagem, email_assunto, this.kam, this.numero_cliente, this.nome, null, null, null, null, null);
        this.bt_disable2 = false;
        this.email_para_1 = this.email_1;
        this.email_para_2 = this.email_2;
        this.email_DE = "tiago.pereira@xpertgo.pt";

        this.display_envia_contacto = true;
      },
      error => { console.log(error); });
  }

  exportar() {
    if (this.selected_documentos.length == 0) {
      this.displayverificar = true;
      this.mensagem_verifica = "É necessário selecionar documentos.";
    } else {


      var filename = new Date().toLocaleString().replace(/\D/g, '');


      var origem = null;
      for (var x in this.selected_documentos) {
        if (parseInt(x) == 0) {
          origem = this.selected_documentos[x].numero_documento;
        } else {
          origem += ',' + this.selected_documentos[x].numero_documento;
        }
      }

      var data = [{ CLIENTE: this.numero_cliente, DOCUMENTOS: origem }];
      var filenametransfer = "lista_detalhada";

      this.RelatoriosService.downloadFINANCEIRA("xlsx", filename, data, filenametransfer).subscribe(
        (res) => {
          this.insereatividade("Exportou Lista Detalhada");
          FileSaver.saveAs(res, filenametransfer);
        }
      );
    }
  }


  enviaremail(tipo) {

    var filename = new Date().toLocaleString().replace(/\D/g, '');
    var filenametransfer = "lista_detalhada";
    var formato = "xlsx";
    var email = new EMAIL;
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;

      });

    email.nome_FICHEIRO = filename;
    email.assunto = this.email_assunto;

    if (tipo == 2) {
      if (this.selected_email == 1) {
        email.para = this.email_para_1;
      } else {
        email.para = this.email_para_1;
      }
      formato = "pdf";
      if (this.tipo_aviso == 0) filenametransfer = "ficha_cliente_pre_aviso";
      if (this.tipo_aviso == 1) filenametransfer = "ficha_cliente_aviso_1";
      if (this.tipo_aviso == 2) filenametransfer = "ficha_cliente_aviso_2";
      if (this.tipo_aviso == 3) filenametransfer = "ficha_cliente_aviso_3";

    } else {
      email.para = this.email_para;
    }

    email.mensagem = this.mensagem_email;
    email.de = this.email_DE;

    this.bt_disable = true;
    this.bt_disable2 = true;

    var origem = null;
    for (var x in this.selected_documentos) {
      if (parseInt(x) == 0) {
        origem = this.selected_documentos[x].numero_documento;
      } else {
        origem += ',' + this.selected_documentos[x].numero_documento;
      }
    }
    email.nome_FICHEIRO = (formato == 'pdf') ? filename : (filename + "." + formato);

    var data = [{ CLIENTE: this.numero_cliente, DOCUMENTOS: origem, IDIOMA: this.idioma }];
    this.RelatoriosService.downloadFINANCEIRA(formato, filename, data, filenametransfer).subscribe(
      (res) => {

        this.EmailService.enviarEmail(email).subscribe(
          res => {
            this.bt_disable = false;
            this.simular(this.inputenvio);
            this.display_envia_contacto = false;
            this.display_envia_kam = false;
            if (tipo == 1) {
              this.insereatividade("Enviou Ação para KAM");
            } else {
              var descricao = "";
              if (this.tipo_aviso == 0) descricao = "Gerou Aviso Pagamento (Pré-Aviso)";
              if (this.tipo_aviso == 1) descricao = "Gerou Aviso Pagamento (Aviso 1)";
              if (this.tipo_aviso == 2) descricao = "Gerou Aviso Pagamento (Aviso 2)";
              if (this.tipo_aviso == 3) descricao = "Gerou Aviso Pagamento (Aviso 3)";
              this.insereatividade(descricao);
            }
          }, error => {
            this.simular(this.inputerroenvio);
            this.bt_disable = false;
          });


      }, error => {
        this.simular(this.inputerroficheiro);
        console.log(error);
      });
  }

  showDialog(type, srcelement, nomeficheiro, datatype, ficheiro, id_ficheiro) {
    this.srcelement = "";
    if (type == "pdf" || type == 'txt') {
      if (ficheiro == null) {
        this.FINREGISTOACOESService.getbyidFICHEIRO(id_ficheiro).subscribe(
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
      this.FINREGISTOACOESService.getbyidFICHEIRO(id_ficheiro).subscribe(
        (res) => {
          /*var fileURL: any = URL.createObjectURL(res);
          fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          var myWindow = window.open(fileURL, "", "width=200,height=100");*/
          // myWindow.close();
          // FileSaver.saveAs(res, nome);

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
      this.FINREGISTOACOESService.getbyidFICHEIRO(id_ficheiro).subscribe(
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

  insereatividade(descricao) {
    var atividade = new FIN_DIVIDAS_ATIVIDADE();
    atividade.descricao = descricao;
    atividade.id_CLIENTE = this.numero_cliente;
    atividade.data_CRIA = new Date();
    atividade.utz_CRIA = this.user;
    this.FINDIVIDASATIVIDADEService.create(atividade).subscribe(response => {
    },
      error => console.log(error));
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.clientes.length;
    if (this.clientes.length > 0) {
      this.inicia(this.clientes[this.i]);
      var back;
      var sub2 = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          back = params['redirect'] || 0;
        });

      if (back != 0) {
        this.router.navigate(['analise_dividas/view'], { queryParams: { id: this.clientes[this.i], redirect: back } });
      } else {
        this.router.navigate(['analise_dividas/view'], { queryParams: { id: this.clientes[this.i] } });
      }

    }
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.clientes.length;
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
      this.router.navigate(['analise_dividas/view'], { queryParams: { id: this.clientes[this.i], redirect: back } });
    } else {
      this.router.navigate(['analise_dividas/view'], { queryParams: { id: this.clientes[this.i] } });
    }

    if (this.clientes.length > 0) {
      this.inicia(this.clientes[this.i]);
    }
  }

  backClicked() {
    //this.location.back();
    this.router.navigate(['analise_dividas']);
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
        this.router.navigate(['analise_dividas/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['analise_dividas/editar'], { queryParams: { id: page } });
      }

    }
  }

  backview() {
    this.location.back();
  }


  getlinhasdocumentos(n_documento) {

    this.tabela_linhas_documentos = [];
    this.display_linhas_documentos = true;
    var count = 0;
    this.mensagemtabela = "Loading...";
    var data = [{ N_DOCUMENTO: n_documento }];
    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_LINHAS_DOCUMENTOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "No records were found...";
        }
        for (var x in response) {

          this.tabela_linhas_documentos.push({
            id_cab_doc: response[x][0],
            des_artigo: response[x][1],
            quantidade: response[x][2],
            preco_unitario: response[x][3],
            valor_liquido: response[x][4],
            valor_iva: response[x][5],
            valor_total: response[x][6],
            n_pedido: response[x][7],
            id_processo: response[x][8],
          });

        }
        this.tabela_linhas_documentos = this.tabela_linhas_documentos.slice();

      },
      error => console.log(error));
  }
}
