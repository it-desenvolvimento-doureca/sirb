import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_ACORDOS_HISTORICO } from 'app/entidades/COM_ACORDOS_HISTORICO';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMACORDOSHISTORICOService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_ACORDOS_HISTORICO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_ACORDOS_HISTORICO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_ACORDOS_HISTORICO[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_HISTORICO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS_HISTORICO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_ACORDOS_HISTORICO[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_HISTORICObyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_ACORDOS_HISTORICO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_HISTORICO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}