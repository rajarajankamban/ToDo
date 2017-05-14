import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoList } from '../models/todoList';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() title : string;
  @Input() checkList : ToDoList[];
  @Output() addNewTask: EventEmitter <string> = new EventEmitter();
  @Output() modifyList: EventEmitter <ToDoList> = new EventEmitter();
  addTaskToDo(value : string){
    this.addNewTask.emit(value);
  }

  moveToArchieve(todo : ToDoList){
    this.modifyList.emit(todo);
  }

}
