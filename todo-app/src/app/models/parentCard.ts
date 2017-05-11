
export class ParentCard{
   
    constructor(value : string, category : string){
        this.value = value;
        this.startDate  = new Date().getTime();
        this.isDone =  false;
        this.id = '';
    }
    id: string;
    value : string ;
    startDate : number;
    endDate : number;
    isDone : boolean;
}