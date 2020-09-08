import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_PLANEAMENTO_PRODUCAO_LINHAS } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_LINHAS';

@Injectable()
export class PRPLANEAMENTOPRODUCAOLINHASService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_PLANEAMENTO_PRODUCAO_LINHAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_PLANEAMENTO_PRODUCAO_LINHAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_PLANEAMENTO_PRODUCAO_LINHAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_LINHAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_PLANEAMENTO_PRODUCAO_LINHAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_LINHASbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_PLANEAMENTO_PRODUCAO_LINHAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_PLANEAMENTO_PRODUCAO_LINHAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PLANEAMENTO_PRODUCAO_LINHAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  update_campos(data: PR_PLANEAMENTO_PRODUCAO_LINHAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PLANEAMENTO_PRODUCAO_LINHAS_CAMPOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPR_PLANEAMENTO_PRODUCAO_LINHAS_FILTRO(data) {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_LINHAS_FILTRO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEMANAS_PLANEAMENTO(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEMANAS_PLANEAMENTO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  INSERT_PR_PLANEAMENTO_PRODUCAO_LINHAS(data) {
    const url = webUrl.host + '/rest/sirb/INSERT_PR_PLANEAMENTO_PRODUCAO_LINHAS';
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