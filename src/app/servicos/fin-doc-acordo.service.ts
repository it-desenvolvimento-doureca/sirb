import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { FIN_DOC_ACORDO } from 'app/entidades/FIN_DOC_ACORDO';
@Injectable()
export class FINDOCACORDOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: FIN_DOC_ACORDO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createFIN_DOC_ACORDO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<FIN_DOC_ACORDO[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_DOC_ACORDObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<FIN_DOC_ACORDO[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_DOC_ACORDO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteFIN_DOC_ACORDO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: FIN_DOC_ACORDO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateFIN_DOC_ACORDO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
