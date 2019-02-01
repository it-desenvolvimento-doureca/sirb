import { Component, OnInit } from '@angular/core';
import { GTMOVTAREFASService } from '../../../servicos/gt-mov-tarefas.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css']
})
export class ProcessosComponent implements OnInit {
  activeTarefas: boolean = true;
  activeTimeline: boolean = false;
  data = {};
  cols = [];
  timeline = [];
  user: any;
  constructor(private GTMOVTAREFASService: GTMOVTAREFASService) { }

  ngOnInit() {
    this.cols = [];
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var data = [{
      utilizador: this.user, tipo_utilizador: "u", estado: null, utilizador_grupo: "u",
      datacria1: null, datacria2: null, datafim1: null, datafim2: null,
      accao: null
    }];

    this.GTMOVTAREFASService.getAllbyidUser(4,data).subscribe(res => {
      for (var x in res) {
        //console.log(res)
        var estado = "";
        if (res[x][3] == "A") {
          estado = "Aberta";
        }
        this.cols.push({
          accao: res[x][20],
          id: res[x][0], data: new Date(res[x][4]).toLocaleDateString(), estado: estado,
          progresso: res[x].observacoes, prioridade: "Normal"
        });
      }

      this.cols = this.cols.slice();

    }, error => {
      console.log(error);
    });

    this.data = {
      labels: ['Faltam', 'Realizadas'],
      datasets: [
        {
          data: [1, 4],
          backgroundColor: [
            "#FF6384",
            "#068c06b3"
          ],
          hoverBackgroundColor: [
            "red",
            "green"
          ]
        }]
    };

    var campo = [{ data: "2018-01-05", hora: "10:05", utilizador: "Administrador", texto: "Alterou o estado para 1", class: "" },
    { data: "2018-01-05", hora: "10:10", utilizador: "Administrador", texto: "Alterou o estado para 2", class: "" },
    { data: "2018-01-05", hora: "11:00", utilizador: "Ana", texto: "Alterou o estado para 3", class: "" },
    { data: "2018-01-06", hora: "10:10", utilizador: "Tiago", texto: "Alterou o estado para 1", class: "" },
    ];

    var tempdata = [];
    var mes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    var tempclass = "credits";
    for (var y in campo) {

      let index = this.timeline.findIndex(item => item.data == campo[y].data);
      if (index == -1) {
        tempclass = "credits"
        campo[y].class = tempclass;
        this.timeline.push({ data: campo[y].data, dia: new Date(campo[y].data).getDay(), mes: mes[new Date(campo[y].data).getMonth()], dados: [campo[y]] });
      } else {
        campo[y].class = tempclass;
        this.timeline[index].dados.push(campo[y]);
      }
      if (tempclass == "credits") {
        tempclass = "debits";
      } else {
        tempclass = "credits"
      }
    }
    //debits / credits
    // console.log(this.timeline)

  }

  abrir(event) {

  }

  TarefasShow() {
    this.activeTimeline = false;
    this.activeTarefas = true;
  }

  TimelineShow() {
    this.activeTimeline = true;
    this.activeTarefas = false;
  }


}
