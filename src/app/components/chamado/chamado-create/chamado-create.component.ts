import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chamado-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado: Chamado = {
    prioridade:   '',
    status:       '',
    titulo:       '',
    observacoes:  '',
    tecnico:      '',
    cliente:      '',
    nomeCliente:  '',
    nomeTecnico:  '',
  }

  prioridade:  FormControl = new FormControl(null, [Validators.required]);
  status:      FormControl = new FormControl(null, [Validators.required]);
  titulo:      FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico:     FormControl = new FormControl(null, [Validators.required]);
  cliente:     FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }
  
  cancelar() {
    this.router.navigate(['/chamados']);
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
           this.status.valid     &&
           this.titulo.valid     &&
           this.observacoes.valid  &&
           this.tecnico.valid    &&
           this.cliente.valid;
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe( resposta => {
      this.toast.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['/chamados']);
    }, ex => {
      this.toast.error(ex.error);
    })
  }

}
