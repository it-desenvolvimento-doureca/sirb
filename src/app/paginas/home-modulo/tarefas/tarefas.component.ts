import { Component, OnInit } from '@angular/core';
import { GTMOVTAREFASService } from '../../../servicos/gt-mov-tarefas.service';
import { RCDICACCOESRECLAMACAOService } from '../../../servicos/rc-dic-accoes-reclamacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  cols = [];
  user: any;
  estados;
  estado: any[];
  tabelalistatarefas: any[];
  tabelalistatarefas2: any[];
  drop_accoes: any[];
  accao: any[] = null;
  datacria1 = null;
  datacria2 = null;
  datafim1 = null;
  datafim2 = null;
  tipo_utl: string[] = ['u'];
  classstep = "step1";
  listasubtarefasdialog: any[];
  displaylistasubtarefasdialog: boolean;
  sow_col1 = false;
  sow_col2 = false;
  sow_col3 = false;
  sow_col4 = false;
  sow_col5 = false;
  sow_col6 = false;
  total_colspan = 0;
  drop_origens = [
    { label: "Escolher", value: null },
    { label: 'Reclamações Clientes', value: 'reclamacoes_clientes' },
    { label: 'Reclamações Fornecedores', value: 'reclamacoes_fornecedores' },
    { label: 'Amostras', value: 'amostras' },
    { label: 'Planos de Ação', value: 'planosacao' },
    { label: 'Planos Estratégicos', value: 'planosestrategicos' },
    { label: 'Derrogações', value: 'derrogacoes' }
  ];
  origem;

  constructor(private route: ActivatedRoute, private router: Router, private GTMOVTAREFASService: GTMOVTAREFASService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService) { }
  ngOnInit() {
    this.cols = [];
    this.estados = [
      { label: 'Pendente', value: 'P' },
      { label: 'Lida', value: 'L' },
      { label: 'Em Curso', value: 'E' },
      { label: 'Desenvolvida/ Realizada', value: 'C' },
      { label: 'Cancelada', value: 'A' },
      { label: 'Rejeitada', value: 'R' },
      { label: 'Não Respondida', value: 'N' },
      { label: 'Aprovada', value: 'F' },
      { label: 'Controlada/ Verificada', value: 'V' }
    ];

    //this.estado = ["P", "L", "E"];
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var id = null;
    var modulo = null;
    var tipo_utl = null;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || null;
        modulo = params['modulo'] || null;
        tipo_utl = params['tipo_utl'] || null;
      });

    if (id != null) this.accao = [id];
    this.tipo_utl = (tipo_utl == null) ? ['u'] : tipo_utl.split(',');

    this.origem = modulo;
    this.atualizar();

    this.carregaaccoes();

  }

  atualizaTarefa(id) {
    this.accao = [id];
    this.atualizar();
  }

  carregaaccoes() {
    this.drop_accoes = [];
    this.RCDICACCOESRECLAMACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }
        this.drop_accoes = this.drop_accoes.slice();

      },
      error => { console.log(error); });

  }

  abrir(event) {
    this.router.navigate(['tarefas/view'], { queryParams: { id: event.data.id_tarefa } });
  }

  atualizar(id_modulo = null, sub_modulo = null) {
    var id_modulo = null;
    var sub_modulo = null;
    var planosestrategicos = null;
    if (this.origem == 'reclamacoes_clientes') {
      id_modulo = 5;
      sub_modulo = 'C';
    } else if (this.origem == 'reclamacoes_fornecedores') {
      id_modulo = 5;
      sub_modulo = 'F';
    } else if (this.origem == 'amostras') {
      id_modulo = 10;
      sub_modulo = 'A';
    } else if (this.origem == 'planosacao') {
      id_modulo = 13;
      sub_modulo = 'PA';
      planosestrategicos = 2;
    } else if (this.origem == 'planosestrategicos') {
      id_modulo = 13;
      sub_modulo = 'PA';
      planosestrategicos = 1;
    } else if (this.origem == 'derrogacoes') {
      id_modulo = 5;
      sub_modulo = 'D';
    }

    this.cols = [];
    this.tabelalistatarefas = [];
    this.tabelalistatarefas2 = [];
    this.total_colspan = 0;
    var accao = null;
    var estado = null;

    if (this.accao && this.accao.length > 0) accao = this.accao.toString();
    if (this.estado && this.estado.length > 0) {
      var primeiro = true;
      estado = "";
      for (var x in this.estado) {
        if (!primeiro) estado += ",";
        estado += "'" + this.estado[x] + "'";
        primeiro = false;
      }
    }

    var datacria1 = new Date(this.datacria1).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
    var datacria2 = new Date(this.datacria2).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
    var datafim1 = new Date(this.datafim1).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
    var datafim2 = new Date(this.datafim2).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");

    if (isNaN(new Date(this.datacria1).getDate()) || datacria1 == '1970-01-01') datacria1 = null;
    if (isNaN(new Date(this.datacria2).getDate()) || datacria2 == '1970-01-01') datacria2 = null;
    if (isNaN(new Date(this.datafim1).getDate()) || datafim1 == '1970-01-01') datafim1 = null;
    if (isNaN(new Date(this.datafim2).getDate()) || datafim2 == '1970-01-01') datafim2 = null;
    var tipo_utilizador = null;
    var utilizador_grupo = null;
    var utilizador_sector = null;
    var todas = false;

    if (this.tipo_utl.length > 0) {
      for (var x in this.tipo_utl) {
        if (this.tipo_utl[x] == "u") {
          tipo_utilizador = "u";
        } else if (this.tipo_utl[x] == "g") {
          utilizador_grupo = "g";
        } else if (this.tipo_utl[x] == "s") {
          utilizador_sector = "s";
        } else if (this.tipo_utl[x] == "t") {
          todas = true;
        }
      }
    } else {
      tipo_utilizador = "u";
      utilizador_grupo = "g";
      utilizador_sector = "s";
    }
    if (todas) {
      utilizador_grupo = null;
      tipo_utilizador = null;
      utilizador_sector = null;
    }

    var data = [{
      utilizador: this.user, tipo_utilizador: tipo_utilizador, estado: estado, utilizador_grupo: utilizador_grupo,
      utilizador_sector: utilizador_sector, modulo: id_modulo, submodulo: sub_modulo,
      datacria1: datacria1, datacria2: datacria2, datafim1: datafim1, datafim2: this.datafim2,
      accao: accao, planosestrategicos: planosestrategicos
    }];

    var show1 = false;
    var show2 = false;
    var show3 = false;
    var show4 = false;
    var show5 = false;
    var show6 = false;

    this.GTMOVTAREFASService.getAllbyidUser(this.user, data).subscribe(res => {
      for (var x in res) {
        if (res[x][3] > 0) {
          show1 = true;
        }
        if (res[x][23] > 0) {
          show2 = true;
        }
        if (res[x][6] > 0) {
          show3 = true;

        }
        if (res[x][9] > 0) {
          show4 = true;
        }
        if (res[x][15] > 0) {
          show5 = true;
        }
        if (res[x][12] > 0) {
          show6 = true;
        }
        this.cols.push({
          id_tarefa: res[x][0],
          tarefa: res[x][1],
          reclamacoes_clientes: res[x][2] + ' ( ' + res[x][3] + ' ) - ' + res[x][4],
          title1: "Tarefas não lidas: " + res[x][2] + ', Total Tarefas: ' + res[x][3] + ', Tarefas Encaminhadas: ' + res[x][4] + ', Tarefas em Atraso: ' + res[x][17],
          tarefas_atraso: res[x][17],
          reclamacoes_fornecedores: res[x][22] + ' ( ' + res[x][23] + ' ) - ' + res[x][24],
          title2: "Tarefas não lidas: " + res[x][22] + ', Total Tarefas: ' + res[x][23] + ', Tarefas Encaminhadas: ' + res[x][24] + ', Tarefas em Atraso:' + res[x][25],
          tarefas_atraso_fornecedores: res[x][25],
          amostras: res[x][5] + ' ( ' + res[x][6] + ' ) - ' + res[x][7],
          title3: "Tarefas não lidas: " + res[x][5] + ', Total Tarefas: ' + res[x][6] + ', Tarefas Encaminhadas: ' + res[x][7] + ', Tarefas em Atraso: ' + res[x][18],
          tarefas_amostras: res[x][18],
          planosacao: res[x][8] + ' ( ' + res[x][9] + ' ) - ' + res[x][10],
          title4: "Tarefas não lidas: " + res[x][8] + ', Total Tarefas: ' + res[x][9] + ', Tarefas Encaminhadas: ' + res[x][10] + ', Tarefas em Atraso: ' + res[x][19],
          tarefas_atraso_planosaco: res[x][19],
          derrogacoes: res[x][11] + ' ( ' + res[x][12] + ' ) - ' + res[x][13],
          title5: "Tarefas não lidas: " + res[x][11] + ', Total Tarefas: ' + res[x][12] + ', Tarefas Encaminhadas: ' + res[x][13] + ', Tarefas em Atraso: ' + res[x][20],
          tarefas_atraso_derrogacoes: res[x][20],
          planosestrategicos: res[x][14] + ' ( ' + res[x][15] + ' ) - ' + res[x][16],
          title6: "Tarefas não lidas: " + res[x][14] + ', Total Tarefas: ' + res[x][15] + ', Tarefas Encaminhadas: ' + res[x][16] + ', Tarefas em Atraso: ' + res[x][21],
          tarefas_atraso_planosestrategicos: res[x][21],
        });
      }

      this.sow_col1 = show1;
      this.sow_col2 = show2;
      this.sow_col3 = show3;
      this.sow_col4 = show4;
      this.sow_col5 = show5;
      this.sow_col6 = show6;

      if (show1) {
        this.total_colspan++;
      }
      if (show2) {
        show2 = true;
        this.total_colspan++;
      }
      if (show3) {
        this.total_colspan++;
      }
      if (show4) {
        this.total_colspan++;
      }
      if (show5) {
        this.total_colspan++;
      }
      if (show6) {
        this.total_colspan++;
      }

      this.cols = this.cols.slice();

    }, error => {
      console.log(error);
    });

    this.GTMOVTAREFASService.getbyFiltros(data).subscribe(resp => {

      for (var x in resp) {

        var estados = this.geEstado(resp[x][8]);


        var atribuido = "";
        if (resp[x][16] != null) {
          atribuido = resp[x][16];
        } else {
          atribuido = resp[x][3];
        }

        var data = this.formatDate(new Date());
        var prazo_conclusao = this.formatDate(resp[x][6]);

        var cor = "";
        var cor_letra = "";
        if (new Date(prazo_conclusao).getTime() < new Date(data).getTime()) {
          cor = "red";
          cor_letra = "white";
        } else if (new Date(prazo_conclusao).getTime() == new Date(data).getTime()) {
          cor = "yellow";
        }


        if (resp[x][8] == "P" || resp[x][8] == "L" || resp[x][8] == "E") {
          this.tabelalistatarefas.push({
            cor_letra: cor_letra,
            cor: cor,
            id: resp[x][14],
            nome: resp[x][0],
            utz_origem: resp[x][1],
            existesubtarefas: (resp[x][34] > 0) ? true : false,
            dep_origem: "",
            data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
            atribuido: atribuido,
            encaminhado: resp[x][4],
            data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
            prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
            prioridade: resp[x][7],
            estado: estados,
            cliente: resp[x][9],
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
            data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
            utz_concluiu: resp[x][13],
            id_tarefa: resp[x][14],
            observacoes: resp[x][21],
          });
        } else {
          this.tabelalistatarefas2.push({
            id: resp[x][14],
            nome: resp[x][0],
            utz_origem: resp[x][1],
            existesubtarefas: (resp[x][34] > 0) ? true : false,
            dep_origem: "",
            data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
            atribuido: atribuido,
            encaminhado: resp[x][4],
            data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
            prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
            prioridade: resp[x][7],
            estado: estados,
            cliente: resp[x][9],
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
            data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
            utz_concluiu: resp[x][13],
            id_tarefa: resp[x][14],
            observacoes: resp[x][21],
          });
        }
      }
      this.tabelalistatarefas = this.tabelalistatarefas.slice();
      this.tabelalistatarefas2 = this.tabelalistatarefas2.slice();
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

  resetActive(event, step) {
    this.classstep = step;
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
}
