import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../app.settings';
import { Realm } from '../models/realms.model';
import { CharacterPerRealm } from '../models/realms.model';

@Injectable({
  providedIn: 'root'
})

export class RealmService {
  private apiUrl = Constants.SERVER + '/realm'; // URL del backend

  constructor(private http: HttpClient) {}

  /*   //OBSERVABLE - QUEDA ATENTO
    all_subs(): Observable<any> {
      return this.http.get(this.apiUrl + '/all')
    } */
  
  //PROMESA - ESCUCHA 1 RESULTADO
  all(): Promise<Realm[]> {
    return this.http.get<Realm[]>(this.apiUrl + '/all').toPromise()
    .then(response => response ?? [
      { id: 0, name: 'No hay reinos', image:'', characters: [] }
    ]);
  }
// <Realm[]> describe la caracteristica de lo que estás esperando.


  
  admin(): Promise<{ Reino: CharacterPerRealm[] }> {
    return this.http.get<{ Reino: CharacterPerRealm[] }>(this.apiUrl + `/admin`).toPromise()
    .then(res => res ?? { Reino: [] });
  }
  

  detail(id:number):Promise<{Reino:Realm}>{
    return this.http.get<{Reino:Realm}>(this.apiUrl + `/detail/${id}`).toPromise()
    .then(res => res ?? {} as {Reino:Realm});
  }

  create(data:Realm):Promise<{Reino:Realm}>{
    return this.http.post<{Reino:Realm}>(this.apiUrl + '/create', data).toPromise()
    .then(res => res ?? {} as {Reino:Realm});
  }


  edit(id:number, data:Realm):Promise<{Reino:Realm}>{
    return this.http.put<{Reino:Realm}>(this.apiUrl + `/edit/${id}`, data).toPromise()
    .then(res => res ?? {} as {Reino:Realm});
  }

  delete(id:number):Promise<{Reino:Realm}>{
    return this.http.delete<{Reino:Realm}>(this.apiUrl + `/delete/${id}`).toPromise()
    .then(res => res ?? {} as {Reino:Realm});
  }

}
