import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RH_DIC_CACIFOS } from 'app/entidades/RH_DIC_CACIFOS';

@Injectable()
export class RHDICCACIFOSService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_DIC_CACIFOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_DIC_CACIFOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_DIC_CACIFOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_CACIFOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAlllivres(): Observable<RH_DIC_CACIFOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_CACIFOS2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<RH_DIC_CACIFOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_DIC_CACIFOSbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  atualizacaCacifoUtilizador(id, utilizador): Observable<RH_DIC_CACIFOS[]> {
    const url = webUrl.host + '/rest/sirb/atualizacaCacifoUtilizador/' + id + '/' + utilizador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  atualizacaCacifo(id, utilizador): Observable<RH_DIC_CACIFOS[]> {
    const url = webUrl.host + '/rest/sirb/atualizacaCacifo/' + id + '/' + utilizador;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_DIC_CACIFOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_DIC_CACIFOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_DIC_CACIFOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}