import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../service/word.service';
import { Location } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from 'src/model/word';
import { Observable, Subscription, Subject } from 'rxjs';

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
 
  ngOnInit() {
    this.getMovieFromRoute();
  }
  getMovieFromRoute(): void {
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

  goBack(): void {
    this.location.back();
  }
}
