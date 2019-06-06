import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../service/word.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Word } from 'src/model/word';
import { Router } from '@angular/router';
import { Button } from 'protractor';

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
  constructor(private token: TokenStorageService, private wordService: WordService,private router:Router) {
    this.loadWord(this.token.getToken());
  
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
          'csv'
        ]
      };

    this.JqueryAjax();

  }
  actionExcelsite(){
    console.log('222');
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








  viewWord(id: number) {

  }

}
