import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_DIC_NIVEIS_CRITICIDADE } from 'app/entidades/MAN_DIC_NIVEIS_CRITICIDADE';

@Injectable()
export class MANDICNIVEISCRITICIDADEService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_DIC_NIVEIS_CRITICIDADE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_DIC_NIVEIS_CRITICIDADE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_DIC_NIVEIS_CRITICIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_NIVEIS_CRITICIDADE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_DIC_NIVEIS_CRITICIDADE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getbyIDDEPARTAMENTO(id): Observable<MAN_DIC_NIVEIS_CRITICIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_NIVEIS_CRITICIDADEbyIDDEPARTAMENTO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<MAN_DIC_NIVEIS_CRITICIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_NIVEIS_CRITICIDADEbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyNIVEL(nivel): Observable<MAN_DIC_NIVEIS_CRITICIDADE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_NIVEIS_CRITICIDADEbyNIVEL/' + nivel;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_DIC_NIVEIS_CRITICIDADE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_DIC_NIVEIS_CRITICIDADE', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}