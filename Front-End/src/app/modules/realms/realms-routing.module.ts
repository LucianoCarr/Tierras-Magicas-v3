import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';

  const routes: Routes = [
    /* { path: '', redirectTo:'all', pathMatch:'full'}, */
    { path: 'all', component: AllComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'delete/:id', component: DeleteComponent },  
    { path: '**', redirectTo:'all', pathMatch:'full'},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealmsRoutingModule { }
