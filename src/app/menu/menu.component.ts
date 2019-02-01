import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ROUTES } from "app/menu/sidebar-routes.config";
import { Router } from "@angular/router";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuItems: any[];
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialog2') dialog2: ElementRef;

  constructor(private globalVar: AppGlobals, private GERPERFILLINService: GERPERFILLINService, public router: Router, private renderer: Renderer) {

  }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.globalVar.setlinha(0);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  linha() {
    this.simular(this.dialog);
  }

  abreAjuda() {
    this.simular(this.dialog2);
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

  abrirdashboardTarefas() {
    this.router.navigate(['tarefas']);
  }


}
