import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-create',
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
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {

  tecnico: Tecnico = {
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
              private service: TecnicoService,
              private toast: ToastrService
  ) { }

  cancelar() {
    this.router.navigate(['/tecnicos']);
  }

  validaCampos(): boolean { 
    return this.nome.valid 
    && this.cpf.valid 
    && this.email.valid 
    && this.senha.valid;
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.toast.success('Cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['/tecnicos']);
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
    this.router.navigate(['/tecnicos']);    
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }
    else {
      this.tecnico.perfis.push(perfil);
    }
  }

}
