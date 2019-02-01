import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";
import { Router } from "@angular/router";
import { DataTable } from "primeng/primeng";
@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  cols: any[] = [];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  constructor(private GERFORNECEDORService: GERFORNECEDORService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013apagar"));

    this.preenche_tabela();
  }

  preenche_tabela() {
    this.cols = [];
    this.GERFORNECEDORService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x].id_FORNECEDOR, nome: response[x].nome_FORNECEDOR, num: response[x].num_FORNECEDOR });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['fornecedor/view'], { queryParams: { id: event.data.id } });
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    };
    this.dataTableComponent.filter("", "", "");
  }

  atualizar() {
    this.preenche_tabela();
  }
}
