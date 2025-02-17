import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { RouterModule } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { Router } from '@angular/router';

//PARA CREAR EL COMPONENTE EN ESTA CARPETA
//ng g c modules/realms/components/all

@Component({
  selector: 'app-all',
  imports: [CommonModule, RouterModule, DeleteComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})


export class AllComponent implements OnInit {

  realms: Realm[] = [];

  deleteRealm: Realm | null = null; 
  deleteModalVisible: boolean = false;


   constructor(
    private realmService: RealmService,
    private router: Router
  ) {}
    
    ngOnInit(): void {
     this.getRealms();
    }
  
    //MOSTRAR REINOS
    getRealms(){
      // PROMESA
      this.realmService.all()
      .then(res=> {
        //manejar respuesta
        this.realms = res;
      })
      .catch(error=> {
        //manejar error
          console.error('Error al obtener los reinos:', error)
      })
    }
    

    /* ELIMINAR */
      deleteModal(id: number) {
        this.realmService.delete(id)
          .then(res => {
            this.deleteRealm = res.Reino;
          })
          .catch(error => {
            console.error('Error al traer el reino:', error);
          });
      }

      deleteOpen(realm: Realm) {
        this.deleteRealm = realm;        // Asigna el reino seleccionado
      }
    
      // Cerrar el modal de detalles
      deleteClose() {
        this.deleteRealm = null;         // Limpiar el reino seleccionado
      }

      confirmDelete(id: number) {
        this.realmService.delete(id)
          .then(() => {
            this.realms = this.realms.filter(realm => realm.id !== id); // Remueve el elemento eliminado
            this.deleteClose();
          })
          .catch(error => {
            console.error('Error al borrar el reino:', error);
          });
        }

           /* BOTON SUBIR ARRIBA */
          scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          
  }