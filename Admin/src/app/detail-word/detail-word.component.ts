import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../service/word.service';
import { Location } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from 'src/model/word';
import { Observable, Subscription, Subject } from 'rxjs';
declare var $:any;
@Component({
  selector: 'app-detail-word',
  templateUrl: './detail-word.component.html',
  styleUrls: ['./detail-word.component.scss']
})
export class DetailWordComponent implements OnInit {
  data: any;
  fileUpload:Observable<any>;
  selectedWord = {
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: "",
    audioword:"",
    imageWord:""
  };
  files={audio:""};
  subs:Subscription;
  file:any;
  constructor (private detector:ChangeDetectorRef,private route:ActivatedRoute,private wordService:WordService, private location:Location,private token:TokenStorageService) 
  {
      // this.wordService.file$.subscribe(file=>this.fileUpload=file);
   }
 JqueryDetailWord(){
  $(document).ready(function () {
    // Init Side nav
    $('.button-collapse').sideNav();

    // Init Slider
    $('.slider').slider({
      indicators: false,
      height: 500,
      transition: 500,
      interval: 6000
    });

    // Autocomplete
    $('.autocomplete').autocomplete({
      data: {
        "Aruba": null,
        "Cancun Mexico": null,
        "Hawaii": null,
        "Florida": null,
        "California": null,
        "Jamaica": null,
        "Europe": null,
        "The Bahamas": null,
      }
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
   
  this.wordService.getFiles(id,this.token.getToken()).subscribe(
    res=>{
      this.files=res;
      console.log(this.files);
    }
    );
  //  JSON.stringify(this.fileUpload);
 
  //  String(this.fileUpload);
     
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
}
