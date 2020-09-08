import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { FICHEIROS_PAGINAS } from 'app/entidades/FICHEIROS_PAGINAS';

@Injectable()
export class FICHEIROSPAGINASService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: FICHEIROS_PAGINAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createFICHEIROS_PAGINAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<FICHEIROS_PAGINAS[]> {
    const url = webUrl.host + '/rest/sirb/getFICHEIROS_PAGINAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getById(ip): Observable<FICHEIROS_PAGINAS[]> {
    const url = webUrl.host + '/rest/sirb/getFICHEIROS_PAGINASbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getByPagina(id, pagina): Observable<FICHEIROS_PAGINAS[]> {
    const url = webUrl.host + '/rest/sirb/getFICHEIROS_PAGINASbyPagina/' + id + '/' + pagina;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getFICHEIROS_PAGINASCONTRATOS(id, versao): Observable<FICHEIROS_PAGINAS[]> {
    const url = webUrl.host + '/rest/sirb/getFICHEIROS_PAGINASCONTRATOS/' + id + '/' + versao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteFICHEIROS_PAGINAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: FICHEIROS_PAGINAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateFICHEIROS_PAGINAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }




  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}