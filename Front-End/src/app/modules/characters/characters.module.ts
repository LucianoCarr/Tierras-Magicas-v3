import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { AllComponent } from './components/all/all.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    AllComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
  ]
})
export class CharactersModule { }
