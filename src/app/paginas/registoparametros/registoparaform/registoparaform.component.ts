import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { AD_MOV_REG_PARAM_OPERACAO } from "app/entidades/AD_MOV_REG_PARAM_OPERACAO";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { ConfirmationService } from "primeng/primeng";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { RelatoriosService } from "app/servicos/relatorios.service";
import { DomSanitizer } from "@angular/platform-browser";
import { EmailService } from "app/servicos/email.service";
import { EMAIL } from "app/entidades/EMAIL";
import { UploadService } from '../../../servicos/upload.service';

@Component({
  selector: 'app-registoparaform',
  templateUrl: './registoparaform.component.html',
  styleUrls: ['./registoparaform.component.css']
})
export class RegistoparaformComponent implements OnInit {
  nome: any;
  tipo_manutencao: string;
  numero_manutencao: string;
  fileURL = null;
  filename: string;
  disimprimir: boolean;
  id: any;
  linha: any;
  cor_linha: any;
  linhas: any[];
  reg_dados: any;
  id_manutencao: any;
  id_manutencao_cab: any;
  id_banho: any;
  banho: any = "";
  tina: any = "";
  cob_analise: string = "";
  capacidade: any = "";
  nome_validado: any = "";
  nome_criacao: any = "";
  data_validado: string = "";
  data_criacao: string = "";
  data_actual: Date = null;
  modoedicao: boolean;
  novo: boolean;
  user: any;
  decisao;
  param_incorreto;
  valor_otimo;
  efeito;
  causa;
  acao_corretiva;
  acao_preventiva;
  seguimento;
  obs;
  distribuicao;
  distribuicao_outros;
  validado = false;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;

  constructor(private UploadService: UploadService, private EmailService: EmailService, private sanitizer: DomSanitizer, private RelatoriosService: RelatoriosService, private ABDICLINHAService: ABDICLINHAService, private confirmationService: ConfirmationService, private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private globalVar: AppGlobals, private location: Location, private router: Router, private renderer: Renderer, private route: ActivatedRoute) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002duplicar"));
    this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node002imprimir");

