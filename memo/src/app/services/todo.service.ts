import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todo:Todo[]=[];
  private Url = `http://127.0.0.1:8000/api/todo/`;
  constructor(private http: HttpClient) { }
  
  getAllTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.Url);
  }

  /*create(todo:Todo){
    return this.http.post(this.Url,httpOptions);
  }*/
  /** POST: サーバーに新しいヒーローを登録する */
  create (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.Url, todo, httpOptions);
  }

  /** DELETE: サーバーからヒーローを削除 */
deleteTodo (todo: Todo | number): Observable<Todo> {
  const id = typeof todo === 'number' ? todo : todo.id;
  const url = `${this.Url}${id}/`;

  return this.http.delete<Todo>(url, httpOptions);
}
  /*getNewTodo(){
    return this.http.get(this.Url+"?Limit=1");
  }*/

  update(todo: Todo):Observable<any>{
    const url = `${this.Url}${todo.id}/`;
    return this.http.put(url,todo, httpOptions);
  }

  getTodo(id: number): Observable<Todo> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.Url}${id}/`;
    return this.http.get<Todo>(url);
  }
}
