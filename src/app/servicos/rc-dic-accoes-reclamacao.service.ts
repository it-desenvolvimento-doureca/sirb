import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GT_DIC_TAREFAS } from '../entidades/GT_DIC_TAREFAS';

@Injectable()
export class RCDICACCOESRECLAMACAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GT_DIC_TAREFAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGT_DIC_TAREFAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GT_DIC_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_DIC_TAREFASbyid_zona/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GT_DIC_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_DIC_TAREFAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGT_DIC_TAREFAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GT_DIC_TAREFAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGT_DIC_TAREFAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}