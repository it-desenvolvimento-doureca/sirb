import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable, ConfirmationService } from 'primeng/primeng';

import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { GridOptions } from 'ag-grid';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';
import { RegistoProducao } from 'app/servicos/registoproducao.service';
import { GERVISTASService } from 'app/servicos/ger-vistas.service';
import { GER_VISTAS } from 'app/entidades/GER_VISTAS';

@Component({
  selector: 'app-cartelas',
  templateUrl: './cartelas.component.html',
  styleUrls: ['./cartelas.component.css']
})
export class CartelasComponent {

  utilizadores = [];
  op_temp: any;
  user_temp: any;
  ref_temp: any;
  date2_temp: string;
  fam_temp: any;
  date_temp: string;
  selectedall: any = [];
  disCriar: boolean;
  disGravar: boolean;
  disEditar = true;
  utilizador: any;
  referencia: any;
  lote: any;
  tina: any;
  filterstate;
  sortstate;
  groupstate;
  colstate;
  csvData: any[];
  select_table: any;
  pinnedBottomRowData: any;
  domLayout: string;
  page_size;
  novo: boolean;
  texto_vista: any;
  displayVista: boolean;
  num_vista: any;
  user: number;
  array = [];
  columdefeito: any[];
  public gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  public rowData1: any[];
  private columnDefs: any[];
  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;
  public rowCount: string;
  public ultimodisable = false;
  paginasize = [{ label: '10', value: '10' }, { label: '100', value: '100' }, { label: '500', value: '500' }, { label: 'Todos', value: 'todos' }]
  config = [];

  // public dateComponentFramework: DateComponent;
  public HeaderGroupComponent = this.HeaderGroupComponent;


  constructor(private renderer: Renderer, private confirmationService: ConfirmationService, private GERVISTASService: GERVISTASService, private RegistoProducao: RegistoProducao, private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService) {
    this.page_size = '100';
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">A pesquisar..</span>';
    this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33editar");
    this.disGravar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33gravar");
    this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33criar");
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];




    //carregas vistas
    this.GERVISTASService.getbyid_pagina(2).subscribe(
      response => {
        //console.log(response)
        //this.config.push({ label: 'Sel. Vista', value: 0 });
        this.num_vista = 0;
        var primeiro = false;
        for (var x in response) {
          this.config.push({ label: response[x].descricao, value: response[x].id })
          this.array.push({
            adminedit: primeiro,
            id: response[x].id, descricao: response[x].descricao,
            colState: JSON.parse(response[x].colstate), sortState: JSON.parse(response[x].sortstate),
            groupState: JSON.parse(response[x].groupstate), filterState: JSON.parse(response[x].filterstate), familias: JSON.parse(response[x].familias)
          });
          //if (primeiro && response[x].familias != null && response[x].familias != "") this.famSeleccionadas = JSON.parse(response[x].familias);
          primeiro = false;
          this.num_vista = this.config[0].value;
        }
        this.createRowData(true);
      },
      error => console.log(error));

