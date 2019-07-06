import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Word } from 'src/model/word';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { Title } from 'src/model/title';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../service/title.service';
import { ChartModel } from 'src/model/chartmodel';
import { OverView } from 'src/model/overview';
import { ToDo } from 'src/model/todo';

declare var $: any;
declare var Materialize: any;
declare var CKEDITOR: any;
declare var CanvasJS:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  data: any;
  dateTemp:any;
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

  listWord: Word[] = [];
  constructor(private http:HttpClient,private titleService:TitleService, private token: TokenStorageService, private wordService: WordService,private router:Router) {
    this.loadWord(this.token.getToken());
    // this.loadWordv2();  
    this.getTop3Words();
    this.getTop3Title();
    this.getOverview();
    this.getToDo();
  }

  ngOnInit() {
    this.chartCanvas();
    console.log(this.token.getToken());
    if (this.token.getToken() && this.token.getAuthorities().toString()==="ROLE_ADMIN") {
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
          'csv'
        ]
      };

    this.JqueryAjax();

  }

  dataTempTop3: any;
  ListLoadTop3: Word[] = [];
  getTop3Words() {

    this.wordService.getTop3Words(this.token.getToken()).subscribe(res => {
      var patt1 = /\/[1-9]+.*/g;
      this.dataTempTop3 = res["_embedded"]["word"];
      var temp;
      this.dataTempTop3.forEach((element) => {
        let word = new Word(null, null, "", "", "", "", "");
        temp = element["_links"]["self"]["href"].match(patt1);
        word["id"] = temp.toString().slice(1);
        word["definition"] = element["definition"];
        word["note"] = element["note"];
        word["phonetic"] = element["phonetic"];
        word["vocabulary"] = element["vocabulary"];
        word["typeWord"] = element["typeWord"];
        word["imageWord"] = element["imageWord"];
        this.ListLoadTop3.push(word);
      });
      console.log(this.ListLoadTop3);     
    });
  }
  dateTempv2: any;
  listTitle: Title[] = [];
  datav2: any;
 
  loadWordv2()
{
  
this.titleService.getAllCourse(this.token.getToken()).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dateTempv2 = res["_embedded"]["title"];
      var temp;
      this.dateTempv2.forEach(element => {
        let title = new ChartModel(null, "");
        let lengthData:any;
        temp = element["_links"]["self"]["href"].match(patt1);
      
        this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/`+temp.toString().slice(1)).forEach((value)=>{
          title["x"]=value["size"];
        });
         let splitDatetime=element["createdDatetime"];
         
        title["label"] = element["name"];
      
        this.listChart.push(title);
      });
      this.datav2 = this.listChart;
      console.log(this.datav2);
    });
  
  }
  listChart:ChartModel[]=[];

  chartCanvas(){
    // this.listTitle.forEach((value,index,array)=>{
    // let chart=new ChartModel("","");
    //     chart.y=value.size;
    //     chart.label=value.name;
    //     this.listChart.push(chart);
    // });
    let listCanvas=this.listChart;
    // console.log(listCanvas);
      $(document).ready(function(){
            var chart = new CanvasJS.Chart("chartContainer", {
              animationEnabled: true,
      
              title: {
                  text: "Overview Title"
              },
              axisX: {
                  interval: 1
              },
              axisY2: {
                  interlacedColor: "rgba(1,77,101,.2)",
                  gridColor: "rgba(1,77,101,.1)",
                  title: "Number Word of Title"
              },
              data: [{
                  type: "bar",
                  name: "companies",
                  axisYType: "secondary",
                  color: "#014D65",
                  dataPoints:
                  [    
                      { y: 7, label: "Chủ đề 1" },
                      { y: 5, label: "Chủ đề 2" },
                      { y: 9, label: "Chủ đề 3" },
                      { y: 7, label: "Chủ đề 4" },
                      { y: 7, label: "Chủ đề 5" },
                      { y: 9, label: "Chủ đề 6" },
                      { y: 8, label: "Chủ đề 7" },
                      { y: 11, label: "Chủ đề 8" },
                      { y: 15, label: "Chủ đề 9 " },
                      { y: 12, label: "Chủ đề 10" },
                      { y: 15, label: "Chủ đề 11" },
                      { y: 25, label: "Chủ đề 12" },
                      { y: 28, label: "Chủ đề 13" },
                      { y: 29, label: "Chủ đề 14" },
                      { y: 52, label: "Chủ đề 15" },
                      { y: 103, label: "Chủ đề 16" },
                      { y: 134, label: "Chủ đề 17" }
                  ]
              }]
          });
          chart.render();
          
       
       });
   
  }
  

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
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
        // $('.approve').click(function (e) {
        //   Materialize.toast('Comment Approved', 3000);
        //   e.preventDefault();
        // });
        // $('.deny').click(function (e) {
        //   Materialize.toast('Comment Denied', 3000);
        //   e.preventDefault();
        // });

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







dataTempTop3Title:any;
listTitleTop3:Title[]=[];
  getTop3Title(){
    this.listTitle=[];
    this.titleService.getTop3Courses(this.token.getToken()).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dataTempTop3Title = res["_embedded"]["title"];
      var temp;
      this.dataTempTop3Title.forEach(element => {
        let title = new Title(null, "", "", "", "","");
        temp = element["_links"]["self"]["href"].match(patt1);
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = element["createdDatetime"].toString().slice(0,10);
        title["updatedDatetime"] = element["updatedDatetime"];
        this.listTitleTop3.push(title);
      });
      console.log(this.listTitleTop3);
    });
  }
  overview=new OverView("","","","");
getOverview(){
  this.http.get(`http://localhost:9059/titleApiv1/overview`).subscribe(res=>{
    this.overview.results=res["results"];
    this.overview.titles=res["titles"];
    this.overview.users=res["users"];
    this.overview.words=res["words"];
   console.log("overview"+this.overview);
  });
}
todo:any;
dataToDo:any;
listToDo:ToDo[]=[];
  getToDo(){
    this.http.get(`http://localhost:9059/todoHAL`).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dataToDo = res["_embedded"]["todo"];
      var temp;
      this.dataToDo.forEach(element => {
        let todo = new ToDo(null, "");
        temp = element["_links"]["self"]["href"].match(patt1);
        todo["id"] = temp.toString().slice(1);
        todo["note"] = element["note"];
        // todo["createdDatetime"] = element["createdDatetime"].toString().slice(0,10);
        this.listToDo.push(todo);
    });
    console.log(this.listToDo);
  });
  }
  deleteToDo(id:number){
    this.http.delete(`http://localhost:9059/todoHAL/${id}`).subscribe(res=>{console.log(res)});
  }
  saveToDo(){
    let addToDo=new ToDo(null,"");
    addToDo.note=$("#todo").val();
    console.log($("#todo").val());
    this.http.post("http://localhost:9059/todoHAL",addToDo).subscribe(res=>console.log(res));
  }

}