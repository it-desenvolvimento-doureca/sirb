import { Component, OnInit } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-banhos',
  templateUrl: './banhos.component.html',
  styleUrls: ['./banhos.component.css']
})
export class BanhosComponent implements OnInit {

  cols: any;

  constructor(private router: Router, private globalVar: AppGlobals, private ABDICBANHOService: ABDICBANHOService) { }

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

    this.ABDICBANHOService.getAllLINHA().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id_BANHO, linha: response[x][0].id_LINHA, nome: response[x][0].nome_BANHO, tina: response[x][2].cod_TINA, estado: response[x][0].estado, cor: response[x][1].cor });
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
    this.router.navigate(['banhos/view'], { queryParams: { id: event.data.id } });
  }
}
