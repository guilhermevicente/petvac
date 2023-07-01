import { Injectable } from '@angular/core';
import { Vacina } from 'src/model/vacina';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';

@Injectable({
  providedIn: 'root',
})
export class VacinaStorageService {
  vacinas!: Vacina[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.preencherVacinas();
  }

  isExist(id: string): boolean {
    this.preencherVacinas();

    for (let u of this.vacinas) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherVacinas() {
    this.buscarVacinas().subscribe(
      (data: Vacina[]) => {
        if (!data || data.length == 0) {
          alert('Vacinas não encontradas!');
        }
        this.vacinas = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  buscarVacinas(): Observable<Vacina[]> {
    return this.httpClient.get<Vacina[]>(`${RoutesAPI.VACINAS}`);
  }

  save(vacina: Vacina): Observable<Vacina> {
    return this.httpClient.post<Vacina>(`${RoutesAPI.VACINAS}`, JSON.stringify(vacina), this.httpOptions);
  }

  update(vacina: Vacina):  Observable<Vacina> {
    return this.httpClient.put<Vacina>(`${RoutesAPI.VACINAS}/${vacina.id}`, JSON.stringify(vacina), this.httpOptions);
  }

  delete(id: string) {
    return this.httpClient.delete<Vacina>(`${RoutesAPI.VACINAS}/${id}`, this.httpOptions);
  }
}
