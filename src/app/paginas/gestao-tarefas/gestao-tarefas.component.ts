import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GTMOVTAREFASService } from '../../servicos/gt-mov-tarefas.service';

@Component({
  selector: 'app-gestao-tarefas',
  templateUrl: './gestao-tarefas.component.html',
  styleUrls: ['./gestao-tarefas.component.css']
})
export class GestaoTarefasComponent implements OnInit {
  cols = [];

  constructor(private router: Router, private GTMOVTAREFASService: GTMOVTAREFASService) { }

  ngOnInit() {

    this.GTMOVTAREFASService.getAll().subscribe(res => {
      for (var x in res) {
        var estado = "";
        if (res[x].estado == "A") {
          estado = "Aberta";
        }
        this.cols.push({
          nome: "Tarefa " + res[x].id_TAREFA, responsavel: res[x].utz_ID,
          id: res[x].id_TAREFA, data_inicio: new Date(res[x].data_INICIO).toLocaleDateString(), data_limite: new Date(res[x].data_FIM).toLocaleDateString(), estado: estado,
          progresso: res[x].observacoes, prioridade: "Normal"
        });
      }

      this.cols = this.cols.slice();

    }, error => {
      console.log(error);
    });


  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['teste2']);
  }

  atualizar() { }

}
