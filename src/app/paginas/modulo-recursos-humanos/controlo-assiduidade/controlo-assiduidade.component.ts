import { Component, OnInit, ViewChild } from '@angular/core';
import { RHFUNCIONARIOSService } from 'app/servicos/rh-funcionarios.service';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { RHTURNOSService } from 'app/servicos/rh-turnos.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import * as FileSaver from 'file-saver';
import { DataTable } from 'primeng/primeng';
import { RH_EXCLUSAO_TIPO_EXTRAService } from 'app/servicos/RH_EXCLUSAO_TIPO_EXTRA.service';
import { GridOptions } from 'ag-grid';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';

@Component({
  selector: 'app-controlo-assiduidade',
  templateUrl: './controlo-assiduidade.component.html',
  styleUrls: ['./controlo-assiduidade.component.css']
})
export class ControloAssiduidadeComponent implements OnInit {
  classstep = "geral";
  tabelageral = [];
  colsassiduidade = [];
  tabelaassiduidade = [];
  semana_ano = "";
  semana: number;
  ano: any;

  dataprodutividade1;
  dataprodutividade2;
  dataoperacoes1;
  dataoperacoes2;
  datageral = new Date();
  data_assiduidade = new Date();
  loadingtabelageral: boolean;
  ativoGeral: any = true;
  loadingtabelaassiduidade: boolean;
  ativoAssiduidade: any;
  loadingtabelprodutividade: boolean;
  tabelprodutividade: any[] = [];
  produtividade_media = 0;
  produtividade_horasregistadas;
  produtividade_totalextras;
  produtividade_totalfaltas;
  produtividade_totaltrabalhadas;
  ativoProdutividade: any = true;
  operarioProdutividade = "";
  operarioGeral = "";
  operarioAssiduidade = "";
  TURNO_estado;
  TURNO_hora_FIM: string;
  TURNO_data_FIM;
  TURNO_hora_INICIO;
  TURNO_data_INICIO;
  TURNO_des_TURNO: string;
  TURNO_cod_TURNO: number;
  SECTOR_cod_SECTOR: number;
  SECTOR_data_INICIO;
  SECTOR_data_FIM;
  SECTOR_estado;
  SECTOR_chefe1: number;
  SECTOR_chefe2: number;
  SECTOR_racio_MIN: number;
  SECTOR_racio_MAX: number;
  SECTOR_local: string;
  SECTOR_des_SECTOR: string;

  operacoes_qtd_revista = 0;
  operacoes_tempo_prep = '00:00:00';
  operacoes_tempo_exec = '00:00:00';
  operacoes_tempo_total = '00:00:00';
  tabelaoperacoes = [];
  loadingtabelaoperacoes: boolean;
  operarioOperacoes = "";
  ativoOperacoes: any;
  total_operacoes: number;
  dialogsector: boolean;
  dialogturno: boolean;
  operariosector: any;
  sector: any;
  ativoSector: any;
  loadingtabelasector: boolean;
  tabelasectores: any[] = [];
  colssectores: any[];
  datasector1;
  colscomparativa: any[];
  tabelacomparativa: any[] = [];
  datacomparativa1: any;
  ativocomparativa: any;
  sector_comparativa: any;
  loadingtabelacomparativa;
  dropsectores: any[];
  tipos_analise = [];
  tipo_analise = "semanal";
  media_total_comparativa1: number = 0;
  media_total_comparativa2: number = 0;
  media_total_comparativa3: number = 0;
  media_total_comparativa4: number = 0;
  media_total_comparativa5: number = 0;
  media_total_comparativa6: number = 0;
  media_total_comparativa7: number = 0;
  media_geral_comparativa: number = 0;
  media_geral_sector: number = 0;
  media_total_sector7: number = 0;
  media_total_sector6: number = 0;
  media_total_sector5: number = 0;
  media_total_sector4: number = 0;
  media_total_sector3: number = 0;
  media_total_sector2: number = 0;
  media_total_sector1: number = 0;
  sectores_acesso: any[];
  admin: any;
  exclusao = [];
  tipo_cadencia_comparativa = "definidas";
  tipo_cadencia_sector = "definidas";

  @ViewChild("tabelageralcomp") tabelageralcomp: DataTable;
  @ViewChild("tabelaassiduidadecomp") tabelaassiduidadecomp: DataTable;
  @ViewChild("tabelaoperacoescomp") tabelaoperacoescomp: DataTable;
  @ViewChild("tabelaprodutividadecomp") tabelaprodutividadecomp: DataTable;
  @ViewChild("tabelacomparativacomp") tabelacomparativacomp: DataTable;
  @ViewChild("tabelasectorcomp") tabelasectorcomp: DataTable;
  @ViewChild("tabelapausascomp") tabelapausascomp: DataTable;
  semana_comparativa: number;
  ano_comparativa: any;
  semana_ano_comparativa: string;
  loadingtabelapausas: boolean;
  tabelapausas = [];
  datapausas2;
  ativopausas: any;
  operariopausas = "";
  pausas_tempo_prep: string;
  pausas_tempo_exec: string;
  pausas_tempo_total: string;
  datapausas1;
  datacadencias1;
  ativocadencias;
  sector_cadencias;
  operariocadencias;

  total_pausas: number;
  semana_sector: number;
  ano_sector: any;
  semana_ano_sector: string;
  tabelacadencias = [];
  gridOptions: GridOptions;
  bottomOptions: GridOptions;
  gridOptions_func: GridOptions;
  bottomOptions_func: GridOptions;
  showGrid: boolean;
  rowSelection;
  columnDefs: any;
  domLayout: string;
  ultimodisable: any;
  rowData = [];
  rowCount: string;
  rowData1: any[];
  bottomData = [];
  style = {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };
  private gridApi: any;
  private gridColumnApi;
  private gridApi_func: any;
  private gridColumnApi_func;
  semana_cadencias: number;
  ano_cadencias: any;
  semana_ano_cadencias;
  acesso_geral: boolean;
  acesso_assiduidade: boolean;
  acesso_produtividade: boolean;
  acesso_operacoes: boolean;
  acesso_comparativa: boolean;
  acesso_sector: boolean;
  acesso_pausas: boolean;
  acesso_cadencias: boolean;
  tipo_cadencia = "definidas";
  operacoes_cadencia = 0;
  tipo_cadencia_candencia = "definidas";
  loadingcadencia: boolean = false;
  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;
  page_size;
  page_size_func;
  paginasize = [{ label: '10', value: '10' }, { label: '100', value: '100' }, { label: '500', value: '500' }, { label: 'Todos', value: 'todos' }]
  imprimirpdf: boolean = true;
  sector_operacao: any;
  acesso_cadencias_funcionario: boolean;
  tipo_cadencia_cadencias_funcionario = "definidas";
  ativocadencias_funcionario: any;
  operariocadencias_funcionario: any;
  sector_cadencias_funcionario: any;
  tipo_analisecadencias_funcionario = "semanal";
  semana_ano_cadencias_funcionario: string;
  semana_cadencias_funcionario: number;
  ano_cadencias_funcionario: number;
  datacadencias_funcionario: Date;
  rowData1_func: any[];
  columnDefs_func: any[];
  loadingcadencia_func: boolean = false;
  rowData_func = [];
  bottomData_func = [];
  rowCount_func: string;
  ultimodisable_func: any;
  constructor(private RH_EXCLUSAO_TIPO_EXTRAService: RH_EXCLUSAO_TIPO_EXTRAService, private RHTURNOSService: RHTURNOSService, private RHFUNCIONARIOSService: RHFUNCIONARIOSService, private RHSECTORESService: RHSECTORESService, private RelatoriosService: RelatoriosService) { }

  ngOnInit() {
    this.page_size = '100';
    this.page_size_func = '100'
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">A pesquisar..</span>';
    this.overlayNoRowsTemplate =
      "<span class=\"ag-overlay-loading-center\">Sem dados</span>";

    this.tipos_analise = [{ label: "Semanal", value: "semanal" }, { label: "Mensal", value: "mensal" }];

    var date = new Date();
    this.dataprodutividade1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);
    this.dataprodutividade2 = new Date(date.getFullYear(), date.getMonth(), 1, 1);

