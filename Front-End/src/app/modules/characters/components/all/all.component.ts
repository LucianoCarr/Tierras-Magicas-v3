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
        //console.log('Datos recibidos:', res); // Verifica la estructura de los datos
        this.characters = res.map(character => {
          // Construye la URL completa de la imagen
          character.image = `http://localhost:5000/img/${character.image}`;
          //console.log('URL de la imagen:', character.image); // Verifica las URLs de las imágenes
          return character;
        });
        //console.log('Personajes asignados:', this.characters); // Verifica que los personajes se asignen correctamente
      })
      .catch(error => {
        console.error('Error al obtener los Personajes:', error);
      });
  }
  
}