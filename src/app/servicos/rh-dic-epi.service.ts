import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { RH_DIC_EPI } from 'app/entidades/RH_DIC_EPI';


@Injectable()
export class RHDICEPIService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_DIC_EPI) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_DIC_EPI', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<RH_DIC_EPI[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_EPIbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_DIC_EPI[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_EPI';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_DIC_EPI/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_DIC_EPI) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_DIC_EPI', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  deleteAT_OCORRENCIAS_EPI(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAT_OCORRENCIAS_EPI/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  insertAT_OCORRENCIAS_EPI(id, id_epi) {
    const url = webUrl.host + '/rest/sirb/insertAT_OCORRENCIAS_EPI/' + id + '/' + id_epi;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAT_OCORRENCIAS_EPI(id) {
    const url = webUrl.host + '/rest/sirb/getAT_OCORRENCIAS_EPI/' + id;
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
