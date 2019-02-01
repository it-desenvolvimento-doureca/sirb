import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABMOVMANUTENCAOETIQService } from '../../../servicos/ab-mov-manutencao-etiq.service';
import { AB_MOV_MANUTENCAO_ETIQ } from '../../../entidades/AB_MOV_MANUTENCAO_ETIQ';
import { ABMOVMANUTENCAOLINHAService } from '../../../servicos/ab-mov-manutencao-linha.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ABDICLINHAService } from '../../../servicos/ab-dic-linha.service';
import { AppGlobals } from '../../../menu/sidebar.metadata';

@Component({
  selector: 'app-correcaoquantidades',
  templateUrl: './correcaoquantidades.component.html',
  styleUrls: ['./correcaoquantidades.component.css']
})
export class CorrecaoquantidadesComponent implements OnInit {

  cor_linha: any;
  linha: any;
  linhas: any;
  etiquetasinsert: any[];
  etiquetasaditivo2: any;
  idtempetiquetas;
  numetiqueta: string;
  mensagem_aviso;
  etiquetasaditivo = [];
  user: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialogAviso') dialogAviso: ElementRef;

  constructor(private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private router: Router, private location: Location, private renderer: Renderer, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABMOVMANUTENCAOETIQService: ABMOVMANUTENCAOETIQService) { }

  ngOnInit() {
    this.preenchelinhas();
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
  }


  leretiqueta() {
    if (this.numetiqueta != '' && this.numetiqueta != null) {
      this.idtempetiquetas = 1;
      this.etiquetasaditivo2 = [];
      this.etiquetasaditivo2.push({
        disabled: false,
        id: "id" + this.idtempetiquetas, numero: "", produto: "", qtd: "", consumir: "", quant_FINAL: "", quant_FINAL2: "", EMPCOD: "", ETQORIQTE1: null, ETQORILOT1: "", LIECOD: "",
        LOTNUMENR: "", PROREF: "", PRODES: "", DATCRE: "", UNICOD: "", UNISTO: "", VA1REF: " ", VA2REF: " ", indnumenr: "", id_lin: null, ETQNUMENR: "", sinal: "", INDREF: ""
      });
      this.addlinhaetiqiadiv("id" + this.idtempetiquetas, this.numetiqueta, "")
      this.idtempetiquetas++;
    }
  }

  addlinhaetiqiadiv(id, campo, ETQNUMENR) {
    if (campo != "" && (ETQNUMENR == "" || ETQNUMENR == null)) {

      this.adicionadadosaditivos(id, campo);

    }
  }

