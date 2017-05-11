import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToDoList } from '../models/todoList';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs/Observable';
import {MaterializeAction} from 'angular2-materialize';

import {ParentCard} from '../models/parentCard';

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
    
    this.toDoService.parentcard$.subscribe(data => {
      this.parentCard = data;
    })
  }

  isAddPopUpEnabled : boolean = false;
  parentCard : ParentCard[] = [];
  todolist : ToDoList[] = [];
  modalActions = new EventEmitter<string|MaterializeAction>();
  

  
/*MaterializeAction*/
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

   closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
/*MaterializeAction*/

//Todo List Actions starts
  getTaskByCategory(category : string){
    return this.todolist.filter(data=>data.category === category && data.isDone===false);
  }

  addToDoList(value:string,category : string){
   this.toDoService.addTaskToDoList(value,category); 
  }
  moveToArchieve(todo : ToDoList){
    this.toDoService.moveToArchieve(todo);
  }

//Todo List Actions ends

/*Parent Card Actions starts*/
  createParentCard(title : string){
    this.toDoService.createParentCard(new ParentCard(title));
  }

/*Parent Card Actions ends*/
  
}
