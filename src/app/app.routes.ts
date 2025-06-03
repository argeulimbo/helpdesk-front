import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

import { MatCardModule } from '@angular/material/card';

export const routes: Routes = [
    { path: '', component: NavComponent, 
        children: [ 
            {path: 'home', component: HomeComponent} ] },
];

@NgModule( {
    imports: [RouterModule.forRoot(routes), 
              MatCardModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { } 