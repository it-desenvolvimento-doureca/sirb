import { Component, OnInit } from '@angular/core';
import { PEDIDOSPRODUCAOService } from 'app/servicos/pedidosproducao.service';

@Component({
  selector: 'app-analise-lote-fornecedor',
  templateUrl: './analise-lote-fornecedor.component.html',
  styleUrls: ['./analise-lote-fornecedor.component.css']
})
export class AnaliseLoteFornecedorComponent implements OnInit {
  loading: boolean;
  cars1: any[] = [];
  dados: any[] = [];
  data_ini: any;
  data_fim: any;
  lote = null;

  constructor(private PEDIDOSPRODUCAOService: PEDIDOSPRODUCAOService) { }

  ngOnInit() {
    /*var d = new Date();
    this.data_fim = this.formatDate(d);
    d.setDate(d.getDate() - 1);
    this.data_ini = this.formatDate(d);*/

  }


  atualizar() {
    var objetivos_gerais = 0;
    var refs = null;
    //if (this.referencia.length > 0) refs = this.referencia.toString();
    //if (this.objetivos_gerais) objetivos_gerais = 1;
    //var data = [{ DATA_INI: this.formatDate(this.data_ini), DATA_FIM: this.formatDate(this.data_fim), LINHA: this.linha, REF: refs, objetivos_gerais: objetivos_gerais }];

    this.carregaLotes();

  }

