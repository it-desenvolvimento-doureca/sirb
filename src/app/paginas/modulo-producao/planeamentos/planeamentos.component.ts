import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { PLANEAMENTOCABService } from 'app/servicos/planeamento-cab.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-planeamentos',
  templateUrl: './planeamentos.component.html',
  styleUrls: ['./planeamentos.component.css']
})
export class PlaneamentosComponent implements OnInit {
  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  dados = [];
  linhas: any[];
  estados = [{ label: "Sel. Estado", value: "0" }, { label: "Ativo", value: "Ativo" }, { label: "Inativo", value: "Inativo" }]
  estado: string;
  constructor(private ABDICLINHAService: ABDICLINHAService, private PLANEAMENTOCABService: PLANEAMENTOCABService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.estado = "Ativo";

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92apagar"));


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
    this.PLANEAMENTOCABService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {

            var str = "0" + response[x][0].semana;
            var semana = str.substring(str.length - 2, str.length);

            this.dados.push({
              id_PLANEAMENTO: response[x][0].id_PLANEAMENTO,
              data_registo: (response[x][0].data_CRIA == null) ? "" : this.formatDate(response[x][0].data_CRIA),
              ano: response[x][0].ano, linha: response[x][0].linha, semana: semana
              , cor: response[x][1]
              , estado: (response[x][0].inativo) ? "Inativo" : "Ativo"
              //numero: response[x].numero_PESSOA,
              //nome: response[x].nome_PESSOA,
              //data_ocorrencia: (response[x].data_ACIDENTE == null) ? "" : this.formatDate(response[x].data_ACIDENTE) + " " + response[x].hora_ACIDENTE.slice(0, 5),
              //local: response[x].local_ACIDENTE,
              //estado: this.getestado(response[x].estado),
            });
            this.dataTableComponent.filter("Ativo", 'estado', 'equals');
          }

          this.dados = this.dados.slice();
        }
      }, error => { console.log(error); });

  }

  atualizar() {
    this.carregarlista();
  }


  gettipo(valor) {
    if (valor == "OP") {
      return "Ocorrência Perigosa";
    } else if (valor == "E") {
      return "Emergência/1ºs socorros";
    } else if (valor == "CB") {
      return "Com Baixa";
    } else if (valor == "SB") {
      return "Sem Baixa";
    }
  }

  getestado(valor) {
    if (valor == "E") {
      return "Aberta"
    } else if (valor == "F") {
      return "Fechadda"
    } else if (valor == "A") {
      return "Anulada"
    }
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['producao/planeamento/view'], { queryParams: { id: event.data.id_PLANEAMENTO } });
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

      this.dataTableComponent.filter(value.toString(), coluna, filtro);


    }, 250);
  }


}
