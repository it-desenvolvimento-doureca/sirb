import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_EVENTOS_CONF } from 'app/entidades/GER_EVENTOS_CONF';

@Injectable()
export class GEREVENTOSCONFService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_EVENTOS_CONF) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_EVENTOS_CONF', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_EVENTOS_CONF[]> {
    const url = webUrl.host + '/rest/sirb/getGER_EVENTOS_CONF';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<GER_EVENTOS_CONF[]> {
    const url = webUrl.host + '/rest/sirb/getGER_EVENTOS_CONFbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_EVENTOS_CONF/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_EVENTOS_CONF) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_EVENTOS_CONF', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}