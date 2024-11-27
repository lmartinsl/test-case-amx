import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './core/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  subjectUser$ = new BehaviorSubject<User | undefined>(undefined);

  setCurrentUser(user: User | undefined): void {
    this.subjectUser$.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.subjectUser$.asObservable();
  }
}
