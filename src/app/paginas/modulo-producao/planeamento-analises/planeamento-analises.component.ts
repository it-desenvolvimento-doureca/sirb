import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRPLANEAMENTOPRODUCAOANALISESService } from 'app/servicos/pr-planeamento-producao-analises.service';

@Component({
  selector: 'app-planeamento-analises',
  templateUrl: './planeamento-analises.component.html',
  styleUrls: ['./planeamento-analises.component.css']
})
export class PlaneamentoAnalisesComponent implements OnInit {
  dados: any[];

  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private renderer: Renderer, private router: Router, private globalVar: AppGlobals,
    private PRPLANEAMENTOPRODUCAOANALISESService: PRPLANEAMENTOPRODUCAOANALISESService) { }

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node991apagar"));



    this.carregarlista();
  }

  carregarlista() {
    this.dados = [];

    this.PRPLANEAMENTOPRODUCAOANALISESService.getAll2().subscribe(
      response => {

        for (var x in response) {
          this.dados.push({
            id: response[x][0],
            data: this.formatDate(response[x][1]),
            semana: response[x][2],
            plano1: response[x][5],
            plano2: response[x][6],
          });
        }

        this.dados = this.dados.slice();
      },
      error => console.log(error));

  }

  atualizar() {
    this.carregarlista();
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['planeamento_analises/view'], { queryParams: { id: event.data.id } });
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
