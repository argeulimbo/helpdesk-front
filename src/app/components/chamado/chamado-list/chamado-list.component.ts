import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { ChamadoService } from '../../../services/chamado.service';
import { MatIconModule } from '@angular/material/icon';
import { Chamado } from '../../../models/chamado';
import { TecnicoService } from '../../../services/tecnico.service';
import { ClienteService } from '../../../services/cliente.service';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [
              RouterModule,
              MatTableModule,
              MatTable,
              MatPaginator,
              MatLabel,
              MatFormField,
              MatFormFieldModule,
              MatInputModule,
              MatIconModule,
              MatInput,
              MatRadioButton,
              MatRadioModule
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = [ ];
  FILTERED_DATA: Chamado[] = [ ];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ChamadoService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
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

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'ANDAMENTO'
    } else if (status == '2') {
      return 'ENCERRADO'
    } else {
      throw new Error('Status inválido');
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  retornaTecnico(id: any): string {
    let nome = '';
    this.tecnicoService.findById(id).subscribe(resposta => {
      nome = resposta.nome;
    })
    return nome;
  }

  retornaCliente(id: any): string {
    let nome = '';
    this.clienteService.findById(id).subscribe(resposta => {
    nome = resposta.nome;
    })
    return nome;
  }

  orderByStatus(status: any): void {
    let lista: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status) {
        lista.push(element);
      }
    });
    this.FILTERED_DATA = lista;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

}
