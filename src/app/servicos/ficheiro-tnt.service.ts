import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { LG_ANALISE_ENVIOS } from 'app/entidades/LG_ANALISE_ENVIOS';

@Injectable()
export class FICHEIROTNTService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'multipart/form-data' });
  constructor(private http: Http) { }

  importFicheirosTNT(file, user) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(webUrl.host + '/rest/sirb/importFicheirosTNT/' + user, file, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }


  create(data: LG_ANALISE_ENVIOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createLG_ANALISE_ENVIOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<LG_ANALISE_ENVIOS[]> {
    const url = webUrl.host + '/rest/sirb/getLG_ANALISE_ENVIOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<LG_ANALISE_ENVIOS[]> {
    const url = webUrl.host + '/rest/sirb/getLG_ANALISE_ENVIOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteLG_ANALISE_ENVIOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: LG_ANALISE_ENVIOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateLG_ANALISE_ENVIOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}
