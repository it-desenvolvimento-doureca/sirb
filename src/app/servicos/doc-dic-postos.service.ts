import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DOC_DIC_POSTOS } from 'app/entidades/DOC_DIC_POSTOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";


@Injectable()
export class DOCDICPOSTOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: DOC_DIC_POSTOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createDOC_DIC_POSTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<DOC_DIC_POSTOS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_DIC_POSTOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteDOC_DIC_POSTOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<DOC_DIC_POSTOS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_DIC_POSTOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: DOC_DIC_POSTOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateDOC_DIC_POSTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}