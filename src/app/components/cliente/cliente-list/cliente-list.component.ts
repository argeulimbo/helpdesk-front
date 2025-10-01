import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [ RouterModule, 
             MatTableModule,
             MatPaginator,
             MatLabel,
             MatFormField,
             MatFormFieldModule,
             MatInputModule,
             MatIconModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {

  ELEMENT_DATA: Cliente[] = []

  displayedColumns: string[] = ['idCliente', 'nomeCliente', 'cpfCliente', 'emailCliente', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void{
    this.findAll();
  }  

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}