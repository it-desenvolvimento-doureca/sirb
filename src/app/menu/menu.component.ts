import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ROUTES } from "app/menu/sidebar-routes.config";
import { Router } from "@angular/router";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { AppComponent } from 'app/app.component';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuItems: any[];
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialog2') dialog2: ElementRef;
  items2: MenuItem[] = [
    {
      label: 'Next',
      icon: 'fa-chevron-right'
    },
    {
      label: 'Prev',
      icon: 'fa-chevron-left'
    }
  ];

  constructor(private comp: AppComponent, private globalVar: AppGlobals, private GERPERFILLINService: GERPERFILLINService, public router: Router, private renderer: Renderer) {

  }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.globalVar.setlinha(0);
  }

  click(event) {
    console.log(event)
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

  linha() {
    this.simular(this.dialog);
  }

  abreAjuda() {
    //this.simular(this.dialog2);
    this.comp.abreAjuda();
  }


  abreSugestoes() {
    this.comp.abreSugestoes();
    // this.simular(this.dialogSugestoes);
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  abrirdashboard() {
    var acesso1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node040");
    var acesso2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node041");
    if (acesso1) {
      this.router.navigate(['homegestaobanhos']);
    } else if (acesso2) {
      this.router.navigate(['listagem']);
    }
    //[routerLink]="['/homegestaobanhos']"
  }

  abrircontroloassiduidade() {
    if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node7"))
      this.router.navigate(['controloassiduidade']);
  }

  abrirproducao() {
    /*if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9"))
      this.router.navigate(['producao']);*/
  }

  abrirplanosacao() {
    if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node155"))
      this.router.navigate(['planosacao']);
  }

  abrirdashboardTarefas() {
    if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node6"))
      this.router.navigate(['tarefas']);
  }


}
