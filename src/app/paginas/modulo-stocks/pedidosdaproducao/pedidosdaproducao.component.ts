import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PEDIDOSPRODUCAOService } from 'app/servicos/pedidosproducao.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import * as FileSaver from 'file-saver';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-pedidosdaproducao',
  templateUrl: './pedidosdaproducao.component.html',
  styleUrls: ['./pedidosdaproducao.component.css']
})
export class PedidosdaproducaoComponent implements OnInit {
  armazens_acesso: any[];
  dados: any[];
  admin: any;
  disimprimir = false;
  @ViewChild("tabeladados") tabeladados: DataTable;

  constructor(private RelatoriosService: RelatoriosService, private PEDIDOSPRODUCAOService: PEDIDOSPRODUCAOService, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setcriar(false);

    this.admin = JSON.parse(localStorage.getItem('userapp'))["admin"];
    var acessos = JSON.parse(localStorage.getItem('acessos'));
    this.armazens_acesso = [];
    for (var x in acessos) {
      if (acessos[x].node.startsWith("armazem_") && acessos[x].node.replace("armazem_", "") != "0") {
        this.armazens_acesso.push("'" + acessos[x].node.replace("armazem_", "") + "'");
      }
    }

    if (this.armazens_acesso.length == 0) this.armazens_acesso.push("'0'");
    var armaz = this.armazens_acesso.toString();
    if (this.admin) {
      armaz = null;
    }
    var data = [{ ARMAZENS: armaz }];
    this.carrega(data);
  }

  carrega(data) {
    this.PEDIDOSPRODUCAOService.getPedidosProducao(data).subscribe(
      response => {
        this.dados = [];
        for (var x in response) {
          this.dados.push({
            codigo: response[x][0],
            designacao: response[x][1],
            lote: response[x][2],
            etiqueta: response[x][3],
            quantidade: response[x][4],
            armazem: response[x][5],
            localizacao: response[x][6],
            operario: response[x][7] + " - " + response[x][8],
            //sector: response[x][10],
            sector: response[x][12],
            posto :  response[x][13],
            data_hora: this.formatDate(response[x][11]) + " " + new Date(response[x][11]).toLocaleTimeString().slice(0, 5),
          });
        }
        this.dados = this.dados.slice();
      }, error => { console.log(error); });

  }

  atualizar() {
    if (this.armazens_acesso.length == 0) this.armazens_acesso.push("'0'");
    var armaz = this.armazens_acesso.toString();
    if (this.admin) {
      armaz = null;
    }
    var data = [{ ARMAZENS: armaz }];
    this.carrega(data);
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

  imprimir(formato) {
    var filename = new Date().toLocaleString().replace(/\D/g, '');
    var filenametransfer = "pedidosproducao";

    var data;
    var dados = [];

    if (this.tabeladados.filteredValue) {
      dados = this.tabeladados.filteredValue;
    } else {
      dados = this.tabeladados._value;
    }

    data = [{ dados: JSON.stringify(dados), DATA: null, ATIVO: null, SECTOR: null }];


    this.RelatoriosService.downloadPDF2(formato, filename, data, filenametransfer, "pedidosproducao").subscribe(
      (res) => {
        FileSaver.saveAs(res, filenametransfer);
      }
    );
  }
}
