import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_PLANEAMENTO_PRODUCAO_ANALISES } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_ANALISES';

@Injectable()
export class PRPLANEAMENTOPRODUCAOANALISESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_PLANEAMENTO_PRODUCAO_ANALISES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_PLANEAMENTO_PRODUCAO_ANALISES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_PLANEAMENTO_PRODUCAO_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_ANALISES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<PR_PLANEAMENTO_PRODUCAO_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_ANALISES2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getById(ip): Observable<PR_PLANEAMENTO_PRODUCAO_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_ANALISESbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_PLANEAMENTO_PRODUCAO_ANALISES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_PLANEAMENTO_PRODUCAO_ANALISES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PLANEAMENTO_PRODUCAO_ANALISES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  GET_PLANOS(data) {
    const url = webUrl.host + '/rest/sirb/GET_PLANOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_BARRAS_PRODUZIR(data) {
    const url = webUrl.host + '/rest/sirb/GET_BARRAS_PRODUZIR';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_TIPO_ACABAMENTO_ANALISE(data) {
    const url = webUrl.host + '/rest/sirb/GET_TIPO_ACABAMENTO_ANALISE';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_RACKS_ANALISES(data) {
    const url = webUrl.host + '/rest/sirb/GET_RACKS_ANALISES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_RACKS_REFERENCIAS_ANALISES(data) {
    const url = webUrl.host + '/rest/sirb/GET_RACKS_REFERENCIAS_ANALISES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  GET_RACKS_MONTADOS_ANALISES(data) {
    const url = webUrl.host + '/rest/sirb/GET_RACKS_MONTADOS_ANALISES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_RACKS_MONTADOS_REFERENCIAS_ANALISES(data) {
    const url = webUrl.host + '/rest/sirb/GET_RACKS_MONTADOS_REFERENCIAS_ANALISES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  ATUALIZAR_RECURSOS_HUMANOS(data) {
    const url = webUrl.host + '/rest/sirb/ATUALIZAR_RECURSOS_HUMANOS';
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
