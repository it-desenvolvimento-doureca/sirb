import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_REFERENCIAS } from 'app/entidades/COM_REFERENCIAS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMREFERENCIASService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_REFERENCIAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_REFERENCIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_REFERENCIAS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_REFERENCIAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_REFERENCIAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_REFERENCIAS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_REFERENCIASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_REFERENCIAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_REFERENCIAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}