export class User {
   id:number;
   name:string;
   email:string;
   createdDatetime:string;
   constructor( id:number,
    name:string,
    email:string,
    createdDatetime:string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.createdDatetime=createdDatetime;
    }
}