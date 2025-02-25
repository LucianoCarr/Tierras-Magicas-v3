import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RealmService } from '../../../services/realm.service';
import { Realm } from '../../../models/realms.model';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../models/character.model';
import { Constants } from '../../../../app.settings';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, FormsModule,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  filteredResults: any[] = [];
  searchTerm: string = '';
  filteredRealms: Realm[] = [];
  filteredCharacters: Character[] = [];
  characters: Character[] = [];
  realms: Realm[] = [];
  defaultImage = Constants.IMG;
  

  openMenuId: number | null = null;


  constructor(
      private characterService: CharacterService,
      private realmService: RealmService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.getRealms();
    this.getCharacters();
  }

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

  getRealms(){
    this.realmService.all()
    .then(res=> {
      this.realms = res;
    })
    .catch(error=> {
        console.error('Error al obtener los reinos:', error)
    })
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredRealms = [];
      this.filteredCharacters = [];
      return;
    }
  
    // Filtrar reinos y personajes por separado
    this.filteredRealms = this.realms.filter(realm => realm.name.toLowerCase().includes(term));
    this.filteredCharacters = this.characters.filter(character => character.name.toLowerCase().includes(term));
    this.router.navigate(['/search'], { queryParams: { q: term } });
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
