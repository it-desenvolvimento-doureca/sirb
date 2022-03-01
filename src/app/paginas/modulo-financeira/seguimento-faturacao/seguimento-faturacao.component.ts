import { Component, OnInit } from '@angular/core';
import { FINDICOBJETIVOSService } from 'app/servicos/fin-dic-objetivos.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'app/servicos/upload.service';
import { EmailService } from 'app/servicos/email.service';
import { EMAIL } from 'app/entidades/EMAIL';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguimento-faturacao',
  templateUrl: './seguimento-faturacao.component.html',
  styleUrls: ['./seguimento-faturacao.component.css']
})
export class SeguimentoFaturacaoComponent implements OnInit {
  ativobt = "1";
  tabela_dados: any[];
  dias_uteis;
  dias_decorridos;
  objetivo_DIARIO;
  faturacao_M_1;
  objetivo_FATURACAO;
  mes_ano;
  meses_objetivo: any[];
  mes_mais_1: any;
  mes_mais_2: any;
  mes_menos_1: any;
  mes: any;
  data_graf = {};
  options;
  display = false;
  srcelement = null;
  loading: boolean;
  email_para: any;
  assunto: any;
  mensagem: any;
  display_envia: boolean;
  bt_disable: boolean;
  doc_blob;

  constructor(private router: Router, private EmailService: EmailService, private sanitizer: DomSanitizer, private FINDICOBJETIVOSService: FINDICOBJETIVOSService, private UploadService: UploadService) { }

  ngOnInit() {
    this.mes_ano = 0;
    this.dias_uteis = 0;
    this.dias_decorridos = 0;
    this.objetivo_DIARIO = 0;
    this.faturacao_M_1 = 0;
    this.objetivo_FATURACAO = 0;
    this.listarmeses();

    /*this.tabela_dados = [
      {
        week: '',
        data: '2020-01-01',
        objetivo: 0,
        valorizacao_total_mes: 0,
        realizado: 0,
        encomendado: 0,
        atraso: 0,
        valor_stock: 0,
        realizacao: 0,
        desvio: 0,
        barras_mes_1: 0,
        barras_mes_2: 0,
        total_barras: 0,
        vendas_week_1: '',
        previsao_vendas_1: 0,

        barras_mes_m1_1: 0,
        barras_mes_m1_2: 0,
        total_barras_m1: 0,
        vendas_week_2: '',
        previsao_vendas_2: 0,


      }
    ]*/



  }

