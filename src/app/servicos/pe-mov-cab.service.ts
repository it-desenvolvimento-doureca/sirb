import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PE_MOV_CAB } from 'app/entidades/PE_MOV_CAB';

@Injectable()
export class PEMOVCABService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PE_MOV_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPE_MOV_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PE_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPE_MOV_CABbyTIPO(tipo, data): Observable<PE_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_CABbyTIPO/' + tipo;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPE_MOV_CABbyTIPOaccoes(tipo, data): Observable<PE_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_CABbyTIPOaccoes/' + tipo;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<PE_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_CABbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePE_MOV_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PE_MOV_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePE_MOV_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updatePE_MOV_CAB_EVENTOS(id, utilizador): Observable<PE_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/updatePE_MOV_CAB_EVENTOS/' + id + '/' + utilizador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  PE_GET_ACOES_EM_ATRASO(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/PE_GET_ACOES_EM_ATRASO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  PE_GET_ULTIMAS_ACOES_CONCLUIDAS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/PE_GET_ULTIMAS_ACOES_CONCLUIDAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  PE_GET_ANALISE_CONTADORES(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/PE_GET_ANALISE_CONTADORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  PE_GET_ANALISE_GRAFICO(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/PE_GET_ANALISE_GRAFICO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

}