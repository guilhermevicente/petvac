import { Constants } from 'src/app/util/constants';
import { PetSelecionadoComponent } from './../pet-selecionado/pet-selecionado.component';
import { Pet } from '../../model/pet';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { RoutesAPI } from '../util/routes-api';

import { WebStorageUtil } from 'src/app/util/web-storage-util';

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

  // Comentado para publicação no GitHub Pages
  /*save(pet: Pet): Observable<Pet> {
    return this.httpClient.post<Pet>(`${RoutesAPI.PETS}`, JSON.stringify(pet), this.httpOptions);
  }*/

  // Incluído para publicação no GitHub Pages
  save(pet: Pet) {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.pets.push(pet);
    WebStorageUtil.set(Constants.PETS_KEY, this.pets);
  }

  // Comentado para publicação no GitHub Pages
  /*update(pet: Pet):  Observable<Pet> {
    return this.httpClient.put<Pet>(`${RoutesAPI.PETS}/${pet.id}`, JSON.stringify(pet), this.httpOptions);
  }*/

  // Incluído para publicação no GitHub Pages
  update(pet: Pet) {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.delete(pet.nome);
    this.save(pet);
  }

  // Comentado para publicação no GitHub Pages
  /*delete(id: string) {
    return this.httpClient.delete<Pet>(`${RoutesAPI.PETS}/${id}`, this.httpOptions);
  }*/

  // Incluído para publicação no GitHub Pages
  delete(nome: string): boolean {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.pets = this.pets.filter((u) => {
      return u.nome?.valueOf() != nome?.valueOf();
    });

    WebStorageUtil.set(Constants.PETS_KEY, this.pets);
    return true;
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
    // Comentado para publicação no GitHub Pages
    /*this.buscarPets().subscribe(
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
    );*/

    // Incluído para publicação no GitHub Pages
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
  }

  buscarPets(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(`${RoutesAPI.PETS}`);
  }

  // Incluído para publicação no GitHub Pages
  getPets(): Pet[] {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    return this.pets;
  }
}
