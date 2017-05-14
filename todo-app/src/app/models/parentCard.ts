import {ToDoList} from './todoList'
export class ParentCard{
   
    constructor(value : string){
        this.value = value;
        this.startDate  = new Date().getTime();
        this.endDate = null;
        this.isDone =  false;
        this.id = '';
        this.todolist = [];
        console.log(this.todolist);
    }
    id: string;
    value : string ;
    startDate : number;
    endDate : number;
    isDone : boolean;
    todolist : ToDoList[];
}