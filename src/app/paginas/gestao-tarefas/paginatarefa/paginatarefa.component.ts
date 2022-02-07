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
import { GT_MOV_FICHEIROS } from 'app/entidades/GT_MOV_FICHEIROS';
import { GTMOVFICHEIROSService } from 'app/servicos/gt-mov-ficheiros.service';
import { QUA_DERROGACOES_PLANOS_ACCOES } from 'app/entidades/QUA_DERROGACOES_PLANOS_ACCOES';
import { QUADERROGACOESPLANOSACCOESService } from 'app/servicos/qua-derrogacoes-planos-accoes.service';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
@Component({
  selector: 'app-paginatarefa',
  templateUrl: './paginatarefa.component.html',
  styleUrls: ['./paginatarefa.component.css']
})
export class PaginatarefaComponent implements OnInit {

  progresso = '0';
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
  origem_pai: string;
  tempo_gasto: any;
  descricao: any;
  percentagem_conclusao: any;
  modoedicao: boolean;
  id_tarefa: any;
  listasubtarefas = [];

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditarhid') alteraeditarhid: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;

  tempo_gasto_old: any;
  descricao_old: any;
  percentagem_conclusao_old: any;
  caminho_origem: string;
  caminho_origem_pai: string = null;
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
  modulo: any;
  listar: any;
  mototivoRejeicao_texto: any;
  justificacao_ALTERACAO_ESTADO: any;
  sub_modulo: any;
  drop_accoes: any[];
  data_ACCAO: any;
  hora_ACCAO: string;
  novo_responsavel: any;
  novo_id_ACCAO: number;
  id_selected: number;
  descricaoeng: string;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  novo_observacoes: any;
  listasubtarefasdialog: any[];
  displaylistasubtarefasdialog: boolean;

  constructor(private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService, private QUADERROGACOESPLANOSACCOESService: QUADERROGACOESPLANOSACCOESService, private GTMOVFICHEIROSService: GTMOVFICHEIROSService, private RCMOVRECLAMACAOFICHEIROSService: RCMOVRECLAMACAOFICHEIROSService, private sanitizer: DomSanitizer, private UploadService: UploadService, private elementRef: ElementRef, private RCMOVRECLAMACAOPLANOACCOESCORRETIVASService: RCMOVRECLAMACAOPLANOACCOESCORRETIVASService, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private GTMOVTAREFASService: GTMOVTAREFASService, private route: ActivatedRoute, private location: Location, private globalVar: AppGlobals, private router: Router) {
    if (document.getElementById("script1")) document.getElementById("script1").remove();
    var script1 = document.createElement("script");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/jqbtk.js");
    document.body.appendChild(script1);
  }

  ngOnInit() {


    this.globalVar.setapagar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
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
      var listar;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
          listar = params['listar'] || false;
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
    this.listar = (listar == "true") ? true : false;
    if (id != 0) {
      this.inicia(id);
    } else {

    }
    this.carregaUtilizadores();
    this.carregaaccoes();
  }

