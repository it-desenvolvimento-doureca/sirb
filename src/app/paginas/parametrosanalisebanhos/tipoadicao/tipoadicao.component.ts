import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { AB_DIC_TIPO_ADICAO } from "app/entidades/AB_DIC_TIPO_ADICAO";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";

@Component({
  selector: 'app-tipoadicao',
  templateUrl: './tipoadicao.component.html',
  styleUrls: ['./tipoadicao.component.css']
})
export class TipoadicaoComponent implements OnInit {
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
  constructor(private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private ABDICTIPOADICAOService: ABDICTIPOADICAOService, private renderer: Renderer) { }
  ngOnInit() {

    //preenche combobox Intervalo Oper.
    this.ABDICTIPOOPERACAOService.getAll().subscribe(
      response => {
        this.intervalo_op = [];
        this.intervalo_op.push({ label: "Sel. Intervalo Oper.", value: "" });
        for (var x in response) {
          this.intervalo_op.push({ label: response[x].nome_TIPO_OPERACAO, value: response[x].id_TIPO_OPERACAO });
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
    this.simular(this.dialog);
  }



  //gravar unidade de TipoAdicao
  gravarTipoAdicaos() {
    var TipoAdicao = new AB_DIC_TIPO_ADICAO;
    TipoAdicao.nome_TIPO_ADICAO = this.valor_TipoAdicao;
    TipoAdicao.id_TIPO_OPERACAO = this.intervalo_op_id;
    TipoAdicao.inativo = false;
    console.log(this.intervalo_op_id)
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
    this.ABDICTIPOADICAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          var nome_op = "";
          if (response[x].id_TIPO_OPERACAO != null) nome_op = this.intervalo_op.find(item => item.value == response[x].id_TIPO_OPERACAO).label;

          this.TipoAdicaos.push({ id: response[x].id_TIPO_ADICAO, nome: response[x].nome_TIPO_ADICAO, nome_op: nome_op, operacao: response[x].id_TIPO_OPERACAO });
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