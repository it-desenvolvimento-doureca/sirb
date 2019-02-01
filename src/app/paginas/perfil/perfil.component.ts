import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_UTILIZADORES } from "app/entidades/GER_UTILIZADORES";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  pass_jasper: string;
  user_jasper: string;

  i: any;
  utilizador: any = [];
  utilizadores_dados: GER_UTILIZADORES;
  modoedicao = false;
  novo = false;
  nome = "";
  login = "";
  id_utl;
  email = "";
  telefone = "";
  area = "";
  password = null;
  num_existe = false;
  class_numexiste = "";
  user;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private confirmationService: ConfirmationService, private router: Router, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setapagar(false);
    this.globalVar.setcriar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setdisEditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;
      this.id_utl = 0;
      this.email = "";
      this.telefone = "";
      this.area = "";
      this.password = 0;
    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        //this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else {
        this.modoedicao = false;
      }
    }

    this.GERUTILIZADORESService.getbyID(this.user).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir utilizadores com o id
        if (count > 0) {
          this.utilizadores_dados = response[0];
          for (var x in response) {
            this.id_utl = response[x].id_UTILIZADOR;
            this.nome = response[x].nome_UTILIZADOR;
            this.email = response[x].email;
            this.telefone = response[x].telefone;
            this.area = response[x].area;
            this.password = atob(response[x].password);
            this.login = response[x].login;
            this.user_jasper = response[x].user_JASPER;
            if (response[x].pass_JASPER != null) {
              this.pass_jasper = atob(response[x].pass_JASPER);
            } else {
              this.pass_jasper = "";
            }

          }
        } else {
          this.router.navigate(['home']);
        }
      },
      error => { console.log(error); });
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

    var id = this.user;

    utilizador = this.utilizadores_dados;
    utilizador.nome_UTILIZADOR = this.nome;
    utilizador.login = this.login;
    utilizador.password = btoa(this.password);
    utilizador.email = this.email;
    utilizador.telefone = this.telefone;
    utilizador.area = this.area;
    utilizador.user_JASPER = this.user_jasper;
    utilizador.pass_JASPER = btoa(this.pass_jasper);

    //verifica se existe utilizadro com o mesmo login
    this.GERUTILIZADORESService.verifica_login(id, this.login).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.GERUTILIZADORESService.update(utilizador).then(() => {
            this.simular(this.inputgravou);
            this.router.navigate(['perfil/view']);
          });
        } else {
          this.num_existe = true;
          this.class_numexiste = "num_existe";
        }
      },
      error => { console.log(error); this.simular(this.inputerro); });

  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}