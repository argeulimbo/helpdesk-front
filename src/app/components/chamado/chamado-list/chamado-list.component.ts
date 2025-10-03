import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chamado-list',
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
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'titulo', 'descricao', 'tecnico', 'cliente', 'nomeCliente', 'nomeTecnico'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
