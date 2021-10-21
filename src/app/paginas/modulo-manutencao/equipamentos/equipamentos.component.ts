import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { ConfirmationService, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css']
})
export class EquipamentosComponent implements OnInit {
  mensagemtabela: string;
  acessoplaneamento = true;
  referencia: any;
  filtro2: any;
  filtroval;
  localizacao: string;
  id_MANUTENCAO: string;
  //estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;
  estado: string;
  data_actual: Date;
  cols: any[];
  filtro = [];

  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;
  designacao_REF;
  nome: string;


  constructor(private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService
    , private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("equipamentos_manutencao");
    if (array) {


      this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.id_MANUTENCAO = (array['id_MANUTENCAO'] != undefined) ? array['id_MANUTENCAO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : "";
      this.nome = (array['nome'] != undefined) ? array['nome'].value : "";
      this.localizacao = (array['localizacao'] != undefined) ? array['localizacao'].value : "";
      this.referencia = (array['referencia'] != undefined) ? array['referencia'].value : "";
      this.designacao_REF = (array['designacao_REF'] != undefined) ? array['designacao_REF'].value : "";
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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101apagar"));



    this.carregarlista();


  }

  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            id_MANUTENCAO: response[x].ID_MANUTENCAO,
            nome: response[x].NOME,
            localizacao: response[x].LOCALIZACAO,
            referencia: response[x].COD_EQUIPAMENTO_PRINCIPAL
          });

        }
        this.cols = this.cols.slice();

      },
      error => console.log(error));

  }

  getinterna_EXTERNA(valor) {
    if (valor == "I") {
      return "INTERNA";
    } else if (valor == "E") {
      return "EXTERNA";
    }
  }

  getUnidade(valor) {
    if (valor == 1) {
      return "Formariz";
    } else if (valor == 2) {
      return "São Bento";
    }
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.id_MANUTENCAO = "";
    this.estado = "";
    this.localizacao = "";
    this.nome = "";
    this.referencia = "";
    this.designacao_REF = "";

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

      this.globalVar.setfiltros("equipamentos_manutencao", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].id_MANUTENCAO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("equipamentos_manutencao_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].id_MANUTENCAO);
    }

    this.globalVar.setfiltros("equipamentos_manutencao_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: event.data.id_MANUTENCAO } });
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