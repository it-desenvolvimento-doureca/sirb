import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_DEPARTAMENTOS_SECTORES } from 'app/entidades/GER_DEPARTAMENTOS_SECTORES';

@Injectable()
export class GERDEPARTAMENTOSSECTORESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_DEPARTAMENTOS_SECTORES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_DEPARTAMENTOS_SECTORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_DEPARTAMENTOS_SECTORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTOS_SECTORES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyid(id): Observable<GER_DEPARTAMENTOS_SECTORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTOS_SECTORESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyiddepartamento(id_sector): Observable<GER_DEPARTAMENTOS_SECTORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTOS_SECTORESbyidDEPARTAMENTO/' + id_sector;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyidnotdepartamento(id_sector): Observable<GER_DEPARTAMENTOS_SECTORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DEPARTAMENTOS_SECTORESbyidNOTDEPARTAMENTO/' + id_sector;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_DEPARTAMENTOS_SECTORES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_DEPARTAMENTOS_SECTORES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_DEPARTAMENTOS_SECTORES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}