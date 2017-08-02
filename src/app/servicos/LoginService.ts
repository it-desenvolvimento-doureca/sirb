import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";


@Injectable()
export class LoginService implements CanActivate {
    constructor(private router: Router) { }

    private userIsAuthenticated: boolean;
    private user;
    private password;

    canActivate() {

        if (localStorage.getItem('time')) {
            var data_storage = new Date(JSON.parse(localStorage.getItem('time'))["data"]).getTime();
            if ((data_storage + 86400000) <= new Date().getTime() ) {
                localStorage.clear();
            }
        }

        var access = JSON.parse(localStorage.getItem('access'));
        if (!localStorage.getItem('userapp') || !localStorage.getItem('time')) {
            // alert('Efetue o Login!');
            this.router.navigate(['./login']);
            return false;
        } /*else if (!localStorage.getItem('access')) {
            alert('Acesso Negado!');
            this.router.navigate(['./login']);
            return false;
        }*/

        return true;
    }

}

