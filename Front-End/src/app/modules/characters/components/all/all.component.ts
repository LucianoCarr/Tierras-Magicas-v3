import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../models/character.model';

@Component({
  selector: 'app-all',
  imports: [CommonModule, RouterModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})

export class AllComponent implements OnInit {

  characters: Character[]= []

  
  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
   }
  
  //MOSTRAR Personajes
  getCharacters() {
    this.characterService.all()
      .then(res => {
        this.characters = res.map(character => {
          if (character.image) {
            // Si la imagen ya es una URL, la mantiene, sino, la concatena con la base de imágenes
            character.image = character.image.startsWith('http') 
              ? character.image 
              : `http://localhost:5000/img/${character.image}`;
          } else {
            // Imagen por defecto si no hay ninguna
            character.image = 'http://localhost:5000/img/default.jpg';
          }
          return character;
        });
      })
      .catch(error => {
        console.error('Error al obtener los Personajes:', error);
      });
  }
  
  
}