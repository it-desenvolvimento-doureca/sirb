import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_MOV_RECLAMACAO } from '../entidades/RC_MOV_RECLAMACAO';

@Injectable()
export class RCMOVRECLAMACAOService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  create(data: RC_MOV_RECLAMACAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_MOV_RECLAMACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAllativas(): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAOativas';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getEncomendasCliente(proref, data) {
    const url = webUrl.host + '/rest/sirb/getEncomendasCliente/' + proref;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPlaneado(proref) {
    const url = webUrl.host + '/rest/sirb/getPlaneado/' + proref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getStock(proref) {
    const url = webUrl.host + '/rest/sirb/getStockPROREF/' + proref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  getDadosporLote(id) {
    const url = webUrl.host + '/rest/sirb/getDadosporLote/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDadosporEtiqueta(id) {
    const url = webUrl.host + '/rest/sirb/getDadosporEtiqueta/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDadosporGuia(id) {
    const url = webUrl.host + '/rest/sirb/getDadosporGuia/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  validaEtiqueta(id) {
    const url = webUrl.host + '/rest/sirb/validaEtiqueta/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  validaGuia(id) {
    const url = webUrl.host + '/rest/sirb/validaGuia/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  validalote(id) {
    const url = webUrl.host + '/rest/sirb/validalote/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getEnviado(proref, data) {
    const url = webUrl.host + '/rest/sirb/getEnviado/' + proref;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getEnviosGarantidos(proref, data) {
    const url = webUrl.host + '/rest/sirb/getEnviosGarantidos/' + proref;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAObyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyIDTotalTarefas(id) {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAObyidtotaltarefas/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyidmodulo(id): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAObyidmodulo/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidmoduloativas(id): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAObyidmoduloativas/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

<<<<<<< HEAD

  getRC_MOV_RECLAMACAOACCOESABERTAS(id, tipo): Observable<RC_MOV_RECLAMACAO[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAOACCOESABERTAS/' + id + '/' + tipo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  getEMAILS(id) {
    const url = webUrl.host + '/rest/sirb/getEMAILS/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_MOV_RECLAMACAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_MOV_RECLAMACAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_MOV_RECLAMACAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  atualizaestadosaccoes(id, modulo) {
    return this.http
      .get(webUrl.host + '/rest/sirb/deleteRC_MOV_RECLAMACAUPDATEESTADOS/' + id + '/' + modulo)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

<<<<<<< HEAD
  atualizaestadosRC_MOV_RECLAMACAUPDATEESTADOS(id, modulo, tipo) {
    return this.http
      .get(webUrl.host + '/rest/sirb/atualizaestadosRC_MOV_RECLAMACAUPDATEESTADOS/' + id + '/' + modulo + '/' + tipo)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea

  traduzir(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/traduzir', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData1)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private extractData1(res: Response) {
    return res;
  }
}
