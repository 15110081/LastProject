import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
