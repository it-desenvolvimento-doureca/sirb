import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_FORNECEDOR } from "app/entidades/GER_FORNECEDOR";

@Injectable()
export class GERFORNECEDORService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_FORNECEDOR) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_FORNECEDOR', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_FORNECEDOR[]> {
    const url = webUrl.host + '/rest/sirb/getGER_FORNECEDOR';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll_silver() {
    const url = webUrl.host + '/rest/sirb/getFornecedores';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<GER_FORNECEDOR[]> {
    const url = webUrl.host + '/rest/sirb/getGER_FORNECEDORbyid_fornecedor/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getMaxID() {
    const url = webUrl.host + '/rest/sirb/getGER_FORNECEDORMaxID/';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verifica_num_fornece(id, num) {
    const url = webUrl.host + '/rest/sirb/verifica_num_fornece/' + id + '/' + num + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

   verifica_num(num) {
    const url = webUrl.host + '/rest/sirb/verifica_num/'+ num + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_FORNECEDOR/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_FORNECEDOR) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_FORNECEDOR', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}