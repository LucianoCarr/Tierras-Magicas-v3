import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchComponent
  ]
})
export class SearchModule { }
