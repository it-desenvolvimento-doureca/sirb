import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { AT_DIC_CAUSAS_ACIDENTE } from 'app/entidades/AT_DIC_CAUSAS_ACIDENTE';


@Injectable()
export class ATDICCAUSASACIDENTEService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AT_DIC_CAUSAS_ACIDENTE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAT_DIC_CAUSAS_ACIDENTE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<AT_DIC_CAUSAS_ACIDENTE[]> {
    const url = webUrl.host + '/rest/sirb/getAT_DIC_CAUSAS_ACIDENTEbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AT_DIC_CAUSAS_ACIDENTE[]> {
    const url = webUrl.host + '/rest/sirb/getAT_DIC_CAUSAS_ACIDENTE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAT_DIC_CAUSAS_ACIDENTE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AT_DIC_CAUSAS_ACIDENTE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAT_DIC_CAUSAS_ACIDENTE', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  deleteAT_OCORRENCIAS_CAUSAS_ACIDENTE(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAT_OCORRENCIAS_CAUSAS_ACIDENTE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  insertAT_OCORRENCIAS_CAUSAS_ACIDENTE(id, id_causa) {
    const url = webUrl.host + '/rest/sirb/insertAT_OCORRENCIAS_CAUSAS_ACIDENTE/' + id + '/' + id_causa;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAT_OCORRENCIAS_CAUSAS_ACIDENTE(id) {
    const url = webUrl.host + '/rest/sirb/getAT_OCORRENCIAS_CAUSAS_ACIDENTE/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
