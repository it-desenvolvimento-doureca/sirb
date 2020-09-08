import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_SECCAO } from '../entidades/GER_SECCAO';

@Injectable()
export class GERSECCAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_SECCAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_SECCAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_SECCAO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  getAll2(): Observable<GER_SECCAO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByid(id): Observable<GER_SECCAO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_SECCAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_SECCAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_SECCAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}