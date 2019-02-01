import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ConfirmationService } from "primeng/primeng";
import { AB_DIC_TINA } from "app/entidades/AB_DIC_TINA";
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICZONAService } from "app/servicos/ab-dic-zona.service";

@Component({
  selector: 'app-tinasform',
  templateUrl: './tinasform.component.html',
  styleUrls: ['./tinasform.component.css']
})
export class TinasformComponent implements OnInit {
  zonas: any;
  cor_linha: any;
  linha: any;
  zona: any;
  linhas: any[];

  i: any;
  tina: any = [];
  tinas_dados: AB_DIC_TINA;
  modoedicao = false;
  novo = false;
  capacidade;
  codigo = "";
  data = null;
  obs = "";
  user;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private ABDICZONAService: ABDICZONAService, private ABDICLINHAService: ABDICLINHAService, private confirmationService: ConfirmationService, private router: Router, private ABDICTINAService: ABDICTINAService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


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
    

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node010duplicar"));

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;
      this.codigo = "";
      this.data = 0;
      this.capacidade = 0;
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nos tinas 
      this.ABDICTINAService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.tina.push(response[x].id_TINA);
          }

          this.i = this.tina.indexOf(+id);
          this.incia(this.tina[this.i]);
        }, error => { console.log(error); });

    }

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {

        this.linhas = [];
        this.linhas.push({ label: 'Seleccione Linha', value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA, cor: response[x].cor });
        }
        this.linha = this.globalVar.getlinha();
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    //preenche combobox zonas
    this.zonas = [];
    this.zonas.push({ label: 'Seleccione Zona', value: "" });
    this.ABDICZONAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.zonas.push({ value: response[x].id_ZONA, label: response[x].nome_ZONA });
        }
        this.zonas = this.zonas.slice();
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
        var dirtyFormID = 'formTina';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }
  }

  //preenche dados com o id
  incia(id) {
    if (id != 0 && id != "undefined") {
      this.ABDICTINAService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir tinas com o id
          if (count > 0) {
            this.tinas_dados = response[0][0];
            for (var x in response) {
              this.codigo = response[x][0].cod_TINA;
              this.data = this.formatDate(response[x][0].data_ULT_MODIF);
              this.capacidade = response[x][0].capacidade;
              this.linha = response[x][0].id_LINHA;
              this.zona = response[x][0].id_ZONA;
              this.obs = response[x][0].obs;
              this.cor_linha = response[x][1].cor;
            }
          } else {
            this.router.navigate(['tinas']);
          }
        },
        error => { console.log(error); });
    } else {
      this.router.navigate(['tinas']);
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //bt gravar
  gravar() {
    var tina = new AB_DIC_TINA;

    if (this.novo) {
      tina.obs = this.obs;
      tina.data_ULT_MODIF = new Date();
      tina.utz_CRIA = this.user;
      tina.data_CRIA = new Date();
      tina.capacidade = this.capacidade;
      tina.cod_TINA = this.codigo;
      tina.id_LINHA = this.linha;
      tina.id_ZONA = this.zona;
      tina.inativo = false;

      this.ABDICTINAService.create(tina).subscribe(
        res => {

          this.simular(this.inputnotifi);
          this.router.navigate(['tinas/view'], { queryParams: { id: res.id_TINA } });
        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      tina = this.tinas_dados;
      tina.obs = this.obs;
      tina.capacidade = this.capacidade;
      tina.cod_TINA = this.codigo;
      tina.data_ULT_MODIF = new Date();
      tina.utz_ULT_MODIF = this.user;
      tina.id_LINHA = this.linha;
      tina.id_ZONA = this.zona;

      this.ABDICTINAService.update(tina).then(() => {
        this.simular(this.inputgravou);
        this.router.navigate(['tinas/view'], { queryParams: { id: id } });
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
    this.i = this.i % this.tina.length;
    if (this.tina.length > 0) {
      this.incia(this.tina[this.i]);
      this.router.navigate(['tinas/view'], { queryParams: { id: this.tina[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.tina.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['tinas/view'], { queryParams: { id: this.tina[this.i] } });
    if (this.tina.length > 0) {
      this.incia(this.tina[this.i]);
    }
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        var tina = new AB_DIC_TINA;
        tina = this.tinas_dados;
        tina.inativo = true;
        tina.utz_ANULACAO = this.user;
        tina.data_ANULACAO = new Date();
        this.ABDICTINAService.update(tina).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['tinas']);
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

  //só deixa introduzir numeros no código tina
  mascara(event) {
   /* if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 45) {
      return true;
    } else {
      return false
    }*/
  }

  alteracorlinha(event) {
    if (event.value != null) {
      this.cor_linha = this.linhas.find(item => item.value == event.value).cor;
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

}