import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Admin } from './admin';
import { User } from './customer-list/customer-list';

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  constructor(private _http: HttpClient) { }
  //lấy danh sách Admin
  getAdmins():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("/admins",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<Admin>),
  retry(3),
  catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
  return throwError(()=>new Error(error.message))
  }

  //lấy danh sách khách hàng
  getUsers():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("/users",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<User>),
  retry(3),
  catchError(this.handleError)
)

  }

  //lấy detail của 1 customer
  getUser(userId:string):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }

  return this._http.get<any>("/users/"+userId,requestOptions).pipe(
    map(res=>JSON.parse(res) as User),
    retry(3),
    catchError(this.handleError))
  }


//create 1 admin
  postAdmin(anAdmin:any):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.post<any>("http://localhost:4000/admins/",JSON.stringify(anAdmin),requestOptions).pipe(
  map(res=>JSON.parse(res) as Admin),
  retry(3),
  catchError(this.handleError))
  }


  private apiUrl = 'http://localhost:4000';

  addAdmin(admin: Admin): Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>(`${this.apiUrl}/users`, JSON.stringify(admin),requestOptions)
      .pipe(
        map(res => {
          JSON.parse(res) as Admin
        }),
        retry(3),
        catchError(this.handleError)
      );
  }
  updateUser(user:any): Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>(`${this.apiUrl}/admins`,JSON.stringify(Admin),requestOptions).pipe(
      map(res=>JSON.parse(res) as Admin),
      retry(3),
      catchError(this.handleError)
    )
  }

  }



