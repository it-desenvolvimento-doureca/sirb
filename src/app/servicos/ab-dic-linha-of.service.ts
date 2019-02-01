import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_DIC_LINHA_OF } from '../entidades/AB_DIC_LINHA_OF';

@Injectable()
export class ABDICLINHAOFService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_DIC_LINHA_OF) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_LINHA_OF', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<AB_DIC_LINHA_OF[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_LINHA_OFbyidlinha/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_DIC_LINHA_OF[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_LINHA_OF';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_LINHA_OF/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_LINHA_OF) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_LINHA_OF', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}