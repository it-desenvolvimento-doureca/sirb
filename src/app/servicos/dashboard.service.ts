import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';

@Injectable()
export class DashboardService {
  host = location.protocol + '//' + location.host.replace('4200', '8080') + '/dashboard/rest/rest';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) {
    this.host = webUrl.host.replace('sgiid', 'dashboard/rest/rest');
  }

  getDASHBOARD_PR_BARRAS_ALERTA(data) {
    const url = this.host + '/getDASHBOARD_PR_BARRAS_ALERTA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getDASHBOARD_BARRAS_DO_DIA_SAOBENTO(data) {
    const url = this.host + '/getDASHBOARD_BARRAS_DO_DIA_SAOBENTO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_PR_REVISOES_PRIORITARIAS(data) {
    const url = this.host + '/getDASHBOARD_PR_REVISOES_PRIORITARIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_PR_PRODUCOES_PRIORITARIAS(data) {
    const url = this.host + '/getDASHBOARD_PR_PRODUCOES_PRIORITARIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
