import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PE_MOV_CAB } from 'app/entidades/PE_MOV_CAB';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PEMOVCABService } from 'app/servicos/pe-mov-cab.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-lista-planos-estrategicos',
  templateUrl: './lista-planos-estrategicos.component.html',
  styleUrls: ['./lista-planos-estrategicos.component.css']
})
export class ListaPlanosEstrategicosComponent implements OnInit {
  dados: any[];
  linhas: any;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Sel. Estado", value: null }, { label: "Em Elaboração", value: "Em Elaboração" }, { label: "Em Execução", value: "Em Execução" }, { label: "Em Alteração", value: "Em Alteração" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvido/Realizado", value: "Desenvolvido/ Realizado" }, { label: "Controlado/Verificado", value: "Controlado/ Verificado" },
  { label: "Aprovado/Finalizado", value: "Aprovado/ Finalizado" }, { value: "Rejeitado", label: "Rejeitado" }, { value: "Cancelado", label: "Cancelado" }, { value: "Anulado", label: "Anulado" }];
  tipo: any;
  caminho: string;
  estado_filtro = [];
  lista_expand = [];
  acoes_em_ATRASO = false;

  constructor(
    private PEMOVCABService: PEMOVCABService, private route: ActivatedRoute,
    private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

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


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    var node = "node170";
    this.tipo = "T";
    this.caminho = urlarray[0];
    if (urlarray[0] == 'planosestrategicosengenaria') {
      node = "node1611";
      this.tipo = "EP";
    } else if (urlarray[0] == 'planosestrategicosproducao') {
      node = "node1631";
      this.tipo = "P";
    } else if (urlarray[0] == 'planosestrategicoslogistica') {
      node = "node1641";
      this.tipo = "L";
    } else if (urlarray[0] == 'planosestrategicosmanutencao') {
      node = "node1651";
      this.tipo = "M";
    } else if (urlarray[0] == 'planosestrategicosinjecao') {
      node = "node1661";
      this.tipo = "I";
    } else if (urlarray[0] == 'planosestrategicosComercial') {
      node = "node1671";
      this.tipo = "C";
    } else if (urlarray[0] == 'planosestrategicosProjetos') {
      node = "node1681";
      this.tipo = "PR";
    } else if (urlarray[0] == 'planosestrategicosFinanceira') {
      node = "node1691";
      this.tipo = "F";
    } else if (urlarray[0] == 'planosestrategicosqualidade') {
      node = "node1621";
      this.tipo = "Q";
    }

    if (this.tipo != "T") {
      this.estado_filtro = ["Em Elaboração", "Em Execução", "Em Alteração", "Planeado", "Desenvolvido/ Realizado", "Controlado/ Verificado",];
      this.filtrar(this.estado_filtro, "estado", true, "in");
    }

    if (this.tipo == 'T') {
      this.globalVar.setcriar(false);
    }
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "apagar"));




    this.carregarlista(this.tipo);
  }

  carregarlista(tipo) {
    this.dados = [];
    this.lista_expand = [];
    //acoes_em_ATRASO
    var filtros = [{ FASTRESPONSE: false, EM_ATRASO: this.acoes_em_ATRASO }];
    this.PEMOVCABService.getPE_MOV_CABbyTIPO(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            if (!this.dados.find(item => item.id == response[x][19])) this.dados.push({
              id: response[x][19],
              data_registo: (response[x][22] == null) ? "" : this.formatDate(response[x][22]),
              ano: response[x][20],
              conclusao: response[x][26],
              estado: this.getestado(response[x][23]),
              utilizador: response[x][21]
              , planos: []
            });

            if (response[x][0] != null) this.adicionar_linhas(response, x);

          }

          this.dados = this.dados.slice();

        }
      }, error => { console.log(error); });

  }


  adicionar_linhas(response, x) {
    var linha = this.dados.find(item => item.id == response[x][19]).planos.find(item => item.id == response[x][0]);
    var cor = "";
    var corlinha = "";
    var cor_letra = "";
    var cor_letra_linha = "";
    var data = this.formatDate(new Date());

    if (response[x][2] != null) {
      if (new Date(response[x][2]).getTime() < new Date(data).getTime()) {
        cor = "red";
        cor_letra = "white";
      } else if (new Date(response[x][2]).getTime() == new Date(data).getTime()) {
        cor = "yellow";
      }
    }

    if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
      corlinha = "red";
      cor_letra_linha = "white";
    } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
      corlinha = "yellow";
    }

    if (response[x][13] != "E" && response[x][13] != "P" && response[x][13] != null) { corlinha = ""; cor_letra_linha = ""; }
    if (response[x][7] != "E" && response[x][7] != "P" && response[x][7] != null) { cor = ""; cor_letra = ""; }

    if (linha) {
      linha.filho.push({
        corlinha: corlinha, cor_letra_linha: cor_letra_linha,
        data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
        , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
        , conclusao: response[x][24],
      });
    } else {
      this.dados.find(item => item.id == response[x][19]).planos.push({
        id: response[x][0], cor: cor, cor_letra: cor_letra,
        data_registo: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
        data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
        /*linha: response[x][0].id_LINHA, designacao: response[x][0].design_REFERENCIA, referencia: response[x][0].referencia, departamento_origem: response[x][2],*/
        descricao: response[x][6],
        ambito: response[x][15]/*this.getAmbito(response[x][3])*/, origem: response[x][4],
        estado: this.getestado(response[x][7]), //cor: response[x][1],
        utilizador: response[x][5], conclusao: response[x][25],
        filho: [{
          corlinha: corlinha, cor_letra_linha: cor_letra_linha,
          data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
          , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
          , conclusao: response[x][24],
        }]
      });
    }
  }

  atualizar() {
    this.carregarlista(this.tipo);
  }


  getestado(valor) {
    if (valor == "E") {
      return "Em Elaboração"
    } if (valor == "EX") {
      return "Em Execução"
    } if (valor == "EL") {
      return "Em Alteração"
    } if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/ Realizado"
    } else if (valor == "C") {
      return "Controlado/ Verificado"
    } else if (valor == "V") {
      return "Aprovado/ Finalizado"
    } else if (valor == "R") {
      return "Rejeitado"
    } else if (valor == "A") {
      return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    }
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate([this.caminho + '/view'], { queryParams: { id: event.data.id } });
  }

  listartudo() {
    if (this.lista_expand.length == 0) {
      this.lista_expand = this.dados;
    } else {
      this.lista_expand = [];
    }

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

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      if (value == 0 && fil) {
        value = "";
      }
      if (value != null) {
        value = value.toString();
      }

      this.dataTableComponent.filter(value, coluna, filtro);


    }, 250);
  }


}
