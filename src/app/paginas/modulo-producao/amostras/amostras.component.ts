import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DataTable } from 'primeng/primeng';
import { PRAMOSTRASCABService } from 'app/servicos/pr-amostras-cab.service';

@Component({
  selector: 'app-amostras',
  templateUrl: './amostras.component.html',
  styleUrls: ['./amostras.component.css']
})
export class AmostrasComponent implements OnInit {
  dados: any[];
  linhas: any;
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Sel. Estado", value: null }, { label: "Planeado", value: "Planeado" }, { label: "Desenvolvido/Realizado", value: "Desenvolvido/Realizado" }
    , { label: "Controlado/Verificado", value: "Controlado/Verificado" }, { label: "Aprovado/Fechado", value: "Aprovado/Fechado" }, { value: "Cancelado", label: "Cancelado" }];
  unidades = [{ value: null, label: "Sel. Unidade" }, { value: "Formariz", label: "Formariz" }, { value: "São Bento", label: "São Bento" }];
  constructor(private ABDICLINHAService: ABDICLINHAService, private PRAMOSTRASCABService: PRAMOSTRASCABService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node93apagar"));


    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: 0 });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }

        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    this.carregarlista();
  }

  carregarlista() {
    this.dados = [];
    this.PRAMOSTRASCABService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.dados.push({
              id: response[x][0].id_AMOSTRA,
              data_registo: (response[x][0].data_LANCAMENTO == null) ? "" : this.formatDate(response[x][0].data_LANCAMENTO),
              linha: response[x][0].id_LINHA, descricao: response[x][0].descricao
              , referencia: response[x][0].referencia, unidade: this.getUnidade(response[x][0].unidade)
              , estado: this.getestado(response[x][0].estado), cor: response[x][1],
              quant_barras: response[x][0].quant_BARRAS, tipologia: response[x][2], indice: response[x][0].indice

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

  getUnidade(valor) {
    if (valor == 1) {
      return "Formariz"
    } else if (valor == 2) {
      return "São Bento"
    } else {
      return ""
    }
  }

  getestado(valor) {
    if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/Realizado"
    } else if (valor == "V") {
      return "Aprovado/Fechado"
    } else if (valor == "C") {
      return "Controlado/Verificado"
    } else if (valor == "A") {
      //return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    }
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['producao/amostras/view'], { queryParams: { id: event.data.id } });
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
