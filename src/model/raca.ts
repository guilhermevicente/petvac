import { Especie } from "./especie";

export class Raca {
  id: number;
  nome: string;
  especieId: number;

  constructor(id: number, nome: string, especieId: number) {
    this.id = id;
    this.nome = nome;
    this.especieId = especieId;
  }
}
