import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DataTable } from 'primeng/primeng';
import { GER_DIC_PROJ_CAB } from 'app/entidades/GER_DIC_PROJ_CAB';
import { GERDICPROJCABService } from 'app/servicos/ger-dic-proj-cab.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proj',
  templateUrl: './lista-proj.component.html',
  styleUrls: ['./lista-proj.component.css']
})
export class ListaProjComponent implements OnInit {
  dados: any[];
  linhas: any;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private GERDICPROJCABService: GERDICPROJCABService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    //this.estado = "Ativo";

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
    /*this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108apagar"));*/
    var editar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108editar")
    var editar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834editar")
    var criar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108criar")
    var criar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834criar")
    var apagar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108apagar")
    var apagar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834apagar")
    if (editar1 || editar2) this.globalVar.setdisEditar(false);
    if (criar1 || criar2) this.globalVar.setdisCriar(false);
    if (apagar1 || apagar2) this.globalVar.setdisApagar(false);


    this.carregarlista();
  }

  carregarlista() {
    this.dados = [];
    this.GERDICPROJCABService.getAll2().subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.dados.push({
              id: response[x][0], programa: response[x][1],
              oem: response[x][3], veiculo: response[x][2]
            });
            //this.dataTableComponent.filter("Ativo", 'estado', 'equals');
          }

          this.dados = this.dados.slice();
        }
      }, error => { console.log(error); });

  }

  atualizar() {
    this.carregarlista();
  }



  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['producao_projetos/view'], { queryParams: { id: event.data.id } });
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
