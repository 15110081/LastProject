import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {  Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token:TokenStorageService,private router:Router) { }

  ngOnInit() {
  }
  logout() {
    this.token.signOut();
    $("#close").click();
    this.router.navigate(["/login"]);
    
  }
}
