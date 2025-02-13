import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CharacterPerRealm } from '../../../../models/realms.model';
import { RealmService } from '../../../../services/realm.service';
import { HeaderComponent } from "../../../others/header/header.component";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {

  realmPerCharacter: CharacterPerRealm[] = [];

  constructor(private realmService: RealmService) {}

  ngOnInit() {
    this.CharacterPerRealm();
  }

  //SIMPLE
 /*  CharacterPerRealm() {
    this.realmService.admin()
    .then(res => {
      if (res && res.Reino) {
        this.realmPerCharacter = res.Reino; // Asignamos directamente porque ya coincide con la clase
      }
    })
    .catch(error=> {
      //manejar error
        console.error('Error al obtener los reinos:', error)
    })
  } */


    
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
}