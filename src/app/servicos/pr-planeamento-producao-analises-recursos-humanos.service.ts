import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS } from 'app/entidades/PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS';

@Injectable()
export class PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getById(ip): Observable<PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS[]> {
    const url = webUrl.host + '/rest/sirb/getPR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOSbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePR_PLANEAMENTO_PRODUCAO_ANALISES_RECURSOS_HUMANOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
