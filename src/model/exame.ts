import { Pet } from 'src/model/pet';

export class Exame {
  id: string;
  idConsulta: string;
  data: string;
  pet: Pet;
  descricao: string;

  constructor(id: string, idConsulta: string, data: string, pet: Pet, descricao: string) {
    this.id = id;
    this.idConsulta = idConsulta;
    this.data = data;
    this.pet = pet;
    this.descricao = descricao;
  }

  public static clone(exame: Exame) {
    let u: Exame = new Exame(exame.id, exame.idConsulta, exame.data, exame.pet, exame.descricao);
    u.idConsulta = exame.idConsulta;
    u.data = exame.data;
    u.pet = exame.pet;
    u.descricao = exame.descricao;
    return u;
  }
}
