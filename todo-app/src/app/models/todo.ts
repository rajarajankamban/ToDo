export class ToDo{
    constructor(value : string, category : string){
        this.value = value;
        this.startDate  = new Date().getTime();
        this.category = category;
        this.isDone =  false;
    }
    value : string ;
    startDate : number;
    endDate : number;
    category : string;
    isDone : boolean;
}