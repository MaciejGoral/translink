import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextsService {
  constructor(private http: HttpClient) {}

  getTexts(): Observable<any> {
    return this.http.get('http://localhost:3000/translations');
  }

  getText(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/translations/${id}`);
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

  registerUser(user) {
    return this.http.post('http://localhost:3000/v1/users', { user });
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };

    return this.http.post('http://localhost:3000/v1/users/sign_in', { user });
  }
  addTranslation(translation: any): Observable<any> {
    return this.http.post('http://localhost:3000/translations', translation);
  }

  addWordlist(wordlist: any): Observable<any> {
    return this.http.post('http://localhost:3000/word_lists', wordlist);
  }

  getWordlists(user_id: number): Observable<any> {
    return this.http.get(
      `http://localhost:3000/word_lists/?user_id=${user_id}`
    );
  }
  deleteWordList(wordListId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/word_lists/${wordListId}`);
  }
}