    this.dataoperacoes1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);
    this.dataoperacoes2 = new Date(date.getFullYear(), date.getMonth(), 1, 1);
    this.datapausas1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);
    this.datapausas2 = new Date(date.getFullYear(), date.getMonth(), 1, 1);

    this.datasector1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);

    this.datacadencias1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);
    this.datacadencias_funcionario = new Date(date.getFullYear(), date.getMonth(), 1, 1);

    this.datacomparativa1 = new Date(date.getFullYear(), date.getMonth(), 1, 1);

    this.admin = JSON.parse(localStorage.getItem('userapp'))["admin"];


    this.acesso_geral = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node73");
    this.acesso_assiduidade = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node74");
    this.acesso_produtividade = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node75");
    this.acesso_operacoes = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node76");
    this.acesso_comparativa = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node77");
    this.acesso_sector = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node78");
    this.acesso_pausas = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node79");
    this.acesso_cadencias = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node710");
    this.acesso_cadencias_funcionario = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node711");




    /*var d = new Date('2019-03-11');
    this.carregaassiduidade(d);*/
    var acessos = JSON.parse(localStorage.getItem('acessos'));
    this.sectores_acesso = [];
    for (var x in acessos) {
      if (acessos[x].node.startsWith("sector") && acessos[x].node.replace("sector", "") != "0") {
        this.sectores_acesso.push(parseInt(acessos[x].node.replace("sector", "")));
      }
    }
    if (this.sectores_acesso.length == 0) this.sectores_acesso.push(0);
    this.listardropsectores();
    this.carregatabelatiposextra();

    // we pass an empty gridOptions in, so we can grab the api out
    //totais
    this.bottomData = [
      {
        chefe: 'Total',
        data1: 0,
        data2: 0,
        data3: 0,
        data4: 0,
        data5: 0,
        data6: 0,
        data7: 0
      }
    ];

    this.bottomOptions = { alignedGrids: [], suppressContextMenu: true, };
    this.bottomOptions.suppressNoRowsOverlay = true;
    this.gridOptions = {
      alignedGrids: [],
      suppressHorizontalScroll: true,
      suppressAggFuncInHeader: true,
      columnDefs: this.columnDefs,
      rowData: null,
      showToolPanel: false,
      enableSorting: false,
      enableGroupEdit: false,
      enableFilter: true,
      floatingFilter: true,
      animateRows: true,
      toolPanelSuppressValues: true,
      toolPanelSuppressRowGroups: true,
      paginationPageSize: 10,
      toolPanelSuppressPivotMode: true,
      suppressPaginationPanel: true,
      isExternalFilterPresent: isExternalFilterPresent,
      doesExternalFilterPass: doesExternalFilterPass,
      rowGroupPanelShow: 'always',
      localeText: {
        // for filter panel
        page: 'Página',
        more: 'mais',
        to: 'para',
        of: 'de',
        next: 'Seguinte',
        last: 'Último',
        first: 'Primeiro',
        previous: 'Anterior',
        loadingOoo: 'A carregar...',
        // for set filter
        selectAll: 'Selecionar tudo',
        searchOoo: 'Pesquisar...',
        blanks: 'espaços em branco',
        // for number filter and text filter
        filterOoo: 'Filtrar...',
        applyFilter: 'Aplicar Filtro...',
        // for number filter
        equals: 'É igual a',
        notEqual: 'Não é igual a',
        lessThanOrEqual: 'Menor ou igual',
        greaterThanOrEqual: 'Maior ou igual',
        inRange: 'Entre',
        lessThan: 'Menor que',
        greaterThan: 'Maior que',
        // for text filter
        contains: 'Contém',
        notContains: 'Não Contém',
        startsWith: 'Começa com',
        endsWith: 'Termina com',
        // the header of the default group column
        group: 'Grupo',
        // tool panel
        columns: 'Colunas',
        rowGroupColumns: 'Pivot Cols',
        rowGroupColumnsEmptyMessage: 'Arraste colunas para agrupar',
        valueColumns: 'Coluna dos Valores',
        pivotMode: 'Pivot-Mode',
        groups: 'Grupos',
        values: 'Valores',
        pivots: 'Pivots',
        valueColumnsEmptyMessage: 'Arraste cols para agregar',
        pivotColumnsEmptyMessage: 'Arraste para aqui para girar.',
        // other
        noRowsToShow: 'Sem linhas',
        // enterprise menu
        pinColumn: 'Fixar Coluna',
        valueAggregation: 'Agregar Valores',
        autosizeThiscolumn: 'Tamanho automático',
        autosizeAllColumns: 'Tamanho automático em todas as colunas',
        groupBy: 'Agrupar por',
        ungroupBy: 'Desagrupar por',
        resetColumns: 'Repor as colunas',
        expandAll: 'Expandir tudo',
        collapseAll: 'Fechar tudo',
        toolPanel: 'Painel de Ferramentas',
        export: 'Exportar',
        csvExport: 'CSV Export',
        excelExport: 'Excel Export',
        // enterprise menu pinning
        pinLeft: 'Fixar Esquerda',
        pinRight: 'Fixar Direita',
        noPin: 'Não Fixar',
        // enterprise menu aggregation and status panel
        sum: 'Soma',
        min: 'Menor',
        max: 'Maior',
        none: 'Nenhum',
        count: 'Contagem',
        average: 'Média',
        avg: 'Média',
        // standard menu
        copy: 'Copiar',
        copyWithHeaders: 'Copiar com Cabeçalhos',
        ctrlC: 'ctrl + C',
        paste: 'Colar',
        ctrlV: 'ctrl + V'
      }


    };

    this.bottomData = [
      {
        chefe: 'Total',
        data1: 0,
        data2: 0,
        data3: 0,
        data4: 0,
        data5: 0,
        data6: 0,
        data7: 0
      }
    ];

    this.bottomOptions_func = { alignedGrids: [], suppressContextMenu: true, };
    this.bottomOptions_func.suppressNoRowsOverlay = true;
    this.gridOptions_func = {
      alignedGrids: [],
      suppressHorizontalScroll: true,
      suppressAggFuncInHeader: true,
      columnDefs: this.columnDefs,
      rowData: null,
      showToolPanel: false,
      enableSorting: false,
      enableGroupEdit: false,
      enableFilter: true,
      floatingFilter: true,
      animateRows: true,
      toolPanelSuppressValues: true,
      toolPanelSuppressRowGroups: true,
      paginationPageSize: 10,
      toolPanelSuppressPivotMode: true,
      suppressPaginationPanel: true,
      isExternalFilterPresent: isExternalFilterPresent,
      doesExternalFilterPass: doesExternalFilterPass,
      rowGroupPanelShow: 'always',
      localeText: {
        // for filter panel
        page: 'Página',
        more: 'mais',
        to: 'para',
        of: 'de',
        next: 'Seguinte',
        last: 'Último',
        first: 'Primeiro',
        previous: 'Anterior',
        loadingOoo: 'A carregar...',
        // for set filter
        selectAll: 'Selecionar tudo',
        searchOoo: 'Pesquisar...',
        blanks: 'espaços em branco',
        // for number filter and text filter
        filterOoo: 'Filtrar...',
        applyFilter: 'Aplicar Filtro...',
        // for number filter
        equals: 'É igual a',
        notEqual: 'Não é igual a',
        lessThanOrEqual: 'Menor ou igual',
        greaterThanOrEqual: 'Maior ou igual',
        inRange: 'Entre',
        lessThan: 'Menor que',
        greaterThan: 'Maior que',
        // for text filter
        contains: 'Contém',
        notContains: 'Não Contém',
        startsWith: 'Começa com',
        endsWith: 'Termina com',
        // the header of the default group column
        group: 'Grupo',
        // tool panel
        columns: 'Colunas',
        rowGroupColumns: 'Pivot Cols',
        rowGroupColumnsEmptyMessage: 'Arraste colunas para agrupar',
        valueColumns: 'Coluna dos Valores',
        pivotMode: 'Pivot-Mode',
        groups: 'Grupos',
        values: 'Valores',
        pivots: 'Pivots',
        valueColumnsEmptyMessage: 'Arraste cols para agregar',
        pivotColumnsEmptyMessage: 'Arraste para aqui para girar.',
        // other
        noRowsToShow: 'Sem linhas',
        // enterprise menu
        pinColumn: 'Fixar Coluna',
        valueAggregation: 'Agregar Valores',
        autosizeThiscolumn: 'Tamanho automático',
        autosizeAllColumns: 'Tamanho automático em todas as colunas',
        groupBy: 'Agrupar por',
        ungroupBy: 'Desagrupar por',
        resetColumns: 'Repor as colunas',
        expandAll: 'Expandir tudo',
        collapseAll: 'Fechar tudo',
        toolPanel: 'Painel de Ferramentas',
        export: 'Exportar',
        csvExport: 'CSV Export',
        excelExport: 'Excel Export',
        // enterprise menu pinning
        pinLeft: 'Fixar Esquerda',
        pinRight: 'Fixar Direita',
        noPin: 'Não Fixar',
        // enterprise menu aggregation and status panel
        sum: 'Soma',
        min: 'Menor',
        max: 'Maior',
        none: 'Nenhum',
        count: 'Contagem',
        average: 'Média',
        avg: 'Média',
        // standard menu
        copy: 'Copiar',
        copyWithHeaders: 'Copiar com Cabeçalhos',
        ctrlC: 'ctrl + C',
        paste: 'Colar',
        ctrlV: 'ctrl + V'
      }


    };

    this.rowSelection = "single";
    this.domLayout = "autoHeight";

    //this.createColumnDefs();
    this.showGrid = true;
    //this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }


    this.gridOptions_func.defaultColDef = {
      headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }
  }


  carregarGeral() {
    this.loadingtabelageral = true;
    var data = [{ ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null, DATA: this.formatDate(this.datageral), ATIVO: this.ativoGeral, OPERARIO: this.operarioGeral }];
    this.tabelageral = [];
    this.RHFUNCIONARIOSService.getGeral(data).subscribe(
      response => {
        for (var x in response) {

          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          this.tabelageral.push({
            numero: response[x][0],
            numero_op: numero_op,
            nome: response[x][1],
            empresa: response[x][2],
            data_admissao: (response[x][3] != null) ? this.formatDate(response[x][3]) : "",
            data_demissao: (response[x][4] != null) ? this.formatDate(response[x][4]) : "",
            ativo: (response[x][5]) ? "Sim" : "Não",
            local: response[x][6],
            responsavel: response[x][7],
            sector: response[x][8],
            cod_sector: response[x][18],
            cod_turno: response[x][19],
            turno: response[x][9],
            chefe: response[x][10],
            numero_cacifo: response[x][11],
            data_inicio_situacao: (response[x][12] != null) ? this.formatDate(response[x][12]) : "",
            data_fim_situacao: (response[x][13] != null) ? this.formatDate(response[x][13]) : "",
            hora_entrada: (response[x][16] != null) ? new Date(response[x][16]).toLocaleTimeString().slice(0, 5) : "",
            hora_saida: (response[x][17] != null) ? new Date(response[x][17]).toLocaleTimeString().slice(0, 5) : "",
            estado: response[x][14],
            data_prevista_retorno: (response[x][15] != null) ? this.formatDate(response[x][15]) : ""
          });
        }

        this.tabelageral = this.tabelageral.slice();
        this.loadingtabelageral = false;
      },
      error => {
        console.log(error);
        this.loadingtabelageral = false;
      });
  }

  carregatabelatiposextra() {
    this.exclusao = [];

    this.RH_EXCLUSAO_TIPO_EXTRAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.exclusao.push(response[x].tipo_EXTRA);
        }
      },
      error => { console.log(error); });

  }

  carregaassiduidade(d) {
    var dia_da_semana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

    this.loadingtabelaassiduidade = true;
    this.colsassiduidade = []

    this.tabelaassiduidade = [];

    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);
    this.semana = weekNo;
    this.ano = ano;

    this.semana_ano = "Semana nº " + weekNo + '/' + ano;
    var array = this.getDatesOfWeek(data);
    for (var x in array) {
      var num = parseInt(x) + 1;
      this.colsassiduidade.push({ field: "data" + num, header: this.formatDate2(array[x]) + " (" + dia_da_semana[x] + ")" });
    }

    var datat = [{ EXCLUSAO: this.exclusao.toString(), ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null, DATA: this.formatDate(this.data_assiduidade), ATIVO: this.ativoAssiduidade, OPERARIO: this.operarioAssiduidade }];
    this.RHFUNCIONARIOSService.getAssiduidade(datat).subscribe(
      response => {
        for (var x in response) {
          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          this.tabelaassiduidade.push({
            numero: response[x][0],
            numero_op: numero_op,
            nome: response[x][1],
            ativo: (response[x][2]) ? "Sim" : "Não",
            local: response[x][3],
            responsavel: response[x][4],
            sector: response[x][6],
            cod_sector: response[x][5],
            data1: { data: this.formatDate2(array[0]), horas: (response[x][8] == null) ? "00:00" : response[x][8].slice(0, 5), faltas: (response[x][9] == null) ? "00:00" : response[x][9].slice(0, 5), extra: (response[x][10] == null) ? "00:00" : response[x][10].slice(0, 5) },
            data2: { data: this.formatDate2(array[1]), horas: (response[x][11] == null) ? "00:00" : response[x][11].slice(0, 5), faltas: (response[x][12] == null) ? "00:00" : response[x][12].slice(0, 5), extra: (response[x][13] == null) ? "00:00" : response[x][13].slice(0, 5) },
            data3: { data: this.formatDate2(array[2]), horas: (response[x][14] == null) ? "00:00" : response[x][14].slice(0, 5), faltas: (response[x][15] == null) ? "00:00" : response[x][15].slice(0, 5), extra: (response[x][16] == null) ? "00:00" : response[x][16].slice(0, 5) },
            data4: { data: this.formatDate2(array[3]), horas: (response[x][17] == null) ? "00:00" : response[x][17].slice(0, 5), faltas: (response[x][18] == null) ? "00:00" : response[x][18].slice(0, 5), extra: (response[x][19] == null) ? "00:00" : response[x][19].slice(0, 5) },
            data5: { data: this.formatDate2(array[4]), horas: (response[x][20] == null) ? "00:00" : response[x][20].slice(0, 5), faltas: (response[x][21] == null) ? "00:00" : response[x][21].slice(0, 5), extra: (response[x][22] == null) ? "00:00" : response[x][22].slice(0, 5) },
            data6: { data: this.formatDate2(array[5]), horas: (response[x][23] == null) ? "00:00" : response[x][23].slice(0, 5), faltas: (response[x][24] == null) ? "00:00" : response[x][24].slice(0, 5), extra: (response[x][25] == null) ? "00:00" : response[x][25].slice(0, 5) },
            data7: { data: this.formatDate2(array[6]), horas: (response[x][26] == null) ? "00:00" : response[x][26].slice(0, 5), faltas: (response[x][27] == null) ? "00:00" : response[x][27].slice(0, 5), extra: (response[x][28] == null) ? "00:00" : response[x][28].slice(0, 5) }
          });
        }
        this.tabelaassiduidade = this.tabelaassiduidade.slice();
        this.loadingtabelaassiduidade = false;
      },
      error => {
        console.log(error);
        this.loadingtabelaassiduidade = false;
      });

    this.tabelaassiduidade = this.tabelaassiduidade.slice();
  }

  listardropsectores() {
    this.dropsectores = [];
    this.RHSECTORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          if (this.admin || this.sectores_acesso.find(item => item == response[x][0].cod_SECTOR)) {
            this.dropsectores.push({
              label: response[x][0].des_SECTOR,
              value: response[x][0].cod_SECTOR,
            });
          } else if (this.admin) {
            this.sectores_acesso.push(response[x][0].cod_SECTOR);
          }
        }
        this.dropsectores = this.dropsectores.slice();
        this.carregarGeral();
      },
      error => { console.log(error); this.carregarGeral(); });
  }


  carregasector(d) {
    this.loadingtabelasector = true;
    this.colssectores = []



    this.tabelasectores = [];

    var datat = [{
      TIPO_CADENCIA: this.tipo_cadencia_sector,
      SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null,
      DATA1: this.formatDate(this.datasector1), ATIVO: this.ativoSector,
      OPERARIO: this.operariosector, SECTOR: (this.sector != null) ? this.sector.toString() : null
    }];

    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);
    var array = this.getDatesOfWeek(data);


    this.semana_sector = weekNo;
    this.ano_sector = ano;

    this.semana_ano_sector = "Semana nº " + weekNo + '/' + ano;

    for (var x in array) {
      var num = parseInt(x) + 1;
      this.colssectores.push({ field: "data" + num, header: this.formatDate2(array[x]), data: this.formatDate(array[x]) });
    }

    this.RHFUNCIONARIOSService.getSectores(datat).subscribe(
      response => {

        for (var x in response) {
          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          if (this.tabelasectores.find(item => item.numero == response[x][0])) {
            var datai = this.colssectores.findIndex(item => item.data == this.formatDate(response[x][7]));
            var soma = response[x][8] + response[x][9];
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datai + 1)][0] = this.round(response[x][8]);
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datai + 1)][1] = this.round(response[x][9]);
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datai + 1)][2] = (soma > 0) ? this.round(soma / 2) : 0;
          } else {
            this.tabelasectores.push({
              numero: response[x][0],
              numero_op: numero_op,
              nome: response[x][1],
              ativo: (response[x][2]) ? "Sim" : "Não",
              local: response[x][3],
              responsavel: response[x][4],
              sector: response[x][6],
              cod_sector: response[x][5],
              data1: [0, 0, 0],
              data2: [0, 0, 0],
              data3: [0, 0, 0],
              data4: [0, 0, 0],
              data5: [0, 0, 0],
              data7: [0, 0, 0],
              data6: [0, 0, 0],
              media: [0, 0, 0],
              data1_data: this.formatDate2(array[0]),
              data2_data: this.formatDate2(array[1]),
              data3_data: this.formatDate2(array[2]),
              data4_data: this.formatDate2(array[3]),
              data5_data: this.formatDate2(array[4]),
              data7_data: this.formatDate2(array[5]),
              data6_data: this.formatDate2(array[6]),
            });
            var datain = this.colssectores.findIndex(item => item.data == this.formatDate(response[x][7]));
            var soma = response[x][8] + response[x][9];
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datain + 1)][0] = this.round(response[x][8]);
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datain + 1)][1] = this.round(response[x][9]);
            this.tabelasectores.find(item => item.numero == response[x][0])["data" + (datain + 1)][2] = (soma > 0) ? this.round(soma / 2) : 0;

          }

          var campo = this.tabelasectores.find(item => item.numero == response[x][0]);
          var total = 0;
          var total1 = 0;
          if (campo.data1[0] > 0) total++;
          if (campo.data2[0] > 0) total++;
          if (campo.data3[0] > 0) total++;
          if (campo.data4[0] > 0) total++;
          if (campo.data5[0] > 0) total++;
          if (campo.data6[0] > 0) total++;
          if (campo.data7[0] > 0) total++;

          if (campo.data1[1] > 0) total1++;
          if (campo.data2[1] > 0) total1++;
          if (campo.data3[1] > 0) total1++;
          if (campo.data4[1] > 0) total1++;
          if (campo.data5[1] > 0) total1++;
          if (campo.data6[1] > 0) total1++;
          if (campo.data7[1] > 0) total1++;

          campo.media[0] = this.round(((campo.data1[0] + campo.data2[0] + campo.data3[0] + campo.data4[0] + campo.data5[0] + campo.data6[0] + campo.data7[0]) / ((total == 0) ? 1 : total)));
          campo.media[1] = this.round(((campo.data1[1] + campo.data2[1] + campo.data3[1] + campo.data4[1] + campo.data5[1] + campo.data6[1] + campo.data7[1]) / ((total1 == 0) ? 1 : total1)));
          campo.media[2] = this.round(((campo.data1[2] + campo.data2[2] + campo.data3[2] + campo.data4[2] + campo.data5[2] + campo.data6[2] + campo.data7[2]) / ((total == 0) ? 1 : total)));

        }

        this.tabelasectores = this.tabelasectores.slice();

        this.calculateGroupTotalSectores(null, this.tabelasectores);


        this.loadingtabelasector = false;
      },
      error => {
        console.log(error);
        this.loadingtabelasector = false;
      });

  }


  comparativa(d) {

    this.loadingtabelacomparativa = true;
    this.colscomparativa = []

    this.tabelacomparativa = [];

    var datat = [{
      TIPO_CADENCIA: this.tipo_cadencia_comparativa,
      ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null,
      DATA1: this.formatDate(this.datacomparativa1), ATIVO: this.ativocomparativa,
      SECTOR: (this.sector_comparativa != null) ? this.sector_comparativa.toString() : null
    }];


    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);

    var array = this.getDatesOfWeek(data);

    this.semana_comparativa = weekNo;
    this.ano_comparativa = ano;

    this.semana_ano_comparativa = "Semana nº " + weekNo + '/' + ano;

    for (var x in array) {
      var num = parseInt(x) + 1;
      this.colscomparativa.push({ field: "data" + num, header: this.formatDate2(array[x]), data: this.formatDate(array[x]) });
    }

    this.RHFUNCIONARIOSService.getSectoresComparativa(datat).subscribe(
      response => {

        for (var x in response) {
          if (this.tabelacomparativa.find(item => item.cod_sector == response[x][0])) {
            var datai = this.colscomparativa.findIndex(item => item.data == this.formatDate(response[x][4]));
            var soma = response[x][5] + response[x][6];
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datai + 1)][0] = this.round(response[x][5]);
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datai + 1)][1] = this.round(response[x][6]);
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datai + 1)][2] = (soma > 0) ? this.round(soma / 2) : 0;
          } else {

            this.tabelacomparativa.push({
              sector: response[x][1],
              cod_sector: response[x][0],
              local: response[x][2],
              chefe: response[x][3],
              data1: [0, 0, 0],
              data2: [0, 0, 0],
              data3: [0, 0, 0],
              data4: [0, 0, 0],
              data5: [0, 0, 0],
              data7: [0, 0, 0],
              data6: [0, 0, 0],
              data1_data: this.formatDate2(array[0]),
              data2_data: this.formatDate2(array[1]),
              data3_data: this.formatDate2(array[2]),
              data4_data: this.formatDate2(array[3]),
              data5_data: this.formatDate2(array[4]),
              data7_data: this.formatDate2(array[5]),
              data6_data: this.formatDate2(array[6]),
              media: [0, 0, 0]
            });
            var datain = this.colscomparativa.findIndex(item => item.data == this.formatDate(response[x][4]));
            var soma = response[x][5] + response[x][6];
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datain + 1)][0] = this.round(response[x][5]);
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datain + 1)][1] = this.round(response[x][6]);
            this.tabelacomparativa.find(item => item.cod_sector == response[x][0])["data" + (datain + 1)][2] = (soma > 0) ? this.round(soma / 2) : 0;
          }

          var campo = this.tabelacomparativa.find(item => item.cod_sector == response[x][0]);
          var total = 0;
          var total1 = 0;
          if (campo.data1[0] > 0) total++;
          if (campo.data2[0] > 0) total++;
          if (campo.data3[0] > 0) total++;
          if (campo.data4[0] > 0) total++;
          if (campo.data5[0] > 0) total++;
          if (campo.data6[0] > 0) total++;
          if (campo.data7[0] > 0) total++;

          if (campo.data1[1] > 0) total1++;
          if (campo.data2[1] > 0) total1++;
          if (campo.data3[1] > 0) total1++;
          if (campo.data4[1] > 0) total1++;
          if (campo.data5[1] > 0) total1++;
          if (campo.data6[1] > 0) total1++;
          if (campo.data7[1] > 0) total1++;

          campo.media[0] = this.round(((campo.data1[0] + campo.data2[0] + campo.data3[0] + campo.data4[0] + campo.data5[0] + campo.data6[0] + campo.data7[0]) / ((total == 0) ? 1 : total)));
          campo.media[1] = this.round(((campo.data1[1] + campo.data2[1] + campo.data3[1] + campo.data4[1] + campo.data5[1] + campo.data6[1] + campo.data7[1]) / ((total1 == 0) ? 1 : total1)));
          campo.media[2] = this.round(((campo.data1[2] + campo.data2[2] + campo.data3[2] + campo.data4[2] + campo.data5[2] + campo.data6[2] + campo.data7[2]) / ((total == 0) ? 1 : total)));
        }

        this.tabelacomparativa = this.tabelacomparativa.slice();

        this.calculateGroupTotalComparativa(null, this.tabelacomparativa);


        this.loadingtabelacomparativa = false;
      },
      error => {
        console.log(error);
        this.loadingtabelacomparativa = false;
      });


  }


  carregaProdutividade() {
    this.loadingtabelprodutividade = true;
    var data = [{ ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null, DATA1: this.formatDate(this.dataprodutividade1), DATA2: this.formatDate(this.dataprodutividade2), ATIVO: this.ativoProdutividade, OPERARIO: this.operarioProdutividade }];
    this.tabelprodutividade = [];
    this.RHFUNCIONARIOSService.getProdutividade(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        let produtividade_media = 0;
        let produtividade_horasregistadas = 0;
        let produtividade_totalextras = 0;
        let produtividade_totalfaltas = 0;
        let produtividade_totaltrabalhadas = 0;
        let produtividade_totaltrabalhadas2 = 0;

        let raciohoras = 0;
        for (var x in response) {

          var horas_trabalhadas = (response[x][18] != null) ? response[x][18] : 0;
          var racio = (response[x][15] != null) ? response[x][15] * 3600000 : 0;
          raciohoras = this.round(((racio / horas_trabalhadas) * 100));


          if (horas_trabalhadas == 0) {
            raciohoras = 0.0;
          }

          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          //var horas_registadas = this.timeToDecimal((response[x][15] != null) ? this.getTime(response[x][15] * 3600000) : "00:00:00");

          var racio_min = 0;
          var racio_max = 0;
          if (response[x][16] != null) racio_min = response[x][16];
          if (response[x][17] != null) racio_max = response[x][17];

          var cor = "";
          if (racio_max != 0 && raciohoras > racio_max) {
            cor = "yellow"
          } else if (raciohoras < racio_min) {
            cor = "red"
          }
          if (raciohoras == 0) cor = "";
          if (this.tabelprodutividade.find(item => item.numero_op == numero_op && item.data == ((response[x][7] != null) ? this.formatDate(response[x][7]) : ""))) {
            if (response[x][13] != null && response[x][13] != "") {
              this.tabelprodutividade.find(item => item.numero_op == numero_op && item.data == ((response[x][7] != null) ? this.formatDate(response[x][7]) : "")).total_faltas.push((response[x][11] != null) ? response[x][11].slice(0, 8) : "00:00:00");
              this.tabelprodutividade.find(item => item.numero_op == numero_op && item.data == ((response[x][7] != null) ? this.formatDate(response[x][7]) : "")).tipo_falta.push(response[x][13]);
            }
            if (response[x][14] != null && response[x][14] != "") {
              this.tabelprodutividade.find(item => item.numero_op == numero_op && item.data == ((response[x][7] != null) ? this.formatDate(response[x][7]) : "")).total_extras.push((response[x][12] != null) ? response[x][12].slice(0, 8) : "00:00:00");
              this.tabelprodutividade.find(item => item.numero_op == numero_op && item.data == ((response[x][7] != null) ? this.formatDate(response[x][7]) : "")).tipo_extra.push(response[x][14]);
            }
          } else {
            this.tabelprodutividade.push({
              numero: response[x][0],
              numero_op: numero_op,
              nome: response[x][1],
              ativo: (response[x][2]) ? "Sim" : "Não",
              local: response[x][3],
              responsavel: response[x][4],
              sector: response[x][6],
              cod_sector: response[x][5],
              data: (response[x][7] != null) ? this.formatDate(response[x][7]) : "",
              hora_entrada: (response[x][8] != null) ? new Date(response[x][8]).toLocaleTimeString().slice(0, 8) : "",
              hora_saida: (response[x][9] != null) ? new Date(response[x][9]).toLocaleTimeString().slice(0, 8) : "",
              total_horas: (response[x][10] != null) ? response[x][10].slice(0, 8) : "00:00:00",
              total_faltas: [(response[x][11] != null) ? response[x][11].slice(0, 8) : "00:00:00"],
              tipo_falta: [response[x][13]],
              total_extras: [(response[x][12] != null) ? response[x][12].slice(0, 8) : "00:00:00"],
              tipo_extra: [response[x][14]],
              horas_registadas: (response[x][15] != null) ? this.getTime(response[x][15] * 3600000) : "00:00:00",
              total_horas2: (response[x][18] != null) ? response[x][18] : 0,
              racio_horas: raciohoras,
              cor: cor
            });
          }

          produtividade_horasregistadas += this.timeToDecimal((response[x][15] != null) ? this.getTime(response[x][15] * 3600000) : "00:00:00");
          produtividade_totalextras += this.timeToDecimal((response[x][12] != null) ? response[x][12].slice(0, 8) : "00:00:00");
          produtividade_totalfaltas += this.timeToDecimal((response[x][11] != null) ? response[x][11].slice(0, 8) : "00:00:00");
          produtividade_totaltrabalhadas += this.timeToDecimal((response[x][10] != null) ? response[x][10].slice(0, 8) : "00:00:00");
          produtividade_totaltrabalhadas2 += (response[x][18] != null) ? response[x][18] : 0;
        }


        this.produtividade_media = 0;
        if (produtividade_horasregistadas > 0) this.produtividade_media = this.round(((produtividade_horasregistadas / 3600000) / (produtividade_totaltrabalhadas2 / 3600000)) * 100);
        if (this.produtividade_media.toString() == 'Infinity') this.produtividade_media = 0;

        this.produtividade_horasregistadas = this.getTime(produtividade_horasregistadas);
        this.produtividade_totalextras = this.getTime(produtividade_totalextras);
        this.produtividade_totalfaltas = this.getTime(produtividade_totalfaltas);
        this.produtividade_totaltrabalhadas = this.getTime(produtividade_totaltrabalhadas);
        this.tabelprodutividade = this.tabelprodutividade.slice();
        this.loadingtabelprodutividade = false;
      },
      error => {
        console.log(error);
        this.loadingtabelprodutividade = false;
      });
  }


  carregaOperacoes() {
    this.loadingtabelaoperacoes = true;
    var data = [{
      TIPO_CADENCIA: this.tipo_cadencia, ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null,
      DATA1: this.formatDate(this.dataoperacoes1), DATA2: this.formatDate(this.dataoperacoes2), ATIVO: this.ativoOperacoes,
      OPERARIO: this.operarioOperacoes, SECTOR: (this.sector_operacao != null) ? this.sector_operacao.toString() : null
    }];
    this.tabelaoperacoes = [];
    this.RHFUNCIONARIOSService.gerOperacoes(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        let operacoes_qtd_revista = 0;
        let operacoes_cadencia = 0;
        let operacoes_tempo_prep = 0;
        let operacoes_tempo_exec = 0;
        let operacoes_tempo_total = 0;

        for (var x in response) {

          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          this.tabelaoperacoes.push({
            numero: response[x][0],
            numero_op: numero_op,
            nome: response[x][1],
            ativo: (response[x][2]) ? "Sim" : "Não",
            local: response[x][3],
            responsavel: response[x][4],
            sector: response[x][6],
            cod_sector: response[x][5],
            chefe: response[x][7],
            data: (response[x][8] != null) ? this.formatDate(response[x][8]) : "",
            referencia: response[x][9],
            designacao: response[x][10],
            operacao: response[x][11] + " - " + response[x][12],
            quant_revistas: response[x][13],
            tempo_prep: this.getTime(response[x][14] * 3600000),
            tempo_exec: this.getTime(response[x][15] * 3600000),
            tempo_total: this.getTime(response[x][16] * 3600000),
            operacoes_tempo_prep: response[x][14],
            operacoes_tempo_exec: response[x][15],
            operacoes_tempo_total: response[x][16],
            hora_inicio: (response[x][17] != null) ? response[x][17].slice(0, 5) : "",
            hora_fim: (response[x][18] != null) ? response[x][18].slice(0, 5) : "",
            of_num: (response[x][19] != null) ? response[x][19] : "",
            cadencia: response[x][20]
          });



          operacoes_qtd_revista += response[x][13];
          operacoes_tempo_prep += response[x][14];
          operacoes_tempo_exec += response[x][15];
          operacoes_tempo_total += response[x][16];
          operacoes_cadencia += response[x][20];
        }


        this.total_operacoes = count;
        this.operacoes_qtd_revista = this.round(operacoes_qtd_revista);
        this.operacoes_cadencia = (this.total_operacoes > 0) ? this.round(operacoes_cadencia / this.total_operacoes) : 0;
        this.operacoes_tempo_prep = this.getTime(operacoes_tempo_prep * 3600000);
        this.operacoes_tempo_exec = this.getTime(operacoes_tempo_exec * 3600000);
        this.operacoes_tempo_total = this.getTime(operacoes_tempo_total * 3600000);
        this.tabelaoperacoes = this.tabelaoperacoes.slice();

        this.loadingtabelaoperacoes = false;
      },
      error => {
        console.log(error);
        this.loadingtabelaoperacoes = false;
      });
  }



  carregapausas() {
    this.loadingtabelapausas = true;
    var data = [{
      ADMIN: this.admin, SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null, DATA1: this.formatDate(this.datapausas1),
      DATA2: this.formatDate(this.datapausas2), ATIVO: this.ativopausas, OPERARIO: this.operariopausas
    }];

    this.tabelapausas = [];
    this.RHFUNCIONARIOSService.getpausas(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        let pausas_tempo_prep = 0;
        let pausas_tempo_exec = 0;
        let pausas_tempo_total = 0;

        for (var x in response) {

          var numero_op = response[x][0];
          if (response[x][0] < 0) numero_op = numero_op * -1;
          if (numero_op < 100) {
            numero_op = ("00" + numero_op).slice(-3);
          }

          this.tabelapausas.push({
            numero: response[x][0],
            numero_op: numero_op,
            nome: response[x][1],
            ativo: (response[x][2]) ? "Sim" : "Não",
            local: response[x][3],
            responsavel: response[x][4],
            sector: response[x][6],
            cod_sector: response[x][5],
            chefe: response[x][7],
            data: (response[x][8] != null) ? this.formatDate(response[x][8]) : "",

            tempo_prep: this.getTime(response[x][9] * 3600000),
            tempo_exec: this.getTime(response[x][10] * 3600000),
            tempo_total: this.getTime(response[x][11] * 3600000),
            pausas_tempo_prep: response[x][9],
            pausas_tempo_exec: response[x][10],
            pausas_tempo_total: response[x][11],

            tipo_Pausa: response[x][14] + ' - ' + response[x][15],

            hora_inicio: (response[x][12] != null) ? response[x][12].slice(0, 5) : "",
            hora_fim: (response[x][13] != null) ? response[x][13].slice(0, 5) : "",
          });



          pausas_tempo_prep += response[x][9];
          pausas_tempo_exec += response[x][10];
          pausas_tempo_total += response[x][11];
        }


        this.total_pausas = count;
        this.pausas_tempo_prep = this.getTime(pausas_tempo_prep * 3600000);
        this.pausas_tempo_exec = this.getTime(pausas_tempo_exec * 3600000);
        this.pausas_tempo_total = this.getTime(pausas_tempo_total * 3600000);
        this.tabelapausas = this.tabelapausas.slice();

        this.loadingtabelapausas = false;
      },
      error => {
        console.log(error);
        this.loadingtabelapausas = false;
      });
  }

  semanaseguinte() {

    var week = this.semana + 1;
    var maxweek = this.weeksInYear(this.ano);
    if (maxweek < week) {
      week = 1; this.ano++;
    }
    this.semana = week;
    var data = this.getDateOfWeek(week, this.ano);
    this.data_assiduidade = data;
    this.carregaassiduidade(data);
  }

  semanaanterior() {

    var week = this.semana - 1;

    if (week <= 0) {
      this.ano--;
      week = this.weeksInYear(this.ano);
    }

    this.semana = week;
    var data = this.getDateOfWeek(week, this.ano);
    this.data_assiduidade = data;
    this.carregaassiduidade(data);
  }


  semanaseguintecomparativa() {

    var week = this.semana_comparativa + 1;
    var maxweek = this.weeksInYear(this.ano_comparativa);
    if (maxweek < week) {
      week = 1; this.ano_comparativa++;
    }
    this.semana_comparativa = week;
    var data = this.getDateOfWeek(week, this.ano_comparativa);
    this.datacomparativa1 = data;
    this.comparativa(data);
  }

  semanaanteriorcomparativa() {

    var week = this.semana_comparativa - 1;

    if (week <= 0) {
      this.ano_comparativa--;
      week = this.weeksInYear(this.ano_comparativa);
    }

    this.semana_comparativa = week;
    var data = this.getDateOfWeek(week, this.ano_comparativa);
    this.datacomparativa1 = data;
    this.comparativa(data);
  }


  semanaseguintesector() {

    var week = this.semana_sector + 1;
    var maxweek = this.weeksInYear(this.ano_sector);
    if (maxweek < week) {
      week = 1; this.ano_sector++;
    }
    this.semana_sector = week;
    var data = this.getDateOfWeek(week, this.ano_sector);
    this.datasector1 = data;
    this.carregasector(data);
  }

  semanaanteriorsector() {

    var week = this.semana_sector - 1;

    if (week <= 0) {
      this.ano_sector--;
      week = this.weeksInYear(this.ano_sector);
    }

    this.semana_sector = week;
    var data = this.getDateOfWeek(week, this.ano_sector);
    this.datasector1 = data;
    this.carregasector(data);
  }


  semanaseguintecadencias() {

    if (this.tipo_analise == 'semanal') {
      var week = this.semana_cadencias + 1;
      var maxweek = this.weeksInYear(this.ano_cadencias);
      if (maxweek < week) {
        week = 1; this.ano_cadencias++;
      }
      this.semana_cadencias = week;
      var data = this.getDateOfWeek(week, this.ano_cadencias);
      this.datacadencias1 = data;
      this.createRowData();
    } else if (this.tipo_analise == 'mensal') {
      var data2 = new Date(this.datacadencias1.setMonth(new Date(this.datacadencias1).getMonth() + 7));
      this.datacadencias1 = data2;
      this.createRowData();
    }
  }

  semanaanteriorcadencias() {
    if (this.tipo_analise == 'semanal') {

      var week = this.semana_cadencias - 1;

      if (week <= 0) {
        this.ano_cadencias--;
        week = this.weeksInYear(this.ano_cadencias);
      }

      this.semana_cadencias = week;
      var data = this.getDateOfWeek(week, this.ano_cadencias);
      this.datacadencias1 = data;
      this.createRowData();
    } else if (this.tipo_analise == 'mensal') {
      var data2 = new Date(this.datacadencias1.setMonth(new Date(this.datacadencias1).getMonth() - 7));
      this.datacadencias1 = data2;
      this.createRowData();
    }

  }


  semanaseguintecadencias_func() {

    if (this.tipo_analisecadencias_funcionario == 'semanal') {
      var week = this.semana_cadencias_funcionario + 1;
      var maxweek = this.weeksInYear(this.ano_cadencias_funcionario);
      if (maxweek < week) {
        week = 1; this.ano_cadencias_funcionario++;
      }
      this.semana_cadencias_funcionario = week;
      var data = this.getDateOfWeek(week, this.ano_cadencias_funcionario);
      this.datacadencias_funcionario = data;
      this.createRowData_func();
    } else if (this.tipo_analisecadencias_funcionario == 'mensal') {
      var data2 = new Date(this.datacadencias_funcionario.setMonth(new Date(this.datacadencias_funcionario).getMonth() + 7));
      this.datacadencias_funcionario = data2;
      this.createRowData_func();
    }
  }

  semanaanteriorcadencias_func() {
    if (this.tipo_analisecadencias_funcionario == 'semanal') {
      var week = this.semana_cadencias_funcionario - 1;

      if (week <= 0) {
        this.ano_cadencias_funcionario--;
        week = this.weeksInYear(this.ano_cadencias_funcionario);
      }

      this.semana_cadencias = week;
      var data = this.getDateOfWeek(week, this.ano_cadencias_funcionario);
      this.datacadencias_funcionario = data;
      this.createRowData_func();
    } else if (this.tipo_analisecadencias_funcionario == 'mensal') {
      var data2 = new Date(this.datacadencias_funcionario.setMonth(new Date(this.datacadencias_funcionario).getMonth() - 7));
      this.datacadencias_funcionario = data2;
      this.createRowData_func();
    }
  }


  getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7);

    return new Date(y, 0, d);
  }


  abrirAssiduidade(numero) {
    this.data_assiduidade = this.datageral;
    this.operarioAssiduidade = numero;
    this.resetActive(null, 'assiduidade', true);
    this.classstep = 'assiduidade';
  }

  abrirProdutividade(numero) {
    this.dataprodutividade1 = this.data_assiduidade;
    this.dataprodutividade2 = this.data_assiduidade;
    this.operarioProdutividade = numero;
    this.resetActive(null, 'produtividade', true);
    this.classstep = 'produtividade';
  }

  abrirOperacoes(numero) {
    this.dataoperacoes1 = this.dataprodutividade1;
    this.dataoperacoes2 = this.dataprodutividade2;

    this.operarioOperacoes = numero;
    this.resetActive(null, 'operacoes', true);
    this.classstep = 'operacoes';
  }
  abrirSectoreNumero(numero) {
    this.datasector1 = this.dataoperacoes1;
    this.operariosector = numero;
    this.resetActive(null, 'sector', true);
    this.classstep = 'sector';
  }

  abrirOperacoessector(numero) {
    var d = this.datasector1;
    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);
    var array = this.getDatesOfWeek(data);
    this.dataoperacoes1 = array[0];
    this.dataoperacoes2 = array[6];

    this.operarioOperacoes = numero;
    this.resetActive(null, 'operacoes', true);
    this.classstep = 'operacoes';
  }

  abrirSectores(numero) {
    this.sector = [];
    this.sector.push(numero);
    this.resetActive(null, 'sector', true);
    this.classstep = 'sector';
    this.dialogsector = false;
  }

  getDatesOfWeek(date) {


    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    var firstDateOfWeek = new Date(date.setDate(diff));
    var datesOfMonthOnWeek = [];

    for (var i = 0; i < 7; i++) {

      datesOfMonthOnWeek.push(
        new Date(+firstDateOfWeek));

      firstDateOfWeek.setDate(
        firstDateOfWeek.getDate() + 1);
    }

    return datesOfMonthOnWeek;
  }


  getDatesOfYear(date: Date) {

    var datesOfMonthOnWeek = [];
    for (var i = 0; i < 7; i++) {
      var data = new Date(date.setMonth(date.getMonth() + 1));
      datesOfMonthOnWeek.push(
        data);

    }

    return datesOfMonthOnWeek;
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }



  weeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = this.getWeekNumber(d)[1];
    return week == 1 ? this.getWeekNumber(d.setDate(24))[1] : week;
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart.getTime()) / 86400000) + 1) / 7)
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  }

  resetActive(event, step, atualiza = false) {
    this.classstep = step;
    if (step == 'geral' && (atualiza || (this.tabelageral.length == 0 && !this.loadingtabelageral))) {
      this.carregarGeral();
    } else if (step == 'assiduidade' && (atualiza || (this.tabelaassiduidade.length == 0 && !this.loadingtabelaassiduidade))) {
      this.carregaassiduidade(this.data_assiduidade);
    } else if (step == 'produtividade' && (atualiza || (this.tabelprodutividade.length == 0 && !this.loadingtabelprodutividade))) {
      this.carregaProdutividade();
    } else if (step == 'operacoes' && (atualiza || (this.tabelaoperacoes.length == 0))) {
      //this.carregaOperacoes();
    } else if (step == 'comparativa' && (atualiza || (this.tabelacomparativa.length == 0))) {
      //this.comparativa(this.datacomparativa1);
    } else if (step == 'sector' && (atualiza || (this.tabelasectores.length == 0))) {
      //this.carregasector(this.datasector1);
    } else if (step == 'pausas' && (atualiza || (this.tabelapausas.length == 0))) {
      this.carregapausas();
    } else if (step == 'cadencias' && (atualiza || (this.rowData.length == 0))) {
      //this.createRowData();
    } else if (step == 'cadencias_funcionario' && (atualiza || (this.rowData.length == 0))) {
      //this.createRowData_func();
    }

    if (step == 'assiduidade') {
      this.imprimirpdf = true;
    } else if (step == 'geral') {
      this.imprimirpdf = true;
    } else if (step == 'produtividade') {
      this.imprimirpdf = true;
    } else if (step == 'operacoes') {
      this.imprimirpdf = true;
    } else if (step == 'comparativa') {
      this.imprimirpdf = true;
    } else if (step == 'sector') {
      this.imprimirpdf = true;
    } else if (step == 'pausas') {
      this.imprimirpdf = true;
    } else if (step == 'cadencias') {
      this.imprimirpdf = false;
    } else if (step == 'cadencias_funcionario') {
      this.imprimirpdf = false;
    }

  }



  atualizar(tab) {
    if (tab == 'assiduidade') {
      this.carregaassiduidade(this.data_assiduidade);
    } else if (tab == 'geral') {
      this.carregarGeral();
    } else if (tab == 'produtividade') {
      this.carregaProdutividade();
    } else if (tab == 'operacoes') {
      this.carregaOperacoes();
    } else if (tab == 'comparativa') {
      this.comparativa(this.datacomparativa1);
    } else if (tab == 'sector') {
      this.carregasector(this.datasector1);
    } else if (tab == 'pausas') {
      this.carregapausas();
    } else if (tab == 'cadencias') {
      this.createRowData();
    } else if (tab == 'cadencias_funcionario') {
      this.createRowData_func();
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

  //formatar a data para yyyy-mm-dd
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
    } else {
      return [mes, ano].join('/');
    }
  }

  getTime(time_prep) {
    var time_prep1 = time_prep;
    if (time_prep < 0) time_prep = time_prep * -1;
    var hourDiff = time_prep; //in ms
    var hours = Math.floor(hourDiff / 3.6e6);
    var minutes = Math.floor((hourDiff % 3.6e6) / 6e4);
    var seconds = Math.floor((hourDiff % 6e4) / 1000);
    return ((time_prep1 < 0) ? "-" : "") + this.pad(hours, 2) + ":" + this.pad(minutes, 2) + ":" + this.pad(seconds, 2);
  }

  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  timeToDecimal(t) {
    if (t == '00:00:00') {
      return 0;
    } else {
      var splitted_pausa = t.split(":", 3);
      return parseInt(splitted_pausa[0]) * 3600000 + parseInt(splitted_pausa[1]) * 60000 + parseInt(splitted_pausa[2]) * 1000;
    }
  }

  //calcular total linhas Produtividade
  calculateGroupTotal(dados) {
    let produtividade_media = 0;
    let produtividade_horasregistadas = 0;
    let produtividade_totalextras = 0;
    let produtividade_totalfaltas = 0;
    let produtividade_totaltrabalhadas = 0;
    let produtividade_totaltrabalhadas2 = 0;
    this.produtividade_media = 0;


    for (let campo of dados.filteredValue) {
      //produtividade_media += campo.racio_horas;
      produtividade_horasregistadas += this.timeToDecimal(campo.horas_registadas);
      for (var x in campo.total_extras) {
        produtividade_totalextras += this.timeToDecimal(campo.total_extras[x]);
      }
      for (var x in campo.total_faltas) {
        produtividade_totalfaltas += this.timeToDecimal(campo.total_faltas[x]);
      }
      /*produtividade_totalextras += this.timeToDecimal(campo.total_extras);
      produtividade_totalfaltas += this.timeToDecimal(campo.total_faltas);*/
      produtividade_totaltrabalhadas += this.timeToDecimal(campo.total_horas);
      produtividade_totaltrabalhadas2 += campo.total_horas2;
    }


    //   this.produtividade_media = this.round((dados.filteredValue.length / (produtividade_horasregistadas) / 3600000));
    if (produtividade_horasregistadas > 0) this.produtividade_media = this.round((produtividade_horasregistadas / 3600000) / (produtividade_totaltrabalhadas2 / 3600000) * 100);
    if (this.produtividade_media.toString() == 'Infinity') this.produtividade_media = 0;
    this.produtividade_horasregistadas = this.getTime(produtividade_horasregistadas);
    this.produtividade_totalextras = this.getTime(produtividade_totalextras);
    this.produtividade_totalfaltas = this.getTime(produtividade_totalfaltas);
    this.produtividade_totaltrabalhadas = this.getTime(produtividade_totaltrabalhadas);

  }


  //calcular total linhas pausas
  calculateGroupTotal3(dados) {
    let pausas_tempo_prep = 0;
    let pausas_tempo_exec = 0;
    let pausas_tempo_total = 0;

    for (let campo of dados.filteredValue) {
      pausas_tempo_prep += campo.pausas_tempo_prep;
      pausas_tempo_exec += campo.pausas_tempo_exec;
      pausas_tempo_total += campo.pausas_tempo_total;
    }
    this.pausas_tempo_prep = this.getTime(pausas_tempo_prep * 3600000);
    this.pausas_tempo_exec = this.getTime(pausas_tempo_exec * 3600000);
    this.pausas_tempo_total = this.getTime(pausas_tempo_total * 3600000);
    this.total_operacoes = dados.filteredValue.length;
  }


  //calcular total linhas Operações
  calculateGroupTotal2(dados) {
    let operacoes_qtd_revista = 0;
    let operacoes_tempo_prep = 0;
    let operacoes_tempo_exec = 0;
    let operacoes_cadencia = 0;
    let operacoes_tempo_total = 0;

    for (let campo of dados.filteredValue) {
      operacoes_qtd_revista += campo.quant_revistas;
      operacoes_tempo_prep += campo.operacoes_tempo_prep;
      operacoes_tempo_exec += campo.operacoes_tempo_exec;
      operacoes_tempo_total += campo.operacoes_tempo_total;
      operacoes_cadencia += campo.cadencia;
    }
    this.operacoes_qtd_revista = this.round(operacoes_qtd_revista);
    this.operacoes_cadencia = (dados.filteredValue.length > 0) ? this.round(operacoes_cadencia / dados.filteredValue.length) : 0;
    this.operacoes_tempo_prep = this.getTime(operacoes_tempo_prep * 3600000);
    this.operacoes_tempo_exec = this.getTime(operacoes_tempo_exec * 3600000);
    this.operacoes_tempo_total = this.getTime(operacoes_tempo_total * 3600000);
    this.total_operacoes = dados.filteredValue.length;
  }


  //calcular total linhas Comparativa sectores
  calculateGroupTotalComparativa(dados, dados2 = null) {
    let media_total_comparativa1 = 0;
    let media_total_comparativa2 = 0;
    let media_total_comparativa3 = 0;
    let media_total_comparativa4 = 0;
    let media_total_comparativa5 = 0;
    let media_total_comparativa6 = 0;
    let media_total_comparativa7 = 0;
    let media_geral_comparativa = 0;

    var tabela = dados2;
    if (dados != null) {
      tabela = dados.filteredValue;
    }


    for (let campo of tabela) {
      //produtividade_media += campo.racio_horas;
      media_total_comparativa1 += campo.data1[0];
      media_total_comparativa2 += campo.data2[0];
      media_total_comparativa3 += campo.data3[0];
      media_total_comparativa4 += campo.data4[0];
      media_total_comparativa5 += campo.data5[0];
      media_total_comparativa6 += campo.data6[0];
      media_total_comparativa7 += campo.data7[0];
      media_geral_comparativa += campo.media[0];
    }


    this.media_total_comparativa1 = (media_total_comparativa1 == 0) ? 0 : this.round((media_total_comparativa1 / tabela.length));
    this.media_total_comparativa2 = (media_total_comparativa2 == 0) ? 0 : this.round((media_total_comparativa2 / tabela.length));
    this.media_total_comparativa3 = (media_total_comparativa3 == 0) ? 0 : this.round((media_total_comparativa3 / tabela.length));
    this.media_total_comparativa4 = (media_total_comparativa4 == 0) ? 0 : this.round((media_total_comparativa4 / tabela.length));
    this.media_total_comparativa5 = (media_total_comparativa5 == 0) ? 0 : this.round((media_total_comparativa5 / tabela.length));
    this.media_total_comparativa6 = (media_total_comparativa6 == 0) ? 0 : this.round((media_total_comparativa6 / tabela.length));
    this.media_total_comparativa7 = (media_total_comparativa7 == 0) ? 0 : this.round((media_total_comparativa7 / tabela.length));
    this.media_geral_comparativa = (media_geral_comparativa == 0) ? 0 : this.round((media_geral_comparativa / tabela.length));


  }


  //calcular total linhas Sector
  calculateGroupTotalSectores(dados, dados2 = null) {
    let media_total_sector1 = 0;
    let media_total_sector2 = 0;
    let media_total_sector3 = 0;
    let media_total_sector4 = 0;
    let media_total_sector5 = 0;
    let media_total_sector6 = 0;
    let media_total_sector7 = 0;
    let media_geral_sector = 0;


    var tabela = dados2;
    if (dados != null) {
      tabela = dados.filteredValue;
    }
    for (let campo of tabela) {
      //produtividade_media += campo.racio_horas;
      media_total_sector1 += campo.data1[0];
      media_total_sector2 += campo.data2[0];
      media_total_sector3 += campo.data3[0];
      media_total_sector4 += campo.data4[0];
      media_total_sector5 += campo.data5[0];
      media_total_sector6 += campo.data6[0];
      media_total_sector7 += campo.data7[0];
      media_geral_sector += campo.media[0];
    }


    this.media_total_sector1 = (media_total_sector1 == 0) ? 0 : this.round((media_total_sector1 / tabela.length));
    this.media_total_sector2 = (media_total_sector2 == 0) ? 0 : this.round((media_total_sector2 / tabela.length));
    this.media_total_sector3 = (media_total_sector3 == 0) ? 0 : this.round((media_total_sector3 / tabela.length));
    this.media_total_sector4 = (media_total_sector4 == 0) ? 0 : this.round((media_total_sector4 / tabela.length));
    this.media_total_sector5 = (media_total_sector5 == 0) ? 0 : this.round((media_total_sector5 / tabela.length));
    this.media_total_sector6 = (media_total_sector6 == 0) ? 0 : this.round((media_total_sector6 / tabela.length));
    this.media_total_sector7 = (media_total_sector7 == 0) ? 0 : this.round((media_total_sector7 / tabela.length));
    this.media_geral_sector = (media_geral_sector == 0) ? 0 : this.round((media_geral_sector / tabela.length));

  }

  round(value) {
    if (value == null) {
      return 0;
    }
    return Math.round(value * 100) / 100;
  }

  hoverSector(event, data, overlaypanel) {

    this.RHSECTORESService.getbyID(data.cod_sector).subscribe(
      response => {
        for (var x in response) {
          this.SECTOR_cod_SECTOR = response[x][0].cod_SECTOR;
          this.SECTOR_data_INICIO = (response[x][0].data_INICIO != null) ? new Date(response[x][0].data_INICIO) : null;
          this.SECTOR_data_FIM = (response[x][0].data_FIM != null) ? new Date(response[x][0].data_FIM) : null;
          this.SECTOR_estado = (response[x][0].estado) ? "Ativo" : "Inativo";
          this.SECTOR_chefe1 = response[x][1];
          this.SECTOR_chefe2 = response[x][2];
          this.SECTOR_local = response[x][0].local;
          this.SECTOR_racio_MIN = response[x][0].racio_MIN;
          this.SECTOR_racio_MAX = response[x][0].racio_MAX;
          this.SECTOR_des_SECTOR = response[x][0].des_SECTOR;
        }
        this.dialogsector = true;
      },
      error => console.log(error));

    // overlaypanel.toggle(event, event.target);
  }



  hoverTurno(event, data, overlaypanel) {

    this.RHTURNOSService.getbyID(data.cod_turno).subscribe(
      response => {
        for (var x in response) {
          this.TURNO_cod_TURNO = response[x].cod_TURNO;
          this.TURNO_des_TURNO = response[x].des_TURNO;
          this.TURNO_data_INICIO = (response[x].data_INICIO != null) ? new Date(response[x].data_INICIO) : null;
          this.TURNO_hora_INICIO = response[x].hora_INICIO;
          this.TURNO_data_FIM = (response[x].data_FIM != null) ? new Date(response[x].data_FIM) : null;
          this.TURNO_hora_FIM = response[x].hora_FIM;
          this.TURNO_estado = (response[x].estado) ? "Ativo" : "Inativo";
        }

        this.dialogturno = true;
      },
      error => console.log(error));
    //overlaypanel.toggle(event, event.target);
  }


  imprimir(formato) {
    if (this.classstep == 'cadencias') {
      if (formato == 'xlsx') this.gridOptions.api.exportDataAsExcel();
    } else if (this.classstep == 'cadencias_funcionario') {
      if (formato == 'xlsx') this.gridOptions_func.api.exportDataAsExcel();
    } else {
      var filename = new Date().toLocaleString().replace(/\D/g, '');
      var filenametransfer = "";

      var data;
      var dados = [];
      if (this["tabela" + this.classstep + "comp"].filteredValue) {
        dados = this["tabela" + this.classstep + "comp"].filteredValue;
      } else {
        dados = this["tabela" + this.classstep + "comp"]._value;
      }
      //console.log(JSON.stringify(dados))
      if (this.classstep == 'assiduidade') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.data_assiduidade), ATIVO: this.ativoAssiduidade, OPERARIO: this.operarioAssiduidade }];
        filenametransfer = "assiduidade";
      } else if (this.classstep == 'geral') {

        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.datageral), ATIVO: this.ativoGeral, OPERARIO: this.operarioGeral }];
        filenametransfer = "geral";
      } else if (this.classstep == 'produtividade') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.dataprodutividade1), DATA2: this.formatDate(this.dataprodutividade2), ATIVO: this.ativoProdutividade, OPERARIO: this.operarioProdutividade }];
        filenametransfer = "produtividade";
      } else if (this.classstep == 'operacoes') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.dataoperacoes1), DATA2: this.formatDate(this.dataoperacoes2), ATIVO: this.ativoOperacoes, OPERARIO: this.operarioOperacoes, SECTOR: (this.sector_operacao != null) ? this.sector_operacao.toString() : null }];
        filenametransfer = "operacoes";
      } else if (this.classstep == 'comparativa') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.datacomparativa1), ATIVO: this.ativocomparativa, SECTOR: (this.sector_comparativa != null) ? this.sector_comparativa.toString() : null }];
        filenametransfer = "comparativa";
      } else if (this.classstep == 'sector') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.datasector1), ATIVO: this.ativoSector, OPERARIO: this.operariosector, SECTOR: (this.sector != null) ? this.sector.toString() : null }];
        filenametransfer = "sector";

      } else if (this.classstep == 'pausas') {
        data = [{ dados: JSON.stringify(dados), DATA: this.formatDate(this.datapausas1), DATA2: this.formatDate(this.datapausas2), ATIVO: this.ativopausas, OPERARIO: this.operariopausas }];
        filenametransfer = "pausas";
      }

      this.RelatoriosService.downloadPDF2(formato, filename, data, filenametransfer, "recursos_humanos").subscribe(
        (res) => {
          FileSaver.saveAs(res, filenametransfer);
          /*this.fileURL = URL.createObjectURL(res);
          this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);*/
        }
      );
    }
  }

  atualizatipo_analise(event) {


    // this.createRowData()
  }

  createRowData() {
    this.gridApi.showLoadingOverlay();
    var datat = [{
      TIPO_CADENCIA: this.tipo_cadencia_candencia,
      SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null,
      DATA1: this.formatDate(this.datacadencias1), ATIVO: this.ativocadencias,
      OPERARIO: this.operariocadencias, SECTOR: (this.sector_cadencias != null) ? this.sector_cadencias.toString() : null,
      TIPO_ANALISE: this.tipo_analise
    }];


    var d = new Date(this.datacadencias1);
    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);
    var array = this.getDatesOfWeek(data);
    this.semana_ano_cadencias = "Semana nº " + weekNo + '/' + ano;

    if (this.tipo_analise == 'mensal') {
      weekNo = d.getMonth();
      this.semana_ano_cadencias = "Mensal";
      array = this.getDatesOfYear(new Date(d.setMonth(weekNo - 7)));
    }

    this.semana_cadencias = weekNo;
    this.ano_cadencias = ano;




    /*if (update) {
      this.rowData1 = [];
      this.gridOptions.api.showLoadingOverlay();
      // this.componentes(this.fam_temp, inicio, this.date_temp, this.date2_temp, this.ref_temp, this.user_temp, this.op_temp);
    } else {*/

    this.rowData1 = [];
    this.gridApi.showLoadingOverlay();
    this.loadingcadencia = true;
    this.columnDefs = [];
    this.colunas(array, datat);

    /*  }*/

  }


  createRowData_func() {
    this.gridApi_func.showLoadingOverlay();
    var datat = [{
      TIPO_CADENCIA: this.tipo_cadencia_cadencias_funcionario,
      SECTOR_ACESSO: (this.sectores_acesso != null) ? this.sectores_acesso.toString() : null,
      DATA1: this.formatDate(this.datacadencias_funcionario), ATIVO: this.ativocadencias_funcionario,
      OPERARIO: this.operariocadencias_funcionario, SECTOR: (this.sector_cadencias_funcionario != null) ? this.sector_cadencias_funcionario.toString() : null,
      TIPO_ANALISE: this.tipo_analisecadencias_funcionario
    }];


    var d = new Date(this.datacadencias_funcionario);
    var ano = d.getUTCFullYear();
    var weekNo = this.getWeek(d);
    var data = this.getDateOfWeek(weekNo, ano);
    var array = this.getDatesOfWeek(data);
    this.semana_ano_cadencias_funcionario = "Semana nº " + weekNo + '/' + ano;

    if (this.tipo_analise == 'mensal') {
      weekNo = d.getMonth();
      this.semana_ano_cadencias_funcionario = "Mensal";
      array = this.getDatesOfYear(new Date(d.setMonth(weekNo - 7)));
    }

    this.semana_cadencias_funcionario = weekNo;
    this.ano_cadencias_funcionario = ano;




    /*if (update) {
      this.rowData1 = [];
      this.gridOptions.api.showLoadingOverlay();
      // this.componentes(this.fam_temp, inicio, this.date_temp, this.date2_temp, this.ref_temp, this.user_temp, this.op_temp);
    } else {*/

    this.rowData1_func = [];
    this.gridApi_func.showLoadingOverlay();
    this.loadingcadencia_func = true;
    this.columnDefs_func = [];
    this.colunas_func(array, datat);

    /*  }*/

  }

  colunas(array, datat) {
    //this.gridOptions.api.showLoadingOverlay();
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Referência", field: "ref", width: 120, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Operação", field: "operacao", width: 120, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Operário", field: "operario", width: 135, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Ativo", field: "ativo", width: 125, filter: 'text', cellRenderer: regionRenderer, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Local", filter: 'text', field: "local", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: false, headerName: "Responsável", filter: 'text', field: "responsavel", cellRenderer: regionRenderer, aggFunc: "last", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: false, headerName: "Sector", filter: 'text', field: "sector", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, hide: true, headerName: "Chefe", filter: 'text', field: "chefe", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });

    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[0], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data0", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[1], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data1", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[2], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data2", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[3], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data3", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[4], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data4", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[5], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data5", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[6], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data6", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs.push({
      field: 'total',
      cellStyle: { 'text-align': 'right' },
      valueFormatter: currencyFormatter,
      headerName: "Total",
      valueGetter: function (params) {
        //"(data.data1 + data.data2 + data.data3 + data.data4 + data.data5 + data.data6+ data.data0)/7",
        var count = 0;
        var total = 0;
        var valor = 0;
        var data = params.data;
        if (data.data1 > 0) count++;
        if (data.data2 > 0) count++;
        if (data.data3 > 0) count++;
        if (data.data4 > 0) count++;
        if (data.data5 > 0) count++;
        if (data.data6 > 0) count++;
        if (data.data0 > 0) count++;

        if (count > 0) {
          valor = (data.data1 + data.data2 + data.data3 + data.data4 + data.data5 + data.data6 + data.data0) / count;
        } else {
          valor = 0.00;
        }
        return valor;
      },
      editable: false,
      aggFunc: myCustomAggFunc,
      cellClass: "total-col"
    })


    this.gridOptions.alignedGrids.push(this.bottomOptions);
    this.bottomOptions.alignedGrids.push(this.gridOptions);
    //this.gridOptions.api.hideOverlay();
    this.dados(array, datat);
    //if (this.famSeleccionadas.length == 0) if (inicio) this.configuracoes(null);
  }


  colunas_func(array, datat) {
    //this.gridOptions.api.showLoadingOverlay();

    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Operário", field: "operario", width: 135, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Operação", field: "operacao", width: 120, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Referência", field: "ref", width: 120, rowGroup: true, filter: 'text', menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Ativo", field: "ativo", width: 125, filter: 'text', cellRenderer: regionRenderer, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Local", filter: 'text', field: "local", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: false, headerName: "Responsável", filter: 'text', field: "responsavel", cellRenderer: regionRenderer, aggFunc: "last", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: false, headerName: "Sector", filter: 'text', field: "sector", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, hide: true, headerName: "Chefe", filter: 'text', field: "chefe", width: 120, cellRenderer: regionRenderer, aggFunc: "last", menuTabs: ["filterMenuTab", "columnsMenuTab"] });

    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[0], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data0", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[1], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data1", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[2], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data2", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[3], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data3", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[4], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data4", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[5], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data5", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({ resizable: true, cellStyle: { 'text-align': 'right' }, filter: "number", headerName: this.formatDate2(array[6], this.tipo_analise), valueFormatter: currencyFormatter, aggFunc: myCustomAggFunc, field: "data6", width: 120, menuTabs: ["filterMenuTab", "columnsMenuTab"] });
    this.columnDefs_func.push({
      field: 'total',
      cellStyle: { 'text-align': 'right' },
      valueFormatter: currencyFormatter,
      headerName: "Total",
      valueGetter: function (params) {
        //"(data.data1 + data.data2 + data.data3 + data.data4 + data.data5 + data.data6+ data.data0)/7",
        var count = 0;
        var total = 0;
        var valor = 0;
        var data = params.data;
        if (data.data1 > 0) count++;
        if (data.data2 > 0) count++;
        if (data.data3 > 0) count++;
        if (data.data4 > 0) count++;
        if (data.data5 > 0) count++;
        if (data.data6 > 0) count++;
        if (data.data0 > 0) count++;

        if (count > 0) {
          valor = (data.data1 + data.data2 + data.data3 + data.data4 + data.data5 + data.data6 + data.data0) / count;
        } else {
          valor = 0.00;
        }
        return valor;
      },
      editable: false,
      aggFunc: myCustomAggFunc,
      cellClass: "total-col"
    })


    this.gridOptions_func.alignedGrids.push(this.bottomOptions_func);
    this.bottomOptions_func.alignedGrids.push(this.gridOptions_func);
    //this.gridOptions.api.hideOverlay();
    this.dados_func(array, datat);
    //if (this.famSeleccionadas.length == 0) if (inicio) this.configuracoes(null);
  }

  dados(array, datat) {

    this.rowData1 = [];
    this.RHFUNCIONARIOSService.getCadencias(datat).subscribe(
      response => {
        // console.log(response)
        var total = Object.keys(response).length;
        if (total > 0) {
          /*for (var x in response) {
            var numero_op = response[x][1];
            if (response[x][1] < 0) numero_op = numero_op * -1;
            if (numero_op < 100) {
              numero_op = ("00" + numero_op).slice(-3);
            }

            var linha = this.rowData1.findIndex(item => item.ref == response[x][10] && item.operacao == response[x][12]
              && item.cod_operario == numero_op && item.heudeb == response[x][15] && item.heufin == response[x][16]);
            var datai = array.findIndex(item => item == this.formatDate(response[x][9]));

            if (linha > 0) {
              this.rowData1[linha]["data" + (datai + 1)] = this.round(response[x][14]);
            } else {
              this.rowData1.push({
                ref: response[x][10], operacao: response[x][12], cod_operario: numero_op, operario: numero_op + '' + response[x][2],
                ativo: response[x][3], local: response[x][4], responsavel: response[x][5], sector: response[x][7],
                chefe: response[x][8], heudeb: response[x][15], heufin: response[x][16],
                data0: 0, data1: 0, data2: 0, data3: 0, data4: 0, data5: 0, data6: 0
              });
              this.rowData1.find(item => item.ref == response[x][10] && item.operacao == response[x][12]
                && item.cod_operario == numero_op && item.heudeb == response[x][15] && item.heufin == response[x][16])["data" + (datai + 1)] = this.round(response[x][14]);
            }

            // cadencia 14
          }*/
          // console.log(array)

          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          var count4 = 0;
          var count5 = 0;
          var count6 = 0;
          var count0 = 0;



          var data1 = 0.00;
          var data2 = 0.00;
          var data3 = 0.00;
          var data4 = 0.00;
          var data5 = 0.00;
          var data6 = 0.00;
          var data0 = 0.00;

          for (var x in response) {
            var numero_op = response[x][1];
            if (response[x][1] < 0) numero_op = numero_op * -1;
            if (numero_op < 100) {
              numero_op = ("00" + numero_op).slice(-3);
            }
            //var datai = array.findIndex(item => item == new Date(response[x][9]));
            var rowData = [];
            rowData['ref'] = response[x][10] + ' - ' + response[x][11];
            rowData['operacao'] = response[x][12] + ' - ' + response[x][13];
            rowData['cod_operario'] = numero_op;
            rowData['operario'] = numero_op + ' - ' + response[x][2];
            rowData['ativo'] = (response[x][3]) ? "Sim" : "Não";
            rowData['local'] = response[x][4];
            rowData['responsavel'] = response[x][5];
            rowData['sector'] = response[x][7];
            rowData['chefe'] = response[x][8];
            for (var y in array) {
              if (this.formatDate2(array[y], this.tipo_analise) == this.formatDate2(response[x][9], this.tipo_analise)) {
                rowData["data" + (parseInt(y))] = this.round(response[x][14]);
              } else {
                rowData["data" + (parseInt(y))] = 0.00;
              }
            }
            this.rowData1.push(rowData);
            /*if (rowData['data1'] > 0) count1++;
            if (rowData['data2'] > 0) count2++;
            if (rowData['data3'] > 0) count3++;
            if (rowData['data4'] > 0) count4++;
            if (rowData['data5'] > 0) count5++;
            if (rowData['data6'] > 0) count6++;
            if (rowData['data0'] > 0) count0++;*/

            data1 += rowData['data1'];
            data2 += rowData['data2'];
            data3 += rowData['data3'];
            data4 += rowData['data4'];
            data5 += rowData['data5'];
            data6 += rowData['data6'];
            data0 += rowData['data0'];
          }
          this.rowData = this.rowData1.slice();


          var valor = this.page_size;
          if (valor == 'todos') valor = this.rowData.length;
          if (this.gridOptions.api != null) this.gridOptions.api.paginationSetPageSize(Number(valor));

          setTimeout(() => {
            this.autoSizeAll();
            this.gridApi.sizeColumnsToFit();
            this.getRowData();
          }, 500);



          /* this.bottomData = [
             {
               chefe: 'Total',
               data1: data1 / count1,
               data2: data2 / count2,
               data3: data3 / count3,
               data4: data4 / count4,
               data5: data5 / count5,
               data6: data6 / count6,
               data0: data0 / count0
             }
           ];*/
        } else {
          this.rowData = [];
          this.bottomData = [];
          this.gridApi.showNoRowsOverlay();
        }
        //console.log(this.rowData1)
        this.loadingcadencia = false;
        //this.gridOptions.api.hideOverlay();
      },
      error => {
        this.rowData = [];
        this.gridApi.showNoRowsOverlay();
        console.log(error);
        this.loadingcadencia = false;
      });

  }


  dados_func(array, datat) {

    this.rowData1_func = [];
    this.RHFUNCIONARIOSService.getCadencias(datat).subscribe(
      response => {
        // console.log(response)
        var total = Object.keys(response).length;
        if (total > 0) {
          /*for (var x in response) {
            var numero_op = response[x][1];
            if (response[x][1] < 0) numero_op = numero_op * -1;
            if (numero_op < 100) {
              numero_op = ("00" + numero_op).slice(-3);
            }

            var linha = this.rowData1.findIndex(item => item.ref == response[x][10] && item.operacao == response[x][12]
              && item.cod_operario == numero_op && item.heudeb == response[x][15] && item.heufin == response[x][16]);
            var datai = array.findIndex(item => item == this.formatDate(response[x][9]));

            if (linha > 0) {
              this.rowData1[linha]["data" + (datai + 1)] = this.round(response[x][14]);
            } else {
              this.rowData1.push({
                ref: response[x][10], operacao: response[x][12], cod_operario: numero_op, operario: numero_op + '' + response[x][2],
                ativo: response[x][3], local: response[x][4], responsavel: response[x][5], sector: response[x][7],
                chefe: response[x][8], heudeb: response[x][15], heufin: response[x][16],
                data0: 0, data1: 0, data2: 0, data3: 0, data4: 0, data5: 0, data6: 0
              });
              this.rowData1.find(item => item.ref == response[x][10] && item.operacao == response[x][12]
                && item.cod_operario == numero_op && item.heudeb == response[x][15] && item.heufin == response[x][16])["data" + (datai + 1)] = this.round(response[x][14]);
            }

            // cadencia 14
          }*/
          // console.log(array)

          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          var count4 = 0;
          var count5 = 0;
          var count6 = 0;
          var count0 = 0;



          var data1 = 0.00;
          var data2 = 0.00;
          var data3 = 0.00;
          var data4 = 0.00;
          var data5 = 0.00;
          var data6 = 0.00;
          var data0 = 0.00;

          for (var x in response) {
            var numero_op = response[x][1];
            if (response[x][1] < 0) numero_op = numero_op * -1;
            if (numero_op < 100) {
              numero_op = ("00" + numero_op).slice(-3);
            }
            //var datai = array.findIndex(item => item == new Date(response[x][9]));
            var rowData = [];
            rowData['ref'] = response[x][10] + ' - ' + response[x][11];
            rowData['operacao'] = response[x][12] + ' - ' + response[x][13];
            rowData['cod_operario'] = numero_op;
            rowData['operario'] = numero_op + ' - ' + response[x][2];
            rowData['ativo'] = (response[x][3]) ? "Sim" : "Não";
            rowData['local'] = response[x][4];
            rowData['responsavel'] = response[x][5];
            rowData['sector'] = response[x][7];
            rowData['chefe'] = response[x][8];
            for (var y in array) {
              if (this.formatDate2(array[y], this.tipo_analisecadencias_funcionario) == this.formatDate2(response[x][9], this.tipo_analisecadencias_funcionario)) {
                rowData["data" + (parseInt(y))] = this.round(response[x][14]);
              } else {
                rowData["data" + (parseInt(y))] = 0.00;
              }
            }
            this.rowData1_func.push(rowData);
            /*if (rowData['data1'] > 0) count1++;
            if (rowData['data2'] > 0) count2++;
            if (rowData['data3'] > 0) count3++;
            if (rowData['data4'] > 0) count4++;
            if (rowData['data5'] > 0) count5++;
            if (rowData['data6'] > 0) count6++;
            if (rowData['data0'] > 0) count0++;*/

            data1 += rowData['data1'];
            data2 += rowData['data2'];
            data3 += rowData['data3'];
            data4 += rowData['data4'];
            data5 += rowData['data5'];
            data6 += rowData['data6'];
            data0 += rowData['data0'];
          }
          this.rowData_func = this.rowData1_func.slice();


          var valor = this.page_size_func;
          if (valor == 'todos') valor = this.rowData_func.length;
          if (this.gridOptions_func.api != null) this.gridOptions_func.api.paginationSetPageSize(Number(valor));

          setTimeout(() => {
            this.autoSizeAl_func();
            this.gridApi_func.sizeColumnsToFit();
            this.getRowData_func();
          }, 500);



          /* this.bottomData = [
             {
               chefe: 'Total',
               data1: data1 / count1,
               data2: data2 / count2,
               data3: data3 / count3,
               data4: data4 / count4,
               data5: data5 / count5,
               data6: data6 / count6,
               data0: data0 / count0
             }
           ];*/
        } else {
          this.rowData_func = [];
          this.bottomData_func = [];
          this.gridApi_func.showNoRowsOverlay();
        }
        //console.log(this.rowData1)
        this.loadingcadencia_func = false;
        //this.gridOptions.api.hideOverlay();
      },
      error => {
        this.rowData_func = [];
        this.gridApi_func.showNoRowsOverlay();
        console.log(error);
        this.loadingcadencia_func = false;
      });

  }

  autoSizeAll() {
    var allColumnIds = [];
    allColumnIds.push('ag-Grid-AutoColumn');
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  filtertabelatabelaassiduidadecomp_filter(valor, coluna, filtro_modo, dt) {
    dt.filter(valor, coluna, filtro_modo);
  }

  autoSizeAl_func() {
    var allColumnIds = [];
    allColumnIds.push('ag-Grid-AutoColumn');
    this.gridColumnApi_func.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi_func.autoSizeColumns(allColumnIds);
  }



  onPaginationChanged() {
    if (this.gridOptions.api) {
      setText("#lbCurrentPage", this.gridOptions.api.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridOptions.api.paginationGetTotalPages());
      this.setLastButtonDisabled(!this.gridOptions.api.paginationIsLastPageFound());
    }
  }

  onPaginationChanged_func() {
    if (this.gridOptions_func.api) {
      setText("#lbCurrentPage", this.gridOptions_func.api.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridOptions_func.api.paginationGetTotalPages());
      this.ultimodisabled_func(!this.gridOptions_func.api.paginationIsLastPageFound());
    }
  }

  setLastButtonDisabled(disabled) {
    this.ultimodisable = disabled;
  }

  ultimodisabled_func(disabled) {
    this.ultimodisable_func = disabled;
  }

  getRowData() {
    //var rowData = [];
    var count0 = 0;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    var data5 = 0;
    var data6 = 0;
    var data0 = 0;
    this.gridApi.forEachNodeAfterFilterAndSort(function (node) {
      if (node.data != null) {
        if (node.data.data1 > 0) count1++;
        if (node.data.data2 > 0) count2++;
        if (node.data.data3 > 0) count3++;
        if (node.data.data4 > 0) count4++;
        if (node.data.data5 > 0) count5++;
        if (node.data.data6 > 0) count6++;
        if (node.data.data0 > 0) count0++;
        data1 += node.data.data1;
        data2 += node.data.data2;
        data3 += node.data.data3;
        data4 += node.data.data4;
        data5 += node.data.data5;
        data6 += node.data.data6;
        data0 += node.data.data0;
      }
      //rowData.push(node.data);
    });

    this.bottomData = [
      {
        chefe: 'Total',
        data1: data1 / count1,
        data2: data2 / count2,
        data3: data3 / count3,
        data4: data4 / count4,
        data5: data5 / count5,
        data6: data6 / count6,
        data0: data0 / count0
      }
    ];
  }

  getRowData_func() {
    //var rowData = [];
    var count0 = 0;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    var data5 = 0;
    var data6 = 0;
    var data0 = 0;
    this.gridApi_func.forEachNodeAfterFilterAndSort(function (node) {
      if (node.data != null) {
        if (node.data.data1 > 0) count1++;
        if (node.data.data2 > 0) count2++;
        if (node.data.data3 > 0) count3++;
        if (node.data.data4 > 0) count4++;
        if (node.data.data5 > 0) count5++;
        if (node.data.data6 > 0) count6++;
        if (node.data.data0 > 0) count0++;
        data1 += node.data.data1;
        data2 += node.data.data2;
        data3 += node.data.data3;
        data4 += node.data.data4;
        data5 += node.data.data5;
        data6 += node.data.data6;
        data0 += node.data.data0;
      }
      //rowData.push(node.data);
    });

    this.bottomData_func = [
      {
        chefe: 'Total',
        data1: data1 / count1,
        data2: data2 / count2,
        data3: data3 / count3,
        data4: data4 / count4,
        data5: data5 / count5,
        data6: data6 / count6,
        data0: data0 / count0
      }
    ];
  }

  onPageSizeChanged(value) {
    var valor = value.value
    if (valor == 'todos') valor = this.rowData.length;
    this.gridOptions.api.paginationSetPageSize(Number(valor));
  }

  onBtFirst() {
    this.gridOptions.api.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridOptions.api.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridOptions.api.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridOptions.api.paginationGoToPreviousPage();
  }


  onPageSizeChanged_func(value) {
    var valor = value.value
    if (valor == 'todos') valor = this.rowData_func.length;
    this.gridOptions_func.api.paginationSetPageSize(Number(valor));
  }

  onBtFirst_func() {
    this.gridOptions_func.api.paginationGoToFirstPage();
  }

  onBtLast_func() {
    this.gridOptions_func.api.paginationGoToLastPage();
  }

  onBtNext_func() {
    this.gridOptions_func.api.paginationGoToNextPage();
  }

  onBtPrevious_func() {
    this.gridOptions_func.api.paginationGoToPreviousPage();
  }

  private calculateRowCount() {
    //if (this.page_size == 'todos') this.gridOptions.api.paginationSetPageSize(Number(this.rowData.length));

    if (this.gridOptions.api && this.rowData) {
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }


  private calculateRowCount_func() {
    //if (this.page_size == 'todos') this.gridOptions.api.paginationSetPageSize(Number(this.rowData.length));

    if (this.gridOptions_func.api && this.rowData_func) {
      var model = this.gridOptions_func.api.getModel();
      var totalRows = this.rowData_func.length;
      var processedRows = model.getRowCount();
      this.rowCount_func = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  private onModelUpdated() {
    //console.log('onModelUpdated');
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //console.log('onReady');
    this.gridOptions.api.addAggFunc('abc', myCustomAggFunc);

    params.api.sizeColumnsToFit();

    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    this.calculateRowCount();
  }

  public onReady_func(params) {
    this.gridApi_func = params.api;
    this.gridColumnApi_func = params.columnApi;
    //console.log('onReady');
    this.gridOptions_func.api.addAggFunc('abc', myCustomAggFunc);

    params.api.sizeColumnsToFit();

    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    this.calculateRowCount_func();
  }



  private onCellClicked($event) {
    //console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event) {
    //console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event) {
    // console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event) {
    // console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event) {
    // console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  private onRowSelected($event) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onSelectionChanged() {
    //console.log('selectionChanged');
  }

  private onBeforeFilterChanged() {
    //console.log('beforeFilterChanged');
  }

  private onAfterFilterChanged() {
    //console.log('afterFilterChanged');
  }

  private onFilterModified() {
    // console.log('onFilterModified');
  }

  private onBeforeSortChanged() {
    // console.log('onBeforeSortChanged');
  }

  private onAfterSortChanged() {
    // console.log('onAfterSortChanged');
  }

  private onVirtualRowRemoved($event) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked(event) {
    //console.log(this.gridOptions.columnApi.getRowGroupColumns());
  }

  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public onQuickFilterChanged_func($event) {
    this.gridOptions_func.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    // console.log('onColumnEvent: ' + $event);
  }
}

function regionRenderer(params) {

  if (params.node.level != 2) {
    return "";
  } else {
    return params.value;
  }
}

function currencyFormatter(params) {
  if (params.value) {
    return formatNumber(params.value) + "%";
  } else {
    return 0.00 + "%";
  }
}
function formatNumber(number) {
  if (number.value != null) {
    return number.value.toFixed(2);
  } else {
    return number.toFixed(2);
  }

}

var ageType = 'everyone';

function isExternalFilterPresent() {
  // if ageType is not everyone, then we are filtering
  return ageType != 'everyone';
}

function doesExternalFilterPass(node) {
  switch (ageType) {
    case 'below30': return node.data.age < 30;
    case 'between30and50': return node.data.age >= 30 && node.data.age <= 50;
    case 'above50': return node.data.age > 50;
    case 'dateAfter2008': return asDate(node.data.date) > new Date(2008, 1, 1);
    default: return true;
  }
}

function asDate(dateAsString) {
  var splitFields = dateAsString.split("/");
  return new Date(splitFields[2], splitFields[1], splitFields[0]);
}

function setText(selector, text) {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).innerHTML = text;
  }

}


function myCustomAggFunc(values) {

  var sum = 0;
  var count = 0;
  values.forEach(function (value) {

    if (value > 0) count++;
    sum += value;

  });
  return (count > 0) ? sum / count : 0;
}