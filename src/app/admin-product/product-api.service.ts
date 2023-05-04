import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {


  constructor(private _http: HttpClient) { }
  getProducts():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/products/",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getProduct(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/products/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Product),
      retry(3),
      catchError(this.handleError)
    )
  }


  postProduct(aProduct:any):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.post<any>("http://localhost:4000/products/",JSON.stringify(aProduct),requestOptions).pipe(
map(res=>JSON.parse(res) as Product),
retry(3),
catchError(this.handleError))
}



putProduct(aProduct:any):Observable<any>
{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.put<any>("http://localhost:4000/products/",JSON.stringify(aProduct),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Product>),
    retry(3),
    catchError(this.handleError)
  )
}

  deleteProduct(productId: string): Observable<Product> {
    const url =  `http://localhost:4000/products/${productId}`;
    return this._http.delete<Product>(url)
      .pipe(tap(_ => console.log(`Xóa sản phẩm với id = ${productId}`)),
        // catchError(this<Product>('deleteProduct'))
      );
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
