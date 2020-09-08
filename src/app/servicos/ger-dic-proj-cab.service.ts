import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_DIC_PROJ_CAB } from 'app/entidades/GER_DIC_PROJ_CAB';

@Injectable()
export class GERDICPROJCABService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_DIC_PROJ_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_DIC_PROJ_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_CABbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid2(id): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_CABbyid2/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll2(): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_CAB2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analiseencomendasREFERENCIAS(data) {
    const url = webUrl.host + '/rest/sirb/analiseencomendasREFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analiseencomendasENCOMENDAS(data) {
    const url = webUrl.host + '/rest/sirb/analiseencomendasENCOMENDAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analiseencomendasCOMPONENTES(data) {
    const url = webUrl.host + '/rest/sirb/analiseencomendasCOMPONENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analiseencomendasOEM(data) {
    const url = webUrl.host + '/rest/sirb/analiseencomendasOEM';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getArmazens(): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getArmazens';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getClientes(): Observable<GER_DIC_PROJ_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getClientesProducao';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analiseencomendasFABRICAS(data) {
    const url = webUrl.host + '/rest/sirb/analiseencomendasFABRICAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  analisePORencomendas(data) {
    const url = webUrl.host + '/rest/sirb/analisePORencomendas';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_DIC_PROJ_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_DIC_PROJ_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_DIC_PROJ_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getComponentes() {
    const url = webUrl.host + '/rest/sirb/GER_DIC_PROJ_CABgetComponentes';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  verifica(data: GER_DIC_PROJ_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/verificaGER_DIC_PROJ_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_ANALISE_ENCOMENDAS_CLIENTES(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_ENCOMENDAS_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_ANALISE_ENCOMENDAS_ATRASOS(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_ENCOMENDAS_ATRASOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_ANALISE_ENCOMENDAS_REFERENCIAS(data) {
    const url = webUrl.host + '/rest/sirb/GET_ANALISE_ENCOMENDAS_REFERENCIAS';
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
