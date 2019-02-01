import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { webUrl } from 'assets/config/webUrl';
import { GER_SECCAO_CHEFES } from '../entidades/GER_SECCAO_CHEFES';
import { GER_UTILIZADORES } from '../entidades/GER_UTILIZADORES';

@Injectable()
export class GERSECCAOCHEFESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_SECCAO_CHEFES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_SECCAO_CHEFES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_SECCAO_CHEFES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_CHEFES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getByid(id): Observable<GER_SECCAO_CHEFES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_CHEFESbyid/'+id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUtilizadores(id): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_CHEFESbyUtilizadores/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidgrupo(id): Observable<GER_SECCAO_CHEFES[]> {
    const url = webUrl.host + '/rest/sirb/getGER_SECCAO_CHEFESbyidgrupo/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_SECCAO_CHEFES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_SECCAO_CHEFES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_SECCAO_CHEFES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}