  getdadostabela(event) {

    var data = [{
      DATA: event.value.data
    }];
    this.dias_decorridos = event.value.dias_decorridos;
    this.dias_uteis = event.value.dias_uteis;
    this.faturacao_M_1 = event.value.faturacao_M_1;
    this.objetivo_DIARIO = event.value.objetivo_DIARIO;
    this.objetivo_FATURACAO = event.value.objetivo_FATURACAO;
    this.mes_mais_1 = event.value.mes_mais_1;
    this.mes_mais_2 = event.value.mes_mais_2;
    this.mes_menos_1 = event.value.mes_menos_1;
    this.mes = event.value.mes;

    this.tabela_dados = [];
    var labelgraf = [];
    var datasetsgraf = [];
    this.data_graf = [];
    var data_obj = [];
    var data_prev = [];
    var data_val = [];
    var data_real = [];
    var data_enc = [];
    var data_atras = [];
    var data_stock = [];

    this.FINDICOBJETIVOSService.seguimentosFaturacao(data).subscribe(
      response => {

        datasetsgraf.push({
          label: "Todos", data: [], fill: false, borderColor: [
            '#black'
          ],
          borderWidth: 2
        });
        for (var x in response) {

          this.tabela_dados.push({
            week: response[x][0],
            data: response[x][1],
            objetivo: response[x][2],
            valorizacao_total_mes: response[x][3],
            realizado: response[x][4],
            encomendado: response[x][5],
            atraso: response[x][6],
            valor_stock: response[x][7],
            realizacao: response[x][8],
            desvio: response[x][9],
            barras_mes_1: (response[x][10] == null && response[x][21] != null) ? 0 : response[x][10],
            barras_mes_2: (response[x][11] == null && response[x][21] != null) ? 0 : response[x][11],
            total_barras: (response[x][12] == null && response[x][21] != null) ? 0 : response[x][12],
            vendas_week_1: response[x][13],
            previsao_vendas_1: response[x][14],

            barras_mes_m1_1: response[x][15],
            barras_mes_m1_2: response[x][16],
            total_barras_m1: response[x][17],
            vendas_week_2: response[x][18],
            previsao_vendas_2: response[x][19],
            semana_producao: response[x][21],
            semana_producao_planeada: response[x][22],
          });

          labelgraf.push(this.formatDate2(response[x][1]));

          if (response[x][20] == null) { data_obj.push(null) } else { data_obj.push(response[x][2]) };
          if (response[x][20] == null) { data_prev.push(null) } else { data_prev.push(response[x][14]) };
          if (response[x][20] == null) { data_val.push(null) } else { data_val.push(response[x][3]) };
          if (response[x][20] == null) { data_real.push(null) } else { data_real.push(response[x][4]) };
          if (response[x][20] == null) { data_enc.push(null) } else { data_enc.push(response[x][5]) };
          if (response[x][20] == null) { data_atras.push(null) } else { data_atras.push(response[x][6]) };
          if (response[x][20] == null) { data_stock.push(null) } else { data_stock.push(response[x][7]) };
        }
        this.valida_Producao_Planeada();

        datasetsgraf.push({ label: 'Objetivo', data: data_obj, fill: false, borderColor: this.getRandomColor(1), borderWidth: 2 });
        datasetsgraf.push({ label: 'Previsão ' + this.mes_mais_1, data: data_prev, fill: false, borderColor: this.getRandomColor(2), borderWidth: 2 });
        datasetsgraf.push({ label: 'Valorização total mês', data: data_val, fill: false, borderColor: this.getRandomColor(3), borderWidth: 2 });
        datasetsgraf.push({ label: 'Realizado', data: data_real, fill: false, borderColor: this.getRandomColor(4), borderWidth: 2 });
        datasetsgraf.push({ label: 'Encomendado (inclui atrasos)', data: data_enc, fill: false, borderColor: this.getRandomColor(5), borderWidth: 2 });
        datasetsgraf.push({ label: 'Atraso', data: data_atras, fill: false, borderColor: this.getRandomColor(6), borderWidth: 2 });
        datasetsgraf.push({ label: 'Valor de stock PF', data: data_stock, fill: false, borderColor: this.getRandomColor(7), borderWidth: 2 });
        this.carregagraficos(labelgraf, datasetsgraf)
      },
      error => console.log(error));
  }

  valida_Producao_Planeada() {
    for (var x in this.tabela_dados) {
      if (parseInt(x) + 1 < this.tabela_dados.length) {
        if (parseInt(x) < 2 && this.tabela_dados[parseInt(x)].semana_producao_planeada == this.tabela_dados[parseInt(x) + 1].semana_producao_planeada) {
          this.tabela_dados[x].semana_producao_planeada = null;
          this.tabela_dados[x].barras_mes_m1_1 = null;
          this.tabela_dados[x].barras_mes_m1_2 = null;
          this.tabela_dados[x].total_barras_m1 = null;
        }

        if (this.tabela_dados[parseInt(x)].semana_producao == this.tabela_dados[parseInt(x) + 1].semana_producao) {
          this.tabela_dados[x].semana_producao = null;
          this.tabela_dados[x].barras_mes_1 = null;
          this.tabela_dados[x].barras_mes_2 = null;
          this.tabela_dados[x].total_barras = null;
        }
      } else if (parseInt(x) > 2 && this.tabela_dados[parseInt(x)].semana_producao_planeada == this.tabela_dados[parseInt(x) - 1].semana_producao_planeada) {
        this.tabela_dados[x].semana_producao_planeada = null;
        this.tabela_dados[x].barras_mes_m1_1 = null;
        this.tabela_dados[x].barras_mes_m1_2 = null;
        this.tabela_dados[x].total_barras_m1 = null;
      }

    }
  }

