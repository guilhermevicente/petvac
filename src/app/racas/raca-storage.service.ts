import { Injectable } from '@angular/core';
import { Raca } from 'src/model/raca';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RacaStorageService {
  racas!: Raca[];
  URL = 'http://localhost:3000/racas';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  async getRacas(): Promise<Raca[] | undefined> {
    try {
      const observable = this.httpClient.get<Raca[]>(`${this.URL}`);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  }
}
