import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_ACORDOS_ANEXOS } from 'app/entidades/COM_ACORDOS_ANEXOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";
@Injectable()
export class COMACORDOSANEXOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_ACORDOS_ANEXOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_ACORDOS_ANEXOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_ACORDOS_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_ANEXOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS_ANEXOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_ACORDOS_ANEXOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_ANEXOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_ACORDOS_ANEXOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_ANEXOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}