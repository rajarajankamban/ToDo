import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable,BehaviorSubject} from 'rxjs';


import {ParentCard} from './models/parentCard';
import { ToDoList } from './models/todoList';
declare var  _:any;

@Injectable()
export class TodoService {

  constructor(private http: Http) {
    this.parentcardSubject = new BehaviorSubject([]);
    this.parentcard$ = this.parentcardSubject.asObservable();
    this.fetchParentCards();
    // this.toDoListSubject = new BehaviorSubject([]);
    // this.toDoList$ = this.toDoListSubject.asObservable();
    // this.fetchToDoData();
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
    console.log(parentCard.todolist);
    this.http.post(`${this.fullPath}.json`,parentCard).subscribe(
      data => {
        let cards  = this.parentcardSubject.getValue();
        let obj = data.json();
        parentCard.id = obj.name;
        cards.push(parentCard);
        // console.log(parentCard.id);
        this.parentcardSubject.next(cards);
      }, err => {
        console.log(err);
      }
    )
  }

  fetchParentCards(){
    console.log("fetch cards");
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




  getTaskOnArchieve(){
    return this.toDoList.filter(data => data.isDone);
  }

  addTaskToDoList(name : string, card : ParentCard){
    console.log("Add Task");
   let dumCard : ParentCard = Object.assign({},card);
   let dumToDo : ToDoList = new ToDoList(name,card.value);
   if(dumCard.todolist == undefined){
    dumCard.todolist = [];
  }
   dumToDo.id = card.id + "-" + Date.now();
   dumCard.todolist.push(dumToDo);
    this.http.put(`${this.fullPath}/${card.id}.json`,dumCard).subscribe(
      data => {
        /*let temp :ParentCard[] = this.parentcardSubject.getValue();
         _.mapValues(temp, tempcard=>{
            if(tempcard.id == dumCard.id){
             if(tempcard.todolist == undefined){
                tempcard.todolist = [];
              }
              tempcard.todolist.push(dumToDo);
            }
          });
           this.parentcardSubject.next(temp);*/
      }, err => {
        console.log(err);
      }
    )
  }

  moveToArchieve(toDo : ToDoList, card : ParentCard){
    this.archieveChange(toDo,card,true);
  }

  moveFromArchieve(card :ParentCard, toDo : ToDoList){
      this.archieveChange(toDo,card,false);
  }

archieveChange(toDo : ToDoList, card : ParentCard, status:boolean){

   let dumToDo: ToDoList = Object.assign({},toDo);
    let dumCard : ParentCard = Object.assign({},card);
    _.mapValues(dumCard.todolist, todo=>{
      if(todo.id == dumToDo.id){
        todo.isDone = status;
        todo.endDate = new Date().getTime();
      }
    })
    console.log(dumCard);
    this.http.put(`${this.fullPath}/${card.id}.json`,dumCard).subscribe(
       data => {
        let temp :ParentCard[] = this.parentcardSubject.getValue();
         _.mapValues(temp, tempcard=>{
            if(tempcard.id == dumCard.id){
              _.mapValues(tempcard.todolist, todo => {
                if(todo.id == dumToDo.id){
                  todo.isDone = status;
                  todo.endDate = new Date().getTime();
                }
              });
              
            }
         });
        //  console.log(temp);
         this.parentcardSubject.next(temp);
      }, err => {
        console.log(err);
      }
     )
   
}

 deleteTask(card :ParentCard, todo : ToDoList){
    let dumToDo: ToDoList = Object.assign({},todo);
    let dumCard : ParentCard = Object.assign({},card);
    _.mapValues(dumCard, tempcard=>{
      _.remove(tempcard.todolist, data => data.id = dumToDo.id);
    });
  this.http.put(`${this.fullPath}/${card.id}.json`,dumCard).subscribe(
       data => {
        let temp :ParentCard[] = this.parentcardSubject.getValue();
         _.mapValues(temp, tempcard=>{
            if(tempcard.id === dumCard.id){
                  _.remove(tempcard.todolist, data => data.id = dumToDo.id);
            }
          });
        this.parentcardSubject.next(temp);
        console.log(data);
      }, err => {
        console.log(err);
      }
     )
  }
 

}
