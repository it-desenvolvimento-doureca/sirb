import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { QUA_DERROGACOES } from 'app/entidades/QUA_DERROGACOES';

@Injectable()
export class QUADERROGACOESService {

  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: QUA_DERROGACOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createQUA_DERROGACOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<QUA_DERROGACOES[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DERROGACOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<QUA_DERROGACOES[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DERROGACOESbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteQUA_DERROGACOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: QUA_DERROGACOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateQUA_DERROGACOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
