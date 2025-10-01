import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-update',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})

export class ClienteUpdateComponent {

  cliente: Cliente = {
      id:           '',
      nome:         '',
      cpf:          '',
      email:        '',
      senha:        '',
      perfis:       [],
      dataCriacao:  ''
    }
  
    nome: FormControl = new FormControl(null, Validators.minLength(3));
    cpf: FormControl = new FormControl(null, Validators.required);
    email: FormControl = new FormControl(null, Validators.email);
    senha: FormControl = new FormControl(null, Validators.minLength(3));
    
    constructor(private router: Router,
                private route: ActivatedRoute,
                private service: ClienteService,
                private toast: ToastrService
    ) { }
  
    cancelar() {
      this.router.navigate(['/clientes']);
    }

    ngOnInit(): void {
      this.cliente.id = this.route.snapshot.paramMap.get('id')!;
      this.findById();
    }
  
    validaCampos(): boolean { 
      return this.nome.valid 
      && this.cpf.valid 
      && this.email.valid 
      && this.senha.valid;
    }

    findById(): void {
      this.service.findById(this.cliente.id).subscribe((resposta) => {
        resposta.perfis = [];
        this.cliente = resposta;
      })
    }
  
    update(): void {
      this.service.update(this.cliente).subscribe((resposta) => {
        this.toast.success('Atualizado com sucesso!', 'Update');
        this.router.navigate(['/clientes']);
      }, ex => {
        if(ex.error.errors){
          ex.error.errors.forEach((element: any) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      })
    }
  
    addPerfil(perfil: any): void {
      if(this.cliente.perfis.includes(perfil)){
        this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      }
      else {
        this.cliente.perfis.push(perfil);
      }
    }
}
