import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/model/restresponse';


@Injectable({
  providedIn: 'root'
})
export class WordService {

    private URL_API="http://localhost:9059/wordapi"
  constructor(private http: HttpClient) { }

  getAllWord(auth_token): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.URL_API, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getWordFromId(id: number,auth_token:any): Observable<RestResponse> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<RestResponse>(url, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }


}
