import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    linha = this.globalVar.getlinha();
    linhas: any[];
    location: Location;

    @ViewChild('closedialog') closedialog: ElementRef;
    constructor( private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, location: Location, private router: Router) {
        this.location = location;
        //preenche combobox linhas
        this.ABDICLINHAService.getAll().subscribe(
            response => {
                this.linhas = [];
                this.linhas.push({ label: "Sel. Linha", value: "" });
                for (var x in response) {
                    this.linhas.push({ label: response[x].nome_LINHA, value:  response[x].id_LINHA });
                }
                this.linha = this.globalVar.getlinha();
                this.linhas = this.linhas.slice();
            },
            error => console.log(error));

    }

    public isMaps(path) {
        var titlee = this.router.routerState.snapshot.url;
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }

    confirmar() {
        this.globalVar.setlinha(this.linha);
        this.simular(this.closedialog);
    }

    //simular click para mostrar mensagem
    simular(element) {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
            element.nativeElement, 'dispatchEvent', [event]);
    }
}
