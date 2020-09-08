import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_GRUPO } from '../entidades/GER_GRUPO';

@Injectable()
export class GERGRUPOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_GRUPO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_GRUPO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_GRUPO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_GRUPO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByid(id): Observable<GER_GRUPO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_GRUPObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByidUsers(id): Observable<GER_GRUPO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_GRUPObyidUser/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_GRUPO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_GRUPO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_GRUPO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
