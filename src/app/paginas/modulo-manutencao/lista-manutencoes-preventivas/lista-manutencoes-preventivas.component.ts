import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { ConfirmationService, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-lista-manutencoes-preventivas',
  templateUrl: './lista-manutencoes-preventivas.component.html',
  styleUrls: ['./lista-manutencoes-preventivas.component.css']
})
export class ListaManutencoesPreventivasComponent implements OnInit {
  mensagemtabela: string;
  acessoplaneamento = true;
  filtro2: any;
  filtroval;

  ID_PEDIDO: string;
  //estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;
  data_actual: Date;
  cols: any[];
  filtro = [];
  yearTimeout: any;

  DATA_HORA_PEDIDO;
  EQUIPAMENTO;
  COMPONENTE;
  ESTADO;
  TIPO_MANUTENCAO;
  RESPONSAVEL;
  STATUS_MAQUINA;
  LOCALIZACAO;
  UTILIZADOR;
  AMBITO;

  estados = [{ value: 'Em Elaboração', label: 'Em Elaboração' },
  { value: 'Submetida', label: 'Submetida' },
  { value: 'Planeada', label: 'Planeada' },
  { value: 'Concluída', label: 'Concluída' },
  { value: 'Validada', label: 'Validada' },
  { value: 'Rejeitada', label: 'Rejeitada' },
  { value: 'Cancelada', label: 'Cancelada' },
  { value: 'Anulada', label: 'Anulada' }];

  tipos = [{ value: 'Preventiva', label: 'Preventiva' },
  { value: 'Melhoria', label: 'Melhoria' }];

  @ViewChild(DataTable) dataTableComponent: DataTable;
  filtrotipo = [];

  constructor(private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService,
    private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("lista_preventivas");
    if (array) {


      this.filtro2 = (array['ESTADO'] != undefined) ? array['ESTADO'].value : null;
      var filtro3 = (array['TIPO_MANUTENCAO'] != undefined) ? array['TIPO_MANUTENCAO'].value : null;

      this.dataTableComponent.filters = array;

      this.ID_PEDIDO = (array['ID_PEDIDO'] != undefined) ? array['ID_PEDIDO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : "";
      this.DATA_HORA_PEDIDO = (array['DATA_HORA_PEDIDO'] != undefined) ? array['DATA_HORA_PEDIDO'].value : "";
      this.EQUIPAMENTO = (array['EQUIPAMENTO'] != undefined) ? array['EQUIPAMENTO'].value : "";
      this.COMPONENTE = (array['COMPONENTE'] != undefined) ? array['COMPONENTE'].value : "";
      this.RESPONSAVEL = (array['RESPONSAVEL'] != undefined) ? array['RESPONSAVEL'].value : "";
      this.STATUS_MAQUINA = (array['STATUS_MAQUINA'] != undefined) ? array['STATUS_MAQUINA'].value : "";
      this.LOCALIZACAO = (array['LOCALIZACAO'] != undefined) ? array['LOCALIZACAO'].value : "";
      this.UTILIZADOR = (array['UTILIZADOR'] != undefined) ? array['UTILIZADOR'].value : "";
      this.AMBITO = (array['AMBITO'] != undefined) ? array['AMBITO'].value : "";

      if (this.filtro2 != null && this.filtro2 != "") {
        var f = this.filtro2.split(',');
        for (var x in f) {
          this.filtro.push(f[x])
        }

        this.filtro = this.filtro.slice();
        this.filtroval = false;

        this.filtrar(this.filtro, "ESTADO", true, "in");
      }

      if (filtro3 != null && filtro3 != "") {
        var f = filtro3.split(',');
        for (var x in f) {
          this.filtrotipo.push(f[x])
        }

        this.filtrotipo = this.filtrotipo.slice();


        this.filtrar(this.filtrotipo, "TIPO_MANUTENCAO", true, "in");
      }
    } else {
      this.filtro = ["Em Elaboração", "Submetida", "Planeada", "Concluída", "Rejeitada"];
      this.filtrar(this.filtro, "ESTADO", true, "in");

      this.filtrotipo = ["Preventiva", "Melhoria"];
      this.filtrar(this.filtrotipo, "TIPO_MANUTENCAO", true, "in");
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11585editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11585criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11585apagar"));



    this.carregarlista();


  }

  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.MANMOVMANUTENCAOCABService.getAll2('P,MM', this.user).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            ID_PEDIDO: response[x][0],
            DATA_HORA_PEDIDO: this.formatDate(response[x][12]) + " " + new Date(response[x][12]).toLocaleTimeString().slice(0, 5),
            EQUIPAMENTO: response[x][3],
            COMPONENTE: (response[x][4] != null) ? response[x][4] + ' - ' + response[x][5] : null,
            ESTADO: this.getestado(response[x][6]),
            RESPONSAVEL: response[x][2],
            STATUS_MAQUINA: (response[x][10] == null) ? '' : ((response[x][10] == 'P') ? 'Parada' : 'Em Funcionamento'),
            LOCALIZACAO: response[x][7],
            UTILIZADOR: response[x][9],
            AMBITO: response[x][11],
            TIPO_MANUTENCAO: this.getbytipo(response[x][13]),
          });

        }
        this.cols = this.cols.slice();

      },
      error => { this.mensagemtabela = "Nenhum Registo foi encontrado..."; console.log(error) });

  }

  getbytipo(tipo_manutencao) {
    if (tipo_manutencao == 'C') {
      return 'Corretiva';
    } else if (tipo_manutencao == 'M') {
      return 'Melhoria';
    } else if (tipo_manutencao == 'EX') {
      return 'Externa';
    } else if (tipo_manutencao == 'P') {
      return 'Preventiva';
    } else if (tipo_manutencao == 'MM') {
      return 'Melhoria';
    } else {
      return '';
    }

  }

  getestado(valor) {
    if (valor == 'PE') {
      return 'Submetida';
    } if (valor == 'P') {
      return 'Planeada';
    } else if (valor == 'V') {
      return 'Validada';
    } else if (valor == 'A') {
      return 'Anulada';
    } else if (valor == 'E') {
      return 'Em Execução';
    } else if (valor == 'EM') {
      return 'Em Elaboração';
    } else if (valor == 'CA') {
      return 'Cancelada';
    } else if (valor == 'C') {
      return 'Concluída';
    } else if (valor == 'RJ') {
      return 'Rejeitada';
    } else if (valor == 'R') {
      return 'Suspensa';
    }

    return 'Submetida';
  }
  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.ID_PEDIDO = "";
    this.DATA_HORA_PEDIDO = "";
    this.EQUIPAMENTO = "";
    this.COMPONENTE = "";
    this.ESTADO = "";
    this.TIPO_MANUTENCAO = "";
    this.RESPONSAVEL = "";
    this.STATUS_MAQUINA = "";
    this.LOCALIZACAO = "";
    this.UTILIZADOR = "";
    this.AMBITO = "";

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
        ids.push(array[x].ID_PEDIDO);
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
      ids.push(array[x].ID_PEDIDO);
    }

    this.globalVar.setfiltros("lista_preventivas_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['lista_preventivas/view'], { queryParams: { id: event.data.ID_PEDIDO } });
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