import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { PLANEAMENTOCABService } from 'app/servicos/planeamento-cab.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { PLANEAMENTO_CAB } from 'app/entidades/PLANEAMENTO_CAB';
import { PLANEAMENTOLINHASService } from 'app/servicos/planeamento-linhas.service';
import { PLANEAMENTO_LINHAS } from 'app/entidades/PLANEAMENTO_LINHAS';

@Component({
  selector: 'app-planeamentos-form',
  templateUrl: './planeamentos-form.component.html',
  styleUrls: ['./planeamentos-form.component.css']
})
export class PlaneamentosFormComponent implements OnInit {
  modoedicao: boolean;
  novo: boolean;
  user: any;
  user_nome: any;
  adminuser: any;
  linhas: any[];
  cor_linha: any;
  ano;
  semana;
  linha;
  dados_linha = [];
  anos = [];
  semanas = [];
  total: number;
  total1: number;
  total2: number;
  total3: number;
  total4: number;
  total5: number;
  total6: number;
  total7: number;
  total8: number;
  total9: number;
  total10: number;
  total11: number;
  total12: number;
  total13: number;
  total14: number;
  total15: number;
  dados: PLANEAMENTO_CAB;


  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;

  id_PLANEAMENTO: any;
  displayverificar: boolean;
  mensagem_verifica: string;

