import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../app.settings';
import { Character } from '../models/character.model';
import { Element } from '../models/elements.model';


@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  private apiUrl = Constants.SERVER + '/character'; // URL del backend

  constructor(private http: HttpClient) {}

  all(): Promise<Character[]> {
    return this.http.get<{ characters: Character[] }>(this.apiUrl + '/all').toPromise()
      .then(response => {
        if (response && response.characters) {
          return response.characters;
        } else {
          return [
            { id: 0, name: '', image:'', power:0, element:'', realm:'', description:'' }
          ];
        }
      })
  }

  detail(id:number):Promise<{Personaje:Character}>{
    return this.http.get<{Personaje:Character}>(this.apiUrl + `/detail/${id}`).toPromise()
    .then(res => res ?? {} as {Personaje:Character});
  }

  create(data:Character):Promise<{Personaje:Character}>{
    return this.http.post<{Personaje:Character}>(this.apiUrl + '/create', data).toPromise()
    .then(res => res ?? {} as {Personaje:Character});
  }

  edit(id:number, data:Character):Promise<{Personaje:Character}>{
    return this.http.put<{Personaje:Character}>(this.apiUrl + `/edit/${id}`, data).toPromise()
    .then(res => res ?? {} as {Personaje:Character});
  }

  delete(id:number):Promise<{Personaje:Character}>{
    return this.http.delete<{Personaje:Character}>(this.apiUrl + `/delete/${id}`).toPromise()
    .then(res => res ?? {} as {Personaje:Character});
  }

}
