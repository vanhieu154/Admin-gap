  import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { Observable, catchError, map, retry, switchMap, throwError } from 'rxjs';
import { User } from './user';
import { Order } from './order';


  @Injectable({
    providedIn: 'root'
  })
  export class AdminOrderService {
    [x: string]: any;
    constructor(private _http: HttpClient) { }
    getAdminOrders():Observable<any>
    {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
    }
    return this._http.get<any>("/admin_order",requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Order>),
    retry(3),
    catchError(this.handleError))
    }
    handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
    }
    getAdminOrder(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/admin_order/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Order),
      retry(3),
      catchError(this.handleError)
    )
  }
  //Marked deliveried
  markOrderAsDelivered(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    const body = {
      Status: 'deliveried'
    };
    return this._http.put<any>('/admin_order/' + _id, JSON.stringify(body), requestOptions).pipe(
      switchMap(() => this.getAdminOrders()),
      retry(3),
      catchError(this.handleError)
    );
  }
//
getUser(_id:string):Observable<any>
{
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.get<any>("/user/"+_id,requestOptions).pipe(
    map(res=>JSON.parse(res) as User),
    retry(3),
    catchError(this.handleError)
  )
}



  }
