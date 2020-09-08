import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { PRBARRASALERTAService } from 'app/servicos/pr-barras-alerta.service';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PR_BARRAS_ALERTA } from 'app/entidades/PR_BARRAS_ALERTA';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';

@Component({
  selector: 'app-barras-alerta',
  templateUrl: './barras-alerta.component.html',
  styleUrls: ['./barras-alerta.component.css']
})
export class BarrasAlertaComponent implements OnInit {

  tabela = [];
  artigos: any = [];
  user: any;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  linhas: any[];
  constructor(private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private router: Router, private globalVar: AppGlobals,
    private ABDICLINHAService: ABDICLINHAService,
    private PRBARRASALERTAService: PRBARRASALERTAService, private renderer: Renderer) { }

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
      error => { console.log(error); /*this.carregatabela()*/ });


  }

  carregatabela() {
    this.PRBARRASALERTAService.getAll().subscribe(
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
            data: (response2[y].data == null) ? "" : this.formatDate(response2[y].data),
            dados: response2[y], id: response2[y].id, PROREF: response2[y].proref, DESIGN: response2[y].design, linha: response2[y].linha
            , turno_1: response2[y].turno_1, turno_2: response2[y].turno_2, turno_3: response2[y].turno_3, cor_linha: cor
          });
        }
        this.tabela = this.tabela.slice();
        
      },
      error => { console.log(error); });
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
      var dados = new PR_BARRAS_ALERTA;
      dados.proref = data.PROREF;
      dados.linha = data.linha;
      dados.design = data.DESIGN;
      dados.turno_1 = data.turno_1;
      dados.turno_2 = data.turno_2;
      dados.turno_3 = data.turno_3;
      dados.data = data.data;
      dados.data_MODIF = new Date();
      dados.utz_MODIF = this.user;
      this.PRBARRASALERTAService.create(dados).subscribe(result => {
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
      var dados = new PR_BARRAS_ALERTA;
      dados = data.dados;
      dados.proref = data.PROREF;
      dados.data = data.data;
      dados.linha = data.linha;
      dados.turno_1 = data.turno_1;
      dados.turno_2 = data.turno_2;
      dados.turno_3 = data.turno_3;
      dados.design = data.DESIGN;
      dados.data_MODIF = new Date();
      dados.utz_MODIF = this.user;
      this.PRBARRASALERTAService.update(dados).subscribe(result => {
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
    this.tabela.push({ filteredreferencias: [], referencia_campo: null, data: null, linha: null, dados: null, id: null, PROREF: null, DESIGN: null, turno_1: false, turno_2: false, turno_3: false, cor_linha: "" });
    this.tabela = this.tabela.slice();
  }

  apagar_linha(index) {
    var tab = this.tabela[index];
    if (tab.id == null) {
      this.tabela = this.tabela.slice(0, index).concat(this.tabela.slice(index + 1));
    } else {
      this.PRBARRASALERTAService.delete(tab.id).then(
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

  //bt cancelar
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
