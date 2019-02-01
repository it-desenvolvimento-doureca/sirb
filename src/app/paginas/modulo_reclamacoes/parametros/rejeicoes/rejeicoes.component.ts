import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RC_DIC_REJEICAO } from '../../../../entidades/RC_DIC_REJEICAO';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RCDICREJEICAOService } from '../../../../servicos/rc-dic-rejeicao.service';

@Component({
  selector: 'app-rejeicoes',
  templateUrl: './rejeicoes.component.html',
  styleUrls: ['./rejeicoes.component.css']
})
export class RejeicoesComponent implements OnInit {

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
  revisao_RECLAMACAO: boolean;
  constructor(private globalVar: AppGlobals, private RCDICREJEICAOService: RCDICREJEICAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.globalVar.setduplicar(false);
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
    this.descricao = "";
    this.revisao_RECLAMACAO = false;
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var DIC_REJEICAO = new RC_DIC_REJEICAO;
    DIC_REJEICAO.descricao = this.descricao;
    DIC_REJEICAO.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    DIC_REJEICAO.data_ULT_MODIF = new Date();
    DIC_REJEICAO.revisao_RECLAMACAO = this.revisao_RECLAMACAO;

    if (this.novo) {
      DIC_REJEICAO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      DIC_REJEICAO.data_CRIA = new Date();
      this.RCDICREJEICAOService.create(DIC_REJEICAO).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      DIC_REJEICAO.id = this.id_selected;
      DIC_REJEICAO.data_CRIA = this.datacria;
      DIC_REJEICAO.utz_CRIA = this.utz_cria;
      this.RCDICREJEICAOService.update(DIC_REJEICAO).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICREJEICAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, revisao_RECLAMACAO: response[x].revisao_RECLAMACAO, nome: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var DIC_REJEICAO = new RC_DIC_REJEICAO;
    DIC_REJEICAO.descricao = this.descricao;
    DIC_REJEICAO.id = this.id_selected;

    this.RCDICREJEICAOService.delete(DIC_REJEICAO.id).then(() => {
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
    this.revisao_RECLAMACAO = event.data.revisao_RECLAMACAO;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
