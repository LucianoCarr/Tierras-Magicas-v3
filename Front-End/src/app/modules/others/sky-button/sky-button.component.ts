import { Component } from '@angular/core';

@Component({
  selector: 'app-sky-button',
  imports: [],
  templateUrl: './sky-button.component.html',
  styleUrl: './sky-button.component.css'
})
export class SkyButtonComponent {

  
   /* BOTON SUBIR ARRIBA */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
