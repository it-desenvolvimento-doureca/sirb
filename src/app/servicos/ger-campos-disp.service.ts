import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_CAMPOS_DISP } from 'app/entidades/GER_CAMPOS_DISP';

@Injectable()
export class GERCAMPOSDISPService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getbyid(id): Observable<GER_CAMPOS_DISP[]> {
    const url = webUrl.host + '/rest/sirb/getGER_CAMPOS_DISPbyid/' + id;
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