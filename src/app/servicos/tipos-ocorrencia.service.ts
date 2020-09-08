import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { TIPOS_OCORRENCIA } from 'app/entidades/TIPOS_OCORRENCIA';

@Injectable()
export class TIPOSOCORRENCIAService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: TIPOS_OCORRENCIA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createTIPOS_OCORRENCIA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<TIPOS_OCORRENCIA[]> {
    const url = webUrl.host + '/rest/sirb/getTIPOS_OCORRENCIAbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<TIPOS_OCORRENCIA[]> {
    const url = webUrl.host + '/rest/sirb/getTIPOS_OCORRENCIA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteTIPOS_OCORRENCIA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: TIPOS_OCORRENCIA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateTIPOS_OCORRENCIA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  verificaOF(of) {
    const url = webUrl.host + '/rest/sirb/verificaOF/' + of;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verificaREF(ref) {
    const url = webUrl.host + '/rest/sirb/verificaREF/' + ref;
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