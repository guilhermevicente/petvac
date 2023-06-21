import { Constants } from 'src/app/util/constants';
import { PetSelecionadoComponent } from './../pet-selecionado/pet-selecionado.component';
import { Pet } from '../../model/pet';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { WebStorageUtil } from 'src/app/util/web-storage-util';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PetStorageService {
  pets!: Pet[];
  URL = 'http://localhost:3000/pets';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.preencherPets();
  }

  async save(pet: Pet) {
    const observable = await this.httpClient.post<Pet>(`${this.URL}`, JSON.stringify(pet), this.httpOptions);
    return lastValueFrom(observable);
  }

  async update(pet: Pet) {
    const observable = await this.httpClient.put<Pet>(`${this.URL}/${pet.id}`, JSON.stringify(pet), this.httpOptions);
    return lastValueFrom(observable);
  }

  async delete(id: string) {
    const observable = await this.httpClient.delete<Pet>(`${this.URL}/${id}`, this.httpOptions);
    return lastValueFrom(observable);
  }

  isExist(id: string): boolean {
    this.preencherPets();

    for (let u of this.pets) {
      if (u.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  preencherPets() {
    this.buscarPets().then((pts: Pet[] | undefined) => {
      if (pts !== undefined) {
        this.pets = pts;
      }
    }).catch((e) => {
      console.log('Não foi possível buscar a lista de especies');
    });;
  }

  async buscarPets(): Promise<Pet[]> {
    const observable = await this.httpClient.get<Pet[]>(`${this.URL}`);
    return lastValueFrom(observable);
  }
}
