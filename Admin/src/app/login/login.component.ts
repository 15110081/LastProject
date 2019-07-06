import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) {
    this.isLoggedIn = false;
   
  }

  ngOnInit() {

    $('.modal').modal({
      dismissible: true,
      inDuration: 300,
      outDuration: 200,
      ready: function (modal, trigger) {
        console.log('Modal Opened', modal, trigger);
      }
    });
    // Hide Sections
    $('.section').hide();

    setTimeout(function () {
      $(document).ready(function () {
        // Show sections
        $('.section').fadeIn();

        // Hide preloader
        $('.loader').fadeOut();

      });
    }, 1000);
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        // this.reloadPage();
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  
  reloadPage() {
    window.location.reload();
  }
  checkLoginRole():boolean{
    if(this.tokenStorage.getAuthorities().toString()==="ROLE_ADMIN"){
        this.isLoggedIn = true;
        this.router.navigate(["/dashboard"]);
      return true;
    }
    else{
      this.isLoginFailed=true;
      // this.errorMessage="Don't Allow Login";
      // this.reloadPage();
    }
    return false;

  }
 

}
