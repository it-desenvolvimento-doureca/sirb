import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PA_DIC_AMBITOS } from 'app/entidades/PA_DIC_AMBITOS';

@Injectable()
export class PADICAMBITOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PA_DIC_AMBITOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPA_DIC_AMBITOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PA_DIC_AMBITOS[]> {
    const url = webUrl.host + '/rest/sirb/getPA_DIC_AMBITOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(id): Observable<PA_DIC_AMBITOS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_DIC_OBJETIVOS_PLANOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePA_DIC_AMBITOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PA_DIC_AMBITOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePA_DIC_AMBITOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}