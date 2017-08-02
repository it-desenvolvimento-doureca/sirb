import { Component, OnInit } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Router } from "@angular/router";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";

@Component({
  selector: 'app-registoanalises',
  templateUrl: './registoanalises.component.html',
  styleUrls: ['./registoanalises.component.css']
})
export class RegistoanalisesComponent implements OnInit {
  cols: any;

  constructor(private router: Router, private globalVar: AppGlobals, private ABMOVANALISEService: ABMOVANALISEService) { }

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

    this.ABMOVANALISEService.getAll2().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x][0].id_ANALISE, linha: response[x][0].id_LINHA, data: new Date(response[x][0].data_ANALISE).toLocaleDateString(), nome: response[x][2].nome_BANHO, tina: response[x][3].cod_TINA, cor: response[x][1].cor });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

    //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['registo/view'], { queryParams: { id: event.data.id } });
  }
}
