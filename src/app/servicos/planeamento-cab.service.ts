import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { PLANEAMENTO_CAB } from 'app/entidades/PLANEAMENTO_CAB';

@Injectable()
export class PLANEAMENTOCABService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PLANEAMENTO_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPLANEAMENTO_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<PLANEAMENTO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPLANEAMENTO_CABbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPLANEAMENTO_CABbyverificaseexiste(id, ano, semana, linha): Observable<PLANEAMENTO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPLANEAMENTO_CABbyverificaseexiste/' + id + '/' + ano + '/' + semana + '/' + linha;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll(): Observable<PLANEAMENTO_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPLANEAMENTO_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePLANEAMENTO_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PLANEAMENTO_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePLANEAMENTO_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  verificaOF(of) {
    const url = webUrl.host + '/rest/sirb/verificaOF/' + of;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verificaREF(ref) {
    const url = webUrl.host + '/rest/sirb/verificaREF/' + ref;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  ANALISE_PLANEAMENTO_BARRAS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/ANALISE_PLANEAMENTO_BARRAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}