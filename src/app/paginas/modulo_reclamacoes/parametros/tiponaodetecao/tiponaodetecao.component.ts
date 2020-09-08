import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RC_DIC_TIPO_NAO_DETECAO } from 'app/entidades/RC_DIC_TIPO_NAO_DETECAO';
import { RCMOVRECLAMACAOTIPONAODETECAOService } from 'app/servicos/rc-mov-reclamacao-tipo-nao-detecao.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-tiponaodetecao',
  templateUrl: './tiponaodetecao.component.html',
  styleUrls: ['./tiponaodetecao.component.css']
})
export class TiponaodetecaoComponent implements OnInit {
  dados: any[];
  descricao: string;
  novo: boolean;
  cor_zona: string;
  nome_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  codigo: string;
  constructor(private globalVar: AppGlobals, private RCMOVRECLAMACAOTIPONAODETECAOService: RCMOVRECLAMACAOTIPONAODETECAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setduplicar(false);
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
    this.codigo = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var TIPO_NAO_DETECAO = new RC_DIC_TIPO_NAO_DETECAO;
    TIPO_NAO_DETECAO.descricao = this.descricao;
    TIPO_NAO_DETECAO.codigo = this.codigo;
    TIPO_NAO_DETECAO.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    TIPO_NAO_DETECAO.data_MODIF = new Date();

    if (this.novo) {
      TIPO_NAO_DETECAO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      TIPO_NAO_DETECAO.data_CRIA = new Date();
      this.RCMOVRECLAMACAOTIPONAODETECAOService.create(TIPO_NAO_DETECAO).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      TIPO_NAO_DETECAO.id = this.id_selected;
      TIPO_NAO_DETECAO.data_CRIA = this.datacria;
      TIPO_NAO_DETECAO.utz_CRIA = this.utz_cria;
      this.RCMOVRECLAMACAOTIPONAODETECAOService.update(TIPO_NAO_DETECAO).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCMOVRECLAMACAOTIPONAODETECAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, codigo: response[x].codigo, descricao: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar 
  apagar() {
    var TIPO_NAO_DETECAO = new RC_DIC_TIPO_NAO_DETECAO;
    TIPO_NAO_DETECAO.id = this.id_selected;

    this.RCMOVRECLAMACAOTIPONAODETECAOService.delete(TIPO_NAO_DETECAO.id).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.codigo = event.data.codigo;
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