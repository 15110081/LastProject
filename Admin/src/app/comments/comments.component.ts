import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

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
