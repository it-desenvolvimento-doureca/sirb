import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AB_DIC_LINHA } from "app/entidades/AB_DIC_LINHA";

@Component({
  selector: 'app-linhas',
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.css']
})
export class LinhasComponent implements OnInit {

  id_linha_selected: number;
  novalinha: boolean;
  cor_linha: string;
  nome_linha: string;
  linhas: any;
  novo;

  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;

  constructor(private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer) { }

  ngOnInit() {

    this.listar_linhas();
  }


  //abre popup para adicionar linha
  showDialogToAddlinhas() {
    this.novalinha = true;
    this.id_linha_selected = 0;
    this.nome_linha = "";
    this.cor_linha = '#ffffff';
    this.simular(this.dialoglinhas);
  }

  //gravar linhas de linha
  gravarlinhas() {
    var LINHAS = new AB_DIC_LINHA;
    LINHAS.nome_LINHA = this.nome_linha;
    LINHAS.cor = "#" + this.cor_linha;
    LINHAS.inativo = false;
    if (this.novalinha) {
      this.ABDICLINHAService.create(LINHAS).subscribe(response => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
      },
        error => console.log(error));
    } else {
      LINHAS.id_LINHA = this.id_linha_selected;
      this.ABDICLINHAService.update(LINHAS).then(() => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
      });

    }
  }

  //listar os dados das Linhas
  listar_linhas() {
    this.linhas = [];
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.linhas.push({ id: response[x].id_LINHA, nome: response[x].nome_LINHA, cor: response[x].cor });
        }
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));
  }

  //apagar linhas
  apagarlinhas() {
    var DIC_LINHA = new AB_DIC_LINHA;
    DIC_LINHA.nome_LINHA = this.nome_linha;
    DIC_LINHA.id_LINHA = this.id_linha_selected;
    DIC_LINHA.cor = "#" + this.cor_linha;
    DIC_LINHA.data_ANULACAO = new Date();
    DIC_LINHA.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    DIC_LINHA.inativo = true;
    this.ABDICLINHAService.update(DIC_LINHA).then(() => {
      this.listar_linhas();
    }, error => {
      console.log(error);
    });
  }

  //ao clicar na tabela abrir popup para editar
  onRowSelectlinha(event) {
    this.id_linha_selected = event.data.id;
    this.nome_linha = event.data.nome;
    this.cor_linha = event.data.cor;
    this.novalinha = false;
    this.simular(this.dialoglinhas);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}
