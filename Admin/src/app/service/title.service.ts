import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { RestResponse } from "src/model/restresponse";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Title } from "src/model/title";

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    private URL_API = "http://localhost:9059/titleApi/";
    constructor(private http: HttpClient) { }
    getAllTitle(auth_token): Observable<RestResponse> {
        return this.http.get<RestResponse>(this.URL_API, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getTitleFromId(id: number, auth_token: any): Observable<RestResponse> {
        // const url = `${this.URL_API}+${id}`;
        return this.http.get<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    postTitleCallBack(title: Title, auth_token: any, callBackFunc?: () => any) {
        this.postTitle(title, auth_token).toPromise().then(() => callBackFunc());
    }

    postTitle(title: Title, auth_token: any): Observable<RestResponse> {
        return this.http.post<RestResponse>(this.URL_API, title,
             { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    putTitle(id: number, title: Title, auth_token: any) { return this.http.put<RestResponse>(this.URL_API + id, title, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }); }
    deleteTitleHAL(id:any,auth_token:any){
        return this.http.delete(`http://localhost:9059/titleHAL/${id}`,
        { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
      }
    deleteTitle(id: number, auth_token: any) { return this.http.delete<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }); }
    getTitleHAL(auth_token: any): Observable<any> {
        return this.http.get("http://localhost:9059/titleHAL?page=0&size=10&sort=name,asc", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getTitleIDHAL(auth_token: any,id:any): Observable<any> {
        return this.http.get(`http://localhost:9059/titleHAL?page=${id}&size=10&sort=name,asc`,
         { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getTitleHALLink(auth_token: any,link:any): Observable<any> {
        return this.http.get(link, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getWordByTitleHAL(auth_token: any,id:any): Observable<any> {
        return this.http.get(`http://localhost:9059/titleHAL/${id}/words`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getWordLeft(auth_token: any,id:any): Observable<any> {
        return this.http.get(this.URL_API+`${id}/words`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    saveAccessiable(auth_token: any,idTitle:any,idWord:any){
        return this.http.post(`http://localhost:9059/titleApiv1/${idTitle}/save/${idWord}`, 
        { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });

    }

    deleteAccessiable(auth_token:any,idTitle:any,idWord:any){
        return this.http.put(`http://localhost:9059/titleHAL/${idTitle}/words/${idWord}`,
        { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
    }
    clearAccessiable(auth_token:any,idTitle:any, callBackFunc?: () => any){
        return this.http.delete(`http://localhost:9059/titleApiv1/${idTitle}/deletev2`,
        { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }).toPromise().then(()=>callBackFunc());
    }
    clearAccessiable_v1(auth_token:any,idTitle:any){
        return this.http.put(`http://localhost:9059/titleHAL/${idTitle}/words`,
        { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getUserHAL(auth_token: any,id:number): Observable<any> {
        return this.http.get(`http://localhost:9059/userHAL?page=${id}&size=5&sort=name,asc`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getUserHALStart(auth_token: any): Observable<any> {
        return this.http.get(`http://localhost:9059/userHAL?page=0&size=5&sort=name,asc`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    deleteUserHAL(auth_token:any,id:number, callBackFunc?: () => any){
        return this.http.delete(`http://localhost:9059/userHAL/${id}`,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }).toPromise().then(()=>callBackFunc());
    }
    getAllCourse(auth_token: any): Observable<any> {
        return this.http.get("http://localhost:9059/titleHAL?sort=createdDatetime,desc", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
      }
      getTop3Courses(auth_token: any): Observable<any> {
        return this.http.get("http://localhost:9059/titleHAL?page=0&size=3&sort=createdDatetime,desc", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
      }
}