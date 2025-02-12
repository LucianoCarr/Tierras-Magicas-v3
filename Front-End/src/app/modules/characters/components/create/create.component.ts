import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RealmService } from '../../../../services/realm.service';
import { Realm } from '../../../../models/realms.model';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  
  form:FormGroup;
  realms:Realm[] = [];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private realmService: RealmService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      realm: [null, Validators.required],
   })
}

ngOnInit(){
  this.realmService.all()
  .then((res) => {
    this.realms = res;
  })
  .catch((error) => {
    console.log(error);
  })
}
}




