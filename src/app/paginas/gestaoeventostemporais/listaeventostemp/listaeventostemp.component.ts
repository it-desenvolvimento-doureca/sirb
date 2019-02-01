import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { GEREVENTOSPROGRAMADOSService } from '../../../servicos/ger-eventos-programados.service';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listaeventostemp',
  templateUrl: './listaeventostemp.component.html',
  styleUrls: ['./listaeventostemp.component.css']
})
export class ListaeventostempComponent implements OnInit {

  cols: any[];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Todos", value: "" }, { label: "Ativo", value: true }, { label: "Inativo", value: false }];

  constructor(private GEREVENTOSPROGRAMADOSService: GEREVENTOSPROGRAMADOSService, private globalVar: AppGlobals, private router: Router) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16apagar"));

    this.preenche_tabela();
  }

  preenche_tabela() {
    this.cols = [];
    this.GEREVENTOSPROGRAMADOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id, modulo: response[x][1].nome_MODULO, data: response[x][0].data_INICIAL + " " + response[x][0].hora.slice(0, 5), pagina: response[x][0].pagina, momento: response[x][0].momento, estado: response[x][0].estado });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['eventosprogramados/view'], { queryParams: { id: event.data.id } });
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

  //filtro coluna linha
  filtrar(value, coluna) {

    this.dataTableComponent.filter(value.toString(), coluna, 'contains');

    /*this.globalVar.setfiltros("eventos", this.dataTableComponent.filters);
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    this.globalVar.setfiltros("eventoss_id", ids);*/
  }

}
