import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { GERSECCAOService } from 'app/servicos/ger-seccao.service';
import { QUADERROGACOESService } from 'app/servicos/qua-derrogacoes.service';
import { QUA_DERROGACOES } from 'app/entidades/QUA_DERROGACOES';

@Component({
  selector: 'app-derrogacoes-form',
  templateUrl: './derrogacoes-form.component.html',
  styleUrls: ['./derrogacoes-form.component.css']
})
export class DerrogacoesFormComponent implements OnInit {
  modoedicao = false;
  drop_cliente = [];
  drop_referencia = [];
  drop_utilizadores = [];
  display: boolean = false;
  displayverificar = false;
  data_CRIA;
  utz_CRIA;
  cliente;
  morada_CLIENTE;
  referencia;
  designacao_REF;
  familia_REF;
  user: any;
  novo: boolean;
  displayLoading = false;
  errovalida;
  mensagem_verifica;
  displayvalidacao;


  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditar2') alteraeditar2: ElementRef;
  @ViewChild('alteracancelar') alteracancelar: ElementRef;


  hora_CRIA: string;
  tabelaaccoescorretivas: any[] = [];
  tabelaEficacia: any[] = [];
  responsabilidade_ATRASO4_DESCRICAO: string;
  responsabilidade_ATRASO6_DESCRICAO: string;



