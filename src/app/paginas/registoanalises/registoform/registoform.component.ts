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


@Component({
  selector: 'app-registoform',
  templateUrl: './registoform.component.html',
  styleUrls: ['./registoform.component.css']
})
export class RegistoformComponent implements OnInit {
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
  pos = 0;
  display: boolean = true;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialog') dialog: ElementRef;

  constructor(private ABMOVANALISELINHAService: ABMOVANALISELINHAService, private ABMOVANALISEService: ABMOVANALISEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOCOMPONENTEService: ABDICBANHOCOMPONENTEService, private confirmationService: ConfirmationService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {

    this.tipo_analise = [{ label: "INTERNA", value: "I" }, { label: "EXTERNA", value: "E" }];
    this.analise_valor = "I";

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setpesquisar(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

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
      this.ABMOVANALISEService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.analises.push(response[x].id_ANALISE);
          }

          this.i = this.analises.indexOf(+id);
          this.inicia(this.analises[this.i]);

        }, error => { console.log(error); });

    }

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

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
        var dirtyFormID = 'formAnalise';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();


      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }
  }

  //preenche combobox banhos ao alterar linha
  preenche_banhos(event) {
    this.cor_linha = event.value.cor;
    this.disablebanho = true;
    this.banhos = [];
    this.banho_componentes = [];
    this.banhos_valor = 0;
    if (event.value.id != "") {
      //preenche combobox banhos
      this.disablebanho = false;
      this.ABDICBANHOService.getAllLINHAbylinha(event.value.id).subscribe(
        response => {
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, nome_tina: response[x][2].cod_TINA, capacidade_tina: response[x][2].capacidade } });
          }
          this.banhos = this.banhos.slice();
        },
        error => console.log(error));
    }

  }

  //preenche tabela componentes apartir do banho seleccionado
  banhosComp(id) {
    this.ABDICBANHOCOMPONENTEService.getbyid_banho(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir componentes do banho
        if (count > 0) {
          for (var x in response) {
            this.banho_componentes.push({ id_ANALISE_LIN: response[x][0].id_ANALISE_LIN, id: response[x][0].id_COMPONENTE, nome_comp: response[x][1].nome_COMPONENTE, resultado: null, calculo: null });
          }
          this.banho_componentes = this.banho_componentes.slice();
        }
      },
      error => { console.log(error); });
  }

  //preenche tabela componentes da analise
  componenteanalise(id) {
    this.ABMOVANALISELINHAService.getbyid_analise(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir componentes do banho
        if (count > 0) {
          this.banho_componentes = [];
          for (var x in response) {
            this.banho_componentes.push({ id_ANALISE_LIN: response[x][0].id_ANALISE_LIN, id: response[x][0].id_COMPONENTE, nome_comp: response[x][1].nome_COMPONENTE, resultado: response[x][0].resultado, calculo: response[x][0].calculo });
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
            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO, value: { id: response[x][0].id_BANHO, nome_tina: response[x][2].cod_TINA, capacidade_tina: response[x][2].capacidade } });
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
                  this.data = new Date(response[x][0].data_ULT_MODIF).toLocaleDateString();
                  this.celula = response[x][0].celulahull;
                  this.linha = this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
                  this.cor_linha = response[x][1].cor;
                  this.data_ANALISE = new Date(response[x][0].data_ANALISE);
                  this.analise_valor = response[x][0].analise_INT_EXT;
                  this.hora_ANALISE = (response[x][0].hora_ANALISE).slice(0, 5);
                  this.banhos_valor = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value;
                  this.nome_tina = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value['nome_tina'];
                  this.capacidade_tina = this.banhos.find(item => item.value.id === response[x][0].id_BANHO).value['capacidade_tina'];
                  this.obs = response[x][0].obs;
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

  //bt cancelar
  backview() {
    this.location.back();
  }

  //bt gravar
  gravar() {
    var analise = new AB_MOV_ANALISE;

    if (this.novo) {
      analise.obs = this.obs;
      analise.data_ULT_MODIF = new Date();
      analise.utz_CRIA = this.user;
      analise.data_CRIA = new Date();
      analise.celulahull = this.celula;
      analise.id_BANHO = this.banhos_valor['id'];
      analise.id_LINHA = this.linha;
      analise.data_ANALISE = this.data_ANALISE;
      analise.hora_ANALISE = new Date(this.hora_ANALISE).toLocaleTimeString();
      analise.analise_INT_EXT = this.analise_valor;
      this.ABMOVANALISEService.create(analise).subscribe(
        res => {
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
      analise.id_LINHA = this.linha;
      analise.data_ULT_MODIF = new Date();
      analise.utz_ULT_MODIF = this.user;
      analise.data_ANALISE = this.data_ANALISE;
      analise.analise_INT_EXT = this.analise_valor;

      analise.hora_ANALISE = this.hora_ANALISE;

      this.ABMOVANALISEService.update(analise).then(() => {
        this.inserir_linhas(id);
      });

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
            banho_comp.resultado = this.banho_componentes[x].resultado;
            banho_comp.calculo = this.banho_componentes[x].calculo;
            banho_comp.id_COMPONENTE = this.banho_componentes[x].id;

            this.ABMOVANALISELINHAService.create(banho_comp).subscribe(
              res => {

              },
              error => { console.log(error); this.simular(this.inputerro); });
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

  update(id, x) {
    this.ABMOVANALISELINHAService.getbyid(this.banho_componentes[x].id_ANALISE_LIN).subscribe(
      res => {
        var banho_comp = new AB_MOV_ANALISE_LINHA;
        banho_comp = res[0];
        banho_comp.id_ANALISE = id;
        banho_comp.resultado = this.banho_componentes[x].resultado;
        banho_comp.id_COMPONENTE = this.banho_componentes[x].id;
        banho_comp.calculo = this.banho_componentes[x].calculo;
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

        this.ABMOVANALISELINHAService.getbyid_analise(id).subscribe(
          response => {

            var analise = new AB_MOV_ANALISE;
            analise = this.analise_dados;
            analise.inativo = true;
            analise.utz_ANULACAO = this.user;
            analise.data_ANULACAO = new Date();

            this.ABMOVANALISEService.update(analise).then(() => {
              this.simular(this.inputapagar);
              this.router.navigate(['registo']);
            });



          },
          error => console.log(error));
      }
    });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}
