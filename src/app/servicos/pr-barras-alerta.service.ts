import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_BARRAS_ALERTA } from 'app/entidades/PR_BARRAS_ALERTA';

@Injectable()
export class PRBARRASALERTAService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_BARRAS_ALERTA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_BARRAS_ALERTA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_BARRAS_ALERTA[]> {
    const url = webUrl.host + '/rest/sirb/getPR_BARRAS_ALERTA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_BARRAS_ALERTA[]> {
    const url = webUrl.host + '/rest/sirb/getPR_BARRAS_ALERTAbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_BARRAS_ALERTA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_BARRAS_ALERTA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_BARRAS_ALERTA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}