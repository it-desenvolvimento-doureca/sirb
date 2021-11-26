import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DataTable } from 'primeng/primeng';


@Component({
  selector: 'app-acordos',
  templateUrl: './acordos.component.html',
  styleUrls: ['./acordos.component.css']
})
export class AcordosComponent implements OnInit {

  cols: any;
  mensagemtabela: string;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;


  user: any;
  id_ACORDO: string;
  assunto: string;
  ambito: string;
  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }
  ngOnInit() {

    var array = this.globalVar.getfiltros("reunioes");
    if (array) {


      //this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.id_ACORDO = (array['id_ACORDO'] != undefined) ? array['id_ACORDO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : ""; 
      this.ambito = (array['ambito'] != undefined) ? array['ambito'].value : "";
      this.assunto = (array['assunto'] != undefined) ? array['assunto'].value : "";


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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852apagar"));



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    /* this.REUREUNIOESService.getAll().subscribe(
       response => {
         var count = Object.keys(response).length;
         if (count == 0) {
           this.mensagemtabela = "Nenhum Registo foi encontrado...";
         }
         for (var x in response) {
 
           this.cols.push({
             id_ACORDO: response[x][0].id_ACORDO,
             //data_ULTIMA_REALIZADA: (response[x].data_ULTIMA_REALIZADA == null) ? '' : this.formatDate(response[x].data_ULTIMA_REALIZADA) + ' ' + new Date(response[x].data_ULTIMA_REALIZADA).toLocaleTimeString().slice(0, 5),
             ambito: response[x][1],
             assunto: response[x][0].assunto,
           });
 
         }
         this.cols = this.cols.slice();
       },
       error => console.log(error));*/

  }



  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }

    this.id_ACORDO = "";
    this.assunto = "";
    this.ambito = "";
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

      this.globalVar.setfiltros("reunioes", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].id_ACORDO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("reunioes_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].id_ACORDO);
    }

    this.globalVar.setfiltros("reunioes_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['reunioes/view'], { queryParams: { id: event.data.id_ACORDO } });
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
