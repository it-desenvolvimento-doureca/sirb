import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { ABDICLINHAService } from '../../servicos/ab-dic-linha.service';
import { ABMOVMANUTENCAOCABService } from '../../servicos/ab-mov-manutencao-cab.service';
import { ABMOVMANUTENCAOService } from '../../servicos/ab-mov-manutencao.service';
import { AppGlobals } from '../../menu/sidebar.metadata';
import { Router } from '@angular/router';
import { ABDICTIPOMANUTENCAOService } from '../../servicos/ab-dic-tipo-manutencao.service';
import { Observable } from 'rxjs';
import { ABDICBANHOService } from '../../servicos/ab-dic-banho.service';

@Component({
  selector: 'app-listagem-manutencoes',
  templateUrl: './listagem-manutencoes.component.html',
  styleUrls: ['./listagem-manutencoes.component.css']
})
export class ListagemManutencoesComponent implements OnInit {
  manutencao2: any;
  tipo2: any;
  dashb = [];
  criarnaoprogramadas: any;
  criarreposicao: any;
  subscription: any;
  timer;
  tipos: any[];
  manutencoes: { label: string; value: string; }[];
  manutencaoquery = [];
  tipo = [];
  manutencao = [];
  mensagemtabela: string;
  acessoplaneamento = true;
  banho;
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

