import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_ANALISE } from "app/entidades/AB_MOV_ANALISE";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Injectable()
export class ABMOVANALISEService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private globalVar: AppGlobals) { }

  create(data: AB_MOV_ANALISE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_ANALISE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(data): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_MOV_ANALISE/0';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllmanu(idbanho, data): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_MOV_ANALISEmanu/0/' + idbanho;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_ANALISE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getbyid_banho(id, inicio, fim, id_analise): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_MOV_ANALISEidbanho/' + id + '/' + inicio + '/' + fim + '/' + id_analise;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_banho_comp(id, inicio, fim, data): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_MOV_ANALISEidbanho_comp/' + id + '/' + inicio + '/' + fim;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISEbyid/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: AB_MOV_ANALISE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_ANALISE', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}