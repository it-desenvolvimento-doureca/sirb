import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_DIC_BANHO } from "app/entidades/AB_DIC_BANHO";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Injectable()
export class ABDICBANHOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private globalVar: AppGlobals) { }

  create(data: AB_DIC_BANHO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_BANHO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_DIC_BANHO[]> {

    const url = webUrl.host + '/rest/sirb/getAB_DIC_BANHO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllLINHA() {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_BANHOLINHA/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllLINHAbylinha(id) {
    const url = webUrl.host + '/rest/sirb/getAllLINHAbylinha/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllLINHAbylinhatodos(id) {
    const url = webUrl.host + '/rest/sirb/getAllLINHAbylinhatodos/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAllLINHAbylinha_tipo(id, tipo) {
    const url = webUrl.host + '/rest/sirb/getAllLINHAbylinha_tipo/' + id + '/0/' + tipo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_DIC_BANHO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_BANHOyid_banho/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_BANHO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_BANHO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_BANHO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}