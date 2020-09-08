import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHDICCACIFOSService } from 'app/servicos/rh-dic-cacifos.service';
import { RH_DIC_CACIFOS } from 'app/entidades/RH_DIC_CACIFOS';
import { GERLOCAISService } from 'app/servicos/ger-locais.service';
import { RHFUNCIONARIOSService } from 'app/servicos/rh-funcionarios.service';
import { RHDICTIPOCACIFOService } from 'app/servicos/rh-dic-tipo-cacifo.service';

@Component({
  selector: 'app-cacifos',
  templateUrl: './cacifos.component.html',
  styleUrls: ['./cacifos.component.css']
})
export class CacifosComponent implements OnInit {

  dados: any[];
  tipo_UTILIZADOR;
  novo: boolean;
  id_selected: number;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  UTILIZADOR;
  codigo: string;
  local;
  dados_cacifo;
  locais: any[];
  tipos = [];
  utilizadores: any[];
  tipo_CACIFO;
  tiposCacifo: any[];
  constructor(private RHDICTIPOCACIFOService: RHDICTIPOCACIFOService, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private RHDICCACIFOSService: RHDICCACIFOSService,
    private GERLOCAISService: GERLOCAISService, private renderer: Renderer, private RHFUNCIONARIOSService: RHFUNCIONARIOSService) { }

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
    this.listar_locais();
    this.listar_tiposcacifo();

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node725editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node725apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node725criar");
    this.tipos = [{ value: "", label: "Selecionar Tipo Utilizador" }, { value: "Homem", label: "Homem" }, { value: "Mulher", label: "Mulher" }]

  }

  //abre popup para adicionar zona
  showDialogToAdd() {

    this.listar_utilizadores(null, null);
    this.novo = true;
    this.id_selected = 0;
    this.tipo_UTILIZADOR = "";
    this.tipo_CACIFO = "";
    this.dados_cacifo = [];
    this.UTILIZADOR = null;
    this.codigo = "";
    this.local = "";
    this.simular(this.dialog);
  }



  //listar os dados na tabela
  listar_locais() {
    this.locais = [];
    this.GERLOCAISService.getAll().subscribe(
      response => {

        this.locais.push({ value: "", label: "Selecionar Local" });
        for (var x in response) {
          this.locais.push({ value: response[x].id, label: response[x].descricao });
        }
        this.locais = this.locais.slice();
      },
      error => console.log(error));
  }

  listar_tiposcacifo() {
    this.tiposCacifo = [];
    this.RHDICTIPOCACIFOService.getAll().subscribe(
      response => {
        this.tiposCacifo.push({ value: null, label: "Selecionar Tipo Cacifo" });
        for (var x in response) {
          this.tiposCacifo.push({ value: response[x].cod_TIPO, label: response[x].designacao });
        }
        this.tiposCacifo = this.tiposCacifo.slice();
      },
      error => console.log(error));

  }


  listar_utilizadores(utilizador, nome_UTILIZADOR) {
    this.utilizadores = [];
    this.RHFUNCIONARIOSService.getAllAtivos().subscribe(
      response => {
        this.utilizadores.push({ value: null, label: "Selecionar Utilizador" });
        if (utilizador != null) this.utilizadores.push({ value: utilizador, label: utilizador + " - " + nome_UTILIZADOR })
        for (var x in response) {
          this.utilizadores.push({ value: response[x].cod_FUNCIONARIO, label: response[x].cod_FUNCIONARIO + " - " + response[x].nome });
        }
        this.utilizadores = this.utilizadores.slice();
      },
      error => console.log(error));

  }

  //gravar unidade de zona
  gravardados() {
    var CACIFO = new RH_DIC_CACIFOS;
    CACIFO.data_APAGA = this.dados_cacifo.data_APAGA;
    CACIFO.utz_APAGA = this.dados_cacifo.utz_APAGA;
    CACIFO.inativo = this.dados_cacifo.inativo;

    CACIFO.tipo_UTILIZADOR = this.tipo_UTILIZADOR;
    CACIFO.tipo_CACIFO = this.tipo_CACIFO;
    CACIFO.utilizador = this.UTILIZADOR;
    CACIFO.codigo = this.codigo;
    CACIFO.local = this.local;

    CACIFO.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    CACIFO.data_MODIF = new Date();

    if (this.novo) {
      CACIFO.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      CACIFO.data_CRIA = new Date();
      CACIFO.inativo = false;
      this.RHDICCACIFOSService.create(CACIFO).subscribe(response => {
        this.atualizacifo(CACIFO.id, CACIFO.utilizador);
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {

      CACIFO.data_CRIA = this.dados_cacifo.data_CRIA;
      CACIFO.utz_CRIA = this.dados_cacifo.utz_CRIA;
      CACIFO.id = this.id_selected;
      this.RHDICCACIFOSService.update(CACIFO).then(() => {
        this.listar();
        this.simular(this.closedialog);
        this.atualizacifo(CACIFO.id, CACIFO.utilizador);
      });

    }
  }

  atualizacifo(id, utilizador) {
    this.RHDICCACIFOSService.atualizacaCacifoUtilizador(id, utilizador).subscribe(
      response => {
      },
      error => console.log(error));
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHDICCACIFOSService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.dados.push({
            dados_tabela: response[x][0],
            codigo: response[x][0].codigo,
            id: response[x][0].id,
            local: response[x][0].local,
            utilizador: response[x][0].utilizador,
            tipo_UTILIZADOR: response[x][0].tipo_UTILIZADOR,
            tipo_CACIFO: response[x][0].tipo_CACIFO,
            nomeTIPO_CACIFO: response[x][3],
            nome_UTILIZADOR: response[x][1],
            codigo_nome_UTILIZADOR: (response[x][0].utilizador == null) ? "" : response[x][0].utilizador + " - " + response[x][1],
            nome_LOCAL: response[x][2],

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
        var CACIFO = new RH_DIC_CACIFOS;
        CACIFO = this.dados_cacifo;
        CACIFO.inativo = true;
        CACIFO.utz_APAGA = JSON.parse(localStorage.getItem('userapp'))["id"];
        CACIFO.data_APAGA = new Date();

        this.RHDICCACIFOSService.update(CACIFO).then(() => {
          this.listar();
        });
      }

    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {

      this.listar_utilizadores(event.data.utilizador, event.data.nome_UTILIZADOR);

      this.id_selected = event.data.id;
      this.tipo_UTILIZADOR = event.data.tipo_UTILIZADOR;
      this.tipo_CACIFO = event.data.tipo_CACIFO;
      this.novo = false;
      this.dados_cacifo = event.data.dados_tabela;
      this.UTILIZADOR = event.data.utilizador;
      this.codigo = event.data.codigo;
      this.local = event.data.local;
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
