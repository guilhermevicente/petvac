
import { Especie } from './especie';
import { Raca } from './raca';

export class Pet {
  id: string;
  nome: string;
  dataNascimento: string;
  raca: Raca;
  especie: Especie;

  constructor(id: string, nome: string, dataNascimento: string, raca: Raca, especie: Especie) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.raca = raca;
    this.especie = especie;
  }

  public static clone(pet: Pet) {
    let u: Pet = new Pet(pet.id, pet.nome, pet.dataNascimento, pet.raca, pet.especie);
    u.nome = pet.nome;
    u.dataNascimento = pet.dataNascimento;
    u.especie = pet.especie;
    u.raca = pet.raca;
    return u;
  }
}
