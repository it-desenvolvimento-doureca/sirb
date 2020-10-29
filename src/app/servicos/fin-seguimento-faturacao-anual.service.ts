import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';

@Injectable()
export class FINSEGUIMENTOFATURACAOANUALService {

  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  GET_SEGUIMENTO_FATURACAO_BUDGET(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_BUDGET';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_ANOS(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_ANOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_ANOS_CLIENTES(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_ANOS_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_ANOS_OEM_VEICULO_PROJETO(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_ANOS_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_ANOS_REFERENCIAS(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_ANOS_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DESCONTOS(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DESCONTOS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DESCONTOS_CLIENTES(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DESCONTOS_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DESCONTOS_OEM_VEICULO_PROJETO(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DESCONTOS_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DESCONTOS_REFERENCIAS(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DESCONTOS_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DEVOLUCOES(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DEVOLUCOES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }


  GET_SEGUIMENTO_FATURACAO_DEVOLUCOES_REFERENCIAS(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DEVOLUCOES_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_DEVOLUCOES_OEM_VEICULO_PROJETO(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_DEVOLUCOES_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_2(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_2';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_2_CLIENTES(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_2_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_2_OEM_VEICULO_PROJETO(data, id) {
    data['ID_ANALISE'] = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_2_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_2_REFERENCIAS(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_2_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS(data, id) {
    data[0].ID_ANALISE = id;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_GENERICO_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO(data) {
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_CLIENTES(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_CLIENTES';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_OEM_VEICULO_PROJETO(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_OEM_VEICULO_PROJETO';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_REFERENCIAS(data, ano) {
    data[0].ANO = ano;
    const url = webUrl.host + '/rest/sirb/GET_SEGUIMENTO_FATURACAO_TOTAL_REALIZADO_REFERENCIAS';
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
