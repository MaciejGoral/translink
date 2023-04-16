import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  constructor(private http: HttpClient) { }

  getTexts(): Observable<any> {
    return this.http.get('http://localhost:3000/texts');
  }

  getText(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/texts/${id}`);
  }

  addText(text: any): Observable<any> {
    return this.http.post('http://localhost:3000/texts', text);
  }

  updateText(id: string, text: any): Observable<any> {
    return this.http.put(`http://localhost:3000/texts/${id}`, text);
  }

  deleteText(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/texts/${id}`);
  }
}
