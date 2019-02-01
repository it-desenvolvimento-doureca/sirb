import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { AB_DIC_TIPO_MANUTENCAO } from "app/entidades/AB_DIC_TIPO_MANUTENCAO";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-tipomanutenacao',
  templateUrl: './tipomanutenacao.component.html',
  styleUrls: ['./tipomanutenacao.component.css']
})
export class TipomanutenacaoComponent implements OnInit {
  cor: string;
  classificacao;
  classif: string = null;
  manutencoes: any[];
  valor_manutencao: string;
  novo: boolean;
  cor_manutencao: string;
  nome_manutencao: string;
  id_manutencao_selected: number;
  novamanutencao: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;

  constructor(private globalVar: AppGlobals, private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.classificacao = [{ label: "Seleccionar Clasif.", value: "" },
    { label: "Manutenção Banho", value: "M" }, { label: "Construção Banho", value: "B" },
    { label: "Reposições", value: "R" }, { label: "Não Programadas", value: "N" }];
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

    this.listar_manutencoes();
  }

  //abre popup para adicionar manutencao
  showDialogToAdd() {
    this.novo = true;
    this.id_manutencao_selected = 0;
    this.valor_manutencao = "";
    this.classif = null;
    this.cor = "";
    this.simular(this.dialog);
  }



  //gravar unidade de manutencao
  gravarmanutencoes() {
    var tipo_manutencao = new AB_DIC_TIPO_MANUTENCAO;
    tipo_manutencao.nome_TIPO_MANUTENCAO = this.valor_manutencao;
    tipo_manutencao.inativo = false;
    tipo_manutencao.cor = "#" + this.cor;
    tipo_manutencao.classif = this.classif;
    if (this.novo) {
      this.ABDICTIPOMANUTENCAOService.create(tipo_manutencao).subscribe(response => {
        this.listar_manutencoes();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      tipo_manutencao.id_TIPO_MANUTENCAO = this.id_manutencao_selected;
      this.ABDICTIPOMANUTENCAOService.update(tipo_manutencao).then(() => {
        this.listar_manutencoes();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de manutencoes na tabela
  listar_manutencoes() {
    this.manutencoes = [];
    this.ABDICTIPOMANUTENCAOService.getAll(["M", "B", "R", "N"]).subscribe(
      response => {
        for (var x in response) {
          var classif_nome = "Manutenção Banho";
          // if (response[x].classif == "B") classif_nome = "Construção Banho";
          var cor = "#ffffff";
          if (response[x].cor != null) cor = response[x].cor;
          classif_nome = this.classificacao.find(item => item.value == response[x].classif).label;
          this.manutencoes.push({ id: response[x].id_TIPO_MANUTENCAO, cor: cor, nome: response[x].nome_TIPO_MANUTENCAO, classif: response[x].classif, classif_nome: classif_nome });
        }
        this.manutencoes = this.manutencoes.slice();
      },
      error => console.log(error));
  }



  //apagar manutencao
  apagarmanutencao() {
    var tipo_manutencao = new AB_DIC_TIPO_MANUTENCAO;
    tipo_manutencao.nome_TIPO_MANUTENCAO = this.valor_manutencao;
    tipo_manutencao.id_TIPO_MANUTENCAO = this.id_manutencao_selected;
    tipo_manutencao.classif = this.classif;
    tipo_manutencao.cor = "#" + this.cor;
    tipo_manutencao.data_ANULACAO = new Date();
    tipo_manutencao.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    tipo_manutencao.inativo = true;
    this.ABDICTIPOMANUTENCAOService.update(tipo_manutencao).then(() => {
      this.listar_manutencoes();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_manutencao_selected = event.data.id;
    this.valor_manutencao = event.data.nome;
    this.cor = event.data.cor;
    this.classif = event.data.classif;
    this.novo = false;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}