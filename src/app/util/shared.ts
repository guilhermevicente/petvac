import { Raca } from 'src/model/raca';
import { Especie } from './../../model/especie';
import { Pet } from './../../model/pet';
import { Constants } from './constants';

export class Shared {
  especies!: Especie[];

  constructor() {}

  public static initializeWebStorage(): void {
    let especieC = new Especie(1, "Cachorro");
    let especieG = new Especie(2, "Gato");

    localStorage.setItem(Constants.ESPECIES_KEY, JSON.stringify([ especieC, especieG]));

    let racaCD = new Raca(11, 'Dachshund', 1);
    let racaCB = new Raca(12, 'Buldogue', 1);
    let racaGA = new Raca(21, 'Angorá', 2);
    let racaGS = new Raca(22, 'Siamês', 2);

    localStorage.setItem(Constants.RACAS_KEY, JSON.stringify([ racaCD, racaCB, racaGA, racaGS]));

    let pet1 = new Pet('0', 'Lisa', '2023-06-10', racaCD, especieC);
    let pet2 = new Pet('1', 'Gigante', '2022-05-09', racaCB, especieC);
    let pet3 = new Pet('2', 'Mada', '2021-04-08', racaGA, especieG);

    localStorage.setItem(Constants.PETS_KEY, JSON.stringify([pet1, pet2, pet3]));
  }
}
