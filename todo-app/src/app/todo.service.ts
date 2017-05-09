import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToDoList } from './models/todoList';
@Injectable()
export class TodoService {

  constructor(private http: Http) { }

  fullPath : string = "https://todo-5d500.firebaseio.com/ToDo.json";  
  toDoList : ToDoList[] = []; 
  subscription : any;

  fetchToDoData(){
    this.subscription = this.http.get(this.fullPath).subscribe(
      data => {
        let key = Object.keys(data.json());
        let response = data.json();
        for(let i=0; i<key.length; i++){
          this.toDoList.push(response[key[i]]);
        }
      } 
      );
      return this.toDoList;
  }

  getTaskByCategory(category : string){
    return this.toDoList.filter(data => data.category === category);
  }

  addTaskToDoList(name : string, category :string){
    this.postTask(new ToDoList(name,category));
  }

  postTask(todolist : ToDoList ){
    this.http.post(this.fullPath,todolist).subscribe(
      data => {
        console.log(data);
        this.toDoList.push(todolist);
      }, err => {
        console.log(err);
      }
    )
  }


}
