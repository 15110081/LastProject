import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/model/restresponse';
import { Word } from 'src/model/word';


@Injectable({
  providedIn: 'root'
})
export class WordService {

    private URL_API="http://localhost:9059/wordapi/"
  constructor(private http: HttpClient) { }
  getFiles(id:number,auth_token): Observable<any> {
    console.log('request get file audio');
    return this.http.get('http://localhost:9059/upload/file/'+id,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`),responseType: 'json'});
  }
  getAllWord(auth_token): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.URL_API, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getWordFromId(id: number,auth_token:any): Observable<RestResponse> {
    // const url = `${this.URL_API}+${id}`;
    return this.http.get<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  postWord(word: Word,auth_token:any) {     
    return this.http.post<RestResponse>(this.URL_API, word,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)}); 
  } 
 
  putWord(id: number, word: Word,auth_token:any) {     return this.http.put<RestResponse>(this.URL_API + id, word,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});   } 
 
  deleteWord(id: number,auth_token:any) {     return this.http.delete<RestResponse>(this.URL_API + id,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});   } 
 

}
