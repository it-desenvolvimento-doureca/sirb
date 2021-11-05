import { Component, ElementRef, OnInit } from '@angular/core';
import { FINANALISEDIVIDASService } from 'app/servicos/fin-analise-dividas.service';

@Component({
  selector: 'app-evolucao-dividas',
  templateUrl: './evolucao-dividas.component.html',
  styleUrls: ['./evolucao-dividas.component.css']
})
export class EvolucaoDividasComponent implements OnInit {
  mensagemtabela: string;
  ativobt = '1';
  myInnerHeight2 = 350;
  myInnerHeight = 350;
  display_1;
  display_2;
  display_3;
  display_4;
  data1 = {};
  data2 = {};
  data3 = {};
  data4 = {};
  mes_1;
  mes_2;
  mes_3;
  mes_4;
  mes_5;
  mes_6;
  mes_7;
  mes_8;
  mes_9;
  mes_10;
  mes_11;
  mes_12;
  mes_13;
  totaltabela_1 = 0;
  totaltabela_2 = 0;
  totaltabela_3 = 0;
  totaltabela_4 = 0;
  totaltabela_5 = 0;
  totaltabela_6 = 0;

  options1 = {
    title: {
      display: true,
      text: 'Evolution of Customer Debt',
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
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
          label: 'label',
          beginAtZero: true,
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
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options2 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Average Receipt Deadline',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' dias';
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
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        stacked: true,
        position: 'bottom',
        ticks: {
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };


  options3 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: '% of Debt > 31 Days',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".") + ' %';
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
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        stacked: true,
        position: 'bottom',
        ticks: {
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options4 = {
    title: {
      display: true,
      text: 'Nº Documents',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 0, ",", ".") + '';

        }
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          label: 'label',
          beginAtZero: true,
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
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options_global = {
    responsive: false,
    title: {
      display: false,
      text: '',
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
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
          label: 'label',
          beginAtZero: true,
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
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  options_global2 = {
    responsive: false,
    title: {
      display: false,
      text: '',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 0, ",", ".") + '';


        }
      },
    },
    scales: {

      yAxes: [{
        ticks: {
          label: 'label',
          beginAtZero: true,
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
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        }
      }],
    },
  };

  meses_analise = [];
  meses_analise_grafico = [];
  dados = [];
  dados_kam = [];
  loading_kam;
  loading;
  cliente: any;
  kam: any;
  display_documentos: boolean = false;
  tabela_documentos: any[];
  tabela_linhas_documentos: any;
  display_linhas_documentos: boolean = false;
  display_documentos_show: boolean;
  constructor(private elementRef: ElementRef, private FINANALISEDIVIDASService: FINANALISEDIVIDASService) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

    this.mes_1 = this.getmes(0);
    this.mes_2 = this.getmes(1);
    this.mes_3 = this.getmes(2);
    this.mes_4 = this.getmes(3);
    this.mes_5 = this.getmes(4);
    this.mes_6 = this.getmes(5);
    this.mes_7 = this.getmes(6);
    this.mes_8 = this.getmes(7);
    this.mes_9 = this.getmes(8);
    this.mes_10 = this.getmes(9);
    this.mes_11 = this.getmes(10);
    this.mes_12 = this.getmes(11);
    this.mes_13 = this.getmes(12);


    /*this.meses_analise_grafico = [
      this.getmesabrev(12),
      this.getmesabrev(11),
      this.getmesabrev(10),
      this.getmesabrev(9),
      this.getmesabrev(8),
      this.getmesabrev(7),
      this.getmesabrev(6),
      this.getmesabrev(5),
      this.getmesabrev(4),
      this.getmesabrev(3),
      this.getmesabrev(2),
      this.getmesabrev(1),
      this.getmesabrev(0)

    ];*/

    this.meses_analise = [
      this.getmesabrev(0),
      this.getmesabrev(1),
      this.getmesabrev(2),
      this.getmesabrev(3),
      this.getmesabrev(4),
      this.getmesabrev(5),
      this.getmesabrev(6),
      this.getmesabrev(7),
      this.getmesabrev(8),
      this.getmesabrev(9),
      this.getmesabrev(10),
      this.getmesabrev(11),
      this.getmesabrev(12)

    ];

    this.meses_analise_grafico = this.meses_analise;

    this.grafico1();
    this.grafico2e3();
    this.analise_cliente();
    this.analise_kam();
  }

