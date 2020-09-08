import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_REVISOES_PRIORITARIAS } from 'app/entidades/PR_REVISOES_PRIORITARIAS';

@Injectable()
export class PRREVISOESPRIORITARIASService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_REVISOES_PRIORITARIAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_REVISOES_PRIORITARIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_REVISOES_PRIORITARIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_REVISOES_PRIORITARIAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_REVISOES_PRIORITARIAS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_REVISOES_PRIORITARIASbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_REVISOES_PRIORITARIAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_REVISOES_PRIORITARIAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_REVISOES_PRIORITARIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}