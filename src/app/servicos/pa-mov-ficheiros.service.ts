import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { PA_MOV_FICHEIROS } from 'app/entidades/PA_MOV_FICHEIROS';

@Injectable()
export class PAMOVFICHEIROSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PA_MOV_FICHEIROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPA_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidplano(id): Observable<PA_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_FICHEIROSbyidPLANO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidplano2(id): Observable<PA_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_FICHEIROSbyidPLANO2/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  getPA_MOV_FICHEIROSbyidFICHEIRO(id): Observable<PA_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_FICHEIROSbyidFICHEIRO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PA_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_FICHEIROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePA_MOV_FICHEIROS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PA_MOV_FICHEIROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePA_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
