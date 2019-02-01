import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/primeng';
import { GEREVENTOSCONFService } from 'app/servicos/ger-eventos-conf.service';

@Component({
  selector: 'app-eventoslista',
  templateUrl: './eventoslista.component.html',
  styleUrls: ['./eventoslista.component.css']
})
export class EventoslistaComponent implements OnInit {
  cols: any[];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Todos", value: "" }, { label: "Ativo", value: true }, { label: "Inativo", value: false }];

  constructor(private GEREVENTOSCONFService: GEREVENTOSCONFService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
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
    this.GEREVENTOSCONFService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id_EVENTO, modulo: response[x][1].nome_MODULO, pagina: response[x][0].pagina, momento: response[x][0].momento, estado: response[x][0].estado });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['eventos/view'], { queryParams: { id: event.data.id } });
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
