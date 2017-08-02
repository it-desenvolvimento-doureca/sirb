import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { AB_DIC_TIPO_MANUTENCAO } from "app/entidades/AB_DIC_TIPO_MANUTENCAO";

@Component({
  selector: 'app-tipomanutenacao',
  templateUrl: './tipomanutenacao.component.html',
  styleUrls: ['./tipomanutenacao.component.css']
})
export class TipomanutenacaoComponent implements OnInit {
  manutencoes: any[];
  valor_manutencao: string;
  novo: boolean;
  cor_manutencao: string;
  nome_manutencao: string;
  id_manutencao_selected: number;
  novamanutencao: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;

  constructor(private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private renderer: Renderer) { }
  ngOnInit() {
    this.listar_manutencoes();
  }

  //abre popup para adicionar manutencao
  showDialogToAdd() {
    this.novo = true;
    this.id_manutencao_selected = 0;
    this.valor_manutencao = "";
    this.simular(this.dialog);
  }



  //gravar unidade de manutencao
  gravarmanutencoes() {
    var tipo_manutencao = new AB_DIC_TIPO_MANUTENCAO;
    tipo_manutencao.nome_TIPO_MANUTENCAO = this.valor_manutencao;
    tipo_manutencao.inativo = false;
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
    this.ABDICTIPOMANUTENCAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.manutencoes.push({ id: response[x].id_TIPO_MANUTENCAO, nome: response[x].nome_TIPO_MANUTENCAO });
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