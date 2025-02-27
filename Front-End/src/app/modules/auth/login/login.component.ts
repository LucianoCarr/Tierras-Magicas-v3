/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Constants } from '../../../../app.settings';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup
  isLogged!:boolean

constructor(
  private fb: FormBuilder, 
  private _auth:AuthService, 
  private router:Router){
  this.loginForm= this.fb.group({
    username:['', [Validators.required]],
    password:['', [Validators.required]]
  })  
}


ngOnInit(){
  if(this.isLogged)this.router.navigate([''])
}

onLogin(){
  this.loginForm.markAllAsTouched()
  if(this.loginForm.invalid) return;
    const data = this.loginForm.value
  this._auth.auth(data.username, data.password)
  .then(res => {
      this.router.navigate([''])
    })
    .catch((err) => {
     
    })
}


mostrarPassword(){
  let cambio  = document.getElementById("floatingPassword") as HTMLInputElement;
    let showPass  = document.getElementById("showPass") as HTMLElement
    if(cambio.type == "password"){
      cambio.type= "text";
      showPass.setAttribute("class", 'bi bi-eye-fill');
    }else{
      cambio.type = "password";
      showPass.setAttribute("class", 'bi bi-eye-slash');
    }
}
}
 */




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogged!: boolean;

  constructor(
    private fb: FormBuilder, 
    private _auth: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambié 'username' por 'email'
      password: ['', [Validators.required]]
    });  
  }

  ngOnInit() {
    if (this.isLogged) this.router.navigate(['']);
  }

  onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value;
    this._auth.login({ email, password }).subscribe({
      next: (res) => {
        localStorage.setItem('authToken', res.token); // Guarda el token si el backend lo envía
        this.router.navigate(['/perfil']); // Redirige al perfil después de login
      },
      error: (err) => {
        console.error('Error en login', err);
      }
    });
  }
  

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
