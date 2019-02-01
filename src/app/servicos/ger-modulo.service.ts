import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { GER_MODULO } from "app/entidades/GER_MODULO";
import { webUrl } from 'assets/config/webUrl';

@Injectable()
export class GERMODULOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_MODULO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_MODULO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_MODULO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_MODULO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_MODULO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_MODULO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_MODULO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}