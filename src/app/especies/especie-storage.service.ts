import { Especie } from './../../model/especie';
import { Constants } from 'src/app/util/constants';

import { Injectable } from '@angular/core';

import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class EspecieStorageService {
  especies!: Especie[];

  constructor() {
    this.especies = WebStorageUtil.get(Constants.ESPECIES_KEY);
  }

  getEspecies(): Especie[] {
    return this.especies;
  }
}
