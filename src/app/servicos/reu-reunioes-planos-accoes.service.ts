import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { REU_REUNIOES_PLANOS_ACCOES } from 'app/entidades/REU_REUNIOES_PLANOS_ACCOES';

@Injectable()
export class REUREUNIOESPLANOSACCOESService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: REU_REUNIOES_PLANOS_ACCOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createREU_REUNIOES_PLANOS_ACCOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidreuniao(id): Observable<REU_REUNIOES_PLANOS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_PLANOS_ACCOESbyid_reuniao/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidambito(id): Observable<REU_REUNIOES_PLANOS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_PLANOS_ACCOESbyid_ambito/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<REU_REUNIOES_PLANOS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_PLANOS_ACCOESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<REU_REUNIOES_PLANOS_ACCOES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_REUNIOES_PLANOS_ACCOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteREU_REUNIOES_PLANOS_ACCOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: REU_REUNIOES_PLANOS_ACCOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateREU_REUNIOES_PLANOS_ACCOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}