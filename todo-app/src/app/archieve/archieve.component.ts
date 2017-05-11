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
     this.toDoService.toDoList$.subscribe(data => {
      this.toDoList = data;
    })
  }
  toDoList : ToDoList[];

  getArchieve(){
    return this.toDoList.filter(data => data.isDone == true);
  }

  delete(todo : ToDoList){
    this.toDoService.deleteTask(todo);
  }

  restore(todo : ToDoList){
    this.toDoService.moveFromArchieve(todo);
  }
}
