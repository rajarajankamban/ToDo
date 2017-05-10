import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToDoList } from './models/todoList';
@Injectable()
export class TodoService {

  constructor(private http: Http) { 
    this.fetchToDoData();
  }

  fullPath : string = "https://todo-5d500.firebaseio.com/ToDo";  
  toDoList : ToDoList[] = [];
  subscription : any;

  fetchToDoData(){
    this.subscription = this.http.get(`${this.fullPath}.json`).subscribe(
      data => {
        let key = Object.keys(data.json());
        let response = data.json();
        for(let i=0; i<key.length; i++){
          this.toDoList.push(response[key[i]]);
          this.toDoList[i].id = key[i];
        }
        console.log(this.toDoList);
      } 
      );
      return this.toDoList;
  }

  getTaskByCategory(category : string){
    return this.toDoList.filter(data => data.category === category && !data.isDone);
  }

  getTaskOnArchieve(){
    return this.toDoList.filter(data => data.isDone);
  }

  addTaskToDoList(name : string, category :string){
    this.postTask(new ToDoList(name,category));
  }

  postTask(todolist : ToDoList ){
    this.http.post(`${this.fullPath}.json`,todolist).subscribe(
      data => {
        console.log(data);
        this.toDoList.push(todolist);
      }, err => {
        console.log(err);
      }
    )
  }

  moveToArchieve(toDo : ToDoList){
    toDo.isDone = true;
    toDo.endDate = new Date().getTime();
    
     this.http.put(`${this.fullPath}/${toDo.id}.json`,toDo).subscribe(
       data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
     )
    
  }

  moveFromArchieve(toDo : ToDoList){
    toDo.isDone = false;
    toDo.endDate = 0;
    toDo.startDate = 0;
    
     this.http.put(`${this.fullPath}/${toDo.id}.json`,toDo).subscribe(
       data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
     )
  }

 deleteTask(todo : ToDoList){
   this.http.delete(`${this.fullPath}/${todo.id}.json`,todo).subscribe(
       data => {
         this.toDoList= this.toDoList.filter(data => data.id != todo.id);
        console.log(data);
      }, err => {
        console.log(err);
      }
     )
  }
 

}