  getmesabrev(valor) {
    var meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    if (d.getDay() < 15) {
      d.setMonth(d.getMonth() - 1);
    }

    d.setMonth(d.getMonth() - valor);
    let month = d.getMonth();
    let year = d.getFullYear();
    return meses[month] + ' (' + year + ')';
  }

  getmes(valor) {
    var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    if (d.getDay() < 15) {
      d.setMonth(d.getMonth() - 1);
    }
    d.setMonth(d.getMonth() - valor);
    let month = d.getMonth();
    let year = d.getFullYear();
    return meses[month] + ' (' + year + ')';
  }


  getmesano(valor) {
    const d = new Date();
    if (d.getDay() < 15) {
      d.setMonth(d.getMonth() - 1);
    }

    d.setMonth(d.getMonth() - valor);
    let month = d.getMonth();
    let year = d.getFullYear();
    return { mes: month + 1, ano: year };
  }
  grafico1() {
    var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var data3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var data4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var labels = this.meses_analise_grafico;


    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_GRAFICOS_1().subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var x = 0;
          for (let i = 0; i <= 12; i++) {
            data1[i] = response[x][0];
            data2[i] = response[x][1];
            data3[i] = response[x][2];
            data4[i] = response[x][3];
            x++;
          }
        }


        this.data1 = {
          labels: labels,
          datasets: [
            {
              label: 'Overdue Debt Amount', backgroundColor: 'green', borderColor: 'green', data: data1, fill: false,
            },
            {
              label: '31 to 60 Days', backgroundColor: '#FFC000', borderColor: '#FFC000', data: data2, fill: false,
            },
            {
              label: '> 61 Days', backgroundColor: '#ED7D31', borderColor: '#ED7D31', data: data3, fill: false,
            }
          ]
        };

