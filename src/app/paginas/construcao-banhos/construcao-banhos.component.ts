import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router } from "@angular/router";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { AB_MOV_MANUTENCAO } from "app/entidades/AB_MOV_MANUTENCAO";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { AB_MOV_MANUTENCAO_CAB } from "app/entidades/AB_MOV_MANUTENCAO_CAB";
import { AB_MOV_MANUTENCAO_LINHA } from "app/entidades/AB_MOV_MANUTENCAO_LINHA";
import { ConfirmationService, DataTable } from "primeng/primeng";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICBANHOService } from 'app/servicos/ab-dic-banho.service';

@Component({
  selector: 'app-construcao-banhos',
  templateUrl: './construcao-banhos.component.html',
  styleUrls: ['./construcao-banhos.component.css']
})
export class ConstrucaoBanhosComponent implements OnInit {
  mensagemtabela: string;
  acessoplaneamento = true;
  banho: string;
  banhos: any[];
  filtro2: any;
  filtroval;
  turno: string;
  data: string;
  id_manu: string;
  tina: string;
  estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;
  estado: string;
  data_actual: Date;
  cols: any[];
  filtro = [];

  @ViewChild(DataTable) dataTableComponent: DataTable;
  linha = null;
  linhas: any[] = null;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('waitingDialog') waitingDialog: ElementRef;
  @ViewChild('waitingDialogclose') waitingDialogclose: ElementRef;

