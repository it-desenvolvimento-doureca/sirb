import { Component, OnInit, ViewChild } from '@angular/core';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-registo_controlo_manutencoes',
  templateUrl: './registo_controlo_manutencoes.component.html',
  styleUrls: ['./registo_controlo_manutencoes.component.css']
})
export class Registo_controlo_manutencoesComponent implements OnInit {

  TOTAL_TRIMESTRE_CORRETIVAS_1 = 0;
  TOTAL_TRIMESTRE_CORRETIVAS_2 = 0;
  TOTAL_TRIMESTRE_CORRETIVAS_3 = 0;
  TOTAL_TRIMESTRE_CORRETIVAS_4 = 0;
  PERCENTAGEM_TRIMESTRE_CORRETIVAS_1 = 0;
  PERCENTAGEM_TRIMESTRE_CORRETIVAS_2 = 0;
  PERCENTAGEM_TRIMESTRE_CORRETIVAS_3 = 0;
  PERCENTAGEM_TRIMESTRE_CORRETIVAS_4 = 0;
  PRODUCAO_TRIMESTRE_CORRETIVAS_1 = 0;
  PRODUCAO_TRIMESTRE_CORRETIVAS_2 = 0;
  PRODUCAO_TRIMESTRE_CORRETIVAS_3 = 0;
  PRODUCAO_TRIMESTRE_CORRETIVAS_4 = 0;
  TOTAL_MENSAL_CORRETIVAS_1 = 0;
  TOTAL_MENSAL_CORRETIVAS_2 = 0;
  TOTAL_MENSAL_CORRETIVAS_3 = 0;
  TOTAL_MENSAL_CORRETIVAS_4 = 0;
  TOTAL_MENSAL_CORRETIVAS_5 = 0;
  TOTAL_MENSAL_CORRETIVAS_6 = 0;
  TOTAL_MENSAL_CORRETIVAS_7 = 0;
  TOTAL_MENSAL_CORRETIVAS_8 = 0;
  TOTAL_MENSAL_CORRETIVAS_9 = 0;
  TOTAL_MENSAL_CORRETIVAS_10 = 0;
  TOTAL_MENSAL_CORRETIVAS_11 = 0;
  TOTAL_MENSAL_CORRETIVAS_12 = 0;
  TOTAL_MENSAL_CORRETIVAS_TOTAL = 0;

  TOTAL_TRIMESTRE_PREVENTIVAS_1 = 0;
  TOTAL_TRIMESTRE_PREVENTIVAS_2 = 0;
  TOTAL_TRIMESTRE_PREVENTIVAS_3 = 0;
  TOTAL_TRIMESTRE_PREVENTIVAS_4 = 0;
  PERCENTAGEM_TRIMESTRE_PREVENTIVAS_1 = 0;
  PERCENTAGEM_TRIMESTRE_PREVENTIVAS_2 = 0;
  PERCENTAGEM_TRIMESTRE_PREVENTIVAS_3 = 0;
  PERCENTAGEM_TRIMESTRE_PREVENTIVAS_4 = 0;
  PRODUCAO_TRIMESTRE_PREVENTIVAS_1 = 0;
  PRODUCAO_TRIMESTRE_PREVENTIVAS_2 = 0;
  PRODUCAO_TRIMESTRE_PREVENTIVAS_3 = 0;
  PRODUCAO_TRIMESTRE_PREVENTIVAS_4 = 0;
  TOTAL_MENSAL_PREVENTIVAS_1 = 0;
  TOTAL_MENSAL_PREVENTIVAS_2 = 0;
  TOTAL_MENSAL_PREVENTIVAS_3 = 0;
  TOTAL_MENSAL_PREVENTIVAS_4 = 0;
  TOTAL_MENSAL_PREVENTIVAS_5 = 0;
  TOTAL_MENSAL_PREVENTIVAS_6 = 0;
  TOTAL_MENSAL_PREVENTIVAS_7 = 0;
  TOTAL_MENSAL_PREVENTIVAS_8 = 0;
  TOTAL_MENSAL_PREVENTIVAS_9 = 0;
  TOTAL_MENSAL_PREVENTIVAS_10 = 0;
  TOTAL_MENSAL_PREVENTIVAS_11 = 0;
  TOTAL_MENSAL_PREVENTIVAS_12 = 0;
  TOTAL_MENSAL_PREVENTIVAS_TOTAL = 0;

