import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import 'datatables.net';
import 'datatables.net-dt';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersComponent } from './users/users.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DetailWordComponent } from './detail-word/detail-word.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { MaterializeModule } from "angular2-materialize";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    PostsComponent,
    CategoriesComponent,
    CommentsComponent,
    UsersComponent,
    DetailWordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatPaginatorModule,
    MatTableModule,DataTablesModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBogpc-AUVgVdcgoiWhE4_lKCFzfcbaSaA',
      authDomain: 'angularfirebase-267db.firebaseapp.com',
      databaseURL: 'https://angularfirebase-267db.firebaseio.com',
      projectId: 'angularfirebase-267db'
    }),
    AngularFirestoreModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
