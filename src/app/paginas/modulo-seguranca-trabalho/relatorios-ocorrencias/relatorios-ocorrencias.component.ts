import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AT_OCORRENCIAS, AT_TESTEMUNHAS, AT_ENTREVISTAS, AT_ACCOES } from 'app/entidades/AT';
import { ATOCORRENCIASService } from 'app/servicos/at-ocorrencias.service';
import { ATTESTEMUNHASService } from 'app/servicos/at-testemunhas.service';
import { ATACCOESService } from 'app/servicos/at-accoes.service';
import { ATENTREVISTASService } from 'app/servicos/at-entrevistas.service';
import { ConfirmationService } from 'primeng/primeng';
import { RHFUNCIONARIOSService } from 'app/servicos/rh-funcionarios.service';
import { RHDICEPIService } from 'app/servicos/rh-dic-epi.service';
import { ATDICCAUSASACIDENTEService } from 'app/servicos/at-dic-causas-acidente.service';

@Component({
  selector: 'app-relatorios-ocorrencias',
  templateUrl: './relatorios-ocorrencias.component.html',
  styleUrls: ['./relatorios-ocorrencias.component.css']
})
export class RelatoriosOcorrenciasComponent implements OnInit {
  classstep: any = 'step-1';
  tabelaTestemunha: any = [];
  tabelaEntrevista: any = [];
  tabelaAccoes: any = [];
  modoedicao: boolean;
  novo: boolean;
  data_CRIA: Date;
  hora_CRIA: string;
  utz_CRIA: any;
  user: any;
  user_nome: any;
  adminuser: any;

  id_OCORRENCIA: number;
  data_MODIF: Date;
  utz_MODIF: number;
  nome_PESSOA;
  numero_PESSOA: string;
  idade_PESSOA: number;
  nacionalidade: string;
  funcao_PESSOA: string;
  departamento: string;
  tipo_RELATORIO: string;
  com_BAIXA: boolean;
  tipo_ACIDENTE: string;
  notificou_SEGURADORA: boolean;
  companhia: string;
  n_APOLICE: string;
  data_ACIDENTE: Date;
  hora_ACIDENTE: string;
  local_ACIDENTE: string;
  numero_PESSOAS_ENVOLVIDAS: number;
  numero_VITIMAS: number;
  descricao_ACIDENTE: string;
  grau_LESAO: string;
  gerou_IT;
  gerou_IP;
  danos_MATERIAS: string;
  trabalhadores_SIMILARES: boolean;
  pa_CABECA: boolean;
  pa_OLHOS: boolean;
  pa_PESCOCO: boolean;
  pa_COSTAS: boolean;
  pa_TORAX: boolean;
  pa_ABDOMEN: boolean;
  pa_OMBRO: boolean;
  pa_ANTEBRACO: boolean;
  pa_PE: boolean;
  pa_DEDOS_PE: boolean;
  pa_LOCALIZACOES_MULTIPLAS: boolean;
  pa_ANCA: boolean;
  pa_JOELHO: boolean;
  pa_MAO: boolean;
  pa_OUTRO: boolean;
  pa_OUTRO_TEXTO: string;
  recolha_EVIDENCIAS: string;
  testemunhas: boolean;
  numero_TESTEMUNHAS: number;
  medidas_FORMACAO: string;
  medidas_ORGANIZACAO: string;
  medidas_PROTECAO_COL: string;
  medidas_PROTECAO_IND: string;
  medidas_OUTRAS: string;
  diagrama_TOP_ESQ: string;
  diagrama_TOP_DIR: string;
  diagrama_DIR: string;
  diagrama_BT_ESQ: string;
  diagrama_BT_DIR: string;
  descricao_CAUSAS: string;
  analise_EFICACIA: string;
  eficaz: boolean;
  cl_CORTE;
  cl_FERIDA;
  cl_CONTUSAO;
  cl_FRATURA;
  cl_HEMATOMA;
  cl_LESAO_MUSCULO_ESQUELETICA;
  cl_INTOXICACAO_ENVENENAMENTO;
  cl_ENTORSE_LUXACAO;
  cl_LESAO_OCULAR;
  cl_ESMAGAMENTO;
  cl_PERFURACAO;
  cl_ENTATALAMENTO;
  cl_AMPUTACAO;
  cl_QUEIMADURA;
  cl_OUTRO;
  cl_OUTRO_TEXTO;
  vinculo;
  dias_PERDIDOS;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;
  estado: string;
  dados_ocorrencia: AT_OCORRENCIAS;
  estado_texto: string;
  funcionarios: any[];
  filteredNomesSingle: any[];
  epis: any[];
  causas_acidente: any[];

