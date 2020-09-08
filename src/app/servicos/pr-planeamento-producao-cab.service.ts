import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_PLANEAMENTO_PRODUCAO_CAB } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_CAB';

@Injectable()
export class PRPLANEAMENTOPRODUCAOCABService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_PLANEAMENTO_PRODUCAO_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_PLANEAMENTO_PRODUCAO_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_PLANEAMENTO_PRODUCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<PR_PLANEAMENTO_PRODUCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_CAB2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_PLANEAMENTO_PRODUCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_CABbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_PLANEAMENTO_PRODUCAO_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_PLANEAMENTO_PRODUCAO_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PLANEAMENTO_PRODUCAO_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }


  GET_LISTA_MRPS(data) {
    const url = webUrl.host + '/rest/sirb/GET_LISTA_MRPS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_LISTA_MRPS_PARA_PRODUCAO(data) {
    const url = webUrl.host + '/rest/sirb/GET_LISTA_MRPS_PARA_PRODUCAO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_FASES(data) {
    const url = webUrl.host + '/rest/sirb/GET_FASES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_RACKS(data) {
    const url = webUrl.host + '/rest/sirb/GET_RACKS';
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