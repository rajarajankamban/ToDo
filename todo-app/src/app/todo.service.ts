import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {ParentCard} from './models/parentCard';
import { ToDoList } from './models/todoList';
declare var  _:any;

@Injectable()
export class TodoService {

  constructor(private http: Http) {
    this.parentcardSubject = new BehaviorSubject([]);
    this.parentcard$ = this.parentcardSubject.asObservable();
    this.fetchParentCards();
    this.toDoListSubject = new BehaviorSubject([]);
    this.toDoList$ = this.toDoListSubject.asObservable();
    this.fetchToDoData();
  }

  private fullPath : string = "https://todo-5d500.firebaseio.com/ToDo";  
  private toDoList : ToDoList[] = [];
  subscription : any;

  toDoListSubject : BehaviorSubject<ToDoList[]> ; 
  toDoList$ : Observable<ToDoList[]> ;

  /*ParentCard starts*/ 
  parentcardSubject : BehaviorSubject<ParentCard[]> ; 
  parentcard$ : Observable<ParentCard[]> ;

  createParentCard(parentCard : ParentCard){
    this.http.post(`${this.fullPath}.json`,parentCard).subscribe(
      data => {
        let cards  = this.parentcardSubject.getValue();
        let obj = data.json();
        parentCard.id = obj.name;
        cards.push(parentCard);
        console.log(parentCard.id);
        this.parentcardSubject.next(cards);
      }, err => {
        console.log(err);
      }
    )
  }

  fetchParentCards(){
    this.http.get(`${this.fullPath}.json`).subscribe(
      data => {
       let key = Object.keys(data.json());
        let response = data.json();
        let cards  = this.parentcardSubject.getValue();
        for(let i=0; i<key.length; i++){
          cards.push(response[key[i]]);
          cards[i].id = key[i];
        }
        this.parentcardSubject.next(cards); /* mapping subject variable */
      } 
      );
  }

  /*ParentCard ends*/ 

  fetchToDoData(){
    this.subscription = this.http.get(`${this.fullPath}.json`).subscribe(
      data => {
        let key = Object.keys(data.json());
        let response = data.json();
        let toDoList  = this.toDoListSubject.getValue();
        for(let i=0; i<key.length; i++){
          toDoList.push(response[key[i]]);
          toDoList[i].id = key[i];
        }
        this.toDoListSubject.next(toDoList); /* mapping subject variable */
      } 
      );
  }


  getTaskOnArchieve(){
    return this.toDoList.filter(data => data.isDone);
  }

  addTaskToDoList(name : string, category :string){
    this.postTask(new ToDoList(name,category));
  }

  postTask(todo : ToDoList ){
    this.http.post(`${this.fullPath}.json`,todo).subscribe(
      data => {
       
        let toDoList  = this.toDoListSubject.getValue();
        let obj = data.json();
        todo.id = obj.name;
        toDoList.push(todo);
         console.log(todo.id);
        this.toDoListSubject.next(toDoList);
      }, err => {
        console.log(err);
      }
    )
  }

  moveToArchieve(toDo : ToDoList){
    
    let item: ToDoList = Object.assign({},toDo);
    item.isDone = true;
    item.endDate = new Date().getTime();

    this.http.put(`${this.fullPath}/${toDo.id}.json`,item).subscribe(
       data => {
         let toDoList = this.toDoListSubject.getValue();
         _.mapValues(toDoList,todo=>{
            if(todo.id == item.id){
              todo.isDone = true;
              todo.endDate = new Date().getTime();
              console.log(todo);
            }
         });
         
         this.toDoListSubject.next(toDoList);
      }, err => {
        console.log(err);
      }
     )
    
  }

  moveFromArchieve(toDo : ToDoList){
   let item: ToDoList = Object.assign({},toDo);
    item.isDone = false;
    item.endDate = new Date().getTime();
     this.http.put(`${this.fullPath}/${toDo.id}.json`,item).subscribe(
       data => {
        let toDoList :ToDoList[] = this.toDoListSubject.getValue();
         _.mapValues(toDoList,todo=>{
            if(todo.id == item.id){
              console.log(todo.value);
              todo.isDone = false;
              todo.endDate = new Date().getTime();
            }
         });
         console.log(toDoList);
         this.toDoListSubject.next(toDoList);
      }, err => {
        console.log(err);
      }
     )
  }

 deleteTask(todo : ToDoList){
   this.http.delete(`${this.fullPath}/${todo.id}.json`,todo).subscribe(
       data => {
         let toDoList :ToDoList[] = this.toDoListSubject.getValue();
         _.remove(toDoList,data=>data.id==todo.id);
         this.toDoListSubject.next(toDoList);
        console.log(data);
      }, err => {
        console.log(err);
      }
     )
  }
 

}
