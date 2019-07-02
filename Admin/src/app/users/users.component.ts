import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { TitleService } from '../service/title.service';
import { TokenStorageService } from '../auth/token-storage.service';
declare var $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService:TitleService ,private token:TokenStorageService) { }

  ngOnInit() {
    this.getUserHAL();
     // Hide Sections
     $('.section').hide();

     setTimeout(function () {
       $(document).ready(function () {
         // Show sections
         $('.section').fadeIn();
 
         // Hide preloader
         $('.loader').fadeOut();
 
         //Init Side nav
         $('.button-collapse').sideNav();
 
         // Init Modal
         $('.modal').modal();
 
       });
     }, 1000);
  }
  data: any;
  dateTemp: any;
  listUser: User[] = [];
  user: User = new User(null, "", "", "","");
  page={size:"",totalElements:'',totalPages:'',number:''};
  numbers:any;
  currentPage:number=0;
  nextPage:any;
  PrePage:any;
  firstPage:any;
  lastPage:any;
  getUserHAL(){
    this.userService.getUserHALStart(this.token.getToken()).subscribe(res => {
      console.table(res);
      // this.firstPage=res["_links"]["first"]["href"];

      console.log(this.firstPage);
      console.log(this.lastPage);
      this.page["size"]=res["page"]["size"];
      this.page["totalElements"]=res["page"]["totalElements"];
      this.page["totalPages"]=res["page"]["totalPages"];
      this.page["number"]=res["page"]["number"];
      this.numbers = Array(parseInt(this.page["totalPages"],10)).fill(0).map((x,i)=>i);
      if(parseInt(this.page["totalPages"])>1)
      this.lastPage=res["_links"]["last"]["href"];

      console.log(this.numbers);
      console.log(this.page);
      var patt1 = /\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["user"];
      var temp;
      this.dateTemp.forEach(element => {
        let user = new User(null, "", "", "","");
        temp = element["_links"]["self"]["href"].match(patt1);
        user["id"] = temp.toString().slice(1);
        user["name"] = element["name"];
        user["username"] = element["username"];
        user["email"] = element["email"];
        user["createdDatetime"] = element["createdDatetime"];
        this.listUser.push(user);

      });
      this.data = this.listUser;

      console.log(this.data);
    });
  }

  PageClick(id:number){
    this.currentPage=id;
    this.listUser=[];
    this.userService.getUserHAL(this.token.getToken(),id).subscribe(res => {
      var patt1 = /\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["user"];
      var temp;
      this.dateTemp.forEach(element => {
        let user = new User(null, "", "", "","");
        temp = element["_links"]["self"]["href"].match(patt1);
        user["id"] = temp.toString().slice(1);
        user["name"] = element["name"];
        user["username"] = element["username"];
        user["email"] = element["email"];
        user["createdDatetime"] = element["createdDatetime"];
        this.listUser.push(user);

      });
      this.data = this.listUser;

      console.log(this.data);
    });
  }
  DeleteUser(id:number){
    this.listUser=[];
    this.userService.deleteUserHAL(this.token.getToken(),id,()=>{
      this.userService.getUserHAL(this.token.getToken(),this.currentPage).subscribe(res=>{
        var patt1 = /\/[1-9]+.*/g;
        this.dateTemp = res["_embedded"]["user"];
        var temp;
        this.dateTemp.forEach(element => {
          let user = new User(null, "", "", "","");
          temp = element["_links"]["self"]["href"].match(patt1);
          user["id"] = temp.toString().slice(1);
          user["name"] = element["name"];
          user["username"] = element["username"];
          user["email"] = element["email"];
          user["createdDatetime"] = element["createdDatetime"];
          this.listUser.push(user);
  
        });
        this.data = this.listUser;
  
      });
    });
 }
}
