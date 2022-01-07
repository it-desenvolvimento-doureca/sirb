import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-businessanalytics',
  templateUrl: './businessanalytics.component.html',
  styleUrls: ['./businessanalytics.component.css']
})
export class BusinessanalyticsComponent implements OnInit {

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
}
