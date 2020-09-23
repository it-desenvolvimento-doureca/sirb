import { Component, ElementRef, OnInit } from '@angular/core';
import { FINSEGUIMENTOFATURACAOANUALService } from 'app/servicos/fin-seguimento-faturacao-anual.service';
import { GERDICOEMService } from 'app/servicos/ger-dic-oem.service';
import { GERDICPROJCABService } from 'app/servicos/ger-dic-proj-cab.service';
import { GERDICVEICULOService } from 'app/servicos/ger-dic-veiculo.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { element } from 'protractor';

@Component({
  selector: 'app-seguimento-faturacao-anual',
  templateUrl: './seguimento-faturacao-anual.component.html',
  styleUrls: ['./seguimento-faturacao-anual.component.css']
})
export class SeguimentoFaturacaoAnualComponent implements OnInit {
  referencia_principal: any;
  filteredreferencias: any[];
  artigos: any = [];
  lista_veiculos: any[];
  lista_oem: any[];
  lista_clientes: any[];
  anos: any = [];
  ativobt = "1";
  oem;
  ano;
  veiculos;
  loading;
  clientes;
  campo_ref;
  lista_racks;
  options;
  data_graf = {};
  clientesano1 = [];
  referenciasano1;
  veiculo_projetosano1;
  clientesano2;
  referenciasano2;
  veiculo_projetosano2;
  clientestrading;
  referenciastrading;
  veiculo_projetostrading;
  clientessubcontrato;
  referenciassubcontrato;
  veiculo_projetossubcontrato;
  ano1;
  trading;
  ano2;
  subcontrato;
  trading_subcontrato;
  variacao_acumulada;
  variacao_mensal;
  faturas_ferramentas;
  faturas_ferramentas_servicos;
  outras_faturacoes;
  auto_faturas;
  debitos_clientes;
  creditos_clientes;
  devolucoes;
  descontos_abatimentos;
  total_realizado_ano1;
  total_realizado_ano2;
  variacao_mensal2;
  variacao_acumulada2;
  budget;
  variacao_mensal3;
  variacao_acumulada3;
  clientesfaturas_ferramentas = [];
  referenciasfaturas_ferramentas = [];
  veiculo_projetosfaturas_ferramentas = [];
  clientesfaturas_ferramentas_servicos = [];
  referenciasfaturas_ferramentas_servicos = [];
  veiculo_projetosfaturas_ferramentas_servicos = [];
  clientesoutras_faturacoes = [];
  referenciasoutras_faturacoes = [];
  veiculo_projetosoutras_faturacoes = [];
  clientesauto_faturas = [];
  referenciasauto_faturas = [];
  veiculo_projetosauto_faturas = [];
  clientesdebitos_clientes = [];
  referenciasdebitos_clientes = [];
  veiculo_projetosdebitos_clientes = [];
  clientescreditos_clientes = [];
  referenciascreditos_clientes = [];
  veiculo_projetoscreditos_clientes = [];
  clientesdescontos_abatimentos = [];
  referenciasdescontos_abatimentos = [];
  veiculo_projetosdescontos_abatimentos = [];
  clientestotal_realizado_ano1 = [];
  referenciastotal_realizado_ano1 = [];
  veiculo_projetostotal_realizado_ano1 = [];
  clientestotal_realizado_ano2 = [];
  referenciastotal_realizado_ano2 = [];
  veiculo_projetostotal_realizado_ano2 = [];

  atualizaclientesubcontrato = false;
  atualizaveiculo_projetosubcontrato = false;
  atualizaclientefaturas_ferramentas_servicos = false;
  atualizareferenciafaturas_ferramentas_servicos = false;
  atualizaveiculo_projetofaturas_ferramentas_servicos = false;
  atualizaclientefaturas_ferramentas = false;
  atualizareferenciafaturas_ferramentas = false;
  atualizaveiculo_projetofaturas_ferramentas = false;
  atualizaclienteoutras_faturacoes = false;
  atualizareferenciaoutras_faturacoes = false;
  atualizaveiculo_projetooutras_faturacoes = false;
  atualizaclienteauto_faturas = false;
  atualizareferenciaauto_faturas = false;
  atualizaveiculo_projetoauto_faturas = false;
  atualizaclientedebitos_clientes = false;
  atualizareferenciadebitos_clientes = false;
  atualizaveiculo_projetodebitos_clientes = false;
  atualizaclientecreditos_clientes = false;
  atualizareferenciacreditos_clientes = false;
  atualizaveiculo_projetocreditos_clientes = false;
  atualizaclientedescontos_abatimentos = false;
  atualizareferenciadescontos_abatimentos = false;
  atualizaveiculo_projetodescontos_abatimentos = false;
  atualizaclientetotal_realizado_ano1 = false;
  atualizareferenciatotal_realizado_ano1 = false;
  atualizaveiculo_projetototal_realizado_ano1 = false;
  atualizaclientetotal_realizado_ano2 = false;
  atualizareferenciatotal_realizado_ano2 = false;
  atualizaveiculo_projetototal_realizado_ano2 = false;
  atualizaclienteano1 = false;
  atualizareferenciaano1 = false;
  atualizaveiculo_projetoano1 = false;
  atualizaclienteano2 = false;
  atualizareferenciaano2 = false;
  atualizaveiculo_projetoano2 = false;
  atualizaclientetrading = false;
  atualizareferenciatrading = false;
  atualizaveiculo_projetotrading = false;
  atualizareferenciasubcontrato = false;
  projeto: any;
  ano_anterior: number;
  show_tabela = true;
  projetos: any;
  dados_filtro: { ANO: any; PROREF: any; CLIENTES: any; ID_ANALISE: any; PROJETOS: any; VEICULOS: any; OEM: any; }[];
  atualiza_ano1: boolean;
  atualiza_ano2: boolean;
  atualiza_trading: boolean;
  atualiza_subcontrato: boolean;
  atualiza_faturas_ferramentas_servicos: boolean;
  atualiza_faturas_ferramentas: boolean;
  atualiza_outras_faturacoes: boolean;
  atualiza_auto_faturas: boolean;
  atualiza_debitos_clientes: boolean;
  atualiza_creditos_clientes: boolean;
  atualiza_devolucoes: boolean;
  atualiza_descontos_abatimentos: boolean;
  atualiza_total_realizado_ano1: boolean;
  atualiza_total_realizado_ano2: boolean;
  atualiza_budget: boolean;
  srcelement: any;

