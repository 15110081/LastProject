import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var Materialize: any;
declare var CKEDITOR:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dtOptions: any = {};
  constructor() { }

  ngOnInit() {
    this.JqueryAjax();
    this.dtOptions = {
      ajax: "http://localhost:8080/wordapi",
      columns: [{
        title: 'ID',
        data: 'id'
      },
      {
        title: 'Vocabulary',
        data: 'vocabulary'
      },
      {
        title: 'Phonetic',
        data: 'phonetic'
      },
    ],
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'columnsToggle',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('Button activated');
          }
        }
      ]
    };
  }

JqueryAjax(){
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
