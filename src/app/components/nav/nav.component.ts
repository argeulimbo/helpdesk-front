import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { TecnicoListComponent } from '../tecnico/tecnico-list/tecnico-list.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    TecnicoListComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.router.navigate(['home']);
    }
  }
}