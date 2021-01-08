import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_REFERENCIAS_FASTRESPONSE_REJEICOES } from 'app/entidades/GER_REFERENCIAS_FASTRESPONSE_REJEICOES';

@Injectable()
export class GERREFERENCIASFASTRESPONSEREJEICOESService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_REFERENCIAS_FASTRESPONSE_REJEICOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_REFERENCIAS_FASTRESPONSE_REJEICOES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAll(): Observable<GER_REFERENCIAS_FASTRESPONSE_REJEICOES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_REFERENCIAS_FASTRESPONSE_REJEICOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<GER_REFERENCIAS_FASTRESPONSE_REJEICOES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_REFERENCIAS_FASTRESPONSE_REJEICOESbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByData(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/getGER_REFERENCIAS_FASTRESPONSE_REJEICOESbydata', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_REFERENCIAS_FASTRESPONSE_REJEICOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_REFERENCIAS_FASTRESPONSE_REJEICOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_REFERENCIAS_FASTRESPONSE_REJEICOES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
