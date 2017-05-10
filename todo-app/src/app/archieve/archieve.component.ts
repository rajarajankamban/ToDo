import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import { ToDoList } from '../models/todoList';
@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  constructor(private toDoService : TodoService) { }

  ngOnInit() {

  }
  toDoList : ToDoList[];

  delete(todo : ToDoList){
    this.toDoService.deleteTask(todo);
  }

  restore(todo : ToDoList){
    this.toDoService.moveFromArchieve(todo);
  }
}
