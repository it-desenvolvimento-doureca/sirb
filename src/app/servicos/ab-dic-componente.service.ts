import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_DIC_COMPONENTE } from "app/entidades/AB_DIC_COMPONENTE";

@Injectable()
export class ABDICCOMPONENTEService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_DIC_COMPONENTE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_COMPONENTE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));

  }


  getbyID(id): Observable<AB_DIC_COMPONENTE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_COMPONENTEbyid_componente/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(tipo): Observable<AB_DIC_COMPONENTE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_COMPONENTE/' + tipo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getComponentes() {
    const url = webUrl.host + '/rest/sirb/getComponentes';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getFamilias() {
    const url = webUrl.host + '/rest/sirb/getFamilias';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDefeitos() {
    const url = webUrl.host + '/rest/sirb/getDefeitos';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getComponentesdoSGIID() {
    const url = webUrl.host + '/rest/sirb/getComponentesDOSGIID';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getComponentesTodos() {
    const url = webUrl.host + '/rest/sirb/getComponentesTodos';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getComponentesProducao() {
    const url = webUrl.host + '/rest/sirb/getComponentesProducao';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getComponentesSaoBento() {
    const url = webUrl.host + '/rest/sirb/getComponentesSaoBento';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getReferencias() {
    const url = webUrl.host + '/rest/sirb/getReferencias';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getReferenciasMANU() {
    const url = webUrl.host + '/rest/sirb/getReferenciasMANU';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getReferenciasSTOCK(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/getReferenciasSTOCK', data, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getClientes() {
    const url = webUrl.host + '/rest/sirb/getClientes';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getMaquinas() {
    const url = webUrl.host + '/rest/sirb/getMaquinas';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getMoradas(clicod) {
    const url = webUrl.host + '/rest/sirb/getMoradas/' + clicod;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));

  }

  getComponentesdoCliente(clicod, etsnum) {
    const url = webUrl.host + '/rest/sirb/getComponentesdoCliente/' + clicod + '/' + etsnum;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getMoradaClientePorReferencia(proref) {
    const url = webUrl.host + '/rest/sirb/getMoradaClientePorReferencia/' + proref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getEtiquetas(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/getEtiquetas', data, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_COMPONENTE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_COMPONENTE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_COMPONENTE', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}