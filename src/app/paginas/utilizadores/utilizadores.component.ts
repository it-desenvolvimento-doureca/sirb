import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";

@Component({
  selector: 'app-utilizadores',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizadores.component.css']
})
export class UtilizadoresComponent implements OnInit {
  cols: any;

  constructor(private router: Router, private globalVar: AppGlobals, private GERUTILIZADORESService: GERUTILIZADORESService) { }

  ngOnInit() {
    this.cols = [];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setpesquisar(true);
    this.globalVar.setduplicar(false);

    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x].id_UTILIZADOR, nome: response[x].nome_UTILIZADOR});
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }


  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['utilizadores/view'], { queryParams: { id: event.data.id } });
  }
}