  carregagraficos(labelgraf, datasetsgraf) {
    this.data_graf = {
      labels: labelgraf,
      datasets: datasetsgraf
    };

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              var decimalCount = 2, decimal = ",", thousands = ".";
              var amount = value;
              decimalCount = Math.abs(decimalCount);
              decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
              const negativeSign = amount < 0 ? "-" : "";
              let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
              let j = (i.length > 3) ? i.length % 3 : 0;
              var val = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

              return val + ' €';
            }
          }
        }]
      }, legend: {
        labels: {
          fontColor: "black"
        },
        onClick: function (event, elem) {
          let index = elem.datasetIndex;

          var ci = this.chart;
          var alreadyHidden =
            ci.getDatasetMeta(index).hidden === null ? false : ci.getDatasetMeta(index).hidden;
          if (elem.text == 'Todos') {
            var encontrou = !alreadyHidden;
            ci.data.datasets.forEach(function (e, i) {
              var meta = ci.getDatasetMeta(i);

              if (encontrou) {
                meta.hidden = true;
              } else {
                meta.hidden = null;
              }
            });
          } else {
            ci.getDatasetMeta(index).hidden = !ci.getDatasetMeta(index).hidden;
          }
          ci.update();
        },
      }, tooltips: {
        custom: function (tooltip) {
          if (!tooltip) return;
          tooltip.displayColors = false;
        },
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
              label += ': ';
            }

            var decimalCount = 2, decimal = ",", thousands = ".";
            var amount = tooltipItem.yLabel;
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            var val = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

            label += val + ' €';
            return label;
          }
        },
      },
    }
  }

  listarmeses() {
    this.meses_objetivo = []
    var month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.FINDICOBJETIVOSService.getAll2().subscribe(
      response => {
        for (var x in response) {
          this.meses_objetivo.push({
            value: {
              value: response[x][0],
              dias_uteis: response[x][3],
              dias_decorridos: response[x][7],
              faturacao_M_1: response[x][6],
              objetivo_DIARIO: response[x][4],
              objetivo_FATURACAO: response[x][5],
              data: response[x][2] + '-' + response[x][1] + '-1',
              mes_mais_1: (response[x][1] == 12) ? month[0] : month[response[x][1]],
              mes_mais_2: (response[x][1] == 12) ? month[1] : ((response[x][1] == 11) ? month[0] : month[response[x][1] + 1]),
              mes_menos_1: (response[x][1] == 1) ? month[11] : month[response[x][1] - 2],
              mes: month[response[x][1] - 1]
            },
            label: month[response[x][1] - 1] + '/' + response[x][2],
          });
        }
        var dd = new Date();

        var index = this.meses_objetivo.findIndex(item => item.value.data == dd.getFullYear() + '-' + (dd.getMonth() + 1) + '-1')
        this.mes_ano = this.meses_objetivo[index].value;

        this.meses_objetivo = this.meses_objetivo.slice();

        this.getdadostabela(this.meses_objetivo[index]);
      },
      error => console.log(error));
  }

  //criar cores 
  getRandomColor(i) {
    var colors = ["olive", "#4caf50", "#f44336", "#faf448", "#ff9800", "#9c27b0", "#2d353c", "#0275d8", "pink", "#B22222", "#4682B4", "#708090", "#A0522D", "#800080", "#6B8E23", "#66CDAA", "#ADFF2F"];
    var n = i % colors.length
    return colors[n];
  }

  //formatar a data para yyyy-mm-dd
  formatDate2(date, tipo = null) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Fev";
    month[2] = "Mar";
    month[3] = "Abr";
    month[4] = "Mai";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Ago";
    month[8] = "Set";
    month[9] = "Out";
    month[10] = "Nov";
    month[11] = "Dez";

    var d = new Date(date),
      mes = month[d.getMonth()],
      ano = '' + d.getFullYear(),
      day = '' + d.getDate();

    if (day.length < 2) day = '0' + day;
    if (tipo == null || tipo == 'semanal') {
      return [day, mes].join('-');
    } else {
      return [mes, ano].join('/');
    }
  }


  async download() {
    this.email_para = "";
    this.assunto = "";
    this.mensagem = "";

    this.loading = true;
    this.srcelement = null;
    var doc = new jsPDF('l', 'pt', 'a4');

    if (document.getElementById('tab1_1')) document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));
    //if (document.getElementById('tab2_1')) document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

    doc.setFontSize(10);
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 425, 20, null, null, "center");

    doc.setFont('times')

    doc.text("Pág. 1/2", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    var img_logo = new Image()
    img_logo.src = 'assets/img/logo_doureca.png'
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17, '', 'FAST');

    var tab1 = document.getElementById('tab1');
    var printer_1 = document.getElementById('printer_1');
    var g = tab1.cloneNode(true);
    printer_1.appendChild(g);

    printer_1.children[0].setAttribute("id", "tab1_1");
    document.getElementById('tab1_1').style.position = "absolute";
    document.getElementById('tab1_1').classList.add("active")
    document.getElementById('tab1_1').classList.add("in")

    //tab1.style.position = "absolute";
    const options = {
      logging: false
    };


    await html2canvas(document.getElementById('tab1_1'), options).then(function (canvas) {

      var img = canvas.toDataURL("image/png");
      const bufferX = 5;
      const bufferY = 40;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, '', 'FAST');

      document.getElementById('printer_1').removeChild(document.getElementById('tab1_1'));

      // doc.save('test.pdf');
      //fails to add image to pdf
    });


    doc.addPage();
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text("DOURECA - Sistema de Gestão Integrado de Informação da Doureca", 425, 20, null, null, "center");
    doc.addImage(img_logo, 'PNG', 10, 5, 80, 17, '', 'FAST');
    doc.setFont('times')

    doc.text("Pág. 2/2", 800, 580, null, null, "right");
    doc.text(this.formatDate(new Date), 40, 580);

    await html2canvas(document.getElementById('tab2_1'), options).then(function (canvas) {
      //document.getElementById('printer_2').removeChild(document.getElementById('tab2_1'));

      var imgs = canvas.toDataURL("image/png");
      const bufferXs = 5;
      const bufferYs = 40;
      const imgProps = (<any>doc).getImageProperties(imgs);
      const pdfWidths = doc.internal.pageSize.getWidth() - 2 * bufferXs;
      const pdfHeights = (imgProps.height * pdfWidths) / imgProps.width;
      doc.addImage(imgs, 'PNG', bufferXs, bufferYs, pdfWidths, pdfHeights, undefined, 'FAST');
      //doc.save('test.pdf');
    });

    this.display = true;
    var srcelement = doc.output('bloburl');
    this.doc_blob = doc.output('blob');
    this.srcelement = this.sanitizer.bypassSecurityTrustResourceUrl(srcelement);
    this.loading = false;


  }


  enviar_email() {
    this.bt_disable = true;
    var nome_FICHEIRO = new Date().getTime().toString();

    var file = new File([this.doc_blob], nome_FICHEIRO + '.pdf', { type: "application/pdf", lastModified: new Date().getTime() })
    this.UploadService.uploadFilePDF(file, nome_FICHEIRO).subscribe(result => {
      var email = new EMAIL();
      email.assunto = this.assunto;
      email.mensagem = this.mensagem;
      email.para = this.email_para;
      email.nome_FICHEIRO = nome_FICHEIRO;
      this.EmailService.enviarEmail(email).subscribe(result => {
        this.display_envia = false;
        this.display = true;
        this.bt_disable = false;
      },
        error => { console.log(error); this.bt_disable = false; });
    },
      error => { console.log(error); this.bt_disable = false; });
  }


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  abriranalise_encomendas(semana, ano) {
    this.router.navigate(['analiseencomendas'], { queryParams: { semana: semana.replace('Week ', ''), ano: new Date(ano).getFullYear(), redirect: "seguimento_faturacao" } });
  }
}



