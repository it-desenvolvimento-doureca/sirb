import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_MANUTENCAO_LINHA } from "app/entidades/AB_MOV_MANUTENCAO_LINHA";

@Injectable()
export class ABMOVMANUTENCAOLINHAService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_MOV_MANUTENCAO_LINHA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_MANUTENCAO_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_MOV_MANUTENCAO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_LINHA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_MOV_MANUTENCAO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_LINHAbyidmanutencaocab/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyIDtotal(id): Observable<AB_MOV_MANUTENCAO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_LINHAbyidmanutencaocabtotal/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID_lin(id): Observable<AB_MOV_MANUTENCAO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_LINHAbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID_comp(id, data): Observable<AB_MOV_MANUTENCAO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_LINHAbyid_analise_comp/' + id;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  apagar_linhas(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/apagar_linhas/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_MANUTENCAO_LINHA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_MOV_MANUTENCAO_LINHA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_MANUTENCAO_LINHA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getDadosEtiquetabyREF(ref, cisterna, prorefsubstituta) {
    var url = "";
    if (cisterna) {
      url = webUrl.host + '/rest/sirb/getDadosEtiquetabyREFcisterna/' + ref + '/' + prorefsubstituta;
    } else {
      url = webUrl.host + '/rest/sirb/getDadosEtiquetabyREF/' + ref;
    }
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getDadosEtiqueta(etiq) {
    const url = webUrl.host + '/rest/sirb/getDadosEtiqueta/' + etiq;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}