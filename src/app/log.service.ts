import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, retry, throwError } from 'rxjs';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:4000';

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient ) {
  }

  login(adminname: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    return this.http.post<any>(`${this.apiUrl}/loginAdmin`, { adminname, password })
      .pipe(
        map(res => {
          // Nếu đăng nhập thành công, gán giá trị true cho biến isLoggedIn
          if(res.message==null){
            this.isLoggedIn.next(true);
            sessionStorage.setItem('checkLogin', '1');
            return res; // trả về res.send
          }else{
            return res;
          }

        }),
        retry(3),
        catchError(this.handleError)
      );
  };
  getAdmin(_id:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this.http.get<any>("http://localhost:4000/admins/"+_id,requestOptions).pipe(
  map(res=>JSON.parse(res) as Admin),
  retry(3),
  catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
