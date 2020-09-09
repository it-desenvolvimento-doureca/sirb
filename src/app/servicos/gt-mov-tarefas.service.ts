import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GT_MOV_TAREFAS } from '../entidades/GT_MOV_TAREFAS';
import { GT_LOGS } from '../entidades/GT_LOGS';
<<<<<<< HEAD
import { parseString } from 'xml2js';
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea

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

<<<<<<< HEAD
  atualizaTAREFA(data: GT_MOV_TAREFAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/atualizaTAREFA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  getbyid(id): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

<<<<<<< HEAD

  getbyids(id, modulo, submodulo): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASbyids/' + id + '/' + modulo + '/' + submodulo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
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

<<<<<<< HEAD
  getFeriados(link) {

    var headers = new Headers();
    headers.append('Accept', 'application/xml');

    return this.http.get(link, {
      headers: headers
    }).map(res => {
      var result;
      parseString(res.text(), function (err, res) {
        result = res;
      });
      return result;
    });
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  getAtulizaTarefasd(id, modulo, link): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_TAREFASAtualizaAccao/' + id + '/' + modulo;
    return this.http
      .post(url, link, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

<<<<<<< HEAD

  getAtualizaTarefaReclamacao(id, modulo, link): Observable<GT_MOV_TAREFAS[]> {
    const url = webUrl.host + '/rest/sirb/getAtualizaTarefaReclamacao/' + id + '/' + modulo;
    return this.http
      .post(url, link, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
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