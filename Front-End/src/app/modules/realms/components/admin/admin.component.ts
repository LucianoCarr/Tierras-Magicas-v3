import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CharacterPerRealm } from '../../../../models/realms.model';
import { RealmService } from '../../../../services/realm.service';
import { SkyButtonComponent } from "../../../others/sky-button/sky-button.component";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, SkyButtonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {

  realmPerCharacter: CharacterPerRealm[] = [];

  constructor(private realmService: RealmService) {}

  ngOnInit() {
    this.CharacterPerRealm();
  }

  //CON NOMBRE DE REINO Y ELEMENTO
  CharacterPerRealm() {
    this.realmService.admin()
      .then(res => {
        if (res && Array.isArray(res.Reino)) {
          this.realmPerCharacter = res.Reino.map(realm => ({
            ...realm,
            characters: realm.characters?.map(character => ({
              ...character,
              realmName: realm.name,
              elementName: character.elements?.name || "Ninguno"
            })) || [] // Evitar undefined si no hay personajes
          }));
        }
      })
      .catch(error => {
        console.error('Error al obtener los reinos:', error);
      });
    }

       /* BOTON SUBIR ARRIBA */
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
}