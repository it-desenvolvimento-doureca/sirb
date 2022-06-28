
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GT_MOV_FICHEIROS } from 'app/entidades/GT_MOV_FICHEIROS';

@Injectable()
export class GTMOVFICHEIROSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GT_MOV_FICHEIROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGT_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidtarefa(id): Observable<GT_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_FICHEIROSbyidTAREFA/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyidtarefa2(id): Observable<GT_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_FICHEIROSbyidTAREFA2/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GT_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_FICHEIROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGT_MOV_FICHEIROS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GT_MOV_FICHEIROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGT_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getbyidFICHEIRO(id): Observable<GT_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getGT_MOV_FICHEIROSbyidFICHEIRO/' + id;
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
