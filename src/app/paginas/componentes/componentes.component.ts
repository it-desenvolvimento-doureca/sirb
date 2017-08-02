import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  cols: any;

  constructor(private router: Router, private globalVar: AppGlobals, private ABDICCOMPONENTEService: ABDICCOMPONENTEService) { }

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

    this.ABDICCOMPONENTEService.getAll("T").subscribe(
      response => {
        for (var x in response) {
          var tipo = "";
          if (response[x].tipo == "T") {
            tipo = "Componente / Aditivo";
          } else if (response[x].tipo == "A") {
            tipo = "Aditivo";
          } else if (response[x].tipo == "C") {
            tipo = "Componente";
          }
          this.cols.push({
            id: response[x].id_COMPONENTE, nome: response[x].nome_COMPONENTE, tipo: tipo
          });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  addNewEntry(event) {
    alert();
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['componentes/view'], { queryParams: { id: event.data.id } });
  }
}