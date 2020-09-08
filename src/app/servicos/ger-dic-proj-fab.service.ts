import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_DIC_PROJ_FAB } from 'app/entidades/GER_DIC_PROJ_FAB';

@Injectable()
export class GERDICPROJFABService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_DIC_PROJ_FAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_DIC_PROJ_FAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GER_DIC_PROJ_FAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_FABbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_DIC_PROJ_FAB[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_PROJ_FAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_DIC_PROJ_FAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_DIC_PROJ_FAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_DIC_PROJ_FAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
