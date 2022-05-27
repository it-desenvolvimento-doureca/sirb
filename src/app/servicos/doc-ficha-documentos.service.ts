import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";
import { DOC_FICHA_DOCUMENTOS } from 'app/entidades/DOC_FICHA_DOCUMENTOS';

@Injectable()
export class DOCFICHADOCUMENTOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: DOC_FICHA_DOCUMENTOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createDOC_FICHA_DOCUMENTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<DOC_FICHA_DOCUMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_FICHA_DOCUMENTOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteDOC_FICHA_DOCUMENTOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<DOC_FICHA_DOCUMENTOS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_FICHA_DOCUMENTOSbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: DOC_FICHA_DOCUMENTOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateDOC_FICHA_DOCUMENTOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}