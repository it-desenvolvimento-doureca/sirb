import { Component, OnInit, Renderer } from '@angular/core';
import { PR_DIC_CAPACIDADE_ACABAMENTO } from 'app/entidades/PR_DIC_CAPACIDADE_ACABAMENTO';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICCAPACIDADEACABAMENTOService } from 'app/servicos/pr-dic-capacidade-acabamento.service';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';

@Component({
  selector: 'app-capacidade-acabamento',
  templateUrl: './capacidade-acabamento.component.html',
  styleUrls: ['./capacidade-acabamento.component.css']
})
export class CapacidadeAcabamentoComponent implements OnInit {

  user: any;
  sectores: any[];
  novo: boolean;
  id_depart_selected: number;
  tipo_ACABAMENTO;
  linha;
  n_BARRAS_DIA;

  capacidade: PR_DIC_CAPACIDADE_ACABAMENTO;
  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;
  linhas: any[];
  tipos_ACABAMENTO: any[];
  cor_linha: any;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService,
    private PRDICCAPACIDADEACABAMENTOService: PRDICCAPACIDADEACABAMENTOService, private renderer: Renderer) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9212editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9212apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9212criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.preenchelinhas();
    this.listar_acabamentos();
    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.linha = null;
    this.tipo_ACABAMENTO = null;
    this.n_BARRAS_DIA = 0;
    this.dialognovo = true;
    this.cor_linha = "";
  }



  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();


      },
      error => console.log(error));
  }

  //listar os dados na tabela
  listar_acabamentos() {
    this.tipos_ACABAMENTO = [];
    this.PRDICCAPACIDADEACABAMENTOService.GET_TIPO_ACABAMENTO().subscribe(
      response => {
        this.tipos_ACABAMENTO.push({ label: "Sel. Tipo Acabamento", value: "" });
        for (var x in response) {
          this.tipos_ACABAMENTO.push({
            value: response[x][0], label: response[x][0]
          });
        }
        this.tipos_ACABAMENTO = this.tipos_ACABAMENTO.slice();
      },
      error => console.log(error));
  }

  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_CAPACIDADE_ACABAMENTO;
    if (!this.novo) depart = this.capacidade;
    depart.id_LINHA = this.linha.id;
    depart.n_BARRAS_DIA = this.n_BARRAS_DIA;
    depart.tipo_ACABAMENTO = this.tipo_ACABAMENTO;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      depart.ativo = true;
      this.PRDICCAPACIDADEACABAMENTOService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.id_CAPACIDADE_ACABAMENTO = this.id_depart_selected;
      this.PRDICCAPACIDADEACABAMENTOService.update(depart).subscribe(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICCAPACIDADEACABAMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x][0].id_CAPACIDADE_ACABAMENTO, tipo_ACABAMENTO: response[x][0].tipo_ACABAMENTO, linha: response[x][0].id_LINHA,
            n_BARRAS_DIA: response[x][0].n_BARRAS_DIA, dados: response[x][0], cor_linha: response[x][1], nome_LINHA: response[x][2]
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }


  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  //apagar zona
  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var depart = new PR_DIC_CAPACIDADE_ACABAMENTO;
        depart = this.capacidade;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.PRDICCAPACIDADEACABAMENTOService.update(depart).subscribe(() => {
          this.listar_departs();
          this.dialognovo = false;
        });

      }, reject: () => {
        this.dialognovo = true;
      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.capacidade = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.linha = (this.linhas.find(item => item.value.id == event.data.linha)) ? this.linhas.find(item => item.value.id == event.data.linha).value : null;
    this.tipo_ACABAMENTO = event.data.tipo_ACABAMENTO;
    this.n_BARRAS_DIA = event.data.n_BARRAS_DIA;
    this.cor_linha = event.data.cor_linha;
    this.novo = false;
    this.dialognovo = true;
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}