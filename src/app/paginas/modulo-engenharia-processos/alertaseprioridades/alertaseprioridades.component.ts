import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/servicos/dashboard.service';

@Component({
  selector: 'app-alertaseprioridades',
  templateUrl: './alertaseprioridades.component.html',
  styleUrls: ['./alertaseprioridades.component.css']
})
export class AlertaseprioridadesComponent implements OnInit {
  loadingBARRAS_ALERTA;
  BARRAS_ALERTA = [];
  REVISOES_PRIORITARIAS: any[] = [];
  PRODUCOES_PRIORITARIAS: any[] = [];
  loadingPRODUCOES_PRIORITARIAS: boolean;
  loadingREVISOES_PRIORITARIAS: boolean;

  constructor(private DashboardService: DashboardService) { }

  ngOnInit() {
    this.carregaBARRAS_ALERTA();
    this.carregaPRODUCOES_PRIORITARIAS();
    this.carregaREVISOES_PRIORITARIAS();
  }

  carregaBARRAS_ALERTA() {
    this.BARRAS_ALERTA = []
    this.DashboardService.getDASHBOARD_PR_BARRAS_ALERTA([]).subscribe(
      response => {
        this.BARRAS_ALERTA = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            this.BARRAS_ALERTA.push({
              ref: response[x][0],
              designacao: response[x][1],
              turno_1: response[x][2],
              turno_2: response[x][3],
              turno_3: response[x][4],
              cor: response[x][6],
              data: this.formatDate(response[x][5]),
            });
          }

          this.BARRAS_ALERTA = this.BARRAS_ALERTA.slice();
          this.loadingBARRAS_ALERTA = true;
        } else {
          this.loadingBARRAS_ALERTA = true;
        }
      }, error => {
        this.loadingBARRAS_ALERTA = true;
        console.log(error)
      });
  }


  carregaREVISOES_PRIORITARIAS() {
    this.REVISOES_PRIORITARIAS = []
    var dados = [{ LOCAL: "1" }];
    this.DashboardService.getDASHBOARD_PR_REVISOES_PRIORITARIAS(dados).subscribe(
      response => {
        this.REVISOES_PRIORITARIAS = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            this.REVISOES_PRIORITARIAS.push({
              ref: response[x][0],
              designacao: response[x][1], cor: response[x][2]
            });
          }

          this.REVISOES_PRIORITARIAS = this.REVISOES_PRIORITARIAS.slice();
          this.loadingREVISOES_PRIORITARIAS = true;
        } else {
          this.loadingREVISOES_PRIORITARIAS = true;
        }
      }, error => {
        this.loadingREVISOES_PRIORITARIAS = true;
        console.log(error)
      });
  }


  carregaPRODUCOES_PRIORITARIAS() {
    this.PRODUCOES_PRIORITARIAS = []
    var dados = [{ LOCAL: "1" }];
    this.DashboardService.getDASHBOARD_PR_PRODUCOES_PRIORITARIAS(dados).subscribe(
      response => {
        this.PRODUCOES_PRIORITARIAS = [];
        var count = Object.keys(response).length;
        //console.log(response)
        if (count > 0) {
          for (var x in response) {
            this.PRODUCOES_PRIORITARIAS.push({
              ref: response[x][0],
              designacao: response[x][1], cor: response[x][2]
            });
          }

          this.PRODUCOES_PRIORITARIAS = this.PRODUCOES_PRIORITARIAS.slice();
          this.loadingPRODUCOES_PRIORITARIAS = true;
        } else {
          this.loadingPRODUCOES_PRIORITARIAS = true;
        }
      }, error => {
        this.loadingPRODUCOES_PRIORITARIAS = true;
        console.log(error)
      });
  }


  //formatar a data para dd-mm-yyyy
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

}
