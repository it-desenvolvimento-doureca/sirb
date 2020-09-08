import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AT_ENTREVISTAS } from 'app/entidades/AT';

@Injectable()
export class ATENTREVISTASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AT_ENTREVISTAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAT_ENTREVISTAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<AT_ENTREVISTAS[]> {
    const url = webUrl.host + '/rest/sirb/getAT_ENTREVISTASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AT_ENTREVISTAS[]> {
    const url = webUrl.host + '/rest/sirb/getAT_ENTREVISTAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAT_ENTREVISTAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AT_ENTREVISTAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAT_ENTREVISTAS', JSON.stringify(data), { headers: this.headers })
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