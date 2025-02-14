import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Character } from '../../../../models/character.model';
import { CharacterService } from '../../../../services/character.service';
import { Element } from '../../../../models/elements.model';
import { Constants } from '../../../../../app.settings';
 
@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  
  createForm:FormGroup;
  realms:Realm[] = [];
  characters: Character[] = [];
  elements: Element[] = []; 
  defaultImage = Constants.IMG; // Imagen por defecto
  imagePreview: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private realmService: RealmService,
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      //image: [Constants.IMG],
      image: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/)]], // Validar URL
      realm: [null, Validators.required],
      power: [null, [Validators.required, Validators.min(1)]], // No puede ser 0
      //element: [null, Validators.required],
      description: [''],
   })
}

ngOnInit(){
  this.getRealms()
  this.getElements()
}

getRealms() {
  this.realmService.all()
  .then((res) => {
    this.realms = res;
  })
  .catch((error) => {
    console.log(error);
  })
}

getElements() {
  this.characterService.all()
    .then(res => {
      this.elements = res;
    })
    .catch(error => {
      console.error('Error al obtener elementos:', error);
    });
}

save() {
  this.createForm.markAllAsTouched();
  if (this.createForm.invalid) return;

  // Si el campo 'image' está vacío, asignar la imagen por defecto
  if (!this.createForm.value.image) {
    this.createForm.patchValue({ image: this.defaultImage });
  }

  console.log('Imagen guardada:', this.createForm.value.image); // Verificar qué se está enviando

  this.characterService.create(this.createForm.value)
    .then(() => {
      this.router.navigate(['/character/all']);
    })
    .catch(error => {
      console.error('Error al crear personaje:', error);
    });
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
    this.createForm.patchValue({ image: this.imagePreview }); // Guardar en el formulario
  };
  reader.readAsDataURL(file);
}

}




