import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';
import { Constants } from '../../../../../app.settings';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../others/header/header.component";


@Component({
  selector: 'app-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})


export class CreateComponent implements OnInit {

  realms: Realm[] = [];
  createdRealm!: { Reino: Realm }; // "!" o "?" para que el valor no tenga que ser inicializado y quede esperando
  createForm: FormGroup;


  constructor(
    private realmService: RealmService,
     private fb: FormBuilder,
     private router: Router
    ) {
    this.createForm = this.fb.group({
      //declaración de propiedades, valores iniciales, validadores.
      //propiedad: [ valorinicial, Validaciones]
      name: ['', Validators.required], // va entre []  cuando tiene más de 1 caracteristica. 
      image: [Constants.IMG]
    })
  }

  
  ngOnInit(): void {
  }

  save() {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) return;

    this.realmService.create(this.createForm.value)
      .then(() => {
        this.router.navigate(['/realm/all']); // Redirige después de crear
      })
      .catch(error => {
        console.error('Error al crear el reino:', error);
      });
  }

}

