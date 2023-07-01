import { Injectable } from '@angular/core';
import { RoutesAPI } from '../util/routes-api';
import { Exame } from 'src/model/exame';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExameStorageService {
  exames!: Exame[];

  constructor(private httpClient: HttpClient) {
    this.preencherExames();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  isExist(id: string): boolean {
    this.preencherExames();

    for (let u of this.exames) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherExames() {
    this.buscarExames().subscribe(
      (data: Exame[]) => {
        if (!data || data.length == 0) {
          console.log('Não há exames');
        }
        this.exames = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  buscarExames() {
    return this.httpClient.get<Exame[]>(`${RoutesAPI.EXAMES}`);
  }

  save(exame: Exame): Observable<Exame> {
    return this.httpClient.post<Exame>(`${RoutesAPI.EXAMES}`, JSON.stringify(exame), this.httpOptions);
  }

  update(exame: Exame):  Observable<Exame> {
    return this.httpClient.put<Exame>(`${RoutesAPI.EXAMES}/${exame.id}`, JSON.stringify(exame), this.httpOptions);
  }

  delete(id: string) {
    return this.httpClient.delete<Exame>(`${RoutesAPI.EXAMES}/${id}`, this.httpOptions);
  }
}
