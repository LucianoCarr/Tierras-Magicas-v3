import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealmsRoutingModule } from './realms-routing.module';
import { AllComponent } from './components/all/all.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RealmsRoutingModule,
    AllComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
  ]
})
export class RealmsModule { }
