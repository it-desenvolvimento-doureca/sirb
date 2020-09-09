import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GEREVENTOSPROGRAMADOSService } from '../../servicos/ger-eventos-programados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from '../../menu/sidebar.metadata';
import { Location } from '@angular/common';
import { GERUTILIZADORESService } from '../../servicos/ger-utilizadores.service';
import { GER_EVENTOS_PROGRAMADOS } from '../../entidades/GER_EVENTOS_PROGRAMADOS';
import { ConfirmationService } from 'primeng/primeng';
import { GERMODULOService } from '../../servicos/ger-modulo.service';

@Component({
  selector: 'app-gestaoeventostemporais',
  templateUrl: './gestaoeventostemporais.component.html',
  styleUrls: ['./gestaoeventostemporais.component.css']
})
export class GestaoeventostemporaisComponent implements OnInit {

  eventosProgramados: any;
  i: any;
  modulo_nome: any;
  modulos: any;
  anexa_FICHEIROS: boolean;
  user: any;
  evento: GER_EVENTOS_PROGRAMADOS;
  novo = false;
  cols: any[];
  criar_FICHEIRO: any;
  data_PROX_OCORRENCIA: any;
  data_ULT_OCORRENCIA: any;
  pasta_DESTINO: any;
  nome_RELATORIO: any;
  dias_SEMANA: any;
  repetir: any;
  tipo_REPETICAO: any;
  data_FINAL: any;
  total_OCORRENCIAS: any;
  ocorrencias: any;
  tipo_FIM: any;
  modulo = null;
  pagina = "";
  momento = "";
  estado = true;
  envia_EMAIL;
  modoedicao;
  data_INICIAL;
  hora;
  email_PARA;
  email_ASSUNTO;
  email_MENSAGEM;
  query;
  observacoes;
  results;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  utilizador: string;
  senha: string;
  dominio: string;

  constructor(private GERMODULOService: GERMODULOService, private confirmationService: ConfirmationService, private router: Router, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private GEREVENTOSPROGRAMADOSService: GEREVENTOSPROGRAMADOSService, private route: ActivatedRoute, private location: Location, private globalVar: AppGlobals) { }

