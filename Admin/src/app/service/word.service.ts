import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RestResponse } from 'src/model/restresponse';
import { Word } from 'src/model/word';


@Injectable({
  providedIn: 'root'
})
export class WordService {
  // private fileSubject:Subject<any>;
  // file$:Observable<any>;
    private URL_API="http://localhost:9059/wordapi/"
  constructor(private http: HttpClient) { 
    // this.fileSubject=new Subject();
    // this.file$=this.fileSubject.asObservable();
  }
  getFiles(id:number,auth_token):Observable<any>{
    console.log('request get file audio');
    return this.http.get('http://localhost:9059/upload/fileaudio/'+id,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`),responseType:'text'});
  }
  getAllWord(auth_token): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.URL_API, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getWordFromId(id: number,auth_token:any): Observable<RestResponse> {
    // const url = `${this.URL_API}+${id}`;
    return this.http.get<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  postWord(word: Word,auth_token:any):Observable<RestResponse> {     
    return this.http.post<RestResponse>(this.URL_API, word,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)}); 
  } 
 
  putWord(id: number, word: Word,auth_token:any) {     return this.http.put<RestResponse>(this.URL_API + id, word,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});   } 
 
  deleteWord(id: number,auth_token:any) {     return this.http.delete<RestResponse>(this.URL_API + id,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});   } 
 
  getWordByTitle2(auth_token:any):Observable<any>{
    return this.http.get("http://localhost:9059/titleHAL/2/words", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
}
