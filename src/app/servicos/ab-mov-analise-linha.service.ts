import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_ANALISE_LINHA } from "app/entidades/AB_MOV_ANALISE_LINHA";

@Injectable()
export class ABMOVANALISELINHAService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_MOV_ANALISE_LINHA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_ANALISE_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_MOV_ANALISE_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE_LINHA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<AB_MOV_ANALISE_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE_LINHAbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_analise(id_analise, id): Observable<AB_MOV_ANALISE_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE_LINHAbyid_analise/' + id_analise + '/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_analise_comp(id, data, id_banho): Observable<AB_MOV_ANALISE_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE_LINHAbyid_analise_comp/' + id + '/' + id_banho;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid_analise_comp2(id, data, id_banho): Observable<AB_MOV_ANALISE_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE_LINHAbyid_analise_comp2/' + id + '/' + id_banho;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_ANALISE_LINHA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_MOV_ANALISE_LINHA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_ANALISE_LINHA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}