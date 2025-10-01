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
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent {
  
    tecnico: Tecnico = {
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
                  private service: TecnicoService,
                  private toast: ToastrService
      ) { }
    
      cancelar() {
        this.router.navigate(['/tecnicos']);
      }
  
      ngOnInit(): void {
        this.tecnico.id = this.route.snapshot.paramMap.get('id')!;
        this.findById();
      }
  
      findById(): void {
        this.service.findById(this.tecnico.id).subscribe((resposta) => {
          resposta.perfis = [];
          this.tecnico = resposta;
        })
      }
    
      delete(): void {
        this.service.delete(this.tecnico.id).subscribe((resposta) => {
          this.toast.success('Deletado com sucesso!', 'Delete');
        }, ex => {
          if(ex.error.errors){
            ex.error.errors.array.forEach((element: any) => {
              this.toast.error(element.message);
              this.router.navigate(['tecnicos']);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        })
      }
}
