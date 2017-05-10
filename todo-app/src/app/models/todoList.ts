export class ToDoList{
    constructor(value : string, category : string){
        this.value = value;
        this.startDate  = new Date().getTime();
        this.category = category;
        this.isDone =  false;
        this.id = '';
    }
    id: string;
    value : string ;
    startDate : number;
    endDate : number;
    category : string;
    isDone : boolean;
}