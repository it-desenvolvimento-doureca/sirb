import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_MOV_MANUTENCAO_EQUIPAMENTOS } from 'app/entidades/MAN_MOV_MANUTENCAO_EQUIPAMENTOS';

@Injectable()
export class MANMOVMANUTENCAOEQUIPAMENTOSService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MANUTENCAO_EQUIPAMENTOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MANUTENCAO_EQUIPAMENTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MANUTENCAO_EQUIPAMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_EQUIPAMENTOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllLocalizacao(tipo, id): Observable<MAN_MOV_MANUTENCAO_EQUIPAMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_EQUIPAMENTOSgetAllLocalizacao/' + tipo + '/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<MAN_MOV_MANUTENCAO_EQUIPAMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_EQUIPAMENTOS2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MANUTENCAO_EQUIPAMENTOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_MANUTENCAO_EQUIPAMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_EQUIPAMENTOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MANUTENCAO_EQUIPAMENTOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MANUTENCAO_EQUIPAMENTOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  DUPLICA_MAN_MOV_MANUTENCAO_EQUIPAMENTOS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/DUPLICA_MAN_MOV_MANUTENCAO_EQUIPAMENTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  MAN_FORCA_CRIAR_MANUTENCOES_PREVENTIVAS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/MAN_FORCA_CRIAR_MANUTENCOES_PREVENTIVAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  MAN_GET_EQUIPAMENTOS_CRITICOS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/MAN_GET_EQUIPAMENTOS_CRITICOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}