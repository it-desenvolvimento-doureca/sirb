import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_CONF_CONSUMOS_SILVER } from 'app/entidades/GER_CONF_CONSUMOS_SILVER';

@Injectable()
export class GERCONFCONSUMOSSILVERService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_CONF_CONSUMOS_SILVER) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_CONF_CONSUMOS_SILVER', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<GER_CONF_CONSUMOS_SILVER[]> {
    const url = webUrl.host + '/rest/sirb/getGER_CONF_CONSUMOS_SILVERbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_CONF_CONSUMOS_SILVER[]> {
    const url = webUrl.host + '/rest/sirb/getGER_CONF_CONSUMOS_SILVER';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_CONF_CONSUMOS_SILVER/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_CONF_CONSUMOS_SILVER) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_CONF_CONSUMOS_SILVER', JSON.stringify(data), { headers: this.headers })
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