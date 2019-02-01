import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { AB_DIC_TIPO_OPERACAO } from "app/entidades/AB_DIC_TIPO_OPERACAO";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-tipooperacao',
  templateUrl: './tipooperacao.component.html',
  styleUrls: ['./tipooperacao.component.css']
})
export class TipooperacaoComponent implements OnInit {
  classificacao = [];
  classif: string;
  operacoes: any[];
  valor_operacao: string;
  novo: boolean;
  cor_operacao: string;
  nome_operacao: string;
  id_operacao_selected: number;
  novaoperacao: boolean;
  id195: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;

  constructor(private globalVar: AppGlobals, private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.classificacao = [{ label: "Seleccionar Clasif.", value: "" }, { label: "Manutenção Banho", value: "M" }, { label: "Construção Banho", value: "B" }, 
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
    this.listar_operacoes();
  }

  //abre popup para adicionar operacao
  showDialogToAdd() {
    this.novo = true;
    this.id_operacao_selected = 0;
    this.valor_operacao = "";
    this.id195 = false;
    this.classif = null;
    this.simular(this.dialog);
  }



  //gravar unidade de operacao
  gravaroperacoes() {
    var tipo_operacao = new AB_DIC_TIPO_OPERACAO;
    tipo_operacao.nome_TIPO_OPERACAO = this.valor_operacao;
    tipo_operacao.inativo = false;
    tipo_operacao.id195 = this.id195;
    tipo_operacao.classif = this.classif;
    if (this.novo) {
      this.ABDICTIPOOPERACAOService.create(tipo_operacao).subscribe(response => {
        this.listar_operacoes();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      tipo_operacao.id_TIPO_OPERACAO = this.id_operacao_selected;
      this.ABDICTIPOOPERACAOService.update(tipo_operacao).then(() => {
        this.listar_operacoes();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de operacoes na tabela
  listar_operacoes() {
    this.operacoes = [];
    this.ABDICTIPOOPERACAOService.getAll(["M","B","N","R"]).subscribe(
      response => {
        for (var x in response) {
          var classif_nome = "";
          //if (response[x].classif == "B") classif_nome = "Construção Banho";
          classif_nome =  this.classificacao.find(item => item.value == response[x].classif).label;
          this.operacoes.push({ id: response[x].id_TIPO_OPERACAO, nome: response[x].nome_TIPO_OPERACAO, id195: response[x].id195, classif: response[x].classif, classif_nome: classif_nome });
        }
        this.operacoes = this.operacoes.slice();
      },
      error => console.log(error));
  }



  //apagar operacao
  apagaroperacao() {
    var tipo_operacao = new AB_DIC_TIPO_OPERACAO;
    tipo_operacao.nome_TIPO_OPERACAO = this.valor_operacao;
    tipo_operacao.id195 = this.id195; tipo_operacao.id_TIPO_OPERACAO = this.id_operacao_selected;
    tipo_operacao.data_ANULACAO = new Date();
    tipo_operacao.classif = this.classif;
    tipo_operacao.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    tipo_operacao.inativo = true;
    this.ABDICTIPOOPERACAOService.update(tipo_operacao).then(() => {
      this.listar_operacoes();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_operacao_selected = event.data.id;
    this.valor_operacao = event.data.nome;
    this.novo = false;
    this.id195 = event.data.id195;
    this.classif = event.data.classif;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}