import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DASHBOARDANALISESService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getDASHBOARD_CUMPRIMENTO_OBJETIVO_VENDAS(data) {
    const url = webUrl.host + '/rest/sirb/getDASHBOARD_CUMPRIMENTO_OBJETIVO_VENDAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_VARIACAO_STOCK(data) {
    const url = webUrl.host + '/rest/sirb/getDASHBOARD_VARIACAO_STOCK';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_PLANEAMENTO_GRAFICOS(data) {
    const url = webUrl.host + '/rest/sirb/getDASHBOARD_PLANEAMENTO_GRAFICOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPA_GET_TOTAIS(data) {
    const url = webUrl.host + '/rest/sirb/getPA_GET_TOTAIS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_RECURSOS_HUMANOS(data) {
    const url = webUrl.host + '/rest/sirb/getDASHBOARD_RECURSOS_HUMANOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_PLANEAMENTO(data) {
    const url = webUrl.host + '/rest/sirb/getDASHBOARD_PLANEAMENTO_2';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDASHBOARD_OCORRENCIAS(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_OCORRENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

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

  getDASHBOARD_ACIDENTES_TRABALHO(data) {
    const url = webUrl.host_dashboard + '/getDASHBOARD_ACIDENTES_TRABALHO';
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
