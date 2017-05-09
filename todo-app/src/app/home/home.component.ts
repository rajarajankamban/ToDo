import { Component, OnInit } from '@angular/core';
import { ToDoList } from '../models/todoList';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toDoService : TodoService) { }

  ngOnInit() {
     this.toDoService.fetchToDoData();
     console.log(this.toDoService.getToDoByCategory("project"));
  }

  toDoListProject : ToDoList[] = [];
  toDoListPersonal : ToDoList[] = [];
  
  

  addToDoListProject(value:string){
    console.log(value);
    this.toDoListProject.push(new ToDoList(value,'Project'));
  }

  addToDoListPersonal(value:string){
    this.toDoListPersonal.push(new ToDoList(value,'Personal'));
  }

  fethToDoListProject(){
   
  }

}
