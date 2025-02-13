import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Character } from '../../../../models/character.model';
import { CharacterService } from '../../../../services/character.service';
import { Element } from '../../../../models/elements.model';
 
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
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private realmService: RealmService,
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      realm: [null, Validators.required],
      power: [null, [Validators.required, Validators.min(1)]], // No puede ser 0
      element: [null, Validators.required],
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

  this.characterService.create(this.createForm.value)
    .then(() => {
      this.router.navigate(['/realm/all']);
    })
    .catch(error => {
      console.error('Error al crear personaje:', error);
    });
}

}




