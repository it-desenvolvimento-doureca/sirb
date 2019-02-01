import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_PERFIL_CAB } from "app/entidades/GER_PERFIL_CAB";

@Injectable()
export class GERPERFILCABService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_PERFIL_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_PERFIL_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_PERFIL_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyid(id, modulo): Observable<GER_PERFIL_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_CABbyid/' + id + '/' + modulo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbymodulo(modulo): Observable<GER_PERFIL_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_CABbymodulo/' + modulo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_PERFIL_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_PERFIL_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_PERFIL_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}