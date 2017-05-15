import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import { ToDoList } from '../models/todoList';
import { ParentCard } from '../models/parentCard';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  constructor(private toDoService : TodoService) { }

  ngOnInit() {
    this.toDoService.parentcard$.subscribe(data => {
      this.parentCard = data;
    })
  }

  searchStringSub: BehaviorSubject<string>;

  parentCard: ParentCard[] = [];
  getArchieve(toDoList : ToDoList[]){
    // console.log(toDoList);
      if(toDoList != undefined){
      return toDoList.filter(data => data.isDone == true );
    }
  }

  delete(card :ParentCard ,todo : ToDoList){
    this.toDoService.deleteTask(card,todo);
  }

  restore(card :ParentCard, todo : ToDoList){
    this.toDoService.moveFromArchieve(card,todo);
  }

  checkTask(card :ParentCard){
    if(card.todolist != undefined){
      let todo :ToDoList[] = card.todolist.filter(data => data.isDone == true );
      return todo.length > 0;
   }
   else{
    return false;
   }
  }
}
