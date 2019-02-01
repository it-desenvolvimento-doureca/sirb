import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AD_MOV_REG_PARAM_OPERACAO } from "app/entidades/AD_MOV_REG_PARAM_OPERACAO";

@Injectable()
export class ADMOVREGPARAMOPERACAOService {
 handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AD_MOV_REG_PARAM_OPERACAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_REG_PARAM_OPERACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AD_MOV_REG_PARAM_OPERACAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_REG_PARAM_OPERACAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AD_MOV_REG_PARAM_OPERACAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_REG_PARAM_OPERACAObyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_REG_PARAM_OPERACAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AD_MOV_REG_PARAM_OPERACAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_REG_PARAM_OPERACAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
