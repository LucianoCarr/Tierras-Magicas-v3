import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  Personaje: Character = new Character();
  id: number | null = null;

   constructor(
      private characterService: CharacterService,
      private activatedRoute:ActivatedRoute,
    ){
      this.id = this.activatedRoute.snapshot.params['id'];
    }
    
    ngOnInit(
    ): void {
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
    
            // Agregar datos adicionales
            this.Personaje.realm = characterData.realms?.name || 'Desconocido';
            this.Personaje.element = characterData.elements?.name || 'Ninguno';
          }
        })
        .catch(error => {
          console.error('Error al obtener detalles del personaje:', error);
        });
    }
    
  
}
