import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { AB_DIC_TIPO_ADICAO } from "app/entidades/AB_DIC_TIPO_ADICAO";

@Injectable()
export class ABDICTIPOADICAOService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: AB_DIC_TIPO_ADICAO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_TIPO_ADICAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(classif): Observable<AB_DIC_TIPO_ADICAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TIPO_ADICAO';
    return this.http
      .post(url, JSON.stringify(classif), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_DIC_TIPO_ADICAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TIPO_ADICAObyid_aditivo/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID_banho(id): Observable<AB_DIC_TIPO_ADICAO[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TIPO_ADICAObyid_banho/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_TIPO_ADICAO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_TIPO_ADICAO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_TIPO_ADICAO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
