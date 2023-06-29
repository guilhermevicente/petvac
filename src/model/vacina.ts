import { Pet } from 'src/model/pet';

export class Vacina {
  id: string;
  nome: string;
  dataVacina: string;
  dataProximaVacina: string;
  pet: Pet;

  constructor(id: string, nome: string, dataVacina: string, dataProximaVacina: string, pet: Pet) {
    this.id = id;
    this.nome = nome;
    this.dataVacina = dataVacina;
    this.dataProximaVacina = dataProximaVacina;
    this.pet = pet;
  }

  public static clone(vacina: Vacina) {
    let u: Vacina = new Vacina(vacina.id, vacina.nome, vacina.dataVacina, vacina.dataProximaVacina, vacina.pet);
    u.nome = vacina.nome;
    u.dataVacina = vacina.dataVacina;
    u.dataProximaVacina = vacina.dataProximaVacina;
    u.pet = vacina.pet;
    return u;
  }
}
