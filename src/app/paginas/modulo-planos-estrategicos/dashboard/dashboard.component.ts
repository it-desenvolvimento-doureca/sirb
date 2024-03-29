import { Component, OnInit } from '@angular/core';
import { PEMOVCABService } from 'app/servicos/pe-mov-cab.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabela1 = [];
  tabela2 = [];
  accoes_planeadas = 0;
  execucao_planeada = 0;
  execucao_atual = 0;
  accoes_atraso = 0;
  data1 = {};
  pagina1 = 1;
  pagina2 = 1;

  vermais1 = true;
  vermais2 = true;
  options1 = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Análise da Execução do Plano',
      fontSize: 16
    },
    legend: {
      position: 'bottom',
      display: true
    },
    tooltips: {
      mode: 'index',
      callbacks: {
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
        label: function (tooltipItems, data) {

          return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' % (' +
            formatMoney(data.datasets[tooltipItems.datasetIndex].total[tooltipItems.index], 0, ",", ".") + ')';


        }
      },
    },
    animation: {
      onComplete: drawBarValues
    },
    hover: { animationDuration: 0 },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "%" },
          label: 'label',
          beginAtZero: true,
          max: 100,
        }, scaleLabel: {
          display: true,
        },
        gridLines: {
          display: false
        }
      }],
    },
  };

  anos = [];
  ano = null
  constructor(private PEMOVCABService: PEMOVCABService) { }

  ngOnInit() {

    for (var x = 2021; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    this.ano = new Date().getFullYear();

    this.carregacontadores();
    this.carregagrafico();
    this.carregatabela2(true);
    this.carregatabela1(true);

  }

  atualiza() {
    this.carregacontadores();
    this.carregagrafico();
    this.carregatabela2(true);
    this.carregatabela1(true);
  }

  carregagrafico() {
    var data = [{ ANO: this.ano }];
    var cores = ['#1fb5ac', '#aec785', '#ff6c60'];
    this.PEMOVCABService.PE_GET_ANALISE_GRAFICO(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        var labels = [];
        var dataPlaneadas = [];
        var dataConcluidas = [];
        var dataEmAtraso = [];
        var totalPlaneadas = [];
        var totalConcluidas = [];
        var totalEmAtraso = [];
        var datasets = [];
        if (count > 0) {
          for (var x in response) {
            labels.push(response[x][1] + ' (' + response[x][0] + ')');
            dataPlaneadas.push(response[x][2]);
            dataConcluidas.push(response[x][3]);
            dataEmAtraso.push(response[x][4]);

            totalPlaneadas.push(response[x][7]);
            totalConcluidas.push(response[x][5]);
            totalEmAtraso.push(response[x][6]);
          }

          datasets.push({
            label: 'Planeadas',
            backgroundColor: cores[0],
            borderColor: cores[0],
            data: dataPlaneadas,
            total: totalPlaneadas
          }, {
            label: 'Concluídas',
            backgroundColor: cores[1],
            borderColor: cores[1],
            data: dataConcluidas,
            total: totalConcluidas
          }, {
            label: 'Em Atraso',
            backgroundColor: cores[2],
            borderColor: cores[2],
            data: dataEmAtraso,
            total: totalEmAtraso
          })
        }


        this.data1 = {
          labels: labels,
          datasets: datasets/*[
            {
              label: ["Departamentos"],
              backgroundColor: ['#fa8564', '#1fb5ac', '#aec785', '#a48ad4', '#fdd752', '#ff6c60'],
              borderColor: ['#fa8564', '#1fb5ac', '#aec785', '#a48ad4', '#fdd752', '#ff6c60'],
              data: data
            },
          ],*/


        };
      }, error => { console.log(error); });
  }

  carregacontadores() {
    var data = [{ ANO: this.ano }];
    this.PEMOVCABService.PE_GET_ANALISE_CONTADORES(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          this.accoes_planeadas = response[0][0];
          this.execucao_planeada = response[0][1];
          this.execucao_atual = response[0][2];
          this.accoes_atraso = response[0][3];
        }

      }, error => { console.log(error); });
  }

  carregatabela1(limpa_tabela) {
    if (limpa_tabela) {
      this.tabela1 = [];
      this.pagina1 = 1;
      this.vermais1 = true;
    } else {
      this.pagina1++;
    }
    var data = [{ ANO: this.ano, PAGINA: this.pagina1 }];
    this.PEMOVCABService.PE_GET_ACOES_EM_ATRASO(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {
            this.tabela1.push({
              acao: response[x][0],
              responsavel: response[x][1],
              departamento: response[x][2],
              data_objetivo: response[x][3],
              n_dias: response[x][4],
            })
          }
        } else {
          if (!limpa_tabela) this.vermais1 = false;
        }

      }, error => { console.log(error); });
  }

  carregatabela2(limpa_tabela) {
    if (limpa_tabela) {
      this.tabela2 = [];
      this.pagina2 = 1;
      this.vermais2 = true;

    } else {
      this.pagina2++;
    }
    var data = [{ ANO: this.ano, PAGINA: this.pagina2 }];
    this.PEMOVCABService.PE_GET_ULTIMAS_ACOES_CONCLUIDAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          for (var x in response) {
            this.tabela2.push({
              acao: response[x][0],
              responsavel: response[x][1],
              departamento: response[x][2],
              data_objetivo: response[x][3],
              data_conclusao: this.formatDate(response[x][4]),
            })

          }
        } else {
          if (!limpa_tabela) this.vermais2 = false;
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
}




function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

function drawBarValues() {
  // render the value of the chart above the bar
  var ctx = this.chart.ctx;

  ctx.fillStyle = '#666666'
  ctx.font = "10px Helvetica Neue, Helvetica, Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'center';

  this.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false) { continue; }
      var bar = dataset._meta[Object.keys(dataset._meta)[0]].data[i];
      var model = bar._model;
      var barWidth = bar._model.x - bar._model.base;
      var centerX = bar._model.base + barWidth / 2;
      if (dataset.data[i] !== null && dataset.label != 'Linha de Tendência') {
        //ctx.fillText(formatMoney(dataset.data[i], 2, ",", ".") + ' %', model.x + 2, model.y + 2);
        if (dataset.data[i] > 0) ctx.fillText(formatMoney(dataset.data[i], 2, ",", ".") + ' %', centerX, bar._model.y + 4);
      }
    }
  });
}