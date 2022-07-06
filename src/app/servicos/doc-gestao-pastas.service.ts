import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";
import { DOC_GESTAO_PASTAS } from 'app/entidades/DOC_GESTAO_PASTAS';

@Injectable()
export class DOCGESTAOPASTASService {

  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: DOC_GESTAO_PASTAS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createDOC_GESTAO_PASTAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<DOC_GESTAO_PASTAS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_GESTAO_PASTAS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteDOC_GESTAO_PASTAS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<DOC_GESTAO_PASTAS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_GESTAO_PASTASbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  verificaCAMINHO(id, caminho): Observable<DOC_GESTAO_PASTAS[]> {
    const url = webUrl.host + '/rest/sirb/getDOC_GESTAO_PASTAS_VERIFICACAMINHO/' + encodeURIComponent(caminho) + '/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: DOC_GESTAO_PASTAS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateDOC_GESTAO_PASTAS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
