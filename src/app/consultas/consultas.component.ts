import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {

  constructor(private router: Router) {}

  abrirExames() {
    var idConsulta = (<HTMLInputElement>document.getElementById('id-consulta')).value;
    this.router.navigate(['/consultas/exames', idConsulta]);
  }
}
