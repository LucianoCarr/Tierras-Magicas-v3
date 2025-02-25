import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

  const routes: Routes = [
    //{ path: '', redirectTo:'/realm/all', pathMatch:'full'},
    { path: '', component: SearchComponent }, 
    { path: '**', redirectTo:'/realm/all', pathMatch:'full'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