  adicionadadosaditivos(id, campo) {
    var etiquetan = "0000000000" + campo;
    var count = 0;

    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero == etiquetan.substring(etiquetan.length - 10) && this.etiquetasaditivo[y].ETQNUMENR != "") {
        count++;
      }
    }

    if (count < 1) {

      this.ABMOVMANUTENCAOLINHAService.getDadosEtiqueta(etiquetan.substring(etiquetan.length - 10)).subscribe(
        response => {
          var count = Object.keys(response).length;
          if (count > 0) {


            var etiqueta = this.etiquetasaditivo2.find(item => item.id == id);
            etiqueta.numero = etiquetan.substring(etiquetan.length - 10);
            etiqueta.produto = response[0].PRODES1;
            var value = "0";
            if (response[0].ETQEMBQTE != null) value = parseFloat(response[0].ETQEMBQTE).toFixed(4);

            etiqueta.qtd = value.replace(".", ",");
            etiqueta.EMPCOD = response[0].EMPCOD;
            etiqueta.ETQORILOT1 = response[0].ETQORILOT1;
            etiqueta.ETQORIQTE1 = response[0].ETQORIQTE1;
            etiqueta.LIECOD = response[0].LIECOD;
            etiqueta.LOTNUMENR = response[0].LOTNUMENR;
            etiqueta.PROREF = response[0].PROREF;
            etiqueta.PRODES = response[0].PRODES1;
            etiqueta.DATCRE = response[0].DATCRE;
            etiqueta.UNICOD = response[0].UNICOD;
            etiqueta.UNISTO = response[0].UNISTO;
            etiqueta.VA1REF = response[0].VA1REF;
            etiqueta.VA2REF = response[0].VA2REF;
            etiqueta.indnumenr = response[0].INDNUMENR;
            etiqueta.INDREF = response[0].INDREF;
            etiqueta.ETQNUMENR = response[0].ETQNUMENR;
            etiqueta.disabled = true;

            this.etiquetasaditivo.push(etiqueta);
            this.numetiqueta = "";
          } else {
            this.mensagem_aviso = "Etiqueta nº " + etiquetan.substring(etiquetan.length - 10) + " não existe!";
            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';
            this.simular(this.dialogAviso);
          }
        }, error => { console.log(error); });
    } else {
      this.mensagem_aviso = "Etiqueta já foi adicionada!";
      let elm2 = document.getElementById("dialogAvisoContent");
      let elem3 = document.getElementById("mainpagecontent");
      let h = elem3.getBoundingClientRect().height;

      document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
      let coords = document.getElementById("toptexttop").offsetTop;
      elm2.style.top = Math.abs(coords - 10) + 'px';

      elm2.style.bottom = 'none';
      this.simular(this.dialogAviso);
    }

  }

  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));
  }

  atualizaQUANT(id) {
    for (var y in this.etiquetasaditivo) {
      if (this.etiquetasaditivo[y].numero != null && this.etiquetasaditivo[y].numero != "") {
        if (this.etiquetasaditivo[y].id == id) {

          var maximo = this.etiquetasaditivo[y].ETQORIQTE1;
          var qtdf = parseFloat((this.etiquetasaditivo[y].quant_FINAL).replace(",", "."));
          var qtd = (this.etiquetasaditivo[y].qtd).replace(",", ".");
          // var consumir = (this.etiquetasaditivo[y].consumir).replace(",", ".");

          if (this.etiquetasaditivo[y].ETQORIQTE1 >= qtdf) {
            if (qtd - qtdf < 0) {
              this.etiquetasaditivo[y].consumir = (qtdf - qtd);
              this.etiquetasaditivo[y].sinal = "-";
            } else {
              this.etiquetasaditivo[y].consumir = (qtd - qtdf);
              this.etiquetasaditivo[y].sinal = "+";
            }
          } else {
            this.mensagem_aviso = "O máximo de quantidade da etiqueta foi ultrapassado!";

            let elm2 = document.getElementById("dialogAvisoContent");
            let elem3 = document.getElementById("mainpagecontent");
            let h = elem3.getBoundingClientRect().height;

            document.getElementById("dialogAviso").style.height = Math.abs(h + 300) + 'px';
            let coords = document.getElementById("toptexttop").offsetTop;
            elm2.style.top = Math.abs(coords - 10) + 'px';

            elm2.style.bottom = 'none';

            this.simular(this.dialogAviso);

            this.etiquetasaditivo[y].quant_FINAL = maximo.replace(".", ",");
            if (qtd - maximo < 0) {
              this.etiquetasaditivo[y].consumir = (maximo - qtd);
              this.etiquetasaditivo[y].sinal = "-";
            } else {
              this.etiquetasaditivo[y].consumir = (qtd - maximo);
              this.etiquetasaditivo[y].sinal = "+";
            }
          }

        }
        // console.log(this.etiquetasaditivo[y].quant_FINAL);
      }
    }

  }

  gravar() {
    if (this.etiquetasaditivo.length > 0) {
      this.etiquetasinsert = [];
      for (var y in this.etiquetasaditivo) {
        this.inseriretiquetas(this.etiquetasaditivo[y], new Date(), y);

      }
    }
  }

  inseriretiquetas(etiqueta, data, x) {
    var ETI = new AB_MOV_MANUTENCAO_ETIQ;
    ETI.id_MANUTENCAO_LIN = 0;
    ETI.consumir = etiqueta.consumir;
    ETI.empcod = etiqueta.EMPCOD;
    ETI.etqnum = etiqueta.numero;
    ETI.etqnumenr = etiqueta.etqnumenr;
    ETI.etqorilot1 = etiqueta.ETQORILOT1;
    ETI.indref = etiqueta.INDREF;
    ETI.liecod = etiqueta.LIECOD;
    ETI.lotnumenr = etiqueta.LOTNUMENR;
    ETI.proref = etiqueta.PROREF;
    ETI.prodes = etiqueta.PRODES;
    ETI.datcre = etiqueta.DATCRE;
    ETI.quant_FINAL = etiqueta.quant_FINAL.replace(",", ".");
    ETI.quant = etiqueta.qtd.replace(",", ".");
    ETI.unicod = etiqueta.UNICOD;
    ETI.va1REF = etiqueta.VA1REF;
    ETI.va2REF = etiqueta.VA2REF;
    ETI.indnumenr = etiqueta.indnumenr;
    ETI.unisto = etiqueta.UNISTO;
    ETI.utz_CRIA = this.user;
    ETI.data_CRIA = data;
    ETI.etqnumenr = etiqueta.ETQNUMENR;
    ETI.sinal = etiqueta.sinal;
    ETI.observacao = "Correção Quantidades";
    ETI.etqoriqte1 = parseFloat(etiqueta.ETQORIQTE1);


    this.ABMOVMANUTENCAOETIQService.create(ETI).subscribe(
      res => {
        this.etiquetasinsert.push(res.id_MOV_MANU_ETIQUETA)
        if (parseInt(x) + 1 == this.etiquetasaditivo.length) {
          this.simular(this.inputgravou);
          this.criarficheiro(this.etiquetasinsert.toString(), this.linha.id);
          this.etiquetasaditivo = [];
        }

      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  apagaretiquetaaditivo(id) {
    var index1 = this.etiquetasaditivo.findIndex(item => item.id === id);
    this.etiquetasaditivo.splice(index1, 1);
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

  criarficheiro(id, linha) {
    var data = [{ id: id, linha: linha, ip_posto: this.getCookie("IP_CLIENT") }];
    this.ABMOVMANUTENCAOETIQService.criaficheirocorrecao(data).subscribe(
      response => {
      }, error => { console.log(error); });
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }


}
