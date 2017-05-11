import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToDoList } from './models/todoList';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare var  _:any;

@Injectable()
export class TodoService {

  constructor(private http: Http) { 
    this.toDoListSubject = new BehaviorSubject([]);
    this.toDoList$ = this.toDoListSubject.asObservable();
    this.fetchToDoData();
  }

  fullPath : string = "https://todo-5d500.firebaseio.com/ToDo";  
  private toDoList : ToDoList[] = [];
  subscription : any;

  toDoListSubject : BehaviorSubject<ToDoList[]> ; 
  toDoList$ : Observable<ToDoList[]> ;

  fetchToDoData(){
    this.subscription = this.http.get(`${this.fullPath}.json`).subscribe(
      data => {
        let key = Object.keys(data.json());
        let response = data.json();
        for(let i=0; i<key.length; i++){
          this.toDoList.push(response[key[i]]);
          this.toDoList[i].id = key[i];
        }
        this.toDoListSubject.next(this.toDoList); /* mapping subject variable */
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
    
     this.http.put(`${this.fullPath}/${toDo.id}.json`,item).subscribe(
       data => {
        let toDoList :ToDoList[] = this.toDoListSubject.getValue();
         _.mapValues(toDoList,todo=>{
            if(todo.id == item.id){
              todo.isDone = false;
              todo.endDate = new Date().getTime();
            }
         });
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
