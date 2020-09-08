import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RCDICTIPORECLAMACAOService } from 'app/servicos/rc-dic-tipo-reclamacao.service';
import { RHESTADOSFUNCService } from 'app/servicos/rh-estados-func.service';
import { RH_ESTADOS_FUNC } from 'app/entidades/RH_ESTADOS_FUNC';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-estadosfuncionarios',
  templateUrl: './estadosfuncionarios.component.html',
  styleUrls: ['./estadosfuncionarios.component.css']
})
export class EstadosfuncionariosComponent implements OnInit {

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
  falta_LONGA_DURACAO: Boolean;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private RHESTADOSFUNCService: RHESTADOSFUNCService, private renderer: Renderer) { }

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
    this.falta_LONGA_DURACAO = false;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var ESTADOS_FUNC = new RH_ESTADOS_FUNC;
    ESTADOS_FUNC.designacao = this.designacao;
    ESTADOS_FUNC.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    ESTADOS_FUNC.data_ULT_MODIF = new Date();
    ESTADOS_FUNC.falta_LONGA_DURACAO = this.falta_LONGA_DURACAO;

    if (this.novo) {
      ESTADOS_FUNC.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      ESTADOS_FUNC.data_CRIA = new Date();
      this.RHESTADOSFUNCService.create(ESTADOS_FUNC).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      ESTADOS_FUNC.cod_ESTADO = this.id_selected;
      ESTADOS_FUNC.data_CRIA = this.datacria;
      ESTADOS_FUNC.utz_CRIA = this.utz_cria;
      this.RHESTADOSFUNCService.update(ESTADOS_FUNC).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHESTADOSFUNCService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            cod_ESTADO: response[x].cod_ESTADO, designacao: response[x].designacao, falta_LONGA_DURACAO: response[x].falta_LONGA_DURACAO,
            data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA
          });
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
        var ESTADOS_FUNC = new RH_ESTADOS_FUNC;
        ESTADOS_FUNC.designacao = this.designacao;
        ESTADOS_FUNC.cod_ESTADO = this.id_selected;
        ESTADOS_FUNC.falta_LONGA_DURACAO = this.falta_LONGA_DURACAO;

        this.RHESTADOSFUNCService.delete(ESTADOS_FUNC.cod_ESTADO).then(() => {
          this.listar();
        });
      }

    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {
      this.id_selected = event.data.cod_ESTADO;
      this.designacao = event.data.designacao;
      this.falta_LONGA_DURACAO = event.data.falta_LONGA_DURACAO;
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
