import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_MANUTENCAO } from "app/entidades/AB_MOV_MANUTENCAO";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Injectable()
export class ABMOVMANUTENCAOService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private globalVar: AppGlobals) { }

  create(data: AB_MOV_MANUTENCAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_MANUTENCAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'))
  }

  getAll(query, classif): Observable<AB_MOV_MANUTENCAO[]> {
    if (query.length <= 0) query = null;
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO/0/' + classif;
    return this.http
      .post(url, JSON.stringify(query), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllmanu(query): Observable<AB_MOV_MANUTENCAO[]> {
    if (query.length <= 0) query = null;
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAOall/0/';
    return this.http
      .post(url, JSON.stringify(query), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllid_banho(query, classif, idbanho): Observable<AB_MOV_MANUTENCAO[]> {
    if (query.length <= 0) query = null;
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAOidbanho/0/' + classif + '/' + idbanho;
    return this.http
      .post(url, JSON.stringify(query), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAllsrotid(query, classif): Observable<AB_MOV_MANUTENCAO[]> {
    if (query.length <= 0) query = null;
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAOsorid/0/' + classif;
    return this.http
      .post(url, JSON.stringify(query), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getallAnaliseConsumos(data): Observable<AB_MOV_MANUTENCAO[]> {
    const url = webUrl.host + '/rest/sirb/getallAnaliseConsumos/';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getallAnaliseConsumos2(data): Observable<AB_MOV_MANUTENCAO[]> {
    const url = webUrl.host + '/rest/sirb/getallAnaliseConsumos2/';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<AB_MOV_MANUTENCAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAObyid/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  atualizarestados(id): Observable<AB_MOV_MANUTENCAO[]> {
    const url = webUrl.host + '/rest/sirb/atualizarestados/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_MANUTENCAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_MOV_MANUTENCAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_MANUTENCAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  criaficheiro(data) {
    const url = webUrl.host + '/rest/sirb/ficheiromanual';
    return this.http.post(url, JSON.stringify(data), { responseType: ResponseContentType.Blob, headers: this.headers }).map(
      (res) => {

        return new Blob([res.blob()], { type: 'application/zip' });

      });
  }
<<<<<<< HEAD

  criaficheiro2(data) {
    const url = webUrl.host + '/rest/sirb/ficheiromanual2';
    return this.http.post(url, JSON.stringify(data), { responseType: ResponseContentType.Blob, headers: this.headers }).map(
      (res) => {

        return new Blob([res.blob()], { type: 'application/zip' });

      });
  }

  criaficheiroIDS(data) {
    const url = webUrl.host + '/rest/sirb/ficheiromanualgetEtiquetas';
    return this.http.post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}