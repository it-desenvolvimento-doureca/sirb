import { Component, OnInit } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-analises',
  templateUrl: './historico-analises.component.html',
  styleUrls: ['./historico-analises.component.css']
})
export class HistoricoAnalisesComponent implements OnInit {
  options;
  datasetsgraf = [];
  labelgraf = [];
  data1 = {};
  id: any;
  total_rows = 0;
  codigo_analise: number;
  data_analise: string;
  linha: number;
  banho: string;
  tina: string;
  num_items = 14;
  inicio = 0;
  rows_show = 0;
  location: Location;

  corpo: any = [];
  cabecalho: any = [];

  constructor(location: Location, private route: ActivatedRoute, private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService, private globalVar: AppGlobals) { this.location = location; }

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

    var acessohistorico = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000historico");

    if(!acessohistorico){
      this.location.back();
    }
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || 0;
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

    this.ABMOVANALISEService.getbyID(this.id).subscribe(result => {
      this.codigo_analise = result[0][0].id_ANALISE;
      this.data_analise = this.formatDate(result[0][0].data_ANALISE);
      this.linha = result[0][0].id_LINHA;
      this.banho = result[0][2].id_BANHO + "/ " + result[0][2].nome_BANHO;
      this.tina = result[0][3];
      this.labelgraf.push(this.data_analise);
      this.analises(result[0][0].id_ANALISE, result[0][0].id_BANHO, this.inicio, this.inicio + this.num_items);
    },
      error => { console.log(error); });

  }


  analises(id, id_banho, inicio, fim) {
    this.ABMOVANALISEService.getbyid_banho(id_banho, inicio, fim, this.id).subscribe(
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
          this.componentes(id, id_banho, true);
        } else {
          this.componentes(id, id_banho, false);
        }
      },
      error => { console.log(error); });
  }

  componentes(id, id_banho, graf) {
    this.ABMOVANALISELINHAService.getbyid_analise(id, id_banho).subscribe(
      response => {

        var count = Object.keys(response).length;
        //se existir componentes do banho

        if (count > 0) {
          var id_comp = [];
          this.datasetsgraf.push({
            label: "Todos", data: [], fill: false, borderColor: [
              '#black'
            ],
            borderWidth: 2});
          for (var x in response) {
            id_comp.push(response[x][1].id_COMPONENTE)

            var calculo = (response[x][0].calculo != null) ? response[x][0].calculo.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '') : "";
            var calculo3 = (response[x][0].calculo != null) ? response[x][0].calculo.toFixed(3) : null;
            var dados = [];
            var dados2 = [];
            dados2.push(calculo3);
            for (var y in this.cabecalho) {
              dados.push({ valor: "", cor: "" });
              dados2.push(null);
            }
            
            var cor = this.verificalimites(response[x][0].calculo,response[x][0].limite_AMARELO_INF, response[x][0].limite_AMARELO_SUP, response[x][0].limite_VERDE_INF, response[x][0].limite_VERDE_SUP);
            this.corpo.push({ cor: cor, id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE, resultado: calculo, valores: dados })
            this.datasetsgraf.push({ id: response[x][1].id_COMPONENTE, label: response[x][1].nome_COMPONENTE, data: dados2, fill: false, borderColor: this.getRandomColor(x), borderWidth: 2 });
          }

          for (var y in this.cabecalho) {
            this.getresultados(this.cabecalho[y].id, id_comp, id_banho, y)
          }
          if (!graf) this.carregagraficos();
        }

      },
      error => { console.log(error); });

  }

  getresultados(id, id_comp, id_banho, count) {

    this.ABMOVANALISELINHAService.getbyid_analise_comp(id, id_comp, id_banho).subscribe(
      response => {

        for (var x in response) {
          var index_comp = null;
          var index_analise = null;
          var index_datasetsgraf = null;
          index_comp = this.corpo.find(item => item.id == response[x].id_COMPONENTE);
          index_analise = this.cabecalho.findIndex(item => item.id == response[x].id_ANALISE);
          index_datasetsgraf = this.datasetsgraf.find(item => item.id == response[x].id_COMPONENTE)
          //console.log(response)
          if (index_comp != null && index_analise != null) {
            index_comp.valores[index_analise].valor = (response[x].calculo != null) ? response[x].calculo.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '') : "";
            index_comp.valores[index_analise].cor = this.verificalimites(response[x].calculo,response[x].limite_AMARELO_INF, response[x].limite_AMARELO_SUP, response[x].limite_VERDE_INF, response[x].limite_VERDE_SUP);
            var calculo3 = (response[x].calculo != null) ? response[x].calculo.toFixed(3) : null;

            index_datasetsgraf.data[index_analise + 1] = calculo3
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


  //Conforme em cada Linha de cada componente seja registado o Resultado e saia do campo, este deve passar a uma cor
  verificalimites(valor, limite_AMARELO_INF, limite_AMARELO_SUP, limite_VERDE_INF, limite_VERDE_SUP) {
    //console.log(limite_AMARELO_INF + '/' + limite_AMARELO_SUP + '/' + limite_VERDE_INF + '/' + limite_VERDE_SUP)

    if (valor != null) {
      valor = valor.toLocaleString().replace(",", ".");
    }
    if (valor == null || valor == "" || (limite_AMARELO_INF == null && limite_AMARELO_SUP == null && limite_VERDE_INF == null && limite_VERDE_SUP == null)) {
      return "none";
    }
    //Verde (se o valor está entre os valores definidos para o limite inferior e superior definido); 
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      return "verde";
    }
    else if (valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      return "verde";
    } else if ((valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP) && (limite_AMARELO_INF == null || limite_AMARELO_SUP == null)) {
      return "none";
    }
    //Amarelo (se o valor estiver entre o intervalo dos limites inferiores e superiores mas fora dos limites verdes
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      return "amarelo";
    }

    //Vermelho (se estiver fora dos intervalos Verde e Amarelo)
    else if ((valor <= limite_AMARELO_INF || valor >= limite_AMARELO_SUP) && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      return "vermelho";
    } else {
      return "none";
    }
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
      },legend: {
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


