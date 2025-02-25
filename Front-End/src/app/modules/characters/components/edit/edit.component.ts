import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Element } from '../../../../models/elements.model';
import { Constants } from '../../../../../app.settings';

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
  imagePreview: string | null = null;
  defaultImage = Constants.IMG;

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private realmService: RealmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    /* this.activatedRoute.snapshot.queryParams['search']; */  // trae info de querys -> ruta?search=text

    /**
     * 
     * DESDE EL TEMPLATE
     <a [routerLink]="['/productos']" [queryParams]="{ id: 123, categoria: 'electronica' }">
      Ver producto
      </a>

      DESDE EL Component
      this.router.navigate(['/productos'], { 
        queryParams: { id: 123, categoria: 'electronica', productos:'loquesea' }
      });
      http://tusitio.com/productos?id=123&categoria=electronica&productos=loquesea

      const id = this.activatedRoute.snapshot.queryParams['id'];
      const categoria  = this.activatedRoute.snapshot.queryParams['categoria'];
      const prodcutos  = this.activatedRoute.snapshot.queryParams['productos'];
      search(){
        const searchValue = this.form.value;
        this.router.navigate(['/productos'], { 
          queryParams: { search: searchValue }
        });
      }
     */
    
      
      
      
    this.id = this.activatedRoute.snapshot.params['id']; // trae info de los params -> route ruta/:param  
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [this.validarImagen]],
      realm: [null, Validators.required],
      power: [null, [Validators.required, Validators.min(1)]],
      element: [null, Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getRealms();
    if (this.id) this.getEdit(this.id);
  }

  ngOnChanges() {
    if (this.Personaje) {
      this.editForm.patchValue({ name: this.Personaje.name });
    }
  }

  getEdit(id: number) {
    this.characterService.detail(id)
      .then(res => {
        if (res && res.Personaje) {
          const characterData = Array.isArray(res.Personaje) ? res.Personaje[0] : res.Personaje;

          this.Personaje = characterData; // Guardar el personaje completo
          this.imagePreview = characterData.image || this.defaultImage; // Asignar imagen
          this.Personaje.realm = characterData.realms?.name || 'Desconocido';
          this.Personaje.element = characterData.elements?.name || 'Ninguno';

          // Poblar el formulario con los datos obtenidos
          this.editForm.patchValue({
            name: characterData.name || '',
            image: characterData.image || this.defaultImage,
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
    if (this.editForm.valid && this.id) {
      // Si la URL de la imagen está vacía, se debe asignar la imagen predeterminada
      if (!this.editForm.value.image) {
        this.editForm.patchValue({ image: this.defaultImage });
      }
  
    const characterData = { ...this.editForm.value };
  
    // Convertir IDs correctamente
    characterData.realmId = Number(characterData.realm);
    characterData.elementId = Number(characterData.element);
    delete characterData.realm;
    delete characterData.element;
  
    this.characterService.edit(this.id, characterData)
      .then(() => {
        this.router.navigate(['/character/all']);
      })
      .catch(error => console.error('Error al actualizar el personaje:', error));
  }
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
