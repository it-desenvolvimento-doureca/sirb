import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_AMOSTRAS_CAB } from 'app/entidades/PR_AMOSTRAS_CAB';

@Injectable()
export class PRAMOSTRASCABService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_AMOSTRAS_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_AMOSTRAS_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_AMOSTRAS_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPR_AMOSTRAS_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PR_AMOSTRAS_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPR_AMOSTRAS_CABbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verificaOFNUM(ofnum) {
    const url = webUrl.host + '/rest/sirb/verificaOFNUM/' + ofnum;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_AMOSTRAS_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_AMOSTRAS_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_AMOSTRAS_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updatePR_AMOSTRAS_CAB_EVENTOS(id, utilizador): Observable<PR_AMOSTRAS_CAB[]> {
    const url = webUrl.host + '/rest/sirb/updatePR_AMOSTRAS_CAB_EVENTOS/' + id + '/' + utilizador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}