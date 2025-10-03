import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    MatDrawer
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;  

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.router.navigate(['home']);
    }
  }

  toggleNav(): void {
    if (this.drawer) {
      this.drawer.toggle();
      this.cdr.detectChanges();
    }
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toastr.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000 } );
  }

}