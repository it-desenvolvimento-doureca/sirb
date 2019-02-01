import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router } from "@angular/router";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { DataTable } from "primeng/primeng";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';

@Component({
  selector: 'app-registoanalises',
  templateUrl: './registoanalises.component.html',
  styleUrls: ['./registoanalises.component.css']
})
export class RegistoanalisesComponent implements OnInit {
  mensagemtabela: string;
  banho: string;
  tina: string;
  data_registo: string;
  codigo_analise: string;
  cores: any = [];
  estado: number;
  cols: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  linha = null;
  linhas: any[];
  estados = [{ label: "--", value: 0 }, { label: "Concluída", value: "Concluída" }, { label: "Em Elaboração", value: "Em Elaboração" }, { label: "Validada", value: "Validada" }]
  tipo_analise = [{ label: "--", value: 0 }, { label: "INTERNA", value: "INTERNA" }, { label: "EXTERNA", value: "EXTERNA" }, { label: "PURIFICAÇÃO", value: "PURIFICAÇÃO" }];
  tipo_anali;
  datacria2: any;
  datacria1: any;

  constructor(private ABMOVANALISELINHAService: ABMOVANALISELINHAService, private ABDICLINHAService: ABDICLINHAService, private router: Router, private globalVar: AppGlobals, private ABMOVANALISEService: ABMOVANALISEService) { }

  ngOnInit() {
    var array = this.globalVar.getfiltros("analises");
    if (array) {

      this.linha = (array['linha'] != undefined) ? array['linha'].value : null;
      this.estado = (array['estado'] != undefined) ? array['estado'].value : 0;
      this.tipo_anali = (array['tipo_analise'] != undefined) ? array['tipo_analise'].value : "";
      this.codigo_analise = (array['id'] != undefined) ? array['id'].value : "";
      this.tina = (array['tina'] != undefined) ? array['tina'].value : "";
      this.data_registo = (array['data'] != undefined) ? array['data'].value : "";
      this.banho = (array['nome'] != undefined) ? array['nome'].value : "";
      this.dataTableComponent.filters = array;

    }

    var data_fim = new Date();
    var d = new Date();
    d.setMonth(d.getMonth() - 2);
    this.datacria1 = d;
    this.datacria2 = data_fim;

    this.globalVar.setvoltar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000duplicar"));

    this.mensagemtabela = "A Carregar...";
    this.preenche_tabela();

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: 0 });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }
        if (this.linha == null || this.linha == "") this.linha = this.globalVar.getlinha();
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

  }

  preenche_tabela() {
    this.cols = [];

    var data = [{ DATA: this.formatDate(this.datacria1), DATA_FIM: this.formatDate(this.datacria2) }];
    this.ABMOVANALISEService.getAll2(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          var estado = "";
          var tipoanalise = "";;
          if (response[x][0].estado == "C") {
            estado = "Concluída";
          } else if (response[x][0].estado == "E") {
            estado = "Em Elaboração"
          } else if (response[x][0].estado == "V") {
            estado = "Validada"
          }

          if (response[x][0].analise_INT_EXT == "I") {
            tipoanalise = "INTERNA";
          } else if (response[x][0].analise_INT_EXT == "E") {
            tipoanalise = "EXTERNA";
          } else if (response[x][0].analise_INT_EXT == "P") {
            tipoanalise = "PURIFICAÇÃO";
          }
          var cor = "";
          if (response[x][0].cor_LIMITES == "vermelho") {
            cor = "rgba(239, 19, 19, 0.58)";
          } else if (response[x][0].cor_LIMITES == "amarelo") {
            cor = "rgba(255, 255, 0, 0.62)";
          } else {
            cor = "none";
          }
          this.cols.push({ cor_banho: cor, tipo_analise: tipoanalise, estado: estado, id: response[x][0].id_ANALISE, linha: response[x][0].id_LINHA, data: this.formatDate(response[x][0].data_ANALISE), nome: response[x][2].id_BANHO + ' - ' + response[x][2].nome_BANHO, tina: response[x][3].cod_TINA, cor: response[x][1].cor });
        }
        this.cols = this.cols.slice();
        if (this.linha == null || this.linha == "") this.linha = this.globalVar.getlinha();
        this.filtrar(this.linha, "linha");
      },
      error => console.log(error));


  }

  //filtro coluna linha
  filtrar(value, coluna) {

    if (value == 0) {
      value = "";
    }
    this.dataTableComponent.filter(value.toString(), coluna, 'contains');

    this.globalVar.setfiltros("analises", this.dataTableComponent.filters);
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    this.globalVar.setfiltros("analises_id", ids);
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.linha = null;
    this.estado = 0;
    this.tipo_anali = 0;
    this.codigo_analise = "";
    this.tina = "";
    this.data_registo = "";
    this.banho = "";
    this.dataTableComponent.filter("", "", "");
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['registo/view'], { queryParams: { id: event.data.id } });
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
    this.mensagemtabela = "A Carregar...";
    this.preenche_tabela();
  }






}
