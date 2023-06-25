import { Constants } from 'src/app/util/constants';
import { PetSelecionadoComponent } from './../pet-selecionado/pet-selecionado.component';
import { Pet } from '../../model/pet';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { RoutesAPI } from '../util/routes-api';
@Injectable({
  providedIn: 'root',
})
export class PetStorageService {
  pets!: Pet[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.preencherPets();
  }

  save(pet: Pet): Observable<Pet> {
    return this.httpClient.post<Pet>(`${RoutesAPI.PETS}`, JSON.stringify(pet), this.httpOptions);
  }

  update(pet: Pet):  Observable<Pet> {
    return this.httpClient.put<Pet>(`${RoutesAPI.PETS}/${pet.id}`, JSON.stringify(pet), this.httpOptions);
  }

  delete(id: string) {
    return this.httpClient.delete<Pet>(`${RoutesAPI.PETS}/${id}`, this.httpOptions);
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
    this.buscarPets().subscribe(
      (data: Pet[]) => {
        if (!data || data.length == 0) {
          alert('Pets não encontrados!');
        }
        this.pets = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  buscarPets(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(`${RoutesAPI.PETS}`);
  }
}