  constructor(private elementRef: ElementRef, private GERDICVEICULOService: GERDICVEICULOService, private GERDICOEMService: GERDICOEMService,
    private GERDICPROJCABService: GERDICPROJCABService, private FINSEGUIMENTOFATURACAOANUALService: FINSEGUIMENTOFATURACAOANUALService) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

    for (var x = 2010; x <= new Date().getFullYear() + 10; x++) {
      this.anos.push({ value: x, label: x })
    }


    this.carregaclientes();
    this.listar_refs();
    this.carregaoem();
    this.carregaveiculos();
    this.carregaprojetos();


    this.ano = new Date().getFullYear();
    this.ano_anterior = this.ano - 1;
    this.atualizar();
  }




  atualizar() {
    this.show_tabela = false;

    setTimeout(() => {
      this.show_tabela = true;
    }, 5);

    this.limpar_dados();


    this.ano_anterior = this.ano - 1;

    //this.loading = true;

    var veiculos = null;
    var oem = null;
    var projeto = null;
    var clientes = null;
    var referencia_principal = null;


    if (this.veiculos != null && this.veiculos.length > 0) { veiculos = this.veiculos.toString() }
    if (this.oem != null && this.oem.length > 0) { oem = this.oem.toString() }
    if (this.projeto != null && this.projeto.length > 0) { projeto = this.projeto.toString() }

    if (this.clientes != null && this.clientes.length > 0) { clientes = this.clientes.toString() }
    if (this.referencia_principal != "" && this.referencia_principal != null && this.campo_ref != "" && this.campo_ref != null) { referencia_principal = this.referencia_principal }


    var dados = [{
      ANO: this.ano, PROREF: referencia_principal, CLIENTES: clientes, ID_ANALISE: null,
      PROJETOS: projeto, VEICULOS: veiculos, OEM: oem
    }];

    this.dados_filtro = dados;

    this.carrega_linhas(dados);
  }

  carrega_linhas(dados) {
    //1	ANO  
    this.atualiza_ano1 = true;
    this.atualiza_ano2 = true;
    this.atualiza_trading = true;
    this.atualiza_subcontrato = true;
    this.atualiza_faturas_ferramentas_servicos = true;
    this.atualiza_faturas_ferramentas = true;
    this.atualiza_outras_faturacoes = true;
    this.atualiza_auto_faturas = true;
    this.atualiza_debitos_clientes = true;
    this.atualiza_creditos_clientes = true;
    this.atualiza_devolucoes = true;
    this.atualiza_descontos_abatimentos = true;
    this.atualiza_total_realizado_ano1 = true;
    this.atualiza_total_realizado_ano2 = true;
    this.atualiza_budget = true;

    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS(dados).subscribe(
      response => {
        for (var x in response) {
          if (response[x][2] == this.ano) {
            this.ano2['acumulado'] = response[x][3];
            this.ano2[response[x][1]] = response[x][0];
          } else {
            this.ano1['acumulado'] = response[x][3];
            this.ano1[response[x][1]] = response[x][0];
          }
        }
        this.atualiza_ano1 = false;
        this.atualiza_ano2 = false;
        this.calcular_totais();
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_ano1 = false;
        this.atualiza_ano2 = false;
        this.carregagraficos();
      });

    //2	Trading  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO(dados, 2).subscribe(
      response => {
        for (var x in response) {
          this.trading['acumulado'] = response[x][3];
          this.trading[response[x][1]] = response[x][0];
        }
        this.atualiza_trading = false;
        this.calcular_totais();
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_trading = false;
        this.carregagraficos();
      });

    //3	100% SubContrato   
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO(dados, 3).subscribe(
      response => {
        for (var x in response) {
          this.subcontrato['acumulado'] = response[x][3];
          this.subcontrato[response[x][1]] = response[x][0];
        }
        this.atualiza_subcontrato = false;
        this.calcular_totais();
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_subcontrato = false;
        this.carregagraficos();
      });

    //4	Faturas Ferramentas (serviços)  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO(dados, 4).subscribe(
      response => {
        for (var x in response) {
          this.faturas_ferramentas_servicos['acumulado'] = response[x][3];
          this.faturas_ferramentas_servicos[response[x][1]] = response[x][0];
        }
        this.atualiza_faturas_ferramentas_servicos = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_faturas_ferramentas_servicos = false;
        this.carregagraficos();
      });
    //5	Faturas Ferramentas  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO(dados, 5).subscribe(
      response => {
        for (var x in response) {
          this.faturas_ferramentas['acumulado'] = response[x][3];
          this.faturas_ferramentas[response[x][1]] = response[x][0];
        }
        this.atualiza_faturas_ferramentas = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_faturas_ferramentas = false;
        this.carregagraficos();
      });
    //6	Outras Faturações  (exclusão dos protypcod)
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO(dados, 6).subscribe(
      response => {
        for (var x in response) {
          this.outras_faturacoes['acumulado'] = response[x][3];
          this.outras_faturacoes[response[x][1]] = response[x][0];
        }
        this.atualiza_outras_faturacoes = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_outras_faturacoes = false;
        this.carregagraficos();
      });
    //7	AutoFacturas  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2(dados, 7).subscribe(
      response => {
        for (var x in response) {
          this.auto_faturas['acumulado'] = response[x][3];
          this.auto_faturas[response[x][1]] = response[x][0];
        }
        this.atualiza_auto_faturas = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_auto_faturas = false;
        this.carregagraficos();
      });

    //8	Débitos a Clientes  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2(dados, 8).subscribe(
      response => {
        for (var x in response) {
          this.debitos_clientes['acumulado'] = response[x][3];
          this.debitos_clientes[response[x][1]] = response[x][0];
        }
        this.atualiza_debitos_clientes = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_debitos_clientes = false;
        this.carregagraficos();
      });

    //9	Créditos a Clientes 
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2(dados, 9).subscribe(
      response => {
        for (var x in response) {
          this.creditos_clientes['acumulado'] = response[x][3];
          this.creditos_clientes[response[x][1]] = response[x][0];
        }
        this.atualiza_creditos_clientes = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_creditos_clientes = false;
        this.carregagraficos();
      });

    //10	Devoluções  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_DEVOLUCOES(dados).subscribe(
      response => {
        for (var x in response) {
          this.devolucoes['acumulado'] = response[x][3];
          this.devolucoes[response[x][1]] = response[x][0];
        }
        this.atualiza_devolucoes = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_devolucoes = false;
        this.carregagraficos();
      });

    //11	Descontos e Abatimentos  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_DESCONTOS(dados).subscribe(
      response => {
        for (var x in response) {
          this.descontos_abatimentos['acumulado'] = response[x][3];
          this.descontos_abatimentos[response[x][1]] = response[x][0];
        }
        this.atualiza_descontos_abatimentos = false;
        this.carregagraficos();
      }, error => {
        console.log(error);
        this.atualiza_descontos_abatimentos = false;
        this.carregagraficos();
      });

    //12	Total Realizado  (todos docs)
    //13	Total Realizado  (docs a crédito/valor negativo)
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO(dados).subscribe(
      response => {
        for (var x in response) {
          if (response[x][2] == this.ano) {
            this.total_realizado_ano2['acumulado'] = response[x][3];
            this.total_realizado_ano2[response[x][1]] = response[x][0];
          } else {
            this.total_realizado_ano1['acumulado'] = response[x][3];
            this.total_realizado_ano1[response[x][1]] = response[x][0];
          }
        }
        this.atualiza_total_realizado_ano1 = false;
        this.atualiza_total_realizado_ano2 = false;
        this.carregagraficos();
        this.calcular_totais();
      }, error => {
        console.log(error);
        this.atualiza_total_realizado_ano1 = false;
        this.atualiza_total_realizado_ano2 = false;
        this.carregagraficos();
      });

    //	Budget  
    this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_BUDGET(dados).subscribe(
      response => {
        for (var x in response) {
          this.budget['acumulado'] = response[x][3];
          this.budget[response[x][1]] = response[x][0];
        }
        this.atualiza_budget = false;
        this.carregagraficos();
        this.calcular_totais();
      }, error => {
        console.log(error);
        this.atualiza_budget = false;
        this.carregagraficos();
      });
  }

  carregaveiculos() {
    this.lista_veiculos = [];
    this.GERDICVEICULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_veiculos.push({ label: response[x][1] + ' - ' + response[x][0].nome, value: response[x][0].id_VEICULO });
        }

        this.lista_veiculos = this.lista_veiculos.slice();
      }, error => {
        console.log(error);
      });

  }

  carregaprojetos() {
    this.GERDICPROJCABService.getAll2().subscribe(
      response => {
        this.projetos = [];
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.projetos.push({
              value: response[x][0], label: response[x][1] /*programa: response[x][1],
              oem: response[x][3], veiculo: response[x][2]*/
            });
            //this.dataTableComponent.filter("Ativo", 'estado', 'equals');
          }

          this.projetos = this.projetos.slice();
        }
      }, error => { console.log(error); });
  }

  carregaoem() {
    this.lista_oem = [];
    this.GERDICOEMService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.lista_oem.push({ label: response[x].nome, value: response[x].id_OEM });
        }

        this.lista_oem = this.lista_oem.slice();
      }, error => {
        console.log(error);
      });

  }

  carregaclientes() {
    this.lista_clientes = [];
    this.GERDICPROJCABService.getClientes().subscribe(
      response => {
        for (var x in response) {
          this.lista_clientes.push({ label: response[x][0] + ' - ' + response[x][1], value: response[x][0] });
        }

        this.lista_clientes = this.lista_clientes.slice();
      }, error => {
        console.log(error);
      });

  }

  listar_refs() {

    this.GERDICPROJCABService.getComponentes().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, desc_REF: response[x].PRODES1
          });
        }
        this.artigos = this.artigos.slice();

      },
      error => { console.log(error); });
  }


  /**** AUTO COMPLETE  */

  filterRef(event) {
    this.filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    this.referencia_principal = null;
  }

  filterSelect(event) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.referencia_principal = event.value;
    } else {
      this.referencia_principal = null;
    };
  }

  carrega_referenciasubcontrato() {


    if (!this.atualizareferenciasubcontrato && this.referenciassubcontrato.length == 0) {
      this.atualizareferenciasubcontrato = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(this.dados_filtro, 3).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciassubcontrato.find(item => item.id == response[x][3])) {
              var linha = this.referenciassubcontrato.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciassubcontrato.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciassubcontrato.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciasubcontrato = false;
        }, error => {
          this.atualizareferenciasubcontrato = false;
          console.log(error);
        });
    }

  }

  carrega_clientesubcontrato() {

    if (!this.atualizaclientesubcontrato && this.clientessubcontrato.length == 0) {
      this.atualizaclientesubcontrato = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(this.dados_filtro, 3).subscribe(
        response => {
          for (var x in response) {
            if (this.clientessubcontrato.find(item => item.id == response[x][3])) {
              var linha = this.clientessubcontrato.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientessubcontrato.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientessubcontrato.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientesubcontrato = false;
        }, error => {
          this.atualizaclientesubcontrato = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetosubcontrato() {

    if (!this.atualizaveiculo_projetosubcontrato && this.veiculo_projetossubcontrato.length == 0) {
      this.atualizaveiculo_projetosubcontrato = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(this.dados_filtro, 3).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetossubcontrato.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetossubcontrato.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetossubcontrato.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetossubcontrato.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetosubcontrato = false;
        }, error => {
          this.atualizaveiculo_projetosubcontrato = false;
          console.log(error);
        });
    }
  }

  carrega_clientefaturas_ferramentas_servicos() {


    if (!this.atualizaclientefaturas_ferramentas_servicos && this.clientesfaturas_ferramentas_servicos.length == 0) {
      this.atualizaclientefaturas_ferramentas_servicos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(this.dados_filtro, 4).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesfaturas_ferramentas_servicos.find(item => item.id == response[x][3])) {
              var linha = this.clientesfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesfaturas_ferramentas_servicos.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientefaturas_ferramentas_servicos = false;
        }, error => {
          this.atualizaclientefaturas_ferramentas_servicos = false;
          console.log(error);
        });
    }
  }
  carrega_referenciafaturas_ferramentas_servicos() {

    if (!this.atualizareferenciafaturas_ferramentas_servicos && this.referenciasfaturas_ferramentas_servicos.length == 0) {
      this.atualizareferenciafaturas_ferramentas_servicos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(this.dados_filtro, 4).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasfaturas_ferramentas_servicos.find(item => item.id == response[x][3])) {
              var linha = this.referenciasfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasfaturas_ferramentas_servicos.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciafaturas_ferramentas_servicos = false;
        }, error => {
          this.atualizareferenciafaturas_ferramentas_servicos = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetofaturas_ferramentas_servicos() {

    if (!this.atualizaveiculo_projetofaturas_ferramentas_servicos && this.veiculo_projetosfaturas_ferramentas_servicos.length == 0) {
      this.atualizaveiculo_projetofaturas_ferramentas_servicos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(this.dados_filtro, 4).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosfaturas_ferramentas_servicos.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosfaturas_ferramentas_servicos.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosfaturas_ferramentas_servicos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetofaturas_ferramentas_servicos = false;
        }, error => {
          this.atualizaveiculo_projetofaturas_ferramentas_servicos = false;
          console.log(error);
        });
    }
  }

  carrega_clientefaturas_ferramentas() {

    if (!this.atualizaclientefaturas_ferramentas && this.clientesfaturas_ferramentas.length == 0) {
      this.atualizaclientefaturas_ferramentas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(this.dados_filtro, 5).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesfaturas_ferramentas.find(item => item.id == response[x][3])) {
              var linha = this.clientesfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesfaturas_ferramentas.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientefaturas_ferramentas = false;
        }, error => {
          this.atualizaclientefaturas_ferramentas = false;
          console.log(error);
        });
    }
  }
  carrega_referenciafaturas_ferramentas() {

    if (!this.atualizareferenciafaturas_ferramentas && this.referenciasfaturas_ferramentas.length == 0) {
      this.atualizareferenciafaturas_ferramentas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(this.dados_filtro, 5).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasfaturas_ferramentas.find(item => item.id == response[x][3])) {
              var linha = this.referenciasfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasfaturas_ferramentas.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciafaturas_ferramentas = false;
        }, error => {
          this.atualizareferenciafaturas_ferramentas = false;
          console.log(error);
        });
    }
  }
  carrega_veiculo_projetofaturas_ferramentas() {

    if (!this.atualizaveiculo_projetofaturas_ferramentas && this.veiculo_projetosfaturas_ferramentas.length == 0) {
      this.atualizaveiculo_projetofaturas_ferramentas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(this.dados_filtro, 5).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosfaturas_ferramentas.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosfaturas_ferramentas.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosfaturas_ferramentas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetofaturas_ferramentas = false;
        }, error => {
          this.atualizaveiculo_projetofaturas_ferramentas = false;
          console.log(error);
        });
    }
  }

  carrega_clienteoutras_faturacoes() {
    if (!this.atualizaclientefaturas_ferramentas && this.clientesoutras_faturacoes.length == 0) {
      this.atualizaclienteoutras_faturacoes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(this.dados_filtro, 6).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesoutras_faturacoes.find(item => item.id == response[x][3])) {
              var linha = this.clientesoutras_faturacoes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesoutras_faturacoes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesoutras_faturacoes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclienteoutras_faturacoes = false;
        }, error => {
          this.atualizaclienteoutras_faturacoes = false;
          console.log(error);
        });
    }
  }

  carrega_referenciaoutras_faturacoes() {
    if (!this.atualizareferenciaoutras_faturacoes && this.referenciasoutras_faturacoes.length == 0) {
      this.atualizareferenciaoutras_faturacoes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(this.dados_filtro, 6).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasoutras_faturacoes.find(item => item.id == response[x][3])) {
              var linha = this.referenciasoutras_faturacoes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasoutras_faturacoes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasoutras_faturacoes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciaoutras_faturacoes = false;
        }, error => {
          this.atualizareferenciaoutras_faturacoes = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetooutras_faturacoes() {
    if (!this.atualizaveiculo_projetooutras_faturacoes && this.veiculo_projetosoutras_faturacoes.length == 0) {
      this.atualizaveiculo_projetooutras_faturacoes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(this.dados_filtro, 6).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosoutras_faturacoes.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosoutras_faturacoes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosoutras_faturacoes.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosoutras_faturacoes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetooutras_faturacoes = false;
        }, error => {
          this.atualizaveiculo_projetooutras_faturacoes = false;
          console.log(error);
        });
    }
  }

  carrega_clienteauto_faturas() {
    if (!this.atualizaclienteauto_faturas && this.clientesauto_faturas.length == 0) {
      this.atualizaclienteauto_faturas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_CLIENTES(this.dados_filtro, 7).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesauto_faturas.find(item => item.id == response[x][3])) {
              var linha = this.clientesauto_faturas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesauto_faturas.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesauto_faturas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclienteauto_faturas = false;
        }, error => {
          this.atualizaclienteauto_faturas = false;
          console.log(error);
        });
    }
  }

  carrega_referenciaauto_faturas() {
    if (!this.atualizareferenciaauto_faturas && this.referenciasauto_faturas.length == 0) {
      this.atualizareferenciaauto_faturas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_REFERENCIAS(this.dados_filtro, 7).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasauto_faturas.find(item => item.id == response[x][3])) {
              var linha = this.referenciasauto_faturas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasauto_faturas.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasauto_faturas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciaauto_faturas = false;
        }, error => {
          this.atualizareferenciaauto_faturas = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetoauto_faturas() {
    if (!this.atualizaveiculo_projetoauto_faturas && this.veiculo_projetosauto_faturas.length == 0) {
      this.atualizaveiculo_projetoauto_faturas = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_OEM_VEICULO_PROJETO(this.dados_filtro, 7).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosauto_faturas.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosauto_faturas.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosauto_faturas.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosauto_faturas.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetoauto_faturas = false;
        }, error => {
          this.atualizaveiculo_projetoauto_faturas = false;
          console.log(error);
        });
    }
  }

  carrega_clientedebitos_clientes() {
    if (!this.atualizaclientedebitos_clientes && this.clientesdebitos_clientes.length == 0) {
      this.atualizaclientedebitos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_CLIENTES(this.dados_filtro, 8).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesdebitos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.clientesdebitos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesdebitos_clientes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesdebitos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientedebitos_clientes = false;
        }, error => {
          this.atualizaclientedebitos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_referenciadebitos_clientes() {
    if (!this.atualizareferenciadebitos_clientes && this.referenciasdebitos_clientes.length == 0) {
      this.atualizareferenciadebitos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_REFERENCIAS(this.dados_filtro, 8).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasdebitos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.referenciasdebitos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasdebitos_clientes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasdebitos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciadebitos_clientes = false;
        }, error => {
          this.atualizareferenciadebitos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetodebitos_clientes() {
    if (!this.atualizaveiculo_projetodebitos_clientes && this.veiculo_projetosdebitos_clientes.length == 0) {
      this.atualizaveiculo_projetodebitos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_OEM_VEICULO_PROJETO(this.dados_filtro, 8).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosdebitos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosdebitos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosdebitos_clientes.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosdebitos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetodebitos_clientes = false;
        }, error => {
          this.atualizaveiculo_projetodebitos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_clientecreditos_clientes() {
    if (!this.atualizaveiculo_projetodebitos_clientes && this.clientescreditos_clientes.length == 0) {
      this.atualizaveiculo_projetodebitos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_CLIENTES(this.dados_filtro, 9).subscribe(
        response => {
          for (var x in response) {
            if (this.clientescreditos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.clientescreditos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientescreditos_clientes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientescreditos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientecreditos_clientes = false;
        }, error => {
          this.atualizaclientecreditos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_referenciacreditos_clientes() {
    if (!this.atualizareferenciacreditos_clientes && this.referenciascreditos_clientes.length == 0) {
      this.atualizareferenciacreditos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_REFERENCIAS(this.dados_filtro, 9).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciascreditos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.referenciascreditos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciascreditos_clientes.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciascreditos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciacreditos_clientes = false;
        }, error => {
          this.atualizareferenciacreditos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetocreditos_clientes() {
    if (!this.atualizaveiculo_projetocreditos_clientes && this.veiculo_projetoscreditos_clientes.length == 0) {
      this.atualizaveiculo_projetocreditos_clientes = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_2_OEM_VEICULO_PROJETO(this.dados_filtro, 9).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetoscreditos_clientes.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetoscreditos_clientes.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetoscreditos_clientes.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetoscreditos_clientes.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetocreditos_clientes = false;
        }, error => {
          this.atualizaveiculo_projetocreditos_clientes = false;
          console.log(error);
        });
    }
  }

  carrega_clientedescontos_abatimentos() {
    if (!this.atualizaclientedescontos_abatimentos && this.clientesdescontos_abatimentos.length == 0) {
      this.atualizaclientedescontos_abatimentos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_DESCONTOS_CLIENTES(this.dados_filtro).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesdescontos_abatimentos.find(item => item.id == response[x][3])) {
              var linha = this.clientesdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesdescontos_abatimentos.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientedescontos_abatimentos = false;
        }, error => {
          this.atualizaclientedescontos_abatimentos = false;
          console.log(error);
        });
    }
  }

  carrega_referenciadescontos_abatimentos() {
    if (!this.atualizareferenciadescontos_abatimentos && this.referenciasdescontos_abatimentos.length == 0) {
      this.atualizareferenciadescontos_abatimentos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_DESCONTOS_REFERENCIAS(this.dados_filtro).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasdescontos_abatimentos.find(item => item.id == response[x][3])) {
              var linha = this.referenciasdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasdescontos_abatimentos.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciadescontos_abatimentos = false;
        }, error => {
          this.atualizareferenciadescontos_abatimentos = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetodescontos_abatimentos() {
    if (!this.atualizaveiculo_projetodescontos_abatimentos && this.veiculo_projetosdescontos_abatimentos.length == 0) {
      this.atualizaveiculo_projetodescontos_abatimentos = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_DESCONTOS_OEM_VEICULO_PROJETO(this.dados_filtro).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosdescontos_abatimentos.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosdescontos_abatimentos.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosdescontos_abatimentos.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetodescontos_abatimentos = false;
        }, error => {
          this.atualizaveiculo_projetodescontos_abatimentos = false;
          console.log(error);
        });
    }
  }

  carrega_clientetotal_realizado_ano1() {
    if (!this.atualizaclientetotal_realizado_ano1 && this.clientestotal_realizado_ano1.length == 0) {
      this.atualizaclientetotal_realizado_ano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_CLIENTES(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.clientestotal_realizado_ano1.find(item => item.id == response[x][3])) {
              var linha = this.clientestotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientestotal_realizado_ano1.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientestotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientetotal_realizado_ano1 = false;
        }, error => {
          this.atualizaclientetotal_realizado_ano1 = false;
          console.log(error);
        });
    }
  }

  carrega_referenciatotal_realizado_ano1() {
    if (!this.atualizareferenciatotal_realizado_ano1 && this.referenciastotal_realizado_ano1.length == 0) {
      this.atualizareferenciatotal_realizado_ano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_REFERENCIAS(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciastotal_realizado_ano1.find(item => item.id == response[x][3])) {
              var linha = this.referenciastotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciastotal_realizado_ano1.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciastotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciatotal_realizado_ano1 = false;
        }, error => {
          this.atualizareferenciatotal_realizado_ano1 = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetototal_realizado_ano1() {
    if (!this.atualizaveiculo_projetototal_realizado_ano1 && this.veiculo_projetostotal_realizado_ano1.length == 0) {
      this.atualizaveiculo_projetototal_realizado_ano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_OEM_VEICULO_PROJETO(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetostotal_realizado_ano1.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetostotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetostotal_realizado_ano1.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetostotal_realizado_ano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetototal_realizado_ano1 = false;
        }, error => {
          this.atualizaveiculo_projetototal_realizado_ano1 = false;
          console.log(error);
        });
    }
  }

  carrega_clientetotal_realizado_ano2() {
    if (!this.atualizaclientetotal_realizado_ano2 && this.clientestotal_realizado_ano2.length == 0) {
      this.atualizaclientetotal_realizado_ano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_CLIENTES(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.clientestotal_realizado_ano2.find(item => item.id == response[x][3])) {
              var linha = this.clientestotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientestotal_realizado_ano2.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientestotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientetotal_realizado_ano2 = false;
        }, error => {
          this.atualizaclientetotal_realizado_ano2 = false;
          console.log(error);
        });
    }
  }

  carrega_referenciatotal_realizado_ano2() {
    if (!this.atualizareferenciatotal_realizado_ano2 && this.referenciastotal_realizado_ano2.length == 0) {
      this.atualizareferenciatotal_realizado_ano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_REFERENCIAS(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciastotal_realizado_ano2.find(item => item.id == response[x][3])) {
              var linha = this.referenciastotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciastotal_realizado_ano2.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciastotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciatotal_realizado_ano2 = false;
        }, error => {
          this.atualizareferenciatotal_realizado_ano2 = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetototal_realizado_ano2() {
    if (!this.atualizaveiculo_projetototal_realizado_ano2 && this.veiculo_projetostotal_realizado_ano2.length == 0) {
      this.atualizaveiculo_projetototal_realizado_ano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_OEM_VEICULO_PROJETO(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetostotal_realizado_ano2.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetostotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetostotal_realizado_ano2.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetostotal_realizado_ano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetototal_realizado_ano2 = false;
        }, error => {
          this.atualizaveiculo_projetototal_realizado_ano2 = false;
          console.log(error);
        });
    }
  }

  carrega_clienteano1() {
    if (!this.atualizaclienteano1 && this.clientesano1.length == 0) {
      this.atualizaclienteano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_CLIENTES(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesano1.find(item => item.id == response[x][3])) {
              var linha = this.clientesano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesano1.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclienteano1 = false;
        }, error => {
          this.atualizaclienteano1 = false;
          console.log(error);
        });
    }
  }

  carrega_referenciaano1() {
    if (!this.atualizareferenciaano1 && this.referenciasano1.length == 0) {
      this.atualizareferenciaano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_REFERENCIAS(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasano1.find(item => item.id == response[x][3])) {
              var linha = this.referenciasano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasano1.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciaano1 = false;
        }, error => {
          this.atualizareferenciaano1 = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetoano1() {
    if (!this.atualizaveiculo_projetoano1 && this.veiculo_projetosano1.length == 0) {
      this.atualizaveiculo_projetoano1 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_OEM_VEICULO_PROJETO(this.dados_filtro, this.ano_anterior).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosano1.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosano1.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosano1.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosano1.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetoano1 = false;
        }, error => {
          this.atualizaveiculo_projetoano1 = false;
          console.log(error);
        });
    }
  }

  carrega_clienteano2() {
    if (!this.atualizaclienteano2 && this.clientesano2.length == 0) {
      this.atualizaclienteano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_CLIENTES(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.clientesano2.find(item => item.id == response[x][3])) {
              var linha = this.clientesano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientesano2.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientesano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclienteano2 = false;
        }, error => {
          this.atualizaclienteano2 = false;
          console.log(error);
        });
    }
  }

  carrega_referenciaano2() {
    if (!this.atualizareferenciaano2 && this.referenciasano2.length == 0) {
      this.atualizareferenciaano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_REFERENCIAS(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciasano2.find(item => item.id == response[x][3])) {
              var linha = this.referenciasano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciasano2.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciasano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciaano2 = false;
        }, error => {
          this.atualizareferenciaano2 = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetoano2() {
    if (!this.atualizaveiculo_projetoano2 && this.veiculo_projetosano2.length == 0) {
      this.atualizaveiculo_projetoano2 = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_ANOS_OEM_VEICULO_PROJETO(this.dados_filtro, this.ano).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetosano2.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetosano2.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetosano2.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetosano2.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetoano2 = false;
        }, error => {
          this.atualizaveiculo_projetoano2 = false;
          console.log(error);
        });
    }
  }

  carrega_clientetrading() {
    if (!this.atualizaclientetrading && this.clientestrading.length == 0) {
      this.atualizaclientetrading = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(this.dados_filtro, 2).subscribe(
        response => {
          for (var x in response) {
            if (this.clientestrading.find(item => item.id == response[x][3])) {
              var linha = this.clientestrading.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.clientestrading.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.clientestrading.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaclientetrading = false;
        }, error => {
          this.atualizaclientetrading = false;
          console.log(error);
        });
    }
  }

  carrega_referenciatrading() {
    if (!this.atualizareferenciatrading && this.referenciastrading.length == 0) {
      this.atualizareferenciatrading = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(this.dados_filtro, 2).subscribe(
        response => {
          for (var x in response) {
            if (this.referenciastrading.find(item => item.id == response[x][3])) {
              var linha = this.referenciastrading.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][5];
              linha[response[x][1]] = response[x][0];
            } else {
              this.referenciastrading.push({ id: response[x][3], descricao: response[x][3] + ' - ' + response[x][4], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.referenciastrading.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][5];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizareferenciatrading = false;
        }, error => {
          this.atualizareferenciatrading = false;
          console.log(error);
        });
    }
  }

  carrega_veiculo_projetotrading() {
    if (!this.atualizaveiculo_projetotrading && this.veiculo_projetostrading.length == 0) {
      this.atualizaveiculo_projetotrading = true;
      this.FINSEGUIMENTOFATURACAOANUALService.GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(this.dados_filtro, 2).subscribe(
        response => {
          for (var x in response) {
            if (this.veiculo_projetostrading.find(item => item.id == response[x][3])) {
              var linha = this.veiculo_projetostrading.find(item => item.id == response[x][3]);
              linha['acumulado'] = response[x][4];
              linha[response[x][1]] = response[x][0];
            } else {
              this.veiculo_projetostrading.push({ id: response[x][3], descricao: response[x][3], 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
              var linha_n = this.veiculo_projetostrading.find(item => item.id == response[x][3]);
              linha_n['acumulado'] = response[x][4];
              linha_n[response[x][1]] = response[x][0];
            }
          }
          this.atualizaveiculo_projetotrading = false;
        }, error => {
          this.atualizaveiculo_projetotrading = false;
          console.log(error);
        });
    }
  }

  limpar_dados() {
    this.ano1 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.ano2 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_mensal = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_acumulada = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.trading = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.subcontrato = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.trading_subcontrato = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.faturas_ferramentas = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.faturas_ferramentas_servicos = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.outras_faturacoes = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.auto_faturas = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.debitos_clientes = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.creditos_clientes = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.devolucoes = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.descontos_abatimentos = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.total_realizado_ano1 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.total_realizado_ano2 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_mensal2 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_acumulada2 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.budget = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_mensal3 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };
    this.variacao_acumulada3 = { 'acumulado': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 };


    this.clientesano1 = [];
    this.referenciasano1 = [];
    this.veiculo_projetosano1 = [];

    this.clientesano2 = [];
    this.referenciasano2 = [];
    this.veiculo_projetosano2 = [];

    this.clientestrading = [];
    this.referenciastrading = [];
    this.veiculo_projetostrading = [];

    this.clientessubcontrato = [];
    this.referenciassubcontrato = [];
    this.veiculo_projetossubcontrato = [];


    this.clientesfaturas_ferramentas = [];
    this.referenciasfaturas_ferramentas = [];
    this.veiculo_projetosfaturas_ferramentas = [];

    this.clientesfaturas_ferramentas_servicos = [];
    this.referenciasfaturas_ferramentas_servicos = [];
    this.veiculo_projetosfaturas_ferramentas_servicos = [];

    this.clientesoutras_faturacoes = [];
    this.referenciasoutras_faturacoes = [];
    this.veiculo_projetosoutras_faturacoes = [];

    this.clientesauto_faturas = [];
    this.referenciasauto_faturas = [];
    this.veiculo_projetosauto_faturas = [];

    this.clientesdebitos_clientes = [];
    this.referenciasdebitos_clientes = [];
    this.veiculo_projetosdebitos_clientes = [];

    this.clientescreditos_clientes = [];
    this.referenciascreditos_clientes = [];
    this.veiculo_projetoscreditos_clientes = [];

    this.clientesdescontos_abatimentos = [];
    this.referenciasdescontos_abatimentos = [];
    this.veiculo_projetosdescontos_abatimentos = [];

    this.clientestotal_realizado_ano1 = [];
    this.referenciastotal_realizado_ano1 = [];
    this.veiculo_projetostotal_realizado_ano1 = [];

    this.clientestotal_realizado_ano2 = [];
    this.referenciastotal_realizado_ano2 = [];
    this.veiculo_projetostotal_realizado_ano2 = [];

    this.data_graf = [];
  }


  calcular_totais() {


    var data_atual = new Date();
    var data_total = null;

    if (data_atual.getDate() >= 15) {
      data_total = new Date(data_atual.getUTCFullYear(), data_atual.getMonth(), 0);
    } else {
      data_total = new Date(data_atual.getUTCFullYear(), data_atual.getMonth() - 1, 0);
    }


    for (var x in this.variacao_mensal) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_mensal[x] = this.ano2[x] - this.ano1[x];
    }

    for (var x in this.variacao_acumulada) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_acumulada[x] = (this.ano1[x] > 0) ? (this.variacao_mensal[x] / this.ano1[x]) * 100 : 0;
    }

    for (var x in this.trading_subcontrato) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.trading_subcontrato[x] = (this.ano2[x] > 0) ? ((this.trading[x] + this.subcontrato[x]) / this.ano2[x]) * 100 : 0;
    }

    for (var x in this.variacao_mensal2) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_mensal2[x] = this.total_realizado_ano2[x] - this.total_realizado_ano1[x];
    }

    for (var x in this.variacao_acumulada2) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_acumulada2[x] = (this.total_realizado_ano1[x] > 0) ? (this.variacao_mensal2[x] / this.total_realizado_ano1[x]) * 100 : 0;
    }

    for (var x in this.variacao_mensal3) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_mensal3[x] = this.total_realizado_ano2[x] - this.budget[x];
    }

    for (var x in this.variacao_acumulada3) {
      if (x == 'acumulado' || new Date(this.ano, parseInt(x), 0) <= data_total) this.variacao_acumulada3[x] = (this.budget[x] > 0) ? ((this.variacao_mensal3[x] / this.budget[x]) * 100) : 0;
    }
  }

  carregagraficos() {
    if (!this.atualiza_ano1 && !this.atualiza_ano2 && !this.atualiza_trading && !this.atualiza_subcontrato && !this.atualiza_faturas_ferramentas_servicos && !this.atualiza_faturas_ferramentas && !this.atualiza_outras_faturacoes && !this.atualiza_auto_faturas && !this.atualiza_debitos_clientes && !this.atualiza_creditos_clientes && !this.atualiza_devolucoes && !this.atualiza_descontos_abatimentos && !this.atualiza_total_realizado_ano1 && !this.atualiza_total_realizado_ano2 && !this.atualiza_budget) {
      var datasetsgraf = [];
      datasetsgraf.push({
        label: "Todos", data: [], fill: false, borderColor: [
          '#black'
        ],
        borderWidth: 2
      });
      datasetsgraf.push({ label: '' + this.ano_anterior + '', data: this.format_valores(this.ano1), fill: false, borderColor: this.getRandomColor(1), borderWidth: 2 });
      datasetsgraf.push({ label: '' + this.ano + ' ', data: this.format_valores(this.ano2), fill: false, borderColor: this.getRandomColor(2), borderWidth: 2 });
      datasetsgraf.push({ label: 'Trading', data: this.format_valores(this.trading), fill: false, borderColor: this.getRandomColor(3), borderWidth: 2 });
      datasetsgraf.push({ label: '100% SubContrato', data: this.format_valores(this.subcontrato), fill: false, borderColor: this.getRandomColor(4), borderWidth: 2 });
      datasetsgraf.push({ label: 'Faturas Ferramentas (serviços)', data: this.format_valores(this.faturas_ferramentas_servicos), fill: false, borderColor: this.getRandomColor(5), borderWidth: 2 });
      datasetsgraf.push({ label: 'Faturas Ferramentas', data: this.format_valores(this.faturas_ferramentas), fill: false, borderColor: this.getRandomColor(6), borderWidth: 2 });
      datasetsgraf.push({ label: 'Outras Faturações', data: this.format_valores(this.outras_faturacoes), fill: false, borderColor: this.getRandomColor(7), borderWidth: 2 });
      datasetsgraf.push({ label: 'AutoFacturas', data: this.format_valores(this.auto_faturas), fill: false, borderColor: this.getRandomColor(8), borderWidth: 2 });
      datasetsgraf.push({ label: 'Débitos a Clientes', data: this.format_valores(this.debitos_clientes), fill: false, borderColor: this.getRandomColor(9), borderWidth: 2 });
      datasetsgraf.push({ label: 'Créditos a Clientes', data: this.format_valores(this.creditos_clientes), fill: false, borderColor: this.getRandomColor(10), borderWidth: 2 });
      datasetsgraf.push({ label: 'Devoluções', data: this.format_valores(this.devolucoes), fill: false, borderColor: this.getRandomColor(11), borderWidth: 2 });
      datasetsgraf.push({ label: 'Descontos e Abatimentos', data: this.format_valores(this.descontos_abatimentos), fill: false, borderColor: this.getRandomColor(12), borderWidth: 2 });
      datasetsgraf.push({ label: 'Total Realizado (' + this.ano_anterior + ')', data: this.format_valores(this.total_realizado_ano1), fill: false, borderColor: this.getRandomColor(13), borderWidth: 2 });
      datasetsgraf.push({ label: 'Total Realizado (' + this.ano + ')', data: this.format_valores(this.total_realizado_ano2), fill: false, borderColor: this.getRandomColor(14), borderWidth: 2 });
      datasetsgraf.push({ label: 'Budget (' + this.ano + ')', data: this.format_valores(this.budget), fill: false, borderColor: this.getRandomColor(15), borderWidth: 2 });

      var labelgraf = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

      this.data_graf = {
        labels: labelgraf,
        datasets: datasetsgraf
      };

      this.options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                var decimalCount = 2, decimal = ",", thousands = ".";
                var amount = value;
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
                const negativeSign = amount < 0 ? "-" : "";
                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;
                var val = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

                return val + ' €';
              }
            }
          }]
        }, legend: {
          labels: {
            fontColor: "black"
          }
        }, tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ': ';
              }

              var decimalCount = 2, decimal = ",", thousands = ".";
              var amount = tooltipItem.yLabel;
              decimalCount = Math.abs(decimalCount);
              decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
              const negativeSign = amount < 0 ? "-" : "";
              let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
              let j = (i.length > 3) ? i.length % 3 : 0;
              var val = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

              label += val + ' €';
              return label;
            }
          },
        },
      }
    }
  }


  //criar cores 
  getRandomColor(i) {
    var colors = ["blue", "green", "red", "yellow", "orange", "violet", "indigo", "olive", "pink", "#B22222", "#4682B4", "#708090", "#A0522D", "#800080", "#6B8E23", "#66CDAA", "#ADFF2F"];
    var n = i % colors.length
    return colors[n];
  }

  format_valores(array) {
    var array_valores = [];
    for (var x = 1; x <= 12; x++) {
      array_valores.push(array[x + ''])

    }

    return array_valores;
  }

  limparfiltros() {
    this.projeto = null;
    this.veiculos = null;
    this.oem = null;
    this.campo_ref = null;
    this.referencia_principal = null;
    this.clientes = null;
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


  async download(id, nome_ficheiro, loading) {

    this[loading] = true;
    this.srcelement = null;
    var doc = new jsPDF('l', 'mm', 'a4');


    if (document.getElementById('tab1_1')) document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));
    //if (document.getElementById('tab2_1')) document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));



    var tab1 = document.getElementById(id);
    var printer_1 = document.getElementById('printer_1');
    var g = tab1.cloneNode(true);
    printer_1.appendChild(g);

    printer_1.children[0].setAttribute("id", "tab1_1");
    document.getElementById('tab1_1').style.position = "absolute";
    document.getElementById('tab1_1').classList.add("active")
    document.getElementById('tab1_1').classList.add("in")

    //tab1.style.position = "absolute";
    const options = {
      logging: false
    };

    var data = this.formatDate(new Date);

    await html2canvas(document.getElementById('tab1_1'), options).then(function (canvas) {

      var img = canvas.toDataURL("image/png");
      var pageHeight = doc.internal.pageSize.getHeight();
      var pageWidth = doc.internal.pageSize.getWidth();

      var imgheight = document.getElementById(id).offsetHeight * 25.4 / 96; //px to mm
      var pagecount = Math.ceil(imgheight / pageHeight);


      doc.setFontSize(10);
      doc.setFont('helvetica')
      doc.setFontType('bold')
      doc.text("Seguimento de Faturação Anual", 150, 15, null, null, "center");
      //doc.text(data, pageWidth + 2, 15);
      doc.setFontSize(8);
      doc.text("Data de Emissão: " + data, pageWidth - 2, 15, null, null, "right");
      doc.setFont('times')

      // doc.text("Pág. 1/" + pagecount, pageWidth - 2, pageHeight - 40, null, null, "right");

      var img_logo = new Image()
      img_logo.src = 'assets/img/logo_doureca.png'
      doc.addImage(img_logo, 'PNG', 10, 5, 50, 10);

      doc.addImage(img, 'PNG', 2, 20, pageWidth - 4, 0);
      if (pagecount > 0) {
        var j = 1;
        while (j != pagecount) {
          doc.addPage();
          /*doc.setFontSize(10);
          doc.setFont('helvetica')
          doc.setFontType('bold')
          doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 150, 15, null, null, "center");

          doc.setFont('times')

          doc.text("Pág. " + (j + 1) + "/" + pagecount, pageWidth - 2, pageHeight - 2, null, null, "right");
          doc.text(data, 2, pageHeight - 2);

          var img_logo = new Image()
          img_logo.src = 'assets/img/logo_doureca.png'
          doc.addImage(img_logo, 'PNG', 10, 5, 50, 10);*/
          doc.addImage(img, 'PNG', 2, -(j * pageHeight) + 25, pageWidth - 4, 0);
          j++;
        }
      }


      //document.getElementById(id).removeChild(document.getElementById('tab1_1'));


      //fails to add image to pdf
    });

    await html2canvas(document.getElementById('tab2_1'), options).then(function (canvas) {
      //document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));
      var pageWidth = doc.internal.pageSize.getWidth();
      doc.addPage();
      doc.setFontSize(10);
      doc.setFont('helvetica')
      doc.setFontType('bold')
      doc.text("Seguimento de Faturação Anual", 150, 15, null, null, "center");
      //doc.text(data, pageWidth + 2, 15);
      doc.setFontSize(8);
      doc.text("Data de Emissão: " + data, pageWidth - 2, 15, null, null, "right");
      doc.setFont('times')

      // doc.text("Pág. 1/" + pagecount, pageWidth - 2, pageHeight - 40, null, null, "right");

      var img_logo = new Image()
      img_logo.src = 'assets/img/logo_doureca.png'
      doc.addImage(img_logo, 'PNG', 10, 5, 50, 10);

      var imgs = canvas.toDataURL("image/png");
      const bufferXs = 5;
      const bufferYs = 40;
      const imgProps = (<any>doc).getImageProperties(imgs);
      const pdfWidths = doc.internal.pageSize.getWidth() - 2 * bufferXs;
      const pdfHeights = (imgProps.height * pdfWidths) / imgProps.width;
      doc.addImage(imgs, 'PNG', bufferXs, bufferYs, pdfWidths, pdfHeights, undefined);
      //doc.save('test.pdf');
    });

    doc.save(nome_ficheiro + '.pdf');
    //this.display = true;
    /*var srcelement = doc.output('bloburl');
    this.doc_blob = doc.output('blob');
    this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(srcelement);*/
    this[loading] = false;


  }
}
