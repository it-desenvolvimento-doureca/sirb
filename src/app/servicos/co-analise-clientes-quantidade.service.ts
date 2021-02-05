import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { CO_ANALISE_CLIENTES_QUANTIDADE } from 'app/entidades/CO_ANALISE_CLIENTES_QUANTIDADE';
@Injectable()
export class COANALISECLIENTESQUANTIDADEService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: CO_ANALISE_CLIENTES_QUANTIDADE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCO_ANALISE_CLIENTES_QUANTIDADE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<CO_ANALISE_CLIENTES_QUANTIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTES_QUANTIDADEbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<CO_ANALISE_CLIENTES_QUANTIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTES_QUANTIDADE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCO_ANALISE_CLIENTES_QUANTIDADE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: CO_ANALISE_CLIENTES_QUANTIDADE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCO_ANALISE_CLIENTES_QUANTIDADE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
