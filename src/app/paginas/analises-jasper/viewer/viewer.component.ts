import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GERANALISESService } from 'app/servicos/ger-analises.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  currentpage: string;
  id_modulo: number;
  pass_jasper_login: string;
  user_jasper_login: string;
  aumentado: any = false;
  noativo: any;
  nodes: any;
  pass: any;
  user: any;
  link: string;
  user_jasper: string;
  pass_jasper: string;
  fileURL = null;

  public list = [];
  constructor(private elementRef: ElementRef, private GERANALISESService: GERANALISESService, private location: Location, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.id_modulo = 0;

    var titlee = this.router.routerState.snapshot.url
    var pag = "";

    if (titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
      var titlearray = titlee.split("/");
      titlee = titlearray[0];
      this.currentpage = titlee;
    }
    if (this.currentpage == 'gestaobanhos_relatorios') {
      this.id_modulo = 1;
    } else if (this.currentpage == 'analisesjasper') {
      this.id_modulo = 2;
    }else if (this.currentpage == "lmep_relatorios"){
      this.id_modulo = 3;
    }else if( this.currentpage =="reclamacoes_relatorios"){
      this.id_modulo = 5;
    }

    //j_username=jasperadmin&j_password=DourecA&
    this.user = JSON.parse(localStorage.getItem('userapp'))["user"];
    this.pass = JSON.parse(localStorage.getItem('userapp'))["pass"];
    this.user_jasper = JSON.parse(localStorage.getItem('userapp'))["user_jasper"];
    this.pass_jasper = JSON.parse(localStorage.getItem('userapp'))["pass_jasper"];

    if (this.user_jasper != null && this.pass_jasper != null) {
      this.user_jasper_login = this.user_jasper;
      this.pass_jasper_login = atob(this.pass_jasper);
    } else {
      this.user_jasper_login = this.user.toLowerCase();
      this.pass_jasper_login = atob(this.pass);
    }

    //console.log(atob(this.pass));
    //this.user_jasper = 'jasperadmin'; //this.user;
    //this.pass_jasper = 'DourecA&'; //tob(this.pass);
    //this.link = "http://192.168.40.101/jasperserver/flow.html?singlesingon=y&_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o&reportUnit=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o%2FListagem_de_Guias_de_Remessa&standAlone=true";

    ///this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.link + "&j_username=" + this.user_jasper + "&j_password=" + this.pass_jasper);


    this.tree_nodes();
  }

  backClicked() {
    this.router.navigate(['analises']);
  }


  //criar array arvore analises
  tree_nodes() {
    var array = [{ id: 0, parent: null, name: 'Análises', link: null, ativo: true, disable: false }];
    this.nodes = [];
    this.GERANALISESService.getbyidmoduloativas(this.id_modulo).subscribe(result => {
      for (var x in result) {
        var disable = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "nodet" + result[x].id);
        array.push({ id: result[x].id, parent: result[x].id_PAI, name: result[x].descricao, link: result[x].link, ativo: result[x].ativo, disable: disable })
      }

      for (var x in array) {
        if (array[x].parent == null) {
          this.nodes.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo, disable: array[x].disable });

          this.getFilhos(array, array[x].id, this.nodes.find(item => item.id == array[x].id));
        }
      }

      this.list = this.nodes;
    }, error => { console.log(error); });
  }

  //ver filhos arvore
  getFilhos(array, id_pai, arr) {
    for (var x in array) {
      if (array[x].parent == id_pai) {

        arr.children.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo, disable: array[x].disable });
        this.getFilhos(array, array[x].id, arr.children.find(item => item.id == array[x].id));
      }
    }
  }

  alterarelatorio(link, id) {
    if (link != null) {
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(link + "&userLocale=pt_BR&j_username=" + this.user_jasper_login + "&j_password=" + this.pass_jasper_login);
      this.noativo = id;
    }

  }

  aumentardiv() {
    if (this.aumentado) {
      return "fullscreen";
    } else {
      return "";
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.aumentado = false;
    }
  }

}
