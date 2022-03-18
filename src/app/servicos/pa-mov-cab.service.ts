import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { PA_MOV_CAB } from 'app/entidades/PA_MOV_CAB';

@Injectable()
export class PAMOVCABService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: PA_MOV_CAB) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createPA_MOV_CAB', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CAB';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPA_MOV_CABbyTIPO(tipo, data): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABbyTIPO/' + tipo;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPA_MOV_CABbyTIPOASSOCIAR(tipo, data): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABbyTIPOASSOCIAR/' + tipo;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPA_MOV_CABbyTIPOaccoes(tipo, data): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABbyTIPOaccoes/' + tipo;
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPA_MOV_CABAssociarPlanoEstrategico(id_plano_estrategico, id_plano_acao): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABAssociarPlanoEstrategico/' + id_plano_estrategico + '/' + id_plano_acao;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPA_MOV_CABRemoverPlanoEstrategico(idplano, id): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABRemoverPlanoEstrategico/' + idplano + '/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getById(ip): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getPlanosEstrategicosbyid(ip): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPlanosEstrategicosbyid/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getPA_MOV_CABbyidPlanoEstrategico(tipo, ip): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/getPA_MOV_CABbyidPlanoEstrategico/' + tipo + '/' + ip;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deletePA_MOV_CAB/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: PA_MOV_CAB) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updatePA_MOV_CAB', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updatePA_MOV_CAB_EVENTOS(id, utilizador): Observable<PA_MOV_CAB[]> {
    const url = webUrl.host + '/rest/sirb/updatePA_MOV_CAB_EVENTOS/' + id + '/' + utilizador;
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