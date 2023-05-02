import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:4000/admins';

  public isLoggedIn = false;

  constructor(private http: HttpClient ) {
  }

  login(adminname: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    return this.http.post<any>(`/adminlogin`, { adminname, password })
      .pipe(
        map(res => {
          // Nếu đăng nhập thành công, gán giá trị true cho biến isLoggedIn
          if(res.message==null){
            this.isLoggedIn = true;
            sessionStorage.setItem('checkLogin', '1');
            return res; // trả về res.send
          }else{
            return res;
          }

        }),
        retry(3),
        catchError(this.handleError)
      );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
