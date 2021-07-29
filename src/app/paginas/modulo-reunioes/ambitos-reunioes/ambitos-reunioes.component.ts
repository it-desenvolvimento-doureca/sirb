import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { REUAMBITOSREUNIOESService } from 'app/servicos/reu-ambitos-reunioes.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-ambitos-reunioes',
  templateUrl: './ambitos-reunioes.component.html',
  styleUrls: ['./ambitos-reunioes.component.css']
})
export class AmbitosReunioesComponent implements OnInit {
  cols: any;
  mensagemtabela: string;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;
  filtroval: boolean;
  data_ULTIMA_REALIZADA: any;
  descricao: any;
  data_PROXIMA_REALIZADA: any;
  id_AMBITO: any;
  user: any;
  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals, private REUAMBITOSREUNIOESService: REUAMBITOSREUNIOESService) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("ambitos_reunioes");
    if (array) {


      //this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.id_AMBITO = (array['id_AMBITO'] != undefined) ? array['id_AMBITO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : "";
      this.data_ULTIMA_REALIZADA = (array['data_ULTIMA_REALIZADA'] != undefined) ? array['data_ULTIMA_REALIZADA'].value : "";
      this.data_PROXIMA_REALIZADA = (array['data_PROXIMA_REALIZADA'] != undefined) ? array['data_PROXIMA_REALIZADA'].value : "";
      this.descricao = (array['descricao'] != undefined) ? array['descricao'].value : "";


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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101apagar"));



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.REUAMBITOSREUNIOESService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            id_AMBITO: response[x].id_AMBITO,
            data_ULTIMA_REALIZADA: (response[x].data_ULTIMA_REALIZADA == null) ? '' : this.formatDate(response[x].data_ULTIMA_REALIZADA) + ' ' + new Date(response[x].data_ULTIMA_REALIZADA).toLocaleTimeString().slice(0, 5),
            data_PROXIMA_REALIZADA: (response[x].data_PROXIMA_REALIZADA == null) ? '' : this.formatDate(response[x].data_PROXIMA_REALIZADA) + ' ' + new Date(response[x].data_PROXIMA_REALIZADA).toLocaleTimeString().slice(0, 5),
            descricao: response[x].descricao,
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

    this.id_AMBITO = "";
    this.descricao = "";
    this.data_PROXIMA_REALIZADA = "";
    this.data_ULTIMA_REALIZADA = "";

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

      this.globalVar.setfiltros("ambitos_reunioes", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].id_AMBITO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("ambitos_reunioes_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].id_AMBITO);
    }

    this.globalVar.setfiltros("ambitos_reunioes_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['ambitos_reunioes/view'], { queryParams: { id: event.data.id_AMBITO } });
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
