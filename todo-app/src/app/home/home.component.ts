import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToDoList } from '../models/todoList';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

import { ParentCard } from '../models/parentCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.parentcard$.subscribe(data => {
      console.log("Home Parent subscribe");
      this.parentCard = data;
    })
  }

  isAddPopUpEnabled: boolean = false;
  parentCard: ParentCard[] = [];
  todolist: ToDoList[] = [];
  modalActions = new EventEmitter<string | MaterializeAction>();



  /*MaterializeAction*/
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  /*MaterializeAction*/

  //Todo List Actions starts
  getTask(card : ParentCard) {
    if(card.todolist!=undefined){
      return card.todolist.filter(data => data.isDone === false);
    }
  }

  addTask(value: string, card : ParentCard) {
    this.toDoService.addTaskToDoList(value, card);
  }
  moveToArchieve(todo: ToDoList, card : ParentCard) {
    this.toDoService.moveToArchieve(todo,card);
  }

  //Todo List Actions ends

  /*Parent Card Actions starts*/
  createParentCard(title: string) {
    let card = new ParentCard(title);
    console.log(card.todolist);
    this.toDoService.createParentCard(new ParentCard(title));
  }

  /*Parent Card Actions ends*/

}
