import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { AT_DIC_CAUSAS_ACIDENTE } from 'app/entidades/AT_DIC_CAUSAS_ACIDENTE';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ATDICCAUSASACIDENTEService } from 'app/servicos/at-dic-causas-acidente.service';

@Component({
  selector: 'app-causas-acidente',
  templateUrl: './causas-acidente.component.html',
  styleUrls: ['./causas-acidente.component.css']
})
export class CausasAcidenteComponent implements OnInit {

  dados: any[];
  descricao: string;
  novo: boolean;
  cor_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private ATDICCAUSASACIDENTEService: ATDICCAUSASACIDENTEService, private renderer: Renderer) { }
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
    this.listar();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.descricao = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var CAUSA = new AT_DIC_CAUSAS_ACIDENTE;
    CAUSA.descricao = this.descricao;
    CAUSA.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    CAUSA.data_MODIF = new Date();

    if (this.novo) {
      CAUSA.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      CAUSA.data_CRIA = new Date();
      this.ATDICCAUSASACIDENTEService.create(CAUSA).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      CAUSA.id_CAUSAS_ACIDENTE = this.id_selected;
      CAUSA.data_CRIA = this.datacria;
      CAUSA.utz_CRIA = this.utz_cria;
      this.ATDICCAUSASACIDENTEService.update(CAUSA).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.ATDICCAUSASACIDENTEService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id_CAUSAS_ACIDENTE, nome: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var CAUSA = new AT_DIC_CAUSAS_ACIDENTE;
    CAUSA.descricao = this.descricao;
    CAUSA.id_CAUSAS_ACIDENTE = this.id_selected;

    this.ATDICCAUSASACIDENTEService.delete(CAUSA.id_CAUSAS_ACIDENTE).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.nome;
    this.novo = false;
    this.datacria = event.data.data_CRIA;
    this.utz_cria = event.data.utz_CRIA;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}