  user_nome: any;
  adminuser: any;
  drop_artigos: any[] = [];
  drop_moradas = [];
  etsnum: any;
  referencia_temp: any;
  btanterior: boolean;
  btseguinte: boolean;
  btcriar: boolean;
  btapagar: boolean;
  btexportar: boolean;
  btvoltar: boolean;
  btfechar: boolean;
  bteditar: boolean;
  disEditar: boolean;
  disApagar: boolean;
  disFechar: boolean;
  disCriar: boolean;
  texto_estado: string;
  unidades = [{ value: "", label: "Sel. Unidade" }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }];
  seccoes: any[];
  drop_interna_EXTERNA = [{ value: "", label: "Selecionar" }, { value: 'I', label: "Interna" }, { value: 'E', label: "Externa" }];
  derrogacao_dados: QUA_DERROGACOES;
  id_DERROGACAO: number;
  emissor;
  estado: string;
  id_CLIENTE: number;
  interna_EXTERNA: string;
  motivo: string;
  nome_CLIENTE: string;
  qtd: number;
  setor;
  unidade;
  causa: string;
  data_INICIO: Date;
  data_FIM: string;
  data_FECHO: Date;
  data_FECHO_texto;
  utz_FECHO: number;

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private renderer: Renderer,
    private route: ActivatedRoute, private location: Location, private GERSECCAOService: GERSECCAOService,
    private QUADERROGACOESService: QUADERROGACOESService,
    private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {

    this.btanterior = true;
    this.btseguinte = true;
    this.btseguinte = true;
    this.btcriar = true;
    this.btapagar = true;
    this.btexportar = true;
    this.btvoltar = true;
    this.btfechar = true;
    this.bteditar = true;

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



      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561anular");
      this.disFechar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561fechar");
      //this.globalVar.setdi(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node561duplicar"));
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {

        this.btapagar = true;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {

        this.btapagar = false
        this.btcriar = true;
        this.btfechar = false;
        this.novo = true;
        this.bteditar = false;
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.texto_estado = this.getESTADO('A');
        this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.btcriar = true;
      }
    }

    if (!this.novo) { this.carregaDados(true, id); }

  }

  carregaDados(inicia, id) {
    //carregar seccoes
    this.seccoes = [];
    this.GERSECCAOService.getAll().subscribe(
      response => {
        this.seccoes.push({ label: "Selecionar Setor", value: "" })
        for (var x in response) {
          this.seccoes.push({ label: response[x].descricao, value: response[x].id })
        }
        this.carregaUtilizadores(inicia, id);
      },
      error => {
        console.log(error);
        this.carregaUtilizadores(inicia, id);
      });
  }

  carregaUtilizadores(inicia, id) {
    this.drop_utilizadores = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.drop_utilizadores.push({ label: "Selecionar Utilizador", value: "" });
        for (var x in response) {
          this.drop_utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }

        this.drop_utilizadores = this.drop_utilizadores.slice();
        this.artigos(inicia, id);
      },
      error => { console.log(error); this.artigos(inicia, id); });
  }

  artigos(inicia, id) {
    if (!this.novo) {
      this.ABDICCOMPONENTEService.getComponentesTodos().subscribe(
        response => {
          this.drop_artigos = [];
          var count = Object.keys(response).length;
          if (count > 0) {
            //  this.drop_artigos.push({ label: 'Sel. Ref. Comp.', value: null });
            for (var x in response) {
              this.drop_artigos.push({ valor: response[x].PROREF, design: response[x].PRODES1, FAMCOD: response[x].FAMCOD });
            }
          }
          this.clientes(inicia, id);
        }, error => { this.clientes(inicia, id); console.log(error); });
    } else {
      this.clientes(inicia, id);
    }
  }

  clientes(inicia, id) {
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
        if (inicia) this.inicia(id);
        console.log(error);
      });
  }

  inicia(id) {

    this.QUADERROGACOESService.getById(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.derrogacao_dados = response[0];
          for (var x in response) {

            this.id_DERROGACAO = response[x].id_DERROGACAO;
            this.designacao_REF = response[x].designacao_REF;
            this.emissor = response[x].emissor;
            this.estado = response[x].estado;
            this.etsnum = response[x].etsnum;
            this.referencia_temp = response[x].referencia;
            this.familia_REF = response[x].familia_REF;
            this.id_CLIENTE = response[x].id_CLIENTE;
            this.interna_EXTERNA = response[x].interna_EXTERNA;
            this.morada_CLIENTE = response[x].morada_CLIENTE;
            this.motivo = response[x].motivo;
            this.nome_CLIENTE = response[x].nome_CLIENTE;
            this.qtd = response[x].qtd;
            this.referencia = response[x].referencia;
            this.setor = response[x].setor;
            this.unidade = response[x].unidade;
            this.causa = response[x].causa;
            this.data_CRIA = new Date(response[x].data_CRIA);
            this.hora_CRIA = new Date(response[x].data_CRIA).toLocaleTimeString().slice(0, 5);
            this.data_INICIO = (response[x].data_INICIO == null) ? null : new Date(response[x].data_INICIO);
            this.data_FIM = response[x].data_FIM;
            this.utz_CRIA = response[x].utz_CRIA;
            this.data_FECHO = response[x].data_FECHO;
            this.utz_FECHO = response[x].utz_FECHO;
            this.data_FECHO_texto = (response[x].data_FECHO == null) ? null : this.formatDate2(response[x].data_FECHO);



            this.cliente = this.drop_cliente.find(item => item.value.id == response[x].id_CLIENTE).value;


            this.texto_estado = this.getESTADO(this.estado);

            if (this.estado == 'R') {
              this.btapagar = false;
              this.btfechar = false;
              this.bteditar = false;
            }

          }

          this.getMoradas(this.cliente.id, true);
          this.getArtigos(this.etsnum, true);

        }

      }, error => { console.log(error); })

  }

  getResponsavel(id) {
    if (id != null) var utz = this.drop_utilizadores.find(item => item.value == id);
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  alteraReferencia(event) {
    this.designacao_REF = "";
    if (this.referencia != null && this.referencia != "") {
      this.designacao_REF = this.referencia.design;
      this.familia_REF = this.referencia.FAMCOD;
    }
  }

  //formatar a data para yyyymmddhhmmsss
  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      min = '' + d.getMinutes(),
      mill = '' + d.getMilliseconds(),
      hour = '' + d.getHours(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + month + day + hour + min + mill;
  }

  //formatar a data para yyyy-mm-dd
  formatDate2(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  gravar() {
    //this.displayLoading = true;
    var derrogacao = new QUA_DERROGACOES;

    if (!this.novo) derrogacao = this.derrogacao_dados;

    derrogacao.data_INICIO = this.data_INICIO;
    derrogacao.data_FIM = this.data_FIM;
    derrogacao.designacao_REF = this.designacao_REF;
    derrogacao.emissor = this.emissor;


    derrogacao.familia_REF = this.familia_REF;

    derrogacao.interna_EXTERNA = this.interna_EXTERNA;
    /*derrogacao.id_CLIENTE = this.id_CLIENTE;
    derrogacao.morada_CLIENTE = this.morada_CLIENTE;
    derrogacao.nome_CLIENTE = this.nome_CLIENTE;
    derrogacao.etsnum = this.etsnum;*/
    derrogacao.id_CLIENTE = this.cliente.id;
    derrogacao.nome_CLIENTE = this.cliente.nome;
    derrogacao.morada_CLIENTE = this.morada_CLIENTE.nome;
    derrogacao.etsnum = this.morada_CLIENTE.id;

    derrogacao.motivo = this.motivo;
    derrogacao.qtd = this.qtd;
    derrogacao.referencia = this.referencia.valor;
    derrogacao.setor = this.setor;
    derrogacao.unidade = this.unidade;
    derrogacao.causa = this.causa;

    derrogacao.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
    derrogacao.utz_CRIA = this.utz_CRIA;
    derrogacao.utz_ULT_MODIF = this.user;
    derrogacao.data_ULT_MODIF = new Date();

    if (this.novo) {
      derrogacao.estado = "A";
      this.QUADERROGACOESService.create(derrogacao).subscribe(
        res => {
          this.router.navigate(['derrogacoes/editar'], { queryParams: { id: res.id_DERROGACAO } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      derrogacao.id_DERROGACAO = id;
      //console.log(reclamacao)
      this.QUADERROGACOESService.update(derrogacao).subscribe(
        res => {
          this.router.navigate(['derrogacoes/view'], { queryParams: { id: id } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    }
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //popup apagar
  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende anular?',
      header: 'Anular Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_ANULACAO = this.user;
        derrogacao.data_ANULACAO = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "R";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {
            this.router.navigate(['derrogacoes']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }

  //popup fechar
  fechar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende fechar?',
      header: 'Fechar Confirmação',
      icon: 'fa fa-close',
      accept: () => {
        var derrogacao = new QUA_DERROGACOES;

        derrogacao = this.derrogacao_dados;

        derrogacao.utz_FECHO = this.user;
        derrogacao.data_FECHO = new Date();
        //derrogacao.inativo = true;
        derrogacao.estado = "F";

        this.QUADERROGACOESService.update(derrogacao).subscribe(
          res => {
            this.router.navigate(['derrogacoes']);
            this.simular(this.inputgravou);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }



  //ao alterar cliente atualiza morada
  getMoradas(event, mor = false) {
    this.drop_moradas = [];
    this.drop_referencia = [];
    this.morada_CLIENTE = "";
    this.referencia = "";
    this.designacao_REF = "";
    if (!mor) this.familia_REF = "";

    this.ABDICCOMPONENTEService.getMoradas(event).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_moradas.push({ label: 'Sel. Morada.', value: "" });
          for (var x in response) {
            this.drop_moradas.push({ label: response[x].ADRNOM + ' ' + response[x].ADRLIB1, value: { id: response[x].ETSNUM, nome: response[x].ADRNOM + ' ' + response[x].ADRLIB1 } });
          }
          this.drop_moradas = this.drop_moradas.slice();
          if (mor) this.morada_CLIENTE = this.drop_moradas.find(item => item.value.id == this.etsnum).value;
        } else {
          this.drop_moradas.push({ label: 'Sem Moradas para o Cliente Seleccionado', value: 0 });
          this.morada_CLIENTE = 0;
        }
      }, error => {
        console.log(error);
      });
  }

  //ao alterar moradas atualiza artigos
  getArtigos(event, ref = false) {

    if (!ref) {
      this.designacao_REF = "";
      this.familia_REF = "";
    }

    this.ABDICCOMPONENTEService.getComponentesdoCliente(this.cliente.id, event).subscribe(
      response => {
        this.drop_referencia = [];
        var count = Object.keys(response).length;
        if (count > 0) {
          this.drop_referencia.push({ label: 'Sel. Ref. Comp.', value: "" });
          for (var x in response) {
            this.drop_referencia.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: { valor: response[x].PROREF, design: response[x].PRODES1, FAMCOD: response[x].FAMCOD } });
          }
          this.drop_referencia = this.drop_referencia.slice();

          if (ref) {
            this.referencia = this.drop_referencia.find(item => item.value.valor == this.referencia_temp).value;
            this.designacao_REF = this.referencia.design;
            if (this.referencia.FAMCOD != null && this.referencia.FAMCOD != "") this.familia_REF = this.referencia.FAMCOD;
          }
        } else {
          this.drop_referencia.push({ label: 'Sem Artigos para a Morada Seleccionada', value: 0 });
          this.referencia = 0;
        }
      }, error => {
        console.log(error);
      });
  }

  btgravar() {

  }

  getESTADO(estado) {
    if (estado == "A") {
      return "Aberto";
    } else if (estado == "F") {
      return "Fechado";
    } else if (estado == "R") {
      return "Anulado";
    }
  }

  novaderrogacao() {
    this.router.navigate(['derrogacoes/novo']);
  }

  backClicked() {
    //this.location.back();
    this.router.navigate(['derrogacoes']);
  }


  edita() {
    var page;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        page = params['id'] || 0;
      });
    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (this.bteditar) {
      if (back != 0) {
        this.router.navigate(['derrogacoes/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['derrogacoes/editar'], { queryParams: { id: page } });
      }

    }
  }
  bt() {
    throw new Error('Method not implemented.');
  }

}
