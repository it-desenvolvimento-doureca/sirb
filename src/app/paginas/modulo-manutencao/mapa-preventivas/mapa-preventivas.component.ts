import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERDEPARTAMENTOService } from 'app/servicos/ger-departamento.service';
import { MANDICAMBITOSService } from 'app/servicos/man-dic-ambitos.service';
import { MANDICNIVEISCRITICIDADEService } from 'app/servicos/man-dic-niveis-criticidade.service';
import { MANDICPISOSService } from 'app/servicos/man-dic-pisos.service';
import { MANMOVMANUTENCAOCABService } from 'app/servicos/man-mov-manutencao-cab.service';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { UploadService } from 'app/servicos/upload.service';
import * as FileSaver from 'file-saver';
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
  nivel;
  departamento;
  localizacao;
  departs: any[];
  drop_niveis: any[];
  semanas: any[] = [];
  numerosemanas: { label: string; value: any; }[];
  loadingFile: boolean;
  DATA_INCIO;
  DATA_FIM;
  week1_show = false;
  week2_show = false;
  week3_show = false;
  week4_show = false;
  week5_show = false;
  week6_show = false;
  week7_show = false;
  week8_show = false;
  week9_show = false;
  week10_show = false;
  week11_show = false;
  week12_show = false;
  week13_show = false;
  week14_show = false;
  week15_show = false;
  week16_show = false;
  week17_show = false;
  week18_show = false;
  week19_show = false;
  week20_show = false;
  week21_show = false;
  week22_show = false;
  week23_show = false;
  week24_show = false;
  week25_show = false;
  week26_show = false;
  week27_show = false;
  week28_show = false;
  week29_show = false;
  week30_show = false;
  week31_show = false;
  week32_show = false;
  week33_show = false;
  week34_show = false;
  week35_show = false;
  week36_show = false;
  week37_show = false;
  week38_show = false;
  week39_show = false;
  week40_show = false;
  week41_show = false;
  week42_show = false;
  week43_show = false;
  week44_show = false;
  week45_show = false;
  week46_show = false;
  week47_show = false;
  week48_show = false;
  week49_show = false;
  week50_show = false;
  week51_show = false;
  week52_show = false;
  week53_show = false;

  constructor(private globalVar: AppGlobals, private MANMOVMANUTENCAOCABService: MANMOVMANUTENCAOCABService, private elementRef: ElementRef, private MANDICPISOSService: MANDICPISOSService,
    private GERDEPARTAMENTOService: GERDEPARTAMENTOService, private MANDICNIVEISCRITICIDADEService: MANDICNIVEISCRITICIDADEService, private RelatoriosService: RelatoriosService,
    private UploadService: UploadService,
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

    this.numerosemanas = [{ label: "Seleccione ", value: null }];
    var i;
    for (i = 1; i <= 52; i++) {
      this.numerosemanas.push({ label: i.toString(), value: i });
    }

    this.listar_ambitos_manutencao();
    this.listar_equipamentos();
    this.carregarDepartamentos();
    this.listar_localizacao();

    this.ano = new Date().getUTCFullYear();
    this.carregaAnalise();
  }


  carregarDepartamentos() {
    this.departs = [];
    this.GERDEPARTAMENTOService.getAll2().subscribe(
      response => {
        this.departs.push({ value: null, label: "Selecionar Departamento" });
        for (var x in response) {

          this.departs.push({ value: response[x][0].id, label: response[x][0].descricao, nome: response[x][1].nome_UTILIZADOR });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }


  atualizaniveis(event) {
    if (event.value != "" && event.value != null) {
      this.listar_niveis(event.value)
    } else {
      this.drop_niveis = [];
    }
  }

  listar_niveis(departamento) {
    this.nivel = null;
    this.drop_niveis = [];
    this.drop_niveis.push({ label: 'Sel. Nível de Criticidade', value: null });
    this.MANDICNIVEISCRITICIDADEService.getbyIDDEPARTAMENTO(departamento).subscribe(
      response => {
        var count = Object.keys(response).length;
        for (var x in response) {

          this.drop_niveis.push({
            value: response[x][0],
            label: response[x][1] + ' ( ' + response[x][2] + ' )'
          });

        }

        this.drop_niveis = this.drop_niveis.slice();
      },
      error => console.log(error));
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
    var dados = [{
      ANO: this.ano, UNIDADE: this.localizacao, AMBITO: this.AMBITO_MANUTENCAO, EQUIPAMENTO: this.equipamento,
      DEPARTAMENTO: this.departamento, NIVEL: this.nivel,
      DATA_INCIO: this.DATA_INCIO, DATA_FIM: this.DATA_FIM,
      SEMANAS: (this.semanas.length == 0) ? null : this.semanas.toString()
    }];
    this.dados = [];
    this.loading = true;
    var filtros = "";
    this.week1_show = false;
    this.week2_show = false;
    this.week3_show = false;
    this.week4_show = false;
    this.week5_show = false;
    this.week6_show = false;
    this.week7_show = false;
    this.week8_show = false;
    this.week9_show = false;
    this.week10_show = false;
    this.week11_show = false;
    this.week12_show = false;
    this.week13_show = false;
    this.week14_show = false;
    this.week15_show = false;
    this.week16_show = false;
    this.week17_show = false;
    this.week18_show = false;
    this.week19_show = false;
    this.week20_show = false;
    this.week21_show = false;
    this.week22_show = false;
    this.week23_show = false;
    this.week24_show = false;
    this.week25_show = false;
    this.week26_show = false;
    this.week27_show = false;
    this.week28_show = false;
    this.week29_show = false;
    this.week30_show = false;
    this.week31_show = false;
    this.week32_show = false;
    this.week33_show = false;
    this.week34_show = false;
    this.week35_show = false;
    this.week36_show = false;
    this.week37_show = false;
    this.week38_show = false;
    this.week39_show = false;
    this.week40_show = false;
    this.week41_show = false;
    this.week42_show = false;
    this.week43_show = false;
    this.week44_show = false;
    this.week45_show = false;
    this.week46_show = false;
    this.week47_show = false;
    this.week48_show = false;
    this.week49_show = false;
    this.week50_show = false;
    this.week51_show = false;
    this.week52_show = false;
    this.week53_show = false;

    if (dados[0].ANO != null) filtros += "<b>Ano:</b> " + this.ano
    if (dados[0].AMBITO != null) filtros += "<br><b>Âmbito Manutenção:</b> " + this.drop_ambitos_manutencao.find(item => item.value == this.AMBITO_MANUTENCAO).label;
    if (dados[0].UNIDADE != null) filtros += "<br><b>Localização:</b> " + this.drop_localizacoes.find(item => item.value == this.localizacao).label;
    if (dados[0].EQUIPAMENTO != null) filtros += "<br><b>Equipamento:</b> " + this.drop_equipamentos.find(item => item.value == this.equipamento).label;
    if (dados[0].DEPARTAMENTO != null) filtros += "<br><b>Departamento Criticidade:</b> " + this.departs.find(item => item.value == this.departamento).label;
    if (dados[0].NIVEL != null) filtros += "<br><b>Níveis de Criticidade:</b> " + this.drop_niveis.find(item => item.value == this.nivel).label;
    if (dados[0].DATA_INCIO != null) filtros += "<br><b>Data Início:</b> " + this.formatDate(this.DATA_INCIO)
    if (dados[0].DATA_FIM != null) filtros += "<br><b>Data Fim:</b> " + this.formatDate(this.DATA_FIM)
    if (dados[0].SEMANAS != null) filtros += "<br><b>Semanas:</b> " + this.semanas.toString()

    this.MANMOVMANUTENCAOCABService.MAN_GET_ANALISE_PREVENTIVAS(dados).subscribe(
      response => {
        this.loading = false;
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {
          if (parseInt(x) == 0) {
            this.week1_show = (response[x][1] == 1) ? true : false;
            this.week2_show = (response[x][2] == 1) ? true : false;
            this.week3_show = (response[x][3] == 1) ? true : false;
            this.week4_show = (response[x][4] == 1) ? true : false;
            this.week5_show = (response[x][5] == 1) ? true : false;
            this.week6_show = (response[x][6] == 1) ? true : false;
            this.week7_show = (response[x][7] == 1) ? true : false;
            this.week8_show = (response[x][8] == 1) ? true : false;
            this.week9_show = (response[x][9] == 1) ? true : false;
            this.week10_show = (response[x][10] == 1) ? true : false;
            this.week11_show = (response[x][11] == 1) ? true : false;
            this.week12_show = (response[x][12] == 1) ? true : false;
            this.week13_show = (response[x][13] == 1) ? true : false;
            this.week14_show = (response[x][14] == 1) ? true : false;
            this.week15_show = (response[x][15] == 1) ? true : false;
            this.week16_show = (response[x][16] == 1) ? true : false;
            this.week17_show = (response[x][17] == 1) ? true : false;
            this.week18_show = (response[x][18] == 1) ? true : false;
            this.week19_show = (response[x][19] == 1) ? true : false;
            this.week20_show = (response[x][20] == 1) ? true : false;
            this.week21_show = (response[x][21] == 1) ? true : false;
            this.week22_show = (response[x][22] == 1) ? true : false;
            this.week23_show = (response[x][23] == 1) ? true : false;
            this.week24_show = (response[x][24] == 1) ? true : false;
            this.week25_show = (response[x][25] == 1) ? true : false;
            this.week26_show = (response[x][26] == 1) ? true : false;
            this.week27_show = (response[x][27] == 1) ? true : false;
            this.week28_show = (response[x][28] == 1) ? true : false;
            this.week29_show = (response[x][29] == 1) ? true : false;
            this.week30_show = (response[x][30] == 1) ? true : false;
            this.week31_show = (response[x][31] == 1) ? true : false;
            this.week32_show = (response[x][32] == 1) ? true : false;
            this.week33_show = (response[x][33] == 1) ? true : false;
            this.week34_show = (response[x][34] == 1) ? true : false;
            this.week35_show = (response[x][35] == 1) ? true : false;
            this.week36_show = (response[x][36] == 1) ? true : false;
            this.week37_show = (response[x][37] == 1) ? true : false;
            this.week38_show = (response[x][38] == 1) ? true : false;
            this.week39_show = (response[x][39] == 1) ? true : false;
            this.week40_show = (response[x][40] == 1) ? true : false;
            this.week41_show = (response[x][41] == 1) ? true : false;
            this.week42_show = (response[x][42] == 1) ? true : false;
            this.week43_show = (response[x][43] == 1) ? true : false;
            this.week44_show = (response[x][44] == 1) ? true : false;
            this.week45_show = (response[x][45] == 1) ? true : false;
            this.week46_show = (response[x][46] == 1) ? true : false;
            this.week47_show = (response[x][47] == 1) ? true : false;
            this.week48_show = (response[x][48] == 1) ? true : false;
            this.week49_show = (response[x][49] == 1) ? true : false;
            this.week50_show = (response[x][50] == 1) ? true : false;
            this.week51_show = (response[x][51] == 1) ? true : false;
            this.week52_show = (response[x][52] == 1) ? true : false;
            this.week53_show = (response[x][53] == 1) ? true : false;

          } else {

            this.dados.push({
              filtros: filtros,
              equipamento: response[x][0],
              id_equipamento: response[x][54],
              localizacao: response[x][55],
              exp_week1: this.transforma_dados_exp(response[x][1], 1),
              exp_week2: this.transforma_dados_exp(response[x][2], 2),
              exp_week3: this.transforma_dados_exp(response[x][3], 3),
              exp_week4: this.transforma_dados_exp(response[x][4], 4),
              exp_week5: this.transforma_dados_exp(response[x][5], 5),
              exp_week6: this.transforma_dados_exp(response[x][6], 6),
              exp_week7: this.transforma_dados_exp(response[x][7], 7),
              exp_week8: this.transforma_dados_exp(response[x][8], 8),
              exp_week9: this.transforma_dados_exp(response[x][9], 9),
              exp_week10: this.transforma_dados_exp(response[x][10], 10),
              exp_week11: this.transforma_dados_exp(response[x][11], 11),
              exp_week12: this.transforma_dados_exp(response[x][12], 12),
              exp_week13: this.transforma_dados_exp(response[x][13], 13),
              exp_week14: this.transforma_dados_exp(response[x][14], 14),
              exp_week15: this.transforma_dados_exp(response[x][15], 15),
              exp_week16: this.transforma_dados_exp(response[x][16], 16),
              exp_week17: this.transforma_dados_exp(response[x][17], 17),
              exp_week18: this.transforma_dados_exp(response[x][18], 18),
              exp_week19: this.transforma_dados_exp(response[x][19], 19),
              exp_week20: this.transforma_dados_exp(response[x][20], 20),
              exp_week21: this.transforma_dados_exp(response[x][21], 21),
              exp_week22: this.transforma_dados_exp(response[x][22], 22),
              exp_week23: this.transforma_dados_exp(response[x][23], 23),
              exp_week24: this.transforma_dados_exp(response[x][24], 24),
              exp_week25: this.transforma_dados_exp(response[x][25], 25),
              exp_week26: this.transforma_dados_exp(response[x][26], 26),
              exp_week27: this.transforma_dados_exp(response[x][27], 27),
              exp_week28: this.transforma_dados_exp(response[x][28], 28),
              exp_week29: this.transforma_dados_exp(response[x][29], 29),
              exp_week30: this.transforma_dados_exp(response[x][30], 30),
              exp_week31: this.transforma_dados_exp(response[x][31], 31),
              exp_week32: this.transforma_dados_exp(response[x][32], 32),
              exp_week33: this.transforma_dados_exp(response[x][33], 33),
              exp_week34: this.transforma_dados_exp(response[x][34], 34),
              exp_week35: this.transforma_dados_exp(response[x][35], 35),
              exp_week36: this.transforma_dados_exp(response[x][36], 36),
              exp_week37: this.transforma_dados_exp(response[x][37], 37),
              exp_week38: this.transforma_dados_exp(response[x][38], 38),
              exp_week39: this.transforma_dados_exp(response[x][39], 39),
              exp_week40: this.transforma_dados_exp(response[x][40], 40),
              exp_week41: this.transforma_dados_exp(response[x][41], 41),
              exp_week42: this.transforma_dados_exp(response[x][42], 42),
              exp_week43: this.transforma_dados_exp(response[x][43], 43),
              exp_week44: this.transforma_dados_exp(response[x][44], 44),
              exp_week45: this.transforma_dados_exp(response[x][45], 45),
              exp_week46: this.transforma_dados_exp(response[x][46], 46),
              exp_week47: this.transforma_dados_exp(response[x][47], 47),
              exp_week48: this.transforma_dados_exp(response[x][48], 48),
              exp_week49: this.transforma_dados_exp(response[x][49], 49),
              exp_week50: this.transforma_dados_exp(response[x][50], 50),
              exp_week51: this.transforma_dados_exp(response[x][51], 51),
              exp_week52: this.transforma_dados_exp(response[x][52], 52),
              exp_week53: this.transforma_dados_exp(response[x][53], 53),
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
              /*week1_show: this.week1_show,
              week2_show: this.week2_show,
              week3_show: this.week3_show,
              week4_show: this.week4_show,
              week5_show: this.week5_show,
              week6_show: this.week6_show,
              week7_show: this.week7_show,
              week8_show: this.week8_show,
              week9_show: this.week9_show,
              week10_show: this.week10_show,
              week11_show: this.week11_show,
              week12_show: this.week12_show,
              week13_show: this.week13_show,
              week14_show: this.week14_show,
              week15_show: this.week15_show,
              week16_show: this.week16_show,
              week17_show: this.week17_show,
              week18_show: this.week18_show,
              week19_show: this.week19_show,
              week20_show: this.week20_show,
              week21_show: this.week21_show,
              week22_show: this.week22_show,
              week23_show: this.week23_show,
              week24_show: this.week24_show,
              week25_show: this.week25_show,
              week26_show: this.week26_show,
              week27_show: this.week27_show,
              week28_show: this.week28_show,
              week29_show: this.week29_show,
              week30_show: this.week30_show,
              week31_show: this.week31_show,
              week32_show: this.week32_show,
              week33_show: this.week33_show,
              week34_show: this.week34_show,
              week35_show: this.week35_show,
              week36_show: this.week36_show,
              week37_show: this.week37_show,
              week38_show: this.week38_show,
              week39_show: this.week39_show,
              week40_show: this.week40_show,
              week41_show: this.week41_show,
              week42_show: this.week42_show,
              week43_show: this.week43_show,
              week44_show: this.week44_show,
              week45_show: this.week45_show,
              week46_show: this.week46_show,
              week47_show: this.week47_show,
              week48_show: this.week48_show,
              week49_show: this.week49_show,
              week50_show: this.week50_show,
              week51_show: this.week51_show,
              week52_show: this.week52_show,
              week53_show: this.week53_show,*/
            });
          }

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

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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


  transforma_dados_exp(valor, semana) {
    var v_return = "";
    if (valor == null) return null;
    var array = valor.split('|')
    for (var x in array) {
      var array2 = array[x].split('::');
      if (array2.length > 1) {

        if (array2[2] != 'P' && array2[0] == 'green' && array2[3] != array2[4]) {
          if (this.ver_atrasos) v_return += "<b style='margin-right:5px; color:" + ((this.getTitle(array2[2], array2[0], array2[3], array2[4]) != null) ? '#ffb22e' : array2[0]) + ";'> " + ((array2[2] == 'P') ? array2[1] : array2[2]) + " </b>"
        } else {
          v_return += "<b style='margin-right:5px; color:" + ((this.getTitle(array2[2], array2[0], array2[3], array2[4]) != null) ? '#ffb22e' : array2[0]) + ";'> " + ((array2[2] == 'P') ? array2[1] : array2[2]) + " </b>"
        }
      }
    }
    return v_return;
  }

  getTitle(id, estado, semana_conclui, semana_prevista) {


    if (id != 'P' && semana_conclui != 0 && semana_conclui != semana_prevista) {
      if (estado == 'red') {
        return "Manutenção Concluída na Semana " + semana_conclui + ".";
      } else {
        return "Manutenção Prevista para a Semana " + semana_prevista + ".";
      }

    } else {
      return null;
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

  clicaSemana(semana) {
    this.semanas = [semana];
    this.carregaAnalise();
  }

  limpar() {
    this.AMBITO_MANUTENCAO = null;
    this.localizacao = null;
    this.equipamento = null;
    this.nivel = null;
    this.drop_niveis = [];
    this.departamento = null;
    this.ver_atrasos = false;
    this.semanas = [];
    this.DATA_INCIO = null;
    this.DATA_FIM = null;
    this.carregaAnalise();

  }

  imprimir(formato, filenametransfer) {
    this.loadingFile = true;
    var filename = new Date().toLocaleString().replace(/\D/g, '');
    //var filenametransfer = "planos_de_acao";

    var data;
    var dados = [];
    dados = this.dados;
    //console.log(JSON.stringify(dados))

    data = [{ dados: JSON.stringify(dados) }];

    this.RelatoriosService.downloadPDF2(formato, filename, data, filenametransfer, "manutencoes").subscribe(
      (res) => {
        this.loadingFile = false;
        FileSaver.saveAs(res, 'Mapa Preventivas');
      }, error => {
        this.loadingFile = false;
        this.showMessage('error', 'Erro', 'ERRO!! Falha ao gerar o Ficheiro!');
        console.log(error);
      });
  }

  showMessage(severity, summary, detail) {
    var msgs = [];
    msgs.push({ severity: severity, summary: summary, detail: detail });
    this.UploadService.addMessage(msgs);
  }
}
