import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GT_DIC_TIPO_ACAO } from 'app/entidades/GT_DIC_TIPO_ACAO';

@Injectable()
export class GTDICTIPOACAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GT_DIC_TIPO_ACAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGT_DIC_TIPO_ACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GT_DIC_TIPO_ACAO[]> {
    const url = webUrl.host + '/rest/sirb/getGT_DIC_TIPO_ACAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(id): Observable<GT_DIC_TIPO_ACAO[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_OBJETIVOS_PLANOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGT_DIC_TIPO_ACAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GT_DIC_TIPO_ACAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGT_DIC_TIPO_ACAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}