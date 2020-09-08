import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FINANALISEDIVIDASService } from 'app/servicos/fin-analise-dividas.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import * as FileSaver from 'file-saver';
import { FIN_DIVIDAS_ATIVIDADE } from 'app/entidades/FIN_DIVIDAS_ATIVIDADE';
import { FINDIVIDASATIVIDADEService } from 'app/servicos/fin-dividas-atividade.service';
import { DataTable } from 'primeng/primeng';
//declare var google: any;
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  mensagemtabela: string;
  tabela: any[] = [];
  totalprazopag = 0;
  totalprazoatraso = 0;
  totaldivida = 0;
  totaldividavenc = 0;
  totalnaovencido = 0;
  total31dias = 0;
  total3160dias = 0;
  total6190dias = 0;
  total91dias = 0;
  totalacordo = 0;
  kams: any[];
  displayEXPORT: boolean;
  lista_resumo: number;
  kam_selecionado: any;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  user: number;
  disabled_bt: boolean;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  kam: any;
  n_cliente: any;
  nome_cliente: any;
  prazo_medio_pag: any;
  prazo_medio_atraso: any;
  total_divida: any;
  total_divida_venc: any;
  nao_vencido: any;
  menos_31_dias: any;
  entre_31_60: any;
  entre_62_90: any;
  maior_91_dias: any;
  acordo: any;
  multiSortMeta = null;
  data: any;
  data1: any;
  data2;
  ativobt = '1';
  average_due = 0;
  total_dev = 0;

  myInnerHeight2 = 300;
  myInnerHeight = 300;
  options_pie = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'AGE SUMMARY',
      fontSize: 16
    },
    legend: {
      position: 'left',
      display: true
    }, tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
        label: function (tooltipItems, data) {
          return " " + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' €';
        }
      },
    }
  };

  options2 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'DEBTS DUE BY KAM',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' €';
        }
      },
    },
    scales: {

      yAxes: [{
        stacked: true,
        ticks: {
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        },
        /*categoryPercentage: .8,
        barPercentage: 1,*/
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        stacked: true,
        position: 'bottom',
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],

      /*},*/
      /*tooltips: {
        custom: function (tooltip) {
          if (!tooltip) return;
          tooltip.displayColors = false;
        },
        callbacks: {
          title: function (tooltipItem, data) {
            return data['desc'][tooltipItem[0]['index']];
          },
          label: function (tooltipItems, data) {
            return 'Total Rejeição: '
              + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + '%';
          },
          afterBody: function (tooltipItem, data) {
            var multistringText = ['Total Produzida: ' + data['produz'][tooltipItem[0]['index']]];
            multistringText.push('Total Rejeição (quant.): ' + data['defeit'][tooltipItem[0]['index']]);
            return multistringText;
          }
        },*/
    },
  };


  options3 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'TOP 15 CUSTOMERS BY AMOUNT DUE',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' €';
        }, afterBody: function (tooltipItem, data) {

          var total = 0;
          for (var x in tooltipItem) {
            total += tooltipItem[x].xLabel;
          }
          var multistringText = [''];
          multistringText.push('Amount Due: ' + formatMoney(total, 2, ",", ".") + ' €');
          return multistringText;
        }
      },
    },
    scales: {

      yAxes: [{
        stacked: true,
        ticks: {
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        },
        /*categoryPercentage: .8,
        barPercentage: 1,*/
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        stacked: true,
        position: 'bottom',
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  /*options3 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'TOP 15 CUSTOMERS BY AMOUNT DUE',
      fontSize: 16
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
        label: function (tooltipItems, data) {
          return " " + data.datasets[tooltipItems.datasetIndex].label + ": "
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' €';
        }
      },
    },
    legend: {
      position: 'bottom',
      display: true
    },
    scales: {

      yAxes: [{
        ticks: {
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        },
        gridLines: {
          display: false
        }
      },],
      xAxes: [{
        position: 'bottom',
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ",") + "€" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],

    }
  };*/

  constructor(private FINDIVIDASATIVIDADEService: FINDIVIDASATIVIDADEService, private FINANALISEDIVIDASService: FINANALISEDIVIDASService, private globalVar: AppGlobals, private RelatoriosService: RelatoriosService, private renderer: Renderer) { }

  ngOnInit() {
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var array = this.globalVar.getfiltros("lista_dividas");
    if (array) {


      this.dataTableComponent.filters = array;

      this.kam = (array['kam'] != undefined) ? array['kam'].value : "";
      this.n_cliente = (array['n_cliente'] != undefined) ? array['n_cliente'].value : "";
      this.nome_cliente = (array['nome_cliente'] != undefined) ? array['nome_cliente'].value : "";
      this.prazo_medio_pag = (array['prazo_medio_pag'] != undefined) ? array['prazo_medio_pag'].value : "";
      this.prazo_medio_atraso = (array['prazo_medio_atraso'] != undefined) ? array['prazo_medio_atraso'].value : "";
      this.total_divida = (array['total_divida'] != undefined) ? array['total_divida'].value : "";
      this.total_divida_venc = (array['total_divida_venc'] != undefined) ? array['total_divida_venc'].value : "";
      this.nao_vencido = (array['nao_vencido'] != undefined) ? array['nao_vencido'].value : "";
      this.menos_31_dias = (array['menos_31_dias'] != undefined) ? array['menos_31_dias'].value : "";
      this.entre_31_60 = (array['entre_31_60'] != undefined) ? array['entre_31_60'].value : "";
      this.entre_62_90 = (array['entre_62_90'] != undefined) ? array['entre_62_90'].value : "";
      this.maior_91_dias = (array['maior_91_dias'] != undefined) ? array['maior_91_dias'].value : "";
      this.acordo = (array['acordo'] != undefined) ? array['acordo'].value : "";

    }

    var sorttab = this.globalVar.getfiltros("lista_dividas_sorttabela");

    this.multiSortMeta = null;
    if (sorttab && sorttab.length > 0) {
      this.multiSortMeta = [];
      for (var v in sorttab) {
        //this.multiSortMeta.push({ field: sorttab[v].field, order: sorttab[v].order });
        this.dataTableComponent.sortField = sorttab[v].field;
        this.dataTableComponent.sortOrder = sorttab[v].order;
      }

    }

    this.carregaKAMS();
    this.listar();
    this.carregagraficos(true);
    /*setTimeout(() => {
      try {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(this.carregagraficos(true));
        google.charts.setOnLoadCallback(this.listar());
      } catch (error) {
        this.listar()
      }
    }, 800);*/

    /*this.carregagraficos(true);
    this.listar();*/
  }

  carregaKAMS() {
    this.kams = [];
    this.kams.push({ label: 'Selecionar KAM', value: '' })
    this.FINANALISEDIVIDASService.GET_KAMS().subscribe(
      response => {
        for (var x in response) {
          this.kams.push({ label: response[x][0], value: response[x][1] })
        }
        this.kams = this.kams.slice();
      },
      error => console.log(error));
  }


  /*carregagraficos(carrega = false) {
    this.data = {
      labels: ['Agreement', '> 91 Days', '61 To 90 Days', '31 To 60 Days', '0 to 30 Days', 'Undue'],
      datasets: [
        {
          data: [this.totalacordo, this.total91dias, this.total6190dias, this.total3160dias, this.total31dias, this.totalnaovencido],
          backgroundColor: [
            "#A5A5A5",
            "red",
            "#ED7D31",
            "#FFC000",
            "green",
            "#5B9BD5",
          ],
          hoverBackgroundColor: [
            "#A5A5A5",
            "red",
            "#ED7D31",
            "#FFC000",
            "green",
            "#5B9BD5",
          ]
        }]
    };

    if (carrega) {
      this.grafico_debts();
      this.grafico_top15();
    }

    //this.myInnerHeight2 = (this.data1.datasets[0].data.length * 25);
  }*/

  carregagraficos(carrega = false) {

    this.data = {
      labels: ['Agreement', '> 91 Days', '61 To 90 Days', '31 To 60 Days', '0 to 30 Days', 'Undue'],
      datasets: [
        {
          data: [this.totalacordo, this.total91dias, this.total6190dias, this.total3160dias, this.total31dias, this.totalnaovencido],
          backgroundColor: [
            "#A5A5A5",
            "red",
            "#ED7D31",
            "#FFC000",
            "green",
            "#5B9BD5",
          ],
          hoverBackgroundColor: [
            "#A5A5A5",
            "red",
            "#ED7D31",
            "#FFC000",
            "green",
            "#5B9BD5",
          ]
        }]
    };
    /*if (!carrega) {
      this.grafigo_circular(this.totalacordo, this.total91dias, this.total6190dias, this.total3160dias, this.total31dias, this.totalnaovencido);
    }*/

    if (carrega) {
      try {
        this.grafico_top15();
        //this.grafigo_circular(this.totalacordo, this.total91dias, this.total6190dias, this.total3160dias, this.total31dias, this.totalnaovencido);
      } catch (error) {

      }
      this.grafico_debts();
    }
  }

  grafigo_circular(totalacordo, total91dias, total6190dias, total3160dias, total31dias, totalnaovencido) {
    /* google.charts.load('current', {
               callback: () => drawChart(this.totalacordo, this.total91dias, this.total6190dias, this.total3160dias, this.total31dias, this.totalnaovencido),
               packages: ['corechart']
             });*/


    /*var data = new google.visualization.DataTable();
    data.addColumn('string', 'label');
    data.addColumn('number', 'value');
    data.addColumn('number', 'value2');
    data.addRows([
      ['Agreement', totalacordo, totalacordo],
      ['> 91 Days', total91dias, total91dias],
      ['61 To 90 Days', total6190dias, total6190dias],
      ['31 To 60 Days', total3160dias, total3160dias],
      ['0 to 30 Days', total31dias, total31dias],
      ['Undue', totalnaovencido, totalnaovencido]
    ]);

    var formatter = new google.visualization.NumberFormat({ decimalSymbol: ',', groupingSymbol: '.', negativeColor: 'red', negativeParens: true, suffix: ' €' });
    formatter.format(data, 1);
    var options = {
      /*title: 'AGE SUMMARY',
      titleTextStyle: {
        color: 'gray',
        fontSize: '14',
      },*//*
is3D: true,
pieHole: 0.5,
tooltip: { 'text': 'value' },
colors: ["#A5A5A5",
"red",
"#ED7D31",
"#FFC000",
"green",
"#5B9BD5"], backgroundColor: 'none',
pieSliceText: 'value',
sliceVisibilityThreshold: 0,
fontSize: 13,
legend: {
position: 'labeled',
labeledValueText: 'both',
},
chartArea: {
left: 0,
//height: '100%',
top: '0',
width: '100%'
},
};

var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
*/
  }

  grafico_debts() {
    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA_RESUMO_KAM([]).subscribe(
      response => {
        var count = Object.keys(response).length;
        var labels = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        for (var x in response) {
          labels.push(response[x][0] + ": " + response[x][6] + "%");
          /* data1.push((response[x][2] < 0) ? 0 : response[x][2]);
           data2.push((response[x][3] < 0) ? 0 : response[x][3]);
           data3.push((response[x][4] < 0) ? 0 : response[x][4]);
           data4.push((response[x][5] < 0) ? 0 : response[x][5]);*/
          data1.push((response[x][2] < 0) ? response[x][2] : response[x][2]);
          data2.push((response[x][3] < 0) ? response[x][3] : response[x][3]);
          data3.push((response[x][4] < 0) ? response[x][4] : response[x][4]);
          data4.push((response[x][5] < 0) ? response[x][5] : response[x][5]);
        }


        this.data1 = {
          labels: labels,
          datasets: [
            {
              label: '0 to 30 DAYS', backgroundColor: 'green', borderColor: 'green', data: data1,
            },
            {
              label: '31 to 60 DAYS', backgroundColor: '#FFC000', borderColor: '#FFC000', data: data2,
            },
            {
              label: '61 to 90 DAYS', backgroundColor: '#ED7D31', borderColor: '#ED7D31', data: data3,
            },
            {
              label: '> 91 DAYS', backgroundColor: 'red', borderColor: 'red', data: data4,
            }
          ]
        };
      });
  }


  /*grafico_top15() {

    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA_TOP_15([]).subscribe(
      response => {
        var data_g = [];
        var left_length = 0;
        data_g.push(["Element", "Amount Due"]);
        for (var x in response) {
          data_g.push([response[x][1], ((response[x][2] < 0) ? 0 : response[x][2])]);
          if (response[x][1].length > left_length) left_length = response[x][1].length;
        }
        left_length = left_length * 8;
        var data = google.visualization.arrayToDataTable(data_g);
        var formatter = new google.visualization.NumberFormat({
          decimalSymbol: ",",
          groupingSymbol: ".",
          negativeColor: "red",
          negativeParens: true,
          suffix: " €",
          prefix: " "
        });
        formatter.format(data, 1);

        var view = new google.visualization.DataView(data);
        view.setColumns([
          0,
          1,
          {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
          }
        ]);

        var options = {
          /*title: "TOP 15 CUSTOMERS BY AMOUNT DUE",
          titleTextStyle: {
            color: 'gray',
            fontSize: '14',
          },*/
  /* width: "100%",
   height: data_g.length * 25 + 20,
   //bar: { groupWidth: "95%" },
   legend: { position: "bottom" },
   colors: ["#5B9BD5"],
   backgroundColor: "none",
   fontSize: 12,
   hAxis: {
     format: "###,###,##0.00 €"
   }, chartArea: {
     left: left_length,
     top: '0',
     bottom: '40'
   }, annotations: {
     alwaysOutside: false,
     textStyle: {
       fontSize: 12,
       color: '#000',
       auraColor: 'none'
     }
   },
 };

 this.myInnerHeight = data_g.length * 32;
 var chart = new google.visualization.BarChart(
   document.getElementById("chart_div_top15")
 );
 chart.draw(view, options);
});

}*/

  grafico_top15() {
    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA_TOP_15_DIVIDAS([]).subscribe(
      response => {
        var count = Object.keys(response).length;
        var labels = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        for (var x in response) {
          labels.push(response[x][0] /*+ ": " + response[x][6] + "%"*/);
          data1.push((response[x][2] < 0) ? response[x][2] : response[x][2]);
          data2.push((response[x][3] < 0) ? response[x][3] : response[x][3]);
          data3.push((response[x][4] < 0) ? response[x][4] : response[x][4]);
          data4.push((response[x][5] < 0) ? response[x][5] : response[x][5]);
        }


        this.data2 = {
          labels: labels,
          datasets: [
            {
              label: '0 to 30 DAYS', backgroundColor: 'green', borderColor: 'green', data: data1,
            },
            {
              label: '31 to 60 DAYS', backgroundColor: '#FFC000', borderColor: '#FFC000', data: data2,
            },
            {
              label: '61 to 90 DAYS', backgroundColor: '#ED7D31', borderColor: '#ED7D31', data: data3,
            },
            {
              label: '> 91 DAYS', backgroundColor: 'red', borderColor: 'red', data: data4,
            }
          ]
        };

        this.myInnerHeight = (this.data2.datasets[0].data.length * 25);
      });

  }

  /*grafico_top15() {
    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA_TOP_15([]).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {
          var labels = [];
          var data = [];
          for (var x in response) {
            labels.push(response[x][1]);
            data.push((response[x][2] < 0) ? 0 : response[x][2]);
          }

          this.data2 = {
            labels: labels,
            datasets: [
              {
                label: 'Amount Due', backgroundColor: '#5B9BD5', borderColor: '#5B9BD5', data: data,
              }
            ]
          };
        }

        this.myInnerHeight = (this.data2.datasets[0].data.length * 25);
      });

  }*/



  listar() {
    this.tabela = [];

    var count = 0;
    this.mensagemtabela = "A Carregar...";
    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA([]).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        var average_due = 0;
        var count_average_due = 0;
        for (var x in response) {
          if (parseInt(x) == 0) {
            this.totalprazopag = response[x][13];
            this.totalprazoatraso = response[x][14];
            this.totaldivida = response[x][15];
            this.totaldividavenc = response[x][16];
            this.totalnaovencido = response[x][17];
            this.total31dias = response[x][18];
            this.total3160dias = response[x][19];
            this.total6190dias = response[x][20];
            this.total91dias = response[x][21];
            this.totalacordo = response[x][22];
            this.total_dev = ((this.total3160dias + this.total6190dias + this.total91dias) / this.totaldividavenc) * 100;
          }
          if (response[x][24] != null && response[x][24] > 0) {
            average_due += response[x][24];
            count_average_due++;
          }

          this.tabela.push({
            kam: response[x][0],
            n_cliente: response[x][1],
            nome_cliente: response[x][2],
            prazo_medio_pag: response[x][3],
            prazo_medio_pag_null: response[x][23],
            prazo_medio_atraso: response[x][4],
            prazo_medio_atraso_null: response[x][24],
            total_divida: response[x][5],
            total_divida_venc: response[x][6],
            nao_vencido: response[x][7],
            menos_31_dias: response[x][8],
            entre_31_60: response[x][9],
            entre_62_90: response[x][10],
            maior_91_dias: response[x][11],
            acordo: response[x][12]
          });

        }

        this.average_due = (count_average_due == 0) ? 0 : (average_due / count_average_due);
        this.tabela = this.tabela.slice();
        this.carregagraficos();
        var sorttab = this.globalVar.getfiltros("lista_dividas_sorttabela");

        this.multiSortMeta = null;
        if (sorttab && sorttab.length > 0) {
          this.multiSortMeta = [];
          for (var v in sorttab) {
            //this.multiSortMeta.push({ field: sorttab[v].field, order: sorttab[v].order });
            this.dataTableComponent.sortField = sorttab[v].field;
            this.dataTableComponent.sortOrder = sorttab[v].order;
          }

        }

      },
      error => console.log(error));
  }

  exportCSV() {
    this.lista_resumo = 0;
    this.kam_selecionado = null;
    this.displayEXPORT = true;
  }

  downloadfile() {
    var filename = new Date().toLocaleString().replace(/\D/g, '');
    var data = [{ CLIENTE: null, DOCUMENTOS: null }];
    var filenametransfer = "";
    var atividate = "";
    if (this.lista_resumo == 0) {
      filenametransfer = "lista_resumo";
      atividate = "Exportou Lista Resumo";
    } else if (this.lista_resumo == 1) {
      data = [{ CLIENTE: this.kam_selecionado, DOCUMENTOS: null }];
      filenametransfer = "lista_detalhada_kam";
      atividate = "Exportou Lista Detalhada por KAM (" + this.kam_selecionado + ")";
    } else if (this.lista_resumo == 2) {
      filenametransfer = "lista_detalhada";
      atividate = "Exportou Lista Detalhada";
    }
    this.disabled_bt = true;
    this.RelatoriosService.downloadFINANCEIRA("xlsx", filename, data, filenametransfer).subscribe(
      (res) => {
        this.insereatividade(atividate);
        FileSaver.saveAs(res, filenametransfer);
        this.displayEXPORT = false;
        this.disabled_bt = false;
      }, error => {
        this.displayEXPORT = false;
        this.simular(this.inputerroficheiro);
        this.disabled_bt = false;
      }
    );

  }

  insereatividade(descricao) {
    var atividade = new FIN_DIVIDAS_ATIVIDADE();
    atividade.descricao = descricao;
    atividade.id_CLIENTE = null;
    atividade.data_CRIA = new Date();
    atividade.utz_CRIA = this.user;
    this.FINDIVIDASATIVIDADEService.create(atividade).subscribe(response => {
    },
      error => console.log(error));
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.tabela.length > 0) {
      if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
      }

      this.yearTimeout = setTimeout(() => {
        if (value == 0 && fil) {
          value = "";
        }

        this.dataTableComponent.filter(value.toString(), coluna, filtro);

        this.globalVar.setfiltros("lista_dividas", this.dataTableComponent.filters);
        var ids = [];
        var array = this.dataTableComponent._value;
        if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
        for (var x in array) {
          ids.push(array[x].id);
        }

        if (array.length == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }

        //this.globalVar.setfiltros("reclamacaocliente_id", ids);
      }, 250);
    }
  }


  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.kam = "";
    this.n_cliente = "";
    this.nome_cliente = "";
    this.prazo_medio_pag = "";
    this.prazo_medio_atraso = "";
    this.total_divida = "";
    this.total_divida_venc = "";
    this.nao_vencido = "";
    this.menos_31_dias = "";
    this.entre_31_60 = "";
    this.entre_62_90 = "";
    this.maior_91_dias = "";
    this.acordo = "";

    this.dataTableComponent.reset();

    this.multiSortMeta = [];
    this.globalVar.setfiltros("lista_dividas_sorttabela", "limpar");
    this.globalVar.setfiltros("lista_dividas", null);
    this.dataTableComponent.value = this.tabela;
    this.dataTableComponent.reset();

    this.dataTableComponent.filter("", "", "");

  }


  atualizatotais(event = null) {

    if (event != null) this.globalVar.setfiltros("lista_dividas_sorttabela", event);

    this.updatetotais();
    //this.globalVar.setfiltros("reclamacaocliente_id", ids);
  }

  updatetotais() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    var totalprazopag = 0;
    var totalprazoatraso = 0;
    var totaldivida = 0;
    var totaldividavenc = 0;
    var totalnaovencido = 0;
    var total31dias = 0;
    var total3160dias = 0;
    var total6190dias = 0;
    var total91dias = 0;
    var totalacordo = 0;

    var count = 0;
    var count2 = 0;

    var average_due = 0;
    var count_average_due = 0;
    for (var x in array) {
      //ids.push(array[x].id);
      if (array[x].prazo_medio_pag_null != null && array[x].prazo_medio_pag_null > 0) {
        count++;
        totalprazopag += array[x].prazo_medio_pag_null;
      }
      if (array[x].prazo_medio_atraso_null != null && array[x].prazo_medio_atraso_null > 0) {
        count2++;
        totalprazoatraso += array[x].prazo_medio_atraso_null;
      }

      totaldivida += array[x].total_divida;
      totaldividavenc += array[x].total_divida_venc;
      totalnaovencido += array[x].nao_vencido;
      total31dias += array[x].menos_31_dias;
      total3160dias += array[x].entre_31_60;
      total6190dias += array[x].entre_62_90;
      total91dias += array[x].maior_91_dias;
      totalacordo += array[x].acordo;




      if (array[x].prazo_medio_atraso_null != null && array[x].prazo_medio_atraso_null > 0) {
        average_due += array[x].prazo_medio_atraso_null;
        count_average_due++;
      }
    }


    this.totalprazopag = (count > 0) ? totalprazopag / count : 0;
    this.totalprazoatraso = (count2 > 0) ? totalprazoatraso / count2 : 0;
    this.totaldivida = totaldivida;
    this.totaldividavenc = totaldividavenc;
    this.totalnaovencido = totalnaovencido;
    this.total31dias = total31dias;
    this.total3160dias = total3160dias;
    this.total6190dias = total6190dias;
    this.total91dias = total91dias;
    this.totalacordo = totalacordo;
    this.average_due = (count_average_due == 0) ? 0 : (average_due / count_average_due);
    this.total_dev = ((this.total3160dias + this.total6190dias + this.total91dias) / this.totaldividavenc) * 100;

    //this.carregagraficos();
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
