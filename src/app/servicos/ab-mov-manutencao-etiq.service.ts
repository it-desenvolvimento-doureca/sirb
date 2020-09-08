import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_MOV_MANUTENCAO_ETIQ } from '../entidades/AB_MOV_MANUTENCAO_ETIQ';

@Injectable()
export class ABMOVMANUTENCAOETIQService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_MOV_MANUTENCAO_ETIQ) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_MANUTENCAO_ETIQ', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  ATUALIZAQUANTAPAGAR(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/ATUALIZAQUANTAPAGAR', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  ATUALIZAQUANT(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/ATUALIZAQUANT', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  ATUALIZAQUANTAOAPAGAR(id) {
    return this.http
      .get(webUrl.host + '/rest/sirb/ATUALIZAQUANTAOAPAGAR/' + id)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<AB_MOV_MANUTENCAO_ETIQ[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_ETIQbyidmanu/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<AB_MOV_MANUTENCAO_ETIQ[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_ETIQbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyRef(id, ref): Observable<AB_MOV_MANUTENCAO_ETIQ[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_ETIQbyref/' + id + '/' + ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyRef2(id): Observable<AB_MOV_MANUTENCAO_ETIQ[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_ETIQbyref2/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  /* getAll(): Observable<AB_MOV_MANUTENCAO_ETIQ[]> {
     const url = webUrl.host + '/rest/sirb/getAB_MOV_MANUTENCAO_ETIQ';
     return this.http
       .get(url)
       .map(this.extractData)
       .catch((error: any) => Observable.throw('Server error'));
   }*/

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_MANUTENCAO_ETIQ/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_MOV_MANUTENCAO_ETIQ) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_MANUTENCAO_ETIQ', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  criaficheiro(data) {
    const url = webUrl.host + '/rest/sirb/ficheiro/';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

  criaficheirocorrecao(data) {
    const url = webUrl.host + '/rest/sirb/ficheirocorrecao/';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }


  ficheiroimprimiretiqueta(data) {
    const url = webUrl.host + '/rest/sirb/ficheiroimprimiretiqueta/';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}