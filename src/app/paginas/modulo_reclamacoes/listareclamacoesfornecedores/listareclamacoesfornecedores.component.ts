import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { RCMOVRECLAMACAOService } from '../../../servicos/rc-mov-reclamacao.service';


@Component({
  selector: 'app-listareclamacoesfornecedores',
  templateUrl: './listareclamacoesfornecedores.component.html',
  styleUrls: ['./listareclamacoesfornecedores.component.css']
})
export class ListareclamacoesfornecedoresComponent implements OnInit {

  mensagemtabela: string;
  acessoplaneamento = true;
  banho: any;
  banhos: any[];
  filtro2: any;
  filtroval;
  turno: string;
  data: string;
  id_manu: string;
  tipo_manu: string;
  estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;
  estado: string;
  data_actual: Date;
  cols: any[];
  filtro = [];

  @ViewChild(DataTable) dataTableComponent: DataTable;
  linha = null;
  linhas: any[] = null;


  constructor(private RCMOVRECLAMACAOService: RCMOVRECLAMACAOService, private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("reclamacaofornecedor");
    if (array) {


      this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;


      if (this.filtro2 != null && this.filtro2 != "") {
        var f = this.filtro2.split(',');
        for (var x in f) {
          this.filtro.push(f[x])
        }
        this.filtroval = false;
      }
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];
    this.estados = [{ label: "Aberta", value: "Aberta" }, { label: "Fechada", value: "Fechada" }, { label: "Cancelada", value: "Cancelada" }];


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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005apagar"));
    this.disduplicar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005duplicar");



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.RCMOVRECLAMACAOService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            id: response[x].id_RECLAMACAO, tipo_manu: response[x].id_TIPO_RECLAMACAO,
            data: this.formatDate(response[x].data_RECLAMACAO), cliente: response[x].nome_CLIENTE, morada: response[x].morada_CLIENTE,
            referencia: response[x].referencia + ' - ' + response[x].designacao_REF, estado: this.getESTADO(response[x].estado)
          });

        }
        this.cols = this.cols.slice();



        if (this.filtroval) this.filtrar(this.filtro, "estado", true, "in");
      },
      error => console.log(error));

  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.linha = null;
    this.id_manu = "";
    this.tipo_manu = "";
    this.data = "";
    this.turno = "";
    //this.banho = null;

    this.dataTableComponent.filter("", "", "");

    var count = 0;
    if (this.globalVar.getfiltros("reclamacaofornecedoridbanho")) count = 1;
    if (count > 0) {
      this.globalVar.setfiltros("reclamacaofornecedoridbanho", null);
      this.carregarlista();
    }
  }


  getESTADO(estado) {
    if (estado == "A") {
      return "Aberta";
    } else if (estado == "F") {
      return "Fechada";
    } else if (estado == "C") {
      return "Cancelada";
    } else if (estado == "R") {
      return "Anulada";
    }
  }

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (value == 0 && fil) {
      value = "";
    }

    this.dataTableComponent.filter(value.toString(), coluna, filtro);

    this.globalVar.setfiltros("reclamacaofornecedor", this.dataTableComponent.filters);
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    if (this.dataTableComponent.dataToRender.length == 0) {
      this.mensagemtabela = "Nenhum Registo foi encontrado...";
    }

    this.globalVar.setfiltros("reclamacaofornecedor_id", ids);
  }

  atualizaids() {
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    this.globalVar.setfiltros("reclamacaofornecedor_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['reclamacoesfornecedores/view'], { queryParams: { id: event.data.id } });
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