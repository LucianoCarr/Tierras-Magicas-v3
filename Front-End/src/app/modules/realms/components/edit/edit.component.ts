import { Component, OnInit } from '@angular/core';
import { Realm } from '../../../../models/realms.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealmService } from '../../../../services/realm.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Constants } from '../../../../../app.settings';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  realm: Realm = new Realm();
  id: number | null = null;
  editForm: FormGroup;
  imagePreview: string | null = null;
  defaultImage = Constants.IMG;

  constructor(
    private fb: FormBuilder,
    private realmService: RealmService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [this.validarImagen]]
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
    this.realmService.detail(id)
      .then(res => {
        if (res && res.Reino) {
          this.realm = res.Reino;

          this.editForm.patchValue({ 
            name: res.Reino.name,
            image: res.Reino.image || this.defaultImage
          });
        }
      })
      .catch(error => console.error('Error al obtener los detalles del reino:', error));
  }
  

  updateRealm() {
    if (this.editForm.valid && this.id) {
      // Si la URL de la imagen está vacía, se debe asignar la imagen predeterminada
      if (!this.editForm.value.image) {
        this.editForm.patchValue({ image: this.defaultImage });
      }
      
      this.realmService.edit(this.id, this.editForm.value)  // Actualiza el reino con PUT
        .then(() => {
          this.router.navigate(['/realm/all']); // Redirige a /realm/all
        })
        .catch(error => {
          console.error('Error al actualizar el reino:', error);
        });
    }
  }

onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) { // Límite de 2MB
    alert('El archivo es demasiado grande. Máximo 2MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
    this.editForm.patchValue({ image: this.imagePreview });  // Actualiza el formulario con la nueva imagen
  };
  reader.readAsDataURL(file);
}


  /* VALIDAR IMAGEN */
  validarImagen(control: any) {
    const urlPattern = /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|webp)(\?.*)?$|^(http|https):\/\/.*$/i;
    const base64Pattern = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
  
    if (!control.value || urlPattern.test(control.value) || base64Pattern.test(control.value)) {
      return null; // ✅ Es válida
    }
    return { invalidImage: true }; // ❌ No es válida
  }
  
}
