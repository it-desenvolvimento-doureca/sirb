import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reclamacao-fornecedor',
  templateUrl: './reclamacao-fornecedor.component.html',
  styleUrls: ['./reclamacao-fornecedor.component.css']
})
export class ReclamacaoFornecedorComponent implements OnInit {
  types = [];
  drop_cliente = [];
  drop_referencia = [];
  drop_moradas = [];

  @ViewChild('escondebt') escondebt: ElementRef;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('buttongravar') buttongravar: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteracancelar') alteracancelar: ElementRef;
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  reclamacoes: any[];
  disimprimir: boolean;
  modoedicao: boolean;
  numero_RECLAMACAO;
  numero_RECLAMACAO_CLIENTE;
  data_CRIA;
  hora_CRIA;
  data_RECLAMACAO;
  hora_RECLAMACAO;
  utz_CRIA;
  utz_RESPONSAVEL;
  cliente;
  morada_CLIENTE;
  contato_CLIENTE;
  email_CLIENTE;
  telefone_CLIENTE;
  referencia;
  designacao_REF;
  selectedType;
  lote;
  devolucao;
  problema_REPETIDO;
  numero_RECLAMACAO_REPETIDA;
  descricao_PROBLEMA;
  responsabilidade_ATRASO3;
  displayvalidacao;
  display;
  texto_estado;
  drop_utilizadores2;
  errovalida;
  type;
  validaloading;
  drop_numero_reclamacao;
  reclamacao_ENCERRADA;
  nomeficheiro;

  constructor(private route: ActivatedRoute, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {
    this.types = [
      { label: 'Lote', value: 'lote', icon: 'fa-close' },
      { label: 'Etiqueta', value: 'etiqueta', icon: 'fa-close' },
      { label: 'Guia', value: 'guia', icon: 'fa-close' }
    ];

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    var step;
    var substep = this.route
      .queryParams
      .subscribe(params => {
        step = params['step'] || 0;
      });


    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });
      if (this.globalVar.getfiltros("reclamacaofornecedor_id") && this.globalVar.getfiltros("reclamacaofornecedor_id").length > 0) {
        //this.reclamacoes = this.globalVar.getfiltros("reclamacaofornecedor_id");
        //this.i = this.reclamacoes.indexOf(+id);
        //this.carregaDados(true, this.reclamacoes[this.i]);
        //preenche combo reclamações


      } else {
        //preenche array para navegar 
        /*this.RCMOVRECLAMACAOService.getAll().subscribe(
          response => {
            this.reclamacoes = [];
            var count = Object.keys(response).length;
            if (count > 0) {
              for (var x in response) {
                this.reclamacoes.push(response[x].id_RECLAMACAO);
                if (response[x].id_RECLAMACAO != id) this.drop_numero_reclamacao.push({ label: response[x].id_RECLAMACAO + ' - ' + response[x].referencia + ' / ' + response[x].nome_CLIENTE, value: response[x].id_RECLAMACAO });
              }
            } else {
              this.reclamacoes.push(id);
            }
            if (this.reclamacoes.indexOf(+id) < 0) { this.reclamacoes.push(parseInt(id)); }
            this.i = this.reclamacoes.indexOf(+id);

            this.carregaDados(true, this.reclamacoes[this.i]);
            
          }, error => { console.log(error); });*/
      }

      this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500editar"));
      this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500criar"));
      this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500apagar"));



      this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node500imprimir");
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
        /*this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.carregaDados(false, null);*/

      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
      } else if (urlarray[1].match("duplicar")) {

      }

    }
  }

  alteraReferencia(event) {

  }

  getMoradas(event, mor = false) {
  }

  getArtigos(id) {

  }

  gravar() {

  }

  seguinte() {

  }
  anterior() {

  }

  cancelar() {

  }

  apagar() {

  }

  imprimir(relatorio,id) {

  }

  validar() {

  }
  consulta() {

  }

  duplicar() {

  }


  verconsultaEncomendado(campo,capo1) {

  }
  verconsultaEnvios() {

  }
  verconsultaPlaneado() {

  }

  verconsultaStock(camp,pp){

  }
  btconcluir(){

  }
  backview(){

  }
  btgravar(){

  }
}
