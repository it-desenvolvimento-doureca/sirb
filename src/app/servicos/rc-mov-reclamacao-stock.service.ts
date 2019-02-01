import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_MOV_RECLAMACAO_STOCK } from '../entidades/RC_MOV_RECLAMACAO_STOCK';

@Injectable()
export class RCMOVRECLAMACAOSTOCKService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RC_MOV_RECLAMACAO_STOCK) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_MOV_RECLAMACAO_STOCK', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidreclamacao(id): Observable<RC_MOV_RECLAMACAO_STOCK[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_STOCKbyid_reclamacao/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyidlinha(id, id_linha): Observable<RC_MOV_RECLAMACAO_STOCK[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_STOCKbyid_linha/' + id + '/' + id_linha;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll(): Observable<RC_MOV_RECLAMACAO_STOCK[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_STOCK';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_MOV_RECLAMACAO_STOCK/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_MOV_RECLAMACAO_STOCK) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_MOV_RECLAMACAO_STOCK', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
