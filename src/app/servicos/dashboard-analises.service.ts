import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DASHBOARDANALISESService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getDASHBOARD_REJEICOES_AREA2(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_REJEICOES_AREA2';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_RECLAMACOES_CLIENTES(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_RECLAMACOES_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_RECLAMACOES_FORNECEDORES(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_RECLAMACOES_FORNECEDORES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_AMOSTRAS(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_AMOSTRAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_ABSENTISMO_TABELA(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_ABSENTISMO_TABELA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getVisitas(data) {
    const url = webUrl.host_dashboard + '/visitas/' + data;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
