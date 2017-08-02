import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { AB_DIC_COMPONENTE } from "app/entidades/AB_DIC_COMPONENTE";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";

@Component({
  selector: 'app-compform',
  templateUrl: './compform.component.html',
  styleUrls: ['./compform.component.css']
})
export class CompformComponent implements OnInit {
  aditivo_check: boolean;
  componente_check: boolean;
  fornecedores: any[];
  id_fornecedor;
  cod_ref: string;
  componentes_silver: any;
  medidas_valor = "";
  medidas_valor_adicao;
  nome = "";
  nome_ref = "";
  estado: any = false;
  componentes: any[];
  medidas: any = [];
  i: any;
  componente: any = [];
  componentes_dados: AB_DIC_COMPONENTE;
  modoedicao = false;
  novo = false;
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


  constructor(private GERFORNECEDORService: GERFORNECEDORService, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private confirmationService: ConfirmationService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {


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

      //preenche array para navegar nos componentees 
      this.ABDICCOMPONENTEService.getAll("T").subscribe(
        response => {
          for (var x in response) {
            this.componente.push(response[x].id_COMPONENTE);
          }

          this.i = this.componente.indexOf(+id);
          this.inicia(this.componente[this.i]);

        }, error => { console.log(error); });
    }

    //preenche combobox fornecedores

    this.GERFORNECEDORService.getAll().subscribe(
      response => {
        this.fornecedores = [];
        this.fornecedores.push({ label: 'Sel. Fornecedor', value: "" });
        for (var x in response) {
          this.fornecedores.push({ label: response[x].nome_FORNECEDOR, value: response[x].id_FORNECEDOR });
        }
        this.fornecedores = this.fornecedores.slice();
      },
      error => console.log(error));

    //preenche combobox unidades
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {

        this.medidas = [];

        this.medidas.push({ label: 'Sel. Unidade de Medida', value: "" });
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
      },
      error => console.log(error));

    //preenche combobox componentes_silver

    this.ABDICCOMPONENTEService.getComponentes().subscribe(
      response => {
        this.componentes_silver = [];
        this.componentes_silver.push({ label: 'Sel. Ref. Comp.', value: "" });
        for (var x in response) {
          this.componentes_silver.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: response[x].PROREF });
        }
        this.componentes_silver = this.componentes_silver.slice();
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
        var dirtyFormID = 'formComponente';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }
  }

  //preenche no ref
  cod_refe(event) {
    this.nome_ref = "";
    this.nome_ref = this.componentes_silver.find(item => item.value == event.value).label.split(" - ")[1];
  }


  //preenche dados com o id
  inicia(id) {
    if (id != 0 && id != "undefined") {
      this.ABDICCOMPONENTEService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir componentes com o id
          if (count > 0) {
            this.componentes_dados = response[0];
            for (var x in response) {
              this.codigo = response[x].id_COMPONENTE;
              this.data = new Date(response[x].data_ULT_MODIF).toLocaleDateString();
              this.nome = response[x].nome_COMPONENTE;
              this.medidas_valor = response[x].id_UNIDADE_COMPONENTE;
              this.obs = response[x].obs;
              this.cod_ref = response[x].cod_REF;
              this.nome_ref = response[x].nome_REF;
              this.id_fornecedor = response[x].id_FORNECEDOR;
              this.medidas_valor_adicao = response[x].id_UNIDADE_ADITIVO;

              if (response[x].tipo == "T") {
                this.componente_check = true;
                this.aditivo_check = true;
              } else if (response[x].tipo == "A") {
                this.componente_check = false;
                this.aditivo_check = true;
              } else if (response[x].tipo == "C") {
                this.componente_check = true;
                this.aditivo_check = false;
              } else {
                this.componente_check = false;
                this.aditivo_check = false;
              }

            }
          } else {
            this.router.navigate(['componentes']);
          }
        },
        error => { console.log(error); });
    } else {
      this.router.navigate(['componentes']);
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //bt gravar
  gravar() {
    var componente = new AB_DIC_COMPONENTE;

    if (this.novo) {
      componente.nome_COMPONENTE = this.nome;
      componente.obs = this.obs;
      componente.data_ULT_MODIF = new Date();
      componente.utz_CRIA = this.user;
      componente.id_UNIDADE_COMPONENTE = this.medidas_valor;
      componente.data_CRIA = new Date();
      componente.inativo = false;
      componente.cod_REF = this.cod_ref;
      componente.nome_REF = this.nome_ref;
      componente.id_FORNECEDOR = this.id_fornecedor;
      componente.id_UNIDADE_ADITIVO = this.medidas_valor_adicao;
      if (this.componente_check && this.aditivo_check) {
        componente.tipo = "T";
      } else if (this.componente_check && !this.aditivo_check) {
        componente.tipo = "C";
      } else if (!this.componente_check && this.aditivo_check) {
        componente.tipo = "A";
      } else {
        componente.tipo = "";
      }

      this.ABDICCOMPONENTEService.create(componente).subscribe(
        res => {

          this.simular(this.inputnotifi);
          this.router.navigate(['componentes/view'], { queryParams: { id: res.id_COMPONENTE } });

        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      componente = this.componentes_dados;
      componente.obs = this.obs;
      componente.id_UNIDADE_COMPONENTE = this.medidas_valor;
      componente.nome_COMPONENTE = this.nome;
      componente.data_ULT_MODIF = new Date();
      componente.utz_ULT_MODIF = this.user;
      componente.cod_REF = this.cod_ref;
      componente.nome_REF = this.nome_ref;
      componente.id_FORNECEDOR = this.id_fornecedor;
      componente.id_UNIDADE_ADITIVO = this.medidas_valor_adicao;
      if (this.componente_check && this.aditivo_check) {
        componente.tipo = "T";
      } else if (this.componente_check && !this.aditivo_check) {
        componente.tipo = "C";
      } else if (!this.componente_check && this.aditivo_check) {
        componente.tipo = "A";
      } else {
        componente.tipo = "";
      }
      this.ABDICCOMPONENTEService.update(componente).then(() => {

        this.simular(this.inputgravou);

        this.router.navigate(['componentes/view'], { queryParams: { id: id } });
      });

    }
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
    this.i = this.i % this.componente.length;
    if (this.componente.length > 0) {
      this.inicia(this.componente[this.i]);
      this.router.navigate(['componentes/view'], { queryParams: { id: this.componente[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.componente.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['componentes/view'], { queryParams: { id: this.componente[this.i] } });
    if (this.componente.length > 0) {
      this.inicia(this.componente[this.i]);
    }
  }
  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var componente = new AB_DIC_COMPONENTE;
        componente = this.componentes_dados;
        componente.utz_ANULACAO = this.user;
        componente.data_ANULACAO = new Date();
        componente.inativo = true;
        this.ABDICCOMPONENTEService.update(componente).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['componentes']);
        });
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