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
  medidas_consumo: any;
  fator_conversao;
  fator_multiplicacao;
  aditivo_check: boolean;
  cisterna_check: boolean;
  componente_check: boolean;
  fornecedores: any[];
  id_fornecedor;
  cod_ref;
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
  cod_ref_substituta;
  nome_ref_substituta = "";


  constructor(private GERFORNECEDORService: GERFORNECEDORService, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private confirmationService: ConfirmationService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {


    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node011duplicar"));

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

      //preenche combobox componentes_silver

      this.ABDICCOMPONENTEService.getComponentes().subscribe(
        response => {
          this.componentes_silver = [];
          this.componentes_silver.push({ label: 'Sel. Ref. Comp.', value: "" });
          for (var x in response) {
            this.componentes_silver.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: { valor: response[x].PROREF, UNISTO: response[x].UNISTO } });
          }
          this.componentes_silver = this.componentes_silver.slice();
          this.carrega_fornecedores(id, false);

        }, error => {
          this.carrega_fornecedores(id, false);
          console.log(error);
        });

    } else {
      this.ABDICCOMPONENTEService.getComponentes().subscribe(
        response => {
          this.componentes_silver = [];
          this.componentes_silver.push({ label: 'Sel. Ref. Comp.', value: "" });
          for (var x in response) {
            this.componentes_silver.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: { valor: response[x].PROREF, UNISTO: response[x].UNISTO } });
          }
          this.componentes_silver = this.componentes_silver.slice();
          this.carrega_fornecedores(id, true);

        }, error => {
          this.carrega_fornecedores(id, true);
          console.log(error);
        });
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

  carrega_fornecedores(id, novo) {
    //preenche combobox fornecedores

    this.GERFORNECEDORService.getAll().subscribe(
      response => {
        this.fornecedores = [];
        this.fornecedores.push({ label: 'Sel. Fornecedor', value: "" });
        for (var x in response) {
          this.fornecedores.push({ label: response[x].nome_FORNECEDOR, value: response[x].id_FORNECEDOR });
          this.carrega_unidade(id, novo);
        }
        this.fornecedores = this.fornecedores.slice();
      }, error => {
        this.carrega_unidade(id, novo);
        console.log(error);
      });
  }

  carrega_unidade(id, novo) {
    //preenche combobox unidades
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {

        this.medidas = [];

        this.medidas.push({ label: 'Sel. Uni. de Medida', value: "" });
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
        if (!novo) this.carrega_tudo(id);
      }, error => {
        if (!novo) this.carrega_tudo(id);
        console.log(error);
      });
  }

  carrega_tudo(id) {
    //preenche array para navegar nos componentees 
    this.ABDICCOMPONENTEService.getAll("T").subscribe(
      response => {
        for (var x in response) {
          this.componente.push(response[x].id_COMPONENTE);
        }

        this.i = this.componente.indexOf(+id);
        this.inicia(this.componente[this.i]);

      }, error => {
        console.log(error);
      });
  }
  //preenche no ref
  cod_refe(event) {
    this.nome_ref = "";
    this.nome_ref = this.componentes_silver.find(item => item.value == event.value).label.split(" - ")[1];
    this.medidas_consumo = this.componentes_silver.find(item => item.value == event.value).value.UNISTO;
  }

  //preenche no ref
  cod_refesubstituta(event) {
    this.nome_ref_substituta = "";
    this.nome_ref_substituta = this.componentes_silver.find(item => item.value == event.value).label.split(" - ")[1];

  }

  //preenche dados com o id
  inicia(id) {
    var fator_multiplicacao = 0;
    var fator_conversao = 0;
    if (id != 0 && id != "undefined") {
      this.ABDICCOMPONENTEService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir componentes com o id
          if (count > 0) {
            this.componentes_dados = response[0];
            for (var x in response) {
              this.codigo = response[x].id_COMPONENTE;
              this.data = this.formatDate(response[x].data_ULT_MODIF);
              this.nome = response[x].nome_COMPONENTE;
              this.medidas_valor = response[x].id_UNIDADE_COMPONENTE;
              this.obs = response[x].obs;
              var codcod = "";
              var codcods = "";
              if (this.componentes_silver.find(item => item.value.valor == response[x].cod_REF)) {
                codcod = this.componentes_silver.find(item => item.value.valor == response[x].cod_REF).value;
              }
              if (this.componentes_silver.find(item => item.value.valor == response[x].cod_REF_SUBSTITUTA)) {
                codcods = this.componentes_silver.find(item => item.value.valor == response[x].cod_REF_SUBSTITUTA).value;
              }
              this.cod_ref = (response[x].cod_REF != null && response[x].cod_REF != "") ? codcod : "";

              this.cod_ref_substituta = (response[x].cod_REF_SUBSTITUTA != null && response[x].cod_REF_SUBSTITUTA != "") ? codcods : "";
              this.nome_ref = response[x].nome_REF;
              this.nome_ref_substituta = response[x].nome_REF_SUBSTITUTA;
              this.medidas_consumo = response[x].unisto;
              this.id_fornecedor = response[x].id_FORNECEDOR;
              this.medidas_valor_adicao = response[x].id_UNIDADE_ADITIVO;
              this.cisterna_check = response[x].cisterna;

              if (response[x].factor_MULTIPLICACAO_AGUA != null) fator_multiplicacao = response[x].factor_MULTIPLICACAO_AGUA;
              this.fator_multiplicacao = fator_multiplicacao.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');

              if (response[x].factor_CONVERSAO != null) fator_conversao = response[x].factor_CONVERSAO;
              this.fator_conversao = fator_conversao.toLocaleString(undefined, { minimumFractionDigits: 4 }).replace(/\s/g, '');

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
      componente.cod_REF = (this.cod_ref) ? this.cod_ref.valor : "";
      componente.cod_REF_SUBSTITUTA = (this.cod_ref_substituta) ? this.cod_ref_substituta.valor : "";
      componente.nome_REF = this.nome_ref;
      componente.nome_REF_SUBSTITUTA = this.nome_ref_substituta;
      componente.unisto = this.medidas_consumo;
      componente.id_FORNECEDOR = this.id_fornecedor;
      componente.id_UNIDADE_ADITIVO = this.medidas_valor_adicao;
      componente.cisterna = this.cisterna_check;
      var fator = 0;
      var fatorconvers = 0;
      if (this.fator_multiplicacao != null) fator = parseFloat(String(this.fator_multiplicacao).replace(",", "."));
      if (this.fator_conversao != null) fatorconvers = parseFloat(String(this.fator_conversao).replace(",", "."));
      componente.factor_MULTIPLICACAO_AGUA = fator;
      componente.factor_CONVERSAO = fatorconvers;
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
      componente.cod_REF = this.cod_ref.valor;
      componente.cod_REF_SUBSTITUTA = this.cod_ref_substituta.valor;
      componente.nome_REF = this.nome_ref;
      componente.nome_REF_SUBSTITUTA = this.nome_ref_substituta;
      componente.unisto = this.medidas_consumo;
      componente.id_FORNECEDOR = this.id_fornecedor;
      componente.id_UNIDADE_ADITIVO = this.medidas_valor_adicao;
      componente.cisterna = this.cisterna_check;
      var fator = 0;
      var fatorconvers = 0;
      if (this.fator_multiplicacao != null) fator = parseFloat(String(this.fator_multiplicacao).replace(",", "."));
      if (this.fator_conversao != null) fatorconvers = parseFloat(String(this.fator_conversao).replace(",", "."));
      componente.factor_CONVERSAO = fatorconvers;
      componente.factor_MULTIPLICACAO_AGUA = fator;
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