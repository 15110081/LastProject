import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { WordService } from '../auth/word.service';
import { Subject } from 'rxjs';
import { Word } from 'src/model/word';
declare var $: any;
declare var Materialize: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  data: any;
  currentID: number;
  logs: string[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<Word> = new Subject();
  isLoggedIn=false;
  roles: string[] = [];
  selectedWord = {
    id: null,
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: "",
    title: "",
    audioword: ""
  };
  constructor(private token: TokenStorageService, private wordService: WordService) { }

  ngOnInit() {
    console.log(this.token.getToken());
    this.loadWord(this.token.getToken());
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getAuthorities();
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      select: true
    };
    
    this.JqueryAjax();

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  errorMessage: string;
  loadWord(token: any) {
    this.wordService.getAllWord(token).subscribe(
      data => {
        this.data = data["data"];
        this.dtTrigger.next();
        console.log(JSON.stringify(this.data));
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

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
  

}
