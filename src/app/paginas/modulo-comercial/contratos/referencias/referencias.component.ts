import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { COMREFERENCIASService } from 'app/servicos/com-referencias.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  cols: any;
  mensagemtabela: string;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;


  user: any;
  ID: string;
  DESCRICAO: string;
  COD_REFERENCIA: string;
  COD_REFERENCIA_SILVER: string;
  DESC_REFERENCIA_SILVER: string;
  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals, private COMREFERENCIASService: COMREFERENCIASService) { }
  ngOnInit() {

    var array = this.globalVar.getfiltros("comercial_referencias");
    if (array) {


      //this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.ID = (array['ID'] != undefined) ? array['ID'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : ""; 
      this.DESCRICAO = (array['DESCRICAO'] != undefined) ? array['DESCRICAO'].value : "";
      this.COD_REFERENCIA = (array['COD_REFERENCIA'] != undefined) ? array['COD_REFERENCIA'].value : "";
      this.COD_REFERENCIA_SILVER = (array['COD_REFERENCIA_SILVER'] != undefined) ? array['COD_REFERENCIA_SILVER'].value : "";
      this.DESC_REFERENCIA_SILVER = (array['DESC_REFERENCIA_SILVER'] != undefined) ? array['DESC_REFERENCIA_SILVER'].value : "";

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851apagar"));



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.COMREFERENCIASService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            ID: response[x].ID,
            DESCRICAO: response[x].DESCRICAO,
            COD_REFERENCIA: response[x].COD_REFERENCIA,
            COD_REFERENCIA_SILVER: response[x].COD_REFERENCIA_SILVER,
            DESC_REFERENCIA_SILVER: response[x].DESC_REFERENCIA_SILVER,
            //data_ULTIMA_REALIZADA: (response[x].data_ULTIMA_REALIZADA == null) ? '' : this.formatDate(response[x].data_ULTIMA_REALIZADA) + ' ' + new Date(response[x].data_ULTIMA_REALIZADA).toLocaleTimeString().slice(0, 5),

          });

        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));

  }



  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }

    this.ID = "";
    this.COD_REFERENCIA = "";
    this.DESCRICAO = "";
    this.COD_REFERENCIA_SILVER = "";
    this.DESC_REFERENCIA_SILVER = "";
    //this.data_ULTIMA_REALIZADA = "";

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

      this.globalVar.setfiltros("comercial_referencias", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].ID);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("comercial_referencias_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].ID);
    }

    this.globalVar.setfiltros("comercial_referencias_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['comercial_referencias/view'], { queryParams: { id: event.data.ID } });
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
