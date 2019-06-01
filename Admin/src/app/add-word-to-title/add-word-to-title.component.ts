import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { TokenStorageService } from '../auth/token-storage.service';
import {
  moveItemInArray, transferArrayItem,
  CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragEnter, CdkDragExit
} from '@angular/cdk/drag-drop';
import { Word } from 'src/model/word';
declare var $: any;
@Component({
  selector: 'app-add-word-to-title',
  templateUrl: './add-word-to-title.component.html',
  styleUrls: ['./add-word-to-title.component.scss']
})
export class AddWordToTitleComponent implements OnInit {
data:any;
listData:any=[];
searchText;
inactiveWords:Word[] = [
 
];

activeWords:Word[] = [
  
];
  constructor(private titleService:TitleService, private token:TokenStorageService) {
    this.getTitle();
   
   }
getTitle(){
  this.titleService.getAllTitle(this.token.getToken()).subscribe(res=>{
    this.data=res["data"];
    this.listData.push(this.data["name"]);
  console.log(this.data)
});
}
  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });
    console.log(this.inactiveWords);
    console.log(this.activeWords);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('dropped Event',
        `> dropped '${event.item.data}' into '${event.container.id}'`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('dropped Event',
        `> dropped '${event.item.data}' into '${event.container.id}'`);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.log("active:");
      this.activeWords.forEach(element => {
        console.log(element);
      });
      console.log("inactive:");
      this.inactiveWords.forEach(element => {
        console.log(element);
      });
    }
  }
  dataTemp:any;
  listWordofTitle: Word[]=[];
  dataWordOfTitle:any
  getWordOfTitle(number:any){
    this.activeWords=[];
    this.inactiveWords=[];
    // this.listWordofTitle=[];
    this.getWordLeft(number);
    this.titleService.getWordByTitleHAL(this.token.getToken(),number).subscribe(res=>{
      var patt1 = /\/[1-9]+/g;
      this.dataTemp = res["_embedded"]["word"];
      console.log(this.dataTemp);
      var temp;
      this.dataTemp.forEach(element => {
        let word = new Word(null, "", "", "", "","","");
        temp = element["_links"]["self"]["href"].match(patt1);
        console.log("temp"+temp);
        word["id"] = temp.toString().slice(1);
        word["definition"] = element["definition"];
        word["note"] = element["note"];
        word["phonetic"] = element["phonetic"];
        word["vocabulary"] = element["vocabulary"];
        word["typeWord"] = element["typeWord"];
        word["imageWord"] = element["imageWord"];
        this.activeWords.push(word);

      });
    });
   
  }
  listWordLeft:any;
  getWordLeft(number:any){
    this.titleService.getWordLeft(this.token.getToken(),number).subscribe(res=>{
      this.listWordLeft=res["data"];
      console.log(this.listWordLeft);
      this.listWordLeft.forEach(res => {
        let word = new Word(null, "", "", "", "","","");
      word["id"] = res["id"];
      word["definition"] = res["definition"];
      word["note"] = res["note"];
      word["phonetic"] = res["phonetic"];
      word["vocabulary"] = res["vocabulary"];
      word["typeWord"] = res["typeWord"];
      word["imageWord"] = res["imageWord"];
      this.inactiveWords.push(word);
      });
        console.log("DATA inactive:"+this.inactiveWords);
    });
    
  }
}
