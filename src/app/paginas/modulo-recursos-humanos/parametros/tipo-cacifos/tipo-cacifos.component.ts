import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { RH_DIC_TIPO_CACIFO } from 'app/entidades/RH_DIC_TIPO_CACIFO';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHDICTIPOCACIFOService } from 'app/servicos/rh-dic-tipo-cacifo.service';

@Component({
  selector: 'app-tipo-cacifos',
  templateUrl: './tipo-cacifos.component.html',
  styleUrls: ['./tipo-cacifos.component.css']
})
export class TipoCacifosComponent implements OnInit {
  dados: any[];
  designacao: string;
  novo: boolean;
  cor_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private RHDICTIPOCACIFOService: RHDICTIPOCACIFOService, private renderer: Renderer) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node721editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node721apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node721criar");
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.designacao = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var ESTADOS_FUNC = new RH_DIC_TIPO_CACIFO;
    ESTADOS_FUNC.designacao = this.designacao;
    ESTADOS_FUNC.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    ESTADOS_FUNC.data_ULT_MODIF = new Date();

    if (this.novo) {
      ESTADOS_FUNC.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      ESTADOS_FUNC.data_CRIA = new Date();
      this.RHDICTIPOCACIFOService.create(ESTADOS_FUNC).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      ESTADOS_FUNC.cod_TIPO = this.id_selected;
      ESTADOS_FUNC.data_CRIA = this.datacria;
      ESTADOS_FUNC.utz_CRIA = this.utz_cria;
      this.RHDICTIPOCACIFOService.update(ESTADOS_FUNC).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHDICTIPOCACIFOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ cod_TIPO: response[x].cod_TIPO, designacao: response[x].designacao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var ESTADOS_FUNC = new RH_DIC_TIPO_CACIFO;
        ESTADOS_FUNC.designacao = this.designacao;
        ESTADOS_FUNC.cod_TIPO = this.id_selected;


        this.RHDICTIPOCACIFOService.delete(ESTADOS_FUNC.cod_TIPO).then(() => {
          this.listar();
        });
      }

    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {
      this.id_selected = event.data.cod_TIPO;
      this.designacao = event.data.designacao;
      this.novo = false;
      this.datacria = event.data.data_CRIA;
      this.utz_cria = event.data.utz_CRIA;
      this.simular(this.dialog);
    }
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
