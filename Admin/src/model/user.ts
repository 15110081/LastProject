export class User {
   id:number;
   name:string;
   username:string;
   email:string;
   createdDatetime:string;
   constructor( id:number,
    name:string,
    email:string,
    createdDatetime:string,username:string){
        this.id=id;
        this.name=name;
        this.username=username;
        this.email=email;
        this.createdDatetime=createdDatetime;
    }
}