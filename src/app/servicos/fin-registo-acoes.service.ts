import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { FIN_REGISTO_ACOES } from 'app/entidades/FIN_REGISTO_ACOES';

@Injectable()
export class FINREGISTOACOESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: FIN_REGISTO_ACOES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createFIN_REGISTO_ACOES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid(id): Observable<FIN_REGISTO_ACOES[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_REGISTO_ACOESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidFICHEIRO(id): Observable<FIN_REGISTO_ACOES[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_REGISTO_ACOESbyidFICHEIRO/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }
  
  getAll(): Observable<FIN_REGISTO_ACOES[]> {
    const url = webUrl.host + '/rest/sirb/getFIN_REGISTO_ACOES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteFIN_REGISTO_ACOES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: FIN_REGISTO_ACOES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateFIN_REGISTO_ACOES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
