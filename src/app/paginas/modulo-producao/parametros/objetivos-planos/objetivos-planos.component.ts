import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICOBJETIVOSPLANOSService } from 'app/servicos/pr-dic-objetivos-planos.service';
import { PR_DIC_OBJETIVOS_PLANOS } from 'app/entidades/PR_DIC_OBJETIVOS_PLANOS';

@Component({
  selector: 'app-objetivos-planos',
  templateUrl: './objetivos-planos.component.html',
  styleUrls: ['./objetivos-planos.component.css']
})
export class ObjetivosPlanosComponent implements OnInit {
  ID: number;
  limite_INFERIOR_CUMPRIMENTO: number;
  limite_INFERIOR_OCUPACAO: number;
  limite_INFERIOR_OCUPACAO_TOTAL: number;
  limite_SUPERIOR_OCUPACAO_TOTAL: number;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  limite_CROMAGEM_MAIOR_10: number;
  limite_CROMAGEM_MENOR_10: number;
  limite_INJECAO_MENOR_10: number;
  limite_INJECAO_MAIOR_10: number;
  objetivo_REJEICAO_GLOBAL: number;
  limite_SUPERIOR_INDICE_PRODUTIVIDADE: number;
  limite_INFERIOR_INDICE_PRODUTIVIDADE: number;

  constructor(private router: Router, private globalVar: AppGlobals, private PRDICOBJETIVOSPLANOSService: PRDICOBJETIVOSPLANOSService, private renderer: Renderer) { }

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

    this.listar();
  }

  //listar os dados das unidades de dados na tabela
  listar() {

    this.PRDICOBJETIVOSPLANOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.ID = response[x].id;
          this.limite_INFERIOR_CUMPRIMENTO = response[x].limite_INFERIOR_CUMPRIMENTO;
          this.limite_INFERIOR_OCUPACAO = response[x].limite_INFERIOR_OCUPACAO;
          this.limite_INFERIOR_OCUPACAO_TOTAL = response[x].limite_INFERIOR_OCUPACAO_TOTAL;
          this.limite_SUPERIOR_OCUPACAO_TOTAL = response[x].limite_SUPERIOR_OCUPACAO_TOTAL;
          this.limite_CROMAGEM_MENOR_10 = response[x].limite_CROMAGEM_MENOR_10;
          this.limite_CROMAGEM_MAIOR_10 = response[x].limite_CROMAGEM_MAIOR_10;
          this.limite_INJECAO_MENOR_10 = response[x].limite_INJECAO_MENOR_10;
          this.limite_INJECAO_MAIOR_10 = response[x].limite_INJECAO_MAIOR_10;
          this.objetivo_REJEICAO_GLOBAL = response[x].objetivo_REJEICAO_GLOBAL;
          this.limite_INFERIOR_INDICE_PRODUTIVIDADE = response[x].limite_INFERIOR_INDICE_PRODUTIVIDADE;
          this.limite_SUPERIOR_INDICE_PRODUTIVIDADE = response[x].limite_SUPERIOR_INDICE_PRODUTIVIDADE;
        }

      },
      error => console.log(error));
  }


  //gravar unidade de zona
  gravar() {
    var OBJETIVO = new PR_DIC_OBJETIVOS_PLANOS;
    OBJETIVO.id = this.ID;
    OBJETIVO.limite_INFERIOR_CUMPRIMENTO = this.limite_INFERIOR_CUMPRIMENTO;
    OBJETIVO.limite_INFERIOR_OCUPACAO = this.limite_INFERIOR_OCUPACAO;
    OBJETIVO.limite_INFERIOR_OCUPACAO_TOTAL = this.limite_INFERIOR_OCUPACAO_TOTAL;
    OBJETIVO.limite_SUPERIOR_OCUPACAO_TOTAL = this.limite_SUPERIOR_OCUPACAO_TOTAL;
    OBJETIVO.limite_CROMAGEM_MENOR_10 = this.limite_CROMAGEM_MENOR_10;
    OBJETIVO.limite_CROMAGEM_MAIOR_10 = this.limite_CROMAGEM_MAIOR_10;
    OBJETIVO.limite_INJECAO_MENOR_10 = this.limite_INJECAO_MENOR_10;
    OBJETIVO.limite_INJECAO_MAIOR_10 = this.limite_INJECAO_MAIOR_10;
    OBJETIVO.objetivo_REJEICAO_GLOBAL = this.objetivo_REJEICAO_GLOBAL;

    OBJETIVO.limite_INFERIOR_INDICE_PRODUTIVIDADE = this.limite_INFERIOR_INDICE_PRODUTIVIDADE;
    OBJETIVO.limite_SUPERIOR_INDICE_PRODUTIVIDADE = this.limite_SUPERIOR_INDICE_PRODUTIVIDADE;

    OBJETIVO.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    OBJETIVO.data_MODIF = new Date();

    this.PRDICOBJETIVOSPLANOSService.update(OBJETIVO).then(() => {
      this.simular(this.inputgravou);
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

  //bt cancelar
  backview() {
    //this.location.back();
    this.router.navigate(['parametros']);
  }

}
