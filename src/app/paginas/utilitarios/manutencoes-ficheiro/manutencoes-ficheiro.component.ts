import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABMOVMANUTENCAOService } from 'app/servicos/ab-mov-manutencao.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manutencoes-ficheiro',
  templateUrl: './manutencoes-ficheiro.component.html',
  styleUrls: ['./manutencoes-ficheiro.component.css']
})
export class ManutencoesFicheiroComponent implements OnInit {
  datafim: any;
  datainicio: any;
  ip: any;
  horainicio = "00:00";
  horafim = "00:00";
  selectedIDS: string[] = []

  @ViewChild('inputerro') inputerro: ElementRef;
  loading: boolean;

  listaofscomps: any[] = [];

  constructor(private renderer: Renderer, private location: Location, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService) { }

  ngOnInit() {
  }

  getListComp() {
    this.loading = true;
    var data = [{ datainicio: this.formatDate(this.datainicio) + " " + this.horainicio, ip: this.ip, datafim: this.formatDate(this.datafim) + " " + this.horafim }];
    this.listaofscomps = [];
    this.selectedIDS = [];
    this.ABMOVMANUTENCAOService.criaficheiroIDS(data).subscribe(resu => {

      for (var x in resu) {
        this.listaofscomps.push({
          ID: resu[x].ID, DATA: resu[x].DATA.substring(0, 19), REF: resu[x].REF + ' - ' + resu[x].REF_DES, ARMAZEM: resu[x].ARMAZEM,
          ETIQUETA: resu[x].ETIQUETA, MANUTENCAO: resu[x].MANUTENCAO, QUANTIDADE: resu[x].QUANTIDADE + ' - ' + resu[x].UNICOD
        });
      }
      this.listaofscomps = this.listaofscomps.slice();
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  getFile() {
    if (this.selectedIDS.length > 0) {
      this.loading = true;
      var data = [{ ids: this.selectedIDS.toString(), ip: this.ip }];

      this.ABMOVMANUTENCAOService.criaficheiro2(data).subscribe(resu => {
        this.loading = false;
        var a = document.createElement('a');
        a.href = URL.createObjectURL(resu);
        a.download = "ficheiros_interface.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      }, error => {
        this.loading = false;
        this.simular(this.inputerro);
        console.log(error)
      });
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
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


}
