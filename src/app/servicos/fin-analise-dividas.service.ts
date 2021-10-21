import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';

@Injectable()
export class FINANALISEDIVIDASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }



  GET_DIVIDAS_LISTA(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_LISTA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_DIVIDAS_CLIENTES(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_DIVIDAS_FICHA(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_FICHA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_DIVIDAS_LISTA_RESUMO_KAM(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_LISTA_RESUMO_KAM';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_DIVIDAS_LISTA_TOP_15(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_LISTA_TOP_15';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_DIVIDAS_LISTA_TOP_15_DIVIDAS(data) {
    const url = webUrl.host + '/rest/sirb/GET_DIVIDAS_LISTA_TOP_15_DIVIDAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_KAMS() {
    const url = webUrl.host + '/rest/sirb/GET_KAMS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  FIN_EVOLUCAO_CLIENTES(data) {
    const url = webUrl.host + '/rest/sirb/FIN_EVOLUCAO_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  FIN_EVOLUCAO_DOCUMENTOS(data) {
    const url = webUrl.host + '/rest/sirb/FIN_EVOLUCAO_DOCUMENTOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  FIN_EVOLUCAO_KAM(data) {
    const url = webUrl.host + '/rest/sirb/FIN_EVOLUCAO_KAM';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  FIN_EVOLUCAO_GRAFICOS_1() {
    const url = webUrl.host + '/rest/sirb/FIN_EVOLUCAO_GRAFICOS_1';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  FIN_EVOLUCAO_GRAFICOS_2() {
    const url = webUrl.host + '/rest/sirb/FIN_EVOLUCAO_GRAFICOS_2';
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