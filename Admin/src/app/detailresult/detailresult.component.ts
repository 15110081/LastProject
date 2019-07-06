import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WordService } from '../service/word.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Result } from 'src/model/result';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detailresult',
  templateUrl: './detailresult.component.html',
  styleUrls: ['./detailresult.component.scss']
})
export class DetailresultComponent implements OnInit {

  constructor(private route:ActivatedRoute,private location:Location,private resultService:WordService,private token:TokenStorageService) { }

  ngOnInit() {
    this.getResultFromRoute();
  }
  data: any;
  dateTemp: any;
  result = new Result(null, "", "", "", "","");
 
  getResultFromRoute(): void {
   const  id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    //Call service to "get movie from id" ?
    this.resultService.getIdResult( this.token.getToken(),id).subscribe(
      res => {
        var patt1 =/\/[1-9]+.*/g;
        var temp;
  
          this.result["id"] = id;
          this.result["username"] = res["username"];
          this.result["typeTest"] = res["typeTest"];
          this.result["result"] = res["result"];
          this.result["createdDatetime"] = res["createdDatetime"];
          this.result["titleId"] = res["titleId"];
      }

    );
  }
  deleteResult(id:number){
    this.resultService.deleteIdResult(this.token.getToken(),id).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
    this.goBack();
  }
  updateResult(id:number){
    this.resultService.putIdResult(this.token.getToken(),id,this.result).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));;
    this.goBack()
  }
  goBack(): void {
    this.location.back();
  }
}
