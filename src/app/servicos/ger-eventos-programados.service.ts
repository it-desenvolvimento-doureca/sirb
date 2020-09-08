import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_EVENTOS_PROGRAMADOS } from '../entidades/GER_EVENTOS_PROGRAMADOS';

@Injectable()
export class GEREVENTOSPROGRAMADOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_EVENTOS_PROGRAMADOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_EVENTOS_PROGRAMADOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_EVENTOS_PROGRAMADOS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_EVENTOS_PROGRAMADOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<GER_EVENTOS_PROGRAMADOS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_EVENTOS_PROGRAMADOSbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  testeEvento(id): Observable<GER_EVENTOS_PROGRAMADOS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_EVENTOS_PROGRAMADOSTesteEvento/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_EVENTOS_PROGRAMADOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_EVENTOS_PROGRAMADOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_EVENTOS_PROGRAMADOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
