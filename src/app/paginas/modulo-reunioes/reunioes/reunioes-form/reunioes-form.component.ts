import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { REU_REUNIOES } from 'app/entidades/REU_REUNIOES';
import { GERGRUPOService } from 'app/servicos/ger-grupo.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { REUAMBITOSREUNIOESPARTICIPANTESService } from 'app/servicos/reu-ambitos-reunioes-participantes.service';
import { REUAMBITOSREUNIOESService } from 'app/servicos/reu-ambitos-reunioes.service';
import { REUREUNIOESFICHEIROSService } from 'app/servicos/reu-reunioes-ficheiros.service';
import { REUREUNIOESPARTICIPANTESService } from 'app/servicos/reu-reunioes-participantes.service';
import { REUREUNIOESService } from 'app/servicos/reu-reunioes.service';
import { UploadService } from 'app/servicos/upload.service';
import { webUrl } from 'assets/config/webUrl';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { REU_REUNIOES_PARTICIPANTES } from 'app/entidades/REU_REUNIOES_PARTICIPANTES';
import { REU_REUNIOES_FICHEIROS } from 'app/entidades/REU_REUNIOES_FICHEIROS';
import * as FileSaver from 'file-saver';
import { RCDICACCOESRECLAMACAOService } from 'app/servicos/rc-dic-accoes-reclamacao.service';
import { GT_DIC_TAREFAS } from 'app/entidades/GT_DIC_TAREFAS';
import { REUREUNIOESPLANOSACCOESService } from 'app/servicos/reu-reunioes-planos-accoes.service';
import { REU_REUNIOES_PLANOS_ACCOES } from 'app/entidades/REU_REUNIOES_PLANOS_ACCOES';
import { GT_LOGS } from 'app/entidades/GT_LOGS';
import { GT_MOV_TAREFAS } from 'app/entidades/GT_MOV_TAREFAS';
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';
import { GTDICTIPOACAOService } from 'app/servicos/gt-dic-tipo-acao.service';

@Component({
  selector: 'app-reunioes-form',
  templateUrl: './reunioes-form.component.html',
  styleUrls: ['./reunioes-form.component.css']
})
export class ReunioesFormComponent implements OnInit {

  btcriar: boolean;
  btapagar: boolean;
  btvoltar: boolean;
  bteditar: boolean;
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  disEditar: boolean;
  disApagar: boolean;
  disCriar: boolean;
  modoedicao: boolean;
  data_CRIA: Date;
  hora_CRIA: string;
  utz_CRIA: any;
  tabelagrupos: any[] = [];
  uploadedFiles: any[] = [];

  tabelaParticipantes: any = [];
  displaygrupos: boolean;


  @ViewChild('fileInput') fileInput: FileUpload;
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
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  reuniao_dados: any;
  id_REUNIAO: any;
  descricao: any;


