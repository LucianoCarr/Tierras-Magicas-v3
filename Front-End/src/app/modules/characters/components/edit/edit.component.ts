import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Element } from '../../../../models/elements.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  Personaje: Character = new Character();
  realms: Realm[] = [];
  elements: Element[] = [
    { id: 1, name: 'Agua' },
    { id: 2, name: 'Tierra' },
    { id: 3, name: 'Fuego' },
    { id: 4, name: 'Aire' }
  ];
  id: number | null = null;
  editForm: FormGroup;
  imagePreview: string | null = null; // Para vista previa

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private realmService: RealmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      realm: [null, Validators.required],
      power: [null, [Validators.required, Validators.min(1)]],
      element: [null, Validators.required],
      description: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.getRealms();
    if (this.id) this.getEdit(this.id);
  }

  getEdit(id: number) {
    this.characterService.detail(id)
      .then(res => {
        if (res && res.Personaje) {
          const characterData = Array.isArray(res.Personaje) ? res.Personaje[0] : res.Personaje;

          this.Personaje = characterData; // Guardar el personaje completo
          this.imagePreview = characterData.image; // Asignar imagen
          this.Personaje.realm = characterData.realms?.name || 'Desconocido';
          this.Personaje.element = characterData.elements?.name || 'Ninguno';

          // Poblar el formulario con los datos obtenidos
          this.editForm.patchValue({
            name: characterData.name || '',
            image: characterData.image || '',
            realm: characterData.realmId || null,  // Usar realmId en lugar de realms
            power: characterData.power || 1,
            element: characterData.elementId || null,  // Usar elementId en lugar de elements
            description: characterData.description || 'No hay descripcion disponible',
          });
        }
      })
      .catch(error => console.error('Error al obtener detalles del personaje:', error));
  }

  updateCharacter() {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid || !this.id) return;
  
    const characterData = { ...this.editForm.value };
  
    // Convertir IDs correctamente
    characterData.realmId = Number(characterData.realm);
    characterData.elementId = Number(characterData.element);
    delete characterData.realm;
    delete characterData.element;
  
    console.log('Datos a enviar:', characterData);
  
    this.characterService.edit(this.id, characterData)
      .then(() => {
        console.log('Personaje actualizado correctamente');
        this.router.navigate(['/character/all']);
      })
      .catch(error => console.error('Error al actualizar el personaje:', error));
  }
  
  getRealms() {
    this.realmService.all()
      .then(res => {
        this.realms = res || [];
      })
      .catch(error => console.error('Error al obtener los reinos y elementos:', error));
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.editForm.patchValue({ image: this.imagePreview });
    };
    reader.readAsDataURL(file);
  }

  onImageError() {
    this.imagePreview = '/img/default.jpg';
  }
}
