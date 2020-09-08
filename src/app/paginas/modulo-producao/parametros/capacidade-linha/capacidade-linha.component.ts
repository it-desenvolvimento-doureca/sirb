import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { CAPACIDADELINHAService } from 'app/servicos/capacidade-linha.service';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { CAPACIDADE_LINHA } from 'app/entidades/CAPACIDADE_LINHA';

@Component({
  selector: 'app-capacidade-linha',
  templateUrl: './capacidade-linha.component.html',
  styleUrls: ['./capacidade-linha.component.css']
})
export class CapacidadeLinhaComponent implements OnInit {
  user: any;
  linhas: any[];
  linha: any;
  cor_linha: any[];
  dados: any[] = [];
  pos: number;

  @ViewChild('inputgravou') inputgravou: ElementRef;

  constructor(private ABDICLINHAService: ABDICLINHAService, private CAPACIDADELINHAService: CAPACIDADELINHAService, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private renderer: Renderer) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

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
    this.preenchelinhas();
  }

  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        //this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();


        if (this.linhas.length > 0) {
          this.linha = this.linhas[0].value;
          this.cor_linha = this.linhas[0].value.cor;
          this.listar();
        }

      },
      error => console.log(error));
  }


  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
      this.listar();
    }
  }

  listar() {
    this.dados = [];
    this.CAPACIDADELINHAService.getbyidlinha(this.linha.id).subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            pos: parseInt(x),
            id: response[x].id_CAPACIDADE, data: new Date(response[x].data), valor: response[x].valor
          });

          this.pos = parseInt(x);
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }

  adicionar() {
    this.pos = this.pos + 1;
    this.dados.push({ id: null, pos: this.pos, data: null, valor: null });
    this.dados = this.dados.slice();
  }


  gravarlinhas() {
    if (this.dados.length > 0) {
      for (var x in this.dados) {

        var capacidade = new CAPACIDADE_LINHA;
        if (this.dados[x].id != null) capacidade.id_CAPACIDADE = this.dados[x].id;
        capacidade.data = this.dados[x].data;
        capacidade.valor = this.dados[x].valor;
        capacidade.data_MODIF = new Date();
        capacidade.utz_MODIF = this.user;
        capacidade.linha = this.linha.id;

        if (this.dados[x].id == null) {
          capacidade.data_CRIA = new Date();
          capacidade.utz_CRIA = this.user;
          this.gravar(capacidade);
        } else {
          this.atualizar(capacidade);
        }
      }
      this.simular(this.inputgravou);
    }

  }

  eliminar(capacidade) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (capacidade.id != null) {
          this.CAPACIDADELINHAService.delete(capacidade.id).then(() => {
            this.listar();
          },
            error => { console.log(error); /*this.simular(this.inputerro);*/ });
        } else {
          let index = -1;
          for (let i = 0; i < this.dados.length; i++) {
            if (this.dados[i].pos == capacidade.pos) {
              index = i;
              break;
            }
          }
          this.dados.splice(index, 1);
          this.dados = this.dados.slice();
        }
      }
    });
  }


  gravar(capacidade, id_linha = null) {
    if (capacidade.data != null && capacidade.valor != null) {

      this.CAPACIDADELINHAService.create(capacidade).subscribe(response => {
      },
        error => console.log(error));
    }
  }

  atualizar(capacidade) {
    if (capacidade.data != null && capacidade.valor != null) {
      this.CAPACIDADELINHAService.update(capacidade).then(() => {
      });
    }
  }

  verificadatas(data) {

  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
