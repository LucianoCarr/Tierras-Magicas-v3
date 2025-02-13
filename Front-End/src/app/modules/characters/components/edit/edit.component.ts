import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { HeaderComponent } from "../../../others/header/header.component";

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  character: Character = new Character();
  realms:Realm[] = [];
  id: number | null = null;
  editForm: FormGroup;


 constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private realmService: RealmService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      realm: [null, Validators.required],
      power: [null, [Validators.required, Validators.min(1)]],
      element: [null, Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getRealms();
    if(this.id) this.getEdit(this.id)
  }

  getEdit(id: number) {
    this.characterService.detail(id)
      .then(res => {
        if (res) {
          this.character = res.Personaje;
          this.editForm.patchValue({
            name: res.Personaje.name,
            realm: res.Personaje.realm,
            power: res.Personaje.power,
            element: res.Personaje.element,
            description: res.Personaje.description // Accede correctamente a 'description'
          });
        }
      })
      .catch(error => console.error('Error al obtener los detalles del Personaje:', error));
  }

  updateRealm() {
    if (this.editForm.valid && this.id) {
      this.characterService.edit(this.id, this.editForm.value)
        .then(() => {
          console.log('Personaje actualizado correctamente');
          this.router.navigate(['/character/all']);
        })
        .catch(error => {
          console.error('Error al actualizar el Personaje:', error);
        });
    }
  }

  getRealms() {
    this.realmService.all()
      .then(res => {
        this.realms = res;
      })
      .catch(error => console.error('Error al obtener los reinos:', error));
  }
}
