import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GERGRUPOService } from 'app/servicos/ger-grupo.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { UploadService } from 'app/servicos/upload.service';
import { webUrl } from 'assets/config/webUrl';
import { ConfirmationService, FileUpload } from 'primeng/primeng';
import { REUAMBITOSREUNIOESService } from 'app/servicos/reu-ambitos-reunioes.service';
import { REU_AMBITOS_REUNIOES } from 'app/entidades/REU_AMBITOS_REUNIOES';
import { REU_AMBITOS_REUNIOES_PARTICIPANTES } from 'app/entidades/REU_AMBITOS_REUNIOES_PARTICIPANTES';
import { REUAMBITOSREUNIOESPARTICIPANTESService } from 'app/servicos/reu-ambitos-reunioes-participantes.service';

@Component({
  selector: 'app-form-ambitos-reunioes',
  templateUrl: './form-ambitos-reunioes.component.html',
  styleUrls: ['./form-ambitos-reunioes.component.css']
})
export class FormAmbitosReunioesComponent implements OnInit {
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
  ambito_dados: any;
  id_AMBITO: any;
  descricao: any;
  data_ULTIMA_REALIZADA: any;
  data_PROXIMA_REALIZADA: any;
  prazo_DISP_ATA: any;
  data_INICIO: any;
  hora_INICIO: any;
  tempo_ESTIMADO: any;
  meio_REALIZACAO: any;
  link_REUNIAO: any;
  tipo_FIM: any;
  ocorrencias: any;
  total_OCORRENCIAS: any;
  data_FINAL: any;
  tipo_REPETICAO: any;
  repetir: any;
  dias_SEMANA: any;
  utz_MODIF: any;
  utz_ANULA: any;
  data_MODIF: any;
  data_ANULA: any;
  inativo: any;
  drop_Participantes = []

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService,
    private renderer: Renderer,
    private route: ActivatedRoute, private location: Location, private REUAMBITOSREUNIOESPARTICIPANTESService: REUAMBITOSREUNIOESPARTICIPANTESService,
    private GERGRUPOService: GERGRUPOService, private REUAMBITOSREUNIOESService: REUAMBITOSREUNIOESService,
    private sanitizer: DomSanitizer, private router: Router, private UploadService: UploadService) { }

  ngOnInit() {

    this.btcriar = true;
    this.btapagar = true;
    this.btvoltar = true;
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



      this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101editar");
      this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101criar");
      this.disApagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101apagar");

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

    if (!this.novo) { this.carregaDados(true, id); }
    this.carregaGrupos();

  }

  carregaDados(inicia, id) {
    this.drop_Participantes = [];
    this.GERUTILIZADORESService.getAll().subscribe(
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


  inicia(id) {

    this.REUAMBITOSREUNIOESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.ambito_dados = response[0];

          this.id_AMBITO = response[0].id_AMBITO;
          this.descricao = response[0].descricao;
          // this.data_ULTIMA_REALIZADA = (response[0].data_ULTIMA_REALIZADA == null) ? null : new Date(response[0].data_ULTIMA_REALIZADA);
          this.data_ULTIMA_REALIZADA = this.formatDate3(response[0].data_ULTIMA_REALIZADA);
          this.data_PROXIMA_REALIZADA = this.formatDate3(response[0].data_PROXIMA_REALIZADA);
          //this.data_PROXIMA_REALIZADA = (response[0].data_PROXIMA_REALIZADA == null) ? null : new Date(response[0].data_PROXIMA_REALIZADA);
          this.prazo_DISP_ATA = response[0].prazo_DISP_ATA;
          this.data_INICIO = (response[0].data_INICIO == null) ? null : new Date(response[0].data_INICIO);
          this.hora_INICIO = response[0].hora_INICIO.slice(0, 5);
          this.tempo_ESTIMADO = (response[0].tempo_ESTIMADO == null) ? null : response[0].tempo_ESTIMADO.slice(0, 5);
          this.meio_REALIZACAO = response[0].meio_REALIZACAO;
          this.link_REUNIAO = response[0].link_REUNIAO;
          this.tipo_FIM = response[0].tipo_FIM;
          this.ocorrencias = response[0].ocorrencias;
          this.total_OCORRENCIAS = response[0].total_OCORRENCIAS;
          this.data_FINAL = (response[0].data_FINAL == null) ? null : new Date(response[0].data_FINAL);
          this.tipo_REPETICAO = response[0].tipo_REPETICAO;
          this.repetir = response[0].repetir;
          this.dias_SEMANA = (response[0].dias_SEMANA != null) ? response[0].dias_SEMANA.split(",") : null;
          this.utz_CRIA = response[0].utz_CRIA;
          this.data_CRIA = (response[0].data_CRIA == null) ? null : new Date(response[0].data_CRIA);


          //   this.hora_CRIA = new Date(response[x].data_CRIA).toLocaleTimeString().slice(0, 5);           
          //this.data_FIM = (response[x].data_FIM == null) ? null : new Date(response[x].data_FIM);



          this.carregatabelaParticipantes(id);
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
    var ambito = new REU_AMBITOS_REUNIOES;

    if (!this.novo) ambito = this.ambito_dados;


    ambito.descricao = this.descricao;
    //ambito.data_ULTIMA_REALIZADA = this.data_ULTIMA_REALIZADA;
    //ambito.data_PROXIMA_REALIZADA = this.data_PROXIMA_REALIZADA;
    ambito.prazo_DISP_ATA = this.prazo_DISP_ATA;
    ambito.data_INICIO = this.data_INICIO;
    ambito.hora_INICIO = this.hora_INICIO;
    ambito.tempo_ESTIMADO = this.tempo_ESTIMADO;
    ambito.meio_REALIZACAO = this.meio_REALIZACAO;
    ambito.link_REUNIAO = this.link_REUNIAO;
    ambito.tipo_FIM = this.tipo_FIM;
    ambito.ocorrencias = this.ocorrencias;
    ambito.total_OCORRENCIAS = this.total_OCORRENCIAS;
    ambito.data_FINAL = this.data_FINAL;
    ambito.tipo_REPETICAO = this.tipo_REPETICAO;
    ambito.repetir = this.repetir;
    ambito.dias_SEMANA = (this.dias_SEMANA && this.dias_SEMANA.length > 0) ? this.dias_SEMANA.toString() : null;



    ambito.utz_MODIF = this.user;
    ambito.data_MODIF = new Date();

    if (this.novo) {
      ambito.data_CRIA = new Date(this.data_CRIA.toDateString() + " " + this.hora_CRIA.slice(0, 5));
      ambito.utz_CRIA = this.utz_CRIA;
      ambito.inativo = false;

      this.REUAMBITOSREUNIOESService.create(ambito).subscribe(
        res => {

          this.gravarTabelaParticipantes(res.id_AMBITO);
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      ambito.id_AMBITO = id;
      //console.log(reclamacao)
      this.REUAMBITOSREUNIOESService.update(ambito).subscribe(
        res => {

          this.gravarTabelaParticipantes(id);
          //this.router.navigate(['ambitos_reunioes/view'], { queryParams: { id: id } });
        },
        error => { console.log(error); this.simular(this.inputerro); /*this.displayLoading = false;*/ });

    }
  }


  gravarTabelaParticipantes(id) {
    if (this.tabelaParticipantes && this.tabelaParticipantes.length > 0) {

      var count = 0;
      var email_para = [];
      for (var x in this.tabelaParticipantes) {

        var equipa = new REU_AMBITOS_REUNIOES_PARTICIPANTES;
        if (this.tabelaParticipantes[x].id != null) {
          equipa = this.tabelaParticipantes[x].data;
        }

        equipa.id_UTILIZADOR = this.tabelaParticipantes[x].utilizador;
        equipa.email = this.tabelaParticipantes[x].email;
        equipa.id_AMBITO = id;


        count++;
        if (this.tabelaParticipantes[x].utilizador != null && this.tabelaParticipantes[x].utilizador != "") {
          this.gravarTabelaEquipa2(equipa, count, this.tabelaParticipantes.length, id);
        } else if (count == this.tabelaParticipantes.length) {
          if (this.novo) {
            this.router.navigate(['ambitos_reunioes/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            this.router.navigate(['ambitos_reunioes/view'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          }
        }
      }

    } else {
      if (this.novo) {
        this.router.navigate(['ambitos_reunioes/editar'], { queryParams: { id: id } });
        this.simular(this.inputnotifi);
      } else {
        this.router.navigate(['ambitos_reunioes/view'], { queryParams: { id: id } });
        this.simular(this.inputnotifi);
      }
    }
  }

  gravarTabelaEquipa2(equipa, count, total, id) {
    this.REUAMBITOSREUNIOESPARTICIPANTESService.update(equipa).then(
      res => {
        if (count == total) {
          if (this.novo) {
            this.router.navigate(['ambitos_reunioes/editar'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
          } else {
            this.router.navigate(['ambitos_reunioes/view'], { queryParams: { id: id } });
            this.simular(this.inputnotifi);
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
        var ambito = new REU_AMBITOS_REUNIOES;

        ambito = this.ambito_dados;

        ambito.utz_ANULA = this.user;
        ambito.data_ANULA = new Date();
        ambito.inativo = true;


        this.REUAMBITOSREUNIOESService.update(ambito).subscribe(
          res => {

            this.router.navigate(['ambitos_reunioes']);
            this.simular(this.inputapagar);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      }

    });
  }



  btgravar() {

  }


  novaambito() {
    this.router.navigate(['ambitos_reunioes/novo']);
  }

  backClicked() {
    //this.location.back();
    this.router.navigate(['ambitos_reunioes']);
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
        this.router.navigate(['ambitos_reunioes/editar'], { queryParams: { id: page, redirect: back } });
      } else {
        this.router.navigate(['ambitos_reunioes/editar'], { queryParams: { id: page } });
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

    this.REUAMBITOSREUNIOESPARTICIPANTESService.getbyid(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        var grupo = []
        if (count > 0) {
          for (var x in response) {
            var id2 = null;

            this.tabelaParticipantes.push({
              data: response[x],
              id: response[x].id, utilizador: response[x].id_UTILIZADOR, email: response[x].email
            });

          }
          this.drop_Participantes.unshift({ label: "Utilizadores", itens: grupo });


          this.tabelaParticipantes = this.tabelaParticipantes.slice();
        }

      }, error => { console.log(error); });
  }

  adicionar_tabelaParticipantes() {
    this.tabelaParticipantes.push({ id: null, utilizador: null, email: '' });
    this.tabelaParticipantes = this.tabelaParticipantes.slice();
  }


  apagar_tabelaParticipantes(index) {

    var tab = this.tabelaParticipantes[index];
    if (tab.id == null) {
      this.tabelaParticipantes = this.tabelaParticipantes.slice(0, index).concat(this.tabelaParticipantes.slice(index + 1));
    } else {
      this.REUAMBITOSREUNIOESPARTICIPANTESService.delete(tab.id).then(
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
              id: null, utilizador: response[x][0], email: response[x][3]

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


  //formatar a data para yyyy-mm-dd
  formatDate3(date) {
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