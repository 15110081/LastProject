export class Result {
    id:number;
    result:string;
    username:string;
    titleId:string;
    typeTest:string;
    createdDatetime:string;
    constructor( id:number,
     result:string,
     username:string,
     titleId:string,
     typeTest:string,
     createdDatetime:string){
         this.id=id;
         this.result=result;
         this.username=username;
         this.titleId=titleId;
         this.typeTest=typeTest;
         this.createdDatetime=createdDatetime;
     }
 }