  constructor(private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private confirmationService: ConfirmationService, private renderer: Renderer, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.filtroval = true;
    var array = this.globalVar.getfiltros("construcaobanhos");
    if (array) {

      this.linha = (array['linha'] != undefined) ? array['linha'].value : null;
      this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;
      this.id_manu = (array['id'] != undefined) ? array['id'].value : "";
      this.tina = (array['tina'] != undefined) ? array['tina'].value : "";
      this.turno = (array['turno'] != undefined) ? array['turno'].value : "";
      this.data = (array['data'] != undefined) ? array['data'].value : "";
      this.banho = (array['banho'] != undefined) ? array['banho'].value : "";
      this.dataTableComponent.filters = array;


      if (this.filtro2 != null && this.filtro2 != "") {
        var f = this.filtro2.split(',');
        for (var x in f) {
          this.filtro.push(f[x])
        }
        this.filtroval = false;
      }
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];
    this.estados = [{ label: "Em Planeamento", value: "Em Planeamento" }, { label: "Planeado", value: "Planeado" },
    { label: "Em Preparação", value: "Em Preparação" }, { label: "Preparado", value: "Preparado" }, { label: "Em Execução", value: "Em Execução" }, { label: "Executado", value: "Executado" }];

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003apagar"));
    this.disduplicar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003duplicar");
    /*
        if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento")) {
          this.query.push("Em Planeamento");
          this.acessoplaneamento = false;
        }
        if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao") && !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao")) {
          this.query.push("Planeado", "Em Preparação", "Preparado", "Em Execução", "Executado");
        }*/
    var acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento");
    var acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao");
    var acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao");

    if (!acessopla) {
      this.query.push("Em Planeamento");
      this.acessoplaneamento = false;
    }
    if (!acessoprep && !acessopla) {
      this.query.push("Em Planeamento");
      this.acessoplaneamento = false;
    }
    if (!acessoexec && !acessoprep && !acessopla) {
      this.query.push("Em Planeamento", "Planeado", "Em Preparação");
      this.acessoplaneamento = false;
    }

    if (this.filtroval) {
      if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento") && JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao") && JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao")) {
        this.filtro = [];
      } else {
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao")) {
          this.filtro.push("Preparado", "Em Execução");
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao")) {
          this.filtro.push("Planeado", "Em Preparação");
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento")) {
          this.filtro.push("Em Planeamento");
        }
      }
    }
    this.preenche_banhos();
    this.carregarlista();


  }
  carregarlista() {
    this.mensagemtabela = "A Carregar...";
    this.cols = [];
    this.ABMOVMANUTENCAOService.getAll(this.query, "B").subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          var banho = " -- ";
          var tina = " -- "
          if (response[x][11] != null) tina = response[x][11];
          if (response[x][9] != null) banho = response[x][9] + " / " + response[x][10] + " - Tina: " + tina;
          if (!this.acessoplaneamento) {
            var min = (response[x][14] != null) ? response[x][14] : 0;
            var min_max = (response[x][15] != null) ? response[x][15] : 0;
            if (response[x][12] != null) {
              var data = new Date(response[x][12] + " " + response[x][13].slice(0, 5));
              var dataatual = new Date();
              var total = data.getTime() - dataatual.getTime();
              var minutos = Math.round(total / 60000);
              var total_max = dataatual.getTime() - data.getTime();
              var minutos_max = Math.round(total_max / 60000);
              if (minutos <= min && minutos_max <= min_max) {
                this.cols.push({
                  id: response[x][0], tipo_manu: response[x][1], data: this.formatDate(response[x][2]) + " - " + response[x][3].slice(0, 5),
                  cor: response[x][4], linha: response[x][5], turno: response[x][6], estado: response[x][7], tina: tina, banho: banho
                });
              }
            }

          } else {
            this.cols.push({
              id: response[x][0], tipo_manu: response[x][1], data: this.formatDate(response[x][2]) + " - " + response[x][3].slice(0, 5),
              cor: response[x][4], linha: response[x][5], turno: response[x][6], estado: response[x][7], tina: tina, banho: banho
            });
          }
        }
        this.cols = this.cols.slice();
        if (this.linha == null || this.linha == "") this.linha = this.globalVar.getlinha();
        this.filtrar(this.linha, "linha", true);

        if (this.filtroval) this.filtrar(this.filtro, "estado", true, "in");
      },
      error => console.log(error));

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

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.linha = null;
    this.id_manu = "";
    this.tina = "";
    this.data = "";
    this.turno = "";
    this.banho = "";
    this.dataTableComponent.filter("", "", "");
  }

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (value == 0 && fil) {
      value = "";
    }

    //if (coluna == "linha") this.preenche_banhos();
    //if (coluna == "banho") this.pesquisarbanhos(value.id);

    this.dataTableComponent.filter(value.toString(), coluna, filtro);

    this.globalVar.setfiltros("construcaobanhos", this.dataTableComponent.filters);
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    if (this.dataTableComponent.dataToRender.length == 0) {
      this.mensagemtabela = "Nenhum Registo foi encontrado...";
    }
    this.globalVar.setfiltros("construcaobanhos_id", ids);
  }

  atualizaids() {
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    this.globalVar.setfiltros("construcaobanhos_id", ids);
  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['construcaobanhos/view'], { queryParams: { id: event.data.id } });
  }

  duplicar(id) {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {
        this.criarmanu(id);
        this.simular(this.waitingDialog);
      }
    });
  }

  pesquisarbanhos(id) {
    if (id) {
      var ids = [];
      this.ABMOVMANUTENCAOCABService.getbyID_banhoall(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {
            for (var x in response) {
              ids.push(response[x].id_MANUTENCAO);
            }
            this.id_manu = ids.toString();
            this.filtrar(ids, "id", false, "in")
          }
          else {
            this.filtrar('null', "id", false, "in")
          }

        }, error => {
          console.log(error);
        });
    } else {
      this.id_manu = "";
      this.filtrar('', "id", false, "in")
    }
  }

  criarmanu(id) {


    this.data_actual = new Date();
    this.estado = "Em Planeamento";

    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {

        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO = response[x][0];
            MOV_MANUTENCAO.id_MANUTENCAO = null;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.hora_PLANEAMENTO = this.data_actual.toLocaleTimeString().slice(0, 5);
            MOV_MANUTENCAO.inativo = false;
            MOV_MANUTENCAO.data_PLANEAMENTO = this.data_actual;
            MOV_MANUTENCAO.data_CRIA = new Date();
            MOV_MANUTENCAO.utz_CRIA = this.user;
            MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
            MOV_MANUTENCAO.impresso = false;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_MODIF = null;
            MOV_MANUTENCAO.utz_ULT_MODIF = null;
            this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
              res => {
                this.criarmanu_cab(id, res.id_MANUTENCAO);
              }, error => {
                console.log(error);
              });

          }
        }
      },
      error => console.log(error));
  }

  criarmanu_cab(id, id_manu_nova) {
    this.id = id_manu_nova;
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {

        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO_CAB = response[x][0];
            var id = MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB = null;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO = id_manu_nova;
            MOV_MANUTENCAO_CAB.data_CRIA = new Date(new Date().getTime() + (1000 * parseInt(x)))
            MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
            MOV_MANUTENCAO_CAB.data_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.impresso = false;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.utz_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.data_PREVISTA = null;
            MOV_MANUTENCAO_CAB.hora_PREVISTA = null;
            MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = null;
            MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = null;
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = null;
            MOV_MANUTENCAO_CAB.obs_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.id_ANALISE = null;
            MOV_MANUTENCAO_CAB.utz_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.data_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.hora_PREPARACAO = null;

            this.criarmanucac(MOV_MANUTENCAO_CAB, id, count, x);

          }

        } else {
          this.simular(this.inputgravou);
          this.router.navigate(['construcaobanhos/editar'], { queryParams: { id: this.id } });
          this.simular(this.waitingDialogclose);
        }
      });
  }

  criarmanucac(MOV_MANUTENCAO_CAB, id, total, count) {
    this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
      res => {
        this.criarmanu_lin(id, res.id_MANUTENCAO_CAB, total, count);

      }, error => {
        console.log(error);
      });
  }

  criarmanu_lin(id, id_manu_cab_novo, total, count2) {

    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
            MOV_MANUTENCAO_LINHA = response[x][0];
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_LIN = null;
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id_manu_cab_novo;
            MOV_MANUTENCAO_LINHA.valor1 = null;
            MOV_MANUTENCAO_LINHA.valor2 = null;
            MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO = null;
            this.creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x);

          }

        } else {
          if (parseInt(total) - 1 == count2) {
            this.simular(this.inputgravou);
            this.router.navigate(['construcaobanhos/editar'], { queryParams: { id: this.id } });
            this.simular(this.waitingDialogclose);
          }
        }
      },
      error => {
        console.log(error); this.simular(this.inputerro);
      });

  }

  creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x) {
    this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
      res => {
        if (parseInt(total) - 1 == count2 && (count - 1) == parseInt(x)) {
          this.simular(this.inputgravou);
          this.router.navigate(['construcaobanhos/editar'], { queryParams: { id: this.id } });
          this.simular(this.waitingDialogclose);
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
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
    this.carregarlista();
  }

  //preenche combobox banhos
  preenche_banhos() {
    this.banhos = [];
    //preenche combobox banhos
    var linha = 0;
    if (this.linha != null) linha = this.linha;
    this.ABDICBANHOService.getAllLINHAbylinhatodos(linha).subscribe(
      response => {
        this.banhos.push({ label: 'Seleccione Banho', value: "" });
        for (var x in response) {
          var cor = "";
          if (!response[x][0].estado) cor = "red";
          this.banhos.push({ font_cor: cor, label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, id_tina: response[x][2].id_TINA, nome_tina: response[x][2].cod_TINA, capacidade: response[x][2].capacidade } });
        }
        this.banhos = this.banhos.slice();
      },
      error => console.log(error));
  }
}