import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }
  getBlogs():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:4000/blogs/",requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Blog>),
    retry(3), catchError(this.handleError))
  }
    handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

  getBlog(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/blogs/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Blog),
      retry(3),
      catchError(this.handleError)
    )
  }

postBlog(aBlog:any):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.post<any>("http://localhost:4000/blogs/",JSON.stringify(aBlog),requestOptions).pipe(
map(res=>JSON.parse(res) as Blog),
retry(3),
catchError(this.handleError))
}

putBlog(aBlog:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("http://localhost:4000/blogs/",JSON.stringify(aBlog),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Blog>),
      retry(3),
      catchError(this.handleError)
    )
  }

deleteBlog(blogId: string): Observable<Blog> {
  const url =  `http://localhost:4000/blogs/${blogId}`;
  return this._http.delete<Blog>(url)
    .pipe(tap(_ => console.log(`Xóa bài viết với id = ${blogId}`)),
    );
}

}
