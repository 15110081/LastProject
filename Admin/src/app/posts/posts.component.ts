import { Component, OnInit } from '@angular/core';
import { emojiRandom } from '../../model/emojis';
import * as faker from 'faker';
declare var $:any;
declare var CKEDITOR:any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  people;
  constructor() { 
    this.people = Array(100)
      .fill(1)
      .map(_ => {
        return {
          name: faker.name.findName(),
          bio: faker.hacker.phrase(),
          emoji: emojiRandom()
        };
      });
  }

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
  
          // Init Select
          $('select').material_select();
  
          CKEDITOR.replace('body');
  
        });
      }, 1000);
  }

}
