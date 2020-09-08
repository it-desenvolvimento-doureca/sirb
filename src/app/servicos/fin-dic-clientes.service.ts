import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { FIN_DIC_CLIENTES } from 'app/entidades/FIN_DIC_CLIENTES';

@Injectable()
export class FINDICCLIENTESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: FIN_DIC_CLIENTES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createFIN_DIC_CLIENTES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<FIN_DIC_CLIENTES[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_DIC_CLIENTESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<FIN_DIC_CLIENTES[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_DIC_CLIENTES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteFIN_DIC_CLIENTES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: FIN_DIC_CLIENTES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateFIN_DIC_CLIENTES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
