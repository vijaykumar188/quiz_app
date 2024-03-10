import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getQuestion(){
    return this.http.get<any>("assets/questions.json");
    //return this.http.get<any>("http://localhost:3000/questions");
  }
}
