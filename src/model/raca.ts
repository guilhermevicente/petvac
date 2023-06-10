import { Especie } from "./especie";

export class Raca {
  id: number;
  nome: string;
  especie: Especie;

  constructor(id: number, nome: string, especie: Especie) {
    this.id = id;
    this.nome = nome;
    this.especie = especie;
  }
}
