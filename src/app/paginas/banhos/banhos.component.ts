import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { Router } from "@angular/router";
import { DataTable } from "primeng/primeng";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";

@Component({
  selector: 'app-banhos',
  templateUrl: './banhos.component.html',
  styleUrls: ['./banhos.component.css']
})
export class BanhosComponent implements OnInit {
  estados: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  linha: number;
  linhas: any[];
  cols: any;

  constructor(private ABDICLINHAService: ABDICLINHAService, private router: Router, private globalVar: AppGlobals, private ABDICBANHOService: ABDICBANHOService) { }

  ngOnInit() {
    this.estados = [{ label: "Todos", value: "" }, { label: "Ativo", value: true }, { label: "Inativo", value: false }];
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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node012editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node012criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node012apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node012duplicar"));

    this.preenche_tabela();

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: 0 });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }
        this.linha = this.globalVar.getlinha();
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

  }

  preenche_tabela() {
    this.cols = [];
    this.ABDICBANHOService.getAllLINHA().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id_BANHO, linha: response[x][0].id_LINHA, nome: response[x][0].nome_BANHO, tina: response[x][2].cod_TINA, estado: response[x][0].estado, cor: response[x][1].cor });
        }
        this.cols = this.cols.slice();
        this.filtrar(this.globalVar.getlinha(), "linha");
      },
      error => console.log(error));
  }

  //filtro coluni linha
  filtrar(value, coluna) {
    if (value == 0 && coluna == "linha") {
      value = "";
    }
    this.dataTableComponent.filter(value.toString(), coluna, 'contains');
  }
  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.linha = 0;
    this.dataTableComponent.filter("", "", "");
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['banhos/view'], { queryParams: { id: event.data.id } });
  }

  atualizar() {
    this.preenche_tabela();
  }
}
