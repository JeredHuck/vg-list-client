import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { List } from '../../shared/models/list';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private userListsCache = new Map<number, Observable<List[]>>();

  constructor(private http: HttpClient) {}

  getLists(): Observable<List[]> {
    return this.http
      .get<List[]>(`${environment.apiUrl}/lists`)
      .pipe(catchError(this.handleError));
  }

  getUserLists(userId: number): Observable<List[]> {
    let lists = this.userListsCache.get(userId);

    if (!lists) {
      lists = this.http
        .get<List[]>(`${environment.apiUrl}/users/${userId}/lists`)
        .pipe(
          catchError(this.handleError),
          shareReplay({ bufferSize: 1, refCount: false }),
        );
      this.userListsCache.set(userId, lists);
    }

    return lists;
  }

  clearUserListsCache(userId: number): void {
    this.userListsCache.delete(userId);
  }

  createList(userId: number, content: string[]): Observable<List> {
    return this.http
      .post<List>(`${environment.apiUrl}/users/${userId}/lists`, content)
      .pipe(
        tap(() => this.clearUserListsCache(userId)),
        catchError(this.handleError),
      );
  }

  deleteList(userId: number, listId: number) {
    return this.http
      .delete<List>(`${environment.apiUrl}/users/${userId}/lists/${listId}`)
      .pipe(
        tap(() => this.clearUserListsCache(userId)),
        catchError(this.handleError),
      );
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  createUser(username: string, password: any) {
    return this.http
      .post<User>(`${environment.apiUrl}/createUser`, username, password)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Fix your client side', error);
    return throwError(
      () => new Error('Something went wrong; please try again'),
    );
  }
}
