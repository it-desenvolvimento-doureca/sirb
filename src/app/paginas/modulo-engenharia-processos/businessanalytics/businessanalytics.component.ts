import { Component, OnInit } from '@angular/core';
import { BusinessanalyticsService } from 'app/servicos/businessanalytics.service';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-businessanalytics',
  templateUrl: './businessanalytics.component.html',
  styleUrls: ['./businessanalytics.component.css']
})
export class BusinessanalyticsComponent implements OnInit {

  constructor(private BusinessanalyticsService: BusinessanalyticsService) { }

  ngOnInit() {
   

    this.BusinessanalyticsService.getembedUrl().subscribe(
      response => {
        console.log(response)
        var accessToken = response.accessToken, embedUrl = response.embedUrl,embedReportId = response.report_id ;
        this.showReport(accessToken, embedUrl,embedReportId);
      }, error => {

      });

  }

  showReport(accessToken, embedUrl,embedReportId) {
    // Report's Secured Token


    // Embed URL
    //let embedUrl = 'https://app.powerbi.com/reportEmbed';

    // Report ID
   // let embedReportId = '7b627422-2451-4ee5-9ecd-0c0aa4b39f12';

    // Configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    let config = {
      type: 'report',
      accessToken: accessToken,
     // tokenType: pbi.models.TokenType.Embed,
      embedUrl: embedUrl,
      id: embedReportId,
      //permissions: pbi.models.Permissions.All,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        localeSettings: {
          language: "pt-PT",
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