  carregaUtilizadores() {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        //this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: null });
        var grupo = [];
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, email: response[x].email, value: response[x].id_UTILIZADOR });
        }

        this.drop_utilizadores.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        this.drop_utilizadores.unshift({ label: "Selecionar Utilizador", value: "" });
        this.drop_utilizadores = this.drop_utilizadores.slice();

      },
      error => { console.log(error); });
  }


  carregaaccoes() {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll_TIPO("A").subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Acção", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();


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
        this.dep_origem = (resp[x][30] == null) ? "" : resp[x][30];
        this.data_atribuicao = (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null;
        this.atribuido = atribuido;
        this.encaminhado = resp[x][4];
        this.data_encaminhado = (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null;
        this.prazo_conclusao = (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null;
        this.prioridade = resp[x][7];
        this.estado = estados;
        this.campo_estado = resp[x][8];
        this.cliente = resp[x][9];
        this.referencia = ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]);
        this.mototivoRejeicao_texto = resp[x][31];
        this.justificacao_ALTERACAO_ESTADO = resp[x][32];
        var step = "";
        var nome_step = "";
        if (resp[x][28] == 5 && resp[x][29] != 'D') {
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
        } else if (resp[x][28] == 5 && resp[x][29] == 'D') {
          this.origem = "Derrogação : " + resp[x][15];
          this.caminho_origem = "#/derrogacoes/view?id=" + resp[x][15] + "&redirect=tarefas/viewkvk\id=" + id;
        } else if (resp[x][28] == 10) {
          this.origem = "Amostra : " + resp[x][15];
          this.caminho_origem = "#/producao/amostras/view?id=" + resp[x][15] + "&redirect=tarefas/viewkvk\id=" + id;
        } else if (resp[x][28] == 13) {
          this.origem = "Planos de Ação: " + resp[x][15];
          this.caminho_origem = "#/planosacao/view?id=" + resp[x][15] + "&redirect=tarefas/viewkvk\id=" + id;
        }

        if (resp[x][33] != null) {
          this.origem_pai = " - Tarefa Pai: " + resp[x][33];
          this.caminho_origem_pai = resp[x][33];
        }

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

        if (this.adminuser /*|| this.user == this.utz_origem_id*/) {
          this.discancelar = false;
        }
        if (this.adminuser ||/* this.user == this.utz_origem_id ||*/ this.user == this.utz_encaminhado || this.user == this.atribuido_id) {
          this.disrejeitar = false;
          this.disconcluir = false;
          this.disencaminhar = false;

        } else {
          this.modoedicao = false;
          this.globalVar.seteditar(false);
          this.simular(this.alteraeditar);
        }
        if (this.campo_estado == "C" || this.campo_estado == "A" || this.campo_estado == "N" || this.campo_estado == "R" || this.campo_estado == "F" || this.campo_estado == "V") {
          this.discancelar = true;
          this.disconcluir = true;
          this.disencaminhar = true;
          this.disrejeitar = true;
          this.modoedicao = false;
          this.globalVar.seteditar(false);
          this.simular(this.alteraeditar);
          document.getElementById("editarlabel").setAttribute("hidden", "true");
        }



        if (this.listar && !(this.user == this.atribuido_id || this.user == this.utz_encaminhado)) {
          this.discancelar = true;
          this.disconcluir = true;
          this.disencaminhar = true;
          this.disrejeitar = true;
          this.modoedicao = false;
          this.globalVar.seteditar(false);
          document.getElementById("editarlabel").setAttribute("hidden", "true");
          this.simular(this.alteraeditarhid);
          this.simular(this.alteraeditar);
        }

        if (resp[x][4] != null) this.disencaminhar = true;
        ids.push(resp[x][15]);

      }
      this.modulo = resp[x][28];
      this.sub_modulo = resp[x][29];

      this.globalVar.setfiltros("reclamacaocliente_id", ids);
      if (resp[x][28] == 5 && resp[x][29] != 'D') {
        this.carregatabelaFiles_RECLAMACAO(id);
      } else {
        this.carregatabelaFiles_TAREFA(id);
      }

      this.carregasubtarefas(id);
    }, error => {
      console.log(error);
    });
  }

  carregatabelaFiles_RECLAMACAO(id) {
    this.uploadedFiles = [];

    this.RCMOVRECLAMACAOFICHEIROSService.getbyidtarefa(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            if (response[x].id_FICHEIRO == null) {
              this.uploadedFiles.push({
                data: response[x], ficheiro: response[x].ficheiro,
                id: response[x].id, name: response[x].nome,
                src: response[x].caminho, type: response[x].tipo, datatype: response[x].datatype, size: response[x].tamanho, descricao: response[x].descricao
              });
            }
          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

  }

  carregatabelaFiles_TAREFA(id) {
    this.uploadedFiles = [];

    this.GTMOVFICHEIROSService.getbyidtarefa(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.uploadedFiles.push({
              data: response[x][0], ficheiro: response[x][0].ficheiro_1 + response[x][0].ficheiro_2,
              id: response[x][0].id, name: response[x][0].nome,
              src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype, size: response[x][0].tamanho, descricao: response[x][0].descricao
            });

          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

  }


  carregasubtarefas(id) {

    var data = [{
      utilizador: null, tipo_utilizador: null, estado: null,
      datacria1: null, datacria2: null, datafim1: null, datafim2: null,
      accao: null, id: null, idsubtarefa: id
    }];

    this.listasubtarefas = []
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

        this.listasubtarefas.push({
          existesubtarefas: (resp[x][34] > 0) ? true : false,
          id: resp[x][14],
          nome_tarefa: resp[x][0],
          utz_origem: resp[x][1],
          email_utz_origem: (resp[x][26] == null) ? "" : resp[x][26],
          dep_origem: (resp[x][30] == null) ? "" : resp[x][30],
          data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
          atribuido: atribuido,
          encaminhado: resp[x][4],
          data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
          prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
          prioridade: resp[x][7],
          estado: estados,
          campo_estado: resp[x][8],
          cliente: resp[x][9],
          referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
          mototivoRejeicao_texto: resp[x][31],
          justificacao_ALTERACAO_ESTADO: resp[x][32],
          tempo_gasto: resp[x][19],
          descricao: resp[x][18],
          percentagem_conclusao: resp[x][17],
          observacoes: resp[x][21],
          utz_encaminhado: resp[x][20],
          id_RECLAMACAO: resp[x][15],
          obriga_EVIDENCIAS: resp[x][25],
          tempo_gasto_old: resp[x][19],
          descricao_old: resp[x][18],
          percentagem_conclusao_old: resp[x][17],
          utz_origem_id: resp[x][24],
          atribuido_id: resp[x][23],
          modulo: resp[x][28],
          sub_modulo: resp[x][29],
          data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
          utz_concluiu: resp[x][13],
          podeapagar: (this.adminuser ||/* this.user == this.utz_origem_id || this.user == resp[x][20] ||*/ this.user == resp[x][24])
        })

      }
      this.listasubtarefas = this.listasubtarefas.slice();
      this.atualizaprogresso();
    }, error => {
      console.log(error);
    });
  }

  atualizaprogresso() {
    var count = 0;
    var total = this.listasubtarefas.length;
    for (var x in this.listasubtarefas) {
      if (this.listasubtarefas[x].campo_estado != 'P' && this.listasubtarefas[x].campo_estado != 'L' && this.listasubtarefas[x].campo_estado != 'E') count++;
    }

    this.progresso = (this.listasubtarefas.length == 0) ? '0' : ((((count) / total) * 100).toFixed(0));
  }

  goToTarefas(id) {
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });


    /*if (back != 0) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['tarefas/view'], { queryParams: { id: id, redirect: back } }))
    } else {*/
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['tarefas/view'], { queryParams: { id: id, redirect: "tarefas/viewkvk\id=" + this.id_tarefa } }))
    /*}*/

  }

  CancelarSubTarefa(id) {
    var mensagem = 'Tem a certeza que pretende cancelar a SubTarefa?';
    this.GTMOVTAREFASService.getValidaSubtarefas(id).subscribe(response => {
      if (response[0][0] > 0) {
        mensagem = "Existem SubTarefas Associadas a esta Tarefa, deseja Cancelar todas?";
        this.CancelarSubTarefa2(id, mensagem);
      } else {
        this.CancelarSubTarefa2(id, mensagem);
      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  CancelarSubTarefa2(id, mensagem) {

    this.confirmationService.confirm({
      message: mensagem,
      header: 'Confirmação',
      icon: 'fa fa-info',
      accept: () => {
        this.atualizaestadoSubTarefa(id, 'A');
      }

    });
  }
  atualizaestadoSubTarefa(id, estado) {
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
              this.carregasubtarefas(this.id_tarefa);
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

        //alerta encaminhamento

        this.GTMOVTAREFASService.update(tarefa).then(response => {
          if (alteracoes && tarefa.estado == "L") this.alterarEstadoPLANO(tarefa.id_CAMPO, "E");
          if (encaminhado) {
            this.disencaminhar = true;
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.getNomeUser(this.user), "Ao Encaminhar Tarefa",
              this.getEmailUser(this.utz_encaminhado), this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO,
              this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO, this.nome_tarefa);
          }
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
            if (this.modulo == 5 && this.sub_modulo != 'D') {
              this.gravarTabelaFicheiros_RECLAMACAO(tarefa.id_TAREFA, encaminhado, this.id_RECLAMACAO);
            } else {
              this.gravarTabelaFicheiros_TAREFA(tarefa.id_TAREFA, encaminhado);
            }
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

  gravarTabelaFicheiros_RECLAMACAO(id, encaminhado, id_reclamacao) {
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
        ficheiros.ficheiro = this.uploadedFiles[x].ficheiro;

        ficheiros.data_ULT_MODIF = new Date();
        ficheiros.utz_ULT_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2_RECLAMACAO(ficheiros, count, this.uploadedFiles.length, id, encaminhado);
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

  gravarTabelaFicheiros2_RECLAMACAO(ficheiros, count, total, id, encaminhado) {
    this.RCMOVRECLAMACAOFICHEIROSService.update(ficheiros).subscribe(
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

  gravarTabelaFicheiros2_TAREFA(ficheiros, count, total, id, encaminhado) {
    this.GTMOVFICHEIROSService.update(ficheiros).subscribe(
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



  gravarTabelaFicheiros_TAREFA(id_tarefa, encaminhado) {
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {


      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new GT_MOV_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = new Date();
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_TAREFA = id_tarefa;
        ficheiros.id = this.uploadedFiles[x].id;
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
          this.gravarTabelaFicheiros2_TAREFA(ficheiros, count, this.uploadedFiles.length, id_tarefa, encaminhado);
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
        this.router.navigate(['tarefas/view'], { queryParams: { id: id_tarefa, redirect: back } });
      } else {
        this.router.navigate(['tarefas/view'], { queryParams: { id: id_tarefa } });
      }

    }
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

  getEmailUser(id) {
    var utz = this.drop_utilizadores.find(item => item.value == id);

    var email = "";
    if (utz && id != null) {
      email = utz.email;
    }
    return email;
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
    if (this.campo_estado == "E") {
      this.errovalida = "Nâo é Possível encaminhar Tarefa no estado 'Em Curso'.";
      this.displayvalidacao = true;
    } else {
      this.displayEncaminhar = true;
    }
  }

  //ATUALIZAR ESTADO TAREFA
  alterarEstado(estado) {

    var mensagem = ""
    if (estado == "A") {
      mensagem = 'Cancelar';
    } else if (estado == "C") {
      mensagem = 'Concluir';
    } else if (estado == "R") {
      mensagem = 'Rejeitar';
    }

    this.GTMOVTAREFASService.getValidaSubtarefas(this.id_tarefa).subscribe(response => {
      if (response[0][0] > 0) {
        this.errovalida = "Não é possível " + mensagem + " a Tarefa! Todas as SubTarefas devem estar fechadas!";
        this.displayvalidacao = true;
      } else {
        this.alterarEstadoFinal(estado);
      }
    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  alterarEstadoFinal(estado) {

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


  //alterar Estado
  atualizaestadoTarefa(id, estado) {

    this.GTMOVTAREFASService.getbyid(id).subscribe(response => {

      var count = Object.keys(response).length;
      if (count > 0) {
        var tarefa = new GT_MOV_TAREFAS;
        tarefa = response[0]

        var data_logs = [];


        if (tarefa.estado != estado) {
          data_logs.push({ descricao: "Alterado Estado de " + this.geEstado(tarefa.estado) + " para " + this.geEstado(estado) })
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

          if (tarefa.id_MODULO == 5 && this.sub_modulo != 'D' && this.caminho_origem_pai == null) {
            this.alterarEstadoPLANO(tarefa.id_CAMPO, estado);
          } else if (tarefa.id_MODULO == 5 && this.sub_modulo == 'D' && this.caminho_origem_pai == null) {
            this.alterarEstadoPLANODERROGACAO(tarefa.id_CAMPO, estado);
          }

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
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO, this.nome_tarefa);
          } else if (estado == "A") {
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.atribuido, "Ao Anular Tarefa",
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO, this.nome_tarefa);
          } else if (estado == "R") {
            this.enviarEvento(this.data_atribuicao, this.descricao, this.id_tarefa, this.atribuido, "Ao Rejeitar Tarefa",
              this.email_utz_origem, this.cliente, tarefa.data_CONCLUSAO, tarefa.data_REJEITA, tarefa.data_ANULACAO, this.encaminhado, this.referencia, this.prazo_conclusao, tarefa.motivo_REJEICAO, this.nome_tarefa);
          }

          if (estado != "L") {
            this.simular(this.inputgravou);
          }
          if (estado == "C" || estado == "A" || estado == "R") {
            this.inicia(this.id_tarefa);
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


  alterarEstadoPLANODERROGACAO(id, estado) {

    this.QUADERROGACOESPLANOSACCOESService.getbyid(id).subscribe(res => {

      var count = Object.keys(res).length;
      if (count > 0) {
        var accoes = new QUA_DERROGACOES_PLANOS_ACCOES;
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

        this.QUADERROGACOESPLANOSACCOESService.update(accoes).subscribe(
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

  filetoBASE64(file, nome, event, type, x) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (event2: Event) => {
      // you can perform an action with readed data here
      this.fileupoad(file, nome, event, type, x, myReader.result);
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
    // this.UploadService.fileChange(file, nome).subscribe(result => {
    var tipo = file.name.split(".");
    this.uploadedFiles.push({ ficheiro: ficheiro, id: null, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: this.filedescricao[x] });
    this.uploadedFiles = this.uploadedFiles.slice();
    if (this.campo_x + 1 == event.files.length) {
      this.fileInput.files = [];
      this.filedescricao = [];
      this.fileInput.progress = 0;
    }
    this.campo_x++;
    /*  },
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

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      /*  this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
          (res) => {*/
      var logs = new GT_LOGS;
      logs.id_TAREFA = this.id_tarefa;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.descricao = "Ficheiro " + tab.nome + " ( " + ((tab.descricao == null) ? "" : tab.descricao) + ") removido.";
      this.criaLogs(logs);
      /*});*/
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      if (this.modulo == 5 && this.sub_modulo != 'D') {
        this.apaga_ficheiro_RECLAMACAO(tab, index);
      } else {
        this.apaga_ficheiro_TAREFA(tab, index);
      }
    }

  }

  apaga_ficheiro_RECLAMACAO(tab, index) {
    this.RCMOVRECLAMACAOFICHEIROSService.delete(tab.id).then(
      res => {
        //alterar ficheiro de pasta
        /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
           (res) => {*/
        var logs = new GT_LOGS;
        logs.id_TAREFA = this.id_tarefa;
        logs.utz_CRIA = this.user;
        logs.data_CRIA = new Date();
        logs.descricao = "Ficheiro " + tab.nome + " ( " + ((tab.descricao == null) ? "" : tab.descricao) + ") removido.";
        this.criaLogs(logs);
        /* });*/
        this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  apaga_ficheiro_TAREFA(tab, index) {
    this.GTMOVFICHEIROSService.delete(tab.id).then(
      res => {
        //alterar ficheiro de pasta
        /* this.UploadService.alterarlocalizacaoFicheiro("report", tab.src, tab.datatype).subscribe(
           (res) => {*/
        var logs = new GT_LOGS;
        logs.id_TAREFA = this.id_tarefa;
        logs.utz_CRIA = this.user;
        logs.data_CRIA = new Date();
        logs.descricao = "Ficheiro " + tab.nome + " ( " + ((tab.descricao == null) ? "" : tab.descricao) + ") removido.";
        this.criaLogs(logs);
        /* });*/
        this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }


  enviarEvento(data_tarefa, observacao, numero_tarefa, atribui_a, MOMENTO, email_para, cliente, data_conlusao, data_rejeicao, data_cancelou, encaminhado_para, referencia, prazo_conclusao, motivo_rejeicao, accao) {
    if (observacao == null) {
      observacao = "";
    }

    if (encaminhado_para == null) {
      encaminhado_para = "";
    }
    if (cliente == null) {
      cliente = "";
    }

    var dados = "{observacao::" + observacao
      + "\n/link::" + webUrl.host + '/#/tarefas/view?id=' + numero_tarefa
      + "\n/numero_tarefa::" + numero_tarefa
      + "\n/motivo_rejeicao::" + motivo_rejeicao
      + "\n/atribui_a::" + atribui_a
      + "\n/encaminhado_por::" + atribui_a
      + "\n/referencia::" + referencia
      + "\n/accao::" + accao
      + "\n/encaminhado_para::" + encaminhado_para
      + "\n/prazo_conclusao::" + this.formatDate(prazo_conclusao)
      + "\n/data_conlusao::" + this.formatDate(data_conlusao)
      + "\n/data_rejeicao::" + this.formatDate(data_rejeicao)
      + "\n/data_cancelou::" + this.formatDate(data_cancelou)
      + "\n/data_tarefa::" + this.formatDate(data_tarefa)
      + "\n/cliente::" + cliente + "}";


    var data = [{ MODULO: 6, MOMENTO: MOMENTO, PAGINA: "Tarefas", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }

  adicionar() {
    this.data_ACCAO = null;
    this.hora_ACCAO = null;
    this.novo_id_ACCAO = null;
    this.novo_observacoes = null;
    this.novo_responsavel = null;
    this.simular(this.dialoglinhas);
  }


  criar_subtarefa() {
    this.GTMOVTAREFASService.getbyid(this.id_tarefa).subscribe(response => {

      var count = Object.keys(response).length;
      if (count > 0) {
        var tarefa = new GT_MOV_TAREFAS;
        tarefa = response[0]


        var tipo = "u";
        var id_resp = this.novo_responsavel;
        /* if (this.novo_responsavel != null && this.novo_responsavel.charAt(0) == 'u' || this.novo_responsavel.charAt(0) == 's') {
           tipo = this.novo_responsavel.charAt(0);
           id_resp = this.novo_responsavel.substr(1);
         }*/


        tarefa.id_TAREFA_PAI = tarefa.id_TAREFA;
        tarefa.id_TAREFA = null;

        tarefa.data_FIM = new Date(this.formatDate(this.data_ACCAO) + ' ' + this.hora_ACCAO);
        tarefa.data_INICIO = new Date(this.formatDate(this.data_ACCAO) + ' ' + this.hora_ACCAO);
        tarefa.data_CRIA = new Date();
        tarefa.utz_CRIA = this.user;
        tarefa.data_ULT_MODIF = new Date();
        tarefa.utz_ULT_MODIF = this.user;
        tarefa.estado = 'P';
        tarefa.inativo = false;
        tarefa.utz_ID = id_resp;
        tarefa.utz_TIPO = tipo;
        tarefa.id_ACCAO = this.novo_id_ACCAO;

        tarefa.prioridade = 3;
        tarefa.observacoes = this.novo_observacoes;

        tarefa.utz_CONCLUSAO = null;
        tarefa.data_CONCLUSAO = null;
        tarefa.utz_ANULACAO = null;
        tarefa.data_ANULACAO = null;
        tarefa.utz_REJEITA = null;
        tarefa.data_REJEITA = null;
        tarefa.motivo_REJEICAO = null;

        var email_p = "";

        if (tipo == "u") {
          var utz = this.drop_utilizadores.find(item => item.value == id_resp);
          if (utz) email_p = utz.email;
        }

        var nome_accao = this.nomeACCAO(this.novo_id_ACCAO)

        this.criarTarefa(tarefa, nome_accao, email_p, this.novo_observacoes);
        tarefa.descricao = this.descricao;



      } else {
        this.simular(this.inputerro);
      }

    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }


  nomeACCAO(id) {
    //var id = event.value;
    var data = this.drop_accoes.find(item => item.value == id);
    var nome = "---";
    if (data) {
      nome = data.label;
    }
    return nome;
  }


  criarTarefa(tarefa, nome_accao, email_p, observacao) {

    this.GTMOVTAREFASService.create(tarefa).subscribe(response => {

      var logs = new GT_LOGS;
      logs.id_TAREFA = response.id_TAREFA;
      logs.utz_CRIA = this.user;
      logs.data_CRIA = new Date();
      logs.descricao = "Adicionada nova Tarefa";
      this.criaLogs(logs);
      var email_para = email_p;
      this.enviarEventoCriar(response.data_INICIO, response.id_TAREFA, "Ao Criar Tarefa", email_para, observacao, nome_accao);

      this.carregasubtarefas(this.id_tarefa);
      this.simular(this.closedialoglinha);


    }, error => {
      console.log(error);
      this.simular(this.inputerro);
    });
  }

  enviarEventoCriar(data_tarefa, numero_tarefa, MOMENTO, email_para, observacao, accao) {


    var dados = "{link::" + webUrl.host + '/#/tarefas/view?id=' + numero_tarefa
      + "" + "\n/numero_tarefa::" + numero_tarefa
      + "" + "\n/observacoes::" + observacao
      + "\n/accao::" + accao
      + "\n/data_tarefa::" + this.formatDate(data_tarefa) + " " + new Date(data_tarefa).toLocaleTimeString().slice(0, 5) + "}";


    var data = [{ MODULO: 6, MOMENTO: MOMENTO, PAGINA: "Tarefas", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
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


  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "A";
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    ACCOES_RECLAMACAO.utz_CRIA = this.user;
    ACCOES_RECLAMACAO.data_CRIA = new Date();
    this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
      this.carregaaccoes();
      this.displayAddAccao = false;
      this.simular(this.inputgravou);
    },
      error => { console.log(error); this.simular(this.inputerro); });

  }

  abrirsubtarefas(id) {

    var data = [{
      utilizador: null, tipo_utilizador: null, estado: null,
      datacria1: null, datacria2: null, datafim1: null, datafim2: null,
      accao: null, id: null, idsubtarefa: id
    }];

    this.listasubtarefasdialog = []
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

        this.listasubtarefasdialog.push({
          existesubtarefas: (resp[x][34] > 0) ? true : false,
          id: resp[x][14],
          nome_tarefa: resp[x][0],
          utz_origem: resp[x][1],
          email_utz_origem: (resp[x][26] == null) ? "" : resp[x][26],
          dep_origem: (resp[x][30] == null) ? "" : resp[x][30],
          data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
          atribuido: atribuido,
          encaminhado: resp[x][4],
          data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
          prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
          prioridade: resp[x][7],
          estado: estados,
          campo_estado: resp[x][8],
          cliente: resp[x][9],
          referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
          mototivoRejeicao_texto: resp[x][31],
          justificacao_ALTERACAO_ESTADO: resp[x][32],
          tempo_gasto: resp[x][19],
          descricao: resp[x][18],
          percentagem_conclusao: resp[x][17],
          observacoes: resp[x][21],
          utz_encaminhado: resp[x][20],
          id_RECLAMACAO: resp[x][15],
          obriga_EVIDENCIAS: resp[x][25],
          tempo_gasto_old: resp[x][19],
          descricao_old: resp[x][18],
          percentagem_conclusao_old: resp[x][17],
          utz_origem_id: resp[x][24],
          atribuido_id: resp[x][23],
          modulo: resp[x][28],
          sub_modulo: resp[x][29],
        })

      }
      this.listasubtarefasdialog = this.listasubtarefasdialog.slice();
      this.displaylistasubtarefasdialog = true;
    }, error => {
      console.log(error);
    });
  }

}