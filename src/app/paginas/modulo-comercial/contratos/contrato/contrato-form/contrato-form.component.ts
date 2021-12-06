import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COM_CONTRATOS } from 'app/entidades/COM_CONTRATOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { COMCONTRATOSService } from 'app/servicos/com-contratos.service';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html',
  styleUrls: ['./contrato-form.component.css']
})
export class ContratoFormComponent implements OnInit {
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  modoedicao: boolean;
  contratos = [];

  CONTRATO_SILVER: any;
  DATA_CRIA = null;
  HORA_CRIA = null;
  ID = null;
  UTILIZADOR = null;

  OBSERVACOES = null;
  N_CONTRATO = null;
  N_CLIENTE = null;
  contrato: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  NOME_CLIENTE: any;
  MORADA_CLIENTE: any;
  COD_MORADA: any;
  DATA_CONTRATO: any;
  drop_moradas: any[] = [];
  drop_cliente: any[] = [];
  drop_contratos_silver = [];
  constructor(private renderer: Renderer, private elementRef: ElementRef, private confirmationService: ConfirmationService, private route: ActivatedRoute, private location: Location,
    private globalVar: AppGlobals, private router: Router, private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
    private COMCONTRATOSService: COMCONTRATOSService) { }

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
      this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850editar"));
      this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850criar"));
      this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15850apagar"));



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

    if (!this.novo) {
      this.carregaDados(id, true);
    } else {
      this.carregaDados(id, false);
    }

  }

  inicia(id) {
    this.COMCONTRATOSService.getbyid(id).subscribe(
      response => {
        this.contrato = response[0][0];
        this.DATA_CRIA = this.formatDate(response[0][0].DATA_CRIA);
        this.HORA_CRIA = new Date(response[0][0].DATA_CRIA).toLocaleTimeString().slice(0, 5);
        this.ID = response[0][0].ID
        this.UTILIZADOR = response[0][1];
        this.OBSERVACOES = response[0][0].OBSERVACOES;
        this.N_CONTRATO = response[0][0].N_CONTRATO;
        this.N_CLIENTE = response[0][0].N_CLIENTE;
        this.NOME_CLIENTE = response[0][0].NOME_CLIENTE;
        this.MORADA_CLIENTE = response[0][0].MORADA_CLIENTE;
        this.COD_MORADA = response[0][0].COD_MORADA;
        this.DATA_CONTRATO = (response[0][0].DATA_CONTRATO == null) ? null : new Date(response[0][0].DATA_CONTRATO);
        this.CONTRATO_SILVER = response[0][0].CONTRATO_SILVER;
        this.N_CLIENTE = this.drop_cliente.find(item => item.value.id == response[0][0].N_CLIENTE).value;
        this.getMoradas(this.N_CLIENTE.id, true);
      },
      error => {
        console.log(error);
      });

  }

  carregaDados(id, inicia) {
    this.clientes(id, inicia);
  }

  clientes(id, inicia) {
    this.ABDICCOMPONENTEService.getClientes().subscribe(
      response => {
        this.drop_cliente = [];
        this.drop_cliente.push({ label: 'Sel. Cliente.', value: "" });


        for (var x in response) {
          this.drop_cliente.push({ label: response[x].ADRNOM, value: { id: response[x].CLICOD, nome: response[x].ADRNOM } });
        }
        this.drop_cliente = this.drop_cliente.slice();
        if (inicia) this.inicia(id);
      }, error => {
        console.log(error);
        if (inicia) this.inicia(id);
      });
  }

  gravar() {
    var contrato = new COM_CONTRATOS;
    if (!this.novo) contrato = this.contrato;

    contrato.CONTRATO_SILVER = this.CONTRATO_SILVER;
    contrato.N_CLIENTE = this.N_CLIENTE.id;
    contrato.NOME_CLIENTE = this.N_CLIENTE.nome;
    contrato.MORADA_CLIENTE = this.MORADA_CLIENTE.nome;
    contrato.COD_MORADA = this.MORADA_CLIENTE.id;
    contrato.OBSERVACOES = this.OBSERVACOES;
    contrato.N_CONTRATO = this.N_CONTRATO;
    contrato.DATA_CONTRATO = this.DATA_CONTRATO;

    contrato.DATA_ULT_MODIF = new Date();
    contrato.UTZ_ULT_MODIF = this.user;

    if (this.novo) {

      contrato.DATA_CRIA = new Date();
      contrato.UTZ_CRIA = this.user;
      contrato.INATIVO = false;
      this.COMCONTRATOSService.create(contrato).subscribe(
        response => {
          this.simular(this.inputnotifi);
          this.router.navigate(['/comercial_contratos/editar'], { queryParams: { id: response.ID } });
        }, error => { console.log(error); });
    } else {
      this.COMCONTRATOSService.update(contrato).subscribe(
        response => {
          this.simular(this.inputgravou);
          this.router.navigate(['/comercial_contratos/view'], { queryParams: { id: contrato.ID } });

        }, error => { console.log(error); });
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

        var contrato = new COM_CONTRATOS;

        if (!this.novo) contrato = this.contrato;
        contrato.INATIVO = true;
        contrato.DATA_ANULACAO = new Date();
        contrato.UTZ_ANULACAO = this.user;


        this.COMCONTRATOSService.update(contrato).subscribe(
          res => {

            this.simular(this.inputapagar)

            this.router.navigate(['comercial_contratos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  //ao alterar cliente atualiza morada
  getMoradas(event, mor = false) {
    this.drop_moradas = [];

    this.MORADA_CLIENTE = "";


    this.ABDICCOMPONENTEService.getMoradas(event).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_moradas.push({ label: 'Sel. Morada.', value: "" });
          for (var x in response) {
            this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
          }
          this.drop_moradas = this.drop_moradas.slice();
          if (mor) this.MORADA_CLIENTE = this.drop_moradas.find(item => item.value.id == this.COD_MORADA).value;
        } else {
          this.drop_moradas.push({ label: 'Sem Moradas para o Cliente Seleccionado', value: 0 });
          this.MORADA_CLIENTE = 0;
        }
      }, error => {
        console.log(error);
      });
  }

}
