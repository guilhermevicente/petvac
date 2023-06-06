import { Component } from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent {
  nomePet: string;

  constructor() {
    this.nomePet = "";
  }

  nomearPet(event: any) {
    this.nomePet = event.target.value;
  }
}
