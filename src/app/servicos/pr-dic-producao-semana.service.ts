import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_DIC_PRODUCAO_SEMANA } from 'app/entidades/PR_DIC_PRODUCAO_SEMANA';

@Injectable()
export class PRDICPRODUCAOSEMANAService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_DIC_PRODUCAO_SEMANA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_DIC_PRODUCAO_SEMANA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_DIC_PRODUCAO_SEMANA[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_PRODUCAO_SEMANA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_DIC_PRODUCAO_SEMANA[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_PRODUCAO_SEMANAbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_DIC_PRODUCAO_SEMANA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_DIC_PRODUCAO_SEMANA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_DIC_PRODUCAO_SEMANA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}