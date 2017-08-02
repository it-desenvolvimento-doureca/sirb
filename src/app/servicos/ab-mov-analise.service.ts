import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from "webUrl";
import 'rxjs/Rx';
import { AB_MOV_ANALISE } from "app/entidades/AB_MOV_ANALISE";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Injectable()
export class ABMOVANALISEService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http, private globalVar: AppGlobals) { }

  create(data: AB_MOV_ANALISE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createAB_MOV_ANALISE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getallAB_MOV_ANALISE/' + this.globalVar.getlinha();
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteAB_MOV_ANALISE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  
  getbyID(id): Observable<AB_MOV_ANALISE[]> {
    const url = webUrl.host + '/rest/sirb/getAB_MOV_ANALISEbyid/' + id + '/' + this.globalVar.getlinha();
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: AB_MOV_ANALISE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateAB_MOV_ANALISE', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}