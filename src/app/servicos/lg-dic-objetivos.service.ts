import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { LG_DIC_OBJETIVOS } from 'app/entidades/LG_DIC_OBJETIVOS';

@Injectable()
export class LGDICOBJETIVOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: LG_DIC_OBJETIVOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createLG_DIC_OBJETIVOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<LG_DIC_OBJETIVOS[]> {
    const url = webUrl.host + '/rest/sirb/getLG_DIC_OBJETIVOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByIp(id): Observable<LG_DIC_OBJETIVOS[]> {
    const url = webUrl.host + '/rest/sirb/getLG_DIC_OBJETIVOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteLG_DIC_OBJETIVOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: LG_DIC_OBJETIVOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateLG_DIC_OBJETIVOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}