import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl'; 
import { AB_DIC_TURNO } from "app/entidades/AB_DIC_TURNO";

@Injectable()
export class ABDICTURNOService {
handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_DIC_TURNO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_TURNO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_DIC_TURNO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TURNO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_DIC_TURNO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TURNObyid_aditivo/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID_banho(id): Observable<AB_DIC_TURNO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TURNObyid_banho/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_TURNO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_TURNO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_TURNO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
