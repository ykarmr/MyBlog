import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos:Todo[];
  
  @Input() todo: Todo = new Todo();
  constructor(private todoService:TodoService,private router: Router) {}

  ngOnInit():void {
    this.getAllTodo();
  }
  getAllTodo():void{
    this.todoService.getAllTodo().subscribe(res=> this.todos =res);
  }

  create(title: string): void {
    title = title.trim();//trim() 両端から空白をとる
    if (!title) { return; }
    this.todoService.create({ title } as Todo)
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(h => h !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }

  
}
