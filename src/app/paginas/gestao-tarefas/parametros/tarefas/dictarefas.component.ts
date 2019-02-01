import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GT_DIC_TAREFAS } from '../../../../entidades/GT_DIC_TAREFAS';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RCDICACCOESRECLAMACAOService } from '../../../../servicos/rc-dic-accoes-reclamacao.service';

@Component({
  selector: 'app-dictarefas',
  templateUrl: './dictarefas.component.html',
  styleUrls: ['./dictarefas.component.css']
})
export class GTDICTarefasComponent implements OnInit {

  dados: any[];
  descricaopt: string;
  descricaofr;
  descricaoeng: string;
  novo: boolean;
  cor_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService, private renderer: Renderer) { }
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
    this.listar();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.descricaoeng = "";
    this.descricaopt = "";
    this.descricaofr = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    if (this.novo) {
      ACCOES_RECLAMACAO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      ACCOES_RECLAMACAO.data_CRIA = new Date();
      this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      ACCOES_RECLAMACAO.id = this.id_selected;
      ACCOES_RECLAMACAO.data_CRIA = this.datacria;
      ACCOES_RECLAMACAO.utz_CRIA = this.utz_cria;
      this.RCDICACCOESRECLAMACAOService.update(ACCOES_RECLAMACAO).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICACCOESRECLAMACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, nomefr: response[x].descricao_FR, nomept: response[x].descricao_PT, nomeeng: response[x].descricao_ENG, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;

    ACCOES_RECLAMACAO.id = this.id_selected;


    this.RCDICACCOESRECLAMACAOService.delete(ACCOES_RECLAMACAO.id).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricaopt = event.data.nomept;
    this.descricaofr = event.data.nomefr;
    this.descricaoeng = event.data.nomeeng;
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

