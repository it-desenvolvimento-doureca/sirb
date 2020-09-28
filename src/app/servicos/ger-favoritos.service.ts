import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_FAVORITOS } from 'app/entidades/GER_FAVORITOS';

@Injectable()
export class GERFAVORITOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getbyid(id): Observable<GER_FAVORITOS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_FAVORITOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getUPDATETIPO_LISTA(id, tipo_lista) {
    const url = webUrl.host + '/rest/sirb/getUPDATETIPO_LISTA/' + id + '/' + tipo_lista;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  create(data: GER_FAVORITOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_FAVORITOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_FAVORITOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_FAVORITOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_FAVORITOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
