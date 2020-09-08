import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { PR_DIC_OBJETIVOS_PLANOS } from 'app/entidades/PR_DIC_OBJETIVOS_PLANOS';

@Injectable()
export class PRDICOBJETIVOSPLANOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_DIC_OBJETIVOS_PLANOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_DIC_OBJETIVOS_PLANOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_DIC_OBJETIVOS_PLANOS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_OBJETIVOS_PLANOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByIp(id): Observable<PR_DIC_OBJETIVOS_PLANOS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_OBJETIVOS_PLANOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_DIC_OBJETIVOS_PLANOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_DIC_OBJETIVOS_PLANOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_DIC_OBJETIVOS_PLANOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}