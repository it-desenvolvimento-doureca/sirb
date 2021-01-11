import { Component, OnInit } from '@angular/core';
import { PEDIDOSPRODUCAOService } from 'app/servicos/pedidosproducao.service';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { ConditionalExpr } from '@angular/compiler';
import { GERREFERENCIASFASTRESPONSEREJEICOESService } from 'app/servicos/ger-referencias-fastresponse-rejeicoes.service';
import { GER_REFERENCIAS_FASTRESPONSE_REJEICOES } from 'app/entidades/GER_REFERENCIAS_FASTRESPONSE_REJEICOES';

@Component({
  selector: 'app-analise-de-rejeicoes',
  templateUrl: './analise-de-rejeicoes.component.html',
  styleUrls: ['./analise-de-rejeicoes.component.css']
})
export class AnaliseDeRejeicoesComponent implements OnInit {
  cars1 = [];
  loading: boolean;
  linhas: any[];
  referencias: any[];
  data_ini;
  data_fim;
  referencia = [];
  linha = null;
  objetivos_gerais = false;
  filteredItems: any[];
  data: any[];
  dados = [];
  lista: any[] = [];
  loading2: boolean;
  totallista_produzidas: number;
  totallista_rejeitadas: number;
  totallista_rejeicao;
  totallista_areaprod: number;
  totallista_arearej: number;
  totallista_media: number;
  numbarras: number = 0;
  ativobt = "1";
  data_fim_func: any;
  data_ini_func: any;
  referencia_func = null;
  filteredItems_func: any;
  dados_func: any = [];
  cars1_func: any;
  loading_func: boolean;
  funcionario: any;
  referencias2: any[];

  area_peca = 0;
  area_peca2 = 0;

  areas_pecas = [{ value: 0, label: "Todas" }, { value: 1, label: "Menor que 10dm2" }, { value: 2, label: "Maior ou igual a 10dm2" }]
  hora_ini: string;
  hora_ini_func: string;
  hora_fim: string;
  hora_fim_func: string;

  data_dash;
  data_tab6;
  data1 = [];
  data2 = [];
  data3 = [];
  graf = "";
  dataini;
  datafim;
  //linhas_dash = [];
  linha_dash = null;
  loading_dash = false;


  data_2;
  data1_2 = [];
  data2_2 = [];
  data3_2 = [];
  graf_2 = "graf";
  dataini2;
  datafim2;
  linha2 = null;
  loading2_dash = false;
  loading_tab6 = false;
  myInnerHeight2 = 200;
  myInnerHeight6 = 200;

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

