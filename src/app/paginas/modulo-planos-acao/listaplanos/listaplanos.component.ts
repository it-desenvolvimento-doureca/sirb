import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { PAMOVCABService } from 'app/servicos/pa-mov-cab.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-listaplanos',
  templateUrl: './listaplanos.component.html',
  styleUrls: ['./listaplanos.component.css']
})
export class ListaplanosComponent implements OnInit {
  dados: any[];
  linhas: any;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Sel. Estado", value: null }, { label: "Em Elaboração", value: "Em Elaboração" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvido/Realizado", value: "Desenvolvido/ Realizado" }, { label: "Controlado/Verificado", value: "Controlado/ Verificado" },
  { label: "Aprovado/Finalizado", value: "Aprovado/ Finalizado" }, { value: "Rejeitado", label: "Rejeitado" }, { value: "Cancelado", label: "Cancelado" }];
  tipo: any;
  caminho: string;
  estado_filtro = [];
  lista_expand = [];
  FastResponse = false;
  acoes_em_ATRASO = false;

  constructor(private ABDICLINHAService: ABDICLINHAService,
    private PAMOVCABService: PAMOVCABService, private route: ActivatedRoute,
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
    var node = "node155";
    this.tipo = "T";
    this.caminho = urlarray[0];
    if (urlarray[0] == 'planosacaoengenaria') {
      node = "node07";
      this.tipo = "EP";
    } else if (urlarray[0] == 'planosacaoproducao') {
      node = "node97";
      this.tipo = "P";
    } else if (urlarray[0] == 'planosacaologistica') {
      node = "node1011";
      this.tipo = "L";
    } else if (urlarray[0] == 'planosacaomanutencao') {
      node = "node1561";
      this.tipo = "M";
    } else if (urlarray[0] == 'planosacaoinjecao') {
      node = "node1571";
      this.tipo = "I";
    } else if (urlarray[0] == 'planosacaoComercial') {
      node = "node1581";
      this.tipo = "C";
    } else if (urlarray[0] == 'planosacaoProjetos') {
      node = "node1591";
      this.tipo = "PR";
    } else if (urlarray[0] == 'planosacaoFinanceira') {
      node = "node1601";
      this.tipo = "F";
    } else if (urlarray[0] == 'planosacaoqualidade') {
      node = "node54";
      this.tipo = "Q";
    }

    if (this.tipo != "T") {
      this.estado_filtro = ["Em Elaboração", "Planeado", "Desenvolvido/ Realizado", "Controlado/ Verificado"];
      this.filtrar(this.estado_filtro, "estado", true, "in");
    }

    if (this.tipo == 'T') {
      this.globalVar.setcriar(false);
    }
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "apagar"));


    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: 0 });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }

        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    this.carregarlista(this.tipo);
  }

  carregarlista(tipo) {
    this.dados = [];
    this.lista_expand = [];
    //acoes_em_ATRASO
    var filtros = [{ FASTRESPONSE: this.FastResponse, EM_ATRASO: this.acoes_em_ATRASO }];
    this.PAMOVCABService.getPA_MOV_CABbyTIPO(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            /*if (this.FastResponse) {
              if (response[x][14]) this.adicionar_linhas(response, x);
            } else {
              this.adicionar_linhas(response, x);
            }*/
            this.adicionar_linhas(response, x);
            //this.dataTableComponent.filter("Ativo", 'estado', 'equals');
          }

          this.dados = this.dados.slice();

        }
      }, error => { console.log(error); });

  }

  adicionar_linhas(response, x) {
    var linha = this.dados.find(item => item.id == response[x][0]);
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
      });
    } else {
      this.dados.push({
        id: response[x][0], cor: cor, cor_letra: cor_letra,
        data_registo: (response[x][1] == null) ? "" : this.formatDate(response[x][1]),
        data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
        /*linha: response[x][0].id_LINHA, designacao: response[x][0].design_REFERENCIA, referencia: response[x][0].referencia, departamento_origem: response[x][2],*/
        descricao: response[x][6],
        ambito: response[x][15]/*this.getAmbito(response[x][3])*/, origem: response[x][4],
        estado: this.getestado(response[x][7]), //cor: response[x][1],
        utilizador: response[x][5],
        filho: [{
          corlinha: corlinha, cor_letra_linha: cor_letra_linha,
          data_acao: response[x][8], utilizador: response[x][9], acao: response[x][10]
          , descricao: response[x][11], FastResponse: response[x][14], prioridade: response[x][12], estado: this.getestado(response[x][13])
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
      //return "Anulado"
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

  /*getAmbito(id) {
    if (id == 1) {
      return "Reclamações Clientes";
    } else if (id == 2) {
      return "Reclamações Fornecedores";
    } else if (id == 3) {
      return "Amostras";
    } else if (id == 4) {
      return "Auditoria Externa";
    } else if (id == 5) {
      return "Auditoria Interna";
    } else if (id == 6) {
      return "Visita de Cliente";
    } else if (id == 7) {
      return "Performance Cliente";
    } else if (id == 8) {
      return "Metalização";
    } else if (id == 9) {
      return "Seguimento de Peças Injetadas";
    } else if (id == 10) {
      return "Melhoria Interna";
    } else if (id == 11) {
      return "Auditoria Produto";
    } else if (id == 12) {
      return "Checklist Arranque";
    }
  }*/


}
