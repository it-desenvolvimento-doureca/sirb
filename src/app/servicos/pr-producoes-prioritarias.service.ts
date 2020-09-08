import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_PRODUCOES_PRIORITARIAS } from 'app/entidades/PR_PRODUCOES_PRIORITARIAS';

@Injectable()
export class PRPRODUCOESPRIORITARIASService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_PRODUCOES_PRIORITARIAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_PRODUCOES_PRIORITARIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_PRODUCOES_PRIORITARIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PRODUCOES_PRIORITARIAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_PRODUCOES_PRIORITARIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PRODUCOES_PRIORITARIASbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_PRODUCOES_PRIORITARIAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_PRODUCOES_PRIORITARIAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PRODUCOES_PRIORITARIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}