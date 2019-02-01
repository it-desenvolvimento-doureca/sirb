import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { Location } from '@angular/common';
import { GERUTILIZADORESService } from '../../../../servicos/ger-utilizadores.service';
import { GER_GRUPO_UTZ } from '../../../../entidades/GER_GRUPO_UTZ';
import { GERGRUPOUTZService } from '../../../../servicos/ger-grupo-utz.service';
import { GER_GRUPO } from '../../../../entidades/GER_GRUPO';
import { GERGRUPOService } from '../../../../servicos/ger-grupo.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-form-grupos',
  templateUrl: './form-grupos.component.html',
  styleUrls: ['./form-grupos.component.css']
})
export class FormGruposComponent implements OnInit {
  novo: boolean;
  modoedicao: boolean;
  sourceUtilizador: any[];
  targetUtilizador = [];
  user: any;
  id_grupo: number;
  descricao: string;


  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  i: any;
  grupos: any = [];
  grupo: GER_GRUPO;

  constructor(private confirmationService: ConfirmationService, private GERGRUPOService: GERGRUPOService, private GERGRUPOUTZService: GERGRUPOUTZService, private GERUTILIZADORESService: GERUTILIZADORESService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private location: Location, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setcriar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19apagar"));

    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");


    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      this.novo = false;

      if (id == 0) {
        this.router.navigate(['grupos']);
      }

    }
    if (urlarray[1].match("editar")) {
      this.modoedicao = true;
      this.globalVar.setseguinte(false);
      this.globalVar.setanterior(false);
    } else if (urlarray[1].match("novo")) {
      this.globalVar.setapagar(false);
      this.globalVar.setcriar(true);
      this.globalVar.setseguinte(false);
      this.globalVar.setanterior(false);
      this.novo = true;
      this.globalVar.seteditar(false);
      this.modoedicao = true;
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    if (this.novo) {
      this.getutilizadores();
    } else {

      //preenche array para navegar nos utilizadores 
      this.GERGRUPOService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.grupos.push(response[x].id);
          }

          this.i = this.grupos.indexOf(+id);
          this.inicia(this.grupos[this.i]);

        }, error => { console.log(error); this.inicia(id); });

    }

  }

  inicia(id) {
    this.GERGRUPOService.getByid(id).subscribe(
      response => {
        for (var x in response) {
          this.grupo = response[x];
          this.descricao = response[x].descricao;
          this.id_grupo = response[x].id;
          this.preencheListas(this.id_grupo);
        }
      },
      error => console.log(error));

  }



  gravar() {
    var grupo = new GER_GRUPO;
    if (!this.novo) grupo = this.grupo;
    grupo.descricao = this.descricao;
    grupo.inativo = false;
    grupo.utz_ULT_MODIF = this.user;
    grupo.data_ULT_MODIF = new Date();

    if (this.novo) {
      grupo.utz_CRIA = this.user;
      grupo.data_CRIA = new Date();
      this.GERGRUPOService.create(grupo).subscribe(
        res => {
          for (var x in this.targetUtilizador) {
            var perf = new GER_GRUPO_UTZ;
            perf.id_UTZ = this.targetUtilizador[x].id;
            perf.id_GRUPO = res.id;
            this.inserirtarget(x, perf, res.id);
          }
        },
        error => {
          this.simular(this.inputerro);
          console.log(error);
        });

    } else {
      grupo.id = this.id_grupo
      this.GERGRUPOService.update(grupo).then(
        res => {
          this.router.navigate(['grupos/view'], { queryParams: { id: this.id_grupo } });
          this.simular(this.inputgravou);
        },
        error => {
          this.simular(this.inputerro);
          console.log(error);
        });
    }
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.grupos.length;
    if (this.grupos.length > 0) {
      this.inicia(this.grupos[this.i]);
      this.router.navigate(['grupos/view'], { queryParams: { id: this.grupos[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.grupos.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['grupos/view'], { queryParams: { id: this.grupos[this.i] } });
    if (this.grupos.length > 0) {
      this.inicia(this.grupos[this.i]);
    }
  }

  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var grupo = new GER_GRUPO;
        grupo = this.grupo;
        grupo.descricao = this.descricao;
        grupo.inativo = true;
        grupo.id = this.id_grupo
        grupo.utz_APAGA = this.user;
        grupo.data_APAGA = new Date();
        this.GERGRUPOService.update(grupo).then(
          res => {
            this.simular(this.inputapagar);
            this.router.navigate(['grupos']);
          },
          error => {
            this.simular(this.inputerro);
            console.log(error);
          });

      }
    });
  }

  inserirtarget(x, perf, id) {
    this.GERGRUPOUTZService.create(perf).subscribe(
      res => {
        if (x == (this.targetUtilizador.length - 1)) {
          this.simular(this.inputnotifi);
          this.router.navigate(['grupos/view'], { queryParams: { id: id } });
        }
      },
      error => {
        if (x == (this.targetUtilizador.length - 1)) {
          this.simular(this.inputnotifi);
          this.router.navigate(['grupos/view'], { queryParams: { id: id } });
        }
        console.log(error);
      });
  }

  getutilizadores() {
    this.sourceUtilizador = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.sourceUtilizador.push({ nome: response[x].nome_UTILIZADOR, id: response[x].id_UTILIZADOR });

        }
        this.sourceUtilizador = this.sourceUtilizador.slice();
      },
      error => console.log(error));
  }

  //ao inserir nos perfis de utilizador
  onMoveToTarget(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        var perf = new GER_GRUPO_UTZ;
        perf.id_UTZ = e.items[x].id_UTZ;
        perf.id_GRUPO = this.id_grupo;
        this.GERGRUPOUTZService.create(perf).subscribe(
          res => {
            if (x == (e.items.length - 1)) {
              if (!this.novo) this.preencheListas(this.id_grupo);
            }
          },
          error => { console.log(error); });
      }
    }

  }

  //ao retirar do grupo
  onMoveToSource(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        this.GERGRUPOUTZService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            if (!this.novo) this.preencheListas(this.id_grupo);
          }
        });
      }
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  preencheListas(id) {
    this.sourceUtilizador = [];
    this.targetUtilizador = [];
    this.GERGRUPOUTZService.getUtilizadores(this.id_grupo).subscribe(
      response => {
        for (var x in response) {
          this.sourceUtilizador.push({ nome: response[x].nome_UTILIZADOR, id_UTZ: response[x].id_UTILIZADOR });
        }
        this.sourceUtilizador = this.sourceUtilizador.slice();
      }, error => { console.log(error); });

    this.GERGRUPOUTZService.getbyidgrupo(id).subscribe(
      response => {
        for (var x in response) {

          this.targetUtilizador.push({ id: response[x][0].id, nome: response[x][1].nome_UTILIZADOR, id_UTZ: response[x][0].id_UTILIZADOR });

        }
        this.targetUtilizador = this.targetUtilizador.slice();
      },
      error => console.log(error));
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}
