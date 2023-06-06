import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent {
  idConsulta: number;

  constructor(private route: ActivatedRoute) {
    this.idConsulta = 0;
  }

  ngOnInit(): void {
    let idConsulta: number = +this.route.snapshot.paramMap.get('idConsulta')!;
    this.idConsulta = idConsulta;
  }
}