  constructor(private RHFUNCIONARIOSService: RHFUNCIONARIOSService, private location: Location, private elementRef: ElementRef, private confirmationService: ConfirmationService, private route: ActivatedRoute,
    private ATTESTEMUNHASService: ATTESTEMUNHASService, private ATACCOESService: ATACCOESService, private ATENTREVISTASService: ATENTREVISTASService,
    private RHDICEPIService: RHDICEPIService, private ATDICCAUSASACIDENTEService: ATDICCAUSASACIDENTEService,
    private renderer: Renderer, private ATOCORRENCIASService: ATOCORRENCIASService, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


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
    this.globalVar.setdisCriarmanutencao(true);


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

        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        //this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {

        this.globalVar.setcriar(true);
      }
    }


    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23apagar"));

    this.carregaFuncionarios();
    this.carrega_epis(id);
    this.carrega_causas(id);
    if (!this.novo) {
      this.inicia(id);
    }
  }

  carregaFuncionarios() {
    this.funcionarios = [];
    this.RHFUNCIONARIOSService.getAll().subscribe(
      response => {

        this.funcionarios.push({
          value: "",
          label: "Sel. Nº", nome: ""
        });
        for (var x in response) {

          var numero_op = response[x][0].cod_FUNCIONARIO;
          var numero_op2 = "";
          if (Math.sign(response[x][0].cod_FUNCIONARIO) < 0) {
            numero_op = numero_op * -1;
          }
          if (numero_op < 100) {
            numero_op2 = ("00" + numero_op).slice(-3);
          } else {
            numero_op2 = numero_op + "";
          }
          if (response[x][0].ativo) {
            this.funcionarios.push({
              value: numero_op2,
              label: numero_op2, nome: response[x][0].nome
            });
          }
        }
        this.funcionarios = this.funcionarios.slice();
        if (this.numero_PESSOA != null) {
          this.nome_PESSOA = (this.funcionarios.find(item => item.value == this.numero_PESSOA)) ? this.funcionarios.find(item => item.value == this.numero_PESSOA) : null;
        }
      },
      error => {
        console.log(error);
      });
  }

  carrega_epis(id) {
    this.epis = [];
    this.RHDICEPIService.getAT_OCORRENCIAS_EPI(id).subscribe(
      response => {
        for (var x in response) {
          this.epis.push({ id: response[x][0], id_OCORRENCIA: response[x][1], descricao: response[x][2], selected: (response[x][1]) ? true : false });
        }
        this.epis = this.epis.slice();
      },
      error => console.log(error));
  }

  carrega_causas(id) {
    this.causas_acidente = [];
    this.ATDICCAUSASACIDENTEService.getAT_OCORRENCIAS_CAUSAS_ACIDENTE(id).subscribe(
      response => {
        for (var x in response) {
          this.causas_acidente.push({ id: response[x][0], id_OCORRENCIA: response[x][1], descricao: response[x][2], selected: (response[x][1]) ? true : false });
        }
        this.causas_acidente = this.causas_acidente.slice();
      },
      error => console.log(error));
  }

  inicia(id) {
    this.ATOCORRENCIASService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.dados_ocorrencia = response[0];
          this.data_CRIA = new Date(response[0].data_CRIA);
          this.utz_CRIA = response[0].utz_CRIA;
          this.hora_CRIA = new Date(response[0].data_CRIA).toLocaleTimeString().slice(0, 5);
          this.com_BAIXA = response[0].com_BAIXA;
          this.id_OCORRENCIA = response[0].id_OCORRENCIA;
          this.analise_EFICACIA = response[0].analise_EFICACIA;
          this.companhia = response[0].companhia;
          this.danos_MATERIAS = response[0].danos_MATERIAS;
          this.data_ACIDENTE = (response[0].data_ACIDENTE == null) ? null : new Date(response[0].data_ACIDENTE);
          this.departamento = response[0].departamento;
          this.descricao_ACIDENTE = response[0].descricao_ACIDENTE;
          this.descricao_CAUSAS = response[0].descricao_CAUSAS;
          this.diagrama_BT_DIR = response[0].diagrama_BT_DIR;
          this.diagrama_BT_ESQ = response[0].diagrama_BT_ESQ;
          this.diagrama_DIR = response[0].diagrama_DIR;
          this.diagrama_TOP_DIR = response[0].diagrama_TOP_DIR;
          this.diagrama_TOP_ESQ = response[0].diagrama_TOP_ESQ;
          this.eficaz = response[0].eficaz;
          this.funcao_PESSOA = response[0].funcao_PESSOA;
          this.gerou_IP = response[0].gerou_IP;
          this.gerou_IT = response[0].gerou_IT;
          this.grau_LESAO = response[0].grau_LESAO;
          this.hora_ACIDENTE = response[0].hora_ACIDENTE;
          this.idade_PESSOA = response[0].idade_PESSOA;
          this.local_ACIDENTE = response[0].local_ACIDENTE;
          this.medidas_FORMACAO = response[0].medidas_FORMACAO;
          this.medidas_ORGANIZACAO = response[0].medidas_ORGANIZACAO;
          this.medidas_OUTRAS = response[0].medidas_OUTRAS;
          this.medidas_PROTECAO_COL = response[0].medidas_PROTECAO_COL;
          this.medidas_PROTECAO_IND = response[0].medidas_PROTECAO_IND;
          this.n_APOLICE = response[0].n_APOLICE;
          //this.nacionalidade = response[0].nacionalidade;
          this.nome_PESSOA = (this.funcionarios.find(item => item.value == response[0].numero_PESSOA)) ? this.funcionarios.find(item => item.value == response[0].numero_PESSOA) : null;
          this.notificou_SEGURADORA = response[0].notificou_SEGURADORA;
          this.numero_PESSOA = response[0].numero_PESSOA;
          this.numero_PESSOAS_ENVOLVIDAS = response[0].numero_PESSOAS_ENVOLVIDAS;
          this.numero_TESTEMUNHAS = response[0].numero_TESTEMUNHAS;
          this.numero_VITIMAS = response[0].numero_VITIMAS;
          this.pa_ABDOMEN = response[0].pa_ABDOMEN;
          this.pa_ANCA = response[0].pa_ANCA;
          this.pa_ANTEBRACO = response[0].pa_ANTEBRACO;
          this.pa_CABECA = response[0].pa_CABECA;
          this.pa_COSTAS = response[0].pa_COSTAS;
          this.pa_DEDOS_PE = response[0].pa_DEDOS_PE;
          this.pa_JOELHO = response[0].pa_JOELHO;
          this.pa_LOCALIZACOES_MULTIPLAS = response[0].pa_LOCALIZACOES_MULTIPLAS;
          this.pa_MAO = response[0].pa_MAO;
          this.pa_OLHOS = response[0].pa_OLHOS;
          this.pa_OMBRO = response[0].pa_OMBRO;
          this.pa_OUTRO = response[0].pa_OUTRO;
          this.pa_OUTRO_TEXTO = response[0].pa_OUTRO_TEXTO;
          this.pa_PE = response[0].pa_PE;
          this.pa_PESCOCO = response[0].pa_PESCOCO;
          this.pa_TORAX = response[0].pa_TORAX;
          this.recolha_EVIDENCIAS = response[0].recolha_EVIDENCIAS;
          this.testemunhas = response[0].testemunhas;
          this.tipo_ACIDENTE = response[0].tipo_ACIDENTE;
          this.tipo_RELATORIO = response[0].tipo_RELATORIO;
          this.trabalhadores_SIMILARES = response[0].trabalhadores_SIMILARES;

          this.cl_CORTE = response[0].cl_CORTE;
          this.cl_FERIDA = response[0].cl_FERIDA;
          this.cl_CONTUSAO = response[0].cl_CONTUSAO;
          this.cl_FRATURA = response[0].cl_FRATURA;
          this.cl_HEMATOMA = response[0].cl_HEMATOMA;
          this.cl_LESAO_MUSCULO_ESQUELETICA = response[0].cl_LESAO_MUSCULO_ESQUELETICA;
          this.cl_INTOXICACAO_ENVENENAMENTO = response[0].cl_INTOXICACAO_ENVENENAMENTO;
          this.cl_ENTORSE_LUXACAO = response[0].cl_ENTORSE_LUXACAO;
          this.cl_LESAO_OCULAR = response[0].cl_LESAO_OCULAR;
          this.cl_ESMAGAMENTO = response[0].cl_ESMAGAMENTO;
          this.cl_PERFURACAO = response[0].cl_PERFURACAO;
          this.cl_ENTATALAMENTO = response[0].cl_ENTATALAMENTO;
          this.cl_AMPUTACAO = response[0].cl_AMPUTACAO;
          this.cl_QUEIMADURA = response[0].cl_QUEIMADURA;
          this.cl_OUTRO = response[0].cl_OUTRO;
          this.cl_OUTRO_TEXTO = response[0].cl_OUTRO_TEXTO;
          this.vinculo = response[0].vinculo;
          this.dias_PERDIDOS = response[0].dias_PERDIDOS;

          this.estado = response[0].estado;
          this.estado_texto = this.getestado(response[0].estado);

          if (response[0].estado == "F" || response[0].estado == "A") {

          }

          if (response[0].estado == "A") {
            //this.simular(this.escondebt);

            var s = document.getElementById("editarclickhidde");
            s.click();


          }


          this.carregaTESTEMUNHAS(id);
          this.carregaENTREVISTAS(id);
          this.carregaACCOES(id);
        }

      }, error => { console.log(error); });
  }

  carregaTESTEMUNHAS(id) {
    this.ATTESTEMUNHASService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.tabelaTestemunha.push({ id: response[x].id_TESTEMUNHA, nome: response[x].nome, numero: response[x].numero });
          }
          this.tabelaTestemunha = this.tabelaTestemunha.slice();
        }
      }, error => { console.log(error); });

  }

  carregaENTREVISTAS(id) {
    this.ATENTREVISTASService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.tabelaEntrevista.push({ id: response[x].id_ENTREVISTA, nome: response[x].nome, funcao: response[x].funcao });
          }
          this.tabelaEntrevista = this.tabelaEntrevista.slice();
        }
      }, error => { console.log(error); });

  }

  carregaACCOES(id) {
    this.ATACCOESService.getby(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {

          for (var x in response) {

            this.tabelaAccoes.push({
              id: response[x].id_ACCAO, accao: response[x].descricao_ACCAO, responsavel: response[x].responsavel,
              data_IMPLEMENTACAO: response[x].data_IMPLEMENTACAO/*, recurso: response[x].recursos*/
            });
          }
          this.tabelaAccoes = this.tabelaAccoes.slice();

        }
      }, error => { console.log(error); });

  }



  resetActive(event, step) {
    this.classstep = step;
  }

  adicionar_linha(tabela) {
    if (tabela == "tabelaTestemunha") {
      this.tabelaTestemunha.push({ id: null, nome: "", numero: "" });
      this.tabelaTestemunha = this.tabelaTestemunha.slice();
    } else if (tabela == "tabelaEntrevista") {
      this.tabelaEntrevista.push({ id: null, nome: "", funcao: "" });
      this.tabelaEntrevista = this.tabelaEntrevista.slice();
    } else if (tabela == "tabelaAccoes") {
      this.tabelaAccoes.push({ id: null, accao: "", responsavel: "", data_IMPLEMENTACAO: "", recurso: "" });
      this.tabelaAccoes = this.tabelaAccoes.slice();
    }

  }


  apagar_linha(tabela, index) {

    if (tabela == "tabelaTestemunha") {
      var tab = this.tabelaTestemunha[index];
      if (tab.id == null) {
        this.tabelaTestemunha = this.tabelaTestemunha.slice(0, index).concat(this.tabelaTestemunha.slice(index + 1));
      } else {
        this.ATTESTEMUNHASService.delete(tab.id).then(
          res => {
            this.tabelaTestemunha = this.tabelaTestemunha.slice(0, index).concat(this.tabelaTestemunha.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaEntrevista") {
      var tab = this.tabelaEntrevista[index];
      if (tab.id == null) {
        this.tabelaEntrevista = this.tabelaEntrevista.slice(0, index).concat(this.tabelaEntrevista.slice(index + 1));
      } else {
        this.ATENTREVISTASService.delete(tab.id).then(
          res => {
            this.tabelaEntrevista = this.tabelaEntrevista.slice(0, index).concat(this.tabelaEntrevista.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    } else if (tabela == "tabelaAccoes") {
      var tab = this.tabelaAccoes[index];
      if (tab.id == null) {
        this.tabelaAccoes = this.tabelaAccoes.slice(0, index).concat(this.tabelaAccoes.slice(index + 1));
      } else {
        this.ATACCOESService.delete(tab.id).then(
          res => {
            this.tabelaAccoes = this.tabelaAccoes.slice(0, index).concat(this.tabelaAccoes.slice(index + 1));
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    }
  }


  mascara(event, valor) {

    if (event.key == "/") {
      if (valor.replace("/", '') > 0 && valor.replace("/", '') <= 12) {
        return this.pad(valor, 2) + '/';
      } else {
        return '12/';
      }

      //return true;
    } else {
      if (valor.length == 2) {
        return this.pad(valor, 2) + '/';
      } else {
        //return valor;
      }
    }

  }

  keypress(event, valor) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 47) {
      return true;
    } else {
      return false
    }

  }
  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

  getestado(valor) {
    if (valor == "E") {
      return "Aberta"
    } else if (valor == "F") {
      return "Fechadda"
    } else if (valor == "A") {
      return "Anulada"
    }
  }

  gravar(estado = null) {
    var ocorrencia = new AT_OCORRENCIAS;

    ocorrencia.com_BAIXA = this.com_BAIXA;
    ocorrencia.analise_EFICACIA = this.analise_EFICACIA;
    ocorrencia.companhia = this.companhia;
    ocorrencia.danos_MATERIAS = this.danos_MATERIAS;
    ocorrencia.data_ACIDENTE = this.data_ACIDENTE;
    ocorrencia.departamento = this.departamento;
    ocorrencia.descricao_ACIDENTE = this.descricao_ACIDENTE;
    ocorrencia.descricao_CAUSAS = this.descricao_CAUSAS;
    ocorrencia.diagrama_BT_DIR = this.diagrama_BT_DIR;
    ocorrencia.diagrama_BT_ESQ = this.diagrama_BT_ESQ;
    ocorrencia.diagrama_DIR = this.diagrama_DIR;
    ocorrencia.diagrama_TOP_DIR = this.diagrama_TOP_DIR;
    ocorrencia.diagrama_TOP_ESQ = this.diagrama_TOP_ESQ;
    ocorrencia.eficaz = this.gettruefalse(this.eficaz);
    ocorrencia.funcao_PESSOA = this.funcao_PESSOA;
    ocorrencia.gerou_IP = this.gettruefalse(this.gerou_IP);
    ocorrencia.gerou_IT = this.gettruefalse(this.gerou_IT);
    ocorrencia.grau_LESAO = this.grau_LESAO;
    ocorrencia.hora_ACIDENTE = (this.hora_ACIDENTE != null) ? (this.hora_ACIDENTE + ':00').slice(0, 7) : null;
    ocorrencia.idade_PESSOA = this.idade_PESSOA;
    ocorrencia.local_ACIDENTE = this.local_ACIDENTE;
    ocorrencia.medidas_FORMACAO = this.medidas_FORMACAO;
    ocorrencia.medidas_ORGANIZACAO = this.medidas_ORGANIZACAO;
    ocorrencia.medidas_OUTRAS = this.medidas_OUTRAS;
    ocorrencia.medidas_PROTECAO_COL = this.medidas_PROTECAO_COL;
    ocorrencia.medidas_PROTECAO_IND = this.medidas_PROTECAO_IND;
    ocorrencia.n_APOLICE = this.n_APOLICE;
    //ocorrencia.nacionalidade = this.nacionalidade;
    ocorrencia.nome_PESSOA = (this.nome_PESSOA == null) ? null : this.nome_PESSOA.nome;
    ocorrencia.notificou_SEGURADORA = this.gettruefalse(this.notificou_SEGURADORA);
    ocorrencia.numero_PESSOA = this.numero_PESSOA;
    ocorrencia.numero_PESSOAS_ENVOLVIDAS = this.numero_PESSOAS_ENVOLVIDAS;
    ocorrencia.numero_TESTEMUNHAS = this.numero_TESTEMUNHAS;
    ocorrencia.numero_VITIMAS = this.numero_VITIMAS;
    ocorrencia.pa_ABDOMEN = this.pa_ABDOMEN;
    ocorrencia.pa_ANCA = this.pa_ANCA;
    ocorrencia.pa_ANTEBRACO = this.pa_ANTEBRACO;
    ocorrencia.pa_CABECA = this.pa_CABECA;
    ocorrencia.pa_COSTAS = this.pa_COSTAS;
    ocorrencia.pa_DEDOS_PE = this.pa_DEDOS_PE;
    ocorrencia.pa_JOELHO = this.pa_JOELHO;
    ocorrencia.pa_LOCALIZACOES_MULTIPLAS = this.pa_LOCALIZACOES_MULTIPLAS;
    ocorrencia.pa_MAO = this.pa_MAO;
    ocorrencia.pa_OLHOS = this.pa_OLHOS;
    ocorrencia.pa_OMBRO = this.pa_OMBRO;
    ocorrencia.pa_OUTRO = this.pa_OUTRO;
    ocorrencia.pa_OUTRO_TEXTO = this.pa_OUTRO_TEXTO;
    ocorrencia.pa_PE = this.pa_PE;
    ocorrencia.pa_PESCOCO = this.pa_PESCOCO;
    ocorrencia.pa_TORAX = this.pa_TORAX;

    ocorrencia.cl_CORTE = this.cl_CORTE;
    ocorrencia.cl_FERIDA = this.cl_FERIDA;
    ocorrencia.cl_CONTUSAO = this.cl_CONTUSAO;
    ocorrencia.cl_FRATURA = this.cl_FRATURA;
    ocorrencia.cl_HEMATOMA = this.cl_HEMATOMA;
    ocorrencia.cl_LESAO_MUSCULO_ESQUELETICA = this.cl_LESAO_MUSCULO_ESQUELETICA;
    ocorrencia.cl_INTOXICACAO_ENVENENAMENTO = this.cl_INTOXICACAO_ENVENENAMENTO;
    ocorrencia.cl_ENTORSE_LUXACAO = this.cl_ENTORSE_LUXACAO;
    ocorrencia.cl_LESAO_OCULAR = this.cl_LESAO_OCULAR;
    ocorrencia.cl_ESMAGAMENTO = this.cl_ESMAGAMENTO;
    ocorrencia.cl_PERFURACAO = this.cl_PERFURACAO;
    ocorrencia.cl_ENTATALAMENTO = this.cl_ENTATALAMENTO;
    ocorrencia.cl_AMPUTACAO = this.cl_AMPUTACAO;
    ocorrencia.cl_QUEIMADURA = this.cl_QUEIMADURA;
    ocorrencia.cl_OUTRO = this.cl_OUTRO;
    ocorrencia.cl_OUTRO_TEXTO = this.cl_OUTRO_TEXTO;
    ocorrencia.vinculo = this.vinculo;
    ocorrencia.dias_PERDIDOS = this.dias_PERDIDOS;

    ocorrencia.recolha_EVIDENCIAS = (this.recolha_EVIDENCIAS != null) ? this.recolha_EVIDENCIAS.toString() : null;
    ocorrencia.testemunhas = this.gettruefalse(this.testemunhas);
    ocorrencia.tipo_ACIDENTE = this.tipo_ACIDENTE;
    ocorrencia.tipo_RELATORIO = this.tipo_RELATORIO;
    ocorrencia.trabalhadores_SIMILARES = this.trabalhadores_SIMILARES;
    ocorrencia.estado = this.estado;

    ocorrencia.utz_MODIF = this.user;

    ocorrencia.data_MODIF = new Date();

    if (this.novo) {
      ocorrencia.utz_CRIA = this.user;
      ocorrencia.data_CRIA = new Date();
      ocorrencia.inativo = false;
      ocorrencia.estado = "E";
      this.ATOCORRENCIASService.create(ocorrencia).subscribe(
        res => {
          this.gravarTESTEMUNHAS(res.id_OCORRENCIA);
        },
        error => { console.log(error); this.simular(this.inputerro); });
    } else {
      ocorrencia.id_OCORRENCIA = this.id_OCORRENCIA;
      ocorrencia.utz_CRIA = this.utz_CRIA;
      ocorrencia.data_CRIA = this.data_CRIA;
      if (estado != null) ocorrencia.estado = estado;
      this.ATOCORRENCIASService.update(ocorrencia).then(
        res => {
          this.gravarTESTEMUNHAS(this.id_OCORRENCIA);
        },
        error => { console.log(error); this.simular(this.inputerro); });

    }
  }

  gettruefalse(valor) {
    /*if (valor == 0) {
      return false;
    } else if (valor == 1) {
      return true;
    } else if (valor == true || valor == false) {
      return valor;
    } else {
      return valor;
    }*/
    return valor;
  }

  gravarTESTEMUNHAS(id) {
    if (this.tabelaTestemunha.length > 0) {
      for (var x in this.tabelaTestemunha) {
        var testemunha = new AT_TESTEMUNHAS;
        testemunha.id_OCORRENCIA = id;
        testemunha.id_TESTEMUNHA = this.tabelaTestemunha[x].id;
        testemunha.nome = this.tabelaTestemunha[x].nome;
        testemunha.numero = this.tabelaTestemunha[x].numero;
        if (testemunha.nome != "" && testemunha.numero != "") this.gravarTESTEMUNHAS_save(testemunha, 0, 0);
      }

      this.gravarENTREVISTAS(id);
    } else {
      this.gravarENTREVISTAS(id);
    }
  }

  gravarTESTEMUNHAS_save(testemunha, total, count) {


    this.ATTESTEMUNHASService.update(testemunha).then(
      res => {

      },
      error => { console.log(error); });

  }

  gravarENTREVISTAS(id) {
    if (this.tabelaEntrevista.length > 0) {
      for (var x in this.tabelaEntrevista) {
        var entrevista = new AT_ENTREVISTAS;
        entrevista.id_ENTREVISTA = this.tabelaEntrevista[x].id;
        entrevista.id_OCORRENCIA = id;
        entrevista.nome = this.tabelaEntrevista[x].nome;
        entrevista.funcao = this.tabelaEntrevista[x].funcao;
        if (entrevista.nome != "") this.gravarENTREVISTAS_save(entrevista, 0, 0);
      }

      this.gravarEPIS(id);
    } else {
      this.gravarEPIS(id);
    }

  }

  gravarENTREVISTAS_save(entrevista, total, count) {

    this.ATENTREVISTASService.update(entrevista).then(
      res => {

      },
      error => { console.log(error); });
  }

  gravarEPIS(id) {
    if (!this.novo) {
      this.RHDICEPIService.deleteAT_OCORRENCIAS_EPI(id).then(
        res => {
        },
        error => { console.log(error); });
    }

    for (var x in this.epis) {
      if (this.epis[x].selected) this.gravarEPIS_save(this.epis[x].id, id);
    }
    this.gravarCAUSAS(id);
  }

  gravarEPIS_save(id_epi, id_OCORRENCIA) {
    this.RHDICEPIService.insertAT_OCORRENCIAS_EPI(id_OCORRENCIA, id_epi).subscribe(
      response => {
      }, error => { console.log(error); });
  }

  gravarCAUSAS(id) {
    if (!this.novo) {
      this.ATDICCAUSASACIDENTEService.deleteAT_OCORRENCIAS_CAUSAS_ACIDENTE(id).then(
        res => {
        },
        error => { console.log(error); });
    }

    for (var x in this.causas_acidente) {
      if (this.causas_acidente[x].selected) this.gravarCAUSAS_save(this.causas_acidente[x].id, id);
    }
    this.gravarACCOES(id);
  }

  gravarCAUSAS_save(id_causa, id_OCORRENCIA) {
    this.ATDICCAUSASACIDENTEService.insertAT_OCORRENCIAS_CAUSAS_ACIDENTE(id_OCORRENCIA, id_causa).subscribe(
      response => {
      }, error => { console.log(error); });
  }

  gravarACCOES(id) {

    if (this.tabelaAccoes.length > 0) {
      for (var x in this.tabelaAccoes) {
        var accao = new AT_ACCOES;
        accao.id_OCORRENCIA = id;
        accao.data_IMPLEMENTACAO = this.tabelaAccoes[x].data_IMPLEMENTACAO;
        accao.id_ACCAO = this.tabelaAccoes[x].id;
        accao.descricao_ACCAO = this.tabelaAccoes[x].accao;
        //accao.recursos = this.tabelaAccoes[x].recurso;
        accao.responsavel = this.tabelaAccoes[x].responsavel;

        if (accao.descricao_ACCAO != "") this.gravarACCOES_save(accao, 0, 0);
      }

      //terminar
      if (this.novo) {
        this.router.navigate(['seguranca_trabalho/editar'], { queryParams: { id: id } });
      } else {
        this.router.navigate(['seguranca_trabalho/view'], { queryParams: { id: id } });
      }
      this.simular(this.inputgravou);
    } else {
      //terminar
      if (this.novo) {
        this.router.navigate(['seguranca_trabalho/editar'], { queryParams: { id: id } });
      } else {
        this.router.navigate(['seguranca_trabalho/view'], { queryParams: { id: id } });
      }
      this.simular(this.inputgravou);
    }

  }

  gravarACCOES_save(accao, total, count) {

    this.ATACCOESService.update(accao).then(
      res => {

      },
      error => { console.log(error); });
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

        var ocorrencia = new AT_OCORRENCIAS;
        ocorrencia = this.dados_ocorrencia;
        ocorrencia.inativo = true;
        ocorrencia.utz_ANULACAO = this.user;
        ocorrencia.data_ANULACAO = new Date();
        ocorrencia.estado = "A";
        this.ATOCORRENCIASService.update(ocorrencia).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['seguranca_trabalho']);
        });
      }
    });
  }

  //popup apagar
  fechar(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Fechar Ocorrência”?',
      header: 'Confirmação',
      icon: 'fa fa-info',
      accept: () => {

        this.gravar("F");
      }
    });
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

  imprimir(relatorio, id) {
    this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
  }

  alteraNome(event) {
    this.nome_PESSOA = (this.funcionarios.find(item => item.value == event.value)) ? this.funcionarios.find(item => item.value == event.value) : null;
  }

  filterNome(event) {
    let filtered: any[] = [];

    for (let i = 0; i < this.funcionarios.length; i++) {
      let funcionario = this.funcionarios[i];
      if (funcionario.nome.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        filtered.push(funcionario);
      }
    }

    this.filteredNomesSingle = filtered;
  }
  filteronUnselect(event) {
    //this.numero_PESSOA = event.value;
    //this.nome_PESSOA = event.nome;
  }

  filterSelect(event) {
    this.numero_PESSOA = event.value;
  }


}
