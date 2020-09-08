import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RH_ESTADOS_FUNC } from 'app/entidades/RH_ESTADOS_FUNC';

@Injectable()
export class RHESTADOSFUNCService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_ESTADOS_FUNC) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_ESTADOS_FUNC', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_ESTADOS_FUNC[]> {
    const url = webUrl.host + '/rest/sirb/getRH_ESTADOS_FUNC';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<RH_ESTADOS_FUNC[]> {
    const url = webUrl.host + '/rest/sirb/getRH_ESTADOS_FUNCbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_ESTADOS_FUNC/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_ESTADOS_FUNC) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_ESTADOS_FUNC', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
