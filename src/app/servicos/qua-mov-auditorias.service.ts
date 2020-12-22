import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { QUA_MOV_AUDITORIAS } from 'app/entidades/QUA_MOV_AUDITORIAS';

@Injectable()
export class QUAMOVAUDITORIASService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: QUA_MOV_AUDITORIAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createQUA_MOV_AUDITORIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<QUA_MOV_AUDITORIAS[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_MOV_AUDITORIAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<QUA_MOV_AUDITORIAS[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_MOV_AUDITORIASbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByANO(ano): Observable<QUA_MOV_AUDITORIAS[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_MOV_AUDITORIASbyano/' + ano;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteQUA_MOV_AUDITORIAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: QUA_MOV_AUDITORIAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateQUA_MOV_AUDITORIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
