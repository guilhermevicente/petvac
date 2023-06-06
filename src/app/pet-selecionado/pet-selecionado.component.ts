import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-selecionado',
  templateUrl: './pet-selecionado.component.html',
  styleUrls: ['./pet-selecionado.component.css']
})
export class PetSelecionadoComponent {
  @Input() nomePet: string = "";

  constructor() {}
}
