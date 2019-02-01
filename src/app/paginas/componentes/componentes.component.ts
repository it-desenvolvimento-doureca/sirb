import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { DataTable } from "primeng/primeng";

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  tipo: string;
  id: string;
  nome: string;
  cols: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private router: Router, private globalVar: AppGlobals, private ABDICCOMPONENTEService: ABDICCOMPONENTEService) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011duplicar"));
    this.preenche_tabela();
  }

  preenche_tabela() {
    this.cols = [];
    this.ABDICCOMPONENTEService.getAll("T").subscribe(
      response => {
        for (var x in response) {
          var tipo = "";
          if (response[x].tipo == "T") {
            tipo = "Componente / Aditivo";
          } else if (response[x].tipo == "A") {
            tipo = "Aditivo";
          } else if (response[x].tipo == "C") {
            tipo = "Componente";
          }
          this.cols.push({
            id: response[x].id_COMPONENTE, nome: response[x].nome_COMPONENTE, tipo: tipo, cisterna: response[x].cisterna
          });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  addNewEntry(event) {
    alert();
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['componentes/view'], { queryParams: { id: event.data.id } });
  }

  //limpar filtro
  reset() {
    this.nome = "";
    this.id = "";
    this.tipo = "";
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.dataTableComponent.filter("", "", "");
  }

  atualizar() {
    this.preenche_tabela();
  }

  //filtro coluna linha
  filtrar(value, coluna, filtro = "contains") {
    if (value == 0) {
      value = "";
    }
    this.dataTableComponent.filter(value.toString(), coluna, filtro);

  }
}