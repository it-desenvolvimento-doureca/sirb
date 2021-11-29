import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { COMCONTRATOSService } from 'app/servicos/com-contratos.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  cols: any;
  mensagemtabela: string;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;


  user: any;
  ID: string;
  N_CONTRATO: string;
  NOME_CLIENTE: string;
  MORADA_CLIENTE: string;
  OBSERVACOES: string;
  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals, private COMCONTRATOSService: COMCONTRATOSService) { }
  ngOnInit() {

    var array = this.globalVar.getfiltros("comercial_contratos");
    if (array) {


      //this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.ID = (array['ID'] != undefined) ? array['ID'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : ""; 
      this.NOME_CLIENTE = (array['NOME_CLIENTE'] != undefined) ? array['NOME_CLIENTE'].value : "";
      this.N_CONTRATO = (array['N_CONTRATO'] != undefined) ? array['N_CONTRATO'].value : "";
      this.MORADA_CLIENTE = (array['MORADA_CLIENTE'] != undefined) ? array['MORADA_CLIENTE'].value : "";
      this.OBSERVACOES = (array['OBSERVACOES'] != undefined) ? array['OBSERVACOES'].value : "";
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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850apagar"));



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.COMCONTRATOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            ID: response[x].ID,
            N_CONTRATO: response[x].N_CONTRATO,
            NOME_CLIENTE: response[x].NOME_CLIENTE,
            MORADA_CLIENTE: response[x].MORADA_CLIENTE,
            OBSERVACOES: response[x].OBSERVACOES,
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
    this.N_CONTRATO = "";
    this.NOME_CLIENTE = "";
    this.MORADA_CLIENTE = "";
    this.OBSERVACOES = "";
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

      this.globalVar.setfiltros("comercial_contratos", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].ID);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("comercial_contratos_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].ID);
    }

    this.globalVar.setfiltros("comercial_contratos_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['comercial_contratos/view'], { queryParams: { id: event.data.ID } });
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
