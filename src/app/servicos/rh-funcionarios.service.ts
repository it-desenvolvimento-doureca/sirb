import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RH_FUNCIONARIOS } from 'app/entidades/RH_FUNCIONARIOS';

@Injectable()
export class RHFUNCIONARIOSService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RH_FUNCIONARIOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRH_FUNCIONARIOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getGeral(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSGERAL';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAssiduidade(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSASSIDUIDADE';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getSectores(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSSECTORES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getCadencias(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSCADENCIA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getSectoresComparativa(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSSECTORESCOMPARATIVA';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getProdutividade(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSPRODUTIVIDADE';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  gerOperacoes(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSOPERACOES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getpausas(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSPAUSAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll2(data): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOS2';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAllAtivos(): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSAtivos';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyID(id): Observable<RH_FUNCIONARIOS[]> {
    const url = webUrl.host + '/rest/sirb/getRH_FUNCIONARIOSbyid/' + id + '';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRH_FUNCIONARIOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RH_FUNCIONARIOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRH_FUNCIONARIOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