  carregaLotes() {
    this.loading = true;
    this.cars1 = [];
    this.dados = [];

    //if (this.referencia.length > 0) refs = this.referencia.toString();
    //if (this.objetivos_gerais) objetivos_gerais = 1;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      //HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: this.lote
    }];

    this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_LOTES(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            this.cars1.push({
              referencias: [],
              id: parseInt(x) + 1, lote: response[x][0], proref_origem: response[x][1], desc_proref_origem: response[x][2],
              ofs: response[x][5],
              proref_destino: response[x][3], desc_proref_destino: response[x][4], atualiza: false, iconplus: true,
            })
          }
          this.dados = this.cars1.slice();
          //this.assignCopy()
        }
        this.loading = false;

      }, error => {
        this.loading = false;
      });
  }

  carregaref(id) {

    this.cars1.find(item => item.id == id).iconplus = !this.cars1.find(item => item.id == id).iconplus;

    //if (this.referencia.length > 0) refs = this.referencia.toString();
    //if (this.objetivos_gerais) objetivos_gerais = 1;
    var LOTE = this.cars1.find(item => item.id == id).lote;
    var OFS = this.cars1.find(item => item.id == id).ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      //HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS
    }];

    if (this.cars1.find(item => item.id == id).referencias.length == 0 && !this.cars1.find(item => item.id == id).atualiza) {
      this.cars1.find(item => item.id == id).iconplus = true;
      this.cars1.find(item => item.id == id).atualiza = true;

      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_REFERENCIAS(data).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            for (var x in response) {
              this.cars1.find(item => item.id == id).referencias.push({
                id: parseInt(x) + 1, brand: response[x][0] + ' - ' + response[x][1], proref: response[x][0], areadef: response[x][10],
                fase: response[x][2], areapeca: response[x][3], produzidas: response[x][4], defeito: response[x][5], areprod: response[x][6], barras: response[x][9],
                objetivov: (response[x][7]), percdefeitov: response[x][8], media: response[x][11],
                objetivo: (response[x][7] == null) ? 0.00 : (response[x][7]).toFixed(2), percdefeito: (response[x][8] == null) ? 0.00 : response[x][8].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("lote" + id).classList.remove("collapsed");
              document.getElementById("collapselote" + id).classList.remove("collapse");
              document.getElementById("collapselote" + id).style.height = "auto";
              this.cars1.find(item => item.id == id).iconplus = false;
            }, 50);
            //this.assignCopy()
          } else {
            this.cars1.find(item => item.id == id).atualiza = true;
          }
          this.cars1.find(item => item.id == id).atualiza = false;
        }, error => {
          this.cars1.find(item => item.id == id).atualiza = false;
        });
    }
  }


  getfamdefeitos(id, ref) {
    var index = this.cars1.findIndex(item => item.id == id);
    this.cars1[index].referencias.find(item => item.id == ref).iconplus = !this.cars1[index].referencias.find(item => item.id == ref).iconplus;


    var PROREF = this.cars1[index].referencias.find(item => item.id == ref).proref;
    var LOTE = this.cars1[index].lote;
    var OFS = this.cars1[index].ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      REF: PROREF,
      FAM: null
    }];
    if (this.cars1[index].referencias.find(item => item.id == ref).child.length == 0 && !this.cars1[index].referencias.find(item => item.id == ref).atualiza) {
      this.cars1[index].referencias.find(item => item.id == ref).iconplus = true;
      this.cars1[index].referencias.find(item => item.id == ref).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_FAM(data).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            for (var x in response) {
              this.cars1[index].referencias.find(item => item.id == ref).child.push({
                id: parseInt(x) + 1, brand: response[x][1],
                defeito: response[x][2], familia: response[x][5],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("referencia" + id + ref).classList.remove("collapsed");
              document.getElementById("collapseref" + id + ref).classList.remove("collapse");
              document.getElementById("collapseref" + id + ref).style.height = "auto";
              this.cars1[index].referencias.find(item => item.id == ref).iconplus = false;
            }, 50);
          } else {
            this.cars1[index].referencias.find(item => item.id == ref).iconplus = true;
          }
          this.cars1[index].referencias.find(item => item.id == ref).atualiza = false;
        }, error => {
          this.cars1[index].referencias.find(item => item.id == ref).atualiza = false;
        });
    }
  }



  getdefeitos(id, ref, fam) {

    var index = this.cars1.findIndex(item => item.id == id);
    var index2 = this.cars1[index].referencias.findIndex(item => item.id == ref);


    this.cars1[index].referencias[index2].child.find(item => item.id == fam).iconplus = !this.cars1[index].referencias[index2].child.find(item => item.id == fam).iconplus;

    var PROREF = this.cars1[index].referencias.find(item => item.id == ref).proref;
    var FAM = this.cars1[index].referencias[index2].child.find(item => item.id == fam).familia;
    var LOTE = this.cars1[index].lote;
    var OFS = this.cars1[index].ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      REF: PROREF,
      FAM: FAM
    }];
    if (this.cars1[index].referencias[index2].child.find(item => item.id == fam).child.length == 0 && !this.cars1[index].referencias[index2].child.find(item => item.id == fam).atualiza) {
      this.cars1[index].referencias[index2].child.find(item => item.id == fam).iconplus = true;
      this.cars1[index].referencias[index2].child.find(item => item.id == fam).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_DEFEITOS(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {
              this.cars1[index].referencias[index2].child.find(item => item.id == fam).child.push({
                id: parseInt(x) + 1, brand: response[x][2] + ' - ' + response[x][0],
                defeito: response[x][1], tipodefeito: response[x][2],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsefam" + id + ref + fam).classList.remove("collapsed");
              document.getElementById("collapsetipo" + id + ref + fam).classList.remove("collapse");
              document.getElementById("collapsetipo" + id + ref + fam).style.height = "auto";
              this.cars1[index].referencias[index2].child.find(item => item.id == fam).iconplus = false;
            }, 50);
          } else {
            this.cars1[index].referencias[index2].child.find(item => item.id == fam).iconplus = true;
          }
          this.cars1[index].referencias[index2].child.find(item => item.id == fam).atualiza = false;
        }, error => {
          this.cars1[index].referencias[index2].child.find(item => item.id == fam).atualiza = false;
        });
    }
  }


  getlote(id, ref, fam, defeito) {
    var index = this.cars1.findIndex(item => item.id == id);
    var index2 = this.cars1[index].referencias.findIndex(item => item.id == ref);
    var index3 = this.cars1[index].referencias[index2].child.findIndex(item => item.id == fam);

    this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = !this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus;


    var PROREF = this.cars1[index].referencias.find(item => item.id == ref).proref;
    var DEFEITO = this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).tipodefeito;

    var LOTE = this.cars1[index].lote;
    var OFS = this.cars1[index].ofs;

    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      FAM: null,
      REF: PROREF,
      DEFEITO: DEFEITO
    }];

    if (this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).child.length == 0 && !this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza) {
      this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = true;
      this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_OFREF(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          //console.log(response)
          if (count > 0) {

            for (var x in response) {
              this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).child.push({
                id: parseInt(x) + 1, brand: response[x][5],
                defeito: response[x][1],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsedef" + id + ref + fam + defeito).classList.remove("collapsed");
              document.getElementById("collapselote" + id + ref + fam + defeito).classList.remove("collapse");
              document.getElementById("collapselote" + id + ref + fam + defeito).style.height = "auto";
              this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = false;

            }, 50);
          } else {
            this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = true;
          }
          this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = false;
        }, error => {
          this.cars1[index].referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = false;
        });
    }
  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    if (date == null) {
      return null;
    }

    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
