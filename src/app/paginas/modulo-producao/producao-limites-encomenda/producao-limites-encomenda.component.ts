import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { GER_DIC_LIMITES_ENCOMENDA } from 'app/entidades/GER_DIC_LIMITES_ENCOMENDA';
import { GERDICLIMITESENCOMENDAService } from 'app/servicos/ger-dic-limites-encomenda.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-producao-limites-encomenda',
  templateUrl: './producao-limites-encomenda.component.html',
  styleUrls: ['./producao-limites-encomenda.component.css']
})
export class ProducaoLimitesEncomendaComponent implements OnInit {

  user: any;
  novo: boolean;
  id_selected: number;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  tabela: GER_DIC_LIMITES_ENCOMENDA;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;
  proref: string;
  prodes: string;
  clicod: number;
  etsnum: string;
  adrnom: string;
  quant_MIN: number;
  quant_MAX_SEMANA: number;
  datainsert: Date;
  referencia: any;
  cliente: any;


  constructor(private confirmationService: ConfirmationService, private GERDICLIMITESENCOMENDAService: GERDICLIMITESENCOMENDAService, private globalVar: AppGlobals,
    private renderer: Renderer) { }

  ngOnInit() {

    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);

    this.modoedicao = true;
    this.criar = true;
    this.apagar = true;



    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
  }



  //gravar unidade de depart
  gravar() {
    var dados = new GER_DIC_LIMITES_ENCOMENDA;
    dados = this.tabela;
    dados.quant_MIN = this.quant_MIN;
    dados.quant_MAX_SEMANA = this.quant_MAX_SEMANA;

    this.GERDICLIMITESENCOMENDAService.update(dados).then(() => {
      this.listar_departs();
      this.simular(this.closedialog);
    });


  }



  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERDICLIMITESENCOMENDAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].id_LIMITE,
            referencia: response[x].proref + ' - ' + response[x].prodes,
            cliente: response[x].clicod + ' (' + response[x].etsnum + ') - ' + response[x].adrnom,
            quant_MIN: response[x].quant_MIN,
            quant_MAX_SEMANA: response[x].quant_MAX_SEMANA, dados: response[x]
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }




  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.tabela = event.data.dados;
    this.id_selected = event.data.id;
    this.referencia = event.data.referencia;
    this.cliente = event.data.cliente;
    this.quant_MAX_SEMANA = event.data.quant_MAX_SEMANA;
    this.quant_MIN = event.data.quant_MIN;
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