        this.data4 = {
          labels: labels,
          datasets: [
            {
              label: 'Nº Documents', backgroundColor: 'green', borderColor: 'green', data: data4, fill: false,
            }
          ]
        };


      });



  }


  grafico2e3() {
    var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_GRAFICOS_2().subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var x = 0;
          for (let i = 0; i <= 12; i++) {
            data1[i] = response[x][0];
            data2[i] = response[x][1];
            x++;
          }
        }
        var labels = this.meses_analise_grafico;

        this.data2 = {
          labels: labels,
          datasets: [
            {
              label: 'Average Due', backgroundColor: 'green', borderColor: 'green', data: data1, fill: false,
            },
          ]
        };



        this.data3 = {
          labels: labels,
          datasets: [
            {
              label: '% Debt', backgroundColor: 'green', borderColor: 'green', data: data2, fill: false,
            },
          ]
        };



      });




  }



  analise_cliente() {
    var labels = this.meses_analise;
    this.dados = [];

    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_CLIENTES([{ CLIENTE: this.cliente, KAM: null }]).subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {
          var data1 = [response[x][3], response[x][8], response[x][13], response[x][18], response[x][23], response[x][28], response[x][33], response[x][38], response[x][43], response[x][48], response[x][53], response[x][58], response[x][63]];
          var data2 = [response[x][4], response[x][9], response[x][14], response[x][19], response[x][24], response[x][29], response[x][34], response[x][39], response[x][44], response[x][49], response[x][54], response[x][59], response[x][64]];
          var data3 = [response[x][5], response[x][10], response[x][15], response[x][20], response[x][25], response[x][30], response[x][35], response[x][40], response[x][45], response[x][50], response[x][55], response[x][60], response[x][65]];
          var data4 = [response[x][7], response[x][12], response[x][17], response[x][22], response[x][27], response[x][32], response[x][37], response[x][42], response[x][47], response[x][52], response[x][57], response[x][62], response[x][67]];


          this.dados.push({
            id: response[x][2],
            atualiza: false,
            iconplus: true,
            kam: response[x][0], cliente: response[x][1],
            valor_mes1: this.formatMoneyeuro(response[x][3]), average_mes1: this.formatMoneyeuro(response[x][6], 2, ",", ".", ""),
            valor_mes2: this.formatMoneyeuro(response[x][8]), average_mes2: this.formatMoneyeuro(response[x][11], 2, ",", ".", ""),
            valor_mes3: this.formatMoneyeuro(response[x][13]), average_mes3: this.formatMoneyeuro(response[x][16], 2, ",", ".", ""),
            valor_mes4: this.formatMoneyeuro(response[x][18]), average_mes4: this.formatMoneyeuro(response[x][21], 2, ",", ".", ""),
            valor_mes5: this.formatMoneyeuro(response[x][23]), average_mes5: this.formatMoneyeuro(response[x][26], 2, ",", ".", ""),
            valor_mes6: this.formatMoneyeuro(response[x][28]), average_mes6: this.formatMoneyeuro(response[x][31], 2, ",", ".", ""),
            valor_mes7: this.formatMoneyeuro(response[x][33]), average_mes7: this.formatMoneyeuro(response[x][36], 2, ",", ".", ""),
            valor_mes8: this.formatMoneyeuro(response[x][38]), average_mes8: this.formatMoneyeuro(response[x][41], 2, ",", ".", ""),
            valor_mes9: this.formatMoneyeuro(response[x][43]), average_mes9: this.formatMoneyeuro(response[x][46], 2, ",", ".", ""),
            valor_mes10: this.formatMoneyeuro(response[x][48]), average_mes10: this.formatMoneyeuro(response[x][51], 2, ",", ".", ""),
            valor_mes11: this.formatMoneyeuro(response[x][53]), average_mes11: this.formatMoneyeuro(response[x][56], 2, ",", ".", ""),
            valor_mes12: this.formatMoneyeuro(response[x][58]), average_mes12: this.formatMoneyeuro(response[x][61], 2, ",", ".", ""),
            valor_mes13: this.formatMoneyeuro(response[x][63]), average_mes13: this.formatMoneyeuro(response[x][66], 2, ",", ".", ""),

            v31_60_mes1: this.formatMoneyeuro(response[x][4]), v61_mes1: this.formatMoneyeuro(response[x][5]), n_documentos_mes1: response[x][7],
            v31_60_mes2: this.formatMoneyeuro(response[x][9]), v61_mes2: this.formatMoneyeuro(response[x][10]), n_documentos_mes2: response[x][12],
            v31_60_mes3: this.formatMoneyeuro(response[x][14]), v61_mes3: this.formatMoneyeuro(response[x][15]), n_documentos_mes3: response[x][17],
            v31_60_mes4: this.formatMoneyeuro(response[x][19]), v61_mes4: this.formatMoneyeuro(response[x][20]), n_documentos_mes4: response[x][22],
            v31_60_mes5: this.formatMoneyeuro(response[x][24]), v61_mes5: this.formatMoneyeuro(response[x][25]), n_documentos_mes5: response[x][27],
            v31_60_mes6: this.formatMoneyeuro(response[x][29]), v61_mes6: this.formatMoneyeuro(response[x][30]), n_documentos_mes6: response[x][32],
            v31_60_mes7: this.formatMoneyeuro(response[x][34]), v61_mes7: this.formatMoneyeuro(response[x][35]), n_documentos_mes7: response[x][37],
            v31_60_mes8: this.formatMoneyeuro(response[x][39]), v61_mes8: this.formatMoneyeuro(response[x][40]), n_documentos_mes8: response[x][42],
            v31_60_mes9: this.formatMoneyeuro(response[x][44]), v61_mes9: this.formatMoneyeuro(response[x][45]), n_documentos_mes9: response[x][47],
            v31_60_mes10: this.formatMoneyeuro(response[x][49]), v61_mes10: this.formatMoneyeuro(response[x][50]), n_documentos_mes10: response[x][52],
            v31_60_mes11: this.formatMoneyeuro(response[x][54]), v61_mes11: this.formatMoneyeuro(response[x][55]), n_documentos_mes11: response[x][57],
            v31_60_mes12: this.formatMoneyeuro(response[x][59]), v61_mes12: this.formatMoneyeuro(response[x][60]), n_documentos_mes12: response[x][62],
            v31_60_mes13: this.formatMoneyeuro(response[x][64]), v61_mes13: this.formatMoneyeuro(response[x][65]), n_documentos_mes13: response[x][67],

            options: this.options_global,
            options2: this.options_global2,
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Overdue Debt Amount', backgroundColor: 'green', borderColor: 'green', data: data1, fill: false,
                },
                {
                  label: '31 to 60 Days', backgroundColor: '#FFC000', borderColor: '#FFC000', data: data2, fill: false,
                },
                {
                  label: '> 61 Days', backgroundColor: '#ED7D31', borderColor: '#ED7D31', data: data3, fill: false,
                }
              ]
            },
            data2: {
              labels: labels,
              datasets: [{
                label: 'Nº Documents', backgroundColor: 'red', borderColor: 'red', data: data4, fill: false,
              }
              ]
            }
          });;
        }


      });
  }

  showclientes(cliente) {
    this.cliente = cliente;
    this.analise_cliente();
    document.getElementById("tab1").classList.remove("active");
    document.getElementById("tab3").classList.remove("active");
    document.getElementById("tab3").classList.remove("in");
    document.getElementById("tab2").classList.add("active");
    document.getElementById("tab2").classList.add("in");

    this.ativobt = '2';
  }

  analise_kam() {
    this.dados_kam = [];
    var labels = this.meses_analise;

    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_KAM([{ KAM: this.kam }]).subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {
          var data1 = [response[x][3], response[x][8], response[x][13], response[x][18], response[x][23], response[x][28], response[x][33], response[x][38], response[x][43], response[x][48], response[x][53], response[x][58], response[x][63]];
          var data2 = [response[x][4], response[x][9], response[x][14], response[x][19], response[x][24], response[x][29], response[x][34], response[x][39], response[x][44], response[x][49], response[x][54], response[x][59], response[x][64]];
          var data3 = [response[x][5], response[x][10], response[x][15], response[x][20], response[x][25], response[x][30], response[x][35], response[x][40], response[x][45], response[x][50], response[x][55], response[x][60], response[x][65]];
          var data4 = [response[x][7], response[x][12], response[x][17], response[x][22], response[x][27], response[x][32], response[x][37], response[x][42], response[x][47], response[x][52], response[x][57], response[x][62], response[x][67]];


          this.dados_kam.push({
            id: parseInt(x),
            atualiza: false,
            iconplus: true,
            kam: response[x][0],
            valor_mes1: this.formatMoneyeuro(response[x][3]), average_mes1: this.formatMoneyeuro(response[x][6], 2, ",", ".", ""),
            valor_mes2: this.formatMoneyeuro(response[x][8]), average_mes2: this.formatMoneyeuro(response[x][11], 2, ",", ".", ""),
            valor_mes3: this.formatMoneyeuro(response[x][13]), average_mes3: this.formatMoneyeuro(response[x][16], 2, ",", ".", ""),
            valor_mes4: this.formatMoneyeuro(response[x][18]), average_mes4: this.formatMoneyeuro(response[x][21], 2, ",", ".", ""),
            valor_mes5: this.formatMoneyeuro(response[x][23]), average_mes5: this.formatMoneyeuro(response[x][26], 2, ",", ".", ""),
            valor_mes6: this.formatMoneyeuro(response[x][28]), average_mes6: this.formatMoneyeuro(response[x][31], 2, ",", ".", ""),
            valor_mes7: this.formatMoneyeuro(response[x][33]), average_mes7: this.formatMoneyeuro(response[x][36], 2, ",", ".", ""),
            valor_mes8: this.formatMoneyeuro(response[x][38]), average_mes8: this.formatMoneyeuro(response[x][41], 2, ",", ".", ""),
            valor_mes9: this.formatMoneyeuro(response[x][43]), average_mes9: this.formatMoneyeuro(response[x][46], 2, ",", ".", ""),
            valor_mes10: this.formatMoneyeuro(response[x][48]), average_mes10: this.formatMoneyeuro(response[x][51], 2, ",", ".", ""),
            valor_mes11: this.formatMoneyeuro(response[x][53]), average_mes11: this.formatMoneyeuro(response[x][56], 2, ",", ".", ""),
            valor_mes12: this.formatMoneyeuro(response[x][58]), average_mes12: this.formatMoneyeuro(response[x][61], 2, ",", ".", ""),
            valor_mes13: this.formatMoneyeuro(response[x][63]), average_mes13: this.formatMoneyeuro(response[x][66], 2, ",", ".", ""),

            v31_60_mes1: this.formatMoneyeuro(response[x][4]), v61_mes1: this.formatMoneyeuro(response[x][5]), n_documentos_mes1: response[x][7],
            v31_60_mes2: this.formatMoneyeuro(response[x][9]), v61_mes2: this.formatMoneyeuro(response[x][10]), n_documentos_mes2: response[x][12],
            v31_60_mes3: this.formatMoneyeuro(response[x][14]), v61_mes3: this.formatMoneyeuro(response[x][15]), n_documentos_mes3: response[x][17],
            v31_60_mes4: this.formatMoneyeuro(response[x][19]), v61_mes4: this.formatMoneyeuro(response[x][20]), n_documentos_mes4: response[x][22],
            v31_60_mes5: this.formatMoneyeuro(response[x][24]), v61_mes5: this.formatMoneyeuro(response[x][25]), n_documentos_mes5: response[x][27],
            v31_60_mes6: this.formatMoneyeuro(response[x][29]), v61_mes6: this.formatMoneyeuro(response[x][30]), n_documentos_mes6: response[x][32],
            v31_60_mes7: this.formatMoneyeuro(response[x][34]), v61_mes7: this.formatMoneyeuro(response[x][35]), n_documentos_mes7: response[x][37],
            v31_60_mes8: this.formatMoneyeuro(response[x][39]), v61_mes8: this.formatMoneyeuro(response[x][40]), n_documentos_mes8: response[x][42],
            v31_60_mes9: this.formatMoneyeuro(response[x][44]), v61_mes9: this.formatMoneyeuro(response[x][45]), n_documentos_mes9: response[x][47],
            v31_60_mes10: this.formatMoneyeuro(response[x][49]), v61_mes10: this.formatMoneyeuro(response[x][50]), n_documentos_mes10: response[x][52],
            v31_60_mes11: this.formatMoneyeuro(response[x][54]), v61_mes11: this.formatMoneyeuro(response[x][55]), n_documentos_mes11: response[x][57],
            v31_60_mes12: this.formatMoneyeuro(response[x][59]), v61_mes12: this.formatMoneyeuro(response[x][60]), n_documentos_mes12: response[x][62],
            v31_60_mes13: this.formatMoneyeuro(response[x][64]), v61_mes13: this.formatMoneyeuro(response[x][65]), n_documentos_mes13: response[x][67],

            options: this.options_global,
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Overdue Debt Amount', backgroundColor: 'green', borderColor: 'green', data: data1, fill: false,
                },
                {
                  label: '31 to 60 Days', backgroundColor: '#FFC000', borderColor: '#FFC000', data: data2, fill: false,
                },
                {
                  label: '> 61 Days', backgroundColor: '#ED7D31', borderColor: '#ED7D31', data: data3, fill: false,
                },

              ]
            },
            options2: this.options_global2,
            data2: {
              labels: labels,
              datasets: [
                {
                  label: 'Nº Documents', backgroundColor: 'red', borderColor: 'red', data: data4, fill: false,
                }
              ]
            },
            clientes: [],

          });
        }

      });

  }


  formatMoneyeuro(amount, decimalCount = 2, decimal = ",", thousands = ".", symbol = "€", label = null) {
    if (amount == null) return "";

    if (label == 'Nº Documents') {
      decimalCount = 0;
      symbol = "";
    }
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "") + ' ' + symbol;
    } catch (e) {
      console.log(e)
    }

  }

  getdadosclientes(kam, index, id) {
    this.dados_kam[index].iconplus = !this.dados_kam[index].iconplus;


    if (this.dados_kam[index].clientes.length == 0 && !this.dados_kam[index].atualiza) {
      this.carregadadosclientes(kam, index, id)
    }
  }

  carregadadosclientes(kam, index, id) {
    this.dados_kam[index].atualiza = true;
    this.dados_kam[index].iconplus = true;

    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_CLIENTES([{ CLIENTE: null, KAM: kam }]).subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {
          this.dados_kam[index].clientes.push({
            id: response[x][2],
            kam: response[x][0], cliente: response[x][1],
            valor_mes1: this.formatMoneyeuro(response[x][3]), average_mes1: this.formatMoneyeuro(response[x][6], 2, ",", ".", ""),
            valor_mes2: this.formatMoneyeuro(response[x][8]), average_mes2: this.formatMoneyeuro(response[x][11], 2, ",", ".", ""),
            valor_mes3: this.formatMoneyeuro(response[x][13]), average_mes3: this.formatMoneyeuro(response[x][16], 2, ",", ".", ""),
            valor_mes4: this.formatMoneyeuro(response[x][18]), average_mes4: this.formatMoneyeuro(response[x][21], 2, ",", ".", ""),
            valor_mes5: this.formatMoneyeuro(response[x][23]), average_mes5: this.formatMoneyeuro(response[x][26], 2, ",", ".", ""),
            valor_mes6: this.formatMoneyeuro(response[x][28]), average_mes6: this.formatMoneyeuro(response[x][31], 2, ",", ".", ""),
            valor_mes7: this.formatMoneyeuro(response[x][33]), average_mes7: this.formatMoneyeuro(response[x][36], 2, ",", ".", ""),
            valor_mes8: this.formatMoneyeuro(response[x][38]), average_mes8: this.formatMoneyeuro(response[x][41], 2, ",", ".", ""),
            valor_mes9: this.formatMoneyeuro(response[x][43]), average_mes9: this.formatMoneyeuro(response[x][46], 2, ",", ".", ""),
            valor_mes10: this.formatMoneyeuro(response[x][48]), average_mes10: this.formatMoneyeuro(response[x][51], 2, ",", ".", ""),
            valor_mes11: this.formatMoneyeuro(response[x][53]), average_mes11: this.formatMoneyeuro(response[x][56], 2, ",", ".", ""),
            valor_mes12: this.formatMoneyeuro(response[x][58]), average_mes12: this.formatMoneyeuro(response[x][61], 2, ",", ".", ""),
            valor_mes13: this.formatMoneyeuro(response[x][63]), average_mes13: this.formatMoneyeuro(response[x][66], 2, ",", ".", "")
          });
        }
        setTimeout(() => {
          document.getElementById("kam" + id).classList.remove("collapsed");
          document.getElementById("kams" + id).classList.add("in");
          document.getElementById("kams" + id).style.height = "auto";
          this.dados_kam[index].iconplus = false;
          this.dados_kam[index].atualiza = false;
        }, 50);

      });

  }

  getdocumentos(cliente, tipomes) {
    var mes = this.getmesano(tipomes - 1).mes;
    var ano = this.getmesano(tipomes - 1).ano;

    this.totaltabela_1 = 0;
    this.totaltabela_2 = 0;
    this.totaltabela_3 = 0;
    this.totaltabela_4 = 0;
    this.totaltabela_5 = 0;
    this.totaltabela_6 = 0;
    this.tabela_documentos = [];
    this.display_documentos = true;
    this.display_documentos_show = true;
    var count = 0;
    this.mensagemtabela = "Loading...";
    var data = [{ CLIENTE: cliente, MES: mes, ANO: ano }];
    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_DOCUMENTOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "No records were found...";
        }
        for (var x in response) {

          if (parseInt(x) == 0) {
            this.totaltabela_1 = response[x][10];
            this.totaltabela_2 = response[x][11];
            this.totaltabela_3 = response[x][12];
            this.totaltabela_4 = response[x][13];
            this.totaltabela_5 = response[x][14];
            this.totaltabela_6 = response[x][15];
          }

          this.tabela_documentos.push({
            numero_documento: response[x][0],
            data_documento: response[x][1],
            data_vencimento: response[x][2],
            dias_mora: response[x][3],
            nao_vencido: response[x][4],
            menos_31_dias: response[x][5],
            entre_31_60: response[x][6],
            entre_62_90: response[x][7],
            maior_91_dias: response[x][8],
            acordo: response[x][9],
            documento: response[x][16],
            id_ACORDO: response[x][17],
            ID_CAB_DOC: response[x][18],
            checked: false
          });

        }
        this.tabela_documentos = this.tabela_documentos.slice();

      },
      error => console.log(error));

  }

  onHIdelinhasdocumentos() {
    if (this.display_documentos_show) this.display_documentos = true;
  }

  getlinhasdocumentos(n_documento) {

    this.tabela_linhas_documentos = [];
    this.display_documentos = false;
    this.display_linhas_documentos = true;
    var count = 0;
    this.mensagemtabela = "Loading...";
    var data = [{ N_DOCUMENTO: n_documento }];
    this.FINANALISEDIVIDASService.FIN_EVOLUCAO_LINHAS_DOCUMENTOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "No records were found...";
        }
        for (var x in response) {

          this.tabela_linhas_documentos.push({
            id_cab_doc: response[x][0],
            des_artigo: response[x][1],
            quantidade: response[x][2],
            preco_unitario: response[x][3],
            valor_liquido: response[x][4],
            valor_iva: response[x][5],
            valor_total: response[x][6],
            n_pedido: response[x][7],
            id_processo: response[x][8],
          });

        }
        this.tabela_linhas_documentos = this.tabela_linhas_documentos.slice();

      },
      error => console.log(error));
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
