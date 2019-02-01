import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { GER_ARMAZEM } from 'app/entidades/GER_ARMAZEM';

@Injectable()
export class GERARMAZEMService {
  handleError: any;
  
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private headers2 = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }
  
    create(data: GER_ARMAZEM) {
      return this.http
        .post(webUrl.host + '/rest/sirb/createGER_ARMAZEM', JSON.stringify(data), { headers: this.headers })
        .map(this.extractData)
        .catch((error: any) => Observable.throw('Server error'));
    }
  
    getAll(): Observable<GER_ARMAZEM[]> {
      const url = webUrl.host + '/rest/sirb/getGER_ARMAZEM';
      return this.http
        .get(url)
        .map(this.extractData)
        .catch((error: any) => Observable.throw('Server error'));
    }
  
    getAll_silver() {
      const url = webUrl.host + '/rest/sirb/getArmazem';
      return this.http
        .get(url)
        .map(this.extractData)
        .catch((error: any) => Observable.throw('Server error'));
    }
    
    getStock(data) {
      return this.http
      .post(webUrl.host + '/rest/sirb/getStock', JSON.stringify(data), { headers: this.headers2 })
        .map(this.extractData)
        .catch((error: any) => Observable.throw('Server error'));
    }

    delete(id) {
      return this.http
        .delete(webUrl.host + '/rest/sirb/deleteGER_ARMAZEM/' + id + '')
        .toPromise()
        .then(res => res)
        .catch(this.handleError);
    }
  
    update(data: GER_ARMAZEM) {
      return this.http
        .put(webUrl.host + '/rest/sirb/updateGER_ARMAZEM', JSON.stringify(data), { headers: this.headers })
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
  
  
  
    private extractData(res: Response) {
      let body = res.json();
      return body;
    }
  }