import { Component, OnInit } from '@angular/core';
import { PEDIDOSPRODUCAOService } from 'app/servicos/pedidosproducao.service';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';

@Component({
  selector: 'app-producao-dashboard',
  templateUrl: './producao-dashboard.component.html',
  styleUrls: ['./producao-dashboard.component.css']
})
export class ProducaoDashboardComponent implements OnInit {
  data;
  data1 = [];
  data2 = [];
  data3 = [];
  graf = "";
  dataini;
  datafim;
  linhas = [];
  linha = null;
  loading = false;


  data_2;
  data1_2 = [];
  data2_2 = [];
  data3_2 = [];
  graf_2 = "graf";
  dataini2;
  datafim2;
  linha2 = null;
  loading2 = false;
  myInnerHeight2 = 200;

  ativobt = '1';
  options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      position: 'right',
      display: false
    },
    scales: {
      yAxes: [{
        stacked: true, id: 'A',
        ticks: {
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
        },
        categoryPercentage: .8,
        barPercentage: 1,
        gridLines: {
          display: false
        },
      }],
      xAxes: [
        {
          position: 'bottom', stacked: true,
          id: '1',
          ticks: {
            callback: function (value) { return value.toFixed(2) + "%" },
            label: '',
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Rejeição (%)'
          }, gridLines: {
            display: false
          },
        }, {
          position: 'top', stacked: true, type: 'linear',
          id: '2',
          ticks: {
            callback: function (value) { return value.toFixed(2) + "%" },
            label: '',
            beginAtZero: true
          }, scaleLabel: {
            display: true,
            labelString: 'Rejeição (%)'
          }
        }],

    },
    tooltips: {
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
      },
    },
  };

  options2 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      position: 'right',
      display: false
    },
    scales: {

      yAxes: [{
        stacked: true, id: 'A',
        ticks: {
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        },
        categoryPercentage: .8,
        barPercentage: 1,
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        position: 'bottom', stacked: true, id: '1',
        ticks: {
          callback: function (value) { return value.toFixed(2) + "%" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
          labelString: 'Rejeição (%)'
        }
      }, {
        position: 'top', stacked: true, id: '2', type: 'linear',
        ticks: {
          callback: function (value) { return value.toFixed(2) + "%" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
          labelString: 'Rejeição (%)'
        }, gridLines: {
          display: false
        },
      }],

    },
    tooltips: {
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
      },
    },
  };

  options3 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      position: 'right',
      display: false
    },
    scales: {
      yAxes: [{
        id: 'A', stacked: true,
        ticks: {
          stacked: true,
          label: '',
          beginAtZero: true,
        }, scaleLabel: {
          display: true,
        },
        categoryPercentage: .8,
        barPercentage: 1,
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        id: '1', stacked: true,
        position: 'bottom',
        ticks: {
          callback: function (value) { return value.toFixed(2) + "%" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
          labelString: 'Rejeição (%)'
        }
      }, {
        id: '2', stacked: true, type: 'linear',
        position: 'top',
        ticks: {
          callback: function (value) { return value.toFixed(2) + "%" },
          label: '',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
          labelString: 'Rejeição (%)'
        }, gridLines: {
          display: false
        },
      }],

    },
    tooltips: {
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
      },
    },
  };
  defeito: any;
  referencia: any;
  defeitodesc: any;
  referenciadesc: any;
  myInnerHeight = 200;
  referencia_2: any;
  referencia_2_desc: any;
  familia: any;
  familia_desc: any;
  defeito2: any;
  defeitodesc2: any;
  data4_2 = [];
  familias: any[];
  familia_def;
  objetivos_gerais: any;
  data1_3 = [];
  data2_3 = [];
  data3_3 = [];
  graf_3 = "graf";
  myInnerHeight3 = 200;
  data_3: any;
  referencia_3_desc: string;
  lote: string;
  referencia_3;
  loading3: boolean;
  linha3: any;
  dataini3: any;
  datafim3: any;
  campo_lote: any;
  objetivos_gerais3: any;
  area_peca = 0;
  area_peca2 = 0;
  area_peca3 = 0;
  areas_pecas = [{ value: 0, label: "Todas" }, { value: 1, label: "Menor que 10dm2" }, { value: 2, label: "Maior ou igual a 10dm2" }]
  hora_ini1: string;
  hora_ini2: string;
  hora_ini3: string;
  hora_fim1: string;
  hora_fim2: string;
  hora_fim3: string;
  constructor(private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICLINHAService: ABDICLINHAService, private PEDIDOSPRODUCAOService: PEDIDOSPRODUCAOService) { }

  ngOnInit() {
    var d = new Date();
    this.datafim = this.formatDate(d);
    this.datafim2 = this.formatDate(d);
    this.datafim3 = this.formatDate(d);
    d.setDate(d.getDate() - 1);
    this.dataini = this.formatDate(d);
    this.dataini2 = this.formatDate(d);
    this.dataini3 = this.formatDate(d);

    this.graf = "graf";


    this.hora_ini1 = "06:01";
    this.hora_ini2 = "06:01";
    this.hora_ini3 = "06:01";
    this.hora_fim1 = "06:00";
    this.hora_fim2 = "06:00";
    this.hora_fim3 = "06:00";

    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: null });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }

        this.linhas = this.linhas.slice();
        //this.carregagraf1();
      },
      error => {
        console.log(error);
        // this.carregagraf1();
      });

    this.ABDICCOMPONENTEService.getFamilias().subscribe(
      response => {
        this.familias = [];
        this.familias.push({ label: "Sel. Fam. Defeito", value: null });
        for (var x in response) {
          this.familias.push({ label: response[x].fam + ' - ' + response[x].QUALIB, value: response[x].fam });
        }

        this.familias = this.familias.slice();
      },
      error => {
        console.log(error);

      });

  }

  atualizar() {
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];

    if (this.graf == "graf") {
      this.carregagraf1();
    } else if (this.graf == "graf1") {
      this.carregagraf2();
    } else if (this.graf == "graf2") {
      this.carregagraf3();
    }
  }




  voltar(graf) {
    if (graf == 1) {

      if (this.data1.length > 0) {
        this.graf = "graf";
        this.options.title.text = 'Análise de Rejeições por Tipo de Defeito';
        this.myInnerHeight = (this.data1[0].datasets[0].data.length * 25);
        this.data = this.data1[0];
      } else {
        this.carregagraf1();
      }
    } else if (graf == 2) {
      if (this.data2.length > 0) {
        this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
        this.graf = "graf1";
        this.myInnerHeight = (this.data2[0].datasets[0].data.length * 25);
        this.data = this.data2[0];
      } else {
        this.carregagraf2();
      }
    }
  }

  onDataSelect(event) {
    /*console.log(this.data.labels[event.element._index])

    console.log(this.data.datasets[event.element._index].data[event.element._index])*/

    if (this.graf == "graf") {
      if (this.defeito != this.data.cod[event.element._index] || this.data2.length == 0) {
        this.defeito = this.data.cod[event.element._index];
        this.defeitodesc = this.data.labels[event.element._index];
        this.carregagraf2();
      } else {
        this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
        this.graf = "graf1";
        this.myInnerHeight = (this.data2[0].datasets[0].data.length * 25);
        this.data = this.data2[0];
      }
    } else if (this.graf == "graf1") {
      if (this.referencia != this.data.labels[event.element._index] || this.data3.length == 0) {
        this.referencia = this.data.labels[event.element._index];
        this.referenciadesc = this.data.labels[event.element._index];

        this.carregagraf3();
      } else {
        this.graf = "graf2";
        this.options.title.text = 'Análise de Rejeições por Lote ( ' + this.referenciadesc + ' )';
        this.myInnerHeight = (this.data3[0].datasets[0].data.length * 25);
        this.data = this.data3[0];
      }
    }
  }

  carregagraf1() {
    this.loading = true;
    this.options.title.text = 'Análise de Rejeições por Tipo de Defeito';
    this.data = [];
    this.myInnerHeight = 0;
    this.graf = "graf";

    this.defeito = null;
    this.defeitodesc = null;
    this.referencia = null;
    this.referenciadesc = null;

    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha != null) ? this.linha.toString() : null
    }];
    //QUERY_REJEICOES
    this.PEDIDOSPRODUCAOService.getRejeicoesLinha(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][0] + ' - ' + response[x][1]);
            cod.push(response[x][0]);
            desc.push(response[x][0] + ' - ' + response[x][1]);
            datagraf.push(response[x][2]);

            produz.push(response[x][4]);
            defeit.push(response[x][3]);
          }


          this.data1 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }
            ]
          }];
          this.myInnerHeight = (this.data1[0].datasets[0].data.length * 25);
          this.data = this.data1[0];
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  carregagraf2() {
    this.loading = true;

    this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
    this.data = [];
    this.myInnerHeight = 0;
    this.graf = "graf1";


    this.referencia = null;
    this.referenciadesc = null;

    var data = [{
      AREA_PECA: this.area_peca, DEFEITO: this.defeito, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha != null) ? this.linha.toString() : null
    }];
    //QUERY_REJEICOES_REFERENCIA
    this.PEDIDOSPRODUCAOService.getRejeicoesReferencia(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          for (var x in response) {
            labels.push(response[x][0]);
            desc.push(response[x][0] + ' - ' + response[x][1]);
            datagraf.push(response[x][2]);

            produz.push(response[x][3]);
            defeit.push(response[x][4]);
          }

          this.data2 = [{
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Referência',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Referência',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }

            ]
          }];
          this.myInnerHeight = (this.data2[0].datasets[0].data.length * 25);
          this.data = this.data2[0];
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  carregagraf3() {
    this.loading = true;

    this.graf = "graf2";
    this.options.title.text = 'Análise de Rejeições por Lote ( ' + this.referenciadesc + ' )';

    this.data = [];
    this.myInnerHeight = 0;
    var data = [{
      AREA_PECA: this.area_peca, REF: this.referencia, DEFEITO: this.defeito, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha != null) ? this.linha.toString() : null
    }];
    //QUERY_REJEICOES_LOTE
    this.PEDIDOSPRODUCAOService.getRejeicoesLote(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          for (var x in response) {
            labels.push(response[x][0]);
            desc.push(response[x][0]);
            datagraf.push(response[x][1]);

            produz.push(response[x][2]);
            defeit.push(response[x][3]);
          }

          this.data3 = [{
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Lote',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Lote',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }


            ]
          }];
          this.myInnerHeight = (this.data3[0].datasets[0].data.length * 25);
          this.data = this.data3[0];
        }
        this.loading = false;
      }, error => {
        this.loading = false;
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


  /*************************************GRAF 2  */

  ordenar() { }

  atualizar2() {
    this.data1_2 = [];
    this.data2_2 = [];
    this.data3_2 = [];
    this.data4_2 = [];

    if (this.graf_2 == "graf") {
      this.carregagraf1_2();
    } else if (this.graf_2 == "graf1") {
      this.carregagraf2_2();
    } else if (this.graf_2 == "graf2") {
      this.carregagraf3_2();
    } else if (this.graf_2 == "graf3") {
      this.carregagraf4_2();
    }
  }

  voltar_2(graf) {
    if (graf == 1) {

      if (this.data1_2.length > 0) {
        this.graf_2 = "graf";
        this.options2.title.text = 'Análise de Rejeições por Referência';
        this.myInnerHeight2 = (this.data1_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data1_2[0];
      } else {
        this.carregagraf1_2();
      }
    } else if (graf == 2) {
      if (this.data2_2.length > 0) {
        this.options2.title.text = 'Análise de Rejeições por Família ( ' + this.referencia_2_desc + ' )';
        this.graf_2 = "graf1";
        this.myInnerHeight2 = (this.data2_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data2_2[0];
      } else {
        this.carregagraf2_2();
      }
    } else if (graf == 3) {
      if (this.data3_2.length > 0) {
        this.options2.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.familia_desc + ' )';
        this.graf_2 = "graf2";
        this.myInnerHeight2 = (this.data3_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data3_2[0];
      } else {
        this.carregagraf3_2();
      }
    }
  }

  onDataSelect_2(event) {
    //console.log(this.data_2.labels[event.element._index])

    //console.log(this.data_2.datasets[event.element._index].data[event.element._index])
    if (this.graf_2 == "graf") {
      if (this.referencia_2 != this.data_2.cod[event.element._index] || this.data2_2.length == 0) {
        this.referencia_2 = this.data_2.cod[event.element._index];
        this.referencia_2_desc = this.data_2.labels[event.element._index];
        this.carregagraf2_2();
      } else {
        this.options2.title.text = 'Análise de Rejeições por Família ( ' + this.referencia_2_desc + ' )';
        this.graf_2 = "graf1";
        this.myInnerHeight2 = (this.data2_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data2_2[0];
      }
    } else if (this.graf_2 == "graf1") {
      if (this.familia != this.data_2.cod[event.element._index] || this.data3_2.length == 0 || this.familia_def != null) {
        this.familia = this.data_2.cod[event.element._index];
        this.familia_desc = this.data_2.labels[event.element._index];

        this.carregagraf3_2();
      } else {
        this.graf_2 = "graf2";
        this.options2.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.familia_desc + ' )';
        this.myInnerHeight2 = (this.data3_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data3_2[0];
      }
    } else if (this.graf_2 == "graf2") {
      if (this.defeito2 != this.data_2.cod[event.element._index] || this.data4_2.length == 0) {
        this.defeito2 = this.data_2.cod[event.element._index];
        this.defeitodesc2 = this.data_2.labels[event.element._index];

        this.carregagraf4_2();
      } else {
        this.graf_2 = "graf3";
        this.options2.title.text = 'Análise de Rejeições por Lote ( ' + this.defeitodesc2 + ' )';
        this.myInnerHeight2 = (this.data4_2[0].datasets[0].data.length * 25);
        this.data_2 = this.data4_2[0];
      }
    }
  }

  carregagraf1_2() {

    this.loading2 = true;
    this.options2.title.text = 'Análise de Rejeições por Referência';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf";

    this.referencia_2 = null;
    this.referencia_2_desc = null;
    this.familia = null;
    this.familia_desc = null;
    this.defeito2 = null;
    this.defeitodesc2 = null;

    var objetivos_gerais = 0;
    if (this.objetivos_gerais) objetivos_gerais = 3;
    var data = [{
      AREA_PECA: this.area_peca2,
      DATA_INI: this.formatDate(this.dataini2), DATA_FIM: this.formatDate(this.datafim2),
      HORA_INI: this.hora_ini2, HORA_FIM: this.hora_fim2,
      LINHA: this.linha2, REF: 'null', objetivos_gerais: objetivos_gerais
      , FAM: this.familia_def
    }];

    //QUERY_REJEICOES_REF
    this.PEDIDOSPRODUCAOService.getRejeicoesRefe(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][0] + ' - ' + response[x][1]);
            cod.push(response[x][0]);
            desc.push(response[x][0] + ' - ' + response[x][1]);
            datagraf.push(response[x][8]);

            produz.push(response[x][4]);
            defeit.push(response[x][5]);
          }


          this.data1_2 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }
            ]
          }];
          this.myInnerHeight2 = (this.data1_2[0].datasets[0].data.length * 25);
          this.data_2 = this.data1_2[0];
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;
      });
  }

  carregagraf2_2() {
    this.loading2 = true;
    this.options2.title.text = 'Análise de Rejeições por Família ( ' + this.referencia_2_desc + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf1";

    this.familia = null;
    this.familia_desc = null;
    this.defeito2 = null;
    this.defeitodesc2 = null;
    var data = [{
      AREA_PECA: this.area_peca2,
      DATA_INI: this.formatDate(this.dataini2), DATA_FIM: this.formatDate(this.datafim2),
      HORA_INI: this.hora_ini2, HORA_FIM: this.hora_fim2,
      LINHA: this.linha2, REF: 'null', PROREF: this.referencia_2
      , FAM: this.familia_def
    }];
    //QUERY_REJEICOES_FAM_DEFEITOS
    this.PEDIDOSPRODUCAOService.getRejeicoesFam_defeitos(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][5] + ' - ' + response[x][1]);
            cod.push(response[x][5]);
            desc.push(response[x][5] + ' - ' + response[x][1]);
            datagraf.push(response[x][3]);

            produz.push(response[x][6]);
            defeit.push(response[x][2]);
          }


          this.data2_2 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }
            ]
          }];
          this.myInnerHeight2 = (this.data2_2[0].datasets[0].data.length * 25);
          this.data_2 = this.data2_2[0];
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;
      });

  }

  carregagraf3_2() {
    this.loading2 = true;

    this.options2.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.familia_desc + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf2";

    this.defeito2 = null;
    this.defeitodesc2 = null;
    var data = [{
      AREA_PECA: this.area_peca2, DATA_INI: this.formatDate(this.dataini2), DATA_FIM: this.formatDate(this.datafim2),
      HORA_INI: this.hora_ini2, HORA_FIM: this.hora_fim2,
      LINHA: this.linha2, FAM: this.familia, PROREF: this.referencia_2
    }];
    //QUERY_REJEICOES_DEFEITOS
    this.PEDIDOSPRODUCAOService.getRejeicoes_defeitos(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          response = response.sort((n1, n2) => {
            if (n1[3] > n2[3]) {
              return -1;
            }

            if (n1[3] < n2[3]) {
              return 1;
            }

            return 0;
          });
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][2] + ' - ' + response[x][0]);
            cod.push(response[x][2]);
            desc.push(response[x][2] + ' - ' + response[x][0]);
            datagraf.push(response[x][3]);

            produz.push(response[x][5]);
            defeit.push(response[x][1]);
          }


          this.data3_2 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              }, {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }
            ]
          }];
          this.myInnerHeight2 = (this.data3_2[0].datasets[0].data.length * 25);
          this.data_2 = this.data3_2[0];
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;
      });
  }


  carregagraf4_2() {
    this.loading2 = true;

    this.options2.title.text = 'Análise de Rejeições por Lote ( ' + this.defeitodesc2 + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf3";
    var data = [{
      AREA_PECA: this.area_peca2,
      DATA_INI: this.formatDate(this.dataini2), DATA_FIM: this.formatDate(this.datafim2),
      HORA_INI: this.hora_ini2, HORA_FIM: this.hora_fim2,
      LINHA: this.linha2, REF: this.referencia_2,
      DEFEITO: this.defeito2
    }];
    //QUERY_REJEICOES_LOTE
    this.PEDIDOSPRODUCAOService.getRejeicoesLote(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          for (var x in response) {
            labels.push(response[x][0]);
            desc.push(response[x][0]);
            datagraf.push(response[x][1]);

            produz.push(response[x][2]);
            defeit.push(response[x][3]);
          }


          this.data4_2 = [{
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              },
              {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }
            ]
          }];
          this.myInnerHeight2 = (this.data4_2[0].datasets[0].data.length * 25);
          this.data_2 = this.data4_2[0];
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;
      });
  }





  /*************************************GRAF 3  */


  atualizar3() {
    this.data1_3 = [];
    this.data2_3 = [];
    this.data3_3 = [];


    if (this.graf_3 == "graf") {
      this.carregagraf1_3();
    } else if (this.graf_3 == "graf1") {
      this.carregagraf2_3();
    } else if (this.graf_3 == "graf2") {
      this.carregagraf3_3();
    }
  }

  voltar_3(graf) {
    if (graf == 1) {

      if (this.data1_3.length > 0) {
        this.graf_3 = "graf";
        this.options3.title.text = 'Análise de Rejeições por Referência';
        this.myInnerHeight3 = (this.data1_3[0].datasets[0].data.length * 25);
        this.data_3 = this.data1_3[0];
      } else {
        this.carregagraf1_3();
      }
    } else if (graf == 2) {
      if (this.data2_3.length > 0) {
        this.options3.title.text = 'Análise de Rejeições por Lote ( ' + this.referencia_3_desc + ' )';
        this.graf_3 = "graf1";
        this.myInnerHeight3 = (this.data2_3[0].datasets[0].data.length * 25);
        this.data_3 = this.data2_3[0];
      } else {
        this.carregagraf2_3();
      }
    }

  }

  onDataSelect_3(event) {


    //console.log(this.data_2.datasets[event.element._index].data[event.element._index])
    if (this.graf_3 == "graf") {
      if (this.referencia_3 != this.data_3.cod[event.element._index] || this.data2_3.length == 0) {
        this.referencia_3 = this.data_3.cod[event.element._index];
        this.referencia_3_desc = this.data_3.labels[event.element._index];
        this.carregagraf2_3();
      } else {
        this.options3.title.text = 'Análise de Rejeições por Lote ( ' + this.referencia_3_desc + ' )';
        this.graf_3 = "graf1";
        this.myInnerHeight3 = (this.data2_3[0].datasets[0].data.length * 25);
        this.data_3 = this.data2_3[0];
      }
    } else if (this.graf_3 == "graf1") {
      if (this.lote != this.data_3.cod[event.element._index] || this.data3_3.length == 0 || this.lote != null) {
        this.lote = this.data_3.cod[event.element._index];

        this.carregagraf3_3();
      } else {
        this.graf_3 = "graf2";
        this.options3.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.lote + ' )';
        this.myInnerHeight3 = (this.data3_3[0].datasets[0].data.length * 25);
        this.data_3 = this.data3_3[0];
      }
    }
  }

  carregagraf1_3() {

    this.loading3 = true;
    this.options3.title.text = 'Análise de Rejeições por Referência';
    this.data_2 = [];
    this.myInnerHeight3 = 0;
    this.graf_3 = "graf";


    this.referencia_3 = null;
    this.referencia_3_desc = null;
    this.lote = null;

    var objetivos_gerais = 0;
    if (this.objetivos_gerais3) objetivos_gerais = 3;
    var lote = null;
    if (this.campo_lote != null && this.campo_lote != "") lote = this.campo_lote;
    var data = [{
      AREA_PECA: this.area_peca3,
      DATA_INI: this.formatDate(this.dataini3), DATA_FIM: this.formatDate(this.datafim3),
      HORA_INI: this.hora_ini3, HORA_FIM: this.hora_fim3,
      LINHA: this.linha3, REF: 'null', objetivos_gerais: objetivos_gerais
      , FAM: this.familia_def, LOTE: lote
    }];

    //QUERY_REJEICOES_REF
    this.PEDIDOSPRODUCAOService.getRejeicoesRefe(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][0] + ' - ' + response[x][1]);
            cod.push(response[x][0]);
            desc.push(response[x][0] + ' - ' + response[x][1]);
            datagraf.push(response[x][8]);

            produz.push(response[x][4]);
            defeit.push(response[x][5]);
          }


          this.data1_3 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito', yAxisID: 'A',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              },
              {
                label: 'Defeito', xAxisID: '2',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              }
            ]
          }];
          this.myInnerHeight3 = (this.data1_3[0].datasets[0].data.length * 25);
          this.data_3 = this.data1_3[0];
        }
        this.loading3 = false;
      }, error => {
        this.loading3 = false;
      });
  }

  carregagraf2_3() {
    this.loading3 = true;
    this.options3.title.text = 'Análise de Rejeições por Lote ( ' + this.referencia_3_desc + ' )';
    this.data_3 = [];
    this.myInnerHeight3 = 0;
    this.graf_3 = "graf1";
    this.lote = null;
    var lote = null;
    if (this.campo_lote != null && this.campo_lote != "") lote = this.campo_lote;
    var data = [{
      AREA_PECA: this.area_peca3,
      DATA_INI: this.formatDate(this.dataini3), DATA_FIM: this.formatDate(this.datafim3),
      HORA_INI: this.hora_ini3, HORA_FIM: this.hora_fim3,
      LINHA: this.linha3, REF: this.referencia_3
      , LOTE: lote
    }];
    //QUERY_REJEICOES_FAM_DEFEITOS
    this.PEDIDOSPRODUCAOService.getanalise_LOTES_LOTE(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {
          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][0]);
            cod.push(response[x][0]);
            desc.push(response[x][0]);
            datagraf.push(response[x][3]);

            produz.push(response[x][4]);
            defeit.push(response[x][5]);
          }


          this.data2_3 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito', yAxisID: 'A',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              }, {
                label: 'Defeito', xAxisID: '2',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              }
            ]
          }];
          this.myInnerHeight3 = (this.data2_3[0].datasets[0].data.length * 25);
          this.data_3 = this.data2_3[0];
        }
        this.loading3 = false;
      }, error => {
        this.loading3 = false;
      });

  }

  carregagraf3_3() {
    this.loading3 = true;

    this.options3.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.lote + ' )';
    this.data_3 = [];
    this.myInnerHeight3 = 0;
    this.graf_3 = "graf2";
    var data = [{
      AREA_PECA: this.area_peca3, DATA_INI: this.formatDate(this.dataini3), DATA_FIM: this.formatDate(this.datafim3),
      HORA_INI: this.hora_ini3, HORA_FIM: this.hora_fim3,
      LINHA: this.linha3, LOTE: this.lote, REF: this.referencia_3
    }];
    //QUERY_REJEICOES_DEFEITOS
    this.PEDIDOSPRODUCAOService.getanalise_LOTES_DEFEITOS(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          var datagraf = [];
          var labels = [];
          var desc = [];
          var produz = [];
          var defeit = [];
          var cod = [];
          for (var x in response) {
            labels.push(response[x][3] + ' - ' + response[x][4]);
            cod.push(response[x][3]);
            desc.push(response[x][3] + ' - ' + response[x][4]);
            datagraf.push(response[x][5]);

            produz.push(response[x][6]);
            defeit.push(response[x][7]);
          }


          this.data3_3 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito', yAxisID: 'A',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              }, {
                label: 'Defeito', xAxisID: '2',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf
              }
            ]
          }];
          this.myInnerHeight3 = (this.data3_3[0].datasets[0].data.length * 25);
          this.data_3 = this.data3_3[0];
        }
        this.loading3 = false;
      }, error => {
        this.loading3 = false;
      });
  }

}
