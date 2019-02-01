import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_DIC_REJEICAO } from '../entidades/RC_DIC_REJEICAO';

@Injectable()
export class RCDICREJEICAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RC_DIC_REJEICAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_DIC_REJEICAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<RC_DIC_REJEICAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_REJEICAObyid_zona/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_DIC_REJEICAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_DIC_REJEICAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_DIC_REJEICAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_DIC_REJEICAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_DIC_REJEICAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}