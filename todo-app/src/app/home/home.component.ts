import { Component, OnInit } from '@angular/core';
import { ToDoList } from '../models/todoList';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs/Observable';

import {ToDo} from '../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toDoService : TodoService) { }

  ngOnInit() {
    this.toDoService.toDoList$.subscribe(data => {
      this.todolist = data;
    })
  }

  isAddPopUpEnabled : boolean = false;
  todo : ToDo[] = [];
  todolist : ToDoList[] = [];
  
  

  showAddPopUp(){
    this.isAddPopUpEnabled = this.isAddPopUpEnabled==true ? false : true;
  }
  
  //Get Task By category
  getTaskByCategory(category : string){
    return this.todolist.filter(data=>data.category === category && data.isDone===false);
  }

  addToDoList(value:string,category : string){
   this.toDoService.addTaskToDoList(value,category); 
  }

  createToDoList(title : string, category : string){
    this.todo.push(new ToDo(title, category));
  }

  moveToArchieve(todo : ToDoList){
    this.toDoService.moveToArchieve(todo);
  }
}
