import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_ACORDOS_PRECOS } from 'app/entidades/COM_ACORDOS_PRECOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMACORDOSPRECOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_ACORDOS_PRECOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_ACORDOS_PRECOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_ACORDOS_PRECOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_PRECOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS_PRECOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id, versao): Observable<COM_ACORDOS_PRECOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_PRECOSbyid/' + id + '/' + versao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_ACORDOS_PRECOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_PRECOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}