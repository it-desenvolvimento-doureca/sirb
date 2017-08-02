import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_UTILIZADORES } from "app/entidades/GER_UTILIZADORES";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";

@Component({
  selector: 'app-utlform',
  templateUrl: './utlform.component.html',
  styleUrls: ['./utlform.component.css']
})
export class UtlformComponent implements OnInit {

  i: any;
  utilizador: any = [];
  utilizadores_dados: GER_UTILIZADORES;
  modoedicao = false;
  novo = false;
  nome = "";
  login = "";
  id_utl;
  email = "";
  password = null;
  num_existe = false;
  class_numexiste = "";
  user;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private confirmationService: ConfirmationService, private router: Router, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


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
      this.id_utl = 0;
      this.email = "";
      this.password = 0;
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nos utilizadores 
      this.GERUTILIZADORESService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.utilizador.push(response[x].id_UTILIZADOR);
          }

          this.i = this.utilizador.indexOf(+id);
          this.inicia(this.utilizador[this.i]);
        }, error => { console.log(error); });

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
        var dirtyFormID = 'formUtilizador';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }
  }

  //preenche dados com o id
  inicia(id) {
    if (id != 0 && id != "undefined") {
      this.GERUTILIZADORESService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir utilizadores com o id
          if (count > 0) {
            this.utilizadores_dados = response[0];
            for (var x in response) {
              this.id_utl = response[x].id_UTILIZADOR;
              this.nome = response[x].nome_UTILIZADOR;
              this.email = response[x].email;
              this.password = response[x].password;
              this.login = response[x].login;
            }
          } else {
            this.router.navigate(['utilizadores']);
          }
        },
        error => { console.log(error); });
    } else {
      this.router.navigate(['utilizadores']);
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  resetclass() {
    this.num_existe = false;
    this.class_numexiste = "";
  }

  //bt gravar
  gravar() {
    var utilizador = new GER_UTILIZADORES;

    if (this.novo) {

      utilizador.nome_UTILIZADOR = this.nome;
      utilizador.login = this.login;
      utilizador.password = this.password;
      utilizador.data_CRIA = new Date();
      utilizador.email = this.email;
      utilizador.inativo = false;
      utilizador.admin = false;

      //verifica se existe utilizadro com o mesmo login
      this.GERUTILIZADORESService.getbyLogin(this.login).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 0) {
            this.GERUTILIZADORESService.create(utilizador).subscribe(
              res => {
                this.simular(this.inputnotifi);
                this.router.navigate(['utilizadores/view'], { queryParams: { id: res.id_UTILIZADOR } });
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

      utilizador = this.utilizadores_dados;
      utilizador.nome_UTILIZADOR = this.nome;
      utilizador.login = this.login;
      utilizador.password = this.password;
      utilizador.email = this.email;

      //verifica se existe utilizadro com o mesmo login
      this.GERUTILIZADORESService.verifica_login(id, this.login).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 0) {
            this.GERUTILIZADORESService.update(utilizador).then(() => {
              this.simular(this.inputgravou);
              this.router.navigate(['utilizadores/view'], { queryParams: { id: id } });
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
    this.i = this.i % this.utilizador.length;
    if (this.utilizador.length > 0) {
      this.inicia(this.utilizador[this.i]);
      this.router.navigate(['utilizadores/view'], { queryParams: { id: this.utilizador[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.utilizador.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['utilizadores/view'], { queryParams: { id: this.utilizador[this.i] } });
    if (this.utilizador.length > 0) {
      this.inicia(this.utilizador[this.i]);
    }
  }
  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var utilizador = new GER_UTILIZADORES;
        utilizador = this.utilizadores_dados;
        utilizador.inativo = true;
        utilizador.utz_ANULACAO = this.user;
        utilizador.data_ANULACAO = new Date();
        this.GERUTILIZADORESService.update(utilizador).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['utilizadores']);
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