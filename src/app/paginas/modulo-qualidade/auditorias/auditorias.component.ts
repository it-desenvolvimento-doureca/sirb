import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ActivatedRoute, Router } from '@angular/router';
import { QUAMOVAUDITORIASService } from 'app/servicos/qua-mov-auditorias.service';
import { QUA_MOV_AUDITORIAS } from 'app/entidades/QUA_MOV_AUDITORIAS';

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styleUrls: ['./auditorias.component.css']
})
export class AuditoriasComponent implements OnInit {

  totalano_previstas = 0;
  totalano_realizadas = 0;
  totalano_eficiencia = 0;
  totalmes1_previstas = 0;
  totalmes1_realizadas = 0;
  totalmes1_eficiencia = 0;
  totalmes2_previstas = 0;
  totalmes2_realizadas = 0;
  totalmes2_eficiencia = 0;
  totalmes3_previstas = 0;
  totalmes3_realizadas = 0;
  totalmes3_eficiencia = 0;
  totalmes4_previstas = 0;
  totalmes4_realizadas = 0;
  totalmes4_eficiencia = 0;
  totalmes5_previstas = 0;
  totalmes5_realizadas = 0;
  totalmes5_eficiencia = 0;
  totalmes6_previstas = 0;
  totalmes6_realizadas = 0;
  totalmes6_eficiencia = 0;
  totalmes7_previstas = 0;
  totalmes7_realizadas = 0;
  totalmes7_eficiencia = 0;
  totalmes8_previstas = 0;
  totalmes8_realizadas = 0;
  totalmes8_eficiencia = 0;
  totalmes9_previstas = 0;
  totalmes9_realizadas = 0;
  totalmes9_eficiencia = 0;
  totalmes10_previstas = 0;
  totalmes10_realizadas = 0;
  totalmes10_eficiencia = 0;
  totalmes11_previstas = 0;
  totalmes11_realizadas = 0;
  totalmes11_eficiencia = 0;
  totalmes12_previstas = 0;
  totalmes12_realizadas = 0;
  totalmes12_eficiencia = 0;

  modoedicao: boolean;
  novo: boolean;
  user: any;
  user_nome: any;
  adminuser: any;
  ano;
  anos = [];



  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;

  id_PLANEAMENTO: any;
  displayverificar: boolean;
  mensagem_verifica: string;
  dados_linha = [];

