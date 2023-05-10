import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Promotion } from './Promotion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private _http: HttpClient) { }
  getPromotions():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/promotions/",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Promotion>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getPromotion(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/promotions/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Promotion),
      retry(3),
      catchError(this.handleError)
    )
  }
  getProductPromotion(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/promotions_product/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    )
  }


  postPromotion(aPromotion:any):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.post<any>("http://localhost:4000/promotions/",JSON.stringify(aPromotion),requestOptions).pipe(
map(res=>JSON.parse(res) as Promotion),
retry(3),
catchError(this.handleError))
}



putPromotion(aPromotion:any):Observable<any>
{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.put<any>("http://localhost:4000/promotions/",JSON.stringify(aPromotion),requestOptions).pipe(
    map(res=>JSON.parse(res) as Promotion),
    retry(3),
    catchError(this.handleError)
  )
}

  deletePromotion(promotionId: string): Observable<Promotion> {
    const url =  `http://localhost:4000/promotions/${promotionId}`;
    return this._http.delete<Promotion>(url)
      .pipe(tap(_ => console.log(`Xóa sản phẩm với id = ${promotionId}`)),
        // catchError(this<Product>('deleteProduct'))
      );
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
