import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { EMAIL } from "app/entidades/EMAIL";

@Injectable()
export class EmailService {
 private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }
  
  enviarEmail(data : EMAIL) {
    return this.http
      .post(webUrl.host + '/rest/sirb/sendemail', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
