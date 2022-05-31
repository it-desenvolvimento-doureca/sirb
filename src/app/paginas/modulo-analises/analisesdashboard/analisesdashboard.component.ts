import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { DASHBOARDANALISESService } from 'app/servicos/dashboard-analises.service';
import { FINANALISEDIVIDASService } from 'app/servicos/fin-analise-dividas.service';
import { FINSEGUIMENTOFATURACAOANUALService } from 'app/servicos/fin-seguimento-faturacao-anual.service';
import { GERREFERENCIASFASTRESPONSEREJEICOESService } from 'app/servicos/ger-referencias-fastresponse-rejeicoes.service';
import { PAMOVCABService } from 'app/servicos/pa-mov-cab.service';
import { PAMOVLINHAService } from 'app/servicos/pa-mov-linha.service';
import { PEDIDOSPRODUCAOService } from 'app/servicos/pedidosproducao.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-analisesdashboard',
  templateUrl: './analisesdashboard.component.html',
  styleUrls: ['./analisesdashboard.component.css']
})
export class AnalisesdashboardComponent implements OnInit {
  estados = [{ label: "Sel. Estado", value: null }, { label: "Em Elaboração", value: "Em Elaboração" }, { label: "Em Execução", value: "Em Execução" }, { label: "Em Alteração", value: "Em Alteração" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvido/Realizado", value: "Desenvolvido/ Realizado" }, { label: "Controlado/Verificado", value: "Controlado/ Verificado" },
  { label: "Aprovado/Finalizado", value: "Aprovado/ Finalizado" }, { value: "Rejeitado", label: "Rejeitado" }, { value: "Cancelado", label: "Cancelado" }, { value: "Anulado", label: "Anulado" }];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  totalprazopag = 0;
  average_due = 0;
  total_dev = 0;
  totalprazoatraso = 0;
  totaldivida = 0;
  totaldividavenc = 0;
  totalnaovencido = 0;
  total31dias = 0;
  total3160dias = 0;
  total6190dias = 0;
  total91dias = 0;
  totalacordo = 0;
  area_peca = 0;
  valor_vendas = 0;
  data_filtro;
  mes_absentismo: any = "--";
  dia_absentismo: any = "--";
  locais = [];
  data_formatada: string;
  mes;
  ano;
  objetivo_injecao_menor;
  objetivo_injecao_maior;
  tipo20_linha33: number;
  tipo21_linha33: number;
  tipo22_linha33: number;
  tipo23_linha33: number;
  tipo24_linha33: number;
  tipo10_linha33: number;
  tipo11_linha33: number;
  tipo12_linha33: number;
  tipo13_linha33: number;
  tipo14_linha33: number;
  tipo0_linha33: number;
  tipo1_linha33: number;
  tipo2_linha33: number;
  tipo3_linha33: number;
  tipo4_linha33: number;
  tipo20_linha1_area: any;
  tipo10_linha2_area: any;
  tipo20_linha33_area: number;
  tipo21_linha33_area: number;
  tipo22_linha33_area: number;
  tipo23_linha33_area: number;
  tipo24_linha33_area: number;
  tipo10_linha33_area: number;
  tipo11_linha33_area: number;
  tipo12_linha33_area: number;
  tipo13_linha33_area: number;
  tipo14_linha33_area: number;
  tipo0_linha33_area: number;
  tipo1_linha33_area: number;
  tipo2_linha33_area: number;
  tipo3_linha33_area: number;
  tipo4_linha33_area: number;

  tipo0_linha1_area: number;
  tipo1_linha1_area: number;
  tipo2_linha1_area: number;
  tipo3_linha1_area: number;
  tipo4_linha1_area: number;
  tipo0_linha2_area: number;
  tipo1_linha2_area: number;
  tipo2_linha2_area: number;
  tipo3_linha2_area: number;
  tipo4_linha2_area: number;
  tipo10_linha1_area: number;
  tipo11_linha1_area: number;
  tipo12_linha1_area: number;
  tipo13_linha1_area: number;
  tipo14_linha1_area: number;
  tipo11_linha2_area: number;
  tipo12_linha2_area: number;
  tipo13_linha2_area: number;
  tipo14_linha2_area: number;
  tipo21_linha1_area: number;
  tipo22_linha1_area: number;
  tipo23_linha1_area: number;
  tipo24_linha1_area: number;
  tipo20_linha2_area: number;
  tipo21_linha2_area: number;
  tipo22_linha2_area: number;
  tipo23_linha2_area: number;
  tipo24_linha2_area: number;

  display_lista_rejeicoes;
  dados_analise = [];
  loading;

  amostras = [];
  reclamacoesFornecedores = [];
  reclamacoesclientes = [];
  dados_indice_comprimento = [];

  data_CumprimentoPlanos_semana1 = {};
  data_CumprimentoPlanos_semana2 = {};
  data_CumprimentoObjetivos = {};
  data_VariacaoStock = {};
  data_ValoresEmDivida = {};
  data_Rejeicoes = {};
  options_CumprimentoPlanos_semana1 = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Barras Planeadas/Executadas (Semana x -1/2022)',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".");
        }
      },
    },
    animation: {
      onComplete: drawBarValues
    },
    hover: { animationDuration: 0 },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") },
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
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
    },
  };

  options_CumprimentoPlanos_semana2 = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Barras Planeadas/Executadas (Semana x/2022)',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".");
        }
      },
    },
    animation: {
      onComplete: drawBarValues
    },
    hover: { animationDuration: 0 },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") },
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
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
    },
  };

  options_CumprimentoObjetivos = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Cumprimento dos objetivos de Vendas',
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

        }, afterBody: function (tooltipItem, data) {

          var datasetIndex = tooltipItem[0].datasetIndex;
          var index = tooltipItem[0].index;
          var data = data.datasets[datasetIndex];
          var multistringText = [''];
          multistringText.push('Valor ' + data.ano + ': ' + formatMoney(data.ano1[index], 2, ",", ".") + ' €');
          multistringText.push('Valor ' + (data.ano - 1) + ': ' + formatMoney(data.ano2[index], 2, ",", ".") + ' €');
          multistringText.push('Variação: ' + formatMoney(data.valor[index], 2, ",", ".") + ' €');
          return multistringText;
        }
      },
    },
    animation: {
      onComplete: drawBarValuesPercentage
    },
    hover: { animationDuration: 0 },
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
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
    },
  };

  options_VariacaoStock = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Variação do Stock',
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

          var datasetIndex = tooltipItem[0].datasetIndex;
          var index = tooltipItem[0].index;
          var data = data.datasets[datasetIndex];
          var multistringText = [''];
          multistringText.push('Realização: ' + formatMoney(data.realizado[index], 2, ",", ".") + ' %');
          multistringText.push('Desvio: ' + formatMoney(data.desvio[index], 2, ",", ".") + ' €');
          return multistringText;
        }
      },
    },
    animation: {
      onComplete: drawBarValuesMoney
    },
    hover: { animationDuration: 0 },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
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
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
    },
  };


  options_ValoresEmDivida = {
    layout: {
      padding: 0
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'Valor Vendas',
      fontSize: 16
    },
    legend: {
      position: 'bottom',
      display: true,
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
    /*animation: {
      onComplete: drawBarValues('€')
    },*/
    hover: { animationDuration: 0 },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") + "€" },
          label: 'label',
          beginAtZero: false,
          display: false,
        }, scaleLabel: {
          display: false,
        },
        gridLines: {
          display: false, drawBorder: false
        }
      }],
      xAxes: [{
        ticks: {
          label: '',
          beginAtZero: true,
          autoSkip: false,
        }, scaleLabel: {
          display: true,
        }, afterFit: (axis) => {
          axis.paddingRight = 0;
          axis.paddingBottom = 0;
        }, gridLines: {
          display: false,
        },
      }],
    },
  };

  options_Rejeicoes = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: '% Rejeições Globais de Cromagem',
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
            + formatMoney(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index], 2, ",", ".");
        }
      },
    },
    animation: {
      onComplete: drawBarValues
    },
    hover: { animationDuration: 0 },
    scales: {

      yAxes: [{
        ticks: {
          callback: function (value) { return formatMoney(value, 2, ",", ".") },
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
        }, afterFit: (axis) => {
          axis.paddingRight = 50;
        },
      }],
    },
  };

  dados = [];
  lista_expand: any[] = [];
  data: any;
  data_ini: any;
  data_fim: any;
  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  ano_absentismo: number;
  visitas = [];
  objetivo_cromagem_menor: any;
  objetivo_cromagem_maior: any;
  objetivo_rejeicao_global: any;
  cars1: any[];
  ref_rejeicao: string;
  filteredItems: any[];
  hora_ini: string;
  hora_fim: string;
  anos = [];
  semanas = [];
  semana: any;
  departamentos = [];
  funcionarios_ativos = 0;
  funcionarios_saobento = 0;
  funcionarios_formariz = 0;
  funcionarios_faltar = 0;
  caraacidentes: boolean;
  total_acidentes: number;
  id_tarefa_input: any;
  displayTarefa: boolean;
  yearTimeout: any;
  user: any;
  linhas: any[];
  acoes_em_ATRASO = true;
  data_rejeicoes: any;

  constructor(private PAMOVCABService: PAMOVCABService, private DASHBOARDANALISESService: DASHBOARDANALISESService,
    private PEDIDOSPRODUCAOService: PEDIDOSPRODUCAOService,
    private FINANALISEDIVIDASService: FINANALISEDIVIDASService,
    private FINSEGUIMENTOFATURACAOANUALService: FINSEGUIMENTOFATURACAOANUALService,
    private PAMOVLINHAService: PAMOVLINHAService,
    private router: Router,
    private ABDICLINHAService: ABDICLINHAService,
    private GERREFERENCIASFASTRESPONSEREJEICOESService: GERREFERENCIASFASTRESPONSEREJEICOESService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var data = new Date()
    this.data = this.formatDate(data);
    this.data_rejeicoes = this.data;
    this.data_formatada = this.formatDate(data);
    this.data_filtro = this.formatDate(data);
    var d = new Date(this.data);
    this.mes = this.meses[d.getMonth()];
    this.ano = d.getFullYear();
    this.hora_ini = "06:01";
    this.hora_fim = "06:00";

    this.data_ini = this.formatDate(d);
    d.setDate(d.getDate() + 1);
    this.data_fim = this.formatDate(d);



    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var y = 1; y <= 53; y++) {
      this.semanas.push({ value: y, label: y })
    }

    this.semana = this.getWeek(new Date()) /*+ 1*/;
    var dados = [{ DATA: this.formatDate(new Date()) }];
    //var dados = [{ DATA: this.formatDate('2019-02-06') }];

    this.DASHBOARDANALISESService.getDATA_DIA(dados).subscribe(
      response => {
        this.data_rejeicoes = this.formatDate(response[0][0]);
        this.limpar_dados();
        this.carregaLinhas();
        this.atualizar();


      }, error => {
        console.log(error);
        this.limpar_dados();
        this.carregaLinhas();
        this.atualizar();


      });


  }

  carregaLinhas() {
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
  }

  randomcolor(i) {
    var cores = ["pink", "", "yellow-b", "orange", "blue-b", "red-b", "purple-b", "gray-b", "red-c", "blue-c", "pink", "blue-b", "yellow-b"];
    return cores[i];
  }
  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }


  atualizar() {


    this.carregaAbsentismo();

    this.carregaRejeicoes_area();
    this.getVisitas();
    this.carregaRecursosHumanos();
    this.carregaAmostras();
    this.carregaReclamacoesFornecedores();
    this.carregaReclamacoesClientes();
    this.carregaref();
    this.carregarlista('T');
    this.carregaacidentes();
    this.carregalinhas();
    this.carregaGraficoPLaneadas();
    this.carregaDadosFinanceira();
  }

  atualizaPlanos(event) {
    this.carregarlista('T');
  }

  carregarlista(tipo) {
    this.dados = [];
    this.lista_expand = [];

    var filtros = [{ FASTRESPONSE: false, EM_ATRASO: this.acoes_em_ATRASO, USER: this.user }];
    this.PAMOVCABService.getPA_MOV_CABbyTIPOSEGUIR(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.adicionar_linhas(response, x);
          }

          this.dados = this.dados.slice();

        }
      }, error => { console.log(error); });

  }

  adicionar_linhas(response, x) {
    var linha = this.dados.find(item => item.id == response[x][0]);
    var cor = "";
    var corlinha = "";
    var cor_letra = "";
    var cor_letra_linha = "";
    var data = this.formatDate(new Date());

    if (response[x][2] != null) {
      if (new Date(response[x][2]).getTime() < new Date(data).getTime()) {
        cor = "red";
        cor_letra = "white";
      } else if (new Date(response[x][2]).getTime() == new Date(data).getTime()) {
        cor = "yellow";
      }
    }

    if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
      corlinha = "red";
      cor_letra_linha = "white";
    } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
      corlinha = "yellow";
    }

    if (response[x][13] != "E" && response[x][13] != "P" && response[x][13] != null) { corlinha = ""; cor_letra_linha = ""; }
    if (response[x][7] != "E" && response[x][7] != "P" && response[x][7] != null) { cor = ""; cor_letra = ""; }

    if (linha) {
      linha.filho.push({
        corlinha: corlinha, cor_letra_linha: cor_letra_linha,
        data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10], seguir_LINHA: response[x][22], id_PLANO_LINHA: response[x][23]
        , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13]), id_TAREFA: response[x][17]
      });
    } else {
      this.dados.push({
        id: response[x][0], cor: cor, cor_letra: cor_letra,
        data_registo: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
        data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
        /*linha: response[x][0].id_LINHA, designacao: response[x][0].design_REFERENCIA, referencia: response[x][0].referencia, departamento_origem: response[x][2],*/
        descricao: response[x][6],
        ambito: response[x][15]/*this.getAmbito(response[x][3])*/, origem: response[x][4],
        estado: this.getestado(response[x][7]), //cor: response[x][1],
        utilizador: response[x][5],
        filho: [{
          corlinha: corlinha, cor_letra_linha: cor_letra_linha,
          data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10], seguir_LINHA: response[x][22], id_PLANO_LINHA: response[x][23], id_TAREFA: response[x][17]
          , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
        }]
      });
    }
  }


  carregaReclamacoesClientes() {

    this.reclamacoesclientes = [];
    var dados = [{ DATA: this.formatDate(this.data) }];

    this.DASHBOARDANALISESService.getDASHBOARD_RECLAMACOES_CLIENTES(dados).subscribe(
      response => {
        this.reclamacoesclientes = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            if (response[x][0] == 'acumulado') {

            } else if (response[x][0] == 'tabela') {
              if (parseInt(x) < 5) {
                this.reclamacoesclientes.push({
                  codigo: response[x][4], referencia: response[x][5], tipo: response[x][6],
                  data: this.formatDate(response[x][7]), revista_muro: response[x][13]
                  , cliente: response[x][14]
                });
              }
            }
          }
          this.reclamacoesclientes = this.reclamacoesclientes.slice();


          //this.loadingReclamacoesClientes = true;
        } else {
          //this.loadingReclamacoesClientes = true;
        }
      }, error => {
        //this.loadingReclamacoesClientes = true;
        console.log(error)
      });

  }
  carregaReclamacoesFornecedores() {

    this.reclamacoesFornecedores = [];
    var dados = [{ DATA: this.formatDate(this.data) }];

    this.DASHBOARDANALISESService.getDASHBOARD_RECLAMACOES_FORNECEDORES(dados).subscribe(
      response => {
        this.reclamacoesFornecedores = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            if (response[x][0] == 'acumulado') {


            } else if (response[x][0] == 'tabela') {
              var data = this.formatDate(new Date());
              if (parseInt(x) < 5) {
                this.reclamacoesFornecedores.push({
                  codigo: response[x][3], referencia: response[x][4], tipo: response[x][5],
                  data: this.formatDate(response[x][6]), fornecedor: response[x][10],
                });
              }
            }
          }
          this.reclamacoesFornecedores = this.reclamacoesFornecedores.slice();


          //this.loadingReclamacoesFornecedores = true;
        } else {
          //this.loadingReclamacoesFornecedores = true;
        }
      }, error => {
        // this.loadingReclamacoesFornecedores = true;
        console.log(error)
      });

  }

  carregaAmostras() {
    this.amostras = [];
    var dados = [{ LOCAL: "1" }];
    this.DASHBOARDANALISESService.getDASHBOARD_AMOSTRAS(dados).subscribe(
      response => {
        this.amostras = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            if (this.amostras.find(item => item.id_amostra == response[x][13])) {
              var amostra = this.amostras.find(item => item.id_amostra == response[x][13]);
              amostra.acao.push(response[x][8]);
              amostra.responsavel.push(response[x][9]);
            } else {
              this.amostras.push({
                id_amostra: response[x][13],
                data: this.formatDate(response[x][0]), linha: response[x][1], cor_linha: response[x][2],
                cod_ref: response[x][3], descricao_ref: response[x][4], tipo: response[x][5], indice: response[x][6], num_barras: response[x][7],
                acao: [response[x][8]], responsavel: [response[x][9]], data_lacamento: this.formatDate(response[x][10]), estado: this.getestadoamostras(response[x][11]), cor_estado: response[x][12]
              });
            }

          }
          this.amostras = this.amostras.slice();
          //this.loadingAmostras = true;
        } else {
          //this.loadingAmostras = true;
        }
      }, error => {
        //this.loadingAmostras = true;
        console.log(error)
      });

  }


  getestadoamostras(valor) {
    if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/Realizado"
    } else if (valor == "V") {
      return "Aprovado/Fechado"
    } else if (valor == "C") {
      return "Controlado/Verificado"
    } else if (valor == "A") {
      //return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    } else {
      return valor
    }
  }


  carregaAbsentismo() {

    var dados = [{ DATA: this.formatDate(this.data), TIPO: 'NOVO', LOCAL: 1, COD_TURNO: null, COD_SECTOR: null }];
    var month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var objetivo = 0;
    this.DASHBOARDANALISESService.getDASHBOARD_ABSENTISMO_TABELA(dados).subscribe(
      response => {
        this.locais = [];
        var local = [];

        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            if (response[x][1] == null) {
              local.push({
                local: response[x][8], operarios_trabalhar: response[x][3], operarios_total: response[x][4],
                valor_dia: response[x][5], valor_mes: response[x][6], valor_ano: response[x][7]
              });
            }
            this.mes_absentismo = month[response[x][10] - 1];
            this.dia_absentismo = this.formatDate(response[x][11]);
            this.ano_absentismo = new Date(response[x][11]).getFullYear();
            objetivo = response[x][12];

          }


          this.locais = local.slice();
          //this.loadingAbsentismo = true;

        } else {

        }

      }, error => { console.log(error); });

  }


  getVisitas() {
    this.visitas = [];
    this.DASHBOARDANALISESService.getVisitas(this.formatDate(this.data)).subscribe(
      response => {
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          var classes = ['alert-success', 'alert-warning', 'alert-info', 'alert-danger']
          for (var x in response) {
            let new_index = 0;
            if (parseInt(x) > 0) {
              let len = classes.length
              let distance = 1 % len
              new_index = (parseInt(x) + distance + len) % len
            }

            this.visitas.push({
              class: classes[new_index],
              VISITA: response[x].VISITA,
              DATA_INI: (response[x].DATA_INI == null) ? "" : this.formatDate_time(response[x].DATA_INI)/*.substring(0, 16)*/,
              DATA_FIM: (response[x].DATA_FIM == null) ? "" : this.formatDate_time(response[x].DATA_FIM)/*.substring(0, 16)*/
            });
          }
          this.visitas = this.visitas.slice();

          //this.loadingvisitas = true;
        } else {
          //this.loadingvisitas = true;
        }
      }, error => {
        // this.loadingvisitas = true;
        console.log(error)
      });

  }

  carregaRecursosHumanos() {

    var dados = [{ ANO: null, SEMANA: null }];
    this.DASHBOARDANALISESService.getDASHBOARD_RECURSOS_HUMANOS(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {

          for (var x in response) {
            let index = parseInt(x);
            if (index == 0) {
              this.funcionarios_ativos = response[x][5];
              this.funcionarios_saobento = response[x][4];
              this.funcionarios_formariz = response[x][3];
              this.funcionarios_faltar = response[x][6];
            }
            this.departamentos.push({ percentagem: response[x][2], cor: this.randomcolor(index), total: response[x][1], descricao: response[x][0] });
          }
          this.visitas = this.visitas.slice();

          //this.loadingvisitas = true;
        } else {
          //this.loadingvisitas = true;
        }
      }, error => {
        // this.loadingvisitas = true;
        console.log(error)
      });

  }

  carregaRejeicoes_area() {
    /*this.limpar_dados();
    this.loadingRejeicoes = true;*/
    this.limpar_dados();
    var serie1 = [];
    var serie2 = [];
    var serie3 = [];
    var serie2_b = [];
    var limite = [];

    var dados = [{ DATA: this.formatDate(this.data_rejeicoes) }];
    //this.rejeicao_area = [];
    var d = new Date(this.data_rejeicoes);
    d.setDate(d.getDate() - 15);

    this.DASHBOARDANALISESService.getDASHBOARD_REJEICOES_AREA2(dados).subscribe(
      response => {
        var data = [];
        //var dia = this.getDates(d, new Date(this.data));
        var taxa = 0;
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {

            if (response[x][0] == 0 || response[x][0] == 1 || response[x][0] == 2 || response[x][0] == 3 || response[x][0] == 4) {
              if (this.formatDate(this.data_rejeicoes) == this.formatDate(response[x][3])) this['tipo' + response[x][0] + '_linha' + response[x][7] + '_area'] = response[x][8];
            } else {
              this['tipo' + response[x][0] + '_linha' + response[x][7] + '_area'] = response[x][8];
            }

            if (response[x][0] < 5) if (!data.find(item => item == this.formatDate(response[x][3]))) {
              data.push(this.formatDate(response[x][3]));
              serie1.push(0);
              serie2.push(0);
              serie3.push(0);
            }
            var index = data.findIndex(item => item == this.formatDate(response[x][3]));
            if (response[x][0] == 0) {
              if (response[x][7] == 1) serie1[index] = (response[x][8]);
              if (response[x][7] == 2) serie2[index] = (response[x][8]);
              if (response[x][7] == 33) serie2_b[index] = (response[x][8]);
            } else if (response[x][0] == 1) {
              if (response[x][7] == 1) serie3[index] = (response[x][8]);

            } else if (response[x][0] == 2) {

            } else if (response[x][0] == 3) {

            } else if (response[x][0] == 4) {

            }

            this.objetivo_cromagem_menor = response[x][9];
            this.objetivo_cromagem_maior = response[x][10];
            this.objetivo_injecao_menor = response[x][11];
            this.objetivo_injecao_maior = response[x][12];
            this.objetivo_rejeicao_global = response[x][13];

          }



          //graf global
          serie1.unshift((this.tipo10_linha1_area == null) ? 0 : this.tipo10_linha1_area);
          serie2.unshift((this.tipo10_linha2_area == null) ? 0 : this.tipo10_linha2_area);
          serie2_b.unshift((this.tipo10_linha33_area == null) ? 0 : this.tipo10_linha33_area);
          serie1.unshift((this.tipo20_linha1_area == null) ? 0 : this.tipo20_linha1_area);
          serie2.unshift((this.tipo20_linha2_area == null) ? 0 : this.tipo20_linha2_area);
          serie2_b.unshift((this.tipo20_linha33_area == null) ? 0 : this.tipo20_linha33_area);



          var eixoX = [];
          eixoX.push(this.ano);
          eixoX.push(this.mes);
          limite.push(this.objetivo_rejeicao_global);
          limite.push(this.objetivo_rejeicao_global);

          for (var y in data) {
            eixoX.push(this.formatDate2(data[y]));
            limite.push(this.objetivo_rejeicao_global);
          }
          //eixoX.push("Data (" + this.formatDate2(this.data) + ")");


          this.carregaRejeicoesgraf_global_area(serie1, serie2, serie2_b, eixoX, limite);

          //this.loadingRejeicoes_area = true;

        } else {
          this.carregaRejeicoesgraf_global_area(serie1, serie3, serie3, data, limite);
          // this.loadingRejeicoes_area = true;
        }


      }, error => { console.log(error); /*this.loadingRejeicoes_area = true;*/ });
  }

  carregaRejeicoesgraf_global_area(serie1, serie2, serie2_b, dias, limite) {
    this.data_Rejeicoes = {
      labels: dias,
      datasets: [
        {
          type: 'line',
          label: 'Linha 1',
          data: serie1,
          borderColor: '#3166ff',
          backgroundColor: '#3166ff',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: 'Linha 2',
          data: serie2,
          borderColor: 'orange',
          backgroundColor: 'orange',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: 'Global',
          data: serie2_b,
          borderColor: 'black',
          backgroundColor: 'black',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: 'Objetivo',
          backgroundColor: 'green',
          borderColor: 'green',
          data: limite,
          fill: false,
          pointRadius: 0
        },
      ],
    };
  }

  carregaref() {
    this.loading = true;
    this.cars1 = [];
    this.dados_analise = [];
    var objetivos_gerais = 0;
    var refs = '';
    //this.ref_rejeicao = "34268060B"
    //if (this.referencia.length > 0) refs = this.referencia.toString();
    //if (this.objetivos_gerais) objetivos_gerais = 1;

    this.GERREFERENCIASFASTRESPONSEREJEICOESService.getByData([{ DATA: this.formatDate(this.data_filtro) }]).subscribe(
      response => {
        for (var y in response) {
          if (parseInt(y) == 0) {
            refs += response[y].referencia;
          } else {
            refs += ',' + response[y].referencia;
          }
        }

        this.ref_rejeicao = refs;

        var data = [{
          AREA_PECA: this.area_peca, DATA_INI: this.formatDate(this.data_ini),
          HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
          DATA_FIM: this.formatDate(this.data_fim), LINHA: null, REF: refs, objetivos_gerais: objetivos_gerais, FAM: null
        }];
        if (refs != '') {
          this.PEDIDOSPRODUCAOService.getRejeicoesRefe(data).subscribe(
            response => {
              var count = Object.keys(response).length;

              if (count > 0) {

                for (var x in response) {
                  this.cars1.push({
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
        } else {
          this.loading = false;
        }

      },
      error => { console.log(error); });
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.cars1);
    this.dados_analise = this.filteredItems;

  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['planosacao/view'], { queryParams: { id: event.data.id, redirect: "analisesdashboard" } });
  }

  listartudo() {
    if (this.lista_expand.length == 0) {
      this.lista_expand = this.dados;
    } else {
      this.lista_expand = [];
    }

  }

  carregaacidentes() {
    var dados = [{ DATA: this.formatDate(this.data) }];
    this.total_acidentes = 0;
    this.caraacidentes = false;
    this.DASHBOARDANALISESService.getDASHBOARD_OCORRENCIAS([]).subscribe(
      response => {
        //this.ocorrencias = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            /*this.ocorrencias.push({
              descricao: response[x][0],
              tipo_ocorrencia: response[x][1],
              data: this.formatDate(response[x][2]),
              departamento: response[x][3],
              funcao: response[x][4]
            });*/

            var data = new Date();
            data.setDate(data.getDate() - 1);
            var data_a = this.formatDate(data);
            var datahj = new Date();
            var data_hj = this.formatDate(datahj);

            /* if (new Date(this.formatDate(response[x][2])).getTime() == new Date(data_a).getTime() || new Date(this.formatDate(response[x][2])).getTime() == new Date(data_hj).getTime()) {
               this.caraacidentes = true;
               this.total_acidentes++;
             }*/
            this.total_acidentes++;
          }
          if (this.total_acidentes > 0) {
            this.caraacidentes = true;
          }
          //this.ocorrencias = this.ocorrencias.slice();
        }
        //this.loadingAcidentes = true;
      }, error => { console.log(error); /*this.loadingAcidentes = true;*/ });
  }

  carregalinhas() {
    this.dados_indice_comprimento = [];



    var dados = [{ ANO: this.ano, SEMANA: this.semana }];
    this.DASHBOARDANALISESService.getDASHBOARD_PLANEAMENTO(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          var dia_da_semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
          for (var x in response) {
            this.dados_indice_comprimento.push({
              DATA: this.formatDate(response[x][0]) + ' (' + dia_da_semana[new Date(response[x][0]).getDay()] + ')',
              CUMP_PLANOL1T1: response[x][1],
              CUMP_PLANOL1T2: response[x][2],
              CUMP_PLANOL1T3: response[x][3],
              CUMP_PLANOL2T1: response[x][4],
              CUMP_PLANOL2T2: response[x][5],
              CUMP_PLANOL2T3: response[x][6],
              OCUP_LINHAL1T1: response[x][7],
              OCUP_LINHAL1T2: response[x][8],
              OCUP_LINHAL1T3: response[x][9],
              OCUP_LINHAL2T1: response[x][10],
              OCUP_LINHAL2T2: response[x][11],
              OCUP_LINHAL2T3: response[x][12],
              OCUP_TOTALL1T1: response[x][13],
              OCUP_TOTALL1T2: response[x][14],
              OCUP_TOTALL1T3: response[x][15],
              OCUP_TOTALL2T1: response[x][16],
              OCUP_TOTALL2T2: response[x][17],
              OCUP_TOTALL2T3: response[x][18],

            });
          }



          this.dados_indice_comprimento = this.dados_indice_comprimento.slice();

          /* this.carregargraficos(this.dados_indice_comprimento, dados_dias, dados_dia_L1_C, dados_dia_L1_O, dados_dia_L1_OT,
             dados_dia_L2_C, dados_dia_L2_O, dados_dia_L2_OT, response[x][7], response[x][8], response[x][9], response[x][10]
           );*/

          //this.loadingProducao = true;
        } else {
          //this.loadingProducao = true;
          //this.carregargraficos([], [], [], [], null, null, null, null, 0, 0, 0, 0);
        }

      }, error => { console.log(error); /*this.loadingProducao = true;*/ });

  }

  carregaGraficoPLaneadas() {


    var labels = [''];
    var data1 = [0];
    var data2 = [0];

    var labels_1 = [''];
    var data1_1 = [0];
    var data2_1 = [0];
    var dados = [{ ANO: this.ano, SEMANA: this.semana }];

    var valor = 0;
    var valor1 = 1;

    this.DASHBOARDANALISESService.getDASHBOARD_PLANEAMENTO_GRAFICOS(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          var dia_da_semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
          for (var x in response) {

            if (response[x][0] == 1) {
              valor += (response[x][4] == null) ? 0 : response[x][4];
              labels.push(this.formatDate(response[x][1]) /*+ ' (' + dia_da_semana[new Date(response[x][0]).getDay()] + ')'*/);
              data1.push(response[x][5]);
              data2.push(valor);
            } else {
              valor1 += (response[x][4] == null) ? 0 : response[x][4];
              labels_1.push(this.formatDate(response[x][1]) /*+ ' (' + dia_da_semana[new Date(response[x][0]).getDay()] + ')'*/);
              data1_1.push(response[x][5]);
              data2_1.push(valor1);
            }

          }



          this.carregaGraficoPLaneadasSemana1_graf(labels, data1, data2);
          this.carregaGraficoPLaneadasSemana2_graf(labels_1, data1_1, data2_1);
          //this.loadingProducao = true;
        } else {
          //this.loadingProducao = true;
          this.carregaGraficoPLaneadasSemana1_graf(labels, data1, data2);
          this.carregaGraficoPLaneadasSemana2_graf(labels_1, data1_1, data2_1);
        }

      }, error => {
        console.log(error);
        this.carregaGraficoPLaneadasSemana1_graf(labels, data1, data2);
        this.carregaGraficoPLaneadasSemana2_graf(labels_1, data1_1, data2_1);
        /*this.loadingProducao = true;*/
      });


  }

  carregaGraficoPLaneadasSemana1_graf(labels, data1, data2) {
    this.options_CumprimentoPlanos_semana1.title.text = 'Barras Planeadas/Executadas (Semana ' + (this.semana - 1) + '/2022)';

    this.data_CumprimentoPlanos_semana1 = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Nº Barras Planeadas',
          data: data1,
          borderColor: '#ff6c60',
          backgroundColor: '#ff6c60',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: 'Nº Barras Executadas',
          backgroundColor: '#1fb5ac',
          borderColor: '#1fb5ac',
          data: data2,
          fill: false,
          pointRadius: 0
        },
      ],
    };
  }

  carregaGraficoPLaneadasSemana2_graf(labels, data1, data2) {
    this.options_CumprimentoPlanos_semana2.title.text = 'Barras Planeadas/Executadas (Semana ' + this.semana + '/2022)';

    this.data_CumprimentoPlanos_semana2 = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Nº Barras Planeadas',
          data: data1,
          borderColor: '#ff6c60',
          backgroundColor: '#ff6c60',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'line',
          label: 'Nº Barras Executadas',
          backgroundColor: '#1fb5ac',
          borderColor: '#1fb5ac',
          data: data2,
          fill: false,
          pointRadius: 0
        },
      ],
    };
  }

  carregaDadosFinanceira() {
    this.FINANALISEDIVIDASService.GET_DIVIDAS_LISTA([]).subscribe(
      response => {
        var count = Object.keys(response).length;

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



        }

        this.average_due = (count_average_due == 0) ? 0 : (average_due / count_average_due);



      },
      error => console.log(error));


    var dados = [{
      ANO: this.ano, PROREF: null, CLIENTES: null, ID_ANALISE: null,
      PROJETOS: null, VEICULOS: null, OEM: null
    }];
    var acumulado2 = 0;
    var acumulado1 = 0;
    var objetivo1, objetivo2 = 0;
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO(dados).subscribe(
      response => {

        for (var x in response) {
          if (response[x][2] == this.ano) {
            acumulado2 = response[x][3];
            this.valor_vendas = acumulado2;
            //this.ano2[response[x][1]] = response[x][0];
          } else {
            acumulado1 = response[x][3];
            //this.ano1[response[x][1]] = response[x][0];
          }

        }
        this.objetivoatual(acumulado1, acumulado2, objetivo1, objetivo2)
      }, error => {
        console.log(error);
        this.objetivoatual(acumulado1, acumulado2, objetivo1, objetivo2)
      });
  }
  objetivoatual(acumulado1, acumulado2, objetivo1, objetivo2) {
    var dados = [{
      ANO: this.ano, PROREF: null, CLIENTES: null, ID_ANALISE: null,
      PROJETOS: null, VEICULOS: null, OEM: null
    }];
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_BUDGET(dados).subscribe(
      response => {

        for (var x in response) {
          objetivo2 = response[x][3];
        }
        this.objetivoanoanterior(acumulado1, acumulado2, objetivo1, objetivo2)
      }, error => {
        console.log(error);
        this.objetivoanoanterior(acumulado1, acumulado2, objetivo1, objetivo2)
      });
  }

  objetivoanoanterior(acumulado1, acumulado2, objetivo1, objetivo2) {
    var dados = [{
      ANO: this.ano - 1, PROREF: null, CLIENTES: null, ID_ANALISE: null,
      PROJETOS: null, VEICULOS: null, OEM: null
    }];
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_BUDGET(dados).subscribe(
      response => {

        for (var x in response) {
          objetivo1 = response[x][3];
        }
        this.carregagraficosFinanceira(acumulado1, acumulado2, objetivo1, objetivo2);
        this.carregagraficosFinanceiraCumprimentoObjetivos();
        this.carregagraficosFinanceiraVariacaoStock();
      }, error => {
        console.log(error);
        this.carregagraficosFinanceira(acumulado1, acumulado2, objetivo1, objetivo2);
        this.carregagraficosFinanceiraCumprimentoObjetivos();
        this.carregagraficosFinanceiraVariacaoStock();
      });
  }

  carregagraficosFinanceira(acumulado1, acumulado2, objetivo1, objetivo2) {

    this.data_ValoresEmDivida = {
      labels: [this.ano - 1, this.ano],
      datasets: [
        {
          type: 'bar',
          label: 'Valor Venda',
          data: [acumulado1, acumulado2],
          borderColor: '#ff6c60',
          backgroundColor: '#ff6c60',
          fill: false,
          pointRadius: 0
        },
        {
          type: 'bar',
          label: 'Objetivo',
          backgroundColor: '#1fb5ac',
          borderColor: '#1fb5ac',
          data: [objetivo1, objetivo2],
          fill: false,
          pointRadius: 0
        },
      ],
    };
  }

  carregagraficosFinanceiraCumprimentoObjetivos() {


    var data1 = [null, null, null, null, null, null, null, null, null, null, null, null];
    var data2 = [null, null, null, null, null, null, null, null, null, null, null, null];
    var valor = [null, null, null, null, null, null, null, null, null, null, null, null];
    var variacao = [null, null, null, null, null, null, null, null, null, null, null, null];

    var dados = [{ ANO: this.ano, SEMANA: null }];
    var labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.DASHBOARDANALISESService.getDASHBOARD_CUMPRIMENTO_OBJETIVO_VENDAS(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            data1[response[x][1] - 1] = response[x][0];
            data2[response[x][1] - 1] = response[x][4];
            valor[response[x][1] - 1] = response[x][8];
            variacao[response[x][1] - 1] = response[x][9];
          }

          this.carregagraficosFinanceiraCumprimentoObjetivos2(labels, valor, data1, data2, variacao);
        } else {
          this.carregagraficosFinanceiraCumprimentoObjetivos2(labels, valor, data1, data2, variacao);
        }

      }, error => {
        console.log(error);
        this.carregagraficosFinanceiraCumprimentoObjetivos2(labels, valor, data1, data2, variacao);
        /*this.loadingProducao = true;*/
      });



  }

  carregagraficosFinanceiraCumprimentoObjetivos2(labels, valor, data1, data2, variacao) {
    this.data_CumprimentoObjetivos = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: '% Variação',
          data: variacao,
          ano1: data1,
          ano2: data2,
          ano: this.ano,
          valor: valor,
          borderColor: '#ff6c60',
          backgroundColor: '#ff6c60',
          fill: false,
          //pointRadius: 0
        },
      ],
    };
  }
  carregagraficosFinanceiraVariacaoStock() {
    var realizado = [];
    var valor = [];
    var desvio = [];

    var dados = [{ ANO: this.ano, SEMANA: null }];
    var labels = [];
    this.DASHBOARDANALISESService.getDASHBOARD_VARIACAO_STOCK(dados).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            labels.push(response[x][0]);
            valor.push(response[x][1]);
            realizado.push(response[x][2]);
            desvio.push(response[x][3]);
          }

          this.carregagraficosFinanceiraVariacaoStock2(labels, valor, realizado, desvio);
        } else {
          this.carregagraficosFinanceiraVariacaoStock2(labels, valor, realizado, desvio);
        }

      }, error => {
        console.log(error);
        this.carregagraficosFinanceiraVariacaoStock2(labels, valor, realizado, desvio);
        /*this.loadingProducao = true;*/
      });
  }

  carregagraficosFinanceiraVariacaoStock2(labels, valor, realizado, desvio) {
    this.data_VariacaoStock = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Variação Stock',
          data: valor,
          realizado: realizado,
          desvio: desvio,
          borderColor: '#1fb5ac',
          backgroundColor: '#1fb5ac',
          fill: false,
          //pointRadius: 0
        },
      ],
    };
  }

  getestado(valor) {
    if (valor == "E") {
      return "Em Elaboração"
    } if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/ Realizado"
    } else if (valor == "C") {
      return "Controlado/ Verificado"
    } else if (valor == "V") {
      return "Aprovado/ Finalizado"
    } else if (valor == "R") {
      return "Rejeitado"
    } else if (valor == "A") {
      //return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
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

  //formatar a data para dd-mm-yyyy
  formatDateddmmyyyy(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  formatDate_time(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + ' ' + d.toLocaleTimeString().slice(0, 5);
  }

  formatDate2(date, tipo = null) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Fev";
    month[2] = "Mar";
    month[3] = "Abr";
    month[4] = "Mai";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Ago";
    month[8] = "Set";
    month[9] = "Out";
    month[10] = "Nov";
    month[11] = "Dez";

    var d = new Date(date),
      mes = month[d.getMonth()],
      ano = '' + d.getFullYear(),
      day = '' + d.getDate();

    if (day.length < 2) day = '0' + day;
    if (tipo == null || tipo == 'semanal') {
      return [day, mes].join('/');
    } if (tipo == 'numerico') {
      var mes_d = d.getMonth() + 1 + '';
      if (mes_d.length < 2) mes_d = '0' + mes_d;
      return [day, mes_d].join('/');
    } else {
      return [mes, ano].join('/');
    }
  }

  verTarefa(id_TAREFA) {

    if (id_TAREFA != null) {
      this.id_tarefa_input = id_TAREFA;
      this.displayTarefa = true;
    }

  }

  set_favoritos(col) {
    if (col.seguir_LINHA) {
      if (col.id_PLANO_LINHA != null) {
        this.delete_favorito(col.id_PLANO_LINHA, col);
      } else {
        col.seguir_LINHA = false;
      }
    } else {
      if (col.id_PLANO_LINHA != null) {
        this.add_favorito(col.id_PLANO_LINHA, col);
      } else {
        col.seguir_LINHA = true;
      }
    }
  }

  delete_favorito(id, col) {
    this.PAMOVLINHAService.delete_favorito(id, this.user).subscribe(result => {
      col.seguir_LINHA = false;
    }, error => { console.log(error); col.seguir_LINHA = true; });
  }

  add_favorito(id, col) {
    this.PAMOVLINHAService.add_favorito(id, this.user).subscribe(result => {
      col.seguir_LINHA = true;
    }, error => { console.log(error); col.seguir_LINHA = false; });
  }

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      if (value == 0 && fil) {
        value = "";
      }
      if (value != null) {
        value = value.toString();
      }

      this.dataTableComponent.filter(value, coluna, filtro);


    }, 250);
  }

  limpar_dados() {
    this.objetivo_cromagem_menor = null;
    this.objetivo_cromagem_maior = null;
    this.objetivo_injecao_maior = null;
    this.objetivo_injecao_menor = null;
    this.objetivo_rejeicao_global = null;

    /* DATA */

    this.tipo0_linha33 = 0;
    this.tipo1_linha33 = 0;
    this.tipo2_linha33 = 0;
    this.tipo3_linha33 = 0;
    this.tipo4_linha33 = 0;



    /* MES */


    this.tipo10_linha33 = 0;
    this.tipo11_linha33 = 0;
    this.tipo12_linha33 = 0;
    this.tipo13_linha33 = 0;
    this.tipo14_linha33 = 0;



    this.tipo20_linha33 = 0;
    this.tipo21_linha33 = 0;
    this.tipo22_linha33 = 0;
    this.tipo23_linha33 = 0;
    this.tipo24_linha33 = 0;


    /* DATA */
    this.tipo0_linha1_area = 0;
    this.tipo1_linha1_area = 0;
    this.tipo2_linha1_area = 0;
    this.tipo3_linha1_area = 0;
    this.tipo4_linha1_area = 0;

    this.tipo0_linha2_area = 0;
    this.tipo1_linha2_area = 0;
    this.tipo2_linha2_area = 0;
    this.tipo3_linha2_area = 0;
    this.tipo4_linha2_area = 0;

    this.tipo0_linha33_area = 0;
    this.tipo1_linha33_area = 0;
    this.tipo2_linha33_area = 0;
    this.tipo3_linha33_area = 0;
    this.tipo4_linha33_area = 0;



    /* MES */
    this.tipo10_linha1_area = 0;
    this.tipo11_linha1_area = 0;
    this.tipo12_linha1_area = 0;
    this.tipo13_linha1_area = 0;
    this.tipo14_linha1_area = 0;

    this.tipo10_linha2_area = 0;
    this.tipo11_linha2_area = 0;
    this.tipo12_linha2_area = 0;
    this.tipo13_linha2_area = 0;
    this.tipo14_linha2_area = 0;

    this.tipo10_linha33_area = 0;
    this.tipo11_linha33_area = 0;
    this.tipo12_linha33_area = 0;
    this.tipo13_linha33_area = 0;
    this.tipo14_linha33_area = 0;

    /* ANO */
    this.tipo20_linha1_area = 0;
    this.tipo21_linha1_area = 0;
    this.tipo22_linha1_area = 0;
    this.tipo23_linha1_area = 0;
    this.tipo24_linha1_area = 0;

    this.tipo20_linha2_area = 0;
    this.tipo21_linha2_area = 0;
    this.tipo22_linha2_area = 0;
    this.tipo23_linha2_area = 0;
    this.tipo24_linha2_area = 0;

    this.tipo20_linha33_area = 0;
    this.tipo21_linha33_area = 0;
    this.tipo22_linha33_area = 0;
    this.tipo23_linha33_area = 0;
    this.tipo24_linha33_area = 0;



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

  ctx.fillStyle = 'grey'
  ctx.font = "10px Helvetica Neue, Helvetica, Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  this.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false) { continue; }
      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      if (dataset.data[i] !== null && dataset.label != 'Linha de Tendência' && dataset.label != 'Objetivo') {
        ctx.fillText(formatMoney(dataset.data[i], 2, ",", ".") + ' ', model.x - 1, model.y - 5);
      }
    }
  });
}


function drawBarValuesPercentage() {
  // render the value of the chart above the bar
  var ctx = this.chart.ctx;

  ctx.fillStyle = 'grey'
  ctx.font = "10px Helvetica Neue, Helvetica, Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  this.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false) { continue; }
      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      if (dataset.data[i] !== null && dataset.label != 'Linha de Tendência' && dataset.label != 'Objetivo') {
        ctx.fillText(formatMoney(dataset.data[i], 2, ",", ".") + ' %', model.x - 1, model.y - 5);
      }
    }
  });
}


function drawBarValuesMoney() {
  // render the value of the chart above the bar
  var ctx = this.chart.ctx;

  ctx.fillStyle = 'grey'
  ctx.font = "10px Helvetica Neue, Helvetica, Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  this.data.datasets.forEach(function (dataset) {
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false) { continue; }
      var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      if (dataset.data[i] !== null && dataset.label != 'Linha de Tendência') {
        ctx.fillText(formatMoney(dataset.data[i], 2, ",", ".") + ' €', model.x - 1, model.y - 5);
      }
    }
  });
}

