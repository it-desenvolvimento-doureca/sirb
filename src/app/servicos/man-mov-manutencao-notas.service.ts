import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; 
import { MAN_MOV_MANUTENCAO_NOTAS } from 'app/entidades/MAN_MOV_MANUTENCAO_NOTAS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";
@Injectable()
export class MANMOVMANUTENCAONOTASService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MANUTENCAO_NOTAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MANUTENCAO_NOTAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MANUTENCAO_NOTAS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_NOTAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MANUTENCAO_NOTAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_MANUTENCAO_NOTAS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_NOTASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MANUTENCAO_NOTAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MANUTENCAO_NOTAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}