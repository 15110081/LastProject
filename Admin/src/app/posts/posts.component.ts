import { Component, OnInit } from '@angular/core';
import { emojiRandom } from '../../model/emojis';
import * as faker from 'faker';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
declare var $:any;
declare var CKEDITOR:any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  people;
  isLoggedIn = false;
  data:any;
  roles: string[] = [];
  selectedWord = {
    id: null,
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: "",
    title: "",
    audioword:""
  };
  constructor(private tokenStorage:TokenStorageService,private wordService: WordService) { 
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
  loadWord(token: any) {
    this.wordService.getAllWord(token).subscribe(
      data => {
        this.data = data["data"];
      }
    );

  }
  onSelectedWord(id: number) {
    // this.backgroundSelected(index);
 console.log(id);
 
    //  this.image = this.img;
     this.wordService.getWordFromId(id,this.tokenStorage.getToken()).subscribe(res => {
       if (res.code == 1) {
         this.selectedWord = res.data;
         console.log(`${JSON.stringify(res.data)}`);
        //  this.image = this.image + res.data.id;
        //  this.playAudio(res.data.audioword);
       }
     });
     //  this.selectedWord=this.data[id];
   }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.loadWord(this.tokenStorage.getToken());
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
