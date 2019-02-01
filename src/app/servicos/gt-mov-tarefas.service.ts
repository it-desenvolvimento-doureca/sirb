import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GT_MOV_TAREFAS } from '../entidades/GT_MOV_TAREFAS';
import { GT_LOGS } from '../entidades/GT_LOGS';

@Injectable()
export class GTMOVTAREFASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GT_MOV_TAREFAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGT_MOV_TAREFAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllbyidUser(id, data): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASAllbyUser/' + id;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyFiltros(data): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASbyid';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAtulizaTarefasd(id, modulo, link): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASAtualizaAccao/' + id + '/' + modulo;
    return this.http
      .post(url, link, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGT_MOV_TAREFAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GT_MOV_TAREFAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGT_MOV_TAREFAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }



  createLOGS(data: GT_LOGS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGT_LOGS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllLOGS(): Observable<GT_LOGS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_LOGS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByid(id): Observable<GT_LOGS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_LOGSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  deleteLOGS(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGT_LOGS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  updateLOGS(data: GT_LOGS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGT_LOGS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}