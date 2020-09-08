import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_LOCAIS } from '../entidades/GER_LOCAIS';

@Injectable()
export class GERLOCAISService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_LOCAIS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_LOCAIS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_LOCAIS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_LOCAIS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<GER_LOCAIS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_LOCAIS2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByIp(ip): Observable<GER_LOCAIS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_LOCAISbyip/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_LOCAIS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_LOCAIS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_LOCAIS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}