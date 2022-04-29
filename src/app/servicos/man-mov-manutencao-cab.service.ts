import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_MOV_MANUTENCAO_CAB } from 'app/entidades/MAN_MOV_MANUTENCAO_CAB';
@Injectable()
export class MANMOVMANUTENCAOCABService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MANUTENCAO_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MANUTENCAO_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  MAN_MOV_MANUTENCAO_CREATE_HISTORICO(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/MAN_MOV_MANUTENCAO_CREATE_HISTORICO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MANUTENCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getHISTORICO(id): Observable<MAN_MOV_MANUTENCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CAB_HISTORICO/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MANUTENCAO_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_MANUTENCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CABbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllManutencoesPendentes(tipo, id): Observable<MAN_MOV_MANUTENCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_PENDENTES/' + tipo + '/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MANUTENCAO_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MANUTENCAO_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  getAll2(CLASSIFICACAO, USER): Observable<MAN_MOV_MANUTENCAO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CAB2/' + CLASSIFICACAO + '/' + USER;
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