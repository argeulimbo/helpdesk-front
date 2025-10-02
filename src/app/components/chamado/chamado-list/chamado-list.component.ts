import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { Chamado } from '../../../models/chamado';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [
             RouterModule, 
             MatTableModule,
             MatPaginator,
             MatLabel,
             MatFormField,
             MatFormFieldModule,
             MatInputModule,
             MatIconModule
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'titulo', 'descricao', 'tecnico', 'cliente', 'nomeCliente', 'nomeTecnico'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