  dados_corretivas = [];
  dados_preventivas = [];
  dados_melhorias = [];
  anoCorretiva;
  anoPreventiva;
  anoMelhoria;
  anoIndicadoresCorretivas;
  anoIndicadoresPreventivas;
  equipamentoPreventivas;
  equipamentoCorretivas;
  ano;
  anos = [];
  semanas = [];
  data: any;

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
  data_pie1;
  data_pie2;
  data_pie3;
  data_pie4;
  data_pie5;
  data_pie6;
  data_pie7;

  indicadores_corretivas = []
  indicadores_preventivas = []

  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  drop_equipamentos: any[];
  @ViewChild('tabeladados_preventiva') tabeladados_preventiva: DataTable;
  @ViewChild('tabeladados_melhoria') tabeladados_melhoria: DataTable;
  @ViewChild('tabeladados_corretiva') tabeladados_corretiva: DataTable;
  index: number = 0;
  constructor(private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService) { }

  ngOnInit() {

    var data = new Date()
    this.data = this.formatDate(data);

    var d = new Date(this.data);

    this.anoCorretiva = d.getFullYear();
    this.anoPreventiva = d.getFullYear();
    this.anoMelhoria = d.getFullYear();
    this.ano = d.getFullYear();
    this.anoIndicadoresCorretivas = d.getFullYear();
    this.anoIndicadoresPreventivas = d.getFullYear();

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var y = 1; y <= 53; y++) {
      this.semanas.push({ value: y, label: y })
    }

    var semana = this.getWeek(new Date()) /*+ 1*/;

    this.listar_equipamentos();

    this.carregaCorretivas();
    this.carregaMelhorias();
    this.carregaPreventivas();

    this.carregaEquipaManu();

    this.carregaIndicadoresCorretivas();
    this.carregaIndicadoresPreventivas();

