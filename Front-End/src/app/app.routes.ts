import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'realm/all',
         pathMatch:'full'
    },
    {
        path:'realm',
        loadChildren: () => import('./modules/realms/realms.module').then(m=> m.RealmsModule)
    },
    {
        path:'character',  
        loadChildren: () => import('./modules/characters/characters.module').then(m=> m.CharactersModule)
    }
];
