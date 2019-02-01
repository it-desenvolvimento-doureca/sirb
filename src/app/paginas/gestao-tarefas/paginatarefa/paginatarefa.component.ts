import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GTMOVTAREFASService } from '../../../servicos/gt-mov-tarefas.service';
import { GT_MOV_TAREFAS } from '../../../entidades/GT_MOV_TAREFAS';
import { GT_LOGS } from '../../../entidades/GT_LOGS';
import { GERUTILIZADORESService } from '../../../servicos/ger-utilizadores.service';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { RCMOVRECLAMACAOPLANOACCOESCORRETIVASService } from '../../../servicos/rc-mov-reclamacao-plano-accoes-corretivas.service';
import { RC_MOV_RECLAMACAO_PLANOS_ACCOES } from '../../../entidades/RC_MOV_RECLAMACAO_PLANOS_ACCOES';
import { UploadService } from 'app/servicos/upload.service';
import { webUrl } from 'assets/config/webUrl';
import { DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { RC_MOV_RECLAMACAO_FICHEIROS } from 'app/entidades/RC_MOV_RECLAMACAO_FICHEIROS';
import { RCMOVRECLAMACAOFICHEIROSService } from 'app/servicos/rc-mov-reclamacao-ficheiros.service';

@Component({
  selector: 'app-paginatarefa',
  templateUrl: './paginatarefa.component.html',
  styleUrls: ['./paginatarefa.component.css']
})
export class PaginatarefaComponent implements OnInit {

  nome_tarefa;
  utz_origem;
  dep_origem;
  data_atribuicao;
  atribuido;
  encaminhado;
  data_encaminhado;
  prazo_conclusao;
  prioridade;
  estado;
  cliente;
  referencia;
  observacoes;
  disencaminhar = true;
  discancelar = true;
  disconcluir = true;
  disrejeitar = true;
  user: any;
  origem: string;
  tempo_gasto: any;
  descricao: any;
  percentagem_conclusao: any;
  modoedicao: boolean;
  id_tarefa: any;


  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('fileInput') fileInput: FileUpload;
  tempo_gasto_old: any;
  descricao_old: any;
  percentagem_conclusao_old: any;
  caminho_origem: string;
  displayEncaminhar: boolean;
  drop_utilizadores: any[];
  utz_encaminhado: any;
  adminuser: boolean;
  utz_origem_id;
  atribuido_id;
  srcelement: any;
  nomeficheiro: any;
  type: string;
  display: boolean;
  campo_x: number;
  uploadedFiles: any[] = [];
  filedescricao = [];
  id_RECLAMACAO: any;
  obriga_EVIDENCIAS: any;
  errovalida: string;
  displayvalidacao: boolean;
  apagarficheiros: any;
  campo_estado: string;
  displayMotivoRejeicao: boolean;
  mototivoRejeicao: string;
  email_utz_origem: any;

  constructor(private RCMOVRECLAMACAOFICHEIROSService: RCMOVRECLAMACAOFICHEIROSService, private sanitizer: DomSanitizer, private UploadService: UploadService, private elementRef: ElementRef, private RCMOVRECLAMACAOPLANOACCOESCORRETIVASService: RCMOVRECLAMACAOPLANOACCOESCORRETIVASService, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private GTMOVTAREFASService: GTMOVTAREFASService, private route: ActivatedRoute, private location: Location, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/jqbtk.js";
    this.elementRef.nativeElement.appendChild(s);

    this.globalVar.setapagar(false);
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

    this.globalVar.setdisEditar(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];
    this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500apagarficheiros");

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    var estado = null;
    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.modoedicao = true;
        estado = "editar";
      } else if (urlarray[1].match("")) {
        this.globalVar.setcriar(false);
        estado = "view";
      }
    }



    if (urlarray[1].match("editar") || urlarray[1].match("view")) {

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });
      if (this.globalVar.getfiltros("tarefas_id") && this.globalVar.getfiltros("tarefas_id").length > 0) {
        /*this.reclamacoes = this.globalVar.getfiltros("reclamacaocliente_id");
        this.i = this.reclamacoes.indexOf(+id);
        this.inicia(true, this.reclamacoes[this.i]);
      }
      else {
        //preenche array para navegar 
        /*this.RCMOVRECLAMACAOService.getAll().subscribe(
          response => {
            this.reclamacoes = [];
            for (var x in response) {
              this.reclamacoes.push(response[x].id_RECLAMACAO);
              if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_CLIENTE, value: response[x].id_RECLAMACAO });
            }
    
            this.i = this.reclamacoes.indexOf(+id);
            this.carregaDados(true, this.reclamacoes[this.i]);
            //this.inicia(this.reclamacoes[this.i]);
    
    
          }, error => { console.log(error); });*/
      }
    }
    if (id != 0) {
      this.inicia(id);
    } else {

    }
    this.carregaUtilizadores();
  }

  carregaUtilizadores() {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores.push({ label: "Seleccionar Utilizador", value: null });
        var grupo = [];
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR });
        }

        this.drop_utilizadores = this.drop_utilizadores.slice();

      },
      error => { console.log(error); });
  }

  inicia(id) {
    this.id_tarefa = id;
    var data = [{
      utilizador: null, tipo_utilizador: null, estado: null,
      datacria1: null, datacria2: null, datafim1: null, datafim2: null,
      accao: null, id: id
    }];


    this.GTMOVTAREFASService.getbyFiltros(data).subscribe(resp => {
      var ids = [];

      for (var x in resp) {

        var estados = this.geEstado(resp[x][8]);


        var atribuido = "";
        if (resp[x][16] != null) {
          atribuido = resp[x][16];
        } else {
          atribuido = resp[x][3];
        }

        if (resp[x][8] == "P") {
          this.atualizaestadoTarefa(id, "L");
          estados = this.geEstado("L");
        }

        this.nome_tarefa = resp[x][0];
        this.utz_origem = resp[x][1];
        this.email_utz_origem = (resp[x][26] == null) ? "" : resp[x][26];
        this.dep_origem = "";
        this.data_atribuicao = (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null;
        this.atribuido = atribuido;
        this.encaminhado = resp[x][4];
        this.data_encaminhado = (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null;
        this.prazo_conclusao = (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null;
        this.prioridade = resp[x][7];
        this.estado = estados;
        this.campo_estado = resp[x][8];
        this.cliente = resp[x][9];
        this.referencia = resp[x][10] + "" + resp[x][11];
        var step = "";
        var nome_step = "";
        switch (resp[x][27]) {
          case 'I':
            step = "step-3";
            nome_step = " (STEP 3 - ACÇÕES CORRETIVAS IMEDIATAS)";
            break;
          case 'C':
            step = "step-4";
            nome_step = " (STEP 5 - AÇÕES CORRETIVAS)";
            break;
          case 'E':
            step = "step-5";
            nome_step = " (STEP 6 - COMPROVAÇÃO DA EFICÁCIA DAS AÇÕES CORRETIVAS)";
            break;
          case 'P':
            step = "step-6";
            nome_step = " (STEP 7 - MEDIDAS PREVENTIVAS CONTRA REINCIDÊNCIA)";
            break;
          default:
        }
        this.origem = "Reclamações de Clientes : " + resp[x][15] + nome_step;
        this.caminho_origem = "#/reclamacoesclientes/view?id=" + resp[x][15] + "&step=" + step + "&redirect=tarefas/viewkvk\id=" + id;
        this.tempo_gasto = resp[x][19];
        this.descricao = resp[x][18]
        this.percentagem_conclusao = resp[x][17];
        this.observacoes = resp[x][21];
        this.utz_encaminhado = resp[x][20];
        this.id_RECLAMACAO = resp[x][15];
        this.obriga_EVIDENCIAS = resp[x][25];

        this.tempo_gasto_old = resp[x][19];
        this.descricao_old = resp[x][18]
        this.percentagem_conclusao_old = resp[x][17];
        //this.data_conclusao = (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
        //this.utz_concluiu = resp[x][13],
        this.utz_origem_id = resp[x][24];
        this.atribuido_id = resp[x][23];

        if (this.adminuser || this.user == this.utz_origem_id) {
          this.discancelar = false;
        }
        if (this.adminuser || this.user == this.utz_origem_id || this.user == this.utz_encaminhado || this.user == this.atribuido_id) {
          this.disrejeitar = false;
          this.disconcluir = false;
          this.disencaminhar = false;

        } else {
          this.modoedicao = false;
          this.simular(this.alteraeditar);
        }
        if (this.campo_estado == "C" || this.campo_estado == "A") {
          this.discancelar = true;
          this.disconcluir = true;
          this.disencaminhar = true;
          this.disrejeitar = true;
          this.modoedicao = false;
          this.simular(this.alteraeditar);
        }
        ids.push(resp[x][15]);

      }
      this.globalVar.setfiltros("reclamacaocliente_id", ids);
      this.carregatabelaFiles(id);

    }, error => {
      console.log(error);
    });
  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.RCMOVRECLAMACAOFICHEIROSService.getbyidtarefa(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            if (response[x].id_FICHEIRO == null) {
              this.uploadedFiles.push({
                data: response[x],
                id: response[x].id, name: response[x].nome,
                src: response[x].caminho, type: response[x].tipo, datatype: response[x].datatype, size: response[x].tamanho, descricao: response[x].descricao
              });
            }
          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

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

  gravar(encaminhado) {
    this.GTMOVTAREFASService.getbyid(this.id_tarefa).subscribe(response => {

      var count = Object.keys(response).length;
      if (count > 0) {
        var tarefa = new GT_MOV_TAREFAS;
        tarefa = response[0]

        var data_logs = [];
        var alteracoes = false;

        if (encaminhado) {
          if (tarefa.utz_ENCAMINHADO != this.utz_encaminhado) {
            data_logs.push({ descricao: "Alterado Utilizador Encaminhado de " + this.getNomeUser(tarefa.utz_ENCAMINHADO) + " para " + this.getNomeUser(this.utz_encaminhado) })
            alteracoes = true;
          }
          tarefa.utz_ENCAMINHADO = this.utz_encaminhado;
          tarefa.utz_ENCAMINHOU = this.user;
          tarefa.data_ENCAMINHADO = new Date();
          this.encaminhado = this.getNomeUser(tarefa.utz_ENCAMINHADO);
        }

        if (this.descricao_old != this.descricao) {
          data_logs.push({ descricao: "Alterado a Descrição de " + ((this.descricao_old == null) ? "_" : this.descricao_old) + " para " + ((this.descricao == null) ? "_" : this.descricao) });
          alteracoes = true;
        }

        if (this.percentagem_conclusao_old != this.percentagem_conclusao) {
          data_logs.push({ descricao: "Alterado a Percentagem de Conlusão de " + ((this.percentagem_conclusao_old == null) ? "_" : this.percentagem_conclusao_old) + " para " + ((this.percentagem_conclusao == null) ? "_" : this.percentagem_conclusao) });
          alteracoes = true;
        }

        if (this.tempo_gasto_old != this.tempo_gasto) {
          data_logs.push({ descricao: "Alterado Tempo Gasto de " + ((this.tempo_gasto_old == null) ? "_" : this.tempo_gasto_old) + " para " + ((this.tempo_gasto == null) ? "_" : this.tempo_gasto) });
          alteracoes = true;
        }

        if (alteracoes && tarefa.estado == "L") {
          tarefa.estado = "E";
        }

        tarefa.descricao = this.descricao;
        tarefa.tempo_GASTO = this.tempo_gasto;
        tarefa.percentagem_CONCLUSAO = this.percentagem_conclusao;


        this.GTMOVTAREFASService.update(tarefa).then(response => {
          if (alteracoes && tarefa.estado == "L") this.alterarEstadoPLANO(tarefa.id_CAMPO, "E");
          for (var x in data_logs) {
            var logs = new GT_LOGS;
            logs.id_TAREFA = this.id_tarefa;
            logs.utz_CRIA = this.user;
            logs.data_CRIA = new Date();
            logs.descricao = data_logs[x].descricao;
            this.criaLogs(logs);
          }

          if (encaminhado) {
            this.displayEncaminhar = false;

          } else {
            this.gravarTabelaFicheiros(tarefa.id_TAREFA, encaminhado, this.id_RECLAMACAO);
          }

        }, error => {
          console.log(error);
          this.simular(this.inputerro);
        });
      } else {
        this.simular(this.inputerro);
      }

    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  gravarTabelaFicheiros(id, encaminhado, id_reclamacao) {
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {


      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new RC_MOV_RECLAMACAO_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = new Date();
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_RECLAMACAO = id_reclamacao;
        ficheiros.id_TAREFA = id;
        ficheiros.id = this.uploadedFiles[x].id;
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
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id, encaminhado);
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
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa, redirect: back } });
          } else {
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa } });
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
        this.router.navigate(['tarefas/view'], { queryParams: { id: id, redirect: back } });
      } else {
        this.router.navigate(['tarefas/view'], { queryParams: { id: id } });
      }

    }
  }

  gravarTabelaFicheiros2(ficheiros, count, total, id, encaminhado) {
    this.RCMOVRECLAMACAOFICHEIROSService.update(ficheiros).then(
      res => {
        var logs = new GT_LOGS;
        logs.id_TAREFA = this.id_tarefa;
        logs.utz_CRIA = this.user;
        logs.data_CRIA = new Date();
        logs.descricao = "Ficheiro " + ficheiros.nome + " ( " + ((ficheiros.descricao == null) ? "" : ficheiros.descricao) + ") adicionado.";
        this.criaLogs(logs);

        if (count == total) {
          this.simular(this.inputgravou);
          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa, redirect: back } });
          } else {
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa } });
          }
        }
      },
      error => {
        console.log(error); if (count == total) {
          this.simular(this.inputgravou);

          var back;
          var sub2 = this.route
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              back = params['redirect'] || 0;
            });

          if (back != 0) {
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa, redirect: back } });
          } else {
            this.router.navigate(['tarefas/view'], { queryParams: { id: this.id_tarefa } });
          }

        }
      });
  }


  criaLogs(log) {
    this.GTMOVTAREFASService.createLOGS(log).subscribe(response => {
    }, error => {
      console.log(error);

    });
  }

  getNomeUser(id) {
    var utz = this.drop_utilizadores.find(item => item.value == id);

    var nome = "";
    if (utz && id != null) {
      nome = utz.label;
    }
    return nome;
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


  //abrir popup encaminhar para
  encaminharpara() {
    this.displayEncaminhar = true;
  }

  //ATUALIZAR ESTADO TAREFA
  alterarEstado(estado) {
    var mensagem = ""
    if (estado == "A") {
      mensagem = 'Tem a certeza que pretende cancelar a tarefa?';
    } else if (estado == "C") {
      mensagem = 'Tem a certeza que pretende concluir a tarefa?';
    } else if (estado == "R") {
      mensagem = 'Tem a certeza que pretende rejeitar a tarefa?';
    }
    if (estado == "C" && this.obriga_EVIDENCIAS && this.uploadedFiles.length == 0) {
      this.errovalida = "É obrigatório anexar ficheiros!";
      this.displayvalidacao = true;
    } else {
      this.confirmationService.confirm({
        message: mensagem,
        header: 'Confirmação',
        icon: 'fa fa-info',
        accept: () => {
          if (estado != 'R') {
            this.atualizaestadoTarefa(this.id_tarefa, estado);
          } else {
            this.displayMotivoRejeicao = true;
          }
        }

      });
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
        estados = "Concluída";
        break;
      case 'A':
        estados = "Cancelada";
        break;
      case 'R':
        estados = "Rejeitada";
        break;
      default:
        estados = "Pendente";
    }
    return estados;
  }


  //alterar Estado
  atualizaestadoTarefa(id, estado) {

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
        } else if (estado == "R") {
          tarefa.utz_REJEITA = this.user;
          tarefa.data_REJEITA = new Date();
          tarefa.motivo_REJEICAO = this.mototivoRejeicao;
        } else {
          tarefa.utz_ULT_MODIF = this.user;
          tarefa.data_ULT_MODIF = new Date();
        }

        this.GTMOVTAREFASService.update(tarefa).then(response => {
          this.displayMotivoRejeicao = false;
          this.alterarEstadoPLANO(tarefa.id_CAMPO, estado);
          for (var x in data_logs) {
            var logs = new GT_LOGS;
            logs.id_TAREFA = id;
            logs.utz_CRIA = this.user;
            logs.data_CRIA = new Date();
            logs.descricao = data_logs[x].descricao;
            this.criaLogs(logs);
          }
          if (estado == "C") {
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.atribuido, "Ao Concluir Tarefa",
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO);
          } else if (estado == "A") {
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.atribuido, "Ao Anular Tarefa",
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO);
          } else if (estado == "R") {
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.atribuido, "Ao Rejeitar Tarefa",
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO)
          }

          this.simular(this.inputgravou);
        }, error => {
          console.log(error);

        });
      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  alterarEstadoPLANO(id, estado) {

    this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.getbyid(id).subscribe(res => {

      var count = Object.keys(res).length;
      if (count > 0) {
        var accoes = new RC_MOV_RECLAMACAO_PLANOS_ACCOES;
        accoes = res[0];
        if (estado == "C") {
          accoes.concluido_UTZ = this.user;
          accoes.concluido_DATA = new Date();
          accoes.data_REAL = new Date();
          accoes.estado = estado;
        } else if (estado == "A") {
          accoes.utz_ULT_MODIF = this.user;
          accoes.data_ULT_MODIF = new Date();
          accoes.estado = estado;
        } else {
          accoes.utz_ULT_MODIF = this.user;
          accoes.data_ULT_MODIF = new Date();
          accoes.estado = estado;
        }

        this.RCMOVRECLAMACAOPLANOACCOESCORRETIVASService.update(accoes).subscribe(
          res => {

          },
          error => { console.log(error); });
      }
    },
      error => { console.log(error); });

  }

  seguinte() {

  }

  anterior() {

  }

  //FICHEIROS

  showDialog(type, srcelement, nomeficheiro, datatype) {
    this.srcelement = webUrl.link + srcelement;
    if (type == "pdf" || type == 'txt') {
      this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement)
    }

    if (type == "excel" || type == "word") {
      this.download(nomeficheiro, srcelement, datatype)
    } else if (type == "msg") {
      this.downloadTXT(nomeficheiro, srcelement)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      this.display = true;
    }

  }

  download(nome, filename, datatype) {
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
  }

  downloadTXT(nomeficheiro, filename) {
    this.UploadService.downloadTXT(filename).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL)
        this.nomeficheiro = nomeficheiro;
        this.type = 'txt';
        this.display = true;
      }, error => {
        this.simular(this.inputerroficheiro);
        console.log(error);
      }

    );
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

      this.fileupoad(file, nome, event, type, x);
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

  fileupoad(file, nome, event, type, x) {
    this.UploadService.fileChange(file, nome).subscribe(result => {
      var tipo = file.name.split(".");
      this.uploadedFiles.push({ id: null, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: this.filedescricao[x] });
      this.uploadedFiles = this.uploadedFiles.slice();
      if (this.campo_x + 1 == event.files.length) {
        this.fileInput.files = [];
        this.filedescricao = [];
        this.fileInput.progress = 0;
      }
      this.campo_x++;
    },
      error => {
        if (this.campo_x + 1 == event.files.length) {
          this.fileInput.files = [];
          this.filedescricao = [];
          this.fileInput.progress = 0;
        }
        this.campo_x++;
        console.log(error);
      });
  }

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
        (res) => {
          var logs = new GT_LOGS;
          logs.id_TAREFA = this.id_tarefa;
          logs.utz_CRIA = this.user;
          logs.data_CRIA = new Date();
          logs.descricao = "Ficheiro " + tab.nome + " ( " + ((tab.descricao == null) ? "" : tab.descricao) + ") removido.";
          this.criaLogs(logs);
        });
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.RCMOVRECLAMACAOFICHEIROSService.delete(tab.id).then(
        res => {
          //alterar ficheiro de pasta
          this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
            (res) => {
              var logs = new GT_LOGS;
              logs.id_TAREFA = this.id_tarefa;
              logs.utz_CRIA = this.user;
              logs.data_CRIA = new Date();
              logs.descricao = "Ficheiro " + tab.nome + " ( " + ((tab.descricao == null) ? "" : tab.descricao) + ") removido.";
              this.criaLogs(logs);
            });
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }


  enviarEvento(data_tarefa, observacao, numero_tarefa, atribui_a, MOMENTO, email_para, cliente, data_conlusao, data_rejeicao, data_cancelou, encaminhado_para, referencia, prazo_conclusao, motivo_rejeicao) {
    if (observacao == null) {
      observacao = "";
    }

    if (encaminhado_para == null) {
      encaminhado_para = "";
    }

    var dados = "{observacao::" + observacao
      + "\n/link::" + webUrl.host + '/#/tarefas/view?id=' + numero_tarefa
      + "\n/numero_tarefa::" + numero_tarefa
      + "\n/motivo_rejeicao::" + motivo_rejeicao
      + "\n/atribui_a::" + atribui_a
      + "\n/referencia::" + referencia
      + "\n/encaminhado_para::" + encaminhado_para
      + "\n/prazo_conclusao::" + new Date(prazo_conclusao).toLocaleDateString()
      + "\n/data_conlusao::" + new Date(data_conlusao).toLocaleDateString()
      + "\n/data_rejeicao::" + new Date(data_rejeicao).toLocaleDateString()
      + "\n/data_cancelou::" + new Date(data_cancelou).toLocaleDateString()
      + "\n/data_tarefa::" + new Date(data_tarefa).toLocaleDateString()
      + "\n/cliente::" + cliente + "}";


    var data = [{ MODULO: 6, MOMENTO: MOMENTO, PAGINA: "Tarefas", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

}