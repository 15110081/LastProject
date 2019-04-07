import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
 
       });
     }, 1000);
  }

}
