import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { PE_MOV_FICHEIROS } from 'app/entidades/PE_MOV_FICHEIROS';

@Injectable()
export class PEMOVFICHEIROSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PE_MOV_FICHEIROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPE_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidplano(id): Observable<PE_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_FICHEIROSbyidPLANO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll(): Observable<PE_MOV_FICHEIROS[]> {
    const url = webUrl.host + '/rest/sirb/getPE_MOV_FICHEIROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePE_MOV_FICHEIROS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PE_MOV_FICHEIROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePE_MOV_FICHEIROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
