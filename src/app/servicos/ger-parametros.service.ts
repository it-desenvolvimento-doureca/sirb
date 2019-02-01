import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_PARAMETROS } from 'app/entidades/GER_PARAMETROS';

@Injectable()
export class GERPARAMETROSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: GER_PARAMETROS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createGER_PARAMETROS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<GER_PARAMETROS[]> {
    const url = webUrl.host + '/rest/sirb/getGER_PARAMETROS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: GER_PARAMETROS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateGER_PARAMETROS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  atualizaData(hora, minutos, semana, tipo, data, id) {
    const url = webUrl.host + '/rest/sirb/getGER_PARAMETROSATUALIZADATA/' + hora + '/' + minutos + '/' + semana + '/' + tipo + '/' + id;
    return this.http
      .post(url, data, { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
