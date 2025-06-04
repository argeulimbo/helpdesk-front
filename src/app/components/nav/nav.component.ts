import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }
}