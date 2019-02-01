import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_SECCAO_UTZ } from '../entidades/GER_SECCAO_UTZ';
import { GER_UTILIZADORES } from '../entidades/GER_UTILIZADORES';

@Injectable()
export class GERSECCAOUTZService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_SECCAO_UTZ) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_SECCAO_UTZ', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_SECCAO_UTZ[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_UTZ';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByid(id): Observable<GER_SECCAO_UTZ[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_UTZbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUtilizadores(id): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_UTZbyUtilizadores/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidgrupo(id): Observable<GER_SECCAO_UTZ[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_UTZbyidgrupo/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_SECCAO_UTZ/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_SECCAO_UTZ) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_SECCAO_UTZ', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
