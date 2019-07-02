import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersComponent } from './users/users.component';
import { DetailWordComponent } from './detail-word/detail-word.component';
import { DetailTitleComponent } from './detail-title/detail-title.component';
import { AddWordToTitleComponent } from './add-word-to-title/add-word-to-title.component';
import { ExcelSiteComponent } from './excel-site/excel-site.component';
import { DetailresultComponent } from './detailresult/detailresult.component';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
},
{
  path:'index',
  component:HeaderComponent
},
{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'posts',
  component:PostsComponent  
},
{
  path:'categories',
  component:CategoriesComponent
},
{
  path:'comments',
  component:CommentsComponent
},
{
  path:'users',
  component:UsersComponent
},
{
  path:'detailword/:id',
  component:DetailWordComponent
},
{
  path:'detailtitle/:id',
  component:DetailTitleComponent
},
{
  path:'detailresult/:id',
  component:DetailresultComponent
},
{
  path:'addwordtotitle',
  component:AddWordToTitleComponent
},
{
  path:'excelsite',
  component:ExcelSiteComponent
},
{ 
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
