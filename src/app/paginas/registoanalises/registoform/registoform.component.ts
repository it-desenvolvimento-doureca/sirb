import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ABDICBANHOCOMPONENTEService } from "app/servicos/ab-dic-banho-componente.service";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { AB_MOV_ANALISE } from "app/entidades/AB_MOV_ANALISE";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { AB_MOV_ANALISE_LINHA } from "app/entidades/AB_MOV_ANALISE_LINHA";
import { ABMOVANALISELINHAService } from "app/servicos/ab-mov-analise-linha.service";
import { UploadService } from 'app/servicos/upload.service';


@Component({
  selector: 'app-registoform',
  templateUrl: './registoform.component.html',
  styleUrls: ['./registoform.component.css']
})
export class RegistoformComponent implements OnInit {
  email_para: any;
  bt_disable: boolean;
  email_mensagem: string = "";;
  nome_utz: any = "";
  alerta: any;
  cores = [];
  validada: boolean = false;
  bt_click: any = "";
  concluirbt: boolean;
  estado2: any;
  estado: string = "Em Elaboração";
  capacidade_tina: any;
  cor_linha: any;
  hora_ANALISE = new Date().toLocaleTimeString().slice(0, 5);
  data_ANALISE: Date = new Date();
  analise_valor: any;
  tipo_analise: any[];
  banho_componentes: any = [];
  celula: boolean = false;
  analise_dados: AB_MOV_ANALISE;
  banhos: any[];

  linhas: any[];
  banhos_valor = 0;
  componentes: any[];
  i: any;
  analises: any = [];
  modoedicao = false;
  novo = false;
  disablebanho = true;
  nome_tina = "";
  linha;
  codigo;
  data = null;
  obs = "";
  user;
  username;
  pos = 0;
  display: boolean = true;
  selected_plano;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialogemail') dialogemail: ElementRef;
  @ViewChild('dialogemailclose') dialogemailclose: ElementRef;
  @ViewChild('btvalidar') btvalidar: ElementRef;
  @ViewChild('btvalidarfalse') btvalidarfalse: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditartrue') alteraeditartrue: ElementRef;

