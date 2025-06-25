import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Credenciais } from '../../models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
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

  constructor(
    private toastr: ToastrService,
    private service: AuthService
  ) {}

  ngOnInit(): void {}

  logar () {
    this.service.authenticate(this.creds).subscribe(resposta => {
      const token = resposta.headers.get('Authorization')?.substring(7) ?? 'Token não encontrado!';
      this.service.sucessfulLogin(token);
      this.toastr.info(token);
    }, () => {
      this.toastr.error('Usuário e/ou senha inválidos');
      this.creds.senha = '';
    })
  }

  // Este abaixo funciona
  // logar () {
  //   this.service.authenticate(this.creds).subscribe(resposta => {
  //     this.toastr.info(resposta.headers.get('Authorization') ?? 'Token não encontrado!')
  //   }, () => {
  //     this.toastr.error('Usuário e/ou senha inválido!');
  //   })
  // }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
