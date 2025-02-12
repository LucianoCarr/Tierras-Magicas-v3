import { Component, OnInit, OnChanges } from '@angular/core';
import { Realm } from '../../../../models/realms.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealmService } from '../../../../services/realm.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit, OnChanges {

  realm: Realm = new Realm();
  id: number | null = null;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private realmService: RealmService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.id) this.getEdit(this.id)
  }

  ngOnChanges() {
    if (this.realm) {
      this.editForm.patchValue({ name: this.realm.name });
    }
  }

  getEdit(id: number) {
    this.realmService.detail(id) // Usa el servicio existente
      .then(res => {
        if (res && res.Reino) {
          this.realm = res.Reino;
          this.editForm.patchValue({ 
            name: res.Reino.name
          });
        }
      })
      .catch(error => console.error('Error al obtener los detalles del reino:', error));
  }
  

  updateRealm() {
    if (this.editForm.valid && this.id) {
      this.realmService.edit(this.id, this.editForm.value) // Actualiza el reino con PUT
        .then(() => {
          console.log('Reino actualizado correctamente');
          this.router.navigate(['/realm/all']); // Redirige a /realm/all
        })
        .catch(error => {
          console.error('Error al actualizar el reino:', error);
        });
    }
  }
  
  
}
