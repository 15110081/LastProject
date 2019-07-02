export class Result {
    id:number;
    result:string;
    username:string;
    title_id:string;
    type_test:string;
    createdDatetime:string;
    constructor( id:number,
     result:string,
     username:string,
     title_id:string,
     type_test:string,
     createdDatetime:string){
         this.id=id;
         this.result=result;
         this.username=username;
         this.title_id=title_id;
         this.type_test=type_test;
         this.createdDatetime=createdDatetime;
     }
 }