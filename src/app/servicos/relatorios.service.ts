import { Injectable } from '@angular/core';
import { webUrl } from 'assets/config/webUrl';
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Http, Headers, ResponseContentType } from '@angular/http';;

@Injectable()
export class RelatoriosService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  downloadPDF(format, filename, id, relatorio, subPasta = "nenhuma"): any {
    const url = webUrl.host + '/rest/sirb/get/' + format + '/' + filename + '/' + id + '/' + relatorio + '/' + subPasta;
    return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        if (format == "pdf") {
          return new Blob([res.blob()], { type: 'application/pdf' });
        } else if (format == "xlsx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else if (format == "docx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

      });
  }


  downloadPDFPOST(format, filename, id, relatorio, subPasta, data): any {
    const url = webUrl.host + '/rest/sirb/getFILEPOST/' + format + '/' + filename + '/' + id + '/' + relatorio + '/' + subPasta;
    return this.http.post(url, JSON.stringify(data), { headers: this.headers, responseType: ResponseContentType.Blob }).map(
      (res) => {
        if (format == "pdf") {
          return new Blob([res.blob()], { type: 'application/pdf' });
        } else if (format == "xlsx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else if (format == "docx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

      });
  }

  downloadPDF2(format, filename, data, relatorio, subPasta): any {
    const url = webUrl.host + '/rest/sirb/getFileJSON/' + format + '/' + filename + '/' + relatorio + '/' + subPasta;
    return this.http.post(url, JSON.stringify(data), { headers: this.headers, responseType: ResponseContentType.Blob }).map(
      (res) => {
        if (format == "pdf") {
          return new Blob([res.blob()], { type: 'application/pdf' });
        } else if (format == "xlsx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else if (format == "docx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

      });
  }



  downloadFINANCEIRA(format, filename, data, relatorio): any {
    const url = webUrl.host + '/rest/sirb/get_file_dividias/' + format + '/' + filename + '/' + relatorio;
    return this.http.post(url, JSON.stringify(data), { headers: this.headers, responseType: ResponseContentType.Blob }).map(
      (res) => {
        if (format == "pdf") {
          return new Blob([res.blob()], { type: 'application/pdf' });
        } else if (format == "xlsx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else if (format == "docx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

      });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
