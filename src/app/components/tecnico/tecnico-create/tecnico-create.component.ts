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
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  
  constructor(private router: Router) { }

  cancelar() {
    this.router.navigate(['/tecnicos']);
  }

  validaCampos(): boolean { 
    return this.nome.valid 
    && this.cpf.valid 
    && this.email.valid 
    && this.senha.valid;
  }
}