  constructor(private location: Location, private elementRef: ElementRef, private route: ActivatedRoute, private QUAMOVAUDITORIASService: QUAMOVAUDITORIASService,
    private renderer: Renderer, private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    this.globalVar.setapagar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);


    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);

        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

        //this.carregaDados(false, null);

      } else if (urlarray[1].match("view")) {

        this.globalVar.setcriar(false);
      }
    }


    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node55editar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node55apagar"));



    this.ano = new Date().getUTCFullYear();

    this.carregalinhas(this.ano);
  }





  //ao alterar ano
  alteraAno(event) {

    this.atualizatabela_linhas(event.value);
  }

  atualizatabela_linhas(ano) {

    this.carregalinhas(ano)
  }


  carregalinhas(ano) {

    this.QUAMOVAUDITORIASService.getByANO(ano).subscribe(
      response => {
        var count = Object.keys(response).length;
        this.dados_linha = [];
        if (count > 0) {

          for (var x in response) {

            this.dados_linha.push({
              id_TIPO_AUDITORIA: response[x][0],
              id_AUDITORIA: response[x][1],
              tipo_auditoria: response[x][2],
              ano: response[x][3],
              ano_previstas: 0,
              ano_realizadas: 0,
              ano_eficiencia: 0,
              mes1_previstas: response[x][4],
              mes1_realizadas: response[x][5],
              mes1_eficiencia: 0,
              mes2_previstas: response[x][6],
              mes2_realizadas: response[x][7],
              mes2_eficiencia: 0,
              mes3_previstas: response[x][8],
              mes3_realizadas: response[x][9],
              mes3_eficiencia: 0,
              mes4_previstas: response[x][10],
              mes4_realizadas: response[x][11],
              mes4_eficiencia: 0,
              mes5_previstas: response[x][12],
              mes5_realizadas: response[x][13],
              mes5_eficiencia: 0,
              mes6_previstas: response[x][14],
              mes6_realizadas: response[x][15],
              mes6_eficiencia: 0,
              mes7_previstas: response[x][16],
              mes7_realizadas: response[x][17],
              mes7_eficiencia: 0,
              mes8_previstas: response[x][18],
              mes8_realizadas: response[x][19],
              mes8_eficiencia: 0,
              mes9_previstas: response[x][20],
              mes9_realizadas: response[x][21],
              mes9_eficiencia: 0,
              mes10_previstas: response[x][22],
              mes10_realizadas: response[x][23],
              mes10_eficiencia: 0,
              mes11_previstas: response[x][24],
              mes11_realizadas: response[x][25],
              mes11_eficiencia: 0,
              mes12_previstas: response[x][26],
              mes12_realizadas: response[x][27],
              mes12_eficiencia: 0,
            });
          }

          this.dados_linha = this.dados_linha.slice();
          this.atualizatotais(1);
        } else {
          this.atualizatotais(1);
        }
      }, error => { console.log(error); });


  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    this.location.back();
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



  gravar() {


    for (var x in this.dados_linha) {
      var linha = new QUA_MOV_AUDITORIAS;
      linha.id_AUDITORIA = this.dados_linha[x].id_AUDITORIA;
      linha.id_TIPO_AUDITORIA = this.dados_linha[x].id_TIPO_AUDITORIA;
      linha.ano = this.dados_linha[x].ano;

      linha.data_MODIF = new Date();
      linha.utz_MODIF = this.user;

      linha.quantidade_REALIZADA_MES_1 = this.dados_linha[x].mes1_realizadas;
      linha.quantidade_REALIZADA_MES_2 = this.dados_linha[x].mes2_realizadas;
      linha.quantidade_REALIZADA_MES_3 = this.dados_linha[x].mes3_realizadas;
      linha.quantidade_REALIZADA_MES_4 = this.dados_linha[x].mes4_realizadas;
      linha.quantidade_REALIZADA_MES_5 = this.dados_linha[x].mes5_realizadas;
      linha.quantidade_REALIZADA_MES_6 = this.dados_linha[x].mes6_realizadas;
      linha.quantidade_REALIZADA_MES_7 = this.dados_linha[x].mes7_realizadas;
      linha.quantidade_REALIZADA_MES_8 = this.dados_linha[x].mes8_realizadas;
      linha.quantidade_REALIZADA_MES_9 = this.dados_linha[x].mes9_realizadas;
      linha.quantidade_REALIZADA_MES_10 = this.dados_linha[x].mes10_realizadas;
      linha.quantidade_REALIZADA_MES_11 = this.dados_linha[x].mes11_realizadas;
      linha.quantidade_REALIZADA_MES_12 = this.dados_linha[x].mes12_realizadas;

      this.gravarlinhas_save(linha, x);
    }


    this.router.navigate(['auditorias']);


    this.simular(this.inputgravou);
  }

  gravarlinhas_save(linha, x) {
    this.QUAMOVAUDITORIASService.update(linha).subscribe(
      res => {
        this.dados_linha[x].id_AUDITORIA = res.id_AUDITORIA;
      },
      error => { console.log(error); });
  }


  atualizatotais(mes) {

    var mes_atual = 11;

    for (var u = 1; u <= 12; u++) {
      this['totalmes' + u + '_eficiencia'] = 0;
      this['totalmes' + u + '_previstas'] = 0;
      this['totalmes' + u + '_realizadas'] = 0;
    }
    this.totalano_previstas = 0;
    this.totalano_realizadas = 0;
    this.totalano_eficiencia = 0;

    for (var x in this.dados_linha) {
      this.dados_linha[x].ano_eficiencia = 0;
      this.dados_linha[x].ano_previstas = 0;
      this.dados_linha[x].ano_realizadas = 0;
      for (var i = 1; i <= 12; i++) {
        this['totalmes' + i + '_realizadas'] += this.dados_linha[x]['mes' + i + '_realizadas'];
        this['totalmes' + i + '_previstas'] += this.dados_linha[x]['mes' + i + '_previstas'];

        this.dados_linha[x]['mes' + i + '_eficiencia'] = (this.dados_linha[x]['mes' + i + '_previstas'] <= 0) ? 0 : ((this.dados_linha[x]['mes' + i + '_realizadas'] / this.dados_linha[x]['mes' + i + '_previstas']) * 100);

        if (i <= mes_atual) {
          this.dados_linha[x].ano_previstas += this.dados_linha[x]['mes' + i + '_previstas'];
          this.dados_linha[x].ano_realizadas += this.dados_linha[x]['mes' + i + '_realizadas'];
        }
      }

      this.dados_linha[x].ano_eficiencia = (this.dados_linha[x].ano_previstas <= 0) ? 0 : ((this.dados_linha[x].ano_realizadas / this.dados_linha[x].ano_previstas) * 100);

      this.totalano_previstas += this.dados_linha[x].ano_previstas;
      this.totalano_realizadas += this.dados_linha[x].ano_realizadas;
    }

    this.totalano_eficiencia = (this.totalano_previstas <= 0) ? 0 : ((this.totalano_realizadas / this.totalano_previstas) * 100);


    for (var c = 1; c <= 12; c++) {
      this['totalmes' + c + '_eficiencia'] = (this['totalmes' + c + '_previstas'] <= 0) ? 0 : ((this['totalmes' + c + '_realizadas'] / this['totalmes' + c + '_previstas']) * 100);
    }
  }

}

