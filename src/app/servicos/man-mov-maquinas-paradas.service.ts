import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { MAN_MOV_MAQUINAS_PARADAS } from 'app/entidades/MAN_MOV_MAQUINAS_PARADAS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";


@Injectable()
export class MANMOVMAQUINASPARADASService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MAQUINAS_PARADAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MAQUINAS_PARADAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MAQUINAS_PARADAS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MAQUINAS_PARADAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MAQUINAS_PARADAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_MAQUINAS_PARADAS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MAQUINAS_PARADASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MAQUINAS_PARADAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MAQUINAS_PARADAS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}