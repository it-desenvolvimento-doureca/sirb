import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANDICAMBITOSService } from 'app/servicos/man-dic-ambitos.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';

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
  //manutencoes = [];
  displayManutencao: boolean;
  ID_PEDIDO_INPUT: any;
  CLASSIFICACAO: any;
  displayEquipamento: boolean;
  ID_EQUIPAMENTO_INPUT: any;
  drop_ambitos_manutencao: any[];
  AMBITO_MANUTENCAO: any;
  ver_atrasos = false;
  drop_equipamentos: any[];
  drop_localizacoes: any[];
  equipamento;
  localizacao;

  constructor(private globalVar: AppGlobals, private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private elementRef: ElementRef, private MANDICPISOSService: MANDICPISOSService,
    private MANDICAMBITOSService: MANDICAMBITOSService, private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService) { }

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

    this.listar_ambitos_manutencao();
    this.listar_equipamentos();
    this.listar_localizacao();

    this.ano = new Date().getUTCFullYear();
    this.carregaAnalise();
  }


  listar_ambitos_manutencao() {

    this.drop_ambitos_manutencao = [];
    this.drop_ambitos_manutencao.push({ label: 'Sel. Âmbito', value: null });
    this.MANDICAMBITOSService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {

          this.drop_ambitos_manutencao.push({
            value: response[x].ID,
            label: response[x].NOME
          });

        }

        this.drop_ambitos_manutencao = this.drop_ambitos_manutencao.slice();
      },
      error => console.log(error));
  }


  listar_localizacao() {
    this.drop_localizacoes = [];
    this.drop_localizacoes.push({
      value: null, label: 'Selecionar Localização'
    })
    this.MANDICPISOSService.getALLLOCALLIZACOES().subscribe(
      response => {
        for (var x in response) {
          this.drop_localizacoes.push({
            value: response[x][2] + response[x][0], label: response[x][1]
          });
        }
        this.drop_localizacoes = this.drop_localizacoes.slice();

      },
      error => { console.log(error); });
  }

  listar_equipamentos() {


    this.drop_equipamentos = [];
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.getAll2().subscribe(
      response => {
        var count = Object.keys(response).length;
        this.drop_equipamentos.push({ label: 'Sel. Equipamento', value: null });

        for (var x in response) {
          this.drop_equipamentos.push({
            value: response[x][0],
            label: response[x][1],
            localizacao: response[x][3],
            referencia: response[x][5],
            ativo: response[x][6]
          });

        }
        this.drop_equipamentos = this.drop_equipamentos.slice();

      },
      error => console.log(error));


  }

  carregaAnalise() {
    var dados = [{ ANO: this.ano, UNIDADE: this.localizacao, AMBITO: this.AMBITO_MANUTENCAO, EQUIPAMENTO: this.equipamento }];
    this.dados = [];
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
            id_equipamento: response[x][54],
            localizacao: response[x][55],
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

        if (array2[2] != 'P' && array2[0] == 'green' && array2[3] != array2[4]) {
          if (this.ver_atrasos) v_return.push({ id: array2[2], estado: array2[0], class: array2[0], valor: ((array2[2] == 'P') ? array2[1] : array2[2]), semana: semana, title: this.getTitle(array2[2], array2[0], array2[3], array2[4]) })
        } else {
          v_return.push({ id: array2[2], estado: array2[0], class: array2[0], valor: ((array2[2] == 'P') ? array2[1] : array2[2]), semana: semana, title: this.getTitle(array2[2], array2[0], array2[3], array2[4]) })
        }
        /*if (array2[2] != 'P') {
          this.manutencoes.push({ id: array2[2], estado: array2[0], semana: semana })
        }*/
      }
    }
    return v_return;
  }

  getTitle(id, estado, semana_conclui, semana_prevista) {


    if (id != 'P' && semana_conclui != 0) {
      if (estado == 'red') {
        return "Manutenção Concluída na Semana " + semana_conclui + ".";
      } else {
        return "Manutenção Prevista para a Semana " + semana_prevista + ".";
      }

    }

  }

  alteraAno(event) {
    this.carregaAnalise()
  }

  verManutencao(id) {
    if (id != 'P') {
      this.ID_PEDIDO_INPUT = id;
      this.CLASSIFICACAO = 'P';
      this.displayManutencao = true;
    }
  }

  onHide() {
    this.ID_PEDIDO_INPUT = null;
    this.CLASSIFICACAO = null;
  }

  verEquipamento(id) {
    this.ID_EQUIPAMENTO_INPUT = id;
    this.displayEquipamento = true;
  }

  onHideEquipamentos() {
    this.ID_EQUIPAMENTO_INPUT = null;
  }

  limpar() {
    this.AMBITO_MANUTENCAO = null;
    this.localizacao = null;
    this.equipamento = null;
    this.ver_atrasos = false;
    this.carregaAnalise();
  }
}