  constructor(private ABDICBANHOService: ABDICBANHOService, private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

    var acesso1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node040");
    var acesso2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node041");
    if (acesso1) {
      this.dashb.push({ link: '/homegestaobanhos', titulo: "Quadro de análise", ativo: false });
    }
    if (acesso2) {
      this.dashb.push({ link: '/listagem', titulo: "Lista Manutenções Pendentes", ativo: true });
    }


    this.filtroval = true;
    var array = this.globalVar.getfiltros("listagem");
    if (array) {

      this.linha = (array['linha'] != undefined) ? array['linha'].value : null;
      this.filtro2 = (array['estado'] != undefined) ? array['estado'].value : null;
      this.id = (array['id'] != undefined) ? array['id'].value : "";
      this.tina = (array['tina'] != undefined) ? array['tina'].value : "";
      this.tipo2 = (array['tipo'] != undefined) ? array['tipo'].value : "";
      this.data = (array['data'] != undefined) ? array['data'].value : "";
      this.manutencao2 = (array['manutencao'] != undefined) ? array['manutencao'].value : "";
      this.dataTableComponent.filters = array;


      if (this.filtro2 != null && this.filtro2 != "") {
        var f = this.filtro2.split(',');
        for (var x in f) {
          this.filtro.push(f[x])
        }
        this.filtroval = false;
      }

      if (this.tipo2 != null && this.tipo2 != "") {
        var f = this.tipo2.split(',');
        for (var x in f) {
          this.tipo.push(f[x])
        }
      }

      if (this.manutencao2 != null && this.manutencao2 != "") {
        var f = this.manutencao2.split(',');
        for (var x in f) {
          this.manutencao.push(f[x])
        }
      }


    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];
    this.estados = [{ label: "Em Planeamento", value: "Em Planeamento" }, { label: "Planeado", value: "Planeado" },
    { label: "Em Preparação", value: "Em Preparação" }, { label: "Preparado", value: "Preparado" }, { label: "Em Execução", value: "Em Execução" }];

    this.manutencoes = [{ label: "Manutenção Planeada", value: "Manutenção Planeada" }, { label: "Construção Banho", value: "Construção Banho" },
    { label: "Não Programada", value: "Não Programada" }, { label: "Reposição", value: "Reposição" }];

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
    var acessopla = false;
    var acessoprep = false;
    var acessoexec = false;
    var var1 = false;
    var var2 = false;
    var var3 = false;

    var acessob = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003");
    var acessom = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001");
    var acesson = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004");
    var acessor = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005");
    if (acessob) {
      this.manutencaoquery.push("'B'");
      if (!acessopla) acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento");
      if (!acessoprep) acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao");
      if (!acessoexec) acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao");

      if (this.filtroval) {
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003execucao")) {
          if (!var1) { this.filtro.push("Preparado", "Em Execução"); var1 = true; }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003preparacao")) {
          if (!var2) { this.filtro.push("Planeado", "Em Preparação"); var2 = true }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node003planeamento")) {
          if (!var3) { this.filtro.push("Em Planeamento"); var3 = true };
        }

      }
    }
    if (acessom) {
      this.manutencaoquery.push("'M'");
      if (!acessopla) acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001planeamento");
      if (!acessoprep) acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001preparacao");
      if (!acessoexec) acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001execucao");
      if (this.filtroval) {

        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001execucao")) {
          if (!var1) { this.filtro.push("Preparado", "Em Execução"); var1 = true; }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001preparacao")) {
          if (!var2) { this.filtro.push("Planeado", "Em Preparação"); var2 = true }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001planeamento")) {
          if (!var3) { this.filtro.push("Em Planeamento"); var3 = true };
        }

      }
    }
    if (acessor) {
      this.manutencaoquery.push("'R'");
      this.criarreposicao = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005criar");
      if (!acessopla) acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005planeamento");
      if (!acessoprep) acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao");
      if (!acessoexec) acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao");
      if (this.filtroval) {

        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao")) {
          if (!var1) { this.filtro.push("Preparado", "Em Execução"); var1 = true; }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao")) {
          if (!var2) { this.filtro.push("Planeado", "Em Preparação"); var2 = true }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005planeamento")) {
          if (!var3) { this.filtro.push("Em Planeamento"); var3 = true };
        }

      }
    }
    if (acesson) {
      this.manutencaoquery.push("'N'");
      this.criarnaoprogramadas = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004criar");
      if (!acessopla) acessopla = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004planeamento");
      if (!acessoprep) acessoprep = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004preparacao");
      if (!acessoexec) acessoexec = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004execucao");
      if (this.filtroval) {

        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004execucao")) {
          if (!var1) { this.filtro.push("Preparado", "Em Execução"); var1 = true; }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004preparacao")) {
          if (!var2) { this.filtro.push("Planeado", "Em Preparação"); var2 = true }
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node004planeamento")) {
          if (!var3) { this.filtro.push("Em Planeamento"); var3 = true };
        }

      }
    }

    if (var1 && var2 && var3) this.filtro = [];

    this.query.push("Executado");
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


    //this.carregarlista();
    this.preenche_banhos();
    this.timer = Observable.timer(0, 180000);
    this.subscription = this.timer.subscribe(t => {
      this.carregarlista();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  carregarlista() {
    this.mensagemtabela = "A Carregar...";
    this.cols = [];
    var construcaobanhos_id = [];
    var manutencao_id = [];
    var manutencaonaoprogramada_id = [];
    var manutencaoreposicao_id = [];
    var banho = this.globalVar.getfiltros("listagemidbanho");

    var data = [{ query: this.query.toString(), classif: this.manutencaoquery.toString(), querybanho: banho }];
    this.ABMOVMANUTENCAOService.getAllmanu(data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          var manutencao = "";
          if (response[x][9] == "M") {
            manutencao = "Manutenção Planeada";
          } else if (response[x][9] == "B") {
            manutencao = "Construção Banho";
          } else if (response[x][9] == "N") {
            manutencao = "Não Programada";
          } else if (response[x][9] == "R") {
            manutencao = "Reposição";
          }
          var cor_tipo = "";
          if (response[x][14] != null && response[x][14] != '' && response[x][14] != "#ffffff") {
            cor_tipo = response[x][14];
          }

          if (!this.acessoplaneamento) {
            var min = (response[x][12] != null) ? response[x][12] : 0;
            var min_max = (response[x][13] != null) ? response[x][13] : 0;
            if (response[x][10] != null) {
              var data = new Date(response[x][10] + " " + response[x][11].slice(0, 5));
              var dataatual = new Date();
              var total = data.getTime() - dataatual.getTime();
              var minutos = Math.round(total / 60000);
              var total_max = dataatual.getTime() - data.getTime();
              var minutos_max = Math.round(total_max / 60000);
              if (minutos <= min && minutos_max <= min_max) {
                this.cols.push({
                  id: response[x][0], tipo: response[x][1], data: this.formatDate(response[x][2]) + " - " + response[x][3].slice(0, 5), cor_tipo: cor_tipo,
                  cor: response[x][4], linha: response[x][5], turno: response[x][6], estado: response[x][7], manutencao: manutencao, classif: response[x][9]
                });
              }
            }

          } else {
            this.cols.push({
              id: response[x][0], tipo: response[x][1], data: this.formatDate(response[x][2]) + " - " + response[x][3].slice(0, 5), cor_tipo: cor_tipo,
              cor: response[x][4], linha: response[x][5], turno: response[x][6], estado: response[x][7], manutencao: manutencao, classif: response[x][9]
            });
          }

          if (response[x][9] == "M") {
            manutencao_id.push(response[x][0]);
          } else if (response[x][9] == "B") {
            construcaobanhos_id.push(response[x][0]);
          } else if (response[x][9] == "N") {
            manutencaonaoprogramada_id.push(response[x][0]);
          } else if (response[x][9] == "R") {
            manutencaoreposicao_id.push(response[x][0]);
          }
        }

        this.cols = this.cols.slice();
        if (this.linha == null || this.linha == "") this.linha = this.globalVar.getlinha();
        this.filtrar(this.linha, "linha", true);

        if (this.filtroval) this.filtrar(this.filtro, "estado", true, "in");

        this.globalVar.setfiltros("construcaobanhos_id", construcaobanhos_id);
        this.globalVar.setfiltros("manutencao_id", manutencao_id);
        this.globalVar.setfiltros("manutencaonaoprogramada_id", manutencaonaoprogramada_id);
        this.globalVar.setfiltros("manutencaoreposicao_id", manutencaoreposicao_id);

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

    this.ABDICTIPOMANUTENCAOService.getAll(["M", "B", "R", "N"]).subscribe(
      response => {
        this.tipos = [];
        for (var x in response) {
          this.tipos.push({ label: response[x].nome_TIPO_MANUTENCAO, value: response[x].nome_TIPO_MANUTENCAO });
        }
        this.tipos = this.tipos.slice();
      },
      error => console.log(error));

  }


  pesquisarbanhos(id) {
    this.globalVar.setfiltros("listagemidbanho", id);

    this.carregarlista();
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.linha = null;
    this.id = "";
    this.data = "";
    this.turno = "";
    this.tipo = null;
    this.manutencao = null;
    this.dataTableComponent.filter("", "", "");
    if (this.banho != null) {
      this.banho = null;
      this.globalVar.setfiltros("listagemidbanho", null);
      this.carregarlista();
    }
  }

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (value == 0 && fil) {
      value = "";
    }

    //if (coluna == "linha") this.preenche_banhos();
    //if (coluna == "banho") this.pesquisarbanhos(value.id);

    this.dataTableComponent.filter(value.toString(), coluna, filtro);

    this.globalVar.setfiltros("listagem", this.dataTableComponent.filters);
    var construcaobanhos_id = [];
    var manutencao_id = [];
    var manutencaonaoprogramada_id = [];
    var manutencaoreposicao_id = [];
    for (var x in this.dataTableComponent.dataToRender) {
      if (this.dataTableComponent.dataToRender[x].classif == "M") {
        manutencao_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "B") {
        construcaobanhos_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "N") {
        manutencaonaoprogramada_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "R") {
        manutencaoreposicao_id.push(this.dataTableComponent.dataToRender[x].id);
      }
    }
    if (this.dataTableComponent.dataToRender.length == 0) {
      this.mensagemtabela = "Nenhum Registo foi encontrado...";
    }
    this.globalVar.setfiltros("construcaobanhos_id", construcaobanhos_id);
    this.globalVar.setfiltros("manutencao_id", manutencao_id);
    this.globalVar.setfiltros("manutencaonaoprogramada_id", manutencaonaoprogramada_id);
    this.globalVar.setfiltros("manutencaoreposicao_id", manutencaoreposicao_id);
  }

  atualizaids() {
    var construcaobanhos_id = [];
    var manutencao_id = [];
    var manutencaonaoprogramada_id = [];
    var manutencaoreposicao_id = [];
    for (var x in this.dataTableComponent.dataToRender) {
      if (this.dataTableComponent.dataToRender[x].classif == "M") {
        manutencao_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "B") {
        construcaobanhos_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "N") {
        manutencaonaoprogramada_id.push(this.dataTableComponent.dataToRender[x].id);
      } else if (this.dataTableComponent.dataToRender[x].classif == "R") {
        manutencaoreposicao_id.push(this.dataTableComponent.dataToRender[x].id);
      }
    }
    this.globalVar.setfiltros("construcaobanhos_id", construcaobanhos_id);
    this.globalVar.setfiltros("manutencao_id", manutencao_id);
    this.globalVar.setfiltros("manutencaonaoprogramada_id", manutencaonaoprogramada_id);
    this.globalVar.setfiltros("manutencaoreposicao_id", manutencaoreposicao_id);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    if (event.data.classif == "M") {
      this.router.navigate(['manutencao/view'], { queryParams: { id: event.data.id, redirect: "listagem" } });
    } else if (event.data.classif == "B") {
      this.router.navigate(['construcaobanhos/view'], { queryParams: { id: event.data.id, redirect: "listagem" } });
    } else if (event.data.classif == "N") {
      this.router.navigate(['manutencaonaoprogramada/view'], { queryParams: { id: event.data.id, redirect: "listagem" } });
    } else if (event.data.classif == "R") {
      this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: event.data.id, redirect: "listagem" } });
    }
  }
  navegar(id, classif) {
    if (classif == "M") {
      this.router.navigate(['manutencao/view'], { queryParams: { id: id, redirect: "listagem" } });
    } else if (classif == "B") {
      this.router.navigate(['construcaobanhos/view'], { queryParams: { id: id, redirect: "listagem" } });
    } else if (classif == "N") {
      this.router.navigate(['manutencaonaoprogramada/view'], { queryParams: { id: id, redirect: "listagem" } });
    } else if (classif == "R") {
      this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: id, redirect: "listagem" } });
    }
  }

  novomanutenao() {
    this.router.navigate(['manutencaonaoprogramada/novo'], { queryParams: { redirect: "listagem" } });
  }

  novomanuterep() {
    this.router.navigate(['manutencaoreposicao/novo'], { queryParams: { redirect: "listagem" } });
  }

  /*pesquisarbanhos(id) {
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
  }*/


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
    this.ABDICBANHOService.getAllLINHAbylinha(linha).subscribe(
      response => {
        this.banhos.push({ label: 'Seleccione Banho', value: null });
        for (var x in response) {
          this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: response[x][0].id_BANHO });
        }
        this.banhos = this.banhos.slice();
        var count = 0;
        if (this.globalVar.getfiltros("listagemidbanho")) count = 1;
        if (count > 0) this.banho = this.globalVar.getfiltros("listagemidbanho");
      },
      error => console.log(error));
  }

}