import { AfterViewInit, Component } from '@angular/core';

import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'petvac';

  ngAfterViewInit(): void {
      //M.Sidenav.init(this.sideNav?.nativeElement);
  }
}
