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
        return this.http.post<RestResponse>(this.URL_API, title, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    putTitle(id: number, title: Title, auth_token: any) { return this.http.put<RestResponse>(this.URL_API + id, title, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }); }

    deleteTitle(id: number, auth_token: any) { return this.http.delete<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) }); }
    getTitleHAL(auth_token: any): Observable<any> {
        return this.http.get("http://localhost:9059/titleHAL?page=0&size=2&sort=name,asc", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
    }
    getTitleIDHAL(auth_token: any,id:any): Observable<any> {
        return this.http.get(`http://localhost:9059/titleHAL?page=${id}&size=2&sort=name,asc`,
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
}