    this.carregaCausasCorretivas();

  }

  handleChange(event) {
    this.index = event.index;
  }

  listar_equipamentos() {


    this.drop_equipamentos = [];
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll2().subscribe(
      response => {
        var count = Object.keys(response).length;
        this.drop_equipamentos.push({ label: 'Sel. Equipamento', value: null });

        for (var x in response) {
          this.drop_equipamentos.push({
            value: response[x][0],
            label: response[x][1],
            localizacao: response[x][3],
            referencia: response[x][5],
            ativo: response[x][6]
          });

        }
        this.drop_equipamentos = this.drop_equipamentos.slice();

      },
      error => console.log(error));


  }

  carregaEquipaManu() {
    var dados = [{
      ANO: this.anoCorretiva
    }];

    this.MANMOVMANUTENCAOCABService.MAN_GET_EQUIPA_MANUTENCAO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        var data1 = [], data2 = [], label1 = [], label2 = []
        for (var x in response) {

          if (response[x][1] > 0) {
            data1.push(response[x][1]);
            label1.push(response[x][0]);
          }

          if (response[x][2] > 0) {
            data2.push(response[x][2]);
            label2.push(response[x][0]);
          }
        }

        this.carregaGrafEquipaManu(data1, data2, label1, label2);
      },
      error => { console.log(error); });

  }

  carregaGrafEquipaManu(data1, data2, label1, label2) {
    this.data_pie1 = {
      labels: label1,
      datasets: [
        {
          data: data1,
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

    this.data_pie2 = {
      labels: label2,
      datasets: [
        {
          data: data2,
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
  }

  carregaCausasCorretivas() {
    var dados = [{
      ANO: this.anoCorretiva
    }];

    this.MANMOVMANUTENCAOCABService.MAN_GET_CAUSAS_AVARIAS(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        var data3 = [], data4 = [], data5 = [], data6 = [], data7 = [], label3 = [], label4 = [], label5 = [], label6 = [], label7 = []
        for (var x in response) {

          if (response[x][1] == 1) {
            data3.push(response[x][2]);
            label3.push(response[x][0]);
          } else if (response[x][1] == 2) {
            data4.push(response[x][2]);
            label4.push(response[x][0]);
          } else if (response[x][1] == 3) {
            data5.push(response[x][2]);
            label5.push(response[x][0]);
          } else if (response[x][1] == 4) {
            data6.push(response[x][2]);
            label6.push(response[x][0]);
          } else if (response[x][1] == 12) {
            data7.push(response[x][2]);
            label7.push(response[x][0]);
          }


        }

        this.carregaGrafCausasCorretivas(data3, data4, data5, data6, data7, label3, label4, label5, label6, label7);
      },
      error => { console.log(error); });

  }

  carregaGrafCausasCorretivas(data3, data4, data5, data6, data7, label3, label4, label5, label6, label7) {
    this.data_pie3 = {
      labels: label3,
      datasets: [
        {
          data: data3,
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

    this.data_pie4 = {
      labels: label4,
      datasets: [
        {
          data: data4,
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

    this.data_pie5 = {
      labels: label5,
      datasets: [
        {
          data: data5,
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

    this.data_pie6 = {
      labels: label6,
      datasets: [
        {
          data: data6,
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

    this.data_pie7 = {
      labels: label7,
      datasets: [
        {
          data: data7,
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
  }


  carregaCorretivas() {
    var dados = [{
      ANO: this.anoCorretiva, TIPO_MANUTENCAO: 'C'
    }];
    this.dados_corretivas = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_ANALISE_MANUTENCAO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;


        for (var x in response) {
          var cor1 = "";
          var cor2 = "";

          if (response[x][6] > 0 && response[x][6] <= 3) {
            cor1 = "#FFFF00";
          } else if (response[x][6] > 3) {
            cor1 = "#FF0000";
          }

          if (response[x][8] > 0 && response[x][8] <= 3) {
            cor2 = "#FFFF00";
          } else if (response[x][8] > 3) {
            cor2 = "#FF0000";
          }

          this.dados_corretivas.push({
            cor1: cor1,
            cor2: cor2,
            trimestre: this.getTrimestre(response[x][0]),
            data_registo: this.meses[response[x][0] - 1],
            maquina: response[x][1],
            seccao: response[x][2],
            tipo_avaria: response[x][3],
            descricao: response[x][4],
            TRABALHO_REALIZADO: response[x][5],
            MATERIAL_UTILIZADO: response[x][10],
            TEMPO_INTERV_MIN: this.formatNumber(response[x][6]),
            TEMPO_INTERV_HORAS: this.formatNumber(response[x][7]),
            TEMPO_PARAGEM_MIN: this.formatNumber(response[x][8]),
            CUSTO_MATERIAL: this.formatNumber(0),
            TEMPO_INTERV_MIN_VALOR: response[x][6],
            TEMPO_INTERV_HORAS_VALOR: response[x][7],
            TEMPO_PARAGEM_MIN_VALOR: response[x][8],
            CUSTO_MATERIAL_VALOR: 0,
            COLABORADORES: response[x][9]
          });
        }

        this.dados_corretivas = this.dados_corretivas.slice();
      },
      error => { console.log(error); });

  }

  getTotalCorretivas(trimestre, tipo) {
    var ids = [];
    if (this.tabeladados_corretiva) {
      var array = this.tabeladados_corretiva._value;
      if (this.tabeladados_corretiva.filteredValue != null) array = this.tabeladados_corretiva.filteredValue;
      var total = 0;

      for (var x in array) {

        if (trimestre == array[x].trimestre) {
          if (tipo == 1) {
            total += array[x].TEMPO_INTERV_MIN_VALOR;
          } else if (tipo == 2) {
            total += array[x].TEMPO_INTERV_HORAS_VALOR;
          } else if (tipo == 3) {
            total += array[x].TEMPO_PARAGEM_MIN_VALOR;
          } else if (tipo == 4) {
            total += array[x].CUSTO_MATERIAL_VALOR;
          }
        }
      }

      return total;
    }
  }

  getTotalMelhorias(trimestre, tipo) {
    var ids = [];
    if (this.tabeladados_melhoria) {
      var array = this.tabeladados_melhoria._value;
      if (this.tabeladados_melhoria.filteredValue != null) array = this.tabeladados_melhoria.filteredValue;
      var total = 0;

      for (var x in array) {

        if (trimestre == array[x].trimestre) {
          if (tipo == 1) {
            total += array[x].TEMPO_INTERV_MIN_VALOR;
          } else if (tipo == 2) {
            total += array[x].TEMPO_INTERV_HORAS_VALOR;
          } else if (tipo == 3) {
            total += array[x].TEMPO_PARAGEM_MIN_VALOR;
          } else if (tipo == 4) {
            total += array[x].CUSTO_MATERIAL_VALOR;
          }
        }
      }

      return total;
    }
  }

  getTotalPreventivas(trimestre, tipo) {
    var ids = [];
    if (this.tabeladados_preventiva) {
      var array = this.tabeladados_preventiva._value;
      if (this.tabeladados_preventiva.filteredValue != null) array = this.tabeladados_preventiva.filteredValue;
      var total = 0;

      for (var x in array) {

        if (trimestre == array[x].trimestre) {
          if (tipo == 1) {
            total += array[x].TEMPO_INTERV_MIN_VALOR;
          } else if (tipo == 2) {
            total += array[x].TEMPO_INTERV_HORAS_VALOR;
          } else if (tipo == 3) {
            total += array[x].TEMPO_PARAGEM_MIN_VALOR;
          } else if (tipo == 4) {
            total += array[x].CUSTO_MATERIAL_VALOR;
          }
        }
      }

      return total;
    }
  }

  carregaPreventivas() {
    var dados = [{
      ANO: this.anoPreventiva, TIPO_MANUTENCAO: 'P'
    }];
    this.dados_preventivas = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_ANALISE_MANUTENCAO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {

          var cor1 = "";
          var cor2 = "";

          if (response[x][6] > 0 && response[x][6] <= 3) {
            cor1 = "#FFFF00";
          } else if (response[x][6] > 3) {
            cor1 = "#FF0000";
          }

          if (response[x][8] > 0 && response[x][8] <= 3) {
            cor2 = "#FFFF00";
          } else if (response[x][8] > 3) {
            cor2 = "#FF0000";
          }

          this.dados_preventivas.push({
            cor1: cor1,
            cor2: cor2,
            trimestre: this.getTrimestre(response[x][0]),
            data_registo: this.meses[response[x][0] - 1],
            maquina: response[x][1],
            seccao: response[x][2],
            tipo_avaria: response[x][3],
            descricao: response[x][4],
            TRABALHO_REALIZADO: response[x][5],
            MATERIAL_UTILIZADO: response[x][10],
            TEMPO_INTERV_MIN: this.formatNumber(response[x][6]),
            TEMPO_INTERV_HORAS: this.formatNumber(response[x][7]),
            TEMPO_PARAGEM_MIN: this.formatNumber(response[x][8]),
            CUSTO_MATERIAL: this.formatNumber(0),
            TEMPO_INTERV_MIN_VALOR: response[x][6],
            TEMPO_INTERV_HORAS_VALOR: response[x][7],
            TEMPO_PARAGEM_MIN_VALOR: response[x][8],
            CUSTO_MATERIAL_VALOR: 0,
            COLABORADORES: response[x][9]
          });
        }

        this.dados_preventivas = this.dados_preventivas.slice();
      },
      error => { console.log(error); });
  }

  carregaMelhorias() {
    var dados = [{
      ANO: this.anoMelhoria, TIPO_MANUTENCAO: 'MM'
    }];
    this.dados_melhorias = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_ANALISE_MANUTENCAO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        for (var x in response) {

          var cor1 = "";
          var cor2 = "";

          if (response[x][6] > 0 && response[x][6] <= 3) {
            cor1 = "#FFFF00";
          } else if (response[x][6] > 3) {
            cor1 = "#FF0000";
          }

          if (response[x][8] > 0 && response[x][8] <= 3) {
            cor2 = "#FFFF00";
          } else if (response[x][8] > 3) {
            cor2 = "#FF0000";
          }

          this.dados_melhorias.push({
            cor1: cor1,
            cor2: cor2,
            trimestre: this.getTrimestre(response[x][0]),
            data_registo: this.meses[response[x][0] - 1],
            maquina: response[x][1],
            seccao: response[x][2],
            tipo_avaria: response[x][3],
            descricao: response[x][4],
            TRABALHO_REALIZADO: response[x][5],
            MATERIAL_UTILIZADO: response[x][10],
            TEMPO_INTERV_MIN: this.formatNumber(response[x][6]),
            TEMPO_INTERV_HORAS: this.formatNumber(response[x][7]),
            TEMPO_PARAGEM_MIN: this.formatNumber(response[x][8]),
            CUSTO_MATERIAL: this.formatNumber(0),
            TEMPO_INTERV_MIN_VALOR: response[x][6],
            TEMPO_INTERV_HORAS_VALOR: response[x][7],
            TEMPO_PARAGEM_MIN_VALOR: response[x][8],
            CUSTO_MATERIAL_VALOR: 0,
            COLABORADORES: response[x][9]
          });
        }

        this.dados_melhorias = this.dados_melhorias.slice();
      },
      error => { console.log(error); });
  }

  getTrimestre(valor) {
    if (valor == 1 || valor == 2 || valor == 3) {
      return 1;
    } else if (valor == 4 || valor == 5 || valor == 6) {
      return 2;
    } else if (valor == 7 || valor == 8 || valor == 9) {
      return 3;
    } else if (valor == 10 || valor == 11 || valor == 12) {
      return 4;
    }
  }

  carregaIndicadoresCorretivas() {
    var dados = [{
      ANO: this.anoIndicadoresCorretivas, TIPO_MANUTENCAO: 'C', EQUIPAMENTO: this.equipamentoCorretivas
    }];
    this.indicadores_corretivas = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_INDICADORES(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        this.TOTAL_TRIMESTRE_CORRETIVAS_1 = 0;
        this.TOTAL_TRIMESTRE_CORRETIVAS_2 = 0;
        this.TOTAL_TRIMESTRE_CORRETIVAS_3 = 0;
        this.TOTAL_TRIMESTRE_CORRETIVAS_4 = 0;

        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_1 = 0;
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_2 = 0;
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_3 = 0;
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_4 = 0;

        this.PRODUCAO_TRIMESTRE_CORRETIVAS_1 = 0;
        this.PRODUCAO_TRIMESTRE_CORRETIVAS_2 = 0;
        this.PRODUCAO_TRIMESTRE_CORRETIVAS_3 = 0;
        this.PRODUCAO_TRIMESTRE_CORRETIVAS_4 = 0;


        this.TOTAL_MENSAL_CORRETIVAS_1 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_2 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_3 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_4 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_5 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_6 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_7 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_8 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_9 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_10 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_11 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_12 = 0;
        this.TOTAL_MENSAL_CORRETIVAS_TOTAL = 0;

        for (var x in response) {

          var cortotal = ''
          var tempo1 = (response[x][1] + response[x][2] + response[x][3]);
          var tempo2 = (response[x][4] + response[x][5] + response[x][6]);
          var tempo3 = (response[x][7] + response[x][8] + response[x][9]);
          var tempo4 = (response[x][10] + response[x][11] + response[x][12]);


          var tempoprod1 = 1;
          var tempoprod2 = 1;
          var tempoprod3 = 1;
          var tempoprod4 = 1;

          var percentagemprod1 = (tempoprod1 == 0) ? 0 : ((tempo1 / tempoprod1) * 100);
          var percentagemprod2 = (tempoprod2 == 0) ? 0 : ((tempo2 / tempoprod2) * 100);
          var percentagemprod3 = (tempoprod3 == 0) ? 0 : ((tempo3 / tempoprod3) * 100);
          var percentagemprod4 = (tempoprod4 == 0) ? 0 : ((tempo4 / tempoprod4) * 100);

          var total_anual = tempo1 + tempo2 + tempo3 + tempo4;

          if (total_anual > 0 && total_anual <= 50) {
            cortotal = "#FFFF00";
          } else if (total_anual > 3) {
            cortotal = "#FF0000";
          }

          this.TOTAL_TRIMESTRE_CORRETIVAS_1 += tempo1;
          this.TOTAL_TRIMESTRE_CORRETIVAS_2 += tempo2;
          this.TOTAL_TRIMESTRE_CORRETIVAS_3 += tempo3;
          this.TOTAL_TRIMESTRE_CORRETIVAS_4 += tempo4;


          this.PRODUCAO_TRIMESTRE_CORRETIVAS_1 += tempoprod1;
          this.PRODUCAO_TRIMESTRE_CORRETIVAS_2 += tempoprod2;
          this.PRODUCAO_TRIMESTRE_CORRETIVAS_3 += tempoprod3;
          this.PRODUCAO_TRIMESTRE_CORRETIVAS_4 += tempoprod4;

          this.TOTAL_MENSAL_CORRETIVAS_1 += response[x][1];
          this.TOTAL_MENSAL_CORRETIVAS_2 += response[x][2];
          this.TOTAL_MENSAL_CORRETIVAS_3 += response[x][3];
          this.TOTAL_MENSAL_CORRETIVAS_4 += response[x][4];
          this.TOTAL_MENSAL_CORRETIVAS_5 += response[x][5];
          this.TOTAL_MENSAL_CORRETIVAS_6 += response[x][6];
          this.TOTAL_MENSAL_CORRETIVAS_7 += response[x][7];
          this.TOTAL_MENSAL_CORRETIVAS_8 += response[x][8];
          this.TOTAL_MENSAL_CORRETIVAS_9 += response[x][9];
          this.TOTAL_MENSAL_CORRETIVAS_10 += response[x][10];
          this.TOTAL_MENSAL_CORRETIVAS_11 += response[x][11];
          this.TOTAL_MENSAL_CORRETIVAS_12 += response[x][12];
          this.TOTAL_MENSAL_CORRETIVAS_TOTAL += total_anual;



          this.indicadores_corretivas.push({
            maquina: response[x][0],
            jan: this.formatNumber(response[x][1]),
            fev: this.formatNumber(response[x][2]),
            mar: this.formatNumber(response[x][3]),
            abri: this.formatNumber(response[x][4]),
            mai: this.formatNumber(response[x][5]),
            jun: this.formatNumber(response[x][6]),
            jul: this.formatNumber(response[x][7]),
            ago: this.formatNumber(response[x][8]),
            set: this.formatNumber(response[x][9]),
            out: this.formatNumber(response[x][10]),
            nov: this.formatNumber(response[x][11]),
            dez: this.formatNumber(response[x][12]),
            total_anual: this.formatNumber(total_anual),
            tempo_trimestre1: this.formatNumber(tempoprod1),
            tempo_manutencao1: this.formatNumber(percentagemprod1),
            tempo_trimestre2: this.formatNumber(tempoprod2),
            tempo_manutencao2: this.formatNumber(percentagemprod2),
            tempo_trimestre3: this.formatNumber(tempoprod3),
            tempo_manutencao3: this.formatNumber(percentagemprod3),
            tempo_trimestre4: this.formatNumber(tempoprod4),
            tempo_manutencao4: this.formatNumber(percentagemprod4)
          });
        }

        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_1 = (this.PRODUCAO_TRIMESTRE_CORRETIVAS_1 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_CORRETIVAS_1 / this.PRODUCAO_TRIMESTRE_CORRETIVAS_1) * 100);
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_2 = (this.PRODUCAO_TRIMESTRE_CORRETIVAS_2 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_CORRETIVAS_2 / this.PRODUCAO_TRIMESTRE_CORRETIVAS_2) * 100);
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_3 = (this.PRODUCAO_TRIMESTRE_CORRETIVAS_3 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_CORRETIVAS_3 / this.PRODUCAO_TRIMESTRE_CORRETIVAS_3) * 100);
        this.PERCENTAGEM_TRIMESTRE_CORRETIVAS_4 = (this.PRODUCAO_TRIMESTRE_CORRETIVAS_4 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_CORRETIVAS_4 / this.PRODUCAO_TRIMESTRE_CORRETIVAS_4) * 100);


        this.indicadores_corretivas = this.indicadores_corretivas.slice();
      },
      error => { console.log(error); });
  }

  carregaIndicadoresPreventivas() {
    var dados = [{
      ANO: this.anoIndicadoresPreventivas, TIPO_MANUTENCAO: 'C', EQUIPAMENTO: this.equipamentoPreventivas
    }];
    this.indicadores_preventivas = [];
    this.MANMOVMANUTENCAOCABService.MAN_GET_INDICADORES(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        this.TOTAL_TRIMESTRE_PREVENTIVAS_1 = 0;
        this.TOTAL_TRIMESTRE_PREVENTIVAS_2 = 0;
        this.TOTAL_TRIMESTRE_PREVENTIVAS_3 = 0;
        this.TOTAL_TRIMESTRE_PREVENTIVAS_4 = 0;

        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_1 = 0;
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_2 = 0;
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_3 = 0;
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_4 = 0;

        this.PRODUCAO_TRIMESTRE_PREVENTIVAS_1 = 0;
        this.PRODUCAO_TRIMESTRE_PREVENTIVAS_2 = 0;
        this.PRODUCAO_TRIMESTRE_PREVENTIVAS_3 = 0;
        this.PRODUCAO_TRIMESTRE_PREVENTIVAS_4 = 0;


        this.TOTAL_MENSAL_PREVENTIVAS_1 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_2 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_3 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_4 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_5 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_6 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_7 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_8 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_9 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_10 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_11 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_12 = 0;
        this.TOTAL_MENSAL_PREVENTIVAS_TOTAL = 0;

        for (var x in response) {

          var cortotal = ''
          var tempo1 = (response[x][1] + response[x][2] + response[x][3]);
          var tempo2 = (response[x][4] + response[x][5] + response[x][6]);
          var tempo3 = (response[x][7] + response[x][8] + response[x][9]);
          var tempo4 = (response[x][10] + response[x][11] + response[x][12]);


          var tempoprod1 = 1;
          var tempoprod2 = 1;
          var tempoprod3 = 1;
          var tempoprod4 = 1;

          var percentagemprod1 = (tempoprod1 == 0) ? 0 : ((tempo1 / tempoprod1) * 100);
          var percentagemprod2 = (tempoprod2 == 0) ? 0 : ((tempo2 / tempoprod2) * 100);
          var percentagemprod3 = (tempoprod3 == 0) ? 0 : ((tempo3 / tempoprod3) * 100);
          var percentagemprod4 = (tempoprod4 == 0) ? 0 : ((tempo4 / tempoprod4) * 100);

          var total_anual = tempo1 + tempo2 + tempo3 + tempo4;

          if (total_anual > 0 && total_anual <= 50) {
            cortotal = "#FFFF00";
          } else if (total_anual > 3) {
            cortotal = "#FF0000";
          }

          this.TOTAL_TRIMESTRE_PREVENTIVAS_1 += tempo1;
          this.TOTAL_TRIMESTRE_PREVENTIVAS_2 += tempo2;
          this.TOTAL_TRIMESTRE_PREVENTIVAS_3 += tempo3;
          this.TOTAL_TRIMESTRE_PREVENTIVAS_4 += tempo4;


          this.PRODUCAO_TRIMESTRE_PREVENTIVAS_1 += tempoprod1;
          this.PRODUCAO_TRIMESTRE_PREVENTIVAS_2 += tempoprod2;
          this.PRODUCAO_TRIMESTRE_PREVENTIVAS_3 += tempoprod3;
          this.PRODUCAO_TRIMESTRE_PREVENTIVAS_4 += tempoprod4;

          this.TOTAL_MENSAL_PREVENTIVAS_1 += response[x][1];
          this.TOTAL_MENSAL_PREVENTIVAS_2 += response[x][2];
          this.TOTAL_MENSAL_PREVENTIVAS_3 += response[x][3];
          this.TOTAL_MENSAL_PREVENTIVAS_4 += response[x][4];
          this.TOTAL_MENSAL_PREVENTIVAS_5 += response[x][5];
          this.TOTAL_MENSAL_PREVENTIVAS_6 += response[x][6];
          this.TOTAL_MENSAL_PREVENTIVAS_7 += response[x][7];
          this.TOTAL_MENSAL_PREVENTIVAS_8 += response[x][8];
          this.TOTAL_MENSAL_PREVENTIVAS_9 += response[x][9];
          this.TOTAL_MENSAL_PREVENTIVAS_10 += response[x][10];
          this.TOTAL_MENSAL_PREVENTIVAS_11 += response[x][11];
          this.TOTAL_MENSAL_PREVENTIVAS_12 += response[x][12];
          this.TOTAL_MENSAL_PREVENTIVAS_TOTAL += total_anual;



          this.indicadores_preventivas.push({
            maquina: response[x][0],
            jan: this.formatNumber(response[x][1]),
            fev: this.formatNumber(response[x][2]),
            mar: this.formatNumber(response[x][3]),
            abri: this.formatNumber(response[x][4]),
            mai: this.formatNumber(response[x][5]),
            jun: this.formatNumber(response[x][6]),
            jul: this.formatNumber(response[x][7]),
            ago: this.formatNumber(response[x][8]),
            set: this.formatNumber(response[x][9]),
            out: this.formatNumber(response[x][10]),
            nov: this.formatNumber(response[x][11]),
            dez: this.formatNumber(response[x][12]),
            total_anual: this.formatNumber(total_anual),
            tempo_trimestre1: this.formatNumber(tempoprod1),
            tempo_manutencao1: this.formatNumber(percentagemprod1),
            tempo_trimestre2: this.formatNumber(tempoprod2),
            tempo_manutencao2: this.formatNumber(percentagemprod2),
            tempo_trimestre3: this.formatNumber(tempoprod3),
            tempo_manutencao3: this.formatNumber(percentagemprod3),
            tempo_trimestre4: this.formatNumber(tempoprod4),
            tempo_manutencao4: this.formatNumber(percentagemprod4)
          });
        }

        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_1 = (this.PRODUCAO_TRIMESTRE_PREVENTIVAS_1 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_PREVENTIVAS_1 / this.PRODUCAO_TRIMESTRE_PREVENTIVAS_1) * 100);
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_2 = (this.PRODUCAO_TRIMESTRE_PREVENTIVAS_2 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_PREVENTIVAS_2 / this.PRODUCAO_TRIMESTRE_PREVENTIVAS_2) * 100);
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_3 = (this.PRODUCAO_TRIMESTRE_PREVENTIVAS_3 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_PREVENTIVAS_3 / this.PRODUCAO_TRIMESTRE_PREVENTIVAS_3) * 100);
        this.PERCENTAGEM_TRIMESTRE_PREVENTIVAS_4 = (this.PRODUCAO_TRIMESTRE_PREVENTIVAS_4 == 0) ? 0 : ((this.TOTAL_TRIMESTRE_PREVENTIVAS_4 / this.PRODUCAO_TRIMESTRE_PREVENTIVAS_4) * 100);


        this.indicadores_preventivas = this.indicadores_preventivas.slice();
      },
      error => { console.log(error); });
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

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
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

function drawBarValuesPercentage() {
  // render the value of the chart above the bar
  var ctx = this.chart.ctx;

  //ctx.fillStyle = 'white'
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

      //ctx.fillStyle = '#fff';
      if (i == 3) { // Darker text color for lighter background
        ctx.fillStyle = '#444';
      }
      var percent = dataset.data[i] / total * 100;
      //Don't Display If Legend is hide or value is 0

      if (dataset.data[i] != 0) {
        ctx.fillText(formatPercentage(percent, 1, ",", ".") + ' %', model.x + x, model.y + y + 15);

      }
    }
  });
}