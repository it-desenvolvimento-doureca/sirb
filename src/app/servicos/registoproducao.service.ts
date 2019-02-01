import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { EMAIL } from "app/entidades/EMAIL";

@Injectable()
export class RegistoProducao {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getAll(data) {
    const url = webUrl.host_app + '/rest/siip/getallRP_OF_CAB';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getalldef(id2, id_ref) {
    const url = webUrl.host_app + '/rest/siip/getbyidRP_OF_DEF_LINall/' + id2 + '/' + id_ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllfam() {
    const url = webUrl.host_app + '/rest/siip/getRP_OF_LST_DEFgetallfam';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getFam(data) {
    const url = webUrl.host_app + '/rest/siip/getRP_OF_LST_DEFgetfam';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getCartelas(data) {
    const url = webUrl.host + '/rest/sirb/getCartelas';
    return this.http
    .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  
  getOP() {
    const url = webUrl.host_app + '/rest/demo/allop';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUser() {
    const url = webUrl.host_app + '/rest/demo/users';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAllbyid(id) {
    const url = webUrl.host_app + '/rest/siip/getRP_OF_OP_LINid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
