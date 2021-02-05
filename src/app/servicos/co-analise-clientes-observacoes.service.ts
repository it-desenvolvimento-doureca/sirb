import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { CO_ANALISE_CLIENTES_OBSERVACOES } from 'app/entidades/CO_ANALISE_CLIENTES_OBSERVACOES';

@Injectable()
export class COANALISECLIENTESOBSERVACOESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: CO_ANALISE_CLIENTES_OBSERVACOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCO_ANALISE_CLIENTES_OBSERVACOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<CO_ANALISE_CLIENTES_OBSERVACOES[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTES_OBSERVACOESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<CO_ANALISE_CLIENTES_OBSERVACOES[]> {
    const url = webUrl.host + '/rest/sirb/getCO_ANALISE_CLIENTES_OBSERVACOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCO_ANALISE_CLIENTES_OBSERVACOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: CO_ANALISE_CLIENTES_OBSERVACOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCO_ANALISE_CLIENTES_OBSERVACOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_ANALISE_CLIENTES_OBSERVACOES(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_CLIENTES_OBSERVACOES';
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
