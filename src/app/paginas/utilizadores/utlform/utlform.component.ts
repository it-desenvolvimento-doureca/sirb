import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_UTILIZADORES } from "app/entidades/GER_UTILIZADORES";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location } from '@angular/common';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { GERUTZPERFILService } from "app/servicos/ger-utz-perfil.service";
import { GERPERFILCABService } from "app/servicos/ger-perfil-cab.service";
import { GER_UTZ_PERFIL } from "app/entidades/GER_UTZ_PERFIL";
import { GERMODULOService } from "app/servicos/ger-modulo.service";

@Component({
  selector: 'app-utlform',
  templateUrl: './utlform.component.html',
  styleUrls: ['./utlform.component.css']
})
export class UtlformComponent implements OnInit {
  pass_jasper;
  user_jasper;
  code_user = null;
  users_silver: any = [];
  users_ldap = [];
  id_modulo = 0;
  modulos = [{ label: "Seleccione Módulo", value: 0 }];
  sourcePerfil: any[];
  targetPerfil: any[];

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
  code_existe = false;
  class_numexiste = "";
  class_codexiste = "";
  user;
  administrador = false;
  bloqueado = false;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  user_WINDOWS: string;
  class_numexiste2: string;
  num_existe2: boolean;

  constructor(private GERMODULOService: GERMODULOService, private GERUTZPERFILService: GERUTZPERFILService, private GERPERFILCABService: GERPERFILCABService, private confirmationService: ConfirmationService, private router: Router, private GERUTILIZADORESService: GERUTILIZADORESService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


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
    //carregar modulos
    this.GERMODULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.modulos.push({ label: response[x].nome_MODULO, value: response[x].id_MODULO });
        }
        this.modulos = this.modulos.slice();
      },
      error => console.log(error));

    //carregar utilizadores silver
    this.GERUTILIZADORESService.getAllfromsilver().subscribe(
      response => {
        this.users_silver.push({ label: '--', value: null });
        for (var x in response) {
          this.users_silver.push({ label: response[x].RESCOD + ' - ' + response[x].RESDES, value: response[x].RESCOD });
        }
        this.users_silver = this.users_silver.slice();
      },
      error => console.log(error));

    //carregar utilizadores LDAP
    this.GERUTILIZADORESService.getGER_UTILIZADORESLDAP().subscribe(
      response => {
        this.users_ldap.push({ label: '--', value: null });
        for (var x in response) {
          this.users_ldap.push({ label: response[x].NOME, value: response[x].ID });
        }
        this.users_ldap = this.users_ldap.slice();
      },
      error => console.log(error));

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node10duplicar"));

  }

  //ao alterar combo modulo
  atualizaperfil() {
    this.preencheListas();
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
              this.telefone = response[x].telefone;
              this.area = response[x].area;
              this.password = atob(response[x].password);
              this.login = response[x].login;
              this.administrador = response[x].admin;
              this.bloqueado = response[x].bloqueado;
              this.code_user = response[x].cod_UTZ;
              this.user_jasper = response[x].user_JASPER;
              this.user_WINDOWS = response[x].user_WINDOWS;
              if (response[x].pass_JASPER != null) {
                this.pass_jasper = atob(response[x].pass_JASPER);
              } else {
                this.pass_jasper = "";
              }
            }
            this.preencheListas();
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

  resetclass2() {
    this.num_existe2 = false;
    this.class_numexiste2 = "";
  }

  resetclasscode() {
    this.code_existe = false;
    this.class_codexiste = "";
  }
  //bt gravar
  gravar() {
    var utilizador = new GER_UTILIZADORES;

    if (this.novo) {

      utilizador.nome_UTILIZADOR = this.nome;
      utilizador.login = this.login;
      utilizador.password = btoa(this.password);
      utilizador.data_CRIA = new Date();
      utilizador.email = this.email;
      utilizador.telefone = this.telefone;
      utilizador.area = this.area;
      utilizador.inativo = false;
      utilizador.admin = this.administrador;
      utilizador.bloqueado = this.bloqueado;
      utilizador.cod_UTZ = this.code_user;
      utilizador.user_JASPER = this.user_jasper;
      utilizador.user_WINDOWS = this.user_WINDOWS;
      utilizador.pass_JASPER = btoa(this.pass_jasper);

      //verifica se existe utilizador com o mesmo login
      this.GERUTILIZADORESService.getbyLogin(this.login).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 0) {
            //verifica se existe utilizador com o mesmo codigo
            this.GERUTILIZADORESService.getbyLogincode(this.code_user).subscribe(
              res => {
                var count2 = Object.keys(res).length;
                if (count2 == 0) {

                  //verifica se existe algum utilizador com o mesmo LDAP
                  this.GERUTILIZADORESService.getbyLoginLDAP(this.user_WINDOWS).subscribe(
                    res2 => {
                      var count3 = Object.keys(res2).length;
                      if (count3 == 0) {

                        this.GERUTILIZADORESService.create(utilizador).subscribe(
                          res => {
                            this.simular(this.inputnotifi);
                            this.router.navigate(['utilizadores/editar'], { queryParams: { id: res.id_UTILIZADOR } });
                          },
                          error => { console.log(error); this.simular(this.inputerro); });
                      } else {
                        this.num_existe2 = true;
                        this.class_numexiste2 = "codeexiste";
                      }
                    },
                    error => { console.log(error); this.simular(this.inputerro); });
                } else {
                  this.code_existe = true;
                  this.class_codexiste = "codeexiste";
                }
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
      utilizador.password = btoa(this.password);
      utilizador.email = this.email;
      utilizador.telefone = this.telefone;
      utilizador.area = this.area;
      utilizador.admin = this.administrador;
      utilizador.bloqueado = this.bloqueado;
      utilizador.cod_UTZ = this.code_user;
      utilizador.user_JASPER = this.user_jasper;
      utilizador.user_WINDOWS = this.user_WINDOWS;
      utilizador.pass_JASPER = btoa(this.pass_jasper);

      //verifica se existe utilizador com o mesmo login
      this.GERUTILIZADORESService.verifica_login(id, this.login).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 0) {
            //verifica se existe utilizador com o mesmo codigo
            this.GERUTILIZADORESService.verifica_code(id, this.code_user).subscribe(
              res => {
                var count2 = Object.keys(res).length;
                if (count2 == 0) {

                  //verifica se existe algum utilizador com o mesmo LDAP
                  this.GERUTILIZADORESService.verifica_LDAP(id, this.user_WINDOWS).subscribe(
                    res2 => {
                      var count3 = Object.keys(res2).length;
                      if (count3 == 0) {
                        this.GERUTILIZADORESService.update(utilizador).then(() => {
                          this.simular(this.inputgravou);
                          this.router.navigate(['utilizadores/view'], { queryParams: { id: id } });
                        });
                      } else {
                        this.num_existe2 = true;
                        this.class_numexiste2 = "codeexiste";
                      }
                    },
                    error => { console.log(error); this.simular(this.inputerro); });
                } else {
                  this.code_existe = true;
                  this.class_codexiste = "codeexiste";
                }
              },
              error => { console.log(error); this.simular(this.inputerro); });
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

  //ao inserir nos perfis de utilizador
  onMoveToTarget(e) {
    var x;
    for (x in e.items) {
      var perf = new GER_UTZ_PERFIL;
      perf.id_PERFIL = e.items[x].id;
      perf.id_UTZ = this.id_utl;
      this.GERUTZPERFILService.create(perf).subscribe(
        res => {
          if (x == e.items.length) {
            this.preencheListas();
          }
        },
        error => { console.log(error); });
    }

  }
  //ao mover para perfis 
  onMoveToSource(e) {
    var x;
    for (x in e.items) {
      this.GERUTZPERFILService.delete(e.items[x].id).then(() => {
        if (x == (e.items.length - 1)) {
          this.preencheListas();
        }
      });
    }
  }

  preencheListas() {
    this.sourcePerfil = [];
    this.targetPerfil = [];
    this.GERPERFILCABService.getAllbyid(this.id_utl, this.id_modulo).subscribe(
      response => {
        for (var x in response) {
          this.sourcePerfil.push({ modulo: response[x][1].nome_MODULO, nome: response[x][0].nome_PERFIL, id: response[x][0].id_PERFIL_CAB });
        }
        this.sourcePerfil = this.sourcePerfil.slice();
      }, error => { console.log(error); });

    this.GERUTZPERFILService.getAllbyid(this.id_utl).subscribe(
      response => {
        for (var x in response) {
          this.targetPerfil.push({ modulo: response[x][1].nome_MODULO, nome: response[x][2].nome_PERFIL, id: response[x][0].id_PERFIL_UTZ });
        }
        this.targetPerfil = this.targetPerfil.slice();
      }, error => { console.log(error); });

  }


}