  constructor(private UploadService: UploadService, private elementRef: ElementRef, private ABMOVANALISELINHAService: ABMOVANALISELINHAService, private ABMOVANALISEService: ABMOVANALISEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOCOMPONENTEService: ABDICBANHOCOMPONENTEService, private confirmationService: ConfirmationService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/jqbtk.js";
    this.elementRef.nativeElement.appendChild(s);

    this.tipo_analise = [{ label: "INTERNA", value: "I" }, { label: "EXTERNA", value: "E" }, { label: "PURIFICAÇÃO", value: "P" }];
    this.analise_valor = "I";

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000historico"));
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000duplicar"));
    this.globalVar.setdisValidar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000validar"));
    this.concluirbt = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node000concluir")

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.username = JSON.parse(localStorage.getItem('userapp'))["nome"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;
      this.codigo = 0;
      this.data = 0;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nas analises 
      if (this.globalVar.getfiltros("analises_id") && this.globalVar.getfiltros("analises_id").length > 0) {
        this.analises = this.globalVar.getfiltros("analises_id");
        this.i = this.analises.indexOf(+id);
        this.inicia(this.analises[this.i]);
      }
      else {
        this.ABMOVANALISEService.getAll().subscribe(
          response => {
            for (var x in response) {
              this.analises.push(response[x].id_ANALISE);
            }

            this.i = this.analises.indexOf(+id);
            this.inicia(this.analises[this.i]);

          }, error => { console.log(error); });

      }
    }
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: { id: null } });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) {
          this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
          this.preenche_banhos(this.linhas.find(item => item.value.id == this.globalVar.getlinha()));
        }
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.globalVar.setdisCriarmanutencao(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001criar"));
        this.globalVar.setcriarmanutencao(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.selected_plano = true;
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.globalVar.sethistorico(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formAnalise';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();


      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
        this.globalVar.setcriarmanutencao(true);
        this.globalVar.setdisCriarmanutencao(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node001criar"));
      }
    }
  }

  //preenche combobox banhos ao alterar linha
  preenche_banhos(event) {
    this.disablebanho = true;
    this.banhos = [];
    this.banho_componentes = [];
    this.banhos_valor = 0;
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
      //preenche combobox banhos
      this.disablebanho = false;
      this.ABDICBANHOService.getAllLINHAbylinha(event.value.id).subscribe(
        response => {
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, celula: response[x][0].celulahull, nome_tina: response[x][2].cod_TINA, capacidade_tina: response[x][2].capacidade, nome_banho: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO } });
          }
          this.banhos = this.banhos.slice();
        },
        error => console.log(error));
    }

  }

  //preenche tabela componentes apartir do banho seleccionado
  banhosComp(id) {
    this.ABDICBANHOCOMPONENTEService.getbyid_banho(id, this.data_ANALISE).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir componentes do banho
        if (count > 0) {
          for (var x in response) {

            var limite_AMARELO_INF = null;
            var limite_AMARELO_SUP = null;
            var limite_VERDE_INF = null;
            var limite_VERDE_SUP = null;
            if (response[x][0].limite_AMARELO_INF != null) limite_AMARELO_INF = response[x][0].limite_AMARELO_INF.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_VERDE_INF != null) limite_VERDE_INF = response[x][0].limite_VERDE_INF.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_AMARELO_SUP != null) limite_AMARELO_SUP = response[x][0].limite_AMARELO_SUP.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_VERDE_SUP != null) limite_VERDE_SUP = response[x][0].limite_VERDE_SUP.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            this.pos++;
            this.banho_componentes.push({
              cor: null, sinal: null,
              pos: this.pos, unidade: response[x][3],
              vlimite_AMARELO_INF: limite_AMARELO_INF, vlimite_VERDE_INF: limite_VERDE_INF, vlimite_AMARELO_SUP: limite_AMARELO_SUP, vlimite_VERDE_SUP: limite_VERDE_SUP,
              limite_AMARELO_INF: response[x][0].limite_AMARELO_INF, limite_VERDE_INF: response[x][0].limite_VERDE_INF, limite_AMARELO_SUP: response[x][0].limite_AMARELO_SUP, limite_VERDE_SUP: response[x][0].limite_VERDE_SUP,
              id_ANALISE_LIN: response[x][0].id_ANALISE_LIN, id: response[x][0].id_COMPONENTE, nome_comp: response[x][1].nome_COMPONENTE, resultado: null, calculo: null
            });
          }
          this.banho_componentes = this.banho_componentes.slice();
        }
      },
      error => { console.log(error); });
  }

  //preenche tabela componentes da analise
  componenteanalise(id) {
    this.ABMOVANALISELINHAService.getbyid_analise(id, this.banhos_valor['id']).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir componentes do banho
        if (count > 0) {
          this.banho_componentes = [];
          for (var x in response) {
            this.pos++;
            var resultado = null;
            var calculo = null;
            var limite_AMARELO_INF = null;
            var limite_AMARELO_SUP = null;
            var limite_VERDE_INF = null;
            var limite_VERDE_SUP = null;
            if (response[x][0].calculo != null) calculo = response[x][0].calculo.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
            if (response[x][0].resultado != null) resultado = response[x][0].resultado.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
            if (response[x][0].limite_AMARELO_INF != null) limite_AMARELO_INF =response[x][0].limite_AMARELO_INF.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_VERDE_INF != null) limite_VERDE_INF = response[x][0].limite_VERDE_INF.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_AMARELO_SUP != null) limite_AMARELO_SUP = response[x][0].limite_AMARELO_SUP.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            if (response[x][0].limite_VERDE_SUP != null) limite_VERDE_SUP = response[x][0].limite_VERDE_SUP.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(/\s/g, '');
            this.banho_componentes.push({
              cor: null, pos: this.pos, unidade: response[x][2], sinal: response[x][0].sinal,
              limite_AMARELO_INF: response[x][0].limite_AMARELO_INF, limite_VERDE_INF:response[x][0].limite_VERDE_INF, 
              limite_AMARELO_SUP: response[x][0].limite_AMARELO_SUP, limite_VERDE_SUP: response[x][0].limite_VERDE_SUP,
              vlimite_AMARELO_INF: limite_AMARELO_INF, vlimite_VERDE_INF: limite_VERDE_INF, vlimite_AMARELO_SUP: limite_AMARELO_SUP, vlimite_VERDE_SUP: limite_VERDE_SUP,
              id_ANALISE_LIN: response[x][0].id_ANALISE_LIN, id: response[x][0].id_COMPONENTE, nome_comp: response[x][1].nome_COMPONENTE, resultado: resultado,
              calculo: calculo
            });
            
            this.verificalimites(response[x][0].calculo, response[x][0].limite_AMARELO_INF, response[x][0].limite_AMARELO_SUP, response[x][0].limite_VERDE_INF, response[x][0].limite_VERDE_SUP, this.pos)
          }
          this.banho_componentes = this.banho_componentes.slice();
        }
      },
      error => { console.log(error); });
  }

  //preencher nome da tina e tabela dos componentes
  nome_tinas(event) {
    this.nome_tina = event.value.nome_tina;
    this.capacidade_tina = event.value.capacidade_tina;
    this.banho_componentes = [];
    this.celula = event.value.celula;
    if (event.value.id != null) {
      this.banhosComp(event.value.id);
    }
  }

  //preenche dados com o id
  inicia(id) {
    if (id != 0 && id != "undefined") {
      //preenche combobox banhos
      this.ABDICBANHOService.getAllLINHA().subscribe(
        response => {
          this.banhos = [];
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO, value: { id: response[x][0].id_BANHO, celula: response[x][0].celulahull, nome_tina: response[x][2].cod_TINA, capacidade_tina: response[x][2].capacidade, nome_banho: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO } });
          }
          this.banhos = this.banhos.slice();
          this.ABMOVANALISEService.getbyID(id).subscribe(
            response => {
              var count = Object.keys(response).length;
              //se existir banhos com o id
              if (count > 0) {
                this.analise_dados = response[0][0];
                for (var x in response) {
                  this.codigo = response[x][0].id_ANALISE;
                  this.nome_utz = response[x][4];
                  this.data = this.formatDate(response[x][0].data_ULT_MODIF);
                  this.celula = response[x][0].celulahull;
                  this.cor_linha = response[x][1].cor;
                  this.data_ANALISE = new Date(response[x][0].data_ANALISE);
                  this.analise_valor = response[x][0].analise_INT_EXT;
                  this.hora_ANALISE = (response[x][0].hora_ANALISE).slice(0, 5);
                  this.banhos_valor = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value;
                  this.nome_tina = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value['nome_tina'];
                  this.capacidade_tina = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value['capacidade_tina'];
                  this.obs = response[x][0].obs;
                  this.email_para = response[x][2].email_PARA;
                  this.selected_plano = (response[x][0].planeada == null || response[x][0].planeada == false) ? false : true;
                  this.linha = this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
                  if (response[x][0].estado == "C") {
                    this.estado = "Concluída";
                    this.simular(this.btvalidar);
                    this.simular(this.alteraeditartrue);
                  } else if (response[x][0].estado == "E") {
                    this.estado = "Em Elaboração"
                    this.simular(this.btvalidarfalse);
                    this.simular(this.alteraeditartrue);
                  } else if (response[x][0].estado == "V") {
                    this.estado = "Validada"
                    this.validada = true;
                    this.estado2 = true;
                    this.simular(this.btvalidarfalse);
                    this.simular(this.alteraeditar);
                  }

                }

                this.componenteanalise(id);
              } else {
                this.router.navigate(['registo']);
              }
            },
            error => { console.log(error); });
        },
        error => console.log(error));

    } else {
      this.router.navigate(['registo']);
    }
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

  //ver o button em que clicou
  estadobutton(estado, alerta) {
    this.bt_click = estado;
    this.alerta = alerta;
  }
  //bt gravar
  gravar(estado = null) {
    if (this.bt_click == "C" && estado == null) {
      this.concluir();
    } else {

      var analise = new AB_MOV_ANALISE;

      if (this.novo) {
        analise.obs = this.obs;
        analise.data_ULT_MODIF = new Date();
        analise.utz_CRIA = this.user;
        analise.data_CRIA = new Date();
        analise.celulahull = this.celula;
        analise.id_BANHO = this.banhos_valor['id'];
        analise.id_LINHA = this.linha.id;
        analise.data_ANALISE = this.data_ANALISE;
        analise.hora_ANALISE = this.hora_ANALISE;
        analise.analise_INT_EXT = this.analise_valor;
        analise.inativo = false;
        analise.estado = this.bt_click;
        analise.planeada = (this.selected_plano == 1) ? true : false;
        if (this.cores.find(item => item == "vermelho")) {
          analise.cor_LIMITES = "vermelho";
        } else if (this.cores.find(item => item == "amarelo")) {
          analise.cor_LIMITES = "amarelo";
        } else if (this.cores.find(item => item == "verde")) {
          analise.cor_LIMITES = "verde";
        } else {
          analise.cor_LIMITES = "none";
        }

        this.ABMOVANALISEService.create(analise).subscribe(
          res => {
            if (this.alerta) this.verifica(this.obs, res.id_ANALISE, this.data_ANALISE, this.banhos_valor['nome_banho'], this.banhos_valor['nome_tina'], this.username, "Concluída", this.linha.id, this.email_mensagem);
            this.inserir_linhas(res.id_ANALISE);
          },
          error => { console.log(error); this.simular(this.inputerro); });

      } else {
        var id;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['id'] || 0;
          });

        analise = this.analise_dados;
        analise.obs = this.obs;
        analise.id_BANHO = this.banhos_valor['id'];
        analise.id_LINHA = this.linha.id;
        analise.data_ULT_MODIF = new Date();
        analise.utz_ULT_MODIF = this.user;
        analise.data_ANALISE = this.data_ANALISE;
        analise.analise_INT_EXT = this.analise_valor;
        analise.celulahull = this.celula;
        analise.hora_ANALISE = this.hora_ANALISE;
        analise.planeada = (this.selected_plano == 1) ? true : false;
        if (this.cores.find(item => item == "vermelho")) {
          analise.cor_LIMITES = "vermelho";
        } else if (this.cores.find(item => item == "amarelo")) {
          analise.cor_LIMITES = "amarelo";
        } else if (this.cores.find(item => item == "verde")) {
          analise.cor_LIMITES = "verde";
        } else {
          analise.cor_LIMITES = "none";
        }

        this.ABMOVANALISEService.update(analise).then(() => {
          this.inserir_linhas(id);
        });

      }
    }
  }


  //inserir linhas na BD
  inserir_linhas(id) {
    if (this.banho_componentes.length > 0) {
      for (var x in this.banho_componentes) {
        var banho_comp = new AB_MOV_ANALISE_LINHA;

        if (this.banho_componentes[x].id != "" && this.banho_componentes[x].id != null) {
          if (this.banho_componentes[x].id_ANALISE_LIN == "" || this.banho_componentes[x].id_ANALISE_LIN == null) {
            banho_comp.id_ANALISE = id;
            var calculo = null;
            var resultado = null
            if (this.banho_componentes[x].resultado != null) resultado = parseFloat(String(this.banho_componentes[x].resultado).replace(",", "."));
            if (this.banho_componentes[x].calculo != null) calculo = parseFloat(String(this.banho_componentes[x].calculo).replace(",", "."));
            banho_comp.resultado = resultado;
            banho_comp.calculo = calculo;
            banho_comp.sinal = this.banho_componentes[x].sinal;
            banho_comp.id_COMPONENTE = this.banho_componentes[x].id;


            var limite_VERDE_INF = null;
            var limite_AMARELO_INF = null;
            var limite_VERDE_SUP = null;
            var limite_AMARELO_SUP = null;
            if (this.banho_componentes[x].vlimite_AMARELO_INF != null) limite_AMARELO_INF = parseFloat(this.banho_componentes[x].vlimite_AMARELO_INF.replace(",", "."));
            if (this.banho_componentes[x].vlimite_AMARELO_SUP != null) limite_AMARELO_SUP = parseFloat(this.banho_componentes[x].vlimite_AMARELO_SUP.replace(",", "."));
            if (this.banho_componentes[x].vlimite_VERDE_SUP != null) limite_VERDE_SUP = parseFloat(this.banho_componentes[x].vlimite_VERDE_SUP.replace(",", "."));
            if (this.banho_componentes[x].vlimite_VERDE_INF != null) limite_VERDE_INF = parseFloat(this.banho_componentes[x].vlimite_VERDE_INF.replace(",", "."));

            banho_comp.limite_AMARELO_INF = limite_AMARELO_INF;
            banho_comp.limite_AMARELO_SUP = limite_AMARELO_SUP;
            banho_comp.limite_VERDE_INF = limite_VERDE_INF;
            banho_comp.limite_VERDE_SUP = limite_VERDE_SUP;

            this.criacomponente(banho_comp);
          } else {

            this.update(id, x);

          }
        }
      }
    }
    if (this.novo) {
      this.simular(this.inputnotifi);
    } else {
      this.simular(this.inputgravou);
    }
    this.router.navigate(['registo/view'], { queryParams: { id: id } });

  }

  criacomponente(banho_comp) {
    this.ABMOVANALISELINHAService.create(banho_comp).subscribe(
      res => {

      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  update(id, x) {
    this.ABMOVANALISELINHAService.getbyid(this.banho_componentes[x].id_ANALISE_LIN).subscribe(
      res => {
        var banho_comp = new AB_MOV_ANALISE_LINHA;
        var calculo = null;
        var resultado = null
        if (this.banho_componentes[x].resultado != null) resultado = parseFloat(String(this.banho_componentes[x].resultado).replace(",", "."));
        if (this.banho_componentes[x].calculo != null) calculo = parseFloat(String(this.banho_componentes[x].calculo).replace(",", "."));
        banho_comp = res[0];
        banho_comp.id_ANALISE = id;
        banho_comp.resultado = resultado;
        banho_comp.id_COMPONENTE = this.banho_componentes[x].id;
        banho_comp.calculo = calculo;
        banho_comp.sinal = this.banho_componentes[x].sinal;
        this.ABMOVANALISELINHAService.update(banho_comp).then(() => {
        });
      },
      error => { console.log(error); this.simular(this.inputerro); });
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

  //botão de “Concluir” para que o utilizador possa indicar que terminou a análise
  concluir() {
    var mensagem = "Tem a certeza que pretende Concluir?";
    if (this.alerta) mensagem = "Tem a certeza que pretende Concluir com envio de Alerta?";
    this.confirmationService.confirm({
      message: mensagem,
      header: 'Concluir',
      icon: 'fa fa-bell-o',
      accept: () => {
        var id;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['id'] || 0;
          });
        if (this.novo && !this.alerta) {
          this.gravar("C");
        } else {
          if (this.alerta) {
            this.email_mensagem = "";
            this.bt_disable = false;
            this.simular(this.dialogemail);
          } else {
            this.email_mensagem = "";
            if (this.novo) {
              this.gravar("C");
            } else {
              this.conclui(id, false);
            }
          }

        }
      }
    });
  }

  enviar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (this.novo) {
      this.gravar("C");
    } else {
      this.conclui(id, true);
    }

  }

  conclui(id, evento) {
    /*this.ABMOVANALISELINHAService.getbyid_analise(id, this.banhos_valor['id']).subscribe(
      response => {*/

        var analise = new AB_MOV_ANALISE;
        analise = this.analise_dados;
        analise.estado = "C";
        analise.utz_ULT_MODIF = this.user;
        analise.data_ULT_MODIF = new Date();
        analise.obs = this.obs;
        analise.id_BANHO = this.banhos_valor['id'];
        analise.id_LINHA = this.linha.id;
        analise.data_ANALISE = this.data_ANALISE;
        analise.analise_INT_EXT = this.analise_valor;
        analise.celulahull = this.celula;
        analise.hora_ANALISE = this.hora_ANALISE;
        analise.mensagem = this.email_mensagem;

        if (this.cores.find(item => item == "vermelho")) {
          analise.cor_LIMITES = "vermelho";
        } else if (this.cores.find(item => item == "amarelo")) {
          analise.cor_LIMITES = "amarelo";
        } else if (this.cores.find(item => item == "verde")) {
          analise.cor_LIMITES = "verde";
        } else {
          analise.cor_LIMITES = "none";
        }

        this.ABMOVANALISEService.update(analise).then(() => {
          if (evento) this.verifica(this.obs, this.codigo, this.data_ANALISE, this.banhos_valor['nome_banho'], this.banhos_valor['nome_tina'], this.nome_utz, "Concluída", this.linha.id, this.email_mensagem);
          this.inserir_linhas(id);
        });


     /* },
      error => console.log(error));*/
  }


  //verificar eventos
  verifica(observacao, numero_analise, data_analise, nome_banho, tina, utilizador, estado, linha, email_mensagem) {
    var dados = "{observacao::" + observacao + "\n/numero_analise::" + numero_analise + "\n/mensagem::" + email_mensagem
      + "\n/data_analise::" + new Date(data_analise).toLocaleDateString() + "\n/nome_banho::" + nome_banho
      + "\n/tina::" + tina + "\n/utilizador::" + utilizador + "\n/estado::" + estado + "\n/linha::" + linha + "}";
    var data = [{ MODULO: 1, MOMENTO: "Ao Concluir", PAGINA: "Ánalises", ESTADO: true, DADOS: dados, EMAIL_PARA: this.email_para }];
    this.UploadService.verficaEventos(data).subscribe(result => {
      this.simular(this.dialogemailclose)
      this.bt_disable = true;
    }, error => {
      console.log(error);
    });
  }

  //botão de “Validar” para que o utilizador possa indicar que terminou a análise
  validar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Validar?',
      header: 'Validar',
      icon: 'fa fa-bell-o',
      accept: () => {
        var id;
        var sub = this.route
          .queryParams
          .subscribe(params => {
            id = params['id'] || 0;
          });

        /*this.ABMOVANALISELINHAService.getbyid_analise(id, this.banhos_valor['id']).subscribe(
          response => {*/

            var analise = new AB_MOV_ANALISE;
            analise = this.analise_dados;
            analise.estado = "V";
            analise.utz_VALIDA = this.user;
            analise.data_VALIDA = new Date();

            this.ABMOVANALISEService.update(analise).then(() => {
              this.simular(this.inputgravou);
              this.inicia(this.analises[this.i]);
              //this.router.navigate(['registo/view'], { queryParams: { id: this.analises[this.i] } });
            });



        /*  },
          error => console.log(error));*/
      }

    });
  }
  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.analises.length;
    if (this.analises.length > 0) {
      this.inicia(this.analises[this.i]);
      this.router.navigate(['registo/view'], { queryParams: { id: this.analises[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.analises.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['registo/view'], { queryParams: { id: this.analises[this.i] } });
    if (this.analises.length > 0) {
      this.inicia(this.analises[this.i]);
    }
  }
  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        /*this.ABMOVANALISELINHAService.getbyid_analise(id, this.banhos_valor['id']).subscribe(
          response => {*/

            var analise = new AB_MOV_ANALISE;
            analise = this.analise_dados;
            analise.inativo = true;
            analise.utz_ANULACAO = this.user;
            analise.data_ANULACAO = new Date();

            this.ABMOVANALISEService.update(analise).then(() => {
              this.simular(this.inputapagar);
              this.router.navigate(['registo']);
            });



         /* },
          error => console.log(error));*/
      }
    });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //Conforme em cada Linha de cada componente seja registado o Resultado e saia do campo, este deve passar a uma cor
  verificalimites(valor, limite_AMARELO_INF, limite_AMARELO_SUP, limite_VERDE_INF, limite_VERDE_SUP, pos) {
    //console.log(limite_AMARELO_INF + '/' + limite_AMARELO_SUP + '/' + limite_VERDE_INF + '/' + limite_VERDE_SUP)

    if (valor != null) {
      valor = valor.toLocaleString().replace(",", ".");
    }
    if (valor == null || valor == "" || (limite_AMARELO_INF == null && limite_AMARELO_SUP == null && limite_VERDE_INF == null && limite_VERDE_SUP == null)) {
      this.banho_componentes.find(item => item.pos == pos).cor = "none";
      this.cores[pos] = "none";
    }
    //Verde (se o valor está entre os valores definidos para o limite inferior e superior definido); 
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      this.banho_componentes.find(item => item.pos == pos).cor = "rgba(0, 128, 0, 0.41)";
      this.cores[pos] = "verde";
    }
    else if (valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      this.banho_componentes.find(item => item.pos == pos).cor = "rgba(0, 128, 0, 0.41)";
      this.cores[pos] = "verde";
    } else if ((valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP) && (limite_AMARELO_INF == null || limite_AMARELO_SUP == null)) {
      this.banho_componentes.find(item => item.pos == pos).cor = "none";
      this.cores[pos] = "none";
    }
    //Amarelo (se o valor estiver entre o intervalo dos limites inferiores e superiores mas fora dos limites verdes
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      this.banho_componentes.find(item => item.pos == pos).cor = "rgba(255, 255, 0, 0.62)";
      this.cores[pos] = "amarelo";
    }

    //Vermelho (se estiver fora dos intervalos Verde e Amarelo)
    else if ((valor <= limite_AMARELO_INF || valor >= limite_AMARELO_SUP) && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      this.banho_componentes.find(item => item.pos == pos).cor = "rgba(239, 19, 19, 0.58)";
      this.cores[pos] = "vermelho";
    } else {
      this.banho_componentes.find(item => item.pos == pos).cor = "none";
      this.cores[pos] = "none";
    }
  }

  //ver historico
  historico() {
    this.router.navigate(['registo/historico'], { queryParams: { id: this.analises[this.i] } });
  }

}
