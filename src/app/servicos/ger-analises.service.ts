import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_ANALISES } from 'app/entidades/GER_ANALISES';

@Injectable()
export class GERANALISESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_ANALISES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_ANALISES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ANALISES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAllativas(): Observable<GER_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ANALISESativas';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyID(id): Observable<GER_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ANALISESbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getbyidmodulo(id): Observable<GER_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ANALISESbyidmodulo/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidmoduloativas(id): Observable<GER_ANALISES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_ANALISESbyidmoduloativas/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_ANALISES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_ANALISES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_ANALISES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}