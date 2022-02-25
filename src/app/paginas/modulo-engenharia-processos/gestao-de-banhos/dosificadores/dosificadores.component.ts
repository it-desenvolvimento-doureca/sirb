import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Location } from '@angular/common';
import { ABDICTINAService } from 'app/servicos/ab-dic-tina.service';
import { ABMOVMANUTENCAODOSIFICADORESService } from 'app/servicos/ab-mov-manutencao-dosificadores.service';
import { ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService } from 'app/servicos/ab-dic-tipo-tipologia-dosificadores-objetivos.service';

@Component({
  selector: 'app-dosificadores',
  templateUrl: './dosificadores.component.html',
  styleUrls: ['./dosificadores.component.css']
})
export class DosificadoresComponent implements OnInit {
  tina;

  anos = [];
  semanas = [];
  ano;
  semana;
  tinas = [];
  loading_analise;
  dosificadores = [];
  mostraAB = false
  mostraNiv = false;
  objetivos: any[];
  nome_tipo: string;
  constructor(private ABDICTINAService: ABDICTINAService, private location: Location, private ABMOVMANUTENCAODOSIFICADORESService: ABMOVMANUTENCAODOSIFICADORESService,
    private route: ActivatedRoute, private renderer: Renderer, private globalVar: AppGlobals, private router: Router, private ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService: ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    for (var y = 1; y <= 53; y++) {
      this.semanas.push({ value: y, label: y })
    }



    this.globalVar.setapagar(false);
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

    this.ano = new Date().getUTCFullYear();
    this.semana = this.getWeek(new Date());
    this.preencheTinas();
    this.preencheobjetivos();

  }