  ngOnInit() {


    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setcriar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16apagar"));

    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");


    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      this.novo = false;

      if (id == 0) {
        this.router.navigate(['eventosprogramados']);
      }

    }
    if (urlarray[1].match("editar")) {
      this.modoedicao = true;
      this.globalVar.setseguinte(false);
      this.globalVar.setanterior(false);
    } else if (urlarray[1].match("novo")) {
      this.tipo_FIM = 1;
      this.tipo_REPETICAO = 1;
      this.repetir = 1;
      this.ocorrencias = 1;
      this.pagina = "Evento Programado";
      this.globalVar.setapagar(false);
      this.globalVar.setcriar(false);
      this.novo = true;
      this.globalVar.seteditar(false);
      this.modoedicao = true;
      this.total_OCORRENCIAS = 0;
      this.criar_FICHEIRO = false;
      this.anexa_FICHEIROS = false;
      this.envia_EMAIL = false;
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.getutilizadores();

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.getModulos(true, id);
    } else {
      this.getModulos(false, null);
    }
  }

  inicia(id) {

    this.GEREVENTOSPROGRAMADOSService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          this.evento = response[0];
          this.modulo = response[0].modulo;
          this.modulo_nome = this.modulos.find(item => item.value == response[0].modulo).label;
          this.pagina = response[0].pagina;
          this.momento = response[0].momento;
          this.estado = response[0].estado;
          this.data_INICIAL = this.formatDate2(response[0].data_INICIAL);
          this.hora = response[0].hora.slice(0, 5);
          this.tipo_FIM = response[0].tipo_FIM;
          this.ocorrencias = response[0].ocorrencias;
          this.total_OCORRENCIAS = response[0].total_OCORRENCIAS;
          this.data_FINAL = this.formatDate2(response[0].data_FINAL);
          this.tipo_REPETICAO = response[0].tipo_REPETICAO;
          this.repetir = response[0].repetir;
          this.dias_SEMANA = (response[0].dias_SEMANA != null) ? response[0].dias_SEMANA.split(",") : null;
          this.envia_EMAIL = response[0].envia_EMAIL;
          this.email_PARA = (response[0].email_PARA != null && response[0].email_PARA != "") ? response[0].email_PARA.split(",") : [];
          this.email_ASSUNTO = response[0].email_ASSUNTO;
          this.email_MENSAGEM = response[0].email_MENSAGEM;
          this.criar_FICHEIRO = response[0].criar_FICHEIRO;
          this.nome_RELATORIO = response[0].nome_RELATORIO;
          this.query = response[0].query;
          this.pasta_DESTINO = response[0].pasta_DESTINO;
          this.data_ULT_OCORRENCIA = this.formatDate2(response[0].data_ULT_OCORRENCIA);
          this.anexa_FICHEIROS = response[0].anexa_FICHEIROS;
          this.data_PROX_OCORRENCIA = this.formatDate2(response[0].data_PROX_OCORRENCIA);
          this.observacoes = response[0].observacoes;
          this.utilizador = response[0].utilizador;
          this.senha = (response[0].senha != null) ? atob(response[0].senha) : "";
          this.dominio = response[0].dominio;
        }
      }, error => { console.log(error); });
  }

  search(event) {
    var input = (<HTMLInputElement><any>document.getElementById('autocompleteinput'));
    this.results = this.pesquisaemail(event.query);
    if (event.query.indexOf(";") >= 0) {
      var email = (event.query.substr(0, event.query.indexOf(";")));
      if (this.email_PARA.indexOf(email) < 0 && email.trim().length > 0 && this.validateEmail(email)) {
        this.email_PARA.push(email);
        input.value = "";
      }
      if (email.trim().length < 0) {
        input.value = "";
      }
    }
  }

  getutilizadores() {
    this.cols = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          if (!this.cols.find(item => item.email == response[x].email)) {
            this.cols.push({ email: response[x].email });
          }
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  getModulos(inicia, id) {
    //carregar modulos
    this.modulos = [];
<<<<<<< HEAD
    this.modulos.push({ label: "Selecionar Módulo", value: "" });
=======
    this.modulos.push({ label: "Seleccionar Módulo", value: "" });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    this.GERMODULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.modulos.push({ label: response[x].nome_MODULO, value: response[x].id_MODULO });
        }
        this.modulos = this.modulos.slice();
        if (inicia) this.getEventos(id);
      },
      error => {
        console.log(error);
        if (inicia) this.getEventos(id);
      });
  }

  getEventos(id) {
    this.eventosProgramados = [];
    this.GEREVENTOSPROGRAMADOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.eventosProgramados.push(response[x][0].id);
        }
        this.eventosProgramados = this.eventosProgramados.slice();
        this.i = this.eventosProgramados.indexOf(+id);
        this.inicia(this.eventosProgramados[this.i]);

      },
      error => {
        console.log(error);
        this.inicia(id);
      });
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

  gravar() {

    var eventos = new GER_EVENTOS_PROGRAMADOS;
    if (!this.novo) eventos = this.evento;
    eventos.data_MODIFICACAO = new Date();
    eventos.utz_MODIFICACAO = this.user;
    eventos.envia_EMAIL = this.envia_EMAIL;
    eventos.email_ASSUNTO = this.email_ASSUNTO;
    eventos.email_MENSAGEM = this.email_MENSAGEM;
    eventos.email_PARA = (this.email_PARA && this.email_PARA.length > 0) ? this.email_PARA.toString() : "";
    eventos.estado = this.estado;

    eventos.data_INICIAL = this.data_INICIAL;
    eventos.hora = this.hora;
    eventos.tipo_FIM = this.tipo_FIM;
    eventos.ocorrencias = this.ocorrencias;
    eventos.data_FINAL = this.data_FINAL;
    eventos.anexa_FICHEIROS = this.anexa_FICHEIROS;

    eventos.tipo_REPETICAO = this.tipo_REPETICAO;
    eventos.repetir = this.repetir;


    eventos.dias_SEMANA = (this.dias_SEMANA && this.dias_SEMANA.length > 0) ? this.dias_SEMANA.toString() : null;

    eventos.criar_FICHEIRO = this.criar_FICHEIRO;
    eventos.nome_RELATORIO = this.nome_RELATORIO;
    eventos.pasta_DESTINO = this.pasta_DESTINO;
    eventos.senha = btoa(this.senha);
    eventos.utilizador = this.utilizador;
    eventos.dominio = this.dominio;

    eventos.query = this.query;

    eventos.observacoes = this.observacoes;

    eventos.inativo = false;

    eventos.total_OCORRENCIAS = 0;

    //if (eventos.data_PROX_OCORRENCIA == null || eventos.data_PROX_OCORRENCIA > this.data_INICIAL)
    eventos.data_PROX_OCORRENCIA = this.data_INICIAL;


    if (this.novo) {
      eventos.utz_CRIA = this.user;
      eventos.data_CRIA = new Date();
      eventos.data_MODIFICACAO = new Date();
      eventos.utz_MODIFICACAO = this.user;
      eventos.pagina = this.pagina;
      eventos.modulo = this.modulo;
      eventos.momento = this.momento;


      this.GEREVENTOSPROGRAMADOSService.create(eventos).subscribe((response) => {
        this.simular(this.inputgravou);
        this.router.navigate(['eventosprogramados/view'], { queryParams: { id: response.id } });
      },
        error => { console.log(error); this.simular(this.inputerro); });
    }
    else {
      // eventos.obs = this.observacoes;
      this.GEREVENTOSPROGRAMADOSService.update(eventos).then(() => {
        this.simular(this.inputgravou);
        this.router.navigate(['eventosprogramados/view'], { queryParams: { id: eventos.id } });
      },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  testar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.GEREVENTOSPROGRAMADOSService.testeEvento(id).subscribe(
        response => {
          this.simular(this.inputgravou);
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }


  //bt cancelar
  backview() {
    this.location.back();
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n))
    }

    return ret
  };


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
        var eventos = new GER_EVENTOS_PROGRAMADOS;
        if (!this.novo) eventos = this.evento;
        eventos.data_APAGA = new Date();
        eventos.utz_APAGA = this.user;
        eventos.inativo = true;
        this.GEREVENTOSPROGRAMADOSService.update(eventos).then(() => {
          this.simular(this.inputgravou);
          this.router.navigate(['eventosprogramados']);
        },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.eventosProgramados.length;
    if (this.eventosProgramados.length > 0) {
      this.router.navigate(['eventosprogramados/view'], { queryParams: { id: this.eventosProgramados[this.i] } });
      this.inicia(this.eventosProgramados[this.i]);

    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.eventosProgramados.length;
    }
    this.i = this.i - 1;
    if (this.eventosProgramados.length > 0) {
      this.router.navigate(['eventosprogramados/view'], { queryParams: { id: this.eventosProgramados[this.i] } });
      this.inicia(this.eventosProgramados[this.i]);
    }
  }

  //formatar a data para yyyy-mm-dd
  formatDate2(date) {
    if (date != null) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
    return null;
  }

}
