import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_UTZ_PERFIL } from "app/entidades/GER_UTZ_PERFIL";

@Injectable()
export class GERUTZPERFILService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_UTZ_PERFIL) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_UTZ_PERFIL', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_UTZ_PERFIL[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTZ_PERFIL';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyid(id): Observable<GER_UTZ_PERFIL[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTZ_PERFILbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_UTZ_PERFIL/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_UTZ_PERFIL) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_UTZ_PERFIL', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}