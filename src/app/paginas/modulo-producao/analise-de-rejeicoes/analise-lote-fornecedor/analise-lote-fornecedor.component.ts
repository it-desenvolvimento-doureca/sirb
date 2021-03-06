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
  referencias: any[] = [];
  ofs: any;

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
    this.referencias = [];
    var ofs = '';

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
              //referencias: [],
              id: parseInt(x) + 1, lote: response[x][0], proref_origem: response[x][1], desc_proref_origem: response[x][2],
              ofs: response[x][5],
              proref_destino: response[x][3], desc_proref_destino: response[x][4], atualiza: false, iconplus: true,
            })

            if (parseInt(x) == 0) {
              ofs += response[x][5];
            } else {
              ofs += "," + response[x][5];
            }
          }
          this.dados = this.cars1.slice();

          var array_ofs = ofs.split(",");
          var uniqueOfs = [];
          uniqueOfs = array_ofs.filter(function (item, pos) {
            return array_ofs.indexOf(item) == pos;
          })

          this.carregaref(uniqueOfs.toString());
          //this.assignCopy()
        }
        this.loading = false;

      }, error => {
        this.loading = false;
      });
  }

  carregaref(ofs) {

    this.ofs = ofs;
    //if (this.referencia.length > 0) refs = this.referencia.toString();
    //if (this.objetivos_gerais) objetivos_gerais = 1;
    var LOTE = this.lote;
    //var OFS = this.cars1.find(item => item.id == id).ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      //HORA_INI: this.hora_ini, HORA_FIM: this.hora_fim,
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: ofs
    }];


    this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_REFERENCIAS(data).subscribe(
      response => {
        var count = Object.keys(response).length;

        if (count > 0) {

          for (var x in response) {
            this.referencias.push({
              id: parseInt(x) + 1, brand: response[x][0] + ' - ' + response[x][1], proref: response[x][0], areadef: response[x][10],
              fase: response[x][2], areapeca: response[x][3], produzidas: response[x][4], defeito: response[x][5], areprod: response[x][6], barras: response[x][9],
              objetivov: (response[x][7]), percdefeitov: response[x][8], media: response[x][11],
              objetivo: (response[x][7] == null) ? 0.00 : (response[x][7]).toFixed(2), percdefeito: (response[x][8] == null) ? 0.00 : response[x][8].toFixed(3), atualiza: false, iconplus: true, child: []
            })
          }

          this.loading = false;

        } else {
          this.loading = false;
        }

      }, error => {
        this.loading = false;

      });

  }


  getfamdefeitos(ref) {

    this.referencias.find(item => item.id == ref).iconplus = !this.referencias.find(item => item.id == ref).iconplus;


    var PROREF = this.referencias.find(item => item.id == ref).proref;
    var LOTE = this.lote;
    var OFS = this.ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      REF: PROREF,
      FAM: null
    }];
    if (this.referencias.find(item => item.id == ref).child.length == 0 && !this.referencias.find(item => item.id == ref).atualiza) {
      this.referencias.find(item => item.id == ref).iconplus = true;
      this.referencias.find(item => item.id == ref).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_FAM(data).subscribe(
        response => {
          var count = Object.keys(response).length;

          if (count > 0) {

            for (var x in response) {
              this.referencias.find(item => item.id == ref).child.push({
                id: parseInt(x) + 1, brand: response[x][1],
                defeito: response[x][2], familia: response[x][5],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("referencia" + ref).classList.remove("collapsed");
              document.getElementById("collapseref" + ref).classList.remove("collapse");
              document.getElementById("collapseref" + ref).style.height = "auto";
              this.referencias.find(item => item.id == ref).iconplus = false;
            }, 50);
          } else {
            this.referencias.find(item => item.id == ref).iconplus = true;
          }
          this.referencias.find(item => item.id == ref).atualiza = false;
        }, error => {
          this.referencias.find(item => item.id == ref).atualiza = false;
        });
    }
  }



  getdefeitos(ref, fam) {


    var index2 = this.referencias.findIndex(item => item.id == ref);


    this.referencias[index2].child.find(item => item.id == fam).iconplus = !this.referencias[index2].child.find(item => item.id == fam).iconplus;

    var PROREF = this.referencias.find(item => item.id == ref).proref;
    var FAM = this.referencias[index2].child.find(item => item.id == fam).familia;
    var LOTE = this.lote;
    var OFS = this.ofs;
    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      REF: PROREF,
      FAM: FAM
    }];
    if (this.referencias[index2].child.find(item => item.id == fam).child.length == 0 && !this.referencias[index2].child.find(item => item.id == fam).atualiza) {
      this.referencias[index2].child.find(item => item.id == fam).iconplus = true;
      this.referencias[index2].child.find(item => item.id == fam).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_DEFEITOS(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {

            for (var x in response) {
              this.referencias[index2].child.find(item => item.id == fam).child.push({
                id: parseInt(x) + 1, brand: response[x][2] + ' - ' + response[x][0],
                defeito: response[x][1], tipodefeito: response[x][2],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsefam" + ref + fam).classList.remove("collapsed");
              document.getElementById("collapsetipo" + ref + fam).classList.remove("collapse");
              document.getElementById("collapsetipo" + ref + fam).style.height = "auto";
              this.referencias[index2].child.find(item => item.id == fam).iconplus = false;
            }, 50);
          } else {
            this.referencias[index2].child.find(item => item.id == fam).iconplus = true;
          }
          this.referencias[index2].child.find(item => item.id == fam).atualiza = false;
        }, error => {
          this.referencias[index2].child.find(item => item.id == fam).atualiza = false;
        });
    }
  }


  getlote(ref, fam, defeito) {

    var index2 = this.referencias.findIndex(item => item.id == ref);
    var index3 = this.referencias[index2].child.findIndex(item => item.id == fam);

    this.referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = !this.referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus;


    var PROREF = this.referencias.find(item => item.id == ref).proref;
    var DEFEITO = this.referencias[index2].child[index3].child.find(item => item.id == defeito).tipodefeito;

    var LOTE = this.lote;
    var OFS = this.ofs;

    var data = [{
      DATA_INI: this.formatDate(this.data_ini),
      DATA_FIM: this.formatDate(this.data_fim),
      LOTE: LOTE,
      OFS: OFS,
      FAM: null,
      REF: PROREF,
      DEFEITO: DEFEITO
    }];

    if (this.referencias[index2].child[index3].child.find(item => item.id == defeito).child.length == 0 && !this.referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza) {
      this.referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = true;
      this.referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = true;
      this.PEDIDOSPRODUCAOService.GET_ANALISE_LOTE_FORNECEDOR_OFREF(data).subscribe(
        response => {
          var count = Object.keys(response).length;
          //console.log(response)
          if (count > 0) {

            for (var x in response) {
              this.referencias[index2].child[index3].child.find(item => item.id == defeito).child.push({
                id: parseInt(x) + 1, brand: response[x][5],
                defeito: response[x][1],
                objetivo: (response[x][4] != null) ? response[x][4].toFixed(2) : 0.00, percdefeito: (response[x][3] == null) ? 0.00 : response[x][3].toFixed(3), atualiza: false, iconplus: true, child: []
              })
            }

            setTimeout(() => {
              document.getElementById("collapsedef" + ref + fam + defeito).classList.remove("collapsed");
              document.getElementById("collapselote" + ref + fam + defeito).classList.remove("collapse");
              document.getElementById("collapselote" + ref + fam + defeito).style.height = "auto";
              this.referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = false;

            }, 50);
          } else {
            this.referencias[index2].child[index3].child.find(item => item.id == defeito).iconplus = true;
          }
          this.referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = false;
        }, error => {
          this.referencias[index2].child[index3].child.find(item => item.id == defeito).atualiza = false;
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
