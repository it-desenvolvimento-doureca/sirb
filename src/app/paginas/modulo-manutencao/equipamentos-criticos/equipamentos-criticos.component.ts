import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERDEPARTAMENTOService } from 'app/servicos/ger-departamento.service';
import { MANDICNIVEISCRITICIDADEService } from 'app/servicos/man-dic-niveis-criticidade.service';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from 'app/servicos/man-mov-manutencao-equipamentos.service';
import { ConfirmationService, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-equipamentos-criticos',
  templateUrl: './equipamentos-criticos.component.html',
  styleUrls: ['./equipamentos-criticos.component.css']
})
export class EquipamentosCriticosComponent implements OnInit {
  departs: any[];
  drop_niveis: any[];


  mensagemtabela: string;
  acessoplaneamento = true;
  referencia: any;
  filtro2: any;
  filtroval;
  localizacao: string;
  id_MANUTENCAO: string;
  estados: ({ label: string; value: string; } | { label: string; value: boolean; })[];
  query: any = [];
  disduplicar: boolean = true;
  id: any;
  user: any;

  data_actual: Date;
  cols: any[];
  filtro = [];

  @ViewChild(DataTable) dataTableComponent: DataTable;

  yearTimeout: any;
  designacao_REF;
  nome: string;
  departamento: any = null;
  nivel: any = null;
  loading: boolean;
  departamento2: any;
  nivel2: any;

  constructor(private MANMOVMANUTENCAOEQUIPAMENTOSService: MANMOVMANUTENCAOEQUIPAMENTOSService, private GERDEPARTAMENTOService: GERDEPARTAMENTOService,
    private MANDICNIVEISCRITICIDADEService: MANDICNIVEISCRITICIDADEService
    , private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.estados = [{ label: "Ativo", value: true }, { label: "Inativo", value: false }];

    this.filtroval = false;
    var array = this.globalVar.getfiltros("equipamentos_manutencao");
    //this.filtro.push(true)
    if (array) {

      this.filtro2 = (array['ativo'] != undefined) ? array['ativo'].value : null;

      this.dataTableComponent.filters = array;

      this.id_MANUTENCAO = (array['id_MANUTENCAO'] != undefined) ? array['id_MANUTENCAO'].value : "";
      //this.estado = (array['estado'] != undefined) ? array['estado'].value : "";
      this.nome = (array['nome'] != undefined) ? array['nome'].value : "";
      this.departamento2 = (array['departamento'] != undefined) ? array['departamento'].value : "";
      this.nivel2 = (array['nivel'] != undefined) ? array['nivel'].value : "";
      this.localizacao = (array['localizacao'] != undefined) ? array['localizacao'].value : "";
      this.referencia = (array['referencia'] != undefined) ? array['referencia'].value : "";
      this.designacao_REF = (array['designacao_REF'] != undefined) ? array['designacao_REF'].value : "";
      if (this.filtro2 != null && this.filtro2 != "") {
        var f = this.filtro2.split(',');
        this.filtro = [];
        for (var x in f) {
          this.filtro.push(f[x])
        }
        this.filtroval = true;
      }
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101apagar"));


    this.carregarDepartamentos();
    this.carregarlista();


  }

  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";
    this.loading = true;
    this.cols = [];
    var dados = [{
      DEPARTAMENTO: this.departamento, NIVEL: this.nivel
    }];
    this.MANMOVMANUTENCAOEQUIPAMENTOSService.MAN_GET_EQUIPAMENTOS_CRITICOS(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.cols.push({
            id_MANUTENCAO: response[x][0],
            nome: response[x][1],
            localizacao: response[x][3],
            referencia: response[x][5],
            departamento: response[x][7],
            nivel: (response[x][8] == null) ? '' : response[x][8] + ' (' + response[x][9] + ')',
            ativo: response[x][6]
          });

        }
        this.cols = this.cols.slice();
        if (this.filtroval) this.filtrar(this.filtro, "ativo", true, "in");
        this.loading = false;
      },
      error => { console.log(error); this.loading = false; });

  }

  getinterna_EXTERNA(valor) {
    if (valor == "I") {
      return "INTERNA";
    } else if (valor == "E") {
      return "EXTERNA";
    }
  }

  getUnidade(valor) {
    if (valor == 1) {
      return "Formariz";
    } else if (valor == 2) {
      return "São Bento";
    }
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    }
    this.filtro = [];
    this.id_MANUTENCAO = "";
    this.localizacao = "";
    this.nome = "";
    this.departamento2 = "";
    this.nivel2 = "";
    this.referencia = "";
    this.designacao_REF = "";

    this.dataTableComponent.filter("", "", "");


  }




  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      if (value == 0 && fil) {
        value = "";
      }

      this.dataTableComponent.filter(value.toString(), coluna, filtro);

      this.globalVar.setfiltros("equipamentos_manutencao", this.dataTableComponent.filters);
      var ids = [];
      var array = this.dataTableComponent._value;
      if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;
      for (var x in array) {
        ids.push(array[x].id_MANUTENCAO);
      }

      if (array.length == 0) {
        this.mensagemtabela = "Nenhum Registo foi encontrado...";
      }

      this.globalVar.setfiltros("equipamentos_manutencao_id", ids);
    }, 250);
  }

  atualizaids() {
    var ids = [];
    var array = this.dataTableComponent._value;
    if (this.dataTableComponent.filteredValue != null) array = this.dataTableComponent.filteredValue;

    for (var x in array) {
      ids.push(array[x].id_MANUTENCAO);
    }

    this.globalVar.setfiltros("equipamentos_manutencao_id", ids);
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['equipamentos_manutencao/view'], { queryParams: { id: event.data.id_MANUTENCAO, redirect: "equipamentos_criticos_manutencao" } });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
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

  atualizar() {
    this.carregarlista();
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


  limpar() {
    this.nivel = null;
    this.drop_niveis = [];
    this.departamento = null;
    this.atualizar();
  }
}
