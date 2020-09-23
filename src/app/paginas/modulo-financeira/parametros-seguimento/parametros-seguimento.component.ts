import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { FIN_DIC_PARAMETROS_SEGUIMENTO } from 'app/entidades/FIN_DIC_PARAMETROS_SEGUIMENTO';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { FINDICPARAMETROSSEGUIMENTOService } from 'app/servicos/fin-dic-parametros-seguimento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parametros-seguimento',
  templateUrl: './parametros-seguimento.component.html',
  styleUrls: ['./parametros-seguimento.component.css']
})
export class ParametrosSeguimentoComponent implements OnInit {
  dados: any[];
  acesso_editar: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;

  constructor(private location: Location, private renderer: Renderer, private globalVar: AppGlobals, private FINDICPARAMETROSSEGUIMENTOService: FINDICPARAMETROSSEGUIMENTOService) { }


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
    this.globalVar.setduplicar(false);
    this.globalVar.setcriar(false);

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node828editar");

    this.listar();
  }

  listar() {
    this.dados = [];
    this.FINDICPARAMETROSSEGUIMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            id_ANALISE: response[x].id_ANALISE,
            descricao: response[x].descricao,
            tipo_ARTIGO: response[x].tipo_ARTIGO,
            tipos_DOCUMENTO: response[x].tipos_DOCUMENTO,
          });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }

  gravar() {
    for (var x in this.dados) {
      var parametro = new FIN_DIC_PARAMETROS_SEGUIMENTO;
      parametro.id_ANALISE = this.dados[x].id_ANALISE;
      parametro.descricao = this.dados[x].descricao;
      parametro.tipo_ARTIGO = (this.dados[x].tipo_ARTIGO == '') ? null : this.dados[x].tipo_ARTIGO;
      parametro.tipos_DOCUMENTO = (this.dados[x].tipos_DOCUMENTO == '') ? null : this.dados[x].tipos_DOCUMENTO;
      this.update(parametro);
    }
    this.simular(this.inputgravou);
  }

  update(parametro) {
    this.FINDICPARAMETROSSEGUIMENTOService.update(parametro).then(() => {
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
    this.location.back();
  }


}


