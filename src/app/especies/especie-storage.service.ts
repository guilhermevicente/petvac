import { Especie } from './../../model/especie';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecieStorageService {
  URL = 'http://localhost:3000/especies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  async getEspecies(): Promise<Especie[] | undefined> {
    try {
      const observable = this.httpClient.get<Especie[]>(`${this.URL}`);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  }
}
