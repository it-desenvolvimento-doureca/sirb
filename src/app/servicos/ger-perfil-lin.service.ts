import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_PERFIL_LIN } from "app/entidades/GER_PERFIL_LIN";

@Injectable()
export class GERPERFILLINService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_PERFIL_LIN) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_PERFIL_LIN', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_PERFIL_LIN[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_LIN';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<GER_PERFIL_LIN[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_LINbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID_node(id, node): Observable<GER_PERFIL_LIN[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PERFIL_LINbyid_node/' + id + '/' + node;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  createGER_UTILIZADOREStesteLDAP(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_UTILIZADOREStesteLDAP', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_PERFIL_LIN/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_PERFIL_LIN) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_PERFIL_LIN', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}