import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_MOV_PEDIDOS_MELHORIA } from 'app/entidades/MAN_MOV_PEDIDOS_MELHORIA';

@Injectable()
export class MANMOVPEDIDOSMELHORIAService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_PEDIDOS_MELHORIA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_PEDIDOS_MELHORIA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_PEDIDOS_MELHORIA[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_PEDIDOS_MELHORIA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<MAN_MOV_PEDIDOS_MELHORIA[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_PEDIDOS_MELHORIA2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_PEDIDOS_MELHORIA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_PEDIDOS_MELHORIA[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_PEDIDOS_MELHORIAbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_PEDIDOS_MELHORIA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_PEDIDOS_MELHORIA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  MAN_CRIAR_MANUTENCOES_MELHORIA(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/MAN_CRIAR_MANUTENCOES_MELHORIA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}