import { Pet } from 'src/model/pet';

export class Medicacao {
  id: string;
  nome: string;
  posologia: string;
  pet: Pet;

  constructor(id: string, nome: string, posologia: string, pet: Pet) {
    this.id = id;
    this.nome = nome;
    this.posologia = posologia;
    this.pet = pet;
  }

  public static clone(medicacao: Medicacao) {
    let u: Medicacao = new Medicacao(medicacao.id, medicacao.nome, medicacao.posologia, medicacao.pet);
    u.nome = medicacao.nome;
    u.posologia = medicacao.posologia;
    u.pet = medicacao.pet;
    return u;
  }
}
