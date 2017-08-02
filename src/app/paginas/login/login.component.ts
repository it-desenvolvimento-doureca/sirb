import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from "app/servicos/LoginService";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user;
  private password;
  private erro = true;

  constructor(private elementRef: ElementRef, private service: LoginService, private utilizadores: GERUTILIZADORESService, private router: Router) { }
 
  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);
    if (localStorage.getItem("userapp")) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.erro = true;
    this.utilizadores.getbyLogin(this.user).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 1) {
          if (response[0].password == this.password) {
            localStorage.setItem('userapp', JSON.stringify({ nome: response[0].nome_UTILIZADOR, id: response[0].id_UTILIZADOR }));
            localStorage.setItem('time', JSON.stringify({ data: new Date() }));
            this.router.navigate(['home']);
          } else {
            this.erro = false;
          }
        } else {
          this.erro = false;
        }
      },
      error => console.log(error));
  }

}
