import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ConfirmationService, DataTable } from 'primeng/primeng';


@Component({
  selector: 'app-lista-documento',
  templateUrl: './lista-documento.component.html',
  styleUrls: ['./lista-documento.component.css']
})
export class ListaDocumentoComponent implements OnInit {

  mensagemtabela: string;
  acessoplaneamento = true;

  ID_FICHA_DOCUMENTO: string;
  //estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;
  data_actual: Date;
  cols: any[];
  yearTimeout: any;

  DATA_HORA_PEDIDO;
  CODIGO;
  SECTOR;
  REFERENCIA;
  MAQUINA;


  @ViewChild(DataTable) dataTableComponent: DataTable;


  constructor(
    private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

    var array = this.globalVar.getfiltros("lista_preventivas");
    if (array) {




      this.dataTableComponent.filters = array;

      this.ID_FICHA_DOCUMENTO = (array['ID_FICHA_DOCUMENTO'] != undefined) ? array['ID_FICHA_DOCUMENTO'].value : "";
      this.DATA_HORA_PEDIDO = (array['DATA_HORA_PEDIDO'] != undefined) ? array['DATA_HORA_PEDIDO'].value : "";
      this.CODIGO = (array['CODIGO'] != undefined) ? array['CODIGO'].value : "";
      this.SECTOR = (array['SECTOR'] != undefined) ? array['SECTOR'].value : "";
      this.REFERENCIA = (array['REFERENCIA'] != undefined) ? array['REFERENCIA'].value : "";
      this.MAQUINA = (array['MAQUINA'] != undefined) ? array['MAQUINA'].value : "";


    } else {

    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1161editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1161criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1161apagar"));



    this.carregarlista();


  }

  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    /*this.MANMOVMANUTENCAOCABService.getAll2('P,MM', this.user).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            ID_FICHA_DOCUMENTO: response[x][0],
            DATA_HORA_PEDIDO: this.formatDate(response[x][12]) + " " + new Date(response[x][12]).toLocaleTimeString().slice(0, 5),
            CODIGO: response[x][3],
            COMPONENTE: (response[x][4] != null) ? response[x][4] + ' - ' + response[x][5] : null,
            ESTADO: this.getestado(response[x][6]),
            RESPONSAVEL: response[x][2],
            STATUS_MAQUINA: (response[x][10] == null) ? '' : ((response[x][10] == 'P') ? 'Parada' : 'Em Funcionamento'),
            SECTOR: response[x][7],
            REFERENCIA: response[x][9],
            MAQUINA: response[x][11],
            TIPO_MANUTENCAO: this.getbytipo(response[x][13]),
          });

        }
        this.cols = this.cols.slice();

      },
      error => { this.mensagemtabela = "Nenhum Registo foi encontrado..."; console.log(error) });*/

  }



  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }

    this.ID_FICHA_DOCUMENTO = "";
    this.DATA_HORA_PEDIDO = "";
    this.CODIGO = "";
    this.SECTOR = "";
    this.REFERENCIA = "";
    this.MAQUINA = "";

    this.dataTableComponent.filter("", "", "");


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

      this.dataTableComponent.filter(value.toString(), coluna, filtro);

      this.globalVar.setfiltros("lista_preventivas", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].ID_FICHA_DOCUMENTO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("lista_preventivas_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].ID_FICHA_DOCUMENTO);
    }

    this.globalVar.setfiltros("lista_preventivas_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['lista_preventivas/view'], { queryParams: { id: event.data.ID_FICHA_DOCUMENTO } });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
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

  atualizar() {
    this.carregarlista();
  }


}