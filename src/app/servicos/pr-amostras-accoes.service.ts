import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_AMOSTRAS_ACCOES } from 'app/entidades/PR_AMOSTRAS_ACCOES';

@Injectable()
export class PRAMOSTRASACCOESService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_AMOSTRAS_ACCOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_AMOSTRAS_ACCOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_AMOSTRAS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getPR_AMOSTRAS_ACCOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_AMOSTRAS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getPR_AMOSTRAS_ACCOESbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_AMOSTRAS_ACCOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_AMOSTRAS_ACCOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_AMOSTRAS_ACCOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}