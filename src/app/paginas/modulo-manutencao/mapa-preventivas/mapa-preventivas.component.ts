import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';

@Component({
  selector: 'app-mapa-preventivas',
  templateUrl: './mapa-preventivas.component.html',
  styleUrls: ['./mapa-preventivas.component.css']
})
export class MapaPreventivasComponent implements OnInit {

  ano;
  mensagemtabela: string;
  dados: any[];
  loading: boolean;
  anos = [];
  manutencoes = [];

  constructor(private globalVar: AppGlobals, private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.setcriar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }


    this.ano = new Date().getUTCFullYear();
    this.carregaAnalise();
  }


  carregaAnalise() {
    var dados = [{ ANO: this.ano, UNIDADE: null }];
    this.dados = [];
    this.manutencoes = [];
    this.loading = true;
    this.MANMOVMANUTENCAOCABService.MAN_GET_ANALISE_PREVENTIVAS(dados).subscribe(
      response => {
        this.loading = false;
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          this.dados.push({
            equipamento: response[x][0],
            week1: this.transforma_dados(response[x][1], 1),
            week2: this.transforma_dados(response[x][2], 2),
            week3: this.transforma_dados(response[x][3], 3),
            week4: this.transforma_dados(response[x][4], 4),
            week5: this.transforma_dados(response[x][5], 5),
            week6: this.transforma_dados(response[x][6], 6),
            week7: this.transforma_dados(response[x][7], 7),
            week8: this.transforma_dados(response[x][8], 8),
            week9: this.transforma_dados(response[x][9], 9),
            week10: this.transforma_dados(response[x][10], 10),
            week11: this.transforma_dados(response[x][11], 11),
            week12: this.transforma_dados(response[x][12], 12),
            week13: this.transforma_dados(response[x][13], 13),
            week14: this.transforma_dados(response[x][14], 14),
            week15: this.transforma_dados(response[x][15], 15),
            week16: this.transforma_dados(response[x][16], 16),
            week17: this.transforma_dados(response[x][17], 17),
            week18: this.transforma_dados(response[x][18], 18),
            week19: this.transforma_dados(response[x][19], 19),
            week20: this.transforma_dados(response[x][20], 20),
            week21: this.transforma_dados(response[x][21], 21),
            week22: this.transforma_dados(response[x][22], 22),
            week23: this.transforma_dados(response[x][23], 23),
            week24: this.transforma_dados(response[x][24], 24),
            week25: this.transforma_dados(response[x][25], 25),
            week26: this.transforma_dados(response[x][26], 26),
            week27: this.transforma_dados(response[x][27], 27),
            week28: this.transforma_dados(response[x][28], 28),
            week29: this.transforma_dados(response[x][29], 29),
            week30: this.transforma_dados(response[x][30], 30),
            week31: this.transforma_dados(response[x][31], 31),
            week32: this.transforma_dados(response[x][32], 32),
            week33: this.transforma_dados(response[x][33], 33),
            week34: this.transforma_dados(response[x][34], 34),
            week35: this.transforma_dados(response[x][35], 35),
            week36: this.transforma_dados(response[x][36], 36),
            week37: this.transforma_dados(response[x][37], 37),
            week38: this.transforma_dados(response[x][38], 38),
            week39: this.transforma_dados(response[x][39], 39),
            week40: this.transforma_dados(response[x][40], 40),
            week41: this.transforma_dados(response[x][41], 41),
            week42: this.transforma_dados(response[x][42], 42),
            week43: this.transforma_dados(response[x][43], 43),
            week44: this.transforma_dados(response[x][44], 44),
            week45: this.transforma_dados(response[x][45], 45),
            week46: this.transforma_dados(response[x][46], 46),
            week47: this.transforma_dados(response[x][47], 47),
            week48: this.transforma_dados(response[x][48], 48),
            week49: this.transforma_dados(response[x][49], 49),
            week50: this.transforma_dados(response[x][50], 50),
            week51: this.transforma_dados(response[x][51], 51),
            week52: this.transforma_dados(response[x][52], 52),
            week53: this.transforma_dados(response[x][53], 53),
          });
        }

        /*for (var y in this.manutencoes) {
          this.elementRef.nativeElement.querySelector(this.manutencoes[y].semana + "_" + this.manutencoes[y].id).addEventListener('mouseEnter',
            this.mouseEnter(this.manutencoes[y].id, this.manutencoes[y].estado, this.manutencoes[y].semana))
        }*/
      },
      error => {
        this.loading = false;
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
        console.log(error)
      });

  }

  transforma_dados(valor, semana) {
    var v_return = [];
    if (valor == null) return [];
    var array = valor.split('|')
    for (var x in array) {
      var array2 = array[x].split('::');
      if (array2.length > 1) {
        v_return.push({ id: array2[2], estado: array2[0], class: array2[0], valor: ((array2[2] == 'P') ? array2[1] : array2[2]), semana: semana })

        if (array2[2] != 'P') {
          this.manutencoes.push({ id: array2[2], estado: array2[0], semana: semana })
        }
      }
    }
    return v_return;
  }

  mouseEnter(id, estado, semana) {
    var array = this.manutencoes.find(item => item.id == id && item.semana != semana);

    if (id != 'P' && array) {
      if (estado == 'red') {
        return "Manutenção Conluída na Semana " + array.semana + ".";
      } else {
        return "Manutenção Prevista para a Semana " + array.semana + ".";
      }

    }

  }

  alteraAno(event) {
    this.carregaAnalise()
  }
}
