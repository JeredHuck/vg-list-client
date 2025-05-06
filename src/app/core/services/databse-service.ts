import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { List } from '../../shared/models/list';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<List[]> {
    return this.http
      .get<List[]>(`${environment.apiUrl}/lists`)
      .pipe(catchError(this.handleError));
  }

  getUserLists(id: number): Observable<List> {
    return this.http
      .get<List>(`${environment.apiUrl}/${id}/userLists`)
      .pipe(catchError(this.handleError));
  }

  createList(id: number) {}

  deleteList(id: number) {}

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Fix your client side', error);
    return throwError(
      () => new Error('Something went wrong; please try again'),
    );
  }
}
