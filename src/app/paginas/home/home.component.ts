import { Component, OnInit, ElementRef } from '@angular/core';
import { RelatoriosService } from "app/servicos/relatorios.service";
import { Message } from "primeng/primeng";
import { webUrl } from 'assets/config/webUrl';
import { GERFAVORITOSService } from 'app/servicos/ger-favoritos.service';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mod_prod: any;
  data3 = null;
  data2 = null;
  data: any;
  data1: any;
  favoritos: any[];
  list = false;
  tabelalistatarefas: any[];
  tabelalistatarefas2: any[];
  drop_accoes: any[];
  accao: any[] = null;
  datacria1 = null;
  datacria2 = null;
  datafim1 = null;
  datafim2 = null;
  estados;
  estado: any[];
  tipo_utl: string[] = ['u'];
  cols: any[];
  user;
  constructor(private router: Router, private elementRef: ElementRef, private GERFAVORITOSService: GERFAVORITOSService, private GTMOVTAREFASService: GTMOVTAREFASService,
    private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService) {

    if (document.getElementById("script1")) document.getElementById("script1").remove();
    var script1 = document.createElement("script");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/jqbtk.js");
    document.body.appendChild(script1);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    if (document.getElementById("script2")) document.getElementById("script2").remove();
    var script2 = document.createElement("script");
    script2.setAttribute("id", "script2");
    script2.setAttribute("src", "assets/js/initMenu.js");
    document.body.appendChild(script2);

    this.mod_prod = true;// webUrl.mod_pro;

    if (!this.mod_prod) this.carregagraficos();
    this.atualizar();
    this.carregafavoritos();
  }

  carregafavoritos() {

    if (JSON.parse(localStorage.getItem('userapp'))) {
      var id = JSON.parse(localStorage.getItem('userapp'))["id"];
      this.GERFAVORITOSService.getbyid(id).subscribe(
        response => {
          this.favoritos = [];
          var lista = '';
          for (var x in response) {
            this.favoritos.push({ id_FAVORITO: response[x][0].id_FAVORITO, descricao: response[x][0].descricao, url: response[x][0].url })
            lista = response[x][1];
          }
          if (lista == "List") {
            this.list = true;
          } else {
            this.list = false;
          }
        },
        error => { console.log(error); });
    }
  }

  alterar_lista(val) {
    this.list = val;
    var lista = "Grid"
    if (val) lista = "List";
    var id = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.GERFAVORITOSService.getUPDATETIPO_LISTA(id, lista).subscribe(
      response => {
      },
      error => { console.log(error); });
  }

  carregagraficos() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    this.data3 = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#36A2EB"
        ],
        label: 'My dataset'
      }],
      labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
      ]
    };
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
      utilizador_sector: utilizador_sector,
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
          amostras: res[x][5] + ' ( ' + res[x][6] + ' ) - ' + res[x][7],
          title3: "Tarefas não lidas: " + res[x][5] + ', Total Tarefas: ' + res[x][6] + ', Tarefas Encaminhadas: ' + res[x][7],
          planosacao: res[x][8] + ' ( ' + res[x][9] + ' ) - ' + res[x][10],
          title4: "Tarefas não lidas: " + res[x][8] + ', Total Tarefas: ' + res[x][9] + ', Tarefas Encaminhadas: ' + res[x][10],
          derrogacoes: res[x][11] + ' ( ' + res[x][12] + ' ) - ' + res[x][13],
          title5: "Tarefas não lidas: " + res[x][11] + ', Total Tarefas: ' + res[x][12] + ', Tarefas Encaminhadas: ' + res[x][13],
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
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
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
            referencia: ((resp[x][10] == null) ? "" : resp[x][10] + " - ") + ((resp[x][11] == null) ? "" : resp[x][11]),
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

  goToTarefas(id) {
    this.router.navigate(['tarefas'], { queryParams: { id: id } });
  }

}
