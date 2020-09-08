import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { PRPRODUCOESPRIORITARIASService } from 'app/servicos/pr-producoes-prioritarias.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PR_PRODUCOES_PRIORITARIAS } from 'app/entidades/PR_PRODUCOES_PRIORITARIAS';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';

@Component({
  selector: 'app-producoes-prioritarias',
  templateUrl: './producoes-prioritarias.component.html',
  styleUrls: ['./producoes-prioritarias.component.css']
})
export class ProducoesPrioritariasComponent implements OnInit {
  tabela = [];
  artigos: any = [];
  user: any;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  linhas: any[];
  constructor(private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private router: Router, private globalVar: AppGlobals,
    private ABDICLINHAService: ABDICLINHAService,
    private PRPRODUCOESPRIORITARIASService: PRPRODUCOESPRIORITARIASService, private renderer: Renderer) { }

  ngOnInit() {

    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.listar();
    this.preenchelinhas();
  }


  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        this.linhas.push({ label: "São Bento", value: 33, cor: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA, cor: response[x].cor });
        }
        this.linhas = this.linhas.slice();
        this.carregatabela();
      },
      error => { console.log(error); this.carregatabela(); });
  }

  listar() {

    this.ABDICCOMPONENTEService.getComponentesProducao().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, DESIGN: response[x].PRODES1
          });
        }
        this.artigos = this.artigos.slice();
        //this.carregatabela()
      },
      error => { console.log(error); /*this.carregatabela() */ });


  }

  carregatabela() {
    this.PRPRODUCOESPRIORITARIASService.getAll().subscribe(
      response2 => {
        this.tabela = [];

        for (var y in response2) {
          var cor = "";
          var tab = this.linhas.find(item => item.value == response2[y].linha)
          if (tab) {
            cor = tab.cor;
          }
          var referencia_campo = { value: response2[y].proref, label: response2[y].proref + " - " + response2[y].design, DESIGN: response2[y].design };
          this.tabela.push({
            filteredreferencias: [], referencia_campo: referencia_campo,
            data: response2[y], id: response2[y].id, PROREF: response2[y].proref, DESIGN: response2[y].design, linha: response2[y].linha, cor_linha: cor
          });
        }
        this.tabela = this.tabela.slice();

      },
      error => { console.log(error); });
  }


  gravar() {
    for (var x in this.tabela) {
      if (this.tabela[x].id == null) {
        this.cria_tabelas(this.tabela[x], this.tabela.length, parseInt(x) + 1);
      } else {
        this.atualiza_tabelas(this.tabela[x], this.tabela.length, parseInt(x) + 1);
      }
    }

  }


  cria_tabelas(data, total, index) {
    if (data.PROREF != null && data.PROREF != "") {
      var dados = new PR_PRODUCOES_PRIORITARIAS;
      dados.proref = data.PROREF;
      dados.linha = data.linha;
      dados.design = data.DESIGN;
      dados.data_MODIF = new Date();
      dados.utz_MODIF = this.user;
      this.PRPRODUCOESPRIORITARIASService.create(dados).subscribe(result => {
        if (total == index) {
          this.simular(this.inputgravou);
          this.carregatabela();
        }
      }, error => {
        console.log(error);
        this.simular(this.inputerro);
        this.carregatabela();
      });

    }
  }

  atualiza_tabelas(data, total, index) {
    if (data.PROREF != null && data.PROREF != "") {
      var dados = new PR_PRODUCOES_PRIORITARIAS;
      dados = data.data;
      dados.proref = data.PROREF;
      dados.linha = data.linha;
      dados.design = data.DESIGN;
      dados.data_MODIF = new Date();
      dados.utz_MODIF = this.user;
      this.PRPRODUCOESPRIORITARIASService.update(dados).subscribe(result => {
        if (total == index) {
          this.simular(this.inputgravou);
          this.carregatabela();
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
        this.carregatabela();
      });
    }
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //adicionar linha às tabelas
  adicionar_linha() {
    this.tabela.push({
      filteredreferencias: [], referencia_campo: null,
      linha: null, data: null, id: null, PROREF: null, DESIGN: null, cor_linha: ""
    });
    this.tabela = this.tabela.slice();
  }

  apagar_linha(index) {
    var tab = this.tabela[index];
    if (tab.id == null) {
      this.tabela = this.tabela.slice(0, index).concat(this.tabela.slice(index + 1));
    } else {
      this.PRPRODUCOESPRIORITARIASService.delete(tab.id).then(
        res => {
          this.tabela = this.tabela.slice(0, index).concat(this.tabela.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  //ao alterar nome ref
  atualizatabelas(event, index) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.tabela[index].DESIGN = tab.DESIGN;
    } else {
      this.tabela[index].DESIGN = "";
    }
    this.tabela = this.tabela.slice();
  }


  backview() {
    //this.location.back();
    this.router.navigate(['producao']);
  }


  alteracorlinha(event, index) {
    var tab = this.linhas.find(item => item.value == event.value)
    if (tab) {
      this.tabela[index].cor_linha = tab.cor;
    } else {
      this.tabela[index].cor_linha = "";
    }
    this.tabela = this.tabela.slice();
  }

  filterRef(event, index) {

    this.tabela[index].filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event, index) {
    this.tabela[index].DESIGN = "";
    this.tabela[index].PROREF = null;
  }

  filterSelect(event, index) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.tabela[index].PROREF = event.value;
      this.tabela[index].DESIGN = tab.DESIGN;
    } else {
      this.tabela[index].DESIGN = "";
      this.tabela[index].PROREF = null;
    }
    this.tabela = this.tabela.slice();
  }
}
