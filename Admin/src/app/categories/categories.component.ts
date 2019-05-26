import { Component, OnInit } from '@angular/core';
import { WordService } from '../service/word.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from 'src/model/word';
import { Title } from 'src/model/title';
import { UploadFileService } from '../service/upload-file.service';
import { TitleService } from '../service/title.service';
declare var $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  data: any;
  dateTemp: any;
  listWord: Word[] = [];
  listTitle: Title[] = [];
  title: Title = new Title("", "", "", "", "");
  constructor(private wordService: WordService, private token: TokenStorageService, private titleService: TitleService, private uploadService: UploadFileService) {
    this.getTitleHAL();
  }
  getTitleHAL(){
    this.titleService.getTitleHAL(this.token.getToken()).subscribe(res => {
      console.log(res["_embedded"]);
      console.log(res["_embedded"]["title"]);
      var patt1 = /\/[1-9]+/g;
      this.dateTemp = res["_embedded"]["title"];
      var temp;
      this.dateTemp.forEach(element => {
        let title = new Title(null, "", "", "", "");
        temp = element["_links"]["self"]["href"].match(patt1);
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = element["createdDatetime"];
        title["updatedDatetime"] = element["updatedDatetime"];

        this.listTitle.push(title);

      });
      this.data = this.listTitle;
      console.log(this.data);
    });
  }
  getWordHAL() {
    this.wordService.getWordByTitle2(this.token.getToken()).subscribe(res => {
      console.log(res["_embedded"]);
      console.log(res["_embedded"]["word"]);
      var patt1 = /\/[1-9]+/g;
      this.dateTemp = res["_embedded"]["word"];
      var temp;
      this.dateTemp.forEach(element => {
        let wordName = new Word(null, "", "", "", "", "", "");
        temp = element["_links"]["self"]["href"].match(patt1);
        wordName["id"] = temp.toString().slice(1);
        wordName["vocabulary"] = element["vocabulary"];
        wordName["phonetic"] = element["phonetic"];
        wordName["note"] = element["note"];
        wordName["definition"] = element["definition"];
        wordName["typeword"] = element["typeword"];

        this.listWord.push(wordName);

      });
      this.data = this.listWord;
      console.log(this.data);
    });
  }
  public imagePath;
  imgURL: any;
  public messageImage: string;
  public messageAudio: string;
  selectedFilesImage: FileList;
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
  ngOnInit() {
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
  saveTitle() {


    this.titleService.postTitleCallBack(this.title, this.token.getToken(), () => {
      this.uploadService.pushFileTitleToStorage(this.selectedFilesImage.item(0), this.token.getToken()).toPromise();
      // $('#myTableId tbody').empty();
      this.listTitle=[];
      this.getTitleHAL();
      document.getElementById("updateButton").click();
    });
    // (this.title,this.tokenStorage.getToken(),()=>{
    //   console.log("Da them vao ");
    //   this.uploadImageOrAudio();
    //   this.loadWord(this.tokenStorage.getToken());
    //  });
    //  console.log(this.WordPost);




  }
}
