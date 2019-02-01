import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABMOVMANUTENCAOCABService } from 'app/servicos/ab-mov-manutencao-cab.service';
import { ABMOVMANUTENCAOLINHAService } from 'app/servicos/ab-mov-manutencao-linha.service';

@Component({
  selector: 'app-historico-manutencoes',
  templateUrl: './historico-manutencoes.component.html',
  styleUrls: ['./historico-manutencoes.component.css']
})
export class HistoricoManutencoesComponent implements OnInit {
  classif;
  hora_manutencao: string;
  options;
  datasetsgraf = [];
  labelgraf = [];
  data1 = {};
  id: any;
  total_rows = 0;
  codigo_manutencao: number;
  data_manutencao: string;
  linha: number;
  banho: string;
  tina: string;
  num_items = 14;
  inicio = 0;
  rows_show = 0;
  location: Location;

  corpo: any = [];
  cabecalho: any = [];

  constructor(location: Location, private route: ActivatedRoute, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private globalVar: AppGlobals) { this.location = location; }

  ngOnInit() {
    this.globalVar.setvoltar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setcriar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    var acessohistorico = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001historico");
    if (!acessohistorico) {
      this.location.back();
    }
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.classif = params['classif'] || 0;
      });
    if (id != 0) {
      this.carregadados();
    } else {
      this.location.back();
    }

  }

  carregadados() {
    this.corpo = [];
    this.cabecalho = [];
    this.labelgraf = [];
    this.datasetsgraf = [];
    this.data1 = [];

    this.ABMOVMANUTENCAOCABService.getbyID_cab(this.id).subscribe(result => {
      this.codigo_manutencao = result[0][0].id_MANUTENCAO;
      this.data_manutencao = this.formatDate(result[0][10]);
      this.hora_manutencao = ", " + result[0][11].slice(0, 5);
      this.linha = result[0][7].id_LINHA;
      this.banho = result[0][0].id_BANHO + "/ " + result[0][4];
      this.tina = result[0][5];
      this.labelgraf.push(this.data_manutencao);
      this.manutencoes(result[0][0].id_MANUTENCAO_CAB, result[0][0].id_BANHO, this.inicio, this.inicio + this.num_items);
    },
      error => { console.log(error); });

  }


  manutencoes(id, id_banho, inicio, fim) {
    if(this.classif == 0) this.classif = "M";
    this.ABMOVMANUTENCAOCABService.getbyID_banho(id_banho, inicio, fim, this.id,this.classif).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          this.total_rows = response[0][3];

          this.rows_show = (this.inicio + this.num_items <= this.total_rows) ? this.inicio + this.num_items : this.total_rows;
          for (var x in response) {
            var data = this.formatDate(response[x][1]);
            this.labelgraf.push(data);
            this.cabecalho.push({ id: response[x][0], data: data, hora: (response[x][2]).slice(0, 5), dia: days[new Date(response[x][1]).getDay()] });
          }
          this.aditivos(id, id_banho, true);
        } else {
          this.aditivos(id, id_banho, false);
        }
      },
      error => { console.log(error); });
  }

  aditivos(id, id_banho, graf) {

    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir aditivos do banho

        if (count > 0) {
          var id_aditiv = [];
          this.datasetsgraf.push({
            label: "Todos", data: [], fill: false, borderColor: [
              '#black'
            ],
            borderWidth: 2
          });
          for (var x in response) {
            id_aditiv.push(response[x][1].id_COMPONENTE)

            var calculo = (response[x][0].valor1 != null) ? (response[x][0].valor1 != null) ? parseFloat(response[x][0].valor1).toFixed(2) : null : "";
            var dados = [];
            var dados2 = [];
            dados2.push(calculo);
            for (var y in this.cabecalho) {
              dados.push({ valor: "" });
              dados2.push(null);
            }
            this.corpo.push({ id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE + ' (' + response[x][2] + ')', resultado: calculo, valores: dados })
            this.datasetsgraf.push({ id: response[x][1].id_COMPONENTE, label: response[x][1].nome_COMPONENTE + ' (' + response[x][2] + ')', data: dados2, fill: false, borderColor: this.getRandomColor(x), borderWidth: 2 });
          }

          for (var y in this.cabecalho) {
            this.getresultados(this.cabecalho[y].id, id_aditiv, id_banho, y)
          }
          if (!graf) this.carregagraficos();
        }

      },
      error => { console.log(error); });

  }

  getresultados(id, id_aditiv, id_banho, count) {

    this.ABMOVMANUTENCAOLINHAService.getbyID_comp(id, id_aditiv).subscribe(
      response => {
        for (var x in response) {
          var index_comp = null;
          var index_manutencao = null;
          var index_datasetsgraf = null;
          index_comp = this.corpo.find(item => item.id == response[x].id_ADITIVO);
          index_manutencao = this.cabecalho.findIndex(item => item.id == response[x].id_MANUTENCAO_CAB);
          index_datasetsgraf = this.datasetsgraf.find(item => item.id == response[x].id_ADITIVO)
          //console.log(response)
          if (index_comp != null && index_manutencao != null) {
            index_comp.valores[index_manutencao].valor = (response[x].valor1 != null) ? parseFloat(response[x].valor1).toFixed(2) : null;
            var calculo3 = (response[x].valor1 != null) ? parseFloat(response[x].valor1).toFixed(2) : null;

            index_datasetsgraf.data[index_manutencao + 1] = calculo3
          }

        }
        if ((parseInt(count) + 1) == this.cabecalho.length) this.carregagraficos();

      },
      error => { console.log(error); });
  }

  anterior() {
    this.inicio = this.inicio - this.num_items;
    if (this.inicio < 0) {
      this.inicio = 0;
    } else if (this.inicio >= 0) {
      this.carregadados();
    }
  }

  seguinte() {
    var temp = this.inicio + this.num_items;
    if (temp <= this.total_rows) {
      this.inicio = this.inicio + this.num_items;
      this.carregadados();
    }
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


  carregagraficos() {
    this.data1 = {
      labels: this.labelgraf,
      datasets: this.datasetsgraf
    };

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }, legend: {
        labels: {
          fontColor: "black"
        }
      },
    }
  }

  //criar cores 
  getRandomColor(i) {
    var colors = ["blue", "green", "red", "yellow", "orange", "violet", "indigo", "olive", "pink", "#B22222", "#4682B4", "#708090", "#A0522D", "#800080", "#6B8E23", "#66CDAA", "#ADFF2F"];
    var n = i % colors.length
    return colors[n];
  }

}