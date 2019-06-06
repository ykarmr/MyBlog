import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {
  @Input() todo: Todo;
  constructor(private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location) { }

    ngOnInit(): void {
      this.getTodo();
    }

    getTodo(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.todoService.getTodo(id)
        .subscribe(res => this.todo = res);
    }

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.todoService.update(this.todo)
        .subscribe(() => this.goBack());  
    }
}
