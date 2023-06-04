import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  data: string;
  user: string;
  constructor() {
    this.data = new Date().toLocaleString();
    // Mockado, quando o login estiver pronto ficará dinâmico
    this.user = 'Guilherme';
  }

  ngOnInit(): void {}
}
