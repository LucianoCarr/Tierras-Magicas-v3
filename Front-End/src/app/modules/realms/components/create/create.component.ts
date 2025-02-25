import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Constants } from '../../../../../app.settings';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})


export class CreateComponent implements OnInit {

  realms: Realm[] = [];
  createdRealm!: { Reino: Realm }; // "!" o "?" para que el valor no tenga que ser inicializado y quede esperando
  createForm: FormGroup;
  imagePreview: string | null = null; // Para vista previa de imagen
  defaultImage = Constants.IMG; // ✅ Hacer disponible Constants.IMG



  constructor(
    private realmService: RealmService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [this.validarImagen]]
    });
  }
  
  ngOnInit(): void {
  }

    save() {
      this.createForm.markAllAsTouched();
      if (this.createForm.invalid) return;
    
      if (!this.createForm.value.image) {
        this.createForm.patchValue({ image: this.defaultImage });
      }
    
      this.realmService.create(this.createForm.value)
        .then(() => this.router.navigate(['/realm/all']))
        .catch(error => console.error('Error al crear el reino:', error));
    }
    
  
    /* GUARDAR IMAGENES Y MAX DE TAMAÑO */
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
      this.createForm.patchValue({ image: this.imagePreview }); // Guardar en el formulario
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