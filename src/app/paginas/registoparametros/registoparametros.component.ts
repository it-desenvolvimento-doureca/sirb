import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { DataTable } from "primeng/primeng";

@Component({
  selector: 'app-registoparametros',
  templateUrl: './registoparametros.component.html',
  styleUrls: ['./registoparametros.component.css']
})
export class RegistoparametrosComponent implements OnInit {
  mensagemtabela: string;
  estado: string;
  cols: any[];
  estados = [{ label: "--", value: "" }, { label: "Registado", value: "Registado" }, { label: "Validado", value: "Validado" }];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  constructor(private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002duplicar"));

    this.mensagemtabela = "A Carregar...";
    this.carrega_tabela();
  }

  carrega_tabela() {
    this.cols = [];
    this.ADMOVREGPARAMOPERACAOService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          var estado = "Registado";
          if (response[x][0].data_VALIDA != null) {
            estado = "Validado";
          }
          var decisao = "";
          var cor = "";
          if (response[x][0].decisao == "p") {
            decisao = "Parar a Produção";
            var cor = "red";
          } else if (response[x][0].decisao == "s") {
            decisao = "Seguir com a Produção";
          }
          this.cols.push({
            id: response[x][0].id_REG_PARAM_OPERA,
            data: this.formatDate(response[x][0].data_CRIA), estado: estado, decisao: decisao, cor: cor
          });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['registopara/view'], { queryParams: { id: event.data.id, estado: event.data.estado } });
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.estado = "";
    this.dataTableComponent.filter("", "", "");
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
  atualizar() {
    this.carrega_tabela();
  }
}