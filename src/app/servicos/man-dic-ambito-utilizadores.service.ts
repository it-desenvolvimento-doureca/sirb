import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_DIC_AMBITO_UTILIZADORES } from 'app/entidades/MAN_DIC_AMBITO_UTILIZADORES';
import { GER_UTILIZADORES } from 'app/entidades/GER_UTILIZADORES';

@Injectable()
export class MANDICAMBITOUTILIZADORESService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_DIC_AMBITO_UTILIZADORES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_DIC_AMBITO_UTILIZADORES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_DIC_AMBITO_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_AMBITO_UTILIZADORES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_DIC_AMBITO_UTILIZADORES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_DIC_AMBITO_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_AMBITO_UTILIZADORESbyid/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_DIC_AMBITO_UTILIZADORES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_DIC_AMBITO_UTILIZADORES', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getUtilizadores(id): Observable<GER_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_AMBITO_UTILIZADORES_ALLUSERS/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidequipa(id): Observable<MAN_DIC_AMBITO_UTILIZADORES[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_AMBITO_UTILIZADORES_EQUIPA/' + id;
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