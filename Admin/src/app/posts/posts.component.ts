import { Component, OnInit } from '@angular/core';
import { emojiRandom } from '../../model/emojis';
import * as faker from 'faker';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
import { Word } from 'src/model/word';
import { UploadFileService } from '../service/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var $:any;
declare var CKEDITOR:any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  people;
  file:any;
  searchText;
  isLoggedIn = false;
  data:Observable<any>;
  roles: string[] = [];
  selectedWord = {
    id: null,
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: "",
    createdDatetime: "",
    updatedDatetime:"",
    imageWord:""
  };
  constructor(private tokenStorage:TokenStorageService,private wordService: WordService, private uploadService: UploadFileService,) { 
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
        // this.file="http://localhost:9059/upload/file/"+this.data["imageWord"];

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
WordPost: Word = new Word("", "", "", "", "","");
public imagePath;
imgURL: any;
public messageImage: string;
public messageAudio: string;
selectedFilesAudio: FileList;
selectedFilesImage: FileList;
// Review Image Before Upload
preview(files, event) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.messageImage = "Only images are supported.";
    this.imgURL = "";
    return;
  }
  this.messageImage = "";
  this.selectedFilesImage = event.target.files;
  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
  }
}
// Review Audio Before Upload
previewAudio(files, event) {
  var mimeType = files[0].type;
  console.log(mimeType);
  if (mimeType.match(/audio\/*/) == null) {
    this.messageAudio = "Only audios are supported.";
    return;
  }
  this.messageAudio = "";
  this.selectedFilesAudio = event.target.files;
  var sound: any = document.getElementById('sound');
  var reader = new FileReader();
  reader.onload = function (e) {
    sound.src = this.result;
    sound.controls = true;
    sound.play();
  };
  reader.readAsDataURL(files[0]);
}
upload() {
    
   
  this.uploadService.addWordToAPI(this.WordPost,this.tokenStorage.getToken(),()=>{
    console.log("Da them vao ");
    this.uploadImageOrAudio();
    this.loadWord(this.tokenStorage.getToken());
   });
   console.log(this.WordPost);

   
   

 }
 progress: { percentage: number } = { percentage: 0 };
  id:any;
  uploadImageOrAudio(){
    this.progress.percentage = 0;
    document.getElementById("progress").style.display = "block";
    if (this.selectedFilesImage != undefined) {
      this.uploadService.pushFileToStorage(this.selectedFilesImage.item(0), this.tokenStorage.getToken()).toPromise().then(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File Image is completely uploaded!');


        }
      });
    }
    this.progress.percentage = 0;
    if (this.selectedFilesAudio != undefined) {
      this.uploadService.pushFileToStorage(this.selectedFilesAudio.item(0), this.tokenStorage.getToken()).toPromise().then(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
          // console.log(this.progress.percentage);
        } else if (event instanceof HttpResponse) {
          console.log('File Audio is completely uploaded!');
        }
      });
    }  
    setTimeout(function () {
    
      document.getElementById("updateButton").click();
      if(document.getElementById('resultImage')!=null)
      (<HTMLInputElement>document.getElementById('resultImage')).src = "";
      if(document.getElementById('audio')!=null)
      (<HTMLInputElement>document.getElementById('audio')).src = "";
    }, 500)
    this.selectedFilesImage = undefined;
    this.selectedFilesAudio = undefined;
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
