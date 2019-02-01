import { Component, OnInit } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GER_ARMAZEM } from 'app/entidades/GER_ARMAZEM';
import { GERARMAZEMService } from 'app/servicos/ger-armazem.service';

@Component({
  selector: 'app-armazens',
  templateUrl: './armazens.component.html',
  styleUrls: ['./armazens.component.css']
})
export class ArmazensComponent implements OnInit {
  targetPerfil: any[];
  sourcePerfil: any[];

  constructor(private GERARMAZEMService: GERARMAZEMService, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);
    this.preencheListas();
  }


  //ao inserir armazens da aplicaocao
  onMoveToTarget(e) {
    var x;
    for (x in e.items) {
      var arm = new GER_ARMAZEM;
      arm.cod_ARMAZEM = e.items[x].cod;
      arm.nome_ARMAZEM = e.items[x].nome;
      this.GERARMAZEMService.create(arm).subscribe(
        res => {
          if (x == e.items.length) {
            this.preencheListas();
          }
        },
        error => { console.log(error); });
    }

  }
  //ao mover para armazens 
  onMoveToSource(e) {
    var x;
    for (x in e.items) {
      this.GERARMAZEMService.delete(e.items[x].id).then(() => {
        if (x == (e.items.length - 1)) {
          this.preencheListas();
        }
      });
    }
  }

  preencheListas() {
    this.sourcePerfil = [];
    this.targetPerfil = [];

    this.GERARMAZEMService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.targetPerfil.push({ id: response[x].id_ARMAZEM, cod: response[x].cod_ARMAZEM, nome: response[x].nome_ARMAZEM });
        }
        this.targetPerfil = this.targetPerfil.slice();
        this.GERARMAZEMService.getAll_silver().subscribe(
          response => {
            for (var x in response) {
              if (!this.targetPerfil.find(item => item.cod == response[x].LIECOD)) {
                this.sourcePerfil.push({ cod: response[x].LIECOD, nome: response[x].ADRNOM });
              }
            }
            this.sourcePerfil = this.sourcePerfil.slice();
          }, error => { console.log(error); });
      }, error => { console.log(error); });

  }


}