  options_tab6 = {
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
          label: '% do Defeito',
          beginAtZero: true
        }, scaleLabel: {
          display: true,
          labelString: '% do Defeito'
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
          /*ticks: {
            callback: function (value) { return value.toFixed(2) + "%" },
            label: '',
            beginAtZero: true
          },*/
          scaleLabel: {
            display: true,
            labelString: ''
          }, gridLines: {
            display: true
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
  referencia_dash: any;
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
  defeitos: any[];
  familia_def;
  objetivos_gerais_dash: any;
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
  area_peca_dash = 0;
  area_peca2_dash = 0;
  area_peca3 = 0;
  areas_pecas_dash = [{ value: 0, label: "Todas" }, { value: 1, label: "Menor que 10dm2" }, { value: 2, label: "Maior ou igual a 10dm2" }]
  hora_ini1: string;
  hora_ini2: string;
  hora_ini3: string;
  hora_fim1: string;
  hora_fim2: string;
  hora_fim3: string;

  campo_ref_func: any;
  campo_ref_dash;
  campo_ref_tab6: any;
  campo_refs: any;
  filteredreferencia_func: any[] = [];
  filteredreferencia_tab6: any[] = [];
  filteredreferencia: any[] = [];
  referencia_tab6: any = null;
  data_ini_tab6: any;
  defeito_tab6: any = null;
  data_fim_tab6: any;
  data_dialog: Date;
  display_dialog = false;
  tabela_refs: any[];
  referencia_ref_dash;
  filteredreferencia_ref_dash: any[] = [];
  user;
  refs_selected = [];
  select_table: any;
  data_dialog2: Date;
  display_dialog2: boolean;
  displayvalidacao: boolean;
  errovalida;
  filteredItems2: any[];
  tabela_refs_data: any;
  display_dialog_true: boolean;

  constructor(private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICLINHAService: ABDICLINHAService,
    private PEDIDOSPRODUCAOService: PEDIDOSPRODUCAOService, private GERREFERENCIASFASTRESPONSEREJEICOESService: GERREFERENCIASFASTRESPONSEREJEICOESService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    var d = new Date();
    this.data_fim = this.formatDate(d);
    d.setDate(d.getDate() - 1);
    this.data_ini = this.formatDate(d);
    this.data_fim_func = this.data_fim;
    this.data_ini_func = this.data_ini;
    this.data_ini_tab6 = this.data_ini;
    this.data_fim_tab6 = this.data_fim;
    this.data_dialog = new Date(this.data_ini);
    this.data_dialog2 = this.data_dialog;
    this.hora_ini = "06:01";
    this.hora_ini_func = "06:01";
    this.hora_fim = "06:00";
    this.hora_fim_func = "06:00";


    var d_graf = new Date();
    this.datafim = this.formatDate(d_graf);
    this.datafim2 = this.formatDate(d_graf);
    this.datafim3 = this.formatDate(d_graf);
    d_graf.setDate(d_graf.getDate() - 1);
    this.dataini = this.formatDate(d_graf);
    this.dataini2 = this.formatDate(d_graf);
    this.dataini3 = this.formatDate(d_graf);

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

      },
      error => {
        console.log(error);
      });

    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.referencias = [];
        // this.referencias2 = [];
        //this.referencias2.push({ label: 'Selecionar Referência', value: null });

        for (var x in response) {
          this.referencias.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1, value: response[x].PROREF });
          //this.referencias2.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1, value: response[x].PROREF });
        }

        this.referencias = this.referencias.slice();
        // this.referencias2 = this.referencias2.slice();

      },
      error => {
        console.log(error);
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

    this.ABDICCOMPONENTEService.getDefeitos().subscribe(
      response => {
        this.defeitos = [];
        this.defeitos.push({ label: "Sel. Defeito", value: '' });
        for (var x in response) {
          this.defeitos.push({ label: response[x].defeito + ' - ' + response[x].descricao, value: response[x].defeito });
        }

        this.defeitos = this.defeitos.slice();
      },
      error => {
        console.log(error);

      });
    //this.carregaref();
    //this.carregalistaresumo();
  }

  atualizar() {
    var objetivos_gerais = 0;
    var refs = null;
    if (this.referencia.length > 0) refs = this.referencia.toString();
    if (this.objetivos_gerais) objetivos_gerais = 1;
    //var data = [{ DATA_INI: this.formatDate(this.data_ini), DATA_FIM: this.formatDate(this.data_fim), LINHA: this.linha, REF: refs, objetivos_gerais: objetivos_gerais }];

    this.carregaref();
    this.carregalistaresumo();

  }


  assignCopy() {
    this.filteredItems = Object.assign([], this.cars1);
    this.dados = this.filteredItems;

  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();

    } else {

    }
    this.filteredItems = Object.assign([], this.cars1).filter(
      item => item.brand.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.dados = this.filteredItems;

    //console.log(this.filteredItems);
  }

  carregaref() {
    this.loading = true;
    this.cars1 = [];
    this.dados = [];
    var objetivos_gerais = 0;
    var refs = null;
    if (this.referencia.length > 0) refs = this.referencia.toString();
    if (this.objetivos_gerais) objetivos_gerais = 1;
    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim), LINHA: this.linha, REF: refs, objetivos_gerais: objetivos_gerais, FAM: null
    }];

    this.PEDIDOSPRODUCAOService.getRejeicoesRefe(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            this.cars1.push({
              desc_proref: response[x][1],
              id: parseInt(x) + 1, brand: response[x][0] + ' - ' + response[x][1], proref: response[x][0], areadef: response[x][10],
              fase: response[x][2], areapeca: response[x][3], produzidas: response[x][4], defeito: response[x][5], areprod: response[x][6], barras: response[x][9],
              objetivov: (response[x][7]), percdefeitov: response[x][8], media: response[x][11],
              objetivo: (response[x][7] == null) ? 0.00 : (response[x][7]).toFixed(2), percdefeito: (response[x][8] == null) ? 0.00 : response[x][8].toFixed(3), atualiza: false, iconplus: true, child: []
            })
          }
          this.assignCopy()
        }
        this.loading = false;

      }, error => {
        this.loading = false;
      });
  }

  getfamdefeitos(id) {
    this.cars1.find(item => item.id == id).iconplus = !this.cars1.find(item => item.id == id).iconplus;
    var PROREF = this.cars1.find(item => item.id == id).proref;
    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim), LINHA: this.linha, PROREF: PROREF, FAM: null
    }];
    if (this.cars1.find(item => item.id == id).child.length == 0 && !this.cars1.find(item => item.id == id).atualiza) {
      this.cars1.find(item => item.id == id).iconplus = true;
      this.cars1.find(item => item.id == id).atualiza = true;
      this.PEDIDOSPRODUCAOService.getRejeicoesFam_defeitos(data).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            for (var x in response) {
              this.cars1.find(item => item.id == id).child.push({
                id: parseInt(x) + 1, brand: response[x][1],
                defeito: response[x][2], familia: response[x][5],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("referencia" + id).classList.remove("collapsed");
              document.getElementById("collapseref" + id).classList.remove("collapse");
              document.getElementById("collapseref" + id).style.height = "auto";
              this.cars1.find(item => item.id == id).iconplus = false;
            }, 50);
          } else {
            this.cars1.find(item => item.id == id).iconplus = true;
          }
          this.cars1.find(item => item.id == id).atualiza = false;
        }, error => {
          this.cars1.find(item => item.id == id).atualiza = false;
        });
    }
  }



  getdefeitos(ref, fam) {

    var index = this.cars1.findIndex(item => item.id == ref);


    this.cars1[index].child.find(item => item.id == fam).iconplus = !this.cars1[index].child.find(item => item.id == fam).iconplus;
    var PROREF = this.cars1.find(item => item.id == ref).proref;
    var FAM = this.cars1[index].child.find(item => item.id == fam).familia;
    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini), DATA_FIM: this.formatDate(this.data_fim),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      LINHA: this.linha, PROREF: PROREF, FAM: FAM
    }];
    if (this.cars1[index].child.find(item => item.id == fam).child.length == 0 && !this.cars1[index].child.find(item => item.id == fam).atualiza) {
      this.cars1[index].child.find(item => item.id == fam).iconplus = true;
      this.cars1[index].child.find(item => item.id == fam).atualiza = true;
      this.PEDIDOSPRODUCAOService.getRejeicoes_defeitos(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {
              this.cars1[index].child.find(item => item.id == fam).child.push({
                id: parseInt(x) + 1, brand: response[x][2] + ' - ' + response[x][0],
                defeito: response[x][1], tipodefeito: response[x][2],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsefam" + ref + fam).classList.remove("collapsed");
              document.getElementById("collapsetipo" + ref + fam).classList.remove("collapse");
              document.getElementById("collapsetipo" + ref + fam).style.height = "auto";
              this.cars1[index].child.find(item => item.id == fam).iconplus = false;
            }, 50);
          } else {
            this.cars1[index].child.find(item => item.id == fam).iconplus = true;
          }
          this.cars1[index].child.find(item => item.id == fam).atualiza = false;
        }, error => {
          this.cars1[index].child.find(item => item.id == fam).atualiza = false;
        });
    }
  }


  getlote(ref, fam, defeito) {
    var index = this.cars1.findIndex(item => item.id == ref);
    var index2 = this.cars1[index].child.findIndex(item => item.id == fam);

    this.cars1[index].child[index2].child.find(item => item.id == defeito).iconplus = !this.cars1[index].child[index2].child.find(item => item.id == defeito).iconplus;


    var PROREF = this.cars1.find(item => item.id == ref).proref;
    var DEFEITO = this.cars1[index].child[index2].child.find(item => item.id == defeito).tipodefeito;
    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini), DATA_FIM: this.formatDate(this.data_fim),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      LINHA: this.linha, PROREF: PROREF, DEFEITO: DEFEITO
    }];
    if (this.cars1[index].child[index2].child.find(item => item.id == defeito).child.length == 0 && !this.cars1[index].child[index2].child.find(item => item.id == defeito).atualiza) {
      this.cars1[index].child[index2].child.find(item => item.id == defeito).iconplus = true;
      this.cars1[index].child[index2].child.find(item => item.id == defeito).atualiza = true;
      this.PEDIDOSPRODUCAOService.getRejeicoes_defeitoslote(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          //console.log(response)
          if (count > 0) {

            for (var x in response) {
              this.cars1[index].child[index2].child.find(item => item.id == defeito).child.push({
                id: parseInt(x) + 1, brand: response[x][5],
                defeito: response[x][1],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsedef" + ref + fam + defeito).classList.remove("collapsed");
              document.getElementById("collapselote" + ref + fam + defeito).classList.remove("collapse");
              document.getElementById("collapselote" + ref + fam + defeito).style.height = "auto";
              this.cars1[index].child[index2].child.find(item => item.id == defeito).iconplus = false;

            }, 50);
          } else {
            this.cars1[index].child[index2].child.find(item => item.id == defeito).iconplus = true;
          }
          this.cars1[index].child[index2].child.find(item => item.id == defeito).atualiza = false;
        }, error => {
          this.cars1[index].child[index2].child.find(item => item.id == defeito).atualiza = false;
        });
    }
  }


  calculateGroupTotal(brand: string) {
    let total = 0;

    if (this.cars1) {
      for (let car of this.cars1) {
        if (car.brand === brand) {
          total += car.price;
        }
      }
    }

    return total;
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


  //lista resumo defeitos

  carregalistaresumo() {
    this.loading2 = true;
    this.totallista_produzidas = 0;
    this.totallista_rejeitadas = 0;
    this.totallista_rejeicao = 0;
    this.totallista_areaprod = 0;
    this.totallista_arearej = 0;
    this.totallista_media = 0;
    this.numbarras = 0;
    this.lista = [];
    var objetivos_gerais = 0;
    var refs = null;
    if (this.referencia.length > 0) refs = this.referencia.toString();
    if (this.objetivos_gerais) objetivos_gerais = 1;

    var data = [{
      AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini), DATA_FIM: this.formatDate(this.data_fim),
      HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      LINHA: this.linha, REF: refs, objetivos_gerais: objetivos_gerais
    }];


    this.PEDIDOSPRODUCAOService.getanalise_rejeicoes(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          var totallista_rejeitadas = 0;
          var totallista_rejeicao = 0;
          var totallista_areaprod = 0;
          var totallista_arearej = 0;
          for (var x in response) {
            var child = { tipodef: response[x][0], descricao: response[x][1], percdefeitov: response[x][3], percdefeito: response[x][3].toFixed(3), defeitos: response[x][2], areadefeitov: response[x][10], areadefeito: response[x][10].toFixed(3) };
            if (this.lista.find(item => item.familia == response[x][4])) {
              this.lista.find(item => item.familia == response[x][4]).child.push(child)
            } else {
              this.lista.push({ familia: response[x][4], descricao: response[x][5], child: [child] })
            }
            this.totallista_produzidas = response[x][6];
            totallista_rejeitadas += response[x][2];
            totallista_rejeicao += response[x][3];
            totallista_areaprod = response[x][7];
            totallista_arearej = response[x][9];
            this.numbarras = response[x][8];
          }

          this.totallista_rejeitadas = totallista_rejeitadas;
          this.totallista_rejeicao = totallista_rejeicao.toFixed(3);
          this.totallista_areaprod = totallista_areaprod;
          this.totallista_arearej = totallista_arearej;
          this.totallista_media = this.round((totallista_arearej / totallista_areaprod) * 100);

        }
        this.loading2 = false;

      }, error => {
        this.loading2 = false;
      });
  }

  gettotal_def(familia) {
    var total = 0;
    for (var x in this.lista) {
      if (this.lista[x].familia == familia) {
        for (var y in this.lista[x].child) {
          total += this.lista[x].child[y].defeitos;
        }
      }
    }

    return this.round(total);
  }

  gettotal_perc(familia) {
    var total = 0;
    for (var x in this.lista) {
      if (this.lista[x].familia == familia) {
        for (var y in this.lista[x].child) {
          total += this.lista[x].child[y].percdefeitov;
        }
      }
    }

    return total.toFixed(3);
  }

  gettotal_perc_area(familia) {
    var total = 0;
    for (var x in this.lista) {
      if (this.lista[x].familia == familia) {
        for (var y in this.lista[x].child) {
          total += this.lista[x].child[y].areadefeitov;
        }
      }
    }

    return total.toFixed(3);
  }

  round(value) {
    if (value == null) {
      return 0;
    }
    return Math.round(value * 100) / 100;
  }


  /***************************** FUNCIONÁRIO */

  atualizar_func() {
    var refs = null;
    //if (this.referencia_func.length > 0) refs = this.referencia_func;
    refs = this.referencia_func;


    var data = [{
      AREA_PECA: this.area_peca2, DATA_INI: this.formatDate(this.data_ini_func), DATA_FIM: this.formatDate(this.data_fim_func),
      HORA_INI: this.hora_ini_func, HORA_FIM: this.hora_fim_func,
      FUNC: this.funcionario, REF: refs
    }];



    this.loading_func = true;
    this.cars1_func = [];
    this.dados_func = [];


    this.PEDIDOSPRODUCAOService.getRejeicoesFUNCREF(data).subscribe(
      response => {
        var count = Object.keys(response).length;


        if (count > 0) {

          for (var x in response) {
            this.cars1_func.push({
              id: parseInt(x) + 1, brand: response[x][0] + ' - ' + response[x][1], proref: response[x][0],
              fase: response[x][2], total: response[x][3], defeito: (response[x][4] == null) ? 0.00 : response[x][4],
              tempo: response[x][5], cadencia: (response[x][7] == null) ? 0.00 : response[x][7],
              percdefeito: (response[x][6] == null) ? 0.00 : response[x][6], atualiza: false, iconplus: true, child: []
            })
          }
          this.assignCopy_func()
        }
        this.loading_func = false;

      }, error => {
        console.log(error);
        this.loading_func = false;
      });

  }

  assignCopy_func() {
    this.filteredItems_func = Object.assign([], this.cars1_func);
    this.dados_func = this.filteredItems_func;

  }

  filterItem_func(value) {
    if (!value) {
      this.assignCopy_func();

    } else {

    }
    this.filteredItems_func = Object.assign([], this.cars1_func).filter(
      item => item.brand.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.dados_func = this.filteredItems_func;

    //console.log(this.filteredItems);
  }


  getfunc(id) {
    this.cars1_func.find(item => item.id == id).iconplus = !this.cars1_func.find(item => item.id == id).iconplus;
    var PROREF = this.cars1_func.find(item => item.id == id).proref;

    var data = [{
      AREA_PECA: this.area_peca2, DATA_INI: this.formatDate(this.data_ini_func), DATA_FIM: this.formatDate(this.data_fim_func),
      HORA_INI: this.hora_ini_func, HORA_FIM: this.hora_fim_func,
      REF: PROREF, FUNC: this.funcionario
    }];
    if (this.cars1_func.find(item => item.id == id).child.length == 0 && !this.cars1_func.find(item => item.id == id).atualiza) {
      this.cars1_func.find(item => item.id == id).iconplus = true;
      this.cars1_func.find(item => item.id == id).atualiza = true;
      this.PEDIDOSPRODUCAOService.getRejeicoesFUNC(data).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            for (var x in response) {
              this.cars1_func.find(item => item.id == id).child.push({
                id: parseInt(x) + 1, brand: response[x][0] + ' - ' + response[x][1],
                defeito: (response[x][6] == null) ? 0.00 : response[x][6], func: response[x][0], quantidade: response[x][5],
                cadencia: (response[x][9] == null) ? 0.00 : response[x][9], tempo: response[x][7], numero: response[x][10],
                percdefeito: (response[x][8] == null) ? 0.00 : response[x][8], atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("referenciafunc" + id).classList.remove("collapsed");
              document.getElementById("collapsereffunc" + id).classList.remove("collapse");
              document.getElementById("collapsereffunc" + id).style.height = "auto";
              this.cars1_func.find(item => item.id == id).iconplus = false;
            }, 50);
          } else {
            this.cars1_func.find(item => item.id == id).iconplus = true;
          }
          this.cars1_func.find(item => item.id == id).atualiza = false;
        }, error => {
          this.cars1_func.find(item => item.id == id).atualiza = false;
        });
    }
  }

  getfam(ref, func) {

    var index = this.cars1_func.findIndex(item => item.id == ref);


    this.cars1_func[index].child.find(item => item.id == func).iconplus = !this.cars1_func[index].child.find(item => item.id == func).iconplus;
    var PROREF = this.cars1_func.find(item => item.id == ref).proref;
    var FUNC = this.cars1_func[index].child.find(item => item.id == func).func;
    var data = [{
      AREA_PECA: this.area_peca2, DATA_INI: this.formatDate(this.data_ini_func), DATA_FIM: this.formatDate(this.data_fim_func),
      HORA_INI: this.hora_ini_func, HORA_FIM: this.hora_fim_func,
      FUNC: FUNC, REF: PROREF
    }];

    if (this.cars1_func[index].child.find(item => item.id == func).child.length == 0 && !this.cars1_func[index].child.find(item => item.id == func).atualiza) {
      this.cars1_func[index].child.find(item => item.id == func).iconplus = true;
      this.cars1_func[index].child.find(item => item.id == func).atualiza = true;
      this.PEDIDOSPRODUCAOService.getRejeicoesFUNCFAM(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {
              this.cars1_func[index].child.find(item => item.id == func).child.push({
                id: parseInt(x) + 1, brand: response[x][5] + ' - ' + response[x][6], quantidade: response[x][7],
                defeito: response[x][8], fam: response[x][5], func: response[x][0],
                percdefeito: response[x][9], atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsefunc" + ref + func).classList.remove("collapsed");
              document.getElementById("collapsefamfunc" + ref + func).classList.remove("collapse");
              document.getElementById("collapsefamfunc" + ref + func).style.height = "auto";
              this.cars1_func[index].child.find(item => item.id == func).iconplus = false;
            }, 50);
          } else {
            this.cars1_func[index].child.find(item => item.id == func).iconplus = true;
          }
          this.cars1_func[index].child.find(item => item.id == func).atualiza = false;
        }, error => {
          this.cars1_func[index].child.find(item => item.id == func).atualiza = false;
        });
    }
  }


  getdef(ref, func, fam) {
    var index = this.cars1_func.findIndex(item => item.id == ref);
    var index2 = this.cars1_func[index].child.findIndex(item => item.id == func);

    this.cars1_func[index].child[index2].child.find(item => item.id == fam).iconplus = !this.cars1_func[index].child[index2].child.find(item => item.id == fam).iconplus;


    var PROREF = this.cars1_func.find(item => item.id == ref).proref;

    var FAM = this.cars1_func[index].child[index2].child.find(item => item.id == fam).fam;
    var FUNC = this.cars1_func[index].child[index2].child.find(item => item.id == fam).func;

    var data = [{
      AREA_PECA: this.area_peca2, DATA_INI: this.formatDate(this.data_ini_func), DATA_FIM: this.formatDate(this.data_fim_func),
      HORA_INI: this.hora_ini_func, HORA_FIM: this.hora_fim_func, FUNC: FUNC, REF: PROREF, FAM: FAM
    }];
    if (this.cars1_func[index].child[index2].child.find(item => item.id == fam).child.length == 0 && !this.cars1_func[index].child[index2].child.find(item => item.id == fam).atualiza) {
      this.cars1_func[index].child[index2].child.find(item => item.id == fam).iconplus = true;
      this.cars1_func[index].child[index2].child.find(item => item.id == fam).atualiza = true;

      this.PEDIDOSPRODUCAOService.getRejeicoesFUNCDEF(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          //console.log(response)
          if (count > 0) {

            for (var x in response) {
              this.cars1_func[index].child[index2].child.find(item => item.id == fam).child.push({
                id: parseInt(x) + 1, brand: response[x][7] + ' - ' + response[x][8],
                defeito: response[x][10], quantidade: response[x][9],
                percdefeito: response[x][11], atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsedef" + ref + func + fam).classList.remove("collapsed");
              document.getElementById("collapselote" + ref + func + fam).classList.remove("collapse");
              document.getElementById("collapselote" + ref + func + fam).style.height = "auto";
              this.cars1_func[index].child[index2].child.find(item => item.id == fam).iconplus = false;

            }, 50);
          } else {
            this.cars1_func[index].child[index2].child.find(item => item.id == fam).iconplus = true;
          }
          this.cars1_func[index].child[index2].child.find(item => item.id == fam).atualiza = false;
        }, error => {
          this.cars1_func[index].child[index2].child.find(item => item.id == fam).atualiza = false;
        });
    }
  }

  /*****************DASH*************** */
  atualizar_dash() {
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
        this.data_dash = this.data1[0];
      } else {
        this.carregagraf1();
      }
    } else if (graf == 2) {
      if (this.data2.length > 0) {
        this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
        this.graf = "graf1";
        this.myInnerHeight = (this.data2[0].datasets[0].data.length * 25);
        this.data_dash = this.data2[0];
      } else {
        this.carregagraf2();
      }
    }
  }

  onDataSelect(event) {
    /*console.log(this.data.labels[event.element._index])

    console.log(this.data.datasets[event.element._index].data[event.element._index])*/

    if (this.graf == "graf") {
      if (this.defeito != this.data_dash.cod[event.element._index] || this.data2.length == 0) {
        this.defeito = this.data_dash.cod[event.element._index];
        this.defeitodesc = this.data_dash.labels[event.element._index];
        this.carregagraf2();
      } else {
        this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
        this.graf = "graf1";
        this.myInnerHeight = (this.data2[0].datasets[0].data.length * 25);
        this.data_dash = this.data2[0];
      }
    } else if (this.graf == "graf1") {
      if (this.referencia_dash != this.data_dash.labels[event.element._index] || this.data3.length == 0) {
        this.referencia_dash = this.data_dash.labels[event.element._index];
        this.referenciadesc = this.data_dash.labels[event.element._index];

        this.carregagraf3();
      } else {
        this.graf = "graf2";
        this.options.title.text = 'Análise de Rejeições por Lote ( ' + this.referenciadesc + ' )';
        this.myInnerHeight = (this.data3[0].datasets[0].data.length * 25);
        this.data_dash = this.data3[0];
      }
    }
  }

  carregagraf1() {
    this.loading_dash = true;
    this.options.title.text = 'Análise de Rejeições por Tipo de Defeito';
    this.data_dash = [];
    this.myInnerHeight = 0;
    this.graf = "graf";

    this.defeito = null;
    this.defeitodesc = null;
    this.referencia_dash = null;
    this.referenciadesc = null;

    var data = [{
      AREA_PECA: this.area_peca_dash, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha_dash != null) ? this.linha_dash.toString() : null
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
          this.data_dash = this.data1[0];
        }
        this.loading_dash = false;
      }, error => {
        this.loading_dash = false;
      });
  }

  carregagraf2() {
    this.loading_dash = true;

    this.options.title.text = 'Análise de Rejeições por Referência ( ' + this.defeitodesc + ' )';
    this.data_dash = [];
    this.myInnerHeight = 0;
    this.graf = "graf1";


    this.referencia_dash = null;
    this.referenciadesc = null;

    var data = [{
      AREA_PECA: this.area_peca_dash, DEFEITO: this.defeito, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha_dash != null) ? this.linha_dash.toString() : null
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
          this.data_dash = this.data2[0];
        }
        this.loading_dash = false;
      }, error => {
        this.loading_dash = false;
      });
  }

  carregagraf3() {
    this.loading_dash = true;

    this.graf = "graf2";
    this.options.title.text = 'Análise de Rejeições por Lote ( ' + this.referenciadesc + ' )';

    this.data_dash = [];
    this.myInnerHeight = 0;
    var data = [{
      AREA_PECA: this.area_peca_dash, REF: this.referencia_dash, DEFEITO: this.defeito, DATA_INI: this.formatDate(this.dataini), DATA_FIM: this.formatDate(this.datafim),
      HORA_INI: this.hora_ini1, HORA_FIM: this.hora_fim1,
      LINHA: (this.linha_dash != null) ? this.linha_dash.toString() : null
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
          this.data_dash = this.data3[0];
        }
        this.loading_dash = false;
      }, error => {
        this.loading_dash = false;
      });
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

    this.loading2_dash = true;
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
    if (this.objetivos_gerais_dash) objetivos_gerais = 3;
    var data = [{
      AREA_PECA: this.area_peca2_dash,
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
        this.loading2_dash = false;
      }, error => {
        this.loading2_dash = false;
      });
  }

  carregagraf2_2() {
    this.loading2_dash = true;
    this.options2.title.text = 'Análise de Rejeições por Família ( ' + this.referencia_2_desc + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf1";

    this.familia = null;
    this.familia_desc = null;
    this.defeito2 = null;
    this.defeitodesc2 = null;
    var data = [{
      AREA_PECA: this.area_peca2_dash,
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
        this.loading2_dash = false;
      }, error => {
        this.loading2_dash = false;
      });

  }

  carregagraf3_2() {
    this.loading2_dash = true;

    this.options2.title.text = 'Análise de Rejeições por Tipo de Defeito ( ' + this.familia_desc + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf2";

    this.defeito2 = null;
    this.defeitodesc2 = null;
    var data = [{
      AREA_PECA: this.area_peca2_dash, DATA_INI: this.formatDate(this.dataini2), DATA_FIM: this.formatDate(this.datafim2),
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
        this.loading2_dash = false;
      }, error => {
        this.loading2_dash = false;
      });
  }


  carregagraf4_2() {
    this.loading2_dash = true;

    this.options2.title.text = 'Análise de Rejeições por Lote ( ' + this.defeitodesc2 + ' )';
    this.data_2 = [];
    this.myInnerHeight2 = 0;
    this.graf_2 = "graf3";
    var data = [{
      AREA_PECA: this.area_peca2_dash,
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
        this.loading2_dash = false;
      }, error => {
        this.loading2_dash = false;
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



  /**** AUTO COMPLETE  */

  filterRef_func(event) {
    this.filteredreferencia_func = this.pesquisa(event.query);
  }



  filteronUnselect_func(event) {
    this.referencia_func = null;
  }

  filterSelect_func(event) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.referencia_func = event.value;
    } else {
      this.referencia_func = null;
    };
  }


  filterRef_ref_dash(event) {
    this.filteredreferencia_ref_dash = this.pesquisa(event.query);
  }

  filteronUnselect_ref_dash(event) {
    this.referencia_ref_dash = null;
  }

  filterSelect_ref_dash(event) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.referencia_ref_dash = event.value;
    } else {
      this.referencia_ref_dash = null;
    };
  }




  filterRef(event) {
    this.filteredreferencia = this.pesquisa(event.query);
  }



  pesquisa(text) {
    var result = [];
    for (var x in this.referencias) {
      let ref = this.referencias[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.referencias[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    const index = this.referencia.indexOf(event.value);
    if (index > -1) {
      this.referencia.splice(index, 1);
    }
  }

  filterSelect(event) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.referencia.push(event.value);
    } else {
      //this.referencia_func = null;
    };
  }



  filterRef_tab6(event) {
    this.filteredreferencia_tab6 = this.pesquisa(event.query);
  }



  filteronUnselect_tab6(event) {
    this.referencia_tab6 = null;
  }

  filterSelect_tab6(event) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.referencia_tab6 = event.value;
    } else {
      this.referencia_tab6 = null;
    };
  }
  carregagraf_tab6() {
    this.loading_tab6 = true;
    this.options.title.text = 'Evolução de Defeito por Referência';
    this.data_tab6 = [];
    this.myInnerHeight6 = 0;

    var data1 = [];

    //hora_ini_tab6

    //hora_fim_tab6
    var data = [{
      DATA_INI: this.formatDate(this.data_ini_tab6), DATA_FIM: this.formatDate(this.data_fim_tab6),
      REF: this.referencia_tab6, DEFEITO: this.defeito_tab6,

    }];
    //QUERY_REJEICOES
    this.PEDIDOSPRODUCAOService.getEvolucaoDefeitoRef(data).subscribe(
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
            desc.push(response[x][0] + ' ( ' + response[x][1] + ' - ' + response[x][6] + ' )');
            datagraf.push(response[x][3]);

            produz.push(response[x][4]);
            defeit.push(response[x][5]);
          }


          data1 = [{
            cod: cod,
            labels: labels,
            desc: desc,
            produz: produz,
            defeit: defeit,
            datasets: [
              {
                label: 'Defeito',
                //backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, yAxisID: 'A',
              },/* {
                label: 'Defeito',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: datagraf, xAxisID: '2',
              }*/
            ]
          }];
          this.myInnerHeight6 = 250;//(data1[0].datasets[0].data.length * 25);
          this.data_tab6 = data1[0];
        }
        this.loading_tab6 = false;
      }, error => {
        this.loading_tab6 = false;
      });
  }


  abrirdialog_refs_dashboard() {
    this.atualizatabelarefs();
    this.display_dialog = true;

  }

  atualizatabelarefs() {
    if (this.data_dialog instanceof Date) {
      this.tabela_refs = [];

      this.GERREFERENCIASFASTRESPONSEREJEICOESService.getByData([{ DATA: this.formatDate(this.data_dialog) }]).subscribe(
        response => {

          this.tabela_refs = [];
          for (var x in response) {
            this.tabela_refs.push({ id: response[x].id, referencia: response[x].referencia, descricao: response[x].descricao });
          }
          this.tabela_refs = this.tabela_refs.slice();
          this.assignCopy2();
        },
        error => console.log(error));
    }

  }


  add_ref_dash() {
    if (this.campo_ref_dash) {
      var referencia = new GER_REFERENCIAS_FASTRESPONSE_REJEICOES;
      referencia.descricao = this.campo_ref_dash.descricao;
      referencia.referencia = this.campo_ref_dash.value;
      referencia.data_CRIA = new Date();
      referencia.utz_CRIA = this.user;
      referencia.data = this.data_dialog;
      if (!this.tabela_refs.find(item => item.referencia == referencia.referencia)) {
        this.save_ref_dash(referencia);
      } else {
        this.errovalida = "Referência já existe para este dia!";
        if (this.display_dialog) {
          this.display_dialog_true = true;
          this.display_dialog = false;
        }
        this.displayvalidacao = true;
      }

      this.campo_ref_dash = null;
      this.referencia_ref_dash = null;
    }

  }

  save_ref_dash(referencia, add = true) {
    this.GERREFERENCIASFASTRESPONSEREJEICOESService.create(referencia).then(result => {
      if (add) {
        this.tabela_refs.push({ id: result.id, referencia: referencia.referencia, descricao: referencia.descricao });
        this.tabela_refs = this.tabela_refs.slice();
        this.assignCopy2();
      }
    }, error => {
      console.log(error); /*this.simular(this.inputerro);*/
    });
  }

  eliminar_ref_dash(id) {
    //var index = this.tabela_refs
    this.GERREFERENCIASFASTRESPONSEREJEICOESService.delete(id).then(result => {
      var index = this.tabela_refs.findIndex(item => item.id == id);
      if (index > -1) {
        this.tabela_refs.splice(index, 1);
        this.assignCopy2();
      }
    }, error => {
      console.log(error); /*this.simular(this.inputerro);*/
    });

  }

  save_refs(save) {
    if (save) {
      console.log(this.refs_selected)
      this.GERREFERENCIASFASTRESPONSEREJEICOESService.getByData([{ DATA: this.formatDate(this.data_dialog2) }]).subscribe(
        response => {

          for (var x in this.refs_selected) {
            var referencia = new GER_REFERENCIAS_FASTRESPONSE_REJEICOES;
            referencia.descricao = this.refs_selected[x].desc_proref;
            referencia.referencia = this.refs_selected[x].proref;
            referencia.data_CRIA = new Date();
            referencia.utz_CRIA = this.user;
            referencia.data = this.data_dialog2;
            if (!response.find(item => item.referencia == referencia.referencia)) this.save_ref_dash(referencia, false);
          }
          this.display_dialog2 = false;
        },
        error => { console.log(error); this.display_dialog2 = false; });
    } else {
      this.display_dialog2 = true;
    }
  }


  selecttable() {
    if (this.select_table) {
      /*for (var x in this.dados) {
        this.refs_selected.push(this.dados[x])
      }*/
      this.refs_selected = this.dados;
    } else {
      this.refs_selected = [];
    }
  }


  assignCopy2() {
    this.filteredItems2 = Object.assign([], this.tabela_refs);
    this.tabela_refs_data = this.filteredItems2;

  }

  filterItem2(value) {
    if (!value) {
      this.assignCopy2();

    } else {

    }
    this.filteredItems2 = Object.assign([], this.tabela_refs).filter(
      item => item.referencia.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.tabela_refs_data = this.filteredItems2;

    //console.log(this.filteredItems);
  }

  onHide() {
    if (this.display_dialog_true) {
      this.display_dialog_true = false;
      this.display_dialog = true;
    }
  }
}
