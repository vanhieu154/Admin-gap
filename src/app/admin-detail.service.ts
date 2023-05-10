import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { User } from './user';
import { Admin, AdminFix } from './admin';
@Injectable({
  providedIn: 'root'
})
export class AdminDetailService {

  constructor(private _http: HttpClient) { }
  API_URL: string = 'http://localhost:4000'

  headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8')
  requestOptions: Object = {
    header: this.headers,
    responseType: 'Text'
  }

  putAAdmin(admin: any): Observable<any> {
    return this._http.put(`${this.API_URL}/admin-update/${admin._id}`, admin, {responseType: 'text'}).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }

  getAAdmin(adminId: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/admins/` + adminId, this.requestOptions).pipe(
      map(res => JSON.parse(res) as AdminFix),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
