import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { GER_FORNECEDOR } from "app/entidades/GER_FORNECEDOR";
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";
import { ConfirmationService } from "primeng/primeng";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fornecedores_silver: any;
  i: any;
  forne: any = [];
  fornecedor_dados: GER_FORNECEDOR;
  modoedicao = false;
  novo = false;
  nome = "";
  num_fornecedor;
  codigo;
  data = null;
  obs = "";
  num_existe = false;
  class_numexiste = "";
  user;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private confirmationService: ConfirmationService, private router: Router, private GERFORNECEDORService: GERFORNECEDORService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }

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

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013apagar"));

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;
      this.codigo = 0;
      this.data = 0;
      this.num_fornecedor = 0;
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nos fornecedores 
      this.GERFORNECEDORService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.forne.push(response[x].id_FORNECEDOR);
          }
          this.i = this.forne.indexOf(+id);
          this.inicia(this.forne[this.i]);
        }, error => { console.log(error); });

    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setcriar(true);
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setcriar(false);
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formfornecedor';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        //preenche combobox fornecedores_silver
        this.fornecedores_silver = [];
        this.fornecedores_silver.push({ label: 'Seleccione Fornecedor', value: "" });
        this.GERFORNECEDORService.getAll_silver().subscribe(
          response => {
            for (var x in response) {
              this.fornecedores_silver.push({ label: response[x].FOUCOD + ' - ' + response[x].ADRNOM, value: { id: response[x].FOUCOD, nome: response[x].ADRNOM } });
            }
            this.fornecedores_silver = this.fornecedores_silver.slice();
          },
          error => console.log(error));

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }

  }

  //preenche dados com o id
  inicia(id) {
    if (id != 0 && id != "undefined") {
      //preenche combobox fornecedores_silver
      this.fornecedores_silver = [];
      this.fornecedores_silver.push({ label: 'Seleccione Fornecedor', value: "" });
      this.GERFORNECEDORService.getAll_silver().subscribe(
        response => {
          for (var x in response) {
            this.fornecedores_silver.push({ label: response[x].FOUCOD + ' - ' + response[x].ADRNOM, value: { id: response[x].FOUCOD, nome: response[x].ADRNOM } });
          }
          this.fornecedores_silver = this.fornecedores_silver.slice();


          this.GERFORNECEDORService.getbyID(id).subscribe(
            response => {
              var count = Object.keys(response).length;
              //se existir forncedeor com o id
              if (count > 0) {
                this.fornecedor_dados = response[0];
                for (var x in response) {
                  this.codigo = response[x].id_FORNECEDOR;
                  this.data = new Date(response[x].data_ULT_MODIF).toLocaleDateString();
                  this.nome = response[x].nome_FORNECEDOR;
                  this.obs = response[x].obs;
                  this.num_fornecedor = (this.fornecedores_silver.find(item => item.value.id == response[x].num_FORNECEDOR)) ? this.fornecedores_silver.find(item => item.value.id == response[x].num_FORNECEDOR).value : null;
                }
              } else {
                this.router.navigate(['fornecedor']);
              }
            },
            error => { console.log(error); });
        },
        error => console.log(error));
    } else {
      this.router.navigate(['fornecedor']);
    }
  }


  //bt cancelar
  backview() {
    this.location.back();
  }

  resetclass(event) {
    this.nome = "";
    this.nome = event.value.nome;
    this.num_existe = false;
    this.class_numexiste = "";
  }

  //bt gravar
  gravar() {
    var fornecedor = new GER_FORNECEDOR;
    if (this.novo) {
      fornecedor.nome_FORNECEDOR = this.nome;
      fornecedor.obs = this.obs;
      fornecedor.data_ULT_MODIF = new Date();
      fornecedor.utz_CRIA = this.user;
      fornecedor.data_CRIA = new Date();
      fornecedor.inativo = false;


      //verifica se numero de fornecedor existe
      this.GERFORNECEDORService.verifica_num(this.num_fornecedor['id']).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir forncedeor com o id
          if (count == 0) {
            fornecedor.num_FORNECEDOR = this.num_fornecedor['id'];
            this.GERFORNECEDORService.create(fornecedor).subscribe(
              res => {
                this.simular(this.inputnotifi);
                this.router.navigate(['fornecedor/view'], { queryParams: { id: res.id_FORNECEDOR } });
              },
              error => { console.log(error); this.simular(this.inputerro); });
          } else {
            this.num_existe = true;
            this.class_numexiste = "num_existe";
          }
        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      fornecedor = this.fornecedor_dados;
      fornecedor.nome_FORNECEDOR = this.nome;
      fornecedor.obs = this.obs;
      fornecedor.id_FORNECEDOR = id;
      fornecedor.data_ULT_MODIF = new Date();
      fornecedor.utz_ULT_MODIF = this.user;
      fornecedor.num_FORNECEDOR = this.num_fornecedor['id'];
      //verifica se numero de fornecedor existe
      this.GERFORNECEDORService.verifica_num_fornece(id, this.num_fornecedor['id']).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir forncedeor com o id
          if (count == 0) {
            this.GERFORNECEDORService.update(fornecedor).then(() => {
              this.simular(this.inputgravou);
              this.router.navigate(['fornecedor/view'], { queryParams: { id: id } });
            });
          } else {
            this.num_existe = true;
            this.class_numexiste = "num_existe";
          }
        },
        error => { console.log(error); this.simular(this.inputerro); });
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
    this.i = this.i % this.forne.length;
    if (this.forne.length > 0) {
      this.inicia(this.forne[this.i]);
      this.router.navigate(['fornecedor/view'], { queryParams: { id: this.forne[this.i] } });
    }
  }


  anterior() {
    if (this.i === 0) {
      this.i = this.forne.length;
    }
    this.i = this.i - 1;

    if (this.forne.length > 0) {
      this.inicia(this.forne[this.i]);
      this.router.navigate(['fornecedor/view'], { queryParams: { id: this.forne[this.i] } });
    }
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var fornecedor = new GER_FORNECEDOR;
        fornecedor = this.fornecedor_dados;
        fornecedor.inativo = true;
        fornecedor.utz_ANULACAO = this.user;
        fornecedor.data_ANULACAO = new Date();

        this.GERFORNECEDORService.update(fornecedor).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['fornecedor']);
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
