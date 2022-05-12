import { Component, OnInit, Renderer } from '@angular/core';
import { MAN_DIC_DIVISOES } from 'app/entidades/MAN_DIC_DIVISOES';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { MANDICDIVISOESService } from 'app/servicos/man-dic-divisoes.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-divisoes',
  templateUrl: './divisoes.component.html',
  styleUrls: ['./divisoes.component.css']
})
export class DivisoesComponent implements OnInit {
  user: any;
  novo: boolean;
  id_depart_selected: number;

  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;


  dados: any;
  descricao: any;
  id: any;
  id_piso: any;
  pisos: any[];
  email_para;
  cols = [];
  results;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer, private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANDICDIVISOESService: MANDICDIVISOESService, private MANDICPISOSService: MANDICPISOSService) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1165101editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1165101apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1165101criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    this.listar_pisos();
    this.getutilizadores()
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.id = null;
    this.id_piso = null;
    this.descricao = null;
    this.email_para = null;
    this.dialognovo = true;
  }


  //gravar unidade de depart
  gravar() {
    var depart = new MAN_DIC_DIVISOES;
    if (!this.novo) depart = this.dados;
    depart.ID = this.id;
    depart.ID_PISO = this.id_piso;
    depart.DESCRICAO = this.descricao;
    depart.EMAIL_PARA = this.email_para.toString();


    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.MANDICDIVISOESService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.MANDICDIVISOESService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.MANDICDIVISOESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x][0].ID, dados: response[x][0], descricao: response[x][0].DESCRICAO,
            id_piso: response[x][0].ID_PISO, piso: response[x][1] + ' / ' + response[x][2]
            , email_para: (response[x][0].EMAIL_PARA != null && response[x][0].EMAIL_PARA != "") ? response[x][0].EMAIL_PARA.split(",") : [],
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


  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var depart = new MAN_DIC_DIVISOES;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ULT_MODIF = new Date();
        depart.UTZ_ULT_MODIF = this.user;

        this.MANDICDIVISOESService.update(depart).then(() => {
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
    this.dados = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.id = event.data.id;
    this.descricao = event.data.descricao;
    this.email_para = event.data.email_para;
    this.id_piso = event.data.id_piso;
    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //listar os dados na tabela
  listar_pisos() {
    this.pisos = [];
    this.pisos.push({
      value: '', label: 'Selecionar Piso'
    });
    this.MANDICPISOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.pisos.push({
            value: response[x][0].ID, label: response[x][0].DESCRICAO + ' / ' + response[x][1]
          });
        }
        this.pisos = this.pisos.slice();
      },
      error => console.log(error));
  }

  /** */
  search(event) {
    var input = (<HTMLInputElement><any>document.getElementById('autocompleteinput'));
    this.results = this.pesquisaemail(event.query);
    if (event.query.indexOf(";") >= 0) {
      var email = (event.query.substr(0, event.query.indexOf(";")));
      if (this.email_para.indexOf(email) < 0 && email.trim().length > 0 && this.validateEmail(email)) {
        this.email_para.push(email);
        input.value = "";
      }
      if (email.trim().length < 0) {
        input.value = "";
      }
    }
  }



  //verifica se é email
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //verifica se existe algum email
  pesquisaemail(text) {
    var result = [];
    for (var x in this.cols) {
      if (this.cols[x].email.includes(text)) {
        result.push(this.cols[x].email);
      }
    }
    return result;
  }


  getutilizadores() {
    this.cols = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          if (this.cols.findIndex(item => item.email == response[x].email) == -1) {
            this.cols.push({ email: response[x].email });
          }
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }
  /** */

}
