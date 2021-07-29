import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { REU_REUNIOES_FICHEIROS } from 'app/entidades/REU_REUNIOES_FICHEIROS';

@Injectable()
export class REUREUNIOESFICHEIROSService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: REU_REUNIOES_FICHEIROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createREU_REUNIOES_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<REU_REUNIOES_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_FICHEIROSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<REU_REUNIOES_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_FICHEIROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteREU_REUNIOES_FICHEIROS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: REU_REUNIOES_FICHEIROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateREU_REUNIOES_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
