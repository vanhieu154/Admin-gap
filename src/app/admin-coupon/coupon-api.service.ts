import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Coupon } from './coupon';
@Injectable({
  providedIn: 'root'
})
export class CouponApiService {

  constructor(private _http: HttpClient) { }
  getCoupons():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/coupons/",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Coupon>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getCoupon(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/coupons/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Coupon),
      retry(3),
      catchError(this.handleError)
    )
  }


  postCoupon(aCoupon:any):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.post<any>("http://localhost:4000/coupons/",JSON.stringify(aCoupon),requestOptions).pipe(
map(res=>JSON.parse(res) as Coupon),
retry(3),
catchError(this.handleError))
}



putCoupon(aCoupon:any):Observable<any>
{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.put<any>("http://localhost:4000/coupons/",JSON.stringify(aCoupon),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Coupon>),
    retry(3),
    catchError(this.handleError)
  )
}

  deletecoupon(CouponId: string): Observable<Coupon> {
    const url =  `http://localhost:4000/coupons/${CouponId}`;
    return this._http.delete<Coupon>(url)
      .pipe(tap(_ => console.log(`Xóa sản phẩm với id = ${CouponId}`)),
        // catchError(this<Product>('deleteProduct'))
      );
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
