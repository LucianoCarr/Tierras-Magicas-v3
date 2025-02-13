import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../models/character.model';
import { HeaderComponent } from "../../../others/header/header.component";

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  character: Character = new Character();
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
            this.character.id = characterData.id;
            this.character.name = characterData.name;
            this.character.image = characterData.image;
            this.character.power = characterData.power;
            this.character.description = characterData.description;
    
            // Agregar datos adicionales
            this.character.realm = characterData.realm?.name || 'Desconocido';
            this.character.element = characterData.elements?.name || 'Ninguno';
          }
        })
        .catch(error => {
          console.error('Error al obtener detalles del personaje:', error);
        });
    }
    
  
}
