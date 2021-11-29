import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_CONTRATOS } from 'app/entidades/COM_CONTRATOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";
@Injectable()
export class COMCONTRATOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_CONTRATOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_CONTRATOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_CONTRATOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_CONTRATOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_CONTRATOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_CONTRATOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_CONTRATOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_CONTRATOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_CONTRATOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
