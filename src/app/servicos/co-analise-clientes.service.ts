import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { CO_ANALISE_CLIENTES } from 'app/entidades/CO_ANALISE_CLIENTES';
@Injectable()
export class COANALISECLIENTESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: CO_ANALISE_CLIENTES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCO_ANALISE_CLIENTES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<CO_ANALISE_CLIENTES[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<CO_ANALISE_CLIENTES[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCO_ANALISE_CLIENTES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: CO_ANALISE_CLIENTES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCO_ANALISE_CLIENTES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  GET_ANALISE_CLIENTES_CLIENTES(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_CLIENTES_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_ANALISE_CLIENTES_REFERENCIAS(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_CLIENTES_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
