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
          console.log(response[key[i]].category);
        }
      } 
      );
      return this.toDoList;
  }

  getToDoByCategory(category : string){
    return this.toDoList.filter(data => data.category === category);
  }

}
