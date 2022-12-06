import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_CONF_CONSUMOS_SILVER_OF } from 'app/entidades/GER_CONF_CONSUMOS_SILVER_OF';

@Injectable()
export class GERCONFCONSUMOSSILVEROFService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_CONF_CONSUMOS_SILVER_OF) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_CONF_CONSUMOS_SILVER_OF', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<GER_CONF_CONSUMOS_SILVER_OF[]> {
    const url = webUrl.host + '/rest/sirb/getGER_CONF_CONSUMOS_SILVER_OFbyidconf/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_CONF_CONSUMOS_SILVER_OF[]> {
    const url = webUrl.host + '/rest/sirb/getGER_CONF_CONSUMOS_SILVER_OF';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_CONF_CONSUMOS_SILVER_OF/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_CONF_CONSUMOS_SILVER_OF) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_CONF_CONSUMOS_SILVER_OF', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}