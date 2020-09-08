import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PEDIDOS_APP } from 'app/entidades/PEDIDOS_APP';

@Injectable()
export class PEDIDOSAPPService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PEDIDOS_APP) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPEDIDOS_APP', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PEDIDOS_APP[]> {
    const url = webUrl.host + '/rest/sirb/getPEDIDOS_APP';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(id): Observable<PEDIDOS_APP[]> {
    const url = webUrl.host + '/rest/sirb/getPEDIDOS_APPbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePEDIDOS_APP/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PEDIDOS_APP) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePEDIDOS_APP', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}