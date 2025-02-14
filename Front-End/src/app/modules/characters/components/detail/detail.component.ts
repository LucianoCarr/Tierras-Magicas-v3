import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';
import { Element } from '../../../../models/elements.model';
import { Realm } from '../../../../models/realms.model';
import { RealmService } from '../../../../services/realm.service';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  Personaje: Character = new Character();
  realms: Realm[] = []
  elements: Element[] = [
    { id: 1, name: 'Agua' },
    { id: 2, name: 'Tierra' },
    { id: 3, name: 'Fuego' },
    { id: 4, name: 'Aire' }
  ]
  id: number | null = null;

   constructor(
      private characterService: CharacterService,
      private realmService: RealmService,
      private activatedRoute:ActivatedRoute,
    ){
      this.id = this.activatedRoute.snapshot.params['id'];
    }
    
    ngOnInit(
    ): void {
      this.getRealms()
      // Traer datos de realm por id`
      if(this.id) this.getDetail(this.id)
    }

    getDetail(id: number) {
      this.characterService.detail(id)
        .then(res => {
          if (res && res.Personaje) {
            const characterData = Array.isArray(res.Personaje) ? res.Personaje[0] : res.Personaje;
    
            // Asigna los valores al personaje
            this.Personaje.id = characterData.id;
            this.Personaje.name = characterData.name;
            this.Personaje.image = characterData.image;
            this.Personaje.power = characterData.power;
            this.Personaje.description = characterData.description;
    
            // Buscar el nombre del reino y elemento por ID
        const realmData = this.realms.find((realm: Realm) => realm.id === characterData.realmId);
        const elementData = this.elements.find((element: Element) => element.id === characterData.elementId);

        this.Personaje.realm = realmData ? realmData.name : 'Desconocido';
        this.Personaje.element = elementData ? elementData.name : 'Ninguno';
          }
        })
        .catch(error => {
          console.error('Error al obtener detalles del personaje:', error);
        });
    }

    getRealms() {
      this.realmService.all()
        .then((res) => {
          this.realms = res || []; // Asigna los reinos obtenidos al array realms
        })
        .catch((error) => {
          console.error('Error al obtener los reinos:', error);
        });
    }
    
  
}
