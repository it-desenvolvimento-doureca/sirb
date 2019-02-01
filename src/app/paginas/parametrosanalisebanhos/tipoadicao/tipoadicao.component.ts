import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { AB_DIC_TIPO_ADICAO } from "app/entidades/AB_DIC_TIPO_ADICAO";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-tipoadicao',
  templateUrl: './tipoadicao.component.html',
  styleUrls: ['./tipoadicao.component.css']
})
export class TipoadicaoComponent implements OnInit {
  classificacao = [];
  classif: string;
  intervalo_op_id: any;
  intervalo_op: any[];
  TipoAdicaos: any[];
  valor_TipoAdicao: string;
  novo: boolean;
  cor_TipoAdicao: string;
  nome_TipoAdicao: string;
  id_TipoAdicao_selected: number;
  novaTipoAdicao: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private ABDICTIPOADICAOService: ABDICTIPOADICAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.classificacao = [{ label: "Seleccionar Clasif.", value: "" }, { label: "Manutenção Banho", value: "M" }, { label: "Construção Banho", value: "B" }, { label: "Reposições", value: "R" }, { label: "Não Programadas", value: "N" }];
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
    //preenche combobox Intervalo Oper.
    this.ABDICTIPOOPERACAOService.getAll(["M", "B", "N", "R"]).subscribe(
      response => {
        this.intervalo_op = [];
        this.intervalo_op.push({ label: "Sel. Intervalo Oper.", value: "" });
        for (var x in response) {
          var classif_nome = "";
          classif_nome = this.classificacao.find(item => item.value == response[x].classif).label;
          this.intervalo_op.push({ label: response[x].nome_TIPO_OPERACAO + ' - ' + classif_nome, value: response[x].id_TIPO_OPERACAO });
        }
        this.intervalo_op = this.intervalo_op.slice();
        this.listar_TipoAdicaos();
      },
      error => console.log(error));
  }

  //abre popup para adicionar TipoAdicao
  showDialogToAdd() {
    this.novo = true;
    this.id_TipoAdicao_selected = 0;
    this.valor_TipoAdicao = "";
    this.intervalo_op_id = null;
    this.classif = null;
    this.simular(this.dialog);
  }



  //gravar unidade de TipoAdicao
  gravarTipoAdicaos() {
    var TipoAdicao = new AB_DIC_TIPO_ADICAO;
    TipoAdicao.nome_TIPO_ADICAO = this.valor_TipoAdicao;
    TipoAdicao.id_TIPO_OPERACAO = this.intervalo_op_id;
    TipoAdicao.inativo = false;
    TipoAdicao.classif = this.classif;
    if (this.novo) {
      this.ABDICTIPOADICAOService.create(TipoAdicao).subscribe(response => {
        this.listar_TipoAdicaos();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      TipoAdicao.id_TIPO_ADICAO = this.id_TipoAdicao_selected;
      this.ABDICTIPOADICAOService.update(TipoAdicao).then(() => {
        this.listar_TipoAdicaos();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de TipoAdicaos na tabela
  listar_TipoAdicaos() {
    this.TipoAdicaos = [];
    this.ABDICTIPOADICAOService.getAll(["M", "B", "N", "R"]).subscribe(
      response => {
        for (var x in response) {
          var nome_op = "";
          var classif_nome = "";
          //if (response[x].classif == "B") classif_nome = "Construção Banho";
          classif_nome = this.classificacao.find(item => item.value == response[x].classif).label;
          if (response[x].id_TIPO_OPERACAO != null) nome_op = this.intervalo_op.find(item => item.value == response[x].id_TIPO_OPERACAO).label;

          this.TipoAdicaos.push({ id: response[x].id_TIPO_ADICAO, nome: response[x].nome_TIPO_ADICAO, nome_op: nome_op, operacao: response[x].id_TIPO_OPERACAO, classif: response[x].classif, classif_nome: classif_nome });
        }
        this.TipoAdicaos = this.TipoAdicaos.slice();
      },
      error => console.log(error));
  }



  //apagar TipoAdicao
  apagarTipoAdicaos() {
    var TipoAdicao = new AB_DIC_TIPO_ADICAO;
    TipoAdicao.nome_TIPO_ADICAO = this.valor_TipoAdicao;
    TipoAdicao.id_TIPO_OPERACAO = this.intervalo_op_id;
    TipoAdicao.id_TIPO_ADICAO = this.id_TipoAdicao_selected;
    TipoAdicao.classif = this.classif;
    TipoAdicao.data_ANULACAO = new Date();
    TipoAdicao.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    TipoAdicao.inativo = true;
    this.ABDICTIPOADICAOService.update(TipoAdicao).then(() => {
      this.listar_TipoAdicaos();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_TipoAdicao_selected = event.data.id;
    this.valor_TipoAdicao = event.data.nome;
    this.intervalo_op_id = event.data.operacao;
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