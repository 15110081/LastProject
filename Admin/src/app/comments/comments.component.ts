import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Result } from 'src/model/result';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
declare var $:any;
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  dtOptions: DataTables.Settings = {

  };
  
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Result> = new Subject();
  data: any;
  constructor(private token: TokenStorageService, private wordService: WordService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getResultHAL(this.token.getToken());
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
 
       });
     }, 1000);
  }
 
  dateTemp: any;
  listResult: Result[] = [];
  user: Result = new Result(null, "", "", "","","");
  getResultHAL(token: any) {
      this.wordService.getAllResult(this.token.getToken()).subscribe(res => {
        var patt1 = /\/[1-9]+.*/g;
        this.dateTemp = res["_embedded"]["result"];
        var temp;
        this.dateTemp.forEach(element => {
          let result = new Result(null, "", "", "","","");
          temp = element["_links"]["self"]["href"].match(patt1);
          result["id"] = temp.toString().slice(1);
          result["result"] = element["result"];
          result["username"] = element["username"];
          result["titleId"] = element["titleId"];
          result["typeTest"] = element["typeTest"];
          result["createdDatetime"] = element["createdDatetime"];
          this.listResult.push(result);

        });
        this.data = this.listResult;
        this.dtTrigger.next();
        console.log(this.data);
      });
  }
  checkLoginRole():boolean{
    if(this.token.getAuthorities().toString()==="ROLE_ADMIN")return true;
    return false;
  }
}
