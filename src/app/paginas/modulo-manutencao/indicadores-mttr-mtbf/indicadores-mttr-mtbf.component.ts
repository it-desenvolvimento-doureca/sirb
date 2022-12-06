import { Component, OnInit, ViewChild } from '@angular/core';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-indicadores-mttr-mtbf',
  templateUrl: './indicadores-mttr-mtbf.component.html',
  styleUrls: ['./indicadores-mttr-mtbf.component.css']
})
export class IndicadoresMttrMtbfComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  dados = [];
  anos = [];
  meses = [];
  ano;
  mes;
  options_pie = {
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'AGE SUMMARY',
      fontSize: 16
    },
    legend: {
      position: 'left',
      display: true
    }, tooltips: {
      mode: 'index',
      intersect: false,
      yPadding: 2,
      xPadding: 2,
      caretSize: 0,
      borderWidth: 0,
      callbacks: {
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
        label: function (tooltipItems, data) {
          var dataset = data.datasets[tooltipItems.datasetIndex];
          //calculate the total of this data set
          var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          //get the current items value
          var currentValue = dataset.data[tooltipItems.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          var percentage = formatPercentage((((currentValue / total) * 100)), 1);

          return [percentage + "%", + formatPercentage(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 0, ",", ".")];
        }
      },
    },
    animation: {
      onComplete: drawBarValuesPercentage
    },
  };
  data_pie;
  corTotal1 = '';
  corTotal2 = '';
  corTotal3 = '';
  corTotal4 = '';
  corTotal5 = '';
  corTotal6 = '';
  TOTAL1 = 0
  TOTAL2 = 0
  TOTAL3 = 0
  TOTAL4 = 0
  TOTAL5 = 0
  TOTAL6 = 0
  loading = false;
  constructor(private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService) { }

  ngOnInit() {
    this.anos.push({ label: 'Selecionar Ano', value: '' });
    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    this.meses.push({ label: 'Selecionar Mês', value: '' });
    this.meses.push({ label: 'Janeiro', value: 1 });
    this.meses.push({ label: 'Fevereiro', value: 2 });
    this.meses.push({ label: 'Março', value: 3 });
    this.meses.push({ label: 'Abril', value: 4 });
    this.meses.push({ label: 'Maio', value: 5 });
    this.meses.push({ label: 'Junho', value: 6 });
    this.meses.push({ label: 'Julho', value: 7 });
    this.meses.push({ label: 'Agosto', value: 8 });
    this.meses.push({ label: 'Setembro', value: 9 });
    this.meses.push({ label: 'Outubro', value: 10 });
    this.meses.push({ label: 'Novembro', value: 11 });
    this.meses.push({ label: 'Dezembro', value: 12 });

    this.ano = new Date().getUTCFullYear();
    this.mes = new Date().getMonth();



    this.carregaAnalise();

  }

  carregaAnalise() {
    var dados = [{
      ANO: this.ano, MES: this.mes
    }];

    this.dados = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_MTBF_MTTR(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        this.TOTAL1 = 0;
        this.TOTAL2 = 0;
        this.TOTAL3 = 0;
        this.TOTAL4 = 0;
        this.TOTAL5 = 0;
        this.TOTAL6 = 0;
        this.corTotal1 = 'green';
        this.corTotal2 = 'green';
        this.corTotal3 = 'green';
        this.corTotal4 = 'green';
        this.corTotal5 = 'green';
        this.corTotal6 = 'green';

        for (var x in response) {

          this.TOTAL1 += response[x][1];
          this.TOTAL2 += response[x][3];
          this.TOTAL3 += response[x][2];



          this.dados.push({
            maquina: response[x][0],

            HORAS_PRODUTIVAS_MENSAIS_VALOR: response[x][1],
            TEMPO_AVARIA_VALOR: response[x][2],

            HORAS_PRODUTIVAS_MENSAIS: this.formatNumber(response[x][1], 2),
            NUMERO_AVARIAS: response[x][3],
            TEMPO_AVARIA: this.formatNumber(response[x][2], 2),
            MTBF_HORAS: this.formatNumber(response[x][4], 2),
            MTTR: this.formatNumber(response[x][5], 2),
            DISPONIBILIDADE: this.formatNumber(response[x][6], 2)
          });
        }

        this.dados = this.dados.slice();
        this.TOTAL4 = (this.TOTAL2 == 0) ? 0 : ((this.TOTAL1 - this.TOTAL3) / this.TOTAL2);
        this.TOTAL5 = (this.TOTAL2 == 0) ? 0 : (this.TOTAL3 / this.TOTAL2);
        this.TOTAL6 = (this.TOTAL4 + this.TOTAL5 == 0) ? 0 : (this.TOTAL5 / (this.TOTAL4 + this.TOTAL5) * 100);



        this.carregagrafico([this.TOTAL4, this.TOTAL5, this.TOTAL6]);
      },
      error => { console.log(error); });


  }

  atualizatotais() {


    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;


    this.TOTAL1 = 0;
    this.TOTAL2 = 0;
    this.TOTAL3 = 0;
    this.TOTAL4 = 0;
    this.TOTAL5 = 0;
    this.TOTAL6 = 0;
    this.corTotal1 = 'green';
    this.corTotal2 = 'green';
    this.corTotal3 = 'green';
    this.corTotal4 = 'green';
    this.corTotal5 = 'green';
    this.corTotal6 = 'green';


    for (var x in array) {
      this.TOTAL1 += array[x].HORAS_PRODUTIVAS_MENSAIS_VALOR;
      this.TOTAL2 += array[x].NUMERO_AVARIAS;
      this.TOTAL3 += array[x].TEMPO_AVARIA_VALOR;
    }

    this.dados = this.dados.slice();
    this.TOTAL4 = (this.TOTAL2 == 0) ? 0 : ((this.TOTAL1 - this.TOTAL3) / this.TOTAL2);
    this.TOTAL5 = (this.TOTAL2 == 0) ? 0 : (this.TOTAL3 / this.TOTAL2);
    this.TOTAL6 = (this.TOTAL4 + this.TOTAL5 == 0) ? 0 : (this.TOTAL5 / (this.TOTAL4 + this.TOTAL5) * 100);


    //this.carregagrafico([this.TOTAL4, this.TOTAL5, this.TOTAL6]);


  }


  limpar() {
    this.ano = null;
    this.mes = null;
  }

  carregagrafico(dados) {
    this.data_pie = {
      labels: ['MTBF-HORAS', 'MTTR', 'DISPONIBILIDADE'],
      datasets: [
        {
          data: dados,
          backgroundColor: [
            "#5B9BD5",
            "green",
            "red"
          ],
          hoverBackgroundColor: [
            "#5B9BD5",
            "green",
            "red"
          ]
        }]
    };


  }

  formatNumber(amount, decimalCount = 2, decimal = ",", thousands = ".") {
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
}


function drawBarValuesPercentage() {
  // render the value of the chart above the bar
  var ctx = this.chart.ctx;

  ctx.fillStyle = 'white'
  ctx.font = "10px Helvetica Neue, Helvetica, Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  this.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {


      if (dataset._meta[Object.keys(dataset._meta)[0]].data[i].hidden === true) { continue; }

      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
        total = dataset._meta[Object.keys(dataset._meta)[0]].total,
        mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
        start_angle = model.startAngle,
        end_angle = model.endAngle,
        mid_angle = start_angle + (end_angle - start_angle) / 2;

      var x = mid_radius * Math.cos(mid_angle);
      var y = mid_radius * Math.sin(mid_angle);


      var percent = dataset.data[i] / total * 100;
      //Don't Display If Legend is hide or value is 0

      if (dataset.data[i] != 0) {
        ctx.fillText(formatPercentage(percent, 1, ",", ".") + ' %', model.x + x, model.y + y + 15);

      }
    }
  });
}

function formatPercentage(amount, decimalCount = 2, decimal = ",", thousands = ".") {
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