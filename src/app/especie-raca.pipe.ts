import { Pipe, PipeTransform } from '@angular/core';
import { Especie } from 'src/model/especie';
import { Raca } from 'src/model/raca';

@Pipe({
  name: 'especieRaca'
})
export class EspecieRacaPipe implements PipeTransform {
  transform(rac: Especie, esp: Raca): string {
    return rac.nome + '/' + esp.nome;
  }
}
