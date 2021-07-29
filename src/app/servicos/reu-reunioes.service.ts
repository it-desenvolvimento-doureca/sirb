import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { REU_REUNIOES } from 'app/entidades/REU_REUNIOES';

@Injectable()
export class REUREUNIOESService {


  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: REU_REUNIOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createREU_REUNIOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<REU_REUNIOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<REU_REUNIOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteREU_REUNIOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: REU_REUNIOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateREU_REUNIOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
