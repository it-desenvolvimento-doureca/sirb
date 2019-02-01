import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { DataTable } from "primeng/primeng";

@Component({
  selector: 'app-utilizadores',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizadores.component.css']
})
export class UtilizadoresComponent implements OnInit {
  cols: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private router: Router, private globalVar: AppGlobals, private GERUTILIZADORESService: GERUTILIZADORESService) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10duplicar"));
    this.preenche_tabela();

  }

  preenche_tabela() {
    this.cols = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x].id_UTILIZADOR, nome: response[x].nome_UTILIZADOR, admin: response[x].admin, codigo: response[x].cod_UTZ });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['utilizadores/view'], { queryParams: { id: event.data.id } });
  }
  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.dataTableComponent.filter("", "", "");
  }

  atualizar() {
    this.preenche_tabela();
  }
}