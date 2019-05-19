import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Word } from 'src/model/word';
import { UploadFileService } from '../service/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
declare var $: any;
declare var Materialize: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  data: any;
  currentID: number;
  logs: string[] = [];
  dtOptions: any;
  dtTrigger: Subject<Word> = new Subject();
  isLoggedIn = false;
  roles: string[] = [];
  word = {
    id: null,
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: ""
  };
  WordPost: Word = new Word("", "", "", "", "");
  constructor(private token: TokenStorageService, private wordService: WordService, private uploadService: UploadFileService) {
    this.loadWord(this.token.getToken());
    // this.wordService.getWordByTitle2(this.token.getToken()).subscribe(res=>{
    //   console.log(res["_embedded"]["word"]);
    //   this.data=res["_embedded"]["word"];
    //       });
  }

  ngOnInit() {
    console.log(this.token.getToken());
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getAuthorities();
    }

    this.dtOptions =
      {
        pagingType: 'full_numbers',
        pageLength: 10,
        // destroy:true,
        // select: true,
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'colvis',
          'copy',
          'print',
          'excel',
          'csv',
          {
            text: 'Some button',
            key: '1',
            action: function (e, dt, node, config) {
              alert('Button activated');
            }
          }
        ]
      };

    this.JqueryAjax();

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  deleteWord(id: number) {
    this.wordService.deleteWord(id, this.token.getToken()).subscribe(
      data => {
        console.log(data);
        this.loadWord(this.token.getToken());
      },
      error => console.log(error));
    window.location.reload();
  }
  errorMessage: string;
  loadWord(token: any) {
    this.wordService.getAllWord(token).toPromise()
      .then(
        response => {
          this.data = response["data"];
          console.log(response);
          this.dtTrigger.next();
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        })
      .catch(this.handleError);
  }

  public imagePath;
  imgURL: any;
  public messageImage: string;
  public messageAudio: string;
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

  JqueryAjax() {
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

        // Counter
        $('.count').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
            });
        });

        // Comments - Approve & Deny
        $('.approve').click(function (e) {
          Materialize.toast('Comment Approved', 3000);
          e.preventDefault();
        });
        $('.deny').click(function (e) {
          Materialize.toast('Comment Denied', 3000);
          e.preventDefault();
        });

        // Quick Todos
        $('#todo-form').submit(function (e) {
          const output = `<li class="collection-item">
              <div>${$('#todo').val()}
                <a href="#!" class="secondary-content delete">
                  <i class="material-icons">close</i>
                </a>
              </div>
            </li>`;

          $('.todos').append(output);

          Materialize.toast('Todo Added', 3000);

          e.preventDefault();
        });

        // Delete Todos
        $('.todos').on('click', '.delete', function (e) {
          $(this).parent().parent().remove();
          Materialize.toast('Todo Removed', 3000);

          e.preventDefault();
        });

        CKEDITOR.replace('body');

      });
    }, 1000);

  }

  selectedFilesAudio: FileList;
  selectedFilesImage: FileList;


  progress: { percentage: number } = { percentage: 0 };
  id:any;
  uploadImageOrAudio(){
    this.progress.percentage = 0;
    document.getElementById("progress").style.display = "block";
    if (this.selectedFilesImage != undefined) {
      this.uploadService.pushFileToStorage(this.selectedFilesImage.item(0), this.token.getToken()).toPromise().then(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File Image is completely uploaded!');


        }
      });
    }
    this.progress.percentage = 0;
    if (this.selectedFilesAudio != undefined) {
      this.uploadService.pushFileToStorage(this.selectedFilesAudio.item(0), this.token.getToken()).toPromise().then(event => {
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
  upload() {
    
   
   this.uploadService.addWordToAPI(this.WordPost,this.token.getToken(),()=>{
     console.log("Da them vao ");
     this.uploadImageOrAudio();
    });
    console.log(this.WordPost);

    
    

  }
  selectedWord = {
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: ""
  };
 
  
  fileUpload:Observable<string[]>;
  viewWord(id: number) {
    this.wordService.getWordFromId(id, this.token.getToken()).subscribe(
      res => {
        this.selectedWord = res["data"];
        console.log("Data detail:" + JSON.stringify(this.selectedWord));
      }

    );
   this.fileUpload=this.wordService.getFiles(id,this.token.getToken());
     console.log(this.fileUpload);
  }

}
