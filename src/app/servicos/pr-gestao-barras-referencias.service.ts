import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_GESTAO_BARRAS_REFERENCIAS } from 'app/entidades/PR_GESTAO_BARRAS_REFERENCIAS';

@Injectable()
export class PRGESTAOBARRASREFERENCIASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_GESTAO_BARRAS_REFERENCIAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_GESTAO_BARRAS_REFERENCIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_GESTAO_BARRAS_REFERENCIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_GESTAO_BARRAS_REFERENCIAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(id): Observable<PR_GESTAO_BARRAS_REFERENCIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_OBJETIVOS_PLANOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_GESTAO_BARRAS_REFERENCIAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_GESTAO_BARRAS_REFERENCIAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_GESTAO_BARRAS_REFERENCIAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}