import { Component, OnInit, Renderer } from '@angular/core';
import { PRDICSEMANASANALISEService } from 'app/servicos/pr-dic-semanas-analise.service';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICPRODUCAOSEMANAService } from 'app/servicos/pr-dic-producao-semana.service';
import { PR_DIC_PRODUCAO_SEMANA } from 'app/entidades/PR_DIC_PRODUCAO_SEMANA';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';

@Component({
  selector: 'app-dias-producao',
  templateUrl: './dias-producao.component.html',
  styleUrls: ['./dias-producao.component.css']
})
export class DiasProducaoComponent implements OnInit {
  novo: boolean;
  dialognovo: boolean;

  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  ano;
  semana;
  hora_INICIO;
  n_DIAS_PRODUCAO;
  id_linha;

  dados: any[];
  anos = [];
  semanas = [];
  id: number;
  user: any;
  producao: any;
  cor_linha: string;
  linhas: any[];

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService,
    private PRDICPRODUCAOSEMANAService: PRDICPRODUCAOSEMANAService, private renderer: Renderer) { }


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
    this.globalVar.setduplicar(false);
    this.globalVar.setcriar(false);

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9211editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9211apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9211criar");

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.anos.push({ label: 'Selecionar Ano', value: '' });
    /*this.meses.push({ label: 'Selecionar Mês', value: '' });
    this.meses.push({ label: 'Janeiro', value: 1 });
    this.meses.push({ label: 'Fevereiro', value: 2 });
    this.meses.push({ label: 'Março', value: 3 });
    this.meses.push({ label: 'Abril', value: 4 });
    this.meses.push({ label: 'Maio', value: 5 });
    this.meses.push({ label: 'Junho', value: 6 });
    this.meses.push({ label: 'Julho', value: 7 });
    this.meses.push({ label: 'Agosto', value: 8 });
    this.meses.push({ label: 'Setembro', value: 9 });
    this.meses.push({ label: 'Outubro', value: 10 });
    this.meses.push({ label: 'Novembro', value: 11 });
    this.meses.push({ label: 'Dezembro', value: 12 });*/
    for (var x = 2000; x <= 2100; x++) {
      this.anos.push({ label: x, value: x });
    }

    this.listar();
    this.preenchelinhas();
  }


  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }

        this.linhas = this.linhas.slice();

      },
      error => { console.log(error); });
  }


  //gravar unidade de zona
  gravardados() {
    var producao = new PR_DIC_PRODUCAO_SEMANA;
    if (!this.novo) producao = this.producao;
    producao.ano = this.ano;
    producao.semana = this.semana;
    producao.n_DIAS_PRODUCAO = this.n_DIAS_PRODUCAO;
    if (this.id_linha != null) producao.id_LINHA = this.id_linha.id;
    producao.data_MODIF = new Date();
    producao.utz_MODIF = this.user;
    if (this.novo) {
      producao.data_CRIA = new Date();
      producao.utz_CRIA = this.user;
      producao.ativo = true;
      this.PRDICPRODUCAOSEMANAService.create(producao).subscribe(response => {
        this.listar();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      producao.id_PRODUCAO_SEMANA = this.id;

      this.PRDICPRODUCAOSEMANAService.update(producao).subscribe(() => {
        this.listar();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.PRDICPRODUCAOSEMANAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            id: response[x][0].id_PRODUCAO_SEMANA,
            dados: response[x][0],
            ano: response[x][0].ano,
            semana: response[x][0].semana,
            n_DIAS_PRODUCAO: response[x][0].n_DIAS_PRODUCAO,
            linha: response[x][1],
            id_linha: response[x][0].id_LINHA
          });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }

  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  //apagar zona
  apagardados() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var producao = new PR_DIC_PRODUCAO_SEMANA;
        producao = this.producao;
        producao.data_ANULA = new Date();
        producao.utz_ANULA = this.user;
        producao.ativo = false;
        this.PRDICPRODUCAOSEMANAService.update(producao).subscribe(() => {
          this.listar();
        });
      }, reject: () => {
        this.dialognovo = true;
      }
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {
      this.producao = event.data.dados;
      this.id = event.data.id;
      this.ano = event.data.ano;
      this.semana = event.data.semana;
      this.n_DIAS_PRODUCAO = event.data.n_DIAS_PRODUCAO;
      //this.id_linha = event.data.id_linha;
      this.id_linha = (event.data.id_linha == null) ? null : this.linhas.find(item => item.value.id === event.data.id_linha).value;
      this.cor_linha = (event.data.id_linha == null) ? null : this.linhas.find(item => item.value.id === event.data.id_linha).value.cor;

      this.novo = false;
      this.dialognovo = true;
    }
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id = null;
    this.ano = new Date().getFullYear();
    this.semana = null;
    this.n_DIAS_PRODUCAO = null;
    this.id_linha = null;
    this.cor_linha = "";
    this.dialognovo = true;
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    } else {
      this.cor_linha = "";
    }
  }

}

