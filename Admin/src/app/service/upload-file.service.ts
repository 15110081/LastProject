import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from 'src/model/word';
import { WordService } from './word.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private wordService:WordService) { }
  addWordToAPI(Word:Word,auth_token,callBackFunc?: () => any){
    this.wordService.postWord(Word,auth_token).toPromise().then(() => {
      callBackFunc();
    });
  }
  pushFileToStorage(file: File,auth_token): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST','http://localhost:9059/wordapi/post', formdata, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`),
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  updatePushFileToStorage(file: File,auth_token,id:number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST','http://localhost:9059/wordapi/updatefile/'+id, formdata, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`),
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8080/getallfiles');
  }
}
