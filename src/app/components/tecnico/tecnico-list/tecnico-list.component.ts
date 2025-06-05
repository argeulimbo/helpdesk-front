import { Component, ViewChild } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [ RouterModule, 
             MatTableModule,
             MatPaginator
  ],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.css'
})
export class TecnicoListComponent {

  ELEMENT_DATA: Tecnico[] = [
    { 
      id: 1,
      nome: 'Argeu Souza',
      cpf: '822.432.998-10',
      email: 'argeu@sonner.com.br',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '15/08/2024'
    }
  ]

  displayedColumns: string[] = ['idTecnico', 'nomeTecnico', 'cpfTecnico', 'emailTecnico', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  ngOnInit(): void{
  }  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}