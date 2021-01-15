import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { RH_DIC_SECTORES_ABSENTISMO_LINHA } from 'app/entidades/RH_DIC_SECTORES_ABSENTISMO_LINHA';

@Injectable()
export class RHDICSECTORESABSENTISMOLINHAService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_DIC_SECTORES_ABSENTISMO_LINHA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_DIC_SECTORES_ABSENTISMO_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_DIC_SECTORES_ABSENTISMO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMO_LINHA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(id): Observable<RH_DIC_SECTORES_ABSENTISMO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMO_LINHAbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getSectoresAll(id): Observable<RH_DIC_SECTORES_ABSENTISMO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMO_LINHAgetSectoresAll/' + id ;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getSectoresAbsentismo(id): Observable<RH_DIC_SECTORES_ABSENTISMO_LINHA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_SECTORES_ABSENTISMO_LINHAgetSectoresAbsentismo/' + id ;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_DIC_SECTORES_ABSENTISMO_LINHA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_DIC_SECTORES_ABSENTISMO_LINHA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_DIC_SECTORES_ABSENTISMO_LINHA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}