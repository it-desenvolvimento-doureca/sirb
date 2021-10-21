import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import { MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE } from 'app/entidades/MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE';

@Injectable()
export class MANMOVMANUTENCAOCONTRATOSSUPORTEService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createMAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteMAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }



  getbyID(id): Observable<MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE[]> {
    const url = webUrl.host + '/rest/sirb/getMAN_MOV_MANUTENCAO_CONTRATOS_SUPORTEbyid/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  update(data: MAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateMAN_MOV_MANUTENCAO_CONTRATOS_SUPORTE', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}