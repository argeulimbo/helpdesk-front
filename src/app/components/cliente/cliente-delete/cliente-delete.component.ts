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
  selector: 'app-cliente-delete',
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
  ],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent {
  
    cliente: Cliente = {
        id:           '',
        nome:         '',
        cpf:          '',
        email:        '',
        senha:        '',
        perfis:       [],
        dataCriacao:  ''
      }
      
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
  
      findById(): void {
        this.service.findById(this.cliente.id).subscribe((resposta) => {
          resposta.perfis = [];
          this.cliente = resposta;
        })
      }

      delete(): void {
        this.service.delete(this.cliente.id).subscribe(() => {
          this.toast.success('Deletado com sucesso!', 'Delete');
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
      this.router.navigate(['/clientes']);
    }
    
}
