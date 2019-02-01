import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from "app/menu/sidebar-routes.config";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router, ActivatedRoute, Params, NavigationEnd, PRIMARY_OUTLET } from "@angular/router";
import 'rxjs/add/operator/filter';

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


    public breadcrumbs: IBreadcrumb[];

    constructor(private route: ActivatedRoute, private router: Router, location: Location, private globalVar: AppGlobals, private changeDetectorRef: ChangeDetectorRef) {
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
        });


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
        localStorage.clear();
        this.router.navigate(['login']);
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