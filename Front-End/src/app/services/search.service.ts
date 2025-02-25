import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = Constants.SERVER + '/search';

  constructor(private http: HttpClient) { }

  // Método para realizar la búsqueda
  search(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
