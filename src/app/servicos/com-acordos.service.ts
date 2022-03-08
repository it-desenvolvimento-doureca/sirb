import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { COM_ACORDOS } from 'app/entidades/COM_ACORDOS';
import { webUrl } from 'assets/config/webUrl';
import { Observable } from "rxjs/Observable";

@Injectable()
export class COMACORDOSService {
  handleError: any;


  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: COM_ACORDOS) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createCOM_ACORDOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  COM_ACORDOS_ANALISE(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  COM_ACORDOS_ANALISE_1(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE_1', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  COM_ACORDOS_ANALISE_2(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE_2', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  COM_ACORDOS_ANALISE_3(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE_3', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  COM_ACORDOS_ANALISE_ACORDOS(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE_ACORDOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  COM_ACORDOS_ANALISE_CLIENTES(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/COM_ACORDOS_ANALISE_CLIENTES', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getAll2(): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS2';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id, versao) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteCOM_ACORDOS/' + id + '/' + versao)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyid(id, versao): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOSbyid/' + id + '/' + versao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getversoes(id, versao): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_VERSOES/' + id + '/' + versao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyid2(id, versao): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOSbyid2/' + id + '/' + versao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  valida_acordo(id_contrato, id_referencia, id_acordo): Observable<COM_ACORDOS[]> {
    const url = webUrl.host + '/rest/sirb/getCOM_ACORDOS_VALIDA_ACORDO/' + id_contrato + '/' + id_referencia + '/' + id_acordo;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: COM_ACORDOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update_NOVA_VERSAO(data: COM_ACORDOS) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_NOVA_VERSAO', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  updateESTADO(data: COM_ACORDOS, tipo, tipo2) {
    return this.http
      .post(webUrl.host + '/rest/sirb/updateCOM_ACORDOS_ESTADO/' + tipo + '/' + tipo2, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}