import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { Router } from '@angular/router';
import { GERSECCAOService } from '../../../../servicos/ger-seccao.service';

@Component({
  selector: 'app-lista-seccoes',
  templateUrl: './lista-seccoes.component.html',
  styleUrls: ['./lista-seccoes.component.css']
})
export class ListaSeccoesComponent implements OnInit {
  cols: any[];

  constructor(private GERSECCAOService: GERSECCAOService, private globalVar: AppGlobals, private router: Router) { }

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
    this.globalVar.setdisCriarmanutencao(false);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node18editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node18criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node18apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node18duplicar"));
    this.preenche_tabela();

  }

  preenche_tabela() {
    //preenche array para navegar nos utilizadores
    this.cols = [];
    this.GERSECCAOService.getAll2().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id, nome: response[x][0].descricao, responsavel: response[x][1].descricao });
        }

        this.cols = this.cols.slice();

      }, error => { console.log(error); });
  }

  atualizar() {
    this.preenche_tabela();
  }


  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['seccoes/view'], { queryParams: { id: event.data.id } });
  }
}
