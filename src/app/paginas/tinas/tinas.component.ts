import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { Router } from "@angular/router";
import { DataTable } from "primeng/primeng";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICZONAService } from 'app/servicos/ab-dic-zona.service';

@Component({
  selector: 'app-tinas',
  templateUrl: './tinas.component.html',
  styleUrls: ['./tinas.component.css']
})
export class TinasComponent implements OnInit {
  zona: number;
  zonas: any = [];
  linha: number;
  linhas: any[];
  cols: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private ABDICZONAService: ABDICZONAService, private ABDICLINHAService: ABDICLINHAService, private router: Router, private globalVar: AppGlobals, private ABDICTINAService: ABDICTINAService) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010duplicar"));

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

    //preenche combobox zonas
    this.ABDICZONAService.getAll().subscribe(
      response => {
        this.zonas = [];
        this.zonas.push({ label: "Sel. Zona", value: 0 });
        for (var x in response) {
          this.zonas.push({ label: response[x].nome_ZONA, value: response[x].nome_ZONA });
        }
        this.zona = this.globalVar.getlinha();
        this.zonas = this.zonas.slice();
      },
      error => console.log(error));

  }

  preenche_tabela() {
    this.cols = [];
    this.ABDICTINAService.getAll2(0).subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id_TINA, linha: response[x][0].id_LINHA, zona: response[x][2], cod: response[x][0].cod_TINA, obs: response[x][0].obs, cor: response[x][1].cor });
        }
        this.cols = this.cols.slice();
        this.filtrar(this.globalVar.getlinha(), "linha");
      },
      error => console.log(error));
  }

  //filtro coluni linha
  filtrar(value, coluna) {
    if (value == 0) {
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
    this.zona = 0;
    this.dataTableComponent.filter("", "", "");
  }


  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['tinas/view'], { queryParams: { id: event.data.id } });
  }

  atualizar() {
    this.preenche_tabela();
  }

}
