import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from "app/menu/sidebar-routes.config";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router, ActivatedRoute, Params, NavigationEnd, PRIMARY_OUTLET } from "@angular/router";
import 'rxjs/add/operator/filter';
import { GERFAVORITOSService } from 'app/servicos/ger-favoritos.service';
import { GER_FAVORITOS } from 'app/entidades/GER_FAVORITOS';

interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}

@Component({
    selector: 'app-cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
    hora: string;

    private listTitles: any[];
    location: Location;
    currentpage = "";
    modo = '';
    nome;
    value;
    versao = "versão 1.0.1";
    favorito = false;
    show_favoritos = false;

    public breadcrumbs: IBreadcrumb[];
    id_favorito;
    descricao: string;
    display: boolean;

    constructor(private route: ActivatedRoute, private router: Router, location: Location, private globalVar: AppGlobals, private changeDetectorRef: ChangeDetectorRef, private GERFAVORITOSService: GERFAVORITOSService) {
        this.location = location;
        this.breadcrumbs = [];
    }

    ngOnInit() {
        /*var date = new Date(),
            locale = "pt-PT",
            month = date.toLocaleString(locale, { weekday: "long" }) + ", " + date.toLocaleString(locale, { day: "numeric" }) + " de " + date.toLocaleString(locale, { month: "long" })
                + " de " + date.toLocaleString(locale, { year: "numeric" });
        this.value = month.toLocaleUpperCase();
        setInterval(() => {         //replaced function() by ()=>
             var hora= new Date();
             this.hora = hora.toLocaleTimeString();
         }, 1000);
 */
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
        if (localStorage.getItem("userapp")) {
            this.nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
        }
        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            //set breadcrumbs
            let root: ActivatedRoute = this.route.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
            this.active_favoritos(root);
        });


    }

    active_favoritos(root) {
        this.favorito = false;
        this.id_favorito = null;
        var url = this.location.path();
        if (JSON.parse(localStorage.getItem('userapp'))) {
            var id = JSON.parse(localStorage.getItem('userapp'))["id"];
            this.GERFAVORITOSService.getbyid(id).subscribe(
                response => {
                    for (var x in response) {
                        if (url == response[x][0].url) {
                            this.favorito = true;
                            this.id_favorito = response[x][0].id_FAVORITO;
                        }
                    }

                },
                error => { console.log(error); });
        }
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.match("editar") || titlee.match("view") || titlee.match("novo") || url == '/dashboard') {
            this.show_favoritos = false;
        } else {
            this.show_favoritos = true;
        }

    }

    set_favoritos() {

        //this.favorito = !this.favorito;
        if (this.favorito) {
            if (this.id_favorito != null) {
                this.delete_favorito(this.id_favorito);
            }
        } else {
            let root: ActivatedRoute = this.route.root;
            this.descricao = this.get_Descricao(root);
            this.display = true;
        }
    }

    gravar_favorito() {
        var desc = this.descricao;
        var id = JSON.parse(localStorage.getItem('userapp'))["id"];
        this.insert_favorito(id, this.location.path(), desc);
    }

    insert_favorito(id, url, descricao) {
        var fav = new GER_FAVORITOS;
        fav.id_UTILIZADOR = id;
        fav.url = url;
        fav.data_CRIA = new Date();
        fav.descricao = descricao

        this.GERFAVORITOSService.create(fav).subscribe(response => {
            this.favorito = true;
            this.id_favorito = response.id_FAVORITO;
            this.display = false;
        },
            error => {
                this.favorito = false;
                console.log(error);
                this.display = false;
            });
    }

    delete_favorito(id) {
        this.GERFAVORITOSService.delete(id).then(result => {
            this.favorito = false;
        }, error => { console.log(error); this.favorito = true; });
    }

    get_Descricao(route: ActivatedRoute, url: string = "", breadcrumbs: string = ""): string {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes 
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.get_Descricao(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };
            breadcrumbs += (breadcrumbs != "" && child.snapshot.data[ROUTE_DATA_BREADCRUMB] != "") ? " - " : "";
            breadcrumbs += child.snapshot.data[ROUTE_DATA_BREADCRUMB];

            //recursive
            return this.get_Descricao(child, url, breadcrumbs);
        }
    }

    getTitle() {

        this.modo = "";


        var titlee = this.location.prepareExternalUrl(this.location.path());
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
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return '';
            }
        }
        return '';
    }

    ngAfterViewChecked() {
        this.changeDetectorRef.detectChanges();
    }


    logout() {
        //localStorage.clear();
        localStorage.removeItem('acessos');
        localStorage.removeItem('userapp');
        localStorage.removeItem('time_sgiid');
        this.router.navigate(['login']);
        /*setTimeout(() => {
            location.reload(true);
        }, 50);*/
    }


    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes 
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };
            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }

}