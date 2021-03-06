import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { GER_DIC_VEICULO } from 'app/entidades/GER_DIC_VEICULO';

@Injectable()
export class GERDICVEICULOService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_DIC_VEICULO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_DIC_VEICULO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<GER_DIC_VEICULO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_VEICULObyid_zona/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_DIC_VEICULO[]> {
    const url = webUrl.host + '/rest/sirb/getGER_DIC_VEICULO';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteGER_DIC_VEICULO/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: GER_DIC_VEICULO) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_DIC_VEICULO', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  verifica(data: GER_DIC_VEICULO) {
    return this.http
      .post(webUrl.host + '/rest/sirb/verificaGER_DIC_VEICULO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
