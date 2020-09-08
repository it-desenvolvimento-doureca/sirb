import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RCDICCLASSIFICACAOService } from 'app/servicos/rc-dic-classificacao.service';
import { RC_DIC_CLASSIFICACAO } from 'app/entidades/RC_DIC_CLASSIFICACAO';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {

  dados: any[];
  descricao: string;
  novo: boolean;
  cor_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  objetivo: any;
  constructor(private globalVar: AppGlobals, private RCDICCLASSIFICACAOService: RCDICCLASSIFICACAOService, private renderer: Renderer) { }
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
    this.listar();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.descricao = "";
    this.objetivo = 0;
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var CLASSIFICACAO = new RC_DIC_CLASSIFICACAO;
    CLASSIFICACAO.descricao = this.descricao;
    CLASSIFICACAO.objetivo = this.objetivo;
    CLASSIFICACAO.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    CLASSIFICACAO.data_ULT_MODIF = new Date();

    if (this.novo) {
      CLASSIFICACAO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      CLASSIFICACAO.data_CRIA = new Date();
      this.RCDICCLASSIFICACAOService.create(CLASSIFICACAO).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      CLASSIFICACAO.id = this.id_selected;
      CLASSIFICACAO.data_CRIA = this.datacria;
      CLASSIFICACAO.utz_CRIA = this.utz_cria;
      this.RCDICCLASSIFICACAOService.update(CLASSIFICACAO).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICCLASSIFICACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, objetivo: response[x].objetivo, nome: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var CLASSIFICACAO = new RC_DIC_CLASSIFICACAO;
    CLASSIFICACAO.descricao = this.descricao;
    CLASSIFICACAO.objetivo = this.objetivo;
    CLASSIFICACAO.id = this.id_selected;

    this.RCDICCLASSIFICACAOService.delete(CLASSIFICACAO.id).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.nome;
    this.objetivo = event.data.objetivo;
    this.novo = false;
    this.datacria = event.data.data_CRIA;
    this.utz_cria = event.data.utz_CRIA;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
