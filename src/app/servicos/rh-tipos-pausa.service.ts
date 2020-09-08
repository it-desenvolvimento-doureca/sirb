import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RH_TIPOS_PAUSA } from 'app/entidades/RH_TIPOS_PAUSA';

@Injectable()
export class RHTIPOSPAUSAService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_TIPOS_PAUSA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_TIPOS_PAUSA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_TIPOS_PAUSA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_TIPOS_PAUSA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllPAUSASSILVER() {
    const url = webUrl.host + '/rest/sirb/getAllPAUSASSILVER';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<RH_TIPOS_PAUSA[]> {
    const url = webUrl.host + '/rest/sirb/getRH_TIPOS_PAUSAbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_TIPOS_PAUSA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_TIPOS_PAUSA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_TIPOS_PAUSA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
