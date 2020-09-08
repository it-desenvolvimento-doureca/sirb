import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_MOV_RECLAMACAO_FORNECEDOR } from 'app/entidades/RC_MOV_RECLAMACAO_FORNECEDOR';

@Injectable()
export class RCMOVRECLAMACAOFORNECEDORService {


  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  create(data: RC_MOV_RECLAMACAO_FORNECEDOR) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_MOV_RECLAMACAO_FORNECEDOR', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_MOV_RECLAMACAO_FORNECEDOR[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_FORNECEDOR';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<RC_MOV_RECLAMACAO_FORNECEDOR[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_FORNECEDOR2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<RC_MOV_RECLAMACAO_FORNECEDOR[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_FORNECEDORbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_MOV_RECLAMACAO_FORNECEDOR/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_MOV_RECLAMACAO_FORNECEDOR) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_MOV_RECLAMACAO_FORNECEDOR', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
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
