import { Component, OnInit } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tinas',
  templateUrl: './tinas.component.html',
  styleUrls: ['./tinas.component.css']
})
export class TinasComponent implements OnInit {
  cols: any;

  constructor(private router: Router,private globalVar: AppGlobals, private ABDICTINAService: ABDICTINAService) { }

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

    this.ABDICTINAService.getAll2().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id:  response[x][0].id_TINA ,linha:response[x][0].id_LINHA,cod: response[x][0].cod_TINA, obs: response[x][0].obs ,cor: response[x][1].cor });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

    //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['tinas/view'], { queryParams: { id: event.data.id } });
  }


}