    //carrega utilizadores
    this.RegistoProducao.getUser().subscribe(
      response => {
        this.utilizadores.push({ label: "Seleccione Utilizador", value: null })
        for (var x in response) {
          this.utilizadores.push({ label: response[x].RESCOD + " - " + response[x].RESDES, value: response[x].RESCOD });
        }
        this.utilizadores = this.utilizadores.slice();
      },
      error => console.log(error));

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: null,
      showToolPanel: true,
      enableSorting: true,
      enableFilter: true,
      floatingFilter: true,
      animateRows: true,
      paginationPageSize: 10,
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
        selectAll: 'Seleccionar tudo',
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
        inRange: 'No alcance',
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
  }

  onPaginationChanged() {
    if (this.gridOptions.api) {
      setText("#lbCurrentPage", this.gridOptions.api.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridOptions.api.paginationGetTotalPages());
      this.setLastButtonDisabled(!this.gridOptions.api.paginationIsLastPageFound());
    }
  }

  setLastButtonDisabled(disabled) {
    this.ultimodisable = disabled;
  }

  imprimir() {
    this.extractData(this.gridOptions.api.getDataAsCsv())
  }
  getfiltroshtml() {
    /*  var filtros = "<p><strong>Filtros:&nbsp;</strong>";
      filtros += "Famílias: [" + this.fam_temp + "] ";
      filtros += (this.date_temp != null) ? "<strong>&nbsp;|&nbsp;</strong> Data Ínicio:" + this.date_temp : "";
      filtros += (this.date2_temp != null) ? "<strong>&nbsp;|&nbsp;</strong> Data Fim:" + this.date2_temp : "";
      filtros += (this.user_temp != null) ? "<strong>&nbsp;|&nbsp;</strong>Utilizador:" + this.user_temp : "";
      filtros += (this.op_temp != null) ? "<strong>&nbsp;|&nbsp;</strong>Operação:" + this.op_temp : "";
      filtros += (this.ref_temp != null) ? "<strong>&nbsp;|&nbsp;</strong>Referência:" + this.ref_temp : ""
      filtros += "</p>";
      return filtros;*/
  }

  extractData(res) {
    let csvData = res;
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split('","');
    //let lines = [];
    var tabela = '<div id="imprimirtabela">' + this.getfiltroshtml() + '<table border="1" class="table table-striped imprimirtab">';
    for (let i = 0; i < allTextLines.length; i++) {
      tabela += '<tr>';
      // split content based on comma
      let data = allTextLines[i].split('","');
      if (data.length == headers.length) {
        //let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tabela += '<td>' + data[j].replace('"', '');
          //tarr.push(data[j].replace('"', ''));
          tabela += '</td>';
        }
        // lines.push(tarr);
      }
      tabela += '</tr>';
    }
    tabela += '</div></table>';
    //this.csvData = lines;
    this.abririmpressao(tabela);
  }

  abririmpressao(tabela) {
    var printContents = document.getElementById("imprimirtabela").innerHTML;
    var popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" /></head><body onload="window.print(); window.close();">' + tabela + '</body></html>');
    popupWin.document.close();
  }

  analises(inicio) {
    this.gridOptions.api.showLoadingOverlay();
    this.columnDefs.push({ headerName: "TITLE", filter: 'text', field: "TITLE", width: 107, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "CARREGAR_ID", filter: 'text', field: "CARREGAR_ID", width: 166, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "SUPPORT_PROGRAM", filter: 'text', field: "SUPPORT_PROGRAM", width: 212, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "RECEITA", filter: 'text', field: "RECEITA", width: 127, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "DESCRICAO", filter: 'text', field: "DESCRICAO", width: 148, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "SUPORTE", filter: 'text', field: "SUPORTE", width: 135, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "N_MANUTEN", filter: 'text', field: "N_MANUTEN", width: 153, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "PRETRATTAMENTO", filter: 'text', field: "PRETRATTAMENTO", width: 196, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "COBRE", filter: 'text', field: "COBRE", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "NICHEL", filter: 'text', field: "NICHEL", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "NIQUEL_FINITURA", filter: 'text', field: "NIQUEL_FINITURA", width: 190, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "CROMAGEM", filter: 'text', field: "CROMAGEM", width: 149, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "DESMETALLIZACAO", filter: 'text', field: "DESMETALLIZACAO", width: 201, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "PECAS", filter: 'text', field: "PECAS", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "SUPERFICIE", filter: 'text', field: "SUPERFICIE", width: 154, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({
      headerName: "DATA_INICIO", field: "DATA_INICIO", width: 157, enableValue: true, enableRowGroup: true, enablePivot: true, comparator: dateComparator, filter: 'date', filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    });
    this.columnDefs.push({ headerName: "HORA_INICIO", filter: 'text', field: "HORA_INICIO", width: 158, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({
      headerName: "DATA_FIM", field: "DATA_FIM", width: 135, enableValue: true, enableRowGroup: true, enablePivot: true, comparator: dateComparator, filter: 'date', filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    });
    this.columnDefs.push({ headerName: "HORA_FIM", filter: 'text', field: "HORA_FIM", width: 140, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "AREATOTAL", filter: 'text', field: "AREATOTAL", width: 152, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "LOAD_PIECES", filter: 'text', field: "LOAD_PIECES", width: 164, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "DESCRICAO HIST.", filter: 'text', field: "DESCRICAO_HIST", width: 180, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "SEQUENCIA", filter: 'text', field: "SEQUENCIA", width: 147, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "TINA", filter: 'text', field: "TINA", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "TEMPO_INICIO", filter: 'text', field: "TEMPO_INICIO", width: 167, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "TEMPO_FIM", filter: 'text', field: "TEMPO_FIM", width: 152, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "DURACAO", filter: 'text', field: "DURACAO", width: 136, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "LIMITE_INCIO", filter: 'text', field: "LIMITE_INCIO", width: 163, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "LIMITE_FIM", filter: 'text', field: "LIMITE_FIM", width: 142, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "TEMPERATURA_BANHO", filter: 'text', field: "TEMPERATURA_BANHO", width: 230, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "RACK_CODE", filter: 'text', field: "RACK_CODE", width: 153, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "RACK_TYPE", filter: 'text', field: "RACK_TYPE", width: 148, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "LOAD_RAW", filter: 'text', field: "LOAD_RAW", width: 141, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "LOAD_USER", filter: 'text', field: "LOAD_USER", width: 143, enableValue: true, enableRowGroup: true, enablePivot: true });



    this.columdefeito = []
    var count = 0;

    this.columnfam(count, inicio);
    //if (this.famSeleccionadas.length == 0) if (inicio) this.configuracoes(null);
  }

  columnfam(count, inicio) {
    /*this.RegistoProducao.getFam([fam]).subscribe(
      res => {
        var column = { headerName: "FAM " + fam, suppressMenu: true, field: "defeito", children: [] };
        for (var x in res) {
          column.children.push({ id: res[x], headerName: res[x], field: res[x], width: 120, enableValue: true, enableRowGroup: true, enablePivot: true })
          this.columdefeito.push(res[x]);
        }
        this.columnDefs.push(column);
        this.columnDefs = this.columnDefs.slice();

        if (count == this.famSeleccionadas.length) {
          var date2 = new Date(this.data_fim).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
          var date = new Date(this.data_ini).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");

          if (isNaN(new Date(this.data_ini).getDate()) || date2 == '1970-01-01') date2 = null;
          if (isNaN(new Date(this.data_fim).getDate()) || date == '1970-01-01') date = null;

          this.fam_temp = this.famSeleccionadas;
          this.date_temp = date;
          this.date2_temp = date2;
          this.ref_temp = this.referencia;
          this.user_temp = this.utilizador;
          this.op_temp = this.operacao;

         this.famSeleccionadas, inicio, date, date2, this.referencia, this.utilizador, this.operacao);
        }
      },
      error => console.log(error));*/
    this.componentes();
  }



  componentes() {
    var days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado-Feira'];
    var month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    if (this.gridOptions.api != null) this.gridOptions.api.showLoadingOverlay();
    var data = [{ utilizador: this.utilizador, ref: this.referencia, lote: this.lote, tina: this.tina }];
    this.RegistoProducao.getCartelas(data).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total > 0) {
          // console.log(response)
          for (var y in response) {

            var rowData = [];
            /*rowData['id'] = response[y][1];
            rowData['id_of'] = (response[y][2] == null) ? response[y][1] : response[y][2];
            rowData['tipo'] = (response[y][2] == null) ? "PF" : "COMP";
            rowData['componente'] = response[y][8];
            rowData['descricao'] = response[y][9];
            rowData['utilizador'] = response[y][7];
            rowData['num_of'] = (response[y][0] == null) ? response[y][3] : response[y][0];
            rowData['data'] = (response[y][10] == null) ? new Date(response[y][14]).toLocaleDateString() : new Date(response[y][10]).toLocaleDateString();
            rowData['hora'] = (response[y][13] == null) ? new Date(response[y][14]).toTimeString().slice(0, 8) : response[y][13].slice(0, 8);
            rowData['mes'] = month[new Date(response[y][10]).getMonth()];
            rowData['dia'] = days[new Date(response[y][10]).getDay()];
            rowData['ano'] = new Date(response[y][10]).getFullYear();
            */

            rowData['TITLE'] = response[y].TITLE;
            rowData['CARREGAR_ID'] = response[y].CARREGAR_ID;
            rowData['SUPPORT_PROGRAM'] = response[y].SUPPORT_PROGRAM;
            rowData['RECEITA'] = response[y].RECEITA;
            rowData['DESCRICAO'] = response[y].DESCRICAO;
            rowData['SUPORTE'] = response[y].SUPORTE;
            rowData['N_MANUTEN'] = response[y].N_MANUTEN;
            rowData['PRETRATTAMENTO'] = response[y].PRETRATTAMENTO;
            rowData['COBRE'] = response[y].COBRE;
            rowData['NICHEL'] = response[y].NICHEL;
            rowData['NIQUEL_FINITURA'] = response[y].NIQUEL_FINITURA;
            rowData['CROMAGEM'] = response[y].CROMAGEM;
            rowData['DESMETALLIZACAO'] = response[y].DESMETALLIZACAO;
            rowData['PECAS'] = response[y].PECAS;
            rowData['SUPERFICIE'] = response[y].SUPERFICIE;
            rowData['DATA_INICIO'] = (response[y].DATA_INICIO == null) ? response[y].DATA_INICIO : new Date(response[y].DATA_INICIO).toLocaleDateString();
            rowData['HORA_INICIO'] = (response[y].HORA_INICIO == null) ? response[y].HORA_INICIO : response[y].HORA_INICIO.slice(0, 8);
            rowData['DATA_FIM'] = (response[y].DATA_FIM == null) ? response[y].DATA_FIM : new Date(response[y].DATA_FIM).toLocaleDateString();;
            rowData['HORA_FIM'] = (response[y].HORA_FIM == null) ? response[y].HORA_FIM : response[y].HORA_FIM.slice(0, 8);
            rowData['AREATOTAL'] = response[y].AREATOTAL;
            rowData['LOAD_PIECES'] = response[y].LOAD_PIECES;
            rowData['DESCRICAO_HIST'] = response[y].DESCRICAO_HIST;
            rowData['SEQUENCIA'] = response[y].SEQUENCIA;
            rowData['TINA'] = response[y].TINA;
            rowData['TEMPO_INICIO'] = (response[y].TEMPO_INICIO == null) ? response[y].TEMPO_INICIO : response[y].TEMPO_INICIO.slice(0, 8);
            rowData['TEMPO_FIM'] = (response[y].TEMPO_FIM == null) ? response[y].TEMPO_FIM : response[y].TEMPO_FIM.slice(0, 8);
            rowData['DURACAO'] = (response[y].DURACAO == null) ? response[y].DURACAO : response[y].DURACAO.slice(0, 8);
            rowData['LIMITE_INCIO'] = (response[y].LIMITE_INCIO == null) ? response[y].LIMITE_INCIO : response[y].LIMITE_INCIO.slice(0, 8);
            rowData['LIMITE_FIM'] = (response[y].LIMITE_FIM == null) ? response[y].LIMITE_FIM : response[y].LIMITE_FIM.slice(0, 8);
            rowData['TEMPERATURA_BANHO'] = response[y].TEMPERATURA_BANHO;
            rowData['RACK_CODE'] = response[y].RACK_CODE;
            rowData['RACK_TYPE'] = response[y].RACK_TYPE;
            rowData['LOAD_RAW'] = response[y].LOAD_RAW;
            rowData['LOAD_USER'] = response[y].LOAD_USER;

            var count = 15;
            for (var x in this.columdefeito) {
              // rowData[this.columdefeito[x]] = (response[y][count] == null) ? 0 : response[y][count];
              count++;
            }
            this.rowData1.push(rowData);
          }


          this.rowData = this.rowData1.slice();
          var valor = this.page_size;
          if (valor == 'todos') valor = this.rowData.length;
          if (this.gridOptions.api != null) this.gridOptions.api.paginationSetPageSize(Number(valor));
          this.configuracoes(null);
          /* if (inicio) {
             this.configuracoes(null);
           } else {*/
          /* this.gridOptions.columnApi.setColumnState(this.colstate);
           this.gridOptions.columnApi.setColumnGroupState(this.groupstate);
           this.gridOptions.api.setSortModel(this.sortstate);
           this.gridOptions.api.setFilterModel(this.filterstate);*/
          /* }*/
        } else {
          this.rowData = [];
        }

      },
      error => { console.log(error); });

  }

  remover() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Eliminar?',
      header: 'Eliminar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.GERVISTASService.delete(this.num_vista).then(result => {
          var index = this.config.findIndex(item => item.value == this.num_vista);
          if (index > -1) {
            this.config.splice(index, 1);
          }
          this.displayVista = false;
          this.num_vista = 0;
        }, error => {
          console.log(error); /*this.simular(this.inputerro);*/
        });
      }
    });
  }

  gravarState() {
    this.novo = false;
    if (this.num_vista != 0) {
      this.saveState();
    }
  }

  editState() {
    this.novo = false;
    this.texto_vista = this.config.find(item => item.value == this.num_vista).label;
    if (this.num_vista != 0) {
      this.displayVista = true;
    }
  }

  newState() {
    this.novo = true;
    this.texto_vista = "";
    this.displayVista = true;
  }

  saveState() {

    if (!this.novo) {

      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Alterar?',
        header: 'Alterar Confirmação',
        icon: 'fa fa-save',
        accept: () => {
          var vistas = new GER_VISTAS;
          vistas.id_UTZ = this.user;
          vistas.id = this.num_vista;
          vistas.colstate = JSON.stringify(this.gridOptions.columnApi.getColumnState());
          vistas.groupstate = JSON.stringify(this.gridOptions.columnApi.getColumnGroupState());
          vistas.sortstate = JSON.stringify(this.gridOptions.api.getSortModel());
          vistas.filterstate = JSON.stringify(this.gridOptions.api.getFilterModel());
          vistas.descricao = this.texto_vista;
          vistas.pagina = 2;
          this.GERVISTASService.update(vistas).then(result => {
            var array = this.array.find(item => item.id == this.num_vista);
            this.config.find(item => item.value == this.num_vista).label = this.texto_vista;

            if (array) {
              array.colState = JSON.parse(vistas.colstate);
              array.groupState = JSON.parse(vistas.groupstate);
              array.sortState = JSON.parse(vistas.sortstate);
              array.filterState = JSON.parse(vistas.filterstate);
              array.descricao = vistas.descricao;
            }
            this.displayVista = false;

          }, error => {
            console.log(error); /*this.simular(this.inputerro);*/
          });
        }
      });

    } else {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Gravar?',
        header: 'Gravar Confirmação',
        icon: 'fa fa-save',
        accept: () => {
          //this.displayVista = true;
          this.gravarVista();
        }
      });
    }


  }

  gravarVista() {
    var vistas = new GER_VISTAS;
    vistas.id_UTZ = this.user;
    vistas.colstate = JSON.stringify(this.gridOptions.columnApi.getColumnState());
    vistas.groupstate = JSON.stringify(this.gridOptions.columnApi.getColumnGroupState());
    vistas.sortstate = JSON.stringify(this.gridOptions.api.getSortModel());
    vistas.filterstate = JSON.stringify(this.gridOptions.api.getFilterModel());
    vistas.descricao = this.texto_vista;
    vistas.pagina = 2;
    this.GERVISTASService.create(vistas).subscribe(result => {

      this.array.push({
        id: result.id, descricao: result.descricao,
        colState: JSON.parse(result.colstate), sortState: JSON.parse(result.sortstate),
        groupState: JSON.parse(result.groupstate), filterState: JSON.parse(result.filterstate)
      });
      this.config.push({ label: result.descricao, value: result.id })
      this.num_vista = result.id;
      this.displayVista = false;

    }, error => {
      console.log(error); /*this.simular(this.inputerro);*/
    });
  }

  restoreState() {
    var array = this.array.find(item => item.id == this.num_vista);
    if (array) {
      this.gridOptions.columnApi.setColumnState(array.colState);
      this.gridOptions.columnApi.setColumnGroupState(array.groupState);
      this.gridOptions.api.setSortModel(array.sortState);
      this.gridOptions.api.setFilterModel(array.filterState);
    }
  }

  resetState() {
    this.gridOptions.columnApi.resetColumnState();
    this.gridOptions.columnApi.resetColumnGroupState();
    this.gridOptions.api.setSortModel(null);
    this.gridOptions.api.setFilterModel(null);
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  onPageSizeChanged(value) {
    var valor = value.value
    if (valor == 'todos') valor = this.rowData.length;
    this.gridOptions.api.paginationSetPageSize(Number(valor));
  }

  configuracoes(event, update = false) {
    if (this.config.length > 0) this.texto_vista = this.config.find(item => item.value == this.num_vista).label;
    if (this.num_vista != 0) {
      var array = this.array.find(item => item.id == this.num_vista);
      if (array && !update) {
        if (this.gridOptions.api != null) this.gridOptions.columnApi.setColumnState(array.colState);
        if (this.gridOptions.api != null) this.gridOptions.columnApi.setColumnGroupState(array.groupState);
        if (this.gridOptions.api != null) this.gridOptions.api.setSortModel(array.sortState);
        if (this.gridOptions.api != null) this.gridOptions.api.setFilterModel(array.filterState);
        if (array.adminedit) {
          if (JSON.parse(localStorage.getItem('userapp'))["admin"]) {
            this.disEditar = false;
            this.disCriar = false;
            this.disGravar = false;
          } else {
            this.disEditar = true;
            this.disCriar = true;
            this.disGravar = true;
          }
        } else {
          this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33editar");
          this.disGravar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33gravar");
          this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node33criar");
        }
      }
    } else {
      this.resetState();
    }
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


  onBtExport() {
    this.gridOptions.api.exportDataAsExcel();
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

  createRowData(inicio, update = false) {
    this.colstate = this.gridOptions.columnApi.getColumnState();
    this.groupstate = this.gridOptions.columnApi.getColumnGroupState();
    this.sortstate = this.gridOptions.api.getSortModel();
    this.filterstate = this.gridOptions.api.getFilterModel();

    if (update) {
      this.rowData1 = [];
      this.gridOptions.api.showLoadingOverlay();
      this.componentes();
    } else {
      this.rowData1 = [];
      this.gridOptions.api.showLoadingOverlay();
      this.columnDefs = [];
      this.analises(inicio);
    }

  }

  selecttable() {
    if (this.select_table) {
      this.gridOptions.api.selectAll();
    } else {
      this.gridOptions.api.deselectAll();
    }
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

  private onModelUpdated() {
    //console.log('onModelUpdated');
    this.calculateRowCount();
  }

  public onReady() {
    // console.log('onReady');
    this.calculateRowCount();
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

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    // console.log('onColumnEvent: ' + $event);
  }

}

/*function skillsCellRenderer(params) {
  var data = params.data;
  var skills = [];
 /* RefData.IT_SKILLS.forEach(function (skill) {
      if (data && data.skills && data.skills[skill]) {
          skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
      
  });
  return} skills.join(' ');
}*/

function countryCellRenderer(params) {
  /*var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;*/
}

function createRandomPhoneNumber() {
  var result = '+';
  for (var i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
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

function externalFilterChanged(newValue) {
  ageType = newValue;
  this.gridOptions.api.onFilterChanged();
}

function dateComparator(date1, date2) {
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}
// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = (yearNumber * 10000) + (monthNumber * 100) + dayNumber;
  return result;
}

function setText(selector, text) {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).innerHTML = text;
  }

}





