import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COM_REFERENCIAS } from 'app/entidades/COM_REFERENCIAS';
import { COM_REFERENCIAS_SILVER } from 'app/entidades/COM_REFERENCIAS_SILVER';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { COMREFERENCIASSILVERService } from 'app/servicos/com-referencias-silver.service';
import { COMREFERENCIASService } from 'app/servicos/com-referencias.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-referencias-form',
  templateUrl: './referencias-form.component.html',
  styleUrls: ['./referencias-form.component.css']
})
export class ReferenciasFormComponent implements OnInit {
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  modoedicao: boolean;
  referencias = [];
  filteredreferencia: any[];
  referencia_filter: any;
  campo_ref: any;
  COD_REFERENCIA_SILVER: any;
  DESC_REFERENCIA_SILVER: any;
  DATA_CRIA = null;
  HORA_CRIA = null;
  ID = null;
  UTILIZADOR = null;
  referencia_campo = null;
  OBSERVACOES = null;
  COD_REFERENCIA = null;
  DESCRICAO = null;
  referencia: any;
  tabela_referencias = [];
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  constructor(private renderer: Renderer, private elementRef: ElementRef, private confirmationService: ConfirmationService, private route: ActivatedRoute, private location: Location,
    private globalVar: AppGlobals, private router: Router, private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
    private COMREFERENCIASService: COMREFERENCIASService, private COMREFERENCIASSILVERService: COMREFERENCIASSILVERService) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");




    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });
      this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851editar"));
      this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851criar"));
      this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15851apagar"));



    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();


      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
      }
    }

    if (!this.novo) this.inicia(id);
    this.carregaDados();
  }

  inicia(id) {
    this.COMREFERENCIASService.getbyid(id).subscribe(
      response => {
        this.referencia = response[0][0];
        this.DATA_CRIA = this.formatDate(response[0][0].DATA_CRIA);
        this.HORA_CRIA = new Date(response[0][0].DATA_CRIA).toLocaleTimeString().slice(0, 5);
        this.ID = response[0][0].ID
        this.UTILIZADOR = response[0][1]
        this.OBSERVACOES = response[0][0].OBSERVACOES;
        this.COD_REFERENCIA = response[0][0].COD_REFERENCIA;
        this.DESCRICAO = response[0][0].DESCRICAO;
        this.COD_REFERENCIA_SILVER = response[0][0].COD_REFERENCIA_SILVER;
        this.DESC_REFERENCIA_SILVER = response[0][0].DESC_REFERENCIA_SILVER;
        if (response[0][0].COD_REFERENCIA_SILVER != null) this.referencia_campo = { value: response[0][0].COD_REFERENCIA_SILVER, label: response[0][0].COD_REFERENCIA_SILVER + " - " + response[0][0].DESC_REFERENCIA_SILVER, DESIGN: response[0][0].DESC_REFERENCIA_SILVER, };

        this.carregatabela_referencias(id);
      },
      error => {
        console.log(error);
      });

  }
  carregatabela_referencias(id) {
    this.COMREFERENCIASSILVERService.getbyid(id).subscribe(
      response2 => {
        this.tabela_referencias = [];

        for (var y in response2) {


          var referencia_campo = { value: response2[y].COD_REFERENCIA_SILVER, label: response2[y].COD_REFERENCIA_SILVER + " - " + response2[y].DESC_REFERENCIA_SILVER, DESIGN: response2[y].DESC_REFERENCIA_SILVER };
          this.tabela_referencias.push({
            filteredreferencias: [], referencia_campo: referencia_campo,
            dados: response2[y], id: response2[y].ID,
            PROREF: response2[y].COD_REFERENCIA_SILVER,
            DESIGN: response2[y].DESC_REFERENCIA_SILVER,
            ID_REFERENCIA: response2[y].ID_REFERENCIA
          });
        }
        this.tabela_referencias = this.tabela_referencias.slice();

      },
      error => { console.log(error); });
  }


  carregaDados() {
    this.carregaReferencias();
  }

  carregaReferencias() {
    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.referencias = [];
        for (var x in response) {
          this.referencias.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1, value: response[x].PROREF });
        }
        this.referencias = this.referencias.slice();
      },
      error => {
        console.log(error);
      });
  }

  /*filterRef(event) {
    this.filteredreferencia = this.pesquisa(event.query);
  }

  pesquisa(text) {
    var result = [];
    for (var x in this.referencias) {
      let ref = this.referencias[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.referencias[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    this.COD_REFERENCIA_SILVER = null;
    this.DESC_REFERENCIA_SILVER = null;

  }
  filterSelect(event) {
    //this.referencia_campo = event.label;
    this.COD_REFERENCIA_SILVER = event.value;
    this.DESC_REFERENCIA_SILVER = event.descricao;
  }*/

  filterRef(event, index) {

    this.tabela_referencias[index].filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.referencias) {
      let ref = this.referencias[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.referencias[x]);
      }
    }
    return result;
  }

  filteronUnselect(event, index) {
    this.tabela_referencias[index].DESIGN = "";
    this.tabela_referencias[index].PROREF = null;
  }

  filterSelect(event, index) {
    var tab = this.referencias.find(item => item.value == event.value)
    if (tab) {
      this.tabela_referencias[index].PROREF = event.value;
      this.tabela_referencias[index].DESIGN = tab.descricao;
    } else {
      this.tabela_referencias[index].DESIGN = "";
      this.tabela_referencias[index].PROREF = null;
    }
    this.tabela_referencias = this.tabela_referencias.slice();
  }

  gravar() {
    var referencia = new COM_REFERENCIAS;
    if (!this.novo) referencia = this.referencia;

    //referencia.COD_REFERENCIA_SILVER = this.COD_REFERENCIA_SILVER;
    referencia.DESCRICAO = this.DESCRICAO;
    //referencia.DESC_REFERENCIA_SILVER = this.DESC_REFERENCIA_SILVER;
    referencia.OBSERVACOES = this.OBSERVACOES;
    referencia.COD_REFERENCIA = this.COD_REFERENCIA;

    referencia.DATA_ULT_MODIF = new Date();
    referencia.UTZ_ULT_MODIF = this.user;

    if (this.novo) {

      referencia.DATA_CRIA = new Date();
      referencia.UTZ_CRIA = this.user;
      referencia.INATIVO = false;
      this.COMREFERENCIASService.create(referencia).subscribe(
        response => {
          this.gravar_tabela(response.ID)
          this.simular(this.inputnotifi);
          this.router.navigate(['/comercial_referencias/editar'], { queryParams: { id: response.ID } });
        }, error => { console.log(error); });
    } else {
      this.COMREFERENCIASService.update(referencia).subscribe(
        response => {
          this.gravar_tabela(referencia.ID)
          this.simular(this.inputgravou);
          this.router.navigate(['/comercial_referencias/view'], { queryParams: { id: referencia.ID } });

        }, error => { console.log(error); });
    }

  }

  gravar_tabela(id) {
    for (var x in this.tabela_referencias) {
      if (this.tabela_referencias[x].id == null) {
        this.cria_tabelas(this.tabela_referencias[x], this.tabela_referencias.length, parseInt(x) + 1, id);
      } else {
        this.atualiza_tabelas(this.tabela_referencias[x], this.tabela_referencias.length, parseInt(x) + 1, id);
      }
    }

  }

  cria_tabelas(data, total, index, id) {
    if (data.PROREF != null && data.PROREF != "") {
      var dados = new COM_REFERENCIAS_SILVER;
      dados.COD_REFERENCIA_SILVER = data.PROREF;
      dados.ID_REFERENCIA = data.linha;
      dados.DESC_REFERENCIA_SILVER = data.DESIGN;
      dados.ID_REFERENCIA = id;

      this.COMREFERENCIASSILVERService.create(dados).subscribe(result => {
        if (total == index) {

        }
      }, error => {
        console.log(error);
      });

    }
  }

  atualiza_tabelas(data, total, index, id) {
    if (data.PROREF != null && data.PROREF != "") {
      var dados = new COM_REFERENCIAS_SILVER;
      dados = data.dados;
      dados.COD_REFERENCIA_SILVER = data.PROREF;
      dados.ID_REFERENCIA = data.linha;
      dados.DESC_REFERENCIA_SILVER = data.DESIGN;

      this.COMREFERENCIASSILVERService.update(dados).subscribe(result => {
        if (total == index) {

        }
      }, error => {
        console.log(error);
      });
    }
  }
  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  //bt cancelar
  backview() {
    this.location.back();
  }


  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }

  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        var referencia = new COM_REFERENCIAS;

        if (!this.novo) referencia = this.referencia;
        referencia.INATIVO = true;
        referencia.DATA_ANULACAO = new Date();
        referencia.UTZ_ANULACAO = this.user;


        this.COMREFERENCIASService.update(referencia).subscribe(
          res => {

            this.simular(this.inputapagar)

            this.router.navigate(['comercial_referencias']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }


  //adicionar linha às tabelas
  adicionar_linha() {
    this.tabela_referencias.push({ filteredreferencias: [], referencia_campo: null, dados: null, id: null, PROREF: null, DESIGN: null });
    this.tabela_referencias = this.tabela_referencias.slice();
  }

  apagar_linha(index) {
    var tab = this.tabela_referencias[index];
    if (tab.id == null) {
      this.tabela_referencias = this.tabela_referencias.slice(0, index).concat(this.tabela_referencias.slice(index + 1));
    } else {
      this.COMREFERENCIASSILVERService.delete(tab.id).then(
        res => {
          this.tabela_referencias = this.tabela_referencias.slice(0, index).concat(this.tabela_referencias.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

}
