import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { QUA_DERROGACOES_FICHEIROS } from 'app/entidades/QUA_DERROGACOES_FICHEIROS';

@Injectable()
export class QUADERROGACOESFICHEIROSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: QUA_DERROGACOES_FICHEIROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createQUA_DERROGACOES_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidDERROGACAO(id): Observable<QUA_DERROGACOES_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DERROGACOES_FICHEIROSbyidDERROGACAO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<QUA_DERROGACOES_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DERROGACOES_FICHEIROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteQUA_DERROGACOES_FICHEIROS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: QUA_DERROGACOES_FICHEIROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateQUA_DERROGACOES_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}