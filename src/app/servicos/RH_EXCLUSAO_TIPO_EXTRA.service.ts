import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RH_EXCLUSAO_TIPO_EXTRA } from 'app/entidades/RH_EXCLUSAO_TIPO_EXTRA';

@Injectable()
export class RH_EXCLUSAO_TIPO_EXTRAService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_EXCLUSAO_TIPO_EXTRA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_EXCLUSAO_TIPO_EXTRA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_EXCLUSAO_TIPO_EXTRA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_EXCLUSAO_TIPO_EXTRA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<RH_EXCLUSAO_TIPO_EXTRA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_EXCLUSAO_TIPO_EXTRAbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  getTiposExtra(): Observable<RH_EXCLUSAO_TIPO_EXTRA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_EXCLUSAO_TIPO_EXTRAgetTipos/';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_EXCLUSAO_TIPO_EXTRA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_EXCLUSAO_TIPO_EXTRA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_EXCLUSAO_TIPO_EXTRA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
