import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";

@Component({
  selector: 'app-registoparametros',
  templateUrl: './registoparametros.component.html',
  styleUrls: ['./registoparametros.component.css']
})
export class RegistoparametrosComponent implements OnInit {
  cols: any[];

  constructor(private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.cols = [];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setpesquisar(true);
    this.globalVar.setduplicar(false);
    this.ADMOVREGPARAMOPERACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          var estado = "Registado";
          if( response[x][0].data_VALIDA != null){
              estado ="Validado";
            }
          this.cols.push({ id: response[x][0].id_REG_PARAM_OPERA,
                           data: new Date(response[x][0].data_CRIA).toLocaleDateString(), estado: estado });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['registopara/view'], { queryParams: { id: event.data.id } });
  }
}