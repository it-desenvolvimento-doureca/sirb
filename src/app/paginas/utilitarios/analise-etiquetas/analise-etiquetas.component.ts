import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ABDICCOMPONENTEService } from '../../../servicos/ab-dic-componente.service';
import { ABMOVMANUTENCAOETIQService } from '../../../servicos/ab-mov-manutencao-etiq.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-analise-etiquetas',
  templateUrl: './analise-etiquetas.component.html',
  styleUrls: ['./analise-etiquetas.component.css']
})
export class AnaliseEtiquetasComponent implements OnInit {

  componentes_silver: any[];
  cor_linha: any;
  linha: any;
  linhas: any;
  idtempetiquetas;
  numetiqueta: string;
  mensagem_aviso;
  etiquetasaditivo = [];
  user: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialogAviso') dialogAviso: ElementRef;

  constructor(private confirmationService: ConfirmationService, private ABMOVMANUTENCAOETIQService: ABMOVMANUTENCAOETIQService, private globalVar: AppGlobals, private router: Router, private location: Location, private renderer: Renderer, private ABDICCOMPONENTEService: ABDICCOMPONENTEService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

<<<<<<< HEAD
    this.ABDICCOMPONENTEService.getComponentesdoSGIID().subscribe(
      response => {
        this.componentes_silver = [];
        this.componentes_silver.push({ label: 'Selecionar Referência', value: "" });
=======
    this.ABDICCOMPONENTEService.getComponentes().subscribe(
      response => {
        this.componentes_silver = [];
        this.componentes_silver.push({ label: 'Seleccionar Referência', value: "" });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        for (var x in response) {
          this.componentes_silver.push({ label: response[x].PROREF + ' - ' + response[x].PRODES1 + ' ' + response[x].PRODES2, value: { valor: response[x].PROREF, UNISTO: response[x].UNISTO } });
        }
        this.componentes_silver = this.componentes_silver.slice();

      }, error => {
        console.log(error);
      });
  }


  leretiqueta(event) {
    this.ABDICCOMPONENTEService.getEtiquetas(event.value.valor).subscribe(
      response => {
        this.etiquetasaditivo = [];

        for (var x in response) {

          this.etiquetasaditivo.push({
            aditivo: response[x].PROREF + " - " + response[x].PRODES1,
            numero: response[x].etqnum,
            qtd: response[x].etqembqte,
            unicod: response[x].unicod,
            armazem: response[x].liecod,
            datcre: response[x].datcre,
            etqorilot1: response[x].etqorilot1,
            PRODES1: response[x].PRODES1,
            PROREF: response[x].PROREF,
            EMPCOD: response[x].EMPCOD,
          });
        }
        this.etiquetasaditivo = this.etiquetasaditivo.slice();

      }, error => {
        console.log(error);
      });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\.\+\,\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  imprimir(etiquetanum) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende imprimir a etiqueta ' + etiquetanum + '?',
      header: 'Imprmir Confirmação',
      icon: 'fa fa-print',
      accept: () => {

        var etiqueta = this.etiquetasaditivo.find(item => item.numero == etiquetanum);

        var data = [{
          ip_posto: this.getCookie("IP_CLIENT"), DATCRE: etiqueta.datcre, QUANT: etiqueta.qtd, UNIDADE: etiqueta.unicod,
          ETIQUETA: etiqueta.numero, PROREF: etiqueta.PROREF, ETQORILOT1: etiqueta.etqorilot1, PRODES: etiqueta.PRODES1
        }];

        this.ABMOVMANUTENCAOETIQService.ficheiroimprimiretiqueta(data).subscribe(
          response => {
            this.simular(this.inputgravou)
          }, error => {
            console.log(error);
            this.simular(this.inputerro);
          });
      }
    });
  }
  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

}
