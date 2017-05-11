import {ToDoList} from './todoList'
export class ParentCard{
   
    constructor(value : string, category : string){
        this.value = value;
        this.startDate  = new Date().getTime();
        this.isDone =  false;
        this.id = '';
        this.todolist = <ToDoList[]>[];
    }
    id: string;
    value : string ;
    startDate : number;
    endDate : number;
    isDone : boolean;
    todolist : ToDoList[];
}