import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO } from 'app/entidades/AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO';

@Injectable()
export class ABDICDOSIFICACAOHORARIOSVERIFICACAOService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}