import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_DIC_PISOS } from 'app/entidades/MAN_DIC_PISOS';
@Injectable()
export class MANDICPISOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_DIC_PISOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_DIC_PISOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_DIC_PISOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_PISOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_DIC_PISOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getALLLOCALLIZACOES(): Observable<MAN_DIC_PISOS[]> {
    const url = webUrl.host + '/rest/sirb/getALLLOCALLIZACOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<MAN_DIC_PISOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_PISOSbyid/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_DIC_PISOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_DIC_PISOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}