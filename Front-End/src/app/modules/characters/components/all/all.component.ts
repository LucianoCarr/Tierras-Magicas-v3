import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../models/character.model';
import { DeleteComponent } from '../delete/delete.component';
import { HostListener } from '@angular/core';
import { SkyButtonComponent } from "../../../others/sky-button/sky-button.component";

@Component({
  selector: 'app-all',
  imports: [CommonModule, RouterModule, DeleteComponent, SkyButtonComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})

export class AllComponent implements OnInit {

  characters: Character[]= []

    deletecharacter: Character | null = null; 
    deleteModalVisible: boolean = false;

    openMenuId: number | null = null;
  
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
  
   /* ELIMINAR */
        deleteModal(id: number) {
          this.characterService.delete(id)
            .then(res => {
              this.deletecharacter = res.Personaje;
            })
            .catch(error => {
              console.error('Error al traer el Personaje:', error);
            });
        }
  
        deleteOpen(character: Character) {
          this.deletecharacter = character;        // Asigna el Personaje seleccionado
        }
      
        // Cerrar el modal de detalles
        deleteClose() {
          this.deletecharacter = null;         // Limpiar el Personaje seleccionado
        }
  
        confirmDelete(id: number) {
          this.characterService.delete(id)
            .then(() => {
              this.characters = this.characters.filter(character => character.id !== id); // Remueve el elemento eliminado
              this.deleteClose();
            })
            .catch(error => {
              console.error('Error al borrar el Personaje:', error);
            });
          }

          /* MENU DESPLEGABLE */
          toggleMenu(characterId: number) {
            this.openMenuId = this.openMenuId === characterId ? null : characterId;
          }
          
          // Cerrar el menú si se hace clic fuera
          @HostListener('document:click')
          closeMenu() {
            this.openMenuId = null;
          }
}