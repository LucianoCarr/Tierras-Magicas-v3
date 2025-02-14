import { Component, OnInit } from '@angular/core';
import { Realm, Character } from '../../../../models/realms.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RealmService } from '../../../../services/realm.service';


@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent implements OnInit {

  realm: Realm = new Realm();
  id: number | null = null;

  constructor(
    private realmService: RealmService,
    private activatedRoute:ActivatedRoute,
  ){
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  
  ngOnInit(
  ): void {
    // Traer datos de realm por id`
    if(this.id) this.getDetail(this.id)
  }
  
  ngOnChanges() {}
  
  
  getDetail(id:number){
    this.realmService.detail(id)
    .then(res => {
      if (res && res.Reino) {
        // Suponemos que res.Reino puede venir como array o como objeto único
        const realmData = Array.isArray(res.Reino) ? res.Reino[0] : res.Reino;

          // Guardar los datos del reino
          this.realm.name = realmData.name;
          this.realm.image = realmData.image;

        // Extraer los personajes y agregar datos adicionales
        if (realmData.characters && Array.isArray(realmData.characters)) {
          this.realm.characters = realmData.characters.map((character: Character) => ({
            ...character,
            realmName: realmData.name,                           // Agrega el nombre del reino al personaje
            elementName: character.elements?.name || 'Ninguno'     // Si no hay elemento, usa 'Ninguno'
          }));
        } else {
          this.realm.characters = []; // Si no hay personajes, asigna un array vacío
        }
      }
    })
    .catch(error=> {
      console.error('Error al detalles del reinos:', error)
    })
  }
}
