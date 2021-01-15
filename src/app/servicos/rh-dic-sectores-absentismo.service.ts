import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { RH_DIC_SECTORES_ABSENTISMO } from 'app/entidades/RH_DIC_SECTORES_ABSENTISMO';

@Injectable()
export class RHDICSECTORESABSENTISMOService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_DIC_SECTORES_ABSENTISMO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_DIC_SECTORES_ABSENTISMO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_DIC_SECTORES_ABSENTISMO[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<RH_DIC_SECTORES_ABSENTISMO[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMObyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_DIC_SECTORES_ABSENTISMO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_DIC_SECTORES_ABSENTISMO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_DIC_SECTORES_ABSENTISMO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
