import { Constants } from 'src/app/util/constants';
import { PetSelecionadoComponent } from './../pet-selecionado/pet-selecionado.component';
import { Pet } from '../../model/pet';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class PetStorageService {
  pets!: Pet[];
  private petSource!: BehaviorSubject<number>;
  constructor() {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.petSource = new BehaviorSubject<number>(this.pets.length);
  }

  save(pet: Pet) {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.pets.push(pet);
    WebStorageUtil.set(Constants.PETS_KEY, this.pets);
  }

  update(pet: Pet) {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.delete(pet.nome);
    this.save(pet);
  }

  delete(nome: string): boolean {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    this.pets = this.pets.filter((u) => {
      return u.nome?.valueOf() != nome?.valueOf();
    });

    WebStorageUtil.set(Constants.PETS_KEY, this.pets);
    return true;
  }

  isExist(nome: string): boolean {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    for (let u of this.pets) {
      if (u.nome?.valueOf() == nome?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getPets(): Pet[] {
    this.pets = WebStorageUtil.get(Constants.PETS_KEY);
    return this.pets;
  }

  notifyTotalPets() {
    this.petSource.next(this.getPets()?.length);
  }
}
