import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { REU_AMBITOS_REUNIOES_PARTICIPANTES } from 'app/entidades/REU_AMBITOS_REUNIOES_PARTICIPANTES';

@Injectable()
export class REUAMBITOSREUNIOESPARTICIPANTESService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: REU_AMBITOS_REUNIOES_PARTICIPANTES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createREU_AMBITOS_REUNIOES_PARTICIPANTES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<REU_AMBITOS_REUNIOES_PARTICIPANTES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_AMBITOS_REUNIOES_PARTICIPANTESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<REU_AMBITOS_REUNIOES_PARTICIPANTES[]> {
    const url = webUrl.host + '/rest/sirb/getREU_AMBITOS_REUNIOES_PARTICIPANTES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteREU_AMBITOS_REUNIOES_PARTICIPANTES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: REU_AMBITOS_REUNIOES_PARTICIPANTES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateREU_AMBITOS_REUNIOES_PARTICIPANTES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
