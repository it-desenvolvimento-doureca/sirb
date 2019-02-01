import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { GERGRUPOService } from '../../../../servicos/ger-grupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit {
  cols: any[];

  constructor(private GERGRUPOService: GERGRUPOService, private globalVar: AppGlobals, private router: Router) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19duplicar"));
    this.preenche_tabela();

  }

  preenche_tabela() {
    //preenche array para navegar nos utilizadores
    this.cols = [];
    this.GERGRUPOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x].id, nome: response[x].descricao });
        }

        this.cols = this.cols.slice();

      }, error => { console.log(error); });
  }

  atualizar() {
    this.preenche_tabela();
  }


  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['grupos/view'], { queryParams: { id: event.data.id } });
  }
}
