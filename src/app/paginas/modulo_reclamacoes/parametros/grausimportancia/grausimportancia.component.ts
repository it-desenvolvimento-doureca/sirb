import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RC_DIC_GRAU_IMPORTANCIA } from '../../../../entidades/RC_DIC_GRAU_IMPORTANCIA';
import { RCDICGRAUIMPORTANCIAService } from '../../../../servicos/rc-dic-grau-importancia.service';
import { AppGlobals } from '../../../../menu/sidebar.metadata';

@Component({
  selector: 'app-grausimportancia',
  templateUrl: './grausimportancia.component.html',
  styleUrls: ['./grausimportancia.component.css']
})
export class GrausimportanciaComponent implements OnInit {

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
  constructor(private globalVar: AppGlobals, private RCDICGRAUIMPORTANCIAService: RCDICGRAUIMPORTANCIAService, private renderer: Renderer) { }
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
    var GRAU_IMPORTANCIA = new RC_DIC_GRAU_IMPORTANCIA;
    GRAU_IMPORTANCIA.descricao = this.descricao;
    GRAU_IMPORTANCIA.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    GRAU_IMPORTANCIA.data_ULT_MODIF = new Date();
    
    if (this.novo) {
      GRAU_IMPORTANCIA.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      GRAU_IMPORTANCIA.data_CRIA = new Date();
      this.RCDICGRAUIMPORTANCIAService.create(GRAU_IMPORTANCIA).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      GRAU_IMPORTANCIA.id = this.id_selected;      
      GRAU_IMPORTANCIA.data_CRIA = this.datacria;
      GRAU_IMPORTANCIA.utz_CRIA = this.utz_cria;
      this.RCDICGRAUIMPORTANCIAService.update(GRAU_IMPORTANCIA).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCDICGRAUIMPORTANCIAService.getAll().subscribe(
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
    var GRAU_IMPORTANCIA = new RC_DIC_GRAU_IMPORTANCIA;
    GRAU_IMPORTANCIA.descricao = this.descricao;
    GRAU_IMPORTANCIA.id = this.id_selected;

    this.RCDICGRAUIMPORTANCIAService.delete(GRAU_IMPORTANCIA.id).then(() => {
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
