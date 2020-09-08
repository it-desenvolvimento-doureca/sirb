import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';

@Injectable()
export class PEDIDOSPRODUCAOService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }


  getPedidosProducao(data) {
    const url = webUrl.host + '/rest/sirb/getPedidosProducao';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getRejeicoesRefe(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesRefe';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getanalise_rejeicoes(data) {
    const url = webUrl.host + '/rest/sirb/getanalise_rejeicoes';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesFam_defeitos(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesFam_defeitos';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getanalise_LOTES_LOTE(data) {
    const url = webUrl.host + '/rest/sirb/getanalise_LOTES_LOTE';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getanalise_LOTES_DEFEITOS(data) {
    const url = webUrl.host + '/rest/sirb/getanalise_LOTES_DEFEITOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoes_defeitos(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesdefeitos';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoes_defeitoslote(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesLotelista';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesLinha(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesLinha';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getEvolucaoDefeitoRef(data) {
    const url = webUrl.host + '/rest/sirb/getEvolucaoDefeitoRef';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesReferencia(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesReferencia';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesLote(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesLote';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  /***************** REJEICOES FUNCIONÁRIO */

  getRejeicoesFUNCREF(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesRefeFUNC';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesFUNC(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesFUNC';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesFUNCFAM(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesFUNCFAM';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getRejeicoesFUNCDEF(data) {
    const url = webUrl.host + '/rest/sirb/getRejeicoesFUNCDEF';
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
