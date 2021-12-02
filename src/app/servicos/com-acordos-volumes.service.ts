import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_ACORDOS_VOLUMES } from 'app/entidades/COM_ACORDOS_VOLUMES';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMACORDOSVOLUMESService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_ACORDOS_VOLUMES) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_ACORDOS_VOLUMES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_ACORDOS_VOLUMES[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_VOLUMES';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS_VOLUMES/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id): Observable<COM_ACORDOS_VOLUMES[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_VOLUMESbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_ACORDOS_VOLUMES) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_VOLUMES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  deleteTODOS(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS_VOLUMES_TODOS/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}