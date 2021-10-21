import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_DIC_EDIFICIOS } from 'app/entidades/MAN_DIC_EDIFICIOS';

@Injectable()
export class MANDICEDIFICIOSService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_DIC_EDIFICIOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_DIC_EDIFICIOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_DIC_EDIFICIOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_EDIFICIOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_DIC_EDIFICIOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_DIC_EDIFICIOS[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_DIC_EDIFICIOSbyid/' + id + '/0';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_DIC_EDIFICIOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_DIC_EDIFICIOS', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}