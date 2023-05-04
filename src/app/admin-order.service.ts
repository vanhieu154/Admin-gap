  import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { Observable, catchError, map, retry, switchMap, throwError } from 'rxjs';
import { User } from './user';
import { Order } from './order';
import { Product } from './product';
import { Address } from './address';


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
      return this._http.get<any>("http://localhost:4000/admin_order/",requestOptions).pipe(
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
    getAdminOrderDetail(_id:string):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("/admin_order_detail/"+_id,requestOptions).pipe(
        map(res=>JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError)
      )
    }
    getAdminOrderUser(_id:string):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("/admin_order_user/"+_id,requestOptions).pipe(
        map(res=>JSON.parse(res) as User),
        retry(3),
        catchError(this.handleError)
      )
    }
    getAdminOrderAddress (_id:string):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("/admin_order_address/"+_id,requestOptions).pipe(
        map(res=>JSON.parse(res) as Address),
        retry(3),
        catchError(this.handleError)
      )
    }
    updateOrder(aOrder:any):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.put<any>("/admin_order_update",JSON.stringify(aOrder),requestOptions).pipe(
        map(res=>JSON.parse(res) as Array<Order>),
        retry(3),
        catchError(this.handleError)
      )
    }






  }