  atualiza_graficos() {
    var days = ['Domingo', '2ª Feira', '3ª Feira', '4ª Feira', '5ª Feira', '6ª Feira', 'Sábado'];

    this.mostraAB = true;
    this.mostraNiv = true;

    this.dosificadores = [];
    this.nome_tipo = "";
    this.loading_analise = true;
    this.ABMOVMANUTENCAODOSIFICADORESService.ANALISE_DOSIFICADORES([{ ANO: this.ano, SEMANA: this.semana, TINA: this.tina }]).subscribe(
      response => {


        for (var x in response) {
          var tipo = response[x][17];
          var intervalo_amperes = response[x][3];
          var DOSEADOR_AB_NIVEL = response[x][9];
          var DOSEADOR_AB_REPOSICAO = response[x][10];
          var DOSEADOR_NIV_NIVEL = response[x][11];
          var DOSEADOR_NIV_REPOSICAO = response[x][12];
          var AMPERES = response[x][13];
          var variacao_AB = 0;
          var variacao_NIV = 0;
          var variacao_AMPERES = 0;
          var consumo_AB = 0;
          var consumo_NIV = 0;
          var y = parseInt(x);
          var cor1 = "";
          var cor2 = "";
          if (y > 0 || (y == 0 && response[x][15] == null)) {
            var DOSEADOR_AB_NIVEL_old = (y == 0) ? null : response[y - 1][9];
            var DOSEADOR_AB_REPOSICAO_old = (y == 0) ? null : response[y - 1][10];
            var DOSEADOR_NIV_NIVEL_old = (y == 0) ? null : response[y - 1][11];
            var DOSEADOR_NIV_REPOSICAO_old = (y == 0) ? null : response[y - 1][12];
            var AMPERES_old = (y == 0) ? null : response[y - 1][13];


            if (DOSEADOR_AB_NIVEL != null || DOSEADOR_AB_REPOSICAO != null) variacao_AB = Math.max(DOSEADOR_AB_NIVEL_old, DOSEADOR_AB_REPOSICAO_old) - this.MIN(DOSEADOR_AB_NIVEL, DOSEADOR_AB_REPOSICAO);
            if (DOSEADOR_NIV_NIVEL != null || DOSEADOR_NIV_REPOSICAO != null) variacao_NIV = Math.max(DOSEADOR_NIV_NIVEL_old, DOSEADOR_NIV_REPOSICAO_old) - this.MIN(DOSEADOR_NIV_NIVEL, DOSEADOR_NIV_REPOSICAO);
            if (AMPERES != null) variacao_AMPERES = AMPERES - AMPERES_old;

            if (variacao_AMPERES > 0) consumo_AB = ((intervalo_amperes * variacao_AB) / variacao_AMPERES) * 1000;
            if (variacao_AMPERES > 0) consumo_NIV = ((intervalo_amperes * variacao_NIV) / variacao_AMPERES) * 1000;

            var objetivos1 = this.objetivos.find(item => item.id_tipo == tipo && consumo_AB >= item.VALOR_MINIMO && consumo_AB < item.VALOR_MAXIMO);
            var objetivos2 = this.objetivos.find(item => item.id_tipo == tipo && consumo_NIV >= item.VALOR_MINIMO && consumo_NIV < item.VALOR_MAXIMO);
            if (objetivos1 && variacao_AMPERES > 0) cor1 = (objetivos1.COR == null) ? '' : '#' + objetivos1.COR;
            if (objetivos2 && variacao_AMPERES > 0) cor2 = (objetivos2.COR == null) ? '' : '#' + objetivos2.COR;

          }

          if (y == 0) {
            this.nome_tipo = response[x][19] + ' - ' + response[x][18];
          }

          var array = this.dosificadores.find(item => item.DATA_PREVISTA == response[x][4])
          var linha = {
            ID: response[x][0],
            ID_MANUTENCAO: response[x][1],
            ID_TINA: response[x][2],
            COD_TINA: response[x][18],
            DATA_PREVISTA: response[x][4],
            HORA_PREVISTA: (response[x][5] != null) ? response[x][5].slice(0, 5) : null,
            DATA_EXECUCAO: response[x][6],
            HORA_EXECUCAO: (response[x][7] != null) ? response[x][7].slice(0, 5) : null,
            UTZ_EXECUCAO: response[x][8],
            NOME_UTZ_EXECUCAO: response[x][16],
            DOSEADOR_AB_NIVEL: response[x][9],
            DOSEADOR_AB_REPOSICAO: response[x][10],
            DOSEADOR_NIV_NIVEL: response[x][11],
            DOSEADOR_NIV_REPOSICAO: response[x][12],
            AMPERES: response[x][13],
            OBSERVACOES: response[x][14],
            VARIACAO_AB: (y == 0 && response[x][15] != null) ? null : variacao_AB,
            VARIACAO_NIV: (y == 0 && response[x][15] != null) ? null : variacao_NIV,
            VARIACAO_AMPERES: (y == 0 && response[x][15] != null) ? null : variacao_AMPERES,
            CONSUMO_AB: (y == 0 && response[x][15] != null) ? null : consumo_AB,
            CONSUMO_NIV: (y == 0 && response[x][15] != null) ? null : consumo_NIV,
            cor1: cor1,
            cor2: cor2,
            dia: days[new Date(response[x][4]).getDay()],
            data: response[x][4], id_feriado: response[x][15]
          };



          if (tipo == 1) {
            this.mostraAB = true;
            this.mostraNiv = true;
          } else if (tipo == 2) {
            this.mostraAB = true;
            this.mostraNiv = false;
          } else if (tipo == 3) {
            this.mostraAB = true;
            this.mostraNiv = false;
          } else if (tipo == 4) {
            this.mostraAB = true;
            this.mostraNiv = false;
          } else if (tipo == 5) {
            this.mostraAB = false;
            this.mostraNiv = false;
          }

          if (!array) {
            //id_feriado response[x][15]
            //tipo response[x][17]
            this.dosificadores.push({
              DATA_PREVISTA: response[x][4],
              dia: days[new Date(response[x][4]).getDay()],
              data: response[x][4],
              linhas: [linha], id_feriado: response[x][15]
            });
          } else {
            array.linhas.push(linha)
          }


        }

        this.loading_analise = false;
      },
      error => {
        this.loading_analise = false;
        console.log(error);
      });


  }

  MIN(value1, value2) {
    if (value1 == null && value2 == null) {
      return 0;
    } else if (value1 == null) {
      return value2;
    } else if (value2 == null) {
      return value1;
    } else if (value2 < value1) {
      return value2;
    } else if (value2 > value1) {
      return value1;
    }
  }


  //ao alterar semana
  alteraSemana(event) {

  }

  //ao alterar ano
  alteraAno(event) {

  }

  backview() {
    this.location.back();
  }



  preencheTinas() {
    //preenche combobox linhas
    this.ABDICTINAService.getAll2(0).subscribe(
      response => {
        this.tinas = [];
        this.tinas.push({ label: "Sel. Tina", value: "" });
        for (var x in response) {
          if (response[x][0].id_TIPO_TIPOLOGIA_DOSIFICADORES != null) this.tinas.push({ label: response[x][0].cod_TINA + ' / ' + response[x][1].nome_LINHA, value: response[x][0].id_TINA });
        }

        this.tinas = this.tinas.slice();

      },
      error => { console.log(error); });
  }


  preencheobjetivos() {
    this.objetivos = [];
    this.ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.objetivos.push({ id: response[x].ID, COR: response[x].COR, VALOR_MAXIMO: response[x].VALOR_MAXIMO, VALOR_MINIMO: response[x].VALOR_MINIMO, id_tipo: response[x].ID_TIPO_TIPOLOGIA_DOSIFICADORES });
        }
        this.objetivos = this.objetivos.slice();
      }, error => { console.log(error); });
  }

  getDateOfWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }


  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }




}
