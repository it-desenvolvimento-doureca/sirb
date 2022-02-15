import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_MANUTENCAO_DOSIFICADORES } from 'app/entidades/AB_MOV_MANUTENCAO_DOSIFICADORES';

@Injectable()
export class ABMOVMANUTENCAODOSIFICADORESService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_MOV_MANUTENCAO_DOSIFICADORES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_MANUTENCAO_DOSIFICADORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_MOV_MANUTENCAO_DOSIFICADORES[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_DOSIFICADORES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_MOV_MANUTENCAO_DOSIFICADORES[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_DOSIFICADORESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_MANUTENCAO_DOSIFICADORES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_MOV_MANUTENCAO_DOSIFICADORES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_MANUTENCAO_DOSIFICADORES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  ANALISE_DOSIFICADORES(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/ANALISE_DOSIFICADORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}