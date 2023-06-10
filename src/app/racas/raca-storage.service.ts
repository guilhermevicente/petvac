import { Especie } from './../../model/especie';
import { Constants } from 'src/app/util/constants';

import { Injectable } from '@angular/core';

import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Raca } from 'src/model/raca';

@Injectable()
export class RacaStorageService {
  racas!: Raca[];

  constructor() {
    this.racas = WebStorageUtil.get(Constants.RACAS_KEY);
  }

  getRacas(): Raca[] {
    return this.racas;
  }
}
