import { Shared } from './../util/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isWorkingInPage = false;

  ngOnInit(): void {
    //Shared.initializeWebStorage();
  }
}
