import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Credenciais } from '../../models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatFormFieldModule,
             MatInputModule,
             ReactiveFormsModule,
             FormsModule
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  logar() {
    this.toastr.error('Usuario e/ou senha inválidos!', 'Login');
    this.creds.senha = '';
  }

  validaCampos(): boolean {
    if(this.email.valid && this.senha.valid){
      return true;
    } else {
      return false;
    }
  }

}
