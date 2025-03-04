import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'realm/all',
         pathMatch:'full'
    },
    {
        path:'user',
        loadChildren: () => import('./modules/auth/auth.module').then(m=> m.AuthModule)
    },
    {
        path:'realm',
        loadChildren: () => import('./modules/realms/realms.module').then(m=> m.RealmsModule)
    },
    {
        path:'character',  
        loadChildren: () => import('./modules/characters/characters.module').then(m=> m.CharactersModule)
    },
    {
        path: 'search',
       loadChildren: () => import('./modules/others/search.module').then(m=> m.SearchModule)
    }
];
