import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { Observable } from 'rxjs';
import { Servico } from 'src/model/servico';

@Injectable({
  providedIn: 'root',
})
export class ServicoStorageService {
  servicos!: Servico[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.preencherServicos();
  }

  delete(id: string) {
    return this.httpClient.delete<Servico>(`${RoutesAPI.SERVICOS}/${id}`, this.httpOptions);
  }

  isExist(id: string): boolean {
    this.preencherServicos();

    for (let u of this.servicos) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherServicos() {
    this.buscarServicos().subscribe(
      (data: Servico[]) => {
        if (!data || data.length == 0) {
          alert('Serviços não encontradas!');
        }
        this.servicos = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  buscarServicos(): Observable<Servico[]> {
    return this.httpClient.get<Servico[]>(`${RoutesAPI.SERVICOS}`);
  }

  save(servico: Servico): Observable<Servico> {
    return this.httpClient.post<Servico>(`${RoutesAPI.SERVICOS}`, JSON.stringify(servico), this.httpOptions);
  }

  update(servico: Servico):  Observable<Servico> {
    return this.httpClient.put<Servico>(`${RoutesAPI.SERVICOS}/${servico.id}`, JSON.stringify(servico), this.httpOptions);
  }
}
