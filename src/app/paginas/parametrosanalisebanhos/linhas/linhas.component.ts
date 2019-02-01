import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AB_DIC_LINHA } from "app/entidades/AB_DIC_LINHA";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ConfirmationService } from 'primeng/primeng';
import { ABDICLINHAOFService } from '../../../servicos/ab-dic-linha-of.service';
import { AB_DIC_LINHA_OF } from '../../../entidades/AB_DIC_LINHA_OF';

@Component({
  selector: 'app-linhas',
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.css']
})
export class LinhasComponent implements OnInit {
  pasta: string;
  utilizador: string;
  senha: string;
  dominio: string;
  tempof: any;
  encontrou: boolean;
  seccao: any;
  subseccao: any;
  ref_COMPOSTO: any;
  linhasof: any = [];
  pos: any = 0;
  id_linha_selected: number;
  novalinha: boolean;
  cor_linha: string;
  nome_linha: string;
  linhas: any;
  novo;

  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;

  constructor(private ABDICLINHAOFService: ABDICLINHAOFService, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer) { }

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
    this.listar_linhas();
  }


  //abre popup para adicionar linha
  showDialogToAddlinhas() {
    this.novalinha = true;
    this.id_linha_selected = 0;
    this.nome_linha = "";
    this.seccao = "";
    this.subseccao = "";
    this.ref_COMPOSTO = "";
    this.cor_linha = '#ffffff';
    this.pasta = "";
    this.utilizador = "";
    this.senha = "";
    this.dominio = "";

    this.simular(this.dialoglinhas);
  }

  verifica(of, count) {
    this.ABDICLINHAService.verificaOF(of).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total == 0) {
          this.encontrou = false;
          this.tempof.push(of);
        }
        if (parseInt(count) + 1 == this.linhasof.length) {
          //aviso ofs não existem
          if (!this.encontrou) {
            this.confirmationService.confirm({
              message: 'Existem Linhas onde o Número da OF não Existe <b>' + this.tempof.toString() + '</b>, deseja continuar?',
              header: 'AVISO',
              icon: 'fa fa-info-circle',
              accept: () => {
                this.gravalinha();
              }
            });
          } else {
            this.gravalinha();
          }
        }
      },
      error => console.log(error));
  }

  //gravar linhas de linha
  gravarlinhas() {
    this.encontrou = true;
    this.tempof = [];
    this.ABDICLINHAService.verificaREF(this.ref_COMPOSTO).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total == 0) {
          //aviso ref composto
          this.confirmationService.confirm({
            message: 'A Referência Composto não existe, deseja continuar?',
            header: 'AVISO',
            icon: 'fa fa-info-circle',
            accept: () => {
              if (this.linhasof.length > 0) {
                for (var x in this.linhasof) {
                  this.verifica(this.linhasof[x].of_NUM, x);
                }
              } else {
                this.gravalinha();
              }
            }
          });
        } else {
          if (this.linhasof.length > 0) {
            for (var x in this.linhasof) {
              this.verifica(this.linhasof[x].of_NUM, x);
            }
          } else {
            this.gravalinha();
          }
        }

      },
      error => console.log(error));
  }

  gravalinha() {

    var LINHAS = new AB_DIC_LINHA;
    LINHAS.nome_LINHA = this.nome_linha;
    LINHAS.cor = "#" + this.cor_linha.replace("#", "");
    LINHAS.seccao = this.seccao;
    LINHAS.subseccao = this.subseccao;
    LINHAS.ref_COMPOSTO = this.ref_COMPOSTO;
    LINHAS.pasta = this.pasta;
    LINHAS.utilizador = this.utilizador;
    LINHAS.senha = btoa(this.senha);
    LINHAS.dominio = this.dominio;
    LINHAS.inativo = false;
    if (this.novalinha) {
      this.ABDICLINHAService.create(LINHAS).subscribe(response => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
        for (var x in this.linhasof) {
          this.gravar(this.linhasof[x], response.id_LINHA);
        }
      },
        error => console.log(error));
    } else {
      LINHAS.id_LINHA = this.id_linha_selected;
      this.ABDICLINHAService.update(LINHAS).then(() => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
      });
      for (var x in this.linhasof) {
        if (this.linhasof[x].id_LINHA_OF.toString().substring(0, 1) == "P") {
          this.gravar(this.linhasof[x]);
        } else {
          this.atualizar(this.linhasof[x]);
        }
      }
    }
  }

  gravar(linhaof, id_linha = null) {
    if (linhaof.of_NUM != "" && linhaof.of_NUM != null) {
      var LINHASOF = new AB_DIC_LINHA_OF;
      if (id_linha != null) linhaof.id_LINHA = id_linha;
      LINHASOF.data = linhaof.data;
      LINHASOF.id_LINHA = linhaof.id_LINHA;
      LINHASOF.of_NUM = linhaof.of_NUM;
      this.ABDICLINHAOFService.create(LINHASOF).subscribe(response => {
      },
        error => console.log(error));
    }
  }

  atualizar(linhaof) {
    if (linhaof.of_NUM != "" && linhaof.of_NUM != null) {
      this.ABDICLINHAOFService.update(linhaof).then(() => {
      });
    }
  }

  //listar os dados das Linhas
  listar_linhas() {
    this.linhas = [];
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.linhas.push({
            id: response[x].id_LINHA, nome: response[x].nome_LINHA, cor: response[x].cor, seccao: response[x].seccao,
            subseccao: response[x].subseccao, ref_COMPOSTO: response[x].ref_COMPOSTO, pasta: response[x].pasta, utilizador: response[x].utilizador, senha: atob(response[x].senha)
            , dominio: response[x].dominio
          });
        }
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));
  }

  //apagar linhas
  apagarlinhas() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var DIC_LINHA = new AB_DIC_LINHA;
        DIC_LINHA.nome_LINHA = this.nome_linha;
        DIC_LINHA.id_LINHA = this.id_linha_selected;
        DIC_LINHA.cor = "#" + this.cor_linha;
        DIC_LINHA.seccao = this.seccao;
        DIC_LINHA.subseccao = this.subseccao;
        DIC_LINHA.ref_COMPOSTO = this.ref_COMPOSTO;
        DIC_LINHA.pasta = this.pasta;
        DIC_LINHA.utilizador = this.utilizador;
        DIC_LINHA.senha = this.senha;
        DIC_LINHA.dominio = this.dominio;
        DIC_LINHA.data_ANULACAO = new Date();
        DIC_LINHA.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
        DIC_LINHA.inativo = true;
        this.ABDICLINHAService.update(DIC_LINHA).then(() => {
          this.simular(this.closedialoglinha);
          this.listar_linhas();
        }, error => {
          console.log(error);
        });

      }
    });
  }

  //ao clicar na tabela abrir popup para editar
  onRowSelectlinha(event) {
    this.id_linha_selected = event.data.id;
    this.nome_linha = event.data.nome;
    this.cor_linha = event.data.cor;
    this.novalinha = false;
    this.seccao = event.data.seccao;
    this.subseccao = event.data.subseccao;
    this.ref_COMPOSTO = event.data.ref_COMPOSTO;
    this.pasta = event.data.pasta;
    this.utilizador = event.data.utilizador;
    this.senha = event.data.senha;
    this.dominio = event.data.dominio;
    this.carregaTabela(event.data.id);
    this.simular(this.dialoglinhas);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //adicionar linha aos postos
  adicionar_linha() {
    this.pos++;
    this.linhasof.push({ id_LINHA_OF: "P" + this.pos, data: new Date(), of_NUM: "", id_LINHA: this.id_linha_selected });
    this.linhasof = this.linhasof.slice();
  }


  eliminar(linhaof) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (linhaof.id_LINHA_OF.toString().substring(0, 1) != "P") {
          this.ABDICLINHAOFService.delete(linhaof.id_LINHA_OF).then(() => {
            this.carregaTabela(linhaof.id_LINHA);
          },
            error => { console.log(error); /*this.simular(this.inputerro);*/ });
        } else {
          let index = -1;
          for (let i = 0; i < this.linhasof.length; i++) {
            if (this.linhasof[i].id_LINHA_OF == linhaof.id_LINHA_OF) {
              index = i;
              break;
            }
          }
          this.linhasof.splice(index, 1);
          this.linhasof = this.linhasof.slice();
        }
      }
    });
  }

  carregaTabela(linha) {
    this.linhasof = [];
    this.ABDICLINHAOFService.getby(linha).subscribe(
      response => {
        for (var x in response) {
          var data = null;
          if (response[x].data != null) data = new Date(response[x].data);
          this.linhasof.push({ id_LINHA_OF: response[x].id_LINHA_OF, id_LINHA: response[x].id_LINHA, of_NUM: response[x].of_NUM, data: data });
        }
        this.linhasof = this.linhasof.slice();
      },
      error => console.log(error));
  }

  verificadatas(data) {

  }

}
