import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AB_DIC_UNIDADE_MEDIDA } from "app/entidades/AB_DIC_UNIDADE_MEDIDA";
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-unidadesmedida',
  templateUrl: './unidadesmedida.component.html',
  styleUrls: ['./unidadesmedida.component.css']
})
export class UnidadesmedidaComponent implements OnInit {

  id_medida_selected: number;
  valor_medida: any;
  medidas = [];
  novo;
  selectedCar: AB_DIC_UNIDADE_MEDIDA;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private renderer: Renderer) { }

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
    this.globalVar.setcriar(false);
    this.listar_medidas();
  }

  //abre popup para adicionar medida
  showDialogToAdd() {
    this.novo = true;
    this.id_medida_selected = 0;
    this.valor_medida = "";
    this.simular(this.dialog);
  }



  //gravar unidade de medida
  gravarmedidas() {
    var UNIDADE_MEDIDA = new AB_DIC_UNIDADE_MEDIDA;
    UNIDADE_MEDIDA.medida = this.valor_medida;
    UNIDADE_MEDIDA.inativo = false;
    if (this.novo) {
      this.ABUNIDADADEMEDIDAService.create(UNIDADE_MEDIDA).subscribe(response => {
        this.listar_medidas();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      UNIDADE_MEDIDA.id_MEDIDA = this.id_medida_selected;
      this.ABUNIDADADEMEDIDAService.update(UNIDADE_MEDIDA).then(() => {
        this.listar_medidas();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de medidas na tabela
  listar_medidas() {
    this.medidas = [];
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.medidas.push({ id: response[x].id_MEDIDA, medida: response[x].medida });
        }
        this.medidas = this.medidas.slice();
      },
      error => console.log(error));
  }



  //apagar medida
  apagarmedidas() {
    var UNIDADE_MEDIDA = new AB_DIC_UNIDADE_MEDIDA;
    UNIDADE_MEDIDA.id_MEDIDA = this.id_medida_selected;
    UNIDADE_MEDIDA.medida = this.valor_medida;
    UNIDADE_MEDIDA.data_ANULACAO = new Date();
    UNIDADE_MEDIDA.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    UNIDADE_MEDIDA.inativo = true;
    this.ABUNIDADADEMEDIDAService.update(UNIDADE_MEDIDA).then(() => {
      this.listar_medidas();
    }, error => {
      console.log(error);
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_medida_selected = event.data.id;
    this.valor_medida = event.data.medida;
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
