import { Component, OnInit } from '@angular/core';
import { GTMOVTAREFASService } from '../../../servicos/gt-mov-tarefas.service';
import { RCDICACCOESRECLAMACAOService } from '../../../servicos/rc-dic-accoes-reclamacao.service';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private GTMOVTAREFASService: GTMOVTAREFASService, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService) { }
  ngOnInit() {
    this.cols = [];
    this.estados = [
      { label: 'Pendente', value: 'P' },
      { label: 'Lida', value: 'L' },
      { label: 'Em Curso', value: 'E' },
<<<<<<< HEAD
      { label: 'Desenvolvida/ Realizada', value: 'C' },
      { label: 'Cancelada', value: 'A' },
      { label: 'Rejeitada', value: 'R' },
      { label: 'Não Respondida', value: 'N' },
      { label: 'Aprovada', value: 'F' },
      { label: 'Controlada/ Verificada', value: 'V' }
    ];

=======
      { label: 'Conluída', value: 'C' },
      { label: 'Cancelada', value: 'A' },
      { label: 'Rejeitada', value: 'R' }
    ];
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    //this.estado = ["P", "L", "E"];
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];


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

  atualizar() {
    this.cols = [];
    this.tabelalistatarefas = [];
    this.tabelalistatarefas2 = [];

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
<<<<<<< HEAD
    var utilizador_sector = null;
    var todas = false;
=======

>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea

    if (this.tipo_utl.length > 0) {
      for (var x in this.tipo_utl) {
        if (this.tipo_utl[x] == "u") {
          tipo_utilizador = "u";
        } else if (this.tipo_utl[x] == "g") {
          utilizador_grupo = "g";
<<<<<<< HEAD
        } else if (this.tipo_utl[x] == "s") {
          utilizador_sector = "s";
        } else if (this.tipo_utl[x] == "t") {
          todas = true;
=======
        } else if (this.tipo_utl[x] == "t") {
          utilizador_grupo = null;
          tipo_utilizador = null;
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        }
      }
    } else {
      tipo_utilizador = "u";
      utilizador_grupo = "g";
<<<<<<< HEAD
      utilizador_sector = "s";
    }
    if (todas) {
      utilizador_grupo = null;
      tipo_utilizador = null;
      utilizador_sector = null;
    }

    var data = [{
      utilizador: this.user, tipo_utilizador: tipo_utilizador, estado: estado, utilizador_grupo: utilizador_grupo,
      utilizador_sector: utilizador_sector,
=======
    }
    var data = [{
      utilizador: this.user, tipo_utilizador: tipo_utilizador, estado: estado, utilizador_grupo: utilizador_grupo,
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
      datacria1: datacria1, datacria2: datacria2, datafim1: datafim1, datafim2: this.datafim2,
      accao: accao
    }];


    this.GTMOVTAREFASService.getAllbyidUser(this.user, data).subscribe(res => {
      for (var x in res) {
        // console.log(res)

        this.cols.push({
          id_tarefa: res[x][0],
          tarefa: res[x][1],
          reclamacoes_clientes: res[x][2] + ' ( ' + res[x][3] + ' ) - ' + res[x][4],
          title1: "Tarefas não lidas: " + res[x][2] + ', Total Tarefas: ' + res[x][3] + ', Tarefas Encaminhadas: ' + res[x][4],
          reclamacoes_fornecedores: 0 + ' ( ' + 0 + ' ) - ' + 0,
          title2: "Tarefas não lidas: " + 0 + ', Total Tarefas: ' + 0 + ', Tarefas Encaminhadas: ' + 0,
<<<<<<< HEAD
          amostras: res[x][5] + ' ( ' + res[x][6] + ' ) - ' + res[x][7],
          title3: "Tarefas não lidas: " + res[x][5] + ', Total Tarefas: ' + res[x][6] + ', Tarefas Encaminhadas: ' + res[x][7],
          planosacao: res[x][8] + ' ( ' + res[x][9] + ' ) - ' + res[x][10],
          title4: "Tarefas não lidas: " + res[x][8] + ', Total Tarefas: ' + res[x][9] + ', Tarefas Encaminhadas: ' + res[x][10],
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        });
      }

      this.cols = this.cols.slice();

    }, error => {
      console.log(error);
    });

    this.GTMOVTAREFASService.getbyFiltros(data).subscribe(resp => {

      for (var x in resp) {

        var estados = "";

        switch (resp[x][8]) {
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
<<<<<<< HEAD
            estados = "Desenvolvida/ Realizada";
=======
            estados = "Concluída";
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
            break;
          case 'A':
            estados = "Cancelada";
            break;
          case 'R':
            estados = "Rejeitada";
            break;
<<<<<<< HEAD
          case 'N':
            estados = "Não Respondida";
            break;
          case 'F':
            estados = "Aprovada";
            break;
          case 'V':
            estados = "Controlada/ Verificada";
            break;
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
          default:
            estados = "Pendente";
        }


        var atribuido = "";
        if (resp[x][16] != null) {
          atribuido = resp[x][16];
        } else {
          atribuido = resp[x][3];
        }

        if (resp[x][8] == "P" || resp[x][8] == "L" || resp[x][8] == "E") {
          this.tabelalistatarefas.push({
            nome: resp[x][0],
            utz_origem: resp[x][1],
            dep_origem: "",
            data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
            atribuido: atribuido,
            encaminhado: resp[x][4],
            data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
            prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
            prioridade: resp[x][7],
            estado: estados,
            cliente: resp[x][9],
<<<<<<< HEAD
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
=======
            referencia: resp[x][10] + "" + resp[x][11],
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
            data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
            utz_concluiu: resp[x][13],
            id_tarefa: resp[x][14]
          });
        } else {
          this.tabelalistatarefas2.push({
            nome: resp[x][0],
            utz_origem: resp[x][1],
            dep_origem: "",
            data_atribuicao: (resp[x][2] != null) ? this.formatDate(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString() : null,
            atribuido: atribuido,
            encaminhado: resp[x][4],
            data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) + " " + new Date(resp[x][5]).toLocaleTimeString() : null,
            prazo_conclusao: (resp[x][6] != null) ? this.formatDate(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString() : null,
            prioridade: resp[x][7],
            estado: estados,
            cliente: resp[x][9],
<<<<<<< HEAD
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
=======
            referencia: resp[x][10] + "" + resp[x][11],
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
            data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
            utz_concluiu: resp[x][13],
            id_tarefa: resp[x][14]
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

}