  drop_Participantes = [];
  assunto: string;
  local: number;
  ambito: any;
  duracao: string;
  campo_x: any;
  filedescricao: any[] = [];
  srcelement: any;
  display: boolean;
  type: string;
  nomeficheiro: any;
  locais = [{ label: "Selecionar Local", value: null }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }, { value: 3, label: "Todas" }];
  ambitos: any[];
  data_REUNIAO;
  hora_REUNIAO;
  responsavel: any;
  classstep = "step1";
  tabelaaccoes_concluidas = [];
  tabelaaccoes = [];
  drop_accoes: any[];
  drop_utilizadores_acoes: any;
  drop_utilizadores2: any[];
  id_selected: number;
  descricaoeng: string;
  descricaopt: string;
  descricaofr: string;
  displayAddAccao: boolean;
  acessoadicionarACCAO = false;
  tipos_acao: any[];
  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private renderer: Renderer,
    private RCDICACCOESRECLAMACAOService: RCDICACCOESRECLAMACAOService,
    private REUREUNIOESPLANOSACCOESService: REUREUNIOESPLANOSACCOESService,
    private GTMOVTAREFASService: GTMOVTAREFASService,
    private GTDICTIPOACAOService: GTDICTIPOACAOService,
    private route: ActivatedRoute, private location: Location, private REUAMBITOSREUNIOESPARTICIPANTESService: REUAMBITOSREUNIOESPARTICIPANTESService,
    private GERGRUPOService: GERGRUPOService, private REUAMBITOSREUNIOESService: REUAMBITOSREUNIOESService, private REUREUNIOESService: REUREUNIOESService,
    private REUREUNIOESPARTICIPANTESService: REUREUNIOESPARTICIPANTESService, private REUREUNIOESFICHEIROSService: REUREUNIOESFICHEIROSService,
    private sanitizer: DomSanitizer, private router: Router, private UploadService: UploadService) { }

  ngOnInit() {

    this.btcriar = true;
    this.btapagar = true;
    this.btvoltar = true;
    this.bteditar = false;

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");


    this.acessoadicionarACCAO = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16211dicionarACCAO");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });



      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16211editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16211criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node16211apagar");

    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {

        this.btapagar = true;
        this.btcriar = true;
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {

        this.btapagar = false
        this.btcriar = true;
        this.novo = true;
        this.bteditar = false;
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_CRIA = new Date();
        this.hora_CRIA = new Date().toLocaleTimeString().slice(0, 5);
        this.utz_CRIA = this.user;
        this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {
        this.btcriar = true;
      }
    }

    this.listar_tipos_accao();
    this.carregaaccoes();
    this.carregaUtilizadores_acoes();
    if (!this.novo) { this.carregaDados(true, id); }
    this.carregaGrupos();
    this.carregaAmbitos();

  }

  carregaDados(inicia, id) {
    this.drop_Participantes = [];
    this.GERUTILIZADORESService.getAllOrder().subscribe(
      response => {
        this.drop_Participantes.push({ label: "Selecionar Utilizador", value: "" });
        for (var x in response) {
          this.drop_Participantes.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
        }

        this.drop_Participantes = this.drop_Participantes.slice();
        if (inicia) this.inicia(id);
      },
      error => { console.log(error); if (inicia) this.inicia(id); });
  }


  carregaAmbitos() {
    this.ambitos = [];
    this.REUAMBITOSREUNIOESService.getAll().subscribe(
      response => {
        this.ambitos.push({ label: "Selecionar Âmbito", value: "" });
        for (var x in response) {
          this.ambitos.push({ label: response[x].descricao, value: response[x].id_AMBITO });
        }
        this.ambitos = this.ambitos.slice();
      },
      error => { console.log(error); });
  }


  //listar tipos accao
  listar_tipos_accao() {
    this.tipos_acao = [];
    this.GTDICTIPOACAOService.getAll().subscribe(
      response => {
        this.tipos_acao.push({ value: "", label: "---" })
        for (var x in response) {
          this.tipos_acao.push({ value: response[x].id_TIPO_ACAO, label: response[x].descricao });
        }
        this.tipos_acao = this.tipos_acao.slice();
      },
      error => console.log(error));
  }


  inicia(id) {

    this.REUREUNIOESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {

          //this.adminuser
          if (response[0].utz_CRIA == this.user || this.adminuser) {
            this.bteditar = true;
          } else {
            this.bteditar = false;
            this.modoedicao = false;
          }

          this.reuniao_dados = response[0];

          this.id_REUNIAO = response[0].id_REUNIAO;
          this.descricao = response[0].descricao;
          this.assunto = response[0].assunto;

          this.local = response[0].local;
          this.ambito = response[0].id_AMBITO;
          this.responsavel = response[0].responsavel;
          this.duracao = (response[0].duracao == null) ? null : response[0].duracao.slice(0, 5);

          this.utz_CRIA = response[0].utz_CRIA;
          this.data_CRIA = (response[0].data_CRIA == null) ? null : new Date(response[0].data_CRIA);

          this.hora_REUNIAO = (response[0].hora_REUNIAO == null) ? null : response[0].hora_REUNIAO.slice(0, 5);
          this.data_REUNIAO = (response[0].data_REUNIAO == null) ? null : new Date(response[0].data_REUNIAO);

          this.carregatabelaParticipantes(id);
          this.carregatabelaFiles(id);
          this.carregatabelasaccoes(id);
        }

      }, error => { console.log(error); })

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
    var reuniao = new REU_REUNIOES;

    if (!this.novo) reuniao = this.reuniao_dados;


    reuniao.descricao = this.descricao;

    reuniao.assunto = this.assunto;
    reuniao.id_AMBITO = this.ambito;
    reuniao.duracao = this.duracao;
    reuniao.local = this.local;
    reuniao.responsavel = this.responsavel;


    reuniao.hora_REUNIAO = this.hora_REUNIAO;
    reuniao.data_REUNIAO = this.data_REUNIAO;

    reuniao.utz_MODIF = this.user;
    reuniao.data_MODIF = new Date();

    if (this.novo) {
      reuniao.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
      reuniao.utz_CRIA = this.utz_CRIA;
      reuniao.inativo = false;

      this.REUREUNIOESService.create(reuniao).subscribe(
        res => {
          this.gravarTabelaFicheiros(res.id_REUNIAO);
          this.gravarTabelaParticipantes(res.id_REUNIAO);
          this.gravarTabelaAccoes(res.id_REUNIAO);


          var email_para = [];
          for (var x in this.tabelaParticipantes) {

            if (this.tabelaParticipantes[x].utilizador != null && this.tabelaParticipantes[x].utilizador != "") {

              if (this.tabelaParticipantes[x].id == null && this.tabelaParticipantes[x].email != "" && this.tabelaParticipantes[x].email != null && (email_para.indexOf(this.tabelaParticipantes[x].email) < 0))
                email_para.push(this.tabelaParticipantes[x].email);
            }
          }
          var ambito = '';
          if (this.ambitos.find(item => item.value == reuniao.id_AMBITO)) {
            ambito = this.ambitos.find(item => item.value == reuniao.id_AMBITO).label;
          }

          this.enviarEventoResponsaveis(reuniao.assunto, reuniao.descricao, res.id_REUNIAO, ambito, "Ao Criar Ficha de Reunião", email_para.toString(), reuniao.data_REUNIAO)

        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      reuniao.id_REUNIAO = id;
      //console.log(reclamacao)
      this.REUREUNIOESService.update(reuniao).subscribe(
        res => {

          this.gravarTabelaParticipantes(id);
          this.gravarTabelaAccoes(id);
          //this.router.navigate(['reunioes/view'], { queryParams: { id: id } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    }
  }


  gravarTabelaParticipantes(id) {
    if (this.tabelaParticipantes && this.tabelaParticipantes.length > 0) {

      var count = 0;
      var email_para = [];
      for (var x in this.tabelaParticipantes) {

        var equipa = new REU_REUNIOES_PARTICIPANTES;
        if (this.tabelaParticipantes[x].id != null) {
          equipa = this.tabelaParticipantes[x].data;
        }

        equipa.id_UTILIZADOR = this.tabelaParticipantes[x].utilizador;
        equipa.email = this.tabelaParticipantes[x].email;
        equipa.presente = this.tabelaParticipantes[x].presente;
        equipa.id_REUNIAO = id;


        count++;
        if (this.tabelaParticipantes[x].utilizador != null && this.tabelaParticipantes[x].utilizador != "") {
          this.gravarTabelaParticipantes2(equipa, count, this.tabelaParticipantes.length, id);
        } else if (count == this.tabelaParticipantes.length) {
          if (this.novo) {
            // this.router.navigate(['reunioes/editar'], { queryParams: { id: id } });
            // this.simular(this.inputnotifi);
          } else {
            // this.router.navigate(['reunioes/view'], { queryParams: { id: id } });
            // this.simular(this.inputnotifi);
          }
        }
      }

    } else {
      if (this.novo) {
        // this.router.navigate(['reunioes/editar'], { queryParams: { id: id } });
        // this.simular(this.inputnotifi);
      } else {
        //this.router.navigate(['reunioes/view'], { queryParams: { id: id } });
        //this.simular(this.inputnotifi);
      }
    }
  }

  gravarTabelaParticipantes2(equipa, count, total, id) {
    this.REUREUNIOESPARTICIPANTESService.update(equipa).then(
      res => {
        if (count == total) {
          if (this.novo) {
            //this.router.navigate(['reunioes/editar'], { queryParams: { id: id } });
            // this.simular(this.inputnotifi);
          } else {
            //this.router.navigate(['reunioes/view'], { queryParams: { id: id } });
            //this.simular(this.inputnotifi);
          }
        }
      },
      error => { console.log(error); if (count == total) { } });
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
        var reuniao = new REU_REUNIOES;

        reuniao = this.reuniao_dados;

        reuniao.utz_ANULA = this.user;
        reuniao.data_ANULA = new Date();
        reuniao.inativo = true;


        this.REUREUNIOESService.update(reuniao).subscribe(
          res => {

            this.router.navigate(['reunioes']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }



  btgravar() {

  }


  novareuniao() {
    this.router.navigate(['reunioes/novo']);
  }

  backClicked() {
    //this.location.back();
    var back;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (back != 0 && back != 'back') {
      back = back.replace("kvk", "?");
      if (back.indexOf("?") > 0) {
        this.router.navigateByUrl(back);
      } else {
        this.router.navigate([back], { queryParams: { redirect: 1 } });
      }


    } else {
      this.router.navigate(['reunioes']);
    }

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
        this.router.navigate(['reunioes/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['reunioes/editar'], { queryParams: { id: page } });
      }

    }
  }

  carregaGrupos() {
    this.GERGRUPOService.getAll().subscribe(
      response => {
        this.tabelagrupos = [];
        for (var x in response) {
          this.tabelagrupos.push({ label: response[x].descricao, value: response[x].id })
        }

      },
      error => { console.log(error); });
  }



  /* Participantes */
  carregatabelaParticipantes(id) {
    this.tabelaParticipantes = [];

    this.REUREUNIOESPARTICIPANTESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        var grupo = []
        if (count > 0) {
          for (var x in response) {
            var id2 = null;

            this.tabelaParticipantes.push({
              data: response[x],
              id: response[x].id, utilizador: response[x].id_UTILIZADOR, email: response[x].email, presente: response[x].presente
            });

          }



          this.tabelaParticipantes = this.tabelaParticipantes.slice();
        }

      }, error => { console.log(error); });
  }


  carregatabelaParticipantesNOVO(id) {
    this.tabelaParticipantes = [];

    this.REUAMBITOSREUNIOESPARTICIPANTESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        var grupo = []
        if (count > 0) {
          for (var x in response) {
            var id2 = null;

            this.tabelaParticipantes.push({
              id: null, utilizador: response[x].id_UTILIZADOR, email: response[x].email, presente: false
            });

          }
          this.tabelaParticipantes = this.tabelaParticipantes.slice();
        }

      }, error => { console.log(error); });
  }

  adicionar_tabelaParticipantes() {
    this.tabelaParticipantes.push({ id: null, utilizador: null, email: '', presente: false });
    this.tabelaParticipantes = this.tabelaParticipantes.slice();
  }


  apagar_tabelaParticipantes(index) {

    var tab = this.tabelaParticipantes[index];
    if (tab.id == null) {
      this.tabelaParticipantes = this.tabelaParticipantes.slice(0, index).concat(this.tabelaParticipantes.slice(index + 1));
    } else {
      this.REUREUNIOESPARTICIPANTESService.delete(tab.id).then(
        res => {
          this.tabelaParticipantes = this.tabelaParticipantes.slice(0, index).concat(this.tabelaParticipantes.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }



  //adicionar utilizadores à tabela Participantes
  escolhergrupo(car) {

    this.GERGRUPOService.getByidUsers(car.value).subscribe(
      response => {
        //console.log(response)

        for (var x in response) {
          if (!this.tabelaParticipantes.find(item => item.utilizador == response[x][0])) {
            this.tabelaParticipantes.push({
              data: response[x],
              id: null, utilizador: response[x][0], email: response[x][3], presente: false

            });

            var utz2 = this.drop_Participantes.find(item => item.label == "Utilizadores");
            if (utz2) {

            } else {
              this.drop_Participantes.unshift({ label: "Utilizadores", itens: [] })
            }
            var utz3 = this.drop_Participantes.find(item => item.label == "Utilizadores");
            utz3.itens.push({
              label: response[x][2], value: response[x][0],
              email: response[x][3], area: response[x][15], telefone: response[x][14]
            });

          }
        }

        this.tabelaParticipantes = this.tabelaParticipantes.slice();
        this.displaygrupos = false;
      },
      error => {
        console.log(error);

      });
  }



  enviarEventoResponsaveis(assunto, descricao, numero_reuniao, ambito, MOMENTO, email_para, data_REUNIAO) {
    if (descricao == null) {
      descricao = "";
    }
    if (assunto == null) {
      assunto = "";
    }
    var dados = "{ link::" + webUrl.host + '/#/reunioes/view?id=' + numero_reuniao
      + "\n/numero_reuniao::" + numero_reuniao
      + "\n/descricao::" + descricao
      + "\n/assunto::" + assunto
      + "\n/data_reuniao::" + new Date(data_REUNIAO).toLocaleDateString()
      + "\n/ambito::" + ambito + "}";


    var data = [{ MODULO: 19, MOMENTO: MOMENTO, PAGINA: "Ficha de Reunião", ESTADO: true, DADOS: dados, EMAIL_PARA: email_para }];

    this.UploadService.verficaEventos(data).subscribe(result => {
    }, error => {
      console.log(error);
    });
  }
  /****** */


  //Ao alterar combobos participante na equipa atualiza email
  alterarEmail(index, event) {
    this.tabelaParticipantes[index].email = this.drop_Participantes.find(item => item.value == event.value).email;
  }


  getParticipante(id) {
    if (id != null) var utz = this.drop_Participantes.find(item => item.value == id);
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  /***FICCHEIROS */

  showDialog(type, srcelement, nomeficheiro, datatype, ficheiro) {
    this.srcelement = "";
    if (type == "pdf" || type == 'txt') {
      if (ficheiro == null) {

        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcelement);
      } else {
        /*var blob = new Blob([ficheiro], { type: datatype });
        var blobUrl = URL.createObjectURL(blob);*/
        this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
      }
    }
    if (ficheiro == null) {
      this.srcelement = webUrl.link + srcelement;
    } else {
      this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(ficheiro);
    }
    if (type == "excel" || type == "word") {
      this.download(nomeficheiro, srcelement, datatype, ficheiro)
    } else if (type == "msg") {
      this.downloadTXT(nomeficheiro, srcelement, ficheiro)
    }
    else {
      this.nomeficheiro = nomeficheiro;
      this.type = type;
      this.display = true;
    }

  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(index);
  }

  download(nome, filename, datatype, ficheiro) {
    if (ficheiro == null) {
      this.UploadService.download("report", filename, datatype).subscribe(
        (res) => {
          /*var fileURL: any = URL.createObjectURL(res);
          fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          var myWindow = window.open(fileURL, "", "width=200,height=100");*/
          // myWindow.close();
          FileSaver.saveAs(res, nome);
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {

      const downloadLink = document.createElement("a");

      downloadLink.href = ficheiro;
      downloadLink.download = nome;
      downloadLink.click();
    }
  }

  downloadTXT(nomeficheiro, filename, ficheiro) {
    if (ficheiro == null) {
      this.UploadService.downloadTXT(filename).subscribe(
        (res) => {
          var fileURL = URL.createObjectURL(res);
          this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          this.nomeficheiro = nomeficheiro;
          this.type = 'txt';
          this.display = true;
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        });
    } else {
      this.UploadService.downloadFileMSGBASE64(filename, ficheiro).subscribe(
        (res) => {
          var fileURL = URL.createObjectURL(res);
          this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          this.nomeficheiro = nomeficheiro;
          this.type = 'txt';
          this.display = true;
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        });
    }
  }

  removerficheiro(index) {
    var tab = this.uploadedFiles[index];
    if (tab.id == null) {
      this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
    } else {
      this.REUREUNIOESFICHEIROSService.delete(tab.id).then(
        res => {
          this.uploadedFiles = this.uploadedFiles.slice(0, index).concat(this.uploadedFiles.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }

  }



  onUpload(event) {
    //let files: FileList = event.files;
    this.fileInput.progress = 0;
    this.campo_x = 0;
    var x = 0;
    for (let file of event.files) {

      this.fileInput.progress = ((this.campo_x + 1) / event.files.length) * 100;
      // const index = files.indexOf(files[x]);
      var type = "img";
      var str = file.type;
      var tipo = file.name.split(".");

      if (str.toLowerCase().indexOf("pdf") >= 0) {
        type = "pdf";
      } else if (str.toLowerCase().indexOf("audio") >= 0) {
        type = "audio";
      } else if (str.toLowerCase().indexOf("video") >= 0) {
        type = "video";
      } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
        type = "excel";
      } else if (str.toLowerCase().indexOf("word") >= 0) {
        type = "word";
      } else if (str.toLowerCase().indexOf("text") >= 0) {
        type = "txt";
      } else if (tipo[1] == "msg") {
        type = "msg";
      }
      var nome = this.formatDate() + x;

      this.filetoBASE64(file, nome, event, type, x)



      //  this.fileupoad(file, nome, event, type, x, ficheiro);
      x++;
    }

  }
  filetoBASE64(file, nome, event, type, x) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (event2: Event) => {
      // you can perform an action with readed data here
      this.fileupoad(file, nome, event, type, x, myReader.result);
    }

    myReader.readAsDataURL(file);
  }


  fileupoad(file, nome, event, type, x, ficheiro) {

    var tipo = file.name.split(".");
    var data = new Date();

    if (!this.novo) {
      var ficheiros = new REU_REUNIOES_FICHEIROS;
      ficheiros.data_CRIA = data;
      ficheiros.utz_CRIA = this.user;
      ficheiros.id_REUNIAO = this.id_REUNIAO;
      ficheiros.caminho = nome + '.' + tipo[1];
      ficheiros.nome = file.name;
      ficheiros.tipo = type;
      ficheiros.datatype = file.type;
      ficheiros.tamanho = file.size;
      ficheiros.descricao = this.filedescricao[x];
      ficheiros.ficheiro_1 = ficheiro.substr(ficheiro, ficheiro.length / 2);
      ficheiros.ficheiro_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
      ficheiros.data_MODIF = new Date();
      ficheiros.utz_MODIF = this.user;

      this.gravarTabelaFicheiros2(ficheiros, 0, 0, 0);

    } else {
      this.uploadedFiles.push({
        data_CRIA: data, ficheiro: ficheiro,
        id_TAREFA: null, responsavel: null, utilizador: this.user_nome, datacria: this.formatDate2(data) + " " + new Date(data).toLocaleTimeString(), id_FICHEIRO: null,
        id: null, name: file.name, datatype: file.type, src: nome + '.' + tipo[1], type: type, size: file.size, descricao: this.filedescricao[x]
      });
    }

    this.uploadedFiles = this.uploadedFiles.slice();
    if (this.campo_x + 1 == event.files.length) {
      this.fileInput.files = [];
      this.filedescricao = [];
      this.fileInput.progress = 0;
    }
    this.campo_x++;

  }



  gravarTabelaFicheiros2(ficheiros, count, total, id) {
    this.REUREUNIOESFICHEIROSService.update(ficheiros).subscribe(
      res => {

        this.uploadedFiles.push({
          data_CRIA: ficheiros.data_CRIA, ficheiro: ficheiros.ficheiro_1 + ficheiros.ficheiro_2,
          utilizador: this.user_nome, datacria: this.formatDate2(ficheiros.data_CRIA) + " " + new Date(ficheiros.data_CRIA).toLocaleTimeString(),
          id: res.id, name: ficheiros.nome, datatype: ficheiros.datatype, src: ficheiros.caminho, type: ficheiros.tipo, size: ficheiros.tamanho, descricao: ficheiros.descricao
        });
        this.uploadedFiles = this.uploadedFiles.slice();

      },
      error => { console.log(error); });
  }

  gravarTabelaFicheiros(id) {
    if (this.novo && this.uploadedFiles && this.uploadedFiles.length > 0) {
      var count = 0;
      for (var x in this.uploadedFiles) {
        var ficheiros = new REU_REUNIOES_FICHEIROS;
        var novo = false;
        if (this.uploadedFiles[x].id != null) {
          ficheiros = this.uploadedFiles[x].data;
        } else {
          ficheiros.data_CRIA = this.uploadedFiles[x].data_CRIA;
          ficheiros.utz_CRIA = this.user;
          novo = true;
        }
        ficheiros.id_REUNIAO = id;
        if (!this.novo) ficheiros.id = this.uploadedFiles[x].id;
        ficheiros.caminho = this.uploadedFiles[x].src;
        ficheiros.nome = this.uploadedFiles[x].name;
        ficheiros.tipo = this.uploadedFiles[x].type;
        ficheiros.datatype = this.uploadedFiles[x].datatype;
        ficheiros.tamanho = this.uploadedFiles[x].size;
        ficheiros.descricao = this.uploadedFiles[x].descricao;
        ficheiros.ficheiro_1 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro, this.uploadedFiles[x].ficheiro.length / 2);
        ficheiros.ficheiro_2 = this.uploadedFiles[x].ficheiro.substr(this.uploadedFiles[x].ficheiro.length / 2, this.uploadedFiles[x].ficheiro.length);

        ficheiros.data_MODIF = new Date();
        ficheiros.utz_MODIF = this.user;

        count++;
        if (novo) {
          this.gravarTabelaFicheiros2(ficheiros, count, this.uploadedFiles.length, id);
        }

        if (count == this.uploadedFiles.length) {
          if (this.novo) {

          }
        }

      }
    }

  }

  carregatabelaFiles(id) {
    this.uploadedFiles = [];

    this.REUREUNIOESFICHEIROSService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {

            var id2 = null;
            var data_at = new Date();
            var datacria = this.formatDate2(response[x][0].data_CRIA) + " " + new Date(response[x][0].data_CRIA).toLocaleTimeString();

            id2 = response[x][0].id;

            if (response[x][0].id != null) id2 = "f110" + response[x][0].id;
            this.uploadedFiles.push({
              data_CRIA: data_at, ficheiro: response[x][0].ficheiro_1 + response[x][0].ficheiro_2,
              data: response[x], utilizador: response[x][1].nome_UTILIZADOR,
              datacria: datacria, responsavel: response[x][2],
              id: id2, name: response[x][0].nome, id_FICHEIRO: response[x][0].id,
              src: response[x][0].caminho, type: response[x][0].tipo, datatype: response[x][0].datatype,
              size: response[x][0].tamanho, descricao: response[x][0].descricao
            });


          }
          this.uploadedFiles = this.uploadedFiles.slice();
        }

      }, error => { console.log(error); });

  }

  isImage(file: File) {
    return /^image\//.test(file.type);
  }

  fileImage(file: File) {
    var str = file.type;
    if (str.toLowerCase().indexOf("pdf") >= 0) {
      return "assets/img/file-pdf.png";
    } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
      return "assets/img/file-excel.png";
    } else if (str.toLowerCase().indexOf("word") >= 0) {
      return "assets/img/file-word.png";
    } else {
      return "assets/img/file.png";
    }
  }


  /**** */

  atualiza_participantes(event) {
    if (event.value != null && event.value != '') {
      this.carregatabelaParticipantesNOVO(event.value)
    } else {
      this.tabelaParticipantes = [];
    }
  }

  resetActive(event, step) {
    this.classstep = step;
  }

  /****ACCOES */

  adicionar_linha(tabela) {
    if (tabela == "tabelaaccoes") {

      this.tabelaaccoes.push({
        id_REUNIAO: null,
        obriga_EVIDENCIAS: false,
        area: "", id: null, concluido_UTZ: null, descricao: "", id_ACCOES: null, observacoes: "", estado: "P", id_TAREFA: null,
        nome_estado: "Pendente", responsavel: null, data_REAL: "", data_PREVISTA: null, item: null, tipo_ACAO: null
      });
      this.tabelaaccoes = this.tabelaaccoes.slice();
    }


  }

  apagar_linha(tabela, index) {

    if (tabela == "tabelaaccoes") {
      var tab = this.tabelaaccoes[index];
      if (tab.id == null) {
        this.tabelaaccoes = this.tabelaaccoes.slice(0, index).concat(this.tabelaaccoes.slice(index + 1));
        //this.atualiza_ordem(tabela);
      } else {

        var accoes1 = new REU_REUNIOES_PLANOS_ACCOES;
        accoes1 = this.tabelaaccoes[index].data;
        this.tabelaaccoes[index].estado = 'A';
        this.tabelaaccoes[index].nome_estado = this.geEstado('A');
        accoes1.estado = 'A';
        accoes1.data_ULT_MODIF = new Date();
        accoes1.utz_ULT_MODIF = this.user;
        this.gravarTabelaAccoes2(accoes1, 1, 2, 0, false, index, true);
      }
    }
  }



  finalizar_linha(tabela, index) {

    if (tabela == "tabelaaccoes") {
      var accoes = new REU_REUNIOES_PLANOS_ACCOES;

      accoes = this.tabelaaccoes[index].data;

      if (this.tabelaaccoes[index].data_REAL == null || this.tabelaaccoes[index].data_REAL == "") {
        this.tabelaaccoes[index].data_REAL = new Date();
      }
      accoes.data_REAL = this.tabelaaccoes[index].data_REAL;
      accoes.concluido_DATA = new Date();
      accoes.concluido_UTZ = this.user;
      accoes.estado = 'C';

      this.tabelaaccoes[index].estado = 'C';
      this.tabelaaccoes[index].nome_estado = this.geEstado('C');

      this.gravarTabelaAccoes2(accoes, 1, 2, 0, true, index, true);

    }
  }

  gravarTabelaAccoes2(accoes, count, total, id, finaliza = false, index = 0, atualizatarefa = false) {
    this.REUREUNIOESPLANOSACCOESService.update(accoes).subscribe(
      res => {
        if (atualizatarefa) {
          this.atualizaestadoTarefa(res.id_TAREFA, res.estado);
        } else {
          this.criarTarefas(res.id, 19);
        }


        if (finaliza) this.tabelaaccoes[index].concluido_UTZ = this.user;
      },
      error => { console.log(error); });
  }

  atualizaestadoTarefa(id, estado) {
    if (id != null) {
      this.GTMOVTAREFASService.getbyid(id).subscribe(response => {

        var count = Object.keys(response).length;
        if (count > 0) {
          var tarefa = new GT_MOV_TAREFAS;
          tarefa = response[0]

          var data_logs = [];


          if (tarefa.estado != estado) {
            data_logs.push({ descricao: "Alterado Estado de " + this.geEstado(tarefa.utz_ENCAMINHADO) + " para " + this.geEstado(estado) })
          }

          tarefa.estado = estado;
          if (estado == "C") {
            tarefa.utz_CONCLUSAO = this.user;
            tarefa.data_CONCLUSAO = new Date();
          } else if (estado == "A") {
            tarefa.utz_ANULACAO = this.user;
            tarefa.data_ANULACAO = new Date();
          }


          this.GTMOVTAREFASService.update(tarefa).subscribe(response => {
            for (var x in data_logs) {
              var logs = new GT_LOGS;
              logs.id_TAREFA = id;
              logs.utz_CRIA = this.user;
              logs.data_CRIA = new Date();
              logs.descricao = data_logs[x].descricao;
              this.criaLogs(logs);
              this.atualizaSUBTAREFAS(id, estado, this.user);
            }


          }, error => {
            console.log(error);

          });
        }
      }, error => {
        console.log(error);
        this.simular(this.inputerro);
      });
    }
  }

  atualizaSUBTAREFAS(id, estado, utilizador) {
    this.GTMOVTAREFASService.getAtualizaSubtarefas(id, estado, utilizador).subscribe(response => {
    }, error => {
      console.log(error);
    });
  }


  criaLogs(log) {
    this.GTMOVTAREFASService.createLOGS(log).subscribe(response => {
    }, error => {
      console.log(error);

    });
  }

  IrPara(id, responsavel) {

    var id_r = null;
    if (responsavel.toString().charAt(0) == 'u') {
      id_r = responsavel.substr(1);
    }

    var modo = 'view';
    if (this.modoedicao) modo = 'editar';
    //if (this.adminuser || this.user == this.utz_CRIA || id_r == this.user) {
    this.router.navigateByUrl('tarefas/view?id=' + id + "&redirect=reunioes/" + modo + "kvk\id=" + this.id_REUNIAO);
    //}
  }

  //atualiza ou cria tarefa
  criarTarefas(id, modulo) {
    var link = webUrl.host + '/#/reunioes/view?id=';
    this.GTMOVTAREFASService.getAtualizaTarefaReunioes(id, modulo, link).subscribe(
      response => {

      }, error => { console.log(error); });
  }

  gravarTabelaAccoes(id) {
    if (this.tabelaaccoes && this.tabelaaccoes.length > 0) {

      var count = 0;
      for (var x in this.tabelaaccoes) {
        count++;
        if ((this.tabelaaccoes[x].id_REUNIAO == null || this.tabelaaccoes[x].id_REUNIAO == this.id_REUNIAO) && this.tabelaaccoes[x].responsavel != null && this.tabelaaccoes[x].responsavel != "" && this.tabelaaccoes[x].descricao != null && this.tabelaaccoes[x].descricao != "") {
          var accoes = new REU_REUNIOES_PLANOS_ACCOES;
          var novo = false;
          if (this.tabelaaccoes[x].id != null) {
            accoes = this.tabelaaccoes[x].data;
          } else {
            novo = true;
            accoes.data_CRIA = new Date();
            accoes.utz_CRIA = this.user;
          }

          accoes.id = this.tabelaaccoes[x].id;
          accoes.id_REUNIAO = id;
          accoes.id_ACCAO = this.tabelaaccoes[x].id_ACCOES;
          accoes.tipo = "A";
          accoes.observacoes = this.tabelaaccoes[x].observacoes;
          accoes.estado = "P";
          accoes.obriga_EVIDENCIAS = this.tabelaaccoes[x].obriga_EVIDENCIAS;
          accoes.item = this.tabelaaccoes[x].item;
          accoes.tipo_ACAO = this.tabelaaccoes[x].tipo_ACAO;


          //var data = this.tabelaaccoesimediatas[x].data_REAL;
          //accoes.data_REAL = (data!=null && data != "" )? new Date(data) : null;
          accoes.data_PREVISTA = new Date(this.tabelaaccoes[x].data_PREVISTA);

          var id_resp = this.tabelaaccoes[x].responsavel;
          var tipo = "u";
          if (this.tabelaaccoes[x].responsavel.charAt(0) == 'u' || this.tabelaaccoes[x].responsavel.charAt(0) == 'g') {
            tipo = this.tabelaaccoes[x].responsavel.charAt(0);
            id_resp = this.tabelaaccoes[x].responsavel.substr(1);
          }

          accoes.responsavel = id_resp;
          accoes.tipo_RESPONSAVEL = tipo;


          accoes.data_ULT_MODIF = new Date();
          accoes.utz_ULT_MODIF = this.user;

          if (novo) {
            this.gravarTabelaAccoes2(accoes, count, this.tabelaaccoes.length, id);
          }

        }
      }
    } else {

    }

    if (this.novo) {
      this.router.navigate(['reunioes/editar'], { queryParams: { id: id } });
      this.simular(this.inputnotifi);
    } else {
      this.router.navigate(['reunioes/view'], { queryParams: { id: id } });
      this.simular(this.inputgravou);
    }
  }

  geEstado(estado) {
    var estados = "";
    switch (estado) {
      case 'P':
        estados = "Pendente";
        break;
      case 'L':
        estados = "Lida";
        break;
      case 'E':
        estados = "Em Curso";
        break;
      case 'C':
        estados = "Desenvolvida/ Realizada";
        break;
      case 'A':
        estados = "Cancelada";
        break;
      case 'R':
        estados = "Rejeitada";
        break;
      case 'N':
        estados = "Não Respondida";
        break;
      case 'F':
        estados = "Aprovada";
        break;
      case 'V':
        estados = "Controlada/ Verificada";
        break;
      default:
        estados = "Pendente";
    }
    return estados;
  }

  carregatabelasaccoes(id) {

    this.tabelaaccoes = [];

    this.REUREUNIOESPLANOSACCOESService.getbyidambito(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var tipo = response[x].tipo_RESPONSAVEL;
            var data_real = null;

            var id2 = null;

            id2 = response[x].id;

            if (response[x].data_REAL != null) {
              data_real = new Date(response[x].data_REAL);
            }

            var estados = response[x].estado

            var accao = null;
            if (this.drop_accoes.find(item => item.value == response[x].id_ACCAO)) {
              accao = this.drop_accoes.find(item => item.value == response[x].id_ACCAO).label
            }
            if (response[x].tipo == "A") {
              if (/*response[x].id_REUNIAO == this.id_REUNIAO ||*/ (estados == 'P' || estados == 'L' || estados == 'E')) {
                this.tabelaaccoes.push({
                  id_REUNIAO: response[x].id_REUNIAO,
                  obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                  data: response[x], concluido_UTZ: response[x].concluido_UTZ, id_ACCOES: response[x].id_ACCAO, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                  id: id2, data_REAL: data_real, data_PREVISTA: ((response[x].data_PREVISTA == null) ? null : new Date(response[x].data_PREVISTA)),
                  responsavel: tipo + response[x].responsavel, descricao: accao, area: response[x].area,
                  item: response[x].item, tipo_ACAO: response[x].tipo_ACAO
                });
              } else {
                this.tabelaaccoes_concluidas.push({
                  id_REUNIAO: response[x].id_REUNIAO,
                  obriga_EVIDENCIAS: response[x].obriga_EVIDENCIAS,
                  data: response[x], concluido_UTZ: response[x].concluido_UTZ, id_ACCOES: response[x].id_ACCAO, observacoes: response[x].observacoes, id_TAREFA: response[x].id_TAREFA, estado: estados, nome_estado: this.geEstado(estados),
                  id: id2, data_REAL: data_real, data_PREVISTA: ((response[x].data_PREVISTA == null) ? null : new Date(response[x].data_PREVISTA)),
                  responsavel: tipo + response[x].responsavel, descricao: accao, area: response[x].area,
                  item: response[x].item, tipo_ACAO: response[x].tipo_ACAO
                });
              }


            }

          }

          this.tabelaaccoes = this.tabelaaccoes.slice();
          this.tabelaaccoes_concluidas = this.tabelaaccoes_concluidas.slice();
        }

      }, error => {
        console.log(error);
      });
  }


  nomeACCAO(event) {
    var id = event.value;
    var data = this.drop_accoes.find(item => item.value == id);
    var nome = "---";

    if (data) {
      nome = data.label;
    }
    return nome;
  }

  carregaaccoes() {
    this.drop_accoes = [];
    //this.RCDICACCOESRECLAMACAOService.getAll_TIPO("T").subscribe(
    this.RCDICACCOESRECLAMACAOService.getAll().subscribe(
      response => {
        this.drop_accoes.push({ label: "Selecionar Ação", value: null });

        for (var x in response) {
          this.drop_accoes.push({ label: response[x].descricao_PT, value: response[x].id });
        }

        this.drop_accoes = this.drop_accoes.slice();

      },
      error => { console.log(error); });
  }

  carregaGruposAccoes() {
    this.GERGRUPOService.getAll().subscribe(
      response => {
        var grupo = [];
        this.tabelagrupos = [];
        for (var x in response) {
          grupo.push({ label: response[x].descricao, value: "g" + response[x].id });
          this.tabelagrupos.push({ label: response[x].descricao, value: response[x].id })
          this.drop_utilizadores_acoes.push({ label: response[x].descricao, value: "g" + response[x].id, type: "Grupo" });
        }
        //this.drop_utilizadores_acoes.push({ label: "Grupos", itens: grupo });

        this.drop_utilizadores_acoes = this.drop_utilizadores_acoes.slice();


      },
      error => { console.log(error); });
  }


  carregaUtilizadores_acoes() {
    this.drop_utilizadores_acoes = [];
    this.drop_utilizadores2 = [];
    this.GERUTILIZADORESService.getAllOrder().subscribe(
      response => {
        this.drop_utilizadores2.push({ label: "Selecionar Utilizador", value: "" });
        var grupo = [];
        for (var x in response) {
          grupo.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR });
          this.drop_utilizadores2.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR, email: response[x].email, area: response[x].area, telefone: response[x].telefone });
          this.drop_utilizadores_acoes.push({ label: response[x].nome_UTILIZADOR, value: "u" + response[x].id_UTILIZADOR, type: "Utilizador" });
        }
        // this.drop_utilizadores_acoes.push({ label: "Utilizadores", itens: grupo });

        this.drop_utilizadores_acoes = this.drop_utilizadores_acoes.slice();
        this.drop_utilizadores2 = this.drop_utilizadores2.slice();

        this.carregaGruposAccoes();
      },
      error => {
        console.log(error);
        this.carregaGruposAccoes();
      });
  }

  alterarEmail2(index, event, tabela) {
    console.log(index, event, tabela)
    if (event.value.toString().includes("u")) {
      var id = event.value.toString().replace("u", "");
      if (tabela == "tabelaaccoes") {
        this.tabelaaccoes[index].area = this.drop_utilizadores2.find(item => item.value == id).area;
      }
    } else {
      if (tabela == "tabelaaccoes") {
        this.tabelaaccoes[index].area = "";
      }
    }
  }

  /* ADICIONAR ACÇÕES*/
  //abre popup para adicionar acções
  showDialogToAdd() {
    //this.novo = true;
    this.id_selected = 0;
    this.descricaoeng = "";
    this.descricaopt = "";
    this.descricaofr = "";
    this.displayAddAccao = true;
  }
  //gravar unidade de ACÇÕES
  gravardados() {
    var ACCOES_RECLAMACAO = new GT_DIC_TAREFAS;
    ACCOES_RECLAMACAO.descricao_ENG = this.descricaoeng;
    ACCOES_RECLAMACAO.descricao_PT = this.descricaopt;
    ACCOES_RECLAMACAO.descricao_FR = this.descricaofr;
    ACCOES_RECLAMACAO.utz_ULT_MODIF = this.user;
    ACCOES_RECLAMACAO.tipo_TAREFA = "RE";
    ACCOES_RECLAMACAO.data_ULT_MODIF = new Date();

    ACCOES_RECLAMACAO.utz_CRIA = this.user;
    ACCOES_RECLAMACAO.data_CRIA = new Date();
    this.RCDICACCOESRECLAMACAOService.create(ACCOES_RECLAMACAO).subscribe(response => {
      this.carregaaccoes();
      this.displayAddAccao = false;
      this.simular(this.inputgravou);
    },
      error => { console.log(error); this.simular(this.inputerro); });

  }

  //devolve node responsavel
  getResponsavelaccoes(id) {
    if (id != null) var utz = this.drop_utilizadores2.find(item => item.value == id);
    if (id != null && id.toString().includes("u")) {
      //var utz2 = this.drop_utilizadores_acoes.find(item => item.label == "Utilizadores").itens;
      var utz2 = this.drop_utilizadores_acoes;
      utz = utz2.find(item => item.value == id);
    } else if (id != null && id.toString().includes("g")) {
      //var utz2 = this.drop_utilizadores_acoes.find(item => item.label == "Grupos").itens;
      var utz2 = this.drop_utilizadores_acoes;
      utz = utz2.find(item => item.value == id);
    }
    var nome = "---";
    if (utz) {
      nome = utz.label;
    }
    return nome;
  }

  /******* */
}