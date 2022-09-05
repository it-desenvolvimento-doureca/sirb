import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { PAMOVCABService } from 'app/servicos/pa-mov-cab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import * as FileSaver from 'file-saver';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { EMAIL } from 'app/entidades/EMAIL';
import { EmailService } from 'app/servicos/email.service';
import { UploadService } from 'app/servicos/upload.service';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';

@Component({
  selector: 'app-listaacoes',
  templateUrl: './listaacoes.component.html',
  styleUrls: ['./listaacoes.component.css']
})
export class ListaacoesComponent implements OnInit {
  dados: any[];

  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Sel. Estado", value: null }, { label: "Pendente", value: "Pendente" }, { label: "Lida", value: "Lida" }, { label: "Em Curso", value: "Em Curso" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvida/Realizada", value: "Desenvolvida/ Realizada" }, { label: "Controlada/Verificada", value: "Controlada/ Verificada" },
  { label: "Aprovada", value: "Aprovada" }, { value: "Não Respondida", label: "Não Respondida" }, { value: "Rejeitada", label: "Rejeitada" }, { value: "Cancelada", label: "Cancelada" }];
  tipo: any;
  caminho: string;
  estado_filtro = [];

  FastResponse = false;
  acoes_em_ATRASO = false;
  imprimirpdf = false;

  @ViewChild("tabeladados") tabeladados: DataTable;
  cols: any;
  email_para: any = [];
  results: any[];
  email_assunto: string;
  email_mensagem: string;
  dialog_enviar_email: boolean;
  bt_disable: boolean;
  listasubtarefasdialog = [];
  displaylistasubtarefasdialog: boolean;
  constructor(private PAMOVCABService: PAMOVCABService, private route: ActivatedRoute, private RelatoriosService: RelatoriosService,
    private GERUTILIZADORESService: GERUTILIZADORESService,
    private EmailService: EmailService,
    private UploadService: UploadService,
    private GTMOVTAREFASService: GTMOVTAREFASService,
    private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    var node = "node155";
    this.tipo = "T";
    this.caminho = urlarray[0];


    //if (this.tipo != "T") {
    this.estado_filtro = ["Pendente", "Lida", "Em Curso", "Planeado"];
    this.filtrar(this.estado_filtro, "estado", true, "in");
    // }

    if (this.tipo == 'T') {
      this.globalVar.setcriar(false);
    }
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "apagar"));

    this.imprimirpdf = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15512imprimir");

    this.carregarlista(this.tipo);
    this.getutilizadores();
  }

  carregarlista(tipo) {
    this.dados = [];
    //acoes_em_ATRASO
    var filtros = [{ FASTRESPONSE: this.FastResponse, EM_ATRASO: this.acoes_em_ATRASO }];
    this.PAMOVCABService.getPA_MOV_CABbyTIPOaccoes(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {

            var cor = "";

            var cor_letra = "";

            var data = this.formatDate(new Date());


            if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
              cor = "red";
              cor_letra = "white";
            } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
              cor = "yellow";
            }



            if ((response[x][18] != "P" && response[x][18] != "L" && response[x][18] != "E") || response[x][18] == null) { cor = ""; cor_letra = ""; }

            this.dados.push({
              id: response[x][0], cor: cor, cor_letra: cor_letra,
              data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
              utilizador: response[x][5],
              data_cria: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
              data_acao: response[x][8],
              utilizador_acao: response[x][9],
              departamento: response[x][19],
              acao: response[x][10],
              tipo_acao: response[x][16],
              descricao: response[x][11],
              ambito: response[x][15],
              origem: response[x][4],
              estado: this.geEstadoTarefa(response[x][18]),
              id_tarefa: response[x][17],
              existesubtarefas: (response[x][27] > 0) ? true : false,
              linha: response[x][20],
              unidade: response[x][21],
              referencia: response[x][22],
              item: response[x][23],
              causa: response[x][24],
              conclusao: response[x][26],
              data_realizado: (response[x][25] == null) ? "" : this.formatDate(response[x][25]),
            });
          }

          this.dados = this.dados.slice();

        }
      }, error => { console.log(error); });

  }



  atualizar() {
    this.carregarlista(this.tipo);
  }


  getestado(valor) {
    if (valor == "E") {
      return "Em Elaboração"
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
      //return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    }
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

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate([this.caminho + '/view'], { queryParams: { id: event.data.id } });
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

  IrParaTarefa(id) {
    this.router.navigateByUrl('tarefas/view?listar=true&id=' + id + "&redirect=listaacoes");
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
          existesubtarefas: (resp[x][33] > 0) ? true : false,
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

  goToTarefas(id) {
    this.router.navigate(['tarefas/view'], { queryParams: { id: id } });
  }

  IrParaPlano(id) {
    this.router.navigateByUrl('planosacao/view?id=' + id + "&redirect=listaacoes");
  }

  imprimir(formato, filenametransfer) {

    var filename = new Date().toLocaleString().replace(/\D/g, '');
    //var filenametransfer = "planos_de_acao";

    var data;
    var dados = [];
    if (this.tabeladados.filteredValue) {
      dados = this.tabeladados.filteredValue;
    } else {
      dados = this.tabeladados._value;
    }
    //console.log(JSON.stringify(dados))

    data = [{ dados: JSON.stringify(dados) }];

    this.RelatoriosService.downloadPDF2(formato, filename, data, filenametransfer, "planos_de_acao").subscribe(
      (res) => {
        FileSaver.saveAs(res, 'LISTA DE AÇÕES - PDCA DOURECA');
        /*this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);*/
      }, error => {
        this.showMessage('error', 'Erro', 'ERRO!! Falha ao gerar o Ficheiro!');
        console.log(error);
      });
  }

  EnviarEmail() {
    this.email_assunto = "";
    this.email_para = [];
    this.email_mensagem = "";
    this.dialog_enviar_email = true;
    this.bt_disable = false;
  }

  enviar() {

    var filename = new Date().toLocaleString().replace(/\D/g, '');
    var filenametransfer = "planos_de_acao_detalhada";
    var formato = "pdf";
    var email = new EMAIL;
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;

      });

    email.nome_FICHEIRO = filename;
    email.assunto = this.email_assunto;

    email.para = this.email_para.toString();


    email.mensagem = this.email_mensagem;
    email.de = JSON.parse(localStorage.getItem('userapp'))["email"];

    this.bt_disable = true;


    email.nome_FICHEIRO = (formato == 'pdf') ? filename : (filename + "." + formato);

    var data;
    var dados = [];
    if (this.tabeladados.filteredValue) {
      dados = this.tabeladados.filteredValue;
    } else {
      dados = this.tabeladados._value;
    }

    data = [{ dados: JSON.stringify(dados) }];

    this.RelatoriosService.downloadPDF2(formato, filename, data, filenametransfer, "planos_de_acao").subscribe(
      (res) => {

        this.EmailService.enviarEmail(email).subscribe(
          res => {
            this.bt_disable = false;
            this.dialog_enviar_email = false;

            this.showMessage('success', 'Sucesso', 'Email Enviado com Sucesso!');
          }, error => {
            this.showMessage('error', 'Erro', 'ERRO!! Email não foi Enviado!');
            this.bt_disable = false;
          });


      }, error => {
        this.bt_disable = false;
        this.showMessage('error', 'Erro', 'ERRO!! Falha ao gerar o Ficheiro!');
        console.log(error);
      });
  }


  /** */
  search(event) {
    var input = (<HTMLInputElement><any>document.getElementById('autocompleteinput'));
    this.results = this.pesquisaemail(event.query);
    var symbol = ";";
    if (event.query.indexOf(",") >= 0) symbol = ",";
    if (event.query.indexOf(symbol) >= 0) {
      for (var email of event.query.split(symbol)) {
        //var email = (event.query.substr(0, event.query.indexOf(symbol)));
        if (this.email_para.indexOf(email) < 0 && email.trim().length > 0 && this.validateEmail(email)) {
          this.email_para.push(email);
          input.value = "";
        }
        if (email.trim().length < 0) {
          input.value = "";
        }
      }
    }
  }



  //verifica se é email
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //verifica se existe algum email
  pesquisaemail(text) {
    var result = [];
    for (var x in this.cols) {
      if (this.cols[x].email.includes(text)) {
        result.push(this.cols[x].email);
      }
    }
    return result;
  }


  getutilizadores() {
    this.cols = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          if (this.cols.findIndex(item => item.email == response[x].email) == -1) {
            this.cols.push({ email: response[x].email });
          }
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  /** */


  showMessage(severity, summary, detail) {
    var msgs = [];
    msgs.push({ severity: severity, summary: summary, detail: detail });
    this.UploadService.addMessage(msgs);
  }


}
