import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { AB_DIC_TINA } from "app/entidades/AB_DIC_TINA";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Injectable()
export class ABDICTINAService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private globalVar: AppGlobals) { }

  create(data: AB_DIC_TINA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_DIC_TINA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_DIC_TINA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TINA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(idbanho): Observable<AB_DIC_TINA[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_DIC_TINA/'+idbanho;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<AB_DIC_TINA[]> {
    const url = webUrl.host + '/rest/sirb/getAB_DIC_TINAvbyid_tina/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_DIC_TINA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: AB_DIC_TINA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_DIC_TINA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}