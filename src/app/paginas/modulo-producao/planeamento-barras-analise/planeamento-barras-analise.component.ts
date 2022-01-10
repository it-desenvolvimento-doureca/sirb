import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { PLANEAMENTOCABService } from 'app/servicos/planeamento-cab.service';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-planeamento-barras-analise',
  templateUrl: './planeamento-barras-analise.component.html',
  styleUrls: ['./planeamento-barras-analise.component.css']
})
export class PlaneamentoBarrasAnaliseComponent implements OnInit {
  linha;
  dados_linha = [];
  anos = [];
  semanas = [];
  ano;
  semana;
  cor_linha: any;
  data1 = {};
  data2 = {};
  data3 = {};
  options1 = {
    title: {
      display: true,
      text: '% Cumprimento do Plano',
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
          if (data.datasets[tooltipItems.datasetIndex].label == 'Linha de Tendência') {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          } else {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          }

        }
      },
    },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "%" },
          label: 'label',
          beginAtZero: false,
        }, scaleLabel: {
          display: true,
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          label: '',
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options2 = {
    title: {
      display: true,
      text: '% Ocupação da Linha',
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
          if (data.datasets[tooltipItems.datasetIndex].label == 'Linha de Tendência') {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          } else {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          }

        }
      },
    },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "%" },
          label: 'label',
          beginAtZero: false,
        }, scaleLabel: {
          display: true,
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          label: '',
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options3 = {
    title: {
      display: true,
      text: '% Ocupação Total da Linha',
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
          if (data.datasets[tooltipItems.datasetIndex].label == 'Linha de Tendência') {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          } else {
            return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
              + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
          }

        }
      },
    },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "%" },
          label: 'label',
          beginAtZero: false,
        }, scaleLabel: {
          display: true,
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          label: '',
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };
  linhas = [];
  loading_analise;
  loading: boolean;
  constructor(private ABDICLINHAService: ABDICLINHAService, private location: Location, private elementRef: ElementRef, private confirmationService: ConfirmationService,
    private route: ActivatedRoute, private renderer: Renderer, private PLANEAMENTOCABService: PLANEAMENTOCABService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var y = 1; y <= 53; y++) {
      this.semanas.push({ value: y, label: y })
    }



    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);

    this.ano = new Date().getUTCFullYear();
    this.semana = this.getWeek(new Date());
    this.preenchelinhas();

  }

  atualiza_graficos() {
    this.loading_analise = true;
    var label = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    this.PLANEAMENTOCABService.ANALISE_PLANEAMENTO_BARRAS([{ ANO: this.ano, SEMANA: this.semana, LINHA: this.linha.id }]).subscribe(
      response => {

        for (var x in response) {
          label.push('week ' + response[x][1] + ' - ' + response[x][2]);
          data1.push(response[x][3]);
          data2.push(response[x][4]);
          data3.push(response[x][5]);

        }

        this.grafico1(label, data1);
        this.grafico2(label, data2);
        this.grafico3(label, data3);

        this.loading_analise = false;
      },
      error => {
        this.loading_analise = false;
        console.log(error);
      });

    //this.grafico3();
  }





  //% Cumprimento do Plano
  grafico1(labels, data1) {
    //var data1 = [47.73, 51.78, 55.86/*, 40, 50, 60, 70, 80, 90, 100*/];
    var datalinear = [null, null, null, null, null, null, null, null, null, null];
    //var labels = ['week 1', 'week 2', 'week 3'/*, 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10'*/];

    var known_x4 = [];

    for (var x in data1) {
      known_x4.push([parseInt(x) + 1, data1[x], 1])
    }

    var lr = this.linear_regression(known_x4);


    for (var x in data1) {
      var valor = ((lr[0] * (parseInt(x) + 1)) + lr[1]);
      datalinear[parseInt(x)] = valor;
    }

    var cor = this.getRandomColor(1);
    this.data1 = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Linha de Tendência',
          data: datalinear,
          borderColor: 'black',
          backgroundColor: 'black',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: '% Cumprimento do Plano', backgroundColor: cor, borderColor: cor, data: data1, fill: false
        },
      ],


    };

  }

  //% Ocupação da Linha
  grafico2(labels, data2) {
    //var data1 = [104.06, 101.75, 103.35/*, 40, 50, 60, 70, 80, 90, 100*/];
    var datalinear = [null, null, null, null, null, null, null, null, null, null];
    // var labels = ['week 1', 'week 2', 'week 3'/*, 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10'*/];
    var known_x4 = [];

    for (var x in data2) {
      known_x4.push([parseInt(x) + 1, data2[x], 1])
    }

    var lr = this.linear_regression(known_x4);


    for (var x in data2) {
      var valor = ((lr[0] * (parseInt(x) + 1)) + lr[1]);
      datalinear[parseInt(x)] = valor;
    }

    var cor = this.getRandomColor(2);
    this.data2 = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Linha de Tendência',
          data: datalinear,
          borderColor: 'black',
          backgroundColor: 'black',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: '% Ocupação da Linha', backgroundColor: cor, borderColor: cor, data: data2, fill: false
        }
      ],
    };

  }


  //% Ocupação Total da Linha
  grafico3(labels, data3) {
    //*var data1 = [104.06, 101.75, 103.35/*, 40, 50, 60, 70, 80, 90, 100*/];
    var datalinear = [null, null, null, null, null, null, null, null, null, null];
    //var labels = ['week 1', 'week 2', 'week 3'/*, 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10'*/];
    var known_x4 = [];

    for (var x in data3) {
      known_x4.push([parseInt(x) + 1, data3[x], 1])
    }

    var lr = this.linear_regression(known_x4);


    for (var x in data3) {
      var valor = ((lr[0] * (parseInt(x) + 1)) + lr[1]);
      datalinear[parseInt(x)] = valor;
    }

    var cor = this.getRandomColor(3);
    this.data3 = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Linha de Tendência',
          data: datalinear,
          borderColor: 'black',
          backgroundColor: 'black',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: '% Ocupação Total da Linha', backgroundColor: cor, borderColor: cor, data: data3, fill: false
        }
      ],


    };

  }

  getRandomColor(i) {
    var colors = ["olive", "#0275d8", "#f44336", "#faf448", "#ff9800", "#9c27b0", "#2d353c", "#4caf50", "pink", "#B22222", "#4682B4", "#708090", "#A0522D", "#800080", "#6B8E23", "#66CDAA", "#ADFF2F"];
    var n = i % colors.length
    return colors[n];
  }
  //ao alterar semana
  alteraSemana(event) {

  }

  //ao alterar ano
  alteraAno(event) {

  }

  backview() {
    this.location.back();
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();

      },
      error => { console.log(error); });
  }

  getDateOfWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
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


  linear_regression(xyr) {
    var i,
      x, y, r,
      sumx = 0, sumy = 0, sumx2 = 0, sumy2 = 0, sumxy = 0, sumr = 0,
      a, b;

    for (i = 0; i < xyr.length; i++) {
      // this is our data pair
      x = xyr[i][0]; y = xyr[i][1];

      // this is the weight for that pair
      // set to 1 (and simplify code accordingly, ie, sumr becomes xy.length) if weighting is not needed
      r = xyr[i][2];

      // consider checking for NaN in the x, y and r variables here 
      // (add a continue statement in that case)

      sumr += r;
      sumx += r * x;
      sumx2 += r * (x * x);
      sumy += r * y;
      sumy2 += r * (y * y);
      sumxy += r * (x * y);
    }

    // note: the denominator is the variance of the random variable X
    // the only case when it is 0 is the degenerate case X==constant
    b = (sumy * sumx2 - sumx * sumxy) / (sumr * sumx2 - sumx * sumx);
    a = (sumr * sumxy - sumx * sumy) / (sumr * sumx2 - sumx * sumx);

    return [a, b];
  }


  async download() {

    this.loading = true;

    var doc = new jsPDF('l', 'pt', 'a4');

    //if (document.getElementById('tab1_1')) document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));
    //if (document.getElementById('tab2_1')) document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

    doc.setFontSize(10);
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 425, 20, null, null, "center");

    doc.setFont('times')

    doc.text("Pág. 1/3", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    var img_logo = new Image()
    img_logo.src = 'assets/img/logo_doureca.png'
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17, '', 'FAST');

    /*var tab1 = document.getElementById('tab1');
    var printer_1 = document.getElementById('printer_1');
    var g = tab1.cloneNode(true);
    printer_1.appendChild(g);*/

    /*printer_1.children[0].setAttribute("id", "tab1_1");
    document.getElementById('tab1_1').style.position = "absolute";
    document.getElementById('tab1_1').classList.add("active")
    document.getElementById('tab1_1').classList.add("in")*/

    //tab1.style.position = "absolute";
    const options = {
      logging: false
    };


    await html2canvas(document.getElementById('graf1'), options).then(function (canvas) {

      var img = canvas.toDataURL("image/png");
      const bufferX = 5;
      const bufferY = 40;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, '', 'FAST');

      //document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));

      // doc.save('test.pdf');
      //fails to add image to pdf
    });


    doc.addPage();
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 425, 20, null, null, "center");
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17, '', 'FAST');
    doc.setFont('times')

    doc.text("Pág. 2/3", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    await html2canvas(document.getElementById('graf2'), options).then(function (canvas) {
      //document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

      var imgs = canvas.toDataURL("image/png");
      const bufferXs = 5;
      const bufferYs = 40;
      const imgProps = (<any>doc).getImageProperties(imgs);
      const pdfWidths = doc.internal.pageSize.getWidth() - 2 * bufferXs;
      const pdfHeights = (imgProps.height * pdfWidths) / imgProps.width;
      doc.addImage(imgs, 'PNG', bufferXs, bufferYs, pdfWidths, pdfHeights, undefined, 'FAST');
      //doc.save('test.pdf');
    });


    doc.addPage();
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 425, 20, null, null, "center");
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17, '', 'FAST');
    doc.setFont('times')

    doc.text("Pág. 3/3", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    await html2canvas(document.getElementById('graf3'), options).then(function (canvas) {
      //document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

      var imgs = canvas.toDataURL("image/png");
      const bufferXs = 5;
      const bufferYs = 40;
      const imgProps = (<any>doc).getImageProperties(imgs);
      const pdfWidths = doc.internal.pageSize.getWidth() - 2 * bufferXs;
      const pdfHeights = (imgProps.height * pdfWidths) / imgProps.width;
      doc.addImage(imgs, 'PNG', bufferXs, bufferYs, pdfWidths, pdfHeights, undefined, 'FAST');
      //doc.save('test.pdf');
    });

    doc.save('Análise Planeamento de Barras.pdf');

    this.loading = false;


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