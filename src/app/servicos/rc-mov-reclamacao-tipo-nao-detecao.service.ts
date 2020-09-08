import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_DIC_TIPO_NAO_DETECAO } from 'app/entidades/RC_DIC_TIPO_NAO_DETECAO';

@Injectable()
export class RCMOVRECLAMACAOTIPONAODETECAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RC_DIC_TIPO_NAO_DETECAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_DIC_TIPO_NAO_DETECAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<RC_DIC_TIPO_NAO_DETECAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_TIPO_NAO_DETECAObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_DIC_TIPO_NAO_DETECAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_TIPO_NAO_DETECAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_DIC_TIPO_NAO_DETECAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_DIC_TIPO_NAO_DETECAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_DIC_TIPO_NAO_DETECAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}