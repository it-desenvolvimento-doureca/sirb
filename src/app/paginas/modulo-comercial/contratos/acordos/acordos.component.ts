import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { COMACORDOSService } from 'app/servicos/com-acordos.service';
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
  ID: string;
  CONTRATO: string;
  REFERENCIA: string;
  ESTADO;
  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals, private COMACORDOSService: COMACORDOSService) { }
  ngOnInit() {

    var array = this.globalVar.getfiltros("acordos");
    if (array) {


      //this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.ID = (array['ID'] != undefined) ? array['ID'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : ""; 
      this.REFERENCIA = (array['REFERENCIA'] != undefined) ? array['REFERENCIA'].value : "";
      this.CONTRATO = (array['CONTRATO'] != undefined) ? array['CONTRATO'].value : "";
      this.ESTADO = (array['ESTADO'] != undefined) ? array['ESTADO'].value : "";

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
    this.COMACORDOSService.getAll2().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            ID: response[x][0],
            ID_CONTRATO: response[x][1],
            ID_REFERENCIA: response[x][2],
            REFERENCIA: response[x][3] + ' - ' + response[x][4],
            CONTRATO: response[x][5],
            VERSAO: response[x][6],
            ESTADO: this.getestado(response[x][7])
            //data_ULTIMA_REALIZADA: (response[x].data_ULTIMA_REALIZADA == null) ? '' : this.formatDate(response[x].data_ULTIMA_REALIZADA) + ' ' + new Date(response[x].data_ULTIMA_REALIZADA).toLocaleTimeString().slice(0, 5),

          });

        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));

  }

  getestado(valor) {
    if (valor == 'A') {
      return "Anulado";
    } else if (valor == 'F') {
      return "Fechado";
    } else {
      return "Pendente";
    }
  }


  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }

    this.ID = "";
    this.CONTRATO = "";
    this.REFERENCIA = "";
    this.ESTADO = "";
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

      this.globalVar.setfiltros("acordos", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].ID);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("acordos_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].ID);
    }

    this.globalVar.setfiltros("acordos_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['comercial_acordos/view'], { queryParams: { id: event.data.ID, versao: event.data.VERSAO } });
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
