import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RCDICFICHEIROSANALISEService } from '../../../../servicos/rc-dic-ficheiros-analise.service';
import { RC_DIC_FICHEIROS_ANALISE } from '../../../../entidades/RC_DIC_FICHEIROS_ANALISE';

@Component({
  selector: 'app-ficheirosanalise',
  templateUrl: './ficheirosanalise.component.html',
  styleUrls: ['./ficheirosanalise.component.css']
})
export class FicheirosanaliseComponent implements OnInit {

  dados: any[];
  descricao: string;
  novo: boolean;
  id_selected: number;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private RCDICFICHEIROSANALISEService: RCDICFICHEIROSANALISEService, private renderer: Renderer) { }
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
    var FICHEIROS_ANALISE = new RC_DIC_FICHEIROS_ANALISE;
    FICHEIROS_ANALISE.descricao = this.descricao;
    FICHEIROS_ANALISE.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    FICHEIROS_ANALISE.data_ULT_MODIF = new Date();
    if (this.novo) {
      FICHEIROS_ANALISE.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      FICHEIROS_ANALISE.data_CRIA = new Date();
      this.RCDICFICHEIROSANALISEService.create(FICHEIROS_ANALISE).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      FICHEIROS_ANALISE.id = this.id_selected;
      FICHEIROS_ANALISE.data_CRIA = this.datacria;
      FICHEIROS_ANALISE.utz_CRIA = this.utz_cria;
      this.RCDICFICHEIROSANALISEService.update(FICHEIROS_ANALISE).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICFICHEIROSANALISEService.getAll().subscribe(
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
    var FICHEIROS_ANALISE = new RC_DIC_FICHEIROS_ANALISE;
    FICHEIROS_ANALISE.descricao = this.descricao;
    FICHEIROS_ANALISE.id = this.id_selected;

    this.RCDICFICHEIROSANALISEService.delete(FICHEIROS_ANALISE.id).then(() => {
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
