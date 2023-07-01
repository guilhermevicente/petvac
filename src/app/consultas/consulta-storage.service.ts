import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { Consulta } from 'src/model/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaStorageService {
  consultas!: Consulta[];

  constructor(private httpClient: HttpClient) {
    this.preencherConsultas();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  delete(id: string) {
    return this.httpClient.delete<Consulta>(`${RoutesAPI.CONSULTAS}/${id}`, this.httpOptions);
  }

  buscarConsultas() {
    return this.httpClient.get<Consulta[]>(`${RoutesAPI.CONSULTAS}`);
  }

  isExist(id: string): boolean {
    this.preencherConsultas();

    for (let u of this.consultas) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherConsultas() {
    this.buscarConsultas().subscribe(
      (data: Consulta[]) => {
        if (!data || data.length == 0) {
          alert('Consultas não encontradas!');
        }
        this.consultas = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  save(consulta: Consulta): Observable<Consulta> {
    return this.httpClient.post<Consulta>(`${RoutesAPI.CONSULTAS}`, JSON.stringify(consulta), this.httpOptions);
  }

  update(consulta: Consulta):  Observable<Consulta> {
    return this.httpClient.put<Consulta>(`${RoutesAPI.CONSULTAS}/${consulta.id}`, JSON.stringify(consulta), this.httpOptions);
  }
}
