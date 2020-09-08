import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_VISTAS } from 'app/entidades/GER_VISTAS';

@Injectable()
export class GERVISTASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_VISTAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_VISTAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_VISTAS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_VISTAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<GER_VISTAS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_VISTASbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  
  getbyid_pagina(id): Observable<GER_VISTAS[]> {
    const url = webUrl.host + '/rest/sirb/getbyid_pagina/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }  

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_VISTAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_VISTAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_VISTAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
