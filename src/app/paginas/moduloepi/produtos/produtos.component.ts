import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderList } from 'primeng/primeng';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  url = null;
  url2 = "data:image/png;base64,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";

  selectedValues = ['1'];
  riscos = [{ id: 1, label: "Risco 1" }, { id: 2, label: "Risco 2" }, { id: 3, label: "Risco 4" }, { id: 5, label: "Risco 5" }, { id: 6, label: "Risco 6" }, { id: 7, label: "Risco 7" }]

  cars = [{ id: 1, label: "teste 1" }, { id: 2, label: "fdfsfsdfsd 2" }, { id: 3, label: "adsad 3" }];
  nome = "";
  id = "";
  stock = "";
  modoedicao = false;

  @ViewChild(OrderList) orderList: OrderList;
  constructor() { }

  ngOnInit() {
    this.showReport();
  }

  showReport() {
    // Report's Secured Token
    let accessToken = 'H4sIAAAAAAAEAB1Wxw7sSA77l3f1AM5pgDk4Z7sd2unmnHP2Yv99e-dcKkAiRYr_-fNJnn5K8j9__yH9roiTF1yggjwXKe9UypIhKt1jsFiinp-e4EXGnYW_-rL6V6zZiHgsDCsAWCTnZnh8x9J4WRdbMz8imwfTgcXUXn8wp5HUaHtpCvjeYBwOXijuIHrHKLzqzihgCdii0Fjq8CFheOxBAFvYPfeTtGzMnoYsEAGwbl-0Ct7aMGpZejCiPWC_-SoGisSmobgLPSQyA6CFrRQ-K3LrYUqjra3ORGDnvbiDdJmjN7pfmLe_U9jIb2LqyttJ5CxcrpjN7HkS2ky2xQselFCgs-ua2-BWcxqx7qIWylv1jvdJTNo9jWHA2hL2UvHwQLyglU4zJ3rIC3WVFRGfunAZMKZFYcLVU_WWZfZN2s5-8_vTganQgKZUpTNTGh9JwrXkCpHeveIozpZHJMF16PBfJ3QZdpJFKH2mz4HAolNtqALMotB72k1n2YfD6nrkltbZiv0tNNvK9sMg-3Jre28xEjRl9MJTsEL52GMAqTdgwOgndaarKJorO15OHtWx3fHrZrHZiILt1nvMig_pldZqrf3Qalbq6xE817NgVIRMp6cfazzSfTmfVe7GYrpXqZjalCPLmEfdOWI_CZzzLkK5kVfvhE70J45MxYCEuXvnldtT6FoewuaE3PGQR_I9lfUWNW0HWC_OkRnC3ayLQW1Afz-Qi8if2xyY45SjK0xZbptunh7u5pXZ6HtjVF5K-bML6xiOLdJtxrIi3ofEja02EESDNyRJiTzpzkNIr29caD9Itftiv1xOLP1HZg9jBP0KRPdHD-2psjPwArFcoB0YbRIKID29y85RNXXOUR7y7ax2ag7R6CMRHQLImLjs9ts5RbwMdgf8PA8NT-Mr-BSLOjjEEKxOf5RBd9rPNaCFHFJo2SEsSMuoLqqLIE5cbmBF131aSV-cEm08bP_sfDyHjdA3jSpeCIm1TAtBZVJTxp5-64OCLTKEqzC3zwKr_azgbiknbpGrzotRkHIoDZsrDvNA22wmHiArTOuUFU3SJGP1fExKq0Xtc9G71l3uRG6LDTdqeRO0Fazqrz6IlT7aGvPcxJPi0Op9zAwj-ylNe3_3SmJAj3ZaWUq8Ex8k03t_mUJx2755NNa-iHtyEYSE9fbTTueh6i3NOXT4mYRsNWDR1aJw-A2OcPv84YBYEpESL0QCT5sYbCE1Y9pc16GXxH16ic8bN_iPeH_kLxKziNJytpJOku3jfhSe9pX9ZNewWyHnBEHLSxzhXb3DB9nYqY_UnSJYEJA0K6f264C91kLChHyxn2iCDmfdykBxcNT1IdpbFo7LcrhxovKGLMF9PY6qinIfDBPHrHU7X9jWkxxgg_oa7EByFEMpycB88eU0Z-VQVS0xN7iBRCm3jrcVQISeVmkQLZ4rYT2I0xNLzcbIQC6GyQmhzDGtuK2ZbgVANlTV6CFc8HbmPj__CoDjo5xDhrSkxcgSGROxtg2ePD1WAT-DLQE6E1MP_9WIDFAyAp-qWZCIzcn5uXhEBQXmPnRCkzlP7G4lDnJiIUcgvLvbbPLaQ28I7i0DC6DPcSQddfuUfY2Ztgtn2EclBqfTDOtCHq-YRckvHDAxe7IVCmttsnWok4xSInF2-gfbtHEpAL0XrJ07IMSuFEy4y06S5w98OCBlTSYB3jbDaA_k9uoHSuAwESvNQ8XjdVGQGeqoijuaq4sEj1mmS8SruS3N3fLDJOvTKhinkuV-7O_gmJxOodqufodbZO2BsgVmm127aAvVIXm29RketOSIENOctoITWURKce_DFB-WjLHIUsWeH6IN_QxR6P_eEBONwLWnFOxy7FQJsd48qDLJkImGMdty2BsD2cpDrjSja0PElA--LewYwZXktclc3Y5H0_rIZGXNjmzI2qcdYC4xpI3GTUx2Xb5g6Rf_VhBGjzM39epJnKv9YuJyCOBjvTNpjlDFt6Fik6ujhlcoFslMdaJ4nIwX1UwoFGZZZj4dBuonbUaGAOpDIeiy_5mFUIkuCidlyHMIJUVO9LqwDvRYKShTueMKAbrI4mM_QujUNMXLxqI-ZzgbpkUgsoAugazDbygZjeQJcRM2uTxhlchyb6X4aktBu7zSd25tnJRw6GCoEQo-AcUj_uyAWBCcb8TfCmKtHeoWj-_lMGylsdQwkkqQD1WifLVyCdkGB_i2JD2CuG9gbJ-QmpCDPCWgLxQecju0hLDclKIcNvCNJXAB9d_u8rNMv4GcQIz4yuJpQgdQ615gGDDTwkVN_LRq3HDr036bE-yCklkobxiQHMAFkqvXmb984j2La_Qw9vSBsNTGwXYDcNE0aaKLFjH7AStGWKaJZuU-08vB_CRUN-7hdifpepTboGPzUp5BuCBnW0qagpw6XNEOgVZ6igLsz0vvnEG94MG1OFWt5b3HdK7i32awMX4ylc5cLGV48sOzkDqrz35eICXKS_bTmVw3DudMBsHsycMQl_mAQP1hh-YWbKyl9qIrThG3z2shNHbGhbN1v28-Sb-TWWk31ipxuylYbKLN0FANZihivbtccsGO46lRPGKo6lfiBNEBcjCwtt1uKigIKB0vlIwPw3fxehHy_bpLgfspBXevisQlz06ioKCynf3GvwVfcyw9cBOo9E18nmJ1ZLr7meBBkuRJUwOtAcsmoQGsPsHQ2GNpzuDrBJUOYb5vOl9X0ZceltWPUyyBWI29lpBDN8MV9qBf4Z8_f_3h1mfeJ614ftFz8AqRT2QsWYEGpCRi910x2QgcHi9CR4UkcJHbHu1QpenS0ZQ1IgJRlOva6MiPQeqg7yYNhyNzEjcw6kWLhwPdUL3bsli8s8JwEDzQyZ9gtLTe-EBBvfAaNaJTJEZbVsO0l21jh34mKOWpvJ9l7Sub_RUrzy9UcGHHhiMXX0mlm4bzuxfi-eRi65RE5mzTMng_F7X99wSfMo8aN4kR6zY4el0h6Z2sU6drjq25bAeAiVYqEbnI_vaPySOMqKFYEnXI5J4H-MrtHgedYROHoOH4nZOpxkU6DQCi2k6KBvimIvGYX8V_pP5h4UPEra8v6RPr2JceKgOqpQ-M-vn8pdavMMHXP__C_Mx1sSr-_wM-h6MJv_d2YUF0X1QHWDGD_W-V21Rjsh9r8Ssrjl7wIFYStuCnsdtoeGk_6iRsB_1RfVLIfbvBL8009GOvEivS8n0EpThJt3Y48163U5RNpKKrgVchjAPhhQ9RE6yk5nUHh6VC-tr4E3N1P43xpURbxUyphj_xj1kwLzeI8Pj7eWibkzVo6brAGg7EpFN8FQxJeQVWAblLhjAAMa1ICrVgvsxKNqDYY1csM7qt5j-n8Ez8U8cqBlb7Mtdv8EhVxkG97HwAr0bduld9dT4PQCgpJ0Ing_k-_S-3VSOWEUd1-VOmFAAepk6R9caPZncFFGBwVZNdZ76cQxj8UbRqaLgFJkzr9gPUlcgtWCW5r9aSDg3KXXEd5xYiM_ADlvnB_N__AfSsQgZuDQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUUtUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=';

    // Embed URL
    let embedUrl = 'https://app.powerbi.com/reportEmbed';

    // Report ID
    let embedReportId = 'ad83fa8f-b05d-4240-8b38-a064860bbba1';

    // Configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    let config = {
      type: 'report',
      accessToken: accessToken,
      tokenType: pbi.models.TokenType.Embed,
      embedUrl: embedUrl,
      id: embedReportId,
      permissions: pbi.models.Permissions.All,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        localeSettings: {
          language: "en-GB",
          formatLocale: "pt-PT"
        }

      }
    };

    // Grab the reference to the div HTML element that will host the report.
    let reportContainer = <HTMLElement>document.getElementById('reportContainer');

    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    let report = powerbi.embed(reportContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function () {
      console.log("Loaded");
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onReorder(event) {
    console.log(this.orderList.value)
  }

  backview() {

  }

  gravar() {

  }
}
