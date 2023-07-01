import { Injectable } from '@angular/core';
import { Medicacao } from 'src/model/medicacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicacaoStorageService {
  medicacoes!: Medicacao[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.preencherMedicacoes();
  }

  delete(id: string) {
    return this.httpClient.delete<Medicacao>(`${RoutesAPI.MEDICACOES}/${id}`, this.httpOptions);
  }

  isExist(id: string): boolean {
    this.preencherMedicacoes();

    for (let u of this.medicacoes) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherMedicacoes() {
    this.buscarMedicacoes().subscribe(
      (data: Medicacao[]) => {
        if (!data || data.length == 0) {
          alert('Medicações não encontradas!');
        }
        this.medicacoes = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  buscarMedicacoes(): Observable<Medicacao[]> {
    return this.httpClient.get<Medicacao[]>(`${RoutesAPI.MEDICACOES}`);
  }

  save(medicacao: Medicacao): Observable<Medicacao> {
    return this.httpClient.post<Medicacao>(`${RoutesAPI.MEDICACOES}`, JSON.stringify(medicacao), this.httpOptions);
  }

  update(medicacao: Medicacao):  Observable<Medicacao> {
    return this.httpClient.put<Medicacao>(`${RoutesAPI.MEDICACOES}/${medicacao.id}`, JSON.stringify(medicacao), this.httpOptions);
  }
}
