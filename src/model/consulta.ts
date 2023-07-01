import { Pet } from 'src/model/pet';

export class Consulta {
  id: string;
  data: string;
  pet: Pet;

  constructor(id: string, data: string, pet: Pet) {
    this.id = id;
    this.data = data;
    this.pet = pet;
  }

  public static clone(consulta: Consulta) {
    let u: Consulta = new Consulta(consulta.id, consulta.data, consulta.pet);
    u.data = consulta.data;
    u.pet = consulta.pet;
    return u;
  }
}
