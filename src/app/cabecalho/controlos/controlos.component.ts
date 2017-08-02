import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-controlos',
  templateUrl: './controlos.component.html',
  styleUrls: ['./controlos.component.css']
})
export class ControlosComponent implements OnInit {
  modo: string;
  currentpage: string;

  showGreeting;
  criar: boolean;
  voltar: boolean;
  editar: boolean;
  apagar: boolean;
  anterior: boolean;
  seguinte: boolean;
  pesquisar: boolean;
  location: Location;
  duplica : boolean;

  @Output() anteriorbt: EventEmitter<any> = new EventEmitter();
  @Output() seguintebt: EventEmitter<any> = new EventEmitter();
  @Output() apagarbt: EventEmitter<any> = new EventEmitter();
  @Output() duplicarbt: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private globalVar: AppGlobals, location: Location) {
    this.location = location;
  }

  ngOnInit() {

    this.showGreeting = this.globalVar.getmenu_edi();
    this.criar = this.globalVar.getcriar();
    this.anterior = this.globalVar.getanterior();
    this.voltar = this.globalVar.getvoltar();
    this.editar = this.globalVar.getleditar();
    this.apagar = this.globalVar.getapagar();
    this.seguinte = this.globalVar.getseguinte();
    this.voltar = this.globalVar.getvoltar();
    this.pesquisar = this.globalVar.getpesquisar();
    this.duplica = this.globalVar.getduplicar();



    var titlee = this.router.routerState.snapshot.url
    var pag = "";

    if (titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
      var titlearray = titlee.split("/");
      titlee = titlearray[0];
      this.currentpage = titlee;

      if (titlearray[1] != null) {
        if (titlearray[1].match("editar")) {
          this.modo = "edit";
          pag = " - Editar"
        }
        if (titlearray[1].match("novo")) {
          this.modo = "novo";
          pag = " - Novo"
        }
      }
    }
    if (titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
      var titlearray = titlee.split("/");
      titlee = titlearray[0];
      this.currentpage = titlee;
    }
  }

  getAcesso() {
    var acessos = this.router.routerState.snapshot.url

    if (acessos.charAt(0) === '/' && acessos.slice(1) != "dashboard") {
      acessos = acessos.slice(1);
      var acessosarray = acessos.split("/");
      acessos = acessosarray[0];
      this.showGreeting = false;
    } else {
      this.showGreeting = true;
    }
    /*for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === acessos) {

        if (this.globalVar.getleditar()) {
          this.editar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.editar = false;
        }
        if (this.globalVar.getcriar()) {
          this.criar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.criar = false;
        }
        if (this.globalVar.getapagar()) {
          this.apagar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.apagar = false;
        }

      }
    }*/

  }
  novo() {
    this.router.navigate([this.currentpage + '/novo']);

  }

  edita() {
    var page;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        page = params['id'] || 0;
      });
    this.router.navigate([this.currentpage + '/editar'], { queryParams: { id: page } });

  }
  backClicked() {
    //this.router.navigate([this.currentpage]);
    this.location.back();
  }


  anterior_func() {
    this.anteriorbt.emit()
  }
  seguinte_func() {
    this.seguintebt.emit()
  }
  apagar_func() {
    this.apagarbt.emit()
  }

  duplicar() {
    this.duplicarbt.emit()
  }


}
