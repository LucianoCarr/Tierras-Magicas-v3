import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {





  mostrarPassword() {
    let cambio = document.getElementById("floatingPassword") as HTMLInputElement;
    let showPass = document.getElementById("showPass") as HTMLElement;
    
    if (cambio.type === "password") {
      cambio.type = "text";
      showPass.setAttribute("class", 'bi bi-eye-fill');
    } else {
      cambio.type = "password";
      showPass.setAttribute("class", 'bi bi-eye-slash');
    }
  }



}
