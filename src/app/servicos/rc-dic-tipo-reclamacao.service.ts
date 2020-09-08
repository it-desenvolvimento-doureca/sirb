import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_DIC_TIPO_RECLAMACAO } from '../entidades/RC_DIC_TIPO_RECLAMACAO';

@Injectable()
export class RCDICTIPORECLAMACAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RC_DIC_TIPO_RECLAMACAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_DIC_TIPO_RECLAMACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<RC_DIC_TIPO_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_TIPO_RECLAMACAObyid_zona/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_DIC_TIPO_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_TIPO_RECLAMACAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_DIC_TIPO_RECLAMACAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_DIC_TIPO_RECLAMACAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_DIC_TIPO_RECLAMACAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}