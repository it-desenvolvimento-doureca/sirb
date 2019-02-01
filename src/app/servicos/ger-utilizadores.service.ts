import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_UTILIZADORES } from "app/entidades/GER_UTILIZADORES";


@Injectable()
export class GERUTILIZADORESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_UTILIZADORES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_UTILIZADORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllfromsilver() {
    const url = webUrl.host + '/rest/sirb/getusers';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyLogin(login): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESbylogin/' + login + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getGER_UTILIZADORESLDAP() {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESLDAP';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyLogincode(code_user): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESbycode_user/' + code_user + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyLoginLDAP(code_user): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESbyLDAP/' + code_user + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verifica_login(id, login): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESverifica_login/' + id + '/' + login;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verifica_code(id, code): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESverifica_code/' + id + '/' + code;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  
  verifica_LDAP(id, code): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESverifica_LDAP/' + id + '/' + code;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_UTILIZADORESbyid_utilizador/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_UTILIZADORES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_UTILIZADORES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_UTILIZADORES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}