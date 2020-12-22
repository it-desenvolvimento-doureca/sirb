import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA } from 'app/entidades/QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA';

@Injectable()
export class QUADICTIPOSAUDITORIAQTDPREVISTAService {
  handleError: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById(ip): Observable<QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTAbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getById_ano(ip, ano): Observable<QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA[]> {
    const url = webUrl.host + '/rest/sirb/getQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTAbyid_ano/' + ip + '/' + ano;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateQUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
