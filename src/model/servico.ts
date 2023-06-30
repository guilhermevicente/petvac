import { Pet } from 'src/model/pet';

export class Servico {
  id: string;
  descricao: string;
  data: string;
  pet: Pet;

  constructor(id: string, descricao: string, data: string, pet: Pet) {
    this.id = id;
    this.descricao = descricao;
    this.data = data;
    this.pet = pet;
  }

  public static clone(servico: Servico) {
    let u: Servico = new Servico(servico.id, servico.descricao, servico.data, servico.pet);
    u.descricao = servico.descricao;
    u.data = servico.data;
    u.pet = servico.pet;
    return u;
  }
}