    this.data_actual = new Date();
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var estado;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
          estado = params['estado'] || "";
        });

      if (estado == "Validado") {
        this.globalVar.setapagar(false);
        this.globalVar.seteditar(false);
      }

      this.carregadados(id);
    }

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {

        this.linhas = [];
        this.linhas.push({ label: 'Seleccione Linha', value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }
        //this.linha = this.linhas[0].value;
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.modoedicao = true;

        this.nome_validado = JSON.parse(localStorage.getItem('userapp'))["nome"];


      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formPara';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_criacao = this.formatDate(this.data_actual.toDateString()) + ', ' + this.data_actual.toLocaleTimeString();
        this.nome_criacao = JSON.parse(localStorage.getItem('userapp'))["nome"];

        var id;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['manu'] || 0;
          });
        if (id != null && id != "") {
          this.carregacab(id);
        } else {
          this.router.navigate(['registopara']);
        }


      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(false);
        this.modoedicao = false;
      }
    }
  }

  carregadados(id) {
    this.ADMOVREGPARAMOPERACAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            if (response[x][0].data_VALIDA != null) {
              this.data_validado = this.formatDate(response[x][0].data_VALIDA) + ', ' + new Date(response[x][0].data_VALIDA).toLocaleTimeString();
              this.nome_validado = response[x][2];
              this.validado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            }

            this.tipo_manutencao = response[x][3];
            this.numero_manutencao = response[x][4];
            this.reg_dados = response[x][0];
            this.nome_criacao = response[x][1];
            this.id = response[x][0].id_REG_PARAM_OPERA;
            this.data_criacao = this.formatDate(response[x][0].data_CRIA) + ', ' + new Date(response[x][0].data_CRIA).toLocaleTimeString();
            this.carregacab(response[x][0].id_MANUTENCAO_CAB);
            this.acao_corretiva = response[x][0].acao_CORRETIVA;
            this.acao_preventiva = response[x][0].acao_PREVENTIVA;
            this.causa = response[x][0].causa;
            this.decisao = response[x][0].decisao;
            this.efeito = response[x][0].efeito;
            this.distribuicao = response[x][0].distribuicao;
            this.distribuicao_outros = response[x][0].distribuicao_OUTROS;
            this.obs = response[x][0].obs;
            this.param_incorreto = response[x][0].param_INCORRETO;
            this.seguimento = response[x][0].seguimento;
            this.valor_otimo = response[x][0].valor_OTIMO;

          }

        }
      },
      error => console.log(error));
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

  carregacab(id) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var nome_analise = "";
            if (response[x][0].id_ANALISE != "" && response[x][0].id_ANALISE != null) nome_analise = response[x][0].id_ANALISE + ' - ' + response[x][1];
            this.banho = response[x][0].id_BANHO + ' - ' + response[x][4];
            this.id_banho = response[x][0].id_BANHO;
            this.tina = response[x][5];
            this.cob_analise = nome_analise;
            this.capacidade = response[x][2] + ' L';
            this.id_manutencao_cab = id;
            this.id_manutencao = response[x][0].id_MANUTENCAO;
            this.cor_linha = response[x][7].cor;
            this.linha = response[x][7].id_LINHA;
          }

        }
      },
      error => console.log(error));
  }

  gravar() {
    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
    if (this.novo) {
      MOV_REG_PARAM_OPERACAO.data_CRIA = this.data_actual;
      MOV_REG_PARAM_OPERACAO.utz_CRIA = this.user;
      MOV_REG_PARAM_OPERACAO.inativo = false;

      MOV_REG_PARAM_OPERACAO.obs = this.obs;
      MOV_REG_PARAM_OPERACAO.param_INCORRETO = this.param_incorreto;
      MOV_REG_PARAM_OPERACAO.seguimento = this.seguimento;
      MOV_REG_PARAM_OPERACAO.acao_CORRETIVA = this.acao_corretiva;
      MOV_REG_PARAM_OPERACAO.acao_PREVENTIVA = this.acao_preventiva;
      MOV_REG_PARAM_OPERACAO.causa = this.causa;
      MOV_REG_PARAM_OPERACAO.decisao = this.decisao;
      MOV_REG_PARAM_OPERACAO.efeito = this.efeito;
      MOV_REG_PARAM_OPERACAO.distribuicao = this.distribuicao;
      MOV_REG_PARAM_OPERACAO.distribuicao_OUTROS = this.distribuicao_outros;
      MOV_REG_PARAM_OPERACAO.id_MANUTENCAO_CAB = this.id_manutencao_cab;
      MOV_REG_PARAM_OPERACAO.valor_OTIMO = this.valor_otimo;


      this.ADMOVREGPARAMOPERACAOService.create(MOV_REG_PARAM_OPERACAO).subscribe(
        res => {
          this.simular(this.inputnotifi);
          this.router.navigate(['manutencao/view'], { queryParams: { id: this.id_manutencao } });
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });
    } else {
      MOV_REG_PARAM_OPERACAO = this.reg_dados;
      MOV_REG_PARAM_OPERACAO.obs = this.obs;
      MOV_REG_PARAM_OPERACAO.param_INCORRETO = this.param_incorreto;
      MOV_REG_PARAM_OPERACAO.seguimento = this.seguimento;
      MOV_REG_PARAM_OPERACAO.acao_CORRETIVA = this.acao_corretiva;
      MOV_REG_PARAM_OPERACAO.acao_PREVENTIVA = this.acao_preventiva;
      MOV_REG_PARAM_OPERACAO.causa = this.causa;
      MOV_REG_PARAM_OPERACAO.decisao = this.decisao;
      MOV_REG_PARAM_OPERACAO.efeito = this.efeito;
      MOV_REG_PARAM_OPERACAO.distribuicao = this.distribuicao;
      MOV_REG_PARAM_OPERACAO.distribuicao_OUTROS = this.distribuicao_outros;
      MOV_REG_PARAM_OPERACAO.id_MANUTENCAO_CAB = this.id_manutencao_cab;
      MOV_REG_PARAM_OPERACAO.valor_OTIMO = this.valor_otimo;

      this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
        this.router.navigate(['registopara/view'], { queryParams: { id: MOV_REG_PARAM_OPERACAO.id_REG_PARAM_OPERA } });
        this.simular(this.inputgravou);
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
    }
  }


  validar() {
    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
    MOV_REG_PARAM_OPERACAO = this.reg_dados;
    MOV_REG_PARAM_OPERACAO.data_VALIDA = this.data_actual;
    MOV_REG_PARAM_OPERACAO.utz_VALIDA = this.user;

    this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
      //enviaremail
      if (MOV_REG_PARAM_OPERACAO.decisao == "p") {
        var datavalida = this.formatDate(MOV_REG_PARAM_OPERACAO.data_VALIDA.toDateString()) + ', ' + MOV_REG_PARAM_OPERACAO.data_VALIDA.toLocaleTimeString();
        this.enviar_email(this.data_criacao, this.nome_criacao, this.nome,
          datavalida, MOV_REG_PARAM_OPERACAO.id_REG_PARAM_OPERA, this.cob_analise, this.banho, this.tina,
          this.linha, "Parar a Produção", this.numero_manutencao, this.tipo_manutencao);
      }
      this.router.navigate(['registopara/view'], { queryParams: { id: MOV_REG_PARAM_OPERACAO.id_REG_PARAM_OPERA, estado: "Validado" } });
      this.simular(this.inputgravou);
      this.carregadados(this.id);
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });
  }

  enviar_email(data_registo, utilizador, utilizador_valida, data_valida, numero_registo, codigo_analise, banho, tina, linha, decisao, numero_manutecao, tipo_manutecao) {
    this.filename = new Date().toLocaleString().replace(/\D/g, '');
    this.RelatoriosService.downloadPDF("pdf", this.filename, this.id, "registo_parametros").subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);

        var dados = "{data_registo::" + data_registo + "\n/utilizador::" + utilizador + "\n/utilizador_valida::" + utilizador_valida
          + "\n/data_valida::" + data_valida + "\n/numero_registo::" + numero_registo + "\n/codigo_analise::" + codigo_analise
          + "\n/banho::" + banho + "\n/tina::" + tina + "\n/linha::" + linha + "\n/decisao::" + decisao + "\n/numero_manutecao::" + numero_manutecao
          + "\n/tipo_manutecao::" + tipo_manutecao + "}";

        var data = [{ MODULO: 1, MOMENTO: "Ao Validar Registo", PAGINA: "Registos dos Parâmetros de Operação", FICHEIRO: this.filename, ESTADO: true, DADOS: dados }];
        
        //envia email depois com ficheiro
        this.UploadService.verficaEventos(data).subscribe(result => {

        }, error => {
          console.log(error);
        });

      }
    );
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
        var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
        MOV_REG_PARAM_OPERACAO = this.reg_dados;
        MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
        MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
        MOV_REG_PARAM_OPERACAO.inativo = true;

        this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
          this.router.navigate(['registopara']);
          this.simular(this.inputapagar);
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });
      }
    });
  }

  imprimir(relatorio, id) {

    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
    MOV_REG_PARAM_OPERACAO = this.reg_dados;
    MOV_REG_PARAM_OPERACAO.data_ULT_IMPRES = new Date();
    MOV_REG_PARAM_OPERACAO.utz_ULT_IMPRES = this.user;
    MOV_REG_PARAM_OPERACAO.impresso = true;
    this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
      this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });

  }

}
