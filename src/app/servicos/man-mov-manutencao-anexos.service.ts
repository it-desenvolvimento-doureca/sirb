import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { MAN_MOV_MANUTENCAO_ANEXOS } from 'app/entidades/MAN_MOV_MANUTENCAO_ANEXOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MANMOVMANUTENCAOANEXOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MANUTENCAO_ANEXOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MANUTENCAO_ANEXOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MANUTENCAO_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_ANEXOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MANUTENCAO_ANEXOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id, separador): Observable<MAN_MOV_MANUTENCAO_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_ANEXOSbyid/' + id + '/' + separador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID2(id, separador): Observable<MAN_MOV_MANUTENCAO_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_ANEXOSbyid2/' + id + '/' + separador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyIDANEXO(id): Observable<MAN_MOV_MANUTENCAO_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_ANEXOSbyidanexo/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MANUTENCAO_ANEXOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MANUTENCAO_ANEXOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}