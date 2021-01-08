import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { QUADERROGACOESService } from 'app/servicos/qua-derrogacoes.service';
import { ConfirmationService, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-derrogacoes',
  templateUrl: './derrogacoes.component.html',
  styleUrls: ['./derrogacoes.component.css']
})
export class DerrogacoesComponent implements OnInit {
  mensagemtabela: string;
  acessoplaneamento = true;
  referencia: any;
  filtro2: any;
  filtroval;
  cliente: string;
  data: string;
  id_DERROGACAO: string;
  morada: string;
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

  yearTimeout: any;
  data_INICIO: string;
  data_FIM: string;
  interna_EXTERNA: string;
  unidade: string;
  emissor: string;
  designacao_REF: string;
  familia_REF: string;
  setor: string;
  qtd: string;
  motivo: string;
  causa: string;


  constructor(private QUADERROGACOESService: QUADERROGACOESService, private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("derrogacoes");
    if (array) {


      this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;

      this.dataTableComponent.filters = array;

      this.id_DERROGACAO = (array['id_DERROGACAO'] != undefined) ? array['id_DERROGACAO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : "";
      this.data = (array['data'] != undefined) ? array['data'].value : "";
      this.data_INICIO = (array['data_INICIO'] != undefined) ? array['data_INICIO'].value : "";
      this.data_FIM = (array['data_FIM'] != undefined) ? array['data_FIM'].value : "";
      this.interna_EXTERNA = (array['interna_EXTERNA'] != undefined) ? array['interna_EXTERNA'].value : "";
      this.cliente = (array['cliente'] != undefined) ? array['cliente'].value : "";
      this.unidade = (array['unidade'] != undefined) ? array['unidade'].value : "";
      this.emissor = (array['emissor'] != undefined) ? array['emissor'].value : "";
      this.referencia = (array['referencia'] != undefined) ? array['referencia'].value : "";
      this.designacao_REF = (array['designacao_REF'] != undefined) ? array['designacao_REF'].value : "";
      this.familia_REF = (array['familia_REF'] != undefined) ? array['familia_REF'].value : "";
      this.setor = (array['setor'] != undefined) ? array['setor'].value : "";
      this.qtd = (array['qtd'] != undefined) ? array['qtd'].value : "";
      this.motivo = (array['motivo'] != undefined) ? array['motivo'].value : "";
      this.causa = (array['causa'] != undefined) ? array['causa'].value : "";

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
    this.estados = [{ label: "Aberto", value: "Aberto" }, { label: "Fechado", value: "Fechado" }, { label: "Anulado", value: "Anulado" }];


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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561apagar"));



    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.cols = [];
    this.QUADERROGACOESService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            id_DERROGACAO: response[x][0].id_DERROGACAO,
            estado: this.getESTADO(response[x][0].estado),
            data: this.formatDate(response[x][0].data_CRIA),
            data_INICIO: this.formatDate(response[x][0].data_INICIO),
            data_FIM: response[x][0].data_FIM,
            interna_EXTERNA: this.getinterna_EXTERNA(response[x][0].interna_EXTERNA),
            cliente: response[x][0].nome_CLIENTE,
            unidade: this.getUnidade(response[x][0].unidade),
            emissor: response[x][1],
            referencia: response[x][0].referencia,
            designacao_REF: response[x][0].designacao_REF,
            familia_REF: response[x][0].familia_REF,
            setor: response[x][2],
            qtd: response[x][0].qtd,
            motivo: response[x][0].motivo,
            causa: response[x][0].causa,

          });

        }
        this.cols = this.cols.slice();



        if (this.filtroval) {
          this.filtrar(this.filtro, "estado", true, "in");
        } else {
          this.filtrar("Aberto", "estado", true, "in");
        }
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
    this.id_DERROGACAO = "";
    this.estado = "";
    this.data = "";
    this.data_INICIO = "";
    this.data_FIM = "";
    this.interna_EXTERNA = "";
    this.cliente = "";
    this.unidade = "";
    this.emissor = "";
    this.referencia = "";
    this.designacao_REF = "";
    this.familia_REF = "";
    this.setor = "";
    this.qtd = "";
    this.motivo = "";
    this.causa = "";

    this.dataTableComponent.filter("", "", "");


  }


  getESTADO(estado) {
    if (estado == "A") {
      return "Aberto";
    } else if (estado == "F") {
      return "Fechado";
    } else if (estado == "R") {
      return "Anulado";
    }
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

      this.globalVar.setfiltros("derrogacoes", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].id_DERROGACAO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("derrogacoes_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].id_DERROGACAO);
    }

    this.globalVar.setfiltros("derrogacoes_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['derrogacoes/view'], { queryParams: { id: event.data.id_DERROGACAO } });
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