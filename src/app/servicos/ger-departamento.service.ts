import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_DEPARTAMENTO } from '../entidades/GER_DEPARTAMENTO';

@Injectable()
export class GERDEPARTAMENTOService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_DEPARTAMENTO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_DEPARTAMENTO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_DEPARTAMENTO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<GER_DEPARTAMENTO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTO2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByIp(ip): Observable<GER_DEPARTAMENTO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTObyip/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_DEPARTAMENTO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_DEPARTAMENTO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_DEPARTAMENTO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}