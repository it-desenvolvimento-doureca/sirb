import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRPLANEAMENTOPRODUCAOCABService } from 'app/servicos/pr-planeamento-producao-cab.service';

@Component({
  selector: 'app-planeamento-producao',
  templateUrl: './planeamento-producao.component.html',
  styleUrls: ['./planeamento-producao.component.css']
})
export class PlaneamentoProducaoComponent implements OnInit {
  dados: any[];
  linhas: any;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private PRPLANEAMENTOPRODUCAOCABService: PRPLANEAMENTOPRODUCAOCABService, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node99apagar"));


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

    this.carregarlista();
  }

  carregarlista() {
    this.dados = [];

    this.PRPLANEAMENTOPRODUCAOCABService.getAll2().subscribe(
      response => {

        for (var x in response) {
          this.dados.push({
            id: response[x][0],
            data_registo: this.formatDate(response[x][1]),
            data_mrp: this.formatDate(response[x][8]),
            utilizador: response[x][2],
            n_mrp: response[x][3],
            linha: response[x][4],
            primeira_semana: response[x][7],
            cor: response[x][5],
            estado: this.getEstado(response[x][6])
          });
        }

        this.dados = this.dados.slice();
      },
      error => console.log(error));

  }


  getEstado(valor) {
    if (valor == "C") {
      return "Criado"
    } if (valor == "F") {
      return "Fechado"
    }
  }

  atualizar() {
    this.carregarlista();
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['planeamento_producao/view'], { queryParams: { id: event.data.id } });
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
