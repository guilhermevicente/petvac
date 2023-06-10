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

    let racaCD = new Raca(11, 'Dachshund', especieC);
    let racaCB = new Raca(12, 'Buldogue', especieC);
    let racaGA = new Raca(21, 'Angorá', especieG);
    let racaGS = new Raca(22, 'Siamês', especieG);

    localStorage.setItem(Constants.RACAS_KEY, JSON.stringify([ racaCD, racaCB, racaGA, racaGS]));

    let pet1 = new Pet('Lisa', '2023-06-10', racaCD, especieC);
    let pet2 = new Pet('Gigante', '2022-05-09', racaCB, especieC);
    let pet3 = new Pet('Mada', '2021-04-08', racaGA, especieG);

    localStorage.setItem(Constants.PETS_KEY, JSON.stringify([pet1, pet2, pet3]));
  }
}