  constructor(private PLANEAMENTOLINHASService: PLANEAMENTOLINHASService, private ABDICLINHAService: ABDICLINHAService, private location: Location, private elementRef: ElementRef, private confirmationService: ConfirmationService, private route: ActivatedRoute,
    private renderer: Renderer, private PLANEAMENTOCABService: PLANEAMENTOCABService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var y = 1; y <= 53; y++) {
      this.semanas.push({ value: y, label: y })
    }


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);


    if (urlarray[2] != null) {
      if (urlarray[2].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[2].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);

        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

        //this.carregaDados(false, null);

      } else if (urlarray[2].match("view")) {

        this.globalVar.setcriar(true);
      }
    }


    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92apagar"));


    if (!this.novo) {
      this.preenchelinhas(true, id);
    } else {
      this.preenchelinhas(false, id);
      this.ano = new Date().getUTCFullYear();
      this.semana = this.getWeek(new Date()) + 1;
      this.alteraSemana(null);
    }
  }

  preenchelinhas(inicia, id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();
        if (inicia) this.inicia(id);
      },
      error => { console.log(error); if (inicia) this.inicia(id); });
  }



  //ao alterar ano
  alteraAno(event) {
    var data = this.getDateOfWeek(this.semana, this.ano);
    var array = this.getDatesOfWeek(data);
    this.atualizatabela_linhas(array);
  }

  //ao alterar semana
  alteraSemana(event) {
    var data = this.getDateOfWeek(this.semana, this.ano);
    console.log(data)
    var array = this.getDatesOfWeek(data);

    this.atualizatabela_linhas(array);
  }

  atualizatabela_linhas(array) {
    this.dados_linha = [];
    var dia_da_semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    for (var x in array) {
      var num = parseInt(x) + 1;
      this.dados_linha.push({
        id_LINHA: null,
        id_PLANEAMENTO: 0,
        data: this.formatDate(array[x]),
        data_dia: ' (' + dia_da_semana[new Date(array[x]).getDay()] + ')',
        planeadas_TURNO_1: null,
        planeadas_TURNO_2: null,
        planeadas_TURNO_3: null,
        prod_PLANEADAS_TURNO_1: null,
        prod_PLANEADAS_TURNO_2: null,
        prod_PLANEADAS_TURNO_3: null,
        barras_PROD_TURNO_1: null,
        barras_PROD_TURNO_2: null,
        barras_PROD_TURNO_3: null,
        barras_INTROD_TURNO_1: null,
        barras_INTROD_TURNO_2: null,
        barras_INTROD_TURNO_3: null,
      });
    }

    this.dados_linha = this.dados_linha.slice();
    this.atualizatotais();
  }

  inicia(id) {

    this.PLANEAMENTOCABService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.dados = response[0];
          this.id_PLANEAMENTO = response[0].id_PLANEAMENTO;
          this.semana = response[0].semana;
          this.ano = response[0].ano;
          this.linha = this.linhas.find(item => item.value.id === response[0].linha).value;
          this.cor_linha = this.linhas.find(item => item.value.id === response[0].linha).value.cor;

          if (response[0].inativo) {
            var s = document.getElementById("editarclickhidde");
            s.click();
          }

          this.carregalinhas(id);
        }
      }, error => { console.log(error); });

  }

  carregalinhas(id) {
    var dia_da_semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    this.PLANEAMENTOLINHASService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.dados_linha = [];
          for (var x in response) {
            var num = parseInt(x) + 1;
            this.dados_linha.push({
              id_LINHA: response[x].id_LINHA,
              id_PLANEAMENTO: response[x].id_PLANEAMENTO,
              data: this.formatDate(response[x].data),
              data_dia: ' (' + dia_da_semana[new Date(response[x].data).getDay()] + ')',
              planeadas_TURNO_1: response[x].planeadas_TURNO_1,
              planeadas_TURNO_2: response[x].planeadas_TURNO_2,
              planeadas_TURNO_3: response[x].planeadas_TURNO_3,
              prod_PLANEADAS_TURNO_1: response[x].prod_PLANEADAS_TURNO_1,
              prod_PLANEADAS_TURNO_2: response[x].prod_PLANEADAS_TURNO_2,
              prod_PLANEADAS_TURNO_3: response[x].prod_PLANEADAS_TURNO_3,
              barras_PROD_TURNO_1: response[x].barras_PROD_TURNO_1,
              barras_PROD_TURNO_2: response[x].barras_PROD_TURNO_2,
              barras_PROD_TURNO_3: response[x].barras_PROD_TURNO_3,
              barras_INTROD_TURNO_1: response[x].barras_INTROD_TURNO_1,
              barras_INTROD_TURNO_2: response[x].barras_INTROD_TURNO_2,
              barras_INTROD_TURNO_3: response[x].barras_INTROD_TURNO_3,
            });
          }

          this.dados_linha = this.dados_linha.slice();
          this.atualizatotais();
        }
      }, error => { console.log(error); });
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  getDateOfWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }


  getDatesOfWeek(date) {


    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    var firstDateOfWeek = new Date(date.setDate(diff));
    var datesOfMonthOnWeek = [];

    for (var i = 0; i < 7; i++) {

      datesOfMonthOnWeek.push(
        new Date(+firstDateOfWeek));

      firstDateOfWeek.setDate(
        firstDateOfWeek.getDate() + 1);
    }

    return datesOfMonthOnWeek;
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


  atualizatotais() {

    this.total = 0;
    this.total1 = 0;
    this.total2 = 0;
    this.total3 = 0;
    this.total4 = 0;
    this.total5 = 0;
    this.total6 = 0;
    this.total7 = 0;
    this.total8 = 0;
    this.total9 = 0;
    this.total10 = 0;
    this.total11 = 0;
    this.total12 = 0;
    this.total13 = 0;
    this.total14 = 0;
    this.total15 = 0;

    for (var x in this.dados_linha) {

      this.total += this.dados_linha[x].planeadas_TURNO_1;
      this.total1 += this.dados_linha[x].planeadas_TURNO_2;
      this.total2 += this.dados_linha[x].planeadas_TURNO_3;
      this.total3 += this.dados_linha[x].planeadas_TURNO_1 + this.dados_linha[x].planeadas_TURNO_2 + this.dados_linha[x].planeadas_TURNO_3;
      this.total4 += this.dados_linha[x].prod_PLANEADAS_TURNO_1;
      this.total5 += this.dados_linha[x].prod_PLANEADAS_TURNO_2;
      this.total6 += this.dados_linha[x].prod_PLANEADAS_TURNO_3;
      this.total7 += this.dados_linha[x].prod_PLANEADAS_TURNO_1 + this.dados_linha[x].prod_PLANEADAS_TURNO_2 + this.dados_linha[x].prod_PLANEADAS_TURNO_3;
      this.total8 += this.dados_linha[x].barras_PROD_TURNO_1;
      this.total9 += this.dados_linha[x].barras_PROD_TURNO_2;
      this.total10 += this.dados_linha[x].barras_PROD_TURNO_3;
      this.total11 += this.dados_linha[x].barras_PROD_TURNO_1 + this.dados_linha[x].barras_PROD_TURNO_2 + this.dados_linha[x].barras_PROD_TURNO_3;
      this.total12 += this.dados_linha[x].barras_INTROD_TURNO_1;
      this.total13 += this.dados_linha[x].barras_INTROD_TURNO_2;
      this.total14 += this.dados_linha[x].barras_INTROD_TURNO_3;
      this.total15 += this.dados_linha[x].barras_INTROD_TURNO_1 + this.dados_linha[x].barras_INTROD_TURNO_2 + this.dados_linha[x].barras_INTROD_TURNO_3;

    }

  }

  gravar() {
    var id = 0;
    if (!this.novo) id = this.id_PLANEAMENTO;
    this.PLANEAMENTOCABService.getPLANEAMENTO_CABbyverificaseexiste(id, this.ano, this.semana, this.linha.id).subscribe(
      res => {
        var count = Object.keys(res).length;
        //se existir banhos com o id
        if (count > 0) {
          this.mensagem_verifica = "Já existe um Planeamento para o ano: " + this.ano + ', semana: ' + this.semana + ' e linha: ' + this.linha.id;
          this.displayverificar = true;
        } else {
          this.gravar_CAB();
        }
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  gravar_CAB() {

    var planeamento = new PLANEAMENTO_CAB;

    if (!this.novo) planeamento = this.dados;
    planeamento.semana = this.semana;
    planeamento.ano = this.ano;
    planeamento.linha = this.linha.id;

    planeamento.utz_MODIF = this.user;
    planeamento.data_MODIF = new Date();

    if (this.novo) {
      planeamento.utz_CRIA = this.user;
      planeamento.data_CRIA = new Date();
      planeamento.inativo = false;
      planeamento.estado = "C";
      this.PLANEAMENTOCABService.create(planeamento).subscribe(
        res => {
          this.gravarlinhas(res.id_PLANEAMENTO);
        },
        error => { console.log(error); this.simular(this.inputerro); });
    } else {


      this.PLANEAMENTOCABService.update(planeamento).then(
        res => {
          this.gravarlinhas(this.id_PLANEAMENTO);
        },
        error => { console.log(error); this.simular(this.inputerro); });

    }
  }

  gravarlinhas(id) {
    for (var x in this.dados_linha) {
      var linha = new PLANEAMENTO_LINHAS;
      linha.id_PLANEAMENTO = id;
      linha.barras_INTROD_TURNO_1 = this.dados_linha[x].barras_INTROD_TURNO_1;
      linha.barras_INTROD_TURNO_2 = this.dados_linha[x].barras_INTROD_TURNO_2;
      linha.barras_INTROD_TURNO_3 = this.dados_linha[x].barras_INTROD_TURNO_3;
      linha.barras_PROD_TURNO_1 = this.dados_linha[x].barras_PROD_TURNO_1;
      linha.barras_PROD_TURNO_2 = this.dados_linha[x].barras_PROD_TURNO_2;
      linha.barras_PROD_TURNO_3 = this.dados_linha[x].barras_PROD_TURNO_3;
      linha.data = this.dados_linha[x].data;
      linha.id_LINHA = this.dados_linha[x].id_LINHA;
      linha.planeadas_TURNO_1 = this.dados_linha[x].planeadas_TURNO_1;
      linha.planeadas_TURNO_2 = this.dados_linha[x].planeadas_TURNO_2;
      linha.planeadas_TURNO_3 = this.dados_linha[x].planeadas_TURNO_3;
      linha.prod_PLANEADAS_TURNO_1 = this.dados_linha[x].prod_PLANEADAS_TURNO_1;
      linha.prod_PLANEADAS_TURNO_2 = this.dados_linha[x].prod_PLANEADAS_TURNO_2;
      linha.prod_PLANEADAS_TURNO_3 = this.dados_linha[x].prod_PLANEADAS_TURNO_3;
      this.gravarlinhas_save(linha);
    }

    //terminar
    if (this.novo) {
      this.router.navigate(['producao/planeamento/editar'], { queryParams: { id: id } });
    } else {
      this.router.navigate(['producao/planeamento/view'], { queryParams: { id: id } });
    }

    this.simular(this.inputgravou);
  }

  gravarlinhas_save(linha) {
    this.PLANEAMENTOLINHASService.update(linha).then(
      res => {

      },
      error => { console.log(error); });
  }

  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }

  }


  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        var planeamento = new PLANEAMENTO_CAB;

        if (!this.novo) planeamento = this.dados;
        planeamento.inativo = true;
        planeamento.data_ANULACAO = new Date();
        planeamento.utz_ANULACAO = this.user;

        this.PLANEAMENTOCABService.update(planeamento).then(
          res => {
            this.simular(this.inputapagar);
            this.router.navigate(['producao/planeamento']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

}
