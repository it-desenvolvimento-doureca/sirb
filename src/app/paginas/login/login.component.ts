import { Component, OnInit, ElementRef, ViewChild, Renderer, HostListener } from '@angular/core';
import { LoginService } from "app/servicos/LoginService";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url: any = "";
  encontrou: boolean = true;
  login_statuspopup: boolean;
  count = 1;
  user_code: string = "";
  user;
  password;
  erro = true;
  login_status = false;
  @ViewChild('dialogkeypad') dialogkeypad: ElementRef;
  @ViewChild('closedialoglinha') closedialog: ElementRef;
  @ViewChild('dialogopen') dialogopen: ElementRef;

  constructor(private route: ActivatedRoute, private renderer: Renderer, private GERPERFILLINService: GERPERFILLINService, private globalVar: AppGlobals, private elementRef: ElementRef, private service: LoginService, private utilizadores: GERUTILIZADORESService, private router: Router) { }

  ngOnInit() {
    this.globalVar.setlinha(0);
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);
    if (localStorage.getItem("userapp")) {
      this.router.navigate(['home']);
    }


    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.url = params['redirect_url'];
      });

  }

  iniciauser(response) {

    localStorage.setItem('userapp', JSON.stringify({
      user: response[0].login,
      nome: response[0].nome_UTILIZADOR, id: response[0].id_UTILIZADOR, pass: response[0].password,
      admin: response[0].admin, user_jasper: response[0].user_JASPER, pass_jasper: response[0].pass_JASPER
    }));
    localStorage.setItem('time_sgiid', JSON.stringify({ data: new Date() }));
    if (localStorage.getItem('userapp') || localStorage.getItem('time_sgiid')) {
      //carregar acessos
      this.GERPERFILLINService.getbyID_node(JSON.parse(localStorage.getItem('userapp'))["id"], "null").subscribe(
        response2 => {
          var count = Object.keys(response2).length;
          var array = [];
          if (count > 0) {
            for (var x in response2) {
              array.push({ node: response2[x].id_CAMPO });
              if (!(!JSON.parse(localStorage.getItem('userapp'))["admin"] && response2[x].id_CAMPO == "node1")) {
                var elem = (<HTMLInputElement>document.getElementById(response2[x].id_CAMPO));
                if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
              }
            }
            localStorage.setItem('acessos', JSON.stringify(array));
            location.reload(true);
            if (this.url != "" && this.url != null) {
              this.router.navigateByUrl(this.url);
            } else {
              this.router.navigate(['home']);
            }
          } else {
            localStorage.setItem('acessos', JSON.stringify(array));
            location.reload(true);
            if (this.url != "" && this.url != null) {
              this.router.navigateByUrl(this.url);
            } else {
              this.router.navigate(['home']);
            }

          }
          localStorage.setItem('acessos', JSON.stringify(array));
        }, error => { console.log(error); });
    }
  }

  login() {

    this.globalVar.setlinha(0);
    this.erro = true;
    this.login_status = true;
    this.utilizadores.getbyLogin(this.user).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 1) {
          if (response[0].user_WINDOWS == "" || response[0].user_WINDOWS == null) {
            if (atob(response[0].password) == this.password) {
              this.iniciauser(response);
            } else {
              this.erro = false;
              this.login_status = false;
            }
          } else {
            //LOGIN LDAP
            var data = [{ USER: this.user, PASSWORD: btoa(this.password) }];
            this.GERPERFILLINService.createGER_UTILIZADOREStesteLDAP(data).subscribe(result => {
              if (result) {
                this.iniciauser(response);
              } else {
                this.erro = false;
                this.login_status = false;
              }
            }, error => {
              console.log(error);
              this.erro = false;
              this.login_status = false;
            });

          }
        } else {
          this.erro = false;
          this.login_status = false;
        }
      },
      error => {
        this.erro = false;
        this.login_status = false;
        alert("Não possível fazer o Login! Erro de ligação.");
        console.log(error);
      });
  }

  //abrir popup key pad
  abrirdialog() {
    this.user_code = "";
    this.count = 1;
    this.simular(this.dialogkeypad);
  }

  //Tecla de limpar número
  undo() {
    if (!this.encontrou) this.encontrou = true;
    if (this.user_code != '') {
      this.user_code = this.user_code.slice(0, -1);
      this.count--;
    }
  }

  //adiciona número ao input de login
  marcar(element: string) {
    if (!this.encontrou) this.encontrou = true;
    if (this.count <= 4) {
      this.user_code += element;
      this.count++;
    }
  }

  //efectua o login a partir do keypad
  validar() {
    this.globalVar.setlinha(0);
    if (this.user_code != "" && this.user_code != null) {
      this.login_statuspopup = true;
      this.utilizadores.getbyLogincode(this.user_code).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count == 1) {
            localStorage.setItem('userapp', JSON.stringify({
              nome: response[0].nome_UTILIZADOR, id: response[0].id_UTILIZADOR, user: response[0].login,
              admin: response[0].admin, user_jasper: response[0].user_JASPER, pass_jasper: response[0].pass_JASPER
            }));
            localStorage.setItem('time_sgiid', JSON.stringify({ data: new Date() }));
            if (localStorage.getItem('userapp') || localStorage.getItem('time_sgiid')) {
              //carregar acessos
              this.GERPERFILLINService.getbyID_node(JSON.parse(localStorage.getItem('userapp'))["id"], "null").subscribe(
                response2 => {
                  var count = Object.keys(response2).length;
                  var array = [];
                  if (count > 0) {
                    for (var x in response2) {
                      array.push({ node: response2[x].id_CAMPO });
                      if (!(!JSON.parse(localStorage.getItem('userapp'))["admin"] && response2[x].id_CAMPO == "node1")) {
                        var elem = (<HTMLInputElement>document.getElementById(response2[x].id_CAMPO));
                        if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
                      }
                    }
                    localStorage.setItem('acessos', JSON.stringify(array));
                    location.reload(true);
                    if (this.url != "" && this.url != null) {
                      this.router.navigate([this.url]);
                    } else {
                      this.router.navigate(['home']);
                    }
                  } else {
                    localStorage.setItem('acessos', JSON.stringify(array));
                    location.reload(true);
                    if (this.url != "" && this.url != null) {
                      this.router.navigate([this.url]);
                    } else {
                      this.router.navigate(['home']);
                    }

                  }
                  localStorage.setItem('acessos', JSON.stringify(array));
                }, error => { console.log(error); });
            }
          } else {
            this.encontrou = false;
            this.login_statuspopup = false;
          }
        },
        error => {
          alert("Não possível fazer o Login! Erro de ligação.");
          console.log(error);
        }
      );
    }
  }

  //detecta evento tecclado escreve no popup se estiver aberto 
  @HostListener('window:keydown', ['$event'])
  doSomething(event) {
    if (this.dialogopen.nativeElement.style.display && this.dialogopen.nativeElement.style.display != "none") {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        this.marcar(event.key)
      } else if (event.keyCode == 13) {
        this.validar();
      } else if (event.keyCode == 8) {
        this.undo();
      } else {
        return false
      }
    }

  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
