import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PA_MOV_LINHA } from 'app/entidades/PA_MOV_LINHA';

@Injectable()
export class PAMOVLINHAService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PA_MOV_LINHA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPA_MOV_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PA_MOV_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_LINHA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PA_MOV_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_LINHAbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPA_MOV_LINHAAtualizaESTADOS(ip): Observable<PA_MOV_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_LINHAAtualizaESTADOS/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePA_MOV_LINHA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  delete_favorito(id): Observable<PA_MOV_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_LINHAdelete_favorito/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  add_favorito(id): Observable<PA_MOV_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_LINHAadd_favorito/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: PA_MOV_LINHA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePA_MOV_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}