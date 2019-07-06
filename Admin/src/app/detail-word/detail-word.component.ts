import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../service/word.service';
import { Location } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from 'src/model/word';
import { Observable, Subscription, Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../service/upload-file.service';
import { identifierModuleUrl } from '@angular/compiler';
declare var $:any;
@Component({
  selector: 'app-detail-word',
  templateUrl: './detail-word.component.html',
  styleUrls: ['./detail-word.component.scss']
})
export class DetailWordComponent implements OnInit {
  data: any;
  fileUpload:Observable<any>;
  selectedWord=new Word(null,"","","","","","");
  file:any;
  constructor (private uploadService:UploadFileService,private route:ActivatedRoute,private wordService:WordService, private location:Location,private token:TokenStorageService) 
  {
      // this.wordService.file$.subscribe(file=>this.fileUpload=file);
   }
 JqueryDetailWord(){
  $(document).ready(function () {
    $('.dropdown-button').dropdown({
      constrainWidth: false,
      hover: true,
      belowOrigin: true,
      alignment: 'left'
    });
    // Init Side nav
    $('.button-collapse').sideNav();

    // Init Slider
    $('.slider').slider({
      indicators: false,
      height: 500,
      transition: 500,
      interval: 6000
    });

    // Init Scrollspy
    $('.scrollspy').scrollSpy();

  });
 }
  ngOnInit() {
    this.getWordFromRoute();
    this.JqueryDetailWord();
  }
  getWordFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    //Call service to "get movie from id" ?
    this.wordService.getWordFromId(id, this.token.getToken()).subscribe(
      res => {
        this.selectedWord = res["data"];
        this.data=res["data"];
        console.log("Data detail:" + JSON.stringify(this.selectedWord));
        this.file="http://localhost:9059/upload/file/"+this.data["imageWord"];
        console.log(this.file);
      }

    );
  }
  updateWord(id:number){
    var temp=(<HTMLInputElement> document.getElementById("inputImage")).value;
    if(temp!=this.selectedWord.imageWord) {
      this.selectedWord.imageWord=temp;
      this.uploadImage(this.selectedWord.id);
    }
    this.wordService.putWord(id,this.selectedWord,this.token.getToken()).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
   this.goBack();
  }
  deleteWord(id: number) {
    this.wordService.deleteWordHAL(id, this.token.getToken()).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
   this.goBack();
  }
  public messageImage: string;
  selectedFilesImage: FileList;
  preview(files, event) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageImage = "Only images are supported.";
      this.file = "";
      return;
    }
    this.messageImage = "";
    this.selectedFilesImage = event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.file = reader.result;
    }
  }
  goBack(): void {
    this.location.back();
  }
  progress: { percentage: number } = { percentage: 0 };
  id:any;
  uploadImage(id:number){
      this.uploadService.updatePushFileToStorage(this.selectedFilesImage.item(0),
       this.token.getToken(),id).toPromise();
  
  }
  checkLoginRole():boolean{
    if(this.token.getAuthorities().toString()==="ROLE_ADMIN")return true;
    return false;
  }
}
