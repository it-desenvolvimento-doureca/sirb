import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_ATUALIZACAO_SILVER_BI_TABELAS } from 'app/entidades/GER_ATUALIZACAO_SILVER_BI_TABELAS';

@Injectable()
export class GERATUALIZACAOSILVERBITABELASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_ATUALIZACAO_SILVER_BI_TABELAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_ATUALIZACAO_SILVER_BI_TABELAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_ATUALIZACAO_SILVER_BI_TABELAS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ATUALIZACAO_SILVER_BI_TABELAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getTABELAS(BD) {
    const url = webUrl.host + '/rest/sirb/getBDS/' + BD;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_ATUALIZACAO_SILVER_BI_TABELAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_ATUALIZACAO_SILVER_BI_TABELAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_ATUALIZACAO_SILVER_BI_TABELAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}