import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RC_DIC_TIPO_RECLAMACAO } from '../../../../entidades/RC_DIC_TIPO_RECLAMACAO';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RCDICTIPORECLAMACAOService } from '../../../../servicos/rc-dic-tipo-reclamacao.service';

@Component({
  selector: 'app-tiposreclamacoes',
  templateUrl: './tiposreclamacoes.component.html',
  styleUrls: ['./tiposreclamacoes.component.css']
})
export class TiposreclamacoesComponent implements OnInit {

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
  constructor(private globalVar: AppGlobals, private RCDICTIPORECLAMACAOService: RCDICTIPORECLAMACAOService, private renderer: Renderer) { }
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
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var TIPO_RECLAMACAO = new RC_DIC_TIPO_RECLAMACAO;
    TIPO_RECLAMACAO.descricao = this.descricao;
    TIPO_RECLAMACAO.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    TIPO_RECLAMACAO.data_ULT_MODIF = new Date();

    if (this.novo) {
      TIPO_RECLAMACAO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      TIPO_RECLAMACAO.data_CRIA = new Date();
      this.RCDICTIPORECLAMACAOService.create(TIPO_RECLAMACAO).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      TIPO_RECLAMACAO.id = this.id_selected;      
      TIPO_RECLAMACAO.data_CRIA = this.datacria;
      TIPO_RECLAMACAO.utz_CRIA = this.utz_cria;
      this.RCDICTIPORECLAMACAOService.update(TIPO_RECLAMACAO).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICTIPORECLAMACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, nome: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var TIPO_RECLAMACAO = new RC_DIC_TIPO_RECLAMACAO;
    TIPO_RECLAMACAO.descricao = this.descricao;
    TIPO_RECLAMACAO.id = this.id_selected;


    this.RCDICTIPORECLAMACAOService.delete(TIPO_RECLAMACAO.id).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.nome;
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

