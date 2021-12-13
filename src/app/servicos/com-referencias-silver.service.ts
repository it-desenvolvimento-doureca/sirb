import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_REFERENCIAS_SILVER } from 'app/entidades/COM_REFERENCIAS_SILVER';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMREFERENCIASSILVERService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_REFERENCIAS_SILVER) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_REFERENCIAS_SILVER', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_REFERENCIAS_SILVER[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_REFERENCIAS_SILVER';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_REFERENCIAS_SILVER/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_REFERENCIAS_SILVER[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_REFERENCIAS_SILVERbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_REFERENCIAS_SILVER) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_REFERENCIAS_SILVER', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}