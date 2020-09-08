import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { PLANEAMENTO_LINHAS } from 'app/entidades/PLANEAMENTO_LINHAS';

@Injectable()
export class PLANEAMENTOLINHASService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PLANEAMENTO_LINHAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPLANEAMENTO_LINHAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getby(id): Observable<PLANEAMENTO_LINHAS[]> {
    const url = webUrl.host + '/rest/sirb/getPLANEAMENTO_LINHASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PLANEAMENTO_LINHAS[]> {
    const url = webUrl.host + '/rest/sirb/getPLANEAMENTO_LINHAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePLANEAMENTO_LINHAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PLANEAMENTO_LINHAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePLANEAMENTO_LINHAS', JSON.stringify(data), { headers: this.headers })
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

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}