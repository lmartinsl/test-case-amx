import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  throwError
} from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  checkUserByUserName(userName: string): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]) => {
        const user = users.find((u) => u.userName === userName);
        if (!user) {
          throw new Error(`O usuário '${userName}' não foi encontrado.`);
        }
        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Error | HttpErrorResponse): Observable<never> {
    const errorMessage =
      error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return throwError(() => ({
      status: 500,
      message: errorMessage,
    